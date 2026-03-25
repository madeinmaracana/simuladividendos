import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "chip";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-[length:var(--radius-input)] bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-teal-500",
  secondary:
    "inline-flex items-center justify-center rounded-[length:var(--radius-input)] border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-teal-300 hover:bg-teal-50/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-60 dark:text-neutral-200 dark:hover:border-teal-800 dark:hover:bg-teal-950/40",
  chip:
    "inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-800 transition hover:border-teal-300 hover:bg-teal-50 disabled:opacity-50 dark:bg-neutral-800/80 dark:text-neutral-200 dark:hover:border-teal-700 dark:hover:bg-neutral-800",
};

export function Button({ variant = "primary", className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
