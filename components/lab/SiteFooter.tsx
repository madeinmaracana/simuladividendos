import Link from "next/link";

/* ── dados dos links ────────────────────────────────────────── */

const FII_SECTORS = [
  { label: "Papel",       href: "/fiis/setores/papel" },
  { label: "Logística",   href: "/fiis/setores/logistica" },
  { label: "Shoppings",   href: "/fiis/setores/shoppings" },
  { label: "Escritórios", href: "/fiis/setores/escritorios" },
  { label: "Híbrido",     href: "/fiis/setores/hibrido" },
];

const STOCK_SECTORS = [
  { label: "Bancos",               href: "/setores/bancos" },
  { label: "Energia elétrica",     href: "/setores/energia" },
  { label: "Mineração",            href: "/setores/mineracao" },
  { label: "Consumo",              href: "/setores/consumo" },
  { label: "Indústria",            href: "/setores/industria" },
  { label: "Petróleo e gás",       href: "/setores/petroleo" },
  { label: "Serviços financeiros", href: "/setores/servicos_financeiros" },
];

const LINK_STYLE = {
  fontSize: 12,
  fontWeight: 500,
  color: "#000",
  lineHeight: "normal",
} as const;

const HEADER_STYLE = {
  fontSize: 12,
  fontWeight: 500,
  color: "#808080",
  lineHeight: "normal",
} as const;

/* ── SiteFooter ─────────────────────────────────────────────── */

export function SiteFooter() {
  return (
    <footer style={{ background: "#E5E7EC", width: "100%" }}>
      <div
        className="mx-auto flex flex-col sm:flex-row sm:justify-between"
        style={{ maxWidth: 969, padding: 24, gap: 32 }}
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center no-underline hover:opacity-60 transition-opacity" style={{ gap: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.2px", lineHeight: "normal", color: "#808080" }}>
            Simula
          </span>
          <span
            className="material-symbols-outlined select-none leading-none"
            style={{ fontSize: 32, fontVariationSettings: "'opsz' 32, 'wght' 400, 'FILL' 1, 'GRAD' 0", color: "#808080" }}
          >
            nest_eco_leaf
          </span>
          <span style={{ fontSize: 20, fontWeight: 400, color: "#808080", letterSpacing: "-0.2px", lineHeight: "normal" }}>
            Dividendos
          </span>
        </Link>

        {/* Colunas de links — lado a lado no mobile também, empilhadas no sm */}
        <div className="flex" style={{ gap: 40 }}>
          {/* Fundos imobiliários */}
          <div className="flex flex-col" style={{ gap: 0 }}>
            <Link href="/fiis" className="no-underline hover:underline" style={{ ...HEADER_STYLE, marginBottom: 16 }}>
              Fundos imobiliários
            </Link>
            {FII_SECTORS.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className="no-underline hover:underline"
                style={{ ...LINK_STYLE, marginTop: i === 0 ? 0 : 8 }}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* Ações */}
          <div className="flex flex-col" style={{ gap: 0 }}>
            <Link href="/acoes" className="no-underline hover:underline" style={{ ...HEADER_STYLE, marginBottom: 16 }}>
              Ações
            </Link>
            {STOCK_SECTORS.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className="no-underline hover:underline"
                style={{ ...LINK_STYLE, marginTop: i === 0 ? 0 : 8 }}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright + disclaimer */}
        <div className="flex flex-col" style={{ gap: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 400, color: "#808080", lineHeight: "normal" }}>
            © 2025 Simula Dividendos
          </span>
          <span style={{ fontSize: 12, fontWeight: 400, color: "#808080", lineHeight: "normal" }}>
            Este site tem fins educacionais e não constitui recomendação de investimento.
          </span>
        </div>
      </div>
    </footer>
  );
}
