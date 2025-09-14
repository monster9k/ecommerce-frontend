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

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
