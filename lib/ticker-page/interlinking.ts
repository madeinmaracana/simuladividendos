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

/** Hubs “paga quanto” para interlinking mútuo (máx. 4 itens: principal + 3 pares). */
const PAGA_QUANTO_CROSS_ORDER = ["PETR4", "TAEE11", "BBAS3", "EGIE3", "VALE3", "ITUB4"] as const;

/**
 * “Veja também” só para `/acoes/[ticker]-paga-quanto`: visão geral + outras landings paga-quanto.
 */
export function buildAcaoPagaQuantoVejaTambem(symbol: string): InternalLinkItem[] {
  const u = symbol.trim().toUpperCase();
  const allowed = new Set(getAllMockTickers().map((t) => t.trim().toUpperCase()));
  const items: InternalLinkItem[] = [
    { href: acaoPathFromSlug(acaoMainSlug(u)), label: `${u}: visão geral` },
  ];
  for (const t of PAGA_QUANTO_CROSS_ORDER) {
    if (t === u) continue;
    if (!allowed.has(t)) continue;
    items.push({
      href: acaoPathFromSlug(acaoVariantSlug(t, "paga-quanto")),
      label: `${t}: paga quanto?`,
    });
    if (items.length >= 4) break;
  }
  return items.slice(0, 4);
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
