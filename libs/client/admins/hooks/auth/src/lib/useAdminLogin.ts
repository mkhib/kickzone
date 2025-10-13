import { useMutation } from '@apollo/client/react';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
} from '@kickzone-workspace/admins-graphql';
import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import { useNavigate } from 'react-router-dom';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

interface LoginInput {
  email: string;
  password: string;
}

export const useAdminLogin = () => {
  const { setAdmin } = useAdminsAuthContext();
  const navigate = useNavigate();

  const [login, { loading: adminsLoginLoading, error: adminsLoginError }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'login'>,
      KickzoneGraphqlTypes.MutationLoginArgs
    >(LOGIN_MUTATION);

  const loginAdmin = async (input: LoginInput) => {
    try {
      const result = await login({
        variables: { email: input.email, password: input.password },
      });
      if (result.data?.login) {
        setAdmin(result.data.login);
        localStorage.setItem('admin_user', JSON.stringify(result.data.login));
        navigate('/products');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const [logoutAdmin] =
    useMutation<Pick<KickzoneGraphqlTypes.Mutation, 'logout'>>(LOGOUT_MUTATION);

  return {
    loginAdmin,
    adminsLoginLoading,
    adminsLoginError,
    logoutAdmin,
  };
};
