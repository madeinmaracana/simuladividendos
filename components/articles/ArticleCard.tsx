import Link from "next/link";
import type { ArticleRecord } from "@/data/articles";
import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type ArticleCardProps = {
  article: ArticleRecord;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article>
      <Card className="group h-full transition hover:border-teal-300/60 dark:hover:border-teal-800">
        <p className={ui.eyebrow}>Artigo</p>
        <h2 className={cn("mt-2 text-left", ui.sectionTitle)}>
          <Link
            href={`/artigos/${article.slug}`}
            className="transition group-hover:text-teal-800 dark:group-hover:text-teal-300"
          >
            {article.title}
          </Link>
        </h2>
        <p className={cn(ui.body, "mt-3")}>{article.description}</p>
        <div className="mt-4">
          <TextLink href={`/artigos/${article.slug}`} className="text-sm">
            Ler artigo →
          </TextLink>
        </div>
      </Card>
    </article>
  );
}
