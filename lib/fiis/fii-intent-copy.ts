import type { FaqItem } from "@/data/stocks";
import { fiiVariantShares, type FiiUrlVariant } from "./fii-slug";

function pickBySeed(seed: string, options: readonly string[]): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  return options[h % options.length] ?? options[0]!;
}

export function fiiIntentEditorialAddendum(
  variant: "main" | FiiUrlVariant,
  symbol: string,
  displayName: string
): string[] {
  if (variant === "main") return [];
  const shares = fiiVariantShares(variant);

  if (variant === "simulador-de-dividendos") {
    return [
      `Página de simulador para ${symbol}: escolha a quantidade de cotas e veja a estimativa por evento com base no histórico disponível na fonte.`,
      `Use como apoio de estudo para comparar cenários de renda; valores futuros podem variar conforme resultado e regulamento do fundo.`,
    ];
  }

  if (variant === "simulador") {
    return [
      `Simulador de ${symbol}: informe suas cotas para visualizar estimativas de rendimentos com base no histórico disponível na fonte.`,
      "A ferramenta ajuda a comparar cenários rapidamente sem transformar histórico em promessa de retorno futuro.",
    ];
  }

  if (variant === "paga-quanto") {
    return [
      `A pergunta “${symbol} paga quanto?” é respondida aqui com foco no valor por cota do último rendimento e no total estimado para a sua posição.`,
      `${displayName} pode variar distribuições ao longo do tempo; use o simulador para ajustar a quantidade de cotas e comparar cenários.`,
    ];
  }

  if (shares) {
    return [
      pickBySeed(`${symbol}-${variant}-a`, [
        `Para ${shares} cotas de ${symbol}, esta página mostra uma estimativa educacional do total por distribuição usando o histórico da fonte.`,
        `A busca “${symbol} quanto rende ${shares} cotas” é respondida com cálculo prático e simulador no topo, sem prometer retorno futuro.`,
        `Com ${shares} cotas de ${symbol}, você acompanha quanto cada pagamento por cota pode representar no seu fluxo estimado.`,
      ]),
      pickBySeed(`${symbol}-${variant}-b`, [
        "Distribuições de FIIs podem oscilar; confira também os informes oficiais do administrador.",
        "Use a simulação para ter ordem de grandeza e revisar cenários com diferentes quantidades de cotas.",
        "Histórico ajuda no contexto, mas não substitui documentos oficiais do fundo.",
      ]),
    ];
  }

  return [
    `Esta URL responde à busca “${symbol} paga quanto por mês?”. O valor por cota do último rendimento está na tabela; o total na sua conta depende de quantas cotas você tem — use o simulador acima.`,
    `${displayName} segue calendário e política do regulamento: administrador pode alterar datas e valores. O histórico na fonte não substitui informe oficial.`,
  ];
}

export function fiiIntentExtraFaqs(variant: "main" | FiiUrlVariant, symbol: string): FaqItem[] {
  const shares = fiiVariantShares(variant);

  if (variant === "simulador-de-dividendos") {
    return [
      {
        question: `Como simular dividendos de ${symbol}?`,
        answer:
          "Informe o número de cotas no simulador da página. O cálculo usa valores por cota do histórico disponível na fonte para gerar uma estimativa educacional.",
      },
    ];
  }

  if (variant === "simulador") {
    return [
      {
        question: `Como usar o simulador de ${symbol}?`,
        answer:
          "Digite a quantidade de cotas no bloco de simulação. O resultado usa o histórico de rendimentos por cota disponível na fonte para fins educacionais.",
      },
    ];
  }

  if (variant === "paga-quanto") {
    return [
      {
        question: `${symbol} paga quanto por cota?`,
        answer:
          "A referência aparece na tabela desta página, com base no último (ou próximo) rendimento disponível na fonte. Multiplique pela sua posição para estimar o total.",
      },
    ];
  }

  if (shares) {
    return [
      {
        question: `${symbol}: quanto rendem ${shares} cotas?`,
        answer:
          "Depende dos valores por cota registrados no histórico da fonte para o período analisado. A página transforma isso em estimativa automática para a quantidade escolhida.",
      },
    ];
  }

  return [
    {
      question: `${symbol} paga todo mês o mesmo valor?`,
      answer:
        "Muitos FIIs visam distribuição mensal, mas o valor por cota pode mudar conforme resultado do fundo e política de distribuição. Use o histórico como referência educacional e confira o informe do administrador.",
    },
  ];
}
