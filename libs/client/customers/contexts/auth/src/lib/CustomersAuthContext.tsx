import { createContext, useContext, useState, ReactNode } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

type CustomerUser = Pick<
  KickzoneGraphqlTypes.User,
  'id' | 'name' | 'email' | 'role'
>;

interface AuthContextType {
  user: CustomerUser | null;
  login: (user: CustomerUser) => void;
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
  const [user, setUser] = useState<CustomerUser | null>(null);

  const login = (user: CustomerUser) => {
    setUser(user);
    // Cart will be loaded automatically by useCartService when user logs in
  };

  const logout = () => {
    setUser(null);
    // Cart will be cleared automatically by useCartService when user logs out
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
    throw new Error(
      'useCustomersAuth must be used within an CustomersAuthProvider'
    );
  }
  return context;
};
