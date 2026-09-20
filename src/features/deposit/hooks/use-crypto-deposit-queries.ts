import { useQuery } from "@tanstack/react-query";

import { QueryKeys } from "@/types/api-types";

import { fetchDepositAddress, fetchDepositAssets } from "../api/crypto-deposit-api";
import type { CryptoAssetGroup } from "../types";

export const cryptoDepositKeys = {
  all: [QueryKeys.CRYPTO_DEPOSIT] as const,
  assets: () => [...cryptoDepositKeys.all, "assets"] as const,
  address: (assetId: string) => [...cryptoDepositKeys.all, "address", assetId] as const,
};

const groupAssetsBySymbol = (assets: CryptoAssetGroup["networks"]): CryptoAssetGroup[] => {
  const groups = new Map<string, CryptoAssetGroup>();

  for (const asset of assets) {
    const existing = groups.get(asset.symbol);
    if (existing) {
      existing.networks.push(asset);
      continue;
    }
    groups.set(asset.symbol, { symbol: asset.symbol, name: asset.name, icon: asset.icon, networks: [asset] });
  }

  return Array.from(groups.values());
};

export const useCryptoAssetsQuery = () => {
  return useQuery({
    queryKey: cryptoDepositKeys.assets(),
    queryFn: fetchDepositAssets,
    select: (response) => groupAssetsBySymbol(response.data),
  });
};

export const useCryptoDepositAddressQuery = (assetId: string) => {
  return useQuery({
    queryKey: cryptoDepositKeys.address(assetId),
    queryFn: () => fetchDepositAddress(assetId),
    select: (response) => response.data,
    enabled: !!assetId,
    retry: false,
  });
};
