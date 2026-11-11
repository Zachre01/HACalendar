import { CARD_NAME } from "../const";
import type { HaCalendarCardConfig, HomeAssistant } from "../types";

/** Browser fallback so navigate-away/back keeps calendars even before Lovelace save. */
export const ENTITIES_STORAGE_PREFIX = "ha-calendar-card-entities:";

export type PersistEntitiesResult = {
  local: boolean;
  lovelace: "saved" | "yaml" | "skipped" | "error";
  detail?: string;
};

function cardTypeMatches(type: unknown): boolean {
  return type === `custom:${CARD_NAME}` || type === CARD_NAME;
}

function entitiesEqual(a?: string[] | null, b?: string[] | null): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return a.every((id, i) => id === b[i]);
}

/** Storage key scoped to dashboard path + optional card title. */
export function entitiesStorageKey(config: HaCalendarCardConfig): string {
  const path =
    typeof location !== "undefined" ? location.pathname || "/" : "/";
  const title = (config.title ?? "").trim();
  const id = (config as { hac_id?: string }).hac_id?.trim();
  return `${ENTITIES_STORAGE_PREFIX}${path}::${id || title || "default"}`;
}

export function readStoredEntities(
  config: HaCalendarCardConfig
): string[] | null {
  try {
    const raw = localStorage.getItem(entitiesStorageKey(config));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { entities?: unknown };
    if (!Array.isArray(parsed?.entities)) return null;
    const entities = parsed.entities.filter(
      (id): id is string => typeof id === "string" && id.startsWith("calendar.")
    );
    return entities.length ? entities : null;
  } catch {
    return null;
  }
}

