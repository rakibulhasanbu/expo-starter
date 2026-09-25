import type { Referral, ReferralSummary } from "./types";

// Intentionally mock-only: refer-and-earn is template UI with no backend by
// design (TICKET-01). Values mirror the Figma mock.
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
