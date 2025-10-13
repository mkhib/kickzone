import { useMutation, useQuery, useLazyQuery } from '@apollo/client/react';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useMemo } from 'react';
import {
  GET_PRODUCTS_QUERY,
  GET_SELLER_PRODUCT_BY_ID_QUERY,
  CREATE_SELLER_PRODUCT_MUTATION,
  UPDATE_SELLER_PRODUCT_MUTATION,
  SELLER_PRODUCTS_FOR_ME_QUERY,
} from '@kickzone-workspace/sellers-graphql';

export function useSellersProductManagement() {
  const { user } = useSellersAuthContext();

  // Query for getting available products
  const {
    data: productsData,
    loading: isProductsLoading,
    error: productsError,
  } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'products'>,
    KickzoneGraphqlTypes.QueryProductsArgs
  >(GET_PRODUCTS_QUERY, {
    variables: {
      filter: {
        archivedStatus: KickzoneGraphqlTypes.ProductArchivedStatus.Active,
      },
    },
  });

  // Lazy query for fetching seller product by ID
  const [
    getSellerProductById,
    {
      data: sellerProductData,
      loading: isSellerProductLoading,
      error: sellerProductError,
    },
  ] = useLazyQuery<
    Pick<KickzoneGraphqlTypes.Query, 'mySellerProductById'>,
    KickzoneGraphqlTypes.QueryMySellerProductByIdArgs
  >(GET_SELLER_PRODUCT_BY_ID_QUERY);

  // Mutations
  const [
    createSellerProduct,
    { loading: isCreateLoading, error: createError },
  ] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createMySellerProduct'>,
    KickzoneGraphqlTypes.MutationCreateMySellerProductArgs
  >(CREATE_SELLER_PRODUCT_MUTATION);

  const [
    updateSellerProduct,
    { loading: isUpdateLoading, error: updateError },
  ] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateMySellerProduct'>,
    KickzoneGraphqlTypes.MutationUpdateMySellerProductArgs
  >(UPDATE_SELLER_PRODUCT_MUTATION);

  const products = useMemo(
    () =>
      productsData?.products?.edges?.map(
        (edge: KickzoneGraphqlTypes.ProductEdge) => edge.node
      ) || [],
    [productsData?.products?.edges]
  );

  const isManagementLoading =
    isCreateLoading || isUpdateLoading || isProductsLoading;

  const createProduct = async (
    formData: KickzoneGraphqlTypes.CreateSellerProductInput
  ) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    if (!formData.productInfoId) {
      throw new Error('No product variant selected');
    }

    const variables = {
      input: {
        productInfoId: formData.productInfoId,
        price: formData.price,
        costPrice: formData.costPrice,
        discount: formData.discount,
        stockQuantity: formData.stockQuantity,
      },
    };

    return createSellerProduct({
      variables,
      refetchQueries: [SELLER_PRODUCTS_FOR_ME_QUERY],
      awaitRefetchQueries: true,
      update: (cache, { data }) => {
        // Invalidate the seller products query to force a refetch
        cache.evict({ fieldName: 'sellerProductsForMe' });
        cache.gc();
      },
    });
  };

  const updateProduct = async (
    formData: KickzoneGraphqlTypes.UpdateSellerProductInput,
    productId: number
  ) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    if (!formData.productInfoId) {
      throw new Error('No product variant selected');
    }

    const variables = {
      input: {
        id: productId,
        productInfoId: formData.productInfoId,
        price: formData.price,
        costPrice: formData.costPrice,
        discount: formData.discount,
        stockQuantity: formData.stockQuantity,
      },
    };

    return updateSellerProduct({
      variables,
      refetchQueries: [SELLER_PRODUCTS_FOR_ME_QUERY],
      awaitRefetchQueries: true,
      update: (cache, { data }) => {
        // Invalidate the seller products query to force a refetch
        cache.evict({ fieldName: 'sellerProductsForMe' });
        cache.gc();
      },
    });
  };

  const productInfos = useMemo(
    () =>
      products.flatMap(
        (product: KickzoneGraphqlTypes.Product) => product.productInfos
      ),
    [products]
  );

  return {
    // Data
    products,
    productInfos,
    sellerProduct: sellerProductData?.mySellerProductById,

    // Loading states
    isManagementLoading,
    isProductsLoading,
    isCreateLoading,
    isUpdateLoading,
    isSellerProductLoading,

    // Error states
    productsError,
    createError,
    updateError,
    sellerProductError,

    // Actions
    createProduct,
    updateProduct,
    getSellerProductById,
  };
}
