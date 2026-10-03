import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CARD_VERSION } from "../const";
import { formStyles } from "../styles/shared";
import type {
  CalendarEvent,
  CalendarEventInput,
  ReminderFormState,
} from "../types";
import { fallbackCalendarColor } from "../utils/calendar-colors";
import type { CalendarColorMap } from "../utils/calendar-colors";
import {
  buildRrule,
  isUntilBeforeStart,
  normalizeRecurringTimedEnd,
  parseRruleFreq,
  parseRruleUntil,
  rruleShortLabel,
  type RecurrenceEditScope,
  type RecurrenceFreq,
} from "../utils/rrule";

export interface EventFormSaveDetail {
  mode: "create" | "edit";
  input: CalendarEventInput;
  /** Original event when editing (for move detection) */
  original?: CalendarEvent;
  /**
   * True when editing and the Calendar dropdown differs from the event's
   * current calendar.* entity — card must run create→confirm→delete.
   */
  crossCalendarMove?: boolean;
  /** Reminder form state when integration hooks are active */
  reminder?: ReminderFormState;
  /** Recurring edit scope (ignored for create / one-off) */
  recurrenceScope?: RecurrenceEditScope;
}

export interface EventFormDeleteDetail {
  event: CalendarEvent;
  /** Recurring delete scope (ignored for one-off) */
  recurrenceScope?: RecurrenceEditScope;
}

type ScopePromptKind = "save" | "delete";

@customElement("hac-event-form")
export class HacEventForm extends LitElement {
  static styles = formStyles;

  /** Writable calendars from card config (any source ↔ any target). */
  @property({ attribute: false }) calendars: string[] = [];
  /** Resolved HA/palette colors keyed by calendar entity id. */
  @property({ attribute: false }) calendarColors: CalendarColorMap = {};
  @property({ attribute: false }) event: CalendarEvent | null = null;
  @property({ attribute: false }) defaults: {
    start?: string;
    end?: string;
    calendar?: string;
  } = {};
  @property({ type: Boolean }) busy = false;
  @property({ type: String }) errorMessage = "";
  @property({ type: Boolean }) remindersAvailable = false;
  /** When false, hide Delete (calendar lacks DELETE_EVENT). */
  @property({ type: Boolean }) canDelete = true;
  @property({ attribute: false }) reminderDefaults: {
    minutes_before?: number;
    notify_service?: string;
  } = {};
  @property({ attribute: false }) reminder: ReminderFormState | null = null;

