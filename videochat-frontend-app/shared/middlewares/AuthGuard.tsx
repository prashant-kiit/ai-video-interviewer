"use client";

import { Loader } from "../components/Loader";
import { useRouter } from "next/navigation";
import { useAuth, AuthenticationState } from "../../shared/hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const redirectionOnUnauthenticated = () => {
    router.push("/onboarding");
  };
  const redirectionOnError = () => {
    router.push("/onboarding");
  };
  const { authenticationState } = useAuth(
    redirectionOnUnauthenticated,
    redirectionOnError,
  );

  const AuthenticationStateResponse: Record<
    AuthenticationState,
    React.ReactNode
  > = {
    [AuthenticationState.Loading]: <Loader />,
    [AuthenticationState.Authenticated]: children,
  };

  return <div>{AuthenticationStateResponse[authenticationState as AuthenticationState]}</div>;
}
