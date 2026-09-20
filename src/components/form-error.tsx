import { cn } from "@/utils/cn";

import { Text } from "@/components/text";

type FormErrorProps = {
  message?: string | null;
  className?: string;
};

function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <Text variant="muted" className={cn("text-destructive", className)}>
      {message}
    </Text>
  );
}

export { FormError };
export type { FormErrorProps };
