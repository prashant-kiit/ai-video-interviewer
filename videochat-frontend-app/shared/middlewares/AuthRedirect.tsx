"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "../components/Loader";
import { useAuth, AuthenticationState } from "../hooks/useAuth";

export default function AuthRedirect({
  route,
  children,
}: {
  route: string;
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { authenticationState } = useAuth();

  useEffect(() => {
    (() => {
      try {
        setIsLoading(true);
        if (
          authenticationState === AuthenticationState.Authenticated &&
          route !== "/notfound"
        ) {
          router.replace("/");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [route, router, authenticationState]);

  if (isLoading) return <Loader />;

  if (route === "/notfound") return <>{children}</>;

  if (authenticationState === "Unauthenticated") {
    return children;
  }

  return <Loader />;
}
