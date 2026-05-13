import Link from "next/link";
import type { ArticleRecord } from "@/data/articles";

type ArticleCardProps = {
  article: ArticleRecord;
  /** "light" = card branco (home). "dark" = glass dark (padrão). */
  theme?: "light" | "dark";
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

export function ArticleCard({ article, theme = "dark" }: ArticleCardProps) {
  const readTime = estimateReadTime(article);

  if (theme === "light") {
    return (
      <article className="flex h-full">
        <Link
          href={`/artigos/${article.slug}`}
          className="flex flex-1 flex-col overflow-hidden rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white no-underline transition hover:border-[rgba(0,0,0,0.15)] hover:shadow-sm"
        >
          {/* Thumbnail */}
          <div className="h-[160px] w-full shrink-0 bg-[#F3F4F6]" />

          {/* Content */}
          <div className="flex flex-1 flex-col gap-2 p-4">
            <span className="text-[13px] font-medium text-[#6B7280]">
              {readTime} min de leitura
            </span>
            <p className="line-clamp-3 font-serif text-[15px] font-normal italic leading-snug text-[#111827]">
              {article.title}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="flex h-full">
      <Link
        href={`/artigos/${article.slug}`}
        className="flex flex-1 flex-col justify-between gap-3 rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4 no-underline transition hover:border-white/20 hover:brightness-105"
      >
        {/* Tempo de leitura — topo */}
        <span className="text-[13px] font-medium text-[#808080]">
          {readTime} min de leitura
        </span>

        {/* Título — base */}
        <p className="line-clamp-3 font-serif text-[15px] font-normal italic leading-snug text-white">
          {article.title}
        </p>
      </Link>
    </article>
  );
}
