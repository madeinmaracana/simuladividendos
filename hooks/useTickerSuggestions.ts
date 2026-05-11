"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ── types ─────────────────────────────────────────────── */

export type TickerSuggestion = {
  symbol: string;
  name: string;
  logoUrl?: string | null;
};

/* ── internal ───────────────────────────────────────────── */

function useDebouncedValue<T>(value: T, ms: number): T {
  const [d, setD] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setD(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return d;
}

/* ── hook ───────────────────────────────────────────────── */

/**
 * Gerencia busca de sugestões de tickers com debounce, aborto de requests,
 * navegação por teclado e fechamento ao clicar fora.
 *
 * @param query   - valor atual do input (não debounced)
 * @param onSelect - chamado quando o usuário escolhe uma sugestão
 *
 * @example
 * const { suggestions, isOpen, highlight, setHighlight, isLoading,
 *         wrapRef, pick, handleKeyDown } = useTickerSuggestions(ticker, setTicker);
 */
export function useTickerSuggestions(
  query: string,
  onSelect: (symbol: string) => void,
) {
  const [suggestions, setSuggestions] = useState<TickerSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebouncedValue(query.trim(), 280);

  /* ── fetch ── */
  const fetchSuggestions = useCallback(async (q: string) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/ticker-suggestions?q=${encodeURIComponent(q)}`,
        { signal: ac.signal },
      );
      if (!res.ok) { setSuggestions([]); return; }
      const data = (await res.json()) as { suggestions?: TickerSuggestion[] };
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.length < 2) { setSuggestions([]); setIsOpen(false); return; }
    void fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, fetchSuggestions]);

  useEffect(() => {
    if (suggestions.length > 0) setIsOpen(true);
    setHighlight(0);
  }, [suggestions]);

  /* ── click outside ── */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* ── actions ── */
  const pick = useCallback(
    (s: TickerSuggestion) => {
      onSelect(s.symbol);
      setIsOpen(false);
      setSuggestions([]);
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!suggestions.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter" && isOpen && suggestions[highlight]) {
        e.preventDefault();
        pick(suggestions[highlight]!);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    [suggestions, isOpen, highlight, pick],
  );

  return {
    suggestions,
    isOpen,
    setIsOpen,
    highlight,
    setHighlight,
    isLoading,
    wrapRef,
    pick,
    handleKeyDown,
  };
}
