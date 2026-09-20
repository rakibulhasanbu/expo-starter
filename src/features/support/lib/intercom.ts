import type IntercomType from "@intercom/intercom-react-native";

import type { AuthUser } from "@/features/auth/types";

// The Intercom SDK reads native module constants at import time, which throws
// if the native module isn't linked (Expo Go, or a dev client built before
// this SDK was added). Loading it lazily on first use — instead of a static
// top-level import — keeps that throw inside our own try/catch instead of
// crashing the whole app's import graph at startup.
let intercomModule: typeof IntercomType | null | undefined;

const getIntercom = (): typeof IntercomType | null => {
  if (intercomModule === undefined) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- must be lazy, see comment above
      intercomModule = (require("@intercom/intercom-react-native") as { default: typeof IntercomType })
        .default;
    } catch (error) {
      console.warn("[intercom] native module unavailable", error);
      intercomModule = null;
    }
  }
  return intercomModule;
};

export const identifyIntercomUser = async (user: Pick<AuthUser, "id" | "name" | "email">) => {
  const Intercom = getIntercom();
  if (!Intercom) return;

  try {
    await Intercom.loginUserWithUserAttributes({
      userId: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.warn("[intercom] failed to identify user", error);
  }
};

export const resetIntercomUser = async () => {
  const Intercom = getIntercom();
  if (!Intercom) return;

  try {
    await Intercom.logout();
  } catch (error) {
    console.warn("[intercom] failed to log out user", error);
  }
};

export const presentSupport = async () => {
  const Intercom = getIntercom();
  if (!Intercom) return;

  try {
    await Intercom.present();
  } catch (error) {
    console.warn("[intercom] failed to present messenger", error);
  }
};
