import { useMutation } from '@apollo/client';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
} from '@kickzone-workspace/admins-graphql';
import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import { User } from '@kickzone-workspace/entities';
import { useNavigate } from 'react-router-dom';

interface LoginInput {
  email: string;
  password: string;
}

export const useAdminLogin = () => {
  const { setAdmin } = useAdminsAuthContext();
  const navigate = useNavigate();

  const [login, { loading: adminsLoginLoading, error: adminsLoginError }] =
    useMutation<{
      login: User;
    }>(LOGIN_MUTATION, {
      onCompleted: (data) => {
        setAdmin(data.login);
        localStorage.setItem('admin_user', JSON.stringify(data.login));
        navigate('/products');
      },
    });

  const loginAdmin = (input: LoginInput) => {
    login({ variables: { email: input.email, password: input.password } });
  };

  const [logoutAdmin] = useMutation(LOGOUT_MUTATION, {
    onError: (error) => {
      console.error('Logout failed:', error.message);
    },
  });

  return {
    loginAdmin,
    adminsLoginLoading,
    adminsLoginError,
    logoutAdmin,
  };
};
