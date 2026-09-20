import { Link, type Href, type LinkProps } from "expo-router";

import { AuthStatus, useAuthStore } from "@/store/auth-store";

type ProtectedLinkProps = Omit<LinkProps, "href"> & { href: string };

export const ProtectedLink = ({ href, ...props }: ProtectedLinkProps) => {
  const status = useAuthStore((state) => state.status);

  const target: Href =
    status === AuthStatus.Authenticated
      ? (href as Href)
      : ({ pathname: "/sign-in", params: { redirect: href } } as Href);

  return <Link href={target} {...props} />;
};
