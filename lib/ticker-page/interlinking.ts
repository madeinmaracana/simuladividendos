import { acaoMainSlug, acaoPathFromSlug, acaoVariantSlug } from "@/lib/acoes/acao-slug";
import { fiiMainSlug, fiiPathFromSlug, fiiVariantSlug } from "@/lib/fiis/fii-slug";
import { getFiiPath, type FiiSeoRecord } from "@/data/fiis";
import { getAllMockTickers, getTickerPath, type StockSeoRecord } from "@/lib/stocks-data";

export type InternalLinkItem = { href: string; label: string };

function normalizeSlugKey(slug: string): string {
  return decodeURIComponent(slug).trim().toLowerCase();
}

/** Até 4 links de intenção (exclui a página atual). */
export function buildAcaoVejaTambemLinks(symbol: string, currentSlug: string): InternalLinkItem[] {
  const u = symbol.trim().toUpperCase();
  const cur = normalizeSlugKey(currentSlug);
  const candidates: { slug: string; label: string }[] = [
    { slug: acaoMainSlug(u), label: `${u}: visão geral` },
    { slug: acaoVariantSlug(u, "paga-quanto"), label: `${u}: paga quanto?` },
    { slug: acaoVariantSlug(u, "quanto-rende-100-cotas"), label: `${u}: quanto rendem 100 cotas` },
    { slug: acaoVariantSlug(u, "simulador"), label: `${u}: simulador` },
  ];
  return candidates
    .filter((c) => normalizeSlugKey(c.slug) !== cur)
    .map((c) => ({ href: acaoPathFromSlug(c.slug), label: c.label }));
}

/** Prioridade para interlinking mútuo entre landings “paga-quanto”; depois entram os demais tickers do registry. */
const PAGA_QUANTO_HUB_PRIORITY = [
  "PETR4",
  "TAEE11",
  "BBAS3",
  "EGIE3",
  "VALE3",
  "ITUB4",
  "ABEV3",
] as const;

const MAX_PAGA_QUANTO_VEJA_TAMBEM = 5;

/**
 * “Veja também” para `/acoes/[ticker]-paga-quanto`: visão geral + até 3 outras landings paga-quanto + simulador (máx. 5).
 */
export function buildAcaoPagaQuantoVejaTambem(symbol: string): InternalLinkItem[] {
  const u = symbol.trim().toUpperCase();
  const allowed = new Set(getAllMockTickers().map((t) => t.trim().toUpperCase()));
  const items: InternalLinkItem[] = [
    { href: acaoPathFromSlug(acaoMainSlug(u)), label: `${u}: visão geral` },
  ];

  const ordered: string[] = [];
  for (const t of PAGA_QUANTO_HUB_PRIORITY) {
    if (allowed.has(t) && !ordered.includes(t)) ordered.push(t);
  }
  for (const t of [...allowed].sort((a, b) => a.localeCompare(b, "pt-BR"))) {
    if (!ordered.includes(t)) ordered.push(t);
  }

  let cross = 0;
  for (const t of ordered) {
    if (t === u) continue;
    items.push({
      href: acaoPathFromSlug(acaoVariantSlug(t, "paga-quanto")),
      label: `${t}: paga quanto?`,
    });
    cross++;
    if (cross >= 3) break;
  }

  items.push({ href: "/simulador", label: "Simulador geral" });
  return items.slice(0, MAX_PAGA_QUANTO_VEJA_TAMBEM);
}

/** Até 4 links de intenção (exclui a página atual). */
export function buildFiiVejaTambemLinks(symbol: string, currentSlug: string): InternalLinkItem[] {
  const u = symbol.trim().toUpperCase();
  const cur = normalizeSlugKey(currentSlug);
  const candidates: { slug: string; label: string }[] = [
    { slug: fiiMainSlug(u), label: `${u}: página principal` },
    { slug: fiiVariantSlug(u, "paga-quanto"), label: `${u}: paga quanto?` },
    { slug: fiiVariantSlug(u, "quanto-rende-100-cotas"), label: `${u}: quanto rendem 100 cotas` },
    { slug: fiiVariantSlug(u, "simulador"), label: `${u}: simulador` },
  ];
  return candidates
    .filter((c) => normalizeSlugKey(c.slug) !== cur)
    .map((c) => ({ href: fiiPathFromSlug(c.slug), label: c.label }));
}

const MAX_RELATED = 5;

/** Outras ações do mesmo setor (ordem estável, no máximo 5). */
export function buildAcaoRelacionadosLinks(peers: StockSeoRecord[], symbol: string): InternalLinkItem[] {
  const u = symbol.trim().toUpperCase();
  return [...peers]
    .filter((p) => p.ticker !== u)
    .sort((a, b) => a.ticker.localeCompare(b.ticker, "pt-BR"))
    .slice(0, MAX_RELATED)
    .map((p) => ({
      href: getTickerPath(p.ticker),
      label: p.ticker,
    }));
}

/** Outros FIIs cadastrados (ordem estável, no máximo 5). */
export function buildFiiRelacionadosLinks(peers: FiiSeoRecord[], symbol: string): InternalLinkItem[] {
  const u = symbol.trim().toUpperCase();
  return [...peers]
    .filter((p) => p.ticker !== u)
    .sort((a, b) => a.ticker.localeCompare(b.ticker, "pt-BR"))
    .slice(0, MAX_RELATED)
    .map((p) => ({
      href: getFiiPath(p.ticker),
      label: p.ticker,
    }));
}
