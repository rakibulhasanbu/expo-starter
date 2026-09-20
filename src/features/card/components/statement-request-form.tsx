import * as React from "react";

import { useCardStore } from "@/store/card-store";
import { useToastStore } from "@/store/toast-store";
import { cn } from "@/utils/cn";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { type Href } from "expo-router";
import { Keyboard, Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackButton } from "@/components/back-button";
import { Button } from "@/components/button";
import { FormScreen } from "@/components/form-screen";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { InfoFilledIcon } from "@/components/icons/info-filled-icon";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Text } from "@/components/text";

type StatementFormat = "PDF" | "CSV";

type StatementRequestFormProps = {
  title: string;
  banner?: React.ReactNode;
  submitLabel?: string;
  onSubmitSuccess?: () => void;
  fallbackHref: Href;
};

const formatDate = (date: Date | null): string => {
  if (!date) return "DD/MM/YYYY";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
};

export function StatementRequestForm({
  title,
  banner,
  submitLabel = "Get statement",
  onSubmitSuccess,
  fallbackHref,
}: StatementRequestFormProps) {
  const requestStatement = useCardStore((state) => state.requestStatement);

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [format, setFormat] = React.useState<StatementFormat>("PDF");
  const [activeField, setActiveField] = React.useState<"start" | "end" | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const canSubmit = Boolean(startDate && endDate);

  const applyDate = (field: "start" | "end", date: Date) => {
    if (field === "start") setStartDate(date);
    else setEndDate(date);
  };

  const openDatePicker = (field: "start" | "end") => {
    Keyboard.dismiss();

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: (field === "start" ? startDate : endDate) ?? new Date(),
        mode: "date",
        maximumDate: new Date(),
        onChange: (_event, date) => {
          if (date) applyDate(field, date);
        },
      });
      return;
    }

    setActiveField(field);
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) return;

    setIsLoading(true);
    try {
      await requestStatement({ startDate, endDate, format });
      onSubmitSuccess?.();
      useToastStore.getState().show("success", "Your statement has been sent to your email address");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-2">
        <BackButton fallbackHref={fallbackHref} />
      </View>

      <FormScreen
        contentContainerClassName="gap-[30px] px-5 pb-8 pt-10"
        footer={
          <Button size="xl" disabled={!canSubmit || isLoading} onPress={handleSubmit}>
            <Text>{submitLabel}</Text>
          </Button>
        }
      >
        <Text className="font-urbanist-bold text-2xl tracking-[-0.25px] text-foreground">{title}</Text>

        {banner}

        <View className="gap-[30px]">
          <View className="flex-row items-center gap-4">
            <View className="flex-1 gap-2">
              <Text className="font-urbanist-bold text-base text-foreground">Start Date</Text>
              <Pressable
                onPress={() => openDatePicker("start")}
                className="flex-row items-center justify-between rounded-lg border border-border p-3"
              >
                <Text className={cn("text-base", startDate ? "text-foreground" : "text-muted-foreground")}>
                  {formatDate(startDate)}
                </Text>
                <CalendarIcon size={20} />
              </Pressable>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-urbanist-bold text-base text-foreground">End Date</Text>
              <Pressable
                onPress={() => openDatePicker("end")}
                className="flex-row items-center justify-between rounded-lg border border-border p-3"
              >
                <Text className={cn("text-base", endDate ? "text-foreground" : "text-muted-foreground")}>
                  {formatDate(endDate)}
                </Text>
                <CalendarIcon size={20} />
              </Pressable>
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-urbanist-bold text-base text-foreground">Format</Text>
            <View className="flex-row items-center gap-4">
              {(["PDF", "CSV"] as StatementFormat[]).map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setFormat(option)}
                  className="flex-row items-center gap-3 rounded-lg border border-border px-2.5 py-2.5"
                >
                  <Text className="text-base text-foreground">{option}</Text>
                  <View
                    className={cn(
                      "size-6 items-center justify-center rounded-full border-2",
                      format === option ? "border-primary" : "border-border"
                    )}
                  >
                    {format === option ? <View className="size-3 rounded-full bg-primary" /> : null}
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="flex-row items-start gap-2 rounded-lg border border-info bg-info-background p-3">
            <InfoFilledIcon size={24} />
            <Text className="flex-1 text-sm text-foreground">
              Your statement will be sent to your email address
            </Text>
          </View>

          {Platform.OS === "ios" && activeField ? (
            <View className="items-center rounded-3xl bg-secondary">
              <DateTimePicker
                value={(activeField === "start" ? startDate : endDate) ?? new Date()}
                mode="date"
                display="spinner"
                maximumDate={new Date()}
                onChange={(_event, date) => {
                  if (date) applyDate(activeField, date);
                }}
              />
              <Pressable className="w-full items-center py-3" onPress={() => setActiveField(null)}>
                <Text className="font-urbanist-bold text-base text-primary">Done</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </FormScreen>

      {isLoading ? <LoadingOverlay /> : null}
    </SafeAreaView>
  );
}
