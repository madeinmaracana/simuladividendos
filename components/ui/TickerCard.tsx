"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TickerCardProps {
  ticker: string;
  href: string;
}

const BRAPI_LOGO = (t: string) =>
  `https://icons.brapi.dev/icons/${t.toUpperCase()}.svg`;

/**
 * Card de ticker — specs Figma:
 *   height: 120px · padding: 16px · border-radius: 16px
 *   flex-col · justify-between · align-items: flex-start
 *   logo 36px (circular) topo · ticker name base
 */
export function TickerCard({ ticker, href }: TickerCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={href}
      className="flex h-[120px] w-full flex-col justify-between rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 no-underline transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)]"
    >
      {/* Logo — topo esquerdo */}
      {imgError ? (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-sm font-bold text-[var(--color-text-soft)]">
          {ticker[0]}
        </span>
      ) : (
        <Image
          src={BRAPI_LOGO(ticker)}
          alt=""
          aria-hidden
          width={36}
          height={36}
          className="rounded-full"
          onError={() => setImgError(true)}
        />
      )}

      {/* Ticker — base esquerda */}
      <span className="text-sm font-semibold text-[var(--color-text)]">{ticker}</span>
    </Link>
  );
}
