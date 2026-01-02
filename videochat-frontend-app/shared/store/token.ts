import { atom, useAtom } from "jotai";

export const tokenAtom = atom<string | "">("");

export const useToken = () => {
  const [cachedToken, setCachedToken] = useAtom(tokenAtom);
  const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY as string;
  
  const getToken = () => {
    if(cachedToken) return cachedToken;
    const token = localStorage.getItem(tokenKey) || "";
    setCachedToken(token);
    return token;
  };

  const storeToken = (newToken: string) => {
    localStorage.setItem(tokenKey, newToken);
  };

  const removeToken = () => {
    localStorage.removeItem(tokenKey);
    setCachedToken("");
  };

  return { getToken, storeToken, removeToken };
};
