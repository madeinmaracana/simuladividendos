"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ExpandableSectionProps = {
  children: ReactNode;
  expandLabel: string;
  collapseLabel: string;
  className?: string;
  buttonClassName?: string;
};

/**
 * Expansão inline com animação de altura (grid 0fr → 1fr).
 * O conteúdo só é montado após a primeira abertura; permanece montado para animar o recolhimento.
 */
export function ExpandableSection({
  children,
  expandLabel,
  collapseLabel,
  className,
  buttonClassName,
}: ExpandableSectionProps) {
  const [open, setOpen] = useState(false);
  const [contentMounted, setContentMounted] = useState(false);

  useEffect(() => {
    if (open) setContentMounted(true);
  }, [open]);

  const toggle = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-3", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className={cn(
          "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-left text-sm font-semibold text-teal-700 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-teal-400 dark:hover:bg-neutral-900/70 sm:w-auto sm:px-5",
          buttonClassName
        )}
      >
        {open ? collapseLabel : expandLabel}
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">{contentMounted ? children : null}</div>
      </div>
    </div>
  );
}
