import { use2faDisableMutation } from "@/features/auth/hooks/use-auth-mutations";
import { authKeys } from "@/features/auth/hooks/use-auth-queries";
import { queryClient } from "@/lib/query-client";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { safeBack } from "@/utils/safe-back";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { FormScreen } from "@/components/form-screen";
import { LockIcon } from "@/components/icons/lock-icon";
import { OtpInput } from "@/components/otp-input";
import { Text } from "@/components/text";

const disableTwoFactorSchema = z.object({
  password: z.string().min(1, "Enter your password"),
  otp: z.string().length(6, "Enter the 6-digit code"),
});

type DisableTwoFactorFormValues = z.infer<typeof disableTwoFactorSchema>;

export default function TwoFactorDisableScreen() {
  const disableMutation = use2faDisableMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<DisableTwoFactorFormValues>({
    resolver: zodResolver(disableTwoFactorSchema),
    mode: "onChange",
    defaultValues: { password: "", otp: "" },
  });

  const onSubmit = (values: DisableTwoFactorFormValues) => {
    disableMutation.mutate(
      { password: values.password, code: values.otp },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: authKeys.me() });
          useToastStore.getState().show("success", "Two-factor authentication disabled");
          safeBack("/(protected)/security-settings");
        },
      }
    );
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
          <>
            <Button
              size="xl"
              disabled={!isValid}
              loading={disableMutation.isPending}
              onPress={handleSubmit(onSubmit)}
            >
              <Text>Disable Two-Factor Authentication</Text>
            </Button>
            <FormError
              message={disableMutation.isError ? getErrorMessage(disableMutation.error) : null}
              className="text-center"
            />
          </>
        }
      >
        <View className="gap-2">
          <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Disable Two-Factor Authentication
          </Text>
          <Text className="text-base text-subtitle">
            Confirm your password and a current authenticator code to turn off two-factor
            authentication.
          </Text>
        </View>

        <View className="gap-4">
          <FormInput
            control={control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            icon={<LockIcon size={20} />}
          />

          <View className="gap-1.5">
            <Text variant="label">Authenticator code</Text>
            <OtpInput control={control} name="otp" length={6} />
          </View>
        </View>
      </FormScreen>
    </SafeAreaView>
  );
}
