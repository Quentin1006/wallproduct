import { createContext, useContext, useEffect, useState } from "react";

export type AuthState = {
  accessToken?: string;
  id?: number;
};

export const AuthContext = createContext({} as AuthState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("access_token")) {
      const accessToken = url.searchParams.get("access_token");
      const id = url.searchParams.get("id");

      setAuth({
        accessToken,
        id,
      });
    }
  }, []);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
