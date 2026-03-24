/**
 * Dados editoriais/mock para páginas SEO (setores e ações).
 * Troque por API ou CMS quando quiser dados em tempo real.
 */

export const SECTOR_SLUGS = ["bancos", "energia", "mineracao", "petroleo"] as const;
export type SectorSlug = (typeof SECTOR_SLUGS)[number];

export type FaqItem = { question: string; answer: string };

export type SectorRecord = {
  slug: SectorSlug;
  /** Nome exibido, ex.: "Bancos" */
  name: string;
  intro: string;
  dividendRelevance: string;
  faqs: FaqItem[];
};

export type StockSeoRecord = {
  ticker: string;
  companyName: string;
  sectorSlug: SectorSlug;
  /** Rótulo do setor igual ao da página de setor */
  sectorLabel: string;
  shortDescription: string;
  /** Referência editorial para métricas exibidas na página SEO */
  dividendYieldPct: number;
  payoutPct: number;
  priceBrl: number;
  paymentFrequency: string;
  historySummary: string;
  worthFollowing: string;
  listDescription: string;
  faqs: FaqItem[];
};

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

const STOCKS_LIST: StockSeoRecord[] = [
  {
    ticker: "BBAS3",
    companyName: "Banco do Brasil",
    sectorSlug: "bancos",
    sectorLabel: "Bancos",
    shortDescription:
      "Banco do Brasil é uma instituição financeira de controle misto com atuação em varejo, agronegócio e atacado. É uma das maiores instituições do país e costuma ser acompanhada por investidores que buscam proventos no segmento de bancos.",
    dividendYieldPct: 6.8,
    payoutPct: 42,
    priceBrl: 58.4,
    paymentFrequency: "Remuneração ao acionista via dividendos e JCP, com calendário divulgado pela companhia (consulte RI).",
    historySummary:
      "O histórico de proventos do BBAS3 reflete ciclos de lucro, política de capital e cenário de juros no Brasil. Anos com forte resultado operacional costumam coincidir com distribuições mais expressivas; em momentos de maior cautela regulatória ou de mercado, o ritmo pode mudar. Comparar o total pago nos últimos 12 meses com o preço atual ajuda a contextualizar o dividend yield, mas não projeta o próximo ano.",
    worthFollowing:
      "Faz sentido acompanhar BBAS3 se você quer exposição a um banco com presença nacional, foco em agronegócio e histórico de retorno ao acionista — desde que aceite riscos de crédito, concorrência e interferência política em empresa com participação da União. Use a calculadora desta página para cruzar ticker, preço e histórico de dividendos com sua quantidade de cotas, e combine com análise de balanço e guidance.",
    listDescription:
      "Banco estatal de grande capilaridade; comum em carteiras focadas em dividendos do setor financeiro.",
    faqs: [
      {
        question: "BBAS3 é indicado só para dividendos?",
        answer:
          "Não existe recomendação única. Dividendos são apenas um dos fatores; volatilidade, governança e valuation também importam.",
      },
      {
        question: "Onde consulto o próximo pagamento?",
        answer:
          "Veja o site de RI do Banco do Brasil e comunicados à CVM. O Simula Dividendos mostra estimativas a partir de dados disponibilizados via API.",
      },
    ],
  },
  {
    ticker: "ITUB4",
    companyName: "Itaú Unibanco",
    sectorSlug: "bancos",
    sectorLabel: "Bancos",
    shortDescription:
      "Itaú Unibanco é um dos maiores bancos privados do Brasil, com atuação em varejo, corporate e produtos no exterior. É referência em escala e tecnologia no setor financeiro nacional.",
    dividendYieldPct: 7.2,
    payoutPct: 38,
    priceBrl: 36.2,
    paymentFrequency: "Política de dividendos e JCP conforme calendário da companhia; ver RI para datas e valores.",
    historySummary:
      "ITUB4 costuma aparecer em estudos de dividendos por combinar liquidez com histórico de distribuição. O perfil de proventos acompanha o lucro líquido, necessidade de capital e orientação do conselho. Em períodos de crescimento acelerado de crédito, a instituição pode equilibrar crescimento e retorno; em anos mais conservadores, o payout pode variar.",
    worthFollowing:
      "Acompanhar ITUB4 é relevante para quem quer um grande banco privado com diversificação de negócios e presença forte no varejo. Monitore inadimplência, spread e custo de risco além do dividend yield. A simulação nesta página ajuda a traduzir histórico em valores por cota, sem substituir planejamento fiscal ou de investimentos.",
    listDescription:
      "Maior banco privado do país; frequentemente citado em estratégias de buy and hold com foco em proventos.",
    faqs: [
      {
        question: "ITUB3 e ITUB4 são a mesma empresa?",
        answer:
          "Sim, papéis diferentes da mesma companhia (ordinária vs preferencial). Liquidez e preço diferem; confira qual negocia melhor para seu perfil.",
      },
      {
        question: "O yield do Itaú é o melhor entre bancos?",
        answer:
          "Depende da data e do preço. Compare pares no mesmo momento e leia fundamentos — yield alto pode refletir queda de preço, não só generosidade de dividendos.",
      },
    ],
  },
  {
    ticker: "PETR4",
    companyName: "Petrobras",
    sectorSlug: "petroleo",
    sectorLabel: "Petróleo e gás",
    shortDescription:
      "Petróleo Brasileiro S.A. (Petrobras) é a principal empresa de petróleo e gás do Brasil, com ativos de exploração, produção, refino e distribuição. É uma das ações mais negociadas da B3.",
    dividendYieldPct: 9.1,
    payoutPct: 55,
    priceBrl: 38.9,
    paymentFrequency: "Divulgado pela companhia conforme assembleias e política de retorno ao acionista; pode incluir dividendos ordinários e extraordinários.",
    historySummary:
      "PETR4 teve fases de baixa distribuição e fases de retorno elevado ao acionista, ligadas a preço do petróleo, alavancagem e decisões estratégicas. O histórico recente não deve ser lido como promessa: commodities e decisões corporativas mudam rapidamente o quadro de proventos.",
    worthFollowing:
      "PETR4 concentra exposição ao petróleo e ao debate sobre energia no Brasil. Pode fazer sentido para quem aceita volatilidade forte e quer acompanhar uma empresa sistêmica. Use esta página para simular dividendos com base em dados históricos e combine com leitura de demonstrativos e fatos relevantes.",
    listDescription:
      "Maior integrada de petróleo do país; dividend yield sensível ao ciclo do barril e ao preço da ação.",
    faqs: [
      {
        question: "PETR3 ou PETR4?",
        answer:
          "São classes diferentes de ações da mesma companhia. Compare liquidez, voto (quando aplicável) e preço relativo antes de escolher.",
      },
      {
        question: "O governo influencia os dividendos?",
        answer:
          "A companhia tem acionista controlador público; decisões estratégicas e políticas podem afetar resultado e distribuição. Leia sempre os comunicados oficiais.",
      },
    ],
  },
  {
    ticker: "VALE3",
    companyName: "Vale",
    sectorSlug: "mineracao",
    sectorLabel: "Mineração",
    shortDescription:
      "Vale é uma das maiores mineradoras do mundo, com foco em minério de ferro e níquel. Operação global e exposição a China e ciclo de commodities definem lucros e política de dividendos.",
    dividendYieldPct: 8.4,
    payoutPct: 48,
    priceBrl: 62.5,
    paymentFrequency: "Pagamentos variáveis; a companhia já distribuiu dividendos ordinários e extraordinários conforme geração de caixa.",
    historySummary:
      "VALE3 costuma apresentar anos de distribuição agressiva quando o minério de ferro está caro e o caixa é robusto, e períodos mais contidos quando o cenário reverte. O investidor precisa separar yield pontual de sustentabilidade no longo prazo.",
    worthFollowing:
      "Vale a pena acompanhar VALE3 se você busca exposição ao ciclo de commodities com empresa de primeira linha — aceitando volatilidade e riscos ESG-operacionais. A calculadora abaixo ajuda a visualizar quanto o histórico recente sugere por cota; não é previsão.",
    listDescription:
      "Gigante de minério de ferro; proventos muito ligados ao preço internacional da commodity.",
    faqs: [
      {
        question: "Vale é só minério de ferro?",
        answer:
          "O ferro domina o resultado, mas há outros negócios (ex.: níquel, cobre). Leia os relatórios para ver o mix atual.",
      },
      {
        question: "Por que VALE3 teve dividendos altos em alguns anos?",
        answer:
          "Cenário de preço favorável e balanço forte permitiram distribuição elevada. Ciclos mudam — o passado não garante o futuro.",
      },
    ],
  },
  {
    ticker: "TAEE11",
    companyName: "Taesa",
    sectorSlug: "energia",
    sectorLabel: "Energia elétrica",
    shortDescription:
      "Transmissão Paulista e participações (Taesa) atua em concessões de transmissão de energia elétrica. O modelo concessionário influencia receitas e distribuição de resultados.",
    dividendYieldPct: 7.6,
    payoutPct: 95,
    priceBrl: 41.3,
    paymentFrequency: "Histórico de distribuições periódicas; conferir RI para o calendário atualizado.",
    historySummary:
      "TAEE11 é frequentemente citada em conversas sobre dividendos no setor elétrico por combinar ativos de transmissão com histórico de remuneração ao acionista. Revisões tarifárias e reajustes contratuais podem alterar o fluxo futuro.",
    worthFollowing:
      "Pode interessar a quem busca empresas de infraestrutura regulada com foco em transmissão. Acompanhe leilões, renovação de concessões e notícias regulatórias além do yield. Use a simulação para estimar receita por cota com base em dados históricos.",
    listDescription:
      "Transmissão de energia; case comum em discussões de dividendos em utilities.",
    faqs: [
      {
        question: "O que significa o 11 em TAEE11?",
        answer:
          "Indica unit na B3. Verifique a composição (ações preferenciais e ordinárias) no site de RI.",
      },
      {
        question: "Utilities são isentas de risco?",
        answer:
          "Não. Há risco regulatório, operacional e de taxa de juros. O setor tende a ser menos volátil que commodities, mas não é garantia.",
      },
    ],
  },
  {
    ticker: "EGIE3",
    companyName: "Engie Brasil Energia",
    sectorSlug: "energia",
    sectorLabel: "Energia elétrica",
    shortDescription:
      "Engie Brasil integra o grupo Engie e atua em geração e comercialização de energia, além de soluções ligadas à transição energética no país.",
    dividendYieldPct: 6.9,
    payoutPct: 72,
    priceBrl: 32.8,
    paymentFrequency: "Conforme política de dividendos da companhia e resultado; ver calendário no RI.",
    historySummary:
      "EGIE3 combina ativos hidráulicos e outros negócios de energia. O histórico de proventos reflete geração, preço de energia e necessidade de reinvestimento. Empresas com mix renovável podem enfrentar anos de maior CAPEX.",
    worthFollowing:
      "Faz sentido para quem quer exposição a energia com player privado de escala e vínculo com grupo internacional. Compare com outros nomes do setor nesta mesma categoria e use a calculadora para estimativas por cota.",
    listDescription:
      "Geradora/comercializadora; pauta ligada a hidrologia, PPA e investimentos em renováveis.",
    faqs: [
      {
        question: "Engie Brasil paga dividendos mensais?",
        answer:
          "A frequência pode variar. Consulte os últimos comunicados e o site de RI para o padrão vigente.",
      },
      {
        question: "EGIE3 compete com TAEE11?",
        answer:
          "Atuam no mesmo setor amplo (energia), mas negócios e riscos são diferentes — transmissão vs geração/comercialização.",
      },
    ],
  },
];

