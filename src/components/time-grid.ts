import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  DAY_END_HOUR,
  DAY_START_HOUR,
  HOUR_HEIGHT_PX,
} from "../const";
import { fallbackCalendarColor } from "../utils/calendar-colors";
import type { CalendarColorMap } from "../utils/calendar-colors";
import { gridStyles } from "../styles/shared";
import type { CalendarEvent, CalendarViewMode } from "../types";

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function parseEventDate(value: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, day] = value.split("-").map(Number);
    return new Date(y, m - 1, day);
  }
  return new Date(value);
}

/** Date-only, flagged all-day, or midnight→midnight full-day (outside hour grid). */
function isAllDayLike(ev: CalendarEvent): boolean {
  if (ev.all_day) return true;
  if (/^\d{4}-\d{2}-\d{2}$/.test(ev.start)) return true;

  const start = parseEventDate(ev.start);
  const end = parseEventDate(ev.end);
  const startMidnight =
    start.getHours() === 0 &&
    start.getMinutes() === 0 &&
    start.getSeconds() === 0 &&
    start.getMilliseconds() === 0;
  if (!startMidnight || end <= start) return false;

  const endMidnight =
    end.getHours() === 0 &&
    end.getMinutes() === 0 &&
    end.getSeconds() === 0 &&
    end.getMilliseconds() === 0;
  if (endMidnight) return true;

  return end.getTime() - start.getTime() >= 24 * 60 * 60 * 1000;
}

function eventTouchesDay(ev: CalendarEvent, day: Date): boolean {
  const start = parseEventDate(ev.start);
  const end = parseEventDate(ev.end);
  const dayStart = startOfDay(day);
  const dayEnd = addDays(dayStart, 1);
  return start < dayEnd && end > dayStart;
}

@customElement("hac-time-grid")
export class HacTimeGrid extends LitElement {
  static styles = gridStyles;

  @property({ attribute: false }) mode: CalendarViewMode = "week";
  @property({ attribute: false }) anchorDate: Date = new Date();
  @property({ attribute: false }) events: CalendarEvent[] = [];
  @property({ attribute: false }) calendars: string[] = [];
  @property({ attribute: false }) calendarColors: CalendarColorMap = {};
  @property({ type: Number }) dayStartHour = DAY_START_HOUR;
  @property({ type: Number }) dayEndHour = DAY_END_HOUR;
  /** Tick from parent clock — refreshes now-line without event refetch */
  @property({ type: Number }) nowTick = 0;

  private get days(): Date[] {
    const base = startOfDay(this.anchorDate);
    if (this.mode === "day") {
      return [base];
    }
    const weekday = (base.getDay() + 6) % 7; // Monday-first
    const monday = addDays(base, -weekday);
    return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  }

  private get hours(): number[] {
    const out: number[] = [];
    for (let h = this.dayStartHour; h < this.dayEndHour; h++) {
      out.push(h);
    }
    return out;
  }

  private calendarColor(entityId: string): string {
    if (this.calendarColors[entityId]) {
      return this.calendarColors[entityId];
    }
    const idx = Math.max(0, this.calendars.indexOf(entityId));
    return fallbackCalendarColor(idx);
  }

  private allDayEventsForDay(day: Date): CalendarEvent[] {
    return this.events
      .filter((ev) => isAllDayLike(ev) && eventTouchesDay(ev, day))
      .sort(
        (a, b) =>
          parseEventDate(a.start).getTime() - parseEventDate(b.start).getTime() ||
          a.summary.localeCompare(b.summary)
      );
  }

