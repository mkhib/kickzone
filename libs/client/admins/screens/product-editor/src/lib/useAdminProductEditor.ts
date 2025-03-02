import { useMutation, gql } from '@apollo/client';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      productInfos {
        id
        size
        price
        costPrice
        color
        weight
        discount
        stockQuantity
        product {
          id
          name
          discount
        }
      }
      categories {
        id
        name
      }
      discount
    }
  }
`;

export function useAdminProductEditor() {
  const [createCategory, { loading: isCreatingCategory }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createCategory'>,
    KickzoneGraphqlTypes.MutationCreateCategoryArgs
  >(CREATE_CATEGORY);

  const [createProduct, { loading: isCreatingProduct }] = useMutation<
    Pick<KickzoneGraphqlTypes.Mutation, 'createProduct'>,
    KickzoneGraphqlTypes.MutationCreateProductArgs
  >(CREATE_PRODUCT);

  return {
    createCategory,
    createProduct,
    isCreatingCategory,
    isCreatingProduct,
  };
}
