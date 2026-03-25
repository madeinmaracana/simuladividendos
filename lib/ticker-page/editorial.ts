import type { StockSeoRecord } from "@/data/stocks";
import type { DividendEntry } from "@/lib/types";
import type { PerShareSnapshot } from "./derive";

export type TickerEditorialInput = {
  symbol: string;
  companyName: string;
  sectorLabel: string;
  mock: StockSeoRecord | null;
  last: PerShareSnapshot | null;
  next: PerShareSnapshot | null;
  frequencyHint: string | null;
  /** Texto editorial curto do registry (ex.: política de pagamento), quando existir. */
  paymentFrequencyNote?: string;
  dividends: DividendEntry[];
};

/**
 * 2–3 parágrafos educativos por ticker, só com base em dados/registry — sem promessas nem recomendações.
 * Exibidos abaixo do resumo numérico para reforçar contexto e tempo na página (SEO).
 */
export function generateTickerSummaryText(input: TickerEditorialInput): string[] {
  const {
    symbol,
    companyName,
    sectorLabel,
    mock,
    last,
    next,
    frequencyHint,
    paymentFrequencyNote,
    dividends,
  } = input;

  const count = dividends.length;
  const freq =
    frequencyHint ??
    (paymentFrequencyNote && paymentFrequencyNote.length < 160 ? paymentFrequencyNote.trim() : null);

  const p1 = `${companyName} (${symbol}) negocia na B3 no contexto do setor de ${sectorLabel}. Os valores desta página vêm da lista de proventos disponibilizada pela fonte de dados — não substituem comunicados oficiais, RI ou análise profissional.`;

  let p2: string;
  if (count >= 2 && freq) {
    const f = freq.endsWith(".") ? freq.slice(0, -1) : freq;
    p2 = `Pelo histórico de datas de pagamento presente na fonte, o ritmo observado é ${f}. Isso pode mudar com lucros, política de dividendos e assembleias; não indica compromisso futuro da companhia.`;
  } else if (mock?.paymentFrequency && mock.paymentFrequency.length < 220) {
    p2 = `${mock.paymentFrequency} Trate como contexto geral; o calendário e os valores efetivos dependem de decisões corporativas.`;
  } else if (last || next) {
    p2 = `Há registros de proventos na fonte para consulta. A frequência e o valor dos próximos pagamentos não são garantidos e devem ser confirmados em canais oficiais.`;
  } else {
    p2 = `Para este papel, a fonte não traz histórico suficiente neste momento para descrever padrão de pagamento aqui. Consulte a companhia e a CVM para informações oficiais.`;
  }

  const p3 = `Use o simulador acima para multiplicar o dividendo por ação (conforme a lista) pela sua quantidade de cotas. O resultado é uma estimativa educacional: dividendos reais dependem de decisões futuras e de você continuar titular nas datas relevantes.`;

  return [p1, p2, p3];
}
