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

  // --- AUTO-GERADO em 2026-05-08 (43 tickers) ---
  {
    ticker: "ITSA4",
    companyName: "ITAUSA S.A.",
    sectorSlug: "bancos",
    shortDescription: "ITAUSA S.A. (ITSA4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ITAUSA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ITSA4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ITSA4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ITAUSA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ITSA4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ITSA4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BBDC4",
    companyName: "BCO BRADESCO S.A.",
    sectorSlug: "bancos",
    shortDescription: "BCO BRADESCO S.A. (BBDC4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BCO BRADESCO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BBDC4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BBDC4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BCO BRADESCO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BBDC4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BBDC4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MGLU3",
    companyName: "MAGAZINE LUIZA S.A.",
    sectorSlug: "consumo",
    shortDescription: "MAGAZINE LUIZA S.A. (MGLU3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do MGLU3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe MGLU3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "MAGAZINE LUIZA S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "MGLU3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker MGLU3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "COGN3",
    companyName: "COGNA EDUCAÇÃO S.A.",
    sectorSlug: "bancos",
    shortDescription: "COGNA EDUCAÇÃO S.A. (COGN3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e COGNA EDUCAÇÃO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do COGN3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe COGN3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "COGNA EDUCAÇÃO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "COGN3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker COGN3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CSAN3",
    companyName: "COSAN S.A.",
    sectorSlug: "petroleo",
    shortDescription: "COSAN S.A. (CSAN3) atua no setor de petróleo e gás, com resultado ligado ao preço do barril, produção e câmbio. É uma das indústrias com maior potencial de dividendos em momentos de preço favorável.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Distribuição vinculada ao resultado e à política de capital da companhia.",
    historySummary: "O histórico de proventos do CSAN3 varia com o preço do petróleo e decisões estratégicas da empresa. Simule com base no passado disponível e acompanhe comunicados para entender o próximo ciclo.",
    worthFollowing: "CSAN3 pode ser relevante para quem busca exposição ao setor de energia com potencial de dividendos expressivos. Considere também volatilidade de commodities e risco político.",
    listDescription: "COSAN S.A. — petróleo e gás com dividendos ligados ao ciclo de commodities.",
    faqs: [
      { question: "CSAN3 paga dividendos regulares?", answer: "A regularidade depende do preço do petróleo e da política da empresa. Simulações passadas não garantem o futuro." },
      { question: "Como estimar meus proventos?", answer: "Informe CSAN3 e sua quantidade de ações no simulador desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "LREN3",
    companyName: "LOJAS RENNER S.A.",
    sectorSlug: "consumo",
    shortDescription: "LOJAS RENNER S.A. (LREN3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do LREN3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe LREN3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "LOJAS RENNER S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "LREN3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker LREN3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "GOAU4",
    companyName: "METALURGICA GERDAU S.A.",
    sectorSlug: "mineracao",
    shortDescription: "METALURGICA GERDAU S.A. (GOAU4) está no setor de mineração, exposto a ciclos de commodities e demanda global. O dividend yield pode ser elevado em anos de preços altos e recuar em viradas de ciclo.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos variáveis conforme resultado e ciclo de commodities.",
    historySummary: "O histórico de proventos do GOAU4 oscila com o preço das commodities. Anos de superciclo costumam trazer distribuições extraordinárias; quedas de preço reduzem o payout. Use o simulador para explorar o passado.",
    worthFollowing: "Acompanhe GOAU4 se você aceita a ciclicidade do setor de mineração em troca de potencial de dividendos altos em momentos favoráveis. Diversificação e gestão de risco são fundamentais neste setor.",
    listDescription: "METALURGICA GERDAU S.A. — mineração com exposição a commodities e histórico de dividendos cíclicos.",
    faqs: [
      { question: "Por que o yield do GOAU4 muda tanto?", answer: "O preço da ação e os pagamentos acompanham o ciclo de commodities. Um yield alto pode refletir queda do papel ou distribuição extraordinária." },
      { question: "Onde vejo o histórico oficial?", answer: "Consulte o RI da companhia e comunicados à CVM. O simulador desta página usa dados via API como referência educacional." }
    ],
  },

  {
    ticker: "USIM5",
    companyName: "USINAS SID DE MINAS GERAIS S.A.-USIMINAS",
    sectorSlug: "mineracao",
    shortDescription: "USINAS SID DE MINAS GERAIS S.A.-USIMINAS (USIM5) está no setor de mineração, exposto a ciclos de commodities e demanda global. O dividend yield pode ser elevado em anos de preços altos e recuar em viradas de ciclo.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos variáveis conforme resultado e ciclo de commodities.",
    historySummary: "O histórico de proventos do USIM5 oscila com o preço das commodities. Anos de superciclo costumam trazer distribuições extraordinárias; quedas de preço reduzem o payout. Use o simulador para explorar o passado.",
    worthFollowing: "Acompanhe USIM5 se você aceita a ciclicidade do setor de mineração em troca de potencial de dividendos altos em momentos favoráveis. Diversificação e gestão de risco são fundamentais neste setor.",
    listDescription: "USINAS SID DE MINAS GERAIS S.A.-USIMINAS — mineração com exposição a commodities e histórico de dividendos cíclicos.",
    faqs: [
      { question: "Por que o yield do USIM5 muda tanto?", answer: "O preço da ação e os pagamentos acompanham o ciclo de commodities. Um yield alto pode refletir queda do papel ou distribuição extraordinária." },
      { question: "Onde vejo o histórico oficial?", answer: "Consulte o RI da companhia e comunicados à CVM. O simulador desta página usa dados via API como referência educacional." }
    ],
  },

  {
    ticker: "CVCB3",
    companyName: "CVC BRASIL OPERADORA E AGÊNCIA DE VIAGENS S.A.",
    sectorSlug: "bancos",
    shortDescription: "CVC BRASIL OPERADORA E AGÊNCIA DE VIAGENS S.A. (CVCB3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CVC BRASIL OPERADORA E AGÊNCIA DE VIAGENS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CVCB3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CVCB3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CVC BRASIL OPERADORA E AGÊNCIA DE VIAGENS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CVCB3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CVCB3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CPLE3",
    companyName: "CIA PARANAENSE DE ENERGIA - COPEL",
    sectorSlug: "energia",
    shortDescription: "CIA PARANAENSE DE ENERGIA - COPEL (CPLE3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do CPLE3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "CPLE3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "CIA PARANAENSE DE ENERGIA - COPEL — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "CPLE3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker CPLE3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "EMBJ3",
    companyName: "EMBJ3",
    sectorSlug: "bancos",
    shortDescription: "EMBJ3 (EMBJ3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e EMBJ3 aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do EMBJ3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe EMBJ3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "EMBJ3 — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "EMBJ3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker EMBJ3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "RAIL3",
    companyName: "RUMO S.A.",
    sectorSlug: "bancos",
    shortDescription: "RUMO S.A. (RAIL3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e RUMO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do RAIL3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe RAIL3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "RUMO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "RAIL3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker RAIL3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ECOR3",
    companyName: "ECORODOVIAS INFRAESTRUTURA E LOGÍSTICA S.A.",
    sectorSlug: "energia",
    shortDescription: "ECORODOVIAS INFRAESTRUTURA E LOGÍSTICA S.A. (ECOR3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do ECOR3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "ECOR3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "ECORODOVIAS INFRAESTRUTURA E LOGÍSTICA S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "ECOR3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker ECOR3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "RENT3",
    companyName: "LOCALIZA RENT A CAR S.A.",
    sectorSlug: "bancos",
    shortDescription: "LOCALIZA RENT A CAR S.A. (RENT3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e LOCALIZA RENT A CAR S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do RENT3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe RENT3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "LOCALIZA RENT A CAR S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "RENT3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker RENT3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BEEF3",
    companyName: "MINERVA S.A.",
    sectorSlug: "mineracao",
    shortDescription: "MINERVA S.A. (BEEF3) está no setor de mineração, exposto a ciclos de commodities e demanda global. O dividend yield pode ser elevado em anos de preços altos e recuar em viradas de ciclo.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos variáveis conforme resultado e ciclo de commodities.",
    historySummary: "O histórico de proventos do BEEF3 oscila com o preço das commodities. Anos de superciclo costumam trazer distribuições extraordinárias; quedas de preço reduzem o payout. Use o simulador para explorar o passado.",
    worthFollowing: "Acompanhe BEEF3 se você aceita a ciclicidade do setor de mineração em troca de potencial de dividendos altos em momentos favoráveis. Diversificação e gestão de risco são fundamentais neste setor.",
    listDescription: "MINERVA S.A. — mineração com exposição a commodities e histórico de dividendos cíclicos.",
    faqs: [
      { question: "Por que o yield do BEEF3 muda tanto?", answer: "O preço da ação e os pagamentos acompanham o ciclo de commodities. Um yield alto pode refletir queda do papel ou distribuição extraordinária." },
      { question: "Onde vejo o histórico oficial?", answer: "Consulte o RI da companhia e comunicados à CVM. O simulador desta página usa dados via API como referência educacional." }
    ],
  },

  {
    ticker: "CMIG4",
    companyName: "CIA ENERGETICA DE MINAS GERAIS - CEMIG",
    sectorSlug: "energia",
    shortDescription: "CIA ENERGETICA DE MINAS GERAIS - CEMIG (CMIG4) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do CMIG4 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "CMIG4 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "CIA ENERGETICA DE MINAS GERAIS - CEMIG — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "CMIG4 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker CMIG4 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "LJQQ3",
    companyName: "LOJAS QUERO-QUERO S/A",
    sectorSlug: "consumo",
    shortDescription: "LOJAS QUERO-QUERO S/A (LJQQ3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do LJQQ3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe LJQQ3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "LOJAS QUERO-QUERO S/A — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "LJQQ3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker LJQQ3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "VAMO3",
    companyName: "VAMOS LOCAÇÃO DE CAMINHÕES. MÁQUINAS E EQUIP. S.A.",
    sectorSlug: "bancos",
    shortDescription: "VAMOS LOCAÇÃO DE CAMINHÕES. MÁQUINAS E EQUIP. S.A. (VAMO3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e VAMOS LOCAÇÃO DE CAMINHÕES. MÁQUINAS E EQUIP. S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do VAMO3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe VAMO3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "VAMOS LOCAÇÃO DE CAMINHÕES. MÁQUINAS E EQUIP. S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "VAMO3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker VAMO3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SMFT3",
    companyName: "SMARTFIT ESCOLA DE GINÁSTICA E DANÇA S.A.",
    sectorSlug: "bancos",
    shortDescription: "SMARTFIT ESCOLA DE GINÁSTICA E DANÇA S.A. (SMFT3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SMARTFIT ESCOLA DE GINÁSTICA E DANÇA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SMFT3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SMFT3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SMARTFIT ESCOLA DE GINÁSTICA E DANÇA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SMFT3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SMFT3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SBSP3",
    companyName: "CIA SANEAMENTO BASICO EST SAO PAULO",
    sectorSlug: "bancos",
    shortDescription: "CIA SANEAMENTO BASICO EST SAO PAULO (SBSP3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CIA SANEAMENTO BASICO EST SAO PAULO aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SBSP3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SBSP3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CIA SANEAMENTO BASICO EST SAO PAULO — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SBSP3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SBSP3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "POMO4",
    companyName: "MARCOPOLO S.A.",
    sectorSlug: "industria",
    shortDescription: "MARCOPOLO S.A. (POMO4) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    historySummary: "O histórico de proventos do POMO4 alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.",
    worthFollowing: "POMO4 pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.",
    listDescription: "MARCOPOLO S.A. — indústria com histórico de proventos ligado ao ciclo produtivo.",
    faqs: [
      { question: "POMO4 paga dividendos frequentes?", answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: "Informe POMO4 e a quantidade de ações na calculadora desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "RADL3",
    companyName: "RAIA DROGASIL S.A.",
    sectorSlug: "petroleo",
    shortDescription: "RAIA DROGASIL S.A. (RADL3) atua no setor de petróleo e gás, com resultado ligado ao preço do barril, produção e câmbio. É uma das indústrias com maior potencial de dividendos em momentos de preço favorável.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Distribuição vinculada ao resultado e à política de capital da companhia.",
    historySummary: "O histórico de proventos do RADL3 varia com o preço do petróleo e decisões estratégicas da empresa. Simule com base no passado disponível e acompanhe comunicados para entender o próximo ciclo.",
    worthFollowing: "RADL3 pode ser relevante para quem busca exposição ao setor de energia com potencial de dividendos expressivos. Considere também volatilidade de commodities e risco político.",
    listDescription: "RAIA DROGASIL S.A. — petróleo e gás com dividendos ligados ao ciclo de commodities.",
    faqs: [
      { question: "RADL3 paga dividendos regulares?", answer: "A regularidade depende do preço do petróleo e da política da empresa. Simulações passadas não garantem o futuro." },
      { question: "Como estimar meus proventos?", answer: "Informe RADL3 e sua quantidade de ações no simulador desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "CMIN3",
    companyName: "CSN MINERAÇÃO S.A.",
    sectorSlug: "mineracao",
    shortDescription: "CSN MINERAÇÃO S.A. (CMIN3) está no setor de mineração, exposto a ciclos de commodities e demanda global. O dividend yield pode ser elevado em anos de preços altos e recuar em viradas de ciclo.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos variáveis conforme resultado e ciclo de commodities.",
    historySummary: "O histórico de proventos do CMIN3 oscila com o preço das commodities. Anos de superciclo costumam trazer distribuições extraordinárias; quedas de preço reduzem o payout. Use o simulador para explorar o passado.",
    worthFollowing: "Acompanhe CMIN3 se você aceita a ciclicidade do setor de mineração em troca de potencial de dividendos altos em momentos favoráveis. Diversificação e gestão de risco são fundamentais neste setor.",
    listDescription: "CSN MINERAÇÃO S.A. — mineração com exposição a commodities e histórico de dividendos cíclicos.",
    faqs: [
      { question: "Por que o yield do CMIN3 muda tanto?", answer: "O preço da ação e os pagamentos acompanham o ciclo de commodities. Um yield alto pode refletir queda do papel ou distribuição extraordinária." },
      { question: "Onde vejo o histórico oficial?", answer: "Consulte o RI da companhia e comunicados à CVM. O simulador desta página usa dados via API como referência educacional." }
    ],
  },

  {
    ticker: "AUAU3",
    companyName: "UNIÃO PET PARTICIPAÇÕES S.A.",
    sectorSlug: "bancos",
    shortDescription: "UNIÃO PET PARTICIPAÇÕES S.A. (AUAU3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e UNIÃO PET PARTICIPAÇÕES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do AUAU3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe AUAU3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "UNIÃO PET PARTICIPAÇÕES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "AUAU3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker AUAU3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "GGPS3",
    companyName: "GPS PARTICIPACOES E EMPREENDIMENTOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "GPS PARTICIPACOES E EMPREENDIMENTOS S.A. (GGPS3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e GPS PARTICIPACOES E EMPREENDIMENTOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do GGPS3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe GGPS3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "GPS PARTICIPACOES E EMPREENDIMENTOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "GGPS3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker GGPS3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "GGBR4",
    companyName: "GERDAU S.A.",
    sectorSlug: "mineracao",
    shortDescription: "GERDAU S.A. (GGBR4) está no setor de mineração, exposto a ciclos de commodities e demanda global. O dividend yield pode ser elevado em anos de preços altos e recuar em viradas de ciclo.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos variáveis conforme resultado e ciclo de commodities.",
    historySummary: "O histórico de proventos do GGBR4 oscila com o preço das commodities. Anos de superciclo costumam trazer distribuições extraordinárias; quedas de preço reduzem o payout. Use o simulador para explorar o passado.",
    worthFollowing: "Acompanhe GGBR4 se você aceita a ciclicidade do setor de mineração em troca de potencial de dividendos altos em momentos favoráveis. Diversificação e gestão de risco são fundamentais neste setor.",
    listDescription: "GERDAU S.A. — mineração com exposição a commodities e histórico de dividendos cíclicos.",
    faqs: [
      { question: "Por que o yield do GGBR4 muda tanto?", answer: "O preço da ação e os pagamentos acompanham o ciclo de commodities. Um yield alto pode refletir queda do papel ou distribuição extraordinária." },
      { question: "Onde vejo o histórico oficial?", answer: "Consulte o RI da companhia e comunicados à CVM. O simulador desta página usa dados via API como referência educacional." }
    ],
  },

  {
    ticker: "AXIA3",
    companyName: "AXIA3",
    sectorSlug: "bancos",
    shortDescription: "AXIA3 (AXIA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e AXIA3 aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do AXIA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe AXIA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "AXIA3 — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "AXIA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker AXIA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "VIVA3",
    companyName: "VIVARA PARTICIPAÇOES S.A",
    sectorSlug: "consumo",
    shortDescription: "VIVARA PARTICIPAÇOES S.A (VIVA3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do VIVA3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe VIVA3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "VIVARA PARTICIPAÇOES S.A — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "VIVA3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker VIVA3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "VBBR3",
    companyName: "VIBRA ENERGIA S.A.",
    sectorSlug: "energia",
    shortDescription: "VIBRA ENERGIA S.A. (VBBR3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do VBBR3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "VBBR3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "VIBRA ENERGIA S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "VBBR3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker VBBR3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "ASAI3",
    companyName: "SENDAS DISTRIBUIDORA S.A.",
    sectorSlug: "consumo",
    shortDescription: "SENDAS DISTRIBUIDORA S.A. (ASAI3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do ASAI3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe ASAI3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "SENDAS DISTRIBUIDORA S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "ASAI3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker ASAI3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "TIMS3",
    companyName: "TIM S.A.",
    sectorSlug: "bancos",
    shortDescription: "TIM S.A. (TIMS3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e TIM S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do TIMS3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe TIMS3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "TIM S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "TIMS3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker TIMS3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MRVE3",
    companyName: "MRV ENGENHARIA E PARTICIPACOES S.A.",
    sectorSlug: "bancos",
    shortDescription: "MRV ENGENHARIA E PARTICIPACOES S.A. (MRVE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MRV ENGENHARIA E PARTICIPACOES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MRVE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MRVE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MRV ENGENHARIA E PARTICIPACOES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MRVE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MRVE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "RDOR3",
    companyName: "REDE DOR SÃO LUIZ S.A.",
    sectorSlug: "servicos_financeiros",
    shortDescription: "REDE DOR SÃO LUIZ S.A. (RDOR3) atua em serviços financeiros — como bolsa, clearing, meios de pagamento ou fintechs listadas na B3. O resultado está ligado a volume de transações, tecnologia e regulação do setor.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia.",
    historySummary: "O histórico de proventos do RDOR3 acompanha a evolução do mercado de capitais e de pagamentos no Brasil. Use o simulador para explorar o passado e combine com análise de crescimento e margem.",
    worthFollowing: "Acompanhe RDOR3 se você quer exposição a infraestrutura financeira e aceita risco de regulação e ciclo de mercado. Proventos tendem a acompanhar crescimento de volume e lucratividade.",
    listDescription: "REDE DOR SÃO LUIZ S.A. — serviços financeiros com histórico de distribuição ligado ao mercado de capitais.",
    faqs: [
      { question: "RDOR3 é equivalente a uma ação de banco?", answer: "Não. Serviços financeiros têm drivers diferentes de bancos tradicionais — foco em transações e tecnologia, não crédito." },
      { question: "Como ver histórico de proventos?", answer: "Use o ticker RDOR3 nesta página para estimativas, e consulte o RI para dados oficiais." }
    ],
  },

  {
    ticker: "BPAC11",
    companyName: "BCO BTG PACTUAL S.A.",
    sectorSlug: "bancos",
    shortDescription: "BCO BTG PACTUAL S.A. (BPAC11) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BCO BTG PACTUAL S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BPAC11 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BPAC11 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BCO BTG PACTUAL S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BPAC11 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BPAC11 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "UGPA3",
    companyName: "ULTRAPAR PARTICIPACOES S.A.",
    sectorSlug: "petroleo",
    shortDescription: "ULTRAPAR PARTICIPACOES S.A. (UGPA3) atua no setor de petróleo e gás, com resultado ligado ao preço do barril, produção e câmbio. É uma das indústrias com maior potencial de dividendos em momentos de preço favorável.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Distribuição vinculada ao resultado e à política de capital da companhia.",
    historySummary: "O histórico de proventos do UGPA3 varia com o preço do petróleo e decisões estratégicas da empresa. Simule com base no passado disponível e acompanhe comunicados para entender o próximo ciclo.",
    worthFollowing: "UGPA3 pode ser relevante para quem busca exposição ao setor de energia com potencial de dividendos expressivos. Considere também volatilidade de commodities e risco político.",
    listDescription: "ULTRAPAR PARTICIPACOES S.A. — petróleo e gás com dividendos ligados ao ciclo de commodities.",
    faqs: [
      { question: "UGPA3 paga dividendos regulares?", answer: "A regularidade depende do preço do petróleo e da política da empresa. Simulações passadas não garantem o futuro." },
      { question: "Como estimar meus proventos?", answer: "Informe UGPA3 e sua quantidade de ações no simulador desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "ANIM3",
    companyName: "ANIMA HOLDING S.A.",
    sectorSlug: "bancos",
    shortDescription: "ANIMA HOLDING S.A. (ANIM3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ANIMA HOLDING S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ANIM3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ANIM3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ANIMA HOLDING S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ANIM3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ANIM3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "YDUQ3",
    companyName: "YDUQS PARTICIPACOES S.A.",
    sectorSlug: "bancos",
    shortDescription: "YDUQS PARTICIPACOES S.A. (YDUQ3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e YDUQS PARTICIPACOES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do YDUQ3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe YDUQ3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "YDUQS PARTICIPACOES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "YDUQ3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker YDUQ3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BRAV3",
    companyName: "BRAVA ENERGIA S.A.",
    sectorSlug: "energia",
    shortDescription: "BRAVA ENERGIA S.A. (BRAV3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do BRAV3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "BRAV3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "BRAVA ENERGIA S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "BRAV3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker BRAV3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "JHSF3",
    companyName: "JHSF PARTICIPACOES S.A.",
    sectorSlug: "bancos",
    shortDescription: "JHSF PARTICIPACOES S.A. (JHSF3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e JHSF PARTICIPACOES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do JHSF3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe JHSF3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "JHSF PARTICIPACOES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "JHSF3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker JHSF3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "LWSA3",
    companyName: "LWSA S.A.",
    sectorSlug: "bancos",
    shortDescription: "LWSA S.A. (LWSA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e LWSA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do LWSA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe LWSA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "LWSA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "LWSA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker LWSA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PRIO3",
    companyName: "PRIO S.A.",
    sectorSlug: "petroleo",
    shortDescription: "PRIO S.A. (PRIO3) atua no setor de petróleo e gás, com resultado ligado ao preço do barril, produção e câmbio. É uma das indústrias com maior potencial de dividendos em momentos de preço favorável.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Distribuição vinculada ao resultado e à política de capital da companhia.",
    historySummary: "O histórico de proventos do PRIO3 varia com o preço do petróleo e decisões estratégicas da empresa. Simule com base no passado disponível e acompanhe comunicados para entender o próximo ciclo.",
    worthFollowing: "PRIO3 pode ser relevante para quem busca exposição ao setor de energia com potencial de dividendos expressivos. Considere também volatilidade de commodities e risco político.",
    listDescription: "PRIO S.A. — petróleo e gás com dividendos ligados ao ciclo de commodities.",
    faqs: [
      { question: "PRIO3 paga dividendos regulares?", answer: "A regularidade depende do preço do petróleo e da política da empresa. Simulações passadas não garantem o futuro." },
      { question: "Como estimar meus proventos?", answer: "Informe PRIO3 e sua quantidade de ações no simulador desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "CEAB3",
    companyName: "CEA MODAS S.A.",
    sectorSlug: "bancos",
    shortDescription: "CEA MODAS S.A. (CEAB3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CEA MODAS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CEAB3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CEAB3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CEA MODAS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CEAB3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CEAB3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "AMBP3",
    companyName: "AMBIPAR PARTICIPACOES E EMPREENDIMENTOS S/A",
    sectorSlug: "bancos",
    shortDescription: "AMBIPAR PARTICIPACOES E EMPREENDIMENTOS S/A (AMBP3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e AMBIPAR PARTICIPACOES E EMPREENDIMENTOS S/A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do AMBP3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe AMBP3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "AMBIPAR PARTICIPACOES E EMPREENDIMENTOS S/A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "AMBP3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker AMBP3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  // --- AUTO-GERADO em 2026-05-08 (147 tickers) ---
  {
    ticker: "ONCO3",
    companyName: "ONCOCLINICAS DO BRASIL SERVICOS MEDICOS  S.A.",
    sectorSlug: "bancos",
    shortDescription: "ONCOCLINICAS DO BRASIL SERVICOS MEDICOS  S.A. (ONCO3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ONCOCLINICAS DO BRASIL SERVICOS MEDICOS  S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ONCO3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ONCO3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ONCOCLINICAS DO BRASIL SERVICOS MEDICOS  S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ONCO3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ONCO3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CYRE3",
    companyName: "CYRELA BRAZIL REALTY S.A.EMPREEND E PART",
    sectorSlug: "bancos",
    shortDescription: "CYRELA BRAZIL REALTY S.A.EMPREEND E PART (CYRE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CYRELA BRAZIL REALTY S.A.EMPREEND E PART aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CYRE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CYRE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CYRELA BRAZIL REALTY S.A.EMPREEND E PART — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CYRE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CYRE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "HAPV3",
    companyName: "HAPVIDA PARTICIPACOES E INVESTIMENTOS SA",
    sectorSlug: "bancos",
    shortDescription: "HAPVIDA PARTICIPACOES E INVESTIMENTOS SA (HAPV3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e HAPVIDA PARTICIPACOES E INVESTIMENTOS SA aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do HAPV3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe HAPV3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "HAPVIDA PARTICIPACOES E INVESTIMENTOS SA — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "HAPV3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker HAPV3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PLPL3",
    companyName: "PLANO & PLANO DESENVOLVIMENTO IMOBILIÁRIO S.A.",
    sectorSlug: "bancos",
    shortDescription: "PLANO & PLANO DESENVOLVIMENTO IMOBILIÁRIO S.A. (PLPL3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e PLANO & PLANO DESENVOLVIMENTO IMOBILIÁRIO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do PLPL3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe PLPL3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "PLANO & PLANO DESENVOLVIMENTO IMOBILIÁRIO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "PLPL3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker PLPL3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CSNA3",
    companyName: "CIA SIDERURGICA NACIONAL",
    sectorSlug: "mineracao",
    shortDescription: "CIA SIDERURGICA NACIONAL (CSNA3) está no setor de mineração, exposto a ciclos de commodities e demanda global. O dividend yield pode ser elevado em anos de preços altos e recuar em viradas de ciclo.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos variáveis conforme resultado e ciclo de commodities.",
    historySummary: "O histórico de proventos do CSNA3 oscila com o preço das commodities. Anos de superciclo costumam trazer distribuições extraordinárias; quedas de preço reduzem o payout. Use o simulador para explorar o passado.",
    worthFollowing: "Acompanhe CSNA3 se você aceita a ciclicidade do setor de mineração em troca de potencial de dividendos altos em momentos favoráveis. Diversificação e gestão de risco são fundamentais neste setor.",
    listDescription: "CIA SIDERURGICA NACIONAL — mineração com exposição a commodities e histórico de dividendos cíclicos.",
    faqs: [
      { question: "Por que o yield do CSNA3 muda tanto?", answer: "O preço da ação e os pagamentos acompanham o ciclo de commodities. Um yield alto pode refletir queda do papel ou distribuição extraordinária." },
      { question: "Onde vejo o histórico oficial?", answer: "Consulte o RI da companhia e comunicados à CVM. O simulador desta página usa dados via API como referência educacional." }
    ],
  },

  {
    ticker: "RAIZ4",
    companyName: "RAIZEN S.A.",
    sectorSlug: "bancos",
    shortDescription: "RAIZEN S.A. (RAIZ4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e RAIZEN S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do RAIZ4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe RAIZ4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "RAIZEN S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "RAIZ4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker RAIZ4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "DIRR3",
    companyName: "DIRECIONAL ENGENHARIA S.A.",
    sectorSlug: "bancos",
    shortDescription: "DIRECIONAL ENGENHARIA S.A. (DIRR3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e DIRECIONAL ENGENHARIA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do DIRR3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe DIRR3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "DIRECIONAL ENGENHARIA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "DIRR3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker DIRR3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "QUAL3",
    companyName: "QUALICORP CONSULTORIA E CORRETORA DE SEGUROS S.A.",
    sectorSlug: "bancos",
    shortDescription: "QUALICORP CONSULTORIA E CORRETORA DE SEGUROS S.A. (QUAL3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e QUALICORP CONSULTORIA E CORRETORA DE SEGUROS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do QUAL3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe QUAL3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "QUALICORP CONSULTORIA E CORRETORA DE SEGUROS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "QUAL3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker QUAL3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "TOTS3",
    companyName: "TOTVS S.A.",
    sectorSlug: "servicos_financeiros",
    shortDescription: "TOTVS S.A. (TOTS3) atua em serviços financeiros — como bolsa, clearing, meios de pagamento ou fintechs listadas na B3. O resultado está ligado a volume de transações, tecnologia e regulação do setor.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia.",
    historySummary: "O histórico de proventos do TOTS3 acompanha a evolução do mercado de capitais e de pagamentos no Brasil. Use o simulador para explorar o passado e combine com análise de crescimento e margem.",
    worthFollowing: "Acompanhe TOTS3 se você quer exposição a infraestrutura financeira e aceita risco de regulação e ciclo de mercado. Proventos tendem a acompanhar crescimento de volume e lucratividade.",
    listDescription: "TOTVS S.A. — serviços financeiros com histórico de distribuição ligado ao mercado de capitais.",
    faqs: [
      { question: "TOTS3 é equivalente a uma ação de banco?", answer: "Não. Serviços financeiros têm drivers diferentes de bancos tradicionais — foco em transações e tecnologia, não crédito." },
      { question: "Como ver histórico de proventos?", answer: "Use o ticker TOTS3 nesta página para estimativas, e consulte o RI para dados oficiais." }
    ],
  },

  {
    ticker: "BHIA3",
    companyName: "GRUPO CASAS BAHIA S.A.",
    sectorSlug: "bancos",
    shortDescription: "GRUPO CASAS BAHIA S.A. (BHIA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e GRUPO CASAS BAHIA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BHIA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BHIA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "GRUPO CASAS BAHIA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BHIA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BHIA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "HYPE3",
    companyName: "HYPERA S.A.",
    sectorSlug: "bancos",
    shortDescription: "HYPERA S.A. (HYPE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e HYPERA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do HYPE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe HYPE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "HYPERA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "HYPE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker HYPE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "AZZA3",
    companyName: "AZZAS 2154 S.A.",
    sectorSlug: "bancos",
    shortDescription: "AZZAS 2154 S.A. (AZZA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e AZZAS 2154 S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do AZZA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe AZZA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "AZZAS 2154 S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "AZZA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker AZZA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MULT3",
    companyName: "MULTIPLAN - EMPREEND IMOBILIARIOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "MULTIPLAN - EMPREEND IMOBILIARIOS S.A. (MULT3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MULTIPLAN - EMPREEND IMOBILIARIOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MULT3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MULT3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MULTIPLAN - EMPREEND IMOBILIARIOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MULT3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MULT3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "KLBN4",
    companyName: "KLABIN S.A.",
    sectorSlug: "bancos",
    shortDescription: "KLABIN S.A. (KLBN4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e KLABIN S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do KLBN4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe KLBN4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "KLABIN S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "KLBN4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker KLBN4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PGMN3",
    companyName: "EMPREENDIMENTOS PAGUE MENOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "EMPREENDIMENTOS PAGUE MENOS S.A. (PGMN3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e EMPREENDIMENTOS PAGUE MENOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do PGMN3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe PGMN3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "EMPREENDIMENTOS PAGUE MENOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "PGMN3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker PGMN3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PETR3",
    companyName: "PETROLEO BRASILEIRO S.A. PETROBRAS",
    sectorSlug: "petroleo",
    shortDescription: "PETROLEO BRASILEIRO S.A. PETROBRAS (PETR3) atua no setor de petróleo e gás, com resultado ligado ao preço do barril, produção e câmbio. É uma das indústrias com maior potencial de dividendos em momentos de preço favorável.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Distribuição vinculada ao resultado e à política de capital da companhia.",
    historySummary: "O histórico de proventos do PETR3 varia com o preço do petróleo e decisões estratégicas da empresa. Simule com base no passado disponível e acompanhe comunicados para entender o próximo ciclo.",
    worthFollowing: "PETR3 pode ser relevante para quem busca exposição ao setor de energia com potencial de dividendos expressivos. Considere também volatilidade de commodities e risco político.",
    listDescription: "PETROLEO BRASILEIRO S.A. PETROBRAS — petróleo e gás com dividendos ligados ao ciclo de commodities.",
    faqs: [
      { question: "PETR3 paga dividendos regulares?", answer: "A regularidade depende do preço do petróleo e da política da empresa. Simulações passadas não garantem o futuro." },
      { question: "Como estimar meus proventos?", answer: "Informe PETR3 e sua quantidade de ações no simulador desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "GRND3",
    companyName: "GRENDENE S.A.",
    sectorSlug: "bancos",
    shortDescription: "GRENDENE S.A. (GRND3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e GRENDENE S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do GRND3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe GRND3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "GRENDENE S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "GRND3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker GRND3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MOTV3",
    companyName: "MOTIVA INFRAESTRUTURA DE MOBILIDADE S.A.",
    sectorSlug: "energia",
    shortDescription: "MOTIVA INFRAESTRUTURA DE MOBILIDADE S.A. (MOTV3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do MOTV3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "MOTV3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "MOTIVA INFRAESTRUTURA DE MOBILIDADE S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "MOTV3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker MOTV3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "ENEV3",
    companyName: "ENEVA S.A",
    sectorSlug: "bancos",
    shortDescription: "ENEVA S.A (ENEV3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ENEVA S.A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ENEV3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ENEV3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ENEVA S.A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ENEV3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ENEV3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "EQTL3",
    companyName: "EQUATORIAL S.A.",
    sectorSlug: "energia",
    shortDescription: "EQUATORIAL S.A. (EQTL3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do EQTL3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "EQTL3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "EQUATORIAL S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "EQTL3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker EQTL3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "NATU3",
    companyName: "NATURA COSMETICOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "NATURA COSMETICOS S.A. (NATU3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e NATURA COSMETICOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do NATU3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe NATU3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "NATURA COSMETICOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "NATU3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker NATU3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "AXIA6",
    companyName: "AXIA6",
    sectorSlug: "consumo",
    shortDescription: "AXIA6 (AXIA6) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do AXIA6 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe AXIA6 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "AXIA6 — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "AXIA6 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker AXIA6 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "MOVI3",
    companyName: "MOVIDA PARTICIPACOES SA",
    sectorSlug: "bancos",
    shortDescription: "MOVIDA PARTICIPACOES SA (MOVI3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MOVIDA PARTICIPACOES SA aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MOVI3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MOVI3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MOVIDA PARTICIPACOES SA — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MOVI3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MOVI3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BBDC3",
    companyName: "BCO BRADESCO S.A.",
    sectorSlug: "bancos",
    shortDescription: "BCO BRADESCO S.A. (BBDC3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BCO BRADESCO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BBDC3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BBDC3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BCO BRADESCO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BBDC3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BBDC3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PCAR3",
    companyName: "CIA BRASILEIRA DE DISTRIBUICAO",
    sectorSlug: "bancos",
    shortDescription: "CIA BRASILEIRA DE DISTRIBUICAO (PCAR3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CIA BRASILEIRA DE DISTRIBUICAO aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do PCAR3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe PCAR3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CIA BRASILEIRA DE DISTRIBUICAO — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "PCAR3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker PCAR3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ALPA4",
    companyName: "ALPARGATAS S.A.",
    sectorSlug: "bancos",
    shortDescription: "ALPARGATAS S.A. (ALPA4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ALPARGATAS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ALPA4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ALPA4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ALPARGATAS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ALPA4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ALPA4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BBSE3",
    companyName: "BB SEGURIDADE PARTICIPAÇÕES S.A.",
    sectorSlug: "bancos",
    shortDescription: "BB SEGURIDADE PARTICIPAÇÕES S.A. (BBSE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BB SEGURIDADE PARTICIPAÇÕES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BBSE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BBSE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BB SEGURIDADE PARTICIPAÇÕES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BBSE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BBSE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "RAPT4",
    companyName: "RANDONCORP S.A.",
    sectorSlug: "industria",
    shortDescription: "RANDONCORP S.A. (RAPT4) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    historySummary: "O histórico de proventos do RAPT4 alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.",
    worthFollowing: "RAPT4 pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.",
    listDescription: "RANDONCORP S.A. — indústria com histórico de proventos ligado ao ciclo produtivo.",
    faqs: [
      { question: "RAPT4 paga dividendos frequentes?", answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: "Informe RAPT4 e a quantidade de ações na calculadora desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "RCSL4",
    companyName: "RECRUSUL S.A.",
    sectorSlug: "bancos",
    shortDescription: "RECRUSUL S.A. (RCSL4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e RECRUSUL S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do RCSL4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe RCSL4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "RECRUSUL S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "RCSL4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker RCSL4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MBRF3",
    companyName: "MBRF3",
    sectorSlug: "consumo",
    shortDescription: "MBRF3 (MBRF3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do MBRF3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe MBRF3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "MBRF3 — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "MBRF3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker MBRF3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "DXCO3",
    companyName: "DEXCO S.A.",
    sectorSlug: "bancos",
    shortDescription: "DEXCO S.A. (DXCO3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e DEXCO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do DXCO3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe DXCO3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "DEXCO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "DXCO3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker DXCO3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CAML3",
    companyName: "CAMIL ALIMENTOS S.A.",
    sectorSlug: "consumo",
    shortDescription: "CAMIL ALIMENTOS S.A. (CAML3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do CAML3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe CAML3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "CAMIL ALIMENTOS S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "CAML3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker CAML3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "IGTI11",
    companyName: "IGUATEMI S.A.",
    sectorSlug: "consumo",
    shortDescription: "IGUATEMI S.A. (IGTI11) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do IGTI11 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe IGTI11 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "IGUATEMI S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "IGTI11 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker IGTI11 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "BRAP4",
    companyName: "BRADESPAR S.A.",
    sectorSlug: "bancos",
    shortDescription: "BRADESPAR S.A. (BRAP4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BRADESPAR S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BRAP4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BRAP4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BRADESPAR S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BRAP4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BRAP4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ALOS3",
    companyName: "ALLOS S.A",
    sectorSlug: "bancos",
    shortDescription: "ALLOS S.A (ALOS3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ALLOS S.A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ALOS3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ALOS3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ALLOS S.A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ALOS3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ALOS3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "VIVT3",
    companyName: "TELEFÔNICA BRASIL S.A",
    sectorSlug: "bancos",
    shortDescription: "TELEFÔNICA BRASIL S.A (VIVT3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e TELEFÔNICA BRASIL S.A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do VIVT3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe VIVT3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "TELEFÔNICA BRASIL S.A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "VIVT3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker VIVT3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "GMAT3",
    companyName: "GRUPO MATEUS S.A.",
    sectorSlug: "consumo",
    shortDescription: "GRUPO MATEUS S.A. (GMAT3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do GMAT3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe GMAT3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "GRUPO MATEUS S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "GMAT3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker GMAT3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "CXSE3",
    companyName: "CAIXA SEGURIDADE PARTICIPAÇÕES S.A.",
    sectorSlug: "bancos",
    shortDescription: "CAIXA SEGURIDADE PARTICIPAÇÕES S.A. (CXSE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CAIXA SEGURIDADE PARTICIPAÇÕES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CXSE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CXSE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CAIXA SEGURIDADE PARTICIPAÇÕES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CXSE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CXSE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "EZTC3",
    companyName: "EZ TEC EMPREEND. E PARTICIPACOES S.A.",
    sectorSlug: "bancos",
    shortDescription: "EZ TEC EMPREEND. E PARTICIPACOES S.A. (EZTC3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e EZ TEC EMPREEND. E PARTICIPACOES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do EZTC3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe EZTC3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "EZ TEC EMPREEND. E PARTICIPACOES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "EZTC3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker EZTC3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SUZB3",
    companyName: "SUZANO S.A.",
    sectorSlug: "bancos",
    shortDescription: "SUZANO S.A. (SUZB3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SUZANO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SUZB3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SUZB3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SUZANO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SUZB3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SUZB3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "AZEV4",
    companyName: "AZEVEDO E TRAVASSOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "AZEVEDO E TRAVASSOS S.A. (AZEV4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e AZEVEDO E TRAVASSOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do AZEV4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe AZEV4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "AZEVEDO E TRAVASSOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "AZEV4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker AZEV4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SAUD3",
    companyName: "SAUD3",
    sectorSlug: "bancos",
    shortDescription: "SAUD3 (SAUD3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SAUD3 aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SAUD3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SAUD3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SAUD3 — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SAUD3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SAUD3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CSMG3",
    companyName: "CIA SANEAMENTO DE MINAS GERAIS-COPASA MG",
    sectorSlug: "bancos",
    shortDescription: "CIA SANEAMENTO DE MINAS GERAIS-COPASA MG (CSMG3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CIA SANEAMENTO DE MINAS GERAIS-COPASA MG aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CSMG3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CSMG3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CIA SANEAMENTO DE MINAS GERAIS-COPASA MG — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CSMG3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CSMG3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CURY3",
    companyName: "CURY CONSTRUTORA E INCORPORADORA S.A.",
    sectorSlug: "bancos",
    shortDescription: "CURY CONSTRUTORA E INCORPORADORA S.A. (CURY3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CURY CONSTRUTORA E INCORPORADORA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CURY3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CURY3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CURY CONSTRUTORA E INCORPORADORA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CURY3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CURY3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CBAV3",
    companyName: "COMPANHIA BRASILEIRA DE ALUMÍNIO",
    sectorSlug: "bancos",
    shortDescription: "COMPANHIA BRASILEIRA DE ALUMÍNIO (CBAV3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e COMPANHIA BRASILEIRA DE ALUMÍNIO aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CBAV3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CBAV3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "COMPANHIA BRASILEIRA DE ALUMÍNIO — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CBAV3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CBAV3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "AURE3",
    companyName: "AUREN ENERGIA S.A.",
    sectorSlug: "energia",
    shortDescription: "AUREN ENERGIA S.A. (AURE3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do AURE3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "AURE3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "AUREN ENERGIA S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "AURE3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker AURE3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "BRKM5",
    companyName: "BRASKEM S.A.",
    sectorSlug: "industria",
    shortDescription: "BRASKEM S.A. (BRKM5) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    historySummary: "O histórico de proventos do BRKM5 alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.",
    worthFollowing: "BRKM5 pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.",
    listDescription: "BRASKEM S.A. — indústria com histórico de proventos ligado ao ciclo produtivo.",
    faqs: [
      { question: "BRKM5 paga dividendos frequentes?", answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: "Informe BRKM5 e a quantidade de ações na calculadora desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "TEND3",
    companyName: "CONSTRUTORA TENDA S.A.",
    sectorSlug: "bancos",
    shortDescription: "CONSTRUTORA TENDA S.A. (TEND3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CONSTRUTORA TENDA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do TEND3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe TEND3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CONSTRUTORA TENDA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "TEND3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker TEND3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "RECV3",
    companyName: "PETRORECÔNCAVO S.A.",
    sectorSlug: "petroleo",
    shortDescription: "PETRORECÔNCAVO S.A. (RECV3) atua no setor de petróleo e gás, com resultado ligado ao preço do barril, produção e câmbio. É uma das indústrias com maior potencial de dividendos em momentos de preço favorável.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Distribuição vinculada ao resultado e à política de capital da companhia.",
    historySummary: "O histórico de proventos do RECV3 varia com o preço do petróleo e decisões estratégicas da empresa. Simule com base no passado disponível e acompanhe comunicados para entender o próximo ciclo.",
    worthFollowing: "RECV3 pode ser relevante para quem busca exposição ao setor de energia com potencial de dividendos expressivos. Considere também volatilidade de commodities e risco político.",
    listDescription: "PETRORECÔNCAVO S.A. — petróleo e gás com dividendos ligados ao ciclo de commodities.",
    faqs: [
      { question: "RECV3 paga dividendos regulares?", answer: "A regularidade depende do preço do petróleo e da política da empresa. Simulações passadas não garantem o futuro." },
      { question: "Como estimar meus proventos?", answer: "Informe RECV3 e sua quantidade de ações no simulador desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "ITUB3",
    companyName: "ITAU UNIBANCO HOLDING S.A.",
    sectorSlug: "bancos",
    shortDescription: "ITAU UNIBANCO HOLDING S.A. (ITUB3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ITAU UNIBANCO HOLDING S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ITUB3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ITUB3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ITAU UNIBANCO HOLDING S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ITUB3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ITUB3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PSSA3",
    companyName: "PORTO SEGURO S.A.",
    sectorSlug: "bancos",
    shortDescription: "PORTO SEGURO S.A. (PSSA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e PORTO SEGURO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do PSSA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe PSSA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "PORTO SEGURO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "PSSA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker PSSA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MDIA3",
    companyName: "M.DIAS BRANCO S.A. IND COM DE ALIMENTOS",
    sectorSlug: "bancos",
    shortDescription: "M.DIAS BRANCO S.A. IND COM DE ALIMENTOS (MDIA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e M.DIAS BRANCO S.A. IND COM DE ALIMENTOS aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MDIA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MDIA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "M.DIAS BRANCO S.A. IND COM DE ALIMENTOS — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MDIA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MDIA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PMAM3",
    companyName: "PARANAPANEMA S.A.",
    sectorSlug: "bancos",
    shortDescription: "PARANAPANEMA S.A. (PMAM3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e PARANAPANEMA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do PMAM3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe PMAM3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "PARANAPANEMA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "PMAM3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker PMAM3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "INTB3",
    companyName: "INTELBRAS S.A. IND DE TELEC ELETRONICA BRASILEIRA",
    sectorSlug: "bancos",
    shortDescription: "INTELBRAS S.A. IND DE TELEC ELETRONICA BRASILEIRA (INTB3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e INTELBRAS S.A. IND DE TELEC ELETRONICA BRASILEIRA aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do INTB3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe INTB3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "INTELBRAS S.A. IND DE TELEC ELETRONICA BRASILEIRA — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "INTB3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker INTB3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SMTO3",
    companyName: "SAO MARTINHO S.A.",
    sectorSlug: "bancos",
    shortDescription: "SAO MARTINHO S.A. (SMTO3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SAO MARTINHO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SMTO3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SMTO3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SAO MARTINHO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SMTO3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SMTO3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SIMH3",
    companyName: "SIMPAR S.A.",
    sectorSlug: "bancos",
    shortDescription: "SIMPAR S.A. (SIMH3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SIMPAR S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SIMH3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SIMH3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SIMPAR S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SIMH3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SIMH3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SBFG3",
    companyName: "GRUPO SBF SA",
    sectorSlug: "consumo",
    shortDescription: "GRUPO SBF SA (SBFG3) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do SBFG3 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe SBFG3 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "GRUPO SBF SA — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "SBFG3 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker SBFG3 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "GFSA3",
    companyName: "GAFISA S.A.",
    sectorSlug: "bancos",
    shortDescription: "GAFISA S.A. (GFSA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e GAFISA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do GFSA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe GFSA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "GAFISA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "GFSA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker GFSA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ISAE4",
    companyName: "ISA ENERGIA BRASIL S.A",
    sectorSlug: "energia",
    shortDescription: "ISA ENERGIA BRASIL S.A (ISAE4) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do ISAE4 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "ISAE4 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "ISA ENERGIA BRASIL S.A — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "ISAE4 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker ISAE4 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "TTEN3",
    companyName: "TRÊS TENTOS AGROINDUSTRIAL S/A",
    sectorSlug: "bancos",
    shortDescription: "TRÊS TENTOS AGROINDUSTRIAL S/A (TTEN3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e TRÊS TENTOS AGROINDUSTRIAL S/A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do TTEN3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe TTEN3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "TRÊS TENTOS AGROINDUSTRIAL S/A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "TTEN3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker TTEN3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "FLRY3",
    companyName: "FLEURY S.A.",
    sectorSlug: "bancos",
    shortDescription: "FLEURY S.A. (FLRY3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e FLEURY S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do FLRY3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe FLRY3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "FLEURY S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "FLRY3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker FLRY3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "AXIA7",
    companyName: "AXIA7",
    sectorSlug: "consumo",
    shortDescription: "AXIA7 (AXIA7) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do AXIA7 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe AXIA7 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "AXIA7 — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "AXIA7 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker AXIA7 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "CSED3",
    companyName: "CRUZEIRO DO SUL EDUCACIONAL S.A.",
    sectorSlug: "bancos",
    shortDescription: "CRUZEIRO DO SUL EDUCACIONAL S.A. (CSED3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CRUZEIRO DO SUL EDUCACIONAL S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CSED3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CSED3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CRUZEIRO DO SUL EDUCACIONAL S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CSED3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CSED3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "VVEO3",
    companyName: "CM HOSPITALAR S.A.",
    sectorSlug: "bancos",
    shortDescription: "CM HOSPITALAR S.A. (VVEO3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CM HOSPITALAR S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do VVEO3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe VVEO3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CM HOSPITALAR S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "VVEO3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker VVEO3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ENGI11",
    companyName: "ENERGISA S.A.",
    sectorSlug: "consumo",
    shortDescription: "ENERGISA S.A. (ENGI11) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do ENGI11 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe ENGI11 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "ENERGISA S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "ENGI11 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker ENGI11 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "TFCO4",
    companyName: "TRACK & FIELD CO S.A.",
    sectorSlug: "bancos",
    shortDescription: "TRACK & FIELD CO S.A. (TFCO4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e TRACK & FIELD CO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do TFCO4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe TFCO4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "TRACK & FIELD CO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "TFCO4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker TFCO4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SANB11",
    companyName: "BCO SANTANDER (BRASIL) S.A.",
    sectorSlug: "bancos",
    shortDescription: "BCO SANTANDER (BRASIL) S.A. (SANB11) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BCO SANTANDER (BRASIL) S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SANB11 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SANB11 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BCO SANTANDER (BRASIL) S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SANB11 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SANB11 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "HBSA3",
    companyName: "HIDROVIAS DO BRASIL S.A.",
    sectorSlug: "industria",
    shortDescription: "HIDROVIAS DO BRASIL S.A. (HBSA3) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    historySummary: "O histórico de proventos do HBSA3 alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.",
    worthFollowing: "HBSA3 pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.",
    listDescription: "HIDROVIAS DO BRASIL S.A. — indústria com histórico de proventos ligado ao ciclo produtivo.",
    faqs: [
      { question: "HBSA3 paga dividendos frequentes?", answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: "Informe HBSA3 e a quantidade de ações na calculadora desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "DASA3",
    companyName: "DIAGNOSTICOS DA AMERICA S.A.",
    sectorSlug: "bancos",
    shortDescription: "DIAGNOSTICOS DA AMERICA S.A. (DASA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e DIAGNOSTICOS DA AMERICA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do DASA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe DASA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "DIAGNOSTICOS DA AMERICA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "DASA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker DASA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "LIGT3",
    companyName: "LIGHT S.A.",
    sectorSlug: "bancos",
    shortDescription: "LIGHT S.A. (LIGT3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e LIGHT S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do LIGT3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe LIGT3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "LIGHT S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "LIGT3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker LIGT3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "VULC3",
    companyName: "VULCABRAS S.A.",
    sectorSlug: "bancos",
    shortDescription: "VULCABRAS S.A. (VULC3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e VULCABRAS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do VULC3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe VULC3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "VULCABRAS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "VULC3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker VULC3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "AZTE3",
    companyName: "AZEVEDO & TRAVASSOS ENERGIA S.A.",
    sectorSlug: "energia",
    shortDescription: "AZEVEDO & TRAVASSOS ENERGIA S.A. (AZTE3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do AZTE3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "AZTE3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "AZEVEDO & TRAVASSOS ENERGIA S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "AZTE3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker AZTE3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "MILS3",
    companyName: "MILLS LOCAÇÃO. SERVIÇOS E LOGÍSTICA S.A",
    sectorSlug: "industria",
    shortDescription: "MILLS LOCAÇÃO. SERVIÇOS E LOGÍSTICA S.A (MILS3) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    historySummary: "O histórico de proventos do MILS3 alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.",
    worthFollowing: "MILS3 pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.",
    listDescription: "MILLS LOCAÇÃO. SERVIÇOS E LOGÍSTICA S.A — indústria com histórico de proventos ligado ao ciclo produtivo.",
    faqs: [
      { question: "MILS3 paga dividendos frequentes?", answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: "Informe MILS3 e a quantidade de ações na calculadora desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "SLCE3",
    companyName: "SLC AGRICOLA S.A.",
    sectorSlug: "servicos_financeiros",
    shortDescription: "SLC AGRICOLA S.A. (SLCE3) atua em serviços financeiros — como bolsa, clearing, meios de pagamento ou fintechs listadas na B3. O resultado está ligado a volume de transações, tecnologia e regulação do setor.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia.",
    historySummary: "O histórico de proventos do SLCE3 acompanha a evolução do mercado de capitais e de pagamentos no Brasil. Use o simulador para explorar o passado e combine com análise de crescimento e margem.",
    worthFollowing: "Acompanhe SLCE3 se você quer exposição a infraestrutura financeira e aceita risco de regulação e ciclo de mercado. Proventos tendem a acompanhar crescimento de volume e lucratividade.",
    listDescription: "SLC AGRICOLA S.A. — serviços financeiros com histórico de distribuição ligado ao mercado de capitais.",
    faqs: [
      { question: "SLCE3 é equivalente a uma ação de banco?", answer: "Não. Serviços financeiros têm drivers diferentes de bancos tradicionais — foco em transações e tecnologia, não crédito." },
      { question: "Como ver histórico de proventos?", answer: "Use o ticker SLCE3 nesta página para estimativas, e consulte o RI para dados oficiais." }
    ],
  },

  {
    ticker: "WIZC3",
    companyName: "WIZ CO PARTICIPAÇÕES E CORRETAGEM DE SEGUROS S.A.",
    sectorSlug: "bancos",
    shortDescription: "WIZ CO PARTICIPAÇÕES E CORRETAGEM DE SEGUROS S.A. (WIZC3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e WIZ CO PARTICIPAÇÕES E CORRETAGEM DE SEGUROS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do WIZC3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe WIZC3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "WIZ CO PARTICIPAÇÕES E CORRETAGEM DE SEGUROS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "WIZC3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker WIZC3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MYPK3",
    companyName: "IOCHPE MAXION S.A.",
    sectorSlug: "industria",
    shortDescription: "IOCHPE MAXION S.A. (MYPK3) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    historySummary: "O histórico de proventos do MYPK3 alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.",
    worthFollowing: "MYPK3 pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.",
    listDescription: "IOCHPE MAXION S.A. — indústria com histórico de proventos ligado ao ciclo produtivo.",
    faqs: [
      { question: "MYPK3 paga dividendos frequentes?", answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: "Informe MYPK3 e a quantidade de ações na calculadora desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "CPFE3",
    companyName: "CPFL ENERGIA S.A.",
    sectorSlug: "energia",
    shortDescription: "CPFL ENERGIA S.A. (CPFE3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do CPFE3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "CPFE3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "CPFL ENERGIA S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "CPFE3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker CPFE3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "AMER3",
    companyName: "AMERICANAS S.A",
    sectorSlug: "bancos",
    shortDescription: "AMERICANAS S.A (AMER3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e AMERICANAS S.A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do AMER3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe AMER3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "AMERICANAS S.A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "AMER3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker AMER3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BMGB4",
    companyName: "BANCO BMG S.A.",
    sectorSlug: "bancos",
    shortDescription: "BANCO BMG S.A. (BMGB4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BANCO BMG S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BMGB4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BMGB4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BANCO BMG S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BMGB4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BMGB4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MEAL3",
    companyName: "INTERNATIONAL MEAL COMPANY ALIMENTACAO S.A.",
    sectorSlug: "bancos",
    shortDescription: "INTERNATIONAL MEAL COMPANY ALIMENTACAO S.A. (MEAL3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e INTERNATIONAL MEAL COMPANY ALIMENTACAO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MEAL3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MEAL3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "INTERNATIONAL MEAL COMPANY ALIMENTACAO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MEAL3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MEAL3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "RIAA3",
    companyName: "RIAA3",
    sectorSlug: "bancos",
    shortDescription: "RIAA3 (RIAA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e RIAA3 aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do RIAA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe RIAA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "RIAA3 — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "RIAA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker RIAA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BRSR6",
    companyName: "BCO ESTADO DO RIO GRANDE DO SUL S.A.",
    sectorSlug: "consumo",
    shortDescription: "BCO ESTADO DO RIO GRANDE DO SUL S.A. (BRSR6) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do BRSR6 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe BRSR6 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "BCO ESTADO DO RIO GRANDE DO SUL S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "BRSR6 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker BRSR6 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "SEQL3",
    companyName: "SEQUOIA LOGISTICA E TRANSPORTES S.A",
    sectorSlug: "bancos",
    shortDescription: "SEQUOIA LOGISTICA E TRANSPORTES S.A (SEQL3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SEQUOIA LOGISTICA E TRANSPORTES S.A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SEQL3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SEQL3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SEQUOIA LOGISTICA E TRANSPORTES S.A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SEQL3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SEQL3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "NEOE3",
    companyName: "NEOENERGIA S.A.",
    sectorSlug: "energia",
    shortDescription: "NEOENERGIA S.A. (NEOE3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do NEOE3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "NEOE3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "NEOENERGIA S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "NEOE3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker NEOE3 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "SOJA3",
    companyName: "BOA SAFRA SEMENTES S.A.",
    sectorSlug: "bancos",
    shortDescription: "BOA SAFRA SEMENTES S.A. (SOJA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BOA SAFRA SEMENTES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SOJA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SOJA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BOA SAFRA SEMENTES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SOJA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SOJA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ALUP11",
    companyName: "ALUPAR INVESTIMENTO S/A",
    sectorSlug: "consumo",
    shortDescription: "ALUPAR INVESTIMENTO S/A (ALUP11) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do ALUP11 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe ALUP11 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "ALUPAR INVESTIMENTO S/A — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "ALUP11 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker ALUP11 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "MLAS3",
    companyName: "GRUPO MULTI S.A.",
    sectorSlug: "bancos",
    shortDescription: "GRUPO MULTI S.A. (MLAS3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e GRUPO MULTI S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MLAS3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MLAS3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "GRUPO MULTI S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MLAS3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MLAS3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SHUL4",
    companyName: "SCHULZ S.A.",
    sectorSlug: "bancos",
    shortDescription: "SCHULZ S.A. (SHUL4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SCHULZ S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SHUL4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SHUL4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SCHULZ S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SHUL4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SHUL4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MDNE3",
    companyName: "MOURA DUBEUX ENGENHARIA S/A",
    sectorSlug: "bancos",
    shortDescription: "MOURA DUBEUX ENGENHARIA S/A (MDNE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MOURA DUBEUX ENGENHARIA S/A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MDNE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MDNE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MOURA DUBEUX ENGENHARIA S/A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MDNE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MDNE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "VLID3",
    companyName: "VALID SOLUÇÕES S.A.",
    sectorSlug: "bancos",
    shortDescription: "VALID SOLUÇÕES S.A. (VLID3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e VALID SOLUÇÕES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do VLID3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe VLID3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "VALID SOLUÇÕES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "VLID3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker VLID3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "AZEV3",
    companyName: "AZEVEDO E TRAVASSOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "AZEVEDO E TRAVASSOS S.A. (AZEV3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e AZEVEDO E TRAVASSOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do AZEV3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe AZEV3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "AZEVEDO E TRAVASSOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "AZEV3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker AZEV3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "KLBN3",
    companyName: "KLABIN S.A.",
    sectorSlug: "bancos",
    shortDescription: "KLABIN S.A. (KLBN3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e KLABIN S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do KLBN3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe KLBN3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "KLABIN S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "KLBN3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker KLBN3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "LAVV3",
    companyName: "LAVVI EMPREENDIMENTOS IMOBILIÁRIOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "LAVVI EMPREENDIMENTOS IMOBILIÁRIOS S.A. (LAVV3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e LAVVI EMPREENDIMENTOS IMOBILIÁRIOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do LAVV3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe LAVV3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "LAVVI EMPREENDIMENTOS IMOBILIÁRIOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "LAVV3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker LAVV3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PINE4",
    companyName: "BCO PINE S.A.",
    sectorSlug: "bancos",
    shortDescription: "BCO PINE S.A. (PINE4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BCO PINE S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do PINE4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe PINE4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BCO PINE S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "PINE4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker PINE4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "RANI3",
    companyName: "IRANI PAPEL E EMBALAGEM S.A.",
    sectorSlug: "bancos",
    shortDescription: "IRANI PAPEL E EMBALAGEM S.A. (RANI3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e IRANI PAPEL E EMBALAGEM S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do RANI3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe RANI3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "IRANI PAPEL E EMBALAGEM S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "RANI3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker RANI3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "JSLG3",
    companyName: "JSL S.A.",
    sectorSlug: "bancos",
    shortDescription: "JSL S.A. (JSLG3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e JSL S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do JSLG3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe JSLG3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "JSL S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "JSLG3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker JSLG3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "KEPL3",
    companyName: "KEPLER WEBER S.A.",
    sectorSlug: "bancos",
    shortDescription: "KEPLER WEBER S.A. (KEPL3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e KEPLER WEBER S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do KEPL3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe KEPL3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "KEPLER WEBER S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "KEPL3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker KEPL3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CASH3",
    companyName: "MÉLIUZ S.A.",
    sectorSlug: "bancos",
    shortDescription: "MÉLIUZ S.A. (CASH3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MÉLIUZ S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CASH3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CASH3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MÉLIUZ S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CASH3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CASH3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "USIM3",
    companyName: "USINAS SID DE MINAS GERAIS S.A.-USIMINAS",
    sectorSlug: "mineracao",
    shortDescription: "USINAS SID DE MINAS GERAIS S.A.-USIMINAS (USIM3) está no setor de mineração, exposto a ciclos de commodities e demanda global. O dividend yield pode ser elevado em anos de preços altos e recuar em viradas de ciclo.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos variáveis conforme resultado e ciclo de commodities.",
    historySummary: "O histórico de proventos do USIM3 oscila com o preço das commodities. Anos de superciclo costumam trazer distribuições extraordinárias; quedas de preço reduzem o payout. Use o simulador para explorar o passado.",
    worthFollowing: "Acompanhe USIM3 se você aceita a ciclicidade do setor de mineração em troca de potencial de dividendos altos em momentos favoráveis. Diversificação e gestão de risco são fundamentais neste setor.",
    listDescription: "USINAS SID DE MINAS GERAIS S.A.-USIMINAS — mineração com exposição a commodities e histórico de dividendos cíclicos.",
    faqs: [
      { question: "Por que o yield do USIM3 muda tanto?", answer: "O preço da ação e os pagamentos acompanham o ciclo de commodities. Um yield alto pode refletir queda do papel ou distribuição extraordinária." },
      { question: "Onde vejo o histórico oficial?", answer: "Consulte o RI da companhia e comunicados à CVM. O simulador desta página usa dados via API como referência educacional." }
    ],
  },

  {
    ticker: "POMO3",
    companyName: "MARCOPOLO S.A.",
    sectorSlug: "industria",
    shortDescription: "MARCOPOLO S.A. (POMO3) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    historySummary: "O histórico de proventos do POMO3 alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.",
    worthFollowing: "POMO3 pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.",
    listDescription: "MARCOPOLO S.A. — indústria com histórico de proventos ligado ao ciclo produtivo.",
    faqs: [
      { question: "POMO3 paga dividendos frequentes?", answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: "Informe POMO3 e a quantidade de ações na calculadora desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "EVEN3",
    companyName: "EVEN CONSTRUTORA E INCORPORADORA S.A.",
    sectorSlug: "bancos",
    shortDescription: "EVEN CONSTRUTORA E INCORPORADORA S.A. (EVEN3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e EVEN CONSTRUTORA E INCORPORADORA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do EVEN3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe EVEN3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "EVEN CONSTRUTORA E INCORPORADORA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "EVEN3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker EVEN3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BRBI11",
    companyName: "BRBI BR PARTNERS S.A.",
    sectorSlug: "consumo",
    shortDescription: "BRBI BR PARTNERS S.A. (BRBI11) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do BRBI11 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe BRBI11 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "BRBI BR PARTNERS S.A. — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "BRBI11 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker BRBI11 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "SAPR11",
    companyName: "CIA SANEAMENTO DO PARANA - SANEPAR",
    sectorSlug: "consumo",
    shortDescription: "CIA SANEAMENTO DO PARANA - SANEPAR (SAPR11) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do SAPR11 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe SAPR11 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "CIA SANEAMENTO DO PARANA - SANEPAR — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "SAPR11 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker SAPR11 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "ESPA3",
    companyName: "MPM CORPÓREOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "MPM CORPÓREOS S.A. (ESPA3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MPM CORPÓREOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ESPA3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ESPA3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MPM CORPÓREOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ESPA3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ESPA3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "POSI3",
    companyName: "POSITIVO TECNOLOGIA S.A.",
    sectorSlug: "bancos",
    shortDescription: "POSITIVO TECNOLOGIA S.A. (POSI3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e POSITIVO TECNOLOGIA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do POSI3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe POSI3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "POSITIVO TECNOLOGIA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "POSI3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker POSI3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ENJU3",
    companyName: "ENJOEI S.A.",
    sectorSlug: "bancos",
    shortDescription: "ENJOEI S.A. (ENJU3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ENJOEI S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ENJU3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ENJU3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ENJOEI S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ENJU3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ENJU3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ABCB4",
    companyName: "BCO ABC BRASIL S.A.",
    sectorSlug: "bancos",
    shortDescription: "BCO ABC BRASIL S.A. (ABCB4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BCO ABC BRASIL S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ABCB4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ABCB4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BCO ABC BRASIL S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ABCB4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ABCB4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "JALL3",
    companyName: "JALLES MACHADO S.A.",
    sectorSlug: "bancos",
    shortDescription: "JALLES MACHADO S.A. (JALL3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e JALLES MACHADO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do JALL3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe JALL3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "JALLES MACHADO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "JALL3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker JALL3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ARML3",
    companyName: "ARMAC LOCAÇÃO. LOGÍSTICA E SERVIÇOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "ARMAC LOCAÇÃO. LOGÍSTICA E SERVIÇOS S.A. (ARML3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ARMAC LOCAÇÃO. LOGÍSTICA E SERVIÇOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ARML3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ARML3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ARMAC LOCAÇÃO. LOGÍSTICA E SERVIÇOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ARML3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ARML3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "TUPY3",
    companyName: "TUPY S.A.",
    sectorSlug: "bancos",
    shortDescription: "TUPY S.A. (TUPY3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e TUPY S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do TUPY3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe TUPY3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "TUPY S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "TUPY3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker TUPY3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "TGMA3",
    companyName: "TEGMA GESTAO LOGISTICA S.A.",
    sectorSlug: "industria",
    shortDescription: "TEGMA GESTAO LOGISTICA S.A. (TGMA3) é uma empresa industrial listada na B3, com exposição a capacidade de produção, exportação e custos de insumos. O setor distribui dividendos conforme resultado e ciclo de investimentos.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado operacional e política de capital da empresa.",
    historySummary: "O histórico de proventos do TGMA3 alterna períodos de payout maior com ciclos de CAPEX intenso. Analise o fluxo de caixa livre e a alavancagem para entender a sustentabilidade dos dividendos.",
    worthFollowing: "TGMA3 pode interessar a quem busca diversificação industrial com potencial de proventos em fases de geração de caixa. Volatilidade cambial e de insumos são fatores de risco relevantes.",
    listDescription: "TEGMA GESTAO LOGISTICA S.A. — indústria com histórico de proventos ligado ao ciclo produtivo.",
    faqs: [
      { question: "TGMA3 paga dividendos frequentes?", answer: "A frequência varia com o ciclo da companhia. Consulte RI e comunicados para o calendário atualizado." },
      { question: "Como simular meus proventos?", answer: "Informe TGMA3 e a quantidade de ações na calculadora desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "FESA4",
    companyName: "CIA FERRO LIGAS DA BAHIA - FERBASA",
    sectorSlug: "petroleo",
    shortDescription: "CIA FERRO LIGAS DA BAHIA - FERBASA (FESA4) atua no setor de petróleo e gás, com resultado ligado ao preço do barril, produção e câmbio. É uma das indústrias com maior potencial de dividendos em momentos de preço favorável.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Distribuição vinculada ao resultado e à política de capital da companhia.",
    historySummary: "O histórico de proventos do FESA4 varia com o preço do petróleo e decisões estratégicas da empresa. Simule com base no passado disponível e acompanhe comunicados para entender o próximo ciclo.",
    worthFollowing: "FESA4 pode ser relevante para quem busca exposição ao setor de energia com potencial de dividendos expressivos. Considere também volatilidade de commodities e risco político.",
    listDescription: "CIA FERRO LIGAS DA BAHIA - FERBASA — petróleo e gás com dividendos ligados ao ciclo de commodities.",
    faqs: [
      { question: "FESA4 paga dividendos regulares?", answer: "A regularidade depende do preço do petróleo e da política da empresa. Simulações passadas não garantem o futuro." },
      { question: "Como estimar meus proventos?", answer: "Informe FESA4 e sua quantidade de ações no simulador desta página para uma estimativa educacional." }
    ],
  },

  {
    ticker: "ORVR3",
    companyName: "ORIZON VALORIZACAO DE RESIDUOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "ORIZON VALORIZACAO DE RESIDUOS S.A. (ORVR3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ORIZON VALORIZACAO DE RESIDUOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ORVR3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ORVR3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ORIZON VALORIZACAO DE RESIDUOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ORVR3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ORVR3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "HBRE3",
    companyName: "HBR REALTY EMPREENDIMENTOS IMOBILIARIOS S/A",
    sectorSlug: "bancos",
    shortDescription: "HBR REALTY EMPREENDIMENTOS IMOBILIARIOS S/A (HBRE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e HBR REALTY EMPREENDIMENTOS IMOBILIARIOS S/A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do HBRE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe HBRE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "HBR REALTY EMPREENDIMENTOS IMOBILIARIOS S/A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "HBRE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker HBRE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "VGIR11",
    companyName: "VGIR11",
    sectorSlug: "consumo",
    shortDescription: "VGIR11 (VGIR11) atua no setor de consumo, com receita ligada ao varejo e ao poder de compra da população. O histórico de proventos acompanha margens, expansão e geração de caixa da companhia.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de dividendos do VGIR11 reflete ciclos de consumo, competição e estratégia de expansão. Compare o fluxo recebido nos últimos 12 meses com o preço atual para avaliar o yield em contexto.",
    worthFollowing: "Acompanhe VGIR11 se você busca exposição ao consumo doméstico com algum histórico de distribuição. Margens e crescimento competem com o payout — analise os relatórios trimestrais.",
    listDescription: "VGIR11 — consumo com histórico de proventos ligado ao mercado interno.",
    faqs: [
      { question: "VGIR11 é uma ação defensiva?", answer: "Empresas de consumo básico tendem a ser mais resilientes, mas não há garantia de dividendos estáveis. Confira sempre os comunicados." },
      { question: "Como simular dividendos?", answer: "Use o ticker VGIR11 na calculadora desta página para estimativas com base em dados históricos disponíveis." }
    ],
  },

  {
    ticker: "SAPR4",
    companyName: "CIA SANEAMENTO DO PARANA - SANEPAR",
    sectorSlug: "bancos",
    shortDescription: "CIA SANEAMENTO DO PARANA - SANEPAR (SAPR4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CIA SANEAMENTO DO PARANA - SANEPAR aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SAPR4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SAPR4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CIA SANEAMENTO DO PARANA - SANEPAR — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SAPR4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SAPR4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "IFCM3",
    companyName: "INFRACOMMERCE CXAAS S.A.",
    sectorSlug: "bancos",
    shortDescription: "INFRACOMMERCE CXAAS S.A. (IFCM3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e INFRACOMMERCE CXAAS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do IFCM3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe IFCM3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "INFRACOMMERCE CXAAS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "IFCM3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker IFCM3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "VTRU3",
    companyName: "VITRU EDUCAÇÃO S.A",
    sectorSlug: "bancos",
    shortDescription: "VITRU EDUCAÇÃO S.A (VTRU3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e VITRU EDUCAÇÃO S.A aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do VTRU3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe VTRU3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "VITRU EDUCAÇÃO S.A — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "VTRU3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker VTRU3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MTRE3",
    companyName: "MITRE REALTY EMPREENDIMENTOS E PARTICIPAÇÕES S.A.",
    sectorSlug: "bancos",
    shortDescription: "MITRE REALTY EMPREENDIMENTOS E PARTICIPAÇÕES S.A. (MTRE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MITRE REALTY EMPREENDIMENTOS E PARTICIPAÇÕES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MTRE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MTRE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MITRE REALTY EMPREENDIMENTOS E PARTICIPAÇÕES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MTRE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MTRE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "FIQE3",
    companyName: "UNIFIQUE TELECOMUNICAÇÕES S.A.",
    sectorSlug: "bancos",
    shortDescription: "UNIFIQUE TELECOMUNICAÇÕES S.A. (FIQE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e UNIFIQUE TELECOMUNICAÇÕES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do FIQE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe FIQE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "UNIFIQUE TELECOMUNICAÇÕES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "FIQE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker FIQE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "INEP3",
    companyName: "INEPAR S.A. INDUSTRIA E CONSTRUCOES",
    sectorSlug: "bancos",
    shortDescription: "INEPAR S.A. INDUSTRIA E CONSTRUCOES (INEP3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e INEPAR S.A. INDUSTRIA E CONSTRUCOES aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do INEP3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe INEP3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "INEPAR S.A. INDUSTRIA E CONSTRUCOES — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "INEP3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker INEP3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "MELK3",
    companyName: "MELNICK DESENVOLVIMENTO IMOBILIÁRIO S.A.",
    sectorSlug: "bancos",
    shortDescription: "MELNICK DESENVOLVIMENTO IMOBILIÁRIO S.A. (MELK3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MELNICK DESENVOLVIMENTO IMOBILIÁRIO S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do MELK3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe MELK3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MELNICK DESENVOLVIMENTO IMOBILIÁRIO S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "MELK3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker MELK3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "ALLD3",
    companyName: "ALLIED TECNOLOGIA S.A.",
    sectorSlug: "bancos",
    shortDescription: "ALLIED TECNOLOGIA S.A. (ALLD3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ALLIED TECNOLOGIA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do ALLD3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe ALLD3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ALLIED TECNOLOGIA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "ALLD3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker ALLD3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "LPSB3",
    companyName: "LPS BRASIL - CONSULTORIA DE IMOVEIS S.A.",
    sectorSlug: "bancos",
    shortDescription: "LPS BRASIL - CONSULTORIA DE IMOVEIS S.A. (LPSB3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e LPS BRASIL - CONSULTORIA DE IMOVEIS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do LPSB3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe LPSB3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "LPS BRASIL - CONSULTORIA DE IMOVEIS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "LPSB3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker LPSB3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PNVL3",
    companyName: "DIMED S.A. DISTRIBUIDORA DE MEDICAMENTOS",
    sectorSlug: "bancos",
    shortDescription: "DIMED S.A. DISTRIBUIDORA DE MEDICAMENTOS (PNVL3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e DIMED S.A. DISTRIBUIDORA DE MEDICAMENTOS aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do PNVL3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe PNVL3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "DIMED S.A. DISTRIBUIDORA DE MEDICAMENTOS — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "PNVL3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker PNVL3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SEER3",
    companyName: "SER EDUCACIONAL S.A.",
    sectorSlug: "bancos",
    shortDescription: "SER EDUCACIONAL S.A. (SEER3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SER EDUCACIONAL S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SEER3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SEER3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SER EDUCACIONAL S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SEER3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SEER3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BMOB3",
    companyName: "BEMOBI MOBILE TECH S.A.",
    sectorSlug: "bancos",
    shortDescription: "BEMOBI MOBILE TECH S.A. (BMOB3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BEMOBI MOBILE TECH S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BMOB3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BMOB3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BEMOBI MOBILE TECH S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BMOB3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BMOB3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "OIBR3",
    companyName: "OI S.A.",
    sectorSlug: "bancos",
    shortDescription: "OI S.A. (OIBR3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e OI S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do OIBR3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe OIBR3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "OI S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "OIBR3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker OIBR3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BLAU3",
    companyName: "BLAU FARMACÊUTICA S.A.",
    sectorSlug: "bancos",
    shortDescription: "BLAU FARMACÊUTICA S.A. (BLAU3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BLAU FARMACÊUTICA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BLAU3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BLAU3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BLAU FARMACÊUTICA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BLAU3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BLAU3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "DESK3",
    companyName: "DESKTOP S.A.",
    sectorSlug: "bancos",
    shortDescription: "DESKTOP S.A. (DESK3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e DESKTOP S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do DESK3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe DESK3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "DESKTOP S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "DESK3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker DESK3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "HBOR3",
    companyName: "HELBOR EMPREENDIMENTOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "HELBOR EMPREENDIMENTOS S.A. (HBOR3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e HELBOR EMPREENDIMENTOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do HBOR3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe HBOR3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "HELBOR EMPREENDIMENTOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "HBOR3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker HBOR3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "OBTC3",
    companyName: "ORANJEBTC S.A. - EDUCAÇÃO E INVESTIMENTO",
    sectorSlug: "bancos",
    shortDescription: "ORANJEBTC S.A. - EDUCAÇÃO E INVESTIMENTO (OBTC3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e ORANJEBTC S.A. - EDUCAÇÃO E INVESTIMENTO aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do OBTC3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe OBTC3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "ORANJEBTC S.A. - EDUCAÇÃO E INVESTIMENTO — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "OBTC3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker OBTC3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "RENT4",
    companyName: "LOCALIZA RENT A CAR S.A.",
    sectorSlug: "bancos",
    shortDescription: "LOCALIZA RENT A CAR S.A. (RENT4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e LOCALIZA RENT A CAR S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do RENT4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe RENT4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "LOCALIZA RENT A CAR S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "RENT4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker RENT4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "SYNE3",
    companyName: "SYN PROP E TECH S.A.",
    sectorSlug: "bancos",
    shortDescription: "SYN PROP E TECH S.A. (SYNE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e SYN PROP E TECH S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do SYNE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe SYNE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "SYN PROP E TECH S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "SYNE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker SYNE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "OPCT3",
    companyName: "OCEANPACT SERVICOS MARITIMOS S.A.",
    sectorSlug: "bancos",
    shortDescription: "OCEANPACT SERVICOS MARITIMOS S.A. (OPCT3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e OCEANPACT SERVICOS MARITIMOS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do OPCT3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe OPCT3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "OCEANPACT SERVICOS MARITIMOS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "OPCT3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker OPCT3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "BRST3",
    companyName: "BRISANET SERVIÇOS DE TELECOMUNICAÇÕES S.A.",
    sectorSlug: "bancos",
    shortDescription: "BRISANET SERVIÇOS DE TELECOMUNICAÇÕES S.A. (BRST3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e BRISANET SERVIÇOS DE TELECOMUNICAÇÕES S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do BRST3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe BRST3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "BRISANET SERVIÇOS DE TELECOMUNICAÇÕES S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "BRST3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker BRST3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "PRNR3",
    companyName: "PRINER SERVIÇOS INDUSTRIAIS S.A.",
    sectorSlug: "bancos",
    shortDescription: "PRINER SERVIÇOS INDUSTRIAIS S.A. (PRNR3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e PRINER SERVIÇOS INDUSTRIAIS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do PRNR3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe PRNR3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "PRINER SERVIÇOS INDUSTRIAIS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "PRNR3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker PRNR3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "LEVE3",
    companyName: "MAHLE-METAL LEVE S.A.",
    sectorSlug: "bancos",
    shortDescription: "MAHLE-METAL LEVE S.A. (LEVE3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e MAHLE-METAL LEVE S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do LEVE3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe LEVE3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "MAHLE-METAL LEVE S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "LEVE3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker LEVE3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "LOGG3",
    companyName: "LOG COMMERCIAL PROPERTIES",
    sectorSlug: "bancos",
    shortDescription: "LOG COMMERCIAL PROPERTIES (LOGG3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e LOG COMMERCIAL PROPERTIES aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do LOGG3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe LOGG3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "LOG COMMERCIAL PROPERTIES — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "LOGG3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker LOGG3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "IRBR3",
    companyName: "IRB - BRASIL RESSEGUROS S.A.",
    sectorSlug: "bancos",
    shortDescription: "IRB - BRASIL RESSEGUROS S.A. (IRBR3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e IRB - BRASIL RESSEGUROS S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do IRBR3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe IRBR3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "IRB - BRASIL RESSEGUROS S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "IRBR3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker IRBR3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "VITT3",
    companyName: "VITTIA S.A.",
    sectorSlug: "bancos",
    shortDescription: "VITTIA S.A. (VITT3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e VITTIA S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do VITT3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe VITT3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "VITTIA S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "VITT3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker VITT3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "TOKY3",
    companyName: "TOKY3",
    sectorSlug: "bancos",
    shortDescription: "TOKY3 (TOKY3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e TOKY3 aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do TOKY3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe TOKY3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "TOKY3 — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "TOKY3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker TOKY3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "TAEE4",
    companyName: "TRANSMISSORA ALIANÇA DE ENERGIA ELÉTRICA S.A.",
    sectorSlug: "energia",
    shortDescription: "TRANSMISSORA ALIANÇA DE ENERGIA ELÉTRICA S.A. (TAEE4) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do TAEE4 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "TAEE4 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "TRANSMISSORA ALIANÇA DE ENERGIA ELÉTRICA S.A. — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "TAEE4 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker TAEE4 e sua quantidade de ações." }
    ],
  },

  {
    ticker: "TRIS3",
    companyName: "TRISUL S.A.",
    sectorSlug: "bancos",
    shortDescription: "TRISUL S.A. (TRIS3) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e TRISUL S.A. aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do TRIS3 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe TRIS3 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "TRISUL S.A. — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "TRIS3 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker TRIS3 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CYRE4",
    companyName: "CYRELA BRAZIL REALTY S.A.EMPREEND E PART",
    sectorSlug: "bancos",
    shortDescription: "CYRELA BRAZIL REALTY S.A.EMPREEND E PART (CYRE4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e CYRELA BRAZIL REALTY S.A.EMPREEND E PART aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do CYRE4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe CYRE4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "CYRELA BRAZIL REALTY S.A.EMPREEND E PART — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "CYRE4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker CYRE4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "INEP4",
    companyName: "INEPAR S.A. INDUSTRIA E CONSTRUCOES",
    sectorSlug: "bancos",
    shortDescription: "INEPAR S.A. INDUSTRIA E CONSTRUCOES (INEP4) é uma instituição financeira listada na B3. O setor bancário costuma distribuir proventos via dividendos e JCP, e INEPAR S.A. INDUSTRIA E CONSTRUCOES aparece em carteiras voltadas a renda passiva no segmento financeiro.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Dividendos e JCP conforme política da companhia e calendário divulgado no RI.",
    historySummary: "O histórico de proventos do INEP4 acompanha ciclos de resultado, inadimplência e política de capital do banco. Compare o total distribuído nos últimos 12 meses com o preço atual para contextualizar o dividend yield, lembrando que o passado não garante o futuro.",
    worthFollowing: "Acompanhe INEP4 se você busca exposição ao setor financeiro com histórico de distribuição de proventos. Combine a simulação desta página com análise de balanço, guidance e spread de crédito antes de qualquer decisão.",
    listDescription: "INEPAR S.A. INDUSTRIA E CONSTRUCOES — banco listado na B3 com histórico de distribuição de proventos.",
    faqs: [
      { question: "INEP4 paga dividendos mensais?", answer: "A frequência depende da política da companhia. Confira os comunicados oficiais e o RI para o calendário atualizado." },
      { question: "Como simular quanto recebo?", answer: "Informe o ticker INEP4 e a quantidade de ações na calculadora desta página. Os valores são estimativas com base em dados públicos." }
    ],
  },

  {
    ticker: "CMIG3",
    companyName: "CIA ENERGETICA DE MINAS GERAIS - CEMIG",
    sectorSlug: "energia",
    shortDescription: "CIA ENERGETICA DE MINAS GERAIS - CEMIG (CMIG3) atua no setor elétrico brasileiro, com geração, transmissão ou distribuição de energia. Empresas de energia costumam ter receita contratada e são acompanhadas por investidores de dividendos que buscam visibilidade de fluxo de caixa.",
    dividendYieldPct: 0,
    payoutPct: 0,
    priceBrl: 0,
    paymentFrequency: "Proventos conforme resultado e política de distribuição da companhia.",
    historySummary: "O histórico de proventos do CMIG3 reflete contratos de concessão, revisões tarifárias e decisões de CAPEX. Simule com base no passado, mas acompanhe comunicados regulatórios antes de projetar o futuro.",
    worthFollowing: "CMIG3 pode interessar a quem busca uma ação com receita relativamente previsível no setor de utilities. Considere também risco regulatório e o ciclo de renovação de concessões.",
    listDescription: "CIA ENERGETICA DE MINAS GERAIS - CEMIG — empresa do setor elétrico com histórico de proventos.",
    faqs: [
      { question: "CMIG3 é uma ação defensiva?", answer: "Empresas de energia tendem a ter receita mais estável, mas risco regulatório e de CAPEX existem. O histórico de dividendos não garante o próximo pagamento." },
      { question: "Como calcular meus dividendos?", answer: "Use a calculadora desta página com o ticker CMIG3 e sua quantidade de ações." }
    ],
  },
];
