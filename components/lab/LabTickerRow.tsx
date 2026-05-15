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

/*
 * O sticky cell tem background próprio, por isso precisa das bordas esquerdas
 * explícitas — caso contrário os cantos arredondados do row não aparecem nele.
 */
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
      {[136, 120, 160, 160, 160].map((w, i) => (
        <div
          key={i}
          className="zero-slashed flex items-center px-4 border-l border-[#E5E7EC] shrink-0"
          style={{ width: w, minHeight: 56 }}
        >
          <span className="inline-block h-4 w-16 animate-pulse rounded bg-[#F3F4F6]" />
        </div>
      ))}
      {/* X placeholder mobile */}
      <div className="sm:hidden shrink-0" style={{ width: 56, minHeight: 56 }} />
    </div>
  );
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

  const last12mTotal = useMemo(() => {
    if (!stock?.dividends?.length) return 0;
    return stock.dividends
      .filter((d) => d.paymentDate && new Date(d.paymentDate).getTime() >= twelveMonthsAgo)
      .reduce((acc, d) => acc + d.ratePerShare, 0) * shares;
  }, [stock, shares, twelveMonthsAgo]);

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

  if (loading) return <ShimmerRow isFirst={isFirst} isLast={isLast} />;

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
          className="zero-slashed text-black group-hover:text-white transition-colors"
          style={{ fontSize: 16, fontWeight: 400 }}
        >
          {ticker}
        </span>
        {error && (
          <span className="text-[10px] text-red-400 ml-1" title={error}>Erro</span>
        )}
      </div>

      {/* Preço da cota */}
      <div
        className="zero-slashed flex items-center px-4 border-l border-[#E5E7EC] group-hover:border-transparent transition-colors shrink-0"
        style={{ width: 136, minHeight: 56 }}
      >
        <span className="text-black group-hover:text-white transition-colors" style={{ fontSize: 16, fontWeight: 400 }}>
          {stock ? formatBRL(price, currency) : "—"}
        </span>
      </div>

      {/* Quantidade */}
      <div
        className="zero-slashed flex items-center px-4 border-l border-[#E5E7EC] group-hover:border-transparent transition-colors shrink-0"
        style={{ width: 120, minHeight: 56 }}
      >
        <span className="text-black group-hover:text-white transition-colors" style={{ fontSize: 16, fontWeight: 400 }}>
          {shares > 0 ? `≈ ${shares.toLocaleString("pt-BR")}` : "—"}
        </span>
      </div>

      {/* Último pagamento */}
      <div
        className="zero-slashed flex items-center px-4 border-l border-[#E5E7EC] group-hover:border-transparent transition-colors shrink-0"
        style={{ width: 160, minHeight: 56 }}
      >
        {lastPaymentTotal != null && lastPaymentTotal > 0 ? (
          <span className="text-black group-hover:text-white transition-colors" style={{ fontSize: 16, fontWeight: 400 }}>
            {formatBRL(lastPaymentTotal, currency)}
          </span>
        ) : <NaoAnunciado />}
      </div>

      {/* Próximo pagamento */}
      <div
        className="zero-slashed flex items-center px-4 border-l border-[#E5E7EC] group-hover:border-transparent transition-colors shrink-0"
        style={{ width: 160, minHeight: 56 }}
      >
        {nextPaymentTotal != null && nextPaymentTotal > 0 ? (
          <span className="text-black group-hover:text-white transition-colors" style={{ fontSize: 16, fontWeight: 400 }}>
            {formatBRL(nextPaymentTotal, currency)}
          </span>
        ) : <NaoAnunciado />}
      </div>

      {/* Últimos 12 meses */}
      <div
        className="zero-slashed flex items-center px-4 border-l border-[#E5E7EC] group-hover:border-transparent transition-colors shrink-0"
        style={{ width: 160, minHeight: 56 }}
      >
        {last12mTotal > 0 ? (
          <span className="text-black group-hover:text-white transition-colors" style={{ fontSize: 16, fontWeight: 400 }}>
            {formatBRL(last12mTotal, currency)}
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
       * Funciona porque o container usa overflow-x:visible no desktop.
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
