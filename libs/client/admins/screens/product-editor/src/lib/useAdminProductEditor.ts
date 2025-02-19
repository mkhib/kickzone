import { useMutation, gql } from '@apollo/client';
import {
  CreateCategoryInput,
  CreateProductInput,
} from '@kickzone-workspace/inputs';

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
  const [createCategoryMutation, { loading: isCreatingCategory }] =
    useMutation(CREATE_CATEGORY);

  const [createProductMutation, { loading: isCreatingProduct }] =
    useMutation(CREATE_PRODUCT);

  const createCategory = async (input: CreateCategoryInput) => {
    const { data } = await createCategoryMutation({ variables: { input } });
    return data?.createCategory;
  };

  const createProduct = async (input: CreateProductInput) => {
    const { data } = await createProductMutation({ variables: { input } });
    return data?.createProduct;
  };

  return {
    createCategory,
    createProduct,
    isCreatingCategory,
    isCreatingProduct,
  };
}
