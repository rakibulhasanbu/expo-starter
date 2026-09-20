import { ForgotPasswordLayout } from "@/features/auth/components/forgot-password-layout";
import {
  useResendSignupEmailMutation,
  useVerifySignupTokenMutation,
} from "@/features/auth/hooks/use-auth-mutations";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
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

export default function SignUpVerifyEmail() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const verifySignupTokenMutation = useVerifySignupTokenMutation();
  const resendSignupEmailMutation = useResendSignupEmailMutation();

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
    verifySignupTokenMutation.mutate(
      { token: Number(values.otp) },
      {
        onSuccess: () => {
          useAuthStore.getState().clearPendingAccessToken();
          router.replace("/(auth)/sign-up/success");
        },
      }
    );
  };

  const errorMessage = verifySignupTokenMutation.isError
    ? getErrorMessage(verifySignupTokenMutation.error)
    : resendSignupEmailMutation.isError
      ? getErrorMessage(resendSignupEmailMutation.error)
      : null;

  return (
    <>
      <StatusBar style="dark" />
      <ForgotPasswordLayout
        title="Verify Email Address"
        fallbackHref="/(auth)/sign-up"
        subtitle={
          <>
            Kindly enter the 6 digit code sent to your mail{" "}
            <Text className="text-foreground">{email}</Text>
          </>
        }
        footer={
          <>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={verifySignupTokenMutation.isPending}
              size="xl"
            >
              <Text>Submit</Text>
            </Button>

            <Pressable
              className="group items-center"
              disabled={resendSignupEmailMutation.isPending}
              onPress={() => resendSignupEmailMutation.mutate(email)}
            >
              <Text className="font-urbanist-bold text-base text-primary group-active:underline">
                Resend code
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
