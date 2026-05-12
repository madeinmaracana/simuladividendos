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
        <h2 id={id} className="text-[27px] font-medium leading-tight text-white">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
      <Link
        href={ROUTES.artigos ?? "/artigos"}
        className="flex items-center gap-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
      >
        Ver todos
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
      </Link>
    </section>
  );
}
