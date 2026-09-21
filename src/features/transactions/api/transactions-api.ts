import type { ApiListResponse, ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import { transactions } from "../data";
import type { CryptoDepositTransaction, Transaction, TransactionType } from "../types";

const SIMULATED_DELAY_MS = 300;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sortByDateDesc = (list: Transaction[]) =>
  [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

type BreetDepositResponse = {
  id: string;
  tradeId: string;
  status: "pending" | "completed" | "flagged";
  asset: string;
  cryptoAmount: number;
  txHash?: string;
  creditedAmountNgn: number;
  createdAt: string;
};

const toCryptoDepositTransaction = (deposit: BreetDepositResponse): CryptoDepositTransaction => ({
  id: deposit.id,
  type: "crypto_deposit",
  status: deposit.status,
  counterpartyName: deposit.asset,
  amount: deposit.creditedAmountNgn,
  date: deposit.createdAt,
  transactionId: deposit.tradeId,
  asset: deposit.asset,
  cryptoAmount: deposit.cryptoAmount,
  txHash: deposit.txHash,
});

// The rest of the transactions list is still mocked (`transactions` in
// `../data`) — real crypto deposits are merged in on top rather than this
// feature being fully migrated to a live backend, which is a larger effort.
const fetchBreetDeposits = async (): Promise<CryptoDepositTransaction[]> => {
  const { data } = await apiClient.get<ApiListResponse<BreetDepositResponse>>("/breet-deposit");
  return data.data.map(toCryptoDepositTransaction);
};

export const fetchTransactions = async (type?: TransactionType): Promise<ApiListResponse<Transaction>> => {
  const [, breetDeposits] = await Promise.all([delay(SIMULATED_DELAY_MS), fetchBreetDeposits().catch(() => [])]);

  const combined: Transaction[] = [...transactions, ...breetDeposits];
  const filtered = sortByDateDesc(type ? combined.filter((transaction) => transaction.type === type) : combined);

  return {
    data: filtered,
    meta: { page: 1, limit: filtered.length, total: filtered.length },
  };
};

export const fetchTransactionById = async (id: string): Promise<ApiResponse<Transaction>> => {
  await delay(SIMULATED_DELAY_MS);

  const mockTransaction = transactions.find((item) => item.id === id);
  const transaction = mockTransaction ?? (await fetchBreetDeposits().catch(() => [])).find((item) => item.id === id);

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return {
    data: transaction,
  };
};
