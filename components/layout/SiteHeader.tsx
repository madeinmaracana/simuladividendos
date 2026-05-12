import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const nav = [
  { href: "/setores",  label: "Setores" },
  { href: "/fiis",     label: "FIIs" },
  { href: "/comparar", label: "Comparar" },
  { href: "/artigos",  label: "Artigos" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[var(--page-max)] items-center justify-between px-[var(--page-gutter)] py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <LogoMark />
          <span className="text-[15px] font-medium text-white">
            Simula Dividendos
          </span>
        </Link>

        {/* Nav — oculto em mobile */}
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

        {/* Search icon */}
        <button
          type="button"
          aria-label="Buscar"
          className="flex h-9 w-9 items-center justify-center text-white transition-opacity hover:opacity-60"
        >
          <span
            className="material-symbols-outlined leading-none"
            style={{ fontSize: 20, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
          >
            search
          </span>
        </button>

      </div>
    </header>
  );
}
