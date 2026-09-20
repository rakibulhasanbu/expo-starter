import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/types/api-types";

import { fetchBanks, fetchBeneficiaries, fetchWithdrawConfig } from "../api/withdraw-api";

export const withdrawKeys = {
  all: [QueryKeys.WITHDRAW] as const,
  banks: () => [...withdrawKeys.all, "banks"] as const,
  beneficiaries: () => [...withdrawKeys.all, "beneficiaries"] as const,
  config: () => [...withdrawKeys.all, "config"] as const,
};

/** The supported-bank directory. Effectively static, so it never goes stale. */
export const useBanksQuery = () => {
  return useQuery({
    queryKey: withdrawKeys.banks(),
    queryFn: fetchBanks,
    select: (response) => response.data,
    staleTime: Infinity,
  });
};

export const useBeneficiariesQuery = () => {
  return useQuery({
    queryKey: withdrawKeys.beneficiaries(),
    queryFn: () => fetchBeneficiaries(1),
    select: (response) => response.data,
  });
};

export const useWithdrawConfigQuery = () => {
  return useQuery({
    queryKey: withdrawKeys.config(),
    queryFn: fetchWithdrawConfig,
    select: (response) => response.data,
  });
};
