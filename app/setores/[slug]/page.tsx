import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { RelatedArticlesSection } from "@/components/seo/RelatedArticlesSection";
import { Icon } from "@/components/ui/Icon";
import { getArticlesForSector } from "@/data/articles";
import {
  getAllSectorSlugs,
  getSector,
  getStocksInSector,
  getTickerPath,
  isSectorSlug,
} from "@/lib/stocks-data";
import { buildSectorPageMetadata } from "@/lib/seo";
import { tickerAccentColor } from "@/lib/ticker-colors";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getAllSectorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  const sector = isSectorSlug(slug) ? getSector(slug) : null;
  if (!sector) return { title: "Setor não encontrado" };
  return buildSectorPageMetadata(sector);
}

export default function SetorPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug).toLowerCase();
  if (!isSectorSlug(slug)) notFound();

  const sector = getSector(slug);
  if (!sector) notFound();

  const stocks = getStocksInSector(slug);
  const relatedArticles = getArticlesForSector(sector.slug);

  return (
    <main className="w-full py-16 lg:py-24">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#808080]">
            <Icon name={sector.icon} size="xs" className="text-[#808080]" />
            <span>{sector.name}</span>
          </div>
          <h1 className="text-[53px] font-medium leading-[63px] text-white">
            Ações do setor de {sector.name}
          </h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            {sector.intro}
          </p>
        </header>

        {/* Lista de ações */}
        {stocks.length > 0 && (
          <section aria-labelledby="heading-lista-setor" className="flex flex-col gap-5">
            <ul className="flex flex-col gap-3">
              {stocks.map((stock) => {
                const accent = tickerAccentColor(stock.ticker);
                return (
                  <li key={stock.ticker}>
                    <Link
                      href={getTickerPath(stock.ticker)}
                      className="flex items-center gap-4 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4 no-underline transition hover:border-[rgba(120,120,120,0.40)] hover:brightness-110"
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {stock.ticker.slice(0, 2)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-medium text-white">{stock.ticker}</p>
                        <p className="mt-0.5 line-clamp-1 text-[13px] font-medium text-[#808080]">
                          {stock.shortDescription}
                        </p>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                        <span
                          className="material-symbols-outlined leading-none text-black"
                          style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
                        >
                          arrow_forward
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Contexto */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-[27px] font-medium leading-tight text-white">
              Por que esse setor importa para dividendos
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {(Array.isArray(sector.dividendRelevance)
              ? sector.dividendRelevance
              : [sector.dividendRelevance]
            ).map((p, i) => (
              <p key={i} className="text-[13px] font-medium leading-relaxed text-[#808080]">{p}</p>
            ))}
          </div>
        </section>

        {/* Artigos relacionados */}
        {relatedArticles.length > 0 && (
          <RelatedArticlesSection
            articles={relatedArticles}
            id="heading-artigos-setor"
          />
        )}

        {/* FAQ */}
        {sector.faqs.length > 0 && (
          <StockFAQ
            title="Perguntas frequentes sobre o setor"
            items={sector.faqs}
            id="heading-faq-setor"
          />
        )}

        {/* Voltar */}
        <Link
          href="/setores"
          className="flex items-center gap-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
        >
          <span className="material-symbols-outlined leading-none" style={{ fontSize: 16 }}>arrow_back</span>
          Todos os setores
        </Link>

      </div>
    </main>
  );
}
