import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '@kickzone-workspace/products-hook';
import { useSellersAuth } from '@kickzone-workspace/sellers-contexts';

export function useSellersProducts({
  search = '',
  categoryId,
  sort = '',
  sortOrder = 'asc',
  pageSize = 12,
  archivedStatus = 'ACTIVE',
} = {}) {
  const { user } = useSellersAuth();
  const sellerId = user?.id;

  const { data, loading, error, fetchMore, refetch } = useQuery(
    PRODUCTS_QUERY,
    {
      variables: {
        filter: {
          searchTerm: search || undefined,
          categoryId: categoryId || undefined,
          first: pageSize,
          sort,
          sortOrder,
          archivedStatus,
          sellerId,
        },
      },
      skip: !sellerId,
      notifyOnNetworkStatusChange: true,
    }
  );

  const products = data?.products?.edges?.map((e) => e.node) || [];
  const pageInfo = data?.products?.pageInfo;
  const totalCount = data?.products?.totalCount || 0;

  const loadMore = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          filter: {
            searchTerm: search || undefined,
            categoryId: categoryId || undefined,
            first: pageSize,
            after: pageInfo.endCursor,
            sort,
            sortOrder,
            archivedStatus,
            sellerId,
          },
        },
      });
    }
  };

  return {
    products,
    loading,
    error,
    loadMore,
    hasNextPage: pageInfo?.hasNextPage,
    totalCount,
    refetch,
  };
}
