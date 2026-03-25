/**
 * SEO programático: títulos, descrições, FAQs e textos de resumo derivados de dados + API.
 *
 * - Ações: {@link ./stock-seo}
 * - FIIs: {@link ./fii-page-seo}
 *
 * Registros centrais: `data/tickers.ts`, `data/fii-registry.ts`.
 */
export {
  generateDescription,
  generateFAQ,
  generateSummaryText,
  generateTitle,
} from "./stock-seo";

export {
  generateFiiProgrammaticDescription,
  generateFiiProgrammaticFAQ,
  generateFiiProgrammaticTitle,
} from "./fii-page-seo";
