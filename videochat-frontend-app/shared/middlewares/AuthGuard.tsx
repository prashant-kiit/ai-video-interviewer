"use client";

import { Loader } from "../components/Loader";
import { useRouter } from "next/navigation";
import { useAuth, AuthenticationState } from "../../shared/hooks/useAuth";

export default function AuthGuard({
  suspense,
  children,
}: {
  suspense: React.ReactNode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const redirection = () => {
    router.push("/onboarding");
  };
  const { authenticationState } = useAuth(redirection);

  const AuthenticationStateResponse: Record<
    AuthenticationState,
    React.ReactNode
  > = {
    [AuthenticationState.Loading]: <Loader />,
    [AuthenticationState.Authenticated]: children,
    [AuthenticationState.Unauthenticated]: suspense,
    [AuthenticationState.Error]: suspense,
  };

  return <div>{AuthenticationStateResponse[authenticationState]}</div>;
}
