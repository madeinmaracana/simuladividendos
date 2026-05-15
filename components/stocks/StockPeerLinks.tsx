import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { getSectorPath, getTickerPath, type StockSeoRecord } from "@/lib/stocks-data";

type StockPeerLinksProps = {
  sectorSlug: string;
  sectorLabel: string;
  peers: StockSeoRecord[];
};

export function StockPeerLinks({ sectorSlug, sectorLabel, peers }: StockPeerLinksProps) {
  return (
    <nav aria-label="Navegação por setor e pares" className={ui.pageSection}>
      <Card className="border-dashed bg-[#F9FAFB]">
        <p className="text-sm font-semibold text-[#111827]">Continue navegando</p>
        <p className={cn(ui.body, "mt-2")}>
          Setor:{" "}
          <TextLink href={getSectorPath(sectorSlug)} className="text-sm">
            {sectorLabel}
          </TextLink>
        </p>
        {peers.length > 0 ? (
          <div className="mt-4">
            <p className={ui.metricLabel}>Outras ações no mesmo setor</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {peers.map((p) => (
                <li key={p.ticker}>
                  <TextLink href={getTickerPath(p.ticker)} className={cn(ui.pill, "no-underline")}>
                    {p.ticker}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Card>
    </nav>
  );
}
