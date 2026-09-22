import { TermsCheckbox } from "@/features/auth/components/terms-checkbox";
import { useSignUpMutation } from "@/features/auth/hooks/use-auth-mutations";
import { getErrorMessage } from "@/utils/get-error-message";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { Keyboard, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { FormInput } from "@/components/form-input";
import { FormScreen } from "@/components/form-screen";
import { LockIcon } from "@/components/icons/lock-icon";
import { Logo } from "@/components/icons/logo";
import { MailIcon } from "@/components/icons/mail-icon";
import { PhoneInput } from "@/components/phone-input";
import { Text } from "@/components/text";

const signUpSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().min(5, "Email is required").email("Enter a valid email"),
  phone: z.string().optional(),
  phoneCountryCode: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  termsAccepted: z.boolean().refine((value) => value === true, {
    message: "You must accept the Terms and Conditions",
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const signUpMutation = useSignUpMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      phoneCountryCode: "+1",
      password: "",
      termsAccepted: false,
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    signUpMutation.mutate(
      {
        name: values.name,
        email: values.email,
        phone: values.phone ? `${values.phoneCountryCode}${values.phone}` : undefined,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push({
            pathname: "/(auth)/sign-up/verify-email",
            params: { email: values.email },
          });
        },
      }
    );
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
          <FormScreen contentContainerClassName="justify-between px-5 pb-8 pt-10">
            <View className="gap-4">
              <Text className="pb-4 font-urbanist-bold text-[24px] tracking-[-0.25px] text-foreground">
                Create Account
              </Text>

              <FormInput
                control={control}
                name="name"
                label="Full Name"
                placeholder="Enter your name"
                icon={<Ionicons name="person-outline" size={20} className="text-foreground" />}
                autoCapitalize="words"
                textContentType="name"
              />

              <FormInput
                control={control}
                name="email"
                label="Email Address"
                placeholder="Enter email"
                icon={<MailIcon size={20} />}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <PhoneInput control={control} name="phone" countryName="phoneCountryCode" label="Phone Number" />

              <FormInput
                control={control}
                name="password"
                label="Password"
                placeholder="Enter password"
                icon={<LockIcon size={20} />}
                type="password"
              />

              <TermsCheckbox control={control} name="termsAccepted" />
            </View>

            <View className="gap-4 pt-8">
              <FormError
                message={signUpMutation.isError ? getErrorMessage(signUpMutation.error) : null}
                className="text-center"
              />

              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
                loading={signUpMutation.isPending}
                size="xl"
              >
                <Text>Sign up</Text>
              </Button>

              <View className="flex-row justify-center gap-1">
                <Text className="text-muted-foreground">Already have an account?</Text>
                <Pressable className="group" onPress={() => router.push("/(auth)/sign-in")}>
                  <Text className="font-urbanist-bold text-base text-primary group-active:text-primary group-active:underline">
                    Log In
                  </Text>
                </Pressable>
              </View>
            </View>
          </FormScreen>
        </SafeAreaView>
      </Pressable>
    </View>
  );
}
