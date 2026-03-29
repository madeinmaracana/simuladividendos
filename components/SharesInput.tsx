"use client";

import { ui } from "@/components/ui/classes";
import { cn } from "@/lib/cn";

interface SharesInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Campo maior no simulador simplificado. */
  size?: "default" | "lg";
}

export function SharesInput({
  id = "shares",
  value,
  onChange,
  disabled,
  size = "default",
}: SharesInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn(ui.label, size === "lg" && "text-base font-medium text-[color:var(--text)]")}
      >
        Quantidade de ações
      </label>
      <input
        id={id}
        type="number"
        min={0}
        step={1}
        inputMode="numeric"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          ui.input,
          size === "lg" && "min-h-[52px] py-3 text-base font-medium tabular-nums"
        )}
      />
    </div>
  );
}
