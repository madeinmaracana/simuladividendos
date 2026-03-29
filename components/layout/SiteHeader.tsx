import Link from "next/link";
import { ui } from "@/components/ui/classes";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/simulador", label: "Simulador" },
  { href: "/fiis", label: "FIIs" },
  { href: "/setores", label: "Setores" },
  { href: "/artigos", label: "Artigos" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 -mx-4 mb-8 border-b border-[var(--border)] bg-[var(--background)]/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="group flex flex-col gap-0.5">
          <span className={cn(ui.eyebrow, "text-xs tracking-[0.18em]")}>Ferramenta</span>
          <span className="text-base font-semibold tracking-tight text-neutral-900 transition group-hover:text-[color:var(--primary)] dark:text-neutral-100">
            Simula Dividendos
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="flex flex-wrap items-center gap-1">
          {nav.map(({ href, label }) => (
            <Link key={href} href={href} className={ui.linkNav}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
