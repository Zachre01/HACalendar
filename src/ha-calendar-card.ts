import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  CARD_NAME,
  CARD_VERSION,
  CLOCK_TICK_MS,
  DAY_END_HOUR,
  DAY_START_HOUR,
  EVENT_POLL_MS,
  PLACEHOLDER_CALENDARS,
} from "./const";
import { CalendarApi, recurrenceParams } from "./api/calendar-api";
import { ReminderApi } from "./api/reminder-api";
import { FONT_STYLESHEET_HREF, cardStyles } from "./styles/shared";
import type {
  CalendarEvent,
  CalendarViewMode,
  HaCalendarCardConfig,
  HomeAssistant,
  PendingDuplicate,
  ReminderFormState,
  ThemeMode,
  WeatherDay,
  WeatherSummary,
} from "./types";
import type {
  EventFormDeleteDetail,
  EventFormSaveDetail,
} from "./components/event-form";
import {
  buildCalendarColorMap,
  fallbackCalendarColor,
  fetchCalendarColorsFromRegistry,
  type CalendarColorMap,
} from "./utils/calendar-colors";
import {
  cycleThemeMode,
  readThemePreference,
  resolveTheme,
  themeToggleGlyph,
  themeToggleLabel,
  writeThemePreference,
  type ResolvedTheme,
} from "./utils/theme";
import {
  fetchWeatherForecast,
  readWeatherSummary,
  resolveWeatherEntityId,
  weatherLabel,
} from "./utils/weather";
import {
  friendlyWeatherLabel,
  weatherGlyphCute,
  weatherMood,
} from "./utils/weather-ui";
import { formatHassError } from "./utils/ha-error";
import "./components/time-grid";
import "./components/month-grid";
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
  @state() private view: CalendarViewMode = "month";
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
  @state() private formReminder: ReminderFormState | null = null;
  /** Calendar entity ids currently hidden by filter pills */
  @state() private hiddenCalendars: string[] = [];
  /** Clock tick — UI only, does not refetch events */
  @state() private nowTick = Date.now();
  /** Forecast rows from weather.get_forecasts (modern HA has no state attribute) */
  @state() private weatherForecast: WeatherDay[] = [];
  /** Resolved CSS colors per calendar.* (HA registry first, palette fallback) */
  @state() private calendarColors: CalendarColorMap = {};
  /** User/config theme preference (light | dark | auto) */
  @state() private themePreference: ThemeMode = "auto";
  /** Applied theme after resolving auto → system */
  @state() private resolvedTheme: ResolvedTheme = "light";
  /** Month/year jump picker open */
  @state() private monthPickerOpen = false;
  /** Year shown inside the month picker (may differ from anchor while browsing) */
  @state() private pickerYear = new Date().getFullYear();

  private pollTimer: number | null = null;
  private clockTimer: number | null = null;
  private hadHass = false;
  private weatherEntityLoaded: string | null = null;
  private weatherFetchInFlight = false;
  private registryUnsub: (() => void) | null = null;
  private colorLoadGeneration = 0;
  private subscribedConnection: HomeAssistant["connection"] | null = null;
  /** Ancestors we styled for panel height cascading — cleared on leave/disconnect */
  private panelStyledAncestors: HTMLElement[] = [];
  private panelResizeObserver: ResizeObserver | null = null;
  private panelHost: HTMLElement | null = null;
  private themeMediaQuery: MediaQueryList | null = null;
  private themeMediaHandler: ((e: MediaQueryListEvent) => void) | null = null;
  private onDocPointerDown: ((e: Event) => void) | null = null;

  public setConfig(config: HaCalendarCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    const weatherEntity = resolveWeatherEntityId(config);
    this.config = {
      title: "Calendar",
      entities: [...PLACEHOLDER_CALENDARS],
      initial_view: "month",
      theme: "auto",
      day_start_hour: DAY_START_HOUR,
      day_end_hour: DAY_END_HOUR,
      show_demo_when_empty: false,
      ...config,
      // Canonicalize: accept alias `weather` → `weather_entity`
      weather_entity: weatherEntity,
      type: config.type ?? `custom:${CARD_NAME}`,
    };
    this.view = this.config.initial_view ?? "month";
    this.applyThemePreference(readThemePreference(this.config.theme));
  }

  public static getStubConfig(): Partial<HaCalendarCardConfig> {
    return {
      title: "Calendar",
      entities: [...PLACEHOLDER_CALENDARS],
      initial_view: "month",
    };
  }

  public getCardSize(): number {
    return 10;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.ensureFonts();
    this.startTimers();
    this.syncPanelLayout();
    this.bindThemeMedia();
    this.bindPickerDismiss();
    this.applyThemePreference(
      readThemePreference(this.config.theme ?? "auto")
    );
    void this.refreshCalendarColors();
    this.subscribeRegistryColors();
  }

  protected firstUpdated(): void {
    this.syncPanelLayout();
    this.syncThemeAttribute();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearTimers();
    this.clearPanelLayout();
    this.unsubscribeRegistryColors();
    this.unbindThemeMedia();
    this.unbindPickerDismiss();
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

  /**
   * Lovelace `type: panel` hosts the card in `hui-panel-view`.
   * Mark the host and cascade height through `hui-card` so we fill the
   * panel without a nested page + card scrollbar.
   */
  private syncPanelLayout(): void {
    const panel = this.closest("hui-panel-view") as HTMLElement | null;
    if (!panel) {
      this.clearPanelLayout();
      return;
    }

    this.setAttribute("data-layout", "panel");

    const huiCard = this.closest("hui-card") as HTMLElement | null;
    const targets = [panel, huiCard].filter(
      (el): el is HTMLElement => Boolean(el)
    );

    // Reset previous ancestor styles if the host moved
    if (this.panelHost !== panel) {
      this.clearPanelAncestorStyles();
      this.panelHost = panel;
      for (const el of targets) {
        this.stylePanelAncestor(el);
        this.panelStyledAncestors.push(el);
      }
      this.panelResizeObserver?.disconnect();
      this.panelResizeObserver = new ResizeObserver(() =>
        this.applyPanelHeight()
      );
      this.panelResizeObserver.observe(panel);
    }

    this.applyPanelHeight();
  }

  private stylePanelAncestor(el: HTMLElement): void {
    el.dataset.hacPanelStyled = "1";
    el.style.setProperty("display", "flex");
    el.style.setProperty("flex-direction", "column");
    el.style.setProperty("flex", "1 1 auto");
    el.style.setProperty("height", "100%");
    el.style.setProperty("max-height", "100%");
    el.style.setProperty("min-height", "0");
    el.style.setProperty("overflow", "hidden");
    el.style.setProperty("box-sizing", "border-box");
  }

  private applyPanelHeight(): void {
    const panel = this.panelHost;
    if (!panel) return;
    const h = panel.clientHeight;
    if (h > 0) {
      this.style.setProperty("--hac-panel-height", `${h}px`);
    } else {
      // Parent % height not resolved yet — last-resort viewport fallback
      // that still subtracts HA header + safe areas (not double-counted padding).
      this.style.setProperty(
        "--hac-panel-height",
        "calc(100dvh - var(--header-height, 56px) - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px))"
      );
    }
  }

  private clearPanelAncestorStyles(): void {
    for (const el of this.panelStyledAncestors) {
      if (el.dataset.hacPanelStyled !== "1") continue;
      delete el.dataset.hacPanelStyled;
      for (const prop of [
        "display",
        "flex-direction",
        "flex",
        "height",
        "max-height",
        "min-height",
        "overflow",
        "box-sizing",
      ]) {
        el.style.removeProperty(prop);
      }
    }
    this.panelStyledAncestors = [];
  }

  private clearPanelLayout(): void {
    this.panelResizeObserver?.disconnect();
    this.panelResizeObserver = null;
    this.panelHost = null;
    this.clearPanelAncestorStyles();
    this.removeAttribute("data-layout");
    this.style.removeProperty("--hac-panel-height");
  }

  private startTimers(): void {
    this.clearTimers();
    this.clockTimer = window.setInterval(() => {
      this.nowTick = Date.now();
    }, CLOCK_TICK_MS);
    this.pollTimer = window.setInterval(() => {
      void this.refreshEvents({ silent: true });
      void this.refreshWeatherForecast(true);
    }, EVENT_POLL_MS);
  }

  private clearTimers(): void {
    if (this.clockTimer != null) {
      window.clearInterval(this.clockTimer);
      this.clockTimer = null;
    }
    if (this.pollTimer != null) {
      window.clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    this.syncPanelLayout();
    // Do NOT refresh on every hass churn — Lovelace replaces hass ~1–2s and caused flicker.
    // Weather chips still re-render from live hass.states without refetching calendars.
    if (changed.has("config") || changed.has("anchorDate") || changed.has("view")) {
      void this.refreshEvents();
      void this.refreshWeatherForecast(true);
      if (changed.has("config")) {
        void this.refreshCalendarColors();
        this.subscribeRegistryColors();
      }
      return;
    }
    if (changed.has("hass")) {
      const hasHass = Boolean(this.hass);
      if (hasHass && !this.hadHass) {
        this.hadHass = true;
        void this.refreshEvents();
        void this.refreshWeatherForecast(true);
        void this.refreshCalendarColors();
        this.subscribeRegistryColors();
      } else if (!hasHass) {
        this.hadHass = false;
        this.unsubscribeRegistryColors();
      } else {
        // Re-fetch forecast occasionally when entity id changes or cache empty
        void this.refreshWeatherForecast(false);
        // Keep registry subscription alive if connection was replaced
        this.subscribeRegistryColors();
      }
    }
  }

  private entities(): string[] {
    return this.config.entities?.length
      ? [...this.config.entities]
      : [...PLACEHOLDER_CALENDARS];
  }

  private formCalendars(): string[] {
    const configured = this.entities();
    const writable = this.hass
      ? new CalendarApi(this.hass).listWritableCalendars(configured)
      : configured;
    const current = this.editing?.calendar;
    if (current && !writable.includes(current)) {
      return [current, ...writable];
    }
    return writable;
  }

  /** True when the open edit form may offer Delete. */
  private canDeleteEditing(): boolean {
    if (!this.editing) return false;
    if (!this.hass) return true;
    return new CalendarApi(this.hass).canDelete(this.editing.calendar);
  }

  private calendarColor(entityId: string): string {
    if (this.calendarColors[entityId]) {
      return this.calendarColors[entityId];
    }
    const entities = this.entities();
    const idx = Math.max(0, entities.indexOf(entityId));
    return fallbackCalendarColor(idx);
  }

  private async refreshCalendarColors(): Promise<void> {
    const entities = this.entities();
    const generation = ++this.colorLoadGeneration;

    // Immediate palette / display-color map so UI never flashes empty
    const immediate = buildCalendarColorMap(entities, {}, this.hass);
    this.calendarColors = immediate;

    if (!this.hass) return;

    const fromRegistry = await fetchCalendarColorsFromRegistry(
      this.hass,
      entities
    );
    if (generation !== this.colorLoadGeneration) return;

    this.calendarColors = buildCalendarColorMap(
      entities,
      fromRegistry,
      this.hass
    );
  }

  private subscribeRegistryColors(): void {
    const conn = this.hass?.connection;
    if (!conn?.subscribeEvents) return;
    // Avoid churn: Lovelace replaces hass often; keep one live subscription
    if (this.registryUnsub && this.subscribedConnection === conn) return;

    this.unsubscribeRegistryColors();
    this.subscribedConnection = conn;
    void conn
      .subscribeEvents(() => {
        void this.refreshCalendarColors();
      }, "entity_registry_updated")
      .then((unsub) => {
        // Drop if hass/connection changed while awaiting
        if (this.hass?.connection !== conn) {
          unsub();
          return;
        }
        this.registryUnsub = unsub;
        this.subscribedConnection = conn;
      })
      .catch(() => {
        // Subscription optional — colors still load on connect/config
      });
  }

  private unsubscribeRegistryColors(): void {
    if (this.registryUnsub) {
      try {
        this.registryUnsub();
      } catch {
        // already closed
      }
      this.registryUnsub = null;
    }
    this.subscribedConnection = null;
  }

  private calendarLabel(entityId: string): string {
    return entityId.replace(/^calendar\./, "").replace(/_/g, " ");
  }

  private filteredEvents(): CalendarEvent[] {
    if (!this.hiddenCalendars.length) return this.events;
    const hidden = new Set(this.hiddenCalendars);
    return this.events.filter((ev) => !hidden.has(ev.calendar));
  }

  private toggleCalendarFilter(entityId: string): void {
    if (this.hiddenCalendars.includes(entityId)) {
      this.hiddenCalendars = this.hiddenCalendars.filter((id) => id !== entityId);
    } else {
      this.hiddenCalendars = [...this.hiddenCalendars, entityId];
    }
  }

  private range(): { start: Date; end: Date } {
    const start = new Date(this.anchorDate);
    start.setHours(0, 0, 0, 0);
    if (this.view === "day") {
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      return { start, end };
    }
    if (this.view === "month") {
      const monthStart = new Date(start.getFullYear(), start.getMonth(), 1);
      const weekday = (monthStart.getDay() + 6) % 7;
      monthStart.setDate(monthStart.getDate() - weekday);
      const end = new Date(monthStart);
      end.setDate(end.getDate() + 42);
      return { start: monthStart, end };
    }
    const weekday = (start.getDay() + 6) % 7;
    start.setDate(start.getDate() - weekday);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);
    return { start, end };
  }

  private async refreshEvents(opts?: { silent?: boolean }): Promise<void> {
    const generation = ++this.loadGeneration;
    const silent = Boolean(opts?.silent) && this.hasLoadedOnce;

    if (!this.hass) {
      this.events = this.demoEvents();
      this.loadFailed = false;
      this.hasLoadedOnce = true;
      this.loading = false;
      this.status = "Preview mode — demo events (no hass)";
      this.statusKind = "info";
      return;
    }

    if (!silent) {
      this.loading = true;
    }
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
      this.status = `Load failed: ${formatHassError(err)}`;
      this.statusKind = "error";
    } finally {
      if (generation === this.loadGeneration) {
        this.loading = false;
      }
    }
  }

  private demoEvents(): CalendarEvent[] {
    const day = new Date(this.anchorDate);
    day.setHours(0, 0, 0, 0);
    const mk = (
      dayOffset: number,
      hour: number,
      durationH: number,
      summary: string,
      calendar: string
    ): CalendarEvent => {
      const start = new Date(day);
      start.setDate(start.getDate() + dayOffset);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setHours(hour + durationH, 0, 0, 0);
      return {
        uid: `demo-${summary}-${dayOffset}-${hour}`,
        summary,
        start: start.toISOString(),
        end: end.toISOString(),
        calendar,
      };
    };
    const cals = this.entities();
    return [
      mk(0, 9, 1, "Morning standup", cals[0] ?? "calendar.family"),
      mk(0, 11, 2, "Deep work", cals[1] ?? "calendar.personal"),
      mk(1, 14, 1, "School pickup", cals[0] ?? "calendar.family"),
      mk(2, 10, 1, "Dentist", cals[2] ?? "calendar.work"),
      mk(4, 16, 2, "Soccer practice", cals[0] ?? "calendar.family"),
      mk(5, 12, 1, "Lunch with Sam", cals[1] ?? "calendar.personal"),
    ];
  }

  private shift(amount: number): void {
    const next = new Date(this.anchorDate);
    if (this.view === "month") {
      next.setMonth(next.getMonth() + amount);
    } else if (this.view === "day") {
      next.setDate(next.getDate() + amount);
    } else {
      next.setDate(next.getDate() + amount * 7);
    }
    this.anchorDate = next;
  }

  private remindersAvailable(): boolean {
    return Boolean(this.hass && new ReminderApi(this.hass).isAvailable());
  }

  private reminderDefaults(): {
    minutes_before?: number;
    notify_service?: string;
  } {
    return {
      minutes_before: this.config.reminder_minutes_before ?? 30,
      notify_service:
        this.config.reminder_notify_service ?? "notify.mobile_app_phone",
    };
  }

  private weatherEntityId(): string | undefined {
    return resolveWeatherEntityId(this.config);
  }

  private weather(): WeatherSummary | null {
    return readWeatherSummary(
      this.hass,
      this.weatherEntityId(),
      this.weatherForecast
    );
  }

  private async refreshWeatherForecast(force = false): Promise<void> {
    const entityId = this.weatherEntityId();
    if (!this.hass || !entityId) {
      this.weatherForecast = [];
      this.weatherEntityLoaded = null;
      return;
    }
    if (
      !force &&
      this.weatherEntityLoaded === entityId &&
      this.weatherForecast.length
    ) {
      return;
    }
    if (this.weatherFetchInFlight) return;
    this.weatherFetchInFlight = true;
    try {
      const list = await fetchWeatherForecast(this.hass, entityId);
      this.weatherForecast = list;
      this.weatherEntityLoaded = entityId;
    } catch {
      // Keep prior forecast if any; entity state still shows current temp
    } finally {
      this.weatherFetchInFlight = false;
    }
  }

  private openCreate(detail?: { start: Date; end: Date }): void {
    this.editing = null;
    this.formError = "";
    this.formBusy = false;
    this.formReminder = null;
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
    this.formReminder = null;
    this.formOpen = true;
    void this.loadReminderForEvent(ev);
  }

  private async loadReminderForEvent(ev: CalendarEvent): Promise<void> {
    if (!this.hass || !this.remindersAvailable()) return;
    try {
      const rule = await new ReminderApi(this.hass).getReminder(
        ev.calendar,
        ev.uid
      );
      if (!this.formOpen || this.editing?.uid !== ev.uid) return;
      if (rule) {
        this.formReminder = {
          enabled: rule.enabled,
          minutes_before: rule.minutes_before,
          notify_service: rule.notify_service,
          message: rule.message ?? "",
        };
      } else {
        this.formReminder = null;
      }
    } catch {
      // Integration may be missing mid-session; form still works without hooks
    }
  }

  private async syncReminder(opts: {
    calendar: string;
    uid: string;
    start: string;
    summary: string;
    reminder?: ReminderFormState;
  }): Promise<string | null> {
    if (!this.hass || !opts.reminder || !this.remindersAvailable()) {
      return null;
    }
    const api = new ReminderApi(this.hass);
    if (!opts.reminder.enabled) {
      await api.clearReminder(opts.calendar, opts.uid);
      return "reminder cleared";
    }
    if (!opts.reminder.notify_service.trim()) {
      throw new Error("Reminder notify service is required");
    }
    await api.setReminder({
      calendar_entity_id: opts.calendar,
      event_uid: opts.uid,
      event_start: opts.start,
      event_summary: opts.summary,
      minutes_before: opts.reminder.minutes_before,
      notify_service: opts.reminder.notify_service.trim(),
      message: opts.reminder.message,
      enabled: true,
    });
    return "reminder saved";
  }

  private async onFormSave(
    e: CustomEvent<EventFormSaveDetail>
  ): Promise<void> {
    const {
      mode,
      input,
      original,
      reminder,
      crossCalendarMove,
      recurrenceScope,
    } = e.detail;

    if (!this.hass) {
      this.formError = "No Home Assistant connection — cannot save.";
      return;
    }

    this.formBusy = true;
    this.formError = "";
    const api = new CalendarApi(this.hass);
    let reminderNote: string | null = null;

    const mustMove = Boolean(
      original &&
        (crossCalendarMove ||
          (input.calendar && input.calendar !== original.calendar))
    );

    try {
      if (mode === "create") {
        const created = await api.createEvent(input);
        if (created.uid && reminder?.enabled) {
          reminderNote = await this.syncReminder({
            calendar: input.calendar,
            uid: created.uid,
            start: input.start,
            summary: input.summary,
            reminder,
          });
        } else if (reminder?.enabled && !created.uid) {
          reminderNote =
            "event created; reminder skipped (no confirmed event uid yet)";
        }
        this.formOpen = false;
        this.status = `Created “${input.summary}” on ${input.calendar}${
          input.rrule ? " (recurring)" : ""
        }${reminderNote ? ` · ${reminderNote}` : ""}`;
        this.statusKind = "info";
      } else if (mustMove && original) {
        if (original.recurring || original.rrule) {
          this.formError =
            "Recurring events cannot change calendars. Keep the original calendar or recreate as a one-off.";
          return;
        }
        const moved = await api.moveEventToCalendar(original, input.calendar, {
          ...input,
          calendar: input.calendar,
          rrule: undefined,
        });
        if (moved.status === "moved") {
          if (this.remindersAvailable()) {
            try {
              await new ReminderApi(this.hass).clearReminder(
                original.calendar,
                original.uid
              );
            } catch {
              /* best-effort */
            }
          }
          if (reminder) {
            reminderNote = await this.syncReminder({
              calendar: input.calendar,
              uid: moved.newUid,
              start: input.start,
              summary: input.summary,
              reminder,
            });
          }
          this.formOpen = false;
          this.pendingDuplicate = null;
          this.status = `Moved “${input.summary}” ${original.calendar} → ${input.calendar}${
            reminderNote ? ` · ${reminderNote}` : ""
          }`;
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
        const { recurrenceId, recurrenceRange } = recurrenceParams(
          original,
          recurrenceScope ?? "this"
        );
        await api.updateEvent(
          original.calendar,
          original.uid,
          { ...input, calendar: original.calendar },
          recurrenceId,
          recurrenceRange
        );
        if (reminder) {
          reminderNote = await this.syncReminder({
            calendar: original.calendar,
            uid: original.uid,
            start: input.start,
            summary: input.summary,
            reminder,
          });
        }
        this.formOpen = false;
        this.status = `Updated “${input.summary}”${
          original.rrule || input.rrule
            ? ` · ${recurrenceScope ?? "this"}`
            : ""
        }${reminderNote ? ` · ${reminderNote}` : ""}`;
        this.statusKind = "info";
      }
      await this.refreshEvents();
    } catch (err) {
      this.formError = formatHassError(err);
      this.status = this.formError;
      this.statusKind = "error";
    } finally {
      this.formBusy = false;
    }
  }

  private async onFormDelete(
    e: CustomEvent<EventFormDeleteDetail>
  ): Promise<void> {
    const { event, recurrenceScope } = e.detail;
    if (!this.hass) {
      this.formError = "No Home Assistant connection — cannot delete.";
      return;
    }

    this.formBusy = true;
    this.formError = "";
    const api = new CalendarApi(this.hass);

    try {
      if (!api.canDelete(event.calendar)) {
        this.formError = `${event.calendar} does not support deleting events.`;
        this.status = this.formError;
        this.statusKind = "error";
        return;
      }

      const { recurrenceId, recurrenceRange } = recurrenceParams(
        event,
        recurrenceScope ?? "this"
      );
      await api.deleteEvent(
        event.calendar,
        event.uid,
        recurrenceId,
        recurrenceRange
      );

      if (this.remindersAvailable()) {
        try {
          await new ReminderApi(this.hass).clearReminder(
            event.calendar,
            event.uid
          );
        } catch {
          /* best-effort */
        }
      }

      this.formOpen = false;
      const scopeNote =
        event.recurring || event.rrule || event.recurrence_id
          ? ` · ${recurrenceScope ?? "this"}`
          : "";
      this.status = `Deleted “${event.summary}”${scopeNote}`;
      this.statusKind = "info";
      await this.refreshEvents();
    } catch (err) {
      this.formError = formatHassError(err);
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
      this.status = `Cleanup failed: ${formatHassError(err)}`;
      this.statusKind = "error";
    }
  }

  private dismissDuplicate(): void {
    this.pendingDuplicate = null;
    this.status = "Duplicate warning dismissed — old copy may still exist";
    this.statusKind = "warn";
  }

  private applyThemePreference(mode: ThemeMode): void {
    this.themePreference = mode;
    this.resolvedTheme = resolveTheme(mode);
    this.syncThemeAttribute();
  }

  private syncThemeAttribute(): void {
    this.setAttribute("data-theme", this.resolvedTheme);
  }

  private cycleTheme(): void {
    const next = cycleThemeMode(this.themePreference);
    writeThemePreference(next);
    this.applyThemePreference(next);
  }

  private bindThemeMedia(): void {
    this.unbindThemeMedia();
    if (typeof window === "undefined" || !window.matchMedia) return;
    this.themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.themeMediaHandler = () => {
      if (this.themePreference === "auto") {
        this.resolvedTheme = resolveTheme("auto");
        this.syncThemeAttribute();
      }
    };
    this.themeMediaQuery.addEventListener("change", this.themeMediaHandler);
  }

  private unbindThemeMedia(): void {
    if (this.themeMediaQuery && this.themeMediaHandler) {
      this.themeMediaQuery.removeEventListener("change", this.themeMediaHandler);
    }
    this.themeMediaQuery = null;
    this.themeMediaHandler = null;
  }

  private bindPickerDismiss(): void {
    this.unbindPickerDismiss();
    this.onDocPointerDown = (e: Event) => {
      if (!this.monthPickerOpen) return;
      const path = e.composedPath();
      if (path.includes(this)) {
        const inPicker = path.some(
          (n) =>
            n instanceof HTMLElement &&
            (n.classList.contains("month-picker") ||
              n.classList.contains("range-label") ||
              n.classList.contains("range-wrap"))
        );
        if (inPicker) return;
      }
      this.monthPickerOpen = false;
    };
    document.addEventListener("pointerdown", this.onDocPointerDown, true);
  }

  private unbindPickerDismiss(): void {
    if (this.onDocPointerDown) {
      document.removeEventListener("pointerdown", this.onDocPointerDown, true);
      this.onDocPointerDown = null;
    }
  }

  private toggleMonthPicker(): void {
    this.monthPickerOpen = !this.monthPickerOpen;
    if (this.monthPickerOpen) {
      this.pickerYear = this.anchorDate.getFullYear();
    }
  }

  private shiftPickerYear(delta: number): void {
    this.pickerYear += delta;
  }

  private jumpToMonth(monthIndex: number): void {
    const next = new Date(this.anchorDate);
    const day = next.getDate();
    next.setDate(1);
    next.setFullYear(this.pickerYear);
    next.setMonth(monthIndex);
    // Clamp day into the target month
    const lastDay = new Date(this.pickerYear, monthIndex + 1, 0).getDate();
    next.setDate(Math.min(day, lastDay));
    this.anchorDate = next;
    this.monthPickerOpen = false;
  }

  private monthNamesShort(): string[] {
    return Array.from({ length: 12 }, (_, i) =>
      new Date(2000, i, 1).toLocaleDateString(undefined, { month: "short" })
    );
  }

  private rangeLabel(): string {
    if (this.view === "month") {
      return this.anchorDate.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    }
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

  private clockDateLabel(): string {
    void this.nowTick;
    return new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }

  private clockTimeLabel(): string {
    void this.nowTick;
    return new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  protected render() {
    const title = this.config.title ?? "Calendar";
    const calendars = this.entities();
    const visibleEvents = this.filteredEvents();
    const weather = this.weather();
    const forecast = weather?.forecast?.slice(0, 7) ?? [];
    const dark = this.resolvedTheme === "dark";
    const nowMood = weather ? weatherMood(weather.state, dark) : null;
    const showEmpty =
      this.hasLoadedOnce &&
      !this.loading &&
      !this.loadFailed &&
      visibleEvents.length === 0 &&
      Boolean(this.hass) &&
      !this.config.show_demo_when_empty;
    const showError =
      this.hasLoadedOnce && !this.loading && this.loadFailed && !this.formOpen;
    // Only veil on intentional (non-silent) loads after first paint
    const showLoadingVeil = this.loading && this.hasLoadedOnce;
    const months = this.monthNamesShort();

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

        <section class="info-bar" aria-label="Date and weather">
          <div class="clock-block">
            <div class="clock-date">${this.clockDateLabel()}</div>
            <div class="clock-time">${this.clockTimeLabel()}</div>
          </div>
          <div class="weather-now">
            ${weather && nowMood
              ? html`
                  <div
                    class="weather-blob"
                    style="--hac-wx-soft:${nowMood.soft};--hac-wx-accent:${nowMood.accent};--hac-wx-ink:${nowMood.ink}"
                  >
                    <span class="weather-icon-halo" aria-hidden="true"
                      >${weatherGlyphCute(weather.state)}</span
                    >
                    <span class="temp"
                      >${weather.temperature != null
                        ? `${Math.round(weather.temperature)}${weather.unit ?? "°"}`
                        : weatherLabel(weather.state)}</span
                    >
                  </div>
                  <div class="cond">${friendlyWeatherLabel(weather.state)}</div>
                `
              : html`<div class="weather-stub">
                  ${this.weatherEntityId()
                    ? "Weather unavailable"
                    : "Add weather_entity"}
                </div>`}
          </div>
          <div class="forecast-strip" aria-label="Forecast">
            ${forecast.length
              ? forecast.map((day, i) => {
                  const d = new Date(day.datetime);
                  const mood = weatherMood(day.condition, dark);
                  return html`
                    <div
                      class="forecast-day"
                      style="--hac-wx-day-soft:${mood.soft};--hac-wx-day-ink:${mood.ink};animation-delay:${i * 40}ms"
                    >
                      <span class="d"
                        >${d.toLocaleDateString(undefined, {
                          weekday: "short",
                        })}</span
                      >
                      <span class="g" aria-hidden="true"
                        >${weatherGlyphCute(day.condition)}</span
                      >
                      <span class="t"
                        >${day.temperature != null
                          ? `${Math.round(day.temperature)}°`
                          : "—"}</span
                      >
                    </div>
                  `;
                })
              : nothing}
          </div>
        </section>

        <div class="title-row">
          <h1 class="brand">${title}</h1>
          <div class="filters" role="group" aria-label="Calendar filters">
            ${calendars.map((id) => {
              const pressed = !this.hiddenCalendars.includes(id);
              return html`
                <button
                  type="button"
                  class="pill"
                  aria-pressed=${pressed ? "true" : "false"}
                  @click=${() => this.toggleCalendarFilter(id)}
                >
                  <span
                    class="dot"
                    style="background:${this.calendarColor(id)}"
                  ></span>
                  ${this.calendarLabel(id)}
                </button>
              `;
            })}
          </div>
        </div>

        <header class="toolbar">
          <div class="toolbar-controls">
            <div class="nav-group">
              <button
                class="nav-btn"
                type="button"
                aria-label="Previous"
                @click=${() => this.shift(-1)}
              >
                ‹
              </button>
              <button
                class="nav-btn"
                type="button"
                @click=${() => {
                  this.anchorDate = new Date();
                  this.monthPickerOpen = false;
                }}
              >
                Today
              </button>
              <button
                class="nav-btn"
                type="button"
                aria-label="Next"
                @click=${() => this.shift(1)}
              >
                ›
              </button>
            </div>
            <div class="range-wrap">
              <button
                type="button"
                class="range-label"
                aria-haspopup="dialog"
                aria-expanded=${this.monthPickerOpen ? "true" : "false"}
                aria-label="Jump to month and year"
                @click=${() => this.toggleMonthPicker()}
              >
                ${this.rangeLabel()}
                <span class="caret" aria-hidden="true">▾</span>
              </button>
              ${this.monthPickerOpen
                ? html`
                    <div
                      class="month-picker"
                      role="dialog"
                      aria-label="Choose month and year"
                    >
                      <div class="month-picker-year">
                        <button
                          type="button"
                          class="nav-btn"
                          aria-label="Previous year"
                          @click=${() => this.shiftPickerYear(-1)}
                        >
                          ‹
                        </button>
                        <span class="year">${this.pickerYear}</span>
                        <button
                          type="button"
                          class="nav-btn"
                          aria-label="Next year"
                          @click=${() => this.shiftPickerYear(1)}
                        >
                          ›
                        </button>
                      </div>
                      <div class="month-picker-grid">
                        ${months.map(
                          (name, idx) => html`
                            <button
                              type="button"
                              aria-current=${this.anchorDate.getFullYear() ===
                                this.pickerYear &&
                              this.anchorDate.getMonth() === idx
                                ? "true"
                                : "false"}
                              @click=${() => this.jumpToMonth(idx)}
                            >
                              ${name}
                            </button>
                          `
                        )}
                      </div>
                    </div>
                  `
                : nothing}
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
              <button
                type="button"
                aria-pressed=${this.view === "month"}
                @click=${() => {
                  this.view = "month";
                }}
              >
                Month
              </button>
            </div>
            <button
              type="button"
              class="nav-btn theme-btn"
              aria-label="Theme: ${themeToggleLabel(this.themePreference)}. Click to cycle light, dark, auto."
              title="Theme: ${themeToggleLabel(this.themePreference)}"
              @click=${() => this.cycleTheme()}
            >
              <span class="glyph" aria-hidden="true"
                >${themeToggleGlyph(this.themePreference)}</span
              >
              ${themeToggleLabel(this.themePreference)}
            </button>
          </div>
          <button
            class="primary-btn add-btn"
            type="button"
            @click=${() => this.openCreate()}
          >
            + Add Event
          </button>
        </header>

        <div class="grid-wrap">
          ${this.loading && !this.hasLoadedOnce
            ? html`
                <div class="state-panel" data-kind="loading">
                  <div
                    class="spinner"
                    style="width:1.4rem;height:1.4rem;border:2px solid var(--hac-line-strong);border-top-color:var(--hac-accent);border-radius:50%;animation:spin 0.7s linear infinite"
                  ></div>
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
          ${showEmpty && this.view !== "month"
            ? html`
                <div class="state-panel" data-kind="empty">
                  <div class="state-mark" aria-hidden="true"></div>
                  <h2>Nothing scheduled</h2>
                  <p>
                    ${this.rangeLabel()} is clear. Tap + Add Event, or
                    double-click a time slot on larger screens.
                  </p>
                  <div class="state-actions">
                    <button
                      class="primary-btn"
                      type="button"
                      @click=${() => this.openCreate()}
                    >
                      + Add Event
                    </button>
                  </div>
                </div>
              `
            : nothing}

          ${this.view === "month"
            ? html`
                <hac-month-grid
                  ?data-fill=${this.hasAttribute("data-layout")}
                  .anchorDate=${this.anchorDate}
                  .events=${visibleEvents}
                  .calendars=${calendars}
                  .calendarColors=${this.calendarColors}
                  .weather=${weather}
                  @event-select=${(e: CustomEvent<CalendarEvent>) =>
                    this.openEdit(e.detail)}
                  @slot-create=${(
                    e: CustomEvent<{ start: Date; end: Date }>
                  ) => this.openCreate(e.detail)}
                ></hac-month-grid>
              `
            : html`
                <hac-time-grid
                  .mode=${this.view}
                  .anchorDate=${this.anchorDate}
                  .events=${visibleEvents}
                  .calendars=${calendars}
                  .calendarColors=${this.calendarColors}
                  .dayStartHour=${this.config.day_start_hour ?? DAY_START_HOUR}
                  .dayEndHour=${this.config.day_end_hour ?? DAY_END_HOUR}
                  .nowTick=${this.nowTick}
                  @event-select=${(e: CustomEvent<CalendarEvent>) =>
                    this.openEdit(e.detail)}
                  @slot-create=${(
                    e: CustomEvent<{ start: Date; end: Date }>
                  ) => this.openCreate(e.detail)}
                ></hac-time-grid>
              `}

          ${this.formOpen
            ? html`
                <hac-event-form
                  .calendars=${this.formCalendars()}
                  .calendarColors=${this.calendarColors}
                  .event=${this.editing}
                  .defaults=${this.formDefaults}
                  .busy=${this.formBusy}
                  .errorMessage=${this.formError}
                  .remindersAvailable=${this.remindersAvailable()}
                  .reminderDefaults=${this.reminderDefaults()}
                  .reminder=${this.formReminder}
                  .canDelete=${this.canDeleteEditing()}
                  @form-cancel=${() => {
                    if (!this.formBusy) this.formOpen = false;
                  }}
                  @form-save=${this.onFormSave}
                  @form-delete=${this.onFormDelete}
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
    "Skylight-style month/week/day calendar with create/edit and safe calendar moves",
  preview: true,
});

declare global {
  interface HTMLElementTagNameMap {
    [CARD_NAME]: HaCalendarCard;
  }
}

console.info(
  `%c ${CARD_NAME} %c v${CARD_VERSION} `,
  "background:#3d9b8f;color:#fff;font-weight:700;padding:2px 6px;border-radius:4px 0 0 4px",
  "background:#2c3340;color:#fff;font-weight:700;padding:2px 6px;border-radius:0 4px 4px 0"
);
