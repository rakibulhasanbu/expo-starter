export type TransactionType = "deposit" | "withdrawal" | "crypto_deposit";

type BaseTransaction = {
  id: string;
  type: TransactionType;
  counterpartyName: string;
  amount: number;
  date: string;
  transactionId: string;
};

export type DepositTransaction = BaseTransaction & {
  type: "deposit";
  senderBank: string;
};

export type WithdrawalTransaction = BaseTransaction & {
  type: "withdrawal";
  walletSource: string;
  recipientBank: string;
  recipientName: string;
  recipientAccountNumber: string;
  narration: string;
};

export type CryptoDepositStatus = "pending" | "completed" | "flagged";

export type CryptoDepositTransaction = BaseTransaction & {
  type: "crypto_deposit";
  status: CryptoDepositStatus;
  asset: string;
  cryptoAmount: number;
  txHash?: string;
};

export type Transaction = DepositTransaction | WithdrawalTransaction | CryptoDepositTransaction;
