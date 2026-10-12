import { useMutation, useQuery, useApolloClient } from '@apollo/client/react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useCallback } from 'react';
import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_INFO,
  UPLOAD_PRODUCT_INFO_IMAGES,
  REMOVE_PRODUCT_INFO_IMAGE,
  PRODUCTS_QUERY,
  PRODUCT_BY_ID_QUERY,
  ARCHIVE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
  UPDATE_PRODUCT,
} from './products.graphql';

export function useProductsQuery({
  search,
  categoryId,
  category,
  categorySlugs,
  brand,
  sort = '',
  sortOrder = 'asc',
  pageSize = 12,
  archivedStatus = KickzoneGraphqlTypes.ProductArchivedStatus.Active,
  sellerId,
  onlyWithSellers,
  onlyInStock,
}: {
  search: string;
  categoryId?: number;
  category?: string;
  categorySlugs?: string[];
  brand?: string;
  sort?: string;
  sortOrder?: 'asc' | 'desc';
  pageSize?: number;
  archivedStatus?: KickzoneGraphqlTypes.ProductArchivedStatus;
  sellerId?: number;
  onlyWithSellers?: boolean;
  onlyInStock?: boolean;
}) {
  const buildFilter = useCallback(
    (after?: string) => ({
      searchTerm: search || undefined,
      categoryId: categoryId || undefined,
      category: category || undefined,
      categorySlugs:
        categorySlugs && categorySlugs.length > 0 ? categorySlugs : undefined,
      brand: brand || undefined,
      first: pageSize,
      after,
      sort,
      sortOrder,
      archivedStatus,
      sellerId,
      onlyWithSellers,
      onlyInStock,
    }),
    [
      search,
      categoryId,
      category,
      categorySlugs,
      brand,
      pageSize,
      sort,
      sortOrder,
      archivedStatus,
      sellerId,
      onlyWithSellers,
      onlyInStock,
    ]
  );

  const { data, loading, error, fetchMore, refetch, networkStatus } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'products'>,
    KickzoneGraphqlTypes.QueryProductsArgs
  >(PRODUCTS_QUERY, {
    variables: {
      filter: buildFilter(),
    },
    notifyOnNetworkStatusChange: true,
  });

  const products =
    data?.products?.edges?.map(
      (e: KickzoneGraphqlTypes.ProductEdge) => e.node
    ) || [];
  const pageInfo = data?.products?.pageInfo;
  const totalCount = data?.products?.totalCount || 0;

  const loadMore = useCallback(() => {
    if (pageInfo?.hasNextPage) {
      return fetchMore({
        variables: {
          filter: buildFilter(pageInfo.endCursor ?? undefined),
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.products) return prev;
          const existingEdges = prev.products?.edges || [];
          const newEdges = fetchMoreResult.products?.edges || [];
          const existingIds = new Set(
            existingEdges.map((e) => e?.node?.id)
          );
          const uniqueNewEdges = newEdges.filter(
            (e) => e?.node?.id != null && !existingIds.has(e.node.id)
          );
          return {
            ...prev,
            products: {
              ...fetchMoreResult.products,
              edges: [...existingEdges, ...uniqueNewEdges],
            },
          };
        },
      });
    }
  }, [fetchMore, pageInfo, buildFilter]);

  return {
    products,
    loading,
    error,
    loadMore,
    hasNextPage: Boolean(pageInfo?.hasNextPage),
    totalCount,
    refetch,
    isFetchingMore: networkStatus === 3,
  };
}

