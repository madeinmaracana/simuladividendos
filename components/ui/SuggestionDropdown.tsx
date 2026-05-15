"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import type { TickerSuggestion } from "@/hooks/useTickerSuggestions";

interface SuggestionDropdownProps {
  suggestions: TickerSuggestion[];
  isOpen: boolean;
  highlight: number;
  onHighlight: (index: number) => void;
  onPick: (s: TickerSuggestion) => void;
  /**
   * "dark"  → fundo escuro, texto branco (hero preto/colorido)
   * "light" → fundo --color-surface, tokens padrão (formulários)
   */
  theme?: "dark" | "light";
}

/** Dropdown de sugestões de tickers reutilizável.
 *  Usado em HomeHeroSimulator (dark) e TickerInput (light). */
export function SuggestionDropdown({
  suggestions,
  isOpen,
  highlight,
  onHighlight,
  onPick,
  theme = "light",
}: SuggestionDropdownProps) {
  if (!isOpen || suggestions.length === 0) return null;

  const dark = theme === "dark";

  return (
    <ul
      className={cn(
        "absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-2xl border py-1",
        dark
          ? "border-white/10 bg-[#1a1a1a] shadow-xl"
          : "border-[rgba(0,0,0,0.08)] bg-white shadow-lg",
      )}
    >
      {suggestions.map((s, i) => (
        <li
          key={s.symbol}
          className={cn(
            "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm transition-colors",
            i === highlight
              ? dark ? "bg-white/10" : "bg-[var(--brand)]/10"
              : dark ? "hover:bg-white/5" : "hover:bg-[#F3F4F6]",
          )}
          onMouseEnter={() => onHighlight(i)}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onPick(s)}
        >
          {/* Logo ou fallback */}
          {s.logoUrl ? (
            <Image
              src={s.logoUrl}
              alt={s.symbol}
              width={32}
              height={32}
              unoptimized
              className="h-8 w-8 shrink-0 rounded-lg bg-white object-contain p-0.5"
            />
          ) : (
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                dark
                  ? "bg-white/10 text-white/60"
                  : "bg-[#F3F4F6] text-[#6B7280]",
              )}
            >
              {s.symbol.slice(0, 2)}
            </span>
          )}

          {/* Nome */}
          <div className="min-w-0 flex-1">
            <span className={cn("font-semibold", dark ? "text-white" : "text-[#111827]")}>
              {s.symbol}
            </span>
            <span
              className={cn(
                "mt-0.5 block truncate text-xs",
                dark ? "text-white/50" : "text-[#6B7280]",
              )}
            >
              {s.name}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
