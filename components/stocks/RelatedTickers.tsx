import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { getSectorPath, getTickerPath, type StockSeoRecord } from "@/lib/stocks-data";

export type RelatedTickersProps = {
  symbol: string;
  sectorSlug: string;
  sectorLabel: string;
  peers: StockSeoRecord[];
  /** Se houver bloco de artigos na mesma página, oferece âncora interna. */
  hasRelatedArticles?: boolean;
};

/**
 * Interlinking: setor, pares, simulador e (opcional) artigos — H2 explícito para SEO.
 */
export function RelatedTickers({
  symbol,
  sectorSlug,
  sectorLabel,
  peers,
  hasRelatedArticles = false,
}: RelatedTickersProps) {
  const others = peers.filter((p) => p.ticker !== symbol);

  return (
    <section aria-labelledby="heading-related-tickers" className={ui.pageSection}>
      <h2 id="heading-related-tickers" className={cn("text-left", ui.sectionTitle)}>
        Setor, ações relacionadas e simulador
      </h2>
      <Card className="mt-4 border-dashed bg-neutral-50/60 dark:bg-neutral-900/35">
        <p className={cn(ui.body, "mt-0")}>
          Veja o contexto do setor de{" "}
          <TextLink href={getSectorPath(sectorSlug)} className="text-sm font-medium">
            {sectorLabel}
          </TextLink>
          {others.length > 0
            ? " e compare com outras ações listadas abaixo. "
            : ". "}
          Para testar outro ticker com a mesma ferramenta, use o{" "}
          <TextLink href="/simulador" className="text-sm font-medium">
            simulador dedicado
          </TextLink>
          .
        </p>

        {others.length > 0 ? (
          <div className="mt-4">
            <p className={ui.metricLabel}>Outras ações no mesmo setor</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {others.map((p) => (
                <li key={p.ticker}>
                  <TextLink href={getTickerPath(p.ticker)} className={cn(ui.pill, "no-underline")}>
                    {p.ticker}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

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
