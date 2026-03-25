"use client";

import { SearchInput, type TickerSelectionMeta } from "@/components/SearchInput";
import { cn } from "@/lib/cn";

export type { TickerSelectionMeta };

export type TickerSelectFieldProps = {
  id?: string;
  value: string;
  onChange: (value: string, selectionMeta?: TickerSelectionMeta) => void;
  disabled?: boolean;
  placeholder?: string;
  showHelperText?: boolean;
  className?: string;
  selectionMeta?: TickerSelectionMeta | null;
};

export function TickerSelectField({
  showHelperText = false,
  className,
  selectionMeta,
  ...rest
}: TickerSelectFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <SearchInput
        label="Ação ou FII (ticker B3)"
        showHelperText={showHelperText}
        placeholder="Ex.: PETR4 ou HGLG11"
        selectionMeta={selectionMeta}
        {...rest}
      />
    </div>
  );
}
