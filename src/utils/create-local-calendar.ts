import type { HomeAssistant } from "../types";

export type ConfigFlowStep = {
  type: string;
  flow_id?: string;
  handler?: string;
  errors?: Record<string, string>;
  reason?: string;
  description_placeholders?: Record<string, string>;
  result?: unknown;
};

/** HA slugify-ish: lowercase, non-alnum → underscore (good enough for entity guess). */
export function slugifyCalendarName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

export function guessLocalCalendarEntityId(name: string): string {
  return `calendar.${slugifyCalendarName(name)}`;
}

/**
 * Create a Local Calendar via the same config-flow API stock HA uses.
 * Empty calendar only (no ICS import) — matches the common “Create calendar” path.
 */
export async function createLocalCalendar(
  hass: HomeAssistant,
  calendarName: string
): Promise<{ entityId: string; step: ConfigFlowStep }> {
  const name = calendarName.trim();
  if (!name) {
    throw new Error("Calendar name is required.");
  }
  if (!hass.callApi) {
    throw new Error(
      "Home Assistant callApi is unavailable — cannot create a Local Calendar."
    );
  }

  const start = await hass.callApi<ConfigFlowStep>(
    "POST",
    "config/config_entries/flow",
    { handler: "local_calendar" }
  );

  if (start.type === "abort") {
    throw new Error(
      start.reason
        ? `Could not start Local Calendar setup: ${start.reason}`
        : "Could not start Local Calendar setup."
    );
  }

  const flowId = start.flow_id;
  if (!flowId) {
    throw new Error("Local Calendar setup did not return a flow id.");
  }

  const step = await hass.callApi<ConfigFlowStep>(
    "POST",
    `config/config_entries/flow/${flowId}`,
    {
      calendar_name: name,
      import: "create_empty",
    }
  );

  if (step.type === "form" && step.errors && Object.keys(step.errors).length) {
    const first = Object.values(step.errors)[0];
    throw new Error(String(first || "Could not create calendar."));
  }

  if (step.type === "abort") {
    throw new Error(
      step.reason === "already_configured"
        ? "A Local Calendar with that name already exists."
        : step.reason
          ? `Create calendar aborted: ${step.reason}`
          : "Create calendar aborted."
    );
  }

  if (step.type !== "create_entry") {
    // Unexpected extra step (e.g. ICS import) — cancel if possible
    try {
      await hass.callApi("DELETE", `config/config_entries/flow/${flowId}`);
    } catch {
      // ignore
    }
    throw new Error(
      `Unexpected Local Calendar setup step (${step.type}). Open Settings → Devices & services → Add integration → Local Calendar.`
    );
  }

  const entityId = guessLocalCalendarEntityId(name);
  return { entityId, step };
}

/** Wait until `calendar.*` appears in hass.states (config entry setup is async). */
export async function waitForCalendarEntity(
  getHass: () => HomeAssistant | undefined,
  entityId: string,
  timeoutMs = 12_000
): Promise<string> {
  const started = Date.now();
  const slug = entityId.replace(/^calendar\./, "");
  while (Date.now() - started < timeoutMs) {
    const hass = getHass();
    const states = hass?.states ?? {};
    if (states[entityId]) return entityId;
    // Slug collisions sometimes get a suffix — match by prefix
    const match = Object.keys(states).find(
      (id) =>
        id.startsWith("calendar.") &&
        (id === entityId ||
          id === `calendar.${slug}` ||
          id.startsWith(`calendar.${slug}_`))
    );
    if (match) return match;
    await new Promise((r) => setTimeout(r, 250));
  }
  // Still return the guessed id — caller can enable it; entity may show on next refresh
  return entityId;
}
