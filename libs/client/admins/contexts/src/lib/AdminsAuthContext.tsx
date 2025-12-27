import { useMutation, useQuery } from '@apollo/client/react';
import { LOGOUT_MUTATION, ME_QUERY } from '@kickzone-workspace/admins-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

type AdminUser = Pick<
  KickzoneGraphqlTypes.User,
  'id' | 'name' | 'email' | 'role'
>;

interface AuthContextType {
  admin: AdminUser | null;
  setAdmin: (user: AdminUser | null) => void;
  logoutAdmin: () => void;
}

const AdminsAuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminsAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    const savedUser = localStorage.getItem('admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const { loading, data, error } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'me'>
  >(ME_QUERY, {
    fetchPolicy: 'network-only',
  });

  const [logoutMutation] =
    useMutation<Pick<KickzoneGraphqlTypes.Mutation, 'logout'>>(LOGOUT_MUTATION);

  // Handle data changes - only for ADMIN role users
  useEffect(() => {
    if (data?.me && data.me.role === KickzoneGraphqlTypes.UserRole.Admin) {
      setAdmin(data.me);
      localStorage.setItem('admin_user', JSON.stringify(data.me));
    } else if (error || (data?.me && data.me.role !== KickzoneGraphqlTypes.UserRole.Admin)) {
      setAdmin(null);
      localStorage.removeItem('admin_user');
    }
  }, [data, error]);

  const logoutAdmin = async () => {
    try {
      await logoutMutation();
      setAdmin(null);
      localStorage.removeItem('admin_user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AdminsAuthContext.Provider value={{ admin, setAdmin, logoutAdmin }}>
      {children}
    </AdminsAuthContext.Provider>
  );
};

export const useAdminsAuthContext = () => {
  const context = useContext(AdminsAuthContext);
  if (!context) {
    throw new Error('useAdminsAuth must be used within an AdminsAuthProvider');
  }
  return context;
};
