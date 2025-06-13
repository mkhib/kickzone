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

export type CreateSellerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  storeName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateSellerProductInput = {
  costPrice: Scalars['Float']['input'];
  discount: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
  productInfoId: Scalars['Int']['input'];
  stockQuantity: Scalars['Int']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveProduct: Product;
  createCategory: Category;
  createColor: Color;
  createProduct: Product;
  createProductInfo: Product;
  createSeller: SellerInfo;
  createSellerProduct: SellerProduct;
  createUser: User;
  deleteCategory: Scalars['Boolean']['output'];
  deleteColor: Scalars['Boolean']['output'];
  initiatePasswordSetup: Scalars['Boolean']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  removeProductInfoImage: Scalars['Boolean']['output'];
  setupPassword: User;
  toggleSellerActive: SellerInfo;
  unarchiveProduct: Product;
  updateCategory: Category;
  updateColor?: Maybe<Color>;
  updateProduct: Product;
  updateSeller: SellerInfo;
  updateSellerProduct: SellerProduct;
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


export type MutationCreateSellerArgs = {
  createSellerInput: CreateSellerInput;
};


export type MutationCreateSellerProductArgs = {
  input: CreateSellerProductInput;
  sellerId: Scalars['Int']['input'];
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


export type MutationInitiatePasswordSetupArgs = {
  baseUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveProductInfoImageArgs = {
  imageName: Scalars['String']['input'];
  productInfoId: Scalars['Int']['input'];
};


export type MutationSetupPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationToggleSellerActiveArgs = {
  id: Scalars['Int']['input'];
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


export type MutationUpdateSellerArgs = {
  id: Scalars['Int']['input'];
  updateSellerInput: UpdateSellerInput;
};


export type MutationUpdateSellerProductArgs = {
  input: UpdateSellerProductInput;
  sellerId: Scalars['Int']['input'];
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
  findOne?: Maybe<SellerInfo>;
  me?: Maybe<User>;
  product?: Maybe<Product>;
  products: ProductConnection;
  sellerProductsForMe: ProductConnection;
  sellers: SellerConnection;
  users: UserConnection;
};


export type QueryColorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneArgs = {
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


export type QuerySellersArgs = {
  filter?: InputMaybe<SellerFilterInput>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type SellerConnection = {
  __typename?: 'SellerConnection';
  edges: Array<SellerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SellerEdge = {
  __typename?: 'SellerEdge';
  cursor: Scalars['String']['output'];
  node: SellerInfo;
};

export type SellerFilterInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type SellerInfo = {
  __typename?: 'SellerInfo';
  address?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  sellerProducts: Array<SellerProduct>;
  storeName: Scalars['String']['output'];
  user: User;
};

export type SellerProduct = {
  __typename?: 'SellerProduct';
  costPrice: Scalars['Float']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  productInfo: ProductInfo;
  seller: SellerInfo;
  stockQuantity: Scalars['Int']['output'];
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateColorInput = {
  hexCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateSellerInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  storeName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSellerProductInput = {
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  productInfoId?: InputMaybe<Scalars['Int']['input']>;
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: UserRole;
  username: Scalars['String']['output'];
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
