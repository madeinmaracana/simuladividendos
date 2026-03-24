"use client";

interface SharesInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SharesInput({
  id = "shares",
  value,
  onChange,
  disabled,
}: SharesInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
        Quantidade de cotas
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
        className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-neutral-900 shadow-sm outline-none ring-teal-500/30 focus:border-teal-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
      />
    </div>
  );
}
