"use client";

import { ui } from "@/components/ui/classes";
import { SuggestionDropdown } from "@/components/ui/SuggestionDropdown";
import { useTickerSuggestions } from "@/hooks/useTickerSuggestions";

interface TickerInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/** Input de ticker com autocomplete — tema claro, para uso em formulários. */
export function TickerInput({
  id,
  label,
  value,
  onChange,
  placeholder = "Ex.: PETR4",
}: TickerInputProps) {
  const { suggestions, isOpen, setIsOpen, highlight, setHighlight, isLoading, wrapRef, pick, handleKeyDown } =
    useTickerSuggestions(value, onChange);

  return (
    <div className="flex flex-col gap-1.5" ref={wrapRef}>
      <label className={ui.label} htmlFor={id}>
        {label}
      </label>

      <div className="relative">
        <div className="flex items-center gap-2 rounded-[length:var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 shadow-[var(--shadow-sm)] transition focus-within:border-[var(--brand)] focus-within:ring-2 focus-within:ring-[var(--brand)]/20">
          <input
            id={id}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen && suggestions.length > 0}
            value={value}
            onChange={(e) => {
              onChange(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={8}
            autoComplete="off"
            autoCapitalize="characters"
            className="h-[46px] flex-1 bg-transparent text-sm font-semibold uppercase outline-none placeholder:font-normal placeholder:normal-case placeholder:text-[var(--color-text-soft)]"
          />
          {isLoading && (
            <span className="text-xs text-[var(--color-text-soft)]">…</span>
          )}
        </div>

        <SuggestionDropdown
          suggestions={suggestions}
          isOpen={isOpen}
          highlight={highlight}
          onHighlight={setHighlight}
          onPick={pick}
          theme="light"
        />
      </div>
    </div>
  );
}
