import { ImageResponse } from "next/og";

export const alt = "Simula Dividendos — simulador de dividendos na B3";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG estática da home e páginas sem rota própria. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0b0b",
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <span style={{ fontSize: 96, fontWeight: 800, color: "#34d399", letterSpacing: -4 }}>R$</span>
        <span style={{ fontSize: 56, fontWeight: 700, color: "#ededed", marginTop: 24 }}>Simula Dividendos</span>
        <span style={{ fontSize: 28, color: "#a1a1a1", marginTop: 16 }}>
          Dividendos, FIIs e simulação na B3
        </span>
      </div>
    ),
    { ...size }
  );
}