export const useProducts = () => {
  const client = useApolloClient();

  const [createProductMutation, { loading: isCreatingProduct }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createProduct'>,
    KickzoneGraphqlTypes.MutationCreateProductArgs
  >(CREATE_PRODUCT);

  const [createProductInfoMutation, { loading: isCreatingProductInfo }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'createProductInfo'>,
      KickzoneGraphqlTypes.MutationCreateProductInfoArgs
    >(CREATE_PRODUCT_INFO);

  const [uploadProductInfoImagesMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'uploadProductInfoImages'>,
    KickzoneGraphqlTypes.MutationUploadProductInfoImagesArgs
  >(UPLOAD_PRODUCT_INFO_IMAGES);

  const [removeProductInfoImageMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'removeProductInfoImage'>,
    KickzoneGraphqlTypes.MutationRemoveProductInfoImageArgs
  >(REMOVE_PRODUCT_INFO_IMAGE);

  const [archiveProductMutation, { loading: isArchivingProduct }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'archiveProduct'>,
    KickzoneGraphqlTypes.MutationArchiveProductArgs
  >(ARCHIVE_PRODUCT_MUTATION);

  const [deleteProductMutation, { loading: isDeletingProduct }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'deleteProduct'>,
    KickzoneGraphqlTypes.MutationDeleteProductArgs
  >(DELETE_PRODUCT_MUTATION);

  const [updateProductMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateProduct'>,
    KickzoneGraphqlTypes.MutationUpdateProductArgs
  >(UPDATE_PRODUCT);

  const createProductWithInfos = useCallback(
    async (
      productInput: KickzoneGraphqlTypes.CreateProductInput,
      productInfos: Omit<
        KickzoneGraphqlTypes.CreateProductInfoInput,
        'productId'
      >[]
    ) => {
      const { data: productData } = await createProductMutation({
        variables: {
          input: productInput,
        },
      });
      if (!productData?.createProduct?.id) {
        throw new Error('Failed to create product');
      }
      const createdProductInfos = [];
      for (const info of productInfos) {
        const { data: productInfoData } = await createProductInfoMutation({
          variables: {
            input: {
              ...info,
              productId: productData.createProduct.id,
            },
          },
        });
        if (productInfoData?.createProductInfo?.productInfos) {
          // The createProductInfo mutation returns the full product with all productInfos
          // We need to find the newly created productInfo from the array
          // Since we're creating them sequentially, the last one in the array should be the new one
          const newProductInfo =
            productInfoData.createProductInfo.productInfos[
              productInfoData.createProductInfo.productInfos.length - 1
            ];
          if (newProductInfo) {
            createdProductInfos.push(newProductInfo);
          }
        }
      }

      // Evict and refetch all products queries to ensure the new product appears in the list
      // This handles all possible filter combinations
      client.cache.evict({ fieldName: 'products' });
      client.cache.gc();

      return {
        product: productData.createProduct,
        productInfos: createdProductInfos,
      };
    },
    [createProductMutation, createProductInfoMutation, client]
  );

  const uploadProductInfoImages = useCallback(
    async (productInfoId: number, files: File[]) => {
      const { data } = await uploadProductInfoImagesMutation({
        variables: {
          productInfoId,
          files,
        },
      });
      const result = data?.uploadProductInfoImages || [];
      return result;
    },
    [uploadProductInfoImagesMutation]
  );

  const removeProductInfoImage = useCallback(
    async (productInfoId: number, imageName: string) => {
      const { data } = await removeProductInfoImageMutation({
        variables: {
          productInfoId,
          imageName,
        },
      });
      const result = data?.removeProductInfoImage;
      return result;
    },
    [removeProductInfoImageMutation]
  );

  const archiveProduct = useCallback(
    async (id: number) => {
      const { data } = await archiveProductMutation({ variables: { id } });
      return data?.archiveProduct;
    },
    [archiveProductMutation]
  );

  const deleteProduct = useCallback(
    async (id: number) => {
      const { data } = await deleteProductMutation({ variables: { id } });
      client.cache.evict({ fieldName: 'products' });
      client.cache.gc();
      return data?.deleteProduct ?? false;
    },
    [deleteProductMutation, client]
  );

  const updateProduct = useCallback(
    async (input: KickzoneGraphqlTypes.UpdateProductInput) => {
      const { data } = await updateProductMutation({
        variables: { input },
      });
      return data?.updateProduct;
    },
    [updateProductMutation]
  );

  return {
    createProductWithInfos,
    uploadProductInfoImages,
    removeProductInfoImage,
    isCreatingProduct: isCreatingProduct || isCreatingProductInfo,
    archiveProduct,
    isArchivingProduct,
    deleteProduct,
    isDeletingProduct,
    updateProduct,
  };
};

export function useProductById(id: number | undefined) {
  const isValidId = typeof id === 'number' && !isNaN(id) && id > 0;
  const { data, loading, error, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'product'>,
    KickzoneGraphqlTypes.QueryProductArgs
  >(PRODUCT_BY_ID_QUERY, {
    variables: { id: isValidId ? id : 0 },
    skip: !isValidId,
  });
  return { product: data?.product, loading, error, refetch };
}
