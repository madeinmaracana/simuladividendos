"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getLastDividendPayment, getNextScheduledDividend } from "@/lib/calculations";
import type { StockQuote } from "@/lib/types";

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export type DividendSimulatorVariant = "home" | "homeManual" | "tickerPage" | "fixedTicker";

const MIN_TICKER_LEN = 4;

export function useDividendSimulator(
  ticker: string,
  initialStock: StockQuote | null | undefined,
  serverError: string | null | undefined,
  defaultShares: number,
  variant: DividendSimulatorVariant = "home"
) {
  const [sharesStr, setSharesStr] = useState(String(defaultShares));
  const [stock, setStock] = useState<StockQuote | null>(initialStock ?? null);
  const [error, setError] = useState<string | null>(serverError ?? null);
  const [loading, setLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(Boolean(initialStock && !serverError));

  const abortRef = useRef<AbortController | null>(null);

  const normalizedTicker = ticker.trim().toUpperCase();
  const debouncedTicker = useDebouncedValue(normalizedTicker, variant === "home" ? 480 : 0);
  /** Na home automática, só o valor debounced dispara fetch (evita requisição a cada tecla). */
  const fetchTriggerTicker = variant === "home" ? debouncedTicker : normalizedTicker;

  const loadStock = useCallback(async (t: string) => {
    const up = t.trim().toUpperCase();
    if (!up) {
      setError("Informe um ticker válido.");
      return;
    }
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/stock/${encodeURIComponent(up)}`, { signal: ac.signal });
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
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setError("Falha de rede. Tente novamente.");
      setStock(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const shares = useMemo(() => {
    const n = parseInt(sharesStr, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [sharesStr]);

  const currency = stock?.currency ?? "BRL";

  const lastPayment = useMemo(() => {
    if (!stock?.dividends?.length || !didSubmit) return null;
    return getLastDividendPayment(stock.dividends, shares);
  }, [stock, shares, didSubmit]);

  const nextPayment = useMemo(() => {
    if (!stock?.dividends?.length || !didSubmit) return null;
    return getNextScheduledDividend(stock.dividends, shares);
  }, [stock, shares, didSubmit]);

  const hasDividendRows = Boolean(stock?.dividends.length);
  const showResults = Boolean(didSubmit && stock);

  useEffect(() => {
    setError(serverError ?? null);
  }, [serverError]);

  useEffect(() => {
    if (initialStock && !serverError) {
      setStock(initialStock);
      setDidSubmit(true);
    }
  }, [initialStock, serverError]);

  const tickerRef = useRef(ticker);
  useEffect(() => {
    if (tickerRef.current !== ticker) {
      tickerRef.current = ticker;
      if (!initialStock) {
        setStock(null);
        setDidSubmit(false);
      }
    }
  }, [ticker, initialStock]);

  useEffect(() => {
    if (variant === "tickerPage" || variant === "homeManual") return;

    const autoTicker = fetchTriggerTicker;

    if (autoTicker.length < MIN_TICKER_LEN) {
      if (variant === "home" && autoTicker.length === 0) {
        setStock(null);
        setDidSubmit(false);
      }
      return;
    }

    if (
      variant === "fixedTicker" &&
      initialStock &&
      !serverError &&
      initialStock.symbol.toUpperCase() === autoTicker
    ) {
      return;
    }

    if (
      variant === "home" &&
      initialStock &&
      !serverError &&
      initialStock.symbol.toUpperCase() === autoTicker
    ) {
      return;
    }

    void loadStock(autoTicker);
  }, [variant, fetchTriggerTicker, initialStock, serverError, loadStock]);

  const onSimulate = useCallback(() => {
    void loadStock(normalizedTicker);
  }, [loadStock, normalizedTicker]);

  return {
    sharesStr,
    setSharesStr,
    stock,
    error,
    loading,
    showResults,
    currency,
    lastPayment,
    nextPayment,
    hasDividendRows,
    onSimulate,
  };
}
