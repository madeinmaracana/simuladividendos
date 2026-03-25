import type { StockSeoRecord } from "@/data/stocks";
import { generateDescription, generateTitle } from "@/lib/programmatic/stock-seo";
import type { AcaoUrlVariant } from "./acao-slug";
import { acaoMainSlug } from "./acao-slug";

type IntentMeta = { title: string; description: string; keywords: string[] };

function baseKeywords(symbol: string, mock: StockSeoRecord | null): string[] {
  return [
    symbol,
    "dividendos",
    "B3",
    mock?.sectorLabel ?? "ações",
    "dividendos por ação",
    "quanto paga",
    "simular dividendos",
    mock?.companyName ?? "",
  ].filter((k): k is string => Boolean(k));
}

/** Títulos e descriptions distintos por intenção (evita cópia idêntica entre URLs). */
export function getStockIntentMetadata(
  symbol: string,
  mock: StockSeoRecord | null,
  variant: "main" | AcaoUrlVariant
): IntentMeta {
  const name = mock?.companyName?.trim();
  const label = name ? `${name} (${symbol})` : symbol;

  if (variant === "main") {
    return {
      title: generateTitle(symbol, mock),
      description: generateDescription(symbol, mock),
      keywords: baseKeywords(symbol, mock),
    };
  }

  if (variant === "dividendos") {
    return {
      title: `${symbol} dividendos por ação e histórico na B3`,
      description: `Veja quanto ${label} pagou em dividendos por ação, datas recentes e como interpretar o histórico antes de simular dividendos com suas cotas. Conteúdo educacional.`,
      keywords: [
        ...baseKeywords(symbol, mock),
        "histórico de dividendos",
        "último dividendo",
        "proventos",
      ],
    };
  }

  if (variant === "quanto-paga-dividendos") {
    return {
      title: `${symbol} quanto paga de dividendos? Valores por cota e simulação`,
      description: `Quanto ${label} pagou em dividendos por ação nos dados desta página? Confira o último provento de referência, o histórico e simule o total com a sua quantidade de cotas — conteúdo educacional.`,
      keywords: [
        ...baseKeywords(symbol, mock),
        "quanto paga de dividendos",
        "dividendos por cota",
        `proventos ${symbol}`,
      ],
    };
  }

  if (variant === "paga-quanto") {
    return {
      title: `${symbol} paga quanto? Dividendos e valores por cota`,
      description: `Quanto paga ${label} em proventos por ação, segundo os dados usados nesta página? Confira referência por cota e use o simulador para estimar o total com o seu número de ações.`,
      keywords: [...baseKeywords(symbol, mock), "quanto paga por cota", "valor do dividendo"],
    };
  }

  // simulador
  return {
    title: `Simular dividendos ${symbol}: calculadora por quantidade de ações`,
    description: `Simule dividendos de ${label} multiplicando dividendos por ação pela quantidade de cotas. Ferramenta educacional para entender quanto paga em cenários diferentes — sem garantir resultados futuros.`,
    keywords: [...baseKeywords(symbol, mock), "calculadora dividendos", "simulação B3"],
  };
}

/** Canonical da página principal do papel (referência cruzada / consistência). */
export function canonicalMainAcaoPath(ticker: string): string {
  return `/acoes/${encodeURIComponent(acaoMainSlug(ticker))}`;
}
