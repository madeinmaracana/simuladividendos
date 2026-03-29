import { cn } from "@/lib/cn";
import {
  buildSearchIntentTeaserLines,
  type IntentTeaserSegment,
  type SearchIntentTeaserInput,
} from "@/lib/ticker-page/intent-teaser";

export type SearchIntentTeaserProps = SearchIntentTeaserInput & {
  className?: string;
};

function IntentLine({ segments }: { segments: IntentTeaserSegment[] }) {
  return (
    <p className="text-sm leading-snug text-[color:var(--text-secondary)]">
      {segments.map((seg, i) =>
        seg.bold ? (
          <strong key={i} className="font-semibold text-[color:var(--text)]">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </p>
  );
}

/**
 * Resposta curta abaixo do H1: valor por cota/ação, exemplo com N cotas, CTA do simulador.
 */
export function SearchIntentTeaser({ className, ...input }: SearchIntentTeaserProps) {
  const [a, b, c] = buildSearchIntentTeaserLines(input);
  return (
    <div className={cn("flex max-w-prose flex-col gap-1", className)} id="heading-intent-busca">
      <IntentLine segments={a} />
      <IntentLine segments={b} />
      <IntentLine segments={c} />
    </div>
  );
}
