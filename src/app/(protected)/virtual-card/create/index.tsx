import { useState } from "react";

import { CardPreview } from "@/features/card/components/card-preview";
import { ThemeSwatchPicker } from "@/features/card/components/theme-swatch-picker";
import type { CardTheme } from "@/features/card/types";
import { useCardStore } from "@/store/card-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";
import { FormScreen } from "@/components/form-screen";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Text } from "@/components/text";

const createCardSchema = z.object({
  holderName: z.string().trim().min(1, "Card holder's name is required"),
});

type CreateCardFormValues = z.infer<typeof createCardSchema>;

export default function CreateCardScreen() {
  const createCard = useCardStore((state) => state.createCard);
  const [theme, setTheme] = useState<CardTheme>("dark");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateCardFormValues>({
    resolver: zodResolver(createCardSchema),
    mode: "onChange",
    defaultValues: { holderName: "" },
  });

  const holderName = useWatch({ control, name: "holderName" });

  const onSubmit = async (values: CreateCardFormValues) => {
    setIsSubmitting(true);
    try {
      await createCard({ holderName: values.holderName, theme });
      router.replace("/virtual-card/success");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="flex-row items-center px-5 pt-10">
        <BackButton fallbackHref="/(protected)/(tabs)/card" disabled={isSubmitting} />
      </View>

      <FormScreen
        contentContainerClassName="gap-5 px-5 pb-8 pt-6"
        footer={
          <Button size="xl" disabled={!isValid || isSubmitting} onPress={handleSubmit(onSubmit)}>
            <Text>Create card</Text>
          </Button>
        }
      >
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">Create Card</Text>

        <CardPreview theme={theme} holderName={holderName || undefined} />

        <View className="gap-6">
          <View className="w-[60%] gap-2">
            <Text className="font-urbanist-bold text-base text-foreground">Choose Color</Text>
            <ThemeSwatchPicker value={theme} onChange={setTheme} />
          </View>

          <FormInput
            control={control}
            name="holderName"
            label="Card Holder's Name"
            placeholder="Enter name"
            autoCapitalize="words"
          />
        </View>
      </FormScreen>

      {isSubmitting ? <LoadingOverlay /> : null}
    </SafeAreaView>
  );
}
