"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getLastDividendPayment, getNextScheduledDividend } from "@/lib/calculations";
import type { StockQuote } from "@/lib/types";

export function useDividendSimulator(
  ticker: string,
  initialStock: StockQuote | null | undefined,
  serverError: string | null | undefined,
  defaultShares: number
) {
  const [sharesStr, setSharesStr] = useState(String(defaultShares));
  const [stock, setStock] = useState<StockQuote | null>(initialStock ?? null);
  const [error, setError] = useState<string | null>(serverError ?? null);
  const [loading, setLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(Boolean(initialStock && !serverError));

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

  const onSimulate = useCallback(async () => {
    const t = ticker.trim();
    if (!t) {
      setError("Informe um ticker para simular.");
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
