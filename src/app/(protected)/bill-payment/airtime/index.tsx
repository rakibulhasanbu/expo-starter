import * as React from "react";

import { LabeledInput } from "@/features/bill-payment/components/labeled-input";
import { NetworkSelectSheet } from "@/features/bill-payment/components/network-select-sheet";
import { SelectField } from "@/features/bill-payment/components/select-field";
import type { NetworkProvider } from "@/features/bill-payment/types";
import { EnterPinSheet } from "@/features/card/components/enter-pin-sheet";
import { transactionsKeys } from "@/features/transactions/hooks/use-transactions-queries";
import { useCardStore } from "@/store/card-store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormScreen } from "@/components/form-screen";
import { ContactBookIcon } from "@/components/icons/contact-book-icon";
import { Text } from "@/components/text";

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function AirtimeScreen() {
  const payBill = useCardStore((state) => state.payBill);
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [network, setNetwork] = React.useState<NetworkProvider | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const networkSheetRef = React.useRef<BottomSheetModal>(null);
  const pinSheetRef = React.useRef<BottomSheetModal>(null);

  const isValid = Boolean(network) && phoneNumber.trim().length >= 10 && amount > 0;

  const handleChangeAmount = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "");
    setAmount(digits ? Number(digits) : 0);
  };

  const handleChangePhoneNumber = (text: string) => {
    setPhoneNumber(text.replace(/[^0-9]/g, ""));
  };

  const handlePinSubmit = async () => {
    if (!network) return;

    setIsSubmitting(true);
    try {
      const { transaction } = await payBill({
        type: "airtime",
        amount,
        networkName: network.name,
        phoneNumber,
      });
      await queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
      pinSheetRef.current?.dismiss();
      router.replace({
        pathname: "/bill-payment/airtime/success",
        params: { amount: String(amount), transactionId: transaction.id },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton fallbackHref="/(protected)/bill-payment" />
      </View>

      <FormScreen
        contentContainerClassName="gap-6 px-5 pb-8 pt-6"
        footer={
          <Button size="xl" disabled={!isValid} onPress={() => pinSheetRef.current?.present()}>
            <Text>Next</Text>
          </Button>
        }
      >
        <Text variant="h4" className="tracking-[-0.25px]">
          Buy Airtime
        </Text>

        <View className="gap-6">
          <SelectField
            label="Network"
            placeholder="Select Network"
            value={network?.name}
            leading={
              network ? (
                <Image source={network.logo} style={{ width: 28, height: 28, borderRadius: 14 }} />
              ) : undefined
            }
            onPress={() => networkSheetRef.current?.present()}
          />

          <View className="flex-row items-end gap-2">
            <View className="flex-1">
              <LabeledInput
                label="Phone Number"
                placeholder="Enter Phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handleChangePhoneNumber}
              />
            </View>

            <Pressable
              className="size-[52px] items-center justify-center rounded-full bg-secondary"
              hitSlop={8}
            >
              <ContactBookIcon size={20} />
            </Pressable>
          </View>

          <LabeledInput
            label="Amount"
            placeholder="0"
            keyboardType="number-pad"
            value={amount > 0 ? String(amount) : ""}
            onChangeText={handleChangeAmount}
            icon={<Text className="font-urbanist-medium text-base text-foreground">₦</Text>}
          />
        </View>
      </FormScreen>

      <NetworkSelectSheet sheetRef={networkSheetRef} selectedId={network?.id} onSelect={setNetwork} />

      <EnterPinSheet
        sheetRef={pinSheetRef}
        amountLabel={formatNaira(amount)}
        loading={isSubmitting}
        onSubmit={handlePinSubmit}
      />
    </SafeAreaView>
  );
}
