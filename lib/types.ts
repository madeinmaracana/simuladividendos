export interface DividendEntry {
  paymentDate: string;
  ratePerShare: number;
  label: string;
  /** Data ex, quando a fonte informar (senão omitir ou usar “—” na UI). */
  exDate?: string;
}

export interface StockQuote {
  symbol: string;
  shortName: string;
  longName?: string;
  /** URL do ícone na brapi (geralmente SVG). */
  logoUrl?: string | null;
  /** Preço atual (ou mais recente) na fonte. */
  currentPrice?: number | null;
  /** ISO datetime: quando este dado foi montado/atualizado no servidor. */
  lastUpdated?: string;
  /** @deprecated Use `currentPrice`. Mantido por compatibilidade interna. */
  regularMarketPrice: number | null;
  currency: string;
  dividends: DividendEntry[];
}

export interface NextDividendEstimate {
  paymentDate: string;
  totalPerShare: number;
  totalForShares: number;
  isFuture: boolean;
}

export interface DividendCalculation {
  shares: number;
  perShare12m: number;
  total12mEstimate: number;
  monthlyAvgEstimate: number;
  annualEstimate: number;
  nextDividend: NextDividendEstimate | null;
  dividendsLast12m: DividendEntry[];
  recentDividends: DividendEntry[];
}
