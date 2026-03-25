import { StockHero } from "@/components/stocks/StockHero";
import { StockMetrics } from "@/components/stocks/StockMetrics";
import { StockPeerLinks } from "@/components/stocks/StockPeerLinks";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import type { StockSeoRecord } from "@/data/stocks";
import { getPeerTickers } from "@/data/stocks";

type StockSeoEditorialProps = {
  stock: StockSeoRecord;
};

/**
 * Blocos editoriais padrão para páginas de ticker com dados em `data/stocks/tickers.registry.ts`.
 */
export function StockSeoEditorial({ stock }: StockSeoEditorialProps) {
  const peers = getPeerTickers(stock.ticker);

  return (
    <>
      <StockHero
        afterCalculator
        ticker={stock.ticker}
        companyName={stock.companyName}
        shortDescription={stock.shortDescription}
        sectorLabel={stock.sectorLabel}
        sectorSlug={stock.sectorSlug}
      />

      <StockMetrics
        ticker={stock.ticker}
        sectorLabel={stock.sectorLabel}
        priceBrl={stock.priceBrl}
        dividendYieldPct={stock.dividendYieldPct}
        payoutPct={stock.payoutPct}
        paymentFrequency={stock.paymentFrequency}
      />

      <section aria-labelledby="heading-historico-acao">
        <Card>
          <h2 id="heading-historico-acao" className={cn("text-left", ui.sectionTitle)}>
            Histórico e contexto
          </h2>
          <p className={cn(ui.body, "mt-3")}>{stock.historySummary}</p>
        </Card>
      </section>

      <section aria-labelledby="heading-vale-acompanhar">
        <Card>
          <h2 id="heading-vale-acompanhar" className={cn("text-left", ui.sectionTitle)}>
            Vale a pena acompanhar {stock.ticker}?
          </h2>
          <p className={cn(ui.body, "mt-3")}>{stock.worthFollowing}</p>
        </Card>
      </section>

      <StockPeerLinks
        sectorSlug={stock.sectorSlug}
        sectorLabel={stock.sectorLabel}
        peers={peers}
      />
    </>
  );
}
