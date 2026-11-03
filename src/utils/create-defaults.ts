import { DAY_END_HOUR, DAY_START_HOUR } from "../const";

export interface TimedCreateRange {
  start: Date;
  end: Date;
}

function sameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Sensible timed create window for a selected day (month double-click, day view
 * Add Event, etc.): next whole hour / +1h on that date — not "today" unless the
 * selected day is today.
 */
export function defaultTimedRangeForDay(
  day: Date,
  opts?: { dayStartHour?: number; dayEndHour?: number; now?: Date }
): TimedCreateRange {
  const now = opts?.now ?? new Date();
  const dayStart = opts?.dayStartHour ?? DAY_START_HOUR;
  const dayEnd = opts?.dayEndHour ?? DAY_END_HOUR;

  const start = new Date(day);
  start.setHours(0, 0, 0, 0);

  // Ceil to the next whole hour from "now"'s clock, applied on the selected day.
  let hour = now.getHours() + 1;
  if (!sameCalendarDay(start, now)) {
    // Other day: keep a daytime default when "next hour" would be odd overnight.
    if (hour < dayStart) hour = Math.max(dayStart, 9);
  }

  const lastStartHour = Math.max(dayStart, dayEnd - 2);
  if (hour > lastStartHour) hour = lastStartHour;
  if (hour < dayStart) hour = dayStart;

  start.setHours(hour, 0, 0, 0);
  const end = new Date(start);
  end.setHours(hour + 1, 0, 0, 0);
  return { start, end };
}

/** Floating local wall time for HA calendar create (no Z / offset). */
export function toFloatingLocal(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}
