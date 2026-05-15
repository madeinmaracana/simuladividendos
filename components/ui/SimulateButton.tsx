interface SimulateButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  /** dark = white button (hero sections), light = dark button (light sections) */
  theme?: "light" | "dark";
}

export function SimulateButton({
  onClick,
  loading,
  disabled,
  label = "Simular dividendos",
  theme = "dark",
}: SimulateButtonProps) {
  const isLight = theme === "light";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className={`flex w-full items-center gap-4 rounded-full p-[4px] transition disabled:cursor-not-allowed disabled:opacity-40 ${
        isLight
          ? "bg-[#111827] hover:bg-[#1f2937]"
          : "bg-white hover:bg-white/90"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-full p-[10px] ${
          isLight ? "bg-white" : "bg-black"
        }`}
      >
        <span
          className={`material-symbols-outlined leading-none ${
            isLight ? "text-[#111827]" : "text-white"
          }`}
          style={{
            fontSize: 18,
            fontVariationSettings: "'opsz' 20, 'wght' 500, 'FILL' 0, 'GRAD' 0",
          }}
        >
          arrow_forward
        </span>
      </span>
      <span className={`text-base font-semibold ${isLight ? "text-white" : "text-black"}`}>
        {loading ? "Carregando…" : label}
      </span>
    </button>
  );
}
