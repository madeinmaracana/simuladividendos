import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ComparHero } from "@/components/comparar/ComparHero";
import { buildPopularPairs, buildComparSlug } from "@/lib/comparar";
import Link from "next/link";

export const metadata: Metadata = buildPageMetadata({
  title: "Comparador de dividendos",
  description:
    "Compare dividendos de duas ações da B3 lado a lado. Veja qual pagou mais nos últimos 12 meses, dividend yield estimado e histórico de proventos.",
  canonicalPath: "/comparar",
});

const FEATURED_PAIRS = [
  ["PETR4", "VALE3"],
  ["ITUB4", "BBAS3"],
  ["BBDC4", "ITUB4"],
  ["EGIE3", "TAEE11"],
  ["WEGE3", "RENT3"],
  ["ABEV3", "PRIO3"],
] as const;

export default function ComparPage() {
  const popularPairs = buildPopularPairs().slice(0, 12);

  return (
    <main className="flex w-full flex-col">

      {/* ── Dark hero com formulário ── */}
      <ComparHero />

      {/* ── Seções com fundo claro ── */}
      <div className="w-full bg-[#F3F4F6]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)] py-12 lg:py-16">

          {/* Comparações em destaque */}
          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[27px] font-medium leading-tight text-[#111827]">
                Comparações populares
              </h2>
              <p className="text-[13px] font-medium text-[#6B7280]">
                Pares mais consultados no comparador
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {FEATURED_PAIRS.map(([a, b]) => (
                <li key={`${a}-${b}`}>
                  <Link
                    href={`/comparar/${buildComparSlug(a, b)}`}
                    className="inline-flex items-center rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-4 py-2 text-sm font-semibold text-[#111827] no-underline transition hover:border-[rgba(0,0,0,0.15)] hover:shadow-sm"
                  >
                    {a} vs {b}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Mais comparações */}
          <section className="flex flex-col gap-5">
            <h2 className="text-[27px] font-medium leading-tight text-[#111827]">
              Mais comparações
            </h2>
            <ul className="flex flex-wrap gap-2">
              {popularPairs.map(([a, b]) => (
                <li key={`${a}-${b}`}>
                  <Link
                    href={`/comparar/${buildComparSlug(a, b)}`}
                    className="inline-flex items-center rounded-full border border-dashed border-[rgba(0,0,0,0.12)] bg-white/60 px-4 py-2 text-sm font-medium text-[#6B7280] no-underline transition hover:border-[rgba(0,0,0,0.20)] hover:text-[#111827]"
                  >
                    {a} vs {b}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
