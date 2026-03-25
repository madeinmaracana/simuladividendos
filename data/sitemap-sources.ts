/**
 * Fontes de URL usadas pelo sitemap — um único lugar para descobrir “de onde vêm as rotas”.
 * Registros canônicos: `data/tickers.ts`, `data/fii-registry.ts` → normalizados em `MOCK_STOCKS` / `MOCK_FIIS`.
 * O XML em si é montado em `lib/sitemap/build-sitemap.ts` e exposto via `app/sitemap.ts`.
 */
export { ALL_ARTICLES, getAllArticleSlugs } from "@/data/articles";
export {
  buildAllFiiStaticParams,
  FII_DEFINITIONS,
  fiiPagePath,
} from "@/data/fii-registry";
export { MOCK_FIIS, getAllMockFiiTickers, getFiiPath } from "@/data/fiis";
export {
  buildAllTickerStaticParams,
  TICKER_DEFINITIONS,
  tickerPagePath,
} from "@/data/tickers";
export {
  getAllMockTickers,
  getAllSectorSlugs,
  getSectorPath,
  getTickerPath,
  MOCK_STOCKS,
} from "@/data/stocks";
