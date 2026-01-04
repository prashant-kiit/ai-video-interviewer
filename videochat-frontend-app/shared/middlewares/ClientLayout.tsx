"use client";

import { usePathname } from "next/navigation";
import { Routes } from "./Route";
import Header from "../components/Header";
import Onboarding from "../../modules/Onboarding/Onboarding.component";
import AuthGuardProvider from "./AuthGuardProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const route = Routes[pathname] || Routes["/notfound"];
  const isProtected = route.isProtected;
  const subHeader = route.subHeader;
  const headerSize = route.headerSize;

  return (
    <AuthGuardProvider isProtected={isProtected}>
      <main>
        <Header title={subHeader} size={headerSize} />
        {children}
      </main>
    </AuthGuardProvider>
  );
}
