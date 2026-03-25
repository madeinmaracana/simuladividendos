import type { FaqItem } from "@/data/stocks";
import type { AcaoUrlVariant } from "./acao-slug";
import { ACAO_TICKERS_QUANTO_PAGA_DIVIDENDOS, ACAO_URL_VARIANTS } from "./acao-slug";

export function acaoVariantsForTicker(symbol: string): AcaoUrlVariant[] {
  const u = symbol.trim().toUpperCase();
  return ACAO_URL_VARIANTS.filter(
    (v) => v !== "quanto-paga-dividendos" || ACAO_TICKERS_QUANTO_PAGA_DIVIDENDOS.includes(u)
  );
}

export function stockIntentHeroTitle(symbol: string, variant: "main" | AcaoUrlVariant): string {
  if (variant === "main") return `Dividendos de ${symbol}`;
  if (variant === "dividendos") return `${symbol}: dividendos por ação e histórico`;
  if (variant === "quanto-paga-dividendos") return `${symbol} quanto paga de dividendos?`;
  if (variant === "paga-quanto") return `${symbol} paga quanto em dividendos?`;
  return `Simular dividendos ${symbol}`;
}

export function stockIntentEditorialHeading(variant: "main" | AcaoUrlVariant): string {
  if (variant === "dividendos") return "Dividendos por ação e histórico";
  if (variant === "quanto-paga-dividendos") return "Quanto paga em dividendos por cota";
  if (variant === "paga-quanto") return "Quanto paga por cota";
  if (variant === "simulador") return "Simular dividendos com a lista de proventos";
  return "Contexto sobre dividendos";
}

export function mergeFaqByQuestion(lists: FaqItem[][]): FaqItem[] {
  const seen = new Set<string>();
  const out: FaqItem[] = [];
  for (const list of lists) {
    for (const item of list) {
      const k = item.question.trim().toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(item);
    }
  }
  return out;
}

/**
 * Frases extras por intenção (não repetem o bloco editorial genérico inteiro).
 * Incluem variações naturais: “quanto paga”, “simular dividendos”, “dividendos por ação”.
 */
export function stockIntentEditorialAddendum(
  variant: "main" | AcaoUrlVariant,
  symbol: string,
  displayName: string
): string[] {
  const who = `${displayName} (${symbol})`;

  if (variant === "main") {
    return [
      `Se a sua dúvida é quanto paga por ação, use o valor por cota da lista e o simulador ao lado para simular dividendos com a sua quantidade de papéis. Dividendos por ação mudam a cada anúncio — o passado não substitui comunicado oficial nem RI.`,
    ];
  }

  if (variant === "dividendos") {
    return [
      `Nesta página o foco é dividendos por ação e histórico: útil para comparar datas e valores de referência na fonte. Para ver quanto paga no seu bolso, multiplique o dividendo por cota pelas ações que você tem — ou use o simulador integrado.`,
      `Quem busca simular dividendos em outros cenários pode alterar a quantidade de cotas e revisar a tabela de proventos abaixo.`,
    ];
  }

  if (variant === "quanto-paga-dividendos") {
    return [
      `A pergunta “quanto paga de dividendos?” normalmente quer dizer: qual foi o último valor por cota anunciado e quanto isso vira na minha conta. O valor por ação está na lista abaixo; o total depende das suas cotas — use o simulador ao lado.`,
      `Empresas da B3 não garantem calendário nem valor fixo. O passado na fonte não substitui comunicado oficial nem RI.`,
    ];
  }

  if (variant === "paga-quanto") {
    return [
      `A pergunta “${symbol} paga quanto?” costuma significar: (1) quanto por ação na data do comunicado e (2) quanto cai na conta para a minha posição. O primeiro valor está na lista de dividendos por ação; o segundo você obtém ao simular dividendos com suas cotas.`,
      `Valores futuros não estão garantidos — a companhia pode alterar política, calendário e valores.`,
    ];
  }

  return [
    `Use esta página para simular dividendos de ${who}: informe quantas ações você possui e acompanhe como a lista de dividendos por ação se traduz em totais. Isso ajuda a entender quanto paga em termos de ordem de grandeza, não como promessa de renda.`,
  ];
}

/** FAQs adicionais por intenção (deduplicadas depois com as FAQs base). */
export function stockIntentExtraFaqs(
  variant: "main" | AcaoUrlVariant,
  symbol: string
): FaqItem[] {
  if (variant === "main") {
    return [
      {
        question: `O que são dividendos por ação em ${symbol}?`,
        answer:
          "É o valor de provento anunciado por cada ação (por cota). O total que você recebe depende de quantas ações você tem nas datas relevantes e do tipo de provento — confira sempre o comunicado oficial.",
      },
      {
        question: `Como saber quanto paga ${symbol} para mim?`,
        answer:
          "Multiplique o dividendo por ação informado na fonte pela sua quantidade de cotas, ou use o simulador desta página. Trate como estimativa educacional.",
      },
    ];
  }

  if (variant === "dividendos") {
    return [
      {
        question: `Onde vejo o histórico de dividendos por ação de ${symbol}?`,
        answer:
          "A tabela e a lista de proventos mais abaixo usam os dados disponibilizados pela integração. Para decisões reais, complemente com RI e CVM.",
      },
    ];
  }

  if (variant === "quanto-paga-dividendos") {
    return [
      {
        question: `${symbol} quanto paga de dividendos por cota?`,
        answer:
          "O valor de referência é o último (ou próximo) provento por ação mostrado na tabela desta página, conforme a fonte de dados. Multiplique pela sua quantidade de cotas ou use o simulador.",
      },
      {
        question: `Esse valor se repete todo mês?`,
        answer:
          "Não necessariamente. O ritmo depende da companhia e do tipo de provento. Use o histórico para ver padrão aproximado, sem tratar como promessa.",
      },
    ];
  }

  if (variant === "paga-quanto") {
    return [
      {
        question: `${symbol} paga quanto por mês?`,
        answer:
          "Ações da B3 raramente seguem um valor fixo mensal como conta de luz. O ritmo depende da companhia; some os proventos do período que você escolheu e divida pelos meses se quiser uma média educacional.",
      },
    ];
  }

  return [
    {
      question: `O simulador de ${symbol} substitui assessoramento?`,
      answer:
        "Não. Ele ajuda a visualizar dividendos por ação × quantidade de cotas. Planejamento tributário e de investimentos é outra camada.",
    },
  ];
}
