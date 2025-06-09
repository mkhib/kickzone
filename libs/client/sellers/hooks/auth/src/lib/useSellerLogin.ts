import { useMutation } from '@apollo/client';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
} from '@kickzone-workspace/sellers-graphql';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { User } from '@kickzone-workspace/entities';
import { useNavigate } from 'react-router-dom';

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
  ] = useMutation<{ login: User }>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.login);
      localStorage.setItem('seller_user', JSON.stringify(data.login));
      navigate('/products');
    },
  });

  const loginSeller = (input: LoginInput) => {
    loginMutation({
      variables: { email: input.email, password: input.password },
    });
  };

  const [logoutSeller] = useMutation(LOGOUT_MUTATION, {
    onError: (error) => {
      console.error('Logout failed:', error.message);
    },
  });

  return {
    loginSeller,
    sellersLoginLoading,
    sellersLoginError,
    logoutSeller,
  };
};
