import { CALENDAR_COLORS } from "../const";
import type { HomeAssistant } from "../types";

/** HA theme color tokens accepted by the frontend color picker. */
const THEME_COLORS = new Set([
  "primary",
  "accent",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "light-grey",
  "grey",
  "dark-grey",
  "blue-grey",
  "black",
  "white",
]);

export type CalendarColorMap = Record<string, string>;

interface EntityRegistryOptions {
  calendar?: { color?: string | null };
}

interface EntityRegistryEntryLike {
  entity_id?: string;
  options?: EntityRegistryOptions | null;
}

/**
 * Map HA calendar color values to usable CSS.
 * Theme tokens become `var(--{token}-color)`; hex/CSS colors pass through.
 */
export function toCssCalendarColor(color: string): string {
  const trimmed = color.trim();
  if (!trimmed) return trimmed;
  if (THEME_COLORS.has(trimmed)) {
    return `var(--${trimmed}-color)`;
  }
  return trimmed;
}

export function isUsableCalendarColor(
  color: string | null | undefined
): color is string {
  if (!color || typeof color !== "string") return false;
  const trimmed = color.trim();
  if (!trimmed) return false;
  if (THEME_COLORS.has(trimmed)) return true;
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(trimmed)) {
    return true;
  }
  // rgb()/hsl()/named CSS — let the browser decide at paint time
  if (/^(rgb|hsl)a?\(/i.test(trimmed)) return true;
  try {
    const style = new Option().style;
    style.color = trimmed;
    return style.color !== "";
  } catch {
    return false;
  }
}

/** Deterministic palette fallback when HA has no per-calendar color. */
export function fallbackCalendarColor(index: number): string {
  const i = index < 0 ? 0 : index;
  return CALENDAR_COLORS[i % CALENDAR_COLORS.length];
}

/**
 * Prefer HA entity-registry `options.calendar.color`, then optional
 * `hass.entities[id].display.color` / state attribute leftovers, else palette.
 */
export function resolveCalendarColor(
  entityId: string,
  index: number,
  haColor?: string | null,
  hass?: HomeAssistant
): string {
  if (isUsableCalendarColor(haColor)) {
    return toCssCalendarColor(haColor);
  }

  const displayColor = readHassEntityDisplayColor(hass, entityId);
  if (isUsableCalendarColor(displayColor)) {
    return toCssCalendarColor(displayColor);
  }

  const attrColor = hass?.states?.[entityId]?.attributes?.color;
  if (typeof attrColor === "string" && isUsableCalendarColor(attrColor)) {
    return toCssCalendarColor(attrColor);
  }

  return fallbackCalendarColor(index);
}

function readHassEntityDisplayColor(
  hass: HomeAssistant | undefined,
  entityId: string
): string | undefined {
  const entry = hass?.entities?.[entityId] as
    | { display?: { color?: unknown }; color?: unknown }
    | undefined;
  if (!entry) return undefined;
  const fromDisplay = entry.display?.color;
  if (typeof fromDisplay === "string") return fromDisplay;
  if (typeof entry.color === "string") return entry.color;
  return undefined;
}

export function colorFromRegistryEntry(
  entry: EntityRegistryEntryLike | null | undefined
): string | undefined {
  const color = entry?.options?.calendar?.color;
  return typeof color === "string" ? color : undefined;
}

/**
 * Load per-calendar colors from the entity registry (same source as HA's
 * built-in calendar card). Falls back silently on older HA / missing WS.
 */
export async function fetchCalendarColorsFromRegistry(
  hass: HomeAssistant,
  entityIds: string[]
): Promise<CalendarColorMap> {
  const unique = [...new Set(entityIds.filter(Boolean))];
  const out: CalendarColorMap = {};
  if (!unique.length) return out;

  try {
    const entries = await hass.callWS<
      Record<string, EntityRegistryEntryLike | null>
    >({
      type: "config/entity_registry/get_entries",
      entity_ids: unique,
    });
    for (const id of unique) {
      const color = colorFromRegistryEntry(entries?.[id]);
      if (isUsableCalendarColor(color)) {
        out[id] = toCssCalendarColor(color);
      }
    }
    return out;
  } catch {
    // Older cores may only expose list — try that next
  }

  try {
    const list = await hass.callWS<EntityRegistryEntryLike[]>({
      type: "config/entity_registry/list",
    });
    const byId = new Map(
      (list ?? [])
        .filter((e) => e?.entity_id)
        .map((e) => [e.entity_id as string, e])
    );
    for (const id of unique) {
      const color = colorFromRegistryEntry(byId.get(id));
      if (isUsableCalendarColor(color)) {
        out[id] = toCssCalendarColor(color);
      }
    }
  } catch {
    // No registry access — caller keeps palette fallbacks
  }

  return out;
}

export function buildCalendarColorMap(
  entityIds: string[],
  registryColors: CalendarColorMap,
  hass?: HomeAssistant
): CalendarColorMap {
  const map: CalendarColorMap = {};
  entityIds.forEach((id, idx) => {
    map[id] = resolveCalendarColor(id, idx, registryColors[id], hass);
  });
  return map;
}
