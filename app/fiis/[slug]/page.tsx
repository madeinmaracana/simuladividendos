import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProgrammaticTickerInterlinking } from "@/components/seo/ProgrammaticTickerInterlinking";
import { RelatedArticlesSection } from "@/components/seo/RelatedArticlesSection";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TickerPageLayout, TickerPageRow } from "@/components/layout/TickerPageLayout";
import {
  FiiHero,
  FiiSimulatorTop,
  FiiInternalNav,
  RelatedFiiLinks,
  FiiQuickAnswer,
  FiiIntentLandingLinks,
} from "@/components/fii";
import {
  CompanyInfoSection,
  DividendHistorySection,
  DividendSummaryText,
  DividendTableSimple,
  SearchIntentTeaser,
  TickerEditorialSection,
} from "@/components/ticker";
import { mergeFaqByQuestion } from "@/lib/acoes/stock-intent-copy";
import { BrapiError, getStockData } from "@/lib/brapi";
import { formatBRL } from "@/lib/format";
import { getArticlesForFii } from "@/data/articles";
import { buildAllFiiSlugStaticParams, isFiiVariantIndexable } from "@/data/fii-registry";
import { getFiiSeo, getPeerFiis } from "@/data/fiis";
import {
  ensureMinimumFiiFaqs,
  fiiIntentEditorialAddendum,
  fiiIntentExtraFaqs,
  fiiIntentIntroParagraph,
} from "@/lib/fiis/fii-intent-copy";
import { canonicalMainFiiPath, getFiiIntentMetadata } from "@/lib/fiis/fii-intent-seo";
import { fiiPathFromSlug, fiiVariantShares, parseFiiSlug } from "@/lib/fiis/fii-slug";
import { generateFiiEditorialParagraphs, generateFiiSummaryParagraph } from "@/lib/fii-page";
import {
  buildDividendTableRows,
  buildFiiRelacionadosLinks,
  buildFiiVejaTambemLinks,
  getLastPerShareSnapshot,
  getNextPerShareSnapshot,
  inferPaymentFrequencyLabel,
} from "@/lib/ticker-page";
import { generateFiiProgrammaticFAQ } from "@/lib/programmatic/fii-page-seo";
import { buildAbsoluteOgApiUrl } from "@/lib/og/build-og-api-url";
import { fetchQuoteForOg, resolvePerShareValueForOg } from "@/lib/og/ticker-og-data";
import {
  SITE_NAME,
  breadcrumbsFiiSlug,
  buildFaqPageSchema,
  buildFiiSlugPageMetadata,
  buildWebPageSchema,
  withOpenGraphApiImage,
} from "@/lib/seo";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return buildAllFiiSlugStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug).trim();
  const { ticker: symbol, variant } = parseFiiSlug(slug);
  const mock = getFiiSeo(symbol);
  const base = buildFiiSlugPageMetadata(symbol, mock, slug, variant);

  const quote = await fetchQuoteForOg(symbol);
  const valor = resolvePerShareValueForOg(quote);
  const nome =
    mock?.fundName?.trim() ||
    quote?.longName?.trim() ||
    quote?.shortName?.trim() ||
    undefined;
  const ogUrl = buildAbsoluteOgApiUrl({
    ticker: symbol,
    nome,
    valor: valor ?? undefined,
    tipo: "fii",
  });

  return withOpenGraphApiImage(base, ogUrl);
}

