import { OnboardingCarousel } from "@/features/onboarding/components/onboarding-carousel";
import { OnboardingPagination } from "@/features/onboarding/components/onboarding-pagination";
import { OnboardingSlideText } from "@/features/onboarding/components/onboarding-slide-text";
import { ONBOARDING_SLIDES } from "@/features/onboarding/constants";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { AuthStatus, useAuthStore } from "@/store/auth-store";

const TEXT_BLOCK_HEIGHT = 128;

export default function Index() {
  const status = useAuthStore((state) => state.status);
  const progress = useSharedValue(0);

  if (status === AuthStatus.Authenticated) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="flex-1 items-center justify-center">
        <OnboardingCarousel slides={ONBOARDING_SLIDES} progress={progress} />
      </View>

      <View className="items-center gap-6 px-6 pb-6">
        <OnboardingPagination progress={progress} count={ONBOARDING_SLIDES.length} />

        <View className="w-full" style={{ height: TEXT_BLOCK_HEIGHT }}>
          {ONBOARDING_SLIDES.map((slide, index) => (
            <OnboardingSlideText
              key={slide.id}
              slide={slide}
              index={index}
              count={ONBOARDING_SLIDES.length}
              progress={progress}
            />
          ))}
        </View>

        <View className="w-full gap-4">
          <Button variant="default" size="xl" href="/(auth)/sign-up">
            <Text>Create an account</Text>
          </Button>
          <Button variant="secondary" size="xl" href="/(auth)/sign-in">
            <Text>Log in</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