  @state() private summary = "";
  @state() private description = "";
  @state() private location = "";
  @state() private start = "";
  @state() private end = "";
  /** When true, start/end are YYYY-MM-DD (inclusive end in the UI). */
  @state() private allDay = false;
  @state() private calendar = "";
  @state() private moveNote = "";
  @state() private reminderEnabled = false;
  @state() private reminderMinutes = 30;
  @state() private reminderNotify = "notify.mobile_app_phone";
  @state() private reminderMessage = "";
  /** Prevents reminder/async prop updates from wiping calendar selection */
  @state() private hydrateKey = "";
  @state() private recurFreq: RecurrenceFreq = "none";
  @state() private recurUntil = "";
  /** Client-side validation (until / multi-day + rrule) — separate from API errors */
  @state() private validationError = "";
  /** Modal: choose this / this+future / series before save or delete */
  @state() private scopePrompt: ScopePromptKind | null = null;
  /** Simple confirm for one-off delete */
  @state() private confirmDelete = false;
  /** Last timed start/end so toggling All day off can restore clock times. */
  private savedTimedStart = "";
  private savedTimedEnd = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.hydrateEventFields(true);
    this.applyReminderFields(true);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("event") || changed.has("defaults")) {
      this.hydrateEventFields();
      this.applyReminderFields(true);
      this.scopePrompt = null;
      this.confirmDelete = false;
    } else if (
      changed.has("reminder") ||
      changed.has("reminderDefaults")
    ) {
      // Do NOT reset summary/calendar — that previously cancelled cross-calendar moves
      this.applyReminderFields(false);
    }
  }

  private eventKey(): string {
    if (this.event) {
      return `edit:${this.event.calendar}:${this.event.uid}:${this.event.recurrence_id ?? ""}`;
    }
    return `create:${this.defaults.start ?? ""}:${this.defaults.end ?? ""}:${this.defaults.calendar ?? ""}`;
  }

  private hydrateEventFields(force = false): void {
    const key = this.eventKey();
    if (!force && key === this.hydrateKey) return;
    this.hydrateKey = key;
    this.savedTimedStart = "";
    this.savedTimedEnd = "";

    if (this.event) {
      this.summary = this.event.summary;
      this.description = this.event.description ?? "";
      this.location = this.event.location ?? "";
      this.allDay = Boolean(
        this.event.all_day || /^\d{4}-\d{2}-\d{2}$/.test(this.event.start)
      );
      if (this.allDay) {
        this.start = this.event.start.slice(0, 10);
        this.end = this.exclusiveEndToInclusive(
          this.start,
          this.event.end.slice(0, 10)
        );
      } else {
        this.start = this.toLocalInput(this.event.start);
        this.end = this.toLocalInput(this.event.end);
        this.savedTimedStart = this.start;
        this.savedTimedEnd = this.end;
      }
      this.calendar = this.event.calendar;
      this.recurFreq = parseRruleFreq(this.event.rrule);
      this.recurUntil = parseRruleUntil(this.event.rrule);
    } else {
      this.summary = "";
      this.description = "";
      this.location = "";
      const defStart = this.defaults.start ?? new Date().toISOString();
      const defEnd =
        this.defaults.end ??
        new Date(Date.now() + 60 * 60 * 1000).toISOString();
      this.allDay = /^\d{4}-\d{2}-\d{2}$/.test(defStart);
      if (this.allDay) {
        this.start = defStart.slice(0, 10);
        this.end = this.exclusiveEndToInclusive(
          this.start,
          /^\d{4}-\d{2}-\d{2}$/.test(defEnd)
            ? defEnd.slice(0, 10)
            : this.start
        );
      } else {
        this.start = this.toLocalInput(defStart);
        this.end = this.toLocalInput(defEnd);
        this.savedTimedStart = this.start;
        this.savedTimedEnd = this.end;
      }
      this.calendar = this.defaults.calendar ?? this.calendars[0] ?? "";
      this.recurFreq = "none";
      this.recurUntil = "";
    }
    this.moveNote = "";
    this.validationError = "";
  }

  private applyReminderFields(resetIfEmpty: boolean): void {
    if (this.reminder) {
      this.reminderEnabled = Boolean(this.reminder.enabled);
      this.reminderMinutes = this.reminder.minutes_before;
      this.reminderNotify = this.reminder.notify_service;
      this.reminderMessage = this.reminder.message ?? "";
      return;
    }
    if (!resetIfEmpty) return;
    this.reminderEnabled = false;
    this.reminderMinutes = this.reminderDefaults.minutes_before ?? 30;
    this.reminderNotify =
      this.reminderDefaults.notify_service || "notify.mobile_app_phone";
    this.reminderMessage = "";
  }

  /** Config calendars plus current event calendar if missing from config. */
  private get calendarOptions(): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    const push = (id: string | undefined) => {
      if (!id || seen.has(id)) return;
      seen.add(id);
      out.push(id);
    };
    // Keep current selection/source first when editing so the dropdown always shows it
    if (this.event?.calendar) push(this.event.calendar);
    if (this.calendar) push(this.calendar);
    for (const id of this.calendars) push(id);
    return out;
  }

  private toLocalInput(isoOrDate: string): string {
    const d = /^\d{4}-\d{2}-\d{2}$/.test(isoOrDate)
      ? new Date(`${isoOrDate}T09:00:00`)
      : new Date(isoOrDate);
    if (Number.isNaN(d.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  private fromLocalInput(value: string): string {
    // datetime-local → floating local wall time (HA calendar WS / Local Calendar)
    const m = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?::(\d{2}))?/.exec(value);
    if (m) {
      return `${m[1]}:${m[2] ?? "00"}`;
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  private datePart(value: string): string {
    return value.slice(0, 10);
  }

  private addDays(dateStr: string, days: number): string {
    const d = new Date(`${dateStr}T12:00:00`);
    d.setDate(d.getDate() + days);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  /**
   * HA all-day end is exclusive. Form shows the last inclusive day
   * (one-day event: start === end in the UI).
   */
  private exclusiveEndToInclusive(
    startDate: string,
    exclusiveEnd: string
  ): string {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(exclusiveEnd)) return startDate;
    if (exclusiveEnd <= startDate) return startDate;
    return this.addDays(exclusiveEnd, -1);
  }

  /** Inclusive UI end → HA exclusive end date (at least start+1). */
  private inclusiveEndToExclusive(
    startDate: string,
    inclusiveEnd: string
  ): string {
    const end =
      /^\d{4}-\d{2}-\d{2}$/.test(inclusiveEnd) && inclusiveEnd >= startDate
        ? inclusiveEnd
        : startDate;
    return this.addDays(end, 1);
  }

  private onAllDayChange(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    if (checked === this.allDay) return;
    if (checked) {
      // Remember clock times, switch to date-only (inclusive end)
      if (this.start.includes("T")) this.savedTimedStart = this.start;
      if (this.end.includes("T")) this.savedTimedEnd = this.end;
      const startDate = this.datePart(this.start);
      let endDate = this.datePart(this.end);
      if (endDate < startDate) endDate = startDate;
      this.start = startDate;
      this.end = endDate;
      this.allDay = true;
    } else {
      const startDate = this.datePart(this.start);
      const endDate = this.datePart(this.end);
      const defaultStart = `${startDate}T09:00`;
      const defaultEnd = `${endDate >= startDate ? endDate : startDate}T10:00`;
      const restoreStart =
        this.savedTimedStart &&
        this.datePart(this.savedTimedStart) === startDate
          ? this.savedTimedStart
          : this.savedTimedStart
            ? `${startDate}T${this.savedTimedStart.slice(11, 16) || "09:00"}`
            : defaultStart;
      const restoreEnd =
        this.savedTimedEnd &&
        this.datePart(this.savedTimedEnd) === endDate
          ? this.savedTimedEnd
          : this.savedTimedEnd
            ? `${endDate >= startDate ? endDate : startDate}T${this.savedTimedEnd.slice(11, 16) || "10:00"}`
            : defaultEnd;
      this.start = restoreStart;
      this.end =
        restoreEnd > restoreStart
          ? restoreEnd
          : `${this.datePart(restoreStart)}T10:00`;
      if (this.end <= this.start) {
        // Same-day fallback 9–10am
        this.start = `${startDate}T09:00`;
        this.end = `${startDate}T10:00`;
      }
      this.allDay = false;
    }
    this.refreshValidation();
  }

  private get untilInvalid(): boolean {
    return (
      this.recurFreq !== "none" &&
      isUntilBeforeStart(this.recurUntil || undefined, this.start)
    );
  }

  private get allDayRangeInvalid(): boolean {
    if (!this.allDay || !this.start || !this.end) return false;
    return this.end < this.start;
  }

  /** Timed recurring only — multi-day all-day series are valid. */
  private get recurringMultiDay(): boolean {
    if (this.allDay) return false;
    if (this.recurFreq === "none" || !this.start || !this.end) return false;
    return this.start.slice(0, 10) !== this.end.slice(0, 10);
  }

  private refreshValidation(): void {
    if (this.allDayRangeInvalid) {
      this.validationError = "End date must be on or after the start date.";
      return;
    }
    if (this.untilInvalid) {
      this.validationError =
        "Until must be on or after the event start date.";
      return;
    }
    if (this.recurringMultiDay) {
      this.validationError =
        "Repeating timed events should end on the same day as they start — each occurrence uses that duration. End will be adjusted to the start date.";
      return;
    }
    this.validationError = "";
  }

  private get isRecurring(): boolean {
    return Boolean(
      this.event?.recurring || this.event?.rrule || this.event?.recurrence_id
    );
  }

  /** Instance-level scopes need recurrence_id (HA THIS / THISANDFUTURE). */
  private get canScopeInstance(): boolean {
    return Boolean(this.event?.recurrence_id);
  }

  private get isCrossCalendarMove(): boolean {
    return Boolean(
      this.event && this.calendar && this.calendar !== this.event.calendar
    );
  }

  private get calendarMoveBlocked(): boolean {
    return this.isRecurring && this.isCrossCalendarMove;
  }

  private onCalendarChange(e: Event): void {
    const next = (e.target as HTMLSelectElement).value;
    this.selectCalendar(next);
  }

  private selectCalendar(next: string): void {
    this.calendar = next;
    if (this.event && next !== this.event.calendar) {
      if (this.isRecurring) {
        this.moveNote =
          "Recurring series cannot change calendars (avoids partial/orphan instances). Keep the original calendar or recreate as a one-off.";
      } else {
        this.moveNote =
          "Home Assistant cannot move events across calendars — Save will create on the new calendar, then delete from the old one.";
      }
    } else {
      this.moveNote = "";
    }
  }

  private calendarColor(entityId: string): string {
    if (this.calendarColors[entityId]) {
      return this.calendarColors[entityId];
    }
    const options = this.calendarOptions;
    const idx = Math.max(0, options.indexOf(entityId));
    return fallbackCalendarColor(idx);
  }

  private calendarLabel(entityId: string): string {
    return entityId.replace(/^calendar\./, "").replace(/_/g, " ");
  }

  private close(): void {
    if (this.busy) return;
    if (this.scopePrompt || this.confirmDelete) {
      this.scopePrompt = null;
      this.confirmDelete = false;
      return;
    }
    this.dispatchEvent(
      new CustomEvent("form-cancel", { bubbles: true, composed: true })
    );
  }

  private dismissOverlays(e?: Event): void {
    e?.stopPropagation();
    if (this.busy) return;
    this.scopePrompt = null;
    this.confirmDelete = false;
  }

  /** Save click — always prompt for scope when editing a recurring event. */
  private onSaveClick(): void {
    if (this.busy) return;
    if (!this.summary.trim() || !this.start || !this.end || !this.calendar) {
      return;
    }
    if (this.calendarMoveBlocked) {
      return;
    }
    this.refreshValidation();
    if (this.untilInvalid || this.allDayRangeInvalid) {
      return;
    }
    // Multi-day + recurrence: normalize end onto start day before save
    if (this.recurringMultiDay) {
      const { end, adjusted } = normalizeRecurringTimedEnd(this.start, this.end);
      if (adjusted) {
        this.end = end;
        this.validationError =
          "End adjusted to the start date so each occurrence has a same-day duration.";
      }
    }
    if (this.event && this.isRecurring) {
      this.confirmDelete = false;
      this.scopePrompt = "save";
      return;
    }
    this.emitSave(undefined);
  }

  private onDeleteClick(): void {
    if (this.busy || !this.event || !this.canDelete) return;
    if (this.isRecurring) {
      this.confirmDelete = false;
      this.scopePrompt = "delete";
      return;
    }
    this.scopePrompt = null;
    this.confirmDelete = true;
  }

  private chooseScope(scope: RecurrenceEditScope): void {
    if (this.busy) return;
    const kind = this.scopePrompt;
    this.scopePrompt = null;
    if (kind === "save") {
      this.emitSave(scope);
    } else if (kind === "delete") {
      this.emitDelete(scope);
    }
  }

  private confirmOneOffDelete(): void {
    if (this.busy) return;
    this.confirmDelete = false;
    this.emitDelete(undefined);
  }

  private emitSave(scope: RecurrenceEditScope | undefined): void {
    this.refreshValidation();
    if (this.untilInvalid || this.allDayRangeInvalid) {
      return;
    }
    // Ensure multi-day recurring end is normalized (scope dialog path)
    if (!this.allDay && this.recurFreq !== "none") {
      const { end, adjusted } = normalizeRecurringTimedEnd(this.start, this.end);
      if (adjusted) this.end = end;
    }

    let startIso: string;
    let endIso: string;
    if (this.allDay) {
      startIso = this.datePart(this.start);
      endIso = this.inclusiveEndToExclusive(startIso, this.datePart(this.end));
    } else {
      startIso = this.fromLocalInput(this.start);
      endIso = this.fromLocalInput(this.end);
    }

    // This-occurrence edits must not change the series RRULE
    const allowRruleChange =
      !this.event ||
      !this.isRecurring ||
      scope === "series" ||
      scope === "future";

    let rrule: string | null | undefined;
    if (allowRruleChange) {
      rrule = buildRrule({
        freq: this.recurFreq,
        startIso,
        untilDate: this.recurUntil || undefined,
      });
      // Explicit null clears recurrence when editing series/future → Does not repeat
      if (
        this.event &&
        this.isRecurring &&
        (scope === "series" || scope === "future") &&
        this.recurFreq === "none"
      ) {
        rrule = null;
      }
    } else {
      rrule = undefined;
    }

    const input: CalendarEventInput = {
      summary: this.summary.trim(),
      description: this.description.trim() || undefined,
      location: this.location.trim() || undefined,
      start: startIso,
      end: endIso,
      all_day: this.allDay,
      calendar: this.calendar,
      rrule: rrule === undefined ? undefined : rrule,
    };
    const crossCalendarMove = this.isCrossCalendarMove;
    const detail: EventFormSaveDetail = {
      mode: this.event ? "edit" : "create",
      input,
      original: this.event ?? undefined,
      crossCalendarMove,
      recurrenceScope: this.isRecurring ? scope : undefined,
      reminder: this.remindersAvailable
        ? {
            enabled: this.reminderEnabled,
            minutes_before: this.reminderMinutes,
            notify_service: this.reminderNotify.trim(),
            message: this.reminderMessage.trim(),
          }
        : undefined,
    };
    this.dispatchEvent(
      new CustomEvent("form-save", {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private emitDelete(scope: RecurrenceEditScope | undefined): void {
    if (!this.event) return;
    const detail: EventFormDeleteDetail = {
      event: this.event,
      recurrenceScope: this.isRecurring ? scope : undefined,
    };
    this.dispatchEvent(
      new CustomEvent("form-delete", {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private scopeLabels(kind: ScopePromptKind): {
    title: string;
    subtitle: string;
  } {
    if (kind === "delete") {
      return {
        title: "Delete recurring event",
        subtitle:
          "Choose how much of the series to remove. Matches Home Assistant calendar delete scopes.",
      };
    }
    return {
      title: "Edit recurring event",
      subtitle:
        "Choose how far these changes apply. Matches Home Assistant calendar update scopes.",
    };
  }

  private renderScopePrompt() {
    if (!this.scopePrompt) return nothing;
    const { title, subtitle } = this.scopeLabels(this.scopePrompt);
    const isDelete = this.scopePrompt === "delete";
    const instanceOk = this.canScopeInstance;

    return html`
      <div
        class="scope-backdrop"
        @click=${(e: Event) => this.dismissOverlays(e)}
        role="presentation"
      >
        <div
          class="scope-panel"
          @click=${(e: Event) => e.stopPropagation()}
          role="dialog"
          aria-label=${title}
        >
          <h3>${title}</h3>
          <p class="scope-sub">${subtitle}</p>
          ${!instanceOk
            ? html`<p class="hint warn">
                This event has no occurrence id — only the entire series can be
                changed safely.
              </p>`
            : nothing}
          <div class="scope-choices">
            <button
              type="button"
              class="scope-choice ${isDelete ? "danger-soft" : ""}"
              ?disabled=${this.busy || !instanceOk}
              @click=${() => this.chooseScope("this")}
            >
              <span class="scope-choice-title">This occurrence only</span>
              <span class="scope-choice-desc"
                >Affects just the selected date/time</span
              >
            </button>
            <button
              type="button"
              class="scope-choice ${isDelete ? "danger-soft" : ""}"
              ?disabled=${this.busy || !instanceOk}
              @click=${() => this.chooseScope("future")}
            >
              <span class="scope-choice-title">This and future</span>
              <span class="scope-choice-desc"
                >This occurrence and all later ones (THISANDFUTURE)</span
              >
            </button>
            <button
              type="button"
              class="scope-choice ${isDelete ? "danger-soft" : ""}"
              ?disabled=${this.busy}
              @click=${() => this.chooseScope("series")}
            >
              <span class="scope-choice-title">Entire series</span>
              <span class="scope-choice-desc"
                >Every occurrence in the series</span
              >
            </button>
          </div>
          <div class="scope-actions">
            <button
              type="button"
              ?disabled=${this.busy}
              @click=${(e: Event) => this.dismissOverlays(e)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private renderConfirmDelete() {
    if (!this.confirmDelete || !this.event) return nothing;
    return html`
      <div
        class="scope-backdrop"
        @click=${(e: Event) => this.dismissOverlays(e)}
        role="presentation"
      >
        <div
          class="scope-panel"
          @click=${(e: Event) => e.stopPropagation()}
          role="dialog"
          aria-label="Delete event"
        >
          <h3>Delete event?</h3>
          <p class="scope-sub">
            Remove “${this.event.summary}” from
            ${this.calendarLabel(this.event.calendar)}. This cannot be undone.
          </p>
          <div class="scope-actions split">
            <button
              type="button"
              ?disabled=${this.busy}
              @click=${(e: Event) => this.dismissOverlays(e)}
            >
              Cancel
            </button>
            <button
              type="button"
              class="danger"
              ?disabled=${this.busy}
              @click=${() => this.confirmOneOffDelete()}
            >
              ${this.busy ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const title = this.event ? "Edit event" : "New event";
    const options = this.calendarOptions;
    const seriesLabel = this.event?.rrule
      ? rruleShortLabel(this.event.rrule)
      : this.isRecurring
        ? "Repeats"
        : "";

    return html`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${(e: Event) => e.stopPropagation()}
          role="dialog"
          aria-label=${title}
        >
          <div class="form-title-row">
            <h2>${title}</h2>
            <span class="form-version" title="Loaded card build">v${CARD_VERSION}</span>
          </div>
          <p class="form-sub">
            ${this.event
              ? this.isRecurring
                ? `Recurring series${seriesLabel ? ` · ${seriesLabel}` : ""}. Save and Delete will ask how far to apply.`
                : "Edit details, change calendar (create+delete move), or reminder."
              : "Add an event — optionally set it to repeat."}
          </p>

          <label for="summary">Title</label>
          <input
            id="summary"
            .value=${this.summary}
            ?disabled=${this.busy}
            @input=${(e: Event) => {
              this.summary = (e.target as HTMLInputElement).value;
            }}
          />

          <label for="calendar">Calendar</label>
          <div class="cal-select-row">
            <span
              class="cal-swatch"
              style="background:${this.calendarColor(this.calendar)}"
              aria-hidden="true"
            ></span>
            <select
              id="calendar"
              ?disabled=${this.busy || options.length === 0}
              @change=${this.onCalendarChange}
            >
              ${options.map(
                (id) => html`
                  <option value=${id} ?selected=${id === this.calendar}>
                    ${this.calendarLabel(id)}
                  </option>
                `
              )}
            </select>
          </div>
          <div class="cal-legend" role="list" aria-label="Calendar colors">
            ${options.map(
              (id) => html`
                <button
                  type="button"
                  class="cal-legend-item"
                  role="listitem"
                  ?disabled=${this.busy}
                  data-active=${id === this.calendar ? "true" : "false"}
                  @click=${() => {
                    if (this.busy) return;
                    this.selectCalendar(id);
                  }}
                >
                  <span
                    class="dot"
                    style="background:${this.calendarColor(id)}"
                  ></span>
                  ${this.calendarLabel(id)}
                </button>
              `
            )}
          </div>
          ${this.event
            ? html`<p class="hint">
                Changing calendar moves the event to any other configured
                writable calendar via create-on-new, then delete-from-old (HA
                cannot move across calendars in place). Recurring series stay
                blocked.
              </p>`
            : nothing}

          <div class="all-day-row">
            <label class="all-day-toggle" for="all-day">
              <input
                id="all-day"
                type="checkbox"
                .checked=${this.allDay}
                ?disabled=${this.busy}
                @change=${(e: Event) => this.onAllDayChange(e)}
              />
              <span class="all-day-label">All day</span>
            </label>
          </div>

          <div class="row-2">
            <div>
              <label for="start">${this.allDay ? "Start date" : "Start"}</label>
              <input
                id="start"
                type=${this.allDay ? "date" : "datetime-local"}
                .value=${this.start}
                ?disabled=${this.busy}
                @input=${(e: Event) => {
                  this.start = (e.target as HTMLInputElement).value;
                  if (!this.allDay && this.start.includes("T")) {
                    this.savedTimedStart = this.start;
                  }
                  this.refreshValidation();
                }}
              />
            </div>
            <div>
              <label for="end">${this.allDay ? "End date" : "End"}</label>
              <input
                id="end"
                type=${this.allDay ? "date" : "datetime-local"}
                .value=${this.end}
                min=${this.allDay && this.start ? this.start : ""}
                ?disabled=${this.busy}
                @input=${(e: Event) => {
                  this.end = (e.target as HTMLInputElement).value;
                  if (!this.allDay && this.end.includes("T")) {
                    this.savedTimedEnd = this.end;
                  }
                  this.refreshValidation();
                }}
              />
            </div>
          </div>
          ${this.allDay
            ? html`<p class="hint">
                All-day events use dates only. End date is the last day of the
                event (saved exclusive for Home Assistant).
              </p>`
            : nothing}

          <label for="location">Location</label>
          <input
            id="location"
            .value=${this.location}
            ?disabled=${this.busy}
            @input=${(e: Event) => {
              this.location = (e.target as HTMLInputElement).value;
            }}
          />

          <label for="description">Notes</label>
          <textarea
            id="description"
            .value=${this.description}
            ?disabled=${this.busy}
            @input=${(e: Event) => {
              this.description = (e.target as HTMLTextAreaElement).value;
            }}
          ></textarea>

          <div class="recur-block">
            <h3>Repeat</h3>
            ${this.isRecurring
              ? html`<p class="hint" style="margin-top:0">
                  Changing the repeat rule applies when you choose
                  <strong>This and future</strong> or
                  <strong>Entire series</strong> on Save. “This occurrence
                  only” keeps the series rule and edits just this instance.
                </p>`
              : nothing}
            <label for="recur-freq">Frequency</label>
            <select
              id="recur-freq"
              ?disabled=${this.busy}
              @change=${(e: Event) => {
                this.recurFreq = (e.target as HTMLSelectElement)
                  .value as RecurrenceFreq;
                this.refreshValidation();
              }}
            >
              <option value="none" ?selected=${this.recurFreq === "none"}>
                Does not repeat
              </option>
              <option value="daily" ?selected=${this.recurFreq === "daily"}>
                Daily
              </option>
              <option value="weekly" ?selected=${this.recurFreq === "weekly"}>
                Weekly
              </option>
              <option value="monthly" ?selected=${this.recurFreq === "monthly"}>
                Monthly
              </option>
              <option value="yearly" ?selected=${this.recurFreq === "yearly"}>
                Yearly
              </option>
            </select>
            ${this.recurFreq !== "none"
              ? html`
                  <label for="recur-until">Until (optional)</label>
                  <input
                    id="recur-until"
                    type="date"
                    .value=${this.recurUntil}
                    min=${this.start ? this.start.slice(0, 10) : ""}
                    ?disabled=${this.busy}
                    @input=${(e: Event) => {
                      this.recurUntil = (e.target as HTMLInputElement).value;
                      this.refreshValidation();
                    }}
                  />
                  <p class="hint ${this.untilInvalid ? "warn" : ""}">
                    ${this.untilInvalid
                      ? "Until must be on or after the start date."
                      : "Optional end date for the series (inclusive). Must be on or after the start date. Weekly repeats on the weekday of the start."}
                  </p>
                  ${this.recurringMultiDay
                    ? html`<p class="hint warn">
                        End is on a later day than Start. For repeating timed
                        events, Save will keep the end clock time on the start
                        date (same-day duration per occurrence).
                      </p>`
                    : nothing}
                `
              : nothing}
          </div>

          ${this.remindersAvailable
            ? html`
                <div class="reminder-block">
                  <h3>Reminder</h3>
                  <p class="hint" style="margin-top:0">
                    Stored by the HA Calendar Reminders integration. Notify
                    delivery is best-effort until you validate it.
                  </p>
                  <label class="reminder-toggle">
                    <input
                      type="checkbox"
                      .checked=${this.reminderEnabled}
                      ?disabled=${this.busy}
                      @change=${(e: Event) => {
                        this.reminderEnabled = (
                          e.target as HTMLInputElement
                        ).checked;
                      }}
                    />
                    Remind me before this event
                  </label>
                  <div
                    class="reminder-fields"
                    data-disabled=${this.reminderEnabled ? "false" : "true"}
                  >
                    <div class="row-2">
                      <div>
                        <label for="rem-min">Minutes before</label>
                        <input
                          id="rem-min"
                          type="number"
                          min="0"
                          max="10080"
                          .value=${String(this.reminderMinutes)}
                          ?disabled=${this.busy || !this.reminderEnabled}
                          @input=${(e: Event) => {
                            this.reminderMinutes =
                              Number((e.target as HTMLInputElement).value) || 0;
                          }}
                        />
                      </div>
                      <div>
                        <label for="rem-notify">Notify service</label>
                        <input
                          id="rem-notify"
                          placeholder="notify.mobile_app_phone"
                          .value=${this.reminderNotify}
                          ?disabled=${this.busy || !this.reminderEnabled}
                          @input=${(e: Event) => {
                            this.reminderNotify = (
                              e.target as HTMLInputElement
                            ).value;
                          }}
                        />
                      </div>
                    </div>
                    <label for="rem-msg">Message (optional)</label>
                    <input
                      id="rem-msg"
                      .value=${this.reminderMessage}
                      ?disabled=${this.busy || !this.reminderEnabled}
                      @input=${(e: Event) => {
                        this.reminderMessage = (
                          e.target as HTMLInputElement
                        ).value;
                      }}
                    />
                  </div>
                </div>
              `
            : nothing}

          ${this.calendarMoveBlocked
            ? html`<p class="hint warn">
                Recurring events cannot change calendars. Keep the original
                calendar to avoid orphaning series instances.
              </p>`
            : null}
          ${this.moveNote
            ? html`<p class="hint ${this.calendarMoveBlocked ? "warn" : ""}">
                ${this.moveNote}
              </p>`
            : null}
          ${this.validationError
            ? html`<p
                class="hint ${this.untilInvalid || this.allDayRangeInvalid
                  ? "error"
                  : "warn"}"
                role="alert"
              >
                ${this.validationError}
              </p>`
            : null}
          ${this.errorMessage
            ? html`<p class="hint error" role="alert">${this.errorMessage}</p>`
            : null}

          <div class="form-actions ${this.event && this.canDelete ? "with-delete" : ""}">
            ${this.event && this.canDelete
              ? html`
                  <button
                    type="button"
                    class="danger"
                    ?disabled=${this.busy}
                    @click=${() => this.onDeleteClick()}
                  >
                    Delete
                  </button>
                `
              : nothing}
            <div class="form-actions-end">
              <button type="button" ?disabled=${this.busy} @click=${this.close}>
                Cancel
              </button>
              <button
                type="button"
                class="primary"
                ?disabled=${this.busy ||
                this.calendarMoveBlocked ||
                this.untilInvalid ||
                this.allDayRangeInvalid}
                @click=${() => this.onSaveClick()}
              >
                ${this.busy
                  ? "Saving…"
                  : this.isCrossCalendarMove
                    ? "Move & save"
                    : "Save"}
              </button>
            </div>
          </div>
        </div>
        ${this.renderScopePrompt()} ${this.renderConfirmDelete()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hac-event-form": HacEventForm;
  }
}
