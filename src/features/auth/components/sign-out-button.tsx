import { Pressable, Text } from "react-native";

import { useSignOutMutation } from "@/features/auth/hooks/use-auth-mutations";

export const SignOutButton = () => {
  const signOutMutation = useSignOutMutation();

  return (
    <Pressable
      onPress={() => signOutMutation.mutate()}
      className="rounded-lg bg-destructive px-6 py-3"
    >
      <Text className="text-center text-base font-medium text-destructive-foreground">Sign Out</Text>
    </Pressable>
  );
};
