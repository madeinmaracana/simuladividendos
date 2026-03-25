import type { FiiSeoRecord } from "@/data/fiis";
import type { FaqItem } from "@/data/stocks";
import { formatBRL, formatDatePt } from "@/lib/format";
import type { PerShareSnapshot } from "@/lib/ticker-page/derive";

export function generateFiiTitle(symbol: string): string {
  return `${symbol} rendimentos: quanto paga e simulação`;
}

export function generateFiiDescription(symbol: string): string {
  return `Simule quanto o ${symbol} pagaria por mês com suas cotas, veja o último rendimento e o histórico recente. FII na B3 — ferramenta educacional, sem recomendação de investimento.`;
}

export function buildFiiPageFaqs(
  symbol: string,
  mock: FiiSeoRecord | null,
  last: PerShareSnapshot | null,
  frequencyLabel: string | null,
  currency: string
): FaqItem[] {
  const base = mock?.faqs?.length ? [...mock.faqs] : [];

  const pays: FaqItem = {
    question: `${symbol} paga rendimentos?`,
    answer: last
      ? `Sim, há registro de distribuição nos dados utilizados nesta página. Valores e datas futuras dependem do fundo e do regulamento — não são garantidos.`
      : `Não há registro suficiente nos dados para descrever pagamentos aqui. Consulte o administrador e os informes do fundo.`,
  };

  const lastQ: FaqItem = {
    question: `Qual foi o último rendimento por cota do ${symbol}?`,
    answer: last
      ? `Na última data identificável nos dados, o valor de referência foi de ${formatBRL(last.amountPerShare, currency)} por cota, com pagamento em ${formatDatePt(last.paymentDate)}.`
      : `Não foi possível identificar o último pagamento com as informações atuais.`,
  };

  const simQ: FaqItem = {
    question: `Como simular renda mensal com ${symbol}?`,
    answer: `Informe quantas cotas você possui. Multiplicamos o histórico de proventos por cota pelo seu número de cotas e mostramos uma média mensal de referência (total dos últimos ~12 meses ÷ 12) — uso educacional.`,
  };

  const freqQ: FaqItem | null = frequencyLabel
    ? {
        question: `${symbol} costuma pagar com que frequência?`,
        answer: `Pelas datas disponíveis no histórico, o ritmo observado é ${frequencyLabel}. Confirme sempre no regulamento e nos comunicados oficiais do fundo.`,
      }
    : mock?.paymentFrequency && mock.paymentFrequency.length < 220
      ? {
          question: `${symbol} costuma pagar com que frequência?`,
          answer: `${mock.paymentFrequency}`,
        }
      : null;

  const generic: FaqItem[] = [
    {
      question: "Rendimento de FII é igual a dividendo?",
      answer:
        "Não. FIIs distribuem rendimentos conforme regras próprias; tributação e nomenclatura diferem de dividendos de ações. Busque assessoria se precisar de detalhes fiscais.",
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
