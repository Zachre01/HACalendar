import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { formStyles } from "../styles/shared";
import type {
  CalendarEvent,
  CalendarEventInput,
  ReminderFormState,
} from "../types";

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
}

@customElement("hac-event-form")
export class HacEventForm extends LitElement {
  static styles = formStyles;

  /** Writable calendars from card config (any source ↔ any target). */
  @property({ attribute: false }) calendars: string[] = [];
  @property({ attribute: false }) event: CalendarEvent | null = null;
  @property({ attribute: false }) defaults: {
    start?: string;
    end?: string;
    calendar?: string;
  } = {};
  @property({ type: Boolean }) busy = false;
  @property({ type: String }) errorMessage = "";
  @property({ type: Boolean }) remindersAvailable = false;
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
  @state() private calendar = "";
  @state() private moveNote = "";
  @state() private reminderEnabled = false;
  @state() private reminderMinutes = 30;
  @state() private reminderNotify = "notify.mobile_app_phone";
  @state() private reminderMessage = "";
  /** Prevents reminder/async prop updates from wiping calendar selection */
  @state() private hydrateKey = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.hydrateEventFields(true);
    this.applyReminderFields(true);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("event") || changed.has("defaults")) {
      this.hydrateEventFields();
      this.applyReminderFields(true);
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
      return `edit:${this.event.calendar}:${this.event.uid}`;
    }
    return `create:${this.defaults.start ?? ""}:${this.defaults.end ?? ""}:${this.defaults.calendar ?? ""}`;
  }

  private hydrateEventFields(force = false): void {
    const key = this.eventKey();
    if (!force && key === this.hydrateKey) return;
    this.hydrateKey = key;

    if (this.event) {
      this.summary = this.event.summary;
      this.description = this.event.description ?? "";
      this.location = this.event.location ?? "";
      this.start = this.toLocalInput(this.event.start);
      this.end = this.toLocalInput(this.event.end);
      this.calendar = this.event.calendar;
    } else {
      this.summary = "";
      this.description = "";
      this.location = "";
      this.start = this.toLocalInput(
        this.defaults.start ?? new Date().toISOString()
      );
      this.end = this.toLocalInput(
        this.defaults.end ??
          new Date(Date.now() + 60 * 60 * 1000).toISOString()
      );
      this.calendar = this.defaults.calendar ?? this.calendars[0] ?? "";
    }
    this.moveNote = "";
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
    return new Date(value).toISOString();
  }

  private get isRecurring(): boolean {
    return Boolean(this.event?.recurring || this.event?.rrule);
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
    this.calendar = next;
    if (this.event && next !== this.event.calendar) {
      if (this.isRecurring) {
        this.moveNote =
          "Recurring events cannot change calendars yet. Keep the original calendar or recreate as a one-off.";
      } else {
        this.moveNote =
          "Home Assistant cannot move events across calendars — Save will create on the new calendar, then delete from the old one.";
      }
    } else {
      this.moveNote = "";
    }
  }

  private close(): void {
    if (this.busy) return;
    this.dispatchEvent(
      new CustomEvent("form-cancel", { bubbles: true, composed: true })
    );
  }

  private save(): void {
    if (this.busy) return;
    if (!this.summary.trim() || !this.start || !this.end || !this.calendar) {
      return;
    }
    if (this.calendarMoveBlocked) {
      return;
    }
    const input: CalendarEventInput = {
      summary: this.summary.trim(),
      description: this.description.trim() || undefined,
      location: this.location.trim() || undefined,
      start: this.fromLocalInput(this.start),
      end: this.fromLocalInput(this.end),
      calendar: this.calendar,
    };
    const crossCalendarMove = this.isCrossCalendarMove;
    const detail: EventFormSaveDetail = {
      mode: this.event ? "edit" : "create",
      input,
      original: this.event ?? undefined,
      crossCalendarMove,
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

  render() {
    const title = this.event ? "Edit event" : "New event";
    const options = this.calendarOptions;

    return html`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${(e: Event) => e.stopPropagation()}
          role="dialog"
          aria-label=${title}
        >
          <h2>${title}</h2>
          <p class="form-sub">
            ${this.event
              ? "Edit details, change calendar (create+delete move), or reminder."
              : "Add a one-off event to a configured calendar."}
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
          <select
            id="calendar"
            ?disabled=${this.busy || options.length === 0}
            @change=${this.onCalendarChange}
          >
            ${options.map(
              (id) => html`
                <option value=${id} ?selected=${id === this.calendar}>
                  ${id}
                </option>
              `
            )}
          </select>
          ${this.event
            ? html`<p class="hint">
                Changing calendar moves the event to any other configured
                writable calendar via create-on-new, then delete-from-old (HA
                cannot move across calendars in place).
              </p>`
            : nothing}

          <div class="row-2">
            <div>
              <label for="start">Start</label>
              <input
                id="start"
                type="datetime-local"
                .value=${this.start}
                ?disabled=${this.busy}
                @input=${(e: Event) => {
                  this.start = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
            <div>
              <label for="end">End</label>
              <input
                id="end"
                type="datetime-local"
                .value=${this.end}
                ?disabled=${this.busy}
                @input=${(e: Event) => {
                  this.end = (e.target as HTMLInputElement).value;
                }}
              />
            </div>
          </div>

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

          ${this.isRecurring
            ? html`<p class="hint warn">
                This is a recurring event. Same-calendar edits are sent to HA;
                changing calendars is blocked until recurring moves are designed.
              </p>`
            : null}
          ${this.moveNote
            ? html`<p class="hint ${this.calendarMoveBlocked ? "warn" : ""}">
                ${this.moveNote}
              </p>`
            : null}
          ${this.errorMessage
            ? html`<p class="hint error" role="alert">${this.errorMessage}</p>`
            : null}

          <div class="form-actions">
            <button type="button" ?disabled=${this.busy} @click=${this.close}>
              Cancel
            </button>
            <button
              type="button"
              class="primary"
              ?disabled=${this.busy || this.calendarMoveBlocked}
              @click=${this.save}
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
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hac-event-form": HacEventForm;
  }
}
