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
import { ComparForm } from "@/components/comparar/ComparForm";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
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
      <main className={cn(ui.stackPage, "gap-8")}>
        <h1 className={ui.pageTitle}>
          {tickerA} vs {tickerB}
        </h1>
        <p className={cn(ui.body, "text-[var(--color-danger)]")}>
          Não foi possível carregar dados de {failed}. Verifique se o ticker existe na B3 e tente novamente.
        </p>
        <Link href="/comparar" className={cn(ui.link, "text-sm")}>
          ← Voltar ao comparador
        </Link>
      </main>
    );
  }

  const result = buildComparResult(quoteA.value, quoteB.value, DEFAULT_SHARES);

  return (
    <main className={cn(ui.stackPage, "gap-12")}>
      {/* Header */}
      <section className="flex flex-col gap-3">
        <Link href="/comparar" className="text-sm text-[var(--color-text-soft)] hover:text-[var(--color-text)]">
          ← Comparador
        </Link>
        <h1 className={cn(ui.pageTitle, "text-3xl sm:text-4xl")}>
          {tickerA}{" "}
          <span className="text-[var(--color-text-soft)]">vs</span>{" "}
          {tickerB}
        </h1>
        <p className={cn(ui.body, "max-w-[52ch]")}>
          Comparativo de dividendos — últimos 12 meses, {DEFAULT_SHARES} cotas de referência.
        </p>
      </section>

      {/* Veredicto */}
      <ComparVerdict result={result} />

      {/* Cards lado a lado */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ComparCard
          data={result.a}
          isWinner={result.winner12m === "a"}
          shares={DEFAULT_SHARES}
        />
        <ComparCard
          data={result.b}
          isWinner={result.winner12m === "b"}
          shares={DEFAULT_SHARES}
        />
      </section>

      {/* Nova comparação */}
      <section className={cn("flex flex-col gap-4", ui.divider)}>
        <h2 className={ui.sectionTitle}>Comparar outros ativos</h2>
        <ComparForm />
      </section>

      {/* Links relacionados */}
      <section className="flex flex-col gap-3">
        <h2 className={cn(ui.subsectionTitle, "text-[var(--color-text-muted)]")}>
          Outras comparações com {tickerA} e {tickerB}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {buildPopularPairs()
            .filter(([a, b]) => a === tickerA || b === tickerA || a === tickerB || b === tickerB)
            .filter(([a, b]) => !(a === tickerA && b === tickerB) && !(a === tickerB && b === tickerA))
            .slice(0, 8)
            .map(([a, b]) => (
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
    </main>
  );
}
