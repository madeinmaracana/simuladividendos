import type { DividendCalculation, DividendEntry, NextDividendEstimate } from "./types";

function startOfDayUTC(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function parsePaymentTime(iso: string): number {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : NaN;
}

/** Soma taxas por data de pagamento (mesmo dia = um evento). */
function groupByPaymentDate(entries: DividendEntry[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const e of entries) {
    const t = parsePaymentTime(e.paymentDate);
    if (!Number.isFinite(t)) continue;
    const dayKey = new Date(t).toISOString().slice(0, 10);
    map.set(dayKey, (map.get(dayKey) ?? 0) + e.ratePerShare);
  }
  return map;
}

function pickNextDividendEstimate(
  entries: DividendEntry[],
  shares: number,
  now: Date = new Date()
): NextDividendEstimate | null {
  const grouped = groupByPaymentDate(entries);
  if (grouped.size === 0) return null;

  const todayStart = startOfDayUTC(now);
  const sortedDays = [...grouped.keys()].sort();

  let chosenDay: string | null = null;
  let isFuture = false;

  for (const day of sortedDays) {
    const dayStart = Date.parse(day + "T00:00:00.000Z");
    if (dayStart >= todayStart) {
      chosenDay = day;
      isFuture = true;
      break;
    }
  }

  if (!chosenDay) {
    chosenDay = sortedDays[sortedDays.length - 1]!;
    isFuture = false;
  }

  const totalPerShare = grouped.get(chosenDay) ?? 0;
  return {
    paymentDate: chosenDay + "T12:00:00.000Z",
    totalPerShare,
    totalForShares: totalPerShare * shares,
    isFuture,
  };
}

export function calculateDividends(
  dividends: DividendEntry[],
  shares: number,
  now: Date = new Date()
): DividendCalculation {
  const safeShares = Math.max(0, shares);
  const last12m = filterLastMonths(dividends, 12, now);
  const perShare12m = last12m.reduce((s, d) => s + d.ratePerShare, 0);
  const total12mEstimate = perShare12m * safeShares;
  const monthlyAvgEstimate = total12mEstimate / 12;
  const annualEstimate = total12mEstimate;

  const sortedRecent = [...dividends]
    .filter((e) => Number.isFinite(parsePaymentTime(e.paymentDate)))
    .sort((a, b) => parsePaymentTime(b.paymentDate) - parsePaymentTime(a.paymentDate));

  return {
    shares: safeShares,
    perShare12m,
    total12mEstimate,
    monthlyAvgEstimate,
    annualEstimate,
    nextDividend: pickNextDividendEstimate(dividends, safeShares, now),
    dividendsLast12m: last12m,
    recentDividends: sortedRecent.slice(0, 24),
  };
}

function filterLastMonths(
  entries: DividendEntry[],
  months: number,
  now: Date
): DividendEntry[] {
  const cutoff = new Date(now);
  cutoff.setUTCMonth(cutoff.getUTCMonth() - months);
  const cutoffMs = cutoff.getTime();
  const nowMs = now.getTime();

  return entries.filter((e) => {
    const t = parsePaymentTime(e.paymentDate);
    return Number.isFinite(t) && t >= cutoffMs && t <= nowMs;
  });
}
