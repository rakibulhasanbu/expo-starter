import * as Clipboard from "expo-clipboard";
import { Pressable, View } from "react-native";

import { CopyIcon } from "@/components/icons/copy-icon";
import { Text } from "@/components/text";

import { useToastStore } from "@/store/toast-store";

type CopyableDetailRowProps = {
  label: string;
  value: string;
};

export function CopyableDetailRow({ label, value }: CopyableDetailRowProps) {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(value);
    useToastStore.getState().show("success", "Copied to clipboard");
  };

  return (
    <View className="w-full flex-row items-end justify-between">
      <View className="flex-1 gap-1">
        <Text className="text-[10px] tracking-[0.25px] text-subtitle">{label}</Text>
        <Text className="text-sm text-foreground">{value}</Text>
      </View>
      <Pressable onPress={handleCopy} hitSlop={8}>
        <CopyIcon size={16} />
      </Pressable>
    </View>
  );
}
