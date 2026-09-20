import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormScreen } from "@/components/form-screen";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";

const otpSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit code"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function ForgotPinOtpScreen() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const onSubmit = (values: OtpFormValues) => {
    router.push({
      pathname: "/security-settings/change-pin/new",
      params: { otp: values.otp },
    });
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/security-settings/change-pin/forgot"
        />
      </View>

      <FormScreen
        contentContainerClassName="gap-8 px-5 pb-8 pt-10"
        footer={
          <Button size="xl" disabled={!isValid} onPress={handleSubmit(onSubmit)}>
            <Text>Continue</Text>
          </Button>
        }
      >
        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Check Your Email
          </Text>
          <Text className="text-center text-base text-subtitle">
            Enter the 6 digit code sent to your mail
          </Text>
        </View>

        <View className="items-center">
          <OtpInput control={control} name="otp" length={6} />
        </View>
      </FormScreen>
    </SafeAreaView>
  );
}
