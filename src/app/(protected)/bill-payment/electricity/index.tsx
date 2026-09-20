import * as React from "react";

import { BillTypeSelectSheet } from "@/features/bill-payment/components/bill-type-select-sheet";
import { BillerSelectSheet } from "@/features/bill-payment/components/biller-select-sheet";
import { LabeledInput } from "@/features/bill-payment/components/labeled-input";
import { SelectField } from "@/features/bill-payment/components/select-field";
import { BILL_TYPES, ELECTRICITY_BILLERS } from "@/features/bill-payment/data";
import type { Biller, BillType } from "@/features/bill-payment/types";
import { EnterPinSheet } from "@/features/card/components/enter-pin-sheet";
import { transactionsKeys } from "@/features/transactions/hooks/use-transactions-queries";
import { useCardStore } from "@/store/card-store";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormScreen } from "@/components/form-screen";
import { Text } from "@/components/text";

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function ElectricityScreen() {
  const payBill = useCardStore((state) => state.payBill);
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [biller, setBiller] = React.useState<Biller | null>(null);
  const [billType, setBillType] = React.useState<BillType | null>(null);
  const [meterNumber, setMeterNumber] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const billerSheetRef = React.useRef<BottomSheetModal>(null);
  const billTypeSheetRef = React.useRef<BottomSheetModal>(null);
  const pinSheetRef = React.useRef<BottomSheetModal>(null);

  const billTypeLabel = billType ? BILL_TYPES.find((item) => item.value === billType)?.label : undefined;
  const isValid = Boolean(biller) && Boolean(billType) && meterNumber.trim().length > 0 && amount > 0;

  const handleChangeAmount = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "");
    setAmount(digits ? Number(digits) : 0);
  };

  const handlePinSubmit = async () => {
    if (!biller || !billType) return;

    setIsSubmitting(true);
    try {
      const { token, transaction } = await payBill({
        type: "electricity",
        amount,
        billerName: biller.name,
        meterNumber,
        billType,
      });
      await queryClient.invalidateQueries({ queryKey: transactionsKeys.all });
      pinSheetRef.current?.dismiss();
      router.replace({
        pathname: "/bill-payment/electricity/success",
        params: { amount: String(amount), token: token ?? "", transactionId: transaction.id },
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
          Buy Electricity
        </Text>

        <View className="gap-6">
          <SelectField
            label="Biller"
            placeholder="Select biller"
            value={biller?.name}
            onPress={() => billerSheetRef.current?.present()}
          />

          <SelectField
            label="Bill type"
            placeholder="Select type"
            value={billTypeLabel}
            onPress={() => billTypeSheetRef.current?.present()}
          />

          <LabeledInput
            label="Meter Number"
            placeholder="eg 1234567890"
            keyboardType="number-pad"
            value={meterNumber}
            onChangeText={setMeterNumber}
          />

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

      <BillerSelectSheet sheetRef={billerSheetRef} billers={ELECTRICITY_BILLERS} onSelect={setBiller} />

      <BillTypeSelectSheet sheetRef={billTypeSheetRef} onSelect={setBillType} />

      <EnterPinSheet
        sheetRef={pinSheetRef}
        amountLabel={formatNaira(amount)}
        loading={isSubmitting}
        onSubmit={handlePinSubmit}
      />
    </SafeAreaView>
  );
}
