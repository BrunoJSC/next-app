/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

interface AuthProps {
  children: ReactNode;
}

// create context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
});

// create provider
export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user: any) => {
      setUser(user?.uid ? user : null);
      setIsLoading(false);
    });

    return subscriber;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
