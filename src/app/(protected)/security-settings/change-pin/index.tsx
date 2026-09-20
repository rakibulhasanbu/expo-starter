import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
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

export default function EnterCurrentPinScreen() {
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
    router.push({
      pathname: "/security-settings/change-pin/new",
      params: { prePin: values.pin },
    });
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
          <Button size="xl" disabled={!isValid} onPress={handleSubmit(onSubmit)}>
            <Text>Continue</Text>
          </Button>
        }
      >
        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Enter Current PIN
          </Text>
          <Text className="text-center text-base text-subtitle">Enter your existing pin code</Text>
        </View>

        <View className="items-center gap-4">
          <OtpInput control={control} name="pin" length={4} />

          <Pressable className="group" onPress={() => router.push("/security-settings/change-pin/forgot")}>
            <Text className="font-urbanist-bold text-base text-primary group-active:underline">
              Forgot PIN?
            </Text>
          </Pressable>
        </View>
      </FormScreen>
    </SafeAreaView>
  );
}
