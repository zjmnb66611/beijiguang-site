"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { usageData } from "@/lib/mock-data";

export function UsageChart() {
  return <div className="chart-wrap" aria-label="14 天请求量与成本趋势图">
    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
      <LineChart data={usageData} margin={{ top: 14, right: 10, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="#e8edf2" vertical={false} />
        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#708090", fontSize: 11 }} dy={8} />
        <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#708090", fontSize: 11 }} tickFormatter={(value) => `${value / 1000}K`} />
        <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "#708090", fontSize: 11 }} tickFormatter={(value) => `¥${value}`} />
        <Tooltip contentStyle={{ border: "1px solid #dce3e9", borderRadius: 8, boxShadow: "0 8px 28px rgba(22, 34, 50, .1)", fontSize: 12 }} />
        <Line isAnimationActive={false} yAxisId="left" type="monotone" dataKey="requests" name="请求量" stroke="#07966f" strokeWidth={2.3} dot={{ r: 2.5, fill: "#07966f" }} activeDot={{ r: 5 }} />
        <Line isAnimationActive={false} yAxisId="right" type="monotone" dataKey="cost" name="成本" stroke="#2375d8" strokeWidth={2.2} dot={{ r: 2.3, fill: "#2375d8" }} />
      </LineChart>
    </ResponsiveContainer>
  </div>;
}
