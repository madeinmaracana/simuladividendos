import type { DividendEntry } from "@/lib/types";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import { HISTORY_PREVIEW_COUNT, sortDividendsByPaymentDesc } from "@/lib/dividend-history";
import { DividendHistoryPreview } from "@/components/ticker/DividendHistoryPreview";
import { DividendHistoryExpandable } from "@/components/ticker/DividendHistoryExpandable";

type DividendHistorySectionProps = {
  id?: string;
  rows: DividendEntry[];
  currency: string;
  emptyMessage?: string;
};

/**
 * Histórico: preview (últimos 5) + expansão inline com tabela completa (lazy mount no cliente).
 */
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
    <section aria-labelledby={id} className={ui.pageSection}>
      <h2 id={id} className={cn("text-left", ui.sectionTitle)}>
        Histórico de dividendos
      </h2>
      <p className={cn(ui.body, "mt-2")}>
        Principais pagamentos recentes em lista compacta. Abra o histórico completo para todas as linhas, data ex
        (quando a fonte informar) e status.
      </p>

      {!sorted.length ? (
        <p
          className={cn(
            ui.body,
            "mt-4 rounded-xl border border-dashed border-[var(--border)] bg-neutral-50/80 px-4 py-8 text-center dark:bg-neutral-900/40"
          )}
        >
          {emptyMessage}
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          <DividendHistoryPreview items={previewItems} currency={currency} />
          {hasMore ? <DividendHistoryExpandable rows={sorted} currency={currency} /> : null}
        </div>
      )}
    </section>
  );
}
