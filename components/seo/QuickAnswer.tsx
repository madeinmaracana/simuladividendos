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
        "rounded-[length:var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-4 shadow-[var(--shadow-sm)]",
        className
      )}
    >
      <h2 id={id} className={cn(ui.subsectionTitle, "text-[color:var(--text)]")}>
        {title}
      </h2>
      <div className={cn(ui.body, "mt-2 max-w-2xl text-[color:var(--text)]")}>
        {children}
      </div>
    </section>
  );
}
