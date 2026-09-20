import { useRef } from "react";
import { useWindowDimensions, View } from "react-native";

import { Image } from "expo-image";
import type { SharedValue } from "react-native-reanimated";
import { Carousel, type CarouselRef } from "react-native-reanimated-carousel";

import type { OnboardingSlide } from "@/features/onboarding/types";

const AUTOPLAY_INTERVAL_MS = 4000;
const CAROUSEL_HEIGHT_RATIO = 0.85;

type OnboardingCarouselProps = {
  slides: OnboardingSlide[];
  progress: SharedValue<number>;
};

export function OnboardingCarousel({ slides, progress }: OnboardingCarouselProps) {
  const ref = useRef<CarouselRef>(null);
  const { width } = useWindowDimensions();
  const height = width * CAROUSEL_HEIGHT_RATIO;

  return (
    <Carousel
      ref={ref}
      style={{ width, height }}
      data={slides}
      loop
      autoplay
      autoplayInterval={AUTOPLAY_INTERVAL_MS}
      progress={progress}
      renderItem={({ item }) => (
        <View className="flex-1 items-center justify-center px-10 py-6">
          <Image source={item.image} style={{ width: "100%", height: "100%" }} contentFit="contain" />
        </View>
      )}
    />
  );
}
