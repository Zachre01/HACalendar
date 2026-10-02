export type ThemeMode = "light" | "dark" | "auto";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "ha-calendar-card-theme";

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark" || value === "auto";
}

/** Config default → localStorage override → auto */
export function readThemePreference(configTheme?: string): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeMode(stored)) return stored;
  } catch {
    // private mode / blocked storage
  }
  if (isThemeMode(configTheme)) return configTheme;
  return "auto";
}

export function writeThemePreference(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // ignore
  }
}

export function cycleThemeMode(current: ThemeMode): ThemeMode {
  if (current === "light") return "dark";
  if (current === "dark") return "auto";
  return "light";
}

export function systemPrefersDark(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode === "auto") return systemPrefersDark() ? "dark" : "light";
  return mode;
}

export function themeToggleLabel(mode: ThemeMode): string {
  if (mode === "light") return "Light";
  if (mode === "dark") return "Dark";
  return "Auto";
}

export function themeToggleGlyph(mode: ThemeMode): string {
  if (mode === "light") return "☀";
  if (mode === "dark") return "☾";
  return "◐";
}
