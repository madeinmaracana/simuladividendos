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
   */
  accentColor?: string;
  /** "light" = card branco sobre fundo claro (home sections). "dark" = glass dark (padrão). */
  theme?: "light" | "dark";
}

const BRAPI_LOGO = (t: string) =>
  `https://icons.brapi.dev/icons/${t.toUpperCase()}.svg`;

/**
 * Card de ticker — specs Figma:
 *   height: 128px · padding: 16px · border-radius: 16px
 *   logo 24×24 (circular) topo · ticker name base
 */
export function TickerCard({ ticker, href, accentColor, theme = "dark" }: TickerCardProps) {
  const [imgError, setImgError] = useState(false);

  const showCircle = Boolean(accentColor) || imgError;
  const circleBg   = accentColor ?? (theme === "light" ? "#E5E7EB" : "rgba(255,255,255,0.12)");
  const circleText = accentColor ? "#ffffff" : (theme === "light" ? "#374151" : "rgba(255,255,255,0.6)");

  const cardClass = theme === "light"
    ? "flex h-[131px] w-full flex-col items-start gap-[60px] rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-4 no-underline transition hover:border-[rgba(0,0,0,0.15)] hover:shadow-sm"
    : "flex h-[131px] w-full flex-col items-start gap-[60px] rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 no-underline transition hover:border-white/20 hover:bg-[rgba(255,255,255,0.07)]";

  const labelClass = theme === "light"
    ? "text-[13px] font-semibold text-[#111827]"
    : "text-[13px] font-semibold text-white";

  return (
    <Link href={href} className={cardClass}>
      {/* Logo 24×24 — topo esquerdo */}
      {showCircle ? (
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
          style={{ backgroundColor: circleBg, color: circleText }}
        >
          {ticker.slice(0, 2)}
        </span>
      ) : (
        <Image
          src={BRAPI_LOGO(ticker)}
          alt=""
          aria-hidden
          width={24}
          height={24}
          className="h-6 w-6 rounded-full object-contain"
          onError={() => setImgError(true)}
        />
      )}

      {/* Ticker — base esquerda */}
      <span className={labelClass}>{ticker}</span>
    </Link>
  );
}
