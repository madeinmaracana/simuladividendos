import type { Metadata } from "next";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TextLink } from "@/components/ui/TextLink";
import { ALL_ARTICLES } from "@/data/articles";
import { getSeoBaseUrl } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

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
    <main className={ui.stackPage}>
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Artigos", href: undefined },
        ]}
      />

      <header className={cn(ui.divider, "flex flex-col gap-3")}>
        <p className={ui.eyebrow}>Conteúdo</p>
        <h1 className={cn("text-left", ui.pageTitle)}>Artigos</h1>
        <p className={cn(ui.body, "max-w-2xl")}>
          Conteúdo educativo para interpretar dividend yield, entender renda passiva e usar o simulador com mais
          contexto.
        </p>
      </header>

      <section aria-label="Lista de artigos" className="grid gap-4 sm:grid-cols-2">
        {ALL_ARTICLES.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </section>

      <p className={ui.body}>
        Quer colocar a teoria em prática? <TextLink href="/simulador">Use o simulador →</TextLink>
      </p>
    </main>
  );
}
