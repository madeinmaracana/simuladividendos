import { ImageResponse } from "next/og";
import { fetchLogoAsDataUrl } from "@/lib/og/ticker-og-data";
import { getSeoBaseUrl } from "@/lib/site";

export const OG_API_SIZE = { width: 1200, height: 630 } as const;

const BG = "#0B0F0E";
const PANEL = "#111111";
const TEXT = "#f5f5f5";
const MUTED = "#9ca3af";
const ACCENT = "#00E676";
const BORDER = "#1f2926";

export type ApiOgImageInput = {
  ticker: string;
  /** Nome opcional — linha discreta abaixo da pergunta. */
  entityName?: string | null;
  /** `R$ X,XX` ou null → copy de fallback. */
  valorFormatted: string | null;
  assetLabel: "ação" | "cota";
  logoDataUrl: string | null;
};

function footerDomain(): string {
  try {
    const host = new URL(getSeoBaseUrl()).hostname.replace(/^www\./i, "");
    return host || "simuladividendos.com";
  } catch {
    return "simuladividendos.com";
  }
}

/**
 * Layout 1200×630 — hierarquia: valor → pergunta → ticker.
 * Tipografia: system-ui / Inter-like stack suportada pelo `next/og`.
 */
export function createApiOgImageResponse(input: ApiOgImageInput) {
  const sym = input.ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, "") || "B3";
  const question = `${sym} paga quanto?`;
  const hasValor = Boolean(input.valorFormatted?.trim());
  const entity =
    input.entityName?.trim() &&
    input.entityName.trim().toUpperCase() !== sym &&
    input.entityName.trim().slice(0, 80);

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
          padding: 56,
          backgroundColor: BG,
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            width: 184,
            minWidth: 184,
            height: 184,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 22,
            backgroundColor: PANEL,
            border: `1px solid ${BORDER}`,
            overflow: "hidden",
            alignSelf: "center",
          }}
        >
          {input.logoDataUrl ? (
            // next/og (Satori) usa <img> com data URL; next/image não se aplica aqui.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={input.logoDataUrl}
              alt=""
              width={148}
              height={148}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <span
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: TEXT,
                letterSpacing: "-0.04em",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              }}
            >
              {sym}
            </span>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            marginLeft: 48,
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          {hasValor ? (
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 102,
                  fontWeight: 800,
                  color: ACCENT,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.98,
                }}
              >
                {input.valorFormatted}
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: ACCENT,
                  marginTop: 12,
                  opacity: 0.92,
                }}
              >
                {`por ${input.assetLabel}`}
              </div>
            </div>
          ) : (
            <div
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: TEXT,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                marginBottom: 22,
                maxWidth: 900,
              }}
            >
              Veja quanto paga em dividendos
            </div>
          )}

          <div
            style={{
              fontSize: hasValor ? 44 : 36,
              fontWeight: 800,
              color: TEXT,
              lineHeight: 1.12,
              letterSpacing: "-0.04em",
              marginBottom: entity ? 10 : 14,
            }}
          >
            {question}
          </div>

          {entity ? (
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: MUTED,
                marginBottom: 14,
                lineHeight: 1.35,
              }}
            >
              {entity}
            </div>
          ) : null}

          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: MUTED,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              marginBottom: 6,
            }}
          >
            {sym}
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: MUTED,
              marginTop: 8,
            }}
          >
            Simule seus dividendos
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 56,
            fontSize: 17,
            color: MUTED,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          {footerDomain()}
        </div>
      </div>
    ),
    {
      width: OG_API_SIZE.width,
      height: OG_API_SIZE.height,
      headers: {
        // Evita cache “immutable” de 1 ano com corpo vazio (Edge) e permite atualizar dividendos.
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400",
      },
    }
  );
}

/** Fallback garantido (sem logo/valor externos) se a rota falhar. */
export function createApiOgSafeFallbackResponse(
  ticker: string,
  assetLabel: "ação" | "cota" = "ação"
) {
  return createApiOgImageResponse({
    ticker,
    entityName: null,
    valorFormatted: null,
    assetLabel,
    logoDataUrl: null,
  });
}

/** Monta `ImageResponse` após buscar a logo (data URL) — uso na rota `/api/og`. */
export async function createApiOgImageResponseFromTicker(input: {
  ticker: string;
  nome?: string | null;
  valorFormatted: string | null;
  assetLabel: "ação" | "cota";
  logoRemoteUrl: string | null;
}) {
  let logoDataUrl: string | null = null;
  try {
    logoDataUrl = await fetchLogoAsDataUrl(input.logoRemoteUrl);
  } catch {
    logoDataUrl = null;
  }
  return createApiOgImageResponse({
    ticker: input.ticker,
    entityName: input.nome,
    valorFormatted: input.valorFormatted,
    assetLabel: input.assetLabel,
    logoDataUrl,
  });
}
