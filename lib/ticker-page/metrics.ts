import { calculateDividends } from "@/lib/calculations";
import type { StockQuote } from "@/lib/types";
import { formatBRL, formatPercentBr } from "@/lib/format";

export type TickerOptionalMetrics = {
  dividendYieldPct: number | null;
  avgMonthlyPerShare: string | null;
  total12mPerShare: string | null;
};

/** Métricas derivadas só quando há preço e histórico de proventos — sem inventar valores. */
export function deriveOptionalMetrics(stock: StockQuote | null): TickerOptionalMetrics {
  if (!stock?.dividends?.length || stock.regularMarketPrice == null || stock.regularMarketPrice <= 0) {
    return { dividendYieldPct: null, avgMonthlyPerShare: null, total12mPerShare: null };
  }

  const calc = calculateDividends(stock.dividends, 1);
  if (calc.perShare12m <= 0) {
    return { dividendYieldPct: null, avgMonthlyPerShare: null, total12mPerShare: null };
  }

  const yieldPct = (calc.perShare12m / stock.regularMarketPrice) * 100;
  const avgMonthly = calc.monthlyAvgEstimate / 1;

  return {
    dividendYieldPct: Number.isFinite(yieldPct) ? yieldPct : null,
    avgMonthlyPerShare: formatBRL(avgMonthly, stock.currency),
    total12mPerShare: formatBRL(calc.perShare12m, stock.currency),
  };
}

export function formatYieldForDisplay(pct: number | null): string | null {
  if (pct == null || !Number.isFinite(pct)) return null;
  return formatPercentBr(pct, 2);
}
