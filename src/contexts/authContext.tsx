import { User } from "firebase/auth";
import { createContext, ReactNode } from "react";

interface IAuthContextProps {
  children: ReactNode;
  user: User | null;
}

interface IAuthContext {
  user: User | null;
}

const initialValue = {
  user: null
}

export const AuthContext = createContext<IAuthContext>(initialValue);

export function AuthProvider({ children, user }: IAuthContextProps) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}