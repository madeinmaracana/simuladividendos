import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <span style={{ fontSize: 72, fontWeight: 800, color: "#34d399", letterSpacing: -4 }}>R$</span>
        <span style={{ fontSize: 18, fontWeight: 600, color: "#a1a1a1", marginTop: 8 }}>Simula</span>
      </div>
    ),
    { ...size }
  );
}
