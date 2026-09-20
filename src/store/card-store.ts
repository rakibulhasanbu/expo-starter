import { create } from "zustand";

import {
  DEFAULT_BILLING_ADDRESS,
  DEFAULT_CARD_NUMBER,
  DEFAULT_CVV,
  DEFAULT_EXPIRY_DATE,
  DEFAULT_MASKED_NUMBER,
  DEFAULT_ZIP_CODE,
  INITIAL_CARD,
} from "@/features/card/data";
import type { CardTheme, VirtualCard } from "@/features/card/types";
import { convertNairaToUsd, convertUsdToNaira } from "@/features/card/utils/convert-currency";
import type { BillType } from "@/features/bill-payment/types";
import { addTransaction } from "@/features/transactions/data";
import type { Transaction } from "@/features/transactions/types";

type CreateCardInput = {
  holderName: string;
  theme: CardTheme;
};

type AddMoneyResult = {
  usdAdded: number;
  transaction: Transaction;
};

type WithdrawResult = {
  nairaReceived: number;
  transaction: Transaction;
};

type PayBillInput =
  | { type: "electricity"; amount: number; billerName: string; meterNumber: string; billType: BillType }
  | { type: "airtime"; amount: number; networkName: string; phoneNumber: string };

type PayBillResult = {
  transaction: Transaction;
  token?: string;
};

type StatementFormat = "PDF" | "CSV";

type RequestStatementInput = {
  startDate: Date;
  endDate: Date;
  format: StatementFormat;
};

type CardState = {
  card: VirtualCard | null;
  createCard: (input: CreateCardInput) => Promise<VirtualCard>;
  addMoney: (nairaAmount: number) => Promise<AddMoneyResult>;
  withdraw: (usdAmount: number) => Promise<WithdrawResult>;
  payBill: (input: PayBillInput) => Promise<PayBillResult>;
  toggleFreeze: () => Promise<void>;
  deleteCard: () => Promise<void>;
  requestStatement: (input: RequestStatementInput) => Promise<void>;
  reset: () => void;
};

export const useCardStore = create<CardState>((set, get) => ({
  card: INITIAL_CARD,

  createCard: async ({ holderName, theme }) => {
    // Simulated latency until a real create-card endpoint exists.
    await new Promise((resolve) => setTimeout(resolve, 2200));

    const card: VirtualCard = {
      id: `card_${Date.now()}`,
      holderName,
      maskedNumber: DEFAULT_MASKED_NUMBER,
      cardNumber: DEFAULT_CARD_NUMBER,
      cvv: DEFAULT_CVV,
      expiryDate: DEFAULT_EXPIRY_DATE,
      billingAddress: DEFAULT_BILLING_ADDRESS,
      zipCode: DEFAULT_ZIP_CODE,
      theme,
      isVirtual: true,
      createdAt: new Date().toISOString(),
      status: "active",
      balanceUsd: 0,
    };

    set({ card });
    return card;
  },

  addMoney: async (nairaAmount) => {
    // Simulated latency until a real top-up endpoint exists.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const card = get().card;
    if (!card) throw new Error("No card to add money to");

    const { usdReceived } = convertNairaToUsd(nairaAmount);

    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      type: "deposit",
      counterpartyName: "DOLO Card Top-up",
      amount: nairaAmount,
      date: new Date().toISOString(),
      senderBank: "DOLO Wallet",
      transactionId: `dolo_topup_${Date.now()}`,
    };
    addTransaction(transaction);

    set({ card: { ...card, balanceUsd: card.balanceUsd + usdReceived } });

    return { usdAdded: usdReceived, transaction };
  },

  withdraw: async (usdAmount) => {
    // Simulated latency until a real withdraw endpoint exists.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const card = get().card;
    if (!card) throw new Error("No card to withdraw from");

    const { feeUsd, nairaReceived } = convertUsdToNaira(usdAmount);
    const totalDebit = usdAmount + feeUsd;
    if (totalDebit > card.balanceUsd) throw new Error("Insufficient card balance");

    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      type: "withdrawal",
      counterpartyName: "DOLO Card Withdrawal",
      amount: nairaReceived,
      date: new Date().toISOString(),
      walletSource: "Virtual Card",
      recipientBank: "DOLO Wallet",
      recipientName: card.holderName,
      recipientAccountNumber: "-",
      narration: "Card withdrawal to wallet",
      transactionId: `dolo_withdraw_${Date.now()}`,
    };
    addTransaction(transaction);

    set({ card: { ...card, balanceUsd: card.balanceUsd - totalDebit } });

    return { nairaReceived, transaction };
  },

  payBill: async (input) => {
    // Simulated latency until a real bill-payment/aggregator endpoint exists.
    // No NGN wallet balance is tracked yet, so this only records the transaction.
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const isElectricity = input.type === "electricity";

    const transaction: Transaction = {
      id: `txn_${Date.now()}`,
      type: "withdrawal",
      counterpartyName: isElectricity ? input.billerName : input.networkName,
      amount: input.amount,
      date: new Date().toISOString(),
      walletSource: "NGN Wallet",
      recipientBank: "DOLO Wallet",
      recipientName: isElectricity ? input.billerName : input.networkName,
      recipientAccountNumber: isElectricity ? input.meterNumber : input.phoneNumber,
      narration: isElectricity ? "Electricity bill" : "Airtime purchase",
      transactionId: `dolo_bill_${Date.now()}`,
    };
    addTransaction(transaction);

    if (!isElectricity) return { transaction };

    const token = String(Math.floor(Math.random() * 1e19)).padStart(19, "0").slice(0, 19);
    return { transaction, token };
  },

  toggleFreeze: async () => {
    // Simulated latency until a real freeze/unfreeze endpoint exists.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const card = get().card;
    if (!card) return;

    set({ card: { ...card, status: card.status === "frozen" ? "active" : "frozen" } });
  },

  deleteCard: async () => {
    // Simulated latency until a real delete-card endpoint exists.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    set({ card: null });
  },

  requestStatement: async () => {
    // Simulated latency until a real statement-request endpoint exists.
    await new Promise((resolve) => setTimeout(resolve, 1800));
  },

  reset: () => set({ card: null }),
}));
