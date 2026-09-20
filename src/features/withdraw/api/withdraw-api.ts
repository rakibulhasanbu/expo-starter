import { apiClient } from "@/lib/api-client";
import type { ApiListResponse, ApiResponse } from "@/types/api-types";
import { DEFAULT_PAGE_LIMIT } from "@/types/api-types";

import type {
  Bank,
  Beneficiary,
  CreateWithdrawalPayload,
  SaveBeneficiaryPayload,
  VerifiedAccount,
  WithdrawConfig,
  WithdrawalRequest,
} from "../types";

type ConfigurationResponse = {
  withdrawalRequestServiceChargePercentage: number;
  minWithdrawalAmount: number;
};

type VerifyBankAccountPayload = {
  /** The bank's `id` from `fetchBanks`, which the endpoint names `id`. */
  bankId: string;
  accountNumber: string;
};

export const fetchBanks = async (): Promise<ApiResponse<Bank[]>> => {
  const { data } = await apiClient.get<ApiResponse<Bank[]>>("/breet/banks", {
    params: { currency: "ngn" },
  });

  return data;
};

export const verifyBankAccount = async ({
  bankId,
  accountNumber,
}: VerifyBankAccountPayload): Promise<ApiResponse<VerifiedAccount>> => {
  const { data } = await apiClient.post<ApiResponse<VerifiedAccount>>("/breet/banks/verify", {
    id: bankId,
    accountNumber,
  });

  return data;
};

/**
 * Idempotent server-side: an account already saved for this user is returned
 * unchanged rather than duplicated, so callers can save unconditionally.
 */
export const saveBeneficiary = async (payload: SaveBeneficiaryPayload): Promise<ApiResponse<Beneficiary>> => {
  const { data } = await apiClient.post<ApiResponse<Beneficiary>>("/breet/banks/save", payload);

  return data;
};

export const fetchBeneficiaries = async (page: number): Promise<ApiListResponse<Beneficiary>> => {
  const { data } = await apiClient.get<ApiListResponse<Beneficiary>>("/breet/banks/from-db", {
    params: { page, limit: DEFAULT_PAGE_LIMIT },
  });

  return data;
};

export const deleteBeneficiary = async (id: string): Promise<ApiResponse<Beneficiary>> => {
  const { data } = await apiClient.delete<ApiResponse<Beneficiary>>(`/breet/banks/from-db/${id}`);

  return data;
};

/**
 * The PIN travels as a one-off `x-user-pin` header rather than in the body, and
 * is never stored — it lives only for the duration of this call.
 */
export const createWithdrawal = async (
  payload: CreateWithdrawalPayload,
  pin: string
): Promise<ApiResponse<WithdrawalRequest>> => {
  const { data } = await apiClient.post<ApiResponse<WithdrawalRequest>>(
    "/withdrawal-request/breet/auto",
    payload,
    { headers: { "x-user-pin": pin } }
  );

  return data;
};

export const fetchWithdrawConfig = async (): Promise<ApiResponse<WithdrawConfig>> => {
  const { data } = await apiClient.get<ApiResponse<ConfigurationResponse>>("/configuration");

  return {
    ...data,
    data: {
      serviceChargePercentage: data.data.withdrawalRequestServiceChargePercentage,
      minWithdrawalAmount: data.data.minWithdrawalAmount,
    },
  };
};
