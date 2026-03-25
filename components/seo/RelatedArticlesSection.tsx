import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/TextLink";
import { ui } from "@/components/ui/classes";
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
  max = 3,
  showSimuladorCta = false,
}: RelatedArticlesSectionProps) {
  if (!articles.length) return null;

  const list = articles.slice(0, max);

  return (
    <section aria-labelledby={id} className={ui.stackSection}>
      <SectionHeading id={id} title={title} />
      <ul className="flex flex-col gap-2">
        {list.map((a) => (
          <li key={a.slug}>
            <TextLink href={ROUTES.artigo(a.slug)} className="text-sm">
              {a.title}
            </TextLink>
          </li>
        ))}
      </ul>
      {showSimuladorCta ? (
        <p className={ui.body}>
          Quer simular agora? <TextLink href={ROUTES.simulador}>Abra o simulador</TextLink>.
        </p>
      ) : null}
    </section>
  );
}
