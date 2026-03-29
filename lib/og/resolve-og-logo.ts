import { readFile } from "fs/promises";
import path from "path";
import { fetchLogoAsDataUrl } from "@/lib/og/ticker-og-data";

const MAX_BYTES = 750_000;

function arrayBufferToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

/**
 * PNG opcional em `public/og-logos/{TICKER}.png` (mesmo casing do ticker na B3).
 * Sobrescreve brapi — útil quando a API só expõe SVG (ImageResponse/Satori não embute SVG).
 */
export async function tryLocalOgLogoPng(ticker: string): Promise<string | null> {
  const sym = ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!sym) return null;
  const filePath = path.join(process.cwd(), "public", "og-logos", `${sym}.png`);
  try {
    const buf = await readFile(filePath);
    if (buf.length > MAX_BYTES) return null;
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/**
 * Site institucional por ticker — usado só como fallback de favicon raster (PNG)
 * quando `icons.brapi.dev/...svg` não pode ser usado na OG.
 */
const BRAND_HOME_PAGE: Record<string, string> = {
  ITUB3: "https://www.itau.com.br",
  ITUB4: "https://www.itau.com.br",
  BBAS3: "https://www.bb.com.br",
  BBDC3: "https://www.bradesconline.com.br",
  BBDC4: "https://www.bradesconline.com.br",
  SANB11: "https://www.santander.com.br",
  BPAC11: "https://www.btgpactual.com",
  PETR3: "https://petrobras.com.br",
  PETR4: "https://petrobras.com.br",
  VALE3: "https://www.vale.com",
  WEGE3: "https://www.weg.net",
  ABEV3: "https://www.ab-inbev.com",
  MGLU3: "https://www.magazineluiza.com.br",
  RENT3: "https://www.localiza.com",
  B3SA3: "https://www.b3.com.br",
};

async function fetchRasterImageAsDataUrl(imageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength > MAX_BYTES || buf.byteLength < 64) return null;
    const ct = res.headers.get("content-type")?.split(";")[0]?.trim() || "image/png";
    if (!ct.startsWith("image/") || ct.includes("svg") || ct === "image/webp") return null;
    return `data:${ct};base64,${arrayBufferToBase64(buf)}`;
  } catch {
    return null;
  }
}

/** Favicon PNG via Google (domínio fixo do mapa — não usar URL arbitrária da query). */
async function fetchBrandFaviconPng(siteUrl: string): Promise<string | null> {
  const u = new URL("https://t2.gstatic.com/faviconV2");
  u.searchParams.set("client", "SOCIAL");
  u.searchParams.set("type", "FAVICON");
  u.searchParams.set("fallback_opts", "TYPE,SIZE,URL");
  u.searchParams.set("url", siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`);
  u.searchParams.set("size", "256");
  return fetchRasterImageAsDataUrl(u.toString());
}

/**
 * Ordem: PNG local → raster brapi (PNG/JPEG) → favicon raster do site mapeado → null (UI usa ticker).
 */
export async function resolveOgLogoDataUrl(
  ticker: string,
  brapiLogoUrl: string | null
): Promise<string | null> {
  const sym = ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!sym) return null;

  const local = await tryLocalOgLogoPng(sym);
  if (local) return local;

  const fromBrapi = await fetchLogoAsDataUrl(brapiLogoUrl);
  if (fromBrapi) return fromBrapi;

  const home = BRAND_HOME_PAGE[sym];
  if (home) {
    const fav = await fetchBrandFaviconPng(home);
    if (fav) return fav;
  }

  return null;
}
