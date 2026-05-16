"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTickerSuggestions } from "@/hooks/useTickerSuggestions";
import { TickerLogo } from "@/components/ui/TickerLogo";
import { LabTickerRow, LAB_COL_WIDTHS } from "./LabTickerRow";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { SectorChipsSection } from "./SectorChipsSection";

/* ── helpers ──────────────────────────────────────────────── */

function formatAmount(n: number): string {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseAmountInput(raw: string): number {
  const normalized = raw.replace(/\./g, "").replace(",", ".");
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/* ── column header style ──────────────────────────────────── */

const COL_LABEL_STYLE: React.CSSProperties = {
  fontSize: 10,
  color: "#808080",
  fontWeight: 400,
};

/*
 * Estratégia de scroll da tabela:
 * – Mobile (<640px): overflow-x-auto → scroll horizontal.
 *   A classe .lab-table-inner aplica min-width:972px só neste breakpoint.
 * – Desktop (≥640px): overflow-x-visible → botão X absoluto (right:-48px)
 *   não é cortado; flex-1 na coluna do nome adapta a largura.
 * paddingRight:56 reserva espaço para o botão X do desktop.
 */

/* ── AddTickerRow ─────────────────────────────────────────── */

interface AddTickerRowProps {
  onAdd: (symbol: string) => void;
  onCancel: () => void;
}

function AddTickerRow({ onAdd, onCancel }: AddTickerRowProps) {
  const [query, setQuery] = useState("");

  const handleSelect = useCallback((symbol: string) => { onAdd(symbol); }, [onAdd]);

  const { suggestions, isOpen, highlight, setHighlight, pick, handleKeyDown, wrapRef } =
    useTickerSuggestions(query, handleSelect);

  /* Fecha o row inteiro ao clicar fora */
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        onCancel();
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [onCancel, wrapRef]);

  const handleKeyDownExtended = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") { onCancel(); return; }
      handleKeyDown(e);
    },
    [handleKeyDown, onCancel],
  );

  return (
    <div
      ref={wrapRef}
      className="w-full bg-white overflow-hidden"
      style={{ borderRadius: 12, marginTop: 1 }}
    >
      {/* Linha de busca */}
      <div
        className="flex items-center"
        style={{ height: 56, padding: "0 16px", gap: 12 }}
      >
        <span
          className="material-symbols-outlined shrink-0 leading-none"
          style={{ fontSize: 18, color: "#808080", fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
        >
          search
        </span>

        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDownExtended}
          placeholder="Buscar ticker… (ex: PETR4)"
          className="flex-1 bg-transparent text-[16px] font-normal text-[#111827] placeholder:text-[#808080] outline-none"
        />

        <button
          type="button"
          onClick={onCancel}
          aria-label="Fechar busca"
          className="flex shrink-0 h-6 w-6 items-center justify-center rounded-full text-[#808080] hover:text-[#111827] bg-transparent border-none cursor-pointer p-0 transition-colors"
        >
          <span
            className="material-symbols-outlined leading-none"
            style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
          >
            close
          </span>
        </button>
      </div>

      {/* Sugestões inline */}
      {isOpen && suggestions.length > 0 && (
        <ul className="m-0 p-0 list-none" style={{ borderTop: "1px solid #E5E7EC" }}>
          {suggestions.map((s, i) => (
            <li
              key={s.symbol}
              className="flex items-center cursor-pointer transition-colors"
              style={{
                height: 56,
                padding: "0 16px",
                gap: 12,
                background: i === highlight ? "#E5E7EC" : "#FFF",
              }}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(s)}
            >
              <TickerLogo ticker={s.symbol} size={24} theme="light" />
              <div className="flex flex-col min-w-0">
                <span style={{ fontSize: 16, fontWeight: 400, color: "#111827", lineHeight: 1.2 }}>
                  {s.symbol}
                </span>
                {s.name && (
                  <span className="truncate" style={{ fontSize: 12, fontWeight: 400, color: "#808080", lineHeight: 1.2 }}>
                    {s.name}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── LabComparador ────────────────────────────────────────── */

interface SectorChip {
  label: string;
  href: string;
}

interface LabComparadorProps {
  defaultTickers?: string[];
  heroTitle?: string;
  heroDescription?: string;
  sectorChips?: { title: string; items: SectorChip[] };
}

export function LabComparador({
  defaultTickers = ["BBAS3", "ITUB4", "VALE3", "EGIE3"],
  heroTitle = "Compare quanto cada ativo paga em dividendos.",
  heroDescription = "Simule aportes e compare a renda passiva dos principais ativos da bolsa.",
  sectorChips,
}: LabComparadorProps = {}) {
  const [investment, setInvestment] = useState(2000);
  const [editingAmount, setEditingAmount] = useState(false);
  const [rawInput, setRawInput] = useState("");
  const [tickers, setTickers] = useState(defaultTickers);
  const [addingTicker, setAddingTicker] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /* ── amount editing ── */

  const startEditing = useCallback(() => {
    setRawInput(investment.toString());
    setEditingAmount(true);
    setTimeout(() => inputRef.current?.select(), 0);
  }, [investment]);

  const commitEdit = useCallback(() => {
    const parsed = parseAmountInput(rawInput);
    if (parsed > 0) setInvestment(parsed);
    setEditingAmount(false);
  }, [rawInput]);

  const cancelEdit = useCallback(() => { setEditingAmount(false); }, []);

  const handleAmountKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") commitEdit();
      else if (e.key === "Escape") cancelEdit();
    },
    [commitEdit, cancelEdit],
  );

  /* ── ticker management ── */

  const handleAddTicker = useCallback(
    (symbol: string) => {
      if (!tickers.includes(symbol)) setTickers((prev) => [...prev, symbol]);
      setAddingTicker(false);
    },
    [tickers],
  );

  const handleRemoveTicker = useCallback((ticker: string) => {
    setTickers((prev) => prev.filter((t) => t !== ticker));
  }, []);

  /* ── render ── */

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F4F6]">
      <div className="mx-auto w-full max-w-[969px] px-4 pt-8 flex flex-col" style={{ gap: 80, paddingBottom: 320 }}>

        {/* ── Header / Nav ── */}
        {/*
         * display:contents faz o <header> não criar box próprio,
         * preservando o gap do flex-col pai sem alterar o layout visual.
         */}
        <header style={{ display: "contents" }}>
          <SiteNav />
        </header>

        {/* ── Conteúdo principal ── */}
        <main style={{ display: "contents" }}>

        {/* ── Hero ── */}
        <div className="flex flex-col w-full" style={{ gap: 16 }}>
          <h1
            className="text-[28px] sm:text-[40px] lg:text-[52px]"
            style={{
              margin: 0,
              fontFamily: "var(--font-inter, Inter), sans-serif",
              fontWeight: 400,
              color: "#000",
              lineHeight: "normal",
              letterSpacing: "-1.04px",
            }}
          >
            {heroTitle}
          </h1>
          <p
            className="text-[16px] sm:text-[20px] lg:text-[24px]"
            style={{
              margin: 0,
              fontFamily: "var(--font-inter, Inter), sans-serif",
              fontWeight: 400,
              color: "#808080",
              lineHeight: "normal",
              letterSpacing: "-0.48px",
            }}
          >
            {heroDescription}
          </p>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col w-full" style={{ gap: 40 }}>

          {/* Investment section */}
          <div className="flex flex-col w-full" style={{ gap: 8 }}>
            <p style={{ fontSize: 16, color: "#000", fontWeight: 400, margin: 0 }}>
              Valor do investimento
            </p>

            {/* Estrutura única — sem troca de layout */}
            <div className="flex items-baseline gap-3" style={{ width: editingAmount ? "100%" : undefined }}>
              <span className="lab-currency" style={{ fontWeight: 200, lineHeight: "normal", color: "#00C66E" }}>
                R$
              </span>

              {/* Box: fundo e padding horizontal aparecem no edit */}
              <div
                style={{
                  display: editingAmount ? "grid" : "inline-grid",
                  flex: editingAmount ? 1 : undefined,
                  position: "relative",
                  borderRadius: 16,
                  background: editingAmount ? "#E5E7EC" : "transparent",
                  padding: editingAmount ? "0 16px" : "0",
                }}
              >
                {/* Mirror span: reserva largura + espaço para o hint quando editando */}
                <span
                  aria-hidden
                  className="lab-amount numeric-slashed"
                  style={{
                    gridArea: "1/1",
                    visibility: "hidden",
                    pointerEvents: "none",
                    whiteSpace: "pre",
                    fontWeight: 600,
                    lineHeight: "normal",
                    minWidth: "1ch",
                    paddingRight: editingAmount ? 80 : 0,
                  }}
                >
                  {editingAmount ? (rawInput || "0") : formatAmount(investment)}
                </span>

                {editingAmount ? (
                  <input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    inputMode="decimal"
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value.replace(/[^0-9.,]/g, ""))}
                    onBlur={commitEdit}
                    onKeyDown={handleAmountKeyDown}
                    className="lab-amount numeric-slashed bg-transparent outline-none border-none"
                    style={{ gridArea: "1/1", width: "100%", fontWeight: 600, lineHeight: "normal", color: "#C1C1C1", padding: 0, paddingRight: 80 }}
                    aria-label="Valor do investimento"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={startEditing}
                    className="lab-amount numeric-slashed underline cursor-text bg-transparent outline-none border-none p-0 text-left"
                    style={{ gridArea: "1/1", width: "100%", fontWeight: 600, lineHeight: "normal", color: "#000" }}
                    aria-label={`Editar valor: R$ ${formatAmount(investment)}`}
                  >
                    {formatAmount(investment)}
                  </button>
                )}

                {/* Hint Enter — dentro do box, alinhado a 16px da direita */}
                {editingAmount && (
                  <div
                    className="flex items-center gap-1.5"
                    style={{
                      position: "absolute",
                      right: 16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#808080",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      className="material-symbols-outlined leading-none"
                      style={{ fontSize: 20, fontVariationSettings: "'opsz' 20, 'wght' 300, 'FILL' 0, 'GRAD' 0" }}
                    >
                      keyboard_return
                    </span>
                    <span style={{ fontSize: 14 }}>Enter</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table section */}
          <div className="flex flex-col w-full">

            {/*
             * overflow-x-auto só no mobile — no desktop overflow-x-visible
             * permite que o botão X absoluto (right:-48px) apareça sem ser cortado.
             * A classe lab-table-inner aplica min-width no mobile para scroll horizontal.
             * Sem paddingRight: a tabela ocupa a largura total do container e o X
             * aparece naturalmente fora dele (o body não tem overflow:hidden).
             */}
            <div className="overflow-x-auto sm:overflow-x-visible w-full" style={{ scrollbarWidth: "none" }}>
              <div className="lab-table-inner">

                {/* Column header row */}
                <div className="flex w-full mb-4">
                  {/* Nome — sticky, flex-1 igual ao row */}
                  <div
                    className="sticky left-0 flex-1 bg-[#F3F4F6]"
                    style={{ ...COL_LABEL_STYLE, paddingLeft: 16 }}
                  >
                    Nome da Ação
                  </div>
                  <div style={{ ...COL_LABEL_STYLE, width: LAB_COL_WIDTHS[0], paddingLeft: 16 }}>
                    Preço da cota
                  </div>
                  <div style={{ ...COL_LABEL_STYLE, width: LAB_COL_WIDTHS[1], paddingLeft: 16 }}>
                    Quantidade
                  </div>
                  <div style={{ ...COL_LABEL_STYLE, width: LAB_COL_WIDTHS[2], paddingLeft: 16 }}>
                    Último pagamento
                  </div>
                  <div style={{ ...COL_LABEL_STYLE, width: LAB_COL_WIDTHS[3], paddingLeft: 16 }}>
                    Próximo pagamento
                  </div>
                  <div style={{ ...COL_LABEL_STYLE, width: LAB_COL_WIDTHS[4], paddingLeft: 16 }}>
                    Freq.
                  </div>
                  <div style={{ ...COL_LABEL_STYLE, width: LAB_COL_WIDTHS[5], paddingLeft: 16 }}>
                    Dividendos 12m
                  </div>
                  <div style={{ ...COL_LABEL_STYLE, width: LAB_COL_WIDTHS[6], paddingLeft: 16 }}>
                    DY 12m
                  </div>
                  {/* Placeholder da coluna X no mobile */}
                  <div className="sm:hidden" style={{ width: 56 }} />
                </div>

                {/* Rows */}
                <div
                  className="flex flex-col w-full"
                  style={{ gap: 1, backgroundColor: "#E5E7EC", borderRadius: 12 }}
                >
                  {tickers.map((ticker, i) => (
                    <LabTickerRow
                      key={ticker}
                      ticker={ticker}
                      investment={investment}
                      onRemove={() => handleRemoveTicker(ticker)}
                      isFirst={i === 0}
                      isLast={i === tickers.length - 1}
                    />
                  ))}
                </div>

              </div>
            </div>

            {/* Add ticker — fora do scroll para ficar sempre visível */}
            <div>
              {addingTicker ? (
                <AddTickerRow
                  onAdd={handleAddTicker}
                  onCancel={() => setAddingTicker(false)}
                />
              ) : (
                <div style={{ padding: "0 16px", height: 56, display: "flex", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => setAddingTicker(true)}
                    className="flex items-center gap-3 font-normal text-[#111827] hover:text-[#00C66E] transition-colors bg-transparent border-none p-0 cursor-pointer"
                    style={{ fontSize: 16 }}
                  >
                    <span
                      className="material-symbols-outlined leading-none"
                      style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 200, 'FILL' 0, 'GRAD' 0" }}
                    >
                      add_circle
                    </span>
                    Ticker
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Sector chips navigation */}
        {sectorChips && (
          <SectorChipsSection title={sectorChips.title} items={sectorChips.items} />
        )}

        </main>{/* fim do <main style={{ display: "contents" }}> */}

      </div>
      <SiteFooter />
    </div>
  );
}
