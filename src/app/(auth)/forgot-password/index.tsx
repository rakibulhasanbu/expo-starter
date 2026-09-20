import { ForgotPasswordLayout } from "@/features/auth/components/forgot-password-layout";
import { useSendForgotPasswordEmailMutation } from "@/features/auth/hooks/use-auth-mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { MailIcon } from "@/components/icons/mail-icon";
import { Text } from "@/components/text";
import { getErrorMessage } from "@/utils/get-error-message";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const sendForgotPasswordEmailMutation = useSendForgotPasswordEmailMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    sendForgotPasswordEmailMutation.mutate(values.email, {
      onSuccess: () =>
        router.push({
          pathname: "/(auth)/forgot-password/otp",
          params: { email: values.email },
        }),
    });
  };

  return (
    <>
      <StatusBar style="dark" />

      <ForgotPasswordLayout
        title="Forgot Password ?"
        subtitle="Kindly enter your email address below"
        fallbackHref="/(auth)/sign-in"
        footer={
          <>
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={sendForgotPasswordEmailMutation.isPending}
              size="xl"
            >
              <Text>Verify</Text>
            </Button>

            <FormError
              message={
                sendForgotPasswordEmailMutation.isError
                  ? getErrorMessage(sendForgotPasswordEmailMutation.error)
                  : null
              }
              className="text-center"
            />
          </>
        }
      >
        <FormInput
          control={control}
          name="email"
          label="Email Address"
          placeholder="Enter email"
          icon={<MailIcon size={20} />}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </ForgotPasswordLayout>
    </>
  );
}
