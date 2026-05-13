import Link from "next/link";

const EXPLORAR = [
  { href: "/setores",   label: "Setores" },
  { href: "/fiis",      label: "FIIs" },
  { href: "/comparar",  label: "Comparar" },
  { href: "/artigos",   label: "Artigos" },
] as const;

const RECURSOS = [
  { href: "/melhores-acoes-dividendos",  label: "Melhores ações de dividendos" },
  { href: "/melhores-acoes",             label: "Ações por setor" },
  { href: "/melhores-fiis",              label: "Melhores FIIs" },
  { href: "/calculadora-renda-passiva",  label: "Calculadora de renda passiva" },
] as const;

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-[rgba(120,120,120,0.15)]">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-col gap-10 px-[var(--page-gutter)] py-12">

        {/* Grid principal */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">

          {/* Marca */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <span
                className="material-symbols-outlined leading-none text-[var(--brand)]"
                style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 500, 'FILL' 1, 'GRAD' 0" }}
              >
                wallet
              </span>
              <span className="text-[15px] font-medium text-white">Simula Dividendos</span>
            </Link>
            <p className="text-[13px] font-medium leading-relaxed text-[#808080]">
              Simulador educacional de dividendos e renda passiva com ações e FIIs da B3.
            </p>
          </div>

          {/* Explorar */}
          <nav aria-label="Explorar" className="flex flex-col gap-3">
            <p className="text-[13px] font-medium text-[#808080]">Explorar</p>
            <ul className="flex flex-col gap-2">
              {EXPLORAR.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-60"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recursos */}
          <nav aria-label="Recursos" className="flex flex-col gap-3">
            <p className="text-[13px] font-medium text-[#808080]">Recursos</p>
            <ul className="flex flex-col gap-2">
              {RECURSOS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] font-medium text-white no-underline transition-opacity hover:opacity-60"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        {/* Copyright */}
        <p className="text-[13px] font-medium text-[#808080]">
          © {new Date().getFullYear()} Simula Dividendos · Uso educacional. Não é recomendação de investimento.
        </p>

      </div>
    </footer>
  );
}
