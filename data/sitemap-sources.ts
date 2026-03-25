/**
 * Fontes de URL usadas pelo sitemap — um único lugar para descobrir “de onde vêm as rotas”.
 * O XML em si é montado em `lib/sitemap/build-sitemap.ts` e exposto via `app/sitemap.ts`.
 */
export { ALL_ARTICLES, getAllArticleSlugs } from "@/data/articles";
export { MOCK_FIIS, getAllMockFiiTickers, getFiiPath } from "@/data/fiis";
export {
  getAllMockTickers,
  getAllSectorSlugs,
  getSectorPath,
  getTickerPath,
  MOCK_STOCKS,
} from "@/data/stocks";
