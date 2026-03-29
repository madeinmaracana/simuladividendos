import { fetchQuoteForOg } from "@/lib/og/ticker-og-data";

/**
 * Retorna a URL pública da logo (ex.: brapi `logourl`) para o ticker.
 * Para embutir em `ImageResponse`, use `fetchLogoAsDataUrl(url)` na rota OG.
 */
export async function getLogoByTicker(ticker: string): Promise<{ url: string | null }> {
  const symbol = ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!symbol) return { url: null };
  const quote = await fetchQuoteForOg(symbol);
  return { url: quote?.logoUrl ?? null };
}
