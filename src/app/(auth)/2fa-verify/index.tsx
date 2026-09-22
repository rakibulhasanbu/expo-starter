import { useState } from "react";

import { ForgotPasswordLayout } from "@/features/auth/components/forgot-password-layout";
import { use2faLoginVerifyMutation } from "@/features/auth/hooks/use-auth-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { KeyIcon } from "@/components/icons/key-icon";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

const codeSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit code"),
});

const recoveryCodeSchema = z.object({
  recoveryCode: z.string().min(1, "Enter a recovery code"),
});

type CodeFormValues = z.infer<typeof codeSchema>;
type RecoveryCodeFormValues = z.infer<typeof recoveryCodeSchema>;

export default function TwoFactorVerify() {
  const { twoFactorToken } = useLocalSearchParams<{ twoFactorToken: string }>();
  const twoFactorLoginVerifyMutation = use2faLoginVerifyMutation();
  const [useRecoveryCode, setUseRecoveryCode] = useState(false);

  const codeForm = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const recoveryCodeForm = useForm<RecoveryCodeFormValues>({
    resolver: zodResolver(recoveryCodeSchema),
    mode: "onChange",
    defaultValues: { recoveryCode: "" },
  });

  const onSubmitCode = (values: CodeFormValues) => {
    twoFactorLoginVerifyMutation.mutate(
      { twoFactorToken, code: values.otp },
      { onSuccess: () => router.replace("/home") }
    );
  };

  const onSubmitRecoveryCode = (values: RecoveryCodeFormValues) => {
    twoFactorLoginVerifyMutation.mutate(
      { twoFactorToken, recoveryCode: values.recoveryCode },
      { onSuccess: () => router.replace("/home") }
    );
  };

  const isValid = useRecoveryCode ? recoveryCodeForm.formState.isValid : codeForm.formState.isValid;
  const onSubmit = useRecoveryCode
    ? recoveryCodeForm.handleSubmit(onSubmitRecoveryCode)
    : codeForm.handleSubmit(onSubmitCode);

  const errorMessage = twoFactorLoginVerifyMutation.isError
    ? getErrorMessage(twoFactorLoginVerifyMutation.error)
    : null;

  return (
    <>
      <StatusBar style="dark" />
      <ForgotPasswordLayout
        title="Two-Factor Verification"
        fallbackHref="/(auth)/sign-in"
        subtitle={
          useRecoveryCode
            ? "Enter one of your recovery codes to continue"
            : "Enter the 6 digit code from your authenticator app"
        }
        footer={
          <>
            <Button onPress={onSubmit} disabled={!isValid} loading={twoFactorLoginVerifyMutation.isPending} size="xl">
              <Text>Submit</Text>
            </Button>

            <Pressable className="group items-center" onPress={() => setUseRecoveryCode((current) => !current)}>
              <Text className="font-urbanist-bold text-base text-primary group-active:underline">
                {useRecoveryCode ? "Use authenticator code instead" : "Use a recovery code instead"}
              </Text>
            </Pressable>

            <FormError message={errorMessage} className="text-center" />
          </>
        }
      >
        {useRecoveryCode ? (
          <FormInput
            control={recoveryCodeForm.control}
            name="recoveryCode"
            label="Recovery code"
            placeholder="Enter recovery code"
            icon={<KeyIcon size={20} />}
            autoCapitalize="none"
          />
        ) : (
          <OtpInput control={codeForm.control} name="otp" length={6} />
        )}
      </ForgotPasswordLayout>
    </>
  );
}
