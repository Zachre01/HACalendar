import type { HassEntity, HomeAssistant, WeatherDay, WeatherSummary } from "../types";

const CONDITION_LABELS: Record<string, string> = {
  "clear-night": "Clear",
  cloudy: "Cloudy",
  fog: "Fog",
  hail: "Hail",
  lightning: "Storms",
  "lightning-rainy": "Storms",
  partlycloudy: "Partly cloudy",
  pouring: "Downpour",
  rainy: "Rain",
  snowy: "Snow",
  "snowy-rainy": "Sleet",
  sunny: "Sunny",
  windy: "Windy",
  "windy-variant": "Windy",
  exceptional: "Alert",
};

export function weatherLabel(condition: string): string {
  return CONDITION_LABELS[condition] ?? condition.replace(/-/g, " ");
}

/** Compact glyph for weather chips */
export function weatherGlyph(condition: string): string {
  if (condition.includes("lightning")) return "⚡";
  if (condition.includes("snow")) return "❄";
  if (condition.includes("rain") || condition === "pouring" || condition === "hail")
    return "🌧";
  if (condition === "fog") return "fog";
  if (condition === "cloudy") return "☁";
  if (condition === "partlycloudy") return "⛅";
  if (condition === "clear-night") return "☾";
  if (condition === "sunny") return "☀";
  if (condition.includes("wind")) return "🌬";
  return "·";
}

function asForecastList(raw: unknown): WeatherDay[] {
  if (!Array.isArray(raw)) return [];
  const out: WeatherDay[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const datetime = String(row.datetime ?? row.date ?? "");
    const condition = String(row.condition ?? row.state ?? "");
    if (!datetime || !condition) continue;
    out.push({
      datetime,
      condition,
      temperature:
        typeof row.temperature === "number" ? row.temperature : undefined,
      templow: typeof row.templow === "number" ? row.templow : undefined,
    });
  }
  return out;
}

export function readWeatherSummary(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): WeatherSummary | null {
  if (!hass || !entityId) return null;
  const entity: HassEntity | undefined = hass.states[entityId];
  if (!entity) return null;

  const attrs = entity.attributes ?? {};
  const forecast = asForecastList(
    attrs.forecast ?? attrs.forecast_daily ?? attrs.forecast_twice_daily
  );

  return {
    entityId,
    state: entity.state,
    temperature:
      typeof attrs.temperature === "number" ? attrs.temperature : undefined,
    unit:
      typeof attrs.temperature_unit === "string"
        ? attrs.temperature_unit
        : typeof attrs.unit_of_measurement === "string"
          ? attrs.unit_of_measurement
          : "°",
    humidity: typeof attrs.humidity === "number" ? attrs.humidity : undefined,
    forecast,
  };
}

export function forecastForDate(
  weather: WeatherSummary | null,
  day: Date
): WeatherDay | null {
  if (!weather?.forecast?.length) return null;
  const key = [
    day.getFullYear(),
    String(day.getMonth() + 1).padStart(2, "0"),
    String(day.getDate()).padStart(2, "0"),
  ].join("-");
  return (
    weather.forecast.find((f) => f.datetime.slice(0, 10) === key) ?? null
  );
}
