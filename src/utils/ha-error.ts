/**
 * Home Assistant websocket/API errors are often plain objects
 * (`{ code, message }`) rather than Error instances — never use String(err).
 */
export function formatHassError(err: unknown, fallback = "Unknown error"): string {
  if (err == null) return fallback;
  if (typeof err === "string") {
    const t = err.trim();
    return t && t !== "[object Object]" ? t : fallback;
  }
  if (err instanceof Error) {
    const msg = err.message?.trim();
    if (msg && msg !== "[object Object]") return msg;
    return fallback;
  }
  if (typeof err === "object") {
    const o = err as Record<string, unknown>;
    const parts: string[] = [];
    const message = pickString(o.message) ?? pickString(o.error);
    const code = pickString(o.code);
    const body = o.body;
    if (message) parts.push(message);
    if (code && code !== message) parts.push(`(${code})`);
    if (body != null) {
      if (typeof body === "string" && body.trim()) {
        parts.push(body.trim());
      } else if (typeof body === "object") {
        const nested =
          pickString((body as Record<string, unknown>).message) ??
          pickString((body as Record<string, unknown>).error);
        if (nested) parts.push(nested);
        else {
          try {
            parts.push(JSON.stringify(body));
          } catch {
            /* ignore */
          }
        }
      }
    }
    if (parts.length) return parts.join(" ");
    try {
      const json = JSON.stringify(err);
      if (json && json !== "{}" && json !== "null") return json;
    } catch {
      /* ignore */
    }
  }
  return fallback;
}

function pickString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const t = value.trim();
  return t && t !== "[object Object]" ? t : undefined;
}
