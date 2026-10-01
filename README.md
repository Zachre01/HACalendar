# HA Calendar Card

Custom Home Assistant Lovelace card with day/week time-slot views, event create/edit, and safe calendar moves (create-on-new → delete-from-old).

Inspired by Daylight/Skylight aesthetics — **own codebase**, not a fork of those products.

## Status

Phase 1 **v0.2.0**: read path (REST + service fallback), write path (WS create/update/delete), and move path with duplicate-cleanup banner. Recurring calendar moves are blocked in the UI.

## Install (manual / private)

1. Build: `npm install && npm run build`
2. Copy `dist/ha-calendar-card.js` to `config/www/ha-calendar-card.js`
3. Add a Lovelace resource:

```yaml
resources:
  - url: /local/ha-calendar-card.js
    type: module
```

4. Add the card:

```yaml
type: custom:ha-calendar-card
title: Family
entities:
  - calendar.family
  - calendar.personal
initial_view: week
# Optional: show_demo_when_empty: true
```

Until you set real entity ids, placeholders (`calendar.family`, etc.) are fine — failed loads show a status warning and an empty grid (no fake events unless `show_demo_when_empty`).

## Calendar move safety

Changing an event’s calendar:

1. Create on the target calendar  
2. Confirm the new event via refetch (match summary/start/end → uid)  
3. Delete from the source  

If delete fails, both copies remain and a banner offers **Remove old copy**. Recurring moves are blocked in phase 1.

## Develop

```bash
npm install
npm run build    # → dist/ha-calendar-card.js
npm run watch
npm run typecheck
```

## HACS

`hacs.json` is stubbed for later packaging. Prefer manual install until releases are cut.

## Phase 2 (not blocking)

Custom integration for per-event reminder rules — card will call services; design hooks live in the project plan docs.

## License

MIT
