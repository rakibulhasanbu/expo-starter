import { ForgotPasswordLayout } from "@/features/auth/components/forgot-password-layout";
import { useReactivateAccountMutation } from "@/features/auth/hooks/use-auth-mutations";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { MailIcon } from "@/components/icons/mail-icon";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";

const reactivateAccountSchema = z.object({
  // Collected rather than taken purely from the route param: a Google sign-in
  // hits this same 409 without ever having asked for an email.
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  otp: z.string().length(6, "Enter the 6-digit code"),
});

type ReactivateAccountFormValues = z.infer<typeof reactivateAccountSchema>;

/**
 * Reached when sign-in, sign-up or Google login answers 409
 * ACCOUNT_PENDING_DELETION. The backend has already emailed the code by then,
 * so there is nothing to request here — only the code to enter.
 */
export default function ReactivateAccountScreen() {
  const { email, graceEndsAt } = useLocalSearchParams<{ email: string; graceEndsAt: string }>();
  const deadline = formatDeadline(graceEndsAt);
  const reactivateAccountMutation = useReactivateAccountMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ReactivateAccountFormValues>({
    resolver: zodResolver(reactivateAccountSchema),
    mode: "onChange",
    defaultValues: { email: email ?? "", otp: "" },
  });

  const onSubmit = (values: ReactivateAccountFormValues) => {
    reactivateAccountMutation.mutate(
      { email: values.email, code: values.otp },
      {
        onSuccess: () => {
          // Restoring the account issues no session — the user signs in again
          // from here, and still hits 2FA if they had it enabled.
          useToastStore.getState().show("success", "Account restored. Sign in to continue.");
          router.replace("/(auth)/sign-in");
        },
      }
    );
  };

  return (
    <>
      <StatusBar style="dark" />
      <ForgotPasswordLayout
        title="Reactivate Account"
        fallbackHref="/(auth)/sign-in"
        subtitle={
          <>
            This account is scheduled for deletion.{" "}
            {email ? (
              <>
                Enter the 6 digit code sent to <Text className="text-foreground">{email}</Text> to
                restore it
              </>
            ) : (
              <>Enter your email and the 6 digit code we sent you to restore it</>
            )}
            {deadline ? (
              <>
                {" "}
                — after <Text className="text-foreground">{deadline}</Text> the account is gone for
                good.
              </>
            ) : (
              <> — once the grace period ends, the account is gone for good.</>
            )}
          </>
        }
        footer={
          <>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={reactivateAccountMutation.isPending}
              size="xl"
            >
              <Text>Restore my account</Text>
            </Button>

            <FormError
              message={
                reactivateAccountMutation.isError
                  ? getErrorMessage(reactivateAccountMutation.error)
                  : null
              }
              className="text-center"
            />
          </>
        }
      >
        <View className="gap-4">
          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            icon={<MailIcon size={20} />}
          />

          <OtpInput control={control} name="otp" length={6} />
        </View>
      </ForgotPasswordLayout>
    </>
  );
}

/**
 * The deadline is decoration on top of a screen that works without it, so an
 * absent or unparseable value falls back to the vague wording rather than
 * showing "Invalid Date".
 */
function formatDeadline(graceEndsAt: string | undefined): string | null {
  if (!graceEndsAt) return null;
  const date = new Date(graceEndsAt);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
