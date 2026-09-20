import { Pressable, Text } from "react-native";

import { queryClient } from "@/lib/query-client";
import { useAuthStore } from "@/store/auth-store";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    await useAuthStore.getState().signOut();
    queryClient.clear();
  };

  return (
    <Pressable onPress={handleSignOut} className="rounded-lg bg-destructive px-6 py-3">
      <Text className="text-center text-base font-medium text-destructive-foreground">Sign Out</Text>
    </Pressable>
  );
};
