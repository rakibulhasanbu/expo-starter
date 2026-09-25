import * as React from "react";

import { useCurrentUserQuery } from "@/features/auth/hooks/use-auth-queries";
import { AvatarPickerSheet } from "@/features/settings/components/avatar-picker-sheet";
import { GenderSelectSheet } from "@/features/settings/components/gender-select-sheet";
import { ProfileFormSkeleton } from "@/features/settings/components/profile-form-skeleton";
import { useUpdateProfileMutation } from "@/features/settings/hooks/use-settings-mutations";
import { DEFAULT_AVATAR_ID, getAvatarSource } from "@/features/settings/lib/avatars";
import { GENDER_FROM_BACKEND, GENDER_TO_BACKEND, type Gender } from "@/features/settings/types";
import { useToastStore } from "@/store/toast-store";
import { cn } from "@/utils/cn";
import { getErrorMessage } from "@/utils/get-error-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import { useForm, useWatch } from "react-hook-form";
import { Keyboard, Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { BackButton } from "@/components/back-button";
import { FormInput } from "@/components/form-input";
import { FormScreen } from "@/components/form-screen";
import { ArrowDownIcon } from "@/components/icons/arrow-down-icon";
import { EditIcon } from "@/components/icons/edit-icon";
import { QueryErrorView } from "@/components/query-error-view";
import { Text } from "@/components/text";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  birthDate: z.string().nullable(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).nullable(),
  avatarId: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const GENDER_LABELS: Record<Gender, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
  prefer_not_to_say: "Prefer not to say",
};

const formatDate = (isoDate: string | null): string => {
  if (!isoDate) return "dd/mm/yyyy";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
};

