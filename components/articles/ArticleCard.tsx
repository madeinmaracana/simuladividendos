import Link from "next/link";
import type { ArticleRecord } from "@/data/articles";

type ArticleCardProps = {
  article: ArticleRecord;
  /** "light" = novo card branco (Figma 104-1602). "dark" = glass dark (home). */
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
      <Link
        href={`/artigos/${article.slug}`}
        className="no-underline"
        style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", flex: "1 0 0" }}
      >
        {/* Imagem */}
        <div
          style={{
            height: 160,
            alignSelf: "stretch",
            borderRadius: "16px 16px 0 0",
            background: article.coverImage
              ? `url(${article.coverImage}) center/cover no-repeat`
              : "var(--c-surface)",
            flexShrink: 0,
          }}
        />

        {/* Texto */}
        <div
          style={{
            display: "flex",
            padding: "40px 16px 16px 16px",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            gap: 16,
            alignSelf: "stretch",
            borderRadius: "0 0 16px 16px",
            background: "var(--c-surface)",
            flex: 1,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "var(--c-muted)",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
          >
            {readTime} min
          </span>
          <p
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "var(--c-text)",
              lineHeight: "normal",
              margin: 0,
            }}
          >
            {article.title}
          </p>
        </div>
      </Link>
    );
  }

  /* dark theme (usado na home) */
  return (
    <article className="flex h-full">
      <Link
        href={`/artigos/${article.slug}`}
        className="flex flex-1 flex-col justify-between gap-3 rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4 no-underline transition hover:border-white/20 hover:brightness-105"
      >
        <span className="text-[13px] font-medium text-[var(--c-muted)]">
          {readTime} min de leitura
        </span>
        <p className="line-clamp-3 font-serif text-[15px] font-normal italic leading-snug text-white">
          {article.title}
        </p>
      </Link>
    </article>
  );
}
