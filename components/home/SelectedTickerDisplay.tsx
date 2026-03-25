import Image from "next/image";
import { cn } from "@/lib/cn";

export type SelectedTickerDisplayProps = {
  symbol: string;
  /** Nome curto ou longo da empresa; omitir se não couber no layout. */
  companyName?: string;
  logoUrl?: string | null;
  /** `sm`: logo 28px; `md`: 32px (igual às sugestões). */
  size?: "sm" | "md";
  className?: string;
};

/**
 * Linha compacta logo + ticker + nome — alinhada ao visual das sugestões do autocomplete.
 */
export function SelectedTickerDisplay({
  symbol,
  companyName,
  logoUrl,
  size = "md",
  className,
}: SelectedTickerDisplayProps) {
  const dim = size === "sm" ? 28 : 32;

  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt=""
          width={dim}
          height={dim}
          unoptimized
          className={cn(
            "shrink-0 rounded-md bg-white object-contain p-0.5 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-600",
            size === "sm" ? "h-7 w-7" : "h-8 w-8"
          )}
        />
      ) : (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-md bg-neutral-100 text-[10px] font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
            size === "sm" ? "h-7 w-7" : "h-8 w-8"
          )}
          aria-hidden
        >
          {symbol.slice(0, 2)}
        </span>
      )}
      <div className="min-w-0 flex-1 leading-tight">
        <span className="font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">{symbol}</span>
        {companyName ? (
          <span className="mt-0.5 block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400">
            {companyName}
          </span>
        ) : null}
      </div>
    </div>
  );
}
