import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_STOCKS } from "@/data/stocks";
import { getTickerPath, getSectorPath, getSector, getAllSectorSlugs } from "@/lib/stocks-data";
import { tickerAccentColor } from "@/lib/ticker-colors";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbSchema, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES } from "@/lib/seo/constants";

export const metadata: Metadata = buildPageMetadata({
  title: "Melhores ações de dividendos da B3",
  description:
    "Lista das ações da B3 com maior dividend yield de referência. Compare ações de bancos, energia, mineração e outros setores para montar uma carteira de renda passiva.",
  canonicalPath: "/melhores-acoes-dividendos",
});

const PAGE_TITLE = "Melhores ações de dividendos da B3";
const PAGE_DESCRIPTION =
  "Lista de ações da B3 com maior dividend yield de referência, organizadas por setor. Clique em qualquer ativo para simular sua renda mensal estimada.";

// Sort by dividendYieldPct descending
const STOCKS_BY_YIELD = [...MOCK_STOCKS].sort((a, b) => b.dividendYieldPct - a.dividendYieldPct);

// Group by sector
function groupBySector(stocks: typeof MOCK_STOCKS) {
  const groups: Record<string, typeof MOCK_STOCKS> = {};
  for (const s of stocks) {
    if (!groups[s.sectorSlug]) groups[s.sectorSlug] = [];
    groups[s.sectorSlug]!.push(s);
  }
  // Sort sectors by their best yield
  return Object.entries(groups).sort(
    ([, a], [, b]) => (b[0]?.dividendYieldPct ?? 0) - (a[0]?.dividendYieldPct ?? 0)
  );
}

const SECTORS_WITH_STOCKS = groupBySector(STOCKS_BY_YIELD);

export default function MelhoresAcoesDividendosPage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <JsonLd
        data={[
          buildWebPageSchema({ name: `${PAGE_TITLE} | ${SITE_NAME}`, description: PAGE_DESCRIPTION, path: "/melhores-acoes-dividendos" }),
          buildBreadcrumbSchema(
            [{ label: "Início", href: ROUTES.home }, { label: PAGE_TITLE }],
            "/melhores-acoes-dividendos"
          ),
        ]}
      />
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">Dividendos</p>
          <h1 className="max-w-[26ch] text-[53px] font-medium leading-[63px] text-white">
            {PAGE_TITLE}
          </h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            {PAGE_DESCRIPTION}
          </p>
          <p className="max-w-2xl text-[13px] font-medium text-[#808080]">
            Dividend yield de referência editorial — não é cotação ao vivo. Use o simulador em cada página para calcular com dados atualizados.
          </p>
        </header>

        {/* Top 10 */}
        <section className="flex flex-col gap-5" aria-labelledby="heading-top10">
          <h2 id="heading-top10" className="text-[24px] font-medium leading-tight text-white">
            Top 10 por dividend yield
          </h2>
          <ul className="flex flex-col gap-3">
            {STOCKS_BY_YIELD.slice(0, 10).map((stock, idx) => {
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
                        {stock.companyName}
                      </p>
                    </div>
                    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
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

        {/* Por setor */}
        {SECTORS_WITH_STOCKS.map(([sectorSlug, stocks]) => {
          const sector = getSector(sectorSlug);
          if (!sector) return null;
          return (
            <section key={sectorSlug} className="flex flex-col gap-5" aria-labelledby={`heading-setor-${sectorSlug}`}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={`heading-setor-${sectorSlug}`} className="text-[24px] font-medium leading-tight text-white">
                  {sector.name}
                </h2>
                <Link
                  href={getSectorPath(sectorSlug)}
                  className="shrink-0 text-[13px] font-medium text-[#808080] no-underline transition-opacity hover:opacity-70"
                >
                  Ver setor →
                </Link>
              </div>
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
                        <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
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
          );
        })}

        {/* Por setor */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[24px] font-medium leading-tight text-white">Filtrar por setor</h2>
          <div className="flex flex-wrap gap-2">
            {getAllSectorSlugs().map((slug) => {
              const sector = getSector(slug);
              if (!sector) return null;
              return (
                <Link
                  key={slug}
                  href={`/melhores-acoes/${slug}`}
                  className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
                >
                  {sector.name}
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[24px] font-medium leading-tight text-white">Próximos passos</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculadora-renda-passiva" className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Calculadora de renda passiva
            </Link>
            <Link href="/melhores-fiis" className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Melhores FIIs
            </Link>
            <Link href={ROUTES.artigos} className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Artigos sobre dividendos
            </Link>
            <Link href={ROUTES.comparar} className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Comparar ações
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
