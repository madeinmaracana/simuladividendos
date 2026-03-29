import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StockAcaoIntentNav } from "@/components/stocks/StockAcaoIntentNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { RelatedTickers } from "@/components/stocks/RelatedTickers";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TickerPageLayout, TickerPageRow } from "@/components/layout/TickerPageLayout";
import { ProgrammaticTickerInterlinking } from "@/components/seo/ProgrammaticTickerInterlinking";
import { RelatedArticlesSection } from "@/components/seo/RelatedArticlesSection";
import { StockQuickAnswer } from "@/components/stocks/StockQuickAnswer";
import {
  CompanyInfoSection,
  DividendHistorySection,
  DividendSummaryText,
  DividendTableSimple,
  SearchIntentTeaser,
  TickerHero,
  TickerInternalNav,
  TickerMiniMetrics,
  TickerEditorialSection,
  TickerSimulatorTop,
} from "@/components/ticker";
import {
  acaoPathFromSlug,
  acaoVariantShares,
  buildAllAcaoSlugStaticParams,
  isAcaoVariantIndexable,
  parseAcaoSlug,
} from "@/lib/acoes/acao-slug";
import { canonicalMainAcaoPath, getStockIntentMetadata } from "@/lib/acoes/stock-intent-seo";
import {
  mergeFaqByQuestion,
  stockIntentEditorialAddendum,
  stockIntentEditorialHeading,
  stockIntentExtraFaqs,
  stockIntentHeroTitle,
} from "@/lib/acoes/stock-intent-copy";
import { BrapiError, getStockData } from "@/lib/brapi";
import {
  buildAcaoRelacionadosLinks,
  buildAcaoVejaTambemLinks,
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
import {
  SITE_NAME,
  breadcrumbsAcao,
  buildAcaoSlugPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return buildAllAcaoSlugStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug).trim();
  const { ticker: symbol, variant } = parseAcaoSlug(slug);
  const mock = getStockSeo(symbol);
  return buildAcaoSlugPageMetadata(symbol, mock, slug, variant);
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
    stockIntentExtraFaqs(variant, symbol),
    generateFAQ(symbol, mock, lastSnap, nextSnap, frequencyHint, currency),
  ]);

  const heroTitle = stockIntentHeroTitle(symbol, variant);
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
    variant === "main"
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

  return (
    <main className="w-full min-w-0">
      <JsonLd
        data={buildWebPageSchema({
          name: `${schemaMeta.title} | ${SITE_NAME}`,
          description: schemaMeta.description,
          path: schemaPath,
        })}
      />
      <TickerPageLayout>
        <TickerPageRow>
          <Breadcrumbs items={breadcrumbsAcao(symbol, mock, variant)} />
        </TickerPageRow>

        <TickerPageRow>
          <StockAcaoIntentNav symbol={symbol} current={variant} />
        </TickerPageRow>

        <TickerPageRow>
          <TickerSimulatorTop
            ticker={symbol}
            initialStock={initialStock}
            serverError={serverError}
            defaultShares={100}
            hero={
              <TickerHero
                variant="split"
                symbol={symbol}
                companyName={displayName}
                sectorLabel={sectorLabel}
                shortDescription={shortDescription}
                logoUrl={initialStock?.logoUrl ?? undefined}
                currentPrice={initialStock?.currentPrice ?? initialStock?.regularMarketPrice ?? null}
                currency={currency}
                lastUpdated={initialStock?.lastUpdated}
                title={heroTitle}
                afterTitle={
                  <SearchIntentTeaser
                    symbol={symbol}
                    currency={currency}
                    dividends={dividends}
                    simulationShares={intentSimulationShares}
                    assetKind="stock"
                  />
                }
              />
            }
          />
        </TickerPageRow>

        <TickerPageRow>
          <ProgrammaticTickerInterlinking
            vejaTambem={buildAcaoVejaTambemLinks(symbol, slug)}
            outrosAtivos={mock ? buildAcaoRelacionadosLinks(peers, symbol) : []}
            sectorHub={
              mock
                ? {
                    href: getSectorPath(mock.sectorSlug),
                    label: `Ver todas as ações em ${mock.sectorLabel}`,
                  }
                : { href: "/setores", label: "Explorar setores na B3" }
            }
          />
        </TickerPageRow>

        {variant !== "main" && (
          <TickerPageRow>
            <StockQuickAnswer symbol={symbol} lastSnap={lastSnap} currency={currency} variant={variant} />
          </TickerPageRow>
        )}

        <TickerPageRow>
          <DividendSummaryText text={summaryText} />
        </TickerPageRow>

        <TickerPageRow>
          <TickerEditorialSection
            paragraphs={editorialParagraphs}
            sectionTitle={stockIntentEditorialHeading(variant)}
          />
        </TickerPageRow>

        <TickerPageRow>
          <DividendTableSimple rows={tableRows} />
        </TickerPageRow>

        {(yieldDisp || metrics.avgMonthlyPerShare || metrics.total12mPerShare) && (
          <TickerPageRow>
            <TickerMiniMetrics
              yieldDisplay={yieldDisp}
              avgMonthlyPerShare={metrics.avgMonthlyPerShare}
              total12mPerShare={metrics.total12mPerShare}
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
          <StockFAQ title="Perguntas frequentes" items={faqItems} id="heading-faq-acao" />
        </TickerPageRow>

        {!mock ? (
          <TickerPageRow>
            <p className="flex flex-wrap gap-x-2 gap-y-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-500">
              <a href="/setores" className="font-medium text-teal-700 hover:underline dark:text-teal-400">
                Explorar setores
              </a>
            </p>
          </TickerPageRow>
        ) : null}
      </TickerPageLayout>
    </main>
  );
}
