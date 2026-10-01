export const CARD_VERSION = "0.5.1";
export const CARD_NAME = "ha-calendar-card";
export const CARD_EDITOR_NAME = "ha-calendar-card-editor";

/** Default hour range shown in day/week grids */
export const DAY_START_HOUR = 6;
export const DAY_END_HOUR = 22;
export const HOUR_HEIGHT_PX = 56;

/** Placeholder calendars until real entity_ids are configured */
export const PLACEHOLDER_CALENDARS = [
  "calendar.family",
  "calendar.personal",
  "calendar.work",
] as const;
