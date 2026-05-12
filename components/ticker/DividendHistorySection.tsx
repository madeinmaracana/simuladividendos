import type { DividendEntry } from "@/lib/types";
import { HISTORY_PREVIEW_COUNT, sortDividendsByPaymentDesc } from "@/lib/dividend-history";
import { DividendHistoryPreview } from "@/components/ticker/DividendHistoryPreview";
import { DividendHistoryExpandable } from "@/components/ticker/DividendHistoryExpandable";

type DividendHistorySectionProps = {
  id?: string;
  rows: DividendEntry[];
  currency: string;
  emptyMessage?: string;
};

export function DividendHistorySection({
  id = "heading-historico-dividendos",
  rows,
  currency,
  emptyMessage = "Não há histórico de proventos disponível na fonte para esta ação.",
}: DividendHistorySectionProps) {
  const sorted = sortDividendsByPaymentDesc(rows);
  const previewItems = sorted.slice(0, HISTORY_PREVIEW_COUNT);
  const hasMore = sorted.length > HISTORY_PREVIEW_COUNT;

  return (
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-[27px] font-medium leading-tight text-white">
          Histórico de dividendos
        </h2>
        <p className="text-[13px] font-medium text-[#808080]">
          Principais pagamentos recentes em lista compacta.
          Abra o histórico completo para todas as linhas, data ex (quando a fonte informar) e status.
        </p>
      </div>

      {!sorted.length ? (
        <p className="rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-8 text-center text-[13px] font-medium text-[#808080]">
          {emptyMessage}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <DividendHistoryPreview items={previewItems} currency={currency} />
          {hasMore ? <DividendHistoryExpandable rows={sorted} currency={currency} /> : null}
        </div>
      )}
    </section>
  );
}
