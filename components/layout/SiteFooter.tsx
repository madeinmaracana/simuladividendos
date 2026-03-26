import Link from "next/link";
import { ui } from "@/components/ui/classes";
import { cn } from "@/lib/cn";

const links = [
  { href: "/simulador", label: "Simulador" },
  { href: "/setores", label: "Setores" },
  { href: "/artigos", label: "Artigos" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 -mx-4 border-t border-[#1f1f1f] bg-[var(--dark-bg)] px-4 pt-10 text-[var(--dark-text)] sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md space-y-2">
          <p className="text-[0.8125rem] leading-relaxed text-[var(--dark-muted)]">
            Simula Dividendos é uma ferramenta educacional. Não constitui recomendação de investimento,
            consultoria financeira ou promessa de retorno.
          </p>
          <p className="text-xs text-[var(--dark-muted)]">
            Uso por sua conta e risco; não é aconselhamento financeiro.
          </p>
        </div>
        <nav aria-label="Links úteis" className="flex flex-col gap-2 sm:items-end">
          <span className="mb-1 text-left text-xs font-medium uppercase tracking-wide text-[var(--dark-muted)] sm:text-right">
            Navegação
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[var(--dark-muted)] transition hover:text-[var(--dark-text)]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/"
              className="text-sm text-[var(--dark-muted)] transition hover:text-[var(--dark-text)]"
            >
              Início
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
