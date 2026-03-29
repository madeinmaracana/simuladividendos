import { ImageResponse } from "next/og";
import type { TickerOgPayload } from "@/lib/og/ticker-og-data";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const BG = "#0b0b0b";
const TEXT = "#ededed";
const MUTED = "#a1a1a1";
const ACCENT = "#34d399";
const BORDER = "#1f1f1f";

export function createTickerOgImageResponse(payload: TickerOgPayload) {
  const { symbol, headline, subline, perShareLine, logoDataUrl } = payload;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 56,
          backgroundColor: BG,
          border: `1px solid ${BORDER}`,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            width: 200,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 24,
            backgroundColor: "#141414",
            border: `1px solid ${BORDER}`,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {logoDataUrl ? (
            <img src={logoDataUrl} alt="" width={160} height={160} style={{ objectFit: "contain" }} />
          ) : (
            <span
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: TEXT,
                letterSpacing: "-0.02em",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              {symbol}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            marginLeft: 48,
            gap: 16,
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: TEXT,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
            }}
          >
            {headline}
          </div>
          {subline ? (
            <div style={{ fontSize: 28, color: MUTED, fontWeight: 500 }}>{subline}</div>
          ) : null}
          {perShareLine ? (
            <div style={{ fontSize: 26, color: ACCENT, fontWeight: 600, marginTop: 8 }}>{perShareLine}</div>
          ) : (
            <div style={{ fontSize: 24, color: MUTED, marginTop: 4 }}>
              Dados de proventos quando disponíveis na fonte · simulador no site
            </div>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 56,
            fontSize: 20,
            color: MUTED,
            fontWeight: 500,
          }}
        >
          Simula Dividendos
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    }
  );
}
