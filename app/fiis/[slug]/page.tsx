import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProgrammaticTickerInterlinking } from "@/components/seo/ProgrammaticTickerInterlinking";
import { RelatedArticlesSection } from "@/components/seo/RelatedArticlesSection";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { TickerPageLayout, TickerPageRow } from "@/components/layout/TickerPageLayout";
import {
  FiiInternalNav,
  RelatedFiiLinks,
  FiiQuickAnswer,
} from "@/components/fii";
import { TickerHeroSimulatorCard } from "@/components/ticker";
import {
  CompanyInfoSection,
  DividendHistoryChart,
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
import { fiiPathFromSlug, fiiVariantShares, fiiVariantSlug, parseFiiSlug } from "@/lib/fiis/fii-slug";
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
    <main className="w-full min-w-0 py-16 lg:py-24">
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
        {/* ── Hero: texto (esquerda) + simulador (direita) ── */}
        <TickerPageRow>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-x-8">
            {/* Esquerda — copy */}
            <div className="flex flex-col gap-8 lg:col-span-7">
              {/* Logo + ticker + badge */}
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
                <span className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-2.5 py-0.5 text-[13px] font-medium text-[#808080]">
                  Fundo imobiliário
                </span>
              </div>
              <h1 className="text-[53px] font-medium leading-[63px] text-white">
                {heroTitle}
              </h1>
              <div className="flex flex-col gap-3">
                <p className="text-[13px] font-medium leading-relaxed text-[#808080]">{introText}</p>
                <SearchIntentTeaser
                  symbol={symbol}
                  currency={currency}
                  dividends={dividends}
                  simulationShares={variantShares ?? 100}
                  assetKind="fii"
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
              />
            </div>
          </div>
        </TickerPageRow>

        <TickerPageRow>
          <DividendSummaryText id="heading-resumo-fii" text={summaryText} />
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
          <ProgrammaticTickerInterlinking
            vejaTambem={buildFiiVejaTambemLinks(symbol, slug)}
            outrosAtivos={buildFiiRelacionadosLinks(peers, symbol)}
          />
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
          <section className="flex flex-col gap-3">
            <p className="text-[13px] font-medium text-[#808080]">{`Veja também sobre ${symbol}:`}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-2">
              <a href={fiiPathFromSlug(fiiVariantSlug(symbol, "paga-quanto"))} className="text-[13px] font-medium text-white underline-offset-2 hover:underline">
                Dividendos por cota
              </a>
              <a href={fiiPathFromSlug(fiiVariantSlug(symbol, "quanto-rende-100-cotas"))} className="text-[13px] font-medium text-white underline-offset-2 hover:underline">
                Quanto rende 100 cotas
              </a>
              <a href={fiiPathFromSlug(fiiVariantSlug(symbol, "simulador-de-dividendos"))} className="text-[13px] font-medium text-white underline-offset-2 hover:underline">
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
