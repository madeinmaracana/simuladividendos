import type { Metadata } from "next";
import Link from "next/link";
import { getAllSectorSlugs, getSector, getSectorPath } from "@/lib/stocks-data";
import { MOCK_STOCKS } from "@/data/stocks";
import { tickerAccentColor } from "@/lib/ticker-colors";
import { buildPageMetadata, buildWebPageSchema, buildBreadcrumbSchema, SITE_NAME } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ROUTES } from "@/lib/seo/constants";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = buildPageMetadata({
  title: "Melhores ações de dividendos por setor na B3",
  description:
    "Explore as melhores ações pagadoras de dividendos da B3 organizadas por setor: bancos, energia, mineração, petróleo e mais. Compare dividend yield de referência por segmento.",
  canonicalPath: "/melhores-acoes",
});

const PAGE_TITLE = "Melhores ações por setor";

function stocksInSector(sectorSlug: string) {
  return MOCK_STOCKS
    .filter((s) => s.sectorSlug === sectorSlug)
    .sort((a, b) => b.dividendYieldPct - a.dividendYieldPct);
}

export default function MelhoresAcoesIndexPage() {
  const sectorSlugs = getAllSectorSlugs();

  return (
    <main className="w-full py-16 lg:py-24">
      <JsonLd
        data={[
          buildWebPageSchema({ name: `${PAGE_TITLE} | ${SITE_NAME}`, description: "Ações pagadoras de dividendos na B3 agrupadas por setor.", path: "/melhores-acoes" }),
          buildBreadcrumbSchema(
            [{ label: "Início", href: ROUTES.home }, { label: PAGE_TITLE }],
            "/melhores-acoes"
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
            Selecione um setor para ver as ações com maior dividend yield de referência. Clique em qualquer ativo para simular sua renda mensal estimada.
          </p>
        </header>

        {/* Grade de setores */}
        <section className="flex flex-col gap-5" aria-labelledby="heading-setores">
          <h2 id="heading-setores" className="text-[24px] font-medium leading-tight text-white">
            Escolha um setor
          </h2>
          <ul className="flex flex-col gap-3">
            {sectorSlugs.map((slug) => {
              const sector = getSector(slug);
              if (!sector) return null;
              const stocks = stocksInSector(slug);
              if (stocks.length === 0) return null;
              const topYield = stocks[0]?.dividendYieldPct;

              return (
                <li key={slug}>
                  <Link
                    href={`/melhores-acoes/${slug}`}
                    className="flex items-center gap-4 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4 no-underline transition hover:border-[rgba(120,120,120,0.40)] hover:brightness-110"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)]">
                      <Icon name={sector.icon} size="sm" className="text-white" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-medium text-white">{sector.name}</p>
                      <p className="mt-0.5 text-[13px] font-medium text-[#808080]">
                        {stocks.length} {stocks.length === 1 ? "ação" : "ações"} · yield ref. até {topYield?.toFixed(1)}%
                      </p>
                    </div>
                    {/* Top 3 tickers preview */}
                    <div className="hidden items-center gap-1 sm:flex">
                      {stocks.slice(0, 3).map((s) => (
                        <span
                          key={s.ticker}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: tickerAccentColor(s.ticker) }}
                        >
                          {s.ticker.slice(0, 2)}
                        </span>
                      ))}
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

        {/* Links relacionados */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[24px] font-medium leading-tight text-white">Ver também</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/melhores-acoes-dividendos" className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Top 10 por dividend yield
            </Link>
            <Link href={ROUTES.fiis} className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Melhores FIIs
            </Link>
            <Link href="/calculadora-renda-passiva" className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70">
              Calculadora de renda passiva
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
