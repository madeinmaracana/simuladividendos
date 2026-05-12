"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface TickerCardProps {
  ticker: string;
  href: string;
  /**
   * Quando fornecida, exibe sempre um círculo colorido no lugar da logo
   * (ideal para FIIs onde logos externas costumam não existir).
   * Use `tickerAccentColor(ticker)` de @/lib/ticker-colors para gerar deterministicamente.
   */
  accentColor?: string;
}

const BRAPI_LOGO = (t: string) =>
  `https://icons.brapi.dev/icons/${t.toUpperCase()}.svg`;

/**
 * Card de ticker — specs Figma:
 *   height: 120px · padding: 16px · border-radius: 16px
 *   flex-col · justify-between · align-items: flex-start
 *   logo 36px (circular) topo · ticker name base
 *
 * Quando `accentColor` é passado, exibe sempre o círculo colorido
 * (sem tentar carregar imagem externa) — padrão para FIIs.
 */
export function TickerCard({ ticker, href, accentColor }: TickerCardProps) {
  const [imgError, setImgError] = useState(false);

  const showCircle = Boolean(accentColor) || imgError;
  const circleBg = accentColor ?? "var(--color-surface-muted)";
  const circleText = accentColor ? "#ffffff" : "var(--color-text-soft)";

  return (
    <Link
      href={href}
      className="flex h-[120px] w-full flex-col justify-between rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 no-underline transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)]"
    >
      {/* Logo / círculo colorido — topo esquerdo */}
      {showCircle ? (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ backgroundColor: circleBg, color: circleText }}
        >
          {ticker.slice(0, 2)}
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
