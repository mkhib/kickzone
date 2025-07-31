import { useMutation, useQuery } from '@apollo/client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { ME_QUERY, LOGOUT_MUTATION } from '@kickzone-workspace/sellers-graphql';

interface AuthContextType {
  user: KickzoneGraphqlTypes.User | null;
  login: (user: KickzoneGraphqlTypes.User) => void;
  logout: () => void;
}

const SellersAuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const SellersAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<KickzoneGraphqlTypes.User | null>(() => {
    const savedUser = localStorage.getItem('seller_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const { loading } = useQuery<{ me: KickzoneGraphqlTypes.User }>(ME_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.me) {
        setUser(data.me);
        localStorage.setItem('seller_user', JSON.stringify(data.me));
      } else {
        localStorage.removeItem('seller_user');
      }
    },
    onError: () => {
      setUser(null);
      localStorage.removeItem('seller_user');
    },
  });

  const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      setUser(null);
      localStorage.removeItem('seller_user');
    },
  });

  const login = (user: KickzoneGraphqlTypes.User) => {
    setUser(user);
    localStorage.setItem('seller_user', JSON.stringify(user));
  };

  const logout = () => {
    logoutMutation();
  };

  if (loading) return <div>Loading...</div>;

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
