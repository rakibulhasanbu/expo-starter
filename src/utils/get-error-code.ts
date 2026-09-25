import { isAxiosError } from "axios";

import type { ApiErrorResponse } from "@/types/api-types";

/**
 * The machine-readable `code` the backend puts on its error envelope
 * (`AllExceptionsFilter`). Use it to branch on a specific failure —
 * `getErrorMessage` is for showing the user what happened.
 */
function getErrorCode(error: unknown): string | undefined {
  if (!isAxiosError<ApiErrorResponse>(error)) return undefined;
  return error.response?.data?.code;
}

/**
 * When the deletion grace period runs out, as an ISO instant. The backend puts
 * it on the ACCOUNT_PENDING_DELETION body so the reactivation screen can name
 * the deadline; it is optional because nothing breaks without it.
 */
function getAccountDeletionGraceEndsAt(error: unknown): string | undefined {
  if (!isAxiosError<ApiErrorResponse>(error)) return undefined;
  const graceEndsAt = error.response?.data?.graceEndsAt;
  return typeof graceEndsAt === "string" ? graceEndsAt : undefined;
}

/** The account is inside its deletion grace period; the backend has already emailed a reactivation code. */
const ACCOUNT_PENDING_DELETION = "ACCOUNT_PENDING_DELETION";

const isAccountPendingDeletion = (error: unknown) => getErrorCode(error) === ACCOUNT_PENDING_DELETION;

export {
  getErrorCode,
  getAccountDeletionGraceEndsAt,
  isAccountPendingDeletion,
  ACCOUNT_PENDING_DELETION,
};
