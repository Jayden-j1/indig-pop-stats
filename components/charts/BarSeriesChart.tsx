// src/components/charts/BarSeriesChart.tsx
//
// Purpose
// -------
// Accessible bar chart wrapper with table fallback.
// In this app, we encode regions as the "period" field (e.g., NSW, VIC).

"use client";

import React from "react";
import type { IndicatorSeries } from "@/types/domain";
import { GEO } from "@/config/geography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-AU").format(n);
}

export function BarSeriesChart({
  series,
  title,
}: {
  series: IndicatorSeries;
  title: string;
}) {
  const data = [...series.points]
    .map((p) => ({
      code: p.period,
      name: GEO[p.period as keyof typeof GEO]?.name ?? p.period,
      value: p.value,
    }))
    .sort((a, b) => b.value - a.value);

  const top = data[0];
  const summary = top
    ? `${title}. Highest value is ${top.name} at ${formatNumber(top.value)} ${series.unit}.`
    : `${title}.`;

  return (
    <section className="rounded-xl border p-4 shadow-sm" aria-label={title}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-slate-700" id={`${series.indicatorId}-summary`}>
        {summary}
      </p>

      <div className="mt-4 h-80" aria-describedby={`${series.indicatorId}-summary`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="code" angle={-30} textAnchor="end" interval={0} height={60} />
            <YAxis tickFormatter={(v) => formatNumber(Number(v))} />
            <Tooltip formatter={(value) => formatNumber(Number(value))} />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-medium">View data as a table</summary>
        <div className="mt-2 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-2 py-2 text-left">Region</th>
                <th className="px-2 py-2 text-left">Value ({series.unit})</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.code} className="border-b">
                  <td className="px-2 py-2">{row.name}</td>
                  <td className="px-2 py-2">{formatNumber(row.value)}</td>
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
