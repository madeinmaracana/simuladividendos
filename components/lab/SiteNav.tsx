"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── NavPill ──────────────────────────────────────────────────
 * Ativo (página atual)  → pílula #E5E7EC + texto preto
 * Inativo (outro link)  → pílula #000    + texto branco
 * ─────────────────────────────────────────────────────────── */

interface NavPillProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

function NavPill({ href, active, children }: NavPillProps) {
  return (
    <Link
      href={href}
      className="no-underline transition-opacity hover:opacity-60"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 120,
        padding: "8px 16px",
        background: active ? "#E5E7EC" : "transparent",
        color: "#000",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "normal",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Link>
  );
}

/* ── SiteNav ──────────────────────────────────────────────── */

export function SiteNav() {
  const pathname = usePathname();
  const isAcoes = pathname === "/";
  const isFiis  = pathname === "/fiis";

  return (
    <div className="flex items-center justify-between w-full">
      {/* Logo */}
      <Link href="/" className="group inline-flex items-center no-underline" style={{ gap: 4 }}>
        <span
          className="text-[#00C66E] group-hover:text-black transition-colors"
          style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.2px", lineHeight: "normal" }}
        >
          Simula
        </span>
        <span
          className="material-symbols-outlined select-none leading-none text-[#00C66E] group-hover:text-black transition-colors"
          style={{ fontSize: 32, fontVariationSettings: "'opsz' 32, 'wght' 400, 'FILL' 1, 'GRAD' 0" }}
        >
          nest_eco_leaf
        </span>
        <span
          style={{ fontSize: 20, fontWeight: 400, color: "#808080", letterSpacing: "-0.2px", lineHeight: "normal" }}
        >
          Dividendos
        </span>
      </Link>

      {/* Nav items */}
      <nav className="flex items-center" style={{ gap: 8 }}>
        <NavPill href="/" active={isAcoes}>Home</NavPill>
        <NavPill href="/fiis" active={isFiis}>FIIs</NavPill>
      </nav>
    </div>
  );
}
