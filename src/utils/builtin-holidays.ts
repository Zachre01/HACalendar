import type { CalendarEvent } from "../types";
import { isUsableCalendarColor, toCssCalendarColor } from "./calendar-colors";
import { formatDayKey } from "./event-done";

/** Synthetic calendar id. Not a Home Assistant entity. */
export const BUILTIN_HOLIDAY_CALENDAR = "calendar._hac_holidays";

/** Rose, distinct from the green bill calendars. */
export const BUILTIN_HOLIDAY_COLOR = "#D4537E";

export const BUILTIN_HOLIDAY_LABEL = "US holidays";

/** Card config color, or the default rose when the value is blank or invalid. */
export function resolveHolidayColor(raw: string | undefined): string {
  if (typeof raw === "string" && isUsableCalendarColor(raw)) {
    return toCssCalendarColor(raw);
  }
  return BUILTIN_HOLIDAY_COLOR;
}

interface HolidayDate {
  name: string;
  date: Date;
  /** Federal and US-specific observances. Omitted for other countries. */
  usOnly?: boolean;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + n);
  return x;
}

function nthWeekday(
  year: number,
  monthIndex: number,
  weekday: number,
  n: number
): Date {
  const first = new Date(year, monthIndex, 1);
  const delta = (weekday - first.getDay() + 7) % 7;
  return new Date(year, monthIndex, 1 + delta + (n - 1) * 7);
}

function lastWeekday(year: number, monthIndex: number, weekday: number): Date {
  const last = new Date(year, monthIndex + 1, 0);
  const delta = (last.getDay() - weekday + 7) % 7;
  return new Date(year, monthIndex, last.getDate() - delta);
}

/** Saturday → Friday, Sunday → Monday. Weekday dates stay put. */
function observed(actual: Date): Date {
  const day = actual.getDay();
  if (day === 6) return addDays(actual, -1);
  if (day === 0) return addDays(actual, 1);
  return actual;
}

/** Anonymous Gregorian computus. Month is 1–12. */
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function fixed(list: HolidayDate[], name: string, date: Date, usOnly = false): void {
  list.push({ name, date, usOnly });
}

function withObserved(
  list: HolidayDate[],
  name: string,
  actual: Date,
  usOnly: boolean
): void {
  fixed(list, name, actual, usOnly);
  const off = observed(actual);
  if (off.getTime() !== actual.getTime()) {
    fixed(list, `${name} (observed)`, off, true);
  }
}

/** US public holidays plus common observances, for any year. */
export function holidaysForYear(year: number): HolidayDate[] {
  const list: HolidayDate[] = [];
  withObserved(list, "New Year's Day", new Date(year, 0, 1), false);
  fixed(list, "Martin Luther King Jr. Day", nthWeekday(year, 0, 1, 3), true);
  fixed(list, "Valentine's Day", new Date(year, 1, 14));
  fixed(list, "Presidents Day", nthWeekday(year, 1, 1, 3), true);
  fixed(list, "St. Patrick's Day", new Date(year, 2, 17), true);
  fixed(list, "Easter", easterSunday(year));
  fixed(list, "Mother's Day", nthWeekday(year, 4, 0, 2), true);
  fixed(list, "Memorial Day", lastWeekday(year, 4, 1), true);
  withObserved(list, "Juneteenth", new Date(year, 5, 19), true);
  fixed(list, "Father's Day", nthWeekday(year, 5, 0, 3), true);
  withObserved(list, "Independence Day", new Date(year, 6, 4), true);
  fixed(list, "Labor Day", nthWeekday(year, 8, 1, 1), true);
  fixed(list, "Columbus Day", nthWeekday(year, 9, 1, 2), true);
  fixed(list, "Halloween", new Date(year, 9, 31));
  withObserved(list, "Veterans Day", new Date(year, 10, 11), true);
  fixed(list, "Thanksgiving", nthWeekday(year, 10, 4, 4), true);
  fixed(list, "Christmas Eve", new Date(year, 11, 24));
  withObserved(list, "Christmas Day", new Date(year, 11, 25), false);
  fixed(list, "New Year's Eve", new Date(year, 11, 31));
  return list;
}

function dayTime(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

/** Names that mean the same holiday, so a Home Assistant copy is not drawn twice. */
const HOLIDAY_ALIASES: Record<string, string[]> = {
  "presidents day": ["washington's birthday", "presidents' day", "president's day"],
  "martin luther king jr. day": ["mlk day", "martin luther king day"],
  juneteenth: ["juneteenth national independence day"],
  "independence day": ["july 4th", "fourth of july"],
  "new year's day": ["new years day"],
  "christmas day": ["christmas"],
  "veterans day": ["veteran's day"],
};

export function holidayNameKeys(summary: string): string[] {
  const key = summary.trim().toLowerCase().replace(/\s+\(observed\)$/, "");
  const names = new Set<string>([summary.trim().toLowerCase(), key]);
  for (const [canonical, aliases] of Object.entries(HOLIDAY_ALIASES)) {
    if (key === canonical || aliases.includes(key)) {
      names.add(canonical);
      for (const alias of aliases) names.add(alias);
    }
  }
  return [...names];
}

function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * All-day holiday events that fall in [rangeStart, rangeEnd).
 * `country` defaults to US. Other countries still get the shared days
 * (New Year, Valentine's Day, Easter, Halloween, Christmas).
 */
export function builtinHolidayEvents(
  rangeStart: Date,
  rangeEnd: Date,
  country = "US"
): CalendarEvent[] {
  const us = country.toUpperCase() === "US";
  const start = dayTime(rangeStart);
  const end = dayTime(rangeEnd);
  const events: CalendarEvent[] = [];
  for (let year = rangeStart.getFullYear(); year <= rangeEnd.getFullYear(); year++) {
    for (const holiday of holidaysForYear(year)) {
      if (!us && holiday.usOnly) continue;
      const when = dayTime(holiday.date);
      if (when < start || when >= end) continue;
      const startKey = formatDayKey(holiday.date);
      const endKey = formatDayKey(addDays(holiday.date, 1));
      events.push({
        uid: `hac-holiday:${startKey}:${slug(holiday.name)}`,
        summary: holiday.name,
        start: startKey,
        end: endKey,
        all_day: true,
        calendar: BUILTIN_HOLIDAY_CALENDAR,
        readonly: true,
      });
    }
  }
  return events;
}
