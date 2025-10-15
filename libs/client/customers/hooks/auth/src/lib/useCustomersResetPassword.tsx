import { useMutation } from '@apollo/client/react';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { RESET_PASSWORD_MUTATION } from '@kickzone-workspace/customers-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

export function useCustomersResetPassword() {
  const { login: setAuthUser } = useCustomersAuth();
  const [resetPassword, { loading: resetPasswordLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'resetPassword'>,
    KickzoneGraphqlTypes.MutationResetPasswordArgs
  >(RESET_PASSWORD_MUTATION);

  const handleResetPassword = async (token: string, newPassword: string) => {
    const { data } = await resetPassword({
      variables: { token, newPassword },
    });

    if (data?.resetPassword) {
      setAuthUser(data.resetPassword);
    }

    return data?.resetPassword;
  };

  return {
    handleResetPassword,
    resetPasswordLoading,
  };
}
