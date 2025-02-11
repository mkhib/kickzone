import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@kickzone-workspace/entities';

interface AuthContextType {
  user: Pick<User, 'id' | 'name' | 'email' | 'role'> | null;
  login: (user: Pick<User, 'id' | 'name' | 'email' | 'role'>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
