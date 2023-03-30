import { createContext, useContext, useMemo, useState } from "react";

// Hooks
import { useRouter } from "next/router";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Hooks
  const [user, setUser] = useLocalStorage("user", null);
  const router = useRouter();
  const [userLoading, setUserLoading] = useState(true);

  const login = async (data, forwardPath) => {
    setUser(data);
    setUserLoading(false);
    if (forwardPath) {
      router.push(forwardPath);
      return;
    }
    router.replace(router.asPath)
  };

  const logout = () => {
    router.push("/");
    setUser(null);
  };

  const value = useMemo(
    () => ({
        user,
        setUser,
        login,
        logout,
        userLoading,
        setUserLoading
    }),
    [user, userLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
