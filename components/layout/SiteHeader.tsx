import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const nav = [
  { href: "/comparar",  label: "Comparar" },
  { href: "/fiis",      label: "FIIs" },
  { href: "/setores",   label: "Setores" },
  { href: "/artigos",   label: "Artigos" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[var(--page-max)] items-center justify-between px-[var(--page-gutter)] py-3">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <LogoMark />
          <div className="flex flex-col leading-none gap-[3px]">
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-soft)]">
              Simula
            </span>
            <span className="text-[13px] font-bold tracking-wide text-[var(--color-text)]">
              Dividendos
            </span>
          </div>
        </Link>

        {/* Nav — oculto em mobile */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-0.5 sm:flex">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] no-underline transition hover:bg-[var(--color-border)] hover:text-[var(--color-text)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-dark-bg)] px-4 py-2 text-sm font-semibold text-[var(--color-dark-text)] no-underline transition hover:bg-[var(--color-dark-surface)]"
        >
          Simular agora
          <span
            className="material-symbols-outlined leading-none text-[var(--brand)]"
            style={{ fontSize: 16, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
          >
            arrow_forward
          </span>
        </Link>

      </div>
    </header>
  );
}
