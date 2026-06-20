"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  CircleHelp,
  FileText,
  House,
  KeyRound,
  LogOut,
  Menu,
  Route,
  ReceiptText,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const navigation = [
  { href: "/dashboard", label: "概览", icon: House },
  { href: "/api-keys", label: "API Keys", icon: KeyRound },
  { href: "/logs", label: "调用日志", icon: FileText },
  { href: "/billing", label: "账单", icon: ReceiptText },
  { href: "/routing", label: "路由策略", icon: Route },
  { href: "/security", label: "安全设置", icon: ShieldCheck, disabled: true },
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    if (!document.cookie.includes("bjg_session=demo")) {
      router.replace("/login");
    }
  }, [router]);

  function logout() {
    document.cookie = "bjg_session=; Path=/; Max-Age=0; SameSite=Lax";
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="app-frame">
      <button
        className={sidebarOpen ? "mobile-backdrop show" : "mobile-backdrop"}
        aria-label="关闭导航"
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="brand-row">
          <Image src={`${basePath}/assets/beijiguang-mark.svg`} width={38} height={38} alt="北极光" priority />
          <div className="brand-text"><strong>北极光</strong><span>API Relay Platform</span></div>
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(false)} aria-label="关闭导航"><X size={19} /></button>
        </div>

        <nav className="sidebar-nav" aria-label="控制台主导航">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            if (item.disabled) {
              return <button key={item.href} className="nav-item disabled" type="button" title="企业版即将开放"><Icon size={19} /><span>{item.label}</span></button>;
            }
            return <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)} className={active ? "nav-item active" : "nav-item"}><Icon size={19} /><span>{item.label}</span></Link>;
          })}
        </nav>

        <div className="sidebar-spacer" />
        <div className="plan-summary">
          <span>当前套餐</span><strong>专业版 Pro</strong><small>有效期至 2026-06-30</small>
          <div className="quota-line"><span>已用额度</span><b>42%</b></div>
          <div className="progress-track"><i style={{ width: "42%" }} /></div>
        </div>
        <div className="support-links">
          <a href="https://github.com/zjmnb66611/beijiguang-site" target="_blank" rel="noreferrer"><BookOpen size={17} />文档中心</a>
          <button type="button"><CircleHelp size={17} />联系支持</button>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)} aria-label="打开导航"><Menu size={20} /></button>
            <div className="popover-anchor">
              <button className="workspace-switcher" type="button" onClick={() => setWorkspaceOpen((value) => !value)} aria-expanded={workspaceOpen}>
                <Building2 size={18} /><span>默认工作空间</span><ChevronDown size={15} />
              </button>
              {workspaceOpen && <div className="popover workspace-menu"><button className="selected" type="button">默认工作空间<small>专业版 Pro</small></button><button type="button">创建新工作空间</button></div>}
            </div>
          </div>
          <div className="topbar-actions">
            <span className="date-control">2026-06-07 ~ 2026-06-20</span>
            <div className="popover-anchor">
              <button className="icon-button notification-button" type="button" onClick={() => setNotificationsOpen((value) => !value)} aria-label="通知" aria-expanded={notificationsOpen}><Bell size={19} /><i>3</i></button>
              {notificationsOpen && <div className="popover notification-menu"><strong>通知</strong><p><b>余额提醒</b><span>账户余额低于 ¥3,000</span></p><p><b>路由已切换</b><span>Gemini 超时后切换至 DeepSeek</span></p><p><b>账单已生成</b><span>6 月账单可以查看了</span></p></div>}
            </div>
            <div className="popover-anchor">
              <button className="profile-button" type="button" onClick={() => setProfileOpen((value) => !value)} aria-expanded={profileOpen}><span>张</span><b>张伟</b><ChevronDown size={14} /></button>
              {profileOpen && <div className="popover profile-menu"><div><strong>张伟</strong><span>admin@aurora.cn</span></div><button type="button"><Settings size={16} />账户设置</button><button type="button" onClick={logout}><LogOut size={16} />退出登录</button></div>}
            </div>
          </div>
        </header>
        <main className="main-content">{children}</main>
        <footer className="app-footer"><span>© 2026 北极光 API Relay Platform</span><nav><a href="#">服务条款</a><a href="#">隐私政策</a><a href="#">计费说明</a><a href="#">状态页</a></nav><span className="system-ok"><i />系统状态：<b>正常</b></span></footer>
      </div>
    </div>
  );
}
