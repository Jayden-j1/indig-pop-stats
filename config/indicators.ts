// src/config/indicators.ts
//
// Purpose
// -------
// Curated indicator catalog. This is the SINGLE source of truth for what your app supports.
// Security benefit: API routes can allowlist indicator IDs (prevents arbitrary upstream fetching).
// Maintainability benefit: UI and API share the same stable identifiers.

export type IndicatorId = "population_total" | "population_by_state_latest";

// Keep v1 small and solid. Add more indicators later (median_age, life_expectancy, etc.).
export const INDICATORS: Record<
  IndicatorId,
  {
    id: IndicatorId;
    name: string;
    description: string;
    unit: string;
    recommendedCharts: ("line" | "bar")[];
  }
> = {
  population_total: {
    id: "population_total",
    name: "Total Aboriginal & Torres Strait Islander Population",
    description:
      "Estimated number of Aboriginal and Torres Strait Islander people living in Australia over time.",
    unit: "people",
    recommendedCharts: ["line"],
  },

  population_by_state_latest: {
    id: "population_by_state_latest",
    name: "Population by State/Territory (Latest)",
    description:
      "Latest available estimated Aboriginal and Torres Strait Islander population by state and territory.",
    unit: "people",
    recommendedCharts: ["bar"],
  },
};

export const INDICATOR_IDS = Object.keys(INDICATORS) as IndicatorId[];
