import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const nav = [
  { href: "/comparar", label: "Comparar" },
  { href: "/fiis", label: "FIIs" },
  { href: "/setores", label: "Setores" },
  { href: "/artigos", label: "Artigos" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 -mx-4 bg-[var(--color-bg)]/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <LogoMark />
          <div className="flex flex-col leading-none gap-0.5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">Simula</span>
            <span className="text-sm font-bold tracking-wide text-[var(--color-text)]">Dividendos</span>
          </div>
        </Link>

        {/* Nav */}
        <nav aria-label="Navegação principal" className="flex items-center gap-1">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:bg-black/5 hover:text-[var(--color-text)] no-underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
