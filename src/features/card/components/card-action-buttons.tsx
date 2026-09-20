import { useRef } from "react";

import { Pressable, View } from "react-native";

import type { PopoverAnchor } from "@/components/popover";

import { AddIcon } from "@/components/icons/add-icon";
import { FreezeIcon } from "@/components/icons/freeze-icon";
import { InfoCircleIcon } from "@/components/icons/info-circle-icon";
import { MoreIcon } from "@/components/icons/more-icon";
import { Text } from "@/components/text";
import { useThemeColor } from "@/lib/theme-colors";

import type { CardStatus } from "../types";

type CardActionButtonsProps = {
  status: CardStatus;
  onAddMoney: () => void;
  onDetails: () => void;
  onToggleFreeze: () => void;
  onMore: (anchor: PopoverAnchor) => void;
};

export function CardActionButtons({
  status,
  onAddMoney,
  onDetails,
  onToggleFreeze,
  onMore,
}: CardActionButtonsProps) {
  const primaryForegroundColor = useThemeColor("primaryForeground");
  const isFrozen = status === "frozen";
  const moreButtonRef = useRef<View>(null);

  const handleMorePress = () => {
    moreButtonRef.current?.measureInWindow((x, y, width, height) => {
      onMore({ x, y, width, height });
    });
  };

  return (
    <View className="w-full flex-row items-center justify-center gap-6">
      <View className="items-center gap-2">
        <Pressable
          className="size-11 items-center justify-center rounded-full bg-primary"
          onPress={onAddMoney}
          hitSlop={8}
        >
          <AddIcon size={20} color={primaryForegroundColor} />
        </Pressable>
        <Text className="text-sm text-foreground">Add money</Text>
      </View>

      <View className="items-center gap-2">
        <Pressable
          className="size-11 items-center justify-center rounded-full bg-background"
          onPress={onDetails}
          hitSlop={8}
        >
          <InfoCircleIcon size={20} />
        </Pressable>
        <Text className="text-sm text-foreground">Details</Text>
      </View>

      <View className="items-center gap-2">
        <Pressable
          className="size-11 items-center justify-center rounded-full bg-background"
          onPress={onToggleFreeze}
          hitSlop={8}
        >
          <FreezeIcon size={20} />
        </Pressable>
        <Text className="text-sm text-foreground">{isFrozen ? "Unfreeze" : "Freeze"}</Text>
      </View>

      <View className="items-center gap-2">
        <Pressable
          ref={moreButtonRef}
          className="size-11 items-center justify-center rounded-full bg-primary"
          onPress={handleMorePress}
          hitSlop={8}
        >
          <MoreIcon size={20} color={primaryForegroundColor} />
        </Pressable>
        <Text className="text-sm text-foreground">More</Text>
      </View>
    </View>
  );
}
