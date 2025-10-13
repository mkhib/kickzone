import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      role
    }
  }
`;

export function useCustomersLogin() {
  const { login: setAuthUser } = useCustomersAuth();
  const [login, { loading: loginLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'login'>,
    KickzoneGraphqlTypes.MutationLoginArgs
  >(LOGIN_MUTATION);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await login({ variables: { email, password } });
      if (data?.login) {
        setAuthUser(data.login);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return {
    handleLogin,
    loginLoading,
  };
}
