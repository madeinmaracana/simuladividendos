import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — fundo escuro e acento verde (#00E676), alinhado às OG dinâmicas. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          borderRadius: 8,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 800, color: "#00E676", letterSpacing: -1 }}>D</span>
      </div>
    ),
    { ...size }
  );
}
