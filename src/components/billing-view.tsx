"use client";

import { Check, Download, ReceiptText, WalletCards } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { Toast } from "@/components/toast";
import { invoices } from "@/lib/mock-data";

const plans = [
  { name: "体验包", price: 39, tokens: "100k tokens", note: "适合试用和轻量脚本" },
  { name: "创作包", price: 199, tokens: "500k tokens", note: "适合日常内容与应用开发", recommended: true },
  { name: "团队包", price: 699, tokens: "2M tokens", note: "适合多人协作与生产流量" },
];

export function BillingView() {
  const [balance, setBalance] = useState(2486.5);
  const [selected, setSelected] = useState(plans[1]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  function pay() { setBalance((value) => value + selected.price); setOpen(false); setToast(`${selected.name}充值成功`); window.setTimeout(() => setToast(""), 2200); }
  return <>
    <div className="page-heading"><div><span className="eyebrow">财务中心</span><h1>账单与充值</h1><p>查看实时余额、套餐用量、充值记录与企业发票。</p></div><button className="secondary-button" type="button"><ReceiptText size={17} />申请发票</button></div>
    <section className="billing-summary"><article><div><span>可用余额</span><strong>¥{balance.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}</strong><small>预计可用 18 天</small></div><WalletCards size={28} /></article><article><div><span>本月消费</span><strong>¥6,842.71</strong><small>较上月下降 8.6%</small></div></article><article><div><span>待开票金额</span><strong>¥1,597.00</strong><small>3 笔充值记录</small></div></article></section>
    <section><div className="section-title"><div><h2>选择充值套餐</h2><p>额度到账后按实际模型调用成本实时扣减。</p></div></div><div className="plan-grid">{plans.map((plan) => <article className={plan.recommended ? "plan-card recommended" : "plan-card"} key={plan.name}>{plan.recommended && <span className="recommend-label">推荐</span>}<span>{plan.name}</span><strong>¥{plan.price}</strong><b>{plan.tokens}</b><p>{plan.note}</p><ul><li><Check size={15} />所有模型通用</li><li><Check size={15} />额度永久有效</li><li><Check size={15} />完整调用日志</li></ul><button className={plan.recommended ? "primary-button full-button" : "secondary-button full-button"} type="button" onClick={() => { setSelected(plan); setOpen(true); }}>立即充值</button></article>)}</div></section>
    <section className="panel data-panel"><div className="panel-header"><div><h2>账单记录</h2><p>支付成功后可下载电子账单。</p></div></div><div className="table-scroll"><table><thead><tr><th>账单编号</th><th>日期</th><th>类型</th><th>金额</th><th>状态</th><th>账单</th></tr></thead><tbody>{invoices.map((invoice) => <tr key={invoice.id}><td><code>{invoice.id}</code></td><td>{invoice.date}</td><td>{invoice.type}</td><td><b>{invoice.amount}</b></td><td><span className="status 成功">{invoice.status}</span></td><td><button className="text-button" type="button"><Download size={15} />下载</button></td></tr>)}</tbody></table></div></section>
    <Modal open={open} onClose={() => setOpen(false)} title={`确认购买${selected.name}`} description={`${selected.tokens} 调用额度将在支付完成后立即到账。`}><div className="payment-summary"><span>充值金额</span><strong>¥{selected.price}.00</strong><p>支付方式：企业支付宝</p></div><div className="modal-actions"><button className="secondary-button" type="button" onClick={() => setOpen(false)}>取消</button><button className="primary-button" type="button" onClick={pay}>确认支付</button></div></Modal><Toast message={toast} />
  </>;
}
