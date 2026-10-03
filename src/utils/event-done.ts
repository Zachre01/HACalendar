/**
 * Persist “completed” on the same HA calendar event via a title prefix.
 * The card strips the marker for display and re-applies it on update/create.
 *
 * Convention: summary starts with `✓ ` (U+2713 CHECK MARK + space).
 * Also accepts a legacy/alternate `[done] ` prefix when reading.
 */

export const DONE_TITLE_PREFIX = "✓ ";
const DONE_TITLE_PREFIX_ALT = "[done] ";

export interface ParsedDoneSummary {
  completed: boolean;
  displaySummary: string;
}

/** Detect and strip a done marker from a raw HA summary. */
export function parseDoneSummary(summary: string): ParsedDoneSummary {
  const raw = summary ?? "";
  if (raw.startsWith(DONE_TITLE_PREFIX)) {
    return {
      completed: true,
      displaySummary: raw.slice(DONE_TITLE_PREFIX.length).trimStart() || "(no title)",
    };
  }
  const lower = raw.toLowerCase();
  if (lower.startsWith(DONE_TITLE_PREFIX_ALT)) {
    return {
      completed: true,
      displaySummary:
        raw.slice(DONE_TITLE_PREFIX_ALT.length).trimStart() || "(no title)",
    };
  }
  return { completed: false, displaySummary: raw || "(no title)" };
}

/** Apply or remove the canonical `✓ ` marker for persistence. */
export function applyDoneMarker(
  displaySummary: string,
  completed: boolean
): string {
  const clean = parseDoneSummary(displaySummary).displaySummary;
  if (!completed) return clean;
  return `${DONE_TITLE_PREFIX}${clean}`;
}
