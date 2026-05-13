import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllSectorSlugs, getSector, getSectorPath, isSectorSlug, getTickerPath } from "@/lib/stocks-data";
import { MOCK_STOCKS } from "@/data/stocks";
import { tickerAccentColor } from "@/lib/ticker-colors";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbSchema, buildFaqPageSchema, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES } from "@/lib/seo/constants";

type PageProps = { params: { setor: string } };

export function generateStaticParams() {
  return getAllSectorSlugs().map((slug) => ({ setor: slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slug = decodeURIComponent(params.setor).toLowerCase();
  if (!isSectorSlug(slug)) return { title: "Setor não encontrado" };
  const sector = getSector(slug);
  if (!sector) return { title: "Setor não encontrado" };

  return buildPageMetadata({
    title: `Melhores ações de ${sector.name} para dividendos na B3`,
    description: `As ações do setor de ${sector.name} com maior dividend yield de referência na B3. Compare proventos, frequência de pagamento e simule sua renda passiva.`,
    canonicalPath: `/melhores-acoes/${slug}`,
  });
}

export default function MelhoresAcoesPorSetorPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.setor).toLowerCase();
  if (!isSectorSlug(slug)) notFound();

  const sector = getSector(slug);
  if (!sector) notFound();

  const stocks = MOCK_STOCKS
    .filter((s) => s.sectorSlug === slug)
    .sort((a, b) => b.dividendYieldPct - a.dividendYieldPct);

  if (stocks.length === 0) notFound();

  const path = `/melhores-acoes/${slug}`;
  const title = `Melhores ações de ${sector.name} para dividendos`;

  return (
    <main className="w-full py-16 lg:py-24">
      <JsonLd
        data={[
          buildWebPageSchema({ name: `${title} | ${SITE_NAME}`, description: `Ações de ${sector.name} com maior dividend yield de referência na B3.`, path }),
          buildBreadcrumbSchema(
            [
              { label: "Início", href: ROUTES.home },
              { label: "Ações por setor", href: "/melhores-acoes" },
              { label: sector.name, href: getSectorPath(slug) },
              { label: "Dividendos" },
            ],
            path
          ),
          ...(sector.faqs.length > 0 ? [buildFaqPageSchema(sector.faqs.slice(0, 6))] : []),
        ]}
      />
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">{sector.name}</p>
          <h1 className="max-w-[28ch] text-[53px] font-medium leading-[63px] text-white">
            {title}
          </h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            {Array.isArray(sector.dividendRelevance)
              ? sector.dividendRelevance[0]
              : sector.dividendRelevance}
          </p>
        </header>

        {/* Lista ordenada por yield */}
        <section className="flex flex-col gap-5" aria-labelledby="heading-lista">
          <h2 id="heading-lista" className="text-[27px] font-medium leading-tight text-white">
            Ações por dividend yield de referência
          </h2>
          <ul className="flex flex-col gap-3">
            {stocks.map((stock, idx) => {
              const accent = tickerAccentColor(stock.ticker);
              return (
                <li key={stock.ticker}>
                  <Link
                    href={getTickerPath(stock.ticker)}
                    className="flex items-center gap-4 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4 no-underline transition hover:border-[rgba(120,120,120,0.40)] hover:brightness-110"
                  >
                    <span className="w-6 shrink-0 text-center text-[13px] font-medium tabular-nums text-[#808080]">
                      {idx + 1}
                    </span>
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
                    <span className="shrink-0 rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-3 py-1 text-[13px] font-semibold tabular-nums text-white">
                      {stock.dividendYieldPct.toFixed(1)}%
                    </span>
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

        {/* Contexto do setor */}
        {Array.isArray(sector.dividendRelevance) && sector.dividendRelevance.length > 1 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-[27px] font-medium leading-tight text-white">
              Por que {sector.name} para dividendos
            </h2>
            <div className="flex flex-col gap-3">
              {sector.dividendRelevance.slice(1).map((p, i) => (
                <p key={i} className="text-[13px] font-medium leading-relaxed text-[#808080]">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[27px] font-medium leading-tight text-white">Ver também</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={getSectorPath(slug)}
              className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
            >
              Setor {sector.name} completo
            </Link>
            <Link
              href="/melhores-acoes"
              className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
            >
              Outros setores
            </Link>
            <Link
              href="/melhores-acoes-dividendos"
              className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
            >
              Top 10 geral
            </Link>
            <Link
              href="/calculadora-renda-passiva"
              className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
            >
              Calculadora de renda passiva
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
