import type { SectorRecord, SectorSlug } from "./types";
import { SECTOR_SLUGS } from "./types";

export { SECTOR_SLUGS };

export const SECTORS: Record<SectorSlug, SectorRecord> = {
  bancos: {
    slug: "bancos",
    name: "Bancos",
    intro:
      "O setor bancário na B3 concentra grandes instituições de crédito e serviços financeiros com histórico de distribuição de lucros aos acionistas. Bancos costumam combinar dividendos e juros sobre capital próprio (JCP), o que altera a forma como o investidor tributa e acompanha os proventos.",
    dividendRelevance:
      "Para quem busca renda recorrente, bancos costumam ser um dos primeiros setores analisados por combinar escala, regulação conhecida e políticas de retorno ao acionista relativamente previsíveis — ainda assim, margens, inadimplência e o ciclo de juros mudam muito o cenário. Comparar dividend yield entre pares do mesmo setor ajuda a contextualizar, mas não substitui análise de fundamentos.",
    faqs: [
      {
        question: "Por que bancos pagam tantos proventos?",
        answer:
          "Muitos bancos listados têm política explícita de retorno ao acionista e usam dividendos e JCP para distribuir parte do lucro. O valor e a frequência dependem de resultado, Basel e orientação do Banco Central.",
      },
      {
        question: "Dividendo e JCP são a mesma coisa?",
        answer:
          "Não. Ambos são formas de retorno ao investidor, mas têm tratamentos contábil e tributário diferentes. Na prática, muitos investidores somam o fluxo recebido, mas é importante entender o tipo de provento ao declarar imposto.",
      },
      {
        question: "O dividend yield dos bancos é estável?",
        answer:
          "Não há garantia. O yield sobe quando o preço cai ou quando os proventos aumentam, e cai no caso inverso. Use o Simula Dividendos para simular com base em histórico, lembrando que o passado não repete o futuro.",
      },
    ],
  },
  energia: {
    slug: "energia",
    name: "Energia elétrica",
    intro:
      "Empresas de geração, transmissão e comercialização de energia elétrica costumam ter contratos e regulação que influenciam fluxo de caixa e distribuição de resultados. Na B3, há nomes ligados a concessões, renováveis e infraestrutura.",
    dividendRelevance:
      "Investidores de dividendos frequentemente olham utilities e transmissão por buscarem visibilidade de receita contratada — mas revisões tarifárias, hidrologia (quando há geração hidráulica no mix) e políticas de CAPEX podem mudar o ritmo dos proventos.",
    faqs: [
      {
        question: "Empresas de energia são defensivas?",
        answer:
          "Muitas têm perfil mais previsível que setores cíclicos, mas ainda assim há risco regulatório, operacional e financeiro. O histórico de dividendos não garante o próximo pagamento.",
      },
      {
        question: "O que é um ticker terminado em 11?",
        answer:
          "Na B3, sufixos como 11 costumam indicar units ou recibos compostos por mais de um tipo de papel. Leia sempre o prospecto e o comunicado da companhia para entender a estrutura.",
      },
      {
        question: "Como simular dividendos de uma elétrica?",
        answer:
          "Informe o ticker na calculadora do Simula Dividendos e a quantidade de cotas. Os valores são estimativas a partir de dados públicos/histórico, sem promessa de rendimento.",
      },
    ],
  },
  mineracao: {
    slug: "mineracao",
    name: "Mineração",
    intro:
      "A mineração brasileira é marcada por empresas globais em minério de ferro e outros metais. O setor é fortemente cíclico: preço de commodities, demanda internacional e custos operacionais movem lucros e, consequentemente, políticas de dividendos.",
    dividendRelevance:
      "Em anos de superávit de caixa e preços altos, é comum ver dividendos extraordinários ou políticas agressivas de retorno; em viradas de ciclo, a empresa pode reduzir proventos para preservar balanço. Por isso o yield pode parecer alto em certos momentos sem que isso seja sustentável para sempre.",
    faqs: [
      {
        question: "Por que o dividend yield da mineração oscila tanto?",
        answer:
          "Porque o preço da ação e os pagamentos variam com o ciclo de commodities. Um yield alto pode refletir queda forte do papel ou um ano excepcional de distribuição.",
      },
      {
        question: "Vale comparar mineração com bancos só pelo yield?",
        answer:
          "Comparar yield entre setores diferentes costuma ser enganoso. O risco, a volatilidade e a previsibilidade dos fluxos são bem diferentes.",
      },
      {
        question: "Onde vejo o histórico de proventos?",
        answer:
          "Use a página do ticker no Simula Dividendos e a calculadora para estimativas. Para dados oficiais, consulte RI da companhia e comunicados à CVM.",
      },
    ],
  },
  petroleo: {
    slug: "petroleo",
    name: "Petróleo e gás",
    intro:
      "O setor de petróleo e gás na B3 é dominado pela Petrobras, empresa de capital misto com forte peso no Ibovespa. Resultados e política de dividendos estão ligados ao preço do barril, câmbio, produção e decisões estratégicas da companhia.",
    dividendRelevance:
      "Em períodos de preço de petróleo favorável e geração de caixa, a empresa pode elevar retorno aos acionistas; em cenários adversos, a prioridade pode ser dívida e investimento. Acompanhar comunicados ao mercado é essencial.",
    faqs: [
      {
        question: "A Petrobras sempre paga o mesmo dividendo?",
        answer:
          "Não. A companhia divulga políticas e previsões, mas os valores dependem de lucro, caixa e aprovação em assembleias. Simulações passadas não garantem o futuro.",
      },
      {
        question: "Petrobras é uma ação para renda fixa?",
        answer:
          "É ação de empresa cíclica e sujeita a riscos políticos e de commodities. Não deve ser tratada como substituto de renda fixa.",
      },
      {
        question: "Como estimar quanto recebo por cota?",
        answer:
          "Use o Simula Dividendos com o ticker PETR4 (ou outro) e informe quantas cotas você possui. O resultado é estimativa educacional.",
      },
    ],
  },
};

export function isSectorSlug(s: string): s is SectorSlug {
  return (SECTOR_SLUGS as readonly string[]).includes(s);
}
