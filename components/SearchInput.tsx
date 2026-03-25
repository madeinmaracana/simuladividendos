"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { ui } from "@/components/ui/classes";
import { cn } from "@/lib/cn";

type TickerSuggestion = {
  symbol: string;
  name: string;
  logoUrl?: string | null;
};

/** Metadados da escolha na lista ou sincronizados após carregar o ativo. */
export type TickerSelectionMeta = {
  name: string;
  logoUrl?: string | null;
};

interface SearchInputProps {
  id?: string;
  value: string;
  /** `selectionMeta` só na escolha da lista; omitir ao digitar para o pai limpar o estado visual. */
  onChange: (value: string, selectionMeta?: TickerSelectionMeta) => void;
  disabled?: boolean;
  placeholder?: string;
  /** Quando false, oculta a dica abaixo do campo (layout compacto no simulador). */
  showHelperText?: boolean;
  label?: string;
  /** Enriquece o campo após seleção (logo à esquerda + nome abaixo). */
  selectionMeta?: TickerSelectionMeta | null;
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
  showHelperText = true,
  label = "Ticker da ação",
  selectionMeta = null,
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

  const pick = (s: TickerSuggestion) => {
    onChange(s.symbol, { name: s.name, logoUrl: s.logoUrl });
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={wrapRef}>
      <label htmlFor={id} className={ui.label}>
        {label}
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
              pick(suggestions[highlight]!);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className={cn(
            ui.input,
            "min-h-[52px] py-3 text-base font-medium",
            selectionMeta && value.trim().length > 0 && "pl-12 sm:pl-[3.25rem]"
          )}
        />

        {selectionMeta && value.trim().length > 0 ? (
          <span className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2">
            {selectionMeta.logoUrl ? (
              <Image
                src={selectionMeta.logoUrl}
                alt=""
                width={28}
                height={28}
                unoptimized
                className="h-7 w-7 rounded-md bg-white object-contain p-0.5 ring-1 ring-neutral-200 dark:bg-neutral-800 dark:ring-neutral-600 sm:h-8 sm:w-8"
              />
            ) : (
              <span
                className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-[10px] font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400 sm:h-8 sm:w-8"
                aria-hidden
              >
                {value.trim().slice(0, 2)}
              </span>
            )}
          </span>
        ) : null}

        {loading ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400">
            …
          </span>
        ) : null}

        {showList ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[length:var(--radius-input)] border border-[var(--border)] bg-[var(--card)] py-1 shadow-lg dark:shadow-xl"
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
                onClick={() => pick(s)}
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
      {selectionMeta && value.trim().length > 0 && selectionMeta.name ? (
        <p className={cn(ui.bodyMuted, "line-clamp-2 sm:line-clamp-1")} title={selectionMeta.name}>
          {selectionMeta.name}
        </p>
      ) : null}

      {showHelperText && !(selectionMeta && value.trim().length > 0) ? (
        <p className={ui.bodyMuted}>
          Digite ao menos 2 letras para ver sugestões de ações (dados da brapi).
        </p>
      ) : null}
    </div>
  );
}
