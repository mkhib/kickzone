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
  quantity: Scalars['Int']['input'];
  sellerProductId: Scalars['String']['input'];
};

export type BulkTranslationInput = {
  entityIds: Array<Scalars['Int']['input']>;
  entityType: Scalars['String']['input'];
  sourceLocale: Scalars['String']['input'];
  targetLocales: Array<Scalars['String']['input']>;
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
  availableStock?: Maybe<Scalars['Int']['output']>;
  cartId: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  productId: Scalars['String']['output'];
  productImage?: Maybe<Scalars['String']['output']>;
  productInfoId?: Maybe<Scalars['String']['output']>;
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  sellerId: Scalars['String']['output'];
  sellerName?: Maybe<Scalars['String']['output']>;
  sellerProductId?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['String']['output']>;
  totalPrice: Scalars['Float']['output'];
  unitPrice: Scalars['Float']['output'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Color = {
  __typename?: 'Color';
  createdAt: Scalars['DateTime']['output'];
  hexCode: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCategoryInput = {
  slug: Scalars['String']['input'];
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateColorInput = {
  hexCode: Scalars['String']['input'];
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateCurrencyInput = {
  code: Scalars['String']['input'];
  decimalPlaces: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isBaseCurrency?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  symbol: Scalars['String']['input'];
};

export type CreateOrderInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  customerEmail: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  customerPhone: Scalars['String']['input'];
  items: Array<CreateOrderItemInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  sellerId: Scalars['Int']['input'];
  shippingAddress: Scalars['String']['input'];
  shippingCost?: InputMaybe<Scalars['Float']['input']>;
  state: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type CreateOrderItemInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  productId: Scalars['String']['input'];
  productImage?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  sellerProductId?: InputMaybe<Scalars['String']['input']>;
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
  shippingFee?: InputMaybe<Scalars['Float']['input']>;
  storeName: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateSellerProductInput = {
  costPrice: Scalars['Float']['input'];
  discount: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
  productInfoId: Scalars['Int']['input'];
  recommended?: InputMaybe<Scalars['Boolean']['input']>;
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

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  decimalPlaces: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isBaseCurrency: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CurrencyPreference = {
  __typename?: 'CurrencyPreference';
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  locale: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CustomerProfile = {
  __typename?: 'CustomerProfile';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  effectiveDate: Scalars['DateTime']['output'];
  fromCurrency: Currency;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  rate: Scalars['Float']['output'];
  toCurrency: Currency;
};

export type GatewayUrlResponse = {
  __typename?: 'GatewayUrlResponse';
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: Cart;
  adminCreateUser: User;
  archiveProduct: Product;
  bulkTranslateEntities: Scalars['Boolean']['output'];
  clearCart: Cart;
  createCategory: Category;
  createColor: Color;
  createCurrency: Currency;
  createMySellerProduct: SellerProduct;
  createOrder: Order;
  createProduct: Product;
  createProductInfo: Product;
  createSeller: SellerInfo;
  createSellerProduct: SellerProduct;
  createUser: User;
  deleteCategory: Scalars['Boolean']['output'];
  deleteColor: Scalars['Boolean']['output'];
  deleteCurrencyPreference: Scalars['Boolean']['output'];
  deleteEntityTranslations: Scalars['Boolean']['output'];
  deleteOrder: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  getZarinPalGatewayUrl: GatewayUrlResponse;
  initiatePasswordSetup: Scalars['Boolean']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  register: User;
  removeFromCart: Cart;
  removeProductInfoImage: Scalars['Boolean']['output'];
  requestZarinPalPayment: ZarinPalPaymentResponse;
  resetPassword: User;
  setCurrencyPreference: CurrencyPreference;
  setExchangeRate: ExchangeRate;
  setTranslation: Translation;
  setupPassword: User;
  toggleSellerActive: SellerInfo;
  unarchiveProduct: Product;
  updateCartItem: Cart;
  updateCategory: Category;
  updateColor: Color;
  updateCurrency: Currency;
  updateMyProfile: CustomerProfile;
  updateMySellerProduct: SellerProduct;
  updateOrder: Order;
  updateOrderStatus: Order;
  updateProduct: Product;
  updateSeller: SellerInfo;
  updateSellerProduct: SellerProduct;
  uploadProductInfoImages: Array<Scalars['String']['output']>;
  verifyZarinPalPayment: ZarinPalVerificationResponse;
};


export type MutationAddToCartArgs = {
  addToCartInput: AddToCartInput;
};


export type MutationAdminCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationArchiveProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationBulkTranslateEntitiesArgs = {
  input: BulkTranslationInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateColorArgs = {
  input: CreateColorInput;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCurrencyArgs = {
  input: CreateCurrencyInput;
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


export type MutationDeleteCurrencyPreferenceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteEntityTranslationsArgs = {
  entityId: Scalars['Int']['input'];
  entityType: Scalars['String']['input'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  baseUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationGetZarinPalGatewayUrlArgs = {
  authority: Scalars['String']['input'];
};


export type MutationInitiatePasswordSetupArgs = {
  baseUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveFromCartArgs = {
  itemId: Scalars['String']['input'];
};


export type MutationRemoveProductInfoImageArgs = {
  imageName: Scalars['String']['input'];
  productInfoId: Scalars['Int']['input'];
};


export type MutationRequestZarinPalPaymentArgs = {
  input: ZarinPalPaymentRequestInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetCurrencyPreferenceArgs = {
  currencyCode: Scalars['String']['input'];
  locale: Scalars['String']['input'];
};


export type MutationSetExchangeRateArgs = {
  input: SetExchangeRateInput;
};


export type MutationSetTranslationArgs = {
  input: TranslationInput;
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


export type MutationUpdateCurrencyArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCurrencyInput;
};


export type MutationUpdateMyProfileArgs = {
  input: UpdateCustomerProfileInput;
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


export type MutationVerifyZarinPalPaymentArgs = {
  input: ZarinPalVerificationRequestInput;
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
  paymentAmount?: Maybe<Scalars['Float']['output']>;
  paymentAuthority?: Maybe<Scalars['String']['output']>;
  paymentCurrency?: Maybe<Scalars['String']['output']>;
  sellerAddress?: Maybe<Scalars['String']['output']>;
  sellerId: Scalars['Int']['output'];
  sellerPhone?: Maybe<Scalars['String']['output']>;
  sellerStoreName?: Maybe<Scalars['String']['output']>;
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
  discountPercentage?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  orderId: Scalars['String']['output'];
  originalPrice?: Maybe<Scalars['Float']['output']>;
  productId: Scalars['String']['output'];
  productImage?: Maybe<Scalars['String']['output']>;
  productInfoId?: Maybe<Scalars['Int']['output']>;
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  sellerProductId?: Maybe<Scalars['String']['output']>;
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
  sellerProducts?: Maybe<Array<SellerProduct>>;
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
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  calculateShippingCost: ShippingCalculationResult;
  categories: Array<Category>;
  color?: Maybe<Color>;
  colors: Array<Color>;
  currencies: Array<Currency>;
  currency?: Maybe<Currency>;
  currencyByCode?: Maybe<Currency>;
  currencyPreferenceByLocale?: Maybe<CurrencyPreference>;
  currencyPreferences: Array<CurrencyPreference>;
  currentExchangeRate?: Maybe<ExchangeRate>;
  exchangeRateHistory: Array<ExchangeRate>;
  findOne?: Maybe<SellerInfo>;
  getEntityTranslations: Array<Translation>;
  getTranslation: Scalars['String']['output'];
  getTranslationWithFallback: Scalars['String']['output'];
  me?: Maybe<User>;
  myCart: Cart;
  myOrders: Array<Order>;
  myProfile: CustomerProfile;
  mySellerOrders: Array<SellerOrder>;
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


export type QueryCalculateShippingCostArgs = {
  cartSubtotal: Scalars['Float']['input'];
  sellerShippingFees: Array<SellerShippingInfoInput>;
};


export type QueryColorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCurrencyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCurrencyByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryCurrencyPreferenceByLocaleArgs = {
  locale: Scalars['String']['input'];
};


export type QueryCurrentExchangeRateArgs = {
  fromCurrencyCode: Scalars['String']['input'];
  toCurrencyCode: Scalars['String']['input'];
};


export type QueryExchangeRateHistoryArgs = {
  fromCurrencyCode: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  toCurrencyCode: Scalars['String']['input'];
};


export type QueryFindOneArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetEntityTranslationsArgs = {
  entityId: Scalars['Int']['input'];
  entityType: Scalars['String']['input'];
};


export type QueryGetTranslationArgs = {
  entityId: Scalars['Int']['input'];
  entityType: Scalars['String']['input'];
  fallback?: InputMaybe<Scalars['String']['input']>;
  fieldName: Scalars['String']['input'];
  locale: Scalars['String']['input'];
};


export type QueryGetTranslationWithFallbackArgs = {
  entityId: Scalars['Int']['input'];
  entityType: Scalars['String']['input'];
  fallback: Scalars['String']['input'];
  fieldName: Scalars['String']['input'];
  locale: Scalars['String']['input'];
};


export type QueryMyOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
};


export type QueryMySellerOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
};


export type QueryMySellerProductByIdArgs = {
  id: Scalars['String']['input'];
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
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  shippingFee: Scalars['Float']['output'];
  storeName: Scalars['String']['output'];
  user: User;
};

export type SellerOrder = {
  __typename?: 'SellerOrder';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  notes?: Maybe<Scalars['String']['output']>;
  orderNumber: Scalars['String']['output'];
  sellerAddress?: Maybe<Scalars['String']['output']>;
  sellerId: Scalars['Int']['output'];
  sellerPhone?: Maybe<Scalars['String']['output']>;
  sellerStoreName?: Maybe<Scalars['String']['output']>;
  shippingCost: Scalars['Float']['output'];
  status: OrderStatus;
  subtotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SellerProduct = {
  __typename?: 'SellerProduct';
  costPrice?: Maybe<Scalars['Float']['output']>;
  discount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  product: Product;
  productInfo: ProductInfo;
  productInfoId: Scalars['Int']['output'];
  recommended: Scalars['Boolean']['output'];
  seller?: Maybe<SellerInfo>;
  stockQuantity: Scalars['Int']['output'];
};

export type SellerShippingBreakdown = {
  __typename?: 'SellerShippingBreakdown';
  appliedFee: Scalars['Float']['output'];
  originalFee: Scalars['Float']['output'];
  sellerId: Scalars['String']['output'];
  sellerName?: Maybe<Scalars['String']['output']>;
};

export type SellerShippingInfoInput = {
  sellerId: Scalars['String']['input'];
  sellerName?: InputMaybe<Scalars['String']['input']>;
  shippingFee: Scalars['Float']['input'];
};

export type SetExchangeRateInput = {
  effectiveDate?: InputMaybe<Scalars['DateTime']['input']>;
  fromCurrencyCode: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  rate: Scalars['Float']['input'];
  toCurrencyCode: Scalars['String']['input'];
};

export type ShippingCalculationResult = {
  __typename?: 'ShippingCalculationResult';
  freeShippingApplied: Scalars['Boolean']['output'];
  shippingBreakdown?: Maybe<Array<SellerShippingBreakdown>>;
  strategyUsed: Scalars['String']['output'];
  totalShippingCost: Scalars['Float']['output'];
};

export type Translation = {
  __typename?: 'Translation';
  createdAt: Scalars['DateTime']['output'];
  entityId: Scalars['Int']['output'];
  entityType: Scalars['String']['output'];
  fieldName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isAutoTranslated: Scalars['Boolean']['output'];
  locale: Scalars['String']['output'];
  translatedBy?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type TranslationInput = {
  entityId: Scalars['Int']['input'];
  entityType: Scalars['String']['input'];
  fieldName: Scalars['String']['input'];
  isAutoTranslated?: InputMaybe<Scalars['Boolean']['input']>;
  locale: Scalars['String']['input'];
  translatedBy?: InputMaybe<Scalars['Int']['input']>;
  value: Scalars['String']['input'];
};

export type UpdateCartItemInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateColorInput = {
  hexCode: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCurrencyInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  decimalPlaces?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isBaseCurrency?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerProfileInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
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
  sellerProductId?: InputMaybe<Scalars['String']['input']>;
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
  shippingFee?: InputMaybe<Scalars['Float']['input']>;
  storeName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSellerProductInput = {
  costPrice?: InputMaybe<Scalars['Float']['input']>;
  discount?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  productInfoId?: InputMaybe<Scalars['Int']['input']>;
  recommended?: InputMaybe<Scalars['Boolean']['input']>;
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
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

export type ZarinPalPaymentRequestInput = {
  amount: Scalars['Int']['input'];
  callback_url: Scalars['String']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  order_id?: InputMaybe<Scalars['String']['input']>;
};

export type ZarinPalPaymentResponse = {
  __typename?: 'ZarinPalPaymentResponse';
  authority: Scalars['String']['output'];
  code: Scalars['Int']['output'];
  fee?: Maybe<Scalars['Int']['output']>;
  fee_type?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type ZarinPalVerificationRequestInput = {
  amount: Scalars['Int']['input'];
  authority: Scalars['String']['input'];
  order_id?: InputMaybe<Scalars['String']['input']>;
};

export type ZarinPalVerificationResponse = {
  __typename?: 'ZarinPalVerificationResponse';
  card_hash?: Maybe<Scalars['String']['output']>;
  card_pan?: Maybe<Scalars['String']['output']>;
  code: Scalars['Int']['output'];
  fee?: Maybe<Scalars['Int']['output']>;
  fee_type?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  ref_id?: Maybe<Scalars['Int']['output']>;
};
