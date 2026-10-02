import type {
  HassEntity,
  HomeAssistant,
  WeatherDay,
  WeatherSummary,
} from "../types";

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

/**
 * Canonical weather entity id from card config.
 * Prefer `weather_entity`; accept alias `weather` (common YAML shorthand).
 */
export function resolveWeatherEntityId(config: {
  weather_entity?: string;
  weather?: string;
}): string | undefined {
  const raw = config.weather_entity ?? config.weather;
  if (!raw || typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  return trimmed || undefined;
}

export function asForecastList(raw: unknown): WeatherDay[] {
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

function forecastFromAttributes(attrs: Record<string, unknown>): WeatherDay[] {
  return asForecastList(
    attrs.forecast ?? attrs.forecast_daily ?? attrs.forecast_twice_daily
  );
}

function unwrapForecastsResponse(
  response: unknown,
  entityId: string
): WeatherDay[] {
  if (!response || typeof response !== "object") return [];
  const obj = response as Record<string, unknown>;
  const root =
    obj.response && typeof obj.response === "object"
      ? (obj.response as Record<string, unknown>)
      : obj;
  const entityPayload = root[entityId];
  if (!entityPayload || typeof entityPayload !== "object") return [];
  return asForecastList(
    (entityPayload as Record<string, unknown>).forecast
  );
}

/**
 * Live summary from hass.states (condition + temp). Forecast may be empty on
 * modern HA where the forecast attribute was removed — use fetchWeatherForecast.
 */
export function readWeatherSummary(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  forecastOverride?: WeatherDay[] | null
): WeatherSummary | null {
  if (!hass || !entityId) return null;
  const entity: HassEntity | undefined = hass.states[entityId];
  if (!entity) return null;

  const attrs = entity.attributes ?? {};
  const forecast =
    forecastOverride && forecastOverride.length
      ? forecastOverride
      : forecastFromAttributes(attrs);

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

/**
 * Prefer attribute forecast when present; otherwise call weather.get_forecasts
 * (daily → twice_daily → hourly) for modern HA entities.
 */
export async function fetchWeatherForecast(
  hass: HomeAssistant,
  entityId: string
): Promise<WeatherDay[]> {
  const entity = hass.states[entityId];
  if (entity) {
    const fromAttrs = forecastFromAttributes(entity.attributes ?? {});
    if (fromAttrs.length) return fromAttrs;
  }

  const types = ["daily", "twice_daily", "hourly"] as const;
  for (const type of types) {
    try {
      const response = await hass.callService(
        "weather",
        "get_forecasts",
        { type },
        { entity_id: entityId },
        false,
        true
      );
      const list = unwrapForecastsResponse(response, entityId);
      if (list.length) return list;
    } catch {
      // try next forecast type / fall through
    }
  }
  return [];
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
