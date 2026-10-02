import type {
  CalendarEvent,
  CalendarEventInput,
  HomeAssistant,
  MoveResult,
  PendingDuplicate,
  RawCalendarApiEvent,
} from "../types";

/** HA CalendarEntityFeature.CREATE_EVENT */
const FEATURE_CREATE_EVENT = 1;

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
  // HA websocket schema uses rfc5545 field names: dtstart / dtend / rrule
  const payload: Record<string, unknown> = {
    summary: input.summary,
    description: input.description ?? "",
    location: input.location ?? "",
    dtstart: input.all_day ? input.start.slice(0, 10) : input.start,
    dtend: input.all_day ? input.end.slice(0, 10) : input.end,
  };
  if (input.rrule) {
    payload.rrule = input.rrule;
  } else if (input.rrule === null) {
    // Explicit clear when editing series/future → Does not repeat
    payload.rrule = null;
  }
  return payload;
}

/** Map UI scope → HA recurrence_id / recurrence_range for update/delete. */
export function recurrenceParams(
  event: Pick<CalendarEvent, "recurrence_id" | "rrule" | "recurring">,
  scope: "this" | "future" | "series" = "this"
): { recurrenceId?: string; recurrenceRange?: string } {
  const isRecurring = Boolean(event.recurring || event.rrule || event.recurrence_id);
  if (!isRecurring) return {};
  if (scope === "series") {
    // Entire series: uid only (no recurrence_id)
    return {};
  }
  const recurrenceId = event.recurrence_id;
  if (!recurrenceId) {
    // Series master without instance id — treat as whole series
    return {};
  }
  if (scope === "future") {
    return { recurrenceId, recurrenceRange: "THISANDFUTURE" };
  }
  return { recurrenceId };
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
      return [...configured];
    }
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith("calendar."))
      .sort();
  }

  /**
   * Calendars from card config that can accept creates (cross-calendar move targets).
   * Unknown/missing entities are kept so placeholders still appear in the dropdown.
   * No hard-coded entity names — only the configured list (order preserved).
   */
  listWritableCalendars(configured: string[]): string[] {
    return configured.filter((entityId) => {
      const state = this.hass.states[entityId];
      if (!state) return true;
      const features = state.attributes.supported_features;
      if (typeof features !== "number") return true;
      return (features & FEATURE_CREATE_EVENT) !== 0;
    });
  }

  /** True when entity reports DELETE_EVENT support (or features unknown). */
  canDelete(entityId: string): boolean {
    const state = this.hass.states[entityId];
    if (!state) return true;
    const features = state.attributes.supported_features;
    if (typeof features !== "number") return true;
    return (features & 2) !== 0; // DELETE_EVENT
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
      // REST create_event has no rrule — recurring requires websocket
      if (input.rrule) {
        throw wsErr instanceof Error
          ? wsErr
          : new Error(
              `Recurring create failed (websocket required for rrule): ${String(wsErr)}`
            );
      }
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
    recurrenceId?: string,
    recurrenceRange?: string
  ): Promise<void> {
    try {
      const msg: Record<string, unknown> = {
        type: "calendar/event/update",
        entity_id: entityId,
        uid,
        event: toWsEventPayload(patch),
      };
      if (recurrenceId) msg.recurrence_id = recurrenceId;
      if (recurrenceRange) msg.recurrence_range = recurrenceRange;
      await this.hass.callWS(msg);
      return;
    } catch (wsErr) {
      // Service path has no rrule / recurrence_range — WS is required for series edits
      if (patch.rrule || recurrenceRange) {
        throw wsErr instanceof Error ? wsErr : new Error(String(wsErr));
      }
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
    recurrenceId?: string,
    recurrenceRange?: string
  ): Promise<void> {
    try {
      const msg: Record<string, unknown> = {
        type: "calendar/event/delete",
        entity_id: entityId,
        uid,
      };
      if (recurrenceId) msg.recurrence_id = recurrenceId;
      if (recurrenceRange) msg.recurrence_range = recurrenceRange;
      await this.hass.callWS(msg);
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
   * Cross-calendar “move” for any configured source → any other configured target.
   *
   * Home Assistant cannot move an event between calendar.* entities in place, so
   * we always: CREATE on target → confirm via refetch → DELETE from source.
   * Never update-in-place across calendars. Never delete-first.
   * Recurring events are blocked.
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
          "Moving recurring events is disabled — change calendars only for one-off events.",
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

    // 1) Create on target first — source untouched if this fails
    let newUid: string | undefined;
    try {
      const created = await this.createEvent(snapshot);
      newUid = created.uid ?? (await this.findCreatedEvent(snapshot))?.uid;
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

    // 2) Delete from source only after confirmed create
    try {
      await this.deleteEvent(event.calendar, event.uid, event.recurrence_id);
      return { status: "moved", newUid };
    } catch (err) {
      const duplicate: PendingDuplicate = {
        entityId: event.calendar,
        uid: event.uid,
        summary: patched?.summary ?? event.summary,
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
