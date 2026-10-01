import type {
  CalendarEvent,
  CalendarEventInput,
  HomeAssistant,
  MoveResult,
  PendingDuplicate,
  RawCalendarApiEvent,
} from "../types";

function getCalendarDate(
  value: RawCalendarApiEvent["start"] | undefined
): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if ("dateTime" in value && value.dateTime) return value.dateTime;
  if ("date" in value && value.date) return value.date;
  return undefined;
}

function isAllDay(value: RawCalendarApiEvent["start"] | undefined): boolean {
  if (!value || typeof value === "string") {
    return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
  }
  return Boolean(value.date && !value.dateTime);
}

export function normalizeApiEvent(
  raw: RawCalendarApiEvent,
  entityId: string
): CalendarEvent | null {
  const start = getCalendarDate(raw.start);
  const end = getCalendarDate(raw.end);
  if (!start || !end) return null;

  const rrule = raw.rrule ?? undefined;
  return {
    uid: raw.uid ?? `${entityId}:${start}:${raw.summary ?? "event"}`,
    summary: raw.summary ?? "(no title)",
    description: raw.description ?? undefined,
    location: raw.location ?? undefined,
    start,
    end,
    all_day: raw.all_day ?? isAllDay(raw.start),
    calendar: entityId,
    recurring: Boolean(rrule || raw.recurrence_id),
    rrule,
    recurrence_id: raw.recurrence_id ?? undefined,
  };
}

function toWsEventPayload(input: CalendarEventInput): Record<string, unknown> {
  // HA websocket schema uses rfc5545 field names: dtstart / dtend
  return {
    summary: input.summary,
    description: input.description ?? "",
    location: input.location ?? "",
    dtstart: input.all_day ? input.start.slice(0, 10) : input.start,
    dtend: input.all_day ? input.end.slice(0, 10) : input.end,
  };
}

function eventsMatch(
  a: Pick<CalendarEvent, "summary" | "start" | "end">,
  b: Pick<CalendarEvent, "summary" | "start" | "end">
): boolean {
  return (
    a.summary === b.summary &&
    a.start === b.start &&
    a.end === b.end
  );
}

export interface GetEventsResult {
  events: CalendarEvent[];
  errors: string[];
  /** true when at least one calendar returned data successfully */
  anySuccess: boolean;
}

