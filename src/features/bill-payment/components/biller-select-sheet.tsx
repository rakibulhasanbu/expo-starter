import * as React from "react";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Pressable, View } from "react-native";

import { Text } from "@/components/text";

import type { Biller } from "../types";

type BillerSelectSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  billers: Biller[];
  onSelect: (biller: Biller) => void;
};

export function BillerSelectSheet({ sheetRef, billers, onSelect }: BillerSelectSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="gap-1 px-5 pb-8 pt-2">
        <Text variant="h4" className="pb-3 tracking-[-0.25px]">
          Select biller
        </Text>

        {billers.map((biller) => (
          <Pressable
            key={biller.id}
            className="flex-row items-center gap-3 rounded-full px-3 py-3 active:bg-secondary"
            onPress={() => {
              onSelect(biller);
              sheetRef.current?.dismiss();
            }}
          >
            <View className="size-6 rounded-full bg-muted" />
            <Text className="flex-1 text-base text-foreground">{biller.name}</Text>
          </Pressable>
        ))}
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}
