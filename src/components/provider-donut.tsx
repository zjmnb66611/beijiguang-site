"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { providerCosts } from "@/lib/mock-data";

export function ProviderDonut() {
  return <div className="provider-chart">
    <div className="donut-wrap">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <PieChart>
          <Pie isAnimationActive={false} data={providerCosts} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="82%" paddingAngle={1} stroke="#fff" strokeWidth={2}>
            {providerCosts.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} contentStyle={{ border: "1px solid #dce3e9", borderRadius: 8, fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-center"><span>总成本</span><strong>¥6,842.71</strong></div>
    </div>
    <ul className="provider-legend">
      {providerCosts.map((provider) => <li key={provider.name}><i style={{ backgroundColor: provider.color }} /><span>{provider.name}</span><b>{provider.value}%</b><em>¥{provider.amount.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</em></li>)}
    </ul>
  </div>;
}
