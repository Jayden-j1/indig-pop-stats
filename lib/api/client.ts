// src/lib/api/client.ts
//
// Purpose
// -------
// Small fetch helper that:
// - ensures JSON parsing is safe
// - provides consistent error messages
// - avoids leaking sensitive info (we don't log raw responses by default)

export async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    // Keep errors safe and readable. Do not echo huge payloads.
    const text = await res.text().catch(() => "");
    const message = text ? text.slice(0, 200) : `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return (await res.json()) as T;
}
