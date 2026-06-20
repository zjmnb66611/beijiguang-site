"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, EyeOff, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function createDemoSession() {
  document.cookie = "bjg_session=demo; Path=/; Max-Age=86400; SameSite=Lax";
}

export function LoginView() {
  const router = useRouter();
  const [account, setAccount] = useState("demo@beijiguang.cn");
  const [password, setPassword] = useState("beijiguang");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (document.cookie.includes("bjg_session=demo")) {
      router.replace("/dashboard");
    }
  }, [router]);

  function enterConsole() {
    createDemoSession();
    router.replace("/dashboard");
    router.refresh();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!account.trim() || !password.trim()) {
      setError("请输入账号和密码");
      return;
    }
    setSubmitting(true);
    window.setTimeout(enterConsole, 320);
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel" aria-label="北极光平台介绍">
        <a className="auth-brand" href={`${basePath}/login`}>
          <Image src={`${basePath}/assets/beijiguang-mark.svg`} width={46} height={46} alt="北极光" priority />
          <span><strong>北极光</strong><small>API Relay Platform</small></span>
        </a>
        <div className="auth-brand-copy">
          <span className="eyebrow">企业级 AI API 网关</span>
          <h1>统一管理你的<br />模型调用与成本</h1>
          <p>一个工作空间，完成路由、计费、密钥和日志管理。</p>
        </div>
        <div className="auth-trust-list">
          <span><ShieldCheck size={18} /><b>安全访问</b><small>Key 权限与流量保护</small></span>
          <span><KeyRound size={18} /><b>统一密钥</b><small>多个模型，一套接口</small></span>
          <span><CheckCircle2 size={18} /><b>运行正常</b><small>全部模型服务可用</small></span>
        </div>
        <p className="auth-copyright">© 2026 北极光 API Relay Platform</p>
      </section>

      <section className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <header><span>欢迎回来</span><h2>登录北极光控制台</h2><p>使用企业账号继续访问工作空间。</p></header>

          <label className="auth-field" htmlFor="account">
            <span>手机号或邮箱</span>
            <div><Mail size={17} /><input id="account" value={account} onChange={(event) => setAccount(event.target.value)} autoComplete="username" placeholder="请输入手机号或邮箱" /></div>
          </label>

          <label className="auth-field" htmlFor="password">
            <span>密码</span>
            <div><LockKeyhole size={17} /><input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" placeholder="请输入密码" /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "隐藏密码" : "显示密码"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
          </label>

          <div className="auth-options"><label><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>记住登录状态</span></label><button type="button" onClick={() => setError("演示站暂未接入密码找回服务")}>忘记密码？</button></div>
          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="primary-button auth-submit" type="submit" disabled={submitting}>{submitting ? "正在登录…" : <>登录并进入 <ArrowRight size={17} /></>}</button>
          <button className="secondary-button auth-guest" type="button" onClick={enterConsole}>游客体验</button>

          <p className="auth-demo-note">演示账号已预填，直接登录即可体验。</p>
        </form>
      </section>
    </main>
  );
}
