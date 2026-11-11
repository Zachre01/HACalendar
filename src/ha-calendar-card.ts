import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  CARD_NAME,
  CARD_VERSION,
  CLOCK_TICK_MS,
  DAY_END_HOUR,
  DAY_START_HOUR,
  EVENT_POLL_MS,
  MONTH_MAX_VISIBLE_EVENTS,
  PLACEHOLDER_CALENDARS,
} from "./const";
import { CalendarApi, recurrenceParams } from "./api/calendar-api";
import { ReminderApi } from "./api/reminder-api";
import { FONT_STYLESHEET_HREF, cardStyles } from "./styles/shared";
import type {
  CalendarEvent,
  CalendarViewMode,
  EventMoveDetail,
  EventSelectDetail,
  HaCalendarCardConfig,
  HomeAssistant,
  PendingDuplicate,
  ReminderFormState,
  ThemeMode,
  ToggleDoneDetail,
  WeatherDay,
  WeatherSummary,
} from "./types";
import type {
  EventFormDeleteDetail,
  EventFormSaveDetail,
} from "./components/event-form";
import {
  formatDayKey,
  isDoneOnDay,
  parseDoneDescription,
  toggleDayDone,
} from "./utils/event-done";
import { shiftEventDates } from "./utils/event-shift";
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
import {
  defaultTimedRangeForDay,
  toFloatingLocal,
} from "./utils/create-defaults";
import {
  createLocalCalendar,
  waitForCalendarEntity,
} from "./utils/create-local-calendar";
import { mergeEntitiesOnLoad, persistCardEntities } from "./utils/entities-persist";
import { formatHassError } from "./utils/ha-error";
import {
  BUILTIN_HOLIDAY_CALENDAR,
  BUILTIN_HOLIDAY_COLOR,
  BUILTIN_HOLIDAY_LABEL,
  builtinHolidayEvents,
  holidayNameKeys,
} from "./utils/builtin-holidays";
import "./components/time-grid";
import "./components/month-grid";
import "./components/event-form";

function sameCalendarInstance(a: CalendarEvent, b: CalendarEvent): boolean {
  return (
    a.uid === b.uid &&
    a.calendar === b.calendar &&
    a.recurrence_id === b.recurrence_id &&
    a.start === b.start &&
    a.end === b.end
  );
}

