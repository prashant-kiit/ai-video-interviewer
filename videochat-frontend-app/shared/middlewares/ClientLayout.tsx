"use client";

import { usePathname } from "next/navigation";
import { Routes, NotFoundRoute } from "./Route";
import Header from "../components/Header";
import AuthGuardProvider from "./AuthGuardProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  let finalRoute = NotFoundRoute;

  for (const route of Routes) {
    if (route.routeRegex.test(pathname)) {
      finalRoute = route;
      break;
    }
  }

  const isProtected = finalRoute.isProtected;
  const subHeader = finalRoute.subHeader;
  const headerSize = finalRoute.headerSize;

  return (
    <AuthGuardProvider isProtected={isProtected} route={finalRoute.route}>
      <main>
        <Header title={subHeader} size={headerSize} />
        {children}
      </main>
    </AuthGuardProvider>
  );
}
