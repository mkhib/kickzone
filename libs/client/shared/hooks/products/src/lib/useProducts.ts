import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useCallback } from 'react';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

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
    }
  }
`;

const UPLOAD_PRODUCT_IMAGES = gql`
  mutation UploadProductImages($productId: Int!, $files: [Upload!]!) {
    uploadProductImages(productId: $productId, files: $files)
  }
`;

export function useProducts() {
  const [createProductMutation, { loading: isCreatingProduct }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createProduct'>,
    KickzoneGraphqlTypes.MutationCreateProductArgs
  >(CREATE_PRODUCT);

  const [createProductInfoMutation, { loading: isCreatingProductInfo }] =
    useMutation<
      Pick<KickzoneGraphqlTypes.Mutation, 'createProductInfo'>,
      KickzoneGraphqlTypes.MutationCreateProductInfoArgs
    >(CREATE_PRODUCT_INFO);

  const [uploadProductImagesMutation] = useMutation(UPLOAD_PRODUCT_IMAGES);

  const createProduct = useCallback(
    async (
      productInput: KickzoneGraphqlTypes.CreateProductInput,
      productInfoInput: Omit<
        KickzoneGraphqlTypes.CreateProductInfoInput,
        'productId'
      >
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

        // Then create the product info with the product ID
        const { data: productInfoData } = await createProductInfoMutation({
          variables: {
            input: {
              ...productInfoInput,
              productId: productData.createProduct.id,
            },
          },
        });

        if (!productInfoData?.createProductInfo) {
          throw new Error('Failed to create product info');
        }

        return {
          product: productData.createProduct,
          productInfo: productInfoData.createProductInfo,
        };
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
    },
    [createProductMutation, createProductInfoMutation]
  );

  const uploadProductImages = useCallback(
    async (productId: number, files: File[]) => {
      try {
        const { data } = await uploadProductImagesMutation({
          variables: {
            productId,
            files,
          },
        });

        return data?.uploadProductImages || [];
      } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
      }
    },
    [uploadProductImagesMutation]
  );

  return {
    createProduct,
    uploadProductImages,
    isCreatingProduct: isCreatingProduct || isCreatingProductInfo,
  };
}
