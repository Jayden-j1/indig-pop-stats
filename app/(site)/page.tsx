// src/app/page.tsx
//
// Purpose
// -------
// v1 dashboard page.
// Shows:
// - Total population over time (AUS) as a line chart
// - Latest population by state/territory as a bar chart
//
// Notes
// -----
// - Uses React Query for caching and clean loading states.
// - Uses accessible charts with table fallbacks.

"use client";

import React from "react";
import { useIndicatorSeries } from "@/features/series/useIndicatorSeries";
import { LineSeriesChart } from "@/components/charts/LineSeriesChart";
import { BarSeriesChart } from "@/components/charts/BarSeriesChart";
import { INDICATORS } from "@/config/indicators";

function ErrorBox({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
    >
      <p className="font-semibold">Something went wrong</p>
      <p className="mt-1">{message}</p>
    </div>
  );
}

function LoadingBox({ label }: { label: string }) {
  return (
    <div
      aria-busy="true"
      className="rounded-xl border p-4 text-sm text-slate-700 shadow-sm"
    >
      Loading: {label}…
    </div>
  );
}

export default function HomePage() {
  const total = useIndicatorSeries({ indicatorId: "population_total", geoCode: "AUS" });
  const byState = useIndicatorSeries({
    indicatorId: "population_by_state_latest",
    geoCode: "AUS",
  });

  return (
    <div className="mx-auto max-w-5xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Indigenous Population Dashboard (Demo)</h1>
        <p className="mt-2 text-sm text-slate-700">
          Australia-only indicators for Aboriginal and Torres Strait Islander peoples.
          This demo uses mock data now, and is structured to swap in ABS/AIHW sources later.
        </p>
      </header>

      <main id="main" className="space-y-6">
        {/* Chart 1: Total population time series */}
        {total.isLoading && <LoadingBox label={INDICATORS.population_total.name} />}
        {total.isError && <ErrorBox message={(total.error as Error).message} />}
        {total.data && (
          <LineSeriesChart series={total.data} title={INDICATORS.population_total.name} />
        )}

        {/* Chart 2: Latest by state */}
        {byState.isLoading && <LoadingBox label={INDICATORS.population_by_state_latest.name} />}
        {byState.isError && <ErrorBox message={(byState.error as Error).message} />}
        {byState.data && (
          <BarSeriesChart
            series={byState.data}
            title={INDICATORS.population_by_state_latest.name}
          />
        )}
      </main>

      <footer className="mt-10 text-xs text-slate-600">
        <p>
          Respectful data use: Always include definitions, limitations, and source context when
          presenting population and health statistics.
        </p>
      </footer>
    </div>
  );
}
