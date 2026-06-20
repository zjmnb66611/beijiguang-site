import "@fontsource-variable/noto-sans-sc";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "北极光 API Relay Platform",
  description: "统一管理 AI 模型路由、API Keys、调用日志与计费。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
