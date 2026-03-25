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
} from "@/components/fii";
import {
  CompanyInfoSection,
  DividendHistorySection,
  DividendSummaryText,
  DividendTableSimple,
  TickerEditorialSection,
} from "@/components/ticker";
import { BrapiError, getStockData } from "@/lib/brapi";
import { getArticlesForFii } from "@/data/articles";
import { buildAllFiiStaticParams } from "@/data/fii-registry";
import { getFiiSeo, getPeerFiis } from "@/data/fiis";
import { generateFiiEditorialParagraphs, generateFiiSummaryParagraph } from "@/lib/fii-page";
import {
  buildDividendTableRows,
  getLastPerShareSnapshot,
  getNextPerShareSnapshot,
  inferPaymentFrequencyLabel,
} from "@/lib/ticker-page";
import {
  generateFiiProgrammaticDescription,
  generateFiiProgrammaticFAQ,
  generateFiiProgrammaticTitle,
} from "@/lib/programmatic/fii-page-seo";
import { SITE_NAME, breadcrumbsFii, buildFiiPageMetadata, buildWebPageSchema } from "@/lib/seo";

type PageProps = { params: { ticker: string } };

export function generateStaticParams() {
  return buildAllFiiStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const symbol = decodeURIComponent(params.ticker).trim().toUpperCase();
  const mock = getFiiSeo(symbol);
  return buildFiiPageMetadata(symbol, mock);
}

export default async function FiiTickerPage({ params }: PageProps) {
  const raw = decodeURIComponent(params.ticker).trim();
  if (!raw) notFound();

  const symbol = raw.toUpperCase();
  const mock = getFiiSeo(symbol);
  if (!mock) notFound();

  let serverError: string | null = null;
  let initialStock = null;

  try {
    initialStock = await getStockData(raw);
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

  const faqItems = generateFiiProgrammaticFAQ(symbol, mock, lastSnap, frequencyHint, currency);

  const title = `Rendimentos de ${symbol}`;
  const editorialParagraphs = generateFiiEditorialParagraphs(symbol, displayName, mock);
  const fiiPath = `/fiis/${encodeURIComponent(symbol)}`;

  return (
    <main className="w-full min-w-0">
      <JsonLd
        data={buildWebPageSchema({
          name: `${generateFiiProgrammaticTitle(symbol, mock)} | ${SITE_NAME}`,
          description: generateFiiProgrammaticDescription(symbol, mock),
          path: fiiPath,
        })}
      />
      <TickerPageLayout>
        <TickerPageRow>
          <Breadcrumbs items={breadcrumbsFii(symbol)} />
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
                title={title}
              />
            }
          />
        </TickerPageRow>

        <TickerPageRow>
          <DividendSummaryText id="heading-resumo-fii" text={summaryText} />
        </TickerPageRow>

        <TickerPageRow>
          <TickerEditorialSection
            paragraphs={editorialParagraphs}
            id="heading-contexto-fii"
            sectionTitle="Contexto sobre rendimentos"
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
