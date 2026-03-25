import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { StockPeerLinks } from "@/components/stocks/StockPeerLinks";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TickerPageLayout, TickerPageRow } from "@/components/layout/TickerPageLayout";
import { RelatedArticlesSection } from "@/components/seo/RelatedArticlesSection";
import {
  CompanyInfoSection,
  DividendHistorySection,
  DividendSummaryText,
  DividendTableSimple,
  TickerHero,
  TickerInternalNav,
  TickerMiniMetrics,
  TickerSimulatorTop,
} from "@/components/ticker";
import { BrapiError, getStockData } from "@/lib/brapi";
import {
  buildDividendTableRows,
  deriveOptionalMetrics,
  formatYieldForDisplay,
  generateDividendSummaryParagraph,
  getLastPerShareSnapshot,
  getNextPerShareSnapshot,
  inferPaymentFrequencyLabel,
} from "@/lib/ticker-page";
import { buildTickerPageFaqs } from "@/lib/ticker-page/faqs";
import {
  getAllMockTickers,
  getPeerTickers,
  getSectorPath,
  getStockSeo,
} from "@/lib/stocks-data";
import { getArticlesForTicker } from "@/data/articles";
import { breadcrumbsTicker, buildTickerStockPageMetadata } from "@/lib/seo";

type PageProps = { params: { ticker: string } };

export function generateStaticParams() {
  return getAllMockTickers().map((ticker) => ({ ticker }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const symbol = decodeURIComponent(params.ticker).trim().toUpperCase();
  const mock = getStockSeo(symbol);
  return buildTickerStockPageMetadata(symbol, mock);
}

export default async function AcaoPage({ params }: PageProps) {
  const raw = decodeURIComponent(params.ticker).trim();
  if (!raw) {
    notFound();
  }

  const symbol = raw.toUpperCase();
  const mock = getStockSeo(symbol);

  let serverError: string | null = null;
  let initialStock = null;

  try {
    initialStock = await getStockData(raw);
  } catch (e) {
    if (e instanceof BrapiError) {
      serverError = e.message;
    } else {
      serverError = "Não foi possível carregar os dados deste ativo.";
    }
  }

  const displayName =
    mock?.companyName ??
    initialStock?.longName ??
    initialStock?.shortName ??
    "Ação na B3";

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

  const faqItems = buildTickerPageFaqs(symbol, mock, lastSnap, nextSnap, frequencyHint, currency);

  const title = `Dividendos de ${symbol}`;

  return (
    <main className="w-full min-w-0">
      <TickerPageLayout>
        <TickerPageRow>
          <Breadcrumbs items={breadcrumbsTicker(symbol, mock)} />
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
                title={title}
              />
            }
          />
        </TickerPageRow>

        <TickerPageRow>
          <DividendSummaryText text={summaryText} />
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
              extraParagraph={mock.historySummary ? mock.historySummary.slice(0, 400) + (mock.historySummary.length > 400 ? "…" : "") : undefined}
            />
          </TickerPageRow>
        ) : null}

        {mock ? (
          <TickerPageRow>
            <StockPeerLinks sectorSlug={mock.sectorSlug} sectorLabel={mock.sectorLabel} peers={peers} />
          </TickerPageRow>
        ) : null}

        {mock && relatedArticles.length ? (
          <TickerPageRow>
            <RelatedArticlesSection articles={relatedArticles} id="heading-artigos-relacionados" />
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
