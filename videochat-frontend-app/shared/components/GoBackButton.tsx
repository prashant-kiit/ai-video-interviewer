"use client";

import { useRouter } from "next/navigation";
import ClientButton from "./ClientButton";

export const GoBackButton = ({
  name = "Go Back",
  path,
}: {
  name?: string;
  path: string;
}) => {
  const router = useRouter();
  return (
    <ClientButton
      name={name}
      handler={() => {
        router.push(path);
      }}
    />
  );
};
