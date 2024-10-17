/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../api/cookies";
import { AuthContextType } from "../types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<string | null>(null);
  const isAuthenticated = !!user;

  const login = (username: string, _token: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
    deleteCookie("token");
  };

  useEffect(() => {
    const token = getCookie("token");
    const storedUsername = getCookie("username");
    if (token && storedUsername) {
      login(storedUsername, token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
