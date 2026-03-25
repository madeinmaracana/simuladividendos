import type { FaqItem } from "@/data/stocks";

/** FAQ genérico para qualquer página de ticker (complementa FAQs do registry). */
export function genericTickerFaq(symbol: string): FaqItem[] {
  return [
    {
      question: `Como simular dividendos de ${symbol}?`,
      answer:
        "Use o simulador nesta página: informe a quantidade de cotas; os totais são atualizados automaticamente com base nos proventos da lista. O ticker costuma vir pré-preenchido se você abriu pelo link da ação.",
    },
    {
      question: "Os valores são garantidos?",
      answer:
        "Não. Dividendos dependem de decisão da companhia e de resultados futuros. O Simula Dividendos é ferramenta educacional.",
    },
    {
      question: "Onde encontro outros setores?",
      answer:
        "Visite a página de setores para navegar por bancos, energia, mineração e petróleo, com links para várias ações.",
    },
  ];
}

export function buildTickerFaqItems(mockFaqs: FaqItem[] | undefined, symbol: string): FaqItem[] {
  const base = mockFaqs?.length ? [...mockFaqs] : [];
  return [...base, ...genericTickerFaq(symbol)];
}
