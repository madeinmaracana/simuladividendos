import { NextRequest } from "next/server";
import { createApiOgImageResponseFromTicker } from "@/lib/og/api-og-image";
import { sanitizeOgValorParam } from "@/lib/og/og-api-valor";
import { fetchQuoteForOg, resolvePerShareValueForOg } from "@/lib/og/ticker-og-data";

export const runtime = "edge";

/**
 * OG dinâmica: `/api/og?ticker=ITUB4&nome=...&valor=R%24%200%2C02&tipo=acao|fii`
 * — `valor` opcional (se ausente, calcula a partir dos dividendos na brapi, com cache).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawTicker = (searchParams.get("ticker") ?? "").trim();
  const sym = rawTicker.toUpperCase().replace(/[^A-Z0-9]/g, "") || "B3";
  const tipo = searchParams.get("tipo") === "fii" ? "fii" : "acao";
  const nome = searchParams.get("nome");
  const valorFromQuery = sanitizeOgValorParam(searchParams.get("valor"));

  const stock = await fetchQuoteForOg(sym);
  const logoRemote = stock?.logoUrl ?? null;
  const valorResolved = resolvePerShareValueForOg(stock);
  const valorFormatted = valorFromQuery ?? valorResolved;

  return createApiOgImageResponseFromTicker({
    ticker: sym,
    nome,
    valorFormatted,
    assetLabel: tipo === "fii" ? "cota" : "ação",
    logoRemoteUrl: logoRemote,
  });
}
