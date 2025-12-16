// src/features/series/useIndicatorSeries.ts
//
// Purpose
// -------
// Typed, reusable hook for fetching IndicatorSeries.
// Keeps pages/components simple and consistent.

import { useQuery } from "@tanstack/react-query";
import type { IndicatorId } from "@/config/indicators";
import type { GeoCode } from "@/config/geography";
import type { IndicatorSeries } from "@/types/domain";
import { fetchJson } from "@/lib/api/client";

export function useIndicatorSeries(params: { indicatorId: IndicatorId; geoCode: GeoCode }) {
  const { indicatorId, geoCode } = params;

  return useQuery({
    queryKey: ["series", indicatorId, geoCode],
    queryFn: () =>
      fetchJson<IndicatorSeries>(`/api/series?indicatorId=${indicatorId}&geoCode=${geoCode}`),
  });
}
