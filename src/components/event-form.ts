import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { formStyles } from "../styles/shared";
import type { CalendarEvent, CalendarEventInput } from "../types";

export interface EventFormSaveDetail {
  mode: "create" | "edit";
  input: CalendarEventInput;
  /** Original event when editing (for move detection) */
  original?: CalendarEvent;
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

  @state() private summary = "";
  @state() private description = "";
  @state() private location = "";
  @state() private start = "";
  @state() private end = "";
  @state() private calendar = "";
  @state() private moveNote = "";

  connectedCallback(): void {
    super.connectedCallback();
    this.hydrate();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("event") || changed.has("defaults") || changed.has("calendars")) {
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
      this.start = this.toLocalInput(this.defaults.start ?? new Date().toISOString());
      this.end = this.toLocalInput(
        this.defaults.end ??
          new Date(Date.now() + 60 * 60 * 1000).toISOString()
      );
      this.calendar =
        this.defaults.calendar ?? this.calendars[0] ?? "calendar.family";
    }
    this.moveNote = "";
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

  private onCalendarChange(e: Event): void {
    const next = (e.target as HTMLSelectElement).value;
    this.calendar = next;
    if (this.event && next !== this.event.calendar) {
      this.moveNote =
        "Calendar change uses create-on-new then delete-from-old so the event is never lost first.";
    } else {
      this.moveNote = "";
    }
  }

  private close(): void {
    this.dispatchEvent(
      new CustomEvent("form-cancel", { bubbles: true, composed: true })
    );
  }

  private save(): void {
    if (!this.summary.trim() || !this.start || !this.end || !this.calendar) {
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
    const recurringBlocked =
      this.event &&
      (this.event.recurring || this.event.rrule) &&
      this.calendar !== this.event.calendar;

    return html`
      <div class="form-backdrop" @click=${this.close}>
        <div
          class="form-panel"
          @click=${(e: Event) => e.stopPropagation()}
          role="dialog"
          aria-label=${title}
        >
          <h2>${title}</h2>

          <label for="summary">Title</label>
          <input
            id="summary"
            .value=${this.summary}
            @input=${(e: Event) => {
              this.summary = (e.target as HTMLInputElement).value;
            }}
          />

          <label for="calendar">Calendar</label>
          <select id="calendar" .value=${this.calendar} @change=${this.onCalendarChange}>
            ${this.calendars.map(
              (id) => html`<option value=${id}>${id}</option>`
            )}
          </select>

          <label for="start">Start</label>
          <input
            id="start"
            type="datetime-local"
            .value=${this.start}
            @input=${(e: Event) => {
              this.start = (e.target as HTMLInputElement).value;
            }}
          />

          <label for="end">End</label>
          <input
            id="end"
            type="datetime-local"
            .value=${this.end}
            @input=${(e: Event) => {
              this.end = (e.target as HTMLInputElement).value;
            }}
          />

          <label for="location">Location</label>
          <input
            id="location"
            .value=${this.location}
            @input=${(e: Event) => {
              this.location = (e.target as HTMLInputElement).value;
            }}
          />

          <label for="description">Notes</label>
          <textarea
            id="description"
            .value=${this.description}
            @input=${(e: Event) => {
              this.description = (e.target as HTMLTextAreaElement).value;
            }}
          ></textarea>

          ${this.moveNote
            ? html`<p class="hint">${this.moveNote}</p>`
            : null}
          ${recurringBlocked
            ? html`<p class="hint warn">
                Recurring events cannot change calendars yet.
              </p>`
            : null}

          <div class="form-actions">
            <button type="button" @click=${this.close}>Cancel</button>
            <button
              type="button"
              class="primary"
              ?disabled=${Boolean(recurringBlocked)}
              @click=${this.save}
              style="background:var(--hac-accent);color:#fff;border:0;border-radius:8px;padding:0.45rem 0.9rem;font:inherit;cursor:pointer"
            >
              Save
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
