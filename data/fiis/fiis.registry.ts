/**
 * Registry de FIIs com conteúdo SEO. Para nova página: adicione um objeto aqui.
 * `generateStaticParams` em `app/fiis/[ticker]` e o sitemap leem `getAllMockFiiTickers()`.
 */
import type { FiiSeoDefinition } from "./types";

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
];