function formatMoveDay(dayKey: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dayKey);
  if (!match) return dayKey;
  return new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3])
  ).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

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
  /**
   * YYYY-MM-DD for the chip day that opened the form — scopes the Done checkbox
   * on multi-day events.
   */
  @state() private formDoneDay: string | null = null;
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
  /** Stock-HA-style add/remove calendar picker open */
  @state() private calendarPickerOpen = false;
  /** Inline “Create Local Calendar” form inside the picker */
  @state() private createCalendarOpen = false;
  @state() private createCalendarName = "";
  @state() private createCalendarBusy = false;
  @state() private createCalendarError = "";
  /** Soft note after persist (YAML-mode / save issues) */
  @state() private persistNote = "";

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
    const base: HaCalendarCardConfig = {
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
    const mergedEntities = mergeEntitiesOnLoad(base);
    this.config = {
      ...base,
      entities: mergedEntities?.length
        ? mergedEntities
        : [...PLACEHOLDER_CALENDARS],
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
    // Explicit [] (user unchecked everything) must not fall back to placeholders
    if (Array.isArray(this.config.entities)) {
      return [...this.config.entities];
    }
    return [...PLACEHOLDER_CALENDARS];
  }

  /** Configured calendars plus the synthetic holiday calendar (not persisted). */
  private displayCalendars(): string[] {
    const ids = this.entities().filter((id) => id !== BUILTIN_HOLIDAY_CALENDAR);
    return [...ids, BUILTIN_HOLIDAY_CALENDAR];
  }

  /** Month chips per day before “+N more”; config override clamped to ≥ 1. */
  private get monthMaxVisibleEvents(): number {
    const raw = this.config.month_max_events;
    if (typeof raw === "number" && Number.isFinite(raw)) {
      return Math.max(1, Math.floor(raw));
    }
    return MONTH_MAX_VISIBLE_EVENTS;
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
    if (entityId === BUILTIN_HOLIDAY_CALENDAR) return BUILTIN_HOLIDAY_COLOR;
    if (this.calendarColors[entityId]) {
      return this.calendarColors[entityId];
    }
    const entities = this.entities();
    const idx = Math.max(0, entities.indexOf(entityId));
    return fallbackCalendarColor(idx);
  }

  private stampHolidayColor(map: CalendarColorMap): CalendarColorMap {
    return { ...map, [BUILTIN_HOLIDAY_CALENDAR]: BUILTIN_HOLIDAY_COLOR };
  }

  private async refreshCalendarColors(): Promise<void> {
    const entities = this.entities();
    const generation = ++this.colorLoadGeneration;

    // Immediate palette / display-color map so UI never flashes empty
    const immediate = buildCalendarColorMap(entities, {}, this.hass);
    this.calendarColors = this.stampHolidayColor(immediate);

    if (!this.hass) return;

    const fromRegistry = await fetchCalendarColorsFromRegistry(
      this.hass,
      entities
    );
    if (generation !== this.colorLoadGeneration) return;

    this.calendarColors = this.stampHolidayColor(
      buildCalendarColorMap(entities, fromRegistry, this.hass)
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
    if (entityId === BUILTIN_HOLIDAY_CALENDAR) return BUILTIN_HOLIDAY_LABEL;
    const friendly = this.hass?.states[entityId]?.attributes?.friendly_name;
    if (typeof friendly === "string" && friendly.trim()) return friendly.trim();
    return entityId.replace(/^calendar\./, "").replace(/_/g, " ");
  }

  private holidayCountry(): string {
    const country = this.hass?.config?.country;
    return typeof country === "string" && country.trim() ? country.trim() : "US";
  }

  /** Append built-in holidays that this range does not already show by name. */
  private withHolidays(events: CalendarEvent[]): CalendarEvent[] {
    const { start, end } = this.range();
    const holidays = builtinHolidayEvents(start, end, this.holidayCountry());
    if (!holidays.length) return events;
    const taken = new Set<string>();
    for (const ev of events) {
      for (const name of holidayNameKeys(ev.summary)) {
        taken.add(`${ev.start.slice(0, 10)}|${name}`);
      }
    }
    const extra = holidays.filter((ev) =>
      holidayNameKeys(ev.summary).every((name) => !taken.has(`${ev.start}|${name}`))
    );
    return extra.length ? [...events, ...extra] : events;
  }

  private attachHolidays(): void {
    const before = this.events.length;
    this.events = this.withHolidays(this.events);
    const added = this.events.length - before;
    if (!added) return;
    if (this.loadFailed) {
      this.loadFailed = false;
      this.statusKind = "warn";
      this.status = `${this.status} · showing built-in holidays`;
      return;
    }
    if (/^\d+ event\(s\)/.test(this.status)) {
      this.status = this.status.replace(/^\d+/, String(this.events.length));
      return;
    }
    if (
      this.status === "No events in this range" ||
      this.status === "No calendars loaded"
    ) {
      this.status = `${this.events.length} event(s)`;
      this.statusKind = "info";
    }
  }

  private filteredEvents(): CalendarEvent[] {
    if (!this.hiddenCalendars.length) return this.events;
    const hidden = new Set(this.hiddenCalendars);
    return this.events.filter((ev) => !hidden.has(ev.calendar));
  }

  /** Fetch count plus how many of those are hidden by dimmed filter pills. */
  private statusText(): string {
    if (!this.hiddenCalendars.length || !this.hasLoadedOnce) return this.status;
    const shown = this.filteredEvents().length;
    const hiddenEvents = this.events.length - shown;
    if (hiddenEvents <= 0) return this.status;
    return `${this.status} · ${shown} on visible calendars (${hiddenEvents} hidden by filters)`;
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
      this.attachHolidays();
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
      this.attachHolidays();
    } catch (err) {
      if (generation !== this.loadGeneration) return;
      this.events = [];
      this.loadFailed = true;
      this.hasLoadedOnce = true;
      this.status = `Load failed: ${formatHassError(err)}`;
      this.statusKind = "error";
      this.attachHolidays();
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
    const allStart = new Date(day);
    allStart.setDate(allStart.getDate() + 3);
    const allEnd = new Date(allStart);
    allEnd.setDate(allEnd.getDate() + 2);
    return [
      mk(0, 9, 1, "Morning standup", cals[0] ?? "calendar.family"),
      mk(0, 11, 2, "Deep work", cals[1] ?? "calendar.personal"),
      mk(1, 14, 1, "School pickup", cals[0] ?? "calendar.family"),
      mk(2, 10, 1, "Dentist", cals[2] ?? "calendar.work"),
      {
        uid: "demo-family-day",
        summary: "Family day",
        start: formatDayKey(allStart),
        end: formatDayKey(allEnd),
        all_day: true,
        calendar: cals[0] ?? "calendar.family",
      },
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
    this.formDoneDay = null;
    this.formError = "";
    this.formBusy = false;
    this.formReminder = null;
    const range = detail ?? this.defaultCreateRange();
    this.formDefaults = {
      // Floating local times — avoid toISOString() shifting the selected day
      start: toFloatingLocal(range.start),
      end: toFloatingLocal(range.end),
      calendar: this.entities()[0],
    };
    this.formOpen = true;
  }

  /**
   * Toolbar / empty-state create with no slot: use the focused day (day view
   * anchor, or today when browsing month/week), never a stale "today" after the
   * user opened another day.
   */
  private defaultCreateRange(): { start: Date; end: Date } {
    const day = new Date(
      this.view === "day" ? this.anchorDate : new Date()
    );
    day.setHours(0, 0, 0, 0);
    return defaultTimedRangeForDay(day, {
      dayStartHour: this.config.day_start_hour ?? DAY_START_HOUR,
      dayEndHour: this.config.day_end_hour ?? DAY_END_HOUR,
    });
  }

  /** All `calendar.*` entities from hass.states (sorted). */
  private availableCalendarEntities(): string[] {
    if (!this.hass?.states) return [];
    return Object.keys(this.hass.states)
      .filter((id) => id.startsWith("calendar."))
      .sort();
  }

  private configuredEntitySet(): Set<string> {
    return new Set(this.entities());
  }

  private toggleCalendarPicker(): void {
    this.calendarPickerOpen = !this.calendarPickerOpen;
    if (this.calendarPickerOpen) {
      this.monthPickerOpen = false;
    } else {
      this.createCalendarOpen = false;
      this.createCalendarError = "";
      this.persistNote = "";
    }
  }

  /**
   * Add/remove a calendar.* from the card entity list. Updates local config
   * immediately, mirrors to localStorage, fires `config-changed`, and saves
   * UI-mode Lovelace dashboards via `lovelace/config/save`.
   */
  private setCalendarInConfig(entityId: string, enabled: boolean): void {
    if (!entityId.startsWith("calendar.")) return;

    const previousEntities = this.config.entities?.length
      ? [...this.config.entities]
      : undefined;
    const raw = previousEntities?.length
      ? [...previousEntities]
      : [...PLACEHOLDER_CALENDARS];

    // First real pick while still on non-existent placeholders → replace them
    const hass = this.hass;
    const onlyMissingPlaceholders =
      !previousEntities?.length ||
      raw.every(
        (id) =>
          !hass?.states[id] &&
          (PLACEHOLDER_CALENDARS as readonly string[]).includes(id)
      );

    let next: string[];
    if (enabled) {
      if (raw.includes(entityId) && !onlyMissingPlaceholders) return;
      next = onlyMissingPlaceholders ? [entityId] : [...raw, entityId];
    } else {
      next = raw.filter((id) => id !== entityId);
    }

    // Dedupe while preserving order
    const seen = new Set<string>();
    next = next.filter((id) => {
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    const newConfig: HaCalendarCardConfig = {
      ...this.config,
      entities: next,
      type: this.config.type ?? `custom:${CARD_NAME}`,
    };
    this.config = newConfig;
    this.hiddenCalendars = this.hiddenCalendars.filter((id) =>
      next.includes(id)
    );
    void this.persistEntities(previousEntities, newConfig);
    void this.refreshCalendarColors();
    void this.refreshEvents();
  }

  private async persistEntities(
    previousEntities: string[] | undefined,
    nextConfig: HaCalendarCardConfig
  ): Promise<void> {
    const result = await persistCardEntities({
      hass: this.hass,
      host: this,
      previousEntities,
      nextConfig,
    });
    if (result.lovelace === "saved") {
      this.persistNote = "";
      return;
    }
    if (result.lovelace === "yaml") {
      this.persistNote =
        "Saved in this browser. YAML dashboards also need an entities: edit to stick after cache clear.";
      return;
    }
    if (result.lovelace === "error") {
      this.persistNote = result.local
        ? "Saved in this browser; dashboard save failed — check admin permissions."
        : `Could not save calendars: ${result.detail ?? "unknown error"}`;
      return;
    }
    // skipped / local-only — still fine for navigate-away when localStorage worked
    this.persistNote = result.local
      ? ""
      : "Could not persist calendars in this browser.";
  }

  private async submitCreateCalendar(): Promise<void> {
    if (!this.hass) {
      this.createCalendarError = "Home Assistant is not connected.";
      return;
    }
    const name = this.createCalendarName.trim();
    if (!name) {
      this.createCalendarError = "Enter a calendar name.";
      return;
    }
    this.createCalendarBusy = true;
    this.createCalendarError = "";
    try {
      const { entityId: guessed } = await createLocalCalendar(this.hass, name);
      const entityId = await waitForCalendarEntity(
        () => this.hass,
        guessed
      );
      this.setCalendarInConfig(entityId, true);
      this.createCalendarName = "";
      this.createCalendarOpen = false;
      this.status = `Created ${entityId}`;
      this.statusKind = "info";
      void this.refreshCalendarColors();
      void this.refreshEvents();
    } catch (err) {
      this.createCalendarError = formatHassError(err);
    } finally {
      this.createCalendarBusy = false;
    }
  }

  /** Month cell / week day-header → focused day view for stacked events. */
  private openDayView(date: Date): void {
    const next = new Date(date);
    next.setHours(0, 0, 0, 0);
    this.anchorDate = next;
    this.view = "day";
    this.monthPickerOpen = false;
  }

  private openEdit(detail: EventSelectDetail | CalendarEvent): void {
    const ev = "event" in detail ? detail.event : detail;
    if (ev.readonly) {
      this.status = `“${ev.summary}” is a built-in holiday`;
      this.statusKind = "info";
      return;
    }
    const day = "event" in detail ? detail.day : undefined;
    this.editing = ev;
    this.formDoneDay = day ?? ev.start.slice(0, 10);
    this.formError = "";
    this.formBusy = false;
    this.formDefaults = {};
    this.formReminder = null;
    this.formOpen = true;
    void this.loadReminderForEvent(ev);
  }

  /**
   * Chip checkbox: toggle Done for the visible day only (per-day description
   * markers). Recurring: this occurrence when `recurrence_id` exists; otherwise
   * whole series (same as before).
   */
  private toggleDoneBusy = false;
  private moveBusy = false;

  private async onToggleDone(e: CustomEvent<ToggleDoneDetail>): Promise<void> {
    const { event: ev, day } = e.detail;
    if (ev.readonly) return;
    if (!this.hass || this.toggleDoneBusy || this.moveBusy || !day) return;

    this.toggleDoneBusy = true;
    const nextCompleted = !isDoneOnDay(ev, day);
    const toggled = toggleDayDone(ev, day, nextCompleted);

    // Optimistic: update doneDates on the matching event (all day chips share it)
    this.events = this.events.map((item) =>
      item.uid === ev.uid &&
      item.calendar === ev.calendar &&
      item.recurrence_id === ev.recurrence_id &&
      item.start === ev.start
        ? {
            ...item,
            summary: toggled.summary,
            description:
              parseDoneDescription(toggled.description).cleanDescription ||
              undefined,
            doneDates: toggled.doneDates,
            legacyTitleDone: false,
            completed: toggled.doneDates.length > 0,
          }
        : item
    );

    const api = new CalendarApi(this.hass);
    const scope =
      ev.recurrence_id || ev.recurring || ev.rrule
        ? ev.recurrence_id
          ? "this"
          : "series"
        : "this";
    const { recurrenceId, recurrenceRange } = recurrenceParams(ev, scope);

    try {
      await api.updateEvent(
        ev.calendar,
        ev.uid,
        {
          summary: toggled.summary,
          description: toggled.description,
          location: ev.location,
          start: ev.start,
          end: ev.end,
          all_day: ev.all_day,
          calendar: ev.calendar,
          doneDates: toggled.doneDates,
        },
        recurrenceId,
        recurrenceRange
      );
      this.status = nextCompleted
        ? `Marked “${ev.summary}” done for ${day}`
        : `Marked “${ev.summary}” not done for ${day}`;
      this.statusKind = "info";
      await this.refreshEvents();
    } catch (err) {
      // Revert optimistic state
      this.events = this.events.map((item) =>
        item.uid === ev.uid &&
        item.calendar === ev.calendar &&
        item.recurrence_id === ev.recurrence_id &&
        item.start === ev.start
          ? {
              ...item,
              summary: ev.summary,
              description: ev.description,
              doneDates: ev.doneDates,
              legacyTitleDone: ev.legacyTitleDone,
              completed: ev.completed,
            }
          : item
      );
      this.status = formatHassError(err, "Could not update done state");
      this.statusKind = "error";
    } finally {
      this.toggleDoneBusy = false;
    }
  }

  /**
   * Drag onto another day: keep the clock time and duration, shift the dates,
   * and write them with the same calendar update used by the edit form.
   * A repeating chip moves that occurrence when it has a recurrence id.
   */
  private async onEventMove(e: CustomEvent<EventMoveDetail>): Promise<void> {
    const { event: ev, fromDay, toDay } = e.detail;
    if (ev?.readonly) {
      this.status = `“${ev.summary}” is a built-in holiday`;
      this.statusKind = "info";
      return;
    }
    if (!ev || !fromDay || !toDay || fromDay === toDay) return;
    if (this.moveBusy || this.toggleDoneBusy) {
      this.status = "Still saving the last change…";
      this.statusKind = "info";
      return;
    }
    if ((ev.recurring || ev.rrule) && !ev.recurrence_id) {
      this.status = `“${ev.summary}” repeats. Open it to choose which dates to change.`;
      this.statusKind = "warn";
      return;
    }

    const shifted = shiftEventDates(ev, fromDay, toDay);
    if (!shifted) return;

    const previous = this.events;
    this.events = this.events.map((item) =>
      sameCalendarInstance(item, ev)
        ? {
            ...item,
            start: shifted.start,
            end: shifted.end,
            doneDates: shifted.doneDates,
            legacyTitleDone: false,
            completed: shifted.doneDates.length > 0,
          }
        : item
    );

    const occurrenceNote = ev.recurrence_id ? " (this occurrence)" : "";
    const message = `Moved “${ev.summary}” to ${formatMoveDay(toDay)}${occurrenceNote}`;

    if (!this.hass) {
      this.status = `${message} (preview)`;
      this.statusKind = "info";
      return;
    }

    this.moveBusy = true;
    const api = new CalendarApi(this.hass);
    const { recurrenceId, recurrenceRange } = recurrenceParams(ev, "this");

    try {
      await api.updateEvent(
        ev.calendar,
        ev.uid,
        {
          summary: ev.summary,
          description: ev.description,
          location: ev.location,
          start: shifted.start,
          end: shifted.end,
          all_day: ev.all_day,
          calendar: ev.calendar,
          doneDates: shifted.doneDates,
        },
        recurrenceId,
        recurrenceRange
      );
      try {
        await this.shiftReminderIfAny(ev, shifted.start);
      } catch {
        // The event is already on the new day; a reminder sync miss is non-fatal.
      }
      await this.refreshEvents({ silent: true });
      if (!this.loadFailed) {
        this.status = message;
        this.statusKind = "info";
      }
    } catch (err) {
      this.events = previous;
      this.status = formatHassError(err, "Could not move event");
      this.statusKind = "error";
    } finally {
      this.moveBusy = false;
    }
  }

  /** Keep a one-off reminder aimed at the event’s new start. */
  private async shiftReminderIfAny(
    ev: CalendarEvent,
    newStart: string
  ): Promise<void> {
    if (!this.hass || !this.remindersAvailable()) return;
    if (ev.recurring || ev.rrule || ev.recurrence_id) return;
    const api = new ReminderApi(this.hass);
    const rule = await api.getReminder(ev.calendar, ev.uid);
    if (!rule) return;
    await api.setReminder({
      calendar_entity_id: ev.calendar,
      event_uid: ev.uid,
      event_start: newStart,
      event_summary: ev.summary,
      minutes_before: rule.minutes_before,
      notify_service: rule.notify_service,
      message: rule.message ?? "",
      enabled: rule.enabled,
    });
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
      if (!this.monthPickerOpen && !this.calendarPickerOpen) return;
      const path = e.composedPath();
      if (path.includes(this)) {
        const inMonthPicker = path.some(
          (n) =>
            n instanceof HTMLElement &&
            (n.classList.contains("month-picker") ||
              n.classList.contains("range-label") ||
              n.classList.contains("range-wrap"))
        );
        const inCalPicker = path.some(
          (n) =>
            n instanceof HTMLElement &&
            (n.classList.contains("cal-picker") ||
              n.classList.contains("cal-picker-wrap") ||
              n.classList.contains("add-cal-pill"))
        );
        if (this.monthPickerOpen && inMonthPicker) return;
        if (this.calendarPickerOpen && inCalPicker) return;
        // Click elsewhere inside the card still dismisses open pickers
      }
      this.monthPickerOpen = false;
      this.calendarPickerOpen = false;
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
      this.calendarPickerOpen = false;
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
    const calendars = this.displayCalendars();
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
                  title=${pressed
                    ? `Hide ${this.calendarLabel(id)}`
                    : `Show ${this.calendarLabel(id)}`}
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
            <div class="cal-picker-wrap">
              <button
                type="button"
                class="pill add-cal-pill"
                aria-haspopup="dialog"
                aria-expanded=${this.calendarPickerOpen ? "true" : "false"}
                title="Add or remove calendars"
                @click=${() => this.toggleCalendarPicker()}
              >
                + Add calendar
              </button>
              ${this.calendarPickerOpen
                ? html`
                    <div
                      class="cal-picker"
                      role="dialog"
                      aria-label="Choose calendars"
                    >
                      <div class="cal-picker-title">Calendars</div>
                      <p class="cal-picker-hint">
                        Pick existing calendars or create a new Local Calendar.
                        Changes are saved to this dashboard (and this browser).
                      </p>
                      ${(() => {
                        const available = this.availableCalendarEntities();
                        const configured = this.configuredEntitySet();
                        if (!available.length) {
                          return html`<p class="cal-picker-empty">
                            No <code>calendar.*</code> entities found yet —
                            create one below.
                          </p>`;
                        }
                        return available.map((id) => {
                          const checked = configured.has(id);
                          return html`
                            <label class="cal-picker-row">
                              <input
                                type="checkbox"
                                .checked=${checked}
                                @change=${(e: Event) => {
                                  const on = (e.target as HTMLInputElement)
                                    .checked;
                                  this.setCalendarInConfig(id, on);
                                }}
                              />
                              <span
                                class="dot"
                                style="background:${this.calendarColor(id)}"
                              ></span>
                              <span class="cal-picker-label"
                                >${this.calendarLabel(id)}</span
                              >
                              <span class="cal-picker-id">${id}</span>
                            </label>
                          `;
                        });
                      })()}
                      <div class="cal-picker-create">
                        ${this.createCalendarOpen
                          ? html`
                              <label class="cal-create-label" for="hac-new-cal"
                                >New Local Calendar</label
                              >
                              <div class="cal-create-row">
                                <input
                                  id="hac-new-cal"
                                  type="text"
                                  class="cal-create-input"
                                  placeholder="Name (e.g. Kids)"
                                  .value=${this.createCalendarName}
                                  ?disabled=${this.createCalendarBusy}
                                  @input=${(e: Event) => {
                                    this.createCalendarName = (
                                      e.target as HTMLInputElement
                                    ).value;
                                  }}
                                  @keydown=${(e: KeyboardEvent) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      void this.submitCreateCalendar();
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  class="cal-create-btn"
                                  ?disabled=${this.createCalendarBusy}
                                  @click=${() => void this.submitCreateCalendar()}
                                >
                                  ${this.createCalendarBusy
                                    ? "Creating…"
                                    : "Create"}
                                </button>
                              </div>
                              <button
                                type="button"
                                class="cal-create-cancel"
                                ?disabled=${this.createCalendarBusy}
                                @click=${() => {
                                  this.createCalendarOpen = false;
                                  this.createCalendarError = "";
                                }}
                              >
                                Cancel
                              </button>
                            `
                          : html`
                              <button
                                type="button"
                                class="cal-create-toggle"
                                @click=${() => {
                                  this.createCalendarOpen = true;
                                  this.createCalendarError = "";
                                }}
                              >
                                + Create new calendar
                              </button>
                            `}
                        ${this.createCalendarError
                          ? html`<p class="cal-picker-error">
                              ${this.createCalendarError}
                            </p>`
                          : nothing}
                        ${this.persistNote
                          ? html`<p class="cal-picker-hint">${this.persistNote}</p>`
                          : nothing}
                      </div>
                    </div>
                  `
                : nothing}
            </div>
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
                  .maxVisible=${this.monthMaxVisibleEvents}
                  @event-select=${(e: CustomEvent<EventSelectDetail>) =>
                    this.openEdit(e.detail)}
                  @event-toggle-done=${(e: CustomEvent<ToggleDoneDetail>) =>
                    void this.onToggleDone(e)}
                  @event-move=${(e: CustomEvent<EventMoveDetail>) =>
                    void this.onEventMove(e)}
                  @day-select=${(e: CustomEvent<{ date: Date }>) =>
                    this.openDayView(e.detail.date)}
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
                  @event-select=${(e: CustomEvent<EventSelectDetail>) =>
                    this.openEdit(e.detail)}
                  @event-toggle-done=${(e: CustomEvent<ToggleDoneDetail>) =>
                    void this.onToggleDone(e)}
                  @event-move=${(e: CustomEvent<EventMoveDetail>) =>
                    void this.onEventMove(e)}
                  @day-select=${(e: CustomEvent<{ date: Date }>) =>
                    this.openDayView(e.detail.date)}
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
                  .doneDay=${this.formDoneDay ?? ""}
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
          <span>${this.statusText()}</span>
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
    "Skylight-style month/week/day calendar with create/edit, drag-to-reschedule, and safe calendar moves",
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
