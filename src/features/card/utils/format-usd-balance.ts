export function formatUsdBalance(amount: number): string {
  if (amount === 0) return "$0";

  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
