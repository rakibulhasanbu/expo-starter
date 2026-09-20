import { type Href } from "expo-router";
import { Keyboard, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { FormScreen } from "@/components/form-screen";
import { Text } from "@/components/text";

type ForgotPasswordLayoutProps = {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
  onBackPress?: () => void;
  fallbackHref: Href;
};

function ForgotPasswordLayout({
  title,
  subtitle,
  children,
  footer,
  onBackPress,
  fallbackHref,
}: ForgotPasswordLayoutProps) {
  return (
    <View className="flex-1 bg-background">
      <Pressable className="flex-1" onPress={Keyboard.dismiss}>
        <SafeAreaView edges={["top", "bottom"]} className="flex-1">
          <FormScreen contentContainerClassName="gap-8 px-5 py-8">
            <BackButton onPress={onBackPress} fallbackHref={fallbackHref} />

            <View className="gap-6">
              <View className="gap-2">
                <Text className="font-urbanist-bold text-[24px] tracking-[-0.25px] text-foreground">
                  {title}
                </Text>
                <Text className="text-subtitle text-base">{subtitle}</Text>
              </View>

              {children}
            </View>

            <View className="gap-3">{footer}</View>
          </FormScreen>
        </SafeAreaView>
      </Pressable>
    </View>
  );
}

export { ForgotPasswordLayout };
export type { ForgotPasswordLayoutProps };
