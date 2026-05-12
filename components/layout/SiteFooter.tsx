import Link from "next/link";

const links = [
  { href: "/setores",  label: "Setores" },
  { href: "/fiis",     label: "FIIs" },
  { href: "/comparar", label: "Comparar" },
  { href: "/artigos",  label: "Artigos" },
] as const;

export function SiteFooter() {
  return (
    <footer className="w-full">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-10 px-[var(--page-gutter)] py-6">

        {/* Linha 1 — logo + nav */}
        <div className="flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2 no-underline">
            <span
              className="material-symbols-outlined leading-none text-[var(--brand)]"
              style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 500, 'FILL' 1, 'GRAD' 0" }}
            >
              wallet
            </span>
            <span className="text-[15px] font-medium text-white">
              Simula Dividendos
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-60"
              >
                {label}
              </Link>
            ))}
          </nav>

        </div>

        {/* Linha 2 — copyright */}
        <p className="text-[13px] font-medium text-[#808080]">
          © {new Date().getFullYear()} Simula Dividendos · Uso educacional. Não é recomendação de investimento.
        </p>

      </div>
    </footer>
  );
}
