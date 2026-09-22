import Constants from "expo-constants";
import { z } from "zod";

// EXPO_PUBLIC_* vars are inlined into the JS bundle at build time, so this is
// the single place that reads process.env — everything else should import
// `env` from here instead of touching process.env directly.
const envSchema = z.object({
  EXPO_PUBLIC_API_BASE_URL: z.url(),
});

const parsed = envSchema.safeParse({
  EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
});

if (!parsed.success) {
  throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const env = {
  apiBaseUrl: parsed.data.EXPO_PUBLIC_API_BASE_URL,
};

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
