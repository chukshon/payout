import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  authToken: string | null;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authToken = localStorage.getItem("auth");
  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
