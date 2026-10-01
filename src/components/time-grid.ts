import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { DAY_END_HOUR, DAY_START_HOUR, HOUR_HEIGHT_PX } from "../const";
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

function parseEventDate(value: string): Date {
  // HA may send date-only (all-day) or ISO datetime
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, day] = value.split("-").map(Number);
    return new Date(y, m - 1, day);
  }
  return new Date(value);
}

@customElement("hac-time-grid")
export class HacTimeGrid extends LitElement {
  static styles = gridStyles;

  @property({ attribute: false }) mode: CalendarViewMode = "week";
  @property({ attribute: false }) anchorDate: Date = new Date();
  @property({ attribute: false }) events: CalendarEvent[] = [];
  @property({ type: Number }) dayStartHour = DAY_START_HOUR;
  @property({ type: Number }) dayEndHour = DAY_END_HOUR;

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

  private eventStyle(ev: CalendarEvent, day: Date): string | null {
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
      20,
      (clampedEnd.getTime() - clampedStart.getTime()) / 60000
    );
    const top = (minutesFromGrid / 60) * HOUR_HEIGHT_PX;
    const height = (durationMin / 60) * HOUR_HEIGHT_PX;
    return `top:${top}px;height:${height}px;`;
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

  private onSlotDblClick(day: Date, hour: number): void {
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

  render() {
    const hours = this.hours;
    const days = this.days;
    const totalHeight = hours.length * HOUR_HEIGHT_PX;

    return html`
      <div
        class="time-grid"
        data-mode=${this.mode}
        style="--hac-hour-height:${HOUR_HEIGHT_PX}px"
      >
        <div class="corner"></div>
        ${days.map(
          (d) => html`
            <div class="day-head">
              ${d.toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          `
        )}

        <div class="hours" style="height:${totalHeight}px">
          ${hours.map(
            (h) => html`<div class="hour-label">${String(h).padStart(2, "0")}:00</div>`
          )}
        </div>

        ${days.map(
          (day) => html`
            <div
              class="day-col"
              style="height:${totalHeight}px"
              @dblclick=${(e: MouseEvent) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                const y = e.clientY - rect.top;
                const hour =
                  this.dayStartHour + Math.floor(y / HOUR_HEIGHT_PX);
                this.onSlotDblClick(day, hour);
              }}
            >
              ${hours.map(() => html`<div class="hour-line"></div>`)}
              ${this.events.map((ev) => {
                const style = this.eventStyle(ev, day);
                if (!style) return nothing;
                const calShort = ev.calendar.replace(/^calendar\./, "");
                return html`
                  <div
                    class="event-block"
                    style=${style}
                    @click=${(e: Event) => {
                      e.stopPropagation();
                      this.onEventClick(ev);
                    }}
                  >
                    <strong>${ev.summary}</strong>
                    <span class="cal-tag">${calShort}</span>
                  </div>
                `;
              })}
            </div>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hac-time-grid": HacTimeGrid;
  }
}
