/** A bank from `GET /breet/banks`. `id` is what verify/save expect as `bankId`. */
export type Bank = {
  id: string;
  name: string;
  slug: string;
  country: string;
  currency: string;
  type: string;
  avatar: string;
};

/** The account-name lookup result from `POST /breet/banks/verify`. */
export type VerifiedAccount = {
  accountNumber: string;
  type: string;
  bankName: string;
  accountName: string;
};

/**
 * A saved payout bank — what the UI calls a beneficiary. `id` is our own row id
 * and is what the withdrawal endpoint expects as `breetBankId`.
 */
export type Beneficiary = {
  id: string;
  savedBankId: string;
  bankId: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  currency: "ngn" | "ghs";
  narration: string | null;
  disabled: boolean;
  createdAt: string;
};

export type WithdrawalStatus = "pending" | "processing" | "approved" | "denied";

export type WithdrawalRequest = {
  id: string;
  amount: number;
  serviceCharge: number;
  finalAmount: number;
  status: WithdrawalStatus;
  accountNumber: string | null;
  bankName: string | null;
  message: string | null;
  createdAt: string;
};

/**
 * The slice of `GET /configuration` the withdrawal form needs. The fee is applied
 * on top of the amount, so the wallet is debited `amount + serviceCharge`.
 */
export type WithdrawConfig = {
  serviceChargePercentage: number;
  minWithdrawalAmount: number;
};

export type SaveBeneficiaryPayload = {
  bankId: string;
  accountNumber: string;
  narration?: string;
};

export type CreateWithdrawalPayload = {
  amount: number;
  breetBankId: string;
  narration?: string;
};
