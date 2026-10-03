/**
 * Offline regression: scoped update/delete must hit WS and must never call
 * phantom calendar.update_event when that service is not registered.
 *
 * Mirrors the branching in src/api/calendar-api.ts (keep in sync).
 */
function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function recurrenceParams(event, scope = "this") {
  const isRecurring = Boolean(
    event.recurring || event.rrule || event.recurrence_id
  );
  if (!isRecurring) return {};
  if (scope === "series") return {};
  const recurrenceId = event.recurrence_id;
  if (!recurrenceId) return {};
  if (scope === "future") {
    return { recurrenceId, recurrenceRange: "THISANDFUTURE" };
  }
  return { recurrenceId };
}

function hasCalendarService(hass, service) {
  const calendar = hass.services?.calendar;
  return Boolean(calendar && service in calendar);
}

async function updateEvent(hass, entityId, uid, patch, recurrenceId, recurrenceRange) {
  const scoped = Boolean(
    recurrenceId || recurrenceRange || patch.rrule || patch.rrule === null
  );
  if (hass.callWS) {
    try {
      const msg = {
        type: "calendar/event/update",
        entity_id: entityId,
        uid,
        event: {
          summary: patch.summary,
          dtstart: patch.start,
          dtend: patch.end,
        },
      };
      if (recurrenceId) msg.recurrence_id = recurrenceId;
      if (recurrenceRange) msg.recurrence_range = recurrenceRange;
      await hass.callWS(msg);
      return;
    } catch (wsErr) {
      if (scoped || !hasCalendarService(hass, "update_event")) throw wsErr;
      await hass.callService("calendar", "update_event", {
        entity_id: entityId,
        uid,
      });
      return;
    }
  }
  throw new Error("no callWS");
}

async function deleteEvent(hass, entityId, uid, recurrenceId, recurrenceRange) {
  const scoped = Boolean(recurrenceId || recurrenceRange);
  if (hass.callWS) {
    try {
      const msg = { type: "calendar/event/delete", entity_id: entityId, uid };
      if (recurrenceId) msg.recurrence_id = recurrenceId;
      if (recurrenceRange) msg.recurrence_range = recurrenceRange;
      await hass.callWS(msg);
      return;
    } catch (wsErr) {
      if (scoped || !hasCalendarService(hass, "delete_event")) throw wsErr;
      await hass.callService("calendar", "delete_event", {
        entity_id: entityId,
        uid,
      });
      return;
    }
  }
  throw new Error("no callWS");
}

const scopes = ["this", "future", "series"];
const event = {
  recurrence_id: "20261002T090000",
  rrule: "FREQ=DAILY",
  recurring: true,
};

for (const scope of scopes) {
  const p = recurrenceParams(event, scope);
  if (scope === "this") {
    assert(p.recurrenceId === event.recurrence_id, "this → recurrence_id");
    assert(!p.recurrenceRange, "this → no range");
  } else if (scope === "future") {
    assert(p.recurrenceId === event.recurrence_id, "future → recurrence_id");
    assert(p.recurrenceRange === "THISANDFUTURE", "future → THISANDFUTURE");
  } else {
    assert(!p.recurrenceId && !p.recurrenceRange, "series → uid only");
  }
}

const calls = [];
const coreHass = {
  services: { calendar: { create_event: {}, get_events: {} } },
  callWS: async (msg) => {
    calls.push({ kind: "ws", msg });
  },
  callService: async (domain, service, data) => {
    calls.push({ kind: "service", domain, service, data });
    throw new Error(`Action ${domain}.${service} not found.`);
  },
};

const patch = {
  summary: "X",
  start: "2026-10-02T09:00:00",
  end: "2026-10-02T10:00:00",
};

for (const scope of scopes) {
  calls.length = 0;
  const { recurrenceId, recurrenceRange } = recurrenceParams(event, scope);
  await updateEvent(
    coreHass,
    "calendar.family",
    "uid-1",
    patch,
    recurrenceId,
    recurrenceRange
  );
  assert(calls.length === 1 && calls[0].kind === "ws", `${scope} update → WS`);
  assert(calls[0].msg.type === "calendar/event/update", `${scope} update type`);
  if (scope === "this") {
    assert(calls[0].msg.recurrence_id === event.recurrence_id, "this id");
    assert(calls[0].msg.recurrence_range === undefined, "this no range");
  }
  if (scope === "future") {
    assert(calls[0].msg.recurrence_range === "THISANDFUTURE", "future range");
  }
  if (scope === "series") {
    assert(calls[0].msg.recurrence_id === undefined, "series no id");
  }

  calls.length = 0;
  await deleteEvent(
    coreHass,
    "calendar.family",
    "uid-1",
    recurrenceId,
    recurrenceRange
  );
  assert(calls.length === 1 && calls[0].kind === "ws", `${scope} delete → WS`);
}

// Regression: WS fails on "this occurrence" — must NOT call missing update_event
calls.length = 0;
const failingHass = {
  services: { calendar: { create_event: {}, get_events: {} } },
  callWS: async (msg) => {
    calls.push({ kind: "ws", msg });
    throw { code: "failed", message: "Local Calendar rejected update" };
  },
  callService: async (domain, service, data) => {
    calls.push({ kind: "service", domain, service, data });
    throw new Error(`Action ${domain}.${service} not found.`);
  },
};
let threw = false;
try {
  const { recurrenceId, recurrenceRange } = recurrenceParams(event, "this");
  await updateEvent(
    failingHass,
    "calendar.family",
    "uid-1",
    patch,
    recurrenceId,
    recurrenceRange
  );
} catch {
  threw = true;
}
assert(threw, "scoped WS failure throws");
assert(
  calls.every((c) => c.kind === "ws"),
  "must not callService update_event when unregistered (user bug)"
);

// Unscoped + registered custom update_event → may fall back
calls.length = 0;
const customHass = {
  services: {
    calendar: {
      create_event: {},
      get_events: {},
      update_event: {},
      delete_event: {},
    },
  },
  callWS: async (msg) => {
    calls.push({ kind: "ws", msg });
    throw { code: "unknown_command", message: "no ws" };
  },
  callService: async (domain, service, data) => {
    calls.push({ kind: "service", domain, service, data });
  },
};
await updateEvent(customHass, "calendar.family", "uid-1", patch, undefined, undefined);
assert(
  calls.some((c) => c.kind === "service" && c.service === "update_event"),
  "unscoped may fall back when service exists"
);

// formatHassError still human-readable for the old service error shape
const { formatHassError } = await import("../src/utils/ha-error.ts").catch(() => ({
  formatHassError: null,
}));
if (formatHassError) {
  const text = formatHassError({
    message: "Action calendar.update_event not found.",
    code: "not_found",
  });
  assert(text.includes("update_event"), "formatHassError keeps message");
  assert(text.includes("not_found"), "formatHassError keeps code");
} else {
  // Without TS loader, spot-check the helper source contains the join pattern
  const fs = await import("node:fs");
  const src = fs.readFileSync(
    new URL("../src/utils/ha-error.ts", import.meta.url),
    "utf8"
  );
  assert(src.includes("parts.join"), "formatHassError present");
}

console.log("verify-recurring-ws: ok");
