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

export function parseRruleUntil(rrule: string | undefined | null): string {
  if (!rrule) return "";
  const m = /UNTIL=(\d{8})/i.exec(rrule);
  if (!m) return "";
  const raw = m[1];
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

/** Build an HA websocket rrule string (or undefined for one-off). */
export function buildRrule(opts: {
  freq: RecurrenceFreq;
  startIso: string;
  untilDate?: string;
}): string | undefined {
  if (opts.freq === "none") return undefined;
  const parts = [`FREQ=${opts.freq.toUpperCase()}`];
  if (opts.freq === "weekly") {
    const d = /^\d{4}-\d{2}-\d{2}$/.test(opts.startIso)
      ? new Date(`${opts.startIso}T12:00:00`)
      : new Date(opts.startIso);
    if (!Number.isNaN(d.getTime())) {
      parts.push(`BYDAY=${weekdayCode(d)}`);
    }
  }
  if (opts.untilDate && /^\d{4}-\d{2}-\d{2}$/.test(opts.untilDate)) {
    parts.push(`UNTIL=${opts.untilDate.replace(/-/g, "")}`);
  }
  return parts.join(";");
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
