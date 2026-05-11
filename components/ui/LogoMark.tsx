/** Logo mark — green rounded square with Material Symbols wallet icon */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[var(--brand)] ${className ?? ""}`}
      aria-hidden
    >
      <span
        className="material-symbols-outlined select-none text-[22px] leading-none text-[var(--brand-foreground)]"
        style={{ fontVariationSettings: "'opsz' 24, 'wght' 500, 'FILL' 1, 'GRAD' 0" }}
      >
        wallet
      </span>
    </span>
  );
}
