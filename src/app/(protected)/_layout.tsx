import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProtectedLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
    </>
  );
}
