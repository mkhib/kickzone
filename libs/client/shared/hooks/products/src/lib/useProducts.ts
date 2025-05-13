import { gql, useMutation, useQuery } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';
import { useCallback } from 'react';

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      discount
      categories {
        id
        name
      }
    }
  }
`;

const CREATE_PRODUCT_INFO = gql`
  mutation CreateProductInfo($input: CreateProductInfoInput!) {
    createProductInfo(input: $input) {
      id
      size
      price
      costPrice
      color
      weight
      discount
      stockQuantity
      images
    }
  }
`;

const UPLOAD_PRODUCT_INFO_IMAGES = gql`
  mutation UploadProductInfoImages($productInfoId: Int!, $files: [Upload!]!) {
    uploadProductInfoImages(productInfoId: $productInfoId, files: $files)
  }
`;

const REMOVE_PRODUCT_INFO_IMAGE = gql`
  mutation RemoveProductInfoImage($productInfoId: Int!, $imageName: String!) {
    removeProductInfoImage(productInfoId: $productInfoId, imageName: $imageName)
  }
`;

const PRODUCTS_QUERY = gql`
  query Products($filter: ProductFilterInput) {
    products(filter: $filter) {
      edges {
        cursor
        node {
          id
          name
          discount
          categories {
            id
            name
          }
          productInfos {
            id
            price
            color
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

const PRODUCT_BY_ID_QUERY = gql`
  query Product($id: Int!) {
    product(id: $id) {
      id
      name
      discount
      categories {
        id
        name
      }
      productInfos {
        id
        size
        price
        costPrice
        color
        weight
        discount
        stockQuantity
        images
      }
    }
  }
`;

export function useProductsQuery({
  search,
  category,
  sort = '',
  pageSize = 12,
}: {
  search: string;
  category: string;
  sort?: string;
  pageSize?: number;
}) {
  const { data, loading, error, fetchMore, refetch } = useQuery<{
    products: KickzoneGraphqlTypes.ProductConnection;
  }>(PRODUCTS_QUERY, {
    variables: {
      filter: {
        searchTerm: search || undefined,
        category: category || undefined,
        first: pageSize,
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
            category: category || undefined,
            first: pageSize,
            after: pageInfo.endCursor,
          },
        },
      });
    }
  }, [fetchMore, pageInfo, search, category, pageSize]);

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
    { productInfoId: number; files: File[] }
  >(UPLOAD_PRODUCT_INFO_IMAGES);

  const [removeProductInfoImageMutation] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'removeProductInfoImage'>,
    { productInfoId: number; imageName: string }
  >(REMOVE_PRODUCT_INFO_IMAGE);

  // Accepts productInput and an array of productInfoInputs
  const createProductWithInfos = useCallback(
    async (
      productInput: KickzoneGraphqlTypes.CreateProductInput,
      productInfos: Omit<
        KickzoneGraphqlTypes.CreateProductInfoInput,
        'productId'
      >[]
    ) => {
      try {
        // First create the product
        const { data: productData } = await createProductMutation({
          variables: {
            input: productInput,
          },
        });

        if (!productData?.createProduct?.id) {
          throw new Error('Failed to create product');
        }

        // Then create all product infos with the product ID
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
          if (productInfoData?.createProductInfo) {
            createdProductInfos.push(productInfoData.createProductInfo);
          }
        }

        return {
          product: productData.createProduct,
          productInfos: createdProductInfos,
        };
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
    },
    [createProductMutation, createProductInfoMutation]
  );

  const uploadProductInfoImages = useCallback(
    async (productInfoId: number, files: File[]) => {
      try {
        const { data } = await uploadProductInfoImagesMutation({
          variables: {
            productInfoId,
            files,
          },
        });
        return data?.uploadProductInfoImages || [];
      } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
      }
    },
    [uploadProductInfoImagesMutation]
  );

  const removeProductInfoImage = useCallback(
    async (productInfoId: number, imageName: string) => {
      try {
        const { data } = await removeProductInfoImageMutation({
          variables: {
            productInfoId,
            imageName,
          },
        });
        return data?.removeProductInfoImage;
      } catch (error) {
        console.error('Error removing image:', error);
        throw error;
      }
    },
    [removeProductInfoImageMutation]
  );

  return {
    createProductWithInfos,
    uploadProductInfoImages,
    removeProductInfoImage,
    isCreatingProduct: isCreatingProduct || isCreatingProductInfo,
  };
};

export function useProductById(id: number | undefined) {
  const { data, loading, error, refetch } = useQuery<{
    product: KickzoneGraphqlTypes.Product;
  }>(PRODUCT_BY_ID_QUERY, {
    variables: { id },
    skip: !id,
  });
  return { product: data?.product, loading, error, refetch };
}
