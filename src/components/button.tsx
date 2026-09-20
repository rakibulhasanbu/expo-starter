import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Link, type Href } from "expo-router";
import { ActivityIndicator, Platform, Pressable } from "react-native";

import { TextClassContext } from "@/components/text";

const buttonVariants = cva(
  cn(
    "group shrink-0 flex-row items-center justify-center gap-2 rounded-full shadow-none",
    Platform.select({
      web: "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-primary shadow-sm shadow-black/5 active:bg-primary/90 disabled:bg-muted",
          Platform.select({ web: "hover:bg-primary/90" })
        ),
        destructive: cn(
          "bg-destructive shadow-sm shadow-black/5 active:bg-destructive/90 dark:bg-destructive/60",
          Platform.select({
            web: "hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
          })
        ),
        outline: cn(
          "border border-border bg-background shadow-sm shadow-black/5 active:bg-accent dark:border-input dark:bg-input/30 dark:active:bg-input/50",
          Platform.select({
            web: "hover:bg-accent dark:hover:bg-input/50",
          })
        ),
        secondary: cn(
          "bg-secondary shadow-sm shadow-black/5 active:bg-secondary/80",
          Platform.select({ web: "hover:bg-secondary/80" })
        ),
        ghost: cn(
          "active:bg-accent dark:active:bg-accent/50",
          Platform.select({ web: "hover:bg-accent dark:hover:bg-accent/50" })
        ),
        link: "",
      },
      size: {
        default: cn("h-10 px-4 py-2 sm:h-9", Platform.select({ web: "has-[>svg]:px-3" })),
        sm: cn("h-9 gap-1.5 px-3 sm:h-8", Platform.select({ web: "has-[>svg]:px-2.5" })),
        lg: cn("h-11 px-6 sm:h-10", Platform.select({ web: "has-[>svg]:px-4" })),
        xl: "w-full px-4 py-4",
        icon: "h-10 w-10 sm:h-9 sm:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  cn(
    "font-urbanist-medium text-sm text-foreground",
    Platform.select({ web: "pointer-events-none transition-colors" })
  ),
  {
    variants: {
      variant: {
        default: "text-primary-foreground group-disabled:text-muted-foreground",
        destructive: "text-destructive-foreground",
        outline: cn(
          "group-active:text-accent-foreground",
          Platform.select({ web: "group-hover:text-accent-foreground" })
        ),
        secondary: "text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: cn(
          "text-primary group-active:underline",
          Platform.select({ web: "underline-offset-4 hover:underline group-hover:underline" })
        ),
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        xl: "text-base",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonIndicatorVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "",
      secondary: "",
      ghost: "",
      link: "text-primary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = Omit<React.ComponentProps<typeof Pressable>, "children"> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants> & { href?: Href; loading?: boolean; children?: React.ReactNode };

function Button({ className, variant, size, href, loading, disabled, children, ...props }: ButtonProps) {
  const isDisabled = Boolean(disabled) || Boolean(loading);

  const button = (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      role="button"
      disabled={isDisabled}
      {...props}
    >
      {loading ? <ActivityIndicator className={buttonIndicatorVariants({ variant })} /> : null}
      {children}
    </Pressable>
  );

  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      {href ? (
        <Link href={href} asChild>
          {button}
        </Link>
      ) : (
        button
      )}
    </TextClassContext.Provider>
  );
}

export { Button, buttonIndicatorVariants, buttonTextVariants, buttonVariants };
export type { ButtonProps };
