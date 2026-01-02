"use client";

import { usePathname } from "next/navigation";
import { Routes } from "./Route";
import AuthGuard from "./AuthGuard";
import Header from "../components/Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const isProtected = Routes[pathname]?.isProtected;
  const headerTitle = Routes[pathname]?.header;
  const headerSize = Routes[pathname]?.headerSize;

  console.log("pathname", pathname, isProtected);

  return (
    <main>
      <Header title={headerTitle} size={headerSize} />
      {isProtected ? <AuthGuard>{children}</AuthGuard> : <>{children}</>}
    </main>
  );
}
