export type CalendarViewMode = "day" | "week" | "month";
export type ThemeMode = "light" | "dark" | "auto";

export interface HaCalendarCardConfig {
  type: string;
  title?: string;
  /** calendar.* entity ids to show; placeholders OK */
  entities?: string[];
  initial_view?: CalendarViewMode;
  /**
   * Color theme. `auto` follows the system preference.
   * User toggle also persists to localStorage and overrides until cleared.
   */
  theme?: ThemeMode;
  /** Hour grid bounds (inclusive start, exclusive end) */
  day_start_hour?: number;
  day_end_hour?: number;
  /**
   * Max event chips per day in month view before “+N more”.
   * Defaults to `MONTH_MAX_VISIBLE_EVENTS` (6).
   */
  month_max_events?: number;
  /** When true, show demo blocks if HA returns no events (dev only) */
  show_demo_when_empty?: boolean;
  /**
   * Optional weather.* entity for header + month chips.
   * Canonical key. Alias: `weather`.
   */
  weather_entity?: string;
  /** Alias for `weather_entity` (accepted for convenience). */
  weather?: string;
  /** Default notify.* target for Phase 2 reminder hooks */
  reminder_notify_service?: string;
  /** Default minutes-before for new reminders */
  reminder_minutes_before?: number;
}

/** Per-event reminder rule (ha_calendar_reminders integration) */
export interface ReminderRule {
  rule_id: string;
  calendar_entity_id: string;
  event_uid: string;
  event_start: string;
  event_summary: string;
  minutes_before: number;
  notify_service: string;
  message: string;
  enabled: boolean;
  last_fired?: string | null;
}

export interface ReminderRuleInput {
  calendar_entity_id: string;
  event_uid: string;
  event_start: string;
  event_summary?: string;
  minutes_before: number;
  notify_service: string;
  message?: string;
  enabled?: boolean;
}

export interface ReminderFormState {
  enabled: boolean;
  minutes_before: number;
  notify_service: string;
  message: string;
}

/** Minimal HA event shape used by the card */
export interface CalendarEvent {
  uid: string;
  /** Display title with done marker stripped */
  summary: string;
  /** Description with `hac-done:` sentinel lines stripped */
  description?: string;
  location?: string;
  start: string; // ISO or HA date-only
  end: string;
  all_day?: boolean;
  calendar: string; // entity_id
  recurring?: boolean;
  rrule?: string;
  recurrence_id?: string;
  /**
   * Days marked Done (YYYY-MM-DD), from `hac-done:` description lines.
   * Chip styling uses `isDoneOnDay(ev, day)` — not a whole-event flag.
   */
  doneDates?: string[];
  /**
   * Raw HA title had a whole-event `✓ ` / `[done] ` prefix when loaded.
   * Treated as done on every day of the span until a per-day write migrates it.
   */
  legacyTitleDone?: boolean;
  /**
   * Convenience: true when any day is done or legacy title-done.
   * Prefer `isDoneOnDay` for chip UI.
   */
  completed?: boolean;
}

export interface CalendarEventInput {
  /** Display title (no done marker) */
  summary: string;
  /**
   * Description body. When `doneDates` is set, the API layer appends
   * `hac-done:YYYY-MM-DD` sentinel lines (and never a title `✓ ` prefix).
   */
  description?: string;
  location?: string;
  start: string;
  end: string;
  all_day?: boolean;
  calendar: string;
  /** RFC 5545 RRULE without prefix, e.g. FREQ=WEEKLY;BYDAY=MO */
  rrule?: string | null;
  /**
   * Per-day Done dates (YYYY-MM-DD). Preferred persistence — written as
   * description sentinels. When set, title `✓ ` is not applied.
   */
  doneDates?: string[];
  /**
   * Legacy whole-event flag (title `✓ `). Only used when `doneDates` is omitted.
   */
  completed?: boolean;
}

/** Chip Done toggle carries the visible calendar day for per-day scope. */
export interface ToggleDoneDetail {
  event: CalendarEvent;
  /** Local YYYY-MM-DD of the chip’s cell / column / day view */
  day: string;
}

/** Event open/edit from a chip — optional day scopes the form Done checkbox. */
export interface EventSelectDetail {
  event: CalendarEvent;
  day?: string;
}

/** Raw event from REST /api/calendars or get_events */
export interface RawCalendarApiEvent {
  summary?: string;
  description?: string | null;
  location?: string | null;
  uid?: string | null;
  recurrence_id?: string | null;
  rrule?: string | null;
  all_day?: boolean;
  start: string | { dateTime?: string; date?: string };
  end: string | { dateTime?: string; date?: string };
}

export interface PendingDuplicate {
  entityId: string;
  uid: string;
  summary: string;
  targetCalendar: string;
  newUid: string;
}

export type MoveResult =
  | { status: "moved"; newUid: string }
  | { status: "create_failed"; error: string }
  | {
      status: "delete_failed";
      newUid: string;
      error: string;
      duplicate: true;
      pending: PendingDuplicate;
    }
  | { status: "blocked_recurring"; reason: string };

/** Loose HA typings used by the card */
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

/** Minimal entity-registry display entry (HA frontend `hass.entities`). */
export interface HassEntityDisplay {
  entity_id?: string;
  name?: string;
  icon?: string;
  hidden?: boolean;
  /** Present on some HA builds; calendar color usually lives in registry options. */
  color?: string;
  display?: { color?: string };
}

export interface HassConnection {
  subscribeEvents: (
    callback: (event: unknown) => void,
    eventType?: string
  ) => Promise<() => void>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  /** Compact entity registry display map (may omit calendar color). */
  entities?: Record<string, HassEntityDisplay>;
  connection?: HassConnection;
  services?: Record<string, Record<string, unknown>>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>,
    notifyOnError?: boolean,
    returnResponse?: boolean
  ) => Promise<unknown>;
  callWS: <T = unknown>(msg: Record<string, unknown>) => Promise<T>;
  callApi?: <T = unknown>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    data?: unknown
  ) => Promise<T>;
  locale?: { language?: string };
}

export interface WeatherDay {
  datetime: string;
  condition: string;
  temperature?: number;
  templow?: number;
}

export interface WeatherSummary {
  entityId: string;
  state: string;
  temperature?: number;
  unit?: string;
  humidity?: number;
  forecast: WeatherDay[];
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}
