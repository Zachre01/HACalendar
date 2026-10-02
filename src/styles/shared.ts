import { css } from "lit";

/**
 * Skylight-inspired wall-tablet tokens.
 * Light off-white surface, soft pastels, coral today accent — not purple / cream-AI defaults.
 */
export const FONT_STYLESHEET_HREF =
  "https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Nunito:wght@500;600;700;800&family=Quicksand:wght@500;600;700&display=swap";

export const cardStyles = css`
  :host {
    /* Light (Skylight) — default */
    --hac-bg: #f7f8fa;
    --hac-surface: #ffffff;
    --hac-surface-muted: #fafbfc;
    --hac-surface-soft: #f4f6f8;
    --hac-ink: #2c3340;
    --hac-muted: #8a93a3;
    --hac-faint: #b0b7c3;
    --hac-accent: #3d9b8f;
    --hac-accent-hover: #318579;
    --hac-today: #f08a5a;
    --hac-today-bg: #fffaf7;
    --hac-today-head: #fff6f1;
    --hac-line: #e8ebf0;
    --hac-line-strong: #d8dde6;
    --hac-danger: #c45c5c;
    --hac-danger-bg: #fdf4f4;
    --hac-warn: #9a6b1f;
    --hac-warn-bg: #fff6e8;
    --hac-warn-ink: #5c3d00;
    --hac-cell-hover: #f7fafc;
    --hac-outside-bg: #fbfcfd;
    --hac-outside-ink: #b0b7c3;
    --hac-veil: rgba(255, 255, 255, 0.28);
    --hac-state-bg: rgba(255, 255, 255, 0.88);
    --hac-info-grad: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
    --hac-shadow-soft: rgba(44, 51, 64, 0.08);
    --hac-radius: 0;
    --hac-font-display: "Manrope", "Avenir Next", "Segoe UI", sans-serif;
    --hac-font-body: "Nunito", "Avenir Next", "Segoe UI", sans-serif;
    --hac-font-weather: "Quicksand", "Nunito", "Avenir Next", sans-serif;
    --hac-cal-0: #e07a5f;
    --hac-cal-1: #3d9b8f;
    --hac-cal-2: #81b29a;
    --hac-cal-3: #5b8db8;
    --hac-cal-4: #e9b44c;
    --hac-hour-height: 56px;

    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 440px;
    font-family: var(--hac-font-body);
    color: var(--hac-ink);
    background: var(--hac-bg);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--hac-line);
    animation: host-in 280ms ease;
    color-scheme: light;
    transition: background 220ms ease, color 220ms ease, border-color 220ms ease;
  }

  /* Cohesive dark companion to Skylight light — warm slate, same accents */
  :host([data-theme="dark"]) {
    --hac-bg: #1a1e26;
    --hac-surface: #222833;
    --hac-surface-muted: #1e2430;
    --hac-surface-soft: #2a3140;
    --hac-ink: #e8ebf2;
    --hac-muted: #9aa3b5;
    --hac-faint: #6e778a;
    --hac-accent: #4db3a5;
    --hac-accent-hover: #5fc4b5;
    --hac-today: #f08a5a;
    --hac-today-bg: #2e2622;
    --hac-today-head: #342820;
    --hac-line: #323a4a;
    --hac-line-strong: #3e475a;
    --hac-danger: #e07a7a;
    --hac-danger-bg: #3a2428;
    --hac-warn: #e0b45c;
    --hac-warn-bg: #3a3020;
    --hac-warn-ink: #f0d9a0;
    --hac-cell-hover: #2a3140;
    --hac-outside-bg: #1c212c;
    --hac-outside-ink: #6e778a;
    --hac-veil: rgba(26, 30, 38, 0.35);
    --hac-state-bg: rgba(34, 40, 51, 0.92);
    --hac-info-grad: linear-gradient(180deg, #262c38 0%, #222833 100%);
    --hac-shadow-soft: rgba(0, 0, 0, 0.35);
    color-scheme: dark;
  }

  /*
   * Panel mode: fill the Lovelace panel host only.
   * Do NOT use min-height: 100vh/dvh − header here — hui-view-container already
   * pads for the HA header (border-box), so a viewport min-height double-counts
   * and creates a page scrollbar + .grid-wrap scrollbar on phones/tablets.
   */
  :host([data-layout="panel"]),
  :host-context(hui-panel-view) {
    min-height: 0;
    flex: 1 1 auto;
    border-radius: 0;
    border: 0;
    /* Prefer measured panel height from JS; else fill the host */
    height: var(--hac-panel-height, 100%);
    max-height: var(--hac-panel-height, 100%);
  }

  @keyframes host-in {
    from {
      opacity: 0.7;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .shell {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    background: var(--hac-surface);
  }

  .info-bar {
    display: grid;
    grid-template-columns: minmax(10rem, 1.1fr) minmax(8rem, 1fr) minmax(12rem, 1.2fr);
    gap: 0.75rem 1rem;
    align-items: center;
    padding: 0.85rem 1.15rem 0.65rem;
    border-bottom: 1px solid var(--hac-line);
    background: var(--hac-info-grad);
    flex: 0 0 auto;
  }

  .clock-block {
    display: flex;
    flex-direction: column;
    gap: 0.05rem;
    min-width: 0;
  }

  .clock-date {
    font-family: var(--hac-font-display);
    font-size: clamp(0.95rem, 2.2vw, 1.15rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--hac-ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .clock-time {
    font-family: var(--hac-font-display);
    font-size: clamp(1.7rem, 4vw, 2.35rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--hac-ink);
  }

  .weather-now {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.35rem;
    min-width: 0;
  }

  .weather-blob {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 0.75rem 0.35rem 0.4rem;
    border-radius: 999px;
    background: var(--hac-wx-soft, var(--hac-surface-soft));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
    animation: wx-pop 420ms cubic-bezier(0.34, 1.4, 0.64, 1);
  }

  :host([data-theme="dark"]) .weather-blob {
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  }

  @keyframes wx-pop {
    from {
      opacity: 0.5;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .weather-icon-halo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 50%;
    background: var(--hac-wx-accent, var(--hac-accent));
    font-size: 1.15rem;
    line-height: 1;
    box-shadow: 0 4px 12px var(--hac-shadow-soft);
    animation: wx-bob 3.2s ease-in-out infinite;
  }

  @keyframes wx-bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  .weather-now .temp {
    font-family: var(--hac-font-weather);
    font-size: clamp(1.35rem, 3vw, 1.85rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--hac-wx-ink, var(--hac-ink));
  }

  .weather-now .cond {
    font-family: var(--hac-font-weather);
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--hac-wx-ink, var(--hac-muted));
    text-transform: none;
    letter-spacing: -0.01em;
  }

  .weather-stub {
    font-family: var(--hac-font-weather);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--hac-faint);
    padding: 0.45rem 0.7rem;
    border-radius: 999px;
    background: var(--hac-surface-soft);
  }

  .forecast-strip {
    display: flex;
    justify-content: flex-end;
    gap: 0.4rem;
    overflow: auto;
    min-width: 0;
    padding-bottom: 0.1rem;
  }

  .forecast-day {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
    min-width: 2.85rem;
    padding: 0.35rem 0.35rem 0.4rem;
    border-radius: 14px;
    background: var(--hac-wx-day-soft, var(--hac-surface-soft));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
    transition: transform 160ms ease, box-shadow 160ms ease;
    animation: wx-chip-in 360ms ease both;
  }

  :host([data-theme="dark"]) .forecast-day {
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .forecast-day:hover {
    transform: translateY(-2px);
  }

  @keyframes wx-chip-in {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .forecast-day .d {
    font-family: var(--hac-font-weather);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--hac-muted);
  }

  .forecast-day .g {
    font-size: 1rem;
    line-height: 1;
  }

  .forecast-day .t {
    font-family: var(--hac-font-weather);
    font-size: 0.76rem;
    font-weight: 700;
    color: var(--hac-wx-day-ink, var(--hac-ink));
  }

  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.65rem 0.85rem;
    padding: 0.55rem 1rem 0.35rem;
    position: relative;
    flex: 0 0 auto;
  }

  .brand {
    font-family: var(--hac-font-display);
    font-size: clamp(1.35rem, 3vw, 1.75rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin: 0;
    text-align: center;
    width: 100%;
    line-height: 1.1;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    width: 100%;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid var(--hac-line-strong);
    background: var(--hac-surface);
    color: var(--hac-ink);
    font: inherit;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 0.32rem 0.7rem 0.32rem 0.55rem;
    border-radius: 999px;
    cursor: pointer;
    transition: background 140ms ease, border-color 140ms ease, opacity 140ms ease,
      transform 120ms ease;
  }

  .pill:hover {
    transform: translateY(-1px);
  }

  .pill[aria-pressed="false"] {
    opacity: 0.42;
    background: var(--hac-surface-soft);
  }

  .pill .dot {
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 0.75rem;
    padding: 0.35rem 1rem 0.7rem;
    flex: 0 0 auto;
  }

  .toolbar-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem;
  }

  .nav-group {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .range-wrap {
    position: relative;
  }

  .range-label {
    font: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--hac-ink);
    min-width: 7rem;
    text-align: center;
    border: 1px solid transparent;
    background: transparent;
    border-radius: 999px;
    padding: 0.35rem 0.65rem;
    cursor: pointer;
    transition: background 140ms ease, border-color 140ms ease;
  }

  .range-label:hover,
  .range-label[aria-expanded="true"] {
    background: var(--hac-surface-soft);
    border-color: var(--hac-line-strong);
  }

  .range-label .caret {
    display: inline-block;
    margin-left: 0.2rem;
    font-size: 0.7em;
    opacity: 0.65;
  }

  .month-picker {
    position: absolute;
    top: calc(100% + 0.35rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 8;
    width: min(17.5rem, 80vw);
    padding: 0.75rem;
    border-radius: 14px;
    background: var(--hac-surface);
    border: 1px solid var(--hac-line-strong);
    box-shadow: 0 12px 32px var(--hac-shadow-soft);
    animation: picker-in 180ms ease;
  }

  @keyframes picker-in {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  .month-picker-year {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem;
    margin-bottom: 0.55rem;
  }

  .month-picker-year .year {
    font-family: var(--hac-font-display);
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .month-picker-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.3rem;
  }

  .month-picker-grid button {
    font: inherit;
    font-size: 0.78rem;
    font-weight: 700;
    border: 1px solid transparent;
    background: var(--hac-surface-soft);
    color: var(--hac-ink);
    border-radius: 10px;
    padding: 0.45rem 0.25rem;
    cursor: pointer;
    min-height: 2.15rem;
    transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
  }

  .month-picker-grid button:hover {
    border-color: var(--hac-line-strong);
  }

  .month-picker-grid button[aria-current="true"] {
    background: var(--hac-accent);
    color: #fff;
    border-color: var(--hac-accent);
  }

  .view-toggle {
    display: inline-flex;
    border: 1px solid var(--hac-line-strong);
    border-radius: 999px;
    overflow: hidden;
    background: var(--hac-bg);
  }

  .view-toggle button {
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    border: 0;
    background: transparent;
    color: var(--hac-muted);
    padding: 0.38rem 0.8rem;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;
  }

  .view-toggle button[aria-pressed="true"] {
    background: var(--hac-ink);
    color: var(--hac-surface);
  }

  .theme-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .theme-btn .glyph {
    font-size: 0.95rem;
    line-height: 1;
  }

  .nav-btn,
  .primary-btn,
  .ghost-btn {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 700;
    border: 1px solid var(--hac-line-strong);
    background: var(--hac-surface);
    color: var(--hac-ink);
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    cursor: pointer;
    min-height: 2.15rem;
    transition: transform 120ms ease, background 140ms ease, border-color 140ms ease;
  }

  .nav-btn:hover,
  .ghost-btn:hover,
  .primary-btn:hover {
    transform: translateY(-1px);
  }

  .primary-btn {
    background: var(--hac-accent);
    border-color: var(--hac-accent);
    color: #fff;
  }

  .primary-btn:hover {
    background: var(--hac-accent-hover);
  }

  .ghost-btn {
    background: transparent;
  }

  .add-btn {
    margin-left: auto;
  }

  /* Sole vertical scroll context for month/week/day bodies */
  .grid-wrap {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    position: relative;
    -webkit-overflow-scrolling: touch;
    background: var(--hac-surface);
  }

  hac-time-grid,
  hac-month-grid {
    display: block;
    height: 100%;
    min-height: 100%;
  }

  /* Month fits the panel body when possible; week/day still grow with hours */
  :host([data-layout="panel"]) hac-month-grid,
  :host-context(hui-panel-view) hac-month-grid {
    min-height: 0;
  }

  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem 1rem;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--hac-muted);
    border-top: 1px solid var(--hac-line);
    background: var(--hac-surface-muted);
    flex: 0 0 auto;
  }

  .status[data-kind="error"] {
    color: var(--hac-danger);
    background: var(--hac-danger-bg);
  }

  .status[data-kind="warn"] {
    color: var(--hac-warn);
    background: var(--hac-warn-bg);
  }

  .status .spinner {
    width: 0.85rem;
    height: 0.85rem;
    border: 2px solid var(--hac-line-strong);
    border-top-color: var(--hac-accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .banner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    padding: 0.7rem 1rem;
    background: var(--hac-warn-bg);
    border-bottom: 1px solid rgba(154, 107, 31, 0.22);
    color: var(--hac-warn-ink);
    font-size: 0.85rem;
    animation: banner-in 200ms ease;
    flex: 0 0 auto;
  }

  @keyframes banner-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .banner button {
    font: inherit;
    font-weight: 700;
    border: 1px solid rgba(154, 107, 31, 0.35);
    background: var(--hac-surface);
    color: var(--hac-warn-ink);
    border-radius: 999px;
    padding: 0.35rem 0.75rem;
    cursor: pointer;
    min-height: 2rem;
  }

  .banner button.danger {
    background: var(--hac-danger);
    border-color: var(--hac-danger);
    color: #fff;
  }

  .state-panel {
    position: absolute;
    inset: 0;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    padding: 1.5rem;
    text-align: center;
    background: var(--hac-state-bg);
    backdrop-filter: blur(2px);
    animation: fade-in 200ms ease;
    pointer-events: auto;
  }

  .state-panel[data-kind="loading"] {
    pointer-events: none;
  }

  .state-panel[data-kind="empty"] {
    background: transparent;
    pointer-events: none;
  }

  .state-panel[data-kind="empty"] .primary-btn {
    pointer-events: auto;
  }

  .state-mark {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 1rem;
    background: linear-gradient(
      145deg,
      var(--hac-surface) 0%,
      color-mix(in srgb, var(--hac-accent) 18%, var(--hac-surface)) 100%
    );
    border: 1px solid var(--hac-line);
    box-shadow: 0 8px 20px var(--hac-shadow-soft);
    position: relative;
  }

  .state-mark::after {
    content: "";
    position: absolute;
    inset: 28% 22% 34% 22%;
    border-radius: 4px;
    background: var(--hac-accent);
    opacity: 0.85;
  }

  .state-mark::before {
    content: "";
    position: absolute;
    top: 18%;
    left: 30%;
    right: 30%;
    height: 3px;
    border-radius: 2px;
    background: color-mix(in srgb, var(--hac-ink) 20%, transparent);
  }

  .state-panel h2 {
    font-family: var(--hac-font-display);
    font-size: 1.2rem;
    margin: 0;
    font-weight: 800;
  }

  .state-panel p {
    margin: 0;
    max-width: 22rem;
    color: var(--hac-muted);
    font-size: 0.92rem;
    line-height: 1.4;
  }

  .state-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 0.25rem;
    pointer-events: auto;
  }

  .loading-veil {
    position: absolute;
    inset: 0;
    z-index: 3;
    background: var(--hac-veil);
    pointer-events: none;
    animation: fade-in 160ms ease;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 820px) {
    .info-bar {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "clock weather"
        "forecast forecast";
    }

    .clock-block {
      grid-area: clock;
    }

    .weather-now {
      grid-area: weather;
      align-items: flex-end;
      text-align: right;
    }

    .forecast-strip {
      grid-area: forecast;
      justify-content: flex-start;
    }
  }

  @media (max-width: 640px) {
    :host {
      min-height: 380px;
      border-radius: 12px;
    }

    :host([data-layout="panel"]),
    :host-context(hui-panel-view) {
      /* Keep fitting the panel — never force a second viewport min-height */
      min-height: 0;
      border-radius: 0;
    }

    .info-bar {
      padding: 0.7rem 0.75rem 0.55rem;
    }

    .toolbar {
      padding: 0.25rem 0.75rem 0.65rem;
    }

    .toolbar-controls {
      width: 100%;
      justify-content: space-between;
    }

    .add-btn {
      margin-left: 0;
    }

    .status {
      font-size: 0.74rem;
      padding: 0.45rem 0.75rem;
    }
  }
`;

