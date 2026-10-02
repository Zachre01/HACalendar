import { css } from "lit";

/**
 * Daylight / wall-calendar inspired tokens.
 * Soft morning sky atmosphere — not purple gradients, not warm-cream+terracotta AI defaults.
 */
export const FONT_STYLESHEET_HREF =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Outfit:wght@400;500;600;700&display=swap";

export const cardStyles = css`
  :host {
    --hac-sky-top: #f3f8fc;
    --hac-sky-mid: #d9ebf5;
    --hac-sky-deep: #b9d6e8;
    --hac-sun: rgba(255, 196, 110, 0.45);
    --hac-ink: #15252e;
    --hac-muted: #5b7380;
    --hac-accent: #0a6e78;
    --hac-accent-hover: #085960;
    --hac-accent-soft: #c5e6ea;
    --hac-line: rgba(21, 37, 46, 0.1);
    --hac-line-strong: rgba(21, 37, 46, 0.16);
    --hac-event: #1a6f8a;
    --hac-event-text: #f7fcfe;
    --hac-danger: #a33a3a;
    --hac-warn: #8a5a12;
    --hac-warn-bg: #fff4df;
    --hac-surface: rgba(255, 255, 255, 0.78);
    --hac-surface-solid: #ffffff;
    --hac-radius: 14px;
    --hac-font-display: "Fraunces", "Iowan Old Style", "Palatino Linotype",
      Palatino, serif;
    --hac-font-body: "Outfit", "Avenir Next", "Segoe UI", sans-serif;
    --hac-cal-0: #1a6f8a;
    --hac-cal-1: #2f7d57;
    --hac-cal-2: #b85c38;
    --hac-cal-3: #3d6ea5;
    --hac-cal-4: #7a5c2e;
    --hac-hour-height: 56px;

    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    /* % height resolves in panel hosts; masonry parents stay auto + min-height */
    height: 100%;
    min-height: 440px;
    font-family: var(--hac-font-body);
    color: var(--hac-ink);
    background:
      radial-gradient(
        120% 80% at 85% -10%,
        var(--hac-sun) 0%,
        transparent 55%
      ),
      linear-gradient(
        165deg,
        var(--hac-sky-top) 0%,
        var(--hac-sky-mid) 48%,
        var(--hac-sky-deep) 100%
      );
    border-radius: var(--hac-radius);
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
    animation: host-in 280ms ease;
  }

  /* Lovelace type: panel — fill the view height, not only width */
  :host([data-layout="panel"]),
  :host-context(hui-panel-view) {
    height: 100%;
    min-height: calc(100vh - var(--header-height, 56px));
    min-height: calc(100dvh - var(--header-height, 56px));
    border-radius: 0;
  }

  @keyframes host-in {
    from {
      opacity: 0.65;
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
  }

  header.toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem 0.65rem;
    padding: 0.85rem 1rem 0.75rem;
    border-bottom: 1px solid var(--hac-line);
    background: var(--hac-surface);
    backdrop-filter: blur(10px);
  }

  .brand {
    font-family: var(--hac-font-display);
    font-size: clamp(1.25rem, 3.5vw, 1.55rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0;
    flex: 1 1 auto;
    min-width: 8rem;
    line-height: 1.1;
  }

  .toolbar-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem;
    margin-left: auto;
  }

  .nav-group {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }

  .view-toggle {
    display: inline-flex;
    border: 1px solid var(--hac-line-strong);
    border-radius: 999px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.7);
  }

  .view-toggle button {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    border: 0;
    background: transparent;
    color: var(--hac-muted);
    padding: 0.4rem 0.85rem;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;
  }

  .view-toggle button[aria-pressed="true"] {
    background: var(--hac-accent);
    color: #fff;
  }

  .nav-btn,
  .primary-btn,
  .ghost-btn {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid var(--hac-line-strong);
    background: var(--hac-surface-solid);
    color: var(--hac-ink);
    padding: 0.4rem 0.75rem;
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

  .nav-btn:active,
  .ghost-btn:active,
  .primary-btn:active {
    transform: translateY(0);
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

  .grid-wrap {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
  }

  /* Time grid fills the flex area below the toolbar; hours scroll inside */
  hac-time-grid {
    display: block;
    min-height: 100%;
  }

  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    font-size: 0.82rem;
    color: var(--hac-muted);
    border-top: 1px solid var(--hac-line);
    background: var(--hac-surface);
  }

  .status[data-kind="error"] {
    color: var(--hac-danger);
    background: #fdf2f2;
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
    border-bottom: 1px solid rgba(138, 90, 18, 0.22);
    color: #5c3d00;
    font-size: 0.85rem;
    animation: banner-in 200ms ease;
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
    border: 1px solid rgba(138, 90, 18, 0.35);
    background: #fff;
    color: #5c3d00;
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
    background: linear-gradient(
      180deg,
      rgba(243, 248, 252, 0.55) 0%,
      rgba(217, 235, 245, 0.82) 100%
    );
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
    background: linear-gradient(145deg, #fff 0%, var(--hac-accent-soft) 100%);
    border: 1px solid var(--hac-line);
    box-shadow: 0 8px 20px rgba(21, 37, 46, 0.08);
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
    background: rgba(21, 37, 46, 0.25);
  }

  .state-panel h2 {
    font-family: var(--hac-font-display);
    font-size: 1.2rem;
    margin: 0;
    font-weight: 600;
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
    background: rgba(243, 248, 252, 0.35);
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

  @media (max-width: 640px) {
    :host {
      min-height: 380px;
      border-radius: 12px;
    }

    /* Keep masonry compact on phones; panel still fills the view */
    :host([data-layout="panel"]),
    :host-context(hui-panel-view) {
      min-height: calc(100vh - var(--header-height, 56px));
      min-height: calc(100dvh - var(--header-height, 56px));
      border-radius: 0;
    }

    header.toolbar {
      padding: 0.75rem 0.75rem 0.65rem;
      gap: 0.5rem;
    }

    .brand {
      flex: 1 1 100%;
    }

    .toolbar-controls {
      width: 100%;
      margin-left: 0;
      justify-content: space-between;
    }

    .view-toggle button {
      padding: 0.4rem 0.7rem;
    }

    .status {
      font-size: 0.78rem;
      padding: 0.5rem 0.75rem;
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
    --hac-line: rgba(21, 37, 46, 0.1);
    --hac-line-strong: rgba(21, 37, 46, 0.16);
    --hac-muted: #5b7380;
    --hac-ink: #15252e;
    --hac-event: #1a6f8a;
    --hac-event-text: #f7fcfe;
    --hac-accent: #0a6e78;
    --hac-cal-0: #1a6f8a;
    --hac-cal-1: #2f7d57;
    --hac-cal-2: #b85c38;
    --hac-cal-3: #3d6ea5;
    --hac-cal-4: #7a5c2e;
    --hac-font-body: "Outfit", "Avenir Next", "Segoe UI", sans-serif;
    font-family: var(--hac-font-body);
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
    background: rgba(243, 248, 252, 0.92);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--hac-line-strong);
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
    font-weight: 500;
    color: var(--hac-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .day-head .num {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--hac-ink);
    letter-spacing: 0;
    text-transform: none;
  }

  .day-head[data-today="true"] {
    background: rgba(10, 110, 120, 0.1);
  }

  .day-head[data-today="true"] .num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.7rem;
    height: 1.7rem;
    margin: 0 auto;
    border-radius: 50%;
    background: var(--hac-accent);
    color: #fff;
  }

  .hours {
    display: flex;
    flex-direction: column;
    position: sticky;
    left: 0;
    z-index: 1;
    background: rgba(243, 248, 252, 0.92);
  }

  .hour-label {
    height: var(--hac-hour-height, 56px);
    font-size: 0.68rem;
    font-weight: 500;
    color: var(--hac-muted);
    text-align: right;
    padding: 0.15rem 0.45rem 0 0;
    border-right: 1px solid var(--hac-line);
    box-sizing: border-box;
  }

  .day-col {
    position: relative;
    border-left: 1px solid var(--hac-line);
    background: rgba(255, 255, 255, 0.22);
  }

  .day-col[data-today="true"] {
    background: rgba(10, 110, 120, 0.05);
  }

  .hour-line {
    height: var(--hac-hour-height, 56px);
    box-sizing: border-box;
    border-bottom: 1px dashed var(--hac-line);
  }

  .now-line {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: #d4553a;
    z-index: 2;
    pointer-events: none;
    box-shadow: 0 0 0 2px rgba(212, 85, 58, 0.15);
  }

  .now-line::before {
    content: "";
    position: absolute;
    left: -4px;
    top: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d4553a;
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
    line-height: 1.25;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 1px 0 rgba(21, 37, 46, 0.08);
    transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
    -webkit-tap-highlight-color: transparent;
  }

  .event-block:hover,
  .event-block:focus-visible {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 6px 14px rgba(21, 37, 46, 0.16);
    filter: brightness(1.04);
    outline: none;
  }

  .event-block strong {
    display: block;
    font-weight: 600;
  }

  .event-block .cal-tag {
    display: block;
    opacity: 0.85;
    font-size: 0.64rem;
    font-weight: 500;
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
    --hac-ink: #15252e;
    --hac-muted: #5b7380;
    --hac-accent: #0a6e78;
    --hac-accent-hover: #085960;
    --hac-line: rgba(21, 37, 46, 0.12);
    --hac-danger: #a33a3a;
    --hac-warn: #8a5a12;
    --hac-font-display: "Fraunces", "Iowan Old Style", Palatino, serif;
    --hac-font-body: "Outfit", "Avenir Next", "Segoe UI", sans-serif;
    font-family: var(--hac-font-body);
  }

  .form-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(21, 37, 46, 0.38);
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
    background: #fff;
    border-radius: 16px 16px 0 0;
    padding: 1.1rem 1.15rem 1.35rem;
    box-shadow: 0 -10px 36px rgba(21, 37, 46, 0.22);
    animation: slide-up 220ms ease;
  }

  @media (min-width: 640px) {
    .form-panel {
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(21, 37, 46, 0.22);
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
    font-family: var(--hac-font-display);
    font-size: 1.28rem;
    margin: 0 0 0.35rem;
    letter-spacing: -0.02em;
  }

  .form-sub {
    margin: 0 0 0.75rem;
    font-size: 0.82rem;
    color: var(--hac-muted);
  }

  label {
    display: block;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--hac-muted);
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
    border: 1px solid var(--hac-line);
    border-radius: 10px;
    background: #f4f8fa;
    color: var(--hac-ink);
    min-height: 2.5rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: var(--hac-accent);
    box-shadow: 0 0 0 3px rgba(10, 110, 120, 0.15);
    background: #fff;
  }

  input:disabled,
  select:disabled,
  textarea:disabled {
    opacity: 0.65;
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
    font-weight: 500;
    border-radius: 999px;
    padding: 0.5rem 1rem;
    min-height: 2.4rem;
    cursor: pointer;
    border: 1px solid var(--hac-line);
    background: #fff;
    color: var(--hac-ink);
  }

  .form-actions button.primary {
    background: var(--hac-accent);
    border-color: var(--hac-accent);
    color: #fff;
  }

  .form-actions button.primary:hover:not(:disabled) {
    background: var(--hac-accent-hover);
  }

  .form-actions button:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .hint {
    font-size: 0.78rem;
    color: var(--hac-muted);
    margin: 0.65rem 0 0;
    line-height: 1.35;
  }

  .hint.warn {
    color: var(--hac-warn);
  }

  .hint.error {
    color: var(--hac-danger);
    background: #fdf2f2;
    border: 1px solid rgba(163, 58, 58, 0.2);
    border-radius: 10px;
    padding: 0.55rem 0.7rem;
  }

  .reminder-block {
    margin-top: 1rem;
    padding: 0.75rem 0.8rem;
    border: 1px solid var(--hac-line);
    border-radius: 12px;
    background: #f3f8fa;
  }

  .reminder-block h3 {
    font-family: var(--hac-font-display);
    font-size: 1rem;
    margin: 0 0 0.25rem;
  }

  .reminder-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0.55rem 0 0.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--hac-ink);
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
