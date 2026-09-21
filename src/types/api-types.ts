export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<TData> = {
  data: TData;
  meta?: ApiMeta;
};

export type ApiListResponse<TData> = ApiResponse<TData[]> & {
  meta: ApiMeta;
};

export type ApiErrorResponse = {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown[];
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
