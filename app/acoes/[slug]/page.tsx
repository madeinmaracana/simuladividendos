import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

  return (
    <main className="w-full min-w-0">
      <JsonLd
        data={
          [webPageJsonLd, buildFaqPageSchema(faqList.slice(0, 12))]
        }
      />
      <TickerPageLayout>
        {/* ── Hero title section ── */}
        <TickerPageRow>
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs font-medium uppercase tracking-normal text-[color:var(--text-soft)]">
                {symbol}
              </p>
              <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-medium text-[color:var(--text-secondary)]">
                {sectorLabel}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-[color:var(--text)] sm:text-4xl">
              {heroTitle}
            </h1>
            <p className="text-sm text-[color:var(--text-secondary)]">{introText}</p>
            <SearchIntentTeaser
              symbol={symbol}
              currency={currency}
              dividends={dividends}
              simulationShares={variant === "paga-quanto" ? 100 : intentSimulationShares}
              assetKind="stock"
              stockCopyProfile={variant === "paga-quanto" ? "paga-quanto" : "default"}
            />
          </header>
        </TickerPageRow>

        {/* ── New teal+white simulator card ── */}
        <TickerPageRow>
          <div className="w-full max-w-[840px]">
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
        </TickerPageRow>

        <TickerPageRow>
          <section className="rounded-[length:var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-lg font-semibold text-[color:var(--text)]">{`Dividendos do ${symbol}`}</h2>
            <dl className="mt-3 grid gap-2 text-sm text-[color:var(--text-secondary)] sm:grid-cols-2">
              <div>
                <dt className="font-medium">Último dividendo (R$)</dt>
                <dd>{lastSnap ? formatBRL(lastSnap.amountPerShare, currency) : "—"}</dd>
              </div>
              <div>
                <dt className="font-medium">Média mensal</dt>
                <dd>{metrics.avgMonthlyPerShare ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-medium">Dividend yield estimado</dt>
                <dd>{yieldDisp ?? "—"}</dd>
              </div>
              <div>
                <dt className="font-medium">Frequência de pagamento</dt>
                <dd>{frequencyHint ?? "—"}</dd>
              </div>
            </dl>
          </section>
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
          <section className="text-sm text-[color:var(--text-secondary)]">
            <p className="font-semibold text-[color:var(--text)]">{`Veja também sobre ${symbol}:`}</p>
            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              <a href={acaoPathFromSlug(acaoVariantSlug(symbol, "dividendos"))} className="underline">
                Dividendos por ação
              </a>
              <a href={acaoPathFromSlug(acaoVariantSlug(symbol, "quanto-rende-100-cotas"))} className="underline">
                Quanto rende 100 cotas
              </a>
              <a href={acaoPathFromSlug(acaoVariantSlug(symbol, "simulador-de-dividendos"))} className="underline">
                Simulador
              </a>
              <a href="/" className="underline">
                Página inicial
              </a>
            </p>
          </section>
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
