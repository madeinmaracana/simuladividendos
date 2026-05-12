import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_FIIS, getFiiPath } from "@/data/fiis";
import { buildFiisIndexMetadata } from "@/lib/seo";
import { tickerAccentColor } from "@/lib/ticker-colors";

export const metadata: Metadata = buildFiisIndexMetadata();

export default function FiisIndexPage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-12 px-[var(--page-gutter)]">

        {/* Hero */}
        <header className="flex flex-col gap-4">
          <p className="text-[13px] font-medium text-[#808080]">FIIs</p>
          <h1 className="text-[53px] font-medium leading-[63px] text-white">
            Fundos imobiliários
          </h1>
          <p className="max-w-2xl text-[13px] font-medium leading-relaxed text-[#808080]">
            Simular rendimentos de FIIs. Escolha um fundo para ver renda mensal de referência,
            último pagamento e histórico. Mesma lógica educacional do simulador de ações —
            sem recomendação de investimento.
          </p>
        </header>

        {/* Lista */}
        <ul className="flex flex-col gap-3">
          {MOCK_FIIS.map((f) => {
            const accent = tickerAccentColor(f.ticker);
            return (
              <li key={f.ticker}>
                <Link
                  href={getFiiPath(f.ticker)}
                  className="flex items-center gap-4 rounded-[16px] border border-[rgba(120,120,120,0.20)] bg-[rgba(120,120,120,0.18)] p-4 no-underline transition hover:border-[rgba(120,120,120,0.40)] hover:brightness-110"
                >
                  {/* Icon */}
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {f.ticker.slice(0, 2)}
                  </span>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-medium text-white">{f.ticker}</p>
                    <p className="mt-0.5 line-clamp-1 text-[13px] font-medium text-[#808080]">
                      {f.shortDescription}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                    <span
                      className="material-symbols-outlined leading-none text-black"
                      style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
                    >
                      arrow_forward
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

      </div>
    </main>
  );
}
