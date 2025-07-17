import { gql } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    id
    name
    archived
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
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      categories {
        id
        name
      }
    }
  }
`;

export const CREATE_PRODUCT_INFO = gql`
  mutation CreateProductInfo($input: CreateProductInfoInput!) {
    createProductInfo(input: $input) {
      id
      name
      archived
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
`;

export const UPLOAD_PRODUCT_INFO_IMAGES = gql`
  mutation UploadProductInfoImages($productInfoId: Int!, $files: [Upload!]!) {
    uploadProductInfoImages(productInfoId: $productInfoId, files: $files)
  }
`;

export const REMOVE_PRODUCT_INFO_IMAGE = gql`
  mutation RemoveProductInfoImage($productInfoId: Int!, $imageName: String!) {
    removeProductInfoImage(productInfoId: $productInfoId, imageName: $imageName)
  }
`;

export const PRODUCTS_QUERY = gql`
  query Products($filter: ProductFilterInput) {
    products(filter: $filter) {
      edges {
        cursor
        node {
          ...ProductFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const PRODUCT_BY_ID_QUERY = gql`
  query Product($id: Int!) {
    product(id: $id) {
      ...ProductFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const ARCHIVE_PRODUCT_MUTATION = gql`
  mutation ArchiveProduct($id: Int!) {
    archiveProduct(id: $id) {
      id
      archived
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      archived
      categories {
        id
        name
      }
      description
    }
  }
`;
