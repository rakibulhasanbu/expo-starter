import type { Transaction } from "./types";

export const transactions: Transaction[] = [
  {
    id: "txn-1",
    type: "deposit",
    counterpartyName: "Andrew James",
    amount: 40000,
    date: "2026-05-13",
    senderBank: "Gt Bank",
    transactionId: "dbnfajfqeifiefnq3256289dwd",
  },
  {
    id: "txn-2",
    type: "withdrawal",
    counterpartyName: "Andrew James",
    amount: 10000,
    date: "2026-05-13",
    walletSource: "NGN Wallet",
    recipientBank: "Gt Bank",
    recipientName: "Andrew James",
    recipientAccountNumber: "0123456789",
    narration: "-",
    transactionId: "dbnfajfqeifiefnq3256289dwd",
  },
  {
    id: "txn-3",
    type: "deposit",
    counterpartyName: "Sarah Chen",
    amount: 10000,
    date: "2026-05-10",
    senderBank: "Access Bank",
    transactionId: "a3fbcqeifiefnq3256289ecdf",
  },
  {
    id: "txn-4",
    type: "withdrawal",
    counterpartyName: "David Okon",
    amount: 25000,
    date: "2026-05-08",
    walletSource: "NGN Wallet",
    recipientBank: "Zenith Bank",
    recipientName: "David Okon",
    recipientAccountNumber: "0987654321",
    narration: "Rent payment",
    transactionId: "bcaf39fqeifiefnq325aa17dwd",
  },
  {
    id: "txn-5",
    type: "deposit",
    counterpartyName: "Amaka Eze",
    amount: 15000,
    date: "2026-05-05",
    senderBank: "UBA",
    transactionId: "e912dfqeifiefnq3256289f4b",
  },
  {
    id: "txn-6",
    type: "withdrawal",
    counterpartyName: "Tunde Bakare",
    amount: 5000,
    date: "2026-05-02",
    walletSource: "NGN Wallet",
    recipientBank: "First Bank",
    recipientName: "Tunde Bakare",
    recipientAccountNumber: "0223344556",
    narration: "Airtime",
    transactionId: "77c1dfqeifiefnq3256289331",
  },
];

export function addTransaction(transaction: Transaction) {
  transactions.unshift(transaction);
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const initials = parts.length === 1 ? parts[0].slice(0, 2) : `${parts[0][0]}${parts[parts.length - 1][0]}`;
  return initials.toUpperCase();
}
