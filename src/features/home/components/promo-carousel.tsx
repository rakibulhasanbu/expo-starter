import * as React from "react";

import { cn } from "@/utils/cn";
import { Image } from "expo-image";
import { router, type Href } from "expo-router";
import { Pressable, useWindowDimensions, View } from "react-native";
import { Carousel, type CarouselRef } from "react-native-reanimated-carousel";

import { ArrowRightIcon } from "@/components/icons/arrow-right-icon";
import { Text } from "@/components/text";

import type { HomeCarouselSlide } from "../types";

const CARD_HEIGHT = 150;
const HORIZONTAL_PADDING = 20;
const AUTOPLAY_INTERVAL_MS = 5000;

type PromoCarouselProps = {
  slides: HomeCarouselSlide[];
};

export function PromoCarousel({ slides }: PromoCarouselProps) {
  const ref = React.useRef<CarouselRef>(null);
  const { width } = useWindowDimensions();
  const cardWidth = width - HORIZONTAL_PADDING * 2;
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <View className="relative w-full gap-3">
      <Carousel
        ref={ref}
        style={{ width: cardWidth, height: CARD_HEIGHT }}
        data={slides}
        loop={slides.length > 1}
        autoplay={slides.length > 1}
        autoplayInterval={AUTOPLAY_INTERVAL_MS}
        onSnapToItem={setActiveIndex}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(item.href as Href)}
            className="relative h-full w-full flex-row items-start justify-between gap-6 overflow-hidden rounded-2xl bg-primary p-4"
          >
            <View className="flex-1 gap-3">
              <View className="gap-2">
                <Text className="font-urbanist-bold text-base text-primary-foreground">{item.title}</Text>
                <Text className="text-xs tracking-[0.15px] text-muted">{item.description}</Text>
              </View>

              <View className="flex-row items-center gap-2 self-start rounded-full bg-background px-4 py-2">
                <Text className="font-urbanist-medium text-xs tracking-[0.15px] text-foreground">
                  {item.buttonLabel}
                </Text>
                <ArrowRightIcon size={14} />
              </View>
            </View>

            <Image source={item.image} style={{ width: 72, height: 85 }} contentFit="contain" />
          </Pressable>
        )}
      />

      {slides.length > 1 ? (
        <View className="absolute bottom-4 w-full flex-row items-center justify-center gap-1.5">
          {slides.map((slide, index) => (
            <View
              key={slide.id}
              className={cn(
                "size-[7px] rounded-full bg-muted/20",
                index === activeIndex ? "bg-primary-foreground" : ""
              )}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
