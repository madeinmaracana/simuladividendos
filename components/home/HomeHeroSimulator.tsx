"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDividendSimulator } from "@/components/simulator/useDividendSimulator";
import { formatBRL, formatDatePt } from "@/lib/format";
import { cn } from "@/lib/cn";

/* ── suggestion types & hooks ────────────────────────── */

type TickerSuggestion = { symbol: string; name: string; logoUrl?: string | null };

function useDebouncedValue<T>(value: T, ms: number): T {
  const [d, setD] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setD(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return d;
}

/* ── helpers ──────────────────────────────────────────── */

interface LogoProps { ticker: string; size?: number }
function TickerLogo({ ticker, size = 28 }: LogoProps) {
  const [err, setErr] = useState(false);
  if (err || !ticker || ticker.length < 4) {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white"
        style={{ width: size, height: size }}
      >
        {ticker?.[0] ?? "?"}
      </span>
    );
  }
  return (
    <Image
      src={`https://icons.brapi.dev/icons/${ticker.toUpperCase()}.svg`}
      alt={ticker}
      width={size}
      height={size}
      className="shrink-0 rounded-full"
      onError={() => setErr(true)}
      unoptimized
    />
  );
}

/** Separa "R$ " do número para aplicar cores diferentes */
function Amount({
  value,
  currency,
  /** quando true: "R$" em cinza claro, número em preto (destaque) */
  highlight = false,
}: {
  value: number;
  currency: string;
  highlight?: boolean;
}) {
  const formatted = formatBRL(value, currency);
  // "R$ 152,00" → prefix="R$ ", number="152,00"
  const match = formatted.match(/^(R\$[  \s]*)(.+)$/);
  const prefix = match?.[1] ?? "R$ ";
  const number = match?.[2] ?? formatted;

  return (
    <span className="text-3xl font-light leading-none tracking-[-0.64px]">
      <span className={highlight ? "text-[#9B9B9B]" : "text-[#A3A3A3]"}>{prefix}</span>
      <span className={highlight ? "text-black" : "text-[#A3A3A3]"}>{number}</span>
    </span>
  );
}

/* ── main component ───────────────────────────────────── */

