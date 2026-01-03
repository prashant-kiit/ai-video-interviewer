"use client";

import { useEffect, useState } from "react";
import { useToken } from "../../shared/store/token";
import { Loader } from "../components/Loader";
import { useRouter } from "next/navigation";

enum AuthenticationState {
  Loading,
  Authenticated,
  Unauthenticated,
  Error,
}

export default function AuthGuard({
  suspense,
  children,
}: {
  suspense: React.ReactNode;
  children: React.ReactNode;
}) {
  const [authenticationState, setAuthenticationState] =
    useState<AuthenticationState>(AuthenticationState.Loading);
  const { getToken } = useToken();
  const router = useRouter();

  const AuthenticationStateResponse: Record<
    AuthenticationState,
    React.ReactNode
  > = {
    [AuthenticationState.Loading]: <Loader />,
    [AuthenticationState.Authenticated]: children,
    [AuthenticationState.Unauthenticated]: suspense,
    [AuthenticationState.Error]: suspense,
  };

  useEffect(() => {
    (() => {
      try {
        const token = getToken();
        if (token) {
          setAuthenticationState(AuthenticationState.Authenticated);
        } else {
          // setAuthenticationState(AuthenticationState.Unauthenticated);
          router.push("/onboarding");
        }
      } catch (error) {
        console.error(error);
        setAuthenticationState(AuthenticationState.Error);
      }
    })();
  }, [getToken, router]);

  return <div>{AuthenticationStateResponse[authenticationState]}</div>;
}
