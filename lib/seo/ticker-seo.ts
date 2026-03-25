import type { StockSeoRecord } from "@/data/stocks";
import type { FaqItem } from "@/data/stocks";
import type { PerShareSnapshot } from "@/lib/ticker-page/derive";
import { buildTickerPageFaqs } from "@/lib/ticker-page/faqs";

/** Título curto para `<title>` / Open Graph (o layout acrescenta ` | Simula Dividendos`). */
export function generateTickerTitle(symbol: string): string {
  return `${symbol} Dividendos: quanto paga e simulação`;
}

/** Meta description padrão da página de ticker. */
export function generateTickerDescription(symbol: string): string {
  return `Veja quanto a ${symbol} paga em dividendos, o último pagamento e simule quanto você receberia com determinada quantidade de ações. Ferramenta educacional na B3.`;
}

/** FAQ dinâmico por ticker (mesma lógica de {@link buildTickerPageFaqs}). */
export function generateTickerFAQ(
  symbol: string,
  mock: StockSeoRecord | null,
  last: PerShareSnapshot | null,
  next: PerShareSnapshot | null,
  frequencyLabel: string | null,
  currency: string
): FaqItem[] {
  return buildTickerPageFaqs(symbol, mock, last, next, frequencyLabel, currency);
}

export { generateTickerSummaryText } from "@/lib/ticker-page/editorial";
