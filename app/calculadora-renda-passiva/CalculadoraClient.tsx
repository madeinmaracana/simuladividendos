"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });
}

function parseBRL(raw: string): number {
  const clean = raw.replace(/\./g, "").replace(",", ".");
  const n = parseFloat(clean);
  return isNaN(n) ? 0 : n;
}

const YIELD_PRESETS = [
  { label: "Conservador 5%", value: 5 },
  { label: "Moderado 8%", value: 8 },
  { label: "Arrojado 12%", value: 12 },
];

const EXAMPLE_STOCKS = [
  { ticker: "BBAS3", yield: 6.8,  href: "/acoes/BBAS3" },
  { ticker: "TAEE11", yield: 9.2, href: "/acoes/TAEE11" },
  { ticker: "EGIE3",  yield: 7.1, href: "/acoes/EGIE3" },
  { ticker: "PETR4",  yield: 11.4, href: "/acoes/PETR4" },
  { ticker: "VALE3",  yield: 8.5, href: "/acoes/VALE3" },
  { ticker: "ITUB4",  yield: 5.2, href: "/acoes/ITUB4" },
];

export function CalculadoraClient() {
  const [rendaStr, setRendaStr] = useState("1000");
  const [yieldPct, setYieldPct] = useState(8);
  const [yieldStr, setYieldStr] = useState("8");

  const rendaMensal = parseBRL(rendaStr) || 0;
  const yieldAnual = yieldPct > 0 ? yieldPct : 0;

  const { patrimonioNecessario, rendaMensalCalc, rendaAnualCalc } = useMemo(() => {
    if (yieldAnual <= 0 || rendaMensal <= 0) return { patrimonioNecessario: 0, rendaMensalCalc: 0, rendaAnualCalc: 0 };
    const rendaAnualCalc = rendaMensal * 12;
    const patrimonioNecessario = (rendaAnualCalc / yieldAnual) * 100;
    return { patrimonioNecessario, rendaMensalCalc: rendaMensal, rendaAnualCalc };
  }, [rendaMensal, yieldAnual]);

  function handleYieldPreset(v: number) {
    setYieldPct(v);
    setYieldStr(String(v));
  }

  function handleYieldInput(raw: string) {
    setYieldStr(raw);
    const n = parseFloat(raw.replace(",", "."));
    if (!isNaN(n) && n > 0 && n <= 50) setYieldPct(n);
  }

  return (
    <div className="flex flex-col gap-12">

      {/* Formulário */}
      <div
        className="flex flex-col gap-6 rounded-[24px] border border-white/10 p-6"
        style={{ background: "rgba(111,111,111,0.18)", backdropFilter: "blur(16px)" }}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

          {/* Renda mensal desejada */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#808080]">
              Renda mensal desejada
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#808080]">
                R$
              </span>
              <input
                type="text"
                inputMode="decimal"
                value={rendaStr}
                onChange={(e) => setRendaStr(e.target.value)}
                placeholder="1.000"
                className="w-full rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] py-[14px] pl-10 pr-4 text-[13px] font-semibold tabular-nums text-white outline-none transition focus:border-white/30 placeholder:text-[#808080]"
              />
            </div>
          </div>

          {/* Yield anual */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-[#808080]">
              Dividend yield anual estimado
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={yieldStr}
                onChange={(e) => handleYieldInput(e.target.value)}
                placeholder="8"
                className="w-full rounded-full border border-white/15 bg-[rgba(255,255,255,0.06)] py-[14px] pl-4 pr-10 text-[13px] font-semibold tabular-nums text-white outline-none transition focus:border-white/30 placeholder:text-[#808080]"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#808080]">
                %
              </span>
            </div>
            {/* Presets */}
            <div className="flex flex-wrap gap-1.5">
              {YIELD_PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => handleYieldPreset(p.value)}
                  className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-opacity hover:opacity-70 ${
                    yieldPct === p.value
                      ? "border-[var(--brand)] bg-[var(--brand)] text-black"
                      : "border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Resultado */}
      {patrimonioNecessario > 0 && (
        <section className="flex flex-col gap-5" aria-live="polite">
          <h2 className="text-[24px] font-medium leading-tight text-white">Resultado</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Patrimônio necessário */}
            <div className="flex flex-col gap-2 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-5">
              <p className="text-[13px] font-medium text-[#808080]">Patrimônio necessário</p>
              <p className="text-[27px] font-medium leading-tight tabular-nums text-white">
                {formatBRL(patrimonioNecessario)}
              </p>
              <p className="text-[13px] font-medium text-[#808080]">
                Para gerar {formatBRL(rendaMensalCalc)}/mês com yield de {yieldAnual.toFixed(1)}% ao ano
              </p>
            </div>

            {/* Renda mensal */}
            <div className="flex flex-col gap-2 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-5">
              <p className="text-[13px] font-medium text-[#808080]">Renda mensal</p>
              <p className="text-[27px] font-medium leading-tight tabular-nums text-white">
                {formatBRL(rendaMensalCalc)}
              </p>
              <p className="text-[13px] font-medium text-[#808080]">por mês (estimativa)</p>
            </div>

            {/* Renda anual */}
            <div className="flex flex-col gap-2 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-5">
              <p className="text-[13px] font-medium text-[#808080]">Renda anual</p>
              <p className="text-[27px] font-medium leading-tight tabular-nums text-white">
                {formatBRL(rendaAnualCalc)}
              </p>
              <p className="text-[13px] font-medium text-[#808080]">por ano (estimativa)</p>
            </div>
          </div>

          {/* Tabela progressiva */}
          <div className="rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(120,120,120,0.20)]">
                  <th className="px-4 py-3 text-left text-[13px] font-medium text-[#808080]">Patrimônio investido</th>
                  <th className="px-4 py-3 text-right text-[13px] font-medium text-[#808080]">Renda mensal estimada</th>
                  <th className="px-4 py-3 text-right hidden sm:table-cell text-[13px] font-medium text-[#808080]">Renda anual estimada</th>
                </tr>
              </thead>
              <tbody>
                {[0.25, 0.5, 0.75, 1, 1.5, 2].map((mult) => {
                  const patrimonio = patrimonioNecessario * mult;
                  const mensal = (patrimonio * yieldAnual) / 100 / 12;
                  const anual = mensal * 12;
                  const isTarget = mult === 1;
                  return (
                    <tr
                      key={mult}
                      className={`border-b border-[rgba(120,120,120,0.20)] last:border-0 ${isTarget ? "bg-[rgba(255,255,255,0.04)]" : ""}`}
                    >
                      <td className="px-4 py-3 text-[13px] font-medium tabular-nums text-white">
                        {formatBRL(patrimonio)}
                        {isTarget && <span className="ml-2 text-[11px] text-[var(--brand)]">← meta</span>}
                      </td>
                      <td className="px-4 py-3 text-right text-[13px] font-medium tabular-nums text-white">{formatBRL(mensal)}</td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell text-[13px] font-medium tabular-nums text-[#808080]">{formatBRL(anual)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Ações de exemplo para simular */}
      <section className="flex flex-col gap-5">
        <h2 className="text-[24px] font-medium leading-tight text-white">
          Simule com ativos reais
        </h2>
        <p className="text-[13px] font-medium text-[#808080]">
          Use os yields de referência abaixo como ponto de partida. Clique para simular com dados históricos reais.
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_STOCKS.map((s) => (
            <Link
              key={s.ticker}
              href={s.href}
              className="flex items-center gap-2 rounded-full border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] px-4 py-2 text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-70"
            >
              {s.ticker}
              <span className="text-[#808080]">{s.yield}%</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
