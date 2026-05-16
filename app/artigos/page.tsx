import type { Metadata } from "next";
import { SiteNav } from "@/components/lab/SiteNav";
import { SiteFooter } from "@/components/lab/SiteFooter";
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
    description:
      "Guias e explicações educativas sobre dividendos, dividend yield e renda passiva.",
    url: `${getSeoBaseUrl()}/artigos`,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artigos sobre dividendos e renda passiva | Simula Dividendos",
    description:
      "Guias e explicações educativas sobre dividendos, dividend yield e renda passiva.",
  },
};

/* ── page ─────────────────────────────────────────────── */

export default function ArtigosIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--c-bg)]">
      <div
        className="mx-auto w-full max-w-[969px] px-4 pt-8 flex flex-col"
        style={{ gap: 80, paddingBottom: 320 }}
      >
        {/* Nav */}
        <header style={{ display: "contents" }}>
          <SiteNav />
        </header>

        <main style={{ display: "contents" }}>

          {/* Hero */}
          <div className="flex flex-col w-full" style={{ gap: 16 }}>
            <h1
              className="text-[28px] sm:text-[40px] lg:text-[52px]"
              style={{
                margin: 0,
                fontWeight: 400,
                color: "var(--c-text)",
                lineHeight: "normal",
                letterSpacing: "-1.04px",
              }}
            >
              Artigos
            </h1>
            <p
              className="text-[16px] sm:text-[20px] lg:text-[24px]"
              style={{
                margin: 0,
                fontWeight: 300,
                color: "var(--c-muted)",
                lineHeight: "normal",
                letterSpacing: "-0.48px",
              }}
            >
              Conteúdo educativo para interpretar dividend yield, entender renda
              passiva e usar o simulador com mais contexto.
            </p>
          </div>

          {/* Grid de artigos — 3 colunas desktop, 2 tablet, 1 mobile */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ columnGap: 16, rowGap: 40 }}
          >
            {ALL_ARTICLES.map((article) => (
              <ArticleCard key={article.slug} article={article} theme="light" />
            ))}
          </div>

        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
