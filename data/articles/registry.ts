import type { ArticleRecord } from "./types";

export const ARTICLES: ArticleRecord[] = [
  {
    slug: "o-que-e-dividend-yield",
    coverImage: "/articles/o-que-e-dividend-yield.png",
    lastModified: "2026-03-25",
    title: "O que é dividend yield? Entenda como interpretar dividendos",
    description:
      "Dividend yield mede a relação entre dividendos e preço da ação. Veja o que ele significa, como ele pode variar e como usar a métrica sem tomar decisões impulsivas.",
    keywords: ["dividend yield", "dividendos", "renda passiva", "ações B3", "como interpretar"],
    relatedTickers: ["BBAS3", "ITUB4", "PETR4", "VALE3", "WEGE3"],
    relatedFiis: ["MXRF11", "HGLG11", "XPLG11", "KNRI11", "VGHF11"],
    relatedSectors: ["bancos", "petroleo"],
    relatedArticleSlugs: [
      "como-calcular-renda-passiva",
      "melhores-fiis-para-renda-mensal",
      "quanto-investir-para-viver-de-dividendos",
      "fiis-que-pagam-dividendos-todo-mes",
    ],
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
        subsections: [
          {
            heading: "Checklist rápido antes de comparar yields",
            paragraphs: [
              "Confira se você está usando o mesmo período (por exemplo, proventos dos últimos 12 meses) e se o preço da ação é o mesmo tipo de cotação (fechamento, média etc.). Pequenas diferenças de método mudam o número.",
              "Depois, pergunte se o yield subiu porque a empresa aumentou distribuição ou porque o mercado descontou a ação. São histórias diferentes para o investidor de longo prazo.",
            ],
          },
          {
            heading: "Onde o simulador ajuda",
            paragraphs: [
              "Ao abrir uma página de ticker (por exemplo BBAS3, PETR4 ou ITUB4), você transforma o histórico em valores por cota para a sua quantidade de ações. Isso aproxima a métrica do seu bolso — ainda assim, sem prometer o próximo ano.",
            ],
          },
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
    coverImage: "/articles/como-viver-de-dividendos.png",
    lastModified: "2026-03-25",
    title: "Como viver de dividendos: passo a passo para planejar renda passiva",
    description:
      "Planejar renda por dividendos envolve mais do que escolher uma ação. Veja como pensar em orçamento, horizonte, reinvestimento e consistência.",
    keywords: ["viver de dividendos", "planejamento", "renda passiva", "dividendos", "reinvestimento"],
    relatedTickers: ["VALE3", "TAEE11", "EGIE3"],
    relatedFiis: ["MXRF11", "KNCR11"],
    relatedSectors: ["energia", "mineracao"],
    sections: [
      {
        heading: "Defina o objetivo com clareza",
        paragraphs: [
          "Antes de buscar “renda mensal”, defina quanto você precisa e em que horizonte. Renda passiva costuma ser construída aos poucos, e dividendos não seguem calendário imutável para todos os papéis.",
          "Separe o que é necessário gastar do que pode ser reinvestido para aumentar o número de cotas ao longo do tempo.",
        ],
      },
      {
        heading: "O que é recorrência (e o que não é)",
        paragraphs: [
          "Dividendos dependem de lucros, caixa, decisões corporativas e, em alguns setores, do ciclo do negócio. Por isso, a recorrência precisa ser avaliada com histórico e com cautela.",
          "Ferramentas como o Simula Dividendos ajudam a visualizar estimativas educacionais e comparar cenários com a sua quantidade de ações.",
        ],
      },
      {
        heading: "Monte um plano de acompanhamento",
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
    coverImage: "/articles/quanto-investir-para-receber-1000-por-mes.png",
    lastModified: "2026-03-25",
    title: "Quanto investir para receber R$ 1.000/mês com dividendos (estimativas)",
    description:
      "Não existe fórmula mágica, mas dá para estimar cenários educacionais. Aprenda a estruturar a conta usando dividendos por cota e seu orçamento.",
    keywords: ["R$ 1000 por mês", "quanto investir", "estimativas", "dividendos", "simulação"],
    relatedTickers: ["BBAS3", "ITUB4", "PETR4", "TAEE11", "EGIE3"],
    relatedFiis: ["MXRF11", "HGLG11", "KNRI11"],
    relatedSectors: ["bancos", "petroleo"],
    relatedArticleSlugs: ["quanto-investir-para-receber-1000-reais-por-mes"],
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
    slug: "quanto-investir-para-receber-1000-reais-por-mes",
    coverImage: "/articles/quanto-investir-para-receber-1000-reais-por-mes.png",
    lastModified: "2026-03-25",
    title: "Quanto investir para receber R$ 1.000 reais por mês? (sem promessas)",
    description:
      "A conta é: renda desejada em função do provento por cota que você observa no histórico. Veja como montar o raciocínio com o simulador — sem inventar dividendos futuros.",
    quickAnswer:
      "Ninguém pode dizer um patrimônio exato sem saber quanto cada ativo paga por cota na sua carteira. Para ~R$ 1.000/mês, a ideia é: provento por cota (no período que você escolher) × quantidade de cotas — e os proventos mudam.",
    keywords: [
      "1000 reais por mês",
      "quanto investir",
      "dividendos",
      "renda mensal",
      "simulador",
    ],
    relatedTickers: ["PETR4", "TAEE11", "BBAS3", "ITUB4", "VALE3"],
    relatedFiis: ["MXRF11", "HGLG11", "KNRI11"],
    relatedSectors: ["bancos", "petroleo"],
    relatedArticleSlugs: [
      "quanto-investir-para-receber-1000-por-mes",
      "como-calcular-renda-passiva",
      "fiis-que-pagam-dividendos-todo-mes",
    ],
    sections: [
      {
        heading: "Como a pergunta deve ser formulada",
        paragraphs: [
          "“Quanto investir?” só ganha resposta depois que você define com quais ativos está falando. Cada papel tem provento ou rendimento por cota diferente e calendário diferente.",
          "O caminho honesto é: abrir a página do ticker ou FII no Simula Dividendos, ver o que a fonte mostrou nos últimos pagamentos e usar o simulador para multiplicar pela quantidade de cotas.",
        ],
      },
      {
        heading: "A conta em linguagem simples",
        paragraphs: [
          "Uma aproximação útil: renda mensal desejada ≈ valor por cota no período que você está usando × número de cotas. O “valor por cota” não é universal: vem do histórico de cada ativo.",
          "Se você mistura ações e FIIs, some os fluxos de cada posição. O site ajuda a ver por ativo; a consolidação do planejamento continua sendo sua.",
        ],
      },
      {
        heading: "Simulação prática no site",
        paragraphs: [
          "Em páginas como PETR4 ou TAEE11, use o simulador com uma quantidade de cotas (por exemplo 100) e veja quanto o último provento da lista representaria em reais para essa posição. Ajuste as cotas para explorar cenários.",
          "Para fundos imobiliários, compare MXRF11 e pares na seção de FIIs. A página /fiis/mxrf11-paga-quanto-por-mes reforça a pergunta “quanto paga por mês” com os mesmos dados da visão geral do fundo.",
        ],
      },
      {
        heading: "Riscos de planejar só em cima da meta",
        paragraphs: [
          "Empresas e fundos mudam distribuição conforme resultado e política. Trate R$ 1.000/mês como cenário educacional, não como renda garantida.",
          "Impostos, preço das cotas, vacância em FIIs e reinvestimento alteram o que efetivamente sobra.",
        ],
      },
    ],
    faqs: [
      {
        question: "Existe um valor único de patrimônio para R$ 1.000/mês?",
        answer:
          "Não. Depende do mix de ativos e dos proventos por cota em cada um. Use o simulador por ticker para encostar na realidade dos dados exibidos na página.",
      },
      {
        question: "Este artigo substitui o outro sobre R$ 1.000/mês?",
        answer:
          "Eles se complementam: aqui o foco está na busca por “1000 reais” e em links diretos para tickers e FIIs. O outro artigo aprofunda o raciocínio geral de estimativa.",
      },
      {
        question: "O simulador garante o próximo mês?",
        answer:
          "Não. Ele usa dados de histórico na interface para fins educacionais; decisões e riscos são sempre seus.",
      },
    ],
  },
  {
    slug: "fiis-que-pagam-dividendos-todo-mes",
    coverImage: "/articles/fiis-que-pagam-dividendos-todo-mes.png",
    lastModified: "2026-03-25",
    title: "FIIs que pagam dividendos todo mês? Rendimento e calendário",
    description:
      "O termo popular é “dividendo”, mas em FIIs fala-se em rendimentos distribuídos. Entenda periodicidade, limites da linguagem e como usar o simulador sem achismo.",
    quickAnswer:
      "Fiis distribuem rendimentos (não o mesmo conceito jurídico de dividendo de ação). Muitos fundos miram pagamentos mensais, mas data e valor dependem do regulamento e do resultado — confirme no administrador.",
    keywords: ["FII todo mês", "rendimento mensal", "FIIs dividendos", "B3", "simulador FII"],
    relatedTickers: ["TAEE11"],
    relatedFiis: ["MXRF11", "HGLG11", "XPLG11", "KNCR11", "KNRI11", "VGHF11"],
    relatedSectors: [],
    relatedArticleSlugs: [
      "melhores-fiis-para-renda-mensal",
      "quanto-investir-para-receber-1000-reais-por-mes",
      "o-que-e-dividend-yield",
    ],
    sections: [
      {
        heading: "Por que a pergunta é comum",
        paragraphs: [
          "Quem busca fluxo na bolsa costuma querer previsibilidade. FIIs são frequentemente associados a pagamentos regulares — e muitos fundos de papel ou tijolo de fato trabalham com distribuições frequentes.",
          "Ainda assim, “todo mês” não é promessa: pode haver meses sem distribuição, valores diferentes ou mudança de política.",
        ],
      },
      {
        heading: "Rendimento de FII ≠ dividendo de ação",
        paragraphs: [
          "Na conversa do investidor, tudo vira “dividendo”. Tecnicamente, companhias abertas pagam dividendos/JCP conforme o caso; fundos imobiliários distribuem rendimentos segundo regras próprias.",
          "Isso muda rótulo, tributação e leitura de comunicados. Por isso, nas páginas de FII do Simula Dividendos falamos em rendimentos por cota.",
        ],
      },
      {
        heading: "Como estudar na prática (sem lista mágica)",
        paragraphs: [
          "Em vez de uma tabela estática que envelhece no mesmo dia, use páginas por ticker: MXRF11, HGLG11, KNRI11, etc. O histórico mostra o ritmo recente na fonte integrada.",
          "A landing /fiis/mxrf11-paga-quanto-por-mes concentra a intenção “quanto paga por mês” com simulador e FAQ alinhados à busca.",
        ],
      },
      {
        heading: "Simulação: o que o site mostra",
        paragraphs: [
          "Informe o número de cotas no simulador do fundo. O painel traduz proventos por cota em totais para a sua posição — sempre como material educacional, não como garantia de repetição.",
          "Compare com ações de dividendos (ex.: TAEE11) se quiser diversificar o estudo de fluxo na bolsa.",
        ],
      },
    ],
    faqs: [
      {
        question: "Existe FII que paga exatamente o mesmo valor todo mês?",
        answer:
          "Raramente há valor fixo eterno. Mesmo fundos com cultura mensal mudam o valor por cota conforme receitas, despesas e política de distribuição.",
      },
      {
        question: "Posso confiar só neste site para decidir?",
        answer:
          "Use como apoio educacional. Decisões exigem prospecto, informes do administrador, seu perfil de risco e, se for o caso, assessoramento profissional.",
      },
      {
        question: "Onde acompanhar o calendário oficial?",
        answer:
          "Site do administrador do fundo, RI e comunicados à CVM. A página do Simula Dividendos resume o histórico disponível na integração, não substitui o canal oficial.",
      },
    ],
  },
  {
    slug: "melhores-acoes-de-dividendos",
    coverImage: "/articles/melhores-acoes-de-dividendos.png",
    lastModified: "2026-03-25",
    title: "Como avaliar “ações de dividendos” na prática (sem atalhos)",
    description:
      "Em vez de apostar em uma lista genérica, aprenda a avaliar consistência, ciclo do setor, política de remuneração e risco — com apoio de simulações.",
    keywords: ["ações de dividendos", "avaliação", "consistência", "risco", "simulador"],
    relatedTickers: ["TAEE11", "EGIE3", "VALE3", "BBAS3", "ITUB4"],
    relatedFiis: ["MXRF11", "KNCR11"],
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
    coverImage: "/articles/como-calcular-renda-passiva.png",
    lastModified: "2026-03-25",
    title: "Como calcular renda passiva por dividendos (com simulações)",
    description:
      "Entenda como organizar uma conta de renda passiva: dividendos por cota, quantidade de ações, frequência de pagamento e consistência do histórico.",
    keywords: ["renda passiva", "calcular", "dividendos", "simulação", "organização"],
    relatedTickers: ["BBAS3", "TAEE11", "ITUB4", "PETR4", "KLBN11", "B3SA3"],
    relatedFiis: ["MXRF11", "HGLG11", "VGHF11", "XPLG11", "KNRI11"],
    relatedSectors: ["bancos", "energia"],
    relatedArticleSlugs: [
      "o-que-e-dividend-yield",
      "melhores-fiis-para-renda-mensal",
      "quanto-investir-para-viver-de-dividendos",
    ],
    sections: [
      {
        heading: "Identifique o que você quer calcular",
        paragraphs: [
          "Renda passiva por dividendos não é só “quanto recebo por mês”. Também é entender a frequência, a distribuição ao longo do tempo e o quanto do seu patrimônio está ligado a esse fluxo.",
          "Use o Simula Dividendos para simular com seu número de cotas e observar o impacto educacional do histórico.",
        ],
      },
      {
        heading: "Use o histórico como referência",
        paragraphs: [
          "A leitura do histórico reduz o risco de depender de um único período. Ainda assim, o futuro pode ser diferente, então trate como estimativa.",
        ],
        subsections: [
          {
            heading: "Exemplo simples (educacional)",
            paragraphs: [
              "Imagine que, nos dados disponíveis, a soma dos proventos por cota nos últimos 12 meses de um papel seja X reais. Se você tem 200 cotas, a multiplicação (X × 200) ajuda a visualizar um cenário — não o valor garantido do próximo ano.",
              "Para FIIs, a lógica de “valor por cota × número de cotas” é parecida na calculadora, mas o tipo de distribuição e a tributação são diferentes de dividendos de companhias.",
            ],
          },
          {
            heading: "Combinando ações e FIIs no planejamento",
            paragraphs: [
              "Muitos investidores misturam fluxos de ações (dividendos/JCP) e de fundos imobiliários (rendimentos). Separar por tipo de ativo evita confusão na hora de estimar caixa e impostos — aqui o foco é organização, não dica fiscal.",
            ],
          },
        ],
      },
      {
        heading: "Estruture o acompanhamento",
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
  {
    slug: "quanto-investir-para-viver-de-dividendos",
    coverImage: "/articles/quanto-investir-para-viver-de-dividendos.png",
    lastModified: "2026-03-25",
    title: "Quanto investir para viver de dividendos (sem promessas irreais)",
    description:
      "Planejar renda com dividendos exige meta clara, horizonte e reserva. Veja como estruturar a conta, usar simulações e evitar armadilhas comuns de ‘renda mágica’.",
    keywords: [
      "viver de dividendos",
      "quanto investir",
      "renda passiva",
      "planejamento",
      "B3",
    ],
    relatedTickers: ["ITUB4", "BBAS3", "PETR4", "VALE3", "TAEE11", "WEGE3"],
    relatedFiis: ["MXRF11", "HGLG11", "XPLG11", "KNRI11", "VGHF11"],
    relatedSectors: ["bancos", "energia", "mineracao"],
    relatedArticleSlugs: [
      "acoes-que-pagam-dividendos-todo-mes",
      "melhores-fiis-para-renda-mensal",
      "como-calcular-renda-passiva",
    ],
    sections: [
      {
        heading: "O que ‘viver de dividendos’ realmente pergunta",
        paragraphs: [
          "Antes de buscar um número único de patrimônio, defina quanto você precisa por mês (ou por ano), por quanto tempo e com qual colchão de segurança. Dividendos variam: empresas cortam, adiam ou redistribuem conforme lucro e política.",
          "Separar despesas essenciais de despesas flexíveis ajuda a entender quanto da sua meta depende de proventos realmente estáveis — e quanto pode vir de outros fluxos.",
        ],
        subsections: [
          {
            heading: "Por que não existe uma resposta única",
            paragraphs: [
              "O mesmo valor investido em tickers diferentes produz fluxos diferentes ao longo do tempo, e o preço de compra muda o retorno sobre capital. Por isso, ‘quanto investir’ depende da sua carteira, não de uma tabela genérica na internet.",
            ],
          },
        ],
      },
      {
        heading: "Como usar uma conta educacional (sem achismo)",
        paragraphs: [
          "Um caminho honesto é pegar uma estimativa de proventos por cota com base em histórico (como o Simula Dividendos faz) e multiplicar pelo número de cotas que você teria após comprar.",
          "Repita o exercício com mais de um ticker e some os cenários — assim você vê concentração de risco. Se quase tudo depende de petróleo ou de um único banco, o plano fica frágil quando o setor aperta.",
        ],
        subsections: [
          {
            heading: "Exemplo de raciocínio (números ilustrativos)",
            paragraphs: [
              "Suponha que você estude ITUB4 e BBAS3 e, com base nos dados da ferramenta, chegue a uma faixa de renda por cota que faça sentido para o seu horizonte. O próximo passo é perguntar: quantas cotas eu precisaria para chegar perto da minha meta — e quanto capital isso exigiria ao preço atual?",
              "Essa conta muda todos os dias com preço e com próximos proventos. Trate como planilha viva, não como promessa.",
            ],
          },
        ],
      },
      {
        heading: "FIIs no mesmo plano de longo prazo",
        paragraphs: [
          "Muitas pessoas combinam ações e fundos imobiliários para compor fluxo. FIIs costumam ser discutidos com foco em periodicidade mensal, mas o valor distribuído também oscila com cenário de juros, ocupação e gestão.",
          "Explore páginas como MXRF11, HGLG11 e KNRI11 no Simula Dividendos para comparar histórico e simular cotas, sempre lendo o regulamento no canal oficial do fundo.",
        ],
      },
    ],
    faqs: [
      {
        question: "Preciso de um milhão para viver de dividendos?",
        answer:
          "Depende do seu custo de vida, dos ativos que você escolhe e de quanto os proventos variam. Não há número mágico universal.",
      },
      {
        question: "O simulador substitui assessor?",
        answer:
          "Não. Ele apoia leitura educacional de histórico. Planejamento tributário, sucessório e de risco exige profissionais quando fizer sentido para você.",
      },
      {
        question: "Onde praticar com tickers reais?",
        answer:
          "Use o simulador geral e as páginas de ações (ex.: VALE3, PETR4) e de FIIs listadas no site para cruzar hipóteses com dados disponíveis.",
      },
    ],
  },
  {
    slug: "acoes-que-pagam-dividendos-todo-mes",
    coverImage: "/articles/acoes-que-pagam-dividendos-todo-mes.png",
    lastModified: "2026-03-25",
    title: "Ações que pagam dividendos todo mês: o que é mito e o que é calendário",
    description:
      "Na B3, poucas ações seguem ritmo mensal previsível como uma conta de luz. Entenda calendário corporativo, exceções e por que FIIs entram na conversa de renda mensal.",
    keywords: ["dividendos todo mês", "ações mensais", "B3", "calendário de dividendos", "FII"],
    relatedTickers: ["TAEE11", "EGIE3", "ITUB4", "BBAS3", "ABEV3"],
    relatedFiis: ["MXRF11", "HGLG11", "XPLG11", "KNCR11", "KNRI11", "VGHF11"],
    relatedSectors: ["bancos", "energia", "consumo"],
    relatedArticleSlugs: [
      "melhores-fiis-para-renda-mensal",
      "quanto-investir-para-viver-de-dividendos",
      "o-que-e-dividend-yield",
    ],
    sections: [
      {
        heading: "Por que ‘todo mês’ é uma frase perigosa",
        paragraphs: [
          "Empresas listadas decidem assembleias, políticas de remuneração e datas de pagamento. É comum haver trimestralidade, semestralidade ou eventos extraordinários — não um pix automático no dia 5.",
          "Buscar ‘ação que paga todo mês’ como critério único pode levar a decisões apressadas. O investidor deixa de olhar endividamento, setor e qualidade dos lucros.",
        ],
        subsections: [
          {
            heading: "O que costuma acontecer na prática",
            paragraphs: [
              "Bancos e elétricas aparecem em muitas listas de renda por terem histórico recorrente, mas recorrente não é sinônimo de mensal fixo. Sempre confira o comunicado ao mercado da companhia.",
            ],
          },
        ],
      },
      {
        heading: "Papéis que as pessoas confundem com ‘dividendo mensal’",
        paragraphs: [
          "Units e tickers terminados em 11 podem agrupar classes diferentes de ações. Antes de comparar rendimento, leia o que exatamente você está comprando.",
          "Alguns setores regulados, como transmissão de energia, entram em roteiros de renda por contratos longos — ainda assim, o calendário de proventos deve ser confirmado na documentação oficial.",
        ],
        subsections: [
          {
            heading: "Onde FIIs entram",
            paragraphs: [
              "Fundos imobiliários costumam ser discutidos junto com ‘fluxo mensal’ porque muitos buscam distribuição periódica. Mesmo assim, valor e data mudam: leia informe mensal e regulamento.",
              "Compare MXRF11, HGLG11 e XPLG11 no Simula Dividendos para ver histórico recente e simular cotas — sem tratar passado como garantia.",
            ],
          },
        ],
      },
      {
        heading: "Como montar um calendário pessoal honesto",
        paragraphs: [
          "Liste os ativos que você possui, acesse RI ou comunicados e anote as datas previstas. Some ao fluxo de outros rendimentos.",
          "Use o simulador do site para traduzir histórico em valores por cota e testar quantas ações ou cotas de FII fariam diferença no seu orçamento — sempre como exercício educacional.",
        ],
      },
    ],
    faqs: [
      {
        question: "Existe lista oficial de ações com dividendo mensal?",
        answer:
          "Não há lista única imutável. O calendário muda com decisões das companhias. A fonte correta é sempre o comunicado e o RI.",
      },
      {
        question: "TAEE11 paga todo mês?",
        answer:
          "Ela aparece em debates de renda por histórico do setor, mas você deve confirmar datas e valores nos canais oficiais, não em posts de redes sociais.",
      },
      {
        question: "Posso misturar ações e FIIs no mesmo objetivo de renda?",
        answer:
          "Muitos investidores fazem isso, mas tributação e riscos diferem. Organize por tipo de ativo e leia os documentos de cada fundo ou companhia.",
      },
    ],
  },
  {
    slug: "melhores-acoes-de-dividendos-brasil",
    coverImage: "/articles/melhores-acoes-de-dividendos-brasil.png",
    lastModified: "2026-03-25",
    title: "Melhores ações de dividendos no Brasil: como pensar sem lista enganosa",
    description:
      "Evite rankings vazios. Entenda o que muda entre setores na B3, como ler histórico e onde o simulador ajuda a testar hipóteses com tickers brasileiros.",
    keywords: ["melhores ações dividendos", "Brasil", "B3", "dividendos", "ranking"],
    relatedTickers: ["PETR4", "VALE3", "ITUB4", "BBAS3", "B3SA3", "WEGE3", "ABEV3", "KLBN11"],
    relatedFiis: ["MXRF11", "HGLG11", "KNRI11", "XPLG11", "VGHF11"],
    relatedSectors: ["bancos", "petroleo", "mineracao", "servicos_financeiros", "consumo", "industria"],
    relatedArticleSlugs: [
      "melhores-fiis-para-renda-mensal",
      "acoes-que-pagam-dividendos-todo-mes",
      "como-calcular-renda-passiva",
    ],
    sections: [
      {
        heading: "Por que ‘melhor’ depende de você",
        paragraphs: [
          "Melhor para renda mensal pode ser diferente de melhor para crescimento com algum dividendo. Melhor para iniciante pode ser diferente de melhor para quem aceita ciclos fortes de commodity.",
          "Na B3, é comum ver Petrobras, grandes bancos e mineradoras em discussões de proventos — não porque sejam recomendações eternas, mas porque têm liquidez e presença em índices.",
        ],
        subsections: [
          {
            heading: "Três filtros antes de olhar o yield",
            paragraphs: [
              "Setor e ciclo: petróleo e minério mudam rápido com preço internacional. Bancos mudam com juros e inadimplência. Consumo e indústria têm suas próprias alavancas.",
              "Qualidade do lucro e do caixa: dividendos saem do que a empresa consegue sustentar ao longo do tempo, não só de um ano excepcional.",
            ],
          },
        ],
      },
      {
        heading: "Como comparar ações brasileiras com método simples",
        paragraphs: [
          "Escolha um par de setores que você entende (por exemplo, bancos vs energia) e compare histórico de proventos e volatilidade, não só o número do yield de hoje.",
          "Use páginas dedicadas a ITUB4, BBAS3, PETR4 e VALE3 para ver contexto e simular quantidades — o site mostra dados agregados para aprendizado, não ordem de compra.",
        ],
        subsections: [
          {
            heading: "Papel da infraestrutura de mercado",
            paragraphs: [
              "Empresas como B3 (B3SA3) entram em carteiras por exposição diferente de banco tradicional: receitas ligadas a negócios, dados e produtos de mercado. O yield não conta essa história sozinho.",
            ],
          },
        ],
      },
      {
        heading: "FIIs como complemento na mesma conversa",
        paragraphs: [
          "Quando o assunto é ‘melhores dividendos no Brasil’, muita gente mistura ações e FIIs. Separe: são veículos, riscos e tributações diferentes.",
          "Se o seu objetivo é estudar fluxo com fundos imobiliários, abra HGLG11 ou MXRF11 e compare renda simulada com ações de consumo como ABEV3 — sempre como exercício, não como ranking oficial.",
        ],
      },
    ],
    faqs: [
      {
        question: "Posso copiar a carteira de um influenciador?",
        answer:
          "Copiar sem entender setor, preço e risco costuma dar errado. Use conteúdo educativo e fontes oficiais para montar sua própria tese.",
      },
      {
        question: "O Simula Dividendos ranqueia ações?",
        answer:
          "Não. O site oferece páginas por ticker, simulador e artigos para você comparar hipóteses com dados disponíveis.",
      },
      {
        question: "Onde começar se eu quero diversificar na B3?",
        answer:
          "Comece definindo quantos setores você quer acompanhar, leia 2–3 demonstrativos por ano nas empresas que escolheu e use o simulador para ligar histórico ao seu número de cotas.",
      },
    ],
  },
  {
    slug: "melhores-fiis-para-renda-mensal",
    coverImage: "/articles/melhores-fiis-para-renda-mensal.png",
    lastModified: "2026-03-25",
    title: "Melhores FIIs para renda mensal: como comparar sem lista enganosa",
    description:
      "Entenda o que realmente importa ao buscar fluxo com fundos imobiliários: calendário, risco, regulamento e histórico — com páginas para simular MXRF11, HGLG11, XPLG11, KNRI11 e VGHF11.",
    keywords: [
      "FII renda mensal",
      "melhores FIIs",
      "fundos imobiliários",
      "B3",
      "rendimentos",
      "simulador",
    ],
    relatedTickers: ["TAEE11", "BBAS3", "ITUB4"],
    relatedFiis: ["MXRF11", "HGLG11", "XPLG11", "KNRI11", "VGHF11"],
    relatedSectors: ["bancos", "energia"],
    relatedArticleSlugs: [
      "o-que-e-dividend-yield",
      "como-calcular-renda-passiva",
      "quanto-investir-para-viver-de-dividendos",
      "acoes-que-pagam-dividendos-todo-mes",
    ],
    sections: [
      {
        heading: "O que as pessoas querem dizer com ‘renda mensal’ em FII",
        paragraphs: [
          "Na conversa de investidores, ‘renda mensal’ costuma significar distribuições periódicas que ajudam a compor caixa. Em fundos imobiliários, muitos gestores buscam periodicidade mensal, mas o valor e a data dependem do regulamento, do resultado do fundo e do cenário de juros e crédito.",
          "Não existe promessa automática: um mês pode pagar mais, outro menos, e há meses sem distribuição conforme as regras do fundo.",
        ],
        subsections: [
          {
            heading: "FIIs não são dividendos de ação",
            paragraphs: [
              "Os rótulos na conta e a tributação diferem dos dividendos de companhias. Por isso, misturar ações e FIIs no mesmo planilha exige separar colunas e entender cada tipo de provento.",
            ],
          },
        ],
      },
      {
        heading: "Critérios úteis antes de procurar ‘o melhor’",
        paragraphs: [
          "Em vez de uma lista genérica na internet, vale olhar para liquidez do papel na B3, qualidade dos relatórios do administrador, aderência do fundo ao que você entende (logística, papel, crédito, tijolo etc.) e concentração da carteira.",
          "O histórico de rendimentos por cota ajuda a formar intuição, mas não projeta o futuro. Use sempre o informe mensal e o site oficial do fundo para confirmar valores.",
        ],
        subsections: [
          {
            heading: "Por que o ‘yield do FII’ também engana",
            paragraphs: [
              "Assim como em ações, um número alto pode refletir queda de preço da cota ou evento pontual de distribuição. Compare janelas de tempo e leia o que entrou no rendimento.",
            ],
          },
        ],
      },
      {
        heading: "Como usar o Simula Dividendos com FIIs populares",
        paragraphs: [
          "Abra as páginas dedicadas a MXRF11, HGLG11, XPLG11, KNRI11 e VGHF11 para ver contexto, último rendimento quando houver dados na fonte e histórico recente. Informe o número de cotas no simulador para estimar uma renda mensal de referência (média simples com base nos últimos ~12 meses).",
          "Compare com ações de renda como TAEE11 ou bancos (BBAS3, ITUB4) se quiser diversificar o estudo — sempre como exercício educacional, sem recomendação de investimento.",
        ],
        subsections: [
          {
            heading: "Exemplo de fluxo de trabalho",
            paragraphs: [
              "1) Escolha um ticker de FII. 2) Leia o resumo e o regulamento no canal oficial. 3) Volte ao simulador e teste 100, 500 ou 1000 cotas. 4) Anote o quanto isso representaria no seu orçamento e repita com outro fundo para comparar ordens de grandeza.",
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Existe o ‘melhor FII’ para todo mundo?",
        answer:
          "Não. Perfil, objetivo, horizonte e tolerância a risco mudam. O que é adequado para um investidor pode não ser para outro.",
      },
      {
        question: "O simulador garante a renda do próximo mês?",
        answer:
          "Não. Ele usa dados disponíveis para fins educacionais. Rendimentos futuros dependem do fundo e do mercado.",
      },
      {
        question: "Preciso declarar rendimentos de FII?",
        answer:
          "Há regras tributárias aplicáveis. Em dúvida, consulte um contador ou a legislação vigente — este artigo não é orientação fiscal.",
      },
    ],
  },

  // ── Artigos por ticker ────────────────────────────────────────────────────

  {
    slug: "bbas3-dividendos",
    coverImage: "/articles/bbas3-dividendos.png",
    lastModified: "2026-05-09",
    title: "BBAS3 dividendos: histórico do Banco do Brasil e como simular",
    description:
      "Entenda o histórico de proventos do Banco do Brasil (BBAS3), como funciona a distribuição via dividendos e JCP, e como simular quanto você receberia com a sua quantidade de cotas.",
    keywords: ["BBAS3 dividendos", "Banco do Brasil dividendos", "BBAS3 dividend yield", "BBAS3 proventos"],
    relatedTickers: ["BBAS3", "ITUB4", "TAEE11", "VALE3"],
    relatedSectors: ["bancos"],
    relatedArticleSlugs: ["o-que-e-dividend-yield", "melhores-acoes-de-dividendos-brasil"],
    sections: [
      {
        heading: "Sobre o Banco do Brasil (BBAS3)",
        paragraphs: [
          "O Banco do Brasil é uma instituição financeira de controle misto — com participação da União — e presença consolidada em crédito rural, agronegócio, varejo e atacado. É uma das maiores instituições do país e costuma ser acompanhada por investidores que buscam proventos no segmento bancário.",
          "Por ser um banco de grande porte com política de retorno ao acionista comunicada ao mercado, BBAS3 aparece com frequência em carteiras voltadas a dividendos. A distribuição se dá via dividendos e juros sobre capital próprio (JCP), que têm tratamento tributário distinto — detalhe importante para quem declara imposto de renda.",
        ],
      },
      {
        heading: "Histórico de proventos e frequência",
        paragraphs: [
          "O histórico de proventos do BBAS3 reflete ciclos de lucro, política de capital e o cenário de juros no Brasil. Anos com resultado operacional forte costumam coincidir com distribuições mais expressivas; em momentos de maior cautela regulatória ou mercado adverso, o ritmo pode mudar.",
          "A frequência de pagamento tende a ser periódica, mas o calendário oficial é divulgado pela própria companhia e pode variar. Consulte sempre o RI do Banco do Brasil para confirmar datas e valores antes de qualquer decisão.",
        ],
      },
      {
        heading: "Vale acompanhar BBAS3 para dividendos?",
        paragraphs: [
          "Faz sentido acompanhar BBAS3 se você quer exposição a um banco com capilaridade nacional e foco em agronegócio, e aceita os riscos inerentes a uma empresa com participação estatal — incluindo eventual interferência em política de crédito ou de capital.",
          "Compare BBAS3 com outros bancos usando o dividend yield dos últimos 12 meses como ponto de partida, não como conclusão. Fundamentos, endividamento e perspectiva de resultado completam a análise.",
        ],
      },
      {
        heading: "Como simular dividendos de BBAS3",
        paragraphs: [
          "Na página de BBAS3 no Simula Dividendos, informe a quantidade de cotas que você possui. O simulador multiplica o histórico de proventos por cota pela sua posição e mostra uma estimativa educacional do que teria sido pago nos últimos 12 meses.",
          "Os valores são baseados em dados públicos disponíveis e não constituem promessa de rendimento futuro. Use a simulação para entender a ordem de grandeza e combine com análise de resultado e comunicados oficiais.",
        ],
      },
    ],
    faqs: [
      {
        question: "BBAS3 paga dividendos mensalmente?",
        answer:
          "Não necessariamente. O calendário é divulgado pela companhia conforme aprovações e política de capital. Consulte o RI do Banco do Brasil para as datas atualizadas.",
      },
      {
        question: "Qual a diferença entre dividendo e JCP no BBAS3?",
        answer:
          "Ambos são formas de retorno ao acionista, mas têm tratamento contábil e tributário diferentes. O JCP é dedutível para a empresa; para o investidor, há retenção na fonte. Consulte um contador para entender o impacto na sua declaração.",
      },
      {
        question: "O dividend yield do BBAS3 é garantido?",
        answer:
          "Não. O yield reflete o histórico de um período e varia conforme resultado, preço da ação e política de remuneração. Simulações são educacionais e não projetam o futuro.",
      },
    ],
  },

  {
    slug: "itub4-dividendos",
    coverImage: "/articles/itub4-dividendos.png",
    lastModified: "2026-05-09",
    title: "ITUB4 dividendos: histórico do Itaú Unibanco e como simular",
    description:
      "Veja o histórico de proventos do Itaú Unibanco (ITUB4), como o maior banco privado do Brasil distribui dividendos e JCP, e simule quanto você receberia com a sua posição.",
    keywords: ["ITUB4 dividendos", "Itaú dividendos", "ITUB4 dividend yield", "ITUB4 proventos"],
    relatedTickers: ["ITUB4", "BBAS3", "B3SA3", "TAEE11"],
    relatedSectors: ["bancos"],
    relatedArticleSlugs: ["o-que-e-dividend-yield", "melhores-acoes-de-dividendos-brasil"],
    sections: [
      {
        heading: "Sobre o Itaú Unibanco (ITUB4)",
        paragraphs: [
          "O Itaú Unibanco é o maior banco privado da América Latina por ativos. Com operações em crédito, seguros, gestão de patrimônio e banco de investimento, o grupo tem diversificação de receita que influencia sua capacidade de distribuição ao longo dos ciclos econômicos.",
          "ITUB4 — as ações preferenciais — é uma das ações mais negociadas da B3 e aparece com frequência em carteiras orientadas a dividendos do setor financeiro. A distribuição combina dividendos e JCP, conforme calendário divulgado pela companhia.",
        ],
      },
      {
        heading: "Histórico de proventos e frequência",
        paragraphs: [
          "O Itaú tem histórico de distribuição periódica ao longo do ano, com combinação de JCP e dividendos aprovados em reuniões do conselho e assembleias. A consistência do resultado financeiro da instituição em vários ciclos contribui para um fluxo de proventos relativamente regular — ainda que os valores variem conforme o ambiente de juros e crédito.",
          "O volume distribuído em cada período depende do lucro líquido, das exigências de capital regulatório (Basileia) e da política de payout da companhia. Consulte o RI do Itaú para confirmar calendário e tipo de provento.",
        ],
      },
      {
        heading: "Vale acompanhar ITUB4 para dividendos?",
        paragraphs: [
          "O Itaú costuma ser comparado ao Banco do Brasil pelo yield e pela regularidade dos proventos, mas os perfis diferem: ITUB4 tem menor interferência estatal e foco mais acentuado em eficiência operacional e expansão de produtos financeiros.",
          "Use o histórico disponível como referência e acompanhe resultados trimestrais para avaliar se o ritmo de distribuição se mantém.",
        ],
      },
      {
        heading: "Como simular dividendos de ITUB4",
        paragraphs: [
          "Acesse a página de ITUB4 no Simula Dividendos e informe sua quantidade de cotas. O simulador calcula uma estimativa educacional com base nos proventos pagos nos últimos 12 meses por cota, multiplicados pela sua posição.",
          "Os valores são educacionais e não constituem projeção. Combine a estimativa com análise de resultado e comunicados oficiais.",
        ],
      },
    ],
    faqs: [
      {
        question: "ITUB4 paga mais dividendos que BBAS3?",
        answer:
          "A comparação varia conforme o período e o preço de cada ação. Use o histórico de proventos por cota e o yield relativo para comparar — levando em conta que os perfis de risco são diferentes.",
      },
      {
        question: "Qual a frequência de pagamento do ITUB4?",
        answer:
          "O Itaú costuma distribuir ao longo do ano via JCP e dividendos. O calendário exato é divulgado pela companhia; consulte o RI para datas atualizadas.",
      },
      {
        question: "O Itaú pode reduzir dividendos?",
        answer:
          "Sim. Dividendos dependem de resultado, política de capital e aprovação em assembleia. Não há garantia de manutenção do nível histórico.",
      },
    ],
  },

  {
    slug: "petr4-dividendos",
    coverImage: "/articles/petr4-dividendos.png",
    lastModified: "2026-05-09",
    title: "PETR4 dividendos: histórico da Petrobras e como simular",
    description:
      "Entenda o histórico de proventos da Petrobras (PETR4), por que o dividend yield varia tanto e como simular quanto você receberia com a sua quantidade de ações.",
    keywords: ["PETR4 dividendos", "Petrobras dividendos", "PETR4 dividend yield", "PETR4 proventos"],
    relatedTickers: ["PETR4", "VALE3", "BBAS3", "EGIE3"],
    relatedSectors: ["petroleo"],
    relatedArticleSlugs: ["o-que-e-dividend-yield", "melhores-acoes-de-dividendos-brasil"],
    sections: [
      {
        heading: "Sobre a Petrobras (PETR4)",
        paragraphs: [
          "A Petrobras é uma empresa de capital misto com controle da União e operações concentradas em exploração e produção de petróleo e gás, especialmente no pré-sal offshore. É uma das maiores produtoras de petróleo do mundo e tem peso expressivo no Ibovespa.",
          "PETR4 são as ações preferenciais da companhia. A política de retorno ao acionista inclui dividendos ordinários e, em alguns ciclos, extraordinários — pagamentos pontuais que podem elevar muito o yield de um determinado período sem refletir um nível recorrente.",
        ],
      },
      {
        heading: "Por que o dividend yield da Petrobras oscila tanto?",
        paragraphs: [
          "O resultado da Petrobras está diretamente ligado ao preço internacional do petróleo (Brent), ao câmbio e ao volume de produção. Em períodos de petróleo a preços altos e produção robusta, a geração de caixa permite distribuições expressivas. Em ciclos adversos, o espaço para dividendos se reduz.",
          "Dividendos extraordinários, comuns em anos de superciclo de commodity, inflam o yield histórico de um período específico. Antes de interpretar o yield da Petrobras, vale identificar se o provento foi ordinário (recorrente) ou extraordinário (pontual).",
        ],
      },
      {
        heading: "Vale acompanhar PETR4 para dividendos?",
        paragraphs: [
          "PETR4 pode fazer sentido em carteiras que aceitam exposição a commodities e volatilidade de resultado. O risco de ser uma empresa com controle estatal — incluindo possíveis mudanças de política de preços ou de capital — é um fator que o investidor de renda precisa considerar.",
          "Não trate o dividend yield histórico da Petrobras como referência de rendimento futuro, especialmente se ele inclui períodos de distribuições extraordinárias.",
        ],
      },
      {
        heading: "Como simular dividendos de PETR4",
        paragraphs: [
          "Na página de PETR4 no Simula Dividendos, informe quantas ações você possui. O simulador mostra uma estimativa baseada nos proventos pagos nos últimos 12 meses por cota. Se o período capturou um pagamento extraordinário, o total estimado será mais alto do que a expectativa recorrente.",
          "Use a simulação como ferramenta educacional para entender a magnitude do fluxo de proventos — sem confundir estimativa histórica com garantia futura.",
        ],
      },
    ],
    faqs: [
      {
        question: "PETR4 paga dividendos todo ano?",
        answer:
          "Historicamente sim, mas o valor varia muito. Em anos de resultado fraco ou mudança de política de capital, a distribuição pode ser menor ou não ocorrer nos moldes esperados.",
      },
      {
        question: "O que é dividendo extraordinário na Petrobras?",
        answer:
          "São pagamentos adicionais além da distribuição ordinária, aprovados quando há excesso de caixa em ciclos favoráveis. Inflam o yield do período, mas não devem ser tratados como recorrentes.",
      },
      {
        question: "PETR4 ou PETR3 para dividendos?",
        answer:
          "PETR4 são preferenciais e PETR3 são ordinárias. Ambas participam dos dividendos, mas podem ter tratamento diferente. Verifique a política da companhia e os comunicados para comparar.",
      },
    ],
  },

  {
    slug: "vale3-dividendos",
    coverImage: "/articles/vale3-dividendos.png",
    lastModified: "2026-05-09",
    title: "VALE3 dividendos: histórico da Vale e como simular",
    description:
      "Entenda como a Vale (VALE3) distribui dividendos, por que o yield oscila com o ciclo de minério de ferro e como simular quanto você receberia com a sua posição.",
    keywords: ["VALE3 dividendos", "Vale dividendos", "VALE3 dividend yield", "VALE3 proventos"],
    relatedTickers: ["VALE3", "PETR4", "BBAS3", "KLBN11"],
    relatedSectors: ["mineracao"],
    relatedArticleSlugs: ["o-que-e-dividend-yield", "melhores-acoes-de-dividendos-brasil"],
    sections: [
      {
        heading: "Sobre a Vale (VALE3)",
        paragraphs: [
          "A Vale é uma das maiores mineradoras do mundo, com operações focadas em minério de ferro, pelotas, níquel e cobre. Suas exportações dependem fortemente da demanda industrial global — especialmente da China —, o que torna o negócio altamente sensível a ciclos econômicos internacionais.",
          "Por ter geração de caixa expressiva em momentos de preço elevado de commodity, a Vale já figurou entre as maiores pagadoras de dividendos da B3. Mas o perfil cíclico faz com que o ritmo de distribuição varie significativamente de um ano para o outro.",
        ],
      },
      {
        heading: "Como a Vale distribui dividendos",
        paragraphs: [
          "A política de capital da Vale contempla dividendos ordinários e, em ciclos favoráveis, pagamentos extraordinários atrelados à geração de caixa livre acima de determinado nível. Em anos de preço do minério elevado, as distribuições podem ser expressivas; em reversões de ciclo, a empresa preserva balanço.",
          "Essa variabilidade é o traço mais importante para quem acompanha VALE3 pelo ângulo de dividendos. Um yield alto em um determinado período pode refletir uma distribuição extraordinária que não se repete nos anos seguintes.",
        ],
      },
      {
        heading: "Vale acompanhar VALE3 para dividendos?",
        paragraphs: [
          "VALE3 pode compor uma carteira de dividendos para quem aceita exposição ao ciclo de commodities e às oscilações de preço do minério de ferro. Investidores que buscam previsibilidade de rendimento tendem a ter menos conforto com a volatilidade de resultado e distribuição da mineração.",
          "Acompanhe o preço do minério, o guidance de produção e o nível de dívida para contextualizar o histórico de proventos.",
        ],
      },
      {
        heading: "Como simular dividendos de VALE3",
        paragraphs: [
          "Acesse a página de VALE3 no Simula Dividendos, informe sua posição em cotas e veja a estimativa baseada nos proventos dos últimos 12 meses. Se o período capturou distribuições extraordinárias, o resultado será mais alto do que a expectativa de um ano comum.",
          "Use a simulação como referência educacional e leia o histórico de eventos individualmente para distinguir proventos ordinários de extraordinários.",
        ],
      },
    ],
    faqs: [
      {
        question: "Por que o dividend yield da Vale muda tanto?",
        answer:
          "Porque o resultado depende do preço do minério de ferro, do câmbio e do volume de produção. Em anos favoráveis, distribuições podem ser altas; em reversões de ciclo, o payout cai.",
      },
      {
        question: "Vale paga dividendos todo ano?",
        answer:
          "Historicamente sim, mas os valores variam bastante. A companhia tem política de dividendos mínimos e pode pagar extras conforme geração de caixa.",
      },
      {
        question: "VALE3 é boa para quem busca renda mensal?",
        answer:
          "O perfil da Vale é mais de dividendos concentrados em determinados períodos do ano. Para renda mensal, FIIs costumam ser mais adequados.",
      },
    ],
  },

  {
    slug: "taee11-dividendos",
    coverImage: "/articles/taee11-dividendos.png",
    lastModified: "2026-05-09",
    title: "TAEE11 dividendos: histórico da Taesa e como simular",
    description:
      "Veja o histórico de proventos da Taesa (TAEE11), por que a transmissão de energia é acompanhada por investidores de dividendos e como simular o fluxo com a sua posição.",
    keywords: ["TAEE11 dividendos", "Taesa dividendos", "TAEE11 dividend yield", "TAEE11 proventos"],
    relatedTickers: ["TAEE11", "EGIE3", "BBAS3", "ITUB4"],
    relatedSectors: ["energia"],
    relatedArticleSlugs: ["o-que-e-dividend-yield", "acoes-que-pagam-dividendos-todo-mes"],
    sections: [
      {
        heading: "Sobre a Taesa (TAEE11)",
        paragraphs: [
          "A Taesa é uma das maiores transmissoras de energia elétrica do Brasil, com concessões de linhas em várias regiões do país. O negócio de transmissão tem características que atraem investidores de dividendos: receita contratual de longo prazo, baixo CAPEX após a construção das linhas e previsibilidade relativa de resultado.",
          "TAEE11 é uma unit — estrutura que combina ações ordinárias e preferenciais em um único certificado. Ao simular dividendos, use TAEE11 como ticker para capturar o histórico de proventos da unit.",
        ],
      },
      {
        heading: "Histórico de proventos da Taesa",
        paragraphs: [
          "A Taesa tem histórico de payout elevado, compatível com o perfil de transmissora madura — poucas novas linhas em construção significam menor necessidade de reter caixa para CAPEX. A distribuição costuma ser periódica ao longo do ano, mas o calendário e os valores dependem do resultado e das aprovações.",
          "O principal risco para o fluxo de proventos está nas revisões tarifárias periódicas conduzidas pela Aneel e no vencimento de concessões. Esses eventos podem alterar a receita futura e a capacidade de distribuição.",
        ],
      },
      {
        heading: "Vale acompanhar TAEE11 para dividendos?",
        paragraphs: [
          "Para investidores que buscam previsibilidade de fluxo e aceitam o risco regulatório de um setor concessionado, TAEE11 costuma aparecer entre as ações mais acompanhadas. O payout histórico elevado e a natureza contratual da receita diferenciam transmissoras de setores mais cíclicos.",
          "Acompanhe comunicados sobre renovação de concessões e revisões tarifárias para antecipar possíveis mudanças no fluxo de proventos.",
        ],
      },
      {
        heading: "Como simular dividendos de TAEE11",
        paragraphs: [
          "Na página de TAEE11 no Simula Dividendos, informe a quantidade de units que você possui. O simulador calcula uma estimativa educacional com base nos proventos pagos nos últimos 12 meses por cota.",
          "Lembre que os valores são baseados em histórico público e não constituem projeção. Proventos futuros dependem de resultado, aprovações e eventuais mudanças regulatórias.",
        ],
      },
    ],
    faqs: [
      {
        question: "TAEE11 é ação ou FII?",
        answer:
          "É uma ação (unit) de uma empresa de transmissão de energia elétrica, não um FII. O perfil de proventos pode lembrar FIIs em alguns aspectos, mas os riscos e a estrutura são diferentes.",
      },
      {
        question: "A Taesa paga dividendos com que frequência?",
        answer:
          "A distribuição é periódica; o calendário exato é divulgado pela companhia. Consulte o RI da Taesa para confirmar datas e tipos de provento.",
      },
      {
        question: "O risco regulatório afeta o dividendo da Taesa?",
        answer:
          "Sim. Revisões tarifárias pela Aneel e vencimentos de concessão podem alterar a receita e, consequentemente, o volume distribuído.",
      },
    ],
  },

  {
    slug: "egie3-dividendos",
    coverImage: "/articles/egie3-dividendos.png",
    lastModified: "2026-05-09",
    title: "EGIE3 dividendos: histórico da Engie Brasil e como simular",
    description:
      "Entenda o histórico de proventos da Engie Brasil Energia (EGIE3), como a geração de energia influencia o fluxo de dividendos e como simular o retorno com a sua posição.",
    keywords: ["EGIE3 dividendos", "Engie dividendos", "EGIE3 dividend yield", "EGIE3 proventos"],
    relatedTickers: ["EGIE3", "TAEE11", "BBAS3", "PETR4"],
    relatedSectors: ["energia"],
    relatedArticleSlugs: ["o-que-e-dividend-yield", "acoes-que-pagam-dividendos-todo-mes"],
    sections: [
      {
        heading: "Sobre a Engie Brasil (EGIE3)",
        paragraphs: [
          "A Engie Brasil Energia é uma das maiores geradoras privadas de energia elétrica do país, com portfólio diversificado entre usinas hidráulicas, eólicas e solares. A diversificação de fontes reduz — mas não elimina — a exposição ao risco hidrológico.",
          "A companhia também atua em transmissão e comercialização de energia, o que adiciona receitas contratuais ao resultado. Esse perfil híbrido contribui para uma geração de caixa relativamente mais estável comparada a geradoras puras de hidro.",
        ],
      },
      {
        heading: "Histórico de proventos da Engie Brasil",
        paragraphs: [
          "A Engie Brasil tem histórico de payout elevado e distribuições periódicas ao longo do ano. A política de remuneração costuma prever percentual mínimo do lucro ajustado. Em anos de boa geração hidrológica e preços de energia favoráveis, o volume distribuído tende a ser maior.",
          "Em períodos de estiagem severa, o custo de compra de energia no mercado spot pode comprimir margem. Geradoras com presença em eólica e solar mitigam parte desse risco, mas o impacto hidrológico ainda existe para usinas hidráulicas do portfólio.",
        ],
      },
      {
        heading: "Vale acompanhar EGIE3 para dividendos?",
        paragraphs: [
          "Para quem busca exposição ao setor de energia com perfil mais equilibrado, EGIE3 costuma ser comparada a transmissoras puras — com a diferença de que o resultado depende também de condições de despacho e preço de energia.",
          "O risco regulatório e o hidrológico são os fatores centrais a acompanhar. Use o histórico disponível na página do ticker para ver como o fluxo se comportou em diferentes condições.",
        ],
      },
      {
        heading: "Como simular dividendos de EGIE3",
        paragraphs: [
          "Acesse a página de EGIE3 no Simula Dividendos e informe sua quantidade de ações. O resultado é uma estimativa educacional baseada nos proventos pagos nos últimos 12 meses por cota.",
          "Use a simulação para entender a magnitude do fluxo de proventos com a sua posição atual — sem tratar o histórico como garantia dos próximos pagamentos.",
        ],
      },
    ],
    faqs: [
      {
        question: "EGIE3 ou TAEE11 para dividendos?",
        answer:
          "Os perfis diferem: TAEE11 é transmissão (receita mais contratual), EGIE3 é geração + transmissão (mais exposição a hidrologia e preço de energia). A escolha depende do nível de previsibilidade que você busca.",
      },
      {
        question: "A Engie paga dividendos com que frequência?",
        answer:
          "A distribuição costuma ocorrer algumas vezes ao ano. Consulte o RI da Engie Brasil para o calendário atualizado.",
      },
      {
        question: "O que é risco hidrológico e como afeta os dividendos?",
        answer:
          "Em anos de seca, usinas hidráulicas geram menos e precisam comprar energia cara no spot, comprimindo margem. A diversificação com eólica e solar reduz, mas não elimina esse risco.",
      },
    ],
  },

  {
    slug: "b3sa3-dividendos",
    coverImage: "/articles/b3sa3-dividendos.png",
    lastModified: "2026-05-09",
    title: "B3SA3 dividendos: histórico da B3 e como simular",
    description:
      "Entenda como a B3 (B3SA3) distribui dividendos, como o volume de mercado influencia o resultado e como simular quanto você receberia com a sua posição.",
    keywords: ["B3SA3 dividendos", "B3 bolsa dividendos", "B3SA3 dividend yield", "B3SA3 proventos"],
    relatedTickers: ["B3SA3", "BBAS3", "ITUB4", "WEGE3"],
    relatedSectors: ["servicos_financeiros"],
    relatedArticleSlugs: ["o-que-e-dividend-yield"],
    sections: [
      {
        heading: "Sobre a B3 (B3SA3)",
        paragraphs: [
          "A B3 é a principal bolsa de valores, câmara de compensação e depositária de ativos do Brasil. Sua receita está diretamente ligada ao volume de negócios no mercado de capitais: quanto mais ações, derivativos, títulos e outros instrumentos são negociados, mais a empresa fatura.",
          "Por operar em um segmento de infraestrutura financeira com altas barreiras de entrada, a B3 tem posição de mercado relevante. Mas isso não isola o resultado de ciclos do mercado de capitais — períodos de baixa atividade afetam receita e podem influenciar o volume distribuído.",
        ],
      },
      {
        heading: "Como a B3 distribui proventos",
        paragraphs: [
          "A política de remuneração ao acionista da B3 combina dividendos e JCP, com distribuições ao longo do ano conforme o resultado. A companhia também realiza programas de recompra de ações, que complementam o retorno ao acionista de forma indireta.",
          "O volume distribuído varia conforme o resultado, que depende do nível de atividade no mercado. Anos com crescimento de listagens, volume de negócios e produtos derivativos tendem a ser favoráveis.",
        ],
      },
      {
        heading: "Vale acompanhar B3SA3 para dividendos?",
        paragraphs: [
          "B3SA3 pode fazer sentido para quem quer exposição ao crescimento do mercado de capitais brasileiro com algum retorno via proventos. A posição dominante reduz risco competitivo, mas não elimina a correlação com o ciclo de atividade financeira.",
          "Compare o yield histórico com o contexto do período — se o mercado estava aquecido ou em retração — antes de extrapolar para o futuro.",
        ],
      },
      {
        heading: "Como simular dividendos de B3SA3",
        paragraphs: [
          "Na página de B3SA3 no Simula Dividendos, informe a quantidade de ações que você possui para ver a estimativa educacional baseada nos últimos 12 meses de proventos por cota.",
          "Os valores são baseados em histórico público e não constituem garantia de rendimento futuro.",
        ],
      },
    ],
    faqs: [
      {
        question: "A B3 sempre paga dividendos?",
        answer:
          "A companhia tem histórico de distribuições periódicas, mas o valor depende do resultado, que oscila com o volume do mercado. Consulte os comunicados oficiais para o calendário atualizado.",
      },
      {
        question: "Recompra de ações conta como dividendo?",
        answer:
          "Não diretamente. Recompras reduzem o número de ações em circulação e podem elevar o preço por ação, mas não são dividendos. São formas complementares de retorno ao acionista.",
      },
      {
        question: "B3SA3 é ação defensiva?",
        answer:
          "Tem características de empresa com posição dominante, mas o resultado é sensível ao volume do mercado de capitais. Não é defensiva no mesmo sentido de utilitárias.",
      },
    ],
  },

  {
    slug: "wege3-dividendos",
    coverImage: "/articles/wege3-dividendos.png",
    lastModified: "2026-05-09",
    title: "WEGE3 dividendos: histórico da WEG e como simular",
    description:
      "Veja o histórico de proventos da WEG (WEGE3), como uma empresa industrial de crescimento distribui dividendos de forma consistente e como simular com a sua posição.",
    keywords: ["WEGE3 dividendos", "WEG dividendos", "WEGE3 dividend yield", "WEGE3 proventos"],
    relatedTickers: ["WEGE3", "KLBN11", "ABEV3", "B3SA3"],
    relatedSectors: ["industria"],
    relatedArticleSlugs: ["o-que-e-dividend-yield", "melhores-acoes-de-dividendos-brasil"],
    sections: [
      {
        heading: "Sobre a WEG (WEGE3)",
        paragraphs: [
          "A WEG é uma fabricante brasileira de motores elétricos, automação industrial, transformadores e equipamentos de energia, com operações em mais de 135 países. É reconhecida pela consistência de resultado e pela expansão global ao longo de décadas.",
          "Por reinvestir parcela relevante do lucro no crescimento, a WEG pratica um payout relativamente baixo frente a setores mais maduros — resultando em dividend yield historicamente menor do que bancos ou transmissoras. Mas a consistência dos pagamentos e o crescimento do lucro base são diferenciais para horizontes longos.",
        ],
      },
      {
        heading: "Histórico de proventos da WEG",
        paragraphs: [
          "A WEG tem histórico de distribuições regulares, com crescimento gradual no valor por cota acompanhando o crescimento do lucro. O yield absoluto costuma ser menor do que outros nomes da B3 — mas a consistência e a trajetória de crescimento são diferenciais para investidores de longo prazo.",
          "Os proventos são distribuídos conforme a política de remuneração da companhia e aprovações do conselho. Consulte o RI da WEG para o calendário atualizado.",
        ],
      },
      {
        heading: "Vale acompanhar WEGE3 para dividendos?",
        paragraphs: [
          "WEGE3 é mais adequada para quem combina expectativa de crescimento com renda crescente ao longo do tempo (dividend growth) do que para quem busca yield alto no curto prazo. O perfil industrial exportador protege parte do resultado da volatilidade do mercado interno.",
          "Para carteiras orientadas a yield imediato, WEGE3 pode ser complementar — não substituta — de ativos com payout mais alto.",
        ],
      },
      {
        heading: "Como simular dividendos de WEGE3",
        paragraphs: [
          "Acesse a página de WEGE3 no Simula Dividendos e informe sua posição em ações. O simulador mostra a estimativa de proventos dos últimos 12 meses por cota, multiplicados pela sua quantidade.",
          "O yield histórico de WEGE3 tende a ser mais baixo do que outros setores — use a simulação para entender o fluxo real com a sua posição atual.",
        ],
      },
    ],
    faqs: [
      {
        question: "Por que o yield da WEG é menor que o de bancos?",
        answer:
          "A WEG reinveste parcela relevante do lucro para crescimento. O payout é menor, mas o crescimento do lucro base faz com que o valor pago por cota aumente ao longo do tempo.",
      },
      {
        question: "WEG paga dividendos com que frequência?",
        answer:
          "A distribuição é periódica conforme política da companhia. Consulte o RI da WEG para o calendário atualizado.",
      },
      {
        question: "WEGE3 é boa para renda passiva?",
        answer:
          "Pode ser parte de uma carteira de renda passiva para horizontes longos, especialmente para quem valoriza crescimento consistente de proventos. Para yield alto imediato, outros setores costumam ser mais indicados.",
      },
    ],
  },

  {
    slug: "abev3-dividendos",
    coverImage: "/articles/abev3-dividendos.png",
    lastModified: "2026-05-09",
    title: "ABEV3 dividendos: histórico da Ambev e como simular",
    description:
      "Entenda como a Ambev (ABEV3) distribui dividendos, como margens e volumes de bebidas influenciam os proventos e como simular quanto você receberia com a sua posição.",
    keywords: ["ABEV3 dividendos", "Ambev dividendos", "ABEV3 dividend yield", "ABEV3 proventos"],
    relatedTickers: ["ABEV3", "WEGE3", "BBAS3", "VALE3"],
    relatedSectors: ["consumo"],
    relatedArticleSlugs: ["o-que-e-dividend-yield", "melhores-acoes-de-dividendos-brasil"],
    sections: [
      {
        heading: "Sobre a Ambev (ABEV3)",
        paragraphs: [
          "A Ambev é uma das maiores empresas de bebidas do mundo, com operações em cerveja, refrigerantes, sucos e água em vários países da América Latina. No Brasil, detém marcas com participação de mercado relevante no segmento de cervejas e não-alcoólicos.",
          "Por atuar em consumo de massa com marcas consolidadas, a Ambev tem perfil de empresa geradora de caixa recorrente. Mas pressões de custo de insumos (malte, lúpulo, embalagens, energia) e competição no varejo afetam margem e, por consequência, o volume distribuído.",
        ],
      },
      {
        heading: "Como a Ambev distribui proventos",
        paragraphs: [
          "A Ambev distribui dividendos e JCP periodicamente ao longo do ano, conforme o resultado e aprovações. A política de remuneração costuma contemplar um patamar mínimo de distribuição, mas o valor varia com o desempenho operacional.",
          "Em anos de margens pressionadas por custo de commodities ou câmbio desfavorável, o volume distribuído pode ser menor. Em ciclos de recuperação de margem, o retorno ao acionista tende a aumentar.",
        ],
      },
      {
        heading: "Vale acompanhar ABEV3 para dividendos?",
        paragraphs: [
          "ABEV3 costuma ser analisada como uma ação de dividendos de consumo por combinar geração de caixa recorrente com marcas que dificultam a substituição rápida. O risco principal para o fluxo de proventos está em compressão de margem ou perda de participação de mercado.",
          "Acompanhe resultados trimestrais e os comunicados sobre política de capital para entender a perspectiva de distribuição em cada ciclo.",
        ],
      },
      {
        heading: "Como simular dividendos de ABEV3",
        paragraphs: [
          "Na página de ABEV3 no Simula Dividendos, informe a quantidade de ações que você possui. O simulador calcula uma estimativa educacional com base nos proventos pagos nos últimos 12 meses por cota.",
          "Use o histórico como referência para entender o fluxo com a sua posição atual, sem confundir passado com garantia futura.",
        ],
      },
    ],
    faqs: [
      {
        question: "A Ambev paga dividendos todos os anos?",
        answer:
          "Historicamente sim, mas o valor varia com resultado operacional, margens e política de capital. Consulte o RI da Ambev para o calendário atualizado.",
      },
      {
        question: "Por que o yield da Ambev oscila?",
        answer:
          "Porque o dividend yield depende tanto do valor distribuído quanto do preço da ação. Compressão de margem pode reduzir o provento; queda do preço da ação pode elevar o yield matematicamente sem melhora no negócio.",
      },
      {
        question: "ABEV3 é defensiva?",
        answer:
          "Tem demanda relativamente recorrente, mas não é imune a ciclos de consumo, aumento de custos ou pressão competitiva. O rótulo 'defensivo' é uma simplificação.",
      },
    ],
  },

  {
    slug: "klbn11-dividendos",
    coverImage: "/articles/klbn11-dividendos.png",
    lastModified: "2026-05-09",
    title: "KLBN11 dividendos: histórico da Klabin e como simular",
    description:
      "Entenda como a Klabin (KLBN11) distribui proventos, como o ciclo de papel e celulose influencia os dividendos e como simular quanto você receberia com a sua posição.",
    keywords: ["KLBN11 dividendos", "Klabin dividendos", "KLBN11 dividend yield", "KLBN11 proventos"],
    relatedTickers: ["KLBN11", "WEGE3", "VALE3", "ABEV3"],
    relatedSectors: ["industria"],
    relatedArticleSlugs: ["o-que-e-dividend-yield"],
    sections: [
      {
        heading: "Sobre a Klabin (KLBN11)",
        paragraphs: [
          "A Klabin é a maior produtora e exportadora de papéis para embalagens do Brasil, com integração florestal e atuação em celulose, papelão, sacos industriais e embalagens de papel. O negócio combina ciclo de commodity florestal com demanda estrutural de embalagens.",
          "KLBN11 é uma unit — certificado composto por mais de um tipo de ação. Isso tem implicações na estrutura de direitos e tributação. Verifique o prospecto e o RI da Klabin antes de comparar diretamente com ações ordinárias ou preferenciais de outras empresas.",
        ],
      },
      {
        heading: "Histórico de proventos da Klabin",
        paragraphs: [
          "O histórico de proventos da Klabin reflete o ciclo de preços de celulose e papéis para embalagens. Em anos de preço favorável e demanda aquecida, a geração de caixa permite distribuições mais expressivas; em reversões de ciclo ou períodos de CAPEX intenso, o payout pode ser comprimido.",
          "A companhia tem projetos de expansão de capacidade recorrentes que demandam capital significativo e podem influenciar o volume disponível para distribuição em determinados anos.",
        ],
      },
      {
        heading: "Vale acompanhar KLBN11 para dividendos?",
        paragraphs: [
          "KLBN11 pode fazer parte de carteiras que buscam exposição ao setor florestal e de embalagens, com tolerância à volatilidade de commodity. O crescimento estrutural do mercado de embalagens sustentáveis é um argumento de tese de longo prazo, mas os proventos não são tão previsíveis quanto os de setores regulados.",
          "Acompanhe o preço de celulose no mercado internacional e os comunicados sobre projetos de CAPEX da companhia para contextualizar o histórico.",
        ],
      },
      {
        heading: "Como simular dividendos de KLBN11",
        paragraphs: [
          "Acesse a página de KLBN11 no Simula Dividendos e informe sua quantidade de units. O simulador calcula uma estimativa educacional baseada nos proventos pagos nos últimos 12 meses por cota.",
          "Lembre que KLBN11 é uma unit com estrutura específica — confirme os detalhes no RI da Klabin antes de comparar diretamente com outras ações.",
        ],
      },
    ],
    faqs: [
      {
        question: "O que é KLBN11 — unit ou ação comum?",
        answer:
          "KLBN11 é uma unit, estrutura que combina mais de um tipo de ação em um único certificado. A composição exata está descrita no prospecto e no RI da Klabin.",
      },
      {
        question: "A Klabin paga dividendos com que frequência?",
        answer:
          "A distribuição é periódica conforme resultado e aprovações. Consulte o RI da Klabin para o calendário atualizado.",
      },
      {
        question: "KLBN11 é parecida com VALE3 por ser commodity?",
        answer:
          "Ambas têm ciclicidade, mas os drivers são diferentes: Klabin depende de preço de celulose e demanda por embalagens; Vale depende do preço do minério de ferro. Os riscos e correlações são distintos.",
      },
    ],
  },
];
