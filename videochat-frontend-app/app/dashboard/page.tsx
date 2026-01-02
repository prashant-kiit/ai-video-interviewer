"use client"

import Header from "../../shared/components/Header";
import { useAtom } from "jotai";
import { tokenAtom } from "../../shared/store/tokenAtom";

export default function DashboardPage() {
  const [token, ] = useAtom(tokenAtom)
  return (
    <div>
      <Header title="Dashboard" size={2} />
      Token: {token}
    </div>
  );
}
