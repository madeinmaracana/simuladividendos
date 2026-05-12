"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTickerSuggestions } from "@/hooks/useTickerSuggestions";
import { SuggestionDropdown } from "@/components/ui/SuggestionDropdown";
import { ROUTES } from "@/lib/seo/constants";

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    suggestions,
    isOpen: sugOpen,
    setIsOpen: setSugOpen,
    highlight,
    setHighlight,
    wrapRef,
    pick,
    handleKeyDown,
  } = useTickerSuggestions(query, (ticker) => {
    navigate(ticker);
  });

  function navigate(ticker: string) {
    const t = ticker.trim().toUpperCase();
    if (!t) return;
    // FIIs end in 11 (heuristic) or 12, others are stocks
    const isFii = /\d{2}$/.test(t) && parseInt(t.slice(-2)) >= 11;
    router.push(isFii ? ROUTES.fii(t) : ROUTES.acao(t));
    onClose();
    setQuery("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") { onClose(); return; }
    if (e.key === "Enter" && !sugOpen) {
      navigate(query);
      return;
    }
    handleKeyDown(e);
  }

  // Auto-focus when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape at document level
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-20">
        <div
          className="w-full max-w-[600px] rounded-[24px] border border-white/10 p-6"
          style={{ background: "rgba(20,20,20,0.95)", backdropFilter: "blur(24px)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mb-3 text-[13px] font-medium text-[#808080]">Buscar ticker</p>

          {/* Input com sugestões */}
          <div className="relative" ref={wrapRef}>
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] px-4 py-[14px] focus-within:border-white/30">
              <span
                className="material-symbols-outlined shrink-0 text-[#808080] leading-none"
                style={{ fontSize: 20, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
              >
                search
              </span>
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={sugOpen && suggestions.length > 0}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""));
                  setSugOpen(true);
                }}
                onKeyDown={handleKey}
                placeholder="Ex.: BBAS3, MXRF11, VALE3…"
                maxLength={8}
                autoComplete="off"
                autoCapitalize="characters"
                className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-white outline-none placeholder:font-normal placeholder:text-[#808080]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setSugOpen(false); inputRef.current?.focus(); }}
                  className="shrink-0 text-[#808080] transition-opacity hover:opacity-60"
                  aria-label="Limpar"
                >
                  <span className="material-symbols-outlined leading-none" style={{ fontSize: 20 }}>close</span>
                </button>
              )}
            </div>

            <SuggestionDropdown
              suggestions={suggestions}
              isOpen={sugOpen}
              highlight={highlight}
              onHighlight={setHighlight}
              onPick={pick}
              theme="dark"
            />
          </div>

          {/* Hint */}
          <p className="mt-3 text-[11px] font-medium text-[#808080]">
            Pressione Enter para buscar · Esc para fechar
          </p>
        </div>
      </div>
    </>
  );
}
