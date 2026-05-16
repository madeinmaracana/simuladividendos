import Link from "next/link";

interface SectorChip {
  label: string;
  href: string;
}

interface SectorChipsSectionProps {
  title: string;
  items: SectorChip[];
}

export function SectorChipsSection({ title, items }: SectorChipsSectionProps) {
  return (
    <div className="flex flex-col w-full" style={{ gap: 24 }}>
      <p
        style={{
          margin: 0,
          fontSize: 24,
          fontWeight: 400,
          color: "#000",
          lineHeight: "normal",
          letterSpacing: "-0.48px",
        }}
      >
        {title}
      </p>
      <div className="flex flex-wrap" style={{ gap: 8 }}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="no-underline sector-chip"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999999,
              padding: "8px 16px",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "normal",
              background: "#fff",
              color: "#111827",
              whiteSpace: "nowrap",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
