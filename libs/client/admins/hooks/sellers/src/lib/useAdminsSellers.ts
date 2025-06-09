import { useMutation, useQuery } from '@apollo/client';
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
  });

  const sellers = sellersData?.sellers || [];

  return {
    sellers,
    isLoadingSellers,
    sellersError,
    refetchSellers,
  };
};

export const useAdminsSellers = (
  filter: KickzoneGraphqlTypes.SellerFilterInput = { isActive: true }
) => {
  const { sellers, isLoadingSellers, sellersError, refetchSellers } =
    useAdminsSellersQuery(filter);

  const [createSeller] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createSeller'>,
    KickzoneGraphqlTypes.MutationCreateSellerArgs
  >(CREATE_SELLER, {
    onCompleted: () => {
      refetchSellers();
    },
  });

  const [updateSeller] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateSeller'>,
    KickzoneGraphqlTypes.MutationUpdateSellerArgs
  >(UPDATE_SELLER, {
    onCompleted: () => {
      refetchSellers();
    },
  });

  const [toggleSellerActive] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'toggleSellerActive'>,
    KickzoneGraphqlTypes.MutationToggleSellerActiveArgs
  >(TOGGLE_SELLER_ACTIVE, {
    onCompleted: () => {
      refetchSellers();
    },
  });

  return {
    sellers,
    loading: isLoadingSellers,
    error: sellersError,
    createSeller,
    updateSeller,
    toggleSellerActive,
    refetch: refetchSellers,
  };
};
