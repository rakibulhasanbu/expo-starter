import { ForgotPasswordLayout } from "@/features/auth/components/forgot-password-layout";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/features/auth/hooks/use-auth-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { LockIcon } from "@/components/icons/lock-icon";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

// The backend has no standalone "verify code" step — a reset code is only
// validated together with the new password in one POST /auth/reset-password
// call, so this screen collects both instead of splitting them across two.
const resetPasswordSchema = z
  .object({
    otp: z.string().length(6, "Enter the 6-digit code"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// Matches the backend's hardcoded 60s resend cooldown (email-tokens.service.ts).
const RESEND_COOLDOWN_SECONDS = 60;

export default function ForgotPasswordOtp() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const resetPasswordMutation = useResetPasswordMutation();
  const resendForgotPasswordMutation = useForgotPasswordMutation();
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
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    resetPasswordMutation.mutate(
      { email, code: values.otp, password: values.password },
      {
        // Resetting auto-signs the user in — go straight to the app.
        onSuccess: () => router.replace("/home"),
      }
    );
  };

  const onResend = () => {
    resendForgotPasswordMutation.mutate(
      { email },
      { onSuccess: () => setResendCooldown(RESEND_COOLDOWN_SECONDS) }
    );
  };

  const errorMessage = resetPasswordMutation.isError
    ? getErrorMessage(resetPasswordMutation.error)
    : resendForgotPasswordMutation.isError
      ? getErrorMessage(resendForgotPasswordMutation.error)
      : null;

  return (
    <>
      <StatusBar style="dark" />
      <ForgotPasswordLayout
        title="Reset Password"
        fallbackHref="/(auth)/forgot-password"
        subtitle={
          <>
            Enter the 6 digit code sent to <Text className="text-foreground">{email}</Text> and choose a
            new password
          </>
        }
        footer={
          <>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={resetPasswordMutation.isPending}
              size="xl"
            >
              <Text>Submit</Text>
            </Button>

            <Pressable
              className="group items-center"
              disabled={resendCooldown > 0 || resendForgotPasswordMutation.isPending}
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

          <FormInput
            control={control}
            name="password"
            label="New password"
            placeholder="Enter password"
            icon={<LockIcon size={20} />}
            type="password"
          />

          <FormInput
            control={control}
            name="confirmPassword"
            label="Confirm password"
            placeholder="Enter password"
            icon={<LockIcon size={20} />}
            type="password"
          />
        </View>
      </ForgotPasswordLayout>
    </>
  );
}
