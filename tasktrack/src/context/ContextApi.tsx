import { createContext, useContext, useState, ReactNode } from "react";

interface UserDetails {
  name: string,
  password:string
}

interface AppContextType {
  userDetails: UserDetails;
  setUserDetails: (userDetails: UserDetails) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({ name: "",password:"" });

  return (
    <AppContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("context outside the provider function");
  }
  return context;
};
