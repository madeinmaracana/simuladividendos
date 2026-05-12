import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  parseComparSlug,
  buildComparSlug,
  buildComparResult,
  buildPopularPairs,
} from "@/lib/comparar";
import { getStockData } from "@/lib/brapi";
import { buildPageMetadata } from "@/lib/seo";
import { ComparCard } from "@/components/comparar/ComparCard";
import { ComparForm } from "@/components/comparar/ComparForm";

export function generateStaticParams() {
  return buildPopularPairs().map(([a, b]) => ({
    slug: buildComparSlug(a, b),
  }));
}

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tickers = parseComparSlug(params.slug);
  if (!tickers) return { title: "Comparador de dividendos" };
  const [a, b] = tickers;
  return buildPageMetadata({
    title: `${a} vs ${b}: comparativo de dividendos`,
    description: `Compare os dividendos de ${a} e ${b} lado a lado. Veja qual pagou mais nos últimos 12 meses, dividend yield estimado e histórico de proventos na B3.`,
    canonicalPath: `/comparar/${buildComparSlug(a, b)}`,
    keywords: [
      `${a} vs ${b}`,
      `comparar dividendos ${a} ${b}`,
      `${a} ou ${b} dividendos`,
      `dividend yield ${a} ${b}`,
    ],
  });
}

const DEFAULT_SHARES = 100;

export default async function ComparSlugPage({ params }: Props) {
  const tickers = parseComparSlug(params.slug);
  if (!tickers) notFound();

  const [tickerA, tickerB] = tickers;

  const [quoteA, quoteB] = await Promise.allSettled([
    getStockData(tickerA),
    getStockData(tickerB),
  ]);

  if (quoteA.status === "rejected" || quoteB.status === "rejected") {
    const failed = [
      quoteA.status === "rejected" ? tickerA : null,
      quoteB.status === "rejected" ? tickerB : null,
    ]
      .filter(Boolean)
      .join(" e ");
    return (
      <main className="w-full py-16 lg:py-24">
        <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-8 px-[var(--page-gutter)]">
          <h1 className="text-[53px] font-medium leading-[63px] text-white">
            {tickerA} vs {tickerB}
          </h1>
          <p className="text-[13px] font-medium text-red-400">
            Não foi possível carregar dados de {failed}. Verifique se o ticker existe na B3 e tente novamente.
          </p>
          <Link
            href="/comparar"
            className="flex items-center gap-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
          >
            <span className="material-symbols-outlined leading-none" style={{ fontSize: 16 }}>arrow_back</span>
            Voltar ao comparador
          </Link>
        </div>
      </main>
    );
  }

  const result = buildComparResult(quoteA.value, quoteB.value, DEFAULT_SHARES);
  const { a, b } = result;

  return (
    <main className="w-full py-16 lg:py-24">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">Comparador</p>
          <h1 className="text-[53px] font-medium leading-[63px] text-white">
            {tickerA}{" "}
            <span className="text-[#808080]">vs</span>{" "}
            {tickerB}
          </h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            Comparativo de dividendos — últimos 12 meses, {DEFAULT_SHARES} cotas de referência.
          </p>
        </header>

        {/* Cards lado a lado */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Detalhes da comparação">
          <ComparCard data={a} shares={DEFAULT_SHARES} />
          <ComparCard data={b} shares={DEFAULT_SHARES} />
        </section>

        {/* Nova comparação */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[27px] font-medium leading-tight text-white">Comparar outros ativos</h2>
          <ComparForm />
        </section>

        {/* Links relacionados */}
        {(() => {
          const related = buildPopularPairs()
            .filter(([pa, pb]) => pa === tickerA || pb === tickerA || pa === tickerB || pb === tickerB)
            .filter(([pa, pb]) => !(pa === tickerA && pb === tickerB) && !(pa === tickerB && pb === tickerA))
            .slice(0, 8);

          if (related.length === 0) return null;
          return (
            <section className="flex flex-col gap-5">
              <h2 className="text-[27px] font-medium leading-tight text-white">
                Outras comparações com {tickerA} e {tickerB}
              </h2>
              <div className="flex flex-wrap gap-2">
                {related.map(([pa, pb]) => (
                  <Link
                    key={`${pa}-${pb}`}
                    href={`/comparar/${buildComparSlug(pa, pb)}`}
                    className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
                  >
                    {pa} vs {pb}
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Voltar */}
        <Link
          href="/comparar"
          className="flex items-center gap-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
        >
          <span className="material-symbols-outlined leading-none" style={{ fontSize: 16 }}>arrow_back</span>
          Todos os comparativos
        </Link>

      </div>
    </main>
  );
}
