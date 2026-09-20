import type { CurrencyCode } from "../types";

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  NGN: "₦",
  USD: "$",
};

const LOCALE_BY_CURRENCY: Record<CurrencyCode, string> = {
  NGN: "en-NG",
  USD: "en-US",
};

export function formatBalanceParts(amount: number, code: CurrencyCode): { symbol: string; whole: string; decimals: string } {
  const [whole, decimals] = amount.toFixed(2).split(".");
  return {
    symbol: CURRENCY_SYMBOLS[code],
    whole: Number(whole).toLocaleString(LOCALE_BY_CURRENCY[code]),
    decimals,
  };
}

export function formatBalanceCompact(amount: number, code: CurrencyCode): string {
  const { symbol, whole, decimals } = formatBalanceParts(amount, code);
  return `${symbol}${whole}.${decimals}`;
}
