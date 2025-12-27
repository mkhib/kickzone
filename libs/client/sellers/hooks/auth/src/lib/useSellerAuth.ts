import { useMutation } from '@apollo/client/react';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { useNavigate } from 'react-router-dom';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  SETUP_PASSWORD_MUTATION,
} from './sellerAuth.graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

interface LoginInput {
  email: string;
  password: string;
}

export const useSellerLogin = () => {
  const { login } = useSellersAuthContext();
  const navigate = useNavigate();

  const [
    loginMutation,
    { loading: sellersLoginLoading, error: sellersLoginError },
  ] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'login'>,
    KickzoneGraphqlTypes.MutationLoginArgs
  >(LOGIN_MUTATION);

  const loginSeller = async (input: LoginInput) => {
    try {
      const result = await loginMutation({
        variables: { email: input.email, password: input.password },
      });
      if (result.data?.login && result.data.login.role === KickzoneGraphqlTypes.UserRole.Seller) {
        login(result.data.login);
        localStorage.setItem('seller_user', JSON.stringify(result.data.login));
        navigate('/products');
      } else if (result.data?.login && result.data.login.role !== KickzoneGraphqlTypes.UserRole.Seller) {
        console.error('Login failed: User does not have seller privileges');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const [logoutSeller] =
    useMutation<Pick<KickzoneGraphqlTypes.Mutation, 'logout'>>(LOGOUT_MUTATION);

  return {
    loginSeller,
    sellersLoginLoading,
    sellersLoginError,
    logoutSeller,
  };
};

export const useSetupPassword = () => {
  const navigate = useNavigate();

  const [
    setupPasswordMutation,
    { loading: setupPasswordLoading, error: setupPasswordError },
  ] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'setupPassword'>,
    KickzoneGraphqlTypes.MutationSetupPasswordArgs
  >(SETUP_PASSWORD_MUTATION);

  const setupPassword = async (token: string, newPassword: string) => {
    try {
      await setupPasswordMutation({
        variables: { token, newPassword },
      });
      navigate('/login');
    } catch (error) {
      console.error('Setup password failed:', error);
    }
  };

  return {
    setupPassword,
    setupPasswordLoading,
    setupPasswordError,
  };
};
