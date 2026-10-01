import { css } from "lit";

/** Shared visual tokens — warm daylight panel, not purple/cream-AI defaults */
export const cardStyles = css`
  :host {
    --hac-bg: #e8f0f4;
    --hac-bg-deep: #d2e3eb;
    --hac-ink: #1a2b33;
    --hac-muted: #5a7380;
    --hac-accent: #0d7a6f;
    --hac-accent-soft: #b8e0da;
    --hac-line: rgba(26, 43, 51, 0.12);
    --hac-event: #1f6b8a;
    --hac-event-text: #f5fbfd;
    --hac-danger: #9b2c2c;
    --hac-surface: rgba(255, 255, 255, 0.72);
    --hac-radius: 10px;
    --hac-font-display: "Fraunces", "Iowan Old Style", "Palatino Linotype",
      Palatino, serif;
    --hac-font-body: "Source Sans 3", "Source Sans Pro", "Segoe UI",
      sans-serif;
    display: block;
    font-family: var(--hac-font-body);
    color: var(--hac-ink);
    background: linear-gradient(
      165deg,
      var(--hac-bg) 0%,
      var(--hac-bg-deep) 55%,
      #c5d8e2 100%
    );
    border-radius: var(--hac-radius);
    overflow: hidden;
    min-height: 420px;
  }

  .shell {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 420px;
  }

  header.toolbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--hac-line);
    background: var(--hac-surface);
    backdrop-filter: blur(8px);
  }

  .brand {
    font-family: var(--hac-font-display);
    font-size: 1.35rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 0;
    flex: 1;
  }

  .view-toggle {
    display: inline-flex;
    gap: 0;
    border: 1px solid var(--hac-line);
    border-radius: 8px;
    overflow: hidden;
  }

  .view-toggle button {
    font: inherit;
    border: 0;
    background: transparent;
    color: var(--hac-muted);
    padding: 0.35rem 0.75rem;
    cursor: pointer;
  }

  .view-toggle button[aria-pressed="true"] {
    background: var(--hac-accent);
    color: #fff;
  }

  .nav-btn,
  .primary-btn {
    font: inherit;
    border: 1px solid var(--hac-line);
    background: #fff;
    color: var(--hac-ink);
    padding: 0.35rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
  }

  .primary-btn {
    background: var(--hac-accent);
    border-color: var(--hac-accent);
    color: #fff;
  }

  .grid-wrap {
    flex: 1;
    overflow: auto;
    position: relative;
  }

  .status {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    color: var(--hac-muted);
    border-top: 1px solid var(--hac-line);
    background: var(--hac-surface);
  }

  .status[data-kind="error"] {
    color: var(--hac-danger);
  }

  .status[data-kind="warn"] {
    color: #8a5a00;
  }
`;

export const gridStyles = css`
  .time-grid {
    display: grid;
    min-width: 100%;
    position: relative;
  }

  .time-grid[data-mode="day"] {
    grid-template-columns: 3.5rem 1fr;
  }

  .time-grid[data-mode="week"] {
    grid-template-columns: 3.5rem repeat(7, minmax(4.5rem, 1fr));
  }

  .corner,
  .day-head {
    position: sticky;
    top: 0;
    z-index: 2;
    background: rgba(232, 240, 244, 0.95);
    border-bottom: 1px solid var(--hac-line);
    padding: 0.5rem 0.35rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
  }

  .corner {
    left: 0;
    z-index: 3;
  }

  .hours {
    display: flex;
    flex-direction: column;
  }

  .hour-label {
    height: var(--hac-hour-height, 56px);
    font-size: 0.7rem;
    color: var(--hac-muted);
    text-align: right;
    padding-right: 0.4rem;
    border-right: 1px solid var(--hac-line);
    box-sizing: border-box;
  }

  .day-col {
    position: relative;
    border-left: 1px solid var(--hac-line);
  }

  .hour-line {
    height: var(--hac-hour-height, 56px);
    box-sizing: border-box;
    border-bottom: 1px dashed var(--hac-line);
  }

  .event-block {
    position: absolute;
    left: 3px;
    right: 3px;
    background: var(--hac-event);
    color: var(--hac-event-text);
    border-radius: 6px;
    padding: 0.2rem 0.35rem;
    font-size: 0.75rem;
    line-height: 1.2;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
    transition: transform 120ms ease, box-shadow 120ms ease;
  }

  .event-block:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(26, 43, 51, 0.18);
  }

  .event-block .cal-tag {
    display: block;
    opacity: 0.8;
    font-size: 0.65rem;
  }
`;

export const formStyles = css`
  .form-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(26, 43, 51, 0.35);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 10;
    animation: fade-in 160ms ease;
  }

  @media (min-width: 640px) {
    .form-backdrop {
      align-items: center;
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
    width: min(420px, 100%);
    background: #fff;
    border-radius: 12px 12px 0 0;
    padding: 1rem 1.1rem 1.25rem;
    box-shadow: 0 -8px 30px rgba(26, 43, 51, 0.2);
    animation: slide-up 200ms ease;
  }

  @media (min-width: 640px) {
    .form-panel {
      border-radius: 12px;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(12px);
      opacity: 0.6;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .form-panel h2 {
    font-family: var(--hac-font-display);
    font-size: 1.2rem;
    margin: 0 0 0.75rem;
  }

  label {
    display: block;
    font-size: 0.75rem;
    color: var(--hac-muted);
    margin: 0.55rem 0 0.2rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    padding: 0.45rem 0.55rem;
    border: 1px solid var(--hac-line);
    border-radius: 8px;
    background: #f7fafb;
    color: var(--hac-ink);
  }

  textarea {
    min-height: 4rem;
    resize: vertical;
  }

  .form-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .hint {
    font-size: 0.75rem;
    color: var(--hac-muted);
    margin-top: 0.6rem;
  }

  .hint.warn {
    color: #8a5a00;
  }
`;
