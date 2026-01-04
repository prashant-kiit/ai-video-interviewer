import AuthGuard from "./AuthGuard";

export default function AuthGuardProvider({
  isProtected,
  children,
}: {
  isProtected: boolean;
  children: React.ReactNode;
}) {
  if (!isProtected) return <>{children}</>;

  return <AuthGuard >{children}</AuthGuard>;
}
