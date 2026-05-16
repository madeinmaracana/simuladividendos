"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ── tipos ──────────────────────────────────────────────────── */

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/",      label: "Home" },
  { href: "/acoes", label: "Ações" },
  { href: "/fiis",  label: "FIIs" },
];

/* ── NavPill ────────────────────────────────────────────────── */

interface NavPillProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function NavPill({ href, active, children, onClick }: NavPillProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
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

/* ── SiteNav ────────────────────────────────────────────────── */

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [overlayTop, setOverlayTop] = useState(0);

  /* fecha ao navegar */
  useEffect(() => { setOpen(false); }, [pathname]);

  /* bloqueia scroll quando aberto */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* mede onde o nav termina para o overlay começar exatamente ali */
  useLayoutEffect(() => {
    if (open && navRef.current) {
      setOverlayTop(navRef.current.getBoundingClientRect().bottom);
    }
  }, [open]);

  return (
    <>
      <div ref={navRef} className="flex items-center justify-between w-full">
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
          <span style={{ fontSize: 20, fontWeight: 400, color: "#808080", letterSpacing: "-0.2px", lineHeight: "normal" }}>
            Dividendos
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center" style={{ gap: 8 }}>
          {NAV_ITEMS.map((item) => (
            <NavPill key={item.href} href={item.href} active={pathname === item.href}>
              {item.label}
            </NavPill>
          ))}
        </nav>

        {/* Mobile: hambúrguer / X — mesmo lugar, nunca se move */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden flex items-center justify-center bg-transparent border-none cursor-pointer p-1"
        >
          <span
            className="material-symbols-outlined leading-none text-[#111827]"
            style={{ fontSize: 24, fontVariationSettings: "'opsz' 24, 'wght' 300, 'FILL' 0, 'GRAD' 0" }}
          >
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* ── Overlay — começa abaixo do nav, logo e ícone não se movem ── */}
      {open && (
        <div
          className="sm:hidden fixed left-0 right-0 bottom-0 z-50 bg-white"
          style={{ top: overlayTop }}
        >
          <nav className="flex flex-col items-start px-6 pt-6" style={{ gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <NavPill
                key={item.href}
                href={item.href}
                active={pathname === item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavPill>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
