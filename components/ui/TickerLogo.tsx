"use client";

import { useState } from "react";
import Image from "next/image";

interface TickerLogoProps {
  ticker: string;
  size?: number;
  /**
   * "dark"  → fallback com bg-white/20 text-white (painéis coloridos/pretos)
   * "light" → fallback com --color-surface-muted (formulários, dropdowns)
   */
  theme?: "dark" | "light";
}

/** Logo circular do ticker via brapi.dev com fallback de inicial. */
export function TickerLogo({ ticker, size = 28, theme = "dark" }: TickerLogoProps) {
  const [err, setErr] = useState(false);
  const symbol = ticker.toUpperCase();

  if (err || !ticker || ticker.length < 4) {
    const fallbackClass =
      theme === "dark"
        ? "bg-white/20 text-white"
        : "bg-[var(--color-surface-muted)] text-[var(--color-text-muted)]";

    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full text-xs font-bold ${fallbackClass}`}
        style={{ width: size, height: size }}
      >
        {symbol[0] ?? "?"}
      </span>
    );
  }

  return (
    <Image
      src={`https://icons.brapi.dev/icons/${symbol}.svg`}
      alt={symbol}
      width={size}
      height={size}
      className="shrink-0 rounded-full"
      onError={() => setErr(true)}
      unoptimized
    />
  );
}
