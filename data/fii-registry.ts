/**
 * Fonte central para SEO programático de **FIIs** (`/fiis/[slug]` — ticker ou variações de intenção).
 *
 * Não nomeamos este arquivo `data/fiis.ts` para não colidir com o pacote `@/data/fiis` (pasta + `index.ts`).
 * Campos principais: `ticker`, `fundName`, `shortDescription`, `paymentFrequency`, `faqs`, etc. (ver {@link FiiSeoDefinition}).
 *
 * Proventos exibidos na página vêm da API; estes campos são contexto editorial e FAQ.
 */
import type { FiiSeoDefinition } from "./fiis/types";
import {
  FII_TICKERS_PAGA_QUANTO_POR_MES,
  FII_VARIANT_PAGA_QUANTO_POR_MES,
  fiiMainSlug,
  fiiVariantSlug,
} from "@/lib/fiis/fii-slug";

export type { FiiSeoDefinition as FiiProgrammaticRecord } from "./fiis/types";

export function fiiToSlug(ticker: string): string {
  return ticker.trim().toUpperCase();
}

export function fiiPagePath(ticker: string): string {
  return `/fiis/${encodeURIComponent(fiiToSlug(ticker))}`;
}

/** Lista para `generateStaticParams` em `app/fiis/[slug]` (principal + landings por ticker). */
export function buildAllFiiSlugStaticParams(): { slug: string }[] {
  const allow = new Set(FII_TICKERS_PAGA_QUANTO_POR_MES.map((x) => x.toUpperCase()));
  const out: { slug: string }[] = [];
  for (const d of FII_DEFINITIONS) {
    const t = d.ticker.trim().toUpperCase();
    out.push({ slug: fiiMainSlug(t) });
    if (allow.has(t)) {
      out.push({ slug: fiiVariantSlug(t, FII_VARIANT_PAGA_QUANTO_POR_MES) });
    }
  }
  return out;
}

export const buildAllFiiStaticParams = buildAllFiiSlugStaticParams;

export const FII_DEFINITIONS: FiiSeoDefinition[] = [
  {
    ticker: "MXRF11",
    lastModified: "2026-03-25",
    fundName: "Maxi Renda",
    shortDescription:
      "Fundo de investimento imobiliário com foco em ativos de renda (papéis, CRIs e estruturas correlatas, conforme política do fundo). Costuma ser citado por investidores que buscam fluxo recorrente na bolsa.",
    paymentFrequency:
      "A distribuição de rendimentos segue o calendário e a política do fundo, em geral com periodicidade mensal — confira sempre o informe mensal e o site do administrador.",
    historySummary:
      "O histórico de rendimentos reflete a carteira e o cenário de juros e crédito. Valores passados não repetem necessariamente o futuro; leia os relatórios do gestor.",
    faqs: [
      {
        question: "MXRF11 paga todo mês?",
        answer:
          "Muitos FIIs visam distribuição mensal, mas o calendário e o valor dependem do regulamento e do resultado do fundo. Use esta página como apoio educacional e confirme no canal oficial.",
      },
      {
        question: "Rendimento de FII é dividendo de ação?",
        answer:
          "Não. FIIs distribuem rendimentos de acordo com a legislação e o tipo de fundo; a tributação e os rótulos diferem de dividendos de companhias.",
      },
    ],
  },
  {
    ticker: "HGLG11",
    lastModified: "2026-03-25",
    fundName: "CSHG Logística",
    shortDescription:
      "FII com ênfase em ativos logísticos e renda recorrente ligada a contratos de locação. Útil para quem estuda exposição a galpões e infraestrutura de armazenagem no Brasil.",
    paymentFrequency:
      "Periodicidade habitualmente mensal, conforme política do fundo e disponibilidade de caixa; verifique comunicados do administrador.",
    historySummary:
      "A série histórica de proventos acompanha ocupação, revisões de aluguel e cenário macro. Volatilidade e vacância podem afetar distribuições.",
    faqs: [
      {
        question: "Como simular quanto recebo com HGLG11?",
        answer:
          "Informe o número de cotas no simulador. A renda mensal exibida usa média simples com base nos pagamentos dos últimos 12 meses nos dados disponíveis — é estimativa educacional.",
      },
    ],
  },
  {
    ticker: "XPLG11",
    lastModified: "2026-03-25",
    fundName: "XP Log",
    shortDescription:
      "Fundo imobiliário com foco em logística e renda contratual. Adequado para quem acompanha o setor de galpões e a qualidade dos inquilinos.",
    paymentFrequency:
      "Em geral mensal; datas e valores dependem do regulamento e dos resultados do fundo.",
    faqs: [],
  },
  {
    ticker: "KNCR11",
    lastModified: "2026-03-25",
    fundName: "Kinea Rendimentos Imobiliários",
    shortDescription:
      "FII com perfil de renda e gestão ativa; interessante para quem quer comparar cenários de fluxo com outros papéis da mesma categoria.",
    paymentFrequency:
      "Costuma haver distribuições periódicas; confirme no site do administrador e nos informes mensais.",
    faqs: [],
  },
  {
    ticker: "VGHF11",
    lastModified: "2026-03-25",
    fundName: "Valora Hedge Fund",
    shortDescription:
      "Fundo imobiliário com mandato que pode combinar estratégias e ativos conforme regulamento e política do gestor. Indicado para leitores que já distinguem FII de renda pura de fundos com componentes táticos — sempre confira o documento do fundo.",
    paymentFrequency:
      "Calendário e valores dependem do regulamento e das decisões do administrador; verifique informes e site oficial.",
    historySummary:
      "A série de rendimentos pode variar mais que em FIIs de tijolo tradicional, conforme estratégia e mercado. Use o histórico desta página como referência educacional, não como promessa de repetição.",
    faqs: [
      {
        question: "VGHF11 é igual a um FII de galpões?",
        answer:
          "Não necessariamente. O nome e o regulamento definem o que o fundo pode fazer. Leia a lâmina e os relatórios do gestor antes de comparar com HGLG11 ou XPLG11.",
      },
    ],
  },
  {
    ticker: "KNRI11",
    lastModified: "2026-03-25",
    fundName: "Kinea Renda Imobiliária",
    shortDescription:
      "FII com foco em renda imobiliária, frequentemente citado em debates de fluxo mensal na bolsa. A composição da carteira e o risco mudam conforme os ativos administrados — acompanhe relatórios mensais.",
    paymentFrequency:
      "Em muitos casos há periodicidade mensal, mas datas e valores dependem do regulamento e do resultado do fundo.",
    historySummary:
      "O histórico reflete cenário de taxas, crédito imobiliário e gestão da carteira. Compare com KNCR11 e outros pares usando a calculadora e os dados oficiais do administrador.",
    faqs: [
      {
        question: "KNRI11 e KNCR11 são o mesmo fundo?",
        answer:
          "São tickers diferentes com prospectos e políticas próprios. Compare regulamentos, taxas e carteiras no site do administrador.",
      },
    ],
  },
];
