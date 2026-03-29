import { parseFiiSlug } from "@/lib/fiis/fii-slug";
import { createTickerOgImageResponse, OG_SIZE } from "@/lib/og/create-ticker-og-image";
import {
  buildFallbackOgPayload,
  buildFiiOgPayload,
  fetchLogoAsDataUrl,
  fetchQuoteForOg,
} from "@/lib/og/ticker-og-data";
import { getFiiSeo } from "@/data/fiis";

export const runtime = "edge";
export const alt = "Pré-visualização — rendimentos do fundo";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug ?? "").trim();
  const { ticker } = parseFiiSlug(slug);
  const mock = getFiiSeo(ticker);
  const stock = await fetchQuoteForOg(ticker);
  const logoDataUrl = await fetchLogoAsDataUrl(stock?.logoUrl ?? null);

  const payload = mock
    ? buildFiiOgPayload(ticker, stock, mock.fundName ?? null, logoDataUrl)
    : stock
      ? buildFiiOgPayload(ticker, stock, stock.longName ?? stock.shortName ?? null, logoDataUrl)
      : buildFallbackOgPayload(ticker);

  return createTickerOgImageResponse(payload);
}
