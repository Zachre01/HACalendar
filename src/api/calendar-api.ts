import type {
  CalendarEvent,
  CalendarEventInput,
  HomeAssistant,
  MoveResult,
  PendingDuplicate,
  RawCalendarApiEvent,
} from "../types";
import { applyDoneMarker, parseDoneSummary } from "../utils/event-done";
import { formatHassError } from "../utils/ha-error";

/** HA CalendarEntityFeature.CREATE_EVENT */
const FEATURE_CREATE_EVENT = 1;

/**
 * True when HA has registered the given calendar service/action.
 * Core HA only ships `create_event` + `get_events`; update/delete are
 * websocket commands. Custom/older installs may expose more — probe first.
 */
function hasCalendarService(
  hass: HomeAssistant,
  service: string
): boolean {
  const calendar = hass.services?.calendar;
  return Boolean(calendar && service in calendar);
}

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
  const { completed, displaySummary } = parseDoneSummary(
    raw.summary ?? "(no title)"
  );
  return {
    uid: raw.uid ?? `${entityId}:${start}:${raw.summary ?? "event"}`,
    summary: displaySummary,
    description: raw.description ?? undefined,
    location: raw.location ?? undefined,
    start,
    end,
    all_day: raw.all_day ?? isAllDay(raw.start),
    calendar: entityId,
    recurring: Boolean(rrule || raw.recurrence_id),
    rrule,
    recurrence_id: raw.recurrence_id ?? undefined,
    completed,
  };
}

/**
 * Normalize to HA calendar WS values:
 * - all-day → YYYY-MM-DD
 * - timed → floating local YYYY-MM-DDTHH:MM:SS (no Z) — matches stock HA UI
 */
