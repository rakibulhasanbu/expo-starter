import { useMutation, useQueryClient } from "@tanstack/react-query";

import { generateDepositAddress } from "../api/crypto-deposit-api";
import { cryptoDepositKeys } from "./use-crypto-deposit-queries";

export const useGenerateDepositAddressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateDepositAddress,
    onSuccess: (response, assetId) => {
      queryClient.setQueryData(cryptoDepositKeys.address(assetId), response);
    },
  });
};
