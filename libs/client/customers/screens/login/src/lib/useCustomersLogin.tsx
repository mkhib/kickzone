import { gql, useMutation } from '@apollo/client';
import { User } from '@kickzone-workspace/entities';
import { useAuth } from '@kickzone-workspace/customers-auth-context';

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

interface LoginResponse {
  login: Pick<User, 'id' | 'name' | 'email' | 'role'>;
}

interface LoginVariables {
  email: string;
  password: string;
}

export function useCustomersLogin() {
  const { login: setAuthUser } = useAuth();
  const [login, { loading: loginLoading }] = useMutation<
    LoginResponse,
    LoginVariables
  >(LOGIN_MUTATION);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await login({ variables: { email, password } });
      if (data) {
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