function toHaDateTime(value: string, allDay: boolean | undefined): string {
  if (allDay || /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.slice(0, 10);
  }
  // Already floating local from the form
  const floating = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?::(\d{2}))?/.exec(value);
  if (floating && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(value)) {
    return `${floating[1]}:${floating[2] ?? "00"}`;
  }
  // ISO with offset/Z → convert to local wall time for Local Calendar
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function toWsEventPayload(input: CalendarEventInput): Record<string, unknown> {
  // HA websocket schema uses rfc5545 field names: dtstart / dtend / rrule
  const payload: Record<string, unknown> = {
    summary: applyDoneMarker(input.summary, Boolean(input.completed)),
    description: input.description ?? "",
    location: input.location ?? "",
    dtstart: toHaDateTime(input.start, input.all_day),
    dtend: toHaDateTime(input.end, input.all_day),
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
    const event = toWsEventPayload(input);

    // Prefer websocket — required for rrule (REST create_event has no recurrence)
    if (this.hass.callWS) {
      try {
        await this.hass.callWS({
          type: "calendar/event/create",
          entity_id: input.calendar,
          event,
        });
        const resolved = await this.findCreatedEvent(input);
        return { uid: resolved?.uid };
      } catch (wsErr) {
        if (input.rrule) {
          throw new Error(
            `Recurring create failed: ${formatHassError(wsErr)}`
          );
        }
        if (!hasCalendarService(this.hass, "create_event")) {
          throw new Error(formatHassError(wsErr, "Calendar create failed"));
        }
        try {
          await this.createEventViaService(input);
        } catch (serviceErr) {
          throw new Error(
            formatHassError(
              serviceErr,
              formatHassError(wsErr, "Calendar create failed")
            )
          );
        }
        const resolved = await this.findCreatedEvent(input);
        return { uid: resolved?.uid };
      }
    }

    if (input.rrule) {
      throw new Error(
        "Recurring create failed: Home Assistant websocket (callWS) is required for rrule — REST create_event does not support recurrence."
      );
    }

    if (!hasCalendarService(this.hass, "create_event")) {
      throw new Error(
        "Calendar create failed: Home Assistant websocket (callWS) is required, and calendar.create_event is not available."
      );
    }
    await this.createEventViaService(input);
    const resolved = await this.findCreatedEvent(input);
    return { uid: resolved?.uid };
  }

  private async createEventViaService(input: CalendarEventInput): Promise<void> {
    await this.hass.callService("calendar", "create_event", {
      entity_id: input.calendar,
      summary: applyDoneMarker(input.summary, Boolean(input.completed)),
      description: input.description ?? "",
      location: input.location ?? "",
      start_date_time: input.all_day
        ? undefined
        : toHaDateTime(input.start, false),
      end_date_time: input.all_day
        ? undefined
        : toHaDateTime(input.end, false),
      start_date: input.all_day ? input.start.slice(0, 10) : undefined,
      end_date: input.all_day ? input.end.slice(0, 10) : undefined,
    });
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

  /**
   * Update via websocket `calendar/event/update` (HA frontend path).
   * Scoped recurring edits (`recurrence_id` / `THISANDFUTURE` / rrule) require WS —
   * core HA has no `calendar.update_event` service. Service fallback only when
   * that action is actually registered and the edit is unscoped.
   */
  async updateEvent(
    entityId: string,
    uid: string,
    patch: CalendarEventInput,
    recurrenceId?: string,
    recurrenceRange?: string
  ): Promise<void> {
    const event = toWsEventPayload(patch);
    const scoped = Boolean(
      recurrenceId || recurrenceRange || patch.rrule || patch.rrule === null
    );

    if (this.hass.callWS) {
      try {
        const msg: Record<string, unknown> = {
          type: "calendar/event/update",
          entity_id: entityId,
          uid,
          event,
        };
        if (recurrenceId) msg.recurrence_id = recurrenceId;
        if (recurrenceRange) msg.recurrence_range = recurrenceRange;
        await this.hass.callWS(msg);
        return;
      } catch (wsErr) {
        if (scoped || !hasCalendarService(this.hass, "update_event")) {
          throw new Error(formatHassError(wsErr, "Calendar update failed"));
        }
        try {
          await this.updateEventViaService(entityId, uid, patch);
          return;
        } catch (serviceErr) {
          throw new Error(
            formatHassError(
              serviceErr,
              formatHassError(wsErr, "Calendar update failed")
            )
          );
        }
      }
    }

    if (scoped) {
      throw new Error(
        "Calendar update failed: Home Assistant websocket (callWS) is required for recurring / scoped edits."
      );
    }
    if (!hasCalendarService(this.hass, "update_event")) {
      throw new Error(
        "Calendar update failed: Home Assistant websocket (callWS) is required, and calendar.update_event is not available."
      );
    }
    await this.updateEventViaService(entityId, uid, patch);
  }

  private async updateEventViaService(
    entityId: string,
    uid: string,
    patch: CalendarEventInput
  ): Promise<void> {
    await this.hass.callService("calendar", "update_event", {
      entity_id: entityId,
      uid,
      summary: applyDoneMarker(patch.summary, Boolean(patch.completed)),
      description: patch.description,
      location: patch.location,
      start_date_time: patch.all_day
        ? undefined
        : toHaDateTime(patch.start, false),
      end_date_time: patch.all_day
        ? undefined
        : toHaDateTime(patch.end, false),
      start_date: patch.all_day ? patch.start.slice(0, 10) : undefined,
      end_date: patch.all_day ? patch.end.slice(0, 10) : undefined,
    });
  }

  /**
   * Delete via websocket `calendar/event/delete` (HA frontend path).
   * Scoped recurring deletes require WS — never fall back to a whole-series
   * service call when `recurrence_id` / `recurrence_range` is set.
   */
  async deleteEvent(
    entityId: string,
    uid: string,
    recurrenceId?: string,
    recurrenceRange?: string
  ): Promise<void> {
    const scoped = Boolean(recurrenceId || recurrenceRange);

    if (this.hass.callWS) {
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
        if (scoped || !hasCalendarService(this.hass, "delete_event")) {
          throw new Error(formatHassError(wsErr, "Calendar delete failed"));
        }
        try {
          await this.deleteEventViaService(entityId, uid);
          return;
        } catch (serviceErr) {
          throw new Error(
            formatHassError(
              serviceErr,
              formatHassError(wsErr, "Calendar delete failed")
            )
          );
        }
      }
    }

    if (scoped) {
      throw new Error(
        "Calendar delete failed: Home Assistant websocket (callWS) is required for recurring / scoped deletes."
      );
    }
    if (!hasCalendarService(this.hass, "delete_event")) {
      throw new Error(
        "Calendar delete failed: Home Assistant websocket (callWS) is required, and calendar.delete_event is not available."
      );
    }
    await this.deleteEventViaService(entityId, uid);
  }

  private async deleteEventViaService(
    entityId: string,
    uid: string
  ): Promise<void> {
    await this.hass.callService("calendar", "delete_event", {
      entity_id: entityId,
      uid,
    });
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
      completed: patched?.completed ?? event.completed,
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
        error: formatHassError(err, "Create on target calendar failed"),
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
        error: formatHassError(err, "Delete from source calendar failed"),
        duplicate: true,
        pending: duplicate,
      };
    }
  }
}
