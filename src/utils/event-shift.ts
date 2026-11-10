import {
  effectiveDoneDates,
  formatDayKey,
  listEventDayKeys,
} from "./event-done";

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export interface ShiftableEvent {
  start: string;
  end: string;
  all_day?: boolean;
  doneDates?: string[];
  legacyTitleDone?: boolean;
}

export interface ShiftedEventDates {
  start: string;
  end: string;
  /** Per-day Done marks, shifted with the event and clipped to the new span. */
  doneDates: string[];
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function keyToDate(dayKey: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dayKey);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

/** Whole local calendar days from `fromDay` to `toDay` (negative when moving earlier). */
export function dayDelta(fromDay: string, toDay: string): number | null {
  const from = keyToDate(fromDay);
  const to = keyToDate(toDay);
  if (!from || !to) return null;
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function addDaysToKey(dayKey: string, deltaDays: number): string {
  const parsed = keyToDate(dayKey.slice(0, 10));
  if (!parsed) return dayKey;
  parsed.setDate(parsed.getDate() + deltaDays);
  return formatDayKey(parsed);
}

function formatFloating(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/**
 * Shift a HA calendar start/end by whole local days.
 * Date-only values stay date-only. Floating local wall times keep their clock.
 * Offset / Z values move by local calendar day and stay instants (`toISOString`).
 */
export function shiftCalendarDate(value: string, deltaDays: number): string {
  if (deltaDays === 0) return value;
  if (DATE_ONLY.test(value)) return addDaysToKey(value, deltaDays);

  const hasZone = /(?:[zZ]|[+-]\d{2}:?\d{2})$/.test(value);
  const floating =
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/.exec(value);
  if (floating && !hasZone) {
    const shifted = new Date(
      Number(floating[1]),
      Number(floating[2]) - 1,
      Number(floating[3]) + deltaDays,
      Number(floating[4]),
      Number(floating[5]),
      Number(floating[6] ?? 0)
    );
    return formatFloating(shifted);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    const day = value.slice(0, 10);
    if (DATE_ONLY.test(day)) return addDaysToKey(day, deltaDays) + value.slice(10);
    return value;
  }
  parsed.setDate(parsed.getDate() + deltaDays);
  return hasZone ? parsed.toISOString() : formatFloating(parsed);
}

/**
 * Move an event from the grabbed day cell to the drop day.
 * Time of day and duration stay the same. Multi-day events shift as a whole
 * (the grabbed day is the anchor, not necessarily the start).
 * Returns null when the drop is the same day or the day keys are invalid.
 */
export function shiftEventDates(
  ev: ShiftableEvent,
  fromDay: string,
  toDay: string
): ShiftedEventDates | null {
  const delta = dayDelta(fromDay, toDay);
  if (delta === null || delta === 0) return null;

  const allDay =
    Boolean(ev.all_day) ||
    (DATE_ONLY.test(ev.start) && DATE_ONLY.test(ev.end));
  const start = allDay
    ? addDaysToKey(ev.start.slice(0, 10), delta)
    : shiftCalendarDate(ev.start, delta);
  const end = allDay
    ? addDaysToKey(ev.end.slice(0, 10), delta)
    : shiftCalendarDate(ev.end, delta);

  const source =
    ev.doneDates && ev.doneDates.length > 0
      ? ev.doneDates
      : effectiveDoneDates(ev);
  const span = new Set(listEventDayKeys({ start, end }));
  const doneDates = [
    ...new Set(
      source
        .map((day) => addDaysToKey(day, delta))
        .filter((day) => span.has(day))
    ),
  ].sort();

  return { start, end, doneDates };
}