  private eventStyle(ev: CalendarEvent, day: Date): string | null {
    if (isAllDayLike(ev)) return null;

    const start = parseEventDate(ev.start);
    const end = parseEventDate(ev.end);
    const dayStart = new Date(day);
    dayStart.setHours(this.dayStartHour, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(this.dayEndHour, 0, 0, 0);

    if (end <= dayStart || start >= dayEnd) {
      return null;
    }

    const clampedStart = start < dayStart ? dayStart : start;
    const clampedEnd = end > dayEnd ? dayEnd : end;
    const minutesFromGrid =
      (clampedStart.getHours() - this.dayStartHour) * 60 +
      clampedStart.getMinutes();
    const durationMin = Math.max(
      22,
      (clampedEnd.getTime() - clampedStart.getTime()) / 60000
    );
    const top = (minutesFromGrid / 60) * HOUR_HEIGHT_PX;
    const height = (durationMin / 60) * HOUR_HEIGHT_PX;
    const color = this.calendarColor(ev.calendar);
    return `top:${top}px;height:${height}px;background:${color};`;
  }

  private nowLineTop(day: Date): number | null {
    void this.nowTick;
    const now = new Date();
    if (!sameDay(now, day)) return null;
    if (
      now.getHours() < this.dayStartHour ||
      now.getHours() >= this.dayEndHour
    ) {
      return null;
    }
    const minutes =
      (now.getHours() - this.dayStartHour) * 60 + now.getMinutes();
    return (minutes / 60) * HOUR_HEIGHT_PX;
  }

  private formatTime(ev: CalendarEvent): string {
    if (ev.all_day || /^\d{4}-\d{2}-\d{2}$/.test(ev.start)) return "All day";
    return parseEventDate(ev.start).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  private onEventClick(ev: CalendarEvent): void {
    this.dispatchEvent(
      new CustomEvent("event-select", {
        detail: ev,
        bubbles: true,
        composed: true,
      })
    );
  }

  private onDayOpen(day: Date): void {
    this.dispatchEvent(
      new CustomEvent("day-select", {
        detail: { date: startOfDay(day) },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onSlotCreate(day: Date, hour: number): void {
    const start = new Date(day);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(hour + 1, 0, 0, 0);
    this.dispatchEvent(
      new CustomEvent("slot-create", {
        detail: { start, end },
        bubbles: true,
        composed: true,
      })
    );
  }

  private hourFromPointer(e: MouseEvent, target: HTMLElement): number {
    const rect = target.getBoundingClientRect();
    const y = e.clientY - rect.top;
    return this.dayStartHour + Math.floor(y / HOUR_HEIGHT_PX);
  }

  render() {
    const hours = this.hours;
    const days = this.days;
    const totalHeight = hours.length * HOUR_HEIGHT_PX;
    const today = new Date();

    return html`
      <div
        class="time-grid"
        data-mode=${this.mode === "month" ? "week" : this.mode}
        style="--hac-hour-height:${HOUR_HEIGHT_PX}px"
      >
        <div class="corner"></div>
        ${days.map((d) => {
          const isToday = sameDay(d, today);
          const openDayOnClick = this.mode === "week";
          return html`
            <div
              class="day-head"
              data-today=${isToday ? "true" : "false"}
              data-clickable=${openDayOnClick ? "true" : "false"}
              title=${openDayOnClick ? "Open day view" : nothing}
              role=${openDayOnClick ? "button" : nothing}
              tabindex=${openDayOnClick ? 0 : nothing}
              @click=${openDayOnClick ? () => this.onDayOpen(d) : undefined}
              @keydown=${openDayOnClick
                ? (e: KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      this.onDayOpen(d);
                    }
                  }
                : undefined}
            >
              <span
                >${d.toLocaleDateString(undefined, {
                  weekday: "short",
                })}</span
              >
              <span class="num">${d.getDate()}</span>
            </div>
          `;
        })}

        <div class="allday-gutter" aria-hidden="true">All day</div>
        ${days.map((day) => {
          const isToday = sameDay(day, today);
          const allDay = this.allDayEventsForDay(day);
          return html`
            <div
              class="allday-cell"
              data-today=${isToday ? "true" : "false"}
              data-count=${String(allDay.length)}
            >
              ${allDay.map((ev) => {
                const calShort = ev.calendar.replace(/^calendar\./, "");
                return html`
                  <button
                    type="button"
                    class="allday-chip"
                    style="background:${this.calendarColor(ev.calendar)}"
                    title=${ev.rrule || ev.recurring
                      ? `${ev.summary} (repeats) · ${calShort}`
                      : `${ev.summary} · ${calShort}`}
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      this.onEventClick(ev);
                    }}
                  >
                    ${ev.rrule || ev.recurring
                      ? html`<span class="recur" aria-hidden="true">↻</span>`
                      : nothing}<span class="chip-title">${ev.summary}</span>
                  </button>
                `;
              })}
            </div>
          `;
        })}

        <div class="hours" style="height:${totalHeight}px">
          ${hours.map(
            (h) =>
              html`<div class="hour-label">
                ${String(h).padStart(2, "0")}:00
              </div>`
          )}
        </div>

        ${days.map((day) => {
          const isToday = sameDay(day, today);
          const nowTop = this.nowLineTop(day);
          return html`
            <div
              class="day-col"
              data-today=${isToday ? "true" : "false"}
              style="height:${totalHeight}px"
              @dblclick=${(e: MouseEvent) => {
                const hour = this.hourFromPointer(
                  e,
                  e.currentTarget as HTMLElement
                );
                this.onSlotCreate(day, hour);
              }}
            >
              ${hours.map(() => html`<div class="hour-line"></div>`)}
              ${nowTop !== null
                ? html`<div class="now-line" style="top:${nowTop}px"></div>`
                : nothing}
              ${this.events.map((ev) => {
                const style = this.eventStyle(ev, day);
                if (!style) return nothing;
                const calShort = ev.calendar.replace(/^calendar\./, "");
                return html`
                  <div
                    class="event-block"
                    style=${style}
                    role="button"
                    tabindex="0"
                    data-recurring=${ev.rrule || ev.recurring ? "true" : "false"}
                    title=${ev.rrule || ev.recurring
                      ? `${ev.summary} (repeats)`
                      : ev.summary}
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      this.onEventClick(ev);
                    }}
                    @keydown=${(e: KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        this.onEventClick(ev);
                      }
                    }}
                  >
                    <strong
                      >${ev.rrule || ev.recurring ? "↻ " : ""}${ev.summary}</strong
                    >
                    <span class="time-tag">${this.formatTime(ev)}</span>
                    <span class="cal-tag">${calShort}</span>
                  </div>
                `;
              })}
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hac-time-grid": HacTimeGrid;
  }
}
