import { useLazyQuery, useMutation } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import {
  SELLER_PRODUCTS_BY_PRODUCT,
  UPDATE_SELLER_PRODUCT_RECOMMENDED,
} from './adminProducts.graphql';

export const useSellerListingsByProduct = () => {
  const [fetchSellerListings, listingsResult] = useLazyQuery<{
    sellerProductsByProduct: KickzoneGraphqlTypes.SellerProduct[];
  }>(SELLER_PRODUCTS_BY_PRODUCT, {
    fetchPolicy: 'network-only',
  });
  const [mutateSellerProduct] = useMutation(UPDATE_SELLER_PRODUCT_RECOMMENDED);

  return {
    fetchSellerListings,
    listingsResult,
    mutateSellerProduct,
  };
};
