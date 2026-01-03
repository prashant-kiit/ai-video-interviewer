"use client";

import { useEffect, useState } from "react";
import { useToken } from "../../shared/store/token";

export enum AuthenticationState {
  Loading,
  Authenticated,
  Unauthenticated,
  Error,
}

export function useAuth(redirection?: () => void) {
  const [authenticationState, setAuthenticationState] =
    useState<AuthenticationState>(AuthenticationState.Loading);
  const { getToken } = useToken();

  useEffect(() => {
    (() => {
      try {
        const token = getToken();
        if (token) {
          setAuthenticationState(AuthenticationState.Authenticated);
        } else {
          if (redirection) {
            redirection();
          } else {
            setAuthenticationState(AuthenticationState.Unauthenticated);
          }
        }
      } catch (error) {
        console.error(error);
        setAuthenticationState(AuthenticationState.Error);
      }
    })();
  }, [getToken, redirection]);

  return {
    authenticationState,
    setAuthenticationState,
  };
}
