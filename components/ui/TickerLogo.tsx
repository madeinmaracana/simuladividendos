"use client";

import { useState } from "react";
import Image from "next/image";

interface TickerLogoProps {
  ticker: string;
  size?: number;
  theme?: "dark" | "light";
}

/* ── paleta determinística ────────────────────────────────── */
const PALETTE: { bg: string; fg: string }[] = [
  { bg: "#DBEAFE", fg: "#1D4ED8" }, // azul
  { bg: "#D1FAE5", fg: "#065F46" }, // verde
  { bg: "#FCE7F3", fg: "#9D174D" }, // rosa
  { bg: "#FEF3C7", fg: "#92400E" }, // âmbar
  { bg: "#EDE9FE", fg: "#5B21B6" }, // violeta
  { bg: "#FFEDD5", fg: "#9A3412" }, // laranja
  { bg: "#CFFAFE", fg: "#155E75" }, // ciano
  { bg: "#F3F4F6", fg: "#374151" }, // cinza
  { bg: "#FEE2E2", fg: "#991B1B" }, // vermelho
  { bg: "#ECFCCB", fg: "#3F6212" }, // lima
];

export function tickerColor(symbol: string): { bg: string; fg: string } {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = (hash * 31 + symbol.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length]!;
}

/** Logo circular do ticker via brapi.dev com fallback colorido determinístico. */
export function TickerLogo({ ticker, size = 28 }: TickerLogoProps) {
  const [err, setErr] = useState(false);
  const symbol = ticker.toUpperCase();

  if (err || !ticker || ticker.length < 4) {
    const { bg, fg } = tickerColor(symbol);
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-full text-xs font-bold"
        style={{ width: size, height: size, background: bg, color: fg }}
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
