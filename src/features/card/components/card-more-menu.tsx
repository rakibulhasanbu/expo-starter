import { Pressable, View } from "react-native";

import { ArrowSwapHorizontalIcon } from "@/components/icons/arrow-swap-horizontal-icon";
import { ReceiptIcon } from "@/components/icons/receipt-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { Text } from "@/components/text";

type CardMoreMenuProps = {
  onWithdraw: () => void;
  onGetStatement: () => void;
  onDeleteCard: () => void;
};

export function CardMoreMenu({ onWithdraw, onGetStatement, onDeleteCard }: CardMoreMenuProps) {
  return (
    <View className="gap-6">
      <Pressable className="flex-row items-center gap-2" onPress={onWithdraw} hitSlop={4}>
        <ArrowSwapHorizontalIcon size={16} />
        <Text className="flex-1 text-sm text-foreground">Withdraw</Text>
      </Pressable>

      <Pressable className="flex-row items-center gap-2" onPress={onGetStatement} hitSlop={4}>
        <ReceiptIcon size={16} />
        <Text className="flex-1 text-sm text-foreground">Get Statement</Text>
      </Pressable>

      <Pressable className="flex-row items-center gap-2" onPress={onDeleteCard} hitSlop={4}>
        <TrashIcon size={16} className="text-destructive" />
        <Text className="flex-1 text-sm text-destructive">Delete Card</Text>
      </Pressable>
    </View>
  );
}
