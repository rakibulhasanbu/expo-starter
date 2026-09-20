import type { ComponentProps, ComponentType } from "react";

import { BlurView } from "expo-blur";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { CardIcon } from "@/components/icons/card-icon";
import { HomeIcon } from "@/components/icons/home-icon";
import { SettingIcon } from "@/components/icons/setting-icon";
import { TransactionMinusIcon } from "@/components/icons/transaction-minus-icon";
import { PressableScale } from "@/components/pressable-scale";
import { Text } from "@/components/text";

const HAS_LIQUID_GLASS = isLiquidGlassAvailable();

type TabConfig = {
  name: string;
  label: string;
  Icon: ComponentType<{ size?: number; color?: string; filled?: boolean }>;
};

/** Drives both the order and the contents of the bar, so neither depends on the navigator. */
const TABS: TabConfig[] = [
  { name: "home", label: "Home", Icon: HomeIcon },
  { name: "card", label: "Card", Icon: CardIcon },
  { name: "transactions", label: "Transactions", Icon: TransactionMinusIcon },
  { name: "settings", label: "Settings", Icon: SettingIcon },
];

/** expo-router names a `home/index.tsx` route "home/index"; a flat `home.tsx` would be "home". */
function normalizeRouteName(name: string) {
  return name.replace(/\/index$/, "");
}

type TabBarRenderer = NonNullable<ComponentProps<typeof Tabs>["tabBar"]>;
type CustomTabBarProps = Parameters<TabBarRenderer>[0];

function CustomTabBar({ state, navigation }: CustomTabBarProps) {
  return (
    <View className="absolute inset-x-5 bottom-[30px] overflow-hidden rounded-full">
      {HAS_LIQUID_GLASS ? (
        <GlassView
          glassEffectStyle="regular"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
      ) : (
        <>
          <BlurView
            intensity={100}
            tint="light"
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <View className="absolute inset-0 bg-muted/60 dark:bg-muted" />
        </>
      )}
      <View className="flex-row items-center justify-between px-5 py-3.5">
        {TABS.map(({ name, label, Icon }) => {
          const index = state.routes.findIndex((route) => normalizeRouteName(route.name) === name);

          if (index === -1) {
            if (__DEV__) {
              console.warn(
                `[TabBar] no route matched tab "${name}"`,
                state.routes.map((route) => route.name)
              );
            }
            return null;
          }

          const route = state.routes[index];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isFocused) {
            return (
              <PressableScale
                key={route.key}
                onPress={onPress}
                className="flex-row items-center gap-2 rounded-full bg-card px-4 py-3"
              >
                <Icon size={20} filled />
                <Text className="text-sm text-primary">{label}</Text>
              </PressableScale>
            );
          }

          return (
            <PressableScale
              key={route.key}
              onPress={onPress}
              hitSlop={12}
              className="size-5 items-center justify-center px-5"
            >
              <Icon size={20} />
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="card" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
