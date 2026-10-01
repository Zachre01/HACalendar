import type {
  CalendarEvent,
  CalendarEventInput,
  HomeAssistant,
  MoveResult,
} from "../types";

/**
 * Thin API layer over Home Assistant calendar calls.
 * Method shapes may differ by HA version / backend; keep call sites here.
 */
export class CalendarApi {
  constructor(private hass: HomeAssistant) {}

  listCalendarEntities(configured?: string[]): string[] {
    if (configured?.length) {
      return configured;
    }
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith("calendar."))
      .sort();
  }

  /**
   * Fetch events in [start, end). Placeholder implementation uses WS list;
   * falls back to empty on failure so the shell still renders.
   */
  async getEvents(
    entityIds: string[],
    start: Date,
    end: Date
  ): Promise<CalendarEvent[]> {
    const results: CalendarEvent[] = [];
    for (const entity_id of entityIds) {
      try {
        const events = await this.hass.callWS<
          Array<{
            uid?: string;
            summary?: string;
            description?: string;
            location?: string;
            start: { dateTime?: string; date?: string };
            end: { dateTime?: string; date?: string };
            rrule?: string;
          }>
        >({
          type: "calendar/events/list",
          entity_id,
          start: start.toISOString(),
          end: end.toISOString(),
        });
        for (const ev of events ?? []) {
          results.push({
            uid: ev.uid ?? `${entity_id}-${ev.start.dateTime ?? ev.start.date}`,
            summary: ev.summary ?? "(no title)",
            description: ev.description,
            location: ev.location,
            start: ev.start.dateTime ?? ev.start.date ?? "",
            end: ev.end.dateTime ?? ev.end.date ?? "",
            all_day: Boolean(ev.start.date && !ev.start.dateTime),
            calendar: entity_id,
            recurring: Boolean(ev.rrule),
            rrule: ev.rrule,
          });
        }
      } catch {
        // Backend/version mismatch — leave empty; UI still works with stubs
      }
    }
    return results;
  }

  async createEvent(input: CalendarEventInput): Promise<{ uid: string }> {
    // Local Calendar / stock services use calendar.create_event
    await this.hass.callService("calendar", "create_event", {
      entity_id: input.calendar,
      summary: input.summary,
      description: input.description ?? "",
      location: input.location ?? "",
      start_date_time: input.all_day ? undefined : input.start,
      end_date_time: input.all_day ? undefined : input.end,
      start_date: input.all_day ? input.start.slice(0, 10) : undefined,
      end_date: input.all_day ? input.end.slice(0, 10) : undefined,
    });
    // Many backends do not return uid; synthesize a provisional id for orchestration
    return {
      uid: `created:${input.calendar}:${input.start}:${input.summary}`,
    };
  }

  async updateEvent(
    entityId: string,
    uid: string,
    patch: Partial<CalendarEventInput>
  ): Promise<void> {
    await this.hass.callService("calendar", "update_event", {
      entity_id: entityId,
      uid,
      summary: patch.summary,
      description: patch.description,
      location: patch.location,
      start_date_time: patch.all_day ? undefined : patch.start,
      end_date_time: patch.all_day ? undefined : patch.end,
    });
  }

  async deleteEvent(entityId: string, uid: string): Promise<void> {
    await this.hass.callService("calendar", "delete_event", {
      entity_id: entityId,
      uid,
    });
  }

  /**
   * Safe calendar move: create on target, then delete from source.
   * Never deletes first. Non-recurring only.
   */
  async moveEventToCalendar(
    event: CalendarEvent,
    targetCalendar: string
  ): Promise<MoveResult> {
    if (event.recurring || event.rrule) {
      return {
        status: "blocked_recurring",
        reason:
          "Moving recurring events is disabled until a dedicated design lands.",
      };
    }
    if (event.calendar === targetCalendar) {
      return { status: "moved", newUid: event.uid };
    }

    let newUid: string;
    try {
      const created = await this.createEvent({
        summary: event.summary,
        description: event.description,
        location: event.location,
        start: event.start,
        end: event.end,
        all_day: event.all_day,
        calendar: targetCalendar,
      });
      newUid = created.uid;
    } catch (err) {
      return {
        status: "create_failed",
        error: err instanceof Error ? err.message : String(err),
      };
    }

    try {
      await this.deleteEvent(event.calendar, event.uid);
      return { status: "moved", newUid };
    } catch (err) {
      return {
        status: "delete_failed",
        newUid,
        error: err instanceof Error ? err.message : String(err),
        duplicate: true,
      };
    }
  }
}
