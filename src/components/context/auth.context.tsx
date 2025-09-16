import React, { createContext, useState } from "react";

interface User {
  username: string;
  email: string;
  role: string;
}

interface Auth {
  isAuthenticated: boolean;
  user: User;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>; //setAuth là một hàm, mà tham số nó nhận vào có kiểu SetStateAction<Auth>.

  appLoading: boolean;
  setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({
    isAuthenticated: false,
    user: {
      username: "",
      email: "",
      role: "",
    },
  });

  const [appLoading, setAppLoading] = useState<boolean>(true);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        appLoading,
        setAppLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
