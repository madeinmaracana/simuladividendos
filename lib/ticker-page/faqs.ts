import type { FaqItem } from "@/data/stocks";
import type { StockSeoRecord } from "@/data/stocks";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { PerShareSnapshot } from "./derive";

export function buildTickerPageFaqs(
  symbol: string,
  mock: StockSeoRecord | null,
  last: PerShareSnapshot | null,
  next: PerShareSnapshot | null,
  frequencyLabel: string | null,
  currency: string
): FaqItem[] {
  const base = mock?.faqs?.length ? [...mock.faqs] : [];

  const pays: FaqItem = {
    question: `${symbol} paga dividendos?`,
    answer:
      last || next
        ? `A companhia costuma distribuir proventos ao acionista; os valores exibidos nesta página vêm da lista de dividendos retornada pela fonte de dados — não são garantia de pagamentos futuros.`
        : `Não há dados suficientes de proventos na fonte para afirmar o padrão de pagamento. Consulte a companhia e comunicados à CVM.`,
  };

  const lastQ: FaqItem = {
    question: `Qual foi o último dividendo de ${symbol}?`,
    answer: last
      ? `Pela última data identificável na fonte, o valor de referência foi de ${formatBRL(last.amountPerShare, currency)} por ação, com pagamento em ${formatDatePt(last.paymentDate)}.`
      : `Não foi possível identificar o último pagamento com base nas datas disponíveis na fonte.`,
  };

  const simQ: FaqItem = {
    question: `Como simular dividendos de ${symbol}?`,
    answer: `Informe a quantidade de ações no simulador e clique em “Simular dividendos”. O valor mostrado multiplica o dividendo por ação da lista pela sua quantidade — é uma estimativa educacional.`,
  };

  const freqQ: FaqItem | null = frequencyLabel
    ? {
        question: `${symbol} costuma pagar dividendos com qual frequência?`,
        answer: `Pelo histórico disponível na fonte, o ritmo é ${frequencyLabel}. Para a política oficial, consulte o site de relações com investidores da companhia.`,
      }
    : null;

  const generic: FaqItem[] = [
    {
      question: "Os valores são garantidos?",
      answer:
        "Não. Dividendos dependem de decisão da companhia e de resultados futuros. O Simula Dividendos é ferramenta educacional.",
    },
  ];

  const merged = [pays, lastQ, simQ, ...(freqQ ? [freqQ] : []), ...generic, ...base];

  const seen = new Set<string>();
  return merged.filter((item) => {
    if (seen.has(item.question)) return false;
    seen.add(item.question);
    return true;
  });
}
