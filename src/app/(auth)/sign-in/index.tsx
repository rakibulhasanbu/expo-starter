import { useEffect, useState } from "react";

import { useSignInMutation } from "@/features/auth/hooks/use-auth-mutations";
import {
  isPasskeySupported,
  useUsernamelessPasskeyLoginMutation,
} from "@/features/auth/hooks/use-passkey-mutations";
import { getErrorMessage } from "@/utils/get-error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { Keyboard, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { getHasRegisteredPasskey } from "@/lib/passkey-storage";
import { AnimatedWaveEmoji } from "@/components/animated-wave-emoji";
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { FormScreen } from "@/components/form-screen";
import { FingerScanIcon } from "@/components/icons/finger-scan-icon";
import { LockIcon } from "@/components/icons/lock-icon";
import { Logo } from "@/components/icons/logo";
import { MailIcon } from "@/components/icons/mail-icon";
import { Text } from "@/components/text";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignIn() {
  const signInMutation = useSignInMutation();
  const passkeyLoginMutation = useUsernamelessPasskeyLoginMutation();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const [showPasskeyButton, setShowPasskeyButton] = useState(false);

  useEffect(() => {
    if (!isPasskeySupported()) return;
    getHasRegisteredPasskey().then(setShowPasskeyButton);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInFormValues) => {
    signInMutation.mutate(values, {
      onSuccess: (response) => {
        if ("twoFactorRequired" in response.data) {
          router.push({
            pathname: "/(auth)/2fa-verify",
            params: { twoFactorToken: response.data.twoFactorToken },
          });
          return;
        }
        router.replace((redirect ?? "/home") as Href);
      },
    });
  };

  const onPasskeySignIn = () => {
    passkeyLoginMutation.mutate(undefined, {
      onSuccess: () => router.replace((redirect ?? "/home") as Href),
    });
  };

  return (
    <View className="flex-1 bg-primary dark:bg-secondary/95">
      <StatusBar style="light" />

      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <SafeAreaView
          edges={["top"]}
          className="relative items-center justify-center overflow-hidden pb-16 pt-10"
        >
          <Logo />
        </SafeAreaView>

        <SafeAreaView edges={["bottom"]} className="relative z-20 flex-1 rounded-t-[40px] bg-background">
          <View className="absolute -z-20 h-[51px] w-[85%] max-w-[329px] -translate-y-1/2 self-center rounded-full bg-background/[0.16] dark:bg-background/60" />
          <FormScreen contentContainerClassName="gap-4 px-5 pb-8 pt-10">
            <View className="flex-row items-center gap-2 pb-4">
              <Text className="font-urbanist-bold text-[24px] tracking-[-0.25px] text-foreground">
                Welcome Back
              </Text>
              <AnimatedWaveEmoji />
            </View>

            <FormInput
              control={control}
              name="email"
              label="Email Address"
              placeholder="Enter email"
              icon={<MailIcon size={20} />}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <FormInput
              control={control}
              name="password"
              label="Password"
              placeholder="Enter password"
              icon={<LockIcon size={20} />}
              type="password"
            />

            <Pressable
              onPress={() => router.push("/(auth)/forgot-password")}
              className="group -mt-2 mb-2 self-end"
            >
              <Text className="text-base text-primary group-active:font-urbanist-medium group-active:underline">
                Forgot password ?
              </Text>
            </Pressable>

            <FormError
              message={
                signInMutation.isError
                  ? getErrorMessage(signInMutation.error)
                  : passkeyLoginMutation.isError
                    ? getErrorMessage(passkeyLoginMutation.error)
                    : null
              }
              className="text-center"
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={signInMutation.isPending}
              size="xl"
            >
              <Text>Log In</Text>
            </Button>

            {showPasskeyButton && (
              <Button
                onPress={onPasskeySignIn}
                loading={passkeyLoginMutation.isPending}
                variant="outline"
                size="xl"
              >
                <FingerScanIcon size={20} />
                <Text>Sign in with Fingerprint</Text>
              </Button>
            )}

            <View className="flex-row justify-center gap-1">
              <Text className="text-muted-foreground">Don&apos;t have an account?</Text>
              <Pressable className="group" onPress={() => router.push("/(auth)/sign-up")}>
                <Text className="font-urbanist-bold text-base text-primary group-active:text-primary group-active:underline">
                  Sign up
                </Text>
              </Pressable>
            </View>
          </FormScreen>
        </SafeAreaView>
      </Pressable>
    </View>
  );
}
