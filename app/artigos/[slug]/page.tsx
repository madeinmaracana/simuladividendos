import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { StockFAQ } from "@/components/stocks/StockFAQ";
import { getAllArticleSlugs, getArticleBySlug } from "@/data/articles";
import { getFiiPath } from "@/data/fiis";
import { getSectorPath, getTickerPath } from "@/lib/stocks-data";
import { getSector } from "@/data/stocks";
import { ROUTES } from "@/lib/seo/constants";
import { buildArticlePageMetadata, buildArticleSchemaFromPath } from "@/lib/seo";
import type { ArticleSection } from "@/data/articles";

type PageProps = { params: { slug: string } };

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

function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="flex flex-col gap-12">
      {sections.map((section) => (
        <section key={section.heading} aria-label={section.heading} className="flex flex-col gap-4">
          <h2 className="text-[27px] font-medium leading-tight text-white">{section.heading}</h2>
          <div className="flex flex-col gap-4">
            {section.paragraphs.map((p, idx) => (
              <p key={`${section.heading}-${idx}`} className="font-serif text-[15px] italic leading-relaxed text-white/80">
                {p}
              </p>
            ))}
          </div>
          {section.subsections?.map((sub) => (
            <div key={sub.heading} className="flex flex-col gap-3">
              <h3 className="text-[21px] font-medium text-white">{sub.heading}</h3>
              {sub.paragraphs.map((p, idx) => (
                <p key={`${sub.heading}-${idx}`} className="font-serif text-[15px] italic leading-relaxed text-white/80">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

export default function ArtigoPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug).trim().toLowerCase();
  const redirected = ARTICLE_REDIRECTS[slug];
  if (redirected) redirect(`/artigos/${encodeURIComponent(redirected)}`);

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const path = `/artigos/${encodeURIComponent(article.slug)}`;
  const articleSchema = buildArticleSchemaFromPath(article, path);

  return (
    <main className="w-full py-16 lg:py-24">
      <JsonLd data={articleSchema} />
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">Conteúdo</p>
          <h1 className="text-[53px] font-medium leading-[63px] text-white">{article.title}</h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            {article.description}
          </p>
        </header>

        {/* Corpo do artigo */}
        <ArticleBody sections={article.sections} />

        {/* FAQ */}
        {article.faqs.length > 0 && (
          <StockFAQ
            title="Perguntas frequentes"
            items={article.faqs}
            id="heading-faq-artigo"
          />
        )}

        {/* Próximos passos */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-[27px] font-medium leading-tight text-white">Próximos passos</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(article.relatedArticleSlugs ?? []).map((s) => {
              const rel = getArticleBySlug(s);
              if (!rel) return null;
              return (
                <Link
                  key={s}
                  href={ROUTES.artigo(s)}
                  className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
                >
                  {rel.title}
                </Link>
              );
            })}
            {article.relatedTickers.slice(0, 6).map((t) => (
              <Link
                key={t}
                href={getTickerPath(t)}
                className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
              >
                {t}
              </Link>
            ))}
            {(article.relatedFiis ?? []).slice(0, 6).map((t) => (
              <Link
                key={t}
                href={getFiiPath(t)}
                className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
              >
                {t}
              </Link>
            ))}
            {article.relatedSectors.slice(0, 4).map((s) => (
              <Link
                key={s}
                href={getSectorPath(s)}
                className="rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
              >
                {getSector(s)?.name ?? s}
              </Link>
            ))}
            <Link
              href={ROUTES.artigos}
              className="flex items-center gap-2 rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
            >
              Todos os artigos
              <span className="material-symbols-outlined leading-none" style={{ fontSize: 14 }}>arrow_forward</span>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
