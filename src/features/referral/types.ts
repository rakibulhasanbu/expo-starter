export type ReferralStatus = "earned" | "pending";

export type Referral = {
  id: string;
  name: string;
  avatarId: string;
  status: ReferralStatus;
};

export type ReferralSummary = {
  code: string;
  totalEarned: number;
  bonusAmount: number;
  minimumDepositUsd: number;
};
