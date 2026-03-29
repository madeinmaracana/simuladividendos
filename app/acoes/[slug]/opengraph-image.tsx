import { parseAcaoSlug } from "@/lib/acoes/acao-slug";
import { createTickerOgImageResponse, OG_SIZE } from "@/lib/og/create-ticker-og-image";
import {
  buildAcaoOgPayload,
  buildFallbackOgPayload,
  fetchLogoAsDataUrl,
  fetchQuoteForOg,
} from "@/lib/og/ticker-og-data";
import { getStockSeo } from "@/lib/stocks-data";

export const runtime = "edge";
export const alt = "Pré-visualização — dividendos e simulação";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug ?? "").trim();
  const { ticker, variant } = parseAcaoSlug(slug);
  const mock = getStockSeo(ticker);
  const stock = await fetchQuoteForOg(ticker);
  const logoDataUrl = await fetchLogoAsDataUrl(stock?.logoUrl ?? null);

  const v = variant === "paga-quanto" ? "paga-quanto" : variant === "main" ? "main" : "other";
  const payload =
    stock || mock
      ? buildAcaoOgPayload(ticker, v, stock, mock?.companyName ?? null, logoDataUrl)
      : buildFallbackOgPayload(ticker);

  return createTickerOgImageResponse(payload);
}
