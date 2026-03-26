"use client";

import { useId, useMemo, useState } from "react";
import { firstSentenceOrExcerpt } from "@/lib/ticker-page/narrative";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

const COLLAPSE_AT_CHARS = 260;

type DividendSummaryTextProps = {
  id?: string;
  text: string;
  /** Se true e o texto for longo, mostra trecho + “Ler mais”. */
  collapsible?: boolean;
};

export function DividendSummaryText({
  id = "heading-resumo-dividendos",
  text,
  collapsible = true,
}: DividendSummaryTextProps) {
  const [expanded, setExpanded] = useState(false);
  const regionId = useId();

  const shouldCollapse = useMemo(
    () => collapsible && text.trim().length > COLLAPSE_AT_CHARS,
    [collapsible, text]
  );

  const preview = useMemo(() => firstSentenceOrExcerpt(text, COLLAPSE_AT_CHARS), [text]);

  return (
    <section aria-labelledby={id} className={ui.pageSection}>
      <h2 id={id} className={cn("text-left", ui.sectionTitle)}>
        Resumo de dividendos
      </h2>

      <div id={regionId}>
        <p className={cn(ui.body, "mt-4 text-pretty leading-relaxed")}>
          {shouldCollapse && !expanded ? preview : text}
        </p>
      </div>

      {shouldCollapse && !expanded ? (
        <button
          type="button"
          className="mt-3 text-left text-sm font-medium text-[color:var(--primary)] hover:underline"
          aria-expanded={false}
          aria-controls={regionId}
          onClick={() => setExpanded(true)}
        >
          Ler mais
        </button>
      ) : null}

      {shouldCollapse && expanded ? (
        <button
          type="button"
          className="mt-3 text-left text-sm font-medium text-[color:var(--primary)] hover:underline"
          aria-expanded={true}
          aria-controls={regionId}
          onClick={() => setExpanded(false)}
        >
          Mostrar menos
        </button>
      ) : null}
    </section>
  );
}
