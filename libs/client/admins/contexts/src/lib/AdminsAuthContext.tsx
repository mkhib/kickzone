import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { User } from '@kickzone-workspace/entities';
import { ME_QUERY, LOGOUT_MUTATION } from '@kickzone-workspace/admins-graphql';

type AdminUser = Pick<User, 'id' | 'name' | 'email' | 'role'>;

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

  const { data, loading } = useQuery<{ me: AdminUser }>(ME_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data?.me) {
        setAdmin(data.me);
        localStorage.setItem('admin_user', JSON.stringify(data.me));
      } else {
        localStorage.removeItem('admin_user');
      }
    },
    onError: () => {
      setAdmin(null);
      localStorage.removeItem('admin_user');
    },
  });

  const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
    onCompleted: () => {
      setAdmin(null);
      localStorage.removeItem('admin_user');
    },
  });

  const logoutAdmin = () => {
    logoutMutation();
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
