import { useRef } from "react";

import { ActivityIndicator, Pressable, View } from "react-native";

import { MoreIcon } from "@/components/icons/more-icon";
import type { PopoverAnchor } from "@/components/popover";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/text";

import type { Beneficiary } from "../types";

type BeneficiaryRowProps = {
  beneficiary: Beneficiary;
  isDeleting?: boolean;
  onSelect: (beneficiary: Beneficiary) => void;
  onPressMenu: (beneficiary: Beneficiary, anchor: PopoverAnchor) => void;
};

export function BeneficiaryRow({ beneficiary, isDeleting = false, onSelect, onPressMenu }: BeneficiaryRowProps) {
  const menuButtonRef = useRef<View>(null);

  const handleMenuPress = () => {
    menuButtonRef.current?.measureInWindow((x, y, width, height) => {
      onPressMenu(beneficiary, { x, y, width, height });
    });
  };

  return (
    <Pressable
      className="flex-row items-center justify-between gap-4 rounded-2xl border border-secondary p-4 disabled:opacity-50"
      disabled={isDeleting}
      onPress={() => onSelect(beneficiary)}
    >
      <View className="flex-1 gap-1">
        <Text className="font-urbanist-bold text-sm text-foreground">{beneficiary.accountName}</Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-xs tracking-[0.15px] text-subtitle">{beneficiary.accountNumber}</Text>
          <View className="size-[3px] rounded-full bg-subtitle" />
          <Text className="flex-1 text-xs tracking-[0.15px] text-subtitle" numberOfLines={1}>
            {beneficiary.bankName}
          </Text>
        </View>
      </View>

      {isDeleting ? (
        <View className="size-6 items-center justify-center">
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <Pressable ref={menuButtonRef} className="size-6 items-center justify-center" onPress={handleMenuPress} hitSlop={8}>
          {/* The icon ships horizontal; the design uses the vertical variant. */}
          <View style={{ transform: [{ rotate: "-90deg" }] }}>
            <MoreIcon size={24} />
          </View>
        </Pressable>
      )}
    </Pressable>
  );
}

export function BeneficiaryRowSkeleton() {
  return (
    <View className="flex-row items-center justify-between gap-4 rounded-2xl border border-secondary p-4">
      <View className="flex-1 gap-2">
        <Skeleton className="h-[14px] w-32 rounded-full" />
        <Skeleton className="h-3 w-44 rounded-full" />
      </View>
      <Skeleton className="size-6 rounded-full" />
    </View>
  );
}
