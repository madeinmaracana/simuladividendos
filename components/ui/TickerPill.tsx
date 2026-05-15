"use client";

/**
 * TickerPill — chip de ativo com logo circular + símbolo do ticker.
 *
 * Specs Figma:
 *   - Ícone: 24×24, circular
 *   - Font: 12px / semibold
 *   - Padding: 4px vertical, 8px horizontal (pl-1 no lado do logo)
 *   - Gap ícone→texto: 8px
 *   - Border-radius: pill (rounded-full)
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface TickerPillProps {
  ticker: string;
  href: string;
  className?: string;
}

const BRAPI_LOGO = (t: string) =>
  `https://icons.brapi.dev/icons/${t.toUpperCase()}.svg`;

export function TickerPill({ ticker, href, className }: TickerPillProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 no-underline",
        "py-1 pl-1 pr-3",
        "rounded-full border border-[rgba(0,0,0,0.08)] bg-white",
        "shadow-[var(--shadow-xs)]",
        "text-xs font-semibold text-[#111827]",
        "transition-colors hover:border-[rgba(0,0,0,0.15)] hover:bg-[#F3F4F6]",
        className
      )}
    >
      {imgError ? (
        /* fallback: círculo com a inicial */
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-xs font-bold text-[#6B7280]">
          {ticker[0]}
        </span>
      ) : (
        <Image
          src={BRAPI_LOGO(ticker)}
          alt=""
          aria-hidden
          width={24}
          height={24}
          className="shrink-0 rounded-full"
          onError={() => setImgError(true)}
        />
      )}
      <span>{ticker}</span>
    </Link>
  );
}
