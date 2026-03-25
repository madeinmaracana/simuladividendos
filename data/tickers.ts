/**
 * Registry bruto + lista normalizada.
 * Para adicionar tickers, edite `data/stocks/tickers.registry.ts`.
 */
export type { StockSeoRecord, StockSeoDefinition } from "@/data/stocks";
export { TICKER_DEFINITIONS } from "@/data/stocks";
export { getStockSeo, getPeerTickers, getTickerPath, MOCK_STOCKS } from "@/data/stocks";

/** Alias da lista usada em SSG (mesmo que `MOCK_STOCKS`). */
export { MOCK_STOCKS as TICKERS } from "@/data/stocks";
