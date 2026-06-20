export const usageData = [
  { date: "05-12", requests: 5100, cost: 392 },
  { date: "05-13", requests: 7720, cost: 598 },
  { date: "05-14", requests: 8110, cost: 674 },
  { date: "05-15", requests: 5220, cost: 384 },
  { date: "05-16", requests: 6830, cost: 531 },
  { date: "05-17", requests: 5190, cost: 412 },
  { date: "05-18", requests: 4480, cost: 357 },
  { date: "05-19", requests: 4760, cost: 382 },
  { date: "05-20", requests: 4130, cost: 318 },
  { date: "05-21", requests: 5480, cost: 445 },
  { date: "05-22", requests: 9010, cost: 756 },
  { date: "05-23", requests: 8240, cost: 648 },
  { date: "05-24", requests: 5660, cost: 414 },
  { date: "05-25", requests: 6820, cost: 523 },
];

export const providerCosts = [
  { name: "OpenAI / GPT-4o", value: 39.2, amount: 2685.31, color: "#07966f" },
  { name: "Anthropic / Claude 3.5", value: 22.7, amount: 1554.79, color: "#258dc3" },
  { name: "DeepSeek / DeepSeek-V3", value: 16.8, amount: 1150.34, color: "#4b6ee8" },
  { name: "智谱 / GLM-4", value: 10.4, amount: 712.31, color: "#18b9b2" },
  { name: "通义 / Qwen-2.5", value: 7.6, amount: 519.08, color: "#5da7e8" },
  { name: "其他", value: 3.3, amount: 221.72, color: "#aeb8c5" },
];

export type RequestLog = {
  id: string;
  time: string;
  provider: string;
  model: string;
  endpoint: string;
  status: "成功" | "失败" | "超时";
  latency: string;
  tokens: string;
  cost: string;
};

export const requestLogs: RequestLog[] = [
  { id: "req_01JZ8F4V9Q1X", time: "2026-06-20 14:22:31", provider: "OpenAI", model: "GPT-4o", endpoint: "POST /v1/chat/completions", status: "成功", latency: "582 ms", tokens: "1,245", cost: "¥0.0862" },
  { id: "req_01JZ8F3K8P7R", time: "2026-06-20 14:22:18", provider: "DeepSeek", model: "DeepSeek-V3", endpoint: "POST /v1/chat/completions", status: "成功", latency: "412 ms", tokens: "2,013", cost: "¥0.0417" },
  { id: "req_01JZ8F1M2T3C", time: "2026-06-20 14:21:44", provider: "Anthropic", model: "Claude 3.5", endpoint: "POST /v1/messages", status: "成功", latency: "723 ms", tokens: "1,876", cost: "¥0.1254" },
  { id: "req_01JZ8F0D6H9A", time: "2026-06-20 14:21:02", provider: "智谱", model: "GLM-4", endpoint: "POST /v1/chat/completions", status: "成功", latency: "531 ms", tokens: "987", cost: "¥0.0376" },
  { id: "req_01JZ8EZV4B2L", time: "2026-06-20 14:20:55", provider: "通义千问", model: "Qwen-2.5", endpoint: "POST /v1/chat/completions", status: "失败", latency: "—", tokens: "0", cost: "¥0.0000" },
  { id: "req_01JZ8EXR7K6N", time: "2026-06-20 14:19:42", provider: "Google", model: "Gemini 2.5", endpoint: "POST /v1/chat/completions", status: "超时", latency: "12,004 ms", tokens: "0", cost: "¥0.0000" },
  { id: "req_01JZ8EVQ5W4P", time: "2026-06-20 14:18:17", provider: "OpenAI", model: "GPT-4.1", endpoint: "POST /v1/chat/completions", status: "成功", latency: "644 ms", tokens: "3,842", cost: "¥0.2186" },
];

export type ApiKeyRecord = {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
  qps: number;
  dailyLimit: string;
  status: "启用" | "停用";
};

export const initialApiKeys: ApiKeyRecord[] = [
  { id: "key_01", name: "生产环境", prefix: "bjg_live_cn_8f24••••", created: "2026-05-18", lastUsed: "2 分钟前", qps: 50, dailyLimit: "100,000", status: "启用" },
  { id: "key_02", name: "内容工作流", prefix: "bjg_live_cn_4a91••••", created: "2026-06-02", lastUsed: "18 分钟前", qps: 20, dailyLimit: "50,000", status: "启用" },
  { id: "key_03", name: "测试环境", prefix: "bjg_test_cn_c32e••••", created: "2026-06-11", lastUsed: "3 天前", qps: 5, dailyLimit: "5,000", status: "停用" },
];

export const invoices = [
  { id: "BJG-2026-0601", date: "2026-06-01", type: "套餐充值", amount: "¥699.00", status: "已支付" },
  { id: "BJG-2026-0518", date: "2026-05-18", type: "账户充值", amount: "¥199.00", status: "已支付" },
  { id: "BJG-2026-0501", date: "2026-05-01", type: "套餐充值", amount: "¥699.00", status: "已支付" },
];
