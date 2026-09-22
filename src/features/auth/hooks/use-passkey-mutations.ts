import { useMutation } from "@tanstack/react-query";
import * as Passkeys from "react-native-passkeys";

import {
  clearLocalPasskeyCredentialId,
  getLocalPasskeyCredentialId,
  setLocalPasskeyCredentialId,
} from "@/lib/passkey-storage";

import {
  getUsernamelessWebauthnLoginOptions,
  getWebauthnRegistrationOptions,
  loginWithUsernamelessWebauthn,
  removeWebauthnCredential,
  verifyWebauthnRegistration,
} from "../api/passkey-api";
import type { PasskeyAuthenticationCredential, PasskeyRegistrationCredential } from "../types";
import { establishSession } from "./use-auth-mutations";

export const isPasskeySupported = (): boolean => Passkeys.isSupported();

// Registers a passkey for the *currently signed-in* account: fetches a
// challenge from the backend, hands it to the OS (Face ID/Touch ID/fingerprint
// prompt happens here, inside the platform authenticator — the app never sees
// the biometric itself), then sends the signed attestation back for storage.
export const useRegisterPasskeyMutation = () => {
  return useMutation({
    mutationFn: async (deviceName?: string) => {
      const { data: options } = await getWebauthnRegistrationOptions();

      const credential = await Passkeys.create(options as never);
      if (!credential) {
        throw new Error("Passkey registration was cancelled");
      }

      await verifyWebauthnRegistration({
        credential: credential as unknown as PasskeyRegistrationCredential,
        deviceName,
      });

      return credential.id;
    },
    onSuccess: async (credentialId) => {
      await setLocalPasskeyCredentialId(credentialId);
    },
  });
};

// Usernameless (discoverable-credential) login: no email needed up front —
// the OS shows a native picker of every passkey enrolled for this app's
// rpID (covers the multi-account case) and resolves the account itself.
export const useUsernamelessPasskeyLoginMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const { data: options } = await getUsernamelessWebauthnLoginOptions();

      const credential = await Passkeys.get(options as never);
      if (!credential) {
        throw new Error("Passkey sign-in was cancelled");
      }

      const response = await loginWithUsernamelessWebauthn(
        credential as unknown as PasskeyAuthenticationCredential
      );
      return response.data;
    },
    onSuccess: async (tokens) => {
      await establishSession(tokens);
    },
  });
};

// Removes this device's passkey — both server-side (revokes the credential
// for future logins) and the local flag that gates the sign-in button.
export const useRemovePasskeyMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const credentialId = await getLocalPasskeyCredentialId();
      if (credentialId) {
        await removeWebauthnCredential(credentialId);
      }
    },
    onSuccess: async () => {
      await clearLocalPasskeyCredentialId();
    },
  });
};
