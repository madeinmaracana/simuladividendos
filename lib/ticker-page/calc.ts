/** Total recebido = dividendo por ação × quantidade de ações. */
export function calcPaymentTotal(dividendPerShare: number, shares: number): number {
  const s = Math.max(0, Math.floor(shares));
  if (!Number.isFinite(dividendPerShare) || dividendPerShare < 0) return 0;
  return dividendPerShare * s;
}
