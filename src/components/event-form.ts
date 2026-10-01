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
  /** Reminder form state when integration hooks are active */
  reminder?: ReminderFormState;
}

@customElement("hac-event-form")
export class HacEventForm extends LitElement {
  static styles = formStyles;

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

  connectedCallback(): void {
    super.connectedCallback();
    this.hydrate();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (
      changed.has("event") ||
      changed.has("defaults") ||
      changed.has("calendars") ||
      changed.has("reminder") ||
      changed.has("reminderDefaults")
    ) {
      this.hydrate();
    }
  }

  private hydrate(): void {
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
      this.calendar =
        this.defaults.calendar ?? this.calendars[0] ?? "calendar.family";
    }
    this.moveNote = "";

    const minutes =
      this.reminder?.minutes_before ??
      this.reminderDefaults.minutes_before ??
      30;
    const notify =
      this.reminder?.notify_service ||
      this.reminderDefaults.notify_service ||
      "notify.mobile_app_phone";
    this.reminderEnabled = Boolean(this.reminder?.enabled);
    this.reminderMinutes = minutes;
    this.reminderNotify = notify;
    this.reminderMessage = this.reminder?.message ?? "";
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

  private get calendarMoveBlocked(): boolean {
    return (
      this.isRecurring &&
      Boolean(this.event) &&
      this.calendar !== this.event!.calendar
    );
  }

  private onCalendarChange(e: Event): void {
    const next = (e.target as HTMLSelectElement).value;
    this.calendar = next;
    if (this.event && next !== this.event.calendar) {
      if (this.isRecurring) {
        this.moveNote =
          "Recurring events cannot change calendars yet (phase 1). Keep the original calendar or recreate as a one-off.";
      } else {
        this.moveNote =
          "Calendar change uses create-on-new then delete-from-old so the event is never lost first.";
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
    const detail: EventFormSaveDetail = {
      mode: this.event ? "edit" : "create",
      input,
      original: this.event ?? undefined,
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
              ? "Edit details, calendar, or reminder."
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
            .value=${this.calendar}
            ?disabled=${this.busy}
            @change=${this.onCalendarChange}
          >
            ${this.calendars.map(
              (id) => html`<option value=${id}>${id}</option>`
            )}
          </select>

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
              ${this.busy ? "Saving…" : "Save"}
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
