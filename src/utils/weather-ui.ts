/** Soft pastel accents for playful weather chips (light + dark friendly). */

export interface WeatherMood {
  /** Soft chip / blob background */
  soft: string;
  /** Stronger accent for icon halo */
  accent: string;
  /** Readable label color */
  ink: string;
}

const MOODS: Record<string, WeatherMood> = {
  sunny: { soft: "rgba(249, 196, 74, 0.28)", accent: "#f0b429", ink: "#8a5a00" },
  "clear-night": {
    soft: "rgba(120, 140, 200, 0.28)",
    accent: "#8fa0d4",
    ink: "#3d4a78",
  },
  partlycloudy: {
    soft: "rgba(140, 190, 220, 0.28)",
    accent: "#7eb6d4",
    ink: "#3a6078",
  },
  cloudy: {
    soft: "rgba(160, 170, 185, 0.28)",
    accent: "#9aa3b2",
    ink: "#4a5260",
  },
  fog: {
    soft: "rgba(180, 190, 200, 0.32)",
    accent: "#a8b2be",
    ink: "#555e6c",
  },
  rainy: {
    soft: "rgba(110, 170, 220, 0.3)",
    accent: "#5b9fd4",
    ink: "#2a5f88",
  },
  pouring: {
    soft: "rgba(80, 140, 210, 0.32)",
    accent: "#4a8bc8",
    ink: "#245078",
  },
  hail: {
    soft: "rgba(130, 180, 220, 0.3)",
    accent: "#7eb0d4",
    ink: "#355e80",
  },
  snowy: {
    soft: "rgba(190, 220, 245, 0.4)",
    accent: "#a8d0ef",
    ink: "#3d6488",
  },
  "snowy-rainy": {
    soft: "rgba(160, 200, 230, 0.35)",
    accent: "#8cbddc",
    ink: "#3a6280",
  },
  lightning: {
    soft: "rgba(180, 150, 220, 0.3)",
    accent: "#b08ad4",
    ink: "#5a3d78",
  },
  "lightning-rainy": {
    soft: "rgba(160, 140, 210, 0.32)",
    accent: "#9a7ac8",
    ink: "#4e3870",
  },
  windy: {
    soft: "rgba(140, 200, 190, 0.28)",
    accent: "#6db8ac",
    ink: "#2f6a62",
  },
  "windy-variant": {
    soft: "rgba(140, 200, 190, 0.28)",
    accent: "#6db8ac",
    ink: "#2f6a62",
  },
  exceptional: {
    soft: "rgba(230, 120, 100, 0.28)",
    accent: "#e07a5f",
    ink: "#8a3a28",
  },
};

const DARK_INK: Record<string, string> = {
  sunny: "#ffd78a",
  "clear-night": "#c5d0f5",
  partlycloudy: "#b8d8ef",
  cloudy: "#c8d0dc",
  fog: "#c8d0dc",
  rainy: "#9ec8ef",
  pouring: "#8ebcef",
  hail: "#a8d0ef",
  snowy: "#d0e8fa",
  "snowy-rainy": "#b8d8ef",
  lightning: "#d4c0f0",
  "lightning-rainy": "#c8b4e8",
  windy: "#a8ddd4",
  "windy-variant": "#a8ddd4",
  exceptional: "#f0b0a0",
};

export function weatherMood(
  condition: string,
  dark = false
): WeatherMood {
  const key = condition in MOODS ? condition : guessKey(condition);
  const base = MOODS[key] ?? MOODS.cloudy;
  if (!dark) return base;
  return {
    soft: base.soft.replace(/0\.\d+/g, (m) => {
      const n = Number(m);
      return String(Math.min(0.45, n + 0.08));
    }),
    accent: base.accent,
    ink: DARK_INK[key] ?? "#d0d6e0",
  };
}

function guessKey(condition: string): string {
  if (condition.includes("lightning")) return "lightning";
  if (condition.includes("snow")) return "snowy";
  if (condition.includes("rain") || condition === "pouring") return "rainy";
  if (condition.includes("wind")) return "windy";
  if (condition === "clear-night") return "clear-night";
  if (condition === "partlycloudy") return "partlycloudy";
  if (condition === "sunny") return "sunny";
  if (condition === "cloudy") return "cloudy";
  if (condition === "fog") return "fog";
  return "cloudy";
}

/** Playful glyph — slightly warmer than the compact month-chip set */
export function weatherGlyphCute(condition: string): string {
  if (condition.includes("lightning")) return "⛈️";
  if (condition === "snowy-rainy") return "🌨️";
  if (condition.includes("snow")) return "❄️";
  if (condition === "pouring") return "🌧️";
  if (condition === "hail") return "🧊";
  if (condition.includes("rain")) return "🌦️";
  if (condition === "fog") return "🌫️";
  if (condition === "cloudy") return "☁️";
  if (condition === "partlycloudy") return "⛅";
  if (condition === "clear-night") return "🌙";
  if (condition === "sunny") return "☀️";
  if (condition.includes("wind")) return "💨";
  if (condition === "exceptional") return "⚠️";
  return "🌤️";
}

export function friendlyWeatherLabel(condition: string): string {
  const map: Record<string, string> = {
    sunny: "Sunny skies",
    "clear-night": "Clear night",
    partlycloudy: "Partly cloudy",
    cloudy: "Cloudy",
    fog: "A bit foggy",
    rainy: "Rainy",
    pouring: "Pouring rain",
    hail: "Hail",
    snowy: "Snowy",
    "snowy-rainy": "Wintry mix",
    lightning: "Stormy",
    "lightning-rainy": "Thunderstorms",
    windy: "Breezy",
    "windy-variant": "Windy",
    exceptional: "Weather alert",
  };
  return map[condition] ?? condition.replace(/-/g, " ");
}
