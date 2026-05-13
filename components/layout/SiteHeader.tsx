import Link from "next/link";

const nav = [
  { href: "/comparar",  label: "Comparar" },
  { href: "/fiis",      label: "FIIs" },
  { href: "/setores",   label: "Setores" },
  { href: "/artigos",   label: "Artigos" },
] as const;

/**
 * Header — faz parte visual do hero escuro (#1A1A1A).
 * Não sticky. Logo à esquerda, nav + busca à direita.
 */
export function SiteHeader() {
  return (
    <header style={{ background: "#1A1A1A" }}>
      <div className="mx-auto flex max-w-[var(--page-max)] items-center justify-between px-[var(--page-gutter)] py-[14px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          {/* Ícone branco sem cor de marca */}
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            <span
              className="material-symbols-outlined select-none leading-none text-white"
              style={{ fontSize: 16, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 1, 'GRAD' 0" }}
            >
              wallet
            </span>
          </span>
          <span className="text-[15px] font-semibold text-white">Dividendos</span>
        </Link>

        {/* Nav + Busca — alinhados à direita */}
        <div className="flex items-center gap-1">
          <nav aria-label="Navegação principal" className="hidden items-center sm:flex">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 text-[13px] font-medium text-white/50 no-underline transition hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Ícone de busca */}
          <button
            aria-label="Buscar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <span
              className="material-symbols-outlined leading-none"
              style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 400, 'FILL' 0, 'GRAD' 0" }}
            >
              search
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
