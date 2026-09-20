import { useChangePasswordMutation } from "@/features/settings/hooks/use-settings-mutations";
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
import { FormInput } from "@/components/form-input";
import { FormScreen } from "@/components/form-screen";
import { LockIcon } from "@/components/icons/lock-icon";
import { Text } from "@/components/text";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordScreen() {
  const changePasswordMutation = useChangePasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const onSubmit = (values: ChangePasswordFormValues) => {
    changePasswordMutation.mutate(values, {
      onSuccess: () => {
        useToastStore.getState().show("success", "Password changed successfully");
        safeBack("/(protected)/security-settings");
      },
      onError: (error) => {
        useToastStore.getState().show("error", getErrorMessage(error));
      },
    });
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
          <Button
            size="xl"
            disabled={!isValid || changePasswordMutation.isPending}
            loading={changePasswordMutation.isPending}
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Change password</Text>
          </Button>
        }
      >
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
          Change Password
        </Text>

        <View className="gap-4">
          <FormInput
            control={control}
            name="currentPassword"
            label="Current Password"
            type="password"
            placeholder="Enter password"
            icon={<LockIcon size={20} />}
          />

          <FormInput
            control={control}
            name="newPassword"
            label="New Password"
            type="password"
            placeholder="New password"
            icon={<LockIcon size={20} />}
          />
        </View>
      </FormScreen>
    </SafeAreaView>
  );
}
