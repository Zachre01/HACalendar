/**
 * Persist “completed” on the same HA calendar event.
 *
 * Per-day (preferred): description lines `hac-done:YYYY-MM-DD` (one date each).
 * Chip toggles and the form (with a day context) add/remove a single day so
 * multi-day events can be done on some days and not others.
 *
 * Legacy whole-event: summary starts with `✓ ` (U+2713 CHECK MARK + space),
 * or alternate `[done] `. Still recognized on read; new writes use per-day
 * markers. Unchecking one day of a legacy-done span expands the rest into
 * per-day markers and clears the title prefix.
 */

export const DONE_TITLE_PREFIX = "✓ ";
const DONE_TITLE_PREFIX_ALT = "[done] ";

/** Sentinel line stored in the HA event description (hidden in the card UI). */
export const DONE_DAY_LINE_PREFIX = "hac-done:";

const DONE_DAY_LINE_RE = /^hac-done:(\d{4}-\d{2}-\d{2})\s*$/;

export interface ParsedDoneSummary {
  /** True when the raw title had a whole-event done prefix. */
  legacyTitleDone: boolean;
  displaySummary: string;
}

export interface ParsedDoneDescription {
  cleanDescription: string;
  doneDates: string[];
}

/** Format a local Date as YYYY-MM-DD. */
export function formatDayKey(day: Date): string {
  const y = day.getFullYear();
  const m = String(day.getMonth() + 1).padStart(2, "0");
  const d = String(day.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfLocalDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function parseEventDate(value: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, day] = value.split("-").map(Number);
    return new Date(y, m - 1, day);
  }
  return new Date(value);
}

/**
 * Calendar days the event touches (all-day end is exclusive, same as HA).
 * Always includes at least the start day.
 */
export function listEventDayKeys(ev: {
  start: string;
  end: string;
}): string[] {
  const start = parseEventDate(ev.start);
  const end = parseEventDate(ev.end);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return [ev.start.slice(0, 10)];
  }
  const keys: string[] = [];
  let cursor = startOfLocalDay(start);
  const rangeEnd = end;
  while (cursor < rangeEnd) {
    keys.push(formatDayKey(cursor));
    cursor = addDays(cursor, 1);
    if (keys.length > 366) break;
  }
  if (keys.length === 0) {
    keys.push(formatDayKey(startOfLocalDay(start)));
  }
  return keys;
}

/** Detect and strip a done marker from a raw HA summary. */
export function parseDoneSummary(summary: string): ParsedDoneSummary {
  const raw = summary ?? "";
  if (raw.startsWith(DONE_TITLE_PREFIX)) {
    return {
      legacyTitleDone: true,
      displaySummary: raw.slice(DONE_TITLE_PREFIX.length).trimStart() || "(no title)",
    };
  }
  const lower = raw.toLowerCase();
  if (lower.startsWith(DONE_TITLE_PREFIX_ALT)) {
    return {
      legacyTitleDone: true,
      displaySummary:
        raw.slice(DONE_TITLE_PREFIX_ALT.length).trimStart() || "(no title)",
    };
  }
  return { legacyTitleDone: false, displaySummary: raw || "(no title)" };
}

/** Apply or remove the canonical `✓ ` marker (legacy whole-event writes only). */
export function applyDoneMarker(
  displaySummary: string,
  completed: boolean
): string {
  const clean = parseDoneSummary(displaySummary).displaySummary;
  if (!completed) return clean;
  return `${DONE_TITLE_PREFIX}${clean}`;
}

/** Strip `hac-done:` lines; return clean description + sorted unique dates. */
export function parseDoneDescription(
  description: string | null | undefined
): ParsedDoneDescription {
  const raw = description ?? "";
  if (!raw) return { cleanDescription: "", doneDates: [] };
  const done = new Set<string>();
  const kept: string[] = [];
  for (const line of raw.split("\n")) {
    const m = DONE_DAY_LINE_RE.exec(line);
    if (m) {
      done.add(m[1]);
    } else {
      kept.push(line);
    }
  }
  // Trim trailing blank lines left by removed sentinels
  while (kept.length && kept[kept.length - 1].trim() === "") {
    kept.pop();
  }
  return {
    cleanDescription: kept.join("\n"),
    doneDates: [...done].sort(),
  };
}

