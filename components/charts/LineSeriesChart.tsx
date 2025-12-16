// src/components/charts/LineSeriesChart.tsx
//
// Purpose
// -------
// Accessible line chart wrapper.
// - Includes an aria-described summary
// - Includes a table fallback (important for accessibility + trust)
// - Avoids color-only meaning

"use client";

import React from "react";
import type { IndicatorSeries } from "@/types/domain";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-AU").format(n);
}

export function LineSeriesChart({
  series,
  title,
}: {
  series: IndicatorSeries;
  title: string;
}) {
  // Build a short, screen-reader friendly summary.
  const first = series.points[0];
  const last = series.points[series.points.length - 1];

  const summary =
    first && last
      ? `${title}. From ${first.period} to ${last.period}, values changed from ${formatNumber(
          first.value
        )} to ${formatNumber(last.value)} ${series.unit}.`
      : `${title}.`;

  return (
    <section className="rounded-xl border p-4 shadow-sm" aria-label={title}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate-700" id={`${series.indicatorId}-summary`}>
        {summary}
      </p>

      <div className="mt-4 h-72" aria-describedby={`${series.indicatorId}-summary`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series.points} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis tickFormatter={(v) => formatNumber(Number(v))} />
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Line type="monotone" dataKey="value" strokeWidth={2} dot />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table fallback: accessible + transparent */}
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium">
          View data as a table
        </summary>
        <div className="mt-2 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left">Period</th>
                <th className="px-2 py-2 text-left">Value ({series.unit})</th>
              </tr>
            </thead>
            <tbody>
              {series.points.map((p) => (
                <tr key={p.period} className="border-b">
                  <td className="px-2 py-2">{p.period}</td>
                  <td className="px-2 py-2">{formatNumber(p.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-3 text-xs text-slate-600">
        Source: {series.sourceName}. Retrieved: {new Date(series.retrievedAt).toLocaleString("en-AU")}
      </p>
    </section>
  );
}
