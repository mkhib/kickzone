import { createContext, useContext, useState, ReactNode } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

interface AuthContextType {
  user: KickzoneGraphqlTypes.User | null;
  login: (user: KickzoneGraphqlTypes.User) => void;
  logout: () => void;
}

const SellersAuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const SellersAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<KickzoneGraphqlTypes.User | null>(null);

  const login = (user: KickzoneGraphqlTypes.User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <SellersAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </SellersAuthContext.Provider>
  );
};

export const useSellersAuthContext = () => {
  const context = useContext(SellersAuthContext);
  if (!context) {
    throw new Error(
      'useSellersAuthContext must be used within an SellersAuthProvider'
    );
  }
  return context;
};
