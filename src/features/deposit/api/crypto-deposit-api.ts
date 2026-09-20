import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type { CryptoAsset, CryptoDepositAddress } from "../types";

type BreetDepositAssetResponse = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  network: string;
  minimum: number;
  confirmations: number;
  rate: { NGN: number; GHS: number };
};

type BreetDepositAddressResponse = {
  assetId: string;
  address: string;
  network: string;
  symbol: string;
  icon: string;
  name: string;
};

const toCryptoAsset = (asset: BreetDepositAssetResponse): CryptoAsset => ({
  id: asset.id,
  name: asset.name,
  symbol: asset.symbol,
  icon: asset.icon,
  network: asset.network,
  minimum: asset.minimum,
  confirmations: asset.confirmations,
  rateNgn: asset.rate.NGN,
});

const toCryptoDepositAddress = (address: BreetDepositAddressResponse): CryptoDepositAddress => ({
  assetId: address.assetId,
  address: address.address,
  network: address.network,
  symbol: address.symbol,
  icon: address.icon,
  name: address.name,
});

export const fetchDepositAssets = async (): Promise<ApiResponse<CryptoAsset[]>> => {
  const { data } = await apiClient.get<ApiResponse<BreetDepositAssetResponse[]>>("/breet/assets/deposit");

  return { ...data, data: data.data.map(toCryptoAsset) };
};

export const fetchDepositAddress = async (assetId: string): Promise<ApiResponse<CryptoDepositAddress>> => {
  const { data } = await apiClient.get<ApiResponse<BreetDepositAddressResponse>>(`/breet/wallet-address/${assetId}`);

  return { ...data, data: toCryptoDepositAddress(data.data) };
};

export const generateDepositAddress = async (assetId: string): Promise<ApiResponse<CryptoDepositAddress>> => {
  const { data } = await apiClient.post<ApiResponse<BreetDepositAddressResponse>>(`/breet/wallet-address/${assetId}`);

  return { ...data, data: toCryptoDepositAddress(data.data) };
};
