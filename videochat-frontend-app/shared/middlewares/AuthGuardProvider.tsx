import AuthGuard from "./AuthGuard";

export default function AuthGuardProvider({
  isProtected,
  suspense,
  children,
}: {
  isProtected: boolean;
  suspense: React.ReactNode;
  children: React.ReactNode;
}) {
  if (!isProtected) return <>{children}</>;

  return <AuthGuard suspense={suspense}>{children}</AuthGuard>;
}
