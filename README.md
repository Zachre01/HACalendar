# HA Calendar Card

Custom Home Assistant Lovelace card with day/week time-slot views, event create/edit, and safe calendar moves (create-on-new → delete-from-old).

Inspired by Daylight/Skylight aesthetics — **own codebase**, not a fork of those products.

## Status

Phase 1 **v0.4.0**: read/write/move + polish + HACS packaging docs/workflows. Recurring calendar moves remain blocked. Phase 2 (per-event reminders) is not started.

## Install via HACS (custom repository)

Private / custom-repo install — not yet in the HACS default store.

1. In Home Assistant: **HACS → Frontend** (Dashboard) → **⋮ → Custom repositories**
2. Add repository URL: `https://github.com/Zachre01/HACalendar`
3. Category: **Dashboard** (plugin)
4. Download **HA Calendar Card**
5. Restart Home Assistant (or at least clear frontend cache / refresh Lovelace)
6. HACS registers a Lovelace resource pointing at the downloaded JS (typically under `/hacsfiles/...`)
7. Add the card (see [Card YAML](#card-yaml))

### What HACS downloads

| Source | Behavior |
| --- | --- |
| **GitHub Release** (preferred) | Latest release assets; looks for `ha-calendar-card.js` (`hacs.json` → `filename`) |
| **`dist/` on default branch** | Used when no release exists yet (`hide_default_branch` is `false`) |

`hacs.json` uses the **basename** `ha-calendar-card.js` (not `dist/...`). GitHub Release assets are uploaded without a `dist/` prefix. Do **not** use `zip_release` for plugins.

## Install manually (`/config/www`)

1. Get the built file:
   - From a [GitHub Release](https://github.com/Zachre01/HACalendar/releases) asset `ha-calendar-card.js`, or
   - Build locally: `npm ci && npm run build` → `dist/ha-calendar-card.js`
2. Copy to Home Assistant: `config/www/ha-calendar-card.js`
3. Add a Lovelace resource (**Settings → Dashboards → ⋮ → Resources**, or YAML):

```yaml
resources:
  - url: /local/ha-calendar-card.js?v=0.4.0
    type: module
```

Bump the `?v=` query when you update the file so browsers reload it.

4. Add the card YAML below.

## Card YAML

Placeholder `calendar.*` entity ids are fine until you point at real calendars:

```yaml
type: custom:ha-calendar-card
title: Family
entities:
  - calendar.family
  - calendar.personal
  - calendar.work
initial_view: week
# day_start_hour: 6
# day_end_hour: 22
# show_demo_when_empty: false
```

| Option | Default | Notes |
| --- | --- | --- |
| `title` | `HA Calendar` | Brand / header label |
| `entities` | placeholders | List of `calendar.*` entity ids |
| `initial_view` | `week` | `day` or `week` |
| `day_start_hour` / `day_end_hour` | `6` / `22` | Visible hour range |
| `show_demo_when_empty` | `false` | Dev-only demo blocks |

## Cutting a release (maintainers)

HACS (and manual users) should get a **GitHub Release** that includes the built JS as an **asset** — tags alone are not enough.

```bash
npm ci
npm run release:check   # build + typecheck + verify dist artifacts
git tag v0.4.0
git push origin v0.4.0  # triggers .github/workflows/release.yml
```

Or run the **Release** workflow via `workflow_dispatch` and pass a tag.

The workflow attaches:

- `ha-calendar-card.js` — primary asset (`hacs.json` `filename`)
- `HACalendar.js` — same bytes; satisfies HACS “JS matches repository name” rule
- `ha-calendar-card.js.map` — source map (optional for users)

## Develop

```bash
npm install
npm run build       # → dist/ha-calendar-card.js (+ dist/HACalendar.js)
npm run watch
npm run typecheck
```

## Calendar move safety

Changing an event’s calendar:

1. Create on the target calendar  
2. Confirm the new event via refetch (match summary/start/end → uid)  
3. Delete from the source  

If delete fails, both copies remain and a banner offers **Remove old copy**. Recurring moves are blocked in phase 1.

## Phase 2 (not started)

Custom integration for per-event reminder rules — designed for later; not part of this card packaging milestone.

## License

MIT
