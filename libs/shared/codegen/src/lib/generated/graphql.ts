export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Color = {
  __typename?: 'Color';
  hexCode: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateColorInput = {
  hexCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateProductInfoInput = {
  colorId: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
  size: Scalars['String']['input'];
  weight: Scalars['Float']['input'];
};

export type CreateProductInput = {
  categoryIds: Array<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discount: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveProduct: Product;
  createCategory: Category;
  createColor: Color;
  createProduct: Product;
  createProductInfo: Product;
  createUser: User;
  deleteCategory: Scalars['Boolean']['output'];
  deleteColor: Scalars['Boolean']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  removeProductInfoImage: Scalars['Boolean']['output'];
  unarchiveProduct: Product;
  updateCategory: Category;
  updateColor?: Maybe<Color>;
  updateProduct: Product;
  uploadProductInfoImages: Array<Scalars['String']['output']>;
};


export type MutationArchiveProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateColorArgs = {
  input: CreateColorInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductInfoArgs = {
  input: CreateProductInfoInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteColorArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveProductInfoImageArgs = {
  imageName: Scalars['String']['input'];
  productInfoId: Scalars['Int']['input'];
};


export type MutationUnarchiveProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateColorArgs = {
  id: Scalars['Int']['input'];
  input: UpdateColorInput;
};


export type MutationUpdateProductArgs = {
  categoryIds: Array<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUploadProductInfoImagesArgs = {
  files: Array<Scalars['Upload']['input']>;
  productInfoId: Scalars['Int']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Product = {
  __typename?: 'Product';
  archived: Scalars['Boolean']['output'];
  categories: Array<Category>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productInfos: Array<ProductInfo>;
};

export enum ProductArchivedStatus {
  Active = 'ACTIVE',
  All = 'ALL',
  Archived = 'ARCHIVED'
}

export type ProductConnection = {
  __typename?: 'ProductConnection';
  edges: Array<ProductEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ProductEdge = {
  __typename?: 'ProductEdge';
  cursor: Scalars['String']['output'];
  node: Product;
};

export type ProductFilterInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  archivedStatus?: InputMaybe<ProductArchivedStatus>;
  category?: InputMaybe<Scalars['String']['input']>;
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  productInfoFilter?: InputMaybe<ProductInfoFilterInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sellerId?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};

export type ProductInfo = {
  __typename?: 'ProductInfo';
  color?: Maybe<Color>;
  id: Scalars['Int']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  product: Product;
  size: Scalars['String']['output'];
  weight: Scalars['Float']['output'];
};

export type ProductInfoFilterInput = {
  colorId?: InputMaybe<Array<Scalars['Int']['input']>>;
  costPrice?: InputMaybe<Array<Scalars['Float']['input']>>;
  discount?: InputMaybe<Array<Scalars['Float']['input']>>;
  price?: InputMaybe<Array<Scalars['Float']['input']>>;
  size?: InputMaybe<Array<Scalars['String']['input']>>;
  stockQuantity?: InputMaybe<Array<Scalars['Int']['input']>>;
  weight?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  color?: Maybe<Color>;
  colors: Array<Color>;
  me?: Maybe<User>;
  product?: Maybe<Product>;
  products: ProductConnection;
  sellerProductsForMe: ProductConnection;
  users: UserConnection;
};


export type QueryColorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
};


export type QuerySellerProductsForMeArgs = {
  filter?: InputMaybe<ProductFilterInput>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateColorInput = {
  hexCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: UserRole;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Seller = 'SELLER'
}
