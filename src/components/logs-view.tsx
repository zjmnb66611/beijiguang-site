"use client";

import { Download, Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { requestLogs } from "@/lib/mock-data";

export function LogsView() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("全部状态");
  const [provider, setProvider] = useState("全部提供商");
  const filtered = useMemo(() => requestLogs.filter((log) => (status === "全部状态" || log.status === status) && (provider === "全部提供商" || log.provider === provider) && `${log.id}${log.model}${log.endpoint}`.toLowerCase().includes(query.toLowerCase())), [provider, query, status]);
  return <>
    <div className="page-heading"><div><span className="eyebrow">可观测性</span><h1>调用日志</h1><p>按请求 ID、模型、状态和时间快速定位每一次 API 调用。</p></div><button className="secondary-button" type="button"><Download size={17} />导出 CSV</button></div>
    <section className="filter-bar"><label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索请求 ID、模型或路径" /></label><label><Filter size={16} /><select value={status} onChange={(event) => setStatus(event.target.value)}><option>全部状态</option><option>成功</option><option>失败</option><option>超时</option></select></label><label><select value={provider} onChange={(event) => setProvider(event.target.value)}><option>全部提供商</option><option>OpenAI</option><option>DeepSeek</option><option>Anthropic</option><option>智谱</option><option>通义千问</option><option>Google</option></select></label><button className="text-button" type="button" onClick={() => { setQuery(""); setStatus("全部状态"); setProvider("全部提供商"); }}>重置筛选</button></section>
    <section className="panel data-panel"><div className="panel-header"><div><h2>请求记录</h2><p>找到 {filtered.length} 条记录 · 日志保留 30 天</p></div><span className="live-indicator"><i />实时更新</span></div><div className="table-scroll"><table><thead><tr><th>时间</th><th>请求 ID</th><th>模型 / 提供商</th><th>请求路径</th><th>状态</th><th>延迟</th><th>Tokens</th><th>成本</th></tr></thead><tbody>{filtered.map((log) => <tr key={log.id}><td>{log.time}</td><td><code>{log.id}</code></td><td><b>{log.provider} / {log.model}</b></td><td><code>{log.endpoint}</code></td><td><span className={`status ${log.status}`}>{log.status}</span></td><td>{log.latency}</td><td>{log.tokens}</td><td>{log.cost}</td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state"><Search size={24} /><strong>没有匹配的调用记录</strong><span>调整筛选条件后再试。</span></div>}</div><div className="table-footer"><span>第 1 页，共 1 页</span><div><button disabled type="button">上一页</button><button disabled type="button">下一页</button></div></div></section>
  </>;
}
