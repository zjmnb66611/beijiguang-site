"use client";

import { Activity, Clock3, Pencil, ShieldCheck } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { Toast } from "@/components/toast";
import { requestLogs } from "@/lib/mock-data";

const UsageChart = dynamic(() => import("@/components/usage-chart").then((module) => module.UsageChart), { ssr: false });
const ProviderDonut = dynamic(() => import("@/components/provider-donut").then((module) => module.ProviderDonut), { ssr: false });

const metricCards = [
  { label: "本月请求量", value: "42,810", note: "昨日 2,931", change: "↑ 12.6%", icon: Activity, tone: "good" },
  { label: "成功率", value: "99.98%", note: "昨日 99.97%", change: "↑ 0.01%", icon: ShieldCheck, tone: "good" },
  { label: "平均延迟", value: "612 ms", note: "昨日 589 ms", change: "↑ 3.90%", icon: Clock3, tone: "bad" },
];

export function DashboardView() {
  const [balance, setBalance] = useState(2486.5);
  const [rechargeOpen, setRechargeOpen] = useState(false);
  const [amount, setAmount] = useState(199);
  const [toast, setToast] = useState("");

  function recharge() {
    setBalance((value) => value + amount);
    setRechargeOpen(false);
    setToast(`充值成功，余额增加 ¥${amount}`);
    window.setTimeout(() => setToast(""), 2200);
  }

  return <>
    <section className="metric-grid">
      <article className="metric-card balance-card"><div className="metric-top"><span>可用余额</span></div><div className="balance-line"><strong>¥{balance.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</strong><button className="primary-button" type="button" onClick={() => setRechargeOpen(true)}>充值</button></div><div className="metric-foot"><span>低余额提醒阈值</span><b>¥100.00</b><button className="icon-button small" aria-label="编辑余额提醒" type="button"><Pencil size={14} /></button></div></article>
      {metricCards.map((metric) => { const Icon = metric.icon; return <article className="metric-card" key={metric.label}><div className="metric-top"><span>{metric.label}</span><i><Icon size={20} /></i></div><strong>{metric.value}</strong><div className="metric-foot"><span>{metric.note}</span><b className={metric.tone}>{metric.change}</b></div></article>; })}
    </section>

    <section className="dashboard-main-grid">
      <article className="panel usage-panel"><div className="panel-header"><div><h2>请求量与成本（14 天）</h2><div className="chart-legend"><span className="request"><i />请求量（次）</span><span className="cost"><i />成本（¥）</span></div></div><select aria-label="统计粒度"><option>按天</option><option>按小时</option><option>按周</option></select></div><UsageChart /><div className="chart-summary"><span>总请求量 <b>68,512 次</b></span><span>总成本 <b>¥6,842.71</b></span><span>日均成本 <b>¥488.76</b></span></div></article>
      <article className="panel provider-panel"><div className="panel-header"><h2>按模型 / 提供商成本占比</h2><select aria-label="成本维度"><option>成本占比</option><option>请求占比</option></select></div><ProviderDonut /></article>
    </section>

    <section className="panel recent-panel"><div className="panel-header"><h2>最近请求</h2><a className="text-link" href="/logs">查看全部日志</a></div><div className="table-scroll"><table><thead><tr><th>时间</th><th>模型 / 提供商</th><th>请求路径</th><th>状态</th><th>延迟</th><th>消耗 Tokens</th><th>成本</th><th>请求 ID</th></tr></thead><tbody>{requestLogs.slice(0, 5).map((log) => <tr key={log.id}><td>{log.time.split(" ")[1]}</td><td><b>{log.provider} / {log.model}</b></td><td><code>{log.endpoint}</code></td><td><span className={`status ${log.status}`}>{log.status}</span></td><td>{log.latency}</td><td>{log.tokens}</td><td>{log.cost}</td><td><code>{log.id}</code></td></tr>)}</tbody></table></div></section>

    <Modal open={rechargeOpen} onClose={() => setRechargeOpen(false)} title="账户充值" description="充值金额将实时计入可用余额。"><div className="amount-grid">{[39, 199, 699].map((value) => <button className={amount === value ? "amount-option selected" : "amount-option"} type="button" key={value} onClick={() => setAmount(value)}><strong>¥{value}</strong><span>{value === 39 ? "体验包" : value === 199 ? "创作包" : "团队包"}</span></button>)}</div><label className="field-label">支付方式<select><option>企业支付宝</option><option>微信支付</option><option>对公转账</option></select></label><div className="modal-actions"><button className="secondary-button" type="button" onClick={() => setRechargeOpen(false)}>取消</button><button className="primary-button" type="button" onClick={recharge}>确认支付 ¥{amount}</button></div></Modal>
    <Toast message={toast} />
  </>;
}
