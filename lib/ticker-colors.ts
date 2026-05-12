/** Paleta de cores para círculos de ativos sem logo */
const ACCENT_PALETTE = [
  "#4CAF50", // verde
  "#2196F3", // azul
  "#FF9800", // laranja
  "#E91E63", // pink
  "#9C27B0", // roxo
  "#00BCD4", // ciano
  "#FF5722", // laranja-escuro
  "#3F51B5", // índigo
  "#009688", // teal
  "#F44336", // vermelho
];

/** Gera uma cor accent determinística a partir do ticker */
export function tickerAccentColor(ticker: string): string {
  let hash = 0;
  for (let i = 0; i < ticker.length; i++) {
    hash = (hash * 31 + ticker.charCodeAt(i)) & 0xffff;
  }
  return ACCENT_PALETTE[hash % ACCENT_PALETTE.length];
}
