/**
 * Artigos educativos (SEO). Conteúdo em `registry.ts` — um objeto por artigo.
 */
import type { SectorSlug } from "@/data/stocks";
import { ARTICLES } from "./registry";
import type { ArticleRecord } from "./types";

export type { ArticleRecord, ArticleSection } from "./types";

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}

export function getArticleBySlug(slug: string): ArticleRecord | null {
  const key = slug.trim().toLowerCase();
  return ARTICLES.find((a) => a.slug === key) ?? null;
}

export function getArticlesForTicker(ticker: string): ArticleRecord[] {
  const key = ticker.trim().toUpperCase();
  return ARTICLES.filter((a) => a.relatedTickers.includes(key));
}

export function getArticlesForFii(ticker: string): ArticleRecord[] {
  const key = ticker.trim().toUpperCase();
  return ARTICLES.filter((a) => (a.relatedFiis ?? []).includes(key));
}

export function getArticlesForSector(sectorSlug: SectorSlug): ArticleRecord[] {
  return ARTICLES.filter((a) => a.relatedSectors.includes(sectorSlug));
}

export const ALL_ARTICLES: ArticleRecord[] = ARTICLES;
