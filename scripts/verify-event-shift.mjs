/**
 * Day-shift math for drag-and-drop. Run:
 *   node --experimental-strip-types scripts/verify-event-shift.mjs
 * Wall-clock checks follow the process timezone (set TZ to exercise DST).
 */
import { register } from "node:module";
import assert from "node:assert/strict";

register(new URL("./ts-resolve-hook.mjs", import.meta.url));

const { dayDelta, shiftCalendarDate, shiftEventDates } = await import(
  "../src/utils/event-shift.ts"
);

function assertWallClock(originalIso, deltaDays) {
  const original = new Date(originalIso);
  const shiftedValue = shiftCalendarDate(originalIso, deltaDays);
  const shifted = new Date(shiftedValue);
  const expected = new Date(original);
  expected.setDate(expected.getDate() + deltaDays);
  assert.equal(shifted.getFullYear(), expected.getFullYear(), shiftedValue);
  assert.equal(shifted.getMonth(), expected.getMonth(), shiftedValue);
  assert.equal(shifted.getDate(), expected.getDate(), shiftedValue);
  assert.equal(shifted.getHours(), original.getHours(), shiftedValue);
  assert.equal(shifted.getMinutes(), original.getMinutes(), shiftedValue);
}

assert.equal(dayDelta("2026-11-11", "2026-11-14"), 3);
assert.equal(dayDelta("2026-11-14", "2026-11-11"), -3);
assert.equal(dayDelta("2026-11-11", "2026-11-11"), 0);
assert.equal(dayDelta("nope", "2026-11-11"), null);
assert.equal(dayDelta("2026-02-31", "2026-03-01"), null);

assert.equal(shiftCalendarDate("2026-01-30", 3), "2026-02-02");
assert.equal(shiftCalendarDate("2024-02-28", 1), "2024-02-29");
assert.equal(shiftCalendarDate("2024-02-28", 2), "2024-03-01");
assert.equal(shiftCalendarDate("2026-11-11T10:30:45", 1), "2026-11-12T10:30:45");
assert.equal(shiftCalendarDate("2026-03-01T08:00:00", -1), "2026-02-28T08:00:00");
assert.equal(shiftCalendarDate("2026-11-11T10:30:45", 0), "2026-11-11T10:30:45");

assertWallClock("2026-03-07T16:00:00.000Z", 1);
assertWallClock("2026-11-01T15:30:00.000Z", 1);
assertWallClock("2026-11-11T10:00:00-06:00", 2);

assert.equal(
  shiftEventDates(
    { start: "2026-11-11T09:00:00", end: "2026-11-11T10:15:00" },
    "2026-11-11",
    "2026-11-11"
  ),
  null
);
assert.equal(
  shiftEventDates(
    { start: "2026-11-11", end: "2026-11-12", all_day: true },
    "bad",
    "2026-11-12"
  ),
  null
);

const timed = shiftEventDates(
  {
    start: "2026-11-11T22:00:00",
    end: "2026-11-12T02:00:00",
    doneDates: ["2026-11-11"],
  },
  "2026-11-12",
  "2026-11-15"
);
assert.deepEqual(timed, {
  start: "2026-11-14T22:00:00",
  end: "2026-11-15T02:00:00",
  doneDates: ["2026-11-14"],
});

const allDay = shiftEventDates(
  {
    start: "2026-11-11",
    end: "2026-11-13",
    all_day: true,
    legacyTitleDone: true,
  },
  "2026-11-11",
  "2026-11-12"
);
assert.deepEqual(allDay, {
  start: "2026-11-12",
  end: "2026-11-14",
  doneDates: ["2026-11-12", "2026-11-13"],
});

const oneDoneDay = shiftEventDates(
  {
    start: "2026-11-11",
    end: "2026-11-13",
    all_day: true,
    doneDates: ["2026-11-11"],
  },
  "2026-11-12",
  "2026-11-13"
);
assert.deepEqual(oneDoneDay, {
  start: "2026-11-12",
  end: "2026-11-14",
  doneDates: ["2026-11-12"],
});

console.log(
  `event-shift ok (${Intl.DateTimeFormat().resolvedOptions().timeZone})`
);
