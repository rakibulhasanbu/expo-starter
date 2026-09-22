import AsyncStorage from "@react-native-async-storage/async-storage";

// Not sensitive — just remembers this device's own passkey credential id, so:
// - the sign-in screen (logged out, no account context yet) knows whether to
//   show the "Sign in with Fingerprint" button before any API call is made.
// - turning biometrics off in settings can remove exactly this device's
//   credential without having to list and guess which one it is.
const PASSKEY_CREDENTIAL_ID_KEY = "auth_passkey_credential_id";

export const getLocalPasskeyCredentialId = (): Promise<string | null> =>
  AsyncStorage.getItem(PASSKEY_CREDENTIAL_ID_KEY);

export const getHasRegisteredPasskey = async (): Promise<boolean> => {
  const credentialId = await getLocalPasskeyCredentialId();
  return credentialId !== null;
};

export const setLocalPasskeyCredentialId = (credentialId: string): Promise<void> =>
  AsyncStorage.setItem(PASSKEY_CREDENTIAL_ID_KEY, credentialId);

export const clearLocalPasskeyCredentialId = (): Promise<void> =>
  AsyncStorage.removeItem(PASSKEY_CREDENTIAL_ID_KEY);
