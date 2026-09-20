import { useAddPinFirstTimeMutation } from "@/features/settings/hooks/use-settings-mutations";
import { getErrorMessage } from "@/utils/get-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormScreen } from "@/components/form-screen";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";

const setPinSchema = z
  .object({
    pin: z.string().length(4, "Enter a 4-digit PIN"),
    confirmPin: z.string().length(4, "Confirm your 4-digit PIN"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  });

type SetPinFormValues = z.infer<typeof setPinSchema>;

export default function SetPinScreen() {
  const addPinFirstTimeMutation = useAddPinFirstTimeMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SetPinFormValues>({
    resolver: zodResolver(setPinSchema),
    mode: "onChange",
    defaultValues: { pin: "", confirmPin: "" },
  });

  const onSubmit = (values: SetPinFormValues) => {
    addPinFirstTimeMutation.mutate(
      { pin: values.pin },
      { onSuccess: () => router.replace("/security-settings/set-pin/success") }
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
        footerClassName="gap-3"
        footer={
          <>
            <FormError
              message={
                addPinFirstTimeMutation.isError ? getErrorMessage(addPinFirstTimeMutation.error) : null
              }
              className="text-center"
            />

            <Button
              size="xl"
              disabled={!isValid}
              loading={addPinFirstTimeMutation.isPending}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>Create PIN</Text>
            </Button>
          </>
        }
      >
        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Create a Transaction PIN
          </Text>
          <Text className="text-center text-base text-subtitle">
            Set a 4-digit PIN to authorize your transactions
          </Text>
        </View>

        <View className="items-center gap-6">
          <View className="items-center gap-2">
            <Text className="text-base text-subtitle">Enter PIN</Text>
            <OtpInput control={control} name="pin" length={4} />
          </View>

          <View className="items-center gap-2">
            <Text className="text-base text-subtitle">Confirm PIN</Text>
            <OtpInput control={control} name="confirmPin" length={4} />
          </View>
        </View>
      </FormScreen>
    </SafeAreaView>
  );
}
