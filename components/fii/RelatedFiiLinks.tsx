import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { getFiiPath, type FiiSeoRecord } from "@/data/fiis";

export type RelatedFiiLinksProps = {
  symbol: string;
  peers: FiiSeoRecord[];
  hasRelatedArticles?: boolean;
};

export function RelatedFiiLinks({ symbol, peers, hasRelatedArticles = false }: RelatedFiiLinksProps) {
  const others = peers.filter((p) => p.ticker !== symbol);

  return (
    <section aria-labelledby="heading-related-fiis" className={ui.pageSection}>
      <h2 id="heading-related-fiis" className={cn("text-left", ui.sectionTitle)}>
        Outros FIIs e links
      </h2>
      <Card className="mt-4 border-dashed bg-neutral-50/60 dark:bg-neutral-900/35">
        <p className={cn(ui.body, "mt-0")}>
          Explore mais fundos na{" "}
          <TextLink href="/fiis" className="text-sm font-medium">
            lista de FIIs
          </TextLink>{" "}
          ou use o{" "}
          <TextLink href="/simulador" className="text-sm font-medium">
            simulador
          </TextLink>{" "}
          com busca por ticker.
        </p>

        {others.length > 0 ? (
          <div className="mt-4">
            <p className={ui.metricLabel}>Outros FIIs cadastrados</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {others.map((p) => (
                <li key={p.ticker}>
                  <TextLink href={getFiiPath(p.ticker)} className={cn(ui.pill, "no-underline")}>
                    {p.ticker}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {hasRelatedArticles ? (
          <p className={cn(ui.body, "mt-4 border-t border-[var(--border)] pt-4 dark:border-neutral-800")}>
            <TextLink href="#heading-artigos-relacionados-fii" className="text-sm font-medium">
              Artigos relacionados
            </TextLink>
          </p>
        ) : null}
      </Card>
    </section>
  );
}
