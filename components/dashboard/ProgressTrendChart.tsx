'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { TrendPoint } from "@/lib/metrics";

interface ProgressTrendChartProps {
  data: TrendPoint[];
}

const labelFormatter = (value: string) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));

export function ProgressTrendChart({ data }: ProgressTrendChartProps) {
  return (
    <section className="glass-panel flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Program Momentum</h2>
          <p className="text-sm text-slate-400">
            Aggregated strength & conditioning trends across all active clients.
          </p>
        </div>
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          Trajectory ↑
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="strengthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="cardioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 8" stroke="#94a3b820" />
            <XAxis
              dataKey="date"
              tickFormatter={labelFormatter}
              stroke="#cbd5f54d"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="#cbd5f54d" tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => value.toFixed(1)}
              labelFormatter={labelFormatter}
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "0.75rem",
                border: "1px solid rgba(148, 163, 184, 0.35)",
                color: "#e2e8f0"
              }}
            />
            <Area
              type="monotone"
              dataKey="avgStrengthIndex"
              stroke="#60a5fa"
              strokeWidth={2}
              fill="url(#strengthGradient)"
              name="Strength Index"
            />
            <Area
              type="monotone"
              dataKey="avgCardioScore"
              stroke="#38bdf8"
              strokeWidth={2}
              fill="url(#cardioGradient)"
              name="Cardio Score"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ProgressTrendChart;
