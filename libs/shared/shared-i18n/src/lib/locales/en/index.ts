import type { BaseTranslation } from '../i18n-types';

const en = {
  // Common UI elements
  button: {
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    close: 'Close',
    next: 'Next',
    back: 'Back',
    login: 'Login',
    logout: 'Logout',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    placeOrder: 'Place Order',
    viewDetails: 'View Details',
    editVariant: 'Edit this variant',
    addNewProduct: 'Add New Product',
    addNewCategory: 'Add New Category',
    addNewColor: 'Add New Color',
    chooseProduct: 'Choose a product',
    chooseVariant: 'Choose a variant',
    updateStatus: 'Update Status',
    filterByStatus: 'Filter by Status',
    changeOrderStatus: 'Change Order Status',
  },
  
  // Navigation and menu items
  navigation: {
    home: 'Home',
    products: 'Products',
    orders: 'Orders',
    contact: 'Contact',
    shoppingCart: 'Shopping Cart',
    cart: 'Cart',
    sellers: 'Sellers',
    adminPanel: 'Kickzone Admin Panel',
    sellersPortal: 'Sellers Portal',
  },

  // Form labels and placeholders
  form: {
    email: 'Email Address',
    password: 'Password',
    fullName: 'Full Name',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    country: 'Country',
    notes: 'Notes (Optional)',
    searchProducts: 'Search products...',
    category: 'Category',
    color: 'Color',
    price: 'Price ($)',
    costPrice: 'Cost Price ($)',
    discount: 'Discount (%)',
    stockQuantity: 'Stock Quantity',
    categoryName: 'Category Name',
    productName: 'Product Name',
    description: 'Description',
    sortBy: 'Sort By',
    order: 'Order',
    status: 'Status',
    trackingNumber: 'Enter tracking number',
    newStatus: 'New Status',
  },

  // Table headers and data
  table: {
    product: 'Product',
    quantity: 'Quantity',
    unitPrice: 'Unit Price',
    total: 'Total',
    dateCreated: 'Date Created',
    name: 'Name',
    price: 'Price',
    allOrders: 'All Orders',
    allCategories: 'All Categories',
    all: 'All',
    active: 'Active',
    archived: 'Archived',
    default: 'Default',
  },

  // Checkout and cart
  checkout: {
    reviewCart: 'Review Cart',
    shippingInformation: 'Shipping Information',
    orderSummary: 'Order Summary',
    demoCheckout: 'This is a demo checkout. No payment is required.',
    orderProcessed: 'Your order will be processed and you will receive a confirmation email.',
    itemRemoved: 'Item removed',
    itemRemovedMessage: 'Item has been removed from your cart',
    quantityUpdated: 'Quantity updated',
    quantityUpdatedMessage: 'Item quantity has been updated',
  },

  // Product management
  products: {
    loadingProducts: 'Loading your products...',
    noProductsFound: 'No products found',
    productVariants: 'Product Variants',
    colors: 'Colors',
    selectImages: 'Select Images',
    saveProductFirst: 'You must save the product before selecting images.',
    editCategory: 'Edit Category',
  },

  // Status and states
  status: {
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
  },

  // Messages and notifications
  messages: {
    welcome: 'Welcome to Kickzone',
    itemAdded: 'Item added to cart',
    itemRemoved: 'Item removed from cart',
    quantityUpdated: 'Quantity updated',
    orderPlaced: 'Order placed successfully',
    productSaved: 'Product saved successfully',
    categoryAdded: 'Category added successfully',
    colorAdded: 'Color added successfully',
  },

  // Authorization
  authorization: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    verifyEmail: 'Verify Email',
    resendVerificationEmail: 'Resend Verification Email',
    emailVerification: 'Email Verification',
    emailVerificationSent: 'Email Verification Sent',
    emailVerificationFailed: 'Email Verification Failed',
    emailVerificationSuccess: 'Email Verification Success',
    wrongEmailOrPassword: 'Wrong Email or Password',
  },

  // Errors
  errors: {
    unauthorized: 'You are not authorized. Please log in.',
    unknown: 'An unknown error occurred. Please try again.',
    requiredFields: 'Please fill in all required fields',
    networkError: 'Network error. Please check your connection.',
    serverError: 'Server error. Please try again later.',
  },

  // Common greetings and text
  greeting: 'Hello',
  welcome: 'Welcome',
  thankYou: 'Thank you',
  please: 'Please',
  optional: 'Optional',
  required: 'Required',
} satisfies BaseTranslation;

export default en;
