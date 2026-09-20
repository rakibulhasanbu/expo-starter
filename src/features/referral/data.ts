import type { Referral, ReferralSummary } from "./types";

// No backend endpoint exists yet for referrals — this mirrors the values
// shown in the Figma mock. Swap for a real query once available.
export const REFERRAL_SUMMARY: ReferralSummary = {
  code: "3EJDCJ99JNK",
  totalEarned: 0,
  bonusAmount: 1500,
  minimumDepositUsd: 200,
};

export const REFERRALS: Referral[] = [
  { id: "1", name: "David", avatarId: "avatar-3", status: "earned" },
  { id: "2", name: "Sarah", avatarId: "avatar-8", status: "earned" },
];
