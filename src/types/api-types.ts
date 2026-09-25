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
  /** Per-field validation failures. Only `VALIDATION_ERROR` sets this. */
  details?: unknown[];
  /**
   * Extra machine-readable context a specific error code carries — e.g.
   * `ACCOUNT_PENDING_DELETION` carries `graceEndsAt` as an ISO string. Read it
   * only after narrowing on `code`.
   */
  [key: string]: unknown;
};

export const DEFAULT_PAGE_LIMIT = 10;

export enum QueryKeys {
  AUTH = "auth",
  HOME = "home",
}
