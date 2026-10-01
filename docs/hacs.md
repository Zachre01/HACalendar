# HACS packaging notes

Short maintainer reference. User-facing steps live in the root [README](../README.md).

## `hacs.json`

```json
{
  "name": "HA Calendar Card",
  "filename": "ha-calendar-card.js",
  "render_readme": true,
  "hide_default_branch": false,
  "homeassistant": "2024.1.0"
}
```

| Key | Why |
| --- | --- |
| `filename` | Basename only — must match the GitHub Release asset name |
| `hide_default_branch: false` | Allows install from `dist/` before the first release |
| No `zip_release` | Unsupported for plugins |
| No `content_in_root` | Built JS lives under `dist/` |

## Artifacts

| File | Role |
| --- | --- |
| `dist/ha-calendar-card.js` | Card module + HACS `filename` |
| `dist/HACalendar.js` | Copy for HACS repo-name validation (`Zachre01/HACalendar`) |

Produced by `npm run build` (`rollup` + `scripts/postbuild.mjs`).

## CI

- `.github/workflows/release.yml` — on version tags / dispatch: build and attach assets to a GitHub Release
- `.github/workflows/validate.yml` — `hacs/action` with `category: plugin`

After the first successful release, consider setting `hide_default_branch: true` so HACS prefers release assets only.
