import type { ApiResponse } from "@/types/api-types";
import { apiClient } from "@/lib/api-client";

import type {
  AuthTokens,
  PasskeyAuthenticationCredential,
  PasskeyAuthenticationOptions,
  PasskeyRegistrationCredential,
  PasskeyRegistrationOptions,
  WebauthnCredentialSummary,
} from "../types";

export const getWebauthnRegistrationOptions = async (): Promise<ApiResponse<PasskeyRegistrationOptions>> => {
  const { data } = await apiClient.post<ApiResponse<PasskeyRegistrationOptions>>(
    "/auth/webauthn/register/options"
  );

  return data;
};

export const verifyWebauthnRegistration = async (payload: {
  credential: PasskeyRegistrationCredential;
  deviceName?: string;
}): Promise<void> => {
  await apiClient.post("/auth/webauthn/register/verify", payload);
};

export const getUsernamelessWebauthnLoginOptions = async (): Promise<
  ApiResponse<PasskeyAuthenticationOptions>
> => {
  const { data } = await apiClient.post<ApiResponse<PasskeyAuthenticationOptions>>(
    "/auth/webauthn/login/usernameless/options"
  );

  return data;
};

export const loginWithUsernamelessWebauthn = async (
  credential: PasskeyAuthenticationCredential
): Promise<ApiResponse<AuthTokens>> => {
  const { data } = await apiClient.post<ApiResponse<AuthTokens>>("/auth/webauthn/login/usernameless/verify", {
    credential,
  });

  return data;
};

/**
 * Email-first login, for an authenticator whose credential is not discoverable:
 * it cannot identify the account on its own, so the server needs the email to
 * list which credential ids are allowed.
 */
export const getWebauthnLoginOptions = async (
  email: string
): Promise<ApiResponse<PasskeyAuthenticationOptions>> => {
  const { data } = await apiClient.post<ApiResponse<PasskeyAuthenticationOptions>>(
    "/auth/webauthn/login/options",
    { email }
  );

  return data;
};

export const loginWithWebauthn = async (payload: {
  email: string;
  credential: PasskeyAuthenticationCredential;
}): Promise<ApiResponse<AuthTokens>> => {
  const { data } = await apiClient.post<ApiResponse<AuthTokens>>(
    "/auth/webauthn/login/verify",
    payload
  );

  return data;
};

export const listWebauthnCredentials = async (): Promise<ApiResponse<WebauthnCredentialSummary[]>> => {
  const { data } = await apiClient.get<ApiResponse<WebauthnCredentialSummary[]>>(
    "/auth/webauthn/credentials"
  );

  return data;
};

export const removeWebauthnCredential = async (credentialId: string): Promise<void> => {
  await apiClient.delete(`/auth/webauthn/credentials/${credentialId}`);
};
