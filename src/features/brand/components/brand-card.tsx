import { Image } from "expo-image";
import { Text, View } from "react-native";

import type { Brand } from "../types";

type BrandCardProps = {
  brand: Brand;
};

export const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <View className="w-1/2 p-2">
      <View className="items-center rounded-lg border border-border bg-card p-3">
        <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-muted">
          {brand.imgURL ? (
            <Image
              source={{ uri: brand.imgURL }}
              style={{ width: 96, height: 96 }}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <Text className="text-lg font-semibold text-muted-foreground">{brand.name.charAt(0)}</Text>
          )}
        </View>
        <Text numberOfLines={1} className="mt-2 text-center text-sm font-medium text-foreground">
          {brand.name}
        </Text>
      </View>
    </View>
  );
};