export default async function FiiSlugPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug).trim();
  if (!slug) notFound();

  const { ticker: symbol, variant } = parseFiiSlug(slug);
  const mock = getFiiSeo(symbol);
  if (!mock) notFound();

  let serverError: string | null = null;
  let initialStock = null;

  try {
    initialStock = await getStockData(symbol);
  } catch (e) {
    if (e instanceof BrapiError) {
      serverError = e.message;
    } else {
      serverError = "Não foi possível carregar os dados deste fundo.";
    }
  }

  const displayName = mock.fundName ?? initialStock?.longName ?? initialStock?.shortName ?? symbol;
  const shortDescription = mock.shortDescription;

  const dividends = initialStock?.dividends ?? [];
  const lastSnap = dividends.length ? getLastPerShareSnapshot(dividends) : null;
  const nextSnap = dividends.length ? getNextPerShareSnapshot(dividends) : null;
  const frequencyHint = dividends.length >= 2 ? inferPaymentFrequencyLabel(dividends) : null;

  const summaryText = generateFiiSummaryParagraph(
    symbol,
    lastSnap,
    nextSnap,
    frequencyHint,
    mock.paymentFrequency && mock.paymentFrequency.length < 120 ? mock.paymentFrequency : undefined
  );

  const currency = initialStock?.currency ?? "BRL";
  const estimatedYield =
    lastSnap &&
    initialStock?.regularMarketPrice &&
    initialStock.regularMarketPrice > 0
      ? `${((lastSnap.amountPerShare * 12 * 100) / initialStock.regularMarketPrice).toFixed(2)}%`
      : "—";
  const tableRows = buildDividendTableRows(lastSnap, nextSnap, currency);

  const relatedArticles = getArticlesForFii(mock.ticker);
  const peers = getPeerFiis(mock.ticker);

  const faqItems = mergeFaqByQuestion([
    fiiIntentExtraFaqs(variant, symbol),
    generateFiiProgrammaticFAQ(symbol, mock, lastSnap, frequencyHint, currency),
  ]);
  const faqList = ensureMinimumFiiFaqs(symbol, faqItems);
  const introText = fiiIntentIntroParagraph(
    symbol,
    displayName,
    lastSnap ? formatBRL(lastSnap.amountPerShare, currency) : null
  );

  const variantShares = fiiVariantShares(variant);
  const heroTitle = `${symbol} paga quanto em dividendos?`;

  const baseEditorial = generateFiiEditorialParagraphs(symbol, displayName, mock);
  const intentParas = fiiIntentEditorialAddendum(variant, symbol, displayName);
  const editorialParagraphs =
    variant === "main" ? baseEditorial : [...intentParas, ...baseEditorial];

  const editorialSectionTitle =
    variant === "main"
      ? "Contexto sobre rendimentos"
      : variantShares
        ? `Quanto rendem ${variantShares} cotas`
        : variant === "simulador-de-dividendos" || variant === "simulador"
          ? "Simulador de dividendos"
          : variant === "paga-quanto"
            ? "Quanto paga por cota"
            : "Quanto paga por mês em rendimentos";

  const pagePath = fiiPathFromSlug(slug);
  const indexable = isFiiVariantIndexable(symbol, variant);
  const mainMeta = getFiiIntentMetadata(symbol, mock, "main");
  const variantMeta = getFiiIntentMetadata(symbol, mock, variant);
  const schemaPath = indexable ? pagePath : canonicalMainFiiPath(symbol);
  const schemaMeta = indexable ? variantMeta : mainMeta;

  return (
    <main className="w-full min-w-0">
      <JsonLd
        data={[
          buildWebPageSchema({
            name: `${schemaMeta.title} | ${SITE_NAME}`,
            description: schemaMeta.description,
            path: schemaPath,
          }),
          buildFaqPageSchema(faqList.slice(0, 12)),
        ]}
      />
      <TickerPageLayout>
        <TickerPageRow>
          <Breadcrumbs items={breadcrumbsFiiSlug(symbol, variant)} />
        </TickerPageRow>

        <TickerPageRow>
          <FiiIntentLandingLinks symbol={symbol} />
        </TickerPageRow>

        <TickerPageRow>
          <FiiSimulatorTop
            ticker={symbol}
            initialStock={initialStock}
            serverError={serverError}
            defaultShares={100}
            hero={
              <FiiHero
                symbol={symbol}
                fundName={displayName}
                shortDescription={shortDescription}
                logoUrl={initialStock?.logoUrl ?? undefined}
                currentPrice={initialStock?.currentPrice ?? initialStock?.regularMarketPrice ?? null}
                currency={currency}
                lastUpdated={initialStock?.lastUpdated}
                title={heroTitle}
                afterTitle={
                  <>
                    <p className="text-sm text-[color:var(--text-secondary)]">{introText}</p>
                    <SearchIntentTeaser
                      symbol={symbol}
                      currency={currency}
                      dividends={dividends}
                      simulationShares={variantShares ?? 100}
                      assetKind="fii"
                    />
                  </>
                }
              />
            }
          />
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
                <dd>{frequencyHint ? "Ver histórico" : "—"}</dd>
              </div>
              <div>
                <dt className="font-medium">Dividend yield estimado</dt>
                <dd>{estimatedYield}</dd>
              </div>
              <div>
                <dt className="font-medium">Frequência de pagamento</dt>
                <dd>{frequencyHint ?? "—"}</dd>
              </div>
            </dl>
          </section>
        </TickerPageRow>

        <TickerPageRow>
          <ProgrammaticTickerInterlinking
            vejaTambem={buildFiiVejaTambemLinks(symbol, slug)}
            outrosAtivos={buildFiiRelacionadosLinks(peers, symbol)}
          />
        </TickerPageRow>

        {variant !== "main" ? (
          <TickerPageRow>
            <FiiQuickAnswer
              symbol={symbol}
              lastSnap={lastSnap}
              nextSnap={nextSnap}
              currency={currency}
              variant={variant}
            />
          </TickerPageRow>
        ) : null}

        <TickerPageRow>
          <DividendSummaryText id="heading-resumo-fii" text={summaryText} />
        </TickerPageRow>

        <TickerPageRow>
          <TickerEditorialSection
            paragraphs={editorialParagraphs}
            id="heading-contexto-fii"
            sectionTitle={editorialSectionTitle}
          />
        </TickerPageRow>

        <TickerPageRow>
          <DividendTableSimple rows={tableRows} />
        </TickerPageRow>

        <TickerPageRow>
          <DividendHistorySection
            rows={dividends}
            currency={currency}
            emptyMessage="Não há histórico de distribuições disponível para este fundo nos dados atuais."
          />
        </TickerPageRow>

        <TickerPageRow>
          <CompanyInfoSection
            id="heading-info-fii"
            sectionHeading="Sobre o fundo"
            companyName={displayName}
            shortDescription={mock.shortDescription}
            extraParagraph={
              mock.historySummary
                ? mock.historySummary.slice(0, 400) + (mock.historySummary.length > 400 ? "…" : "")
                : undefined
            }
          />
        </TickerPageRow>

        <TickerPageRow>
          <RelatedFiiLinks
            symbol={symbol}
            peers={peers}
            hasRelatedArticles={relatedArticles.length > 0}
          />
        </TickerPageRow>

        {relatedArticles.length > 0 ? (
          <TickerPageRow>
            <RelatedArticlesSection
              articles={relatedArticles}
              id="heading-artigos-relacionados-fii"
              title="Artigos relacionados"
              max={5}
              showSimuladorCta
            />
          </TickerPageRow>
        ) : null}

        <TickerPageRow>
          <FiiInternalNav />
        </TickerPageRow>

        <TickerPageRow>
          <StockFAQ title={`Perguntas frequentes sobre ${symbol}`} items={faqList} id="heading-faq-fii" />
        </TickerPageRow>

        <TickerPageRow>
          <section className="text-sm text-[color:var(--text-secondary)]">
            <p className="font-semibold text-[color:var(--text)]">Veja também:</p>
            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {peers.slice(0, 3).map((p) => (
                <a key={p.ticker} href={`/fiis/${p.ticker}`} className="underline">
                  {p.ticker}
                </a>
              ))}
              <a href="/" className="underline">
                Página inicial
              </a>
            </p>
          </section>
        </TickerPageRow>
      </TickerPageLayout>
    </main>
  );
}
