"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";

type TickerSuggestion = {
  symbol: string;
  name: string;
  logoUrl?: string | null;
};

interface SearchInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export function SearchInput({
  id: idProp,
  value,
  onChange,
  disabled,
  placeholder = "Ex.: PETR4",
}: SearchInputProps) {
  const reactId = useId();
  const id = idProp ?? `ticker-${reactId}`;
  const listId = `${id}-suggestions`;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<TickerSuggestion[]>([]);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebouncedValue(value.trim(), 280);

  const fetchSuggestions = useCallback(async (q: string) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/ticker-suggestions?q=${encodeURIComponent(q)}`,
        { signal: ac.signal }
      );
      if (!res.ok) {
        setSuggestions([]);
        return;
      }
      const data = (await res.json()) as { suggestions?: TickerSuggestion[] };
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (disabled) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    void fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, disabled, fetchSuggestions]);

  useEffect(() => {
    setHighlight(0);
  }, [suggestions]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const showList = open && suggestions.length > 0 && !disabled;

  const pick = (symbol: string) => {
    onChange(symbol);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={wrapRef}>
      <label htmlFor={id} className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
        Ticker da ação
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={
            showList && suggestions[highlight]
              ? `${listId}-option-${highlight}`
              : undefined
          }
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value.toUpperCase());
            setOpen(true);
          }}
          onFocus={() => {
            if (suggestions.length > 0) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (!suggestions.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlight((h) => Math.max(h - 1, 0));
            } else if (e.key === "Enter" && open && suggestions[highlight]) {
              e.preventDefault();
              pick(suggestions[highlight]!.symbol);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-neutral-900 shadow-sm outline-none ring-teal-500/30 placeholder:text-neutral-400 focus:border-teal-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />

        {loading ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
            …
          </span>
        ) : null}

        {showList ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
          >
            {suggestions.map((s, i) => (
              <li
                key={s.symbol}
                id={`${listId}-option-${i}`}
                role="option"
                aria-selected={i === highlight}
                className={`flex cursor-pointer items-center gap-2 px-2 py-1.5 text-sm ${
                  i === highlight
                    ? "bg-teal-50 text-teal-900 dark:bg-teal-950/50 dark:text-teal-100"
                    : "text-neutral-800 dark:text-neutral-200"
                }`}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(s.symbol)}
              >
                {s.logoUrl ? (
                  <Image
                    src={s.logoUrl}
                    alt={`Logo ${s.symbol}`}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 shrink-0 rounded-md bg-white object-contain p-0.5 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-600"
                  />
                ) : (
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-[10px] font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    aria-hidden
                  >
                    {s.symbol.slice(0, 2)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <span className="font-semibold tabular-nums">{s.symbol}</span>
                  <span className="mt-0.5 block truncate text-xs font-normal text-neutral-500 dark:text-neutral-400">
                    {s.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Digite ao menos 2 letras para ver sugestões de ações (dados da brapi).
      </p>
    </div>
  );
}