export function writeStoredEntities(
  config: HaCalendarCardConfig,
  entities: string[],
  /** Lovelace entities snapshot before this edit — used to detect stale dashboard config. */
  fingerprint?: string[]
): boolean {
  try {
    localStorage.setItem(
      entitiesStorageKey(config),
      JSON.stringify({
        entities,
        updatedAt: Date.now(),
        fingerprint: fingerprint ?? entities,
      })
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Prefer stored entities when the Lovelace/YAML config still looks like the
 * pre-edit snapshot we wrote from. If the user edited YAML to something else,
 * respect that and refresh storage.
 */
/**
 * Configured calendar ids Home Assistant is no longer publishing.
 * Skipped until states look loaded, so a half-connected hass object
 * cannot wipe the card.
 */
export function missingCalendarIds(
  configured: string[],
  stateIds: readonly string[]
): string[] {
  const loaded =
    stateIds.length >= 10 || stateIds.some((id) => id.startsWith("calendar."));
  if (!loaded) return [];
  const live = new Set(stateIds);
  return configured.filter(
    (id) => id.startsWith("calendar.") && !live.has(id)
  );
}

export function mergeEntitiesOnLoad(
  config: HaCalendarCardConfig
): string[] | undefined {
  const configured = Array.isArray(config.entities)
    ? [...config.entities]
    : undefined;
  const stored = readStoredEntities(config);
  if (!stored?.length) return configured;
  if (!configured?.length) return stored;

  let fingerprint: string[] | undefined;
  try {
    const raw = localStorage.getItem(entitiesStorageKey(config));
    const parsed = raw
      ? (JSON.parse(raw) as { fingerprint?: string[] })
      : null;
    if (Array.isArray(parsed?.fingerprint)) fingerprint = parsed.fingerprint;
  } catch {
    fingerprint = undefined;
  }

  // Runtime edits: Lovelace still has the entities list from when we last saved
  // to localStorage (save may still be in flight / YAML-mode).
  if (fingerprint && entitiesEqual(fingerprint, configured)) {
    return stored;
  }

  // Also restore when storage is a strict superset (Lovelace save lagged).
  if (
    configured.every((id) => stored.includes(id)) &&
    stored.length > configured.length
  ) {
    return stored;
  }

  // User changed YAML/UI config independently — follow that and resync cache.
  writeStoredEntities(config, configured);
  return configured;
}

/** Default dashboard uses null; custom dashboards use first path segment. */
export function lovelaceUrlPathFromLocation(
  pathname = typeof location !== "undefined" ? location.pathname : "/"
): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return null;
  if (parts[0] === "lovelace") return null;
  return parts[0];
}

type LovelaceCardLike = {
  type?: string;
  entities?: string[];
  cards?: LovelaceCardLike[];
  card?: LovelaceCardLike;
  views?: unknown[];
  sections?: Array<{ cards?: LovelaceCardLike[] }>;
  [key: string]: unknown;
};

type LovelaceConfigLike = {
  views?: Array<{
    cards?: LovelaceCardLike[];
    sections?: Array<{ cards?: LovelaceCardLike[] }>;
    type?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};

function patchOurCard(
  card: LovelaceCardLike,
  oldEntities: string[] | undefined,
  nextEntities: string[],
  nextConfig: HaCalendarCardConfig,
  matchAllIfUnique: { count: number; matched: number }
): boolean {
  if (!cardTypeMatches(card.type)) return false;
  matchAllIfUnique.count += 1;
  const same =
    entitiesEqual(card.entities, oldEntities) ||
    entitiesEqual(card.entities, nextEntities);
  if (!same && oldEntities) {
    // Defer: may still patch if this is the only our-card on the dashboard
    return false;
  }
  Object.assign(card, {
    ...card,
    ...pickPersistableConfig(nextConfig),
    entities: [...nextEntities],
    type: card.type ?? `custom:${CARD_NAME}`,
  });
  matchAllIfUnique.matched += 1;
  return true;
}

/** Fields safe to write back into Lovelace card config. */
function pickPersistableConfig(
  config: HaCalendarCardConfig
): Partial<HaCalendarCardConfig> {
  const out: Partial<HaCalendarCardConfig> = {
    type: config.type ?? `custom:${CARD_NAME}`,
  };
  if (config.title !== undefined) out.title = config.title;
  if (config.entities) out.entities = [...config.entities];
  if (config.initial_view) out.initial_view = config.initial_view;
  if (config.theme) out.theme = config.theme;
  if (config.day_start_hour !== undefined)
    out.day_start_hour = config.day_start_hour;
  if (config.day_end_hour !== undefined) out.day_end_hour = config.day_end_hour;
  if (config.month_max_events !== undefined)
    out.month_max_events = config.month_max_events;
  if (config.weather_entity) out.weather_entity = config.weather_entity;
  if (config.reminder_notify_service)
    out.reminder_notify_service = config.reminder_notify_service;
  if (config.reminder_minutes_before !== undefined)
    out.reminder_minutes_before = config.reminder_minutes_before;
  return out;
}

function walkCards(
  cards: LovelaceCardLike[] | undefined,
  visitor: (card: LovelaceCardLike) => boolean
): boolean {
  if (!Array.isArray(cards)) return false;
  let any = false;
  for (const card of cards) {
    if (!card || typeof card !== "object") continue;
    if (visitor(card)) any = true;
    if (Array.isArray(card.cards) && walkCards(card.cards, visitor)) any = true;
    if (card.card && typeof card.card === "object") {
      if (visitor(card.card)) any = true;
      if (Array.isArray(card.card.cards) && walkCards(card.card.cards, visitor))
        any = true;
    }
  }
  return any;
}

/**
 * Mutate a Lovelace config in place, updating matching ha-calendar-card entries.
 * Returns whether any card was updated.
 */
export function patchLovelaceConfigEntities(
  lovelace: LovelaceConfigLike,
  oldEntities: string[] | undefined,
  nextConfig: HaCalendarCardConfig
): boolean {
  const nextEntities = nextConfig.entities ?? [];
  const stats = { count: 0, matched: 0 };

  const tryPatch = (card: LovelaceCardLike): boolean =>
    patchOurCard(card, oldEntities, nextEntities, nextConfig, stats);

  // First pass: exact entity-list match
  let changed = false;
  for (const view of lovelace.views ?? []) {
    if (walkCards(view.cards, tryPatch)) changed = true;
    for (const section of view.sections ?? []) {
      if (walkCards(section.cards, tryPatch)) changed = true;
    }
  }

  if (changed) return true;

  // Second pass: if exactly one of our cards exists, update it
  const only: LovelaceCardLike[] = [];
  const collect = (card: LovelaceCardLike): boolean => {
    if (cardTypeMatches(card.type)) only.push(card);
    return false;
  };
  for (const view of lovelace.views ?? []) {
    walkCards(view.cards, collect);
    for (const section of view.sections ?? []) {
      walkCards(section.cards, collect);
    }
  }
  if (only.length === 1) {
    Object.assign(only[0], {
      ...only[0],
      ...pickPersistableConfig(nextConfig),
      entities: [...nextEntities],
      type: only[0].type ?? `custom:${CARD_NAME}`,
    });
    return true;
  }
  return false;
}

/**
 * Persist calendar entity list:
 * 1) localStorage (immediate, navigate-away safe)
 * 2) Lovelace `config-changed` (editor / some hosts)
 * 3) `lovelace/config` + `lovelace/config/save` for UI storage dashboards
 */
export async function persistCardEntities(options: {
  hass?: HomeAssistant;
  host: HTMLElement;
  previousEntities: string[] | undefined;
  nextConfig: HaCalendarCardConfig;
}): Promise<PersistEntitiesResult> {
  const { hass, host, previousEntities, nextConfig } = options;
  const entities = nextConfig.entities ?? [];
  // Fingerprint = pre-edit Lovelace list so navigate-away restores when save lags.
  const local = writeStoredEntities(
    nextConfig,
    entities,
    previousEntities ?? entities
  );

  host.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: { ...nextConfig, entities: [...entities] } },
      bubbles: true,
      composed: true,
    })
  );

  if (!hass?.callWS) {
    return { local, lovelace: "skipped", detail: "no callWS" };
  }

  const urlPath = lovelaceUrlPathFromLocation();
  try {
    const current = await hass.callWS<LovelaceConfigLike>({
      type: "lovelace/config",
      url_path: urlPath,
      force: false,
    });

    // Deep clone so we don't mutate WS-cached objects oddly
    const draft = JSON.parse(JSON.stringify(current)) as LovelaceConfigLike;
    const patched = patchLovelaceConfigEntities(
      draft,
      previousEntities,
      nextConfig
    );
    if (!patched) {
      return {
        local,
        lovelace: "skipped",
        detail: "card not found in lovelace config",
      };
    }

    await hass.callWS({
      type: "lovelace/config/save",
      url_path: urlPath,
      config: draft,
    });
    // Align fingerprint with saved Lovelace so later YAML edits are respected.
    writeStoredEntities(nextConfig, entities, entities);
    return { local, lovelace: "saved" };
  } catch (err) {
    const message =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: unknown }).message)
        : String(err);
    // YAML-mode dashboards reject save — browser storage still keeps this session.
    if (/yaml|read-only|not supported|cannot save/i.test(message)) {
      return { local, lovelace: "yaml", detail: message };
    }
    return { local, lovelace: "error", detail: message };
  }
}
