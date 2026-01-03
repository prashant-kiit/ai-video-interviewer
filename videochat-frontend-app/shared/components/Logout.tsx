"use client";

import { useEffect, useState } from "react";
import { useToken } from "../store/token";
import ClientButton from "./ClientButton";
import { Loader } from "./Loader";

enum AuthenticationState {
  Loading,
  Authenticated,
  Unauthenticated,
  Error,
}

export default function Logout() {
  const [authenticationState, setAuthenticationState] = useState(
    AuthenticationState.Loading,
  );
  const { getToken, removeToken } = useToken();

  const handleLogout = () => {
    removeToken();
  };

  const AuthenticationStateResponse: Record<
    AuthenticationState,
    React.ReactNode
  > = {
    [AuthenticationState.Loading]: <Loader />,
    [AuthenticationState.Authenticated]: (
      <ClientButton name="Log out" handler={handleLogout} />
    ),
    [AuthenticationState.Unauthenticated]: <></>,
    [AuthenticationState.Error]: <></>,
  };

  useEffect(() => {
    (() => {
      try {
        const token = getToken();
        if (token) {
          setAuthenticationState(AuthenticationState.Authenticated);
        } else {
          setAuthenticationState(AuthenticationState.Unauthenticated);
        }
      } catch (error) {
        console.error(error);
        setAuthenticationState(AuthenticationState.Error);
      }
    })();
  }, [getToken]);

  return <div>{AuthenticationStateResponse[authenticationState]}</div>;
}
