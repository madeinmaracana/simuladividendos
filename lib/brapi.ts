import type { DividendEntry, StockQuote } from "./types";

const BRAPI_BASE = "https://brapi.dev/api";

interface BrapiCashDividend {
  paymentDate: string;
  rate: number;
  label: string;
}

interface BrapiResult {
  symbol?: string;
  shortName?: string;
  longName?: string;
  logourl?: string;
  currency?: string;
  regularMarketPrice?: number;
  dividends?: Array<{ date?: string; paymentDate?: string; amount?: number; rate?: number }>;
  dividendsData?: {
    cashDividends?: BrapiCashDividend[];
  };
}

interface BrapiQuoteResponse {
  results?: BrapiResult[];
  error?: string | boolean;
  message?: string;
  code?: string;
}

function normalizeDividends(raw: BrapiResult): DividendEntry[] {
  const cash = raw.dividendsData?.cashDividends;
  if (cash?.length) {
    return cash.map((d) => ({
      paymentDate: d.paymentDate,
      ratePerShare: d.rate,
      label: d.label ?? "—",
    }));
  }

  const legacy = raw.dividends;
  if (legacy?.length) {
    return legacy.map((d) => ({
      paymentDate: d.paymentDate ?? d.date ?? "",
      ratePerShare: d.rate ?? d.amount ?? 0,
      label: "Dividendo",
    }));
  }

  return [];
}

export class BrapiError extends Error {
  constructor(
    message: string,
    public status: number = 400
  ) {
    super(message);
    this.name = "BrapiError";
  }
}

function sanitizeTicker(ticker: string): string {
  const t = ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!t || t.length > 10) {
    throw new BrapiError("Ticker inválido.", 400);
  }
  return t;
}

export interface TickerSuggestion {
  symbol: string;
  name: string;
  logoUrl?: string | null;
}

interface BrapiListResponse {
  stocks?: Array<{ stock: string; name: string; logo?: string }>;
}

/** Busca tickers na listagem brapi (ações ordinárias). */
export async function searchTickerSuggestions(query: string): Promise<TickerSuggestion[]> {
  const q = query.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (q.length < 2) return [];

  const url = new URL(`${BRAPI_BASE}/quote/list`);
  url.searchParams.set("search", q);
  url.searchParams.set("limit", "15");
  url.searchParams.set("type", "stock");
  const token = process.env.BRAPI_TOKEN;
  if (token) {
    url.searchParams.set("token", token);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const json = (await res.json()) as BrapiListResponse;
  const stocks = json.stocks ?? [];

  return stocks
    .filter((s) => s.stock && !s.stock.endsWith("F"))
    .slice(0, 10)
    .map((s) => ({
      symbol: s.stock,
      name: s.name ?? s.stock,
      logoUrl:
        typeof s.logo === "string" && s.logo.startsWith("http") ? s.logo : null,
    }));
}

export async function getStockData(ticker: string): Promise<StockQuote> {
  const symbol = sanitizeTicker(ticker);

  const url = new URL(`${BRAPI_BASE}/quote/${symbol}`);
  url.searchParams.set("dividends", "true");
  const token = process.env.BRAPI_TOKEN;
  if (token) {
    url.searchParams.set("token", token);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  const json = (await res.json()) as BrapiQuoteResponse;

  if (!res.ok) {
    if (res.status === 401 && json.code === "MISSING_TOKEN") {
      throw new BrapiError(
        "A brapi bloqueia este papel sem token: muitos tickers terminados em 3 (ON) ou alguns bancos só existem no plano pago. Crie um token em brapi.dev e defina BRAPI_TOKEN no .env.local, ou use o par que a API libera de graça (ex.: ITUB4 em vez de ITUB3).",
        401
      );
    }
    const msg =
      typeof json.message === "string" && json.message.trim()
        ? json.message
        : "Não foi possível buscar dados da API.";
    throw new BrapiError(msg, res.status);
  }

  if (json.error === true || (typeof json.error === "string" && json.error)) {
    throw new BrapiError(
      typeof json.error === "string" ? json.error : (json.message ?? "Erro retornado pela API."),
      404
    );
  }

  const row = json.results?.[0];
  if (!row) {
    throw new BrapiError("Ativo não encontrado. Verifique o ticker.", 404);
  }

  return {
    symbol: row.symbol ?? symbol,
    shortName: row.shortName ?? symbol,
    longName: row.longName,
    logoUrl:
      typeof row.logourl === "string" && row.logourl.startsWith("http") ? row.logourl : null,
    regularMarketPrice:
      typeof row.regularMarketPrice === "number" ? row.regularMarketPrice : null,
    currency: row.currency ?? "BRL",
    dividends: normalizeDividends(row),
  };
}
