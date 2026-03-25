import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
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
  TickerEditorialSection,
} from "@/components/ticker";
import { mergeFaqByQuestion } from "@/lib/acoes/stock-intent-copy";
import { BrapiError, getStockData } from "@/lib/brapi";
import { getArticlesForFii } from "@/data/articles";
import { buildAllFiiSlugStaticParams } from "@/data/fii-registry";
import { getFiiSeo, getPeerFiis } from "@/data/fiis";
import { fiiIntentEditorialAddendum, fiiIntentExtraFaqs } from "@/lib/fiis/fii-intent-copy";
import { canonicalMainFiiPath, getFiiIntentMetadata } from "@/lib/fiis/fii-intent-seo";
import { parseFiiSlug } from "@/lib/fiis/fii-slug";
import { generateFiiEditorialParagraphs, generateFiiSummaryParagraph } from "@/lib/fii-page";
import {
  buildDividendTableRows,
  getLastPerShareSnapshot,
  getNextPerShareSnapshot,
  inferPaymentFrequencyLabel,
} from "@/lib/ticker-page";
import { generateFiiProgrammaticFAQ } from "@/lib/programmatic/fii-page-seo";
import {
  SITE_NAME,
  breadcrumbsFiiSlug,
  buildFiiSlugPageMetadata,
  buildWebPageSchema,
} from "@/lib/seo";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return buildAllFiiSlugStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug).trim();
  const { ticker: symbol, variant } = parseFiiSlug(slug);
  const mock = getFiiSeo(symbol);
  return buildFiiSlugPageMetadata(symbol, mock, slug, variant);
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
  const tableRows = buildDividendTableRows(lastSnap, nextSnap, currency);

  const relatedArticles = getArticlesForFii(mock.ticker);
  const peers = getPeerFiis(mock.ticker);

  const faqItems = mergeFaqByQuestion([
    fiiIntentExtraFaqs(variant, symbol),
    generateFiiProgrammaticFAQ(symbol, mock, lastSnap, frequencyHint, currency),
  ]);

  const heroTitle =
    variant === "main" ? `Rendimentos de ${symbol}` : `${symbol} paga quanto por mês?`;

  const baseEditorial = generateFiiEditorialParagraphs(symbol, displayName, mock);
  const intentParas = fiiIntentEditorialAddendum(variant, symbol, displayName);
  const editorialParagraphs =
    variant === "main" ? baseEditorial : [...intentParas, ...baseEditorial];

  const editorialSectionTitle =
    variant === "main" ? "Contexto sobre rendimentos" : "Quanto paga por mês em rendimentos";

  const mainMeta = getFiiIntentMetadata(symbol, mock, "main");
  const schemaPath = canonicalMainFiiPath(symbol);

  return (
    <main className="w-full min-w-0">
      <JsonLd
        data={buildWebPageSchema({
          name: `${mainMeta.title} | ${SITE_NAME}`,
          description: mainMeta.description,
          path: schemaPath,
        })}
      />
      <TickerPageLayout>
        <TickerPageRow>
          <Breadcrumbs items={breadcrumbsFiiSlug(symbol, variant)} />
        </TickerPageRow>

        {variant === "main" ? (
          <TickerPageRow>
            <FiiIntentLandingLinks symbol={symbol} />
          </TickerPageRow>
        ) : null}

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
                title={heroTitle}
              />
            }
          />
        </TickerPageRow>

        {variant !== "main" ? (
          <TickerPageRow>
            <FiiQuickAnswer symbol={symbol} lastSnap={lastSnap} currency={currency} variant={variant} />
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
          <StockFAQ title="Perguntas frequentes" items={faqItems} id="heading-faq-fii" />
        </TickerPageRow>
      </TickerPageLayout>
    </main>
  );
}
