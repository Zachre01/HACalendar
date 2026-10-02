export const CARD_VERSION = "0.8.0";
export const CARD_NAME = "ha-calendar-card";
export const CARD_EDITOR_NAME = "ha-calendar-card-editor";

/** Default hour range shown in day/week grids */
export const DAY_START_HOUR = 6;
export const DAY_END_HOUR = 22;
export const HOUR_HEIGHT_PX = 56;

/** Gentle background refetch — not tied to hass state churn */
export const EVENT_POLL_MS = 60_000;
/** Clock / “now” line tick without refetching calendars */
export const CLOCK_TICK_MS = 30_000;

/** Placeholder calendars until real entity_ids are configured */
export const PLACEHOLDER_CALENDARS = [
  "calendar.family",
  "calendar.personal",
  "calendar.work",
] as const;

/**
 * Deterministic palette used only when Home Assistant has no per-calendar
 * color in entity registry options (`options.calendar.color`).
 */
export const CALENDAR_COLORS = [
  "#E07A5F", // coral
  "#3D9B8F", // teal
  "#81B29A", // sage
  "#5B8DB8", // sky
  "#E9B44C", // amber
] as const;
