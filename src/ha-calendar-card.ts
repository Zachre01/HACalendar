import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  CARD_NAME,
  CARD_VERSION,
  DAY_END_HOUR,
  DAY_START_HOUR,
  PLACEHOLDER_CALENDARS,
} from "./const";
import { CalendarApi } from "./api/calendar-api";
import { cardStyles } from "./styles/shared";
import type {
  CalendarEvent,
  CalendarViewMode,
  HaCalendarCardConfig,
  HomeAssistant,
} from "./types";
import type { EventFormSaveDetail } from "./components/event-form";
import "./components/time-grid";
import "./components/event-form";

@customElement(CARD_NAME)
export class HaCalendarCard extends LitElement {
  static styles = [
    cardStyles,
    css`
      :host {
        position: relative;
      }
    `,
  ];

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private config: HaCalendarCardConfig = {
    type: `custom:${CARD_NAME}`,
  };
  @state() private view: CalendarViewMode = "week";
  @state() private anchorDate = new Date();
  @state() private events: CalendarEvent[] = [];
  @state() private formOpen = false;
  @state() private editing: CalendarEvent | null = null;
  @state() private formDefaults: {
    start?: string;
    end?: string;
    calendar?: string;
  } = {};
  @state() private status = `HA Calendar Card v${CARD_VERSION} — scaffold`;
  @state() private statusKind: "info" | "error" | "warn" = "info";

  public setConfig(config: HaCalendarCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this.config = {
      title: "HA Calendar",
      entities: [...PLACEHOLDER_CALENDARS],
      initial_view: "week",
      day_start_hour: DAY_START_HOUR,
      day_end_hour: DAY_END_HOUR,
      ...config,
      type: config.type ?? `custom:${CARD_NAME}`,
    };
    this.view = this.config.initial_view ?? "week";
  }

  public static getStubConfig(): Partial<HaCalendarCardConfig> {
    return {
      title: "HA Calendar",
      entities: [...PLACEHOLDER_CALENDARS],
      initial_view: "week",
    };
  }

