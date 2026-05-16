import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { SiteNav } from "@/components/lab/SiteNav";
import { SiteFooter } from "@/components/lab/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllArticleSlugs, getArticleBySlug } from "@/data/articles";
import { buildArticlePageMetadata, buildArticleSchemaFromPath } from "@/lib/seo";

type PageProps = { params: { slug: string } };

/** Slugs antigos redirecionam para a versão principal. */
const ARTICLE_REDIRECTS: Record<string, string> = {
  "quanto-investir-para-receber-1000-por-mes":
    "quanto-investir-para-receber-1000-reais-por-mes",
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

/* ── page ─────────────────────────────────────────────── */

export default function ArtigoPage({ params }: PageProps) {
  const slugRaw = decodeURIComponent(params.slug).trim().toLowerCase();
  const redirected = ARTICLE_REDIRECTS[slugRaw];
  if (redirected) redirect(`/artigos/${encodeURIComponent(redirected)}`);

  const article = getArticleBySlug(slugRaw);
  if (!article) notFound();

  const path = `/artigos/${encodeURIComponent(article.slug)}`;
  const articleSchema = buildArticleSchemaFromPath(article, path);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--c-bg)]">
      <JsonLd data={articleSchema} />

      <div
        className="mx-auto w-full max-w-[969px] px-4 pt-8 flex flex-col"
        style={{ gap: 80, paddingBottom: 320 }}
      >
        {/* Nav */}
        <header style={{ display: "contents" }}>
          <SiteNav />
        </header>

        <main style={{ display: "contents" }}>

          {/* Conteúdo do artigo */}
          <div className="flex flex-col w-full" style={{ gap: 40 }}>

            {/* Breadcrumb + H1 */}
            <div className="flex flex-col" style={{ gap: 16 }}>
              <Link
                href="/artigos"
                className="no-underline hover:opacity-60 transition-opacity"
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: "var(--c-muted)",
                  lineHeight: "normal",
                }}
              >
                Artigos
              </Link>
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
                {article.title}
              </h1>
            </div>

            {/* Descrição / intro */}
            {article.description && (
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
                {article.description}
              </p>
            )}

            {/* Imagem de capa */}
            {article.coverImage && (
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: 16,
                  background: `url(${article.coverImage}) center/cover no-repeat`,
                  flexShrink: 0,
                }}
              />
            )}

            {/* Seções */}
            {article.sections.map((section, i) => (
              <div key={i} className="flex flex-col" style={{ gap: 16 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 32,
                    fontWeight: 500,
                    color: "var(--c-text)",
                    lineHeight: "normal",
                    letterSpacing: "-0.64px",
                  }}
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-[16px] sm:text-[20px] lg:text-[24px]"
                    style={{
                      margin: 0,
                      fontWeight: 300,
                      color: "var(--c-text)",
                      lineHeight: "normal",
                      letterSpacing: "-0.48px",
                    }}
                  >
                    {p}
                  </p>
                ))}
                {section.subsections?.map((sub) => (
                  <div key={sub.heading} className="flex flex-col" style={{ gap: 12 }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 24,
                        fontWeight: 500,
                        color: "var(--c-text)",
                        lineHeight: "normal",
                      }}
                    >
                      {sub.heading}
                    </h3>
                    {sub.paragraphs.map((p, k) => (
                      <p
                        key={k}
                        className="text-[16px] sm:text-[20px] lg:text-[24px]"
                        style={{
                          margin: 0,
                          fontWeight: 300,
                          color: "var(--c-text)",
                          lineHeight: "normal",
                          letterSpacing: "-0.48px",
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}

          </div>

        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