export const gridStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
    --hac-event: var(--hac-accent, #3d9b8f);
    --hac-event-text: #fff;
    font-family: var(--hac-font-body, "Nunito", "Avenir Next", "Segoe UI", sans-serif);
    color: var(--hac-ink, #2c3340);
    background: var(--hac-surface, #fff);
  }

  .time-grid {
    display: grid;
    min-width: 100%;
    position: relative;
  }

  .time-grid[data-mode="day"] {
    grid-template-columns: 3.25rem minmax(0, 1fr);
  }

  .time-grid[data-mode="week"] {
    grid-template-columns: 3.25rem repeat(7, minmax(4.75rem, 1fr));
  }

  .corner,
  .day-head {
    position: sticky;
    top: 0;
    z-index: 2;
    background: color-mix(in srgb, var(--hac-surface, #fff) 96%, transparent);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--hac-line-strong, #d8dde6);
    padding: 0.55rem 0.3rem;
    text-align: center;
  }

  .corner {
    left: 0;
    z-index: 3;
  }

  .day-head {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--hac-muted, #8a93a3);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .day-head .num {
    font-size: 1.05rem;
    font-weight: 800;
    color: var(--hac-ink, #2c3340);
    letter-spacing: 0;
    text-transform: none;
  }

  .day-head[data-today="true"] {
    background: var(--hac-today-head, #fff6f1);
  }

  .day-head[data-today="true"] .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    margin: 0 auto;
    border-radius: 50%;
    background: var(--hac-today, #f08a5a);
    color: #fff;
  }

  .hours {
    display: flex;
    flex-direction: column;
    position: sticky;
    left: 0;
    z-index: 1;
    background: color-mix(in srgb, var(--hac-surface, #fff) 96%, transparent);
  }

  .hour-label {
    height: var(--hac-hour-height, 56px);
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--hac-muted, #8a93a3);
    text-align: right;
    padding: 0.15rem 0.45rem 0 0;
    border-right: 1px solid var(--hac-line, #e8ebf0);
    box-sizing: border-box;
  }

  .day-col {
    position: relative;
    border-left: 1px solid var(--hac-line, #e8ebf0);
    background: var(--hac-surface, #fff);
  }

  .day-col[data-today="true"] {
    background: var(--hac-today-bg, #fffaf7);
  }

  .hour-line {
    height: var(--hac-hour-height, 56px);
    box-sizing: border-box;
    border-bottom: 1px solid var(--hac-line, #e8ebf0);
  }

  .now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--hac-today, #f08a5a);
    z-index: 2;
    pointer-events: none;
    box-shadow: 0 0 0 2px rgba(240, 138, 90, 0.15);
  }

  .now-line::before {
    content: "";
    position: absolute;
    left: -4px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--hac-today, #f08a5a);
  }

  .event-block {
    position: absolute;
    left: 3px;
    right: 3px;
    background: var(--hac-event);
    color: var(--hac-event-text);
    border-radius: 8px;
    padding: 0.28rem 0.4rem;
    font-size: 0.74rem;
    font-weight: 700;
    line-height: 1.25;
    overflow: hidden;
    cursor: pointer;
    border: 0;
    box-shadow: 0 1px 0 var(--hac-shadow-soft, rgba(44, 51, 64, 0.06));
    transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .event-block:hover,
  .event-block:focus-visible {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 6px 14px var(--hac-shadow-soft, rgba(44, 51, 64, 0.12));
    filter: brightness(1.04);
    outline: none;
  }

  .event-block strong {
    display: block;
    font-weight: 800;
  }

  .event-block .cal-tag {
    display: block;
    opacity: 0.9;
    font-size: 0.64rem;
    font-weight: 600;
  }

  .event-block .time-tag {
    display: block;
    opacity: 0.9;
    font-size: 0.64rem;
    font-weight: 600;
  }

  @media (max-width: 720px) {
    .time-grid[data-mode="week"] {
      grid-template-columns: 2.75rem repeat(7, minmax(5.25rem, 1fr));
      width: max-content;
      min-width: 100%;
    }

    .hour-label {
      font-size: 0.62rem;
      padding-right: 0.3rem;
    }

    .event-block {
      font-size: 0.7rem;
      padding: 0.22rem 0.3rem;
    }
  }
`;

export const formStyles = css`
  :host {
    --hac-event: var(--hac-accent, #3d9b8f);
    font-family: var(--hac-font-body, "Nunito", "Avenir Next", "Segoe UI", sans-serif);
    color: var(--hac-ink, #2c3340);
  }

  .form-backdrop {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--hac-ink, #2c3340) 34%, transparent);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 10;
    animation: fade-in 160ms ease;
    padding: 0;
  }

  @media (min-width: 640px) {
    .form-backdrop {
      align-items: center;
      padding: 1rem;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .form-panel {
    width: min(440px, 100%);
    max-height: min(92vh, 720px);
    overflow: auto;
    background: var(--hac-surface, #fff);
    border-radius: 16px 16px 0 0;
    padding: 1.1rem 1.15rem 1.35rem;
    box-shadow: 0 -10px 36px var(--hac-shadow-soft, rgba(44, 51, 64, 0.18));
    animation: slide-up 220ms ease;
    color: var(--hac-ink, #2c3340);
  }

  @media (min-width: 640px) {
    .form-panel {
      border-radius: 16px;
      box-shadow: 0 16px 40px var(--hac-shadow-soft, rgba(44, 51, 64, 0.18));
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(16px);
      opacity: 0.55;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .form-panel h2 {
    font-family: var(--hac-font-display, "Manrope", sans-serif);
    font-size: 1.28rem;
    margin: 0 0 0.35rem;
    letter-spacing: -0.02em;
    font-weight: 800;
  }

  .form-sub {
    margin: 0 0 0.75rem;
    font-size: 0.82rem;
    color: var(--hac-muted, #8a93a3);
  }

  label {
    display: block;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--hac-muted, #8a93a3);
    margin: 0.65rem 0 0.25rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 0.95rem;
    padding: 0.55rem 0.65rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    border-radius: 10px;
    background: var(--hac-bg, #f7f8fa);
    color: var(--hac-ink, #2c3340);
    min-height: 2.5rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--hac-accent, #3d9b8f);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--hac-accent, #3d9b8f) 15%, transparent);
    background: var(--hac-surface, #fff);
  }

  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.65;
  }

  .cal-select-row {
    display: flex;
    align-items: center;
    gap: 0.55rem;
  }

  .cal-select-row select {
    flex: 1 1 auto;
    min-width: 0;
  }

  .cal-swatch {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    flex: 0 0 auto;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hac-ink, #2c3340) 12%, transparent);
  }

  .cal-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.45rem;
  }

  .cal-legend-item {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    background: var(--hac-bg, #f7f8fa);
    border-radius: 999px;
    padding: 0.2rem 0.55rem 0.2rem 0.35rem;
    font: inherit;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--hac-ink, #2c3340);
    cursor: pointer;
    text-transform: capitalize;
  }

  .cal-legend-item[data-active="true"] {
    border-color: var(--hac-accent, #3d9b8f);
    background: var(--hac-surface, #fff);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--hac-accent, #3d9b8f) 12%, transparent);
  }

  .cal-legend-item:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .cal-legend-item .dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    flex: 0 0 auto;
  }

  textarea {
    min-height: 4.5rem;
    resize: vertical;
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0 0.75rem;
  }

  @media (min-width: 480px) {
    .row-2 {
      grid-template-columns: 1fr 1fr;
    }
  }

  .form-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 1.15rem;
  }

  .form-actions button {
    font: inherit;
    font-weight: 700;
    border-radius: 999px;
    padding: 0.5rem 1rem;
    min-height: 2.4rem;
    cursor: pointer;
    border: 1px solid var(--hac-line, #e8ebf0);
    background: var(--hac-surface, #fff);
    color: var(--hac-ink, #2c3340);
  }

  .form-actions button.primary {
    background: var(--hac-accent, #3d9b8f);
    border-color: var(--hac-accent, #3d9b8f);
    color: #fff;
  }

  .form-actions button.primary:hover:not(:disabled) {
    background: var(--hac-accent-hover, #318579);
  }

  .form-actions button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .hint {
    font-size: 0.78rem;
    color: var(--hac-muted, #8a93a3);
    margin: 0.65rem 0 0;
    line-height: 1.35;
  }

  .hint.warn {
    color: var(--hac-warn, #9a6b1f);
  }

  .hint.error {
    color: var(--hac-danger, #c45c5c);
    background: var(--hac-danger-bg, #fdf4f4);
    border: 1px solid color-mix(in srgb, var(--hac-danger, #c45c5c) 20%, transparent);
    border-radius: 10px;
    padding: 0.55rem 0.7rem;
  }

  .reminder-block {
    margin-top: 1rem;
    padding: 0.75rem 0.8rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    border-radius: 12px;
    background: color-mix(in srgb, var(--hac-accent, #3d9b8f) 8%, var(--hac-surface, #fff));
  }

  .recur-block {
    margin-top: 1rem;
    padding: 0.75rem 0.8rem;
    border: 1px solid var(--hac-line, #e8ebf0);
    border-radius: 12px;
    background: var(--hac-surface-muted, #f8f9fb);
  }

  .recur-block h3,
  .reminder-block h3 {
    margin: 0 0 0.35rem;
    font-family: var(--hac-font-display, "Manrope", sans-serif);
    font-size: 0.95rem;
    font-weight: 800;
  }

  .recur-block code {
    font-size: 0.78em;
  }

  .reminder-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.55rem 0 0.25rem;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--hac-ink, #2c3340);
    text-transform: none;
    letter-spacing: 0;
  }

  .reminder-toggle input {
    width: auto;
    min-height: auto;
  }

  .reminder-fields[data-disabled="true"] {
    opacity: 0.45;
    pointer-events: none;
  }
`;
