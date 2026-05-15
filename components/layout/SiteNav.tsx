"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchOverlay } from "@/components/ui/SearchOverlay";

const nav = [
  { href: "/setores",   label: "Setores" },
  { href: "/fiis",      label: "FIIs" },
  { href: "/comparar",  label: "Comparar" },
  { href: "/artigos",   label: "Artigos" },
] as const;

/**
 * Barra de navegação reutilizável — usada dentro do hero escuro de cada página.
 * max-w-[980px] alinhado com o conteúdo do hero (Figma node-id=40-370).
 */
export function SiteNav() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="mx-auto flex w-full max-w-[980px] items-center justify-between px-4 py-[14px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <span
              className="material-symbols-outlined select-none leading-none text-white"
              style={{ fontSize: 16, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 1, 'GRAD' 0" }}
            >
              wallet
            </span>
          </span>
          <span className="text-[15px] font-semibold text-white">Simula Dividendos</span>
        </Link>

        {/* Nav + Busca */}
        <div className="flex items-center gap-1">
          <nav aria-label="Navegação principal" className="hidden items-center sm:flex">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 text-[13px] font-medium text-white/50 no-underline transition hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <span
              className="material-symbols-outlined leading-none"
              style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
            >
              search
            </span>
          </button>
        </div>

      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
