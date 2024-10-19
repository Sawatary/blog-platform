/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { deleteCookie, getCookie, setCookie } from "../api/cookies";

export type User = {
  username: string;
  email: string;
  image: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setCookie("token", authToken, 7);
    setCookie("user", JSON.stringify(userData), 7);
  };

  const logout = () => {
    setUser(null);
    deleteCookie("token");
    deleteCookie("user");
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    setCookie("user", JSON.stringify(userData), 7);
  };

  useEffect(() => {
    const token = getCookie("token");
    const storedUser = getCookie("user");

    if (token && storedUser) {
      const userData: User = JSON.parse(storedUser);
      login(userData, token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
