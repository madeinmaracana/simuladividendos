"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

/* ── types ──────────────────────────────────────────────── */

type Suggestion = { symbol: string; name: string; logoUrl?: string | null };

function useDebouncedValue<T>(value: T, ms: number): T {
  const [d, setD] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setD(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return d;
}

/* ── props ──────────────────────────────────────────────── */

interface TickerInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Called when the user picks a suggestion (or just types) */
  onPick?: (symbol: string) => void;
}

/* ── component ───────────────────────────────────────────── */

export function TickerInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Ex.: PETR4",
  onPick,
}: TickerInputProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebouncedValue(value.trim(), 280);

  const fetchSuggestions = useCallback(async (q: string) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    try {
      const res = await fetch(`/api/ticker-suggestions?q=${encodeURIComponent(q)}`, {
        signal: ac.signal,
      });
      if (!res.ok) { setSuggestions([]); return; }
      const data = (await res.json()) as { suggestions?: Suggestion[] };
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (e) {
      if ((e as Error).name !== "AbortError") setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debouncedQuery.length < 2) { setSuggestions([]); setOpen(false); return; }
    void fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, fetchSuggestions]);

  useEffect(() => {
    if (suggestions.length > 0) setOpen(true);
    setHighlight(0);
  }, [suggestions]);

  /* close on outside click */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pick = (s: Suggestion) => {
    onChange(s.symbol);
    onPick?.(s.symbol);
    setOpen(false);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={wrapRef}>
      <label className={ui.label} htmlFor={id}>
        {label}
      </label>

      <div className="relative">
        <div
          className="flex items-center gap-2 rounded-[length:var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 shadow-[var(--shadow-sm)] transition focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand)]/20"
        >
          <input
            id={id}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open && suggestions.length > 0}
            value={value}
            onChange={(e) => {
              onChange(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (!suggestions.length) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlight((h) => Math.max(h - 1, 0));
              } else if (e.key === "Enter" && open && suggestions[highlight]) {
                e.preventDefault();
                pick(suggestions[highlight]!);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            placeholder={placeholder}
            maxLength={8}
            autoComplete="off"
            autoCapitalize="characters"
            className="h-[46px] flex-1 bg-transparent text-sm font-semibold uppercase outline-none placeholder:font-normal placeholder:normal-case placeholder:text-[var(--color-text-soft)]"
          />
          {loading && (
            <span className="text-xs text-[var(--color-text-soft)]">…</span>
          )}
        </div>

        {/* Dropdown */}
        {open && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-1 shadow-lg">
            {suggestions.map((s, i) => (
              <li
                key={s.symbol}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                  i === highlight
                    ? "bg-[var(--brand)]/10 text-[var(--color-text)]"
                    : "hover:bg-[var(--color-surface-muted)]"
                )}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(s)}
              >
                {s.logoUrl ? (
                  <Image
                    src={s.logoUrl}
                    alt={s.symbol}
                    width={28}
                    height={28}
                    unoptimized
                    className="h-7 w-7 shrink-0 rounded-lg bg-white object-contain p-0.5"
                  />
                ) : (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface-muted)] text-xs font-semibold text-[var(--color-text-muted)]">
                    {s.symbol.slice(0, 2)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[var(--color-text)]">{s.symbol}</span>
                  <span className="mt-0.5 block truncate text-xs text-[var(--color-text-muted)]">
                    {s.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
