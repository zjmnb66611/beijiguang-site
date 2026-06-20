import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/beijiguang-site" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isGithubPages ? { output: "export" as const } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGithubPages,
  images: {
    unoptimized: isGithubPages,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
