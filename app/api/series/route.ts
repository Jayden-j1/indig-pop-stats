// src/app/api/series/route.ts
//
// Purpose
// -------
// API endpoint returning normalized IndicatorSeries.
// "Backend-lite" role: validate inputs, return consistent shapes, and later proxy/cache upstream data.
// Security: strict allowlist for indicator + geo codes; no arbitrary URLs; no secrets exposed.
// Accessibility: not directly, but stable shapes make UI safer.
//
// Usage
// -----
// GET /api/series?indicatorId=population_total&geoCode=AUS

import { NextResponse } from "next/server";
import { z } from "zod";

import { INDICATORS, type IndicatorId } from "@/config/indicators";
import { GEO, type GeoCode } from "@/config/geography";
import type { IndicatorSeries } from "@/types/domain";
import { getAUSPopulationSeries, getLatestPopulationByState } from "@/lib/data/mockPopulation";

export const runtime = "nodejs"; // predictable for serverless
// NOTE: We avoid storing secrets. If later you need upstream API keys, store them in env vars and keep them server-side.

const QuerySchema = z.object({
  indicatorId: z.enum(Object.keys(INDICATORS) as [IndicatorId, ...IndicatorId[]]),
  geoCode: z.enum(Object.keys(GEO) as [GeoCode, ...GeoCode[]]),
});

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(req: Request) {
  // Parse and validate query params safely (prevents runtime surprises and abuse).
  const url = new URL(req.url);
  const indicatorId = url.searchParams.get("indicatorId");
  const geoCode = url.searchParams.get("geoCode");

  const parsed = QuerySchema.safeParse({ indicatorId, geoCode });
  if (!parsed.success) {
    return badRequest("Invalid query. Expected ?indicatorId=...&geoCode=...");
  }

  const { indicatorId: id, geoCode: geo } = parsed.data;

  // Build normalized series output.
  const nowIso = new Date().toISOString();
  const indicator = INDICATORS[id];

  // In v1, we return mock data. Later, replace these branches with ABS/AIHW adapters.
  let series: IndicatorSeries | null = null;

  if (id === "population_total") {
    // For population_total, we only allow AUS in v1 (simple, avoids user confusion).
    if (geo !== "AUS") {
      return badRequest("population_total currently supports geoCode=AUS only in v1.");
    }

    series = {
      indicatorId: id,
      geoCode: geo,
      unit: indicator.unit,
      points: getAUSPopulationSeries(),
      sourceName: "Mock dataset (replace with ABS later)",
      sourceUrl: undefined,
      retrievedAt: nowIso,
      lastUpdated: "2022-12-31",
    };
  }

  if (id === "population_by_state_latest") {
    // This indicator is inherently "by state", so geoCode=AUS is the logical request.
    if (geo !== "AUS") {
      return badRequest("population_by_state_latest expects geoCode=AUS (it returns all states).");
    }

    // Represent as a “series” by encoding each bar as a point where period is the region code.
    // This keeps one consistent shape across charts.
    const bars = getLatestPopulationByState().map((x) => ({
      period: x.geoCode,
      value: x.value,
    }));

    series = {
      indicatorId: id,
      geoCode: geo,
      unit: indicator.unit,
      points: bars,
      sourceName: "Mock dataset (replace with ABS later)",
      sourceUrl: undefined,
      retrievedAt: nowIso,
      lastUpdated: "2022-12-31",
    };
  }

  if (!series) {
    return NextResponse.json({ error: "Indicator not implemented yet." }, { status: 501 });
  }

  // Caching headers:
  // - public data is safe to cache
  // - keep it modest in v1 (you can tune later)
  return NextResponse.json(series, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
