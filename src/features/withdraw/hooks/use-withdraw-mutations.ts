import { useMutation, useQueryClient } from "@tanstack/react-query";

import { homeKeys } from "@/features/home/hooks/use-home-queries";
import { transactionsKeys } from "@/features/transactions/hooks/use-transactions-queries";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";

import { createWithdrawal, deleteBeneficiary, saveBeneficiary, verifyBankAccount } from "../api/withdraw-api";
import type { CreateWithdrawalPayload } from "../types";
import { withdrawKeys } from "./use-withdraw-queries";

/** Account-name lookup. Nothing is cached — it re-runs per account/bank pair. */
export const useVerifyBankAccountMutation = () => {
  return useMutation({
    mutationFn: verifyBankAccount,
  });
};

export const useSaveBeneficiaryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveBeneficiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: withdrawKeys.beneficiaries() });
    },
  });
};

export const useDeleteBeneficiaryMutation = () => {
  const queryClient = useQueryClient();
  const showToast = useToastStore((state) => state.show);

  return useMutation({
    mutationFn: deleteBeneficiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: withdrawKeys.beneficiaries() });
      showToast("success", "Beneficiary removed");
    },
    onError: (error) => {
      showToast("error", getErrorMessage(error));
    },
  });
};

export const useCreateWithdrawalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, pin }: { payload: CreateWithdrawalPayload; pin: string }) =>
      createWithdrawal(payload, pin),
    onSuccess: () => {
      // The wallet was debited server-side, so both the balance and the ledger
      // the user lands back on are now stale.
      queryClient.invalidateQueries({ queryKey: homeKeys.all });
      queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
    },
  });
};
