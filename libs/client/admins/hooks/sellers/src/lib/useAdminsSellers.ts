import { useMutation, useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_SELLERS,
  CREATE_SELLER,
  UPDATE_SELLER,
  TOGGLE_SELLER_ACTIVE,
} from './adminsSellers.graphql';

export const useAdminsSellersQuery = (
  filter: KickzoneGraphqlTypes.SellerFilterInput = { isActive: true }
) => {
  const {
    data: sellersData,
    loading: isLoadingSellers,
    error: sellersError,
    refetch: refetchSellers,
  } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'sellers'>,
    KickzoneGraphqlTypes.QuerySellersArgs
  >(GET_SELLERS, {
    variables: { filter },
    fetchPolicy: 'cache-and-network', // Always fetch fresh data
    errorPolicy: 'all', // Return both data and errors
    notifyOnNetworkStatusChange: true, // Notify on loading state changes
  });

  return {
    sellers: sellersData?.sellers,
    isLoadingSellers,
    sellersError,
    refetchSellers,
  };
};

export const useAdminsSellers = (
  filter: KickzoneGraphqlTypes.SellerFilterInput = { isActive: true }
) => {
  const [createSeller] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createSeller'>,
    KickzoneGraphqlTypes.MutationCreateSellerArgs
  >(CREATE_SELLER, {
    refetchQueries: [
      {
        query: GET_SELLERS,
        variables: { filter: { isActive: filter.isActive } },
      },
    ],
  });

  const [updateSeller] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateSeller'>,
    KickzoneGraphqlTypes.MutationUpdateSellerArgs
  >(UPDATE_SELLER, {
    refetchQueries: [
      {
        query: GET_SELLERS,
        variables: { filter: { isActive: filter.isActive } },
      },
    ],
  });

  const [toggleSellerActive] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'toggleSellerActive'>,
    KickzoneGraphqlTypes.MutationToggleSellerActiveArgs
  >(TOGGLE_SELLER_ACTIVE, {
    refetchQueries: [
      {
        query: GET_SELLERS,
        variables: { filter: { isActive: filter.isActive } },
      },
    ],
  });

  return {
    createSeller,
    updateSeller,
    toggleSellerActive,
  };
};
