import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "warning" | "danger";

const tones: Record<Tone, string> = {
  neutral:
    "border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-200",
  warning:
    "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100",
  danger:
    "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200",
};

type CalloutProps = {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  role?: "alert" | "status";
};

export function Callout({ children, tone = "neutral", className, role }: CalloutProps) {
  return (
    <div
      role={role}
      className={cn(
        "rounded-xl border px-4 py-3 text-sm leading-relaxed",
        tones[tone],
        className
      )}
    >
      {children}
    </div>
  );
}
