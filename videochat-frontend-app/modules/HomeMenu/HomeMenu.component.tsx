"use client";

import SignUpLink from "../../modules/SignUp/SignUp.interface";
import SignInLink from "../../modules/SignIn/SignIn.interface";
import { useToken } from "../../shared/store/token";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { getToken } = useToken();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        <div>Dashboard</div>
      ) : (
        <div>
          <SignUpLink />
          <SignInLink />
        </div>
      )}
    </div>
  );
}
