"use client";

/** Botão CTA que faz scroll suave ao topo da página. */
export function ScrollToTopCTA() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3 text-sm font-semibold text-[var(--brand-foreground)] transition hover:bg-[var(--brand-hover)]"
    >
      Simular agora
      <span
        className="material-symbols-outlined leading-none"
        style={{ fontSize: 18, fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0" }}
      >
        arrow_upward
      </span>
    </button>
  );
}
