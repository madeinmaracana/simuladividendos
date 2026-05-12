import Link from "next/link";
import type { ArticleRecord } from "@/data/articles";

type ArticleCardProps = {
  article: ArticleRecord;
};

/** Estima tempo de leitura em minutos a partir das seções do artigo */
function estimateReadTime(article: ArticleRecord): number {
  const words = article.sections
    .flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.subsections?.flatMap((sub) => [sub.heading, ...sub.paragraphs]) ?? []),
    ])
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function ArticleCard({ article }: ArticleCardProps) {
  const readTime = estimateReadTime(article);

  return (
    <article className="flex">
      <Link
        href={`/artigos/${article.slug}`}
        className="flex flex-1 flex-col justify-between gap-3 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4 no-underline transition hover:border-[rgba(120,120,120,0.40)] hover:brightness-110"
      >
        {/* Tempo de leitura — topo */}
        <span className="text-[13px] font-medium text-[#808080]">
          {readTime} min
        </span>

        {/* Título — base */}
        <h2 className="line-clamp-3 font-serif text-[15px] font-normal italic leading-snug text-white">
          {article.title}
        </h2>
      </Link>
    </article>
  );
}
