import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { getSectorPath, type StockSeoRecord } from "@/lib/stocks-data";

export type RelatedTickersProps = {
  symbol: string;
  sectorSlug: string;
  sectorLabel: string;
  peers: StockSeoRecord[];
  /** Se houver bloco de artigos na mesma página, oferece âncora interna. */
  hasRelatedArticles?: boolean;
};

/**
 * Rodapé de contexto: hub do setor, simulador e (opcional) artigos. Pares do setor ficam no bloco “Outros ativos relacionados” acima.
 */
export function RelatedTickers({
  symbol,
  sectorSlug,
  sectorLabel,
  peers: _peers,
  hasRelatedArticles = false,
}: RelatedTickersProps) {
  return (
    <section aria-labelledby="heading-related-tickers" className={ui.pageSection}>
      <h2 id="heading-related-tickers" className={cn("text-left", ui.sectionTitle)}>
        Explorar setor e simulador
      </h2>
      <Card className="mt-4 border-dashed bg-neutral-50/60 dark:bg-neutral-900/35">
        <p className={cn(ui.body, "mt-0")}>
          Veja o contexto do setor de{" "}
          <TextLink href={getSectorPath(sectorSlug)} className="text-sm font-medium">
            {sectorLabel}
          </TextLink>
          . Para testar outro ticker com a mesma ferramenta, use o{" "}
          <TextLink href="/simulador" className="text-sm font-medium">
            simulador dedicado
          </TextLink>
          .
        </p>

        {hasRelatedArticles ? (
          <p className={cn(ui.body, "mt-4 border-t border-[var(--border)] pt-4 dark:border-neutral-800")}>
            <TextLink href="#heading-artigos-relacionados" className="text-sm font-medium">
              Artigos relacionados a {symbol}
            </TextLink>{" "}
            — leitura educativa sobre métricas e contexto.
          </p>
        ) : null}
      </Card>
    </section>
  );
}
