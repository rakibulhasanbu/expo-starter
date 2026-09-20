import { ForgotPasswordLayout } from "@/features/auth/components/forgot-password-layout";
import { useChangePasswordMutation } from "@/features/auth/hooks/use-auth-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { LockIcon } from "@/components/icons/lock-icon";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordResetPassword() {
  const { email, token } = useLocalSearchParams<{ email: string; token: string }>();
  const changePasswordMutation = useChangePasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    changePasswordMutation.mutate(
      { email, otp: Number(token), password: values.password },
      { onSuccess: () => router.replace("/(auth)/forgot-password/success") }
    );
  };

  return (
    <>
      <StatusBar style="dark" />
      <ForgotPasswordLayout
        title="Reset Password"
        subtitle="Kindly enter a password that you will remember."
        fallbackHref="/(auth)/sign-in"
        footer={
          <>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={changePasswordMutation.isPending}
              size="xl"
            >
              <Text>Submit</Text>
            </Button>

            <FormError
              message={changePasswordMutation.isError ? getErrorMessage(changePasswordMutation.error) : null}
              className="text-center"
            />
          </>
        }
      >
        <FormInput
          control={control}
          name="password"
          label="Password"
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
      </ForgotPasswordLayout>
    </>
  );
}
