import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/types/api-types";

import { fetchTransactionById, fetchTransactions } from "../api/transactions-api";
import type { TransactionType } from "../types";

export const transactionsKeys = {
  all: [QueryKeys.TRANSACTIONS] as const,
  list: (type?: TransactionType) => [...transactionsKeys.all, "list", type ?? "all"] as const,
  detail: (id: string) => [...transactionsKeys.all, "detail", id] as const,
};

export const useTransactionsQuery = (type?: TransactionType) => {
  return useQuery({
    queryKey: transactionsKeys.list(type),
    queryFn: () => fetchTransactions(type),
    select: (data) => data.data,
  });
};

export const useTransactionQuery = (id: string) => {
  return useQuery({
    queryKey: transactionsKeys.detail(id),
    queryFn: () => fetchTransactionById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};
