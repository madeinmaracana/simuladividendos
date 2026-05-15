import { cn } from "@/lib/cn";

type Tone = "neutral" | "success" | "warning" | "danger" | "accent";

export type BadgeProps = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
};

const toneClass: Record<Tone, string> = {
  neutral:
    "border-[rgba(0,0,0,0.08)] bg-[#F3F4F6] text-[#6B7280]",
  accent: "border-[color:var(--accent)]/25 bg-[color:var(--accent)]/10 text-[color:var(--accent)]",
  success:
    "border-[color:var(--success)]/25 bg-[color:var(--success)]/10 text-[color:var(--success)]",
  warning:
    "border-[color:var(--warning)]/30 bg-[color:var(--warning)]/12 text-[color:var(--warning)]",
  danger:
    "border-[color:var(--danger)]/25 bg-[color:var(--danger)]/10 text-[color:var(--danger)]",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

