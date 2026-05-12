import type { Metadata } from "next";
import Link from "next/link";
import { ComparForm } from "@/components/comparar/ComparForm";
import { buildPopularPairs, buildComparSlug } from "@/lib/comparar";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Comparador de dividendos",
  description:
    "Compare dividendos de duas ações da B3 lado a lado. Veja qual pagou mais nos últimos 12 meses, dividend yield estimado e histórico de proventos.",
  canonicalPath: "/comparar",
});

const FEATURED_PAIRS: [string, string][] = [
  ["PETR4", "VALE3"],
  ["ITUB4", "BBAS3"],
  ["BBDC4", "ITUB4"],
  ["EGIE3", "TAEE11"],
  ["WEGE3", "RENT3"],
  ["ABEV3", "PRIO3"],
];

export default function ComparPage() {
  const popularPairs = buildPopularPairs().slice(0, 12);

  return (
    <main className="w-full py-16 lg:py-24">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">Comparador</p>
          <h1 className="max-w-[22ch] text-[53px] font-medium leading-[63px] text-white">
            Compare dividendos de duas ações
          </h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            Escolha dois tickers e veja lado a lado qual pagou mais nos últimos 12 meses,
            o dividend yield estimado e o histórico de proventos.
          </p>
        </header>

        {/* Form */}
        <ComparForm />

        {/* Comparações populares */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[27px] font-medium leading-tight text-white">Comparações populares</h2>
          <div className="flex flex-wrap gap-2">
            {FEATURED_PAIRS.map(([a, b]) => (
              <Link
                key={`${a}-${b}`}
                href={`/comparar/${buildComparSlug(a, b)}`}
                className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
              >
                {a} vs {b}
              </Link>
            ))}
          </div>
        </section>

        {/* Mais comparações */}
        <section className="flex flex-col gap-5">
          <h2 className="text-[27px] font-medium leading-tight text-white">Mais comparações</h2>
          <div className="flex flex-wrap gap-2">
            {popularPairs.map(([a, b]) => (
              <Link
                key={`${a}-${b}`}
                href={`/comparar/${buildComparSlug(a, b)}`}
                className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
              >
                {a} vs {b}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
