import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import type { FiiSeoRecord } from "@/data/fiis";

export type RelatedFiiLinksProps = {
  symbol: string;
  peers: FiiSeoRecord[];
  hasRelatedArticles?: boolean;
};

export function RelatedFiiLinks({ symbol: _symbol, peers: _peers, hasRelatedArticles = false }: RelatedFiiLinksProps) {
  return (
    <section aria-labelledby="heading-related-fiis" className={ui.pageSection}>
      <h2 id="heading-related-fiis" className={cn("text-left", ui.sectionTitle)}>
        Lista de FIIs e simulador
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
