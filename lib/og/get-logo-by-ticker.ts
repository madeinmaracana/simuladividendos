import { fetchQuoteForOg } from "@/lib/og/ticker-og-data";

/**
 * Retorna a URL brapi (`logourl`) — em geral **SVG** em `icons.brapi.dev`.
 * Na OG, `resolveOgLogoDataUrl` tenta PNG local, raster remoto e favicon do site mapeado;
 * se tudo falhar, o layout mostra só o ticker no quadrado.
 */
export async function getLogoByTicker(ticker: string): Promise<{ url: string | null }> {
  const symbol = ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!symbol) return { url: null };
  const quote = await fetchQuoteForOg(symbol);
  return { url: quote?.logoUrl ?? null };
}
