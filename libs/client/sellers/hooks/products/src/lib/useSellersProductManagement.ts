import { useMutation, useQuery, gql } from '@apollo/client';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

// GraphQL Queries and Mutations
const GET_PRODUCTS_QUERY = gql`
  query GetProducts($filter: ProductFilterInput) {
    products(filter: $filter) {
      edges {
        node {
          id
          name
          description
          categories {
            id
            name
          }
          productInfos {
            id
            size
            color {
              id
              name
              hexCode
            }
            weight
            images
          }
        }
      }
    }
  }
`;

const CREATE_SELLER_PRODUCT_MUTATION = gql`
  mutation CreateMySellerProduct($input: CreateSellerProductInput!) {
    createMySellerProduct(input: $input) {
      id
      price
      costPrice
      discount
      stockQuantity
      productInfo {
        id
        size
        color {
          name
        }
      }
      product {
        name
      }
    }
  }
`;

const UPDATE_SELLER_PRODUCT_MUTATION = gql`
  mutation UpdateMySellerProduct($input: UpdateSellerProductInput!) {
    updateMySellerProduct(input: $input) {
      id
      price
      costPrice
      discount
      stockQuantity
      productInfo {
        id
        size
        color {
          name
        }
      }
      product {
        name
      }
    }
  }
`;

interface SellerProductFormData {
  productId: number | null;
  productInfoId: number | null;
  price: number;
  costPrice: number;
  discount: number;
  stockQuantity: number;
}

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

  // Mutations
  const [
    createSellerProduct,
    { loading: isCreateLoading, error: createError },
  ] = useMutation(CREATE_SELLER_PRODUCT_MUTATION, {
    onCompleted: () => {
      // TODO: Add success notification
      console.log('Product created successfully');
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });

  const [
    updateSellerProduct,
    { loading: isUpdateLoading, error: updateError },
  ] = useMutation(UPDATE_SELLER_PRODUCT_MUTATION, {
    onCompleted: () => {
      // TODO: Add success notification
      console.log('Product updated successfully');
    },
    onError: (error) => {
      console.error('Error updating product:', error);
    },
  });

  const products =
    productsData?.products?.edges?.map(
      (edge: KickzoneGraphqlTypes.ProductEdge) => edge.node
    ) || [];
  const isManagementLoading =
    isCreateLoading || isUpdateLoading || isProductsLoading;

  const createProduct = async (formData: SellerProductFormData) => {
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

    return createSellerProduct({ variables });
  };

  const updateProduct = async (
    formData: SellerProductFormData,
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

    return updateSellerProduct({ variables });
  };

  return {
    // Data
    products,
    productInfos: products.flatMap(
      (product: KickzoneGraphqlTypes.Product) => product.productInfos
    ),

    // Loading states
    isManagementLoading,
    isProductsLoading,
    isCreateLoading,
    isUpdateLoading,

    // Error states
    productsError,
    createError,
    updateError,

    // Actions
    createProduct,
    updateProduct,
  };
}

export type { SellerProductFormData };
