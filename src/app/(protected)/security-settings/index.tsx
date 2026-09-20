import { useIsPinExistQuery } from "@/features/auth/hooks/use-auth-queries";
import { SecurityMenuRow } from "@/features/settings/components/security-menu-row";
import { useSecurityStore } from "@/store/security-store";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { ArrowRightIcon } from "@/components/icons/arrow-right-icon";
import { FingerScanIcon } from "@/components/icons/finger-scan-icon";
import { KeyIcon } from "@/components/icons/key-icon";
import { LockIcon } from "@/components/icons/lock-icon";
import { Text } from "@/components/text";
import { ToggleSwitch } from "@/components/toggle-switch";

export default function SecuritySettingsScreen() {
  const biometricsEnabled = useSecurityStore((state) => state.biometricsEnabled);
  const toggleBiometrics = useSecurityStore((state) => state.toggleBiometrics);
  const { data: isPinExist } = useIsPinExistQuery();

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
            label="Biometrics"
            right={<ToggleSwitch value={biometricsEnabled} onValueChange={toggleBiometrics} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
