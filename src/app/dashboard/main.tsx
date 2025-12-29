"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function formatNumber(n: number) {
  if (n == null) return "0";
  return n.toLocaleString();
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const p = payload[0].payload;
    return (
      <div className="rounded-md border border-gray-200 bg-white p-3 text-xs shadow-md dark:border-gray-800 dark:bg-gray-900">
        <div className="font-semibold mb-1 line-clamp-2">{p.title}</div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ background: "var(--bar-views)" }} />
            <span>Views: {formatNumber(p.views)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-sm" style={{ background: "var(--bar-comments)" }} />
            <span>Comments: {formatNumber(p.comments)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function Main({ tesData }:{ tesData: any[] }) {
  const count = tesData.length;
  const barWidth = 14;
  const minChartWidth = 1200;
  const computedWidth = Math.max(minChartWidth, count * (barWidth + 8));
  const height = 420;

  function onClick(event: any) {
    window.open(event.url, "_blank");
  }

  // CSS variables for colors to auto-adapt in dark mode if Tailwind dark class is present
  const rootStyle = {
    // fallbacks; can be adjusted if tailwind theme changes
    ["--bar-views" as any]: "#60a5fa", // blue-400
    ["--bar-comments" as any]: "#f87171", // red-400
    ["--grid" as any]: "rgba(148, 163, 184, 0.25)", // slate-400/25
    ["--axis" as any]: "#94a3b8", // slate-400
  } as React.CSSProperties;

  return (
    <div style={{ width: "100%", ...rootStyle }} className="overflow-x-auto">
      <div style={{ width: computedWidth }} className="min-w-full">
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={tesData} margin={{ top: 16, right: 24, bottom: 8, left: 0 }} barCategoryGap={6}>
            <defs>
              <linearGradient id="gradViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <linearGradient id="gradComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--axis)" }} height={28} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "var(--axis)" }} tickFormatter={(v) => formatNumber(v as number)} width={70} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "var(--axis)" }} tickFormatter={(v) => formatNumber(v as number)} width={60} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.12)" }} />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) => (value === "views" ? "Views" : value === "comments" ? "Comments" : value)}
            />
            <Bar yAxisId="left" dataKey="views" name="Views" fill="url(#gradViews)" radius={[4, 4, 0, 0]} barSize={barWidth} onClick={onClick} />
            <Bar yAxisId="right" dataKey="comments" name="Comments" fill="url(#gradComments)" radius={[4, 4, 0, 0]} barSize={barWidth} onClick={onClick} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
