"use client";

import { useToken } from "../store/token";
import ClientButton from "./ClientButton";
import { Loader } from "./Loader";
import { useAuth, AuthenticationState } from "../hooks/useAuth";

export default function Logout() {
  const { authenticationState } = useAuth();
  const { removeToken } = useToken();

  const handleLogout = () => {
    removeToken();
  };

  const AuthenticationStateResponse: Record<
    AuthenticationState | "Unauthenticated",
    React.ReactNode
  > = {
    [AuthenticationState.Loading]: <Loader />,
    [AuthenticationState.Authenticated]: (
      <ClientButton name="Log out" handler={handleLogout} />
    ),
    "Unauthenticated": <></>,
  };

  return <div>{AuthenticationStateResponse[authenticationState as AuthenticationState]}</div>;
}
