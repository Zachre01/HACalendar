import type { HomeAssistant, ReminderRule, ReminderRuleInput } from "../types";

const DOMAIN = "ha_calendar_reminders";

function unwrapResponse(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object") return {};
  const obj = raw as Record<string, unknown>;
  if (obj.response && typeof obj.response === "object") {
    return obj.response as Record<string, unknown>;
  }
  return obj;
}

/** Thin client for Phase 2 reminder services. */
export class ReminderApi {
  constructor(private hass: HomeAssistant) {}

  isAvailable(): boolean {
    const services = this.hass.services;
    return Boolean(services && services[DOMAIN]?.set_reminder);
  }

  async getReminder(
    calendarEntityId: string,
    eventUid: string
  ): Promise<ReminderRule | null> {
    const raw = await this.hass.callService(
      DOMAIN,
      "get_reminder",
      {
        calendar_entity_id: calendarEntityId,
        event_uid: eventUid,
      },
      undefined,
      undefined,
      true
    );
    const response = unwrapResponse(raw);
    const reminder = response.reminder;
    if (!reminder || typeof reminder !== "object") return null;
    return reminder as ReminderRule;
  }

  async setReminder(input: ReminderRuleInput): Promise<ReminderRule | null> {
    const raw = await this.hass.callService(
      DOMAIN,
      "set_reminder",
      {
        calendar_entity_id: input.calendar_entity_id,
        event_uid: input.event_uid,
        event_start: input.event_start,
        event_summary: input.event_summary ?? "",
        minutes_before: input.minutes_before,
        notify_service: input.notify_service,
        message: input.message ?? "",
        enabled: input.enabled ?? true,
      },
      undefined,
      undefined,
      true
    );
    const response = unwrapResponse(raw);
    return (response.reminder as ReminderRule) ?? null;
  }

  async clearReminder(
    calendarEntityId: string,
    eventUid: string
  ): Promise<boolean> {
    const raw = await this.hass.callService(
      DOMAIN,
      "clear_reminder",
      {
        calendar_entity_id: calendarEntityId,
        event_uid: eventUid,
      },
      undefined,
      undefined,
      true
    );
    const response = unwrapResponse(raw);
    return Boolean(response.cleared);
  }
}
