"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { calculateDividends } from "@/lib/calculations";
import type { StockQuote } from "@/lib/types";
import { formatBRL, formatDatePt } from "@/lib/format";
import { DividendTable } from "./DividendTable";
import { ResultsCard } from "./ResultsCard";
import { SearchInput } from "./SearchInput";
import { SharesInput } from "./SharesInput";

const EXAMPLES = ["PETR4", "VALE3", "ITUB4"] as const;

type DividendCalculatorProps = {
  initialTicker?: string;
  initialStock?: StockQuote | null;
  serverError?: string | null;
  defaultShares?: number;
  showBackLink?: boolean;
};

export function DividendCalculator({
  initialTicker = "",
  initialStock = null,
  serverError = null,
  defaultShares = 100,
  showBackLink = false,
}: DividendCalculatorProps) {
  const [ticker, setTicker] = useState(initialTicker);
  const [sharesStr, setSharesStr] = useState(String(defaultShares));
  const [stock, setStock] = useState<StockQuote | null>(initialStock);
  const [error, setError] = useState<string | null>(serverError);
  const [loading, setLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(Boolean(initialStock && !serverError));

  const shares = useMemo(() => {
    const n = parseInt(sharesStr, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [sharesStr]);

  const calculation = useMemo(() => {
    if (!stock || !didSubmit) return null;
    return calculateDividends(stock.dividends, shares);
  }, [stock, shares, didSubmit]);

  const onCalculate = useCallback(async () => {
    const t = ticker.trim();
    if (!t) {
      setError("Informe um ticker.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stock/${encodeURIComponent(t)}`);
      const data: { stock?: StockQuote; error?: string } = await res.json();
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Não foi possível carregar o ativo.");
        setStock(null);
        setDidSubmit(true);
        return;
      }
      if (data.stock) {
        setStock(data.stock);
        setDidSubmit(true);
      }
    } catch {
      setError("Falha de rede. Tente novamente.");
      setStock(null);
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  const currency = stock?.currency ?? "BRL";
  const hasDividends = Boolean(stock?.dividends.length);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10">
      {showBackLink ? (
        <Link
          href="/"
          className="text-sm font-medium text-teal-700 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
        >
          ← Voltar ao início
        </Link>
      ) : null}

      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <SearchInput value={ticker} onChange={setTicker} disabled={loading} />
          <SharesInput value={sharesStr} onChange={setSharesStr} disabled={loading} />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => void onCalculate()}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Carregando…" : "Calcular estimativas"}
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Exemplos:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                disabled={loading}
                onClick={() => setTicker(ex)}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:border-teal-300 hover:bg-teal-50 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-teal-700 dark:hover:bg-neutral-800/80"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <p
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </section>

      {stock && didSubmit ? (
        <section aria-labelledby="heading-estimativas" className="flex flex-col gap-10">
          <h2
            id="heading-estimativas"
            className="text-center text-lg font-semibold text-neutral-800 dark:text-neutral-200"
          >
            Estimativas e histórico
          </h2>

          <header className="flex flex-col gap-1 border-b border-neutral-200 pb-6 dark:border-neutral-800">
            <div className="flex flex-wrap items-center gap-3">
              {stock.logoUrl ? (
                <Image
                  src={stock.logoUrl}
                  alt={`Logotipo ${stock.symbol}`}
                  width={48}
                  height={48}
                  unoptimized
                  className="h-12 w-12 shrink-0 rounded-xl bg-white object-contain p-1 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-600"
                />
              ) : null}
              <div className="flex min-w-0 flex-wrap items-baseline gap-2">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {stock.longName ?? stock.shortName}
                </h3>
                <Link
                  href={`/acoes/${encodeURIComponent(stock.symbol)}`}
                  className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
                >
                  {stock.symbol}
                </Link>
              </div>
            </div>
            {typeof stock.regularMarketPrice === "number" ? (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Cotação de referência (não é garantia de rendimento):{" "}
                <span className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                  {formatBRL(stock.regularMarketPrice, currency)}
                </span>
              </p>
            ) : null}
          </header>

          {!hasDividends ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
              Não há dados de proventos para este ativo na fonte consultada. As estimativas abaixo
              ficam zeradas ou indisponíveis — isso não significa que a empresa não pague dividendos.
            </p>
          ) : null}

          {calculation ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultsCard
                title={
                  calculation.nextDividend?.isFuture
                    ? "Próximo pagamento anunciado (por cota)"
                    : "Último pagamento registrado (por cota)"
                }
                value={
                  calculation.nextDividend
                    ? formatBRL(calculation.nextDividend.totalForShares, currency)
                    : "—"
                }
                subtitle={
                  calculation.nextDividend
                    ? `Data de pagamento (estim.): ${formatDatePt(calculation.nextDividend.paymentDate)} · ${formatBRL(calculation.nextDividend.totalPerShare, currency)} por cota × ${calculation.shares} cotas`
                    : "Sem eventos de pagamento identificados na lista retornada."
                }
              />
              <ResultsCard
                title="Total de proventos nos últimos 12 meses"
                value={formatBRL(calculation.total12mEstimate, currency)}
                subtitle={`Soma por cota no período (estim.): ${formatBRL(calculation.perShare12m, currency)} × ${calculation.shares} cotas`}
              />
              <ResultsCard
                title="Média mensal (últimos 12 meses)"
                value={formatBRL(calculation.monthlyAvgEstimate, currency)}
                subtitle="Média simples: total do período dividido por 12. Não indica pagamento mensal fixo."
              />
              <ResultsCard
                title="Projeção anual (base: últimos 12 meses)"
                value={formatBRL(calculation.annualEstimate, currency)}
                subtitle="Extrapolação do histórico recente; o futuro pode ser diferente."
              />
            </div>
          ) : null}

          <section className="flex flex-col gap-3" aria-labelledby="heading-proventos">
            <h4
              id="heading-proventos"
              className="text-lg font-semibold text-neutral-900 dark:text-neutral-50"
            >
              Proventos recentes
            </h4>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Lista baseada nos dados retornados pela API (valores por cota são estimativas).
            </p>
            <DividendTable rows={calculation?.recentDividends ?? []} currency={currency} />
          </section>
        </section>
      ) : null}

      <p className="text-center text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        Esta é uma estimativa baseada no histórico. Dividendos não são garantidos.
      </p>
    </div>
  );
}
