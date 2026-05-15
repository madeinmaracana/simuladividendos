"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildComparSlug } from "@/lib/comparar";
import { TickerLogo } from "@/components/ui/TickerLogo";
import { SuggestionDropdown } from "@/components/ui/SuggestionDropdown";
import { useTickerSuggestions } from "@/hooks/useTickerSuggestions";
import { SiteNav } from "@/components/layout/SiteNav";

/**
 * Hero escuro para a página /comparar — Figma node-id=52-740.
 * Frame 82: padding 24px top / 120px bottom, gap 120px (nav ↔ conteúdo), align-items center.
 * Conteúdo 980px: Frame 84 (eyebrow + título + subtítulo, gap 40px) + form (gap 40px entre blocos).
 */
export function ComparHero() {
  const router = useRouter();
  const [tickerA, setTickerA] = useState("");
  const [tickerB, setTickerB] = useState("");
  const [error, setError] = useState("");

  const sugA = useTickerSuggestions(tickerA, (s) => setTickerA(s));
  const sugB = useTickerSuggestions(tickerB, (s) => setTickerB(s));

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
    <section
      className="flex w-full flex-col items-center rounded-[32px]"
      style={{
        backgroundImage: "url(/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#2A2A2A",
        paddingTop: 24,
        paddingBottom: 120,
        gap: 120,
      }}
    >
      <SiteNav />

      {/* Conteúdo 980px */}
      <div
        className="flex w-full flex-col px-4"
        style={{ maxWidth: 980, gap: 40 }}
      >
        {/* Copy block — eyebrow + título + subtítulo */}
        <div className="flex flex-col" style={{ gap: 40 }}>
          <p className="text-[13px] font-medium text-[#808080]">Comparador</p>
          <div className="flex flex-col" style={{ gap: 32 }}>
            <h1
              className="text-white"
              style={{ fontSize: 56, fontWeight: 300, lineHeight: "63px" }}
            >
              Compare dividendos de duas ações
            </h1>
            <p
              className="text-white"
              style={{ fontSize: 24, fontWeight: 300, lineHeight: "normal" }}
            >
              Escolha dois tickers e veja lado a lado qual pagou mais nos últimos 12 meses, o
              dividend yield estimado e o histórico de proventos.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          {/* Ativo A */}
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-[13px] font-medium text-[#808080]">Ativo A</label>
            <div className="relative" ref={sugA.wrapRef}>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] transition focus-within:border-white/30">
                <TickerLogo ticker={tickerA.trim().toUpperCase() || "?"} size={24} theme="dark" />
                <input
                  type="text"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={sugA.isOpen && sugA.suggestions.length > 0}
                  value={tickerA}
                  onChange={(e) => {
                    setTickerA(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                    sugA.setIsOpen(true);
                  }}
                  onKeyDown={sugA.handleKeyDown}
                  placeholder="Ex. BBAS3"
                  maxLength={8}
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-[16px] font-normal text-white outline-none placeholder:text-[#808080]"
                />
                {sugA.isLoading && <span className="shrink-0 text-xs text-[#808080]">…</span>}
              </div>
              <SuggestionDropdown
                suggestions={sugA.suggestions}
                isOpen={sugA.isOpen}
                highlight={sugA.highlight}
                onHighlight={sugA.setHighlight}
                onPick={sugA.pick}
                theme="dark"
              />
            </div>
          </div>

          {/* Ativo B */}
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-[13px] font-medium text-[#808080]">Ativo B</label>
            <div className="relative" ref={sugB.wrapRef}>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] transition focus-within:border-white/30">
                <TickerLogo ticker={tickerB.trim().toUpperCase() || "?"} size={24} theme="dark" />
                <input
                  type="text"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={sugB.isOpen && sugB.suggestions.length > 0}
                  value={tickerB}
                  onChange={(e) => {
                    setTickerB(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                    sugB.setIsOpen(true);
                  }}
                  onKeyDown={sugB.handleKeyDown}
                  placeholder="Ex. BBAS3"
                  maxLength={8}
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-[16px] font-normal text-white outline-none placeholder:text-[#808080]"
                />
                {sugB.isLoading && <span className="shrink-0 text-xs text-[#808080]">…</span>}
              </div>
              <SuggestionDropdown
                suggestions={sugB.suggestions}
                isOpen={sugB.isOpen}
                highlight={sugB.highlight}
                onHighlight={sugB.setHighlight}
                onPick={sugB.pick}
                theme="dark"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-2 sm:self-end">
            <label className="hidden text-[13px] sm:block">&nbsp;</label>
            <button
              type="submit"
              className="flex items-center gap-3 rounded-full bg-white px-6 py-[14px] text-base font-medium text-black transition hover:bg-white/90"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black">
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
        </form>

        {error && (
          <p className="text-[13px] font-medium text-red-400">{error}</p>
        )}
      </div>
    </section>
  );
}
