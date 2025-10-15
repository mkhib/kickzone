import { useMutation } from '@apollo/client/react';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { REGISTER_MUTATION } from '@kickzone-workspace/customers-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

export function useCustomersRegister() {
  const { login: setAuthUser } = useCustomersAuth();
  const [register, { loading: registerLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'register'>,
    KickzoneGraphqlTypes.MutationRegisterArgs
  >(REGISTER_MUTATION);

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    const { data } = await register({
      variables: { name, email, password },
    });

    if (data?.register) {
      setAuthUser(data.register);
    }

    return data?.register;
  };

  return {
    handleRegister,
    registerLoading,
  };
}
