import { ForgotPasswordLayout } from "@/features/auth/components/forgot-password-layout";
import {
  useSendForgotPasswordEmailMutation,
  useVerifyForgotTokenMutation,
} from "@/features/auth/hooks/use-auth-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

const otpSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit code"),
});

type OtpFormValues = z.infer<typeof otpSchema>;

const RESEND_COOLDOWN_SECONDS = 30;

export default function ForgotPasswordOtp() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const verifyForgotTokenMutation = useVerifyForgotTokenMutation();
  const resendForgotPasswordEmailMutation = useSendForgotPasswordEmailMutation();
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
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const onSubmit = (values: OtpFormValues) => {
    verifyForgotTokenMutation.mutate(
      { email, token: Number(values.otp) },
      {
        onSuccess: () =>
          router.push({
            pathname: "/(auth)/forgot-password/reset-password",
            params: { email, token: values.otp },
          }),
      }
    );
  };

  const onResend = () => {
    resendForgotPasswordEmailMutation.mutate(email, {
      onSuccess: () => setResendCooldown(RESEND_COOLDOWN_SECONDS),
    });
  };

  const errorMessage = verifyForgotTokenMutation.isError
    ? getErrorMessage(verifyForgotTokenMutation.error)
    : resendForgotPasswordEmailMutation.isError
      ? getErrorMessage(resendForgotPasswordEmailMutation.error)
      : null;

  return (
    <>
      <StatusBar style="dark" />
      <ForgotPasswordLayout
        title="Check Your Email"
        fallbackHref="/(auth)/forgot-password"
        subtitle={
          <>
            Kindly enter the 6 digit code sent to your mail <Text className="text-foreground">{email}</Text>
          </>
        }
        footer={
          <>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={verifyForgotTokenMutation.isPending}
              size="xl"
            >
              <Text>Verify</Text>
            </Button>

            <Pressable
              className="group items-center"
              disabled={resendCooldown > 0 || resendForgotPasswordEmailMutation.isPending}
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
        <OtpInput control={control} name="otp" length={6} />
      </ForgotPasswordLayout>
    </>
  );
}
