/**
 * Fonte central para SEO programático de **ações** (`/acoes/[slug]` — principal e variações).
 *
 * Cada item segue {@link StockSeoDefinition}:
 * - `ticker` + slug de URL (sempre o ticker em maiúsculas — use {@link tickerToSlug})
 * - `companyName` (nome da empresa)
 * - `sectorSlug` (setor)
 * - `shortDescription`, `paymentFrequency`, FAQs e textos editoriais
 * - métricas `dividendYieldPct` / `payoutPct` / `priceBrl` são **referência editorial**, não cotação ao vivo
 *
 * Ao adicionar um objeto aqui, `generateStaticParams`, sitemap e páginas passam a existir automaticamente
 * (via `data/stocks` → `MOCK_STOCKS`).
 */
import type { StockSeoDefinition } from "./stocks/types";

export type { StockSeoDefinition as TickerProgrammaticRecord } from "./stocks/types";

/** Slug canônico na URL: ticker em maiúsculas (ex.: `petr4` → `PETR4`). */
export function tickerToSlug(ticker: string): string {
  return ticker.trim().toUpperCase();
}

export function tickerPagePath(ticker: string): string {
  return `/acoes/${encodeURIComponent(tickerToSlug(ticker))}`;
}

/** Lista para `generateStaticParams` em `app/acoes/[slug]`. */
export function buildAllTickerStaticParams(): { ticker: string }[] {
  return TICKER_DEFINITIONS.map((d) => ({ ticker: d.ticker.trim().toUpperCase() }));
}

