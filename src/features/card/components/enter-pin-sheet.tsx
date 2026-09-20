import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppBottomSheetModal } from "@/components/app-bottom-sheet-modal";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

import { Button } from "@/components/button";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";

const pinSchema = z.object({
  pin: z.string().length(4, "Enter your 4-digit PIN"),
});

type PinFormValues = z.infer<typeof pinSchema>;

type EnterPinSheetProps = {
  sheetRef: React.RefObject<BottomSheetModal | null>;
  amountLabel: string;
  loading?: boolean;
  onSubmit: (pin: string) => void;
};

export function EnterPinSheet({ sheetRef, amountLabel, loading = false, onSubmit }: EnterPinSheetProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PinFormValues>({
    resolver: zodResolver(pinSchema),
    mode: "onChange",
    defaultValues: { pin: "" },
  });

  return (
    <AppBottomSheetModal
      ref={sheetRef}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onDismiss={() => reset()}
    >
      <BottomSheetView className="items-center gap-8 px-6 pb-8 pt-2">
        <View className="items-center gap-2">
          <Text variant="h4" className="text-center tracking-[-0.25px]">
            Enter Transaction Pin
          </Text>
          <Text className="text-center text-sm text-subtitle">
            Authorize a debit of {amountLabel} from your DOLO balance
          </Text>
        </View>

        <OtpInput control={control} name="pin" length={4} />

        <Button
          variant="default"
          size="xl"
          disabled={!isValid || loading}
          loading={loading}
          onPress={handleSubmit((values) => onSubmit(values.pin))}
        >
          <Text>Submit</Text>
        </Button>
      </BottomSheetView>
    </AppBottomSheetModal>
  );
}
