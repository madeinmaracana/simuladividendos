import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon gerado — alinhado ao tema escuro e ao “R$” do SVG em `public/favicon.svg`. */
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
          backgroundColor: "#0b0b0b",
          borderRadius: 8,
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 700, color: "#34d399", letterSpacing: -1 }}>R$</span>
      </div>
    ),
    { ...size }
  );
}
