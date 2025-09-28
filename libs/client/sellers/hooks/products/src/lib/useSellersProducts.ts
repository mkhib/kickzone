import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { SELLER_PRODUCT_PRODUCT_FRAGMENT } from '@kickzone-workspace/sellers-graphql';

const SELLER_PRODUCTS_FOR_ME_QUERY = gql`
  query SellerProductsForMe($filter: ProductFilterInput) {
    sellerProductsForMe(filter: $filter) {
      edges {
        cursor
        node {
          ...SellerProductProductFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
  ${SELLER_PRODUCT_PRODUCT_FRAGMENT}
`;

interface UseSellersProductsArgs {
  search?: string;
  categoryId?: number | string;
  sort?: string;
  sortOrder?: 'asc' | 'desc';
  pageSize?: number;
  archivedStatus?: KickzoneGraphqlTypes.ProductArchivedStatus;
}

export function useSellersProducts({
  search = '',
  categoryId,
  sort = '',
  sortOrder = 'asc',
  pageSize = 12,
  archivedStatus = KickzoneGraphqlTypes.ProductArchivedStatus.Active,
}: UseSellersProductsArgs = {}) {
  // sellerId is not needed, backend uses auth context
  let categoryIdValue: number | undefined = undefined;
  if (typeof categoryId === 'string' && categoryId !== '') {
    categoryIdValue = Number(categoryId);
  } else if (typeof categoryId === 'number') {
    categoryIdValue = categoryId;
  }

  const { data, loading, error, fetchMore, refetch } = useQuery<
    KickzoneGraphqlTypes.Query,
    KickzoneGraphqlTypes.QuerySellerProductsForMeArgs
  >(SELLER_PRODUCTS_FOR_ME_QUERY, {
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
  });

  const products = data?.sellerProductsForMe?.edges?.map((e) => e.node) || [];
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
