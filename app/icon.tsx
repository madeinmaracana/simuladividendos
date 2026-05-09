import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon — quadrado lemon (#A6FF00), cor brand do design system. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#A6FF00",
          borderRadius: 7,
        }}
      />
    ),
    { ...size }
  );
}
