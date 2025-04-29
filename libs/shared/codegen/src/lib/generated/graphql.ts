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

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateProductInfoInput = {
  color: Scalars['String']['input'];
  costPrice: Scalars['Float']['input'];
  discount: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['Int']['input'];
  size: Scalars['String']['input'];
  stockQuantity: Scalars['Int']['input'];
  weight: Scalars['Float']['input'];
};

export type CreateProductInput = {
  categoryIds: Array<Scalars['Int']['input']>;
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
  createCategory: Category;
  createProduct: Product;
  createProductInfo: ProductInfo;
  createUser: User;
  login: User;
  logout: Scalars['Boolean']['output'];
  removeProductInfoImage: Scalars['Boolean']['output'];
  updateCategory: Category;
  uploadProductInfoImages: Array<Scalars['String']['output']>;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
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


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveProductInfoImageArgs = {
  imageName: Scalars['String']['input'];
  productInfoId: Scalars['Float']['input'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUploadProductInfoImagesArgs = {
  files: Array<Scalars['Upload']['input']>;
  productInfoId: Scalars['Float']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Product = {
  __typename?: 'Product';
  categories: Array<Category>;
  discount: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productInfos: Array<ProductInfo>;
};

export type ProductFilterInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Float']['input']>;
  productInfoFilter?: InputMaybe<ProductInfoFilterInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type ProductInfo = {
  __typename?: 'ProductInfo';
  color: Scalars['String']['output'];
  costPrice: Scalars['Float']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  price: Scalars['Float']['output'];
  product: Product;
  size: Scalars['String']['output'];
  stockQuantity: Scalars['Int']['output'];
  weight: Scalars['Float']['output'];
};

export type ProductInfoFilterInput = {
  color?: InputMaybe<Array<Scalars['String']['input']>>;
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
  me?: Maybe<User>;
  products: Array<Product>;
  users: UserConnection;
};


export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Float']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
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
