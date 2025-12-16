// src/lib/data/mockPopulation.ts
//
// Purpose
// -------
// Mock dataset for v1 to enable a working app immediately.
// Replace these functions with real ABS/AIHW adapters later.
// Keeping this behind lib/data makes the swap surgical.

import type { GeoCode } from "@/config/geography";
import type { SeriesPoint } from "@/types/domain";

/**
 * A small, plausible-shaped dataset for code-along purposes only.
 * Not authoritative — you will swap this out for ABS data.
 */
const AUS_POPULATION_OVER_TIME: SeriesPoint[] = [
  { period: "2016", value: 798400 },
  { period: "2017", value: 812700 },
  { period: "2018", value: 826000 },
  { period: "2019", value: 840100 },
  { period: "2020", value: 855000 },
  { period: "2021", value: 871600 },
  { period: "2022", value: 889200 },
];

const STATE_LATEST: Record<Exclude<GeoCode, "AUS">, number> = {
  NSW: 278900,
  VIC: 95000,
  QLD: 237800,
  SA: 54000,
  WA: 112000,
  TAS: 28500,
  NT: 76000,
  ACT: 10200,
};

export function getAUSPopulationSeries(): SeriesPoint[] {
  return AUS_POPULATION_OVER_TIME;
}

export function getLatestPopulationByState(): { geoCode: Exclude<GeoCode, "AUS">; value: number }[] {
  return (Object.entries(STATE_LATEST) as [Exclude<GeoCode, "AUS">, number][]).map(
    ([geoCode, value]) => ({ geoCode, value })
  );
}
