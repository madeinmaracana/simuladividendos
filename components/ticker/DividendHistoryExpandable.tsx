"use client";

import type { DividendEntry } from "@/lib/types";
import { ExpandableSection } from "@/components/ui/ExpandableSection";
import { DividendHistoryTable } from "@/components/ticker/DividendHistoryTable";

type DividendHistoryExpandableProps = {
  rows: DividendEntry[];
  currency: string;
  className?: string;
};

export function DividendHistoryExpandable({ rows, currency, className }: DividendHistoryExpandableProps) {
  return (
    <ExpandableSection
      className={className}
      expandLabel="Ver histórico completo"
      collapseLabel="Recolher histórico"
    >
      <div className="pt-1">
        <DividendHistoryTable rows={rows} currency={currency} />
      </div>
    </ExpandableSection>
  );
}
