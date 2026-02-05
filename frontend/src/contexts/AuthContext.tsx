import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types/user";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { findById } from "../api/userService";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
}

export const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    const decoded = jwtDecode<CustomJwtPayload>(token);
    console.log(decoded);
    findById(decoded.id).then((res) => setUser(res.data));
    setIsLoading(false);
  }, [token]);

  const value = {
    user,
    isLoading,
    setToken,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
