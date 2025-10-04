import type { BaseTranslation } from '../i18n-types';

const fa = {
  // Common UI elements
  button: {
    submit: 'ارسال',
    cancel: 'لغو',
    save: 'ذخیره',
    edit: 'ویرایش',
    delete: 'حذف',
    add: 'افزودن',
    close: 'بستن',
    next: 'بعدی',
    back: 'قبلی',
    login: 'ورود',
    logout: 'خروج',
    signIn: 'ورود',
    signUp: 'ثبت نام',
    placeOrder: 'ثبت سفارش',
    viewDetails: 'مشاهده جزئیات',
    editVariant: 'ویرایش این نوع',
    addNewProduct: 'افزودن محصول جدید',
    addNewCategory: 'افزودن دسته‌بندی جدید',
    addNewColor: 'افزودن رنگ جدید',
    chooseProduct: 'انتخاب محصول',
    chooseVariant: 'انتخاب نوع',
    updateStatus: 'به‌روزرسانی وضعیت',
    filterByStatus: 'فیلتر بر اساس وضعیت',
    changeOrderStatus: 'تغییر وضعیت سفارش',
  },

  // Navigation and menu items
  navigation: {
    home: 'خانه',
    products: 'محصولات',
    orders: 'سفارشات',
    contact: 'تماس',
    shoppingCart: 'سبد خرید',
    cart: 'سبد',
    sellers: 'فروشندگان',
    adminPanel: 'پنل مدیریت کیک‌زون',
    sellersPortal: 'پورتال فروشندگان',
  },

  // Form labels and placeholders
  form: {
    email: 'آدرس ایمیل',
    password: 'رمز عبور',
    fullName: 'نام کامل',
    phone: 'تلفن',
    address: 'آدرس',
    city: 'شهر',
    state: 'استان',
    zipCode: 'کد پستی',
    country: 'کشور',
    notes: 'یادداشت (اختیاری)',
    searchProducts: 'جستجوی محصولات...',
    category: 'دسته‌بندی',
    color: 'رنگ',
    price: 'قیمت ($)',
    costPrice: 'قیمت تمام شده ($)',
    discount: 'تخفیف (%)',
    stockQuantity: 'موجودی انبار',
    categoryName: 'نام دسته‌بندی',
    productName: 'نام محصول',
    description: 'توضیحات',
    sortBy: 'مرتب‌سازی بر اساس',
    order: 'ترتیب',
    status: 'وضعیت',
    trackingNumber: 'شماره پیگیری را وارد کنید',
    newStatus: 'وضعیت جدید',
  },

  // Table headers and data
  table: {
    product: 'محصول',
    quantity: 'تعداد',
    unitPrice: 'قیمت واحد',
    total: 'مجموع',
    dateCreated: 'تاریخ ایجاد',
    name: 'نام',
    price: 'قیمت',
    allOrders: 'همه سفارشات',
    allCategories: 'همه دسته‌بندی‌ها',
    all: 'همه',
    active: 'فعال',
    archived: 'بایگانی شده',
    default: 'پیش‌فرض',
  },

  // Checkout and cart
  checkout: {
    reviewCart: 'بررسی سبد خرید',
    shippingInformation: 'اطلاعات ارسال',
    orderSummary: 'خلاصه سفارش',
    demoCheckout: 'این یک چک‌اوت آزمایشی است. پرداختی لازم نیست.',
    orderProcessed:
      'سفارش شما پردازش خواهد شد و ایمیل تایید دریافت خواهید کرد.',
    itemRemoved: 'آیتم حذف شد',
    itemRemovedMessage: 'آیتم از سبد خرید شما حذف شد',
    quantityUpdated: 'تعداد به‌روزرسانی شد',
    quantityUpdatedMessage: 'تعداد آیتم به‌روزرسانی شد',
  },

  // Product management
  products: {
    loadingProducts: 'در حال بارگذاری محصولات شما...',
    noProductsFound: 'محصولی یافت نشد',
    productVariants: 'انواع محصول',
    colors: 'رنگ‌ها',
    selectImages: 'انتخاب تصاویر',
    saveProductFirst: 'ابتدا باید محصول را ذخیره کنید.',
    editCategory: 'ویرایش دسته‌بندی',
  },

  // Status and states
  status: {
    loading: 'در حال بارگذاری...',
    success: 'موفق',
    error: 'خطا',
    warning: 'هشدار',
    info: 'اطلاعات',
  },

  // Messages and notifications
  messages: {
    welcome: 'به کیک‌زون خوش آمدید',
    itemAdded: 'آیتم به سبد خرید اضافه شد',
    itemRemoved: 'آیتم از سبد خرید حذف شد',
    quantityUpdated: 'تعداد به‌روزرسانی شد',
    orderPlaced: 'سفارش با موفقیت ثبت شد',
    productSaved: 'محصول با موفقیت ذخیره شد',
    categoryAdded: 'دسته‌بندی با موفقیت اضافه شد',
    colorAdded: 'رنگ با موفقیت اضافه شد',
  },

  // Authorization
  authorization: {
    signIn: 'ورود',
    signUp: 'ثبت نام',
    forgotPassword: 'فراموشی رمز عبور',
    resetPassword: 'بازیابی رمز عبور',
    verifyEmail: 'تایید ایمیل',
    resendVerificationEmail: 'ارسال مجدد تایید ایمیل',
    emailVerification: 'تایید ایمیل',
    emailVerificationSent: 'ایمیل تایید ارسال شد',
    emailVerificationFailed: 'تایید ایمیل ناموفق',
    emailVerificationSuccess: 'تایید ایمیل با موفقیت انجام شد',
    wrongEmailOrPassword: 'ایمیل یا رمز عبور اشتباه است',
  },

  // Errors
  errors: {
    unauthorized: 'شما مجاز نیستید. لطفا وارد شوید.',
    unknown: 'خطای ناشناخته‌ای رخ داده است. لطفا دوباره تلاش کنید.',
    requiredFields: 'لطفا همه فیلدهای ضروری را پر کنید',
    networkError: 'خطای شبکه. لطفا اتصال خود را بررسی کنید.',
    serverError: 'خطای سرور. لطفا بعدا تلاش کنید.',
  },

  // Common greetings and text
  greeting: 'سلام',
  welcome: 'خوش آمدید',
  thankYou: 'متشکرم',
  please: 'لطفا',
  optional: 'اختیاری',
  required: 'ضروری',
} satisfies BaseTranslation;

export default fa;
