import { useMutation } from '@apollo/client/react';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import {
  REGISTER_MUTATION,
  ADD_TO_CART_MUTATION,
} from '@kickzone-workspace/customers-graphql';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useCartItems } from '@kickzone-workspace/customer-cart-store';

export function useCustomersRegister() {
  const { login: setAuthUser } = useCustomersAuth();
  const cartItems = useCartItems();
  const [register, { loading: registerLoading }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'register'>,
    KickzoneGraphqlTypes.MutationRegisterArgs
  >(REGISTER_MUTATION);

  const [addToCartMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'addToCart'>,
    KickzoneGraphqlTypes.MutationAddToCartArgs
  >(ADD_TO_CART_MUTATION);

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    const { data } = await register({
      variables: { name, email, password },
    });

    if (data?.register) {
      // Set the authenticated user
      setAuthUser(data.register);

      // Sync local cart items to server after registration
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
          // Don't throw error here - allow registration to succeed even if cart sync fails
        }
      }
    }

    return data?.register;
  };

  return {
    handleRegister,
    registerLoading,
  };
}