/** Append sorted `hac-done:` lines to a clean (marker-free) description. */
export function applyDoneDates(
  cleanDescription: string | undefined,
  doneDates: Iterable<string>
): string {
  const dates = [...new Set(doneDates)]
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort();
  const body = (cleanDescription ?? "").replace(/\s+$/, "");
  if (dates.length === 0) return body;
  const markers = dates.map((d) => `${DONE_DAY_LINE_PREFIX}${d}`).join("\n");
  return body ? `${body}\n${markers}` : markers;
}

export interface DoneAwareEvent {
  start: string;
  end: string;
  doneDates?: string[];
  /** Title had whole-event `✓ ` / `[done] ` when loaded. */
  legacyTitleDone?: boolean;
}

/** Whether the event should render as Done on the given local day. */
export function isDoneOnDay(ev: DoneAwareEvent, dayKey: string): boolean {
  if (ev.doneDates?.includes(dayKey)) return true;
  if (ev.legacyTitleDone) return true;
  return false;
}

/**
 * Effective done-date set for writes: explicit per-day markers, or every day
 * in the span when only the legacy title prefix is set.
 */
export function effectiveDoneDates(ev: DoneAwareEvent): string[] {
  if (ev.doneDates && ev.doneDates.length > 0) {
    return [...ev.doneDates];
  }
  if (ev.legacyTitleDone) {
    return listEventDayKeys(ev);
  }
  return [];
}

export interface ToggleDayDoneResult {
  /** Display summary (never includes `✓ `). */
  summary: string;
  /** Description with `hac-done:` lines applied. */
  description: string;
  doneDates: string[];
  /** Always false after a day-scoped write (migrated off title prefix). */
  legacyTitleDone: false;
}

/**
 * Toggle Done for one calendar day. Clears legacy title-done by expanding
 * other span days into per-day markers when needed.
 */
export function toggleDayDone(
  ev: DoneAwareEvent & { summary: string; description?: string },
  dayKey: string,
  nextDone: boolean
): ToggleDayDoneResult {
  const set = new Set(effectiveDoneDates(ev));
  if (nextDone) {
    set.add(dayKey);
  } else {
    set.delete(dayKey);
  }
  // Drop dates outside the current span
  const span = new Set(listEventDayKeys(ev));
  for (const d of [...set]) {
    if (!span.has(d)) set.delete(d);
  }
  const doneDates = [...set].sort();
  const cleanDescription = parseDoneDescription(ev.description).cleanDescription;
  return {
    summary: parseDoneSummary(ev.summary).displaySummary,
    description: applyDoneDates(cleanDescription, doneDates),
    doneDates,
    legacyTitleDone: false,
  };
}

/**
 * Apply form Done checkbox for a single day context onto existing markers.
 * `cleanDescription` is the user-edited body (no sentinels).
 */
export function applyFormDoneForDay(
  ev: DoneAwareEvent | null | undefined,
  dayKey: string,
  completed: boolean,
  cleanDescription: string | undefined,
  spanStart: string,
  spanEnd: string
): { doneDates: string[]; description: string } {
  const set = new Set(
    ev ? effectiveDoneDates(ev) : completed ? [dayKey] : []
  );
  if (!ev) {
    // create
    if (completed) set.add(dayKey);
    else set.clear();
  } else if (completed) {
    set.add(dayKey);
  } else {
    set.delete(dayKey);
  }
  const span = new Set(listEventDayKeys({ start: spanStart, end: spanEnd }));
  for (const d of [...set]) {
    if (!span.has(d)) set.delete(d);
  }
  const doneDates = [...set].sort();
  return {
    doneDates,
    description: applyDoneDates(cleanDescription, doneDates),
  };
}
