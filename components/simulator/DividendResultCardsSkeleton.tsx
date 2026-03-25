import { cn } from "@/lib/cn";

export function DividendResultCardsSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("grid w-full min-w-0 gap-4 sm:grid-cols-2 sm:gap-6", className)}
      aria-busy="true"
      aria-label="Carregando resultados"
    >
      <div className="flex flex-col rounded-2xl border border-[var(--border)] bg-neutral-50/80 p-6 dark:border-neutral-800 dark:bg-neutral-900/40 sm:p-8">
        <div className="h-3 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-3 h-4 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-4 h-10 w-44 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-4 h-3 w-32 animate-pulse rounded bg-neutral-200/80 dark:bg-neutral-700/80" />
      </div>
      <div className="flex flex-col rounded-2xl border border-[var(--border)] bg-neutral-50/80 p-6 dark:border-neutral-800 dark:bg-neutral-900/40 sm:p-8">
        <div className="h-3 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-3 h-4 w-48 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-4 h-10 w-44 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
        <div className="mt-4 h-3 w-36 animate-pulse rounded bg-neutral-200/80 dark:bg-neutral-700/80" />
      </div>
    </div>
  );
}
