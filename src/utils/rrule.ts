/** Simple RRULE helpers for create/edit UI (RFC 5545, no RRULE: prefix). */

export type RecurrenceFreq = "none" | "daily" | "weekly" | "monthly" | "yearly";

export type RecurrenceEditScope = "this" | "future" | "series";

const WEEKDAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;

export function weekdayCode(date: Date): string {
  return WEEKDAYS[date.getDay()];
}

export function parseRruleFreq(rrule: string | undefined | null): RecurrenceFreq {
  if (!rrule) return "none";
  const m = /FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)/i.exec(rrule);
  if (!m) return "none";
  return m[1].toLowerCase() as RecurrenceFreq;
}

/** Extract YYYY-MM-DD from UNTIL=YYYYMMDD or UNTIL=YYYYMMDDTHHMMSS(Z?). */
export function parseRruleUntil(rrule: string | undefined | null): string {
  if (!rrule) return "";
  const m = /UNTIL=(\d{8})(?:T\d{6}Z?)?/i.exec(rrule);
  if (!m) return "";
  const raw = m[1];
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

function isDateOnly(iso: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso);
}

/** HHMMSS from floating/ISO start for timed UNTIL (matches HA frontend). */
function untilTimeFromStart(startIso: string): string {
  const m = /T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(startIso);
  if (m) {
    return `${m[1]}${m[2]}${m[3] ?? "00"}`;
  }
  const d = new Date(startIso);
  if (Number.isNaN(d.getTime())) return "000000";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function startAsLocalDate(startIso: string): Date {
  if (isDateOnly(startIso)) {
    return new Date(`${startIso}T12:00:00`);
  }
  // Floating local (no Z) — parse as local wall time
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(
    startIso
  );
  if (m) {
    return new Date(
      Number(m[1]),
      Number(m[2]) - 1,
      Number(m[3]),
      Number(m[4]),
      Number(m[5]),
      Number(m[6] ?? "0")
    );
  }
  return new Date(startIso);
}

/**
 * Build an HA websocket rrule string (or undefined for one-off).
 * Timed events use UNTIL=YYYYMMDDTHHMMSS (same clock as dtstart) — date-only
 * UNTIL with a datetime dtstart is rejected by Local Calendar / ical.
 */
export function buildRrule(opts: {
  freq: RecurrenceFreq;
  startIso: string;
  untilDate?: string;
}): string | undefined {
  if (opts.freq === "none") return undefined;
  const parts = [`FREQ=${opts.freq.toUpperCase()}`];
  if (opts.freq === "weekly") {
    const d = startAsLocalDate(opts.startIso);
    if (!Number.isNaN(d.getTime())) {
      parts.push(`BYDAY=${weekdayCode(d)}`);
    }
  }
  if (opts.untilDate && /^\d{4}-\d{2}-\d{2}$/.test(opts.untilDate)) {
    const untilDay = opts.untilDate.replace(/-/g, "");
    if (isDateOnly(opts.startIso)) {
      parts.push(`UNTIL=${untilDay}`);
    } else {
      parts.push(`UNTIL=${untilDay}T${untilTimeFromStart(opts.startIso)}`);
    }
  }
  return parts.join(";");
}

/** True when optional until date is strictly before the event start day. */
export function isUntilBeforeStart(
  untilDate: string | undefined,
  startIso: string
): boolean {
  if (!untilDate || !/^\d{4}-\d{2}-\d{2}$/.test(untilDate)) return false;
  const startDay = startIso.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDay)) return false;
  return untilDate < startDay;
}

/**
 * For repeating timed events, keep end on the same calendar day as start
 * (each occurrence uses that duration). Preserves end clock time when possible.
 */
export function normalizeRecurringTimedEnd(
  startLocal: string,
  endLocal: string
): { end: string; adjusted: boolean } {
  const startDay = startLocal.slice(0, 10);
  const endDay = endLocal.slice(0, 10);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(startDay) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(endDay) ||
    startDay === endDay
  ) {
    return { end: endLocal, adjusted: false };
  }
  const endTime = endLocal.includes("T")
    ? endLocal.slice(11, 16)
    : "10:00";
  let next = `${startDay}T${endTime}`;
  if (next <= startLocal.slice(0, 16)) {
    // End time not after start — bump one hour from start
    const d = startAsLocalDate(
      startLocal.length === 16 ? `${startLocal}:00` : startLocal
    );
    d.setHours(d.getHours() + 1);
    const pad = (n: number) => String(n).padStart(2, "0");
    next = `${startDay}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  return { end: next, adjusted: true };
}

/** Short label for chips / tooltips */
export function rruleShortLabel(rrule: string | undefined | null): string {
  const freq = parseRruleFreq(rrule);
  switch (freq) {
    case "daily":
      return "Daily";
    case "weekly":
      return "Weekly";
    case "monthly":
      return "Monthly";
    case "yearly":
      return "Yearly";
    default:
      return rrule ? "Repeats" : "";
  }
}
