import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const links = [
  { href: "/setores",  label: "Setores" },
  { href: "/fiis",     label: "FIIs" },
  { href: "/comparar", label: "Comparar" },
  { href: "/artigos",  label: "Artigos" },
] as const;

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-6 px-[var(--page-gutter)] py-8">

        {/* Top row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <LogoMark />
            <span className="text-sm font-bold tracking-wide text-[var(--color-text)]">
              Simula Dividendos
            </span>
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[var(--color-text-muted)] no-underline transition-colors hover:text-[var(--color-text)]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-text-soft)]">
            © {new Date().getFullYear()} Simula Dividendos · Uso educacional. Não é recomendação de investimento.
          </p>
          <p className="text-xs text-[var(--color-text-soft)]">
            Dados via{" "}
            <a
              href="https://brapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--color-text-muted)] transition-colors"
            >
              brapi.dev
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
