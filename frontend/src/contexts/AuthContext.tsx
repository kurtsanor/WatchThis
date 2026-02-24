import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { findById } from "../api/userService";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

export const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setUser(undefined);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);

        const res = await findById(decoded.id);
        setUser(res.data);
      } catch (err) {
        setUser(undefined);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [token]);

  const value = {
    token,
    user,
    isLoading,
    setToken,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
