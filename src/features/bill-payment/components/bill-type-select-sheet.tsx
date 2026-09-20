import * as React from "react";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Pressable } from "react-native";

import { Text } from "@/components/text";

import { BILL_TYPES } from "../data";
import type { BillType } from "../types";

type BillTypeSelectSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onSelect: (billType: BillType) => void;
};

export function BillTypeSelectSheet({ sheetRef, onSelect }: BillTypeSelectSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="gap-1 px-5 pb-8 pt-2">
        <Text variant="h4" className="pb-3 tracking-[-0.25px]">
          Select bill type
        </Text>

        {BILL_TYPES.map((billType) => (
          <Pressable
            key={billType.value}
            className="rounded-full px-3 py-3 active:bg-secondary"
            onPress={() => {
              onSelect(billType.value);
              sheetRef.current?.dismiss();
            }}
          >
            <Text className="text-base text-foreground">{billType.label}</Text>
          </Pressable>
        ))}
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}
