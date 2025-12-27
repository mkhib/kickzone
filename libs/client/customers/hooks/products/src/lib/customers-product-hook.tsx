import { useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { GET_PRODUCTS_QUERY } from '@kickzone-workspace/customers-graphql';
import { useCategoriesQuery } from '@kickzone-workspace/categories-hook';
import { useColors } from '@kickzone-workspace/colors-hook';

export function useCustomersProducts({
  first = 12,
  after,
  filter,
}: {
  first?: number;
  after?: string;
  filter?: KickzoneGraphqlTypes.ProductFilterInput;
} = {}) {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'products'>,
    KickzoneGraphqlTypes.QueryProductsArgs
  >(GET_PRODUCTS_QUERY, {
    variables: { filter: { ...filter, first, after } },
    notifyOnNetworkStatusChange: true,
  });

  const loadMore = () => {
    if (
      data?.products?.pageInfo?.hasNextPage &&
      data.products.pageInfo.endCursor
    ) {
      return fetchMore({
        variables: {
          filter: { ...filter, first, after: data.products.pageInfo.endCursor },
        },
      });
    }
  };

  return {
    products: data?.products?.edges?.map((edge) => edge.node) || [],
    pageInfo: data?.products?.pageInfo,
    totalCount: data?.products?.totalCount || 0,
    loading,
    error,
    refetch,
    loadMore,
  };
}

export function useCustomersCategories() {
  const {
    categories,
    getCategoriesLoading,
    getCategoriesError,
    refetchCategories,
  } = useCategoriesQuery();

  return {
    categories,
    loading: getCategoriesLoading,
    error: getCategoriesError,
    refetch: refetchCategories,
  };
}

export function useCustomersColors() {
  const { colors, loading, error, refetchColors } = useColors();

  return {
    colors,
    loading,
    error,
    refetch: refetchColors,
  };
}
