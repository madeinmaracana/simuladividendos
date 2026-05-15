import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";

type QuickAnswerProps = {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

/** Bloco “resposta rápida” no topo (estilo snippet / leitura escaneável). */
export function QuickAnswer({
  id = "heading-resposta-rapida",
  title = "Resposta rápida",
  children,
  className,
}: QuickAnswerProps) {
  return (
    <section
      aria-labelledby={id}
      className={cn(
        "rounded-[16px] border border-[rgba(0,0,0,0.08)] bg-[#F3F4F6] px-4 py-4",
        className
      )}
    >
      <h2 id={id} className={cn(ui.subsectionTitle)}>
        {title}
      </h2>
      <div className={cn(ui.body, "mt-2 max-w-2xl")}>
        {children}
      </div>
    </section>
  );
}
