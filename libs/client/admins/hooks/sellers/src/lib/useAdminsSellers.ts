import { useMutation, useQuery } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_SELLERS,
  CREATE_SELLER,
  UPDATE_SELLER,
  TOGGLE_SELLER_ACTIVE,
} from './adminsSellers.graphql';

type SellerEdge = {
  node: KickzoneGraphqlTypes.SellerInfo;
  cursor: string;
};

type SellerConnection = {
  edges: SellerEdge[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  totalCount: number;
};

export const useAdminsSellersQuery = (
  filter: KickzoneGraphqlTypes.SellerFilterInput = { isActive: true }
) => {
  const {
    data: sellersData,
    loading: isLoadingSellers,
    error: sellersError,
    refetch: refetchSellers,
  } = useQuery<
    { sellers: SellerConnection },
    KickzoneGraphqlTypes.QuerySellersArgs
  >(GET_SELLERS, {
    variables: { filter },
  });

  const sellers = sellersData?.sellers?.edges?.map((edge) => edge.node) || [];

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
  const [createSeller] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createSeller'>,
    KickzoneGraphqlTypes.MutationCreateSellerArgs
  >(CREATE_SELLER, {
    refetchQueries: [{ query: GET_SELLERS, variables: { filter } }],
  });

  const [updateSeller] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateSeller'>,
    KickzoneGraphqlTypes.MutationUpdateSellerArgs
  >(UPDATE_SELLER, {
    refetchQueries: [{ query: GET_SELLERS, variables: { filter } }],
  });

  const [toggleSellerActive] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'toggleSellerActive'>,
    KickzoneGraphqlTypes.MutationToggleSellerActiveArgs
  >(TOGGLE_SELLER_ACTIVE, {
    refetchQueries: [{ query: GET_SELLERS, variables: { filter } }],
  });

  return {
    createSeller,
    updateSeller,
    toggleSellerActive,
  };
};
