import Link from "next/link";
import { LogoMark } from "@/components/ui/LogoMark";

const links = [
  { href: "/simulador", label: "Simulador" },
  { href: "/fiis", label: "FIIs" },
  { href: "/setores", label: "Setores" },
  { href: "/artigos", label: "Artigos" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 w-full bg-black">
      <div className="mx-auto w-full max-w-[840px] px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <LogoMark />
            <div className="flex flex-col leading-none gap-0.5">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">Simula</span>
              <span className="text-sm font-bold tracking-wide text-white">Dividendos</span>
            </div>
          </Link>
          <nav className="flex items-center gap-5">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm text-white/60 hover:text-white no-underline transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
