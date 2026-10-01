import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const primary = resolve(root, "dist/ha-calendar-card.js");
const repoNamed = resolve(root, "dist/HACalendar.js");

if (!existsSync(primary)) {
  console.error("postbuild: missing dist/ha-calendar-card.js — run rollup first");
  process.exit(1);
}

// HACS plugin validation expects a .js file matching the GitHub repo name (HACalendar).
copyFileSync(primary, repoNamed);
console.log("postbuild: wrote dist/HACalendar.js (HACS repo-name match)");
