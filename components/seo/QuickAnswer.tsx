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
        "rounded-xl border border-teal-200/80 bg-teal-50/60 px-4 py-4 dark:border-teal-900/60 dark:bg-teal-950/25",
        className
      )}
    >
      <h2 id={id} className={cn(ui.subsectionTitle, "text-teal-900 dark:text-teal-100")}>
        {title}
      </h2>
      <div className={cn(ui.body, "mt-2 max-w-2xl text-neutral-800 dark:text-neutral-200")}>
        {children}
      </div>
    </section>
  );
}
