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
    <footer className="mt-16 border-t border-[var(--border)] pt-10 dark:border-neutral-800">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md space-y-2">
          <p className={cn(ui.bodyMuted, "text-[0.8125rem] leading-relaxed")}>
            Simula Dividendos é uma ferramenta educacional. Não constitui recomendação de investimento,
            consultoria financeira ou promessa de retorno.
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            Uso por sua conta e risco; não é aconselhamento financeiro.
          </p>
        </div>
        <nav aria-label="Links úteis" className="flex flex-col gap-2 sm:items-end">
          <span className={cn(ui.metricLabel, "mb-1 text-left sm:text-right")}>Navegação</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-neutral-600 transition hover:text-teal-800 dark:text-neutral-400 dark:hover:text-teal-300"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/"
              className="text-sm text-neutral-600 transition hover:text-teal-800 dark:text-neutral-400 dark:hover:text-teal-300"
            >
              Início
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
