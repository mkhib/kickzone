import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@kickzone-workspace/entities';

interface AuthContextType {
  user: Pick<User, 'id' | 'name' | 'email' | 'role'> | null;
  login: (user: Pick<User, 'id' | 'name' | 'email' | 'role'>) => void;
  logout: () => void;
}

const AdminsAuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminsAuthProvider = ({ children }: { children: ReactNode }) => {
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
    <AdminsAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AdminsAuthContext.Provider>
  );
};

export const useAdminsAuth = () => {
  const context = useContext(AdminsAuthContext);
  if (!context) {
    throw new Error('useAdminsAuth must be used within an AdminsAuthProvider');
  }
  return context;
};
