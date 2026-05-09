import type { SectorRecord, SectorSlug } from "./types";
import { SECTOR_SLUGS } from "./types";

export { SECTOR_SLUGS };

export const SECTORS: Record<SectorSlug, SectorRecord> = {
  bancos: {
    slug: "bancos",
    name: "Bancos",
    icon: "account_balance",
    intro:
      "O setor bancário na B3 concentra grandes instituições de crédito e serviços financeiros com histórico de distribuição de lucros aos acionistas. Bancos costumam combinar dividendos e juros sobre capital próprio (JCP), o que altera tanto a tributação quanto a forma como o investidor acompanha os proventos ao longo do ano.",
    dividendRelevance: [
      "Para quem busca renda recorrente, bancos costumam ser um dos primeiros setores analisados. A lógica é direta: instituições financeiras lucrativas tendem a distribuir parte do resultado via dividendos e JCP, com políticas que em alguns casos são comunicadas explicitamente ao mercado — o que facilita o acompanhamento do fluxo esperado.",
      "Na prática, o quadro é mais variado. Margens financeiras, inadimplência, provisões e o ciclo da Selic influenciam diretamente a geração de caixa de cada banco. Em períodos de aperto monetário, custo de captação e resultado de tesouraria se comportam de forma distinta entre instituições, a depender do mix de crédito, presença no agronegócio e exposição a seguros e outros produtos.",
      "O dividend yield bancário pode parecer atrativo em certos momentos e menos competitivo em outros. Comparar apenas o yield entre pares ignora diferenças de capitalização, qualidade da carteira e perspectiva de resultado. Use as páginas individuais de cada ticker para ver o histórico real de proventos antes de qualquer conclusão.",
    ],
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
    icon: "bolt",
    intro:
      "O setor elétrico na B3 engloba geradoras, transmissoras e distribuidoras com perfis bastante distintos de receita e risco. A natureza regulada de boa parte das concessões atrai investidores que buscam previsibilidade de fluxo de caixa, mas nem todo ativo do setor tem o mesmo grau de proteção.",
    dividendRelevance: [
      "Empresas de transmissão de energia costumam ser vistas como as de perfil mais estável dentro do setor: a receita é basicamente contratual, com ajustes periódicos pela regulação da Aneel, e o CAPEX após a construção da linha tende a ser baixo. Isso cria condições para payout mais elevado — o que explica por que vários investidores de dividendos acompanham transmissoras de perto.",
      "Geradoras trazem um fator de risco adicional: o hidrológico. Em anos de escassez hídrica, usinas que dependem de reservatórios podem precisar comprar energia no mercado spot a preços mais altos, comprimindo margem. Geradoras com mix diversificado (hidro + eólica + solar) têm mitigado parte dessa exposição nos últimos ciclos.",
      "Revisões tarifárias periódicas e políticas de CAPEX para renovação de concessões são variáveis que podem alterar o ritmo de proventos de uma empresa para outra. Olhe o histórico de distribuição de cada ativo individualmente; o setor como um todo não garante uniformidade de rendimento.",
    ],
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
    icon: "landscape",
    intro:
      "A mineração brasileira tem protagonismo global, sobretudo em minério de ferro. O setor é fortemente cíclico: preço de commodities, demanda internacional (especialmente da China) e custos operacionais movem lucros e políticas de dividendos de forma expressiva.",
    dividendRelevance: [
      "Em anos de preço elevado e volume alto, mineradoras costumam gerar caixa livre robusto e podem distribuir dividendos expressivos — incluindo pagamentos extraordinários que inflam o yield do período. Por isso, o investidor que acompanha o setor precisa separar o que é distribuição recorrente do que é pontual, relacionado a um ciclo favorável.",
      "Quando o ciclo se inverte — queda no preço do minério, retração da demanda industrial global ou custos operacionais acima do esperado —, a empresa pode reduzir proventos para preservar balanço e financiar projetos. O dividend yield que parecia alto em retrospecto pode não se repetir nos anos seguintes.",
      "Para contextualizar o histórico, vale acompanhar o preço do minério de ferro e o guidance de produção divulgado pelas companhias. Use as páginas individuais de cada ticker para ver o histórico real de proventos e simular cenários com a sua quantidade de cotas — sem tratar o passado como garantia do futuro.",
    ],
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
  consumo: {
    slug: "consumo",
    name: "Consumo",
    icon: "shopping_bag",
    intro:
      "Empresas de bens de consumo listadas na B3 atuam em bebidas, alimentos, higiene e segmentos correlatos. Elas costumam ter receitas ligadas ao varejo e ao poder de compra da população, com exposição indireta a câmbio e commodities agrícolas via custos de insumos.",
    dividendRelevance: [
      "O retorno ao acionista em consumo depende de margens operacionais, geração de caixa livre e política de remuneração da companhia. Empresas com marcas consolidadas e poder de repasse de preços ao consumidor tendem a ter mais consistência na distribuição; negócios em expansão agressiva costumam reter mais caixa para crescimento.",
      "Inflação de custos — matérias-primas agrícolas, embalagens, logística — pressiona margem em certos ciclos. Quando o poder de repasse não acompanha o custo, o resultado cai e o espaço para payout se reduz. Por isso, anos de margem pressionada podem coincidir com dividendos menores mesmo em companhias com histórico robusto.",
      "Acompanhe o ritmo de distribuição de cada ativo de forma individual. O rótulo 'defensivo' aplicado a consumo indica demanda recorrente, mas não garante dividendos estáveis em qualquer cenário. Use o histórico real de proventos de cada ticker como ponto de partida.",
    ],
    faqs: [
      {
        question: "Consumo é “defensivo” para dividendos?",
        answer:
          "Muitas ações do setor são chamadas de defensivas por demanda recorrente, mas isso não garante dividendos estáveis. Concorrência, custo de insumos e decisões estratégicas mudam o fluxo de caixa.",
      },
      {
        question: "Como simular dividendos de uma ação de consumo?",
        answer:
          "Use o ticker na página do Simula Dividendos e informe quantas cotas você possui. Os valores são estimativas educacionais com base em dados disponíveis, sem promessa de rendimento futuro.",
      },
    ],
  },
  industria: {
    slug: "industria",
    name: "Indústria",
    icon: "factory",
    intro:
      "O setor industrial na B3 é heterogêneo: vai de fabricantes de bens de capital e equipamentos a papel, celulose e embalagens. Perfis de risco e ciclo variam bastante, assim como a capacidade de distribuir dividendos em diferentes momentos do negócio.",
    dividendRelevance: [
      "A capacidade de pagar dividendos em empresas industriais está diretamente ligada ao ciclo dos seus produtos. Fabricantes de bens de capital dependem de encomendas e CAPEX corporativo; produtores de papel e celulose oscilam com preço de commodity florestal e demanda de embalagens. Anos favoráveis permitem payout mais alto; ciclos de inversão costumam pressionar tanto margem quanto distribuição.",
      "Companhias industriais com geração de caixa consistente, baixo endividamento e ciclos de investimento espaçados tendem a ter mais regularidade nos proventos. Mas períodos de expansão de capacidade, aquisições ou pressão de custo de matéria-prima podem reduzir o espaço para dividendos mesmo em empresas com bom histórico.",
      "Para o investidor de dividendos, histórico longo e alavancagem são mais informativos do que o yield de um único ano. Use as páginas individuais de cada ticker para ver o comportamento real dos proventos ao longo do tempo.",
    ],
    faqs: [
      {
        question: "Indústria paga dividendos mensais?",
        answer:
          "Na B3, a frequência mais comum não é mensal para ações ordinárias; depende da companhia. FIIs costumam ter outro calendário. Confira sempre os comunicados oficiais.",
      },
      {
        question: "Por que comparar indústrias diferentes pode ser difícil?",
        answer:
          "Mix de produtos, exposição cambial, commodities e intensidade de capital mudam o risco e a previsibilidade de caixa. Compare com pars mais próximos do mesmo segmento.",
      },
    ],
  },
  petroleo: {
    slug: "petroleo",
    name: "Petróleo e gás",
    icon: "local_gas_station",
    intro:
      "O setor de petróleo e gás na B3 tem forte concentração em grandes operadoras de exploração e produção offshore. Resultados e política de dividendos estão diretamente ligados ao preço do barril, ao câmbio, ao volume de produção e às decisões estratégicas das companhias.",
    dividendRelevance: [
      "Quando o preço do petróleo está elevado e a produção opera bem, empresas do setor podem gerar caixa expressivo e distribuir dividendos significativos — incluindo pagamentos extraordinários que elevam o yield do período de forma pontual. Nesses ciclos, o setor costuma aparecer entre os maiores pagadores de proventos da B3.",
      "A volatilidade é o traço mais importante a considerar. Oscilações no preço do Brent, variações cambiais, custo de extração offshore e mudanças de política energética ou de gestão afetam diretamente o resultado. Dividendos extraordinários de anos de superciclo não devem ser usados como base para projeção recorrente.",
      "Acompanhe o guidance de produção, o nível de endividamento e os comunicados de política de capital antes de interpretar qualquer número de yield. Use o histórico disponível em cada página de ticker para simular com base em dados reais, sem confundir passado com garantia futura.",
    ],
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
  servicos_financeiros: {
    slug: "servicos_financeiros",
    name: "Serviços financeiros",
    icon: "payments",
    intro:
      "Além dos bancos, a B3 lista empresas de infraestrutura de mercado, gestoras, seguradoras e fintechs. Esses negócios têm perfis de receita e risco distintos entre si, o que também se reflete nas políticas de dividendos.",
    dividendRelevance: [
      "Empresas de infraestrutura de mercado — como bolsas e câmaras de compensação — costumam ter receitas atreladas ao volume de negócios, número de contratos e produtos financeiros em circulação. Em períodos de mercado aquecido, a geração de caixa tende a ser robusta; em momentos de baixa atividade, volumes caem e margens se comprimem.",
      "Seguradoras e gestoras de ativos têm dinâmicas diferentes: resultado depende de sinistralidade, rentabilidade de carteira e captação. A política de dividendos de cada uma reflete essas particularidades — algumas têm payout explícito, outras são mais discricionárias na distribuição.",
      "Comparar serviços financeiros com bancos apenas pelo yield costuma ser enganoso. Os drivers de receita, a exposição regulatória e o perfil de risco são diferentes. Analise cada companhia individualmente e use o histórico de proventos disponível nas páginas de ticker para contextualizar a métrica.",
    ],
    faqs: [
      {
        question: "Ações de infraestrutura de mercado são iguais a bancos?",
        answer:
          "Não. Os drivers de receita e risco são diferentes. Convém ler relatórios e separar exposição a crédito (bancos) de exposição a atividade de mercado (bolsa, clearing etc.).",
      },
      {
        question: "Onde vejo o histórico de proventos?",
        answer:
          "Na página do ticker no Simula Dividendos e nos canais de RI da companhia, além de comunicados à CVM.",
      },
    ],
  },
};

export function isSectorSlug(s: string): s is SectorSlug {
  return (SECTOR_SLUGS as readonly string[]).includes(s);
}
