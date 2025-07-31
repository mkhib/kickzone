import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const SELLER_PRODUCTS_FOR_ME_QUERY = gql`
  query SellerProductsForMe($filter: ProductFilterInput) {
    sellerProductsForMe(filter: $filter) {
      edges {
        cursor
        node {
          id
          name
          archived
          categories {
            id
            name
          }
          productInfos {
            id
            size
            color {
              id
              name
              hexCode
            }
            weight
            images
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

interface UseSellersProductsArgs {
  search?: string;
  categoryId?: number | string;
  sort?: string;
  sortOrder?: 'asc' | 'desc';
  pageSize?: number;
  archivedStatus?: 'ALL' | 'ACTIVE' | 'ARCHIVED';
}

export function useSellersProducts({
  search = '',
  categoryId,
  sort = '',
  sortOrder = 'asc',
  pageSize = 12,
  archivedStatus = 'ACTIVE',
}: UseSellersProductsArgs = {}) {
  // sellerId is not needed, backend uses auth context
  let categoryIdValue: number | undefined = undefined;
  if (typeof categoryId === 'string' && categoryId !== '') {
    categoryIdValue = Number(categoryId);
  } else if (typeof categoryId === 'number') {
    categoryIdValue = categoryId;
  }

  const { data, loading, error, fetchMore, refetch } = useQuery(
    SELLER_PRODUCTS_FOR_ME_QUERY,
    {
      variables: {
        filter: {
          searchTerm: search || undefined,
          categoryId: categoryIdValue,
          first: pageSize,
          sort,
          sortOrder,
          archivedStatus,
        },
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const products =
    data?.sellerProductsForMe?.edges?.map(
      (e: KickzoneGraphqlTypes.ProductEdge) => e.node
    ) || [];
  const pageInfo = data?.sellerProductsForMe?.pageInfo;
  const totalCount = data?.sellerProductsForMe?.totalCount || 0;

  const loadMore = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          filter: {
            searchTerm: search || undefined,
            categoryId: categoryIdValue,
            first: pageSize,
            after: pageInfo.endCursor,
            sort,
            sortOrder,
            archivedStatus,
          },
        },
      });
    }
  };

  return {
    sellersProducts: products,
    isSellersProductsLoading: loading,
    sellersProductsError: error,
    loadMoreSellersProducts: loadMore,
    hasMoreSellersProducts: pageInfo?.hasNextPage,
    totalSellersProductsCount: totalCount,
    refetchSellersProducts: refetch,
  };
}
