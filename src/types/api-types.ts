export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<TData> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: TData;
};

export type ApiListResponse<TData> = ApiResponse<TData[]> & {
  meta: ApiMeta;
};

export const DEFAULT_PAGE_LIMIT = 10;

export enum QueryKeys {
  BRANDS = "brands",
  AUTH = "auth",
  TRANSACTIONS = "transactions",
  HOME = "home",
  BILL_PAYMENT = "billPayment",
  CRYPTO_DEPOSIT = "cryptoDeposit",
  WITHDRAW = "withdraw",
}
