import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ArticleContent } from "@/components/articles/ArticleContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllArticleSlugs, getArticleBySlug } from "@/data/articles";
import { getFiiPath } from "@/data/fiis";
import { getSectorPath, getTickerPath } from "@/lib/stocks-data";
import { getSector } from "@/data/stocks";
import { ROUTES } from "@/lib/seo/constants";
import { breadcrumbsArticle, buildArticlePageMetadata, buildArticleSchemaFromPath } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";


type PageProps = { params: { slug: string } };

/** Consolidação de intenção: slugs antigos redirecionam para a versão principal. */
const ARTICLE_REDIRECTS: Record<string, string> = {
  "quanto-investir-para-receber-1000-por-mes": "quanto-investir-para-receber-1000-reais-por-mes",
};

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const slugRaw = decodeURIComponent(params.slug).trim().toLowerCase();
  const slug = ARTICLE_REDIRECTS[slugRaw] ?? slugRaw;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };
  return buildArticlePageMetadata(article);
}

export default function ArtigoPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug).trim().toLowerCase();
  const redirected = ARTICLE_REDIRECTS[slug];
  if (redirected) {
    redirect(`/artigos/${encodeURIComponent(redirected)}`);
  }
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const path = `/artigos/${encodeURIComponent(article.slug)}`;
  const articleSchema = buildArticleSchemaFromPath(article, path);

  return (
    <main className="flex w-full flex-col">
      <SiteHeader title={article.title} description={article.description} />
      <Breadcrumbs items={breadcrumbsArticle(article)} />

      <JsonLd data={articleSchema} />

      <div className="w-full bg-[#F3F4F6]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-16 px-[var(--page-gutter)] py-16 lg:py-24">

          {article.quickAnswer ? (
            <QuickAnswer>
              <p>{article.quickAnswer}</p>
            </QuickAnswer>
          ) : null}

          <ArticleContent sections={article.sections} />

          <section aria-labelledby="heading-faq-artigo">
            <StockFAQ
              title="Perguntas frequentes"
              items={article.faqs}
              id="heading-faq-artigo"
            />
          </section>

          <section aria-labelledby="heading-relacionados">
            <Card>
              <SectionHeading
                id="heading-relacionados"
                title="Próximos passos"
                description="Simulador, páginas de ativos, setores e leituras relacionadas."
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/simulador" className={cn(ui.ctaSecondary, "no-underline")}>
                  Abrir o simulador →
                </Link>
                <Link href={ROUTES.artigos} className={cn(ui.pillGhost, "no-underline")}>
                  Todos os artigos →
                </Link>
                {(article.relatedArticleSlugs ?? []).map((s) => {
                  const rel = getArticleBySlug(s);
                  if (!rel) return null;
                  return (
                    <Link key={s} href={ROUTES.artigo(s)} className={cn(ui.pillGhost, "no-underline")}>
                      {rel.title}
                    </Link>
                  );
                })}
                {article.relatedTickers.slice(0, 6).map((t) => (
                  <Link key={t} href={getTickerPath(t)} className={cn(ui.pill, "no-underline")}>
                    {t}
                  </Link>
                ))}
                {(article.relatedFiis ?? []).slice(0, 6).map((t) => (
                  <Link key={t} href={getFiiPath(t)} className={cn(ui.pill, "no-underline")}>
                    {t}
                  </Link>
                ))}
                {article.relatedSectors.slice(0, 4).map((s) => (
                  <Link key={s} href={getSectorPath(s)} className={cn(ui.pillNeutral, "no-underline")}>
                    {getSector(s)?.name ?? s}
                  </Link>
                ))}
              </div>
            </Card>
          </section>

        </div>
      </div>
    </main>
  );
}
