import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

type CustomerUser = Pick<
  KickzoneGraphqlTypes.User,
  'id' | 'name' | 'email' | 'role'
> & { lastName?: string | null };

interface AuthContextType {
  user: CustomerUser | null;
  login: (user: CustomerUser) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

const CustomersAuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      lastName
      email
      role
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const CustomersAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<CustomerUser | null>(null);

  // Check if user is already authenticated on mount
  const { data, loading } = useQuery<Pick<KickzoneGraphqlTypes.Query, 'me'>>(
    ME_QUERY,
    {
      fetchPolicy: 'network-only', // Always check with server
      errorPolicy: 'ignore', // Ignore errors if not authenticated
    }
  );

  const [logoutMutation] =
    useMutation<Pick<KickzoneGraphqlTypes.Mutation, 'logout'>>(LOGOUT_MUTATION);

  // Update user when query returns - only for CUSTOMER role users
  useEffect(() => {
    if (data?.me && data.me.role === KickzoneGraphqlTypes.UserRole.Customer) {
      setUser(data.me);
    } else {
      // Clear user if not a customer or not authenticated
      setUser(null);
    }
  }, [data]);

  const login = (user: CustomerUser) => {
    // Only allow login for CUSTOMER role users
    if (user.role === KickzoneGraphqlTypes.UserRole.Customer) {
      setUser(user);
      // Cart will be loaded automatically by useCartService when user logs in
    }
  };

  const logout = async () => {
    try {
      // Call server to clear cookies
      await logoutMutation();
    } catch {
      // Ignore logout errors - always clear local state
    } finally {
      // Always clear local user state
      setUser(null);
      // Cart will be cleared automatically by useCartService when user logs out
    }
  };

  return (
    <CustomersAuthContext.Provider value={{ user, login, logout, loading }}>
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
