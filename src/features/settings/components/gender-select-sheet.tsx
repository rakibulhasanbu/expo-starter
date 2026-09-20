import * as React from "react";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Pressable } from "react-native";

import { Text } from "@/components/text";

import type { Gender } from "../types";

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

type GenderSelectSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onSelect: (gender: Gender) => void;
};

function GenderSelectSheet({ sheetRef, onSelect }: GenderSelectSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="gap-1 px-5 pb-8 pt-2">
        <Text variant="h4" className="pb-3 tracking-[-0.25px]">
          Select gender
        </Text>

        {GENDER_OPTIONS.map((option) => (
          <Pressable
            key={option.value}
            className="rounded-full px-3 py-3 active:bg-secondary"
            onPress={() => {
              onSelect(option.value);
              sheetRef.current?.dismiss();
            }}
          >
            <Text className="text-base text-foreground">{option.label}</Text>
          </Pressable>
        ))}
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}

export { GenderSelectSheet };
export type { GenderSelectSheetProps };
