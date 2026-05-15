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
      className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,0,0,0.08)] bg-white px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-[var(--shadow-sm)] no-underline transition hover:border-[rgba(0,0,0,0.15)] hover:bg-[#F3F4F6]"
    >
      <TickerLogo ticker={tickerA} size={16} theme="light" />
      <span>{tickerA}</span>
      <span className="font-normal text-[#6B7280]">vs</span>
      <TickerLogo ticker={tickerB} size={16} theme="light" />
      <span>{tickerB}</span>
    </Link>
  );
}
