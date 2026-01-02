"use client";

import { useEffect, useState } from "react";
import SignUpLink from "../../modules/SignUp/SignUp.interface";
import SignInLink from "../../modules/SignIn/SignIn.interface";
import { useToken } from "../../shared/store/token";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getToken } = useToken();

  useEffect(() => {
    (() => {
      try {
        setIsLoading(true);
        const token = getToken();
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getToken]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isAuthenticated ? (
        children
      ) : (
        <div>
          <SignUpLink />
          <SignInLink />
        </div>
      )}
    </div>
  );
}
