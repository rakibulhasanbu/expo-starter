import { useChangePinMutation } from "@/features/settings/hooks/use-settings-mutations";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormScreen } from "@/components/form-screen";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";

const pinSchema = z.object({
  pin: z.string().length(4, "Enter your 4-digit PIN"),
});

type PinFormValues = z.infer<typeof pinSchema>;

export default function EnterNewPinScreen() {
  const { prePin, otp } = useLocalSearchParams<{ prePin?: string; otp?: string }>();
  const changePinMutation = useChangePinMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PinFormValues>({
    resolver: zodResolver(pinSchema),
    mode: "onChange",
    defaultValues: { pin: "" },
  });

  const onSubmit = (values: PinFormValues) => {
    changePinMutation.mutate(
      { pin: values.pin, prePin, otp: otp ? Number(otp) : undefined },
      {
        onSuccess: () => {
          router.replace("/security-settings/change-pin/success");
        },
        onError: (error) => {
          useToastStore.getState().show("error", getErrorMessage(error));
        },
      }
    );
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/security-settings"
        />
      </View>

      <FormScreen
        contentContainerClassName="gap-8 px-5 pb-8 pt-10"
        footer={
          <Button
            size="xl"
            disabled={!isValid || changePinMutation.isPending}
            loading={changePinMutation.isPending}
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Change</Text>
          </Button>
        }
      >
        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Enter New PIN
          </Text>
          <Text className="text-center text-base text-subtitle">
            Enter your new pin that you can remember
          </Text>
        </View>

        <View className="items-center">
          <OtpInput control={control} name="pin" length={4} />
        </View>
      </FormScreen>
    </SafeAreaView>
  );
}
