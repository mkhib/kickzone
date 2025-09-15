import { useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  GET_PRODUCTS_QUERY,
  GET_CATEGORIES_QUERY,
  GET_COLORS_QUERY,
} from '@kickzone-workspace/customers-graphql';

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
  const { data, loading, error, refetch } =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'categories'>>(
      GET_CATEGORIES_QUERY
    );

  return {
    categories: data?.categories || [],
    loading,
    error,
    refetch,
  };
}

export function useCustomersColors() {
  const { data, loading, error, refetch } =
    useQuery<Pick<KickzoneGraphqlTypes.Query, 'colors'>>(GET_COLORS_QUERY);

  return {
    colors: data?.colors || [],
    loading,
    error,
    refetch,
  };
}
