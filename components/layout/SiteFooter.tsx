import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const primaryLinks = [
  { href: "/comparar", label: "Comparar" },
  { href: "/fiis", label: "FIIs" },
  { href: "/setores", label: "Setores" },
  { href: "/artigos", label: "Artigos" },
] as const;

const legalLinks = [
  { href: "/artigos", label: "Conteúdo" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 w-full bg-[var(--color-dark-bg)]">
      <div className="mx-auto w-full max-w-[var(--page-max)] px-[var(--page-gutter)] py-10">

        {/* Top row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <LogoMark />
            <div className="flex flex-col leading-none gap-0.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--color-dark-muted)]">
                Simula
              </span>
              <span className="text-sm font-bold tracking-wide text-[var(--color-dark-text)]">
                Dividendos
              </span>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {primaryLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[var(--color-dark-muted)] hover:text-[var(--color-dark-text)] no-underline transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-[var(--color-dark-border)]" />

        {/* Bottom row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-dark-muted)]">
            © {new Date().getFullYear()} Simula Dividendos · Uso educacional. Não é recomendação de investimento.
          </p>
          <p className="text-xs text-[var(--color-dark-muted)]">
            Dados via{" "}
            <a
              href="https://brapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-dark-text)] transition-colors"
            >
              brapi.dev
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
