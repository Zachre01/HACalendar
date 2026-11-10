import type { CalendarEvent, EventMoveDetail } from "../types";

const DRAG_THRESHOLD_PX = 8;
const CLICK_SUPPRESS_MS = 450;

export interface DayDragPayload {
  event: CalendarEvent;
  fromDay: string;
  /** Opaque id echoed back while the gesture is active (used to fade the chip). */
  dragId: string;
  label: string;
  color: string;
}

export interface DayDragVisual {
  dragId: string | null;
  dropDay: string | null;
}

export interface DayDragControllerOptions {
  getRoot: () => ShadowRoot | null;
  getScroller: () => HTMLElement;
  onVisual: (state: DayDragVisual) => void;
  onMove: (detail: EventMoveDetail) => void;
}

/** Stable key for one event instance, shared by every day chip of a multi-day span. */
export function eventInstanceKey(
  ev: Pick<CalendarEvent, "calendar" | "uid" | "recurrence_id" | "start" | "end">
): string {
  return `${ev.calendar}\u001f${ev.uid}\u001f${ev.recurrence_id ?? ""}\u001f${ev.start}\u001f${ev.end}`;
}

function ensureDragStyles(): void {
  if (document.getElementById("hac-day-drag-style")) return;
  const style = document.createElement("style");
  style.id = "hac-day-drag-style";
  style.textContent = `
    body.hac-event-dragging, body.hac-event-dragging * {
      cursor: grabbing !important;
      user-select: none !important;
    }
  `;
  document.head.appendChild(style);
}

/** elementFromPoint that walks open shadow roots (Home Assistant + this card). */
function elementFromPointDeep(x: number, y: number): Element | null {
  let current: Document | ShadowRoot = document;
  let found: Element | null = null;
  for (let depth = 0; depth < 8; depth += 1) {
    const next: Element | null = current.elementFromPoint(x, y);
    if (!next || next === found) break;
    found = next;
    if (!next.shadowRoot) break;
    current = next.shadowRoot;
  }
  return found;
}

function formatDropDay(dayKey: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dayKey);
  if (!match) return dayKey;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Pointer drag (mouse, pen, touch) from an event chip onto a `[data-day]` cell.
 * A short press still clicks through; movement past a few pixels starts the drag.
 */
export class DayDragController {
  private payload: DayDragPayload | null = null;
  private pointerId = -1;
  private originX = 0;
  private originY = 0;
  private lastX = 0;
  private lastY = 0;
  private active = false;
  private dropDay: string | null = null;
  private ghost: HTMLDivElement | null = null;
  private raf = 0;
  private listening = false;
  private ignoreClicksUntil = 0;

  constructor(private opts: DayDragControllerOptions) {}

  begin(e: PointerEvent, payload: DayDragPayload): void {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const target = e.target instanceof Element ? e.target : null;
    if (target?.closest(".done-check")) return;
    if (this.listening) this.teardown(false);

    this.payload = payload;
    this.pointerId = e.pointerId;
    this.originX = this.lastX = e.clientX;
    this.originY = this.lastY = e.clientY;
    this.active = false;
    this.dropDay = null;
    this.bind();
  }

  /** True when a drag just finished and the follow-up click / double-click should be ignored. */
  consumeClick(e?: Event): boolean {
    if (performance.now() >= this.ignoreClicksUntil) return false;
    e?.preventDefault();
    e?.stopPropagation();
    return true;
  }

  destroy(): void {
    this.unbind();
    this.removeGhost();
    this.stopScrollLoop();
    this.clearGrabCursor();
    this.payload = null;
    this.active = false;
    this.dropDay = null;
    this.ignoreClicksUntil = 0;
  }

  private bind(): void {
    window.addEventListener("pointermove", this.onPointerMove, { passive: false });
    window.addEventListener("pointerup", this.onPointerUp);
    window.addEventListener("pointercancel", this.onPointerCancel);
    window.addEventListener("keydown", this.onKeyDown, true);
    this.listening = true;
  }

  private unbind(): void {
    if (!this.listening) return;
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    window.removeEventListener("pointercancel", this.onPointerCancel);
    window.removeEventListener("keydown", this.onKeyDown, true);
    this.listening = false;
  }

  private onPointerMove = (e: PointerEvent): void => {
    if (!this.payload || e.pointerId !== this.pointerId) return;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    const dx = e.clientX - this.originX;
    const dy = e.clientY - this.originY;
    if (!this.active) {
      if (dx * dx + dy * dy < DRAG_THRESHOLD_PX * DRAG_THRESHOLD_PX) return;
      this.active = true;
      ensureDragStyles();
      document.body.classList.add("hac-event-dragging");
      this.showGhost(e.clientX, e.clientY);
      this.opts.onVisual({ dragId: this.payload.dragId, dropDay: null });
      this.startScrollLoop();
    }
    if (e.cancelable) e.preventDefault();
    this.positionGhost(e.clientX, e.clientY);
    this.updateDrop(e.clientX, e.clientY);
  };

