import { ForgotPasswordLayout } from "@/features/auth/components/forgot-password-layout";
import {
  useConfirmAccountDeletionMutation,
  useRequestAccountDeletionMutation,
} from "@/features/settings/hooks/use-settings-mutations";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

const deleteAccountOtpSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit code"),
});

type DeleteAccountOtpFormValues = z.infer<typeof deleteAccountOtpSchema>;

// Matches the backend's hardcoded 60s resend cooldown (email-tokens.service.ts).
const RESEND_COOLDOWN_SECONDS = 60;

export default function DeleteAccountOtp() {
  const email = useAuthStore((state) => state.user?.email);
  const confirmMutation = useConfirmAccountDeletionMutation();
  const resendMutation = useRequestAccountDeletionMutation();
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((seconds) => seconds - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<DeleteAccountOtpFormValues>({
    resolver: zodResolver(deleteAccountOtpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const onSubmit = (values: DeleteAccountOtpFormValues) => {
    confirmMutation.mutate({ code: values.otp });
  };

  const onResend = () => {
    resendMutation.mutate(undefined, { onSuccess: () => setResendCooldown(RESEND_COOLDOWN_SECONDS) });
  };

  const errorMessage = confirmMutation.isError
    ? getErrorMessage(confirmMutation.error)
    : resendMutation.isError
      ? getErrorMessage(resendMutation.error)
      : null;

  return (
    <>
      <StatusBar style="dark" />
      <ForgotPasswordLayout
        title="Delete account"
        fallbackHref="/(protected)/(tabs)/settings"
        subtitle={
          <>
            Enter the 6 digit code sent to <Text className="text-foreground">{email}</Text> to
            permanently confirm account deletion
          </>
        }
        footer={
          <>
            <Button
              variant="destructive"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={confirmMutation.isPending}
              size="xl"
            >
              <Text>Delete my account</Text>
            </Button>

            <Pressable
              className="group items-center"
              disabled={resendCooldown > 0 || resendMutation.isPending}
              onPress={onResend}
            >
              <Text className="font-urbanist-bold text-base text-primary group-disabled:text-subtitle group-active:underline">
                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
              </Text>
            </Pressable>

            <FormError message={errorMessage} className="text-center" />
          </>
        }
      >
        <View className="gap-4">
          <OtpInput control={control} name="otp" length={6} />
        </View>
      </ForgotPasswordLayout>
    </>
  );
}
