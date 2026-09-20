import * as React from "react";

import { cn } from "@/utils/cn";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { View } from "react-native";

import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Button } from "@/components/button";
import { Text } from "@/components/text";

type ConfirmActionSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  icon: React.ReactNode;
  iconContainerClassName?: string;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
};

function ConfirmActionSheet({
  sheetRef,
  icon,
  iconContainerClassName = "bg-secondary",
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
}: ConfirmActionSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="items-center gap-6 px-6 pb-8 pt-2">
        <View className={cn("size-[58px] items-center justify-center rounded-full", iconContainerClassName)}>
          {icon}
        </View>

        <View className="gap-2">
          <Text variant="h4" className="text-center tracking-[-0.25px]">
            {title}
          </Text>
          <Text className="text-center text-subtitle">{description}</Text>
        </View>

        <View className="w-full gap-3">
          <Button variant="default" size="xl" loading={loading} onPress={onConfirm}>
            <Text>{confirmLabel}</Text>
          </Button>

          <Button variant="secondary" size="xl" onPress={() => sheetRef.current?.dismiss()}>
            <Text>{cancelLabel}</Text>
          </Button>
        </View>
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}

export { ConfirmActionSheet };
export type { ConfirmActionSheetProps };
