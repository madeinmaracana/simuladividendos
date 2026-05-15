import Link from "next/link";
import { ArticleCard } from "@/components/articles/ArticleCard";
import type { ArticleRecord } from "@/data/articles";
import { ROUTES } from "@/lib/seo/constants";

type RelatedArticlesSectionProps = {
  articles: ArticleRecord[];
  id?: string;
  title?: string;
  max?: number;
  showSimuladorCta?: boolean;
};

export function RelatedArticlesSection({
  articles,
  id = "heading-artigos-relacionados",
  title = "Artigos relacionados",
  max = 4,
  showSimuladorCta: _showSimuladorCta,
}: RelatedArticlesSectionProps) {
  if (!articles.length) return null;

  const list = articles.slice(0, max);

  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-[24px] font-medium leading-tight text-[#111827]">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((a) => (
          <ArticleCard key={a.slug} article={a} theme="light" />
        ))}
      </div>
      <Link
        href={ROUTES.artigos ?? "/artigos"}
        className="flex items-center gap-1.5 text-[16px] font-normal text-[#111827] no-underline transition-opacity hover:opacity-60"
      >
        Ver todos
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
      </Link>
    </section>
  );
}
