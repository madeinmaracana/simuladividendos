import Link from "next/link";

const navLinks = [
  { href: "/setores",  label: "Setores" },
  { href: "/fiis",     label: "FIIs" },
  { href: "/comparar", label: "Comparar" },
  { href: "/artigos",  label: "Artigos" },
] as const;

/**
 * Footer flat, full-width, sem cantos arredondados.
 * Figma node-id=40-695: background #E5E7EC, padding 24px 20px,
 * flex-direction column, gap 40px, align-items center.
 */
export function SiteFooter() {
  return (
    <footer style={{ background: "#E5E7EC" }}>
      <div
        className="mx-auto flex w-full flex-col items-center"
        style={{
          maxWidth: "var(--page-max)",
          padding: "24px 20px",
          gap: "40px",
        }}
      >
        {/* ── Topbar: logo (esq) + nav (dir) ── */}
        <div className="flex w-full items-center justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]"
              style={{ background: "rgba(0,0,0,0.08)" }}
            >
              <span
                className="material-symbols-outlined select-none leading-none"
                style={{
                  fontSize: 16,
                  color: "#111827",
                  fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 1, 'GRAD' 0",
                }}
              >
                wallet
              </span>
            </span>
            <span className="text-[15px] font-semibold" style={{ color: "#111827" }}>
              Simula Dividendos
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] font-medium no-underline transition-opacity hover:opacity-60"
                style={{ color: "#374151" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Copyright ── */}
        <div className="flex w-full items-center justify-between gap-4">
          <p className="text-[13px] font-medium" style={{ color: "#6B7280" }}>
            © {new Date().getFullYear()} Simula Dividendos · Uso educacional. Não é recomendação de investimento.
          </p>
          <p className="shrink-0 text-[13px] font-medium" style={{ color: "#6B7280" }}>
            Dados via{" "}
            <a
              href="https://brapi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-opacity hover:opacity-60"
              style={{ color: "#374151" }}
            >
              brapi.dev
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
