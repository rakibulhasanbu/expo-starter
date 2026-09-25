import { isAxiosError, type AxiosError } from "axios";

// The backend answers 401 for an expired or invalid access token: the JWT
// strategy rejects it before any handler runs, and the one place that verifies
// a token by hand (the 2FA token) wraps every failure in an
// UnauthorizedException. Nothing surfaces a JWT failure as a 500 any more.
export const isAccessTokenError = (error: AxiosError): boolean => error.response?.status === 401;

// Lives here rather than in api-client so query-client can reuse it without
// creating an api-client <-> query-client import cycle.
export const isAuthError = (error: unknown): boolean => isAxiosError(error) && isAccessTokenError(error);
