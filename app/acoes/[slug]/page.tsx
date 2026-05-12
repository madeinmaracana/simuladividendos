import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { RelatedTickers } from "@/components/stocks/RelatedTickers";
import { TickerPageLayout, TickerPageRow } from "@/components/layout/TickerPageLayout";
import { RelatedArticlesSection } from "@/components/seo/RelatedArticlesSection";
import { StockQuickAnswer } from "@/components/stocks/StockQuickAnswer";
import {
  CompanyInfoSection,
  DividendHistoryChart,
  DividendHistorySection,
  DividendSummaryText,
  DividendTableSimple,
  SearchIntentTeaser,
  TickerHero,
  TickerHeroSimulatorCard,
  TickerInternalNav,
  TickerMiniMetrics,
  TickerEditorialSection,
  TickerSimulatorTop,
} from "@/components/ticker";
import {
  acaoVariantSlug,
  acaoPathFromSlug,
  acaoVariantShares,
  buildAllAcaoSlugStaticParams,
  isAcaoVariantIndexable,
  parseAcaoSlug,
} from "@/lib/acoes/acao-slug";
import { canonicalMainAcaoPath, getStockIntentMetadata } from "@/lib/acoes/stock-intent-seo";
import {
  buildAcaoPagaQuantoFaqs,
  ensureMinimumTickerFaqs,
  mergeFaqByQuestion,
  stockIntentIntroParagraph,
  stockIntentEditorialAddendum,
  stockIntentEditorialHeading,
  stockIntentExtraFaqs,
  stockIntentHeroTitle,
} from "@/lib/acoes/stock-intent-copy";
import { BrapiError, getStockData } from "@/lib/brapi";
import { formatBRL } from "@/lib/format";
import {
  buildDividendTableRows,
  deriveOptionalMetrics,
  formatYieldForDisplay,
  generateDividendSummaryParagraph,
  getLastPerShareSnapshot,
  getNextPerShareSnapshot,
  inferPaymentFrequencyLabel,
} from "@/lib/ticker-page";
import { generateTickerSummaryText } from "@/lib/ticker-page";
import { getPeerTickers, getSectorPath, getStockSeo } from "@/lib/stocks-data";
import { getArticlesForTicker } from "@/data/articles";
import { generateFAQ } from "@/lib/programmatic/stock-seo";
import { buildAbsoluteOgApiUrl } from "@/lib/og/build-og-api-url";
import { fetchQuoteForOg, resolvePerShareValueForOg } from "@/lib/og/ticker-og-data";
import {
  SITE_NAME,
  buildAcaoSlugPageMetadata,
  breadcrumbsAcao,
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildWebPageSchema,
  withOpenGraphApiImage,
} from "@/lib/seo";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return buildAllAcaoSlugStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug).trim();
  const { ticker: symbol, variant } = parseAcaoSlug(slug);
  const mock = getStockSeo(symbol);
  const base = buildAcaoSlugPageMetadata(symbol, mock, slug, variant);

  const quote = await fetchQuoteForOg(symbol);
  const valor = resolvePerShareValueForOg(quote);
  const nome =
    mock?.companyName?.trim() ||
    quote?.longName?.trim() ||
    quote?.shortName?.trim() ||
    undefined;
  const ogUrl = buildAbsoluteOgApiUrl({
    ticker: symbol,
    nome,
    valor: valor ?? undefined,
    tipo: "acao",
  });

  return withOpenGraphApiImage(base, ogUrl);
}

