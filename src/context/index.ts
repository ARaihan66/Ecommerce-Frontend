import { createContext } from "react";

interface currentUserContextType {
  fetchUserData: Promise<void>;
}

export const currentUserContext = createContext<currentUserContextType | null>(
  null
);
