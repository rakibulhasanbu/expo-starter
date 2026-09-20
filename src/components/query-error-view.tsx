import { cn } from "@/utils/cn";
import { View } from "react-native";

import { Button } from "@/components/button";
import { WarningIcon } from "@/components/icons/warning-icon";
import { Text } from "@/components/text";

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

type QueryErrorViewProps = {
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
  className?: string;
};

function QueryErrorView({ message, onRetry, compact, className }: QueryErrorViewProps) {
  if (compact) {
    return (
      <View className={cn("w-full flex-row items-center gap-3 rounded-3xl bg-card p-3", className)}>
        <WarningIcon size={22} />

        <Text className="flex-1 text-sm text-foreground" numberOfLines={2}>
          {message ?? DEFAULT_MESSAGE}
        </Text>

        {onRetry ? (
          <Button variant="outline" size="sm" onPress={onRetry} hitSlop={8}>
            <Text>Retry</Text>
          </Button>
        ) : null}
      </View>
    );
  }

  return (
    <View className={cn("flex-1 items-center justify-center gap-4 px-8", className)}>
      <View className="size-14 items-center justify-center rounded-full bg-destructive/10">
        <WarningIcon size={28} />
      </View>

      <Text className="text-center text-sm text-subtitle">{message ?? DEFAULT_MESSAGE}</Text>

      {onRetry ? (
        <Button variant="secondary" size="sm" onPress={onRetry} hitSlop={8}>
          <Text>Try again</Text>
        </Button>
      ) : null}
    </View>
  );
}

export { QueryErrorView };
export type { QueryErrorViewProps };
