import { useMutation } from '@apollo/client';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
} from '@kickzone-workspace/admins-graphql';
import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import { User } from '@kickzone-workspace/entities';

interface LoginInput {
  email: string;
  password: string;
}

export const useAdminLogin = () => {
  const { setAdmin } = useAdminsAuthContext();

  const [login, { loading: adminsLoginLoading, error: adminsLoginError }] =
    useMutation<{
      login: User;
    }>(LOGIN_MUTATION, {
      onCompleted: (data) => {
        setAdmin(data.login);
      },
      onError: (error) => {
        console.error('Login failed:', error.message);
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
