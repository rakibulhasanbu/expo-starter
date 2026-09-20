import type { TransactionLimit } from "./types";

// No backend endpoint exists yet for transaction limits — this mirrors the
// values shown in the Figma mock. Swap for a real query once available.
export const TRANSACTION_LIMITS: TransactionLimit[] = [
  {
    id: "card",
    label: "Card Limit",
    currencySymbol: "$",
    maxDailyLimit: 5000,
    remaining: 5000,
    progressColorClassName: "bg-background",
  },
  {
    id: "bank-transfer",
    label: "Bank Transfer",
    currencySymbol: "₦",
    maxDailyLimit: 20000000,
    remaining: 10000000,
    progressColorClassName: "bg-primary",
  },
];
