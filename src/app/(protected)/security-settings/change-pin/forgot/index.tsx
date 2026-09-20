import { useSendPinForgotTokenMutation } from "@/features/settings/hooks/use-settings-mutations";
import { getErrorMessage } from "@/utils/get-error-message";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { MailIcon } from "@/components/icons/mail-icon";
import { Text } from "@/components/text";

export default function ForgotPinScreen() {
  const sendPinForgotTokenMutation = useSendPinForgotTokenMutation();

  const onSubmit = () => {
    sendPinForgotTokenMutation.mutate(undefined, {
      onSuccess: () => router.push("/security-settings/change-pin/forgot/otp"),
    });
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/security-settings/change-pin"
        />
      </View>

      <View className="flex-1 items-center gap-8 px-5 pt-10">
        <MailIcon size={48} />

        <View className="gap-2">
          <Text className="text-center font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Forgot Your PIN?
          </Text>
          <Text className="text-center text-base text-subtitle">
            We&apos;ll send a 6 digit code to your registered email to help you set a new PIN.
          </Text>
        </View>
      </View>

      <View className="gap-3 px-5 pb-2 pt-2">
        <FormError
          message={
            sendPinForgotTokenMutation.isError ? getErrorMessage(sendPinForgotTokenMutation.error) : null
          }
          className="text-center"
        />

        <Button size="xl" loading={sendPinForgotTokenMutation.isPending} onPress={onSubmit}>
          <Text>Send Code</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
