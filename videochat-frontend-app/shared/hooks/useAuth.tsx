"use client";

import { useEffect, useState } from "react";
import { useToken } from "../../shared/store/token";

export enum AuthenticationState {
  Loading,
  Authenticated,
} 

export function useAuth(
  redirectionOnUnauthenticated?: () => void,
  redirectionOnError?: () => void,
) {
  const [authenticationState, setAuthenticationState] =
    useState<AuthenticationState | string>(AuthenticationState.Loading);
  const { getToken } = useToken();

  useEffect(() => {
    (() => {
      try {
        const token = getToken();
        if (token) {
          setAuthenticationState(AuthenticationState.Authenticated);
        } else {
          if (redirectionOnUnauthenticated) {
            redirectionOnUnauthenticated();
          } else {
            setAuthenticationState("Unauthenticated");
          }
        }
      } catch (error) {
        console.error(error);
        if (redirectionOnError) redirectionOnError();
      }
    })();
  }, [getToken, redirectionOnUnauthenticated, redirectionOnError]);

  return {
    authenticationState,
    setAuthenticationState,
  };
}
