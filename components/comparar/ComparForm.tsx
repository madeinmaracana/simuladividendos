"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildComparSlug } from "@/lib/comparar";
import { useTickerSuggestions } from "@/hooks/useTickerSuggestions";
import { SuggestionDropdown } from "@/components/ui/SuggestionDropdown";

function ComparTickerInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const { suggestions, isOpen, setIsOpen, highlight, setHighlight, wrapRef, pick, handleKeyDown } =
    useTickerSuggestions(value, onChange);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2" ref={wrapRef}>
      <label htmlFor={id} className="text-[13px] font-medium text-[#808080]">
        {label}
      </label>
      <div className="relative">
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
          placeholder={placeholder ?? "Ex.: PETR4"}
          maxLength={8}
          autoComplete="off"
          autoCapitalize="characters"
          className="w-full rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] text-[13px] font-medium uppercase text-white outline-none placeholder:font-normal placeholder:normal-case placeholder:text-[#808080] focus:border-white/30"
        />
        <SuggestionDropdown
          suggestions={suggestions}
          isOpen={isOpen && suggestions.length > 0}
          highlight={highlight}
          onHighlight={setHighlight}
          onPick={pick}
          theme="dark"
        />
      </div>
    </div>
  );
}

export function ComparForm() {
  const router = useRouter();
  const [tickerA, setTickerA] = useState("");
  const [tickerB, setTickerB] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const a = tickerA.trim().toUpperCase();
    const b = tickerB.trim().toUpperCase();
    if (!a || !b) { setError("Informe os dois tickers."); return; }
    if (a === b) { setError("Escolha dois tickers diferentes."); return; }
    setError("");
    router.push(`/comparar/${buildComparSlug(a, b)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-[24px] border border-white/10 p-6"
      style={{ background: "rgba(111,111,111,0.18)", backdropFilter: "blur(16px)" }}
    >
      {/* Inputs + button in a row */}
      <div className="flex flex-col items-end gap-4 sm:flex-row">
        <ComparTickerInput
          id="ticker-a"
          label="Ativo A"
          value={tickerA}
          onChange={setTickerA}
          placeholder="Ex.: PETR4"
        />
        <ComparTickerInput
          id="ticker-b"
          label="Ativo B"
          value={tickerB}
          onChange={setTickerB}
          placeholder="Ex.: VALE3"
        />
        {/* Button sits at the bottom of the row (aligned with inputs) */}
        <button
          type="submit"
          className="flex shrink-0 items-center gap-3 rounded-full bg-[#E5FE86] px-6 py-[14px] text-[13px] font-medium text-black transition-opacity hover:opacity-80"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black"
          >
            <span
              className="material-symbols-outlined leading-none text-white"
              style={{ fontSize: 16, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
            >
              arrow_forward
            </span>
          </span>
          Comparar
        </button>
      </div>

      {error && (
        <p className="text-[13px] font-medium text-red-400">{error}</p>
      )}
    </form>
  );
}