  private onPointerUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointerId) return;
    const payload = this.payload;
    const dropDay = this.dropDay;
    const active = this.active;
    this.teardown(active);
    if (active && payload && dropDay && dropDay !== payload.fromDay) {
      this.opts.onMove({
        event: payload.event,
        fromDay: payload.fromDay,
        toDay: dropDay,
      });
    }
  };

  private onPointerCancel = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointerId) return;
    this.teardown(this.active);
  };

  private onKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== "Escape" || !this.active) return;
    e.preventDefault();
    this.teardown(true);
  };

  private teardown(suppressClicks: boolean): void {
    const wasActive = this.active;
    this.unbind();
    this.removeGhost();
    this.stopScrollLoop();
    this.clearGrabCursor();
    this.payload = null;
    this.active = false;
    this.dropDay = null;
    if (wasActive) {
      this.opts.onVisual({ dragId: null, dropDay: null });
    }
    if (suppressClicks && wasActive) {
      this.ignoreClicksUntil = performance.now() + CLICK_SUPPRESS_MS;
    }
  }

  private showGhost(x: number, y: number): void {
    this.removeGhost();
    const payload = this.payload;
    if (!payload) return;
    const ghost = document.createElement("div");
    ghost.setAttribute("aria-hidden", "true");
    ghost.dataset.hacDragGhost = "true";
    ghost.textContent = payload.label;
    ghost.style.position = "fixed";
    ghost.style.zIndex = "2147483000";
    ghost.style.left = "0";
    ghost.style.top = "0";
    ghost.style.pointerEvents = "none";
    ghost.style.maxWidth = "16rem";
    ghost.style.padding = "0.28rem 0.55rem";
    ghost.style.borderRadius = "6px";
    ghost.style.color = "#fff";
    ghost.style.font = '700 0.78rem/1.3 Nunito, "Segoe UI", sans-serif';
    ghost.style.background = payload.color || "#3d9b8f";
    ghost.style.boxShadow = "0 10px 24px rgba(44, 51, 64, 0.28)";
    ghost.style.whiteSpace = "nowrap";
    ghost.style.overflow = "hidden";
    ghost.style.textOverflow = "ellipsis";
    document.body.appendChild(ghost);
    this.ghost = ghost;
    this.positionGhost(x, y);
  }

  private positionGhost(x: number, y: number): void {
    if (!this.ghost) return;
    this.ghost.style.transform = `translate(${Math.round(x + 14)}px, ${Math.round(y + 16)}px)`;
  }

  private removeGhost(): void {
    this.ghost?.remove();
    this.ghost = null;
  }

  private refreshGhostLabel(): void {
    if (!this.ghost || !this.payload) return;
    const day = this.dropDay;
    if (!day || day === this.payload.fromDay) {
      this.ghost.textContent = this.payload.label;
      return;
    }
    this.ghost.textContent = `${this.payload.label} → ${formatDropDay(day)}`;
  }

  private clearGrabCursor(): void {
    document.body.classList.remove("hac-event-dragging");
  }

  private updateDrop(x: number, y: number): void {
    const day = this.dayAt(x, y);
    if (day === this.dropDay) return;
    this.dropDay = day;
    this.refreshGhostLabel();
    if (!this.payload) return;
    this.opts.onVisual({ dragId: this.payload.dragId, dropDay: day });
  }

  private dayAt(x: number, y: number): string | null {
    const root = this.opts.getRoot();
    if (!root) return null;
    const el = elementFromPointDeep(x, y);
    if (!el) return null;
    const hit = el.closest("[data-day]");
    if (!hit || !root.contains(hit)) return null;
    const day = hit.getAttribute("data-day");
    return day && /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : null;
  }

  private startScrollLoop(): void {
    this.stopScrollLoop();
    const tick = (): void => {
      if (!this.active) return;
      this.autoscroll();
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  private stopScrollLoop(): void {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private autoscroll(): void {
    const scroller = this.opts.getScroller();
    const rect = scroller.getBoundingClientRect();
    const x = this.lastX;
    const y = this.lastY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return;
    const edge = 56;
    let dx = 0;
    let dy = 0;
    if (y < rect.top + edge) dy = -Math.ceil((edge - (y - rect.top)) / 4);
    else if (y > rect.bottom - edge) dy = Math.ceil((edge - (rect.bottom - y)) / 4);
    if (x < rect.left + edge) dx = -Math.ceil((edge - (x - rect.left)) / 4);
    else if (x > rect.right - edge) dx = Math.ceil((edge - (rect.right - x)) / 4);
    if (!dx && !dy) return;
    scroller.scrollLeft += dx;
    scroller.scrollTop += dy;
    this.updateDrop(x, y);
  }
}