export const STOCKS_BY_TICKER: Record<string, StockSeoRecord> = Object.fromEntries(
  STOCKS_LIST.map((s) => [s.ticker.toUpperCase(), s])
);

export function isSectorSlug(s: string): s is SectorSlug {
  return (SECTOR_SLUGS as readonly string[]).includes(s);
}

export function getSector(slug: string): SectorRecord | null {
  if (!isSectorSlug(slug)) return null;
  return SECTORS[slug] ?? null;
}

export function getStockSeo(ticker: string): StockSeoRecord | null {
  const key = ticker.trim().toUpperCase();
  return STOCKS_BY_TICKER[key] ?? null;
}

export function getStocksInSector(slug: SectorSlug): StockSeoRecord[] {
  return STOCKS_LIST.filter((s) => s.sectorSlug === slug);
}

export function getAllSectorSlugs(): SectorSlug[] {
  return [...SECTOR_SLUGS];
}

export function getAllMockTickers(): string[] {
  return STOCKS_LIST.map((s) => s.ticker.toUpperCase());
}

export function getTickerPath(ticker: string): string {
  return `/acoes/${encodeURIComponent(ticker.trim().toUpperCase())}`;
}

export function getSectorPath(slug: string): string {
  return `/setores/${encodeURIComponent(slug)}`;
}

export function getPeerTickers(ticker: string): StockSeoRecord[] {
  const self = getStockSeo(ticker);
  if (!self) return [];
  return getStocksInSector(self.sectorSlug).filter((s) => s.ticker !== self.ticker);
}

export function formatPercent(value: number, fractionDigits = 1): string {
  return `${value.toLocaleString("pt-BR", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}%`;
}
