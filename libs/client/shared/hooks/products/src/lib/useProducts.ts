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
  UPDATE_PRODUCT,
} from './products.graphql';

export function useProductsQuery({
  search,
  categoryId,
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
  sort?: string;
  sortOrder?: 'asc' | 'desc';
  pageSize?: number;
  archivedStatus?: KickzoneGraphqlTypes.ProductArchivedStatus;
  sellerId?: number;
  onlyWithSellers?: boolean;
  onlyInStock?: boolean;
}) {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    Pick<KickzoneGraphqlTypes.Query, 'products'>,
    KickzoneGraphqlTypes.QueryProductsArgs
  >(PRODUCTS_QUERY, {
    variables: {
      filter: {
        searchTerm: search || undefined,
        categoryId: categoryId || undefined,
        first: pageSize,
        sort,
        sortOrder,
        archivedStatus,
        sellerId,
        onlyWithSellers,
        onlyInStock,
      },
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
  }, [
    fetchMore,
    pageInfo,
    search,
    categoryId,
    pageSize,
    sort,
    sortOrder,
    archivedStatus,
    sellerId,
  ]);

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

export const useProducts = () => {
  // Get the Apollo Client instance to access cache
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

  const [archiveProductMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'archiveProduct'>,
    KickzoneGraphqlTypes.MutationArchiveProductArgs
  >(ARCHIVE_PRODUCT_MUTATION);

  const [updateProductMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'updateProduct'>,
    KickzoneGraphqlTypes.MutationUpdateProductArgs
  >(UPDATE_PRODUCT);

  const createProductWithInfos = useCallback(
    async (
      productInput: {
        name: string;
        categoryIds: number[];
        description?: string | null;
      },
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
      return {
        product: productData.createProduct,
        productInfos: createdProductInfos,
      };
    },
    [createProductMutation, createProductInfoMutation]
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

  const updateProduct = useCallback(
    async (input: {
      id: number;
      name: string;
      categoryIds: number[];
      description?: string | null;
    }) => {
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
    updateProduct,
  };
};

export function useProductById(id: number | undefined) {
  console.log('🔍 useProductById called with id:', id);
  const { data, loading, error, refetch } = useQuery<{
    product: KickzoneGraphqlTypes.Product;
  }>(PRODUCT_BY_ID_QUERY, {
    variables: { id },
    skip: !id,
  });
  console.log('🔍 useProductById query result:', { data, loading, error, id });
  return { product: data?.product, loading, error, refetch };
}
