import type { ArticleRecord } from "./types";

export const ARTICLES: ArticleRecord[] = [
  {
    slug: "o-que-e-dividend-yield",
    title: "O que é dividend yield? Entenda como interpretar dividendos",
    description:
      "Dividend yield mede a relação entre dividendos e preço da ação. Veja o que ele significa, como ele pode variar e como usar a métrica sem tomar decisões impulsivas.",
    keywords: ["dividend yield", "dividendos", "renda passiva", "ações B3", "como interpretar"],
    relatedTickers: ["BBAS3", "ITUB4", "PETR4"],
    relatedSectors: ["bancos", "petroleo"],
    sections: [
      {
        heading: "Dividend yield em uma frase",
        paragraphs: [
          "O dividend yield é uma métrica que relaciona o valor distribuído aos acionistas com o preço atual da ação. Na prática, ele ajuda a comparar retorno de dividendos entre diferentes momentos (ou entre empresas) — mas não conta a história completa.",
          "Como envolve preço e proventos, o yield pode subir quando a ação cai, mesmo sem melhora real na capacidade de pagamento. Por isso, ele deve ser interpretado junto com o contexto do negócio e o histórico de dividendos.",
        ],
      },
      {
        heading: "Por que o dividend yield muda",
        paragraphs: [
          "Mudanças no preço de mercado afetam o denominador da conta. Já mudanças nos dividendos (ou na política de remuneração) afetam o numerador.",
          "Além disso, o tipo de provento (dividendos vs JCP) e a consistência dos pagamentos ao longo do tempo podem alterar a leitura do investidor de renda.",
        ],
      },
      {
        heading: "Como usar o yield com responsabilidade",
        paragraphs: [
          "Use o yield como ponto de partida para perguntas: esse retorno é consistente? Qual o histórico? Qual o setor e o ciclo do negócio?",
          "No Simula Dividendos, você pode simular valores educacionais com base em dados de histórico, ajustando a quantidade de cotas para entender o impacto no seu fluxo de proventos.",
        ],
      },
    ],
    faqs: [
      {
        question: "Dividend yield alto significa renda garantida?",
        answer:
          "Não. Dividend yield é uma leitura de um período e depende de preço e proventos. Dividendos futuros dependem de resultados, política de remuneração e decisões do conselho/assembleia.",
      },
      {
        question: "É melhor comparar yield entre setores diferentes?",
        answer:
          "Geralmente não. Setores têm ritmos e riscos diferentes (ciclicidade, regulação, custos e ciclo de commodities). Compare preferencialmente dentro do mesmo setor e com mais contexto.",
      },
      {
        question: "Como o Simula Dividendos entra nisso?",
        answer:
          "O Simula Dividendos ajuda a transformar histórico de dividendos em uma estimativa por cota para o seu número de ações. Isso facilita entender o impacto da sua carteira, sem prometer retorno futuro.",
      },
    ],
  },
  {
    slug: "como-viver-de-dividendos",
    title: "Como viver de dividendos: passo a passo para planejar renda passiva",
    description:
      "Planejar renda por dividendos envolve mais do que escolher uma ação. Veja como pensar em orçamento, horizonte, reinvestimento e consistência.",
    keywords: ["viver de dividendos", "planejamento", "renda passiva", "dividendos", "reinvestimento"],
    relatedTickers: ["VALE3", "TAEE11", "EGIE3"],
    relatedSectors: ["energia", "mineracao"],
    sections: [
      {
        heading: "1) Defina o objetivo com clareza",
        paragraphs: [
          "Antes de buscar “renda mensal”, defina quanto você precisa e em que horizonte. Renda passiva costuma ser construída aos poucos, e dividendos não seguem calendário imutável para todos os papéis.",
          "Separe o que é necessário gastar do que pode ser reinvestido para aumentar o número de cotas ao longo do tempo.",
        ],
      },
      {
        heading: "2) Entenda o que é recorrência (e o que não é)",
        paragraphs: [
          "Dividendos dependem de lucros, caixa, decisões corporativas e, em alguns setores, do ciclo do negócio. Por isso, a recorrência precisa ser avaliada com histórico e com cautela.",
          "Ferramentas como o Simula Dividendos ajudam a visualizar estimativas educacionais e comparar cenários com a sua quantidade de ações.",
        ],
      },
      {
        heading: "3) Monte um plano de acompanhamento",
        paragraphs: [
          "Acompanhar não significa reagir a cada manchete. Significa revisar teses, resultados e comunicação da companhia, além de acompanhar o comportamento dos proventos ao longo do tempo.",
        ],
      },
    ],
    faqs: [
      {
        question: "Dá para viver apenas de dividendos?",
        answer:
          "Pode ser possível para alguns perfis e objetivos, mas envolve patrimônio, disciplina e diversificação. Dividendos não são garantidos e variam com o tempo.",
      },
      {
        question: "Reinvestir é sempre melhor?",
        answer:
          "Reinvestir costuma acelerar o crescimento da posição. Mas a melhor decisão depende do seu objetivo de renda e da sua capacidade de manter aportes.",
      },
      {
        question: "O que observar nos comunicados?",
        answer:
          "Política de remuneração, resultados, guidance, eventos relevantes e notas sobre proventos. Isso ajuda a entender se a tese de dividendos segue coerente.",
      },
    ],
  },
  {
    slug: "quanto-investir-para-receber-1000-por-mes",
    title: "Quanto investir para receber R$ 1.000/mês com dividendos (estimativas)",
    description:
      "Não existe fórmula mágica, mas dá para estimar cenários educacionais. Aprenda a estruturar a conta usando dividendos por cota e seu orçamento.",
    keywords: ["R$ 1000 por mês", "quanto investir", "estimativas", "dividendos", "simulação"],
    relatedTickers: ["BBAS3", "ITUB4", "PETR4"],
    relatedSectors: ["bancos", "petroleo"],
    sections: [
      {
        heading: "A ideia por trás da estimativa",
        paragraphs: [
          "Para estimar um valor mensal, você precisa transformar dividendos por cota em projeção de recebimento. O calendário de pagamentos e a composição da carteira também influenciam.",
          "No Simula Dividendos, você simula quantas cotas terá e como o histórico pode se traduzir em estimativas educacionais.",
        ],
      },
      {
        heading: "Como montar cenários de forma realista",
        paragraphs: [
          "Use um intervalo de tempo (ex.: últimos meses/anos) em vez de um ponto isolado. Isso ajuda a reduzir viés.",
          "Considere que dividendos podem aumentar ou diminuir. Evite tratar estimativas como promessa.",
          "Diversifique por setores e, quando fizer sentido, por diferentes perfis de risco.",
        ],
      },
      {
        heading: "O que fazer com a incerteza",
        paragraphs: [
          "Se sua meta é de renda mensal, pense também em alternativas: parcela reinvestida, complementação por outros fluxos e manutenção de aportes.",
          "Planejamento melhora a resiliência quando o mercado ou a empresa não entrega exatamente o que você esperava.",
        ],
      },
    ],
    faqs: [
      {
        question: "Existe um valor “certo” para chegar em R$ 1.000/mês?",
        answer:
          "Não. Você consegue estimar cenários usando histórico, mas dividendos não são garantidos. O valor varia com preço, resultados e política de remuneração.",
      },
      {
        question: "Qual é o principal erro ao fazer essa conta?",
        answer:
          "Tratar yield e histórico como previsão direta, ignorando o ciclo do negócio e a possível mudança de proventos no futuro.",
      },
      {
        question: "Como o simulador ajuda na prática?",
        answer:
          "Ele permite ajustar o número de cotas e visualizar estimativas educacionais. Assim, você consegue revisar hipótese e refinar seu plano.",
      },
    ],
  },
  {
    slug: "melhores-acoes-de-dividendos",
    title: "Como avaliar “ações de dividendos” na prática (sem atalhos)",
    description:
      "Em vez de apostar em uma lista genérica, aprenda a avaliar consistência, ciclo do setor, política de remuneração e risco — com apoio de simulações.",
    keywords: ["ações de dividendos", "avaliação", "consistência", "risco", "simulador"],
    relatedTickers: ["TAEE11", "EGIE3", "VALE3"],
    relatedSectors: ["energia", "mineracao"],
    sections: [
      {
        heading: "O que procurar além do yield",
        paragraphs: [
          "Yield sozinho não explica sustentabilidade. Vale olhar consistência de pagamentos, variação ao longo dos anos e como a empresa reage a ciclos econômicos.",
          "Política de remuneração e qualidade dos resultados ajudam a entender se a distribuição é “planejada” ou “eventual”.",
        ],
      },
      {
        heading: "Como usar o Simula Dividendos na avaliação",
        paragraphs: [
          "Use o simulador para transformar histórico em estimativas por cota. Isso deixa mais claro como a sua carteira poderia se comportar em cenários diferentes.",
          "Depois, complemente com leitura de resultados, comunicados e fatos relevantes para sustentar (ou descartar) a tese.",
        ],
      },
      {
        heading: "Risco e diversificação",
        paragraphs: [
          "Dividendos não são garantidos. Uma carteira diversificada por setor e por perfil de risco pode reduzir a dependência de poucos eventos.",
          "Se sua meta é renda, pense em resiliência do fluxo e em alternativas para o período de baixa distribuição.",
        ],
      },
    ],
    faqs: [
      {
        question: "Existe uma lista definitiva das “melhores” ações de dividendos?",
        answer:
          "Não existe lista definitiva. O que é “melhor” depende do seu objetivo, horizonte, tolerância a risco e do ciclo do setor em cada momento.",
      },
      {
        question: "O yield pode enganar?",
        answer:
          "Pode. Um yield alto pode refletir queda do preço ou um evento pontual de proventos. Por isso, o histórico e o contexto importam.",
      },
      {
        question: "Como começar se sou iniciante?",
        answer:
          "Comece com um conjunto pequeno de setores, entenda os mecanismos de retorno ao acionista e use simulações educacionais para formar intuição.",
      },
    ],
  },
  {
    slug: "como-calcular-renda-passiva",
    title: "Como calcular renda passiva por dividendos (com simulações)",
    description:
      "Entenda como organizar uma conta de renda passiva: dividendos por cota, quantidade de ações, frequência de pagamento e consistência do histórico.",
    keywords: ["renda passiva", "calcular", "dividendos", "simulação", "organização"],
    relatedTickers: ["BBAS3", "TAEE11", "ITUB4"],
    relatedSectors: ["bancos", "energia"],
    sections: [
      {
        heading: "1) Identifique o que você quer calcular",
        paragraphs: [
          "Renda passiva por dividendos não é só “quanto recebo por mês”. Também é entender a frequência, a distribuição ao longo do tempo e o quanto do seu patrimônio está ligado a esse fluxo.",
          "Use o Simula Dividendos para simular com seu número de cotas e observar o impacto educacional do histórico.",
        ],
      },
      {
        heading: "2) Use o histórico como referência",
        paragraphs: [
          "A leitura do histórico reduz o risco de depender de um único período. Ainda assim, o futuro pode ser diferente, então trate como estimativa.",
        ],
      },
      {
        heading: "3) Estruture o acompanhamento",
        paragraphs: [
          "Revise os dados, observe mudanças na política de remuneração e mantenha consistência no seu plano de aportes. Isso melhora sua leitura de cenários.",
        ],
      },
    ],
    faqs: [
      {
        question: "Como tratar pagamentos extraordinários?",
        answer:
          "Pagamentos extraordinários podem distorcer o cálculo. Por isso, use intervalos de tempo e considere que o valor pode não se repetir.",
      },
      {
        question: "O simulador é uma previsão?",
        answer:
          "Não. O simulador usa dados educacionais/estimativas e não garante resultados futuros.",
      },
      {
        question: "Posso usar a mesma metodologia para vários setores?",
        answer:
          "Sim. O ponto é sempre entender o ciclo do setor, a frequência de pagamentos e as diferenças entre dividendos, JCP e outras formas de remuneração.",
      },
    ],
  },
];
