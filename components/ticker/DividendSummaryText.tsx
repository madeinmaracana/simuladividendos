"use client";

import { useId, useMemo, useState } from "react";
import { firstSentenceOrExcerpt } from "@/lib/ticker-page/narrative";

const COLLAPSE_AT_CHARS = 260;

type DividendSummaryTextProps = {
  id?: string;
  text: string;
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
    <section aria-labelledby={id} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="text-[24px] font-medium leading-tight text-[#111827]">
          Resumo de dividendos
        </h2>
      </div>

      <div id={regionId}>
        <p className="text-[13px] font-medium leading-relaxed text-[#6B7280]">
          {shouldCollapse && !expanded ? preview : text}
        </p>
      </div>

      {shouldCollapse && !expanded ? (
        <button
          type="button"
          className="self-start text-left text-[13px] font-medium text-[#111827] transition-opacity hover:opacity-70"
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
          className="self-start text-left text-[13px] font-medium text-[#111827] transition-opacity hover:opacity-70"
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
