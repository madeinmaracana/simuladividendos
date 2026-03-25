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