export default function Profile() {
  const { data: user, isPending, isError, error, refetch } = useCurrentUserQuery();
  const updateProfileMutation = useUpdateProfileMutation();

  const avatarSheetRef = React.useRef<BottomSheetModal>(null);
  const genderSheetRef = React.useRef<BottomSheetModal>(null);
  const [showIosDatePicker, setShowIosDatePicker] = React.useState(false);

  const defaultValues: ProfileFormValues = React.useMemo(
    () => ({
      name: user?.name ?? "",
      email: user?.email ?? "",
      birthDate: user?.profile?.dateOfBirth ?? null,
      gender: user?.profile?.gender ? GENDER_FROM_BACKEND[user.profile.gender] : null,
      // Not a real URL yet — this app only offers a set of built-in avatar images, and the
      // backend's `avatarUrl` expects an actual URL, so the selection stays local-only for now.
      avatarId: DEFAULT_AVATAR_ID,
    }),
    [user]
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: defaultValues,
    resetOptions: { keepDirtyValues: true },
  });

  const avatarId = useWatch({ control, name: "avatarId" });
  const birthDate = useWatch({ control, name: "birthDate" });
  const gender = useWatch({ control, name: "gender" });

  const openDatePicker = () => {
    Keyboard.dismiss();

    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: birthDate ? new Date(birthDate) : new Date(2000, 0, 1),
        mode: "date",
        maximumDate: new Date(),
        onChange: (_event, date) => {
          if (date) setValue("birthDate", date.toISOString(), { shouldDirty: true });
        },
      });
    } else {
      setShowIosDatePicker(true);
    }
  };

  const onSubmit = (values: ProfileFormValues) => {
    updateProfileMutation.mutate(
      {
        name: values.name,
        // `dateOfBirth` and `gender` live on the nested `user_profiles` record —
        // sending them at the top level is rejected by the backend's strictObject.
        profile: {
          dateOfBirth: values.birthDate ? values.birthDate.slice(0, 10) : undefined,
          gender: values.gender ? GENDER_TO_BACKEND[values.gender] : undefined,
        },
      },
      {
        onSuccess: () => {
          useToastStore.getState().show("success", "Changes saved successfully");
          reset(values);
        },
        onError: (error) => {
          useToastStore.getState().show("error", getErrorMessage(error));
        },
      }
    );
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-background">
      <View className="px-5 pt-10">
        <BackButton
          className="size-[45px] items-center justify-center rounded-full bg-secondary"
          fallbackHref="/(protected)/(tabs)/settings"
        />
      </View>

      {isPending ? <ProfileFormSkeleton /> : null}

      {isError ? <QueryErrorView message={getErrorMessage(error)} onRetry={refetch} /> : null}

      {!isPending && !isError ? (
        <>
          <FormScreen
            contentContainerClassName="gap-8 px-5 pb-8 pt-10"
            footer={
              <Pressable
                disabled={!isDirty || updateProfileMutation.isPending}
                onPress={handleSubmit(onSubmit)}
                className="group items-center justify-center rounded-full bg-primary p-4 disabled:bg-muted"
              >
                <Text className="text-base text-primary-foreground group-disabled:text-muted-foreground">
                  {updateProfileMutation.isPending ? "Saving..." : "Save changes"}
                </Text>
              </Pressable>
            }
          >
            <View className="flex-row items-center gap-4">
              <Image
                source={getAvatarSource(avatarId)}
                style={{ width: 60, height: 60, borderRadius: 200 }}
              />

              <Pressable
                className="flex-row items-center gap-2 rounded-full border-[1.5px] border-muted bg-card px-3.5 py-2"
                onPress={() => avatarSheetRef.current?.present()}
              >
                <EditIcon size={16} />
                <Text className="text-sm text-foreground">Edit</Text>
              </Pressable>
            </View>

            <View className="gap-4">
              <FormInput
                control={control}
                name="name"
                label="Name"
                className="rounded-full border border-muted bg-transparent"
              />

              <FormInput
                control={control}
                name="email"
                label="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                editable={false}
                className="rounded-full border border-muted bg-transparent opacity-60"
              />

              <View className="gap-2">
                <Text className="font-urbanist-bold text-base text-foreground">Date of birth</Text>
                <Pressable
                  onPress={openDatePicker}
                  className="flex-row items-center rounded-full border border-muted px-3 py-4"
                >
                  <Text
                    className={cn("flex-1 text-sm", birthDate ? "text-foreground" : "text-muted-foreground")}
                  >
                    {formatDate(birthDate)}
                  </Text>
                </Pressable>
              </View>

              <View className="gap-2">
                <Text className="font-urbanist-bold text-base text-foreground">Gender</Text>
                <Pressable
                  onPress={() => genderSheetRef.current?.present()}
                  className="flex-row items-center justify-between rounded-full border border-muted px-3 py-4"
                >
                  <Text className={cn("text-sm", gender ? "text-foreground" : "text-muted-foreground")}>
                    {gender ? GENDER_LABELS[gender] : "Select"}
                  </Text>
                  <ArrowDownIcon size={20} />
                </Pressable>
              </View>

              {Platform.OS === "ios" && showIosDatePicker ? (
                <View className="items-center rounded-3xl bg-secondary">
                  <DateTimePicker
                    value={birthDate ? new Date(birthDate) : new Date(2000, 0, 1)}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date()}
                    onChange={(_event, date) => {
                      if (date) setValue("birthDate", date.toISOString(), { shouldDirty: true });
                    }}
                  />
                  <Pressable className="w-full items-center py-3" onPress={() => setShowIosDatePicker(false)}>
                    <Text className="font-urbanist-bold text-base text-primary">Done</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          </FormScreen>

          <AvatarPickerSheet
            sheetRef={avatarSheetRef}
            selectedAvatarId={avatarId}
            onSelect={(id) => setValue("avatarId", id, { shouldDirty: true })}
          />

          <GenderSelectSheet
            sheetRef={genderSheetRef}
            onSelect={(value) => setValue("gender", value, { shouldDirty: true })}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
}
