"use client";

import Link from "next/link";
import { TickerLogo } from "@/components/ui/TickerLogo";

interface ComparPillProps {
  tickerA: string;
  tickerB: string;
  href: string;
}

/** Chip de comparação com logos dos dois tickers. */
export function ComparPill({ tickerA, tickerB, href }: ComparPillProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text)] shadow-[var(--shadow-sm)] no-underline transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)]"
    >
      <TickerLogo ticker={tickerA} size={16} theme="light" />
      <span>{tickerA}</span>
      <span className="font-normal text-[var(--color-text-soft)]">vs</span>
      <TickerLogo ticker={tickerB} size={16} theme="light" />
      <span>{tickerB}</span>
    </Link>
  );
}
