import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import type { InternalLinkItem } from "@/lib/ticker-page/interlinking";

export type ProgrammaticTickerInterlinkingProps = {
  vejaTambem: InternalLinkItem[];
  outrosAtivos: InternalLinkItem[];
  /** Link opcional para o hub do setor (ações) ou navegação ampla. */
  sectorHub?: InternalLinkItem;
};

/**
 * Interlinking compacto após o simulador: intenções do mesmo ativo + poucos pares (SEO, sem poluir).
 */
export function ProgrammaticTickerInterlinking({
  vejaTambem,
  outrosAtivos,
  sectorHub,
}: ProgrammaticTickerInterlinkingProps) {
  const showOutrosBlock = outrosAtivos.length > 0 || sectorHub != null;
  if (vejaTambem.length === 0 && !showOutrosBlock) return null;

  return (
    <section className="flex flex-col gap-5 border-b border-[rgba(0,0,0,0.08)] pb-6" aria-label="Links internos">
      <div className="flex flex-col gap-5">
        {vejaTambem.length > 0 ? (
          <div>
            <h2 id="heading-veja-tambem" className="text-[24px] font-medium leading-tight text-[#111827]">
              Veja também
            </h2>
            <ul className="mt-3 list-none space-y-2 p-0">
              {vejaTambem.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href} className="text-sm font-medium text-[#111827]">
                    {item.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showOutrosBlock ? (
          <div>
            <h2 id="heading-outros-ativos-relacionados" className="text-[24px] font-medium leading-tight text-[#111827]">
              Outros ativos relacionados
            </h2>
            {outrosAtivos.length > 0 ? (
              <ul className="mt-3 list-none space-y-2 p-0">
                {outrosAtivos.map((item) => (
                  <li key={item.href}>
                    <TextLink href={item.href} className="text-sm font-medium text-[#111827]">
                      {item.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            ) : null}
            {sectorHub ? (
              <p className={cn("text-sm text-[#6B7280]", outrosAtivos.length > 0 ? "mt-3" : "mt-2")}>
                <TextLink href={sectorHub.href} className="font-medium text-[#111827]">
                  {sectorHub.label}
                </TextLink>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
