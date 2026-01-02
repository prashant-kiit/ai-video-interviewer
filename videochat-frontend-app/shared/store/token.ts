export const useToken = () => {
  const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY as string;
  
  const getToken = () => {
    return localStorage.getItem(tokenKey) || "";
  };

  const storeToken = (newToken: string) => {
    localStorage.setItem(tokenKey, newToken);
  };

  const removeToken = () => {
    localStorage.removeItem(tokenKey);
  };

  return { getToken, storeToken, removeToken };
};
