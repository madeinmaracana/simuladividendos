"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildComparSlug } from "@/lib/comparar";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

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
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <div className="flex flex-1 flex-col gap-1.5">
        <label className={ui.label} htmlFor="ticker-a">Ativo A</label>
        <input
          id="ticker-a"
          className={cn(ui.input, "uppercase")}
          placeholder="Ex.: PETR4"
          value={tickerA}
          onChange={(e) => setTickerA(e.target.value.toUpperCase())}
          maxLength={10}
          autoComplete="off"
        />
      </div>

      <span className="hidden self-center pb-1 text-lg font-semibold text-[var(--color-text-soft)] sm:block">
        vs
      </span>

      <div className="flex flex-1 flex-col gap-1.5">
        <label className={ui.label} htmlFor="ticker-b">Ativo B</label>
        <input
          id="ticker-b"
          className={cn(ui.input, "uppercase")}
          placeholder="Ex.: VALE3"
          value={tickerB}
          onChange={(e) => setTickerB(e.target.value.toUpperCase())}
          maxLength={10}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className={cn(
          "inline-flex h-[46px] items-center justify-center rounded-[length:var(--radius-md)]",
          "bg-[var(--brand)] px-6 text-sm font-semibold text-[var(--brand-foreground)]",
          "transition hover:bg-[var(--brand-hover)] sm:shrink-0"
        )}
      >
        Comparar
      </button>

      {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}
    </form>
  );
}
