export type CryptoAsset = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  network: string;
  minimum: number;
  confirmations: number;
  rateNgn: number;
};

export type CryptoAssetGroup = {
  symbol: string;
  name: string;
  icon: string;
  networks: CryptoAsset[];
};

export type CryptoDepositAddress = {
  assetId: string;
  address: string;
  network: string;
  symbol: string;
  icon: string;
  name: string;
};

export type BankTransferDetails = {
  bankName: string;
  accountNumber: string;
  accountName: string;
};
