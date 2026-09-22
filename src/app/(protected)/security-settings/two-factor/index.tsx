import { useEffect, useRef, useState } from "react";

import {
  use2faEnableMutation,
  use2faSetupMutation,
} from "@/features/auth/hooks/use-auth-mutations";
import { authKeys } from "@/features/auth/hooks/use-auth-queries";
import { queryClient } from "@/lib/query-client";
import { useToastStore } from "@/store/toast-store";
import { getErrorMessage } from "@/utils/get-error-message";
import { safeBack } from "@/utils/safe-back";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { useForm } from "react-hook-form";
import { Pressable, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { CopyIcon } from "@/components/icons/copy-icon";
import { ShareIcon } from "@/components/icons/share-icon";
import { FormError } from "@/components/form-error";
import { FormScreen } from "@/components/form-screen";
import { OtpInput } from "@/components/otp-input";
import { QueryErrorView } from "@/components/query-error-view";
import { Skeleton } from "@/components/skeleton";
import { Text } from "@/components/text";

const codeSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit code"),
});

type CodeFormValues = z.infer<typeof codeSchema>;

// The otpauth:// URL the backend returns encodes the shared secret as a
// query param — pulled out here so it can be shown/copied for manual entry
// (some authenticator apps can't scan a QR code).
const extractSecret = (otpauthUrl: string): string | null => {
  try {
    const [, query] = otpauthUrl.split("?");
    return new URLSearchParams(query ?? "").get("secret");
  } catch {
    return null;
  }
};

export default function TwoFactorSetupScreen() {
  const setupMutation = use2faSetupMutation();
  const enableMutation = use2faEnableMutation();
  const showToast = useToastStore((state) => state.show);

  const [step, setStep] = useState<"confirm" | "recovery">("confirm");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const hasStartedSetup = useRef(false);

  useEffect(() => {
    if (hasStartedSetup.current) return;
    hasStartedSetup.current = true;
    setupMutation.mutate();
  }, [setupMutation]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const onSubmit = (values: CodeFormValues) => {
    enableMutation.mutate(values.otp, {
      onSuccess: (response) => {
        setRecoveryCodes(response.data.recoveryCodes);
        setStep("recovery");
        queryClient.invalidateQueries({ queryKey: authKeys.me() });
      },
    });
  };

  const secret = setupMutation.data ? extractSecret(setupMutation.data.data.otpauthUrl) : null;

  const onCopySecret = async () => {
    if (!secret) return;
    await Clipboard.setStringAsync(secret);
    showToast("success", "Secret copied to clipboard");
  };

  const onCopyRecoveryCodes = async () => {
    await Clipboard.setStringAsync(recoveryCodes.join("\n"));
    showToast("success", "Recovery codes copied to clipboard");
  };

  const onShareRecoveryCodes = async () => {
    try {
      await Share.share({ message: recoveryCodes.join("\n") });
    } catch {
      showToast("error", "Couldn't open the share sheet");
    }
  };

  const onDone = () => {
    safeBack("/(protected)/security-settings");
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/security-settings"
        />
      </View>

      {step === "recovery" ? (
        <FormScreen
          contentContainerClassName="gap-8 px-5 pb-8 pt-10"
          footer={
            <Button size="xl" onPress={onDone}>
              <Text>I&apos;ve saved these codes</Text>
            </Button>
          }
        >
          <View className="gap-2">
            <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
              Save Your Recovery Codes
            </Text>
            <Text className="text-base text-subtitle">
              Store these codes somewhere safe. Each one can be used once to sign in if you lose access
              to your authenticator app. They won&apos;t be shown again.
            </Text>
          </View>

          <View className="gap-2 rounded-3xl bg-secondary p-4">
            {recoveryCodes.map((code) => (
              <Text key={code} selectable className="font-urbanist-bold text-base text-foreground">
                {code}
              </Text>
            ))}
          </View>

          <View className="flex-row gap-3">
            <Button variant="outline" size="lg" className="flex-1" onPress={onCopyRecoveryCodes}>
              <CopyIcon size={16} />
              <Text>Copy all</Text>
            </Button>
            <Button variant="outline" size="lg" className="flex-1" onPress={onShareRecoveryCodes}>
              <ShareIcon size={16} />
              <Text>Share</Text>
            </Button>
          </View>
        </FormScreen>
      ) : (
        <FormScreen
          contentContainerClassName="gap-8 px-5 pb-8 pt-10"
          footer={
            <>
              <Button
                size="xl"
                disabled={!isValid || !setupMutation.isSuccess}
                loading={enableMutation.isPending}
                onPress={handleSubmit(onSubmit)}
              >
                <Text>Enable Two-Factor Authentication</Text>
              </Button>
              <FormError
                message={enableMutation.isError ? getErrorMessage(enableMutation.error) : null}
                className="text-center"
              />
            </>
          }
        >
          <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">
            Two-Factor Authentication
          </Text>

          {setupMutation.isPending ? (
            <View className="items-center gap-4">
              <Skeleton className="size-[220px] rounded-2xl" />
              <Skeleton className="h-5 w-2/3 rounded-md" />
            </View>
          ) : setupMutation.isError ? (
            <QueryErrorView
              message={getErrorMessage(setupMutation.error)}
              onRetry={() => setupMutation.mutate()}
            />
          ) : setupMutation.data ? (
            <View className="gap-6">
              <Text className="text-base text-subtitle">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </Text>

              <View className="items-center">
                <Image
                  source={{ uri: setupMutation.data.data.qrCodeDataUrl }}
                  style={{ width: 220, height: 220 }}
                  contentFit="contain"
                />
              </View>

              {secret ? (
                <Pressable
                  className="group flex-row items-center justify-between gap-3 rounded-2xl bg-secondary px-4 py-3"
                  onPress={onCopySecret}
                >
                  <Text selectable className="flex-1 font-urbanist-medium text-sm text-foreground">
                    {secret}
                  </Text>
                  <CopyIcon size={16} />
                </Pressable>
              ) : null}

              <View className="gap-2">
                <Text className="font-urbanist-bold text-base text-foreground">
                  Enter the 6-digit code from the app to confirm
                </Text>
                <OtpInput control={control} name="otp" length={6} />
              </View>
            </View>
          ) : null}
        </FormScreen>
      )}
    </SafeAreaView>
  );
}
