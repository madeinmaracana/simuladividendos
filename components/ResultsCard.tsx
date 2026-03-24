interface ResultsCardProps {
  title: string;
  value: string;
  subtitle?: string;
  estimateLabel?: string;
}

export function ResultsCard({
  title,
  value,
  subtitle,
  estimateLabel = "Estimativa",
}: ResultsCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <span className="text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
        {estimateLabel}
      </span>
      <h3 className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</h3>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-neutral-900 dark:text-neutral-50">
        {value}
      </p>
      {subtitle ? (
        <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
