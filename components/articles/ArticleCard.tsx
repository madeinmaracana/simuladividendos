import Link from "next/link";
import type { ArticleRecord } from "@/data/articles";

type ArticleCardProps = {
  article: ArticleRecord;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="flex">
      <Link
        href={`/artigos/${article.slug}`}
        className="flex flex-1 flex-col justify-end gap-4 rounded-2xl bg-white p-6 no-underline transition hover:shadow-md"
        style={{ minHeight: "240px" }}
      >
        {/* Image placeholder */}
        <div className="flex-1 rounded-xl bg-neutral-100 min-h-[80px]" />

        {/* Title at bottom — Merriweather italic */}
        <h2 className="font-serif line-clamp-3 text-base font-medium italic leading-snug text-[var(--color-text)]">
          {article.title}
        </h2>
      </Link>
    </article>
  );
}