  public getCardSize(): number {
    return 8;
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") || changed.has("config") || changed.has("anchorDate") || changed.has("view")) {
      void this.refreshEvents();
    }
  }

  private entities(): string[] {
    return this.config.entities?.length
      ? this.config.entities
      : [...PLACEHOLDER_CALENDARS];
  }

  private range(): { start: Date; end: Date } {
    const start = new Date(this.anchorDate);
    start.setHours(0, 0, 0, 0);
    if (this.view === "day") {
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      return { start, end };
    }
    const weekday = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - weekday);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return { start, end };
  }

  private async refreshEvents(): Promise<void> {
    if (!this.hass) {
      this.events = this.demoEvents();
      return;
    }
    const api = new CalendarApi(this.hass);
    const { start, end } = this.range();
    try {
      const loaded = await api.getEvents(this.entities(), start, end);
      this.events = loaded.length ? loaded : this.demoEvents();
      if (!loaded.length) {
        this.status = "No events from HA yet — showing demo blocks";
        this.statusKind = "info";
      }
    } catch (err) {
      this.events = this.demoEvents();
      this.status = `Load failed: ${err instanceof Error ? err.message : String(err)}`;
      this.statusKind = "error";
    }
  }

  /** Visual shell demo data when HA is missing or empty */
  private demoEvents(): CalendarEvent[] {
    const day = new Date(this.anchorDate);
    day.setHours(0, 0, 0, 0);
    const mk = (
      hour: number,
      durationH: number,
      summary: string,
      calendar: string
    ): CalendarEvent => {
      const start = new Date(day);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setHours(hour + durationH, 0, 0, 0);
      return {
        uid: `demo-${summary}-${hour}`,
        summary,
        start: start.toISOString(),
        end: end.toISOString(),
        calendar,
      };
    };
    const cals = this.entities();
    return [
      mk(9, 1, "Morning standup", cals[0] ?? "calendar.family"),
      mk(11, 2, "Deep work", cals[1] ?? "calendar.personal"),
      mk(14, 1, "School pickup", cals[0] ?? "calendar.family"),
    ];
  }

  private shift(days: number): void {
    const next = new Date(this.anchorDate);
    next.setDate(next.getDate() + days);
    this.anchorDate = next;
  }

  private openCreate(detail?: { start: Date; end: Date }): void {
    this.editing = null;
    this.formDefaults = {
      start: (detail?.start ?? new Date()).toISOString(),
      end: (detail?.end ?? new Date(Date.now() + 3600000)).toISOString(),
      calendar: this.entities()[0],
    };
    this.formOpen = true;
  }

  private openEdit(ev: CalendarEvent): void {
    this.editing = ev;
    this.formDefaults = {};
    this.formOpen = true;
  }

  private async onFormSave(e: CustomEvent<EventFormSaveDetail>): Promise<void> {
    const { mode, input, original } = e.detail;
    this.formOpen = false;

    if (!this.hass) {
      this.status = "No hass connection — form save sketched only";
      this.statusKind = "warn";
      return;
    }

    const api = new CalendarApi(this.hass);

    try {
      if (mode === "create") {
        await api.createEvent(input);
        this.status = "Event created";
        this.statusKind = "info";
      } else if (original && input.calendar !== original.calendar) {
        const moved = await api.moveEventToCalendar(
          { ...original, ...input, calendar: original.calendar },
          input.calendar
        );
        if (moved.status === "moved") {
          this.status = `Moved to ${input.calendar}`;
          this.statusKind = "info";
        } else if (moved.status === "create_failed") {
          this.status = `Move aborted (create failed): ${moved.error}`;
          this.statusKind = "error";
        } else if (moved.status === "delete_failed") {
          this.status = `Duplicate left on old calendar — cleanup needed: ${moved.error}`;
          this.statusKind = "warn";
        } else if (moved.status === "blocked_recurring") {
          this.status = moved.reason;
          this.statusKind = "warn";
        }
      } else if (original) {
        await api.updateEvent(original.calendar, original.uid, input);
        this.status = "Event updated";
        this.statusKind = "info";
      }
      await this.refreshEvents();
    } catch (err) {
      this.status = err instanceof Error ? err.message : String(err);
      this.statusKind = "error";
    }
  }

  protected render() {
    const title = this.config.title ?? "HA Calendar";
    const calendars = this.entities();

    return html`
      <div class="shell">
        <header class="toolbar">
          <h1 class="brand">${title}</h1>
          <button class="nav-btn" type="button" @click=${() => this.shift(this.view === "day" ? -1 : -7)}>
            ‹
          </button>
          <button class="nav-btn" type="button" @click=${() => { this.anchorDate = new Date(); }}>
            Today
          </button>
          <button class="nav-btn" type="button" @click=${() => this.shift(this.view === "day" ? 1 : 7)}>
            ›
          </button>
          <div class="view-toggle" role="group" aria-label="View">
            <button
              type="button"
              aria-pressed=${this.view === "day"}
              @click=${() => { this.view = "day"; }}
            >
              Day
            </button>
            <button
              type="button"
              aria-pressed=${this.view === "week"}
              @click=${() => { this.view = "week"; }}
            >
              Week
            </button>
          </div>
          <button class="primary-btn" type="button" @click=${() => this.openCreate()}>
            New
          </button>
        </header>

        <div class="grid-wrap">
          <hac-time-grid
            .mode=${this.view}
            .anchorDate=${this.anchorDate}
            .events=${this.events}
            .dayStartHour=${this.config.day_start_hour ?? DAY_START_HOUR}
            .dayEndHour=${this.config.day_end_hour ?? DAY_END_HOUR}
            @event-select=${(e: CustomEvent<CalendarEvent>) => this.openEdit(e.detail)}
            @slot-create=${(e: CustomEvent<{ start: Date; end: Date }>) =>
              this.openCreate(e.detail)}
          ></hac-time-grid>

          ${this.formOpen
            ? html`
                <hac-event-form
                  .calendars=${calendars}
                  .event=${this.editing}
                  .defaults=${this.formDefaults}
                  @form-cancel=${() => { this.formOpen = false; }}
                  @form-save=${this.onFormSave}
                ></hac-event-form>
              `
            : null}
        </div>

        <div class="status" data-kind=${this.statusKind}>${this.status}</div>
      </div>
    `;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: "HA Calendar Card",
  description:
    "Day/week time-slot calendar with create/edit and safe calendar moves",
  preview: true,
});

declare global {
  interface HTMLElementTagNameMap {
    [CARD_NAME]: HaCalendarCard;
  }
}

console.info(
  `%c HA-CALENDAR-CARD %c ${CARD_VERSION} `,
  "background:#0d7a6f;color:#fff;padding:2px 4px;border-radius:4px 0 0 4px",
  "background:#1a2b33;color:#fff;padding:2px 4px;border-radius:0 4px 4px 0"
);
