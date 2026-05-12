import type { Metadata } from "next";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ALL_ARTICLES } from "@/data/articles";
import { getSeoBaseUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artigos sobre dividendos e renda passiva | Simula Dividendos",
  description:
    "Guias e explicações educativas sobre dividendos, dividend yield, renda passiva e como planejar suas estimativas com o Simula Dividendos.",
  alternates: { canonical: "/artigos" },
  openGraph: {
    title: "Artigos sobre dividendos e renda passiva | Simula Dividendos",
    description: "Guias e explicações educativas sobre dividendos, dividend yield e renda passiva.",
    url: `${getSeoBaseUrl()}/artigos`,
    locale: "pt_BR",
    type: "website",
  },
};

export default function ArtigosIndexPage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">Conteúdo</p>
          <h1 className="text-[53px] font-medium leading-[63px] text-white">Artigos</h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            Conteúdo educativo para interpretar dividend yield, entender renda passiva e usar o simulador com mais contexto.
          </p>
        </header>

        {/* Grid */}
        <section aria-label="Lista de artigos" className="grid gap-3 sm:grid-cols-2">
          {ALL_ARTICLES.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </section>

      </div>
    </main>
  );
}
