"use client";

import { ArrowDown, ArrowUp, Check, CircleDollarSign, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Toast } from "@/components/toast";

const modes = [
  { id: "CHEAP", title: "优先成本", description: "尽量选择低成本模型", icon: CircleDollarSign },
  { id: "BALANCED", title: "均衡模式", description: "平衡成本、延迟与质量", icon: Gauge },
  { id: "QUALITY", title: "优先质量", description: "为复杂任务选择最佳模型", icon: Sparkles },
  { id: "AUTO", title: "智能路由", description: "按任务实时计算最优路径", icon: ShieldCheck },
];

const initialProviders = ["DeepSeek / DeepSeek-V3", "通义千问 / Qwen-2.5", "智谱 / GLM-4", "OpenAI / GPT-4o", "Anthropic / Claude 3.5", "Google / Gemini 2.5"];

export function RoutingView() {
  const [mode, setMode] = useState("AUTO");
  const [providers, setProviders] = useState(initialProviders);
  const [retry, setRetry] = useState(2);
  const [timeout, setTimeoutValue] = useState(60);
  const [fallback, setFallback] = useState(true);
  const [toast, setToast] = useState("");
  function move(index: number, direction: -1 | 1) { const next = [...providers]; const target = index + direction; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; setProviders(next); }
  function save() { setToast(`已保存 ${mode} 路由策略`); window.setTimeout(() => setToast(""), 2200); }
  return <>
    <div className="page-heading"><div><span className="eyebrow">模型调度</span><h1>路由策略</h1><p>根据成本、质量和延迟选择模型，并设置故障自动切换顺序。</p></div><span className="live-indicator"><i />策略运行中</span></div>
    <div className="routing-layout"><section><div className="section-title"><div><h2>路由模式</h2><p>每个模式会使用不同权重计算最佳模型。</p></div></div><div className="mode-grid">{modes.map((item) => { const Icon = item.icon; return <button className={mode === item.id ? "mode-card selected" : "mode-card"} key={item.id} type="button" onClick={() => setMode(item.id)}><Icon size={22} /><span><b>{item.id}</b><strong>{item.title}</strong><small>{item.description}</small></span>{mode === item.id && <Check className="mode-check" size={18} />}</button>; })}</div><section className="panel weights-panel"><div className="panel-header"><div><h2>目标权重</h2><p>仅 AUTO 模式会综合使用以下权重。</p></div></div><label><span>最低成本 <b>45%</b></span><input type="range" min="0" max="100" defaultValue="45" disabled={mode !== "AUTO"} /></label><label><span>输出质量 <b>35%</b></span><input type="range" min="0" max="100" defaultValue="35" disabled={mode !== "AUTO"} /></label><label><span>低延迟 <b>20%</b></span><input type="range" min="0" max="100" defaultValue="20" disabled={mode !== "AUTO"} /></label></section></section>
      <aside className="panel routing-side"><div className="panel-header"><div><h2>Fallback 顺序</h2><p>模型不可用时按顺序尝试。</p></div></div><ol className="priority-list">{providers.map((provider, index) => <li key={provider}><span>{index + 1}</span><b>{provider}</b><div><button className="icon-button small" type="button" aria-label="上移" disabled={index === 0} onClick={() => move(index, -1)}><ArrowUp size={14} /></button><button className="icon-button small" type="button" aria-label="下移" disabled={index === providers.length - 1} onClick={() => move(index, 1)}><ArrowDown size={14} /></button></div></li>)}</ol><div className="routing-settings"><label><span>超时（秒）</span><input type="number" min="10" max="120" value={timeout} onChange={(event) => setTimeoutValue(Number(event.target.value))} /></label><label><span>最大重试次数</span><input type="number" min="0" max="5" value={retry} onChange={(event) => setRetry(Number(event.target.value))} /></label><label className="switch-row"><span>启用失败自动切换</span><button className={fallback ? "switch on" : "switch"} type="button" onClick={() => setFallback((value) => !value)} aria-pressed={fallback}><i /></button></label></div><button className="primary-button full-button" type="button" onClick={save}>保存路由策略</button></aside></div>
    <Toast message={toast} />
  </>;
}
