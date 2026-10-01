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
}

/** Minimal HA event shape used by the card */
export interface CalendarEvent {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  start: string; // ISO or HA date dict serialized
  end: string;
  all_day?: boolean;
  calendar: string; // entity_id
  recurring?: boolean;
  rrule?: string;
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

export type MoveResult =
  | { status: "moved"; newUid: string }
  | { status: "create_failed"; error: string }
  | { status: "delete_failed"; newUid: string; error: string; duplicate: true }
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
    serviceData?: Record<string, unknown>
  ) => Promise<unknown>;
  callWS: <T = unknown>(msg: Record<string, unknown>) => Promise<T>;
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
