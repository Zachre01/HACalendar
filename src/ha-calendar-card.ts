import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  CARD_NAME,
  CARD_VERSION,
  DAY_END_HOUR,
  DAY_START_HOUR,
  PLACEHOLDER_CALENDARS,
} from "./const";
import { CalendarApi } from "./api/calendar-api";
import { FONT_STYLESHEET_HREF, cardStyles } from "./styles/shared";
import type {
  CalendarEvent,
  CalendarViewMode,
  HaCalendarCardConfig,
  HomeAssistant,
  PendingDuplicate,
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
  @state() private formBusy = false;
  @state() private formError = "";
  @state() private status = `HA Calendar Card v${CARD_VERSION}`;
  @state() private statusKind: "info" | "error" | "warn" = "info";
  @state() private loading = false;
  @state() private loadFailed = false;
  @state() private pendingDuplicate: PendingDuplicate | null = null;
  @state() private loadGeneration = 0;
  @state() private hasLoadedOnce = false;

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
      show_demo_when_empty: false,
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

  connectedCallback(): void {
    super.connectedCallback();
    this.ensureFonts();
  }

  private ensureFonts(): void {
    const id = "ha-calendar-card-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONT_STYLESHEET_HREF;
    document.head.appendChild(link);
  }

  protected updated(changed: Map<string, unknown>): void {
    if (
      changed.has("hass") ||
      changed.has("config") ||
      changed.has("anchorDate") ||
      changed.has("view")
    ) {
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
    const generation = ++this.loadGeneration;

    if (!this.hass) {
      this.events = this.demoEvents();
      this.loadFailed = false;
      this.hasLoadedOnce = true;
      this.status = "Preview mode — demo events (no hass)";
      this.statusKind = "info";
      return;
    }

    this.loading = true;
    const api = new CalendarApi(this.hass);
    const { start, end } = this.range();
    const entityIds = this.entities();

    try {
      const result = await api.getEvents(entityIds, start, end);
      if (generation !== this.loadGeneration) return;

      this.loadFailed = false;
      this.hasLoadedOnce = true;

      if (result.events.length) {
        this.events = result.events;
        const errNote = result.errors.length
          ? ` · ${result.errors.length} calendar(s) failed`
          : "";
        this.status = `${result.events.length} event(s)${errNote}`;
        this.statusKind = result.errors.length ? "warn" : "info";
      } else if (result.anySuccess) {
        this.events = this.config.show_demo_when_empty
          ? this.demoEvents()
          : [];
        this.status = this.config.show_demo_when_empty
          ? "No events — showing demo blocks"
          : "No events in this range";
        this.statusKind = "info";
      } else {
        // All configured entities failed (often placeholders not on this HA)
        this.events = this.config.show_demo_when_empty
          ? this.demoEvents()
          : [];
        this.loadFailed = !this.config.show_demo_when_empty;
        this.status = result.errors.length
          ? `Could not load: ${result.errors.join(", ")} — check entity ids`
          : "No calendars loaded";
        this.statusKind = "error";
      }
    } catch (err) {
      if (generation !== this.loadGeneration) return;
      this.events = [];
      this.loadFailed = true;
      this.hasLoadedOnce = true;
      this.status = `Load failed: ${err instanceof Error ? err.message : String(err)}`;
      this.statusKind = "error";
    } finally {
      if (generation === this.loadGeneration) {
        this.loading = false;
      }
    }
  }

  /** Preview-only demo data when hass is missing */
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
    this.formError = "";
    this.formBusy = false;
    this.formDefaults = {
      start: (detail?.start ?? new Date()).toISOString(),
      end: (detail?.end ?? new Date(Date.now() + 3600000)).toISOString(),
      calendar: this.entities()[0],
    };
    this.formOpen = true;
  }

  private openEdit(ev: CalendarEvent): void {
    this.editing = ev;
    this.formError = "";
    this.formBusy = false;
    this.formDefaults = {};
    this.formOpen = true;
  }

  private async onFormSave(
    e: CustomEvent<EventFormSaveDetail>
  ): Promise<void> {
    const { mode, input, original } = e.detail;

    if (!this.hass) {
      this.formError = "No Home Assistant connection — cannot save.";
      return;
    }

    this.formBusy = true;
    this.formError = "";
    const api = new CalendarApi(this.hass);

    try {
      if (mode === "create") {
        await api.createEvent(input);
        this.formOpen = false;
        this.status = `Created “${input.summary}” on ${input.calendar}`;
        this.statusKind = "info";
      } else if (original && input.calendar !== original.calendar) {
        if (original.recurring || original.rrule) {
          this.formError =
            "Recurring events cannot change calendars yet. Keep the original calendar.";
          return;
        }
        const moved = await api.moveEventToCalendar(original, input.calendar, {
          ...input,
          calendar: input.calendar,
        });
        if (moved.status === "moved") {
          this.formOpen = false;
          this.pendingDuplicate = null;
          this.status = `Moved “${input.summary}” → ${input.calendar}`;
          this.statusKind = "info";
        } else if (moved.status === "create_failed") {
          this.formError = `Move aborted (create failed): ${moved.error}`;
          this.status = this.formError;
          this.statusKind = "error";
          return;
        } else if (moved.status === "delete_failed") {
          this.formOpen = false;
          this.pendingDuplicate = moved.pending;
          this.status = `Copy exists on ${input.calendar}, but the old event could not be removed.`;
          this.statusKind = "warn";
        } else if (moved.status === "blocked_recurring") {
          this.formError = moved.reason;
          return;
        }
      } else if (original) {
        await api.updateEvent(
          original.calendar,
          original.uid,
          { ...input, calendar: original.calendar },
          original.recurrence_id
        );
        this.formOpen = false;
        this.status = `Updated “${input.summary}”`;
        this.statusKind = "info";
      }
      await this.refreshEvents();
    } catch (err) {
      this.formError = err instanceof Error ? err.message : String(err);
      this.status = this.formError;
      this.statusKind = "error";
    } finally {
      this.formBusy = false;
    }
  }

  private async cleanupDuplicate(): Promise<void> {
    if (!this.hass || !this.pendingDuplicate) return;
    const dup = this.pendingDuplicate;
    const api = new CalendarApi(this.hass);
    try {
      await api.deleteEvent(dup.entityId, dup.uid);
      this.pendingDuplicate = null;
      this.status = `Removed old copy of “${dup.summary}” from ${dup.entityId}`;
      this.statusKind = "info";
      await this.refreshEvents();
    } catch (err) {
      this.status = `Cleanup failed: ${err instanceof Error ? err.message : String(err)}`;
      this.statusKind = "error";
    }
  }

  private dismissDuplicate(): void {
    this.pendingDuplicate = null;
    this.status = "Duplicate warning dismissed — old copy may still exist";
    this.statusKind = "warn";
  }

  private rangeLabel(): string {
    const { start, end } = this.range();
    if (this.view === "day") {
      return start.toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
    const last = new Date(end);
    last.setDate(last.getDate() - 1);
    const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return `${start.toLocaleDateString(undefined, opts)} – ${last.toLocaleDateString(undefined, opts)}`;
  }

  protected render() {
    const title = this.config.title ?? "HA Calendar";
    const calendars = this.entities();
    const showEmpty =
      this.hasLoadedOnce &&
      !this.loading &&
      !this.loadFailed &&
      this.events.length === 0 &&
      Boolean(this.hass) &&
      !this.config.show_demo_when_empty;
    const showError =
      this.hasLoadedOnce && !this.loading && this.loadFailed && !this.formOpen;
    const showLoadingVeil = this.loading && this.hasLoadedOnce;

    return html`
      <div class="shell">
        ${this.pendingDuplicate
          ? html`
              <div class="banner" role="status">
                <span>
                  Duplicate after move: “${this.pendingDuplicate.summary}” is on
                  <strong>${this.pendingDuplicate.targetCalendar}</strong>, but
                  still on
                  <strong>${this.pendingDuplicate.entityId}</strong>.
                </span>
                <button
                  type="button"
                  class="danger"
                  @click=${() => void this.cleanupDuplicate()}
                >
                  Remove old copy
                </button>
                <button type="button" @click=${this.dismissDuplicate}>
                  Dismiss
                </button>
              </div>
            `
          : nothing}

        <header class="toolbar">
          <h1 class="brand">${title}</h1>
          <div class="toolbar-controls">
            <div class="nav-group">
              <button
                class="nav-btn"
                type="button"
                aria-label="Previous"
                @click=${() => this.shift(this.view === "day" ? -1 : -7)}
              >
                ‹
              </button>
              <button
                class="nav-btn"
                type="button"
                @click=${() => {
                  this.anchorDate = new Date();
                }}
              >
                Today
              </button>
              <button
                class="nav-btn"
                type="button"
                aria-label="Next"
                @click=${() => this.shift(this.view === "day" ? 1 : 7)}
              >
                ›
              </button>
            </div>
            <div class="view-toggle" role="group" aria-label="View">
              <button
                type="button"
                aria-pressed=${this.view === "day"}
                @click=${() => {
                  this.view = "day";
                }}
              >
                Day
              </button>
              <button
                type="button"
                aria-pressed=${this.view === "week"}
                @click=${() => {
                  this.view = "week";
                }}
              >
                Week
              </button>
            </div>
            <button
              class="primary-btn"
              type="button"
              @click=${() => this.openCreate()}
            >
              New
            </button>
          </div>
        </header>

        <div class="grid-wrap">
          ${this.loading && !this.hasLoadedOnce
            ? html`
                <div class="state-panel" data-kind="loading">
                  <div class="spinner" style="width:1.4rem;height:1.4rem;border:2px solid var(--hac-line-strong);border-top-color:var(--hac-accent);border-radius:50%;animation:spin 0.7s linear infinite"></div>
                  <h2>Loading calendar</h2>
                  <p>Fetching events for ${this.rangeLabel()}.</p>
                </div>
              `
            : nothing}
          ${showLoadingVeil ? html`<div class="loading-veil"></div>` : nothing}
          ${showError
            ? html`
                <div class="state-panel" data-kind="error">
                  <div class="state-mark" aria-hidden="true"></div>
                  <h2>Couldn’t load calendars</h2>
                  <p>${this.status}</p>
                  <div class="state-actions">
                    <button
                      class="primary-btn"
                      type="button"
                      @click=${() => void this.refreshEvents()}
                    >
                      Retry
                    </button>
                    <button
                      class="ghost-btn"
                      type="button"
                      @click=${() => this.openCreate()}
                    >
                      New event anyway
                    </button>
                  </div>
                </div>
              `
            : nothing}
          ${showEmpty
            ? html`
                <div class="state-panel" data-kind="empty">
                  <div class="state-mark" aria-hidden="true"></div>
                  <h2>Nothing scheduled</h2>
                  <p>
                    ${this.rangeLabel()} is clear. Tap New, or double-click a
                    time slot on larger screens.
                  </p>
                  <div class="state-actions">
                    <button
                      class="primary-btn"
                      type="button"
                      @click=${() => this.openCreate()}
                    >
                      New event
                    </button>
                  </div>
                </div>
              `
            : nothing}

          <hac-time-grid
            .mode=${this.view}
            .anchorDate=${this.anchorDate}
            .events=${this.events}
            .calendars=${calendars}
            .dayStartHour=${this.config.day_start_hour ?? DAY_START_HOUR}
            .dayEndHour=${this.config.day_end_hour ?? DAY_END_HOUR}
            @event-select=${(e: CustomEvent<CalendarEvent>) =>
              this.openEdit(e.detail)}
            @slot-create=${(e: CustomEvent<{ start: Date; end: Date }>) =>
              this.openCreate(e.detail)}
          ></hac-time-grid>

          ${this.formOpen
            ? html`
                <hac-event-form
                  .calendars=${calendars}
                  .event=${this.editing}
                  .defaults=${this.formDefaults}
                  .busy=${this.formBusy}
                  .errorMessage=${this.formError}
                  @form-cancel=${() => {
                    if (!this.formBusy) this.formOpen = false;
                  }}
                  @form-save=${this.onFormSave}
                ></hac-event-form>
              `
            : nothing}
        </div>

        <div class="status" data-kind=${this.statusKind}>
          ${this.loading
            ? html`<span class="spinner" aria-hidden="true"></span>`
            : nothing}
          <span>${this.status}</span>
          ${this.statusKind === "error" && !showError
            ? html`<button
                class="ghost-btn"
                type="button"
                style="min-height:1.75rem;padding:0.2rem 0.6rem;font-size:0.78rem"
                @click=${() => void this.refreshEvents()}
              >
                Retry
              </button>`
            : nothing}
        </div>
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
