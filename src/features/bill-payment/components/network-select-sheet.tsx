import * as React from "react";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import { Text } from "@/components/text";

import { NETWORK_PROVIDERS } from "../data";
import type { NetworkProvider } from "../types";

type NetworkSelectSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  selectedId?: string;
  onSelect: (network: NetworkProvider) => void;
};

export function NetworkSelectSheet({ sheetRef, selectedId, onSelect }: NetworkSelectSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="gap-2 px-5 pb-8 pt-2">
        <Text variant="h4" className="pb-3 tracking-[-0.25px]">
          Select network
        </Text>

        {NETWORK_PROVIDERS.map((network) => {
          const isSelected = network.id === selectedId;

          return (
            <Pressable
              key={network.id}
              className="flex-row items-center justify-between rounded-2xl bg-secondary p-4"
              onPress={() => {
                onSelect(network);
                sheetRef.current?.dismiss();
              }}
            >
              <View className="flex-row items-center gap-2">
                <Image source={network.logo} style={{ width: 28, height: 28, borderRadius: 14 }} />
                <Text className="text-base text-foreground">{network.name}</Text>
              </View>

              <Ionicons
                name={isSelected ? "radio-button-on" : "radio-button-off"}
                size={24}
                className={isSelected ? "text-foreground" : "text-muted-foreground"}
              />
            </Pressable>
          );
        })}
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}
