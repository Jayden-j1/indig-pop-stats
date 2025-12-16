// src/types/domain.ts
//
// Purpose
// -------
// Canonical normalized data shape used across the entire app.
// Everything (ABS/AIHW/etc.) eventually becomes THIS shape.

import type { IndicatorId } from "@/config/indicators";
import type { GeoCode } from "@/config/geography";

export type SeriesPoint = {
  // Use ISO-like year strings for simplicity in v1: "2016", "2017", ...
  period: string;
  value: number;
};

export type IndicatorSeries = {
  indicatorId: IndicatorId;
  geoCode: GeoCode;

  unit: string; // e.g. "people", "years", "%"
  points: SeriesPoint[];

  // Metadata: important for transparency + trust
  sourceName: string; // "Mock (Replace with ABS later)"
  sourceUrl?: string; // optional
  retrievedAt: string; // ISO timestamp
  lastUpdated?: string; // date string if you know it
};
