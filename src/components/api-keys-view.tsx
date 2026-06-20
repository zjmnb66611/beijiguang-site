"use client";

import { Copy, KeyRound, MoreHorizontal, Plus, Power, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { Toast } from "@/components/toast";
import { ApiKeyRecord, initialApiKeys } from "@/lib/mock-data";

export function ApiKeysView() {
  const [keys, setKeys] = useState<ApiKeyRecord[]>(initialApiKeys);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("生产应用");
  const [qps, setQps] = useState(20);
  const [toast, setToast] = useState("");

  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(""), 2200); }
  function createKey() {
    const suffix = Math.random().toString(16).slice(2, 10);
    setKeys((items) => [{ id: `key_${suffix}`, name, prefix: `bjg_live_cn_${suffix}••••`, created: "2026-06-20", lastUsed: "尚未使用", qps, dailyLimit: "50,000", status: "启用" }, ...items]);
    setModalOpen(false); notify("API Key 创建成功，请妥善保存");
  }
  function toggleKey(id: string) { setKeys((items) => items.map((item) => item.id === id ? { ...item, status: item.status === "启用" ? "停用" : "启用" } : item)); notify("Key 状态已更新"); }

  return <>
    <div className="page-heading"><div><span className="eyebrow">访问控制</span><h1>API Keys</h1><p>为不同环境创建独立密钥，并控制 QPS、模型权限与调用额度。</p></div><button className="primary-button" type="button" onClick={() => setModalOpen(true)}><Plus size={17} />创建 API Key</button></div>
    <section className="stat-strip"><div><KeyRound size={20} /><span>密钥总数<strong>{keys.length}</strong></span></div><div><Power size={20} /><span>启用中<strong>{keys.filter((item) => item.status === "启用").length}</strong></span></div><div><ShieldCheck size={20} /><span>IP 白名单<strong>2 个 Key</strong></span></div></section>
    <section className="panel data-panel"><div className="panel-header"><div><h2>密钥列表</h2><p>完整密钥仅在创建时展示一次。</p></div><div className="search-control"><input aria-label="搜索密钥" placeholder="搜索名称或前缀" /></div></div><div className="table-scroll"><table><thead><tr><th>名称</th><th>Key 前缀</th><th>状态</th><th>QPS</th><th>日调用限制</th><th>最后使用</th><th>创建时间</th><th aria-label="操作" /></tr></thead><tbody>{keys.map((key) => <tr key={key.id}><td><b>{key.name}</b></td><td><div className="key-copy"><code>{key.prefix}</code><button className="icon-button small" type="button" aria-label="复制 Key 前缀" onClick={() => { navigator.clipboard.writeText(key.prefix); notify("已复制 Key 前缀"); }}><Copy size={14} /></button></div></td><td><button className={`status-toggle ${key.status}`} type="button" onClick={() => toggleKey(key.id)}><i />{key.status}</button></td><td>{key.qps}</td><td>{key.dailyLimit}</td><td>{key.lastUsed}</td><td>{key.created}</td><td><div className="row-actions"><button className="icon-button small" type="button" aria-label="更多设置"><MoreHorizontal size={16} /></button><button className="icon-button small danger" type="button" aria-label="删除 Key" onClick={() => { setKeys((items) => items.filter((item) => item.id !== key.id)); notify("Key 已删除"); }}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div></section>
    <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="创建 API Key" description="创建后可以继续配置模型权限、IP 白名单与额度。"><div className="form-grid"><label className="field-label">Key 名称<input value={name} onChange={(event) => setName(event.target.value)} /></label><label className="field-label">QPS 限制<input type="number" min="1" max="1000" value={qps} onChange={(event) => setQps(Number(event.target.value))} /></label><label className="field-label full-field">允许模型<select defaultValue="all"><option value="all">全部可用模型</option><option>仅低成本模型</option><option>自定义模型</option></select></label><label className="check-row full-field"><input type="checkbox" defaultChecked /><span>启用异常流量自动封禁</span></label></div><div className="modal-actions"><button className="secondary-button" type="button" onClick={() => setModalOpen(false)}>取消</button><button className="primary-button" type="button" onClick={createKey} disabled={!name.trim()}>创建 Key</button></div></Modal>
    <Toast message={toast} />
  </>;
}
