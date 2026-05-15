import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TickerLogo } from "@/components/ui/TickerLogo";
import { MOCK_FIIS, getFiiPath } from "@/data/fiis";
import { buildFiisIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = buildFiisIndexMetadata();

export default function FiisIndexPage() {
  return (
    <main className="flex flex-col gap-0">
      <SiteHeader
        title="Fundos imobiliários"
        description="Explore os principais FIIs da B3, simule rendimentos e veja o histórico de distribuições."
      />
      <div className="w-full bg-[#F3F4F6]">
        <div className="mx-auto flex w-full max-w-[var(--page-max)] flex-col gap-[60px] px-[var(--page-gutter)] py-16 lg:py-24">

          <section className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[24px] font-medium leading-tight text-[#111827]">Todos os FIIs</h2>
              <p className="text-[16px] font-normal text-[#808080]">
                Principais fundos imobiliários da B3
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {MOCK_FIIS.map((f) => (
                <li key={f.ticker}>
                  <Link
                    href={getFiiPath(f.ticker)}
                    className="flex items-center gap-4 rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-white p-4 no-underline transition hover:border-[rgba(0,0,0,0.15)] hover:shadow-sm"
                  >
                    <TickerLogo ticker={f.ticker} size={40} theme="light" />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm font-semibold text-[#111827]">{f.ticker}</span>
                      <span className="text-[13px] font-medium text-[#6B7280]">{f.fundName}</span>
                      <p className="line-clamp-1 text-[13px] text-[#6B7280]">
                        {f.shortDescription}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-[#111827]">
                      Simular
                      <span className="material-symbols-outlined leading-none" style={{ fontSize: 14 }}>
                        arrow_forward
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}
