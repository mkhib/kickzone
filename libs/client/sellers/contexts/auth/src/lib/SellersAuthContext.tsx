import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@kickzone-workspace/entities';

interface AuthContextType {
  user: Pick<User, 'id' | 'name' | 'email' | 'role'> | null;
  login: (user: Pick<User, 'id' | 'name' | 'email' | 'role'>) => void;
  logout: () => void;
}

const SellersAuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const SellersAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Pick<
    User,
    'id' | 'name' | 'email' | 'role'
  > | null>(null);

  const login = (user: Pick<User, 'id' | 'name' | 'email' | 'role'>) => {
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

export const useSellersAuth = () => {
  const context = useContext(SellersAuthContext);
  if (!context) {
    throw new Error(
      'useSellersAuth must be used within an SellersAuthProvider'
    );
  }
  return context;
};
