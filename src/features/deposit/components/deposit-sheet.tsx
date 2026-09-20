import * as React from "react";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { Pressable, View } from "react-native";

import { BankIcon } from "@/components/icons/bank-icon";
import { WalletIcon } from "@/components/icons/wallet-icon";
import { Text } from "@/components/text";

type DepositSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  onSelectBankTransfer: () => void;
  onSelectCryptoDeposit: () => void;
};

export function DepositSheet({ sheetRef, onSelectBankTransfer, onSelectCryptoDeposit }: DepositSheetProps) {
  return (
    <AppBottomSheetModal ref={sheetRef}>
      <BottomSheetView className="gap-6 px-6 pb-8 pt-2">
        <Text variant="h4" className="text-center tracking-[-0.25px]">
          Deposit
        </Text>

        <View className="gap-4">
          <Pressable
            onPress={onSelectBankTransfer}
            className="flex-row items-center justify-between gap-4 rounded-2xl bg-secondary p-4"
          >
            <View className="size-[43px] items-center justify-center rounded-lg bg-background/80">
              <BankIcon size={20} />
            </View>
            <View className="flex-1 gap-1">
              <Text className="font-urbanist-bold text-sm text-foreground">Bank Transfer</Text>
              <Text className="text-xs tracking-[0.15px] text-subtitle">
                Transfer money directly into a secure bank account to deposit into your naira wallet.
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={onSelectCryptoDeposit}
            className="flex-row items-center justify-between gap-4 rounded-2xl bg-secondary p-4"
          >
            <View className="size-[43px] items-center justify-center rounded-lg bg-background/80">
              <WalletIcon size={20} />
            </View>
            <View className="flex-1 gap-1">
              <Text className="font-urbanist-bold text-sm text-foreground">Crypto Deposit</Text>
              <Text className="text-xs tracking-[0.15px] text-subtitle">
                Deposit funds to your NGN, USDT or USDC wallet through any crypto.
              </Text>
            </View>
          </Pressable>
        </View>
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}
