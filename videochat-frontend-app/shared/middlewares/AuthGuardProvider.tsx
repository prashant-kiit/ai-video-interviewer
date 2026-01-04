import AuthGuard from "./AuthGuard";
import AuthRedirect from "./AuthRedirect";

export default function AuthGuardProvider({
  isProtected,
  route,
  children,
}: {
  isProtected: boolean;
  route: string
  children: React.ReactNode;
}) {
  if (!isProtected) return <AuthRedirect route={route}>{children}</AuthRedirect>;

  return <AuthGuard>{children}</AuthGuard>;
}
