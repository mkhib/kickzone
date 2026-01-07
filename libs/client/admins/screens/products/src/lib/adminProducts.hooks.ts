import { useLazyQuery, useMutation } from '@apollo/client/react';
import {
  SELLER_PRODUCTS_BY_PRODUCT,
  UPDATE_SELLER_PRODUCT_RECOMMENDED,
} from './adminProducts.graphql';

export type AdminSellerListing = {
  id: string;
  price: number;
  discount: number;
  stockQuantity: number;
  recommended: boolean;
  seller?: { id: number; user?: { name?: string | null } | null } | null;
};

export const useSellerListingsByProduct = () => {
  const [fetchSellerListings, listingsResult] = useLazyQuery<{
    sellerProductsByProduct: AdminSellerListing[];
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
