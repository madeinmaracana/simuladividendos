"use client";

import { useMemo } from "react";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { formatBRL } from "@/lib/format";
import { TickerLogo } from "@/components/ui/TickerLogo";

interface LabTickerRowProps {
  ticker: string;
  investment: number;
  onRemove: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

/* ── border-radius por posição ────────────────────────────── */

function rowRadius(isFirst?: boolean, isLast?: boolean): string | number {
  if (isFirst && isLast) return 12;
  if (isFirst) return "12px 12px 0 0";
  if (isLast) return "0 0 12px 12px";
  return 0;
}

function stickyNameRadius(isFirst?: boolean, isLast?: boolean): React.CSSProperties {
  if (isFirst && isLast) return { borderRadius: 12 };
  if (isFirst) return { borderTopLeftRadius: 12 };
  if (isLast) return { borderBottomLeftRadius: 12 };
  return {};
}

/* ── "Não anunciado" ──────────────────────────────────────── */

function NaoAnunciado() {
  return (
    <span
      className="text-[#808080] group-hover:text-white transition-colors"
      style={{ fontSize: 10, fontWeight: 400, lineHeight: 1, whiteSpace: "nowrap" }}
    >
      Não anunciado
    </span>
  );
}

/*
 * Larguras das colunas de dados (na ordem em que aparecem).
 * Usado tanto no ShimmerRow quanto no row real, e exportado
 * para o header em LabComparador.
 *
 * [Preço da cota, Quantidade, Último pagto, Próximo pagto, Freq., Dividendos 12m, DY 12m]
 */
export const LAB_COL_WIDTHS = [116, 92, 120, 120, 80, 128, 88] as const;

/* ── shimmer row ──────────────────────────────────────────── */

function ShimmerRow({ isFirst, isLast }: { isFirst?: boolean; isLast?: boolean }) {
  return (
    <div
      className="flex items-center w-full bg-white"
      style={{ minHeight: 56, borderRadius: rowRadius(isFirst, isLast) }}
    >
      {/* Nome — sticky, mesmo flex-1 do row real */}
      <div
        className="sticky left-0 z-[1] bg-white flex items-center gap-3 px-4 flex-1"
        style={{ minHeight: 56, ...stickyNameRadius(isFirst, isLast) }}
      >
        <span className="inline-block h-6 w-6 animate-pulse rounded-full bg-[#F3F4F6]" />
        <span className="inline-block h-4 w-16 animate-pulse rounded bg-[#F3F4F6]" />
      </div>
      {LAB_COL_WIDTHS.map((w, i) => (
        <div
          key={i}
          className="zero-slashed flex items-center px-4 border-l border-[#E5E7EC] shrink-0"
          style={{ width: w, minHeight: 56 }}
        >
          <span className="inline-block h-4 w-12 animate-pulse rounded bg-[#F3F4F6]" />
        </div>
      ))}
      {/* X placeholder mobile */}
      <div className="sm:hidden shrink-0" style={{ width: 56, minHeight: 56 }} />
    </div>
  );
}

/* ── frequency detection ──────────────────────────────────── */

function detectFrequency(dividends: { paymentDate?: string | null }[]): string | null {
  const DAY_MS = 86_400_000;
  const uniqueDays = [
    ...new Set(
      dividends
        .filter((d) => d.paymentDate)
        .map((d) => Math.floor(new Date(d.paymentDate!).getTime() / DAY_MS)),
    ),
  ].sort((a, b) => a - b);

  if (uniqueDays.length < 2) return null;

  const intervals: number[] = [];
  for (let i = 1; i < uniqueDays.length; i++) {
    intervals.push(uniqueDays[i]! - uniqueDays[i - 1]!);
  }
  intervals.sort((a, b) => a - b);
  const median = intervals[Math.floor(intervals.length / 2)]!;

  if (median <= 45) return "Mensal";
  if (median <= 75) return "Bim.";
  if (median <= 120) return "Trim.";
  if (median <= 240) return "Sem.";
  return "Anual";
}

/* ── LabTickerRow ─────────────────────────────────────────── */

export function LabTickerRow({ ticker, investment, onRemove, isFirst, isLast }: LabTickerRowProps) {
  const { stock, loading, error, currency } = useDividendSimulator(
    ticker,
    null,
    null,
    1,
    "home",
  );

  const price = stock?.regularMarketPrice ?? 0;
  const shares = price > 0 ? Math.floor(investment / price) : 0;

  const twelveMonthsAgo = useMemo(() => Date.now() - 365 * 24 * 60 * 60 * 1000, []);

  /* dividendos por cota nos últimos 12m */
  const last12mPerShare = useMemo(() => {
    if (!stock?.dividends?.length) return 0;
    return stock.dividends
      .filter((d) => d.paymentDate && new Date(d.paymentDate).getTime() >= twelveMonthsAgo)
      .reduce((acc, d) => acc + d.ratePerShare, 0);
  }, [stock, twelveMonthsAgo]);

  const last12mTotal = last12mPerShare * shares;

  /* DY = dividendos/cota ÷ preço atual */
  const dyPercent =
    price > 0 && last12mPerShare > 0
      ? (last12mPerShare / price) * 100
      : null;

  const lastPaymentTotal = useMemo(() => {
    if (!stock?.dividends?.length || shares === 0) return null;
    const now = Date.now();
    const past = stock.dividends
      .filter((d) => d.paymentDate && new Date(d.paymentDate).getTime() <= now)
      .sort((a, b) => new Date(b.paymentDate!).getTime() - new Date(a.paymentDate!).getTime());
    if (!past.length) return null;
    const latestDate = past[0]!.paymentDate!.slice(0, 10);
    return past
      .filter((d) => d.paymentDate!.slice(0, 10) === latestDate)
      .reduce((acc, d) => acc + d.ratePerShare, 0) * shares;
  }, [stock, shares]);

  const nextPaymentTotal = useMemo(() => {
    if (!stock?.dividends?.length || shares === 0) return null;
    const now = Date.now();
    const future = stock.dividends
      .filter((d) => d.paymentDate && new Date(d.paymentDate).getTime() > now)
      .sort((a, b) => new Date(a.paymentDate!).getTime() - new Date(b.paymentDate!).getTime());
    if (!future.length) return null;
    const nextDate = future[0]!.paymentDate!.slice(0, 10);
    return future
      .filter((d) => d.paymentDate!.slice(0, 10) === nextDate)
      .reduce((acc, d) => acc + d.ratePerShare, 0) * shares;
  }, [stock, shares]);

  const frequency = useMemo(() => {
    if (!stock?.dividends?.length) return null;
    return detectFrequency(stock.dividends);
  }, [stock]);

  if (loading) return <ShimmerRow isFirst={isFirst} isLast={isLast} />;

  const cellCls = "text-black group-hover:text-white transition-colors";
  const cellSty = { fontSize: 16, fontWeight: 400 } as const;
  const divCls =
    "zero-slashed flex items-center px-4 border-l border-[#E5E7EC] group-hover:border-transparent transition-colors shrink-0";

  return (
    <div
      className="relative flex items-center w-full bg-white group hover:bg-[#989FAC] transition-colors"
      style={{ minHeight: 56, borderRadius: rowRadius(isFirst, isLast) }}
    >
      {/* Nome da Ação — coluna travada (sticky) */}
      <div
        className="sticky left-0 z-[1] flex items-center gap-3 px-4 flex-1 bg-white group-hover:bg-[#989FAC] transition-colors"
        style={{ minHeight: 56, ...stickyNameRadius(isFirst, isLast) }}
      >
        <TickerLogo ticker={ticker} size={24} theme="light" />
        <span
          className={`zero-slashed ${cellCls}`}
          style={cellSty}
        >
          {ticker}
        </span>
        {error && (
          <span className="text-[10px] text-red-400 ml-1" title={error}>Erro</span>
        )}
      </div>

      {/* Preço da cota */}
      <div className={divCls} style={{ width: LAB_COL_WIDTHS[0], minHeight: 56 }}>
        <span className={cellCls} style={cellSty}>
          {stock ? formatBRL(price, currency) : "—"}
        </span>
      </div>

      {/* Quantidade */}
      <div className={divCls} style={{ width: LAB_COL_WIDTHS[1], minHeight: 56 }}>
        <span className={cellCls} style={cellSty}>
          {shares > 0 ? `≈ ${shares.toLocaleString("pt-BR")}` : "—"}
        </span>
      </div>

      {/* Último pagamento */}
      <div className={divCls} style={{ width: LAB_COL_WIDTHS[2], minHeight: 56 }}>
        {lastPaymentTotal != null && lastPaymentTotal > 0 ? (
          <span className={cellCls} style={cellSty}>{formatBRL(lastPaymentTotal, currency)}</span>
        ) : <NaoAnunciado />}
      </div>

      {/* Próximo pagamento */}
      <div className={divCls} style={{ width: LAB_COL_WIDTHS[3], minHeight: 56 }}>
        {nextPaymentTotal != null && nextPaymentTotal > 0 ? (
          <span className={cellCls} style={cellSty}>{formatBRL(nextPaymentTotal, currency)}</span>
        ) : <NaoAnunciado />}
      </div>

      {/* Freq. */}
      <div className={divCls} style={{ width: LAB_COL_WIDTHS[4], minHeight: 56 }}>
        {frequency ? (
          <span
            className={cellCls}
            style={{ fontSize: 10, fontWeight: 400, lineHeight: 1, whiteSpace: "nowrap" }}
          >
            {frequency}
          </span>
        ) : <NaoAnunciado />}
      </div>

      {/* Dividendos 12m */}
      <div className={divCls} style={{ width: LAB_COL_WIDTHS[5], minHeight: 56 }}>
        {last12mTotal > 0 ? (
          <span className={cellCls} style={cellSty}>{formatBRL(last12mTotal, currency)}</span>
        ) : <NaoAnunciado />}
      </div>

      {/* DY 12m */}
      <div className={divCls} style={{ width: LAB_COL_WIDTHS[6], minHeight: 56 }}>
        {dyPercent != null ? (
          <span className={cellCls} style={cellSty}>
            {dyPercent.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%
          </span>
        ) : <NaoAnunciado />}
      </div>

      {/*
       * Mobile: X sempre visível no fim da linha, só ícone preto.
       * sm:hidden → escondido no desktop (usa o botão absoluto abaixo).
       */}
      <div
        className="sm:hidden flex items-center justify-center border-l border-[#E5E7EC] group-hover:border-transparent transition-colors shrink-0"
        style={{ width: 56, minHeight: 56 }}
      >
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remover ${ticker}`}
          className="flex items-center justify-center bg-transparent border-none cursor-pointer p-1"
        >
          <span
            className="material-symbols-outlined leading-none text-black group-hover:text-white transition-colors"
            style={{ fontSize: 20, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
          >
            close
          </span>
        </button>
      </div>

      {/*
       * Desktop: X fora da tabela (right:-48px), visível no hover.
       */}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remover ${ticker}`}
        className="hidden sm:flex absolute opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center border-none cursor-pointer p-0"
        style={{
          right: -48,
          top: "50%",
          transform: "translateY(-50%)",
          width: 40,
          height: 40,
          borderRadius: 20,
          background: "#989FAC",
        }}
      >
        <span
          className="material-symbols-outlined leading-none text-white"
          style={{ fontSize: 20, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
        >
          close
        </span>
      </button>
    </div>
  );
}
