import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  parseComparSlug,
  buildComparSlug,
  buildComparResult,
  buildPopularPairs,
} from "@/lib/comparar";
import { getStockData } from "@/lib/brapi";
import { buildPageMetadata } from "@/lib/seo";
import { ComparCard } from "@/components/comparar/ComparCard";
import { ComparVerdict } from "@/components/comparar/ComparVerdict";
import { ComparHero } from "@/components/comparar/ComparHero";
import { ComparPill } from "@/components/comparar/ComparPill";
import Link from "next/link";

// Geração estática dos pares populares
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

  // Busca paralela das duas cotações
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
      <main className="flex w-full flex-col">
        <ComparHero />
        <div className="w-full bg-[#F3F4F6]">
          <div className="mx-auto max-w-[var(--page-max)] px-[var(--page-gutter)] py-12">
            <p className="text-[13px] font-medium text-red-500">
              Não foi possível carregar dados de {failed}. Verifique se o ticker existe na B3 e tente novamente.
            </p>
            <Link href="/comparar" className="mt-4 inline-flex text-[13px] font-medium text-[#111827] underline">
              ← Voltar ao comparador
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const result = buildComparResult(quoteA.value, quoteB.value, DEFAULT_SHARES);
  const relatedPairs = buildPopularPairs()
    .filter(([a, b]) => a === tickerA || b === tickerA || a === tickerB || b === tickerB)
    .filter(([a, b]) => !(a === tickerA && b === tickerB) && !(a === tickerB && b === tickerA))
    .slice(0, 8);

  return (
    <main className="flex w-full flex-col">

      {/* ── Dark hero com formulário de nova comparação ── */}
      <ComparHero />

      {/* ── Seções de resultado — fundo claro ── */}
      <div className="w-full bg-[#F3F4F6]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)] py-12 lg:py-16">

          {/* Veredicto */}
          <ComparVerdict result={result} />

          {/* Cards lado a lado */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ComparCard data={result.a} shares={DEFAULT_SHARES} />
            <ComparCard data={result.b} shares={DEFAULT_SHARES} />
          </section>

          {/* Outras comparações */}
          {relatedPairs.length > 0 && (
            <section className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-[27px] font-medium leading-tight text-[#111827]">
                  Outras comparações
                </h2>
                <p className="text-[13px] font-medium text-[#6B7280]">
                  Com {tickerA} e {tickerB}
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {relatedPairs.map(([a, b]) => (
                  <li key={`${a}-${b}`}>
                    <ComparPill
                      tickerA={a}
                      tickerB={b}
                      href={`/comparar/${buildComparSlug(a, b)}`}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}

        </div>
      </div>
    </main>
  );
}
