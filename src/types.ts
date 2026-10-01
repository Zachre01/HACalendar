export type CalendarViewMode = "day" | "week";

export interface HaCalendarCardConfig {
  type: string;
  title?: string;
  /** calendar.* entity ids to show; placeholders OK */
  entities?: string[];
  initial_view?: CalendarViewMode;
  /** Hour grid bounds (inclusive start, exclusive end) */
  day_start_hour?: number;
  day_end_hour?: number;
  /** When true, show demo blocks if HA returns no events (dev only) */
  show_demo_when_empty?: boolean;
}

/** Minimal HA event shape used by the card */
export interface CalendarEvent {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  start: string; // ISO or HA date-only
  end: string;
  all_day?: boolean;
  calendar: string; // entity_id
  recurring?: boolean;
  rrule?: string;
  recurrence_id?: string;
}

export interface CalendarEventInput {
  summary: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
  all_day?: boolean;
  calendar: string;
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
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
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
