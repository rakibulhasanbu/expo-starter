import * as Clipboard from "expo-clipboard";
import { Pressable, View } from "react-native";

import { CopyIcon } from "@/components/icons/copy-icon";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

import { useToastStore } from "@/store/toast-store";

type ReferralCodeCardProps = {
  code: string;
};

export function ReferralCodeCard({ code }: ReferralCodeCardProps) {
  const primaryForegroundColor = useThemeColor("primaryForeground");

  const handleCopy = async () => {
    await Clipboard.setStringAsync(code);
    useToastStore.getState().show("success", "Copied to clipboard");
  };

  return (
    <View className="w-full flex-row items-center justify-between rounded-2xl bg-secondary py-3 pl-3 pr-2">
      <Text className="text-sm text-foreground">Referral code</Text>

      <View className="w-[180px] flex-row items-center justify-between rounded-xl bg-background py-2 pl-3 pr-2">
        <Text className="font-urbanist-bold text-sm text-foreground">{code}</Text>

        <Pressable
          onPress={handleCopy}
          hitSlop={8}
          className="size-[27px] items-center justify-center rounded-lg bg-primary"
        >
          <CopyIcon size={12} color={primaryForegroundColor} />
        </Pressable>
      </View>
    </View>
  );
}
