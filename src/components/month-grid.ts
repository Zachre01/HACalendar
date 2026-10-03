import { LitElement, html, nothing, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fallbackCalendarColor } from "../utils/calendar-colors";
import type { CalendarColorMap } from "../utils/calendar-colors";
import type { CalendarEvent, WeatherSummary } from "../types";
import { forecastForDate, weatherGlyph } from "../utils/weather";

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

function formatEventTime(ev: CalendarEvent): string {
  if (ev.all_day || /^\d{4}-\d{2}-\d{2}$/.test(ev.start)) return "All day";
  const start = parseEventDate(ev.start);
  return start.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

@customElement("hac-month-grid")
export class HacMonthGrid extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      /* Join shell → grid-wrap flex cascade; data-fill still shrinks month rows */
      min-height: 0;
      overflow: auto;
      overscroll-behavior: contain;
      box-sizing: border-box;
      font-family: var(--hac-font-body, "Nunito", "Avenir Next", "Segoe UI", sans-serif);
      color: var(--hac-ink, #2c3340);
      background: var(--hac-surface, #fff);
    }

    .month {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
    }

    .dow {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      border-bottom: 1px solid var(--hac-line, #e8ebf0);
      background: var(--hac-surface-muted, #fafbfc);
    }

    .dow span {
      text-align: center;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--hac-muted, #8a93a3);
      padding: 0.55rem 0.25rem;
    }

    .cells {
      flex: 1 1 auto;
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      grid-auto-rows: minmax(5.5rem, 1fr);
      min-height: 0;
    }

    /* Panel fill: shrink rows into the available body (outer page must not scroll) */
    :host([data-fill]) .cells {
      grid-auto-rows: minmax(0, 1fr);
    }

    .cell {
      border-right: 1px solid var(--hac-line, #e8ebf0);
      border-bottom: 1px solid var(--hac-line, #e8ebf0);
      padding: 0.35rem 0.35rem 0.4rem;
      min-height: 0;
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      background: var(--hac-surface, #fff);
      cursor: pointer;
      transition: background 140ms ease;
    }

    .cell:nth-child(7n) {
      border-right: 0;
    }

    .cell:hover {
      background: var(--hac-cell-hover, #f7fafc);
    }

    .cell[data-outside="true"] {
      background: var(--hac-outside-bg, #fbfcfd);
      color: var(--hac-outside-ink, #b0b7c3);
    }

    .cell[data-today="true"] {
      background: var(--hac-today-bg, #fffaf7);
    }

    .cell-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.25rem;
      min-height: 1.4rem;
    }

    .num {
      font-size: 0.85rem;
      font-weight: 700;
      width: 1.5rem;
      height: 1.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .cell[data-today="true"] .num {
      background: var(--hac-today, #f08a5a);
      color: #fff;
    }

    .wx {
      font-size: 0.68rem;
      color: var(--hac-muted, #8a93a3);
      font-weight: 600;
      white-space: nowrap;
    }

    .events {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      min-height: 0;
      overflow: hidden;
    }

    .chip {
      border: 0;
      border-radius: 6px;
      padding: 0.12rem 0.35rem;
      font: inherit;
      font-size: 0.68rem;
      font-weight: 700;
      line-height: 1.25;
      color: #fff;
      text-align: left;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: filter 120ms ease, transform 120ms ease;
    }

    .chip:hover {
      filter: brightness(1.05);
      transform: translateY(-0.5px);
    }

    .chip .t {
      font-weight: 600;
      opacity: 0.92;
      margin-right: 0.2rem;
    }

    .chip .recur {
      font-weight: 800;
      opacity: 0.95;
      margin-right: 0.15rem;
    }

    .more {
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--hac-muted, #8a93a3);
      padding: 0.05rem 0.2rem;
    }

    .empty {
      font-size: 0.65rem;
      font-weight: 600;
      color: var(--hac-faint, #c2c8d2);
      padding: 0.1rem 0.15rem;
    }

    @media (max-width: 720px) {
      .cells {
        grid-auto-rows: minmax(4.75rem, 1fr);
      }

      :host([data-fill]) .cells {
        grid-auto-rows: minmax(0, 1fr);
      }

      .chip {
        font-size: 0.62rem;
        padding: 0.1rem 0.28rem;
      }

      .empty {
        display: none;
      }
    }
  `;

  @property({ attribute: false }) anchorDate: Date = new Date();
  @property({ attribute: false }) events: CalendarEvent[] = [];
  @property({ attribute: false }) calendars: string[] = [];
  @property({ attribute: false }) calendarColors: CalendarColorMap = {};
  @property({ attribute: false }) weather: WeatherSummary | null = null;
  @property({ type: Number }) maxVisible = 3;

  private get monthStart(): Date {
    const d = startOfDay(this.anchorDate);
    d.setDate(1);
    return d;
  }

  private get cells(): Date[] {
    const first = this.monthStart;
    const weekday = (first.getDay() + 6) % 7;
    const gridStart = addDays(first, -weekday);
    return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
  }

  private calendarColor(entityId: string): string {
    if (this.calendarColors[entityId]) {
      return this.calendarColors[entityId];
    }
    const idx = Math.max(0, this.calendars.indexOf(entityId));
    return fallbackCalendarColor(idx);
  }

  private eventsForDay(day: Date): CalendarEvent[] {
    return this.events
      .filter((ev) => {
        const start = parseEventDate(ev.start);
        const end = parseEventDate(ev.end);
        const dayStart = startOfDay(day);
        const dayEnd = addDays(dayStart, 1);
        return start < dayEnd && end > dayStart;
      })
      .sort(
        (a, b) =>
          parseEventDate(a.start).getTime() - parseEventDate(b.start).getTime()
      );
  }

  /** Distinguishes single-click (open day view) from double-click (create). */
  private dayClickTimer: number | null = null;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearDayClickTimer();
  }

  private clearDayClickTimer(): void {
    if (this.dayClickTimer !== null) {
      window.clearTimeout(this.dayClickTimer);
      this.dayClickTimer = null;
    }
  }

  private onEventClick(ev: CalendarEvent, e: Event): void {
    e.stopPropagation();
    this.clearDayClickTimer();
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

  private onDayClick(day: Date): void {
    this.clearDayClickTimer();
    this.dayClickTimer = window.setTimeout(() => {
      this.dayClickTimer = null;
      this.onDayOpen(day);
    }, 250);
  }

  private onDayCreate(day: Date): void {
    this.clearDayClickTimer();
    const start = new Date(day);
    start.setHours(9, 0, 0, 0);
    const end = new Date(start);
    end.setHours(10, 0, 0, 0);
    this.dispatchEvent(
      new CustomEvent("slot-create", {
        detail: { start, end },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const today = new Date();
    const month = this.monthStart.getMonth();
    const dows = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return html`
      <div class="month">
        <div class="dow">
          ${dows.map((d) => html`<span>${d}</span>`)}
        </div>
        <div class="cells">
          ${this.cells.map((day) => {
            const outside = day.getMonth() !== month;
            const isToday = sameDay(day, today);
            const dayEvents = this.eventsForDay(day);
            const visible = dayEvents.slice(0, this.maxVisible);
            const overflow = dayEvents.length - visible.length;
            const wx = forecastForDate(this.weather, day);
            return html`
              <div
                class="cell"
                data-outside=${outside ? "true" : "false"}
                data-today=${isToday ? "true" : "false"}
                title="Click for day view · double-click to add event"
                @click=${() => this.onDayClick(day)}
                @dblclick=${() => this.onDayCreate(day)}
              >
                <div class="cell-top">
                  <span class="num">${day.getDate()}</span>
                  ${wx
                    ? html`<span class="wx"
                        >${weatherGlyph(wx.condition)}${wx.temperature != null
                          ? ` ${Math.round(wx.temperature)}°`
                          : ""}</span
                      >`
                    : nothing}
                </div>
                <div class="events">
                  ${visible.map(
                    (ev) => html`
                      <button
                        type="button"
                        class="chip"
                        style="background:${this.calendarColor(ev.calendar)}"
                        title=${ev.rrule || ev.recurring
                          ? `${ev.summary} (repeats)`
                          : ev.summary}
                        @click=${(e: Event) => this.onEventClick(ev, e)}
                      >
                        ${ev.rrule || ev.recurring
                          ? html`<span class="recur" aria-hidden="true">↻</span>`
                          : nothing}<span class="t"
                          >${formatEventTime(ev)}</span
                        >${ev.summary}
                      </button>
                    `
                  )}
                  ${overflow > 0
                    ? html`<div class="more">+${overflow} more</div>`
                    : nothing}
                  ${!outside && dayEvents.length === 0
                    ? html`<div class="empty">No events</div>`
                    : nothing}
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hac-month-grid": HacMonthGrid;
  }
}
