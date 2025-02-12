import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@kickzone-workspace/entities';

interface AuthContextType {
  user: Pick<User, 'id' | 'name' | 'email' | 'role'> | null;
  login: (user: Pick<User, 'id' | 'name' | 'email' | 'role'>) => void;
  logout: () => void;
}

const CustomersAuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const CustomersAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
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
    <CustomersAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </CustomersAuthContext.Provider>
  );
};

export const useCustomersAuth = () => {
  const context = useContext(CustomersAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
