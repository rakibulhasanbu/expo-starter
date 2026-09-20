import { isAxiosError, type AxiosError } from "axios";

// The backend historically surfaced jsonwebtoken's TokenExpiredError through the
// generic Error branch of its global handler, which left the status at 500 with
// the raw library message. Newer builds map it to a proper 401. Accept both so
// this keeps working across the backend rollout — once that rollout is complete
// and older app builds are out of circulation, the 500 half below can be deleted.
const JWT_ERROR_MESSAGES = ["jwt expired", "invalid signature", "jwt malformed", "invalid token"];

export const isAccessTokenError = (error: AxiosError): boolean => {
  const status = error.response?.status;

  if (status === 401) return true;
  if (status !== 500) return false;

  const message = (error.response?.data as { message?: string } | undefined)?.message;

  return !!message && JWT_ERROR_MESSAGES.includes(message.toLowerCase());
};

// Lives here rather than in api-client so query-client can reuse it without
// creating an api-client <-> query-client import cycle.
export const isAuthError = (error: unknown): boolean => isAxiosError(error) && isAccessTokenError(error);