export function HomeHeroSimulator() {
  const [ticker, setTicker] = useState("");

  /* ── suggestions ── */
  const [suggestions, setSuggestions] = useState<TickerSuggestion[]>([]);
  const [sugOpen, setSugOpen] = useState(false);
  const [sugHighlight, setSugHighlight] = useState(0);
  const [sugLoading, setSugLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebouncedValue(ticker.trim(), 280);

  const fetchSuggestions = useCallback(async (q: string) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setSugLoading(true);
    try {
      const res = await fetch(`/api/ticker-suggestions?q=${encodeURIComponent(q)}`, { signal: ac.signal });
      if (!res.ok) { setSuggestions([]); return; }
      const data = (await res.json()) as { suggestions?: TickerSuggestion[] };
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setSuggestions([]);
    } finally {
      setSugLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.length < 2) { setSuggestions([]); setSugOpen(false); return; }
    void fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, fetchSuggestions]);

  useEffect(() => {
    if (suggestions.length > 0) setSugOpen(true);
    setSugHighlight(0);
  }, [suggestions]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setSugOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pickSuggestion = (s: TickerSuggestion) => {
    setTicker(s.symbol);
    setSugOpen(false);
    setSuggestions([]);
  };

  const {
    sharesStr,
    setSharesStr,
    stock,
    error,
    loading,
    showResults,
    currency,
    lastPayment,
    nextPayment,
    onSimulate,
  } = useDividendSimulator(ticker, null, null, 100, "homeManual");

  const displayTicker = ticker.trim().toUpperCase();
  const hasValidTicker = displayTicker.length >= 4;

  const perShareValue = lastPayment && Number(sharesStr || 1) > 0
    ? lastPayment.totalPerShare
    : null;

  return (
    <div className="flex w-full overflow-hidden rounded-[32px]">

      {/* ════════════════════════════════════════
          LEFT PANEL — black
      ════════════════════════════════════════ */}
      <div className="flex w-[440px] shrink-0 flex-col gap-12 bg-black p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-white/40">
          Comece por aqui
        </p>

        <div className="flex flex-col gap-5">
          {/* Ticker */}
          <div className="flex flex-col gap-2" ref={wrapRef}>
            <label htmlFor="hero-ticker" className="text-xs font-medium text-white/50">
              Ação ou FII (ticker B3)
            </label>
            <div className="relative">
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[rgba(255,255,255,0.08)] px-4 py-3 focus-within:border-white/30">
                <TickerLogo ticker={displayTicker} size={28} />
                <input
                  id="hero-ticker"
                  type="text"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={sugOpen && suggestions.length > 0}
                  value={ticker}
                  onChange={(e) => {
                    setTicker(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                    setSugOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (!suggestions.length) return;
                    if (e.key === "ArrowDown") { e.preventDefault(); setSugHighlight(h => Math.min(h + 1, suggestions.length - 1)); }
                    else if (e.key === "ArrowUp") { e.preventDefault(); setSugHighlight(h => Math.max(h - 1, 0)); }
                    else if (e.key === "Enter" && sugOpen && suggestions[sugHighlight]) { e.preventDefault(); pickSuggestion(suggestions[sugHighlight]!); }
                    else if (e.key === "Escape") setSugOpen(false);
                  }}
                  placeholder="Ex.: BBAS3"
                  maxLength={8}
                  autoComplete="off"
                  autoCapitalize="characters"
                  className="flex-1 bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-white/25"
                />
                {sugLoading && (
                  <span className="text-xs text-white/30">…</span>
                )}
              </div>

              {/* Dropdown de sugestões */}
              {sugOpen && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-2xl border border-white/10 bg-[#1a1a1a] py-1 shadow-xl">
                  {suggestions.map((s, i) => (
                    <li
                      key={s.symbol}
                      className={cn(
                        "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                        i === sugHighlight ? "bg-white/10" : "hover:bg-white/5"
                      )}
                      onMouseEnter={() => setSugHighlight(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pickSuggestion(s)}
                    >
                      {s.logoUrl ? (
                        <Image src={s.logoUrl} alt={s.symbol} width={32} height={32} unoptimized
                          className="h-8 w-8 shrink-0 rounded-lg bg-white object-contain p-0.5" />
                      ) : (
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold text-white/60">
                          {s.symbol.slice(0, 2)}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-white">{s.symbol}</span>
                        <span className="mt-0.5 block truncate text-xs text-white/50">{s.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <label htmlFor="hero-shares" className="text-xs font-medium text-white/50">
              Quantidade
            </label>
            <input
              id="hero-shares"
              type="text"
              inputMode="numeric"
              value={sharesStr}
              onChange={(e) => setSharesStr(e.target.value.replace(/\D/g, ""))}
              className="rounded-2xl border border-white/15 bg-[rgba(255,255,255,0.08)] px-4 py-3 text-2xl font-light tabular-nums text-white outline-none focus:border-white/30"
            />
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => void onSimulate()}
          disabled={loading || !hasValidTicker}
          className={cn(
            "flex items-center justify-between rounded-full pl-8 pr-2 py-2 transition",
            "bg-[#A6FF00] hover:bg-[#8fe000]",
            "disabled:cursor-not-allowed disabled:opacity-40",
          )}
        >
          <span className="text-xl font-medium tracking-[-0.6px] text-black">
            {loading ? "Carregando..." : "Simular dividendos"}
          </span>
          <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-black">
            <span
              className="material-symbols-outlined select-none leading-none text-[#A6FF00]"
              style={{ fontSize: 27, fontVariationSettings: "'opsz' 24, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
            >
              arrow_forward
            </span>
          </span>
        </button>
      </div>

      {/* ════════════════════════════════════════
          RIGHT PANEL — white, 3 sections
      ════════════════════════════════════════ */}
      {showResults && stock ? (
        <div className="flex flex-1 flex-col divide-y divide-[#E5E5E5] bg-white">

          {/* Section 1 — Preço atual */}
          {stock.regularMarketPrice != null && (
            <div className="flex flex-col gap-1 p-6">
              <p className="text-xs font-medium text-black">Preço atual da ação:</p>
              <Amount value={stock.regularMarketPrice} currency={currency} />
            </div>
          )}

          {/* Section 2 — Último dividendo */}
          {lastPayment && (
            <div className="flex flex-col gap-1 p-6">
              <p className="text-xs font-medium text-black">Último dividendo</p>
              <Amount value={lastPayment.totalForShares} currency={currency} />
              {lastPayment.paymentDate && (
                <p className="text-xs font-medium text-[#A3A3A3]">
                  Pago em {formatDatePt(lastPayment.paymentDate)}
                </p>
              )}
            </div>
          )}

          {/* Section 3 — Próximo pagamento (flex-1, footer no bottom) */}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-black">Próximo pagamento</p>
              {nextPayment ? (
                <>
                  <Amount value={nextPayment.totalForShares} currency={currency} highlight />
                  {nextPayment.paymentDate && (
                    <p className="text-xs font-medium text-[#A3A3A3]">
                      Previsto: {formatDatePt(nextPayment.paymentDate)}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-3xl font-light leading-none tracking-[-0.64px] text-[#A3A3A3]">
                  —
                </p>
              )}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs font-medium text-[#A3A3A3]">
                {perShareValue != null
                  ? `Cerca de ${formatBRL(perShareValue, currency)} por cota`
                  : "—"}
              </p>
              {displayTicker && (
                <Link
                  href={`/acoes/${displayTicker.toLowerCase()}`}
                  className="text-base font-normal text-black hover:underline no-underline"
                >
                  Mais sobre {displayTicker} →
                </Link>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* ── Placeholder / Error ── */
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white p-8 text-center">
          {error ? (
            <div className="flex flex-col items-center gap-2">
              <span
                className="material-symbols-outlined text-3xl leading-none text-neutral-300"
                style={{ fontVariationSettings: "'opsz' 32, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
              >
                info
              </span>
              <p className="text-sm font-medium text-neutral-600">
                {/bloqueia|token|plano pago/i.test(error)
                  ? "Este ticker precisa de autenticação na API."
                  : /não encontrado|inválido/i.test(error)
                  ? "Ticker não encontrado. Verifique se está correto."
                  : "Não foi possível buscar este ticker."}
              </p>
              {/bloqueia|token|plano pago/i.test(error) && (
                <p className="text-xs text-neutral-400">
                  Tente um ticker PN — ex.:{" "}
                  <strong>ITUB4</strong>, <strong>PETR4</strong>, <strong>VALE3</strong>
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-neutral-400">
              Informe um ticker e clique em
              <br />
              <span className="font-medium text-neutral-600">&ldquo;Simular dividendos&rdquo;</span>
            </p>
          )}
        </div>
      )}

    </div>
  );
}
