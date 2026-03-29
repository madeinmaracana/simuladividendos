import { NextRequest } from "next/server";
import {
  createApiOgImageResponseFromTicker,
  createApiOgSafeFallbackResponse,
} from "@/lib/og/api-og-image";
import { sanitizeOgEntityName, sanitizeOgValorParam } from "@/lib/og/og-api-valor";
import { fetchQuoteForOg, resolvePerShareValueForOg } from "@/lib/og/ticker-og-data";

/** Node.js: em Edge, `ImageResponse` nesta rota chegou a responder 200 com corpo vazio (CDN cacheava erro). */
export const runtime = "nodejs";

/** Nunca gerar resposta estática vazia no build para esta rota. */
export const dynamic = "force-dynamic";

/**
 * OG dinâmica: `/api/og?ticker=ITUB4&nome=...&valor=R%24%200%2C02&tipo=acao|fii&ogv=2`
 * — `valor` opcional (se ausente, calcula a partir dos dividendos na brapi, com cache).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawTicker = (searchParams.get("ticker") ?? "").trim();
  const sym = rawTicker.toUpperCase().replace(/[^A-Z0-9]/g, "") || "B3";
  const tipo = searchParams.get("tipo") === "fii" ? "fii" : "acao";
  const nome = sanitizeOgEntityName(searchParams.get("nome"));
  const valorFromQuery = sanitizeOgValorParam(searchParams.get("valor"));

  try {
    const stock = await fetchQuoteForOg(sym);
    const logoRemote = stock?.logoUrl ?? null;
    const valorResolved = resolvePerShareValueForOg(stock);
    const valorFormatted = valorFromQuery ?? valorResolved;

    return await createApiOgImageResponseFromTicker({
      ticker: sym,
      nome,
      valorFormatted,
      assetLabel: tipo === "fii" ? "cota" : "ação",
      logoRemoteUrl: logoRemote,
    });
  } catch (err) {
    console.error("[api/og]", sym, err);
    return createApiOgSafeFallbackResponse(sym, tipo === "fii" ? "cota" : "ação");
  }
}
