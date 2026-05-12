"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchOverlay } from "@/components/ui/SearchOverlay";

const nav = [
  { href: "/setores",  label: "Setores" },
  { href: "/fiis",     label: "FIIs" },
  { href: "/comparar", label: "Comparar" },
  { href: "/artigos",  label: "Artigos" },
] as const;

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--color-bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[var(--page-max)] items-center justify-between px-[var(--page-gutter)] py-4">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 no-underline">
            <span
              className="material-symbols-outlined leading-none text-[var(--brand)]"
              style={{ fontSize: 28, fontVariationSettings: "'opsz' 24, 'wght' 500, 'FILL' 1, 'GRAD' 0" }}
            >
              wallet
            </span>
            <span className="text-[15px] font-medium text-white">
              Simula Dividendos
            </span>
          </Link>

          {/* Direita — nav + lupa */}
          <div className="flex items-center gap-10">

            <nav aria-label="Navegação principal" className="hidden items-center gap-6 sm:flex">
              {nav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-60"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Lupa 24×24 */}
            <button
              type="button"
              aria-label="Buscar ticker"
              onClick={() => setSearchOpen(true)}
              className="flex h-6 w-6 items-center justify-center text-white transition-opacity hover:opacity-60"
            >
              <span
                className="material-symbols-outlined leading-none"
                style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
              >
                search
              </span>
            </button>

          </div>
        </div>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
