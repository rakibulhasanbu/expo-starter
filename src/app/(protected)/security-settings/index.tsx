import { useEffect, useState } from "react";

import { useIsPinExistQuery } from "@/features/auth/hooks/use-auth-queries";
import {
  isPasskeySupported,
  useRegisterPasskeyMutation,
  useRemovePasskeyMutation,
} from "@/features/auth/hooks/use-passkey-mutations";
import { SecurityMenuRow } from "@/features/settings/components/security-menu-row";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { router } from "expo-router";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getHasRegisteredPasskey } from "@/lib/passkey-storage";
import { BackButton } from "@/components/back-button";
import { ArrowRightIcon } from "@/components/icons/arrow-right-icon";
import { FingerScanIcon } from "@/components/icons/finger-scan-icon";
import { KeyIcon } from "@/components/icons/key-icon";
import { LockIcon } from "@/components/icons/lock-icon";
import { Text } from "@/components/text";
import { ToggleSwitch } from "@/components/toggle-switch";

const DEVICE_NAME =
  Platform.OS === "ios" ? "iPhone" : Platform.OS === "android" ? "Android device" : "Browser";

export default function SecuritySettingsScreen() {
  const { data: isPinExist } = useIsPinExistQuery();
  const showToast = useToastStore((state) => state.show);

  const [passkeyEnabled, setPasskeyEnabled] = useState(false);
  const registerPasskey = useRegisterPasskeyMutation();
  const removePasskey = useRemovePasskeyMutation();
  const passkeySupported = isPasskeySupported();

  useEffect(() => {
    getHasRegisteredPasskey().then(setPasskeyEnabled);
  }, []);

  const handleToggleBiometrics = async (next: boolean) => {
    if (!passkeySupported) {
      showToast("error", "This device doesn't support fingerprint/face sign-in.");
      return;
    }

    setPasskeyEnabled(next);

    try {
      if (next) {
        await registerPasskey.mutateAsync(DEVICE_NAME);
      } else {
        await removePasskey.mutateAsync();
      }
    } catch (error) {
      setPasskeyEnabled(!next);
      showToast("error", getErrorMessage(error));
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/(tabs)/settings"
        />
      </View>

      <View className="gap-8 px-5 pt-10">
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
          Security Settings
        </Text>

        <View className="w-full gap-4">
          <SecurityMenuRow
            icon={<LockIcon size={16} />}
            label="Change Password"
            right={<ArrowRightIcon size={16} />}
            onPress={() => router.push("/security-settings/change-password")}
          />
          <SecurityMenuRow
            icon={<KeyIcon size={16} />}
            label={isPinExist === false ? "Set PIN" : "Change PIN"}
            right={<ArrowRightIcon size={16} />}
            onPress={() =>
              router.push(
                isPinExist === false ? "/security-settings/set-pin" : "/security-settings/change-pin"
              )
            }
          />
          <SecurityMenuRow
            icon={<FingerScanIcon size={16} />}
            label="Fingerprint Sign-In"
            right={<ToggleSwitch value={passkeyEnabled} onValueChange={handleToggleBiometrics} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
