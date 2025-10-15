import { useMutation } from '@apollo/client/react';
import { FORGOT_PASSWORD_MUTATION } from '@kickzone-workspace/customers-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

export function useCustomersForgotPassword() {
  const [forgotPassword, { loading: forgotPasswordLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'forgotPassword'>,
    KickzoneGraphqlTypes.MutationForgotPasswordArgs
  >(FORGOT_PASSWORD_MUTATION);

  const handleForgotPassword = async (email: string, baseUrl: string) => {
    const { data } = await forgotPassword({
      variables: { email, baseUrl },
    });

    return data?.forgotPassword;
  };

  return {
    handleForgotPassword,
    forgotPasswordLoading,
  };
}
