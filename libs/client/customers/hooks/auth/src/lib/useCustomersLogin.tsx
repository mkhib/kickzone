import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useCartItems } from '@kickzone-workspace/customer-cart-store';
import { ADD_TO_CART_MUTATION } from '@kickzone-workspace/customers-graphql';

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
  const cartItems = useCartItems();
  const [login, { loading: loginLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'login'>,
    KickzoneGraphqlTypes.MutationLoginArgs
  >(LOGIN_MUTATION);

  const [addToCartMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'addToCart'>,
    KickzoneGraphqlTypes.MutationAddToCartArgs
  >(ADD_TO_CART_MUTATION);

  const handleLogin = async (email: string, password: string) => {
    const { data } = await login({ variables: { email, password } });

    if (data?.login) {
      // Set the authenticated user
      setAuthUser(data.login);

      // Sync local cart items to server after login
      if (cartItems.length > 0) {
        try {
          // Add each local cart item to the server cart (only send sellerProductId & quantity)
          for (const item of cartItems) {
            await addToCartMutation({
              variables: {
                addToCartInput: {
                  sellerProductId: item.sellerProductId,
                  quantity: item.quantity,
                },
              },
            });
          }
        } catch {
          // Don't throw error here - allow login to succeed even if cart sync fails
        }
      }
    } else {
      throw new Error('Login failed: No user data returned');
    }
  };

  return {
    handleLogin,
    loginLoading,
  };
}
