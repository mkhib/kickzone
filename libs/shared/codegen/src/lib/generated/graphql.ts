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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AddToCartInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  productImage?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  sellerId: Scalars['String']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
  unitPrice: Scalars['Float']['input'];
};

export type Cart = {
  __typename?: 'Cart';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
  subtotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type CartItem = {
  __typename?: 'CartItem';
  cartId: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  productId: Scalars['String']['output'];
  productImage?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  sellerId: Scalars['String']['output'];
  size?: Maybe<Scalars['String']['output']>;
  totalPrice: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
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

export type CreateOrderInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  customerPhone: Scalars['String']['input'];
  items: Array<CreateOrderItemInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  sellerId: Scalars['String']['input'];
  shippingAddress: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type CreateOrderItemInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  productImage?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
  totalPrice: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
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
  addToCart: Cart;
  archiveProduct: Product;
  clearCart: Cart;
  createCategory: Category;
  createColor: Color;
  createMySellerProduct: SellerProduct;
  createOrder: Order;
  createProduct: Product;
  createProductInfo: Product;
  createSeller: SellerInfo;
  createSellerProduct: SellerProduct;
  createUser: User;
  deleteCategory: Scalars['Boolean']['output'];
  deleteColor: Scalars['Boolean']['output'];
  deleteOrder: Scalars['Boolean']['output'];
  initiatePasswordSetup: Scalars['Boolean']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  removeFromCart: Cart;
  removeProductInfoImage: Scalars['Boolean']['output'];
  setupPassword: User;
  toggleSellerActive: SellerInfo;
  unarchiveProduct: Product;
  updateCartItem: Cart;
  updateCategory: Category;
  updateColor?: Maybe<Color>;
  updateMySellerProduct: SellerProduct;
  updateOrder: Order;
  updateOrderStatus: Order;
  updateProduct: Product;
  updateSeller: SellerInfo;
  updateSellerProduct: SellerProduct;
  uploadProductInfoImages: Array<Scalars['String']['output']>;
};


export type MutationAddToCartArgs = {
  addToCartInput: AddToCartInput;
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


export type MutationCreateMySellerProductArgs = {
  input: CreateSellerProductInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
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


export type MutationDeleteOrderArgs = {
  id: Scalars['String']['input'];
};


export type MutationInitiatePasswordSetupArgs = {
  baseUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveFromCartArgs = {
  itemId: Scalars['String']['input'];
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


export type MutationUpdateCartItemArgs = {
  itemId: Scalars['String']['input'];
  updateInput: UpdateCartItemInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateColorArgs = {
  id: Scalars['Int']['input'];
  input: UpdateColorInput;
};


export type MutationUpdateMySellerProductArgs = {
  input: UpdateSellerProductInput;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['String']['input'];
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdateOrderStatusArgs = {
  updateOrderStatusInput: UpdateOrderStatusInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
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

export type Order = {
  __typename?: 'Order';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerEmail: Scalars['String']['output'];
  customerName: Scalars['String']['output'];
  customerPhone: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  notes?: Maybe<Scalars['String']['output']>;
  orderNumber: Scalars['String']['output'];
  sellerId: Scalars['String']['output'];
  shippingAddress: Scalars['String']['output'];
  shippingCost: Scalars['Float']['output'];
  state: Scalars['String']['output'];
  status: OrderStatus;
  subtotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  zipCode: Scalars['String']['output'];
};

export type OrderEdge = {
  __typename?: 'OrderEdge';
  cursor: Scalars['String']['output'];
  node: Order;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  orderId: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  productImage?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  size?: Maybe<Scalars['String']['output']>;
  totalPrice: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Shipped = 'SHIPPED'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type Product = {
  __typename?: 'Product';
  archived: Scalars['Boolean']['output'];
  categories: Array<Category>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  productInfos: Array<ProductInfo>;
  sellerProducts: Array<SellerProduct>;
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
  onlyInStock?: InputMaybe<Scalars['Boolean']['input']>;
  onlyWithSellers?: InputMaybe<Scalars['Boolean']['input']>;
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
  adminSellerOrders: Array<Order>;
  allSellerOrders: Array<Order>;
  categories: Array<Category>;
  color?: Maybe<Color>;
  colors: Array<Color>;
  findOne?: Maybe<SellerInfo>;
  me?: Maybe<User>;
  myCart: Cart;
  myOrders: Array<Order>;
  mySellerProductById?: Maybe<SellerProduct>;
  order: Order;
  orders: Array<Order>;
  product?: Maybe<Product>;
  products: ProductConnection;
  sellerProductsForMe: ProductConnection;
  sellers: SellerConnection;
  users: UserConnection;
};


export type QueryAdminSellerOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  sellerId: Scalars['String']['input'];
  status?: InputMaybe<OrderStatus>;
};


export type QueryAllSellerOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  status?: InputMaybe<OrderStatus>;
};


export type QueryColorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMyOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
};


export type QueryMySellerProductByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  sellerId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
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
  productInfo?: Maybe<ProductInfo>;
  seller?: Maybe<SellerInfo>;
  stockQuantity: Scalars['Int']['output'];
};

export type UpdateCartItemInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type UpdateColorInput = {
  hexCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateOrderInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  customerEmail?: InputMaybe<Scalars['String']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  customerPhone?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<UpdateOrderItemInput>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  trackingNumber?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderItemInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  productImage?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  size?: InputMaybe<Scalars['String']['input']>;
  totalPrice: Scalars['Float']['input'];
  unitPrice: Scalars['Float']['input'];
};

export type UpdateOrderStatusInput = {
  id: Scalars['String']['input'];
  status: OrderStatus;
};

export type UpdateProductInput = {
  categoryIds: Array<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
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
