import { atom } from "jotai";
import { useAtom } from "jotai";

const tokenAtom = atom<string>("");

export const useToken = () => {
  const [token, setToken] = useAtom(tokenAtom);

  return { token, setToken };
};
