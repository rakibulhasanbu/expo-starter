import type { TransactionType } from "../types";

const CREDIT_TYPES: TransactionType[] = ["deposit", "crypto_deposit"];

export function formatSignedNaira(amount: number, type: TransactionType): string {
  const sign = CREDIT_TYPES.includes(type) ? "+" : "-";
  return `${sign}₦${amount.toLocaleString("en-NG")}`;
}

export function formatTransactionDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
