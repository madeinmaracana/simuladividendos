import { ImageResponse } from "next/og";
import type { TickerOgPayload } from "@/lib/og/ticker-og-data";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const BG = "#0b0b0b";
const TEXT = "#ededed";
const MUTED = "#8c8c8c";
const ACCENT = "#34d399";
const BORDER = "#262626";

/**
 * Hierarquia: ticker (médio) → pergunta (forte) → valor (máximo) → contexto.
 * Logo à esquerda; sem logo, o box mostra o ticker em tamanho médio.
 */
export function createTickerOgImageResponse(payload: TickerOgPayload) {
  const { symbol, question, entityName, perShareValue, assetLabel, logoDataUrl, contextLine } =
    payload;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          padding: 52,
          backgroundColor: BG,
          border: `1px solid ${BORDER}`,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            width: 176,
            minWidth: 176,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            backgroundColor: "#141414",
            border: `1px solid ${BORDER}`,
            overflow: "hidden",
            alignSelf: "center",
          }}
        >
          {logoDataUrl ? (
            <img src={logoDataUrl} alt="" width={140} height={140} style={{ objectFit: "contain" }} />
          ) : (
            <span
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: ACCENT,
                letterSpacing: -2,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              R$
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            marginLeft: 44,
            justifyContent: "center",
            minWidth: 0,
            gap: 0,
          }}
        >
          {/* Ticker — médio */}
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              color: MUTED,
              letterSpacing: "-0.02em",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              marginBottom: 10,
            }}
          >
            {symbol}
          </div>

          {/* Pergunta — forte */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: TEXT,
              lineHeight: 1.12,
              letterSpacing: "-0.04em",
              marginBottom: entityName ? 8 : 20,
            }}
          >
            {question}
          </div>

          {entityName ? (
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: MUTED,
                marginBottom: 20,
                lineHeight: 1.3,
              }}
            >
              {entityName}
            </div>
          ) : null}

          {/* Valor — muito forte (central visual do cartão) */}
          {perShareValue ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  fontSize: 86,
                  fontWeight: 800,
                  color: ACCENT,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {perShareValue}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: ACCENT,
                  opacity: 0.85,
                  marginTop: 10,
                }}
              >
                por {assetLabel}
              </div>
            </div>
          ) : (
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: MUTED,
                marginBottom: 18,
                lineHeight: 1.35,
              }}
            >
              Dados de proventos na fonte · simule no site
            </div>
          )}

          {/* Contexto / CTA */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: TEXT,
              opacity: 0.92,
              marginTop: 4,
            }}
          >
            {contextLine}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 36,
            right: 52,
            fontSize: 18,
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
