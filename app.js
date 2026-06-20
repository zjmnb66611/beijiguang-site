const body = document.body;
const toast = document.querySelector("#toast");
const balanceText = document.querySelector("#balanceText");
const introBalance = document.querySelector("#introBalance");
const apiKeyText = document.querySelector("#apiKeyText");
const logList = document.querySelector("#logList");
const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");
const passwordInput = document.querySelector("#passwordInput");
const togglePassword = document.querySelector("#togglePassword");
const modelButtons = [...document.querySelectorAll("[data-model]")];
let balance = 2486.5;
let toastTimer = 0;
let selectedModel = "auto-best";

function money(value) {
  return `¥${value.toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1900);
}

function syncBalance() {
  const formatted = money(balance);
  balanceText.textContent = formatted;
  introBalance.textContent = formatted;
}

function addLog(type, detail) {
  const row = document.createElement("div");
  const time = new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  row.innerHTML = `<span>${time}</span><b>${type}</b><em>${detail}</em>`;
  logList.prepend(row);
  while (logList.children.length > 5) logList.lastElementChild.remove();
}

function closeMenu() {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

function openConsole(message = "已进入北极光控制台") {
  body.classList.remove("intro-mode");
  body.classList.add("console-mode");
  closeMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast(message);
}

function backToIntro() {
  body.classList.remove("console-mode");
  body.classList.add("intro-mode");
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("已返回首页");
}

function addRipple(event) {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple-wave";
  target.style.setProperty("--ripple-x", `${event.clientX - rect.left}px`);
  target.style.setProperty("--ripple-y", `${event.clientY - rect.top}px`);
  target.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 620);
}

document.querySelectorAll("button, .hero-actions a").forEach((control) => {
  control.addEventListener("pointerdown", addRipple);
});

document.querySelectorAll("[data-open-console]").forEach((button) => {
  button.addEventListener("click", () => openConsole("欢迎进入北极光控制台"));
});

document.querySelector("#loginForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const account = document.querySelector("#accountInput")?.value.trim() || "演示账户";
  openConsole(`${account} 登录成功`);
});

document.querySelector("#backToIntro")?.addEventListener("click", backToIntro);

menuButton?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navLinks?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

togglePassword?.addEventListener("click", () => {
  const revealing = passwordInput.type === "password";
  passwordInput.type = revealing ? "text" : "password";
  togglePassword.setAttribute("aria-label", revealing ? "隐藏密码" : "显示密码");
  togglePassword.innerHTML = `<i data-lucide="${revealing ? "eye-off" : "eye"}"></i>`;
  window.lucide?.createIcons();
});

document.querySelector("#forgotPassword")?.addEventListener("click", () => {
  showToast("演示站暂未接入密码找回服务");
});

document.querySelector("#serviceStatus")?.addEventListener("click", () => {
  showToast("全部服务运行正常，可用率 99.9%");
});

document.querySelectorAll("[data-recharge]").forEach((button) => {
  button.addEventListener("click", () => {
    const amount = Number(button.dataset.recharge);
    balance += amount;
    syncBalance();
    document.querySelectorAll("[data-recharge]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    addLog("recharge", `充值成功 · ${money(amount)}`);
    showToast(`充值成功，余额增加 ${money(amount)}`);
  });
});

document.querySelector("#newKey")?.addEventListener("click", () => {
  const suffix = Math.random().toString(16).slice(2, 8);
  apiKeyText.textContent = `bjg_live_cn_${suffix}_aurora`;
  addLog("api-key", "新 Key 已生成");
  showToast("新的 API Key 已生成");
});

modelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedModel = button.dataset.model;
    modelButtons.forEach((item) => item.classList.toggle("active", item === button));
    addLog("route", `${selectedModel} 已启用`);
    showToast(`模型路由切换为 ${button.textContent.trim()}`);
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("load", () => {
  window.lucide?.createIcons();
  syncBalance();
});
