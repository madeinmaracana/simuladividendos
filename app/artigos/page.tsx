import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ALL_ARTICLES } from "@/data/articles";
import { getSeoBaseUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Artigos sobre dividendos e renda passiva | SimulaDividendos",
  description:
    "Guias e explicações educativas sobre dividendos, dividend yield, renda passiva e como planejar suas estimativas com o Simula Dividendos.",
  alternates: { canonical: "/artigos" },
  openGraph: {
    title: "Artigos sobre dividendos e renda passiva | SimulaDividendos",
    description:
      "Guias e explicações educativas sobre dividendos, dividend yield e renda passiva.",
    url: `${getSeoBaseUrl()}/artigos`,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artigos sobre dividendos e renda passiva | SimulaDividendos",
    description:
      "Guias e explicações educativas sobre dividendos, dividend yield e renda passiva.",
  },
};

export default function ArtigosIndexPage() {
  return (
    <main className="flex flex-col gap-0">
      <SiteHeader
        title="Artigos"
        description="Conteúdo educativo para interpretar dividend yield, entender renda passiva e usar o simulador com mais contexto."
      />
      <div className="w-full bg-[#F3F4F6]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-[60px] px-[var(--page-gutter)] py-16 lg:py-24">

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[24px] font-medium leading-tight text-[#111827]">Todos os artigos</h2>
              <p className="text-[16px] font-normal text-[#808080]">
                Conteúdo educativo sobre dividendos e renda passiva
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ALL_ARTICLES.map((article) => (
                <ArticleCard key={article.slug} article={article} theme="light" />
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
