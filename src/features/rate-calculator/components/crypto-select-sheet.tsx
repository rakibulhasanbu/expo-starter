import * as React from "react";

import type { CryptoAssetGroup } from "@/features/deposit/types";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Image, Pressable, View } from "react-native";

import { Text } from "@/components/text";
import { cn } from "@/utils/cn";

type CryptoSelectSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  assetGroups: CryptoAssetGroup[];
  selectedSymbol: string;
  onSelect: (group: CryptoAssetGroup) => void;
};

export function CryptoSelectSheet({ sheetRef, assetGroups, selectedSymbol, onSelect }: CryptoSelectSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="gap-6 px-6 pb-8 pt-2">
        <Text variant="h4" className="text-center tracking-[-0.25px]">
          Select Crypto
        </Text>

        <View className="gap-3">
          {assetGroups.map((group) => {
            const isSelected = group.symbol === selectedSymbol;

            return (
              <Pressable
                key={group.symbol}
                onPress={() => {
                  onSelect(group);
                  sheetRef.current?.dismiss();
                }}
                className={cn(
                  "flex-row items-center gap-3 rounded-2xl border border-transparent bg-secondary p-4",
                  isSelected && "border-primary"
                )}
              >
                <Image source={{ uri: group.icon }} style={{ width: 32, height: 32, borderRadius: 16 }} />
                <View className="flex-1 gap-1">
                  <Text className="font-urbanist-bold text-sm text-foreground">{group.symbol}</Text>
                  <Text className="text-xs tracking-[0.15px] text-subtitle">{group.name}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}
