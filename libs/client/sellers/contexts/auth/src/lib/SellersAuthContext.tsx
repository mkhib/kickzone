import { useMutation, useQuery } from '@apollo/client/react';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  ME_QUERY,
  LOGOUT_MUTATION,
  MY_SELLER_INFO_QUERY,
} from '@kickzone-workspace/sellers-graphql';

interface AuthContextType {
  user: KickzoneGraphqlTypes.User | null;
  sellerInfo: Pick<
    KickzoneGraphqlTypes.SellerInfo,
    'id' | 'storeName' | 'canManageCatalog' | 'isActive'
  > | null;
  canManageCatalog: boolean;
  sellerInfoLoading: boolean;
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

  const { loading, data, error } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'me'>
  >(ME_QUERY, {
    fetchPolicy: 'network-only',
  });

  const { data: sellerInfoData, loading: sellerInfoQueryLoading } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'mySellerInfo'>
  >(MY_SELLER_INFO_QUERY, {
    skip: !user || user.role !== KickzoneGraphqlTypes.UserRole.Seller,
    fetchPolicy: 'network-only',
  });

  const sellerInfo = sellerInfoData?.mySellerInfo ?? null;
  const sellerInfoLoading =
    !!user &&
    user.role === KickzoneGraphqlTypes.UserRole.Seller &&
    sellerInfoQueryLoading &&
    !sellerInfo;
  const canManageCatalog = sellerInfo?.canManageCatalog === true;

  const [logoutMutation] =
    useMutation<Pick<KickzoneGraphqlTypes.Mutation, 'logout'>>(LOGOUT_MUTATION);

  // Handle data changes - only for SELLER role users
  useEffect(() => {
    if (data?.me && data.me.role === KickzoneGraphqlTypes.UserRole.Seller) {
      setUser(data.me);
      localStorage.setItem('seller_user', JSON.stringify(data.me));
    } else if (error || (data?.me && data.me.role !== KickzoneGraphqlTypes.UserRole.Seller)) {
      setUser(null);
      localStorage.removeItem('seller_user');
    }
  }, [data, error]);

  const login = (user: KickzoneGraphqlTypes.User) => {
    // Only allow login for SELLER role users
    if (user.role === KickzoneGraphqlTypes.UserRole.Seller) {
      setUser(user);
      localStorage.setItem('seller_user', JSON.stringify(user));
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
      setUser(null);
      localStorage.removeItem('seller_user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <SellersAuthContext.Provider
      value={{
        user,
        sellerInfo,
        canManageCatalog,
        sellerInfoLoading,
        login,
        logout,
      }}
    >
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
