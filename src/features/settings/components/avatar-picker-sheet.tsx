import * as React from "react";

import { cn } from "@/utils/cn";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Text } from "@/components/text";

import { AVATAR_OPTIONS } from "../lib/avatars";

type AvatarPickerSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  selectedAvatarId: string;
  onSelect: (avatarId: string) => void;
};

function AvatarPickerSheet({ sheetRef, selectedAvatarId, onSelect }: AvatarPickerSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="gap-6 px-6 pb-8 pt-2">
        <Text variant="h4" className="text-center tracking-[-0.25px]">
          Change profile picture
        </Text>

        <View className="flex-row flex-wrap justify-around gap-6">
          {AVATAR_OPTIONS.map((avatar) => {
            const isSelected = avatar.id === selectedAvatarId;

            return (
              <Pressable
                key={avatar.id}
                onPress={() => {
                  onSelect(avatar.id);
                  sheetRef.current?.dismiss();
                }}
                className={cn(
                  "size-16 overflow-hidden rounded-full border-[3px] border-transparent bg-muted",
                  isSelected && "border-primary"
                )}
              >
                <Image source={avatar.source} style={{ width: "100%", height: "100%" }} />
              </Pressable>
            );
          })}
        </View>
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}

export { AvatarPickerSheet };
export type { AvatarPickerSheetProps };