export default async function AcaoSlugPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug).trim();
  if (!slug) notFound();

  const { ticker: symbol, variant } = parseAcaoSlug(slug);
  const mock = getStockSeo(symbol);

  let serverError: string | null = null;
  let initialStock = null;

  try {
    initialStock = await getStockData(symbol);
  } catch (e) {
    if (e instanceof BrapiError) {
      serverError = e.message;
    } else {
      serverError = "Não foi possível carregar os dados deste ativo.";
    }
  }

  const displayName =
    mock?.companyName ?? initialStock?.longName ?? initialStock?.shortName ?? "Ação na B3";

  const sectorLabel = mock?.sectorLabel ?? "—";
  const shortDescription =
    mock?.shortDescription ??
    "Página com dividendos e simulação com base na fonte de dados. Conteúdo editorial específico pode ser ampliado no futuro.";

  const dividends = initialStock?.dividends ?? [];
  const lastSnap = dividends.length ? getLastPerShareSnapshot(dividends) : null;
  const nextSnap = dividends.length ? getNextPerShareSnapshot(dividends) : null;
  const frequencyHint = dividends.length >= 2 ? inferPaymentFrequencyLabel(dividends) : null;

  const summaryText = generateDividendSummaryParagraph(
    symbol,
    lastSnap,
    nextSnap,
    frequencyHint,
    mock?.paymentFrequency && mock.paymentFrequency.length < 120 ? mock.paymentFrequency : undefined
  );

  const currency = initialStock?.currency ?? "BRL";
  const tableRows = buildDividendTableRows(lastSnap, nextSnap, currency);
  const metrics = deriveOptionalMetrics(initialStock);
  const yieldDisp = formatYieldForDisplay(metrics.dividendYieldPct);

  const relatedArticles = mock ? getArticlesForTicker(mock.ticker) : [];
  const peers = mock ? getPeerTickers(mock.ticker) : [];

  const faqItems = mergeFaqByQuestion([
    variant === "paga-quanto"
      ? buildAcaoPagaQuantoFaqs(symbol, displayName, lastSnap, currency)
      : [],
    stockIntentExtraFaqs(variant, symbol),
    generateFAQ(symbol, mock, lastSnap, nextSnap, frequencyHint, currency),
  ]);
  const faqList = ensureMinimumTickerFaqs(symbol, faqItems);

  const heroTitle = stockIntentHeroTitle(symbol, variant);
  const introText = stockIntentIntroParagraph(
    symbol,
    displayName,
    lastSnap ? formatBRL(lastSnap.amountPerShare, currency) : null
  );
  const intentSimulationShares = acaoVariantShares(variant) ?? 100;

  const baseEditorial = generateTickerSummaryText({
    symbol,
    companyName: displayName,
    sectorLabel,
    mock,
    last: lastSnap,
    next: nextSnap,
    frequencyHint,
    paymentFrequencyNote:
      mock?.paymentFrequency && mock.paymentFrequency.length < 120 ? mock.paymentFrequency : undefined,
    dividends,
  });

  const intentParas = stockIntentEditorialAddendum(variant, symbol, displayName);
  const editorialParagraphs =
    variant === "paga-quanto"
      ? intentParas
      : variant === "main"
        ? [...baseEditorial, ...intentParas]
        : [
            ...intentParas,
            `A tabela e o histórico abaixo usam a mesma fonte da visão geral de ${symbol}; a diferença está no texto e nas perguntas frequentes, alinhados à sua busca.`,
          ];

  const pagePath = acaoPathFromSlug(slug);
  const indexable = isAcaoVariantIndexable(symbol, variant);
  const mainMeta = getStockIntentMetadata(symbol, mock, "main");
  const variantMeta = getStockIntentMetadata(symbol, mock, variant);
  const schemaPath = indexable ? pagePath : canonicalMainAcaoPath(symbol);
  const schemaMeta = indexable ? variantMeta : mainMeta;

  const webPageJsonLd = buildWebPageSchema({
    name: `${schemaMeta.title} | ${SITE_NAME}`,
    description: schemaMeta.description,
    path: schemaPath,
  });

  const breadcrumbJsonLd = buildBreadcrumbSchema(
    breadcrumbsAcao(symbol, mock, variant),
    pagePath
  );

  return (
    <main className="w-full min-w-0 py-16 lg:py-24">
      <JsonLd
        data={[webPageJsonLd, breadcrumbJsonLd, buildFaqPageSchema(faqList.slice(0, 12))]}

      />
      <TickerPageLayout>
        {/* ── Hero: texto (esquerda) + simulador (direita) ── */}
        <TickerPageRow>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-x-8">
            {/* Esquerda — copy */}
            <div className="flex flex-col gap-8 lg:col-span-7">
              {/* Logo + ticker + setor */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {initialStock?.logoUrl ? (
                    <Image
                      src={initialStock.logoUrl}
                      alt={symbol}
                      width={32}
                      height={32}
                      className="h-8 w-8 shrink-0 rounded-full object-contain"
                    />
                  ) : null}
                  <span className="text-[13px] font-medium text-[#808080]">{symbol}</span>
                </div>
                <span className="flex items-center gap-1 rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-2.5 py-0.5 text-[13px] font-medium text-[#808080]">
                  <span
                    className="material-symbols-outlined leading-none"
                    style={{ fontSize: 14, fontVariationSettings: "'opsz' 16, 'wght' 400, 'FILL' 1, 'GRAD' 0" }}
                  >
                    bolt
                  </span>
                  {sectorLabel}
                </span>
              </div>
              {/* Título */}
              <h1 className="text-[53px] font-medium leading-[63px] text-white">
                {heroTitle}
              </h1>
              {/* Descrição */}
              <div className="flex flex-col gap-3">
                <p className="text-[13px] font-medium leading-relaxed text-[#808080]">{introText}</p>
                <SearchIntentTeaser
                  symbol={symbol}
                  currency={currency}
                  dividends={dividends}
                  simulationShares={variant === "paga-quanto" ? 100 : intentSimulationShares}
                  assetKind="stock"
                  stockCopyProfile={variant === "paga-quanto" ? "paga-quanto" : "default"}
                />
              </div>
            </div>

            {/* Direita — simulador */}
            <div className="lg:col-span-5">
              <TickerHeroSimulatorCard
                ticker={symbol}
                companyName={displayName}
                logoUrl={initialStock?.logoUrl ?? null}
                initialStock={initialStock}
                serverError={serverError}
                defaultShares={100}
                dividendSummary={summaryText}
              />
            </div>
          </div>
        </TickerPageRow>

        {variant !== "main" && variant !== "paga-quanto" && (
          <TickerPageRow>
            <StockQuickAnswer symbol={symbol} lastSnap={lastSnap} currency={currency} variant={variant} />
          </TickerPageRow>
        )}

        <TickerPageRow>
          <DividendSummaryText text={summaryText} />
        </TickerPageRow>

        {variant === "paga-quanto" ? (
          <>
            <TickerPageRow>
              <DividendTableSimple rows={tableRows} />
            </TickerPageRow>
            <TickerPageRow>
              <TickerEditorialSection
                paragraphs={editorialParagraphs}
                sectionTitle={stockIntentEditorialHeading(variant)}
              />
            </TickerPageRow>
          </>
        ) : (
          <>
            <TickerPageRow>
              <TickerEditorialSection
                paragraphs={editorialParagraphs}
                sectionTitle={stockIntentEditorialHeading(variant)}
              />
            </TickerPageRow>
            <TickerPageRow>
              <DividendTableSimple rows={tableRows} />
            </TickerPageRow>
          </>
        )}

        {(yieldDisp || metrics.avgMonthlyPerShare || metrics.total12mPerShare) && (
          <TickerPageRow>
            <TickerMiniMetrics
              yieldDisplay={yieldDisp}
              avgMonthlyPerShare={metrics.avgMonthlyPerShare}
              total12mPerShare={metrics.total12mPerShare}
            />
          </TickerPageRow>
        )}

        {dividends.length > 0 && (
          <TickerPageRow>
            <DividendHistoryChart
              dividends={dividends}
              currency={currency}
              frequencyHint={frequencyHint}
            />
          </TickerPageRow>
        )}

        <TickerPageRow>
          <DividendHistorySection rows={dividends} currency={currency} />
        </TickerPageRow>

        {mock ? (
          <TickerPageRow>
            <CompanyInfoSection
              companyName={mock.companyName}
              shortDescription={mock.shortDescription}
              extraParagraph={
                mock.historySummary
                  ? mock.historySummary.slice(0, 400) + (mock.historySummary.length > 400 ? "…" : "")
                  : undefined
              }
            />
          </TickerPageRow>
        ) : null}

        {mock ? (
          <TickerPageRow>
            <RelatedTickers
              symbol={symbol}
              sectorSlug={mock.sectorSlug}
              sectorLabel={mock.sectorLabel}
              peers={peers}
              hasRelatedArticles={relatedArticles.length > 0}
            />
          </TickerPageRow>
        ) : null}

        {mock && relatedArticles.length ? (
          <TickerPageRow>
            <RelatedArticlesSection
              articles={relatedArticles}
              id="heading-artigos-relacionados"
              max={5}
              showSimuladorCta
            />
          </TickerPageRow>
        ) : null}

        <TickerPageRow>
          <TickerInternalNav sectorHref={mock ? getSectorPath(mock.sectorSlug) : "/setores"} sectorLabel={mock?.sectorLabel ?? "Setores"} />
        </TickerPageRow>

        <TickerPageRow>
          <StockFAQ title={`Perguntas frequentes sobre ${symbol}`} items={faqList} id="heading-faq-acao" />
        </TickerPageRow>

        <TickerPageRow>
          <section className="flex flex-col gap-3">
            <p className="text-[13px] font-medium text-[#808080]">{`Veja também sobre ${symbol}:`}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-2">
              <a href={acaoPathFromSlug(acaoVariantSlug(symbol, "dividendos"))} className="text-[13px] font-medium text-white underline-offset-2 hover:underline">
                Dividendos por ação
              </a>
              <a href={acaoPathFromSlug(acaoVariantSlug(symbol, "quanto-rende-100-cotas"))} className="text-[13px] font-medium text-white underline-offset-2 hover:underline">
                Quanto rende 100 cotas
              </a>
              <a href={acaoPathFromSlug(acaoVariantSlug(symbol, "simulador-de-dividendos"))} className="text-[13px] font-medium text-white underline-offset-2 hover:underline">
                Simulador
              </a>
              <a href="/" className="text-[13px] font-medium text-white underline-offset-2 hover:underline">
                Página inicial
              </a>
            </p>
          </section>
        </TickerPageRow>
      </TickerPageLayout>
    </main>
  );
}
