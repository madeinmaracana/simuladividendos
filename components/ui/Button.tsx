import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "chip";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-[length:var(--radius-md)] bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-foreground)] shadow-[var(--shadow-sm)] transition hover:bg-[var(--brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60",
  secondary:
    "inline-flex items-center justify-center rounded-[length:var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] shadow-[var(--shadow-sm)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-60",
  chip:
    "inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--color-text)] transition hover:border-[var(--color-border-strong)] disabled:opacity-50",
};

export function Button({ variant = "primary", className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
