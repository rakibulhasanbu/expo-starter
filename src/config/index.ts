import Constants from "expo-constants";
import { z } from "zod";

// EXPO_PUBLIC_* vars are inlined into the JS bundle at build time, so this is
// the single place that reads process.env — everything else should import
// `env` from here instead of touching process.env directly.
const envSchema = z.object({
  EXPO_PUBLIC_API_BASE_URL: z.url(),
  // Google sign-in is optional — leave these unset and the button hides itself.
  // The *web* client id must match the backend's GOOGLE_CLIENT_ID: the backend
  // verifies the id token against that single audience, and an id token minted
  // for a platform client id would carry a different `aud` and be rejected.
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: z.string().optional(),
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: z.string().optional(),
  EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID: z.string().optional(),
});

const parsed = envSchema.safeParse({
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
});

if (!parsed.success) {
  throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const env = {
  apiBaseUrl: parsed.data.EXPO_PUBLIC_API_BASE_URL,
  googleWebClientId: parsed.data.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  googleIosClientId: parsed.data.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  googleAndroidClientId: parsed.data.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
};

/** Google sign-in needs at least the web client id to produce a token the backend accepts. */
export const isGoogleSignInConfigured = !!env.googleWebClientId;

// Values that live in app.json's `expo` block, surfaced at runtime via
// Constants.expoConfig — centralized here so components don't reach into
// Constants directly.
export const appConfig = {
  name: Constants.expoConfig?.name ?? "Sarter",
  slug: Constants.expoConfig?.slug ?? "starter",
  version: Constants.expoConfig?.version ?? "1.0.0",
  scheme: Constants.expoConfig?.scheme ?? "expotempl",
};

// TODO: replace with the real support contact details before release.
export const supportConfig = {
  whatsappNumber: "10000000000",
  telegramUsername: "REPLACE_WITH_TELEGRAM_USERNAME",
};