export const TICKER_DEFINITIONS: StockSeoDefinition[] = [
  {
    ticker: "BBAS3",
    companyName: "Banco do Brasil",
    sectorSlug: "bancos",
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
    lastModified: "2026-03-25",
    companyName: "Engie Brasil Energia",
    sectorSlug: "energia",
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
  {
    ticker: "B3SA3",
    companyName: "B3",
    sectorSlug: "servicos_financeiros",
    shortDescription:
      "B3 S.A. é a principal infraestrutura de mercado financeiro do Brasil, reunindo bolsa de valores, serviços de registro, compensação e liquidação, além de produtos e dados ligados ao ecossistema de capitais.",
    dividendYieldPct: 4.2,
    payoutPct: 35,
    priceBrl: 13.2,
    paymentFrequency: "Política de dividendos conforme calendário e aprovações da companhia; consulte RI para datas e tipos de provento.",
    historySummary:
      "O histórico de distribuição da B3 costuma refletir o ciclo de receitas ligado a volume de negócios, novos produtos e investimento em tecnologia. Em anos de maior expansão de capex ou aquisições, o ritmo de payout pode variar.",
    worthFollowing:
      "Faz sentido acompanhar B3SA3 se você quer exposição à infraestrutura de mercado (não ao negócio de crédito de um banco tradicional). Compare drivers de receita com instituições financeiras clássicas e use o simulador apenas como apoio educacional ao histórico.",
    listDescription:
      "Infraestrutura de mercado na B3; papel diferente de bancos na carteira de dividendos.",
    faqs: [
      {
        question: "B3SA3 é um banco?",
        answer:
          "Não. A companhia opera ecossistema de listagem, negociação e serviços correlatos. Os riscos e métricas não são os mesmos de uma instituição de crédito.",
      },
      {
        question: "Onde confirmo dividendos e JCP?",
        answer:
          "Site de RI da B3 e comunicados à CVM. O Simula Dividendos agrega dados para simulação educacional.",
      },
    ],
  },
  {
    ticker: "WEGE3",
    companyName: "WEG",
    sectorSlug: "industria",
    shortDescription:
      "WEG é fabricante brasileiro de equipamentos elétricos, motores e soluções de automação, com atuação no Brasil e no exterior. O perfil combina indústria, exportação e ciclos de investimento em energia e infraestrutura.",
    dividendYieldPct: 2.8,
    payoutPct: 40,
    priceBrl: 48.6,
    paymentFrequency: "Divulgado pela companhia conforme política de remuneração e resultados; ver RI para calendário.",
    historySummary:
      "WEGE3 costuma ser citada por investidores que misturam crescimento e retorno ao acionista. Em fases de expansão internacional ou maior CAPEX, o payout pode parecer mais contido; em anos de geração de caixa forte, a distribuição pode ganhar destaque.",
    worthFollowing:
      "Interessante para quem acompanha indústria com exposição global e sensibilidade a câmbio e investimento. Não confunda dividend yield pontual com qualidade da tese — leia balanços e guidance. A calculadora desta página ajuda a visualizar histórico por cota.",
    listDescription:
      "Indústria de equipamentos elétricos; combinação de crescimento e proventos depende do ciclo de investimento.",
    faqs: [
      {
        question: "WEGE3 é só ‘ação de dividendo’?",
        answer:
          "Muitos investidores olham também para crescimento. O peso de dividendos na tese varia com preço, payout e reinvestimento.",
      },
      {
        question: "Como tratar exposição cambial?",
        answer:
          "Receitas no exterior podem ajudar ou pressionar resultados conforme o câmbio. Use o contexto dos relatórios para interpretar lucro e caixa.",
      },
    ],
  },
  {
    ticker: "ABEV3",
    companyName: "Ambev",
    sectorSlug: "consumo",
    shortDescription:
      "Ambev é uma das maiores bebidas da região, com portfólio de cervejas, refrigerantes e outros produtos. Operação ampla na América Latina e exposição a concorrência, sazonalidade e custos de insumos.",
    dividendYieldPct: 5.1,
    payoutPct: 52,
    priceBrl: 14.9,
    paymentFrequency: "Conforme política da companhia e aprovações; consulte RI para tipos de provento e datas.",
    historySummary:
      "ABEV3 costuma aparecer em discussões de consumo e fluxo recorrente, mas margens e volumes respondem a competição, clima e câmbio em mercados vizinhos. Dividendos passados não garantem o mesmo ritmo no futuro.",
    worthFollowing:
      "Útil para quem estuda consumo de massa na B3 e aceita riscos de mercado e regulação setorial. Cruze yield com histórico longo e leia comunicados sobre capital e dividendos. Simule com seu número de cotas para entender ordem de grandeza educacional.",
    listDescription:
      "Bebidas em escala; dividendos ligados a margens, mercados e política de retorno.",
    faqs: [
      {
        question: "Consumo significa renda previsível?",
        answer:
          "Demanda pode ser recorrente, mas resultado e distribuição variam. Não há promessa de valor ou calendário de proventos.",
      },
      {
        question: "ABEV3 compensa comparar com PETR4 só pelo yield?",
        answer:
          "Setores e riscos são muito diferentes. Comparar yield sem contexto costuma distorcer a decisão.",
      },
    ],
  },
  {
    ticker: "KLBN11",
    companyName: "Klabin",
    sectorSlug: "industria",
    shortDescription:
      "Klabin atua em papel e celulose, com integração florestal e foco em embalagens e fibras. O setor é cíclico e sensível a preço de commodities florestais, demanda de embalagens e custos logísticos.",
    dividendYieldPct: 3.6,
    payoutPct: 45,
    priceBrl: 19.4,
    paymentFrequency: "Conforme calendário da companhia; unidades (11) podem ter estrutura diferente de ordinárias — confira RI.",
    historySummary:
      "KLBN11 reflete a tese de papel/celulose na B3. Anos favoráveis de preço e demanda podem sustentar distribuições; em reversões de ciclo, a empresa pode ajustar capex e payout. Leia sempre a estrutura do papel (unit) antes de simular.",
    worthFollowing:
      "Para quem acompanha indústria florestal e embalagens, com tolerância a volatilidade de commodity. Use esta página para cruzar histórico de proventos com sua quantidade de cotas, sem tratar como recomendação.",
    listDescription:
      "Papel e celulose; ciclo de commodities e demanda por embalagens pesa nos proventos.",
    faqs: [
      {
        question: "O que significa o 11 em KLBN11?",
        answer:
          "Na B3, sufixos como 11 frequentemente indicam unit ou estrutura com mais de um tipo de ação. Confira o prospecto e o RI da Klabin.",
      },
      {
        question: "É parecido com Vale por ser ‘commodity’?",
        answer:
          "Ambos têm ciclos, mas drivers e riscos operacionais são distintos (floresta, papel, embalagens vs minério e frete marítimo).",
      },
    ],
  },
];
