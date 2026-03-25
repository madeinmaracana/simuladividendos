/**
 * Modelo de dados para página de ticker (documentação + futura integração CMS).
 * Valores de mercado e proventos vêm da API; estes tipos descrevem o formato esperado.
 */
export type DividendStatus = "pago" | "anunciado" | "estimado" | "desconhecido";

export type TickerDividendEvent = {
  amountPerShare: number;
  currency: string;
  status: DividendStatus;
  type: string;
  /** Data ex (com data quando a fonte fornecer). */
  exDate?: string | null;
  paymentDate: string;
};

export type TickerDividendHistoryRow = {
  amountPerShare: number;
  type: string;
  status: DividendStatus;
  exDate?: string | null;
  paymentDate: string;
};

/** Estrutura alvo (JSON) — campos opcionais para evolução. */
export type TickerStructuredProfile = {
  ticker: string;
  slug: string;
  companyName: string;
  sector: string;
  description: string;
  paymentFrequency?: string;
  lastDividend?: TickerDividendEvent;
  nextDividend?: TickerDividendEvent;
  history?: TickerDividendHistoryRow[];
};
