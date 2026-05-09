import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { ComparForm } from "@/components/comparar/ComparForm";
import { buildPopularPairs, buildComparSlug } from "@/lib/comparar";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
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
    <main className={cn(ui.stackPage, "gap-12")}>
      {/* Hero */}
      <section className="flex flex-col gap-4">
        <p className={ui.eyebrow}>Comparador</p>
        <h1 className={cn(ui.pageTitle, "max-w-[22ch]")}>
          Compare dividendos de duas ações
        </h1>
        <p className={cn(ui.body, "max-w-[52ch]")}>
          Escolha dois tickers e veja lado a lado qual pagou mais nos últimos
          12 meses, o dividend yield estimado e o histórico de proventos.
        </p>
      </section>

      {/* Form */}
      <ComparForm />

      {/* Pares em destaque */}
      <section className="flex flex-col gap-4">
        <h2 className={ui.sectionTitle}>Comparações populares</h2>
        <ul className="flex flex-wrap gap-2">
          {FEATURED_PAIRS.map(([a, b]) => (
            <li key={`${a}-${b}`}>
              <Link
                href={`/comparar/${buildComparSlug(a, b)}`}
                className={cn(ui.pill, "no-underline")}
              >
                {a} vs {b}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Todos os pares populares */}
      <section className="flex flex-col gap-4">
        <h2 className={ui.sectionTitle}>Mais comparações</h2>
        <ul className="flex flex-wrap gap-2">
          {popularPairs.map(([a, b]) => (
            <li key={`${a}-${b}`}>
              <Link
                href={`/comparar/${buildComparSlug(a, b)}`}
                className={cn(ui.pillGhost, "no-underline")}
              >
                {a} vs {b}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
