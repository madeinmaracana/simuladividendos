import Link from "next/link";

const primaryLinks = [
  { href: "/comparar", label: "Comparar" },
  { href: "/fiis",     label: "FIIs" },
  { href: "/setores",  label: "Setores" },
  { href: "/artigos",  label: "Artigos" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-2 overflow-hidden rounded-[32px]" style={{ background: "#1A1A1A" }}>
      <div className="mx-auto w-full max-w-[var(--page-max)] px-[var(--page-gutter)] py-10">

        {/* Top row — logo + nav */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 no-underline">
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

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {primaryLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] font-medium text-white/50 no-underline transition hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Bottom row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-medium text-white/30">
            © {new Date().getFullYear()} Simula Dividendos · Uso educacional. Não é recomendação de investimento.
          </p>
          <p className="text-[13px] font-medium text-white/30">
            Dados via{" "}
            <a
              href="https://brapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 no-underline transition hover:text-white"
            >
              brapi.dev
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