/**
 * Thin API layer over Home Assistant calendar calls.
 * Prefer the same surfaces the HA frontend uses; keep fallbacks localized here.
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
   * Fetch events in [start, end).
   * Primary: REST GET /api/calendars/{entity_id} (matches HA frontend).
   * Fallback: calendar.get_events service with return_response.
   */
  async getEvents(
    entityIds: string[],
    start: Date,
    end: Date
  ): Promise<GetEventsResult> {
    const results: CalendarEvent[] = [];
    const errors: string[] = [];
    let anySuccess = false;

    for (const entity_id of entityIds) {
      try {
        const events = await this.fetchEntityEvents(entity_id, start, end);
        anySuccess = true;
        results.push(...events);
      } catch (err) {
        errors.push(entity_id);
        console.warn(
          `[ha-calendar-card] failed to load ${entity_id}:`,
          err instanceof Error ? err.message : err
        );
      }
    }

    return { events: results, errors, anySuccess };
  }

  private async fetchEntityEvents(
    entityId: string,
    start: Date,
    end: Date
  ): Promise<CalendarEvent[]> {
    // 1) REST — same path as stock HA calendar panel
    if (this.hass.callApi) {
      try {
        const params = `?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`;
        const raw = await this.hass.callApi<RawCalendarApiEvent[]>(
          "GET",
          `calendars/${entityId}${params}`
        );
        return (raw ?? [])
          .map((ev) => normalizeApiEvent(ev, entityId))
          .filter((ev): ev is CalendarEvent => ev !== null);
      } catch {
        // fall through
      }
    }

    // 2) Service fallback
    const response = await this.hass.callService(
      "calendar",
      "get_events",
      {
        entity_id: entityId,
        start_date_time: start.toISOString(),
        end_date_time: end.toISOString(),
      },
      undefined,
      undefined,
      true
    );

    type EventsByEntity = Record<string, { events?: RawCalendarApiEvent[] }>;
    const payload = response as unknown;

    let byEntity: EventsByEntity | undefined;
    if (payload && typeof payload === "object") {
      const obj = payload as Record<string, unknown>;
      if (obj.response && typeof obj.response === "object") {
        byEntity = obj.response as EventsByEntity;
      } else {
        byEntity = obj as EventsByEntity;
      }
    }

    const list: RawCalendarApiEvent[] = byEntity?.[entityId]?.events ?? [];
    return list
      .map((ev: RawCalendarApiEvent) => normalizeApiEvent(ev, entityId))
      .filter((ev): ev is CalendarEvent => ev !== null);
  }

  async createEvent(input: CalendarEventInput): Promise<{ uid?: string }> {
    try {
      await this.hass.callWS({
        type: "calendar/event/create",
        entity_id: input.calendar,
        event: toWsEventPayload(input),
      });
    } catch (wsErr) {
      // Older / restricted paths: service create_event
      try {
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
      } catch {
        throw wsErr instanceof Error ? wsErr : new Error(String(wsErr));
      }
    }

    // Create responses often omit uid — resolve by refetch when possible
    const resolved = await this.findCreatedEvent(input);
    return { uid: resolved?.uid };
  }

  private async findCreatedEvent(
    input: CalendarEventInput
  ): Promise<CalendarEvent | null> {
    const start = new Date(input.start);
    const end = new Date(input.end);
    // Widen window slightly for clock skew / all-day boundaries
    const from = new Date(start.getTime() - 60_000);
    const to = new Date(end.getTime() + 60_000);
    try {
      const { events } = await this.getEvents([input.calendar], from, to);
      return (
        events.find((ev) =>
          eventsMatch(ev, {
            summary: input.summary,
            start: input.all_day ? input.start.slice(0, 10) : input.start,
            end: input.all_day ? input.end.slice(0, 10) : input.end,
          })
        ) ??
        events.find(
          (ev) =>
            ev.summary === input.summary &&
            Math.abs(new Date(ev.start).getTime() - start.getTime()) < 120_000
        ) ??
        null
      );
    } catch {
      return null;
    }
  }

  async updateEvent(
    entityId: string,
    uid: string,
    patch: CalendarEventInput,
    recurrenceId?: string
  ): Promise<void> {
    try {
      await this.hass.callWS({
        type: "calendar/event/update",
        entity_id: entityId,
        uid,
        recurrence_id: recurrenceId,
        event: toWsEventPayload(patch),
      });
      return;
    } catch (wsErr) {
      try {
        await this.hass.callService("calendar", "update_event", {
          entity_id: entityId,
          uid,
          summary: patch.summary,
          description: patch.description,
          location: patch.location,
          start_date_time: patch.all_day ? undefined : patch.start,
          end_date_time: patch.all_day ? undefined : patch.end,
        });
      } catch {
        throw wsErr instanceof Error ? wsErr : new Error(String(wsErr));
      }
    }
  }

  async deleteEvent(
    entityId: string,
    uid: string,
    recurrenceId?: string
  ): Promise<void> {
    try {
      await this.hass.callWS({
        type: "calendar/event/delete",
        entity_id: entityId,
        uid,
        recurrence_id: recurrenceId,
      });
      return;
    } catch (wsErr) {
      try {
        await this.hass.callService("calendar", "delete_event", {
          entity_id: entityId,
          uid,
        });
      } catch {
        throw wsErr instanceof Error ? wsErr : new Error(String(wsErr));
      }
    }
  }

  /**
   * Safe calendar move: create on target, confirm via refetch, then delete source.
   * Never deletes first. Non-recurring only.
   */
  async moveEventToCalendar(
    event: CalendarEvent,
    targetCalendar: string,
    patched?: CalendarEventInput
  ): Promise<MoveResult> {
    if (event.recurring || event.rrule) {
      return {
        status: "blocked_recurring",
        reason:
          "Moving recurring events is disabled in phase 1 — change calendars only for one-off events.",
      };
    }
    if (event.calendar === targetCalendar) {
      return { status: "moved", newUid: event.uid };
    }

    const snapshot: CalendarEventInput = {
      summary: patched?.summary ?? event.summary,
      description: patched?.description ?? event.description,
      location: patched?.location ?? event.location,
      start: patched?.start ?? event.start,
      end: patched?.end ?? event.end,
      all_day: patched?.all_day ?? event.all_day,
      calendar: targetCalendar,
    };

    let newUid: string | undefined;
    try {
      const created = await this.createEvent(snapshot);
      newUid = created.uid;
      if (!newUid) {
        // Create succeeded but uid unresolved — still treat as confirmed enough to delete
        // only if refetch found nothing? Prefer requiring a match.
        const found = await this.findCreatedEvent(snapshot);
        newUid = found?.uid;
      }
      if (!newUid) {
        return {
          status: "create_failed",
          error:
            "Created on target calendar but could not confirm the new event id — source left untouched.",
        };
      }
    } catch (err) {
      return {
        status: "create_failed",
        error: err instanceof Error ? err.message : String(err),
      };
    }

    try {
      await this.deleteEvent(event.calendar, event.uid, event.recurrence_id);
      return { status: "moved", newUid };
    } catch (err) {
      const duplicate: PendingDuplicate = {
        entityId: event.calendar,
        uid: event.uid,
        summary: event.summary,
        targetCalendar,
        newUid,
      };
      return {
        status: "delete_failed",
        newUid,
        error: err instanceof Error ? err.message : String(err),
        duplicate: true,
        pending: duplicate,
      };
    }
  }
}
