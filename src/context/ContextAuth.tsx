/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}

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
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
