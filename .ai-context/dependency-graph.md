flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.ts"]
end
5["main.ts"]
end
end
end
subgraph 6["libs"]
subgraph 7["client"]
subgraph 8["admins"]
subgraph 9["components"]
subgraph A["footer"]
subgraph B["src"]
C["index.ts"]
subgraph D["lib"]
E["admins-footer.tsx"]
F["admins-footer.spec.tsx"]
end
end
end
subgraph G["headerbar"]
subgraph H["src"]
I["index.ts"]
subgraph J["lib"]
K["AdminsHeaderbar.tsx"]
L["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph M["layout"]
subgraph N["src"]
O["index.ts"]
subgraph P["lib"]
Q["AdminsLayout.tsx"]
R["AdminsTabbar.tsx"]
S["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph T["contexts"]
subgraph U["src"]
V["index.spec.tsx"]
W["index.ts"]
subgraph X["lib"]
Y["AdminsAuthContext.tsx"]
Z["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 10["graphql"]
subgraph 11["src"]
12["index.ts"]
subgraph 13["lib"]
14["fragments.ts"]
15["mutations.ts"]
16["orders.graphql.ts"]
17["Provider.tsx"]
18["AdminsApolloProvider.tsx"]
19["client.ts"]
1A["queries.ts"]
1B["Provider.spec.tsx"]
1C["apollo-upload-client.d.ts"]
1D["client.spec.tsx"]
1E["fragments.spec.tsx"]
1F["mutations.spec.tsx"]
1G["queries.spec.tsx"]
end
subgraph 1H["types"]
1I["apollo-upload-client.d.ts"]
end
end
end
subgraph 1J["hooks"]
subgraph 1K["auth"]
subgraph 1L["src"]
1M["index.ts"]
subgraph 1N["lib"]
1O["useAdminLogin.ts"]
1P["useAdminLogin.spec.ts"]
1Q["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1R["currency-management"]
subgraph 1S["src"]
1T["index.ts"]
subgraph 1U["lib"]
1V["useAdminsCurrencyManagement.ts"]
end
end
1W["vite.config.ts"]
end
subgraph 1X["customers"]
subgraph 1Y["src"]
1Z["index.ts"]
subgraph 20["lib"]
21["adminsCustomers.graphql.ts"]
22["useAdminsCustomers.ts"]
23["useAdminsCustomers.spec.tsx"]
end
end
24["vite.config.ts"]
end
subgraph 25["orders"]
subgraph 26["src"]
27["index.ts"]
subgraph 28["lib"]
29["admins-orders-hook.tsx"]
2A["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2B["sellers"]
subgraph 2C["src"]
2D["index.ts"]
subgraph 2E["lib"]
2F["useAdminsSellers.ts"]
2G["adminsSellers.graphql.ts"]
2H["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2I["router"]
subgraph 2J["src"]
2K["index.ts"]
subgraph 2L["lib"]
2M["AdminsRouter.tsx"]
2N["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2O["routes"]
subgraph 2P["src"]
2Q["index.spec.ts"]
2R["index.ts"]
subgraph 2S["lib"]
2T["admin-routes.ts"]
2U["admin-routes.spec.ts"]
end
end
end
subgraph 2V["screens"]
subgraph 2W["admin-seller-orders"]
subgraph 2X["src"]
2Y["index.spec.tsx"]
2Z["index.ts"]
subgraph 30["lib"]
31["admin-seller-orders.tsx"]
32["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 33["currency-management"]
subgraph 34["src"]
35["index.ts"]
subgraph 36["lib"]
37["currency-management.tsx"]
38["currency-management.spec.tsx"]
end
end
end
subgraph 39["customer-management"]
subgraph 3A["src"]
3B["index.ts"]
subgraph 3C["lib"]
3D["admin-customer-management.tsx"]
3E["admin-customer-management.spec.tsx"]
end
end
3F["vite.config.ts"]
end
subgraph 3G["login"]
subgraph 3H["src"]
3I["index.ts"]
subgraph 3J["lib"]
3K["AdminsLogin.tsx"]
3L["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3M["product-editor"]
subgraph 3N["src"]
3O["index.spec.tsx"]
3P["index.ts"]
subgraph 3Q["lib"]
3R["AdminProductEditor.tsx"]
3S["AdminProductEditor.pants-range.spec.tsx"]
3T["AdminProductEditor.spec.tsx"]
end
3U["vite-env.d.ts"]
end
end
subgraph 3V["products"]
subgraph 3W["src"]
3X["index.spec.tsx"]
3Y["index.ts"]
subgraph 3Z["lib"]
40["AdminProducts.tsx"]
41["adminProducts.hooks.ts"]
42["adminProducts.graphql.ts"]
43["ProductImageManagementModal.tsx"]
44["AdminProducts.spec.tsx"]
45["ProductImageManagementModal.spec.tsx"]
end
46["vite-env.d.ts"]
end
end
subgraph 47["seller-management"]
subgraph 48["src"]
49["index.spec.tsx"]
4A["index.ts"]
subgraph 4B["lib"]
4C["SellerManagement.tsx"]
4D["SellerManagement.spec.tsx"]
end
4E["vite-env.d.ts"]
end
end
subgraph 4F["translation-management"]
subgraph 4G["src"]
4H["index.ts"]
subgraph 4I["lib"]
4J["AdminTranslationManagement.tsx"]
4K["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4L["unauthorized"]
subgraph 4M["src"]
4N["index.spec.tsx"]
4O["index.ts"]
subgraph 4P["lib"]
4Q["admins-unauthorized-screen.tsx"]
4R["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4S["zustand"]
subgraph 4T["admins-products-store"]
subgraph 4U["src"]
4V["index.spec.ts"]
4W["index.ts"]
subgraph 4X["lib"]
4Y["admins-products-store.ts"]
4Z["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 50["customers"]
subgraph 51["components"]
subgraph 52["footer"]
subgraph 53["src"]
54["index.ts"]
subgraph 55["lib"]
56["customers-footer.tsx"]
57["TrustBadgeIcons.tsx"]
58["customers-footer.spec.tsx"]
end
end
end
subgraph 59["headerbar"]
subgraph 5A["src"]
5B["index.ts"]
subgraph 5C["lib"]
5D["CustomersHeaderbar.tsx"]
5E["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5F["layout"]
subgraph 5G["src"]
5H["index.ts"]
subgraph 5I["lib"]
5J["CustomersLayout.tsx"]
5K["CustomersTabbar.tsx"]
5L["CustomersLayout.spec.tsx"]
5M["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5N["product-card"]
subgraph 5O["src"]
5P["index.ts"]
subgraph 5Q["lib"]
5R["CustomersProductCard.tsx"]
5S["CustomersProductCard.spec.tsx"]
end
5T["vite-env.d.ts"]
end
end
end
subgraph 5U["contexts"]
subgraph 5V["auth"]
subgraph 5W["src"]
5X["index.ts"]
subgraph 5Y["lib"]
5Z["CustomersAuthContext.tsx"]
60["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 61["graphql"]
subgraph 62["src"]
63["index.ts"]
subgraph 64["lib"]
65["customer-profile.queries.ts"]
66["mutations.ts"]
67["Provider.tsx"]
68["CustomersApolloProvider.tsx"]
69["client.ts"]
6A["queries.ts"]
6B["apollo-upload-client.d.ts"]
end
end
end
subgraph 6C["hooks"]
subgraph 6D["auth"]
subgraph 6E["src"]
6F["index.ts"]
subgraph 6G["lib"]
6H["useCustomersForgotPassword.tsx"]
6I["useCustomersLogin.tsx"]
6J["useCustomersRegister.tsx"]
6K["useCustomersResetPassword.tsx"]
6L["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6M["cart"]
6N["jest.config.ts"]
6O["jest.setup.ts"]
subgraph 6P["src"]
6Q["index.ts"]
subgraph 6R["lib"]
6S["customers-cart-hook.tsx"]
6T["useCartService.ts"]
6U["useWishlistSync.ts"]
6V["useCartService.spec.tsx"]
6W["useCartSync.ts"]
end
end
end
subgraph 6X["orders"]
subgraph 6Y["src"]
6Z["index.ts"]
subgraph 70["lib"]
71["customers-orders-hook.tsx"]
end
end
end
subgraph 72["products"]
subgraph 73["src"]
74["index.ts"]
subgraph 75["lib"]
76["customers-product-hook.tsx"]
end
end
end
end
subgraph 77["router"]
subgraph 78["src"]
79["index.ts"]
subgraph 7A["lib"]
7B["CustomersRouter.tsx"]
7C["ScrollToTop.tsx"]
7D["CustomersRouter.spec.tsx"]
7E["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7F["routes"]
subgraph 7G["src"]
7H["index.ts"]
subgraph 7I["lib"]
7J["customer-routes.ts"]
7K["customer-routes.spec.ts"]
end
end
end
subgraph 7L["screens"]
subgraph 7M["contact"]
subgraph 7N["src"]
7O["index.ts"]
subgraph 7P["lib"]
7Q["customer-contact.tsx"]
7R["customer-contact.spec.tsx"]
end
end
7S["vite.config.ts"]
end
subgraph 7T["customer-checkout"]
subgraph 7U["src"]
7V["index.ts"]
subgraph 7W["lib"]
7X["customer-checkout.tsx"]
end
end
end
subgraph 7Y["customer-favorites"]
subgraph 7Z["src"]
80["index.ts"]
subgraph 81["lib"]
82["customer-favorites.tsx"]
83["customer-favorites.spec.tsx"]
end
end
84["vite.config.ts"]
end
subgraph 85["customer-login"]
subgraph 86["src"]
87["index.ts"]
subgraph 88["lib"]
89["customer-login.tsx"]
end
end
end
subgraph 8A["customer-order-confirmation"]
subgraph 8B["src"]
8C["index.ts"]
subgraph 8D["lib"]
8E["customer-order-confirmation.tsx"]
8F["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8G["customer-orders"]
subgraph 8H["src"]
8I["index.ts"]
subgraph 8J["lib"]
8K["customer-orders.tsx"]
end
end
end
subgraph 8L["customer-payment"]
subgraph 8M["src"]
8N["index.ts"]
subgraph 8O["lib"]
8P["customer-payment-callback.tsx"]
8Q["use-zarinpal-payment.tsx"]
8R["zarinpal-payment-service.ts"]
8S["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 8T["customer-products"]
subgraph 8U["src"]
8V["index.ts"]
subgraph 8W["lib"]
8X["customer-products.tsx"]
end
end
end
subgraph 8Y["customer-profile"]
subgraph 8Z["src"]
90["index.ts"]
subgraph 91["lib"]
92["customer-profile.tsx"]
93["customer-profile.spec.tsx"]
end
end
end
subgraph 94["customer-shopping-cart"]
subgraph 95["src"]
96["index.ts"]
subgraph 97["lib"]
98["customer-shopping-cart.tsx"]
99["customer-shopping-cart.spec.tsx"]
end
end
9A["vite.config.ts"]
end
subgraph 9B["customer-signup"]
subgraph 9C["src"]
9D["index.ts"]
subgraph 9E["lib"]
9F["customer-signup.tsx"]
9G["customer-signup.spec.tsx"]
end
end
end
subgraph 9H["forgot-password"]
subgraph 9I["src"]
9J["index.ts"]
subgraph 9K["lib"]
9L["customer-forgot-password.tsx"]
9M["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9N["guide-authenticity"]
subgraph 9O["src"]
9P["index.ts"]
subgraph 9Q["lib"]
9R["customer-guide-authenticity.tsx"]
9S["customer-guide-authenticity.spec.tsx"]
end
end
9T["vite.config.ts"]
end
subgraph 9U["guide-payment"]
subgraph 9V["src"]
9W["index.ts"]
subgraph 9X["lib"]
9Y["customer-guide-payment.tsx"]
9Z["customer-guide-payment.spec.tsx"]
end
end
A0["vite.config.ts"]
end
subgraph A1["home"]
subgraph A2["src"]
A3["index.ts"]
subgraph A4["lib"]
A5["CustomersHomeScreen.tsx"]
subgraph A6["components"]
A7["CategoryBentoSection.tsx"]
A9["HeroSection.tsx"]
AA["HomeLoadingScreen.tsx"]
AB["PicksRailSection.tsx"]
AC["TrustStripSection.tsx"]
AG["NewArrivalsSection.tsx"]
AH["BrandBlocksSection.tsx"]
AI["NewsletterSection.tsx"]
AJ["ShopTheLookSection.tsx"]
AK["TickerSection.tsx"]
end
A8["home-selectors.ts"]
AD["useScrollProgress.ts"]
AE["CustomersShopScreen.tsx"]
AF["CustomersHomeScreen.spec.tsx"]
end
end
end
subgraph AL["login"]
subgraph AM["src"]
AN["index.ts"]
subgraph AO["lib"]
AP["CustomersLoginScreen.tsx"]
AQ["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AR["not-found"]
subgraph AS["src"]
AT["index.ts"]
subgraph AU["lib"]
AV["customer-not-found.tsx"]
AW["customer-not-found.spec.tsx"]
end
end
AX["vite.config.ts"]
end
subgraph AY["privacy-policy"]
subgraph AZ["src"]
B0["index.ts"]
subgraph B1["lib"]
B2["customer-privacy-policy.tsx"]
B3["customer-privacy-policy.spec.tsx"]
end
end
B4["vite.config.ts"]
end
subgraph B5["product-details"]
subgraph B6["src"]
B7["index.ts"]
subgraph B8["lib"]
B9["customer-product-details.tsx"]
BA["customer-product-details.spec.tsx"]
end
end
BB["vite.config.ts"]
end
subgraph BC["reset-password"]
subgraph BD["src"]
BE["index.ts"]
subgraph BF["lib"]
BG["customer-reset-password.tsx"]
end
end
end
subgraph BH["shipping-returns"]
subgraph BI["src"]
BJ["index.ts"]
subgraph BK["lib"]
BL["customer-shipping-returns.tsx"]
BM["customer-shipping-returns.spec.tsx"]
end
end
BN["vite.config.ts"]
end
subgraph BO["unauthorized"]
subgraph BP["src"]
BQ["index.ts"]
subgraph BR["lib"]
BS["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BT["utility"]
subgraph BU["test"]
subgraph BV["src"]
BW["index.ts"]
subgraph BX["lib"]
BY["customers-test-utility.tsx"]
end
end
end
end
subgraph BZ["validations"]
subgraph C0["src"]
C1["index.ts"]
subgraph C2["lib"]
C3["shipping-validation.ts"]
C4["shipping-validation.spec.tsx"]
C5["shipping-validation.tsx"]
end
end
end
subgraph C6["zustand"]
subgraph C7["customer-cart-store"]
subgraph C8["src"]
C9["index.ts"]
subgraph CA["lib"]
CB["customer-cart-store.ts"]
CC["customer-cart-store.spec.ts"]
CD["customer-cart-store.tsx"]
end
end
end
subgraph CE["customer-checkout-store"]
subgraph CF["src"]
CG["index.ts"]
subgraph CH["lib"]
CI["customer-checkout-store.ts"]
CJ["customer-checkout-store.spec.ts"]
end
end
CK["vite.config.ts"]
end
subgraph CL["customer-wishlist-store"]
subgraph CM["src"]
CN["index.ts"]
subgraph CO["lib"]
CP["customer-wishlist-store.ts"]
CQ["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CR["src"]
CS["index.ts"]
subgraph CT["lib"]
CU["customers-products-store.tsx"]
end
end
end
end
subgraph CV["sellers"]
subgraph CW["components"]
subgraph CX["footer"]
subgraph CY["src"]
CZ["index.ts"]
subgraph D0["lib"]
D1["sellers-footer.tsx"]
D2["sellers-footer.spec.tsx"]
end
end
end
subgraph D3["headerbar"]
subgraph D4["src"]
D5["index.ts"]
subgraph D6["lib"]
D7["SellersHeaderbar.tsx"]
end
end
end
subgraph D8["layout"]
subgraph D9["src"]
DA["index.ts"]
subgraph DB["lib"]
DC["SellersLayout.tsx"]
DD["SellersTabbar.tsx"]
end
end
end
end
subgraph DE["contexts"]
subgraph DF["auth"]
subgraph DG["src"]
DH["index.ts"]
subgraph DI["lib"]
DJ["SellersAuthContext.tsx"]
DK["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DL["graphql"]
subgraph DM["src"]
DN["index.ts"]
subgraph DO["lib"]
DP["fragments.ts"]
DQ["mutations.ts"]
DR["Provider.tsx"]
DS["SellersApolloProvider.tsx"]
DT["client.ts"]
DU["queries.ts"]
DV["seller-orders.graphql.ts"]
DW["apollo-upload-client.d.ts"]
end
subgraph DX["types"]
DY["apollo-upload-client.d.ts"]
end
end
end
subgraph DZ["hooks"]
subgraph E0["auth"]
subgraph E1["src"]
E2["index.ts"]
subgraph E3["lib"]
E4["useSellerAuth.ts"]
E5["sellerAuth.graphql.ts"]
end
end
end
subgraph E6["orders"]
subgraph E7["src"]
E8["index.ts"]
subgraph E9["lib"]
EA["useSellerOrders.ts"]
end
end
end
subgraph EB["products"]
subgraph EC["src"]
ED["index.ts"]
subgraph EE["lib"]
EF["useSellersProductManagement.ts"]
EG["useSellersProducts.ts"]
end
end
end
end
subgraph EH["router"]
subgraph EI["src"]
EJ["index.ts"]
subgraph EK["lib"]
EL["SellersRouter.tsx"]
end
end
end
subgraph EM["routes"]
subgraph EN["src"]
EO["index.ts"]
subgraph EP["lib"]
EQ["seller-routes.ts"]
end
end
end
subgraph ER["screens"]
subgraph ES["catalog"]
subgraph ET["src"]
EU["index.ts"]
subgraph EV["lib"]
EW["SellersCatalogScreens.tsx"]
EX["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph EY["login"]
subgraph EZ["src"]
F0["index.ts"]
subgraph F1["lib"]
F2["SellersLogin.tsx"]
end
end
end
subgraph F3["manage-product"]
subgraph F4["src"]
F5["index.ts"]
subgraph F6["lib"]
F7["SellersManageProductScreen.tsx"]
F8["SellersDefineProductFlow.tsx"]
F9["SellersDefineProductFlow.spec.tsx"]
FA["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FB["products"]
subgraph FC["src"]
FD["index.ts"]
subgraph FE["lib"]
FF["SellersProducts.tsx"]
FG["SellersProducts.spec.tsx"]
end
end
end
subgraph FH["seller-orders"]
FI["jest.config.ts"]
FJ["jest.setup.ts"]
subgraph FK["src"]
FL["index.ts"]
subgraph FM["lib"]
FN["seller-orders-screen.tsx"]
FO["seller-orders-screen.spec.tsx"]
end
FP["test-setup.ts"]
end
end
subgraph FQ["setup-password"]
subgraph FR["src"]
FS["index.ts"]
subgraph FT["lib"]
FU["SellersSetupPassword.tsx"]
end
end
end
subgraph FV["unauthorized"]
subgraph FW["src"]
FX["index.ts"]
subgraph FY["lib"]
FZ["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G0["zustand"]
subgraph G1["sellers-products-store"]
subgraph G2["src"]
G3["index.ts"]
subgraph G4["lib"]
G5["useSellersProductsStore.ts"]
G6["sellers-products-store.tsx"]
end
end
end
end
end
subgraph G7["shared"]
subgraph G8["components"]
subgraph G9["apollo-provider-base"]
subgraph GA["src"]
GB["index.ts"]
subgraph GC["lib"]
GD["ApolloProviderBase.tsx"]
GE["createSilentRefreshAuthLink.ts"]
GF["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GG["error-boundary"]
subgraph GH["src"]
GI["index.ts"]
subgraph GJ["lib"]
GK["error-boundary.tsx"]
GL["error-boundary.spec.tsx"]
end
end
GM["vite.config.ts"]
end
subgraph GN["glassmorphism-container"]
subgraph GO["src"]
GP["index.ts"]
subgraph GQ["lib"]
GR["glassmorphism-container.tsx"]
GS["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GT["layout"]
subgraph GU["src"]
GV["index.ts"]
subgraph GW["lib"]
GX["Layout.tsx"]
end
end
end
subgraph GY["material-data-table"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["material-data-table.tsx"]
H3["table-config.ts"]
H4["table-utils.ts"]
H5["material-data-table.spec.tsx"]
H6["table-types.ts"]
end
end
end
subgraph H7["order-status-chip"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["order-status-chip.tsx"]
HC["order-status-chip.spec.tsx"]
end
end
end
subgraph HD["password-field"]
subgraph HE["src"]
HF["index.ts"]
subgraph HG["lib"]
HH["PasswordTextField.tsx"]
end
end
end
subgraph HI["price-display"]
subgraph HJ["src"]
HK["index.ts"]
subgraph HL["lib"]
HM["price-display.tsx"]
HN["price-display.spec.tsx"]
end
end
end
subgraph HO["private-route"]
subgraph HP["src"]
HQ["index.ts"]
subgraph HR["lib"]
HS["createPrivateRoute.tsx"]
HT["PrivateRoute.tsx"]
end
end
end
subgraph HU["rtl-table-utils"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["rtl-table-utils.ts"]
HZ["rtl-cell-components.tsx"]
I0["rtl-column-helpers.ts"]
I1["rtl-table-props.ts"]
I2["use-table-alignment.ts"]
I3["rtl-table-utils.spec.tsx"]
I4["rtl-table-utils.tsx"]
end
end
end
subgraph I5["snackbar"]
subgraph I6["src"]
I7["index.ts"]
subgraph I8["lib"]
I9["snackbar.tsx"]
IA["Snackbar.tsx"]
end
end
end
subgraph IB["styled-drawer"]
subgraph IC["src"]
ID["index.ts"]
subgraph IE["lib"]
IF["styled-drawer.tsx"]
IG["styled-drawer.spec.tsx"]
end
end
end
subgraph IH["unauthorized"]
subgraph II["src"]
IJ["index.ts"]
subgraph IK["lib"]
IL["unauthorized-path.tsx"]
end
end
end
end
subgraph IM["graphql"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["currency.mutations.ts"]
IR["currency.queries.ts"]
IS["fragments.ts"]
IT["variant-colors.ts"]
IU["client-shared-graphql.tsx"]
end
end
end
subgraph IV["hooks"]
subgraph IW["brands"]
subgraph IX["src"]
IY["index.ts"]
subgraph IZ["lib"]
J0["brands.graphql.ts"]
J1["useBrands.ts"]
end
end
J2["vite.config.ts"]
end
subgraph J3["categories"]
subgraph J4["src"]
J5["index.ts"]
subgraph J6["lib"]
J7["useCategories.ts"]
J8["categories.graphql.ts"]
end
end
end
subgraph J9["colors"]
subgraph JA["src"]
JB["index.ts"]
subgraph JC["lib"]
JD["useColors.ts"]
JE["color.graphql.ts"]
end
end
end
subgraph JF["currency"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["useConvertPrice.tsx"]
JK["useExchangeRate.tsx"]
JL["useCurrencies.tsx"]
JM["useCurrencyForLocale.tsx"]
JN["useExchangeRate.spec.tsx"]
end
end
end
subgraph JO["products"]
subgraph JP["src"]
JQ["index.ts"]
subgraph JR["lib"]
JS["productImage.ts"]
JT["products.graphql.ts"]
JU["useProducts.ts"]
JV["productImage.spec.ts"]
end
end
end
subgraph JW["site-languages"]
subgraph JX["src"]
JY["index.ts"]
subgraph JZ["lib"]
K0["site-languages.graphql.ts"]
K1["useSiteLanguages.ts"]
K2["site-languages-hook.spec.tsx"]
end
end
K3["vite.config.ts"]
end
subgraph K4["snackbar"]
subgraph K5["src"]
K6["index.ts"]
subgraph K7["lib"]
K8["SnackbarContext.tsx"]
K9["useSnackbar.ts"]
end
end
end
subgraph KA["translations-management-hook"]
subgraph KB["src"]
KC["index.ts"]
subgraph KD["lib"]
KE["useTranslationsManagement.ts"]
end
end
end
end
subgraph KF["lottie"]
subgraph KG["empty-cart"]
subgraph KH["src"]
KI["index.ts"]
subgraph KJ["lib"]
KK["lottie-empty-cart.tsx"]
KL["lottie-empty-cart.spec.tsx"]
end
end
KM["vite.config.ts"]
end
subgraph KN["loading"]
subgraph KO["src"]
KP["index.ts"]
subgraph KQ["lib"]
KR["lottie-loading.tsx"]
KS["lottie-loading.spec.tsx"]
end
end
end
subgraph KT["success-check"]
subgraph KU["src"]
KV["index.ts"]
subgraph KW["lib"]
KX["lottie-success-check.tsx"]
KY["lottie-success-check.spec.tsx"]
end
end
end
subgraph KZ["unauthorized"]
subgraph L0["src"]
L1["index.ts"]
subgraph L2["lib"]
L3["lottie-unauthorized.tsx"]
end
end
end
end
subgraph L4["translations"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["mapApolloErrorToTranslationKey.ts"]
L9["WrapTranslation.tsx"]
end
end
end
subgraph LA["ui"]
subgraph LB["colors"]
subgraph LC["src"]
LD["index.ts"]
subgraph LE["lib"]
LF["colors.ts"]
end
end
end
subgraph LG["language-components"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["language-components.tsx"]
LL["ltr-text-field.tsx"]
end
end
end
subgraph LM["sizes"]
subgraph LN["src"]
LO["index.ts"]
subgraph LP["lib"]
LQ["sizes.ts"]
LR["sizes.spec.tsx"]
LS["sizes.tsx"]
end
end
end
end
subgraph LT["zustand"]
subgraph LU["shared-auth-store"]
subgraph LV["src"]
LW["index.ts"]
subgraph LX["lib"]
LY["shared-auth-store.ts"]
end
end
end
subgraph LZ["shared-notification-store"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["shared-notification-store.tsx"]
end
end
end
subgraph M4["shared-ui-store"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["shared-ui-store.ts"]
M9["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MA["server"]
subgraph MB["controllers"]
subgraph MC["src"]
MD["index.ts"]
subgraph ME["lib"]
MF["auth.controller.ts"]
MG["order.controller.ts"]
end
end
end
subgraph MH["decorators"]
MI["jest.config.ts"]
subgraph MJ["src"]
MK["index.ts"]
subgraph ML["lib"]
MM["current-user.decorator.ts"]
MN["decorators.ts"]
MO["decorators.spec.ts"]
end
end
end
subgraph MP["entities"]
subgraph MQ["src"]
MR["index.ts"]
subgraph MS["lib"]
MT["brand.entity.ts"]
MU["product.entity.ts"]
MV["category.entity.ts"]
MW["product-description.entity.ts"]
MX["site-language.entity.ts"]
MY["product-info.entity.ts"]
MZ["color.entity.ts"]
N0["product-info-color.entity.ts"]
N1["seller-info.entity.ts"]
N2["seller-product.entity.ts"]
N3["user.entity.ts"]
N4["cart.entity.ts"]
N5["currency-preference.entity.ts"]
N6["currency.entity.ts"]
N7["customer.entity.ts"]
N8["exchange-rate.entity.ts"]
N9["order.entity.ts"]
NA["platform-settings.entity.ts"]
NB["refresh-token.entity.ts"]
NC["seller-order.entity.ts"]
ND["translation.entity.ts"]
end
end
end
subgraph NE["guards"]
NF["jest.config.ts"]
subgraph NG["src"]
NH["index.ts"]
subgraph NI["lib"]
NJ["catalog.guard.ts"]
NK["graphql-auth.guard.ts"]
NL["http-auth.guard.ts"]
NM["roles.guard.ts"]
NN["catalog.guard.spec.ts"]
NO["roles.guard.spec.ts"]
end
end
end
subgraph NP["inputs"]
subgraph NQ["src"]
NR["index.ts"]
subgraph NS["lib"]
NT["brand.input.ts"]
NU["cart.inputs.ts"]
NV["category.input.ts"]
NW["color.input.ts"]
NX["customer-auth.inputs.ts"]
NY["order-pagination.inputs.ts"]
NZ["order.inputs.ts"]
O0["product-info-filter.input.ts"]
O1["product.input.ts"]
O2["seller-order-pagination.inputs.ts"]
O3["seller.input.ts"]
O4["site-language.input.ts"]
O5["user.input.ts"]
end
end
end
subgraph O6["modules"]
subgraph O7["src"]
O8["index.ts"]
subgraph O9["lib"]
OA["auth.module.ts"]
OB["email.module.ts"]
OC["token.module.ts"]
OD["user.module.ts"]
OE["customer-profile.module.ts"]
OF["brand.module.ts"]
OG["catalog-guard.module.ts"]
OH["translation.module.ts"]
OI["cart.module.ts"]
OJ["platform-settings.module.ts"]
OK["category.module.ts"]
OL["product.module.ts"]
OM["color.module.ts"]
ON["currency.module.ts"]
OO["graphql-context.module.ts"]
OP["order.module.ts"]
OQ["seller-info.module.ts"]
OR["payment.module.ts"]
OS["product-info.module.ts"]
OT["seller-products.module.ts"]
OU["site-language.module.ts"]
end
end
end
subgraph OV["resolvers"]
OW["jest.config.ts"]
subgraph OX["src"]
OY["index.ts"]
subgraph OZ["lib"]
P0["auth.resolver.ts"]
P1["brand.resolver.ts"]
P2["cart.resolver.ts"]
P3["category.resolver.ts"]
P4["color.resolver.ts"]
P5["currency.resolver.ts"]
P6["customer-profile.resolver.ts"]
P7["order.resolver.ts"]
P8["payment.resolver.ts"]
P9["product-info.resolver.ts"]
PA["product.resolver.ts"]
PB["seller-info.resolver.ts"]
PC["shipping.resolver.ts"]
PD["site-language.resolver.ts"]
PE["translation.input.ts"]
PF["translation.resolver.ts"]
PG["user.resolver.ts"]
PH["auth.resolver.spec.ts"]
PI["order.resolver.spec.ts"]
PJ["payment.resolver.integration.spec.ts"]
PK["payment.resolver.spec.ts"]
PL["product-info.resolver.spec.ts"]
subgraph PM["types"]
PN["graphql-upload.d.ts"]
end
PO["user.resolver.spec.ts"]
end
end
end
subgraph PP["services"]
PQ["jest.config.ts"]
subgraph PR["src"]
PS["index.ts"]
subgraph PT["lib"]
PU["auth.service.ts"]
PV["brand.service.ts"]
PW["cart.service.ts"]
PX["product-info-colors.util.ts"]
PY["category.service.ts"]
PZ["color.service.ts"]
Q0["currency.service.ts"]
Q1["customer-profile.service.ts"]
Q2["email.service.ts"]
Q3["image-upload.service.ts"]
Q4["order.service.ts"]
Q5["payment-logger.service.ts"]
Q6["payment.service.ts"]
Q7["product.service.ts"]
Q8["seller-info.service.ts"]
Q9["shipping-calculation.service.ts"]
QA["site-language.service.ts"]
QB["token.service.ts"]
QC["translation.service.ts"]
QD["user.service.ts"]
QE["auth.service.spec.ts"]
QF["cart.service.spec.ts"]
QG["order.service.spec.ts"]
QH["product-info-colors.util.spec.ts"]
QI["product.service.pants.spec.ts"]
QJ["product.service.spec.ts"]
QK["relay-connection.spec.ts"]
QL["shipping-calculation.service.spec.ts"]
QM["token.service.spec.ts"]
end
end
end
subgraph QN["strategies"]
subgraph QO["src"]
QP["index.ts"]
subgraph QQ["lib"]
QR["local.strategy.ts"]
end
end
end
subgraph QS["utils"]
subgraph QT["src"]
QU["index.ts"]
subgraph QV["lib"]
QW["email-templates.ts"]
QX["relay-connection.ts"]
QY["pagination.ts"]
end
end
end
end
subgraph QZ["shared"]
subgraph R0["codegen"]
R1["jest.config.ts"]
subgraph R2["src"]
R3["index.ts"]
subgraph R4["lib"]
subgraph R5["generated"]
R6["graphql.ts"]
end
end
end
end
subgraph R7["graphql-schema"]
R8["jest.config.ts"]
subgraph R9["src"]
RA["index.ts"]
end
end
subgraph RB["product-sizes"]
subgraph RC["src"]
RD["index.ts"]
subgraph RE["lib"]
RF["product-sizes.ts"]
RG["product-sizes.pants-formats.spec.ts"]
RH["product-sizes.pants-label.spec.ts"]
RI["product-sizes.pants-strict.spec.ts"]
RJ["product-sizes.spec.ts"]
end
end
end
subgraph RK["shared-i18n"]
subgraph RL["src"]
RM["index.ts"]
subgraph RN["lib"]
RO["language-context.tsx"]
RP["language-detector.ts"]
subgraph RQ["locales"]
RR["i18n-react.tsx"]
RS["i18n-util.ts"]
RT["i18n-util.async.ts"]
subgraph RU["en"]
RV["index.ts"]
end
subgraph RX["fa"]
RY["index.ts"]
end
RZ["formatters.ts"]
S0["i18n-types.ts"]
S1["i18n-util.sync.ts"]
S2["navigator-detector.ts"]
end
RW["site-name.ts"]
S3["table-localization.ts"]
S4["theme-provider.tsx"]
S5["use-page-title.ts"]
end
end
end
end
end
5-->4
C-->E
F-->E
I-->K
L-->K
O-->Q
O-->R
Q-->R
S-->Q
V-->W
W-->Y
Z-->Y
12-->14
12-->15
12-->16
12-->17
12-->1A
17-->18
18-->19
1A-->14
1B-->18
1B-->17
1D-->19
1E-->14
1F-->15
1G-->1A
1M-->1O
1P-->1O
1Q-->1O
1T-->1V
1Z-->21
1Z-->22
22-->21
23-->22
27-->29
2A-->29
2D-->2F
2F-->2G
2H-->2F
2K-->2M
2N-->2M
2Q-->2R
2R-->2T
2U-->2T
2Y-->2Z
2Z-->31
32-->31
35-->37
38-->37
3B-->3D
3E-->3D
3I-->3K
3L-->3K
3O-->3P
3P-->3R
3S-->3R
3T-->3R
3X-->3Y
3Y-->40
40-->41
40-->43
41-->42
44-->40
49-->4A
4A-->4C
4D-->4C
4H-->4J
4J-->4K
4N-->4O
4O-->4Q
4R-->4Q
4V-->4W
4W-->4Y
4Z-->4Y
54-->56
54-->57
56-->57
58-->56
5B-->5D
5E-->5D
5H-->5J
5H-->5K
5J-->5K
5L-->5J
5M-->5K
5P-->5R
5S-->5R
5X-->5Z
60-->5Z
63-->65
63-->66
63-->67
63-->6A
67-->68
68-->69
6F-->6H
6F-->6I
6F-->6J
6F-->6K
6L-->6I
6Q-->6S
6Q-->6T
6Q-->6U
6V-->6T
6W-->6S
6Z-->71
74-->76
79-->7B
79-->7C
7B-->7C
7D-->7B
7E-->7C
7H-->7J
7K-->7J
7O-->7Q
7R-->7Q
7V-->7X
80-->82
83-->82
87-->89
8C-->8E
8F-->8E
8I-->8K
8N-->8P
8N-->8Q
8N-->8R
8P-->8Q
8Q-->8R
8S-->8P
8V-->8X
90-->92
93-->92
96-->98
99-->98
9D-->9F
9G-->9F
9J-->9L
9M-->9L
9P-->9R
9S-->9R
9W-->9Y
9Z-->9Y
A3-->A5
A3-->AE
A3-->A8
A3-->AD
A5-->A7
A5-->A9
A5-->AA
A5-->AB
A5-->AC
A5-->A8
A5-->AD
A7-->A8
AE-->A8
AF-->AG
AF-->AB
AF-->A5
AF-->AE
AF-->A8
AH-->A8
AJ-->A8
AN-->AP
AQ-->AP
AT-->AV
AW-->AV
B0-->B2
B3-->B2
B7-->B9
BA-->B9
BE-->BG
BJ-->BL
BM-->BL
BQ-->BS
BW-->BY
C1-->C3
C4-->C3
C4-->C5
C9-->CB
CC-->CB
CG-->CI
CJ-->CI
CN-->CP
CQ-->CP
CS-->CU
CZ-->D1
D2-->D1
D5-->D7
DA-->DC
DA-->DD
DC-->DD
DH-->DJ
DK-->DJ
DN-->DP
DN-->DQ
DN-->DR
DN-->DU
DR-->DS
DS-->DT
DU-->DP
DU-->DV
E2-->E4
E4-->E5
E8-->EA
ED-->EF
ED-->EG
EJ-->EL
EO-->EQ
EU-->EW
EX-->EW
F0-->F2
F5-->F7
F7-->F8
F9-->F8
FA-->F7
FD-->FF
FG-->FF
FL-->FN
FO-->FN
FS-->FU
FX-->FZ
G3-->G5
GB-->GD
GB-->GE
GF-->GE
GI-->GK
GL-->GK
GP-->GR
GS-->GR
GV-->GX
H0-->H2
H0-->H3
H0-->H4
H2-->H3
H5-->H2
H9-->HB
HC-->HB
HF-->HH
HK-->HM
HN-->HM
HQ-->HS
HS-->HT
HW-->HY
HY-->HZ
HY-->I0
HY-->I1
HY-->I2
I0-->HZ
I0-->I1
I3-->I4
I7-->I9
ID-->IF
IG-->IF
IJ-->IL
IO-->IQ
IO-->IR
IO-->IS
IO-->IT
IY-->J0
IY-->J1
J1-->J0
J5-->J7
J7-->J8
JB-->JD
JD-->JE
JH-->JJ
JH-->JL
JH-->JM
JH-->JK
JJ-->JK
JN-->JK
JQ-->JS
JQ-->JT
JQ-->JU
JU-->JT
JV-->JS
JY-->K0
JY-->K1
K1-->K0
K2-->K1
K6-->K8
K6-->K9
K9-->K8
KC-->KE
KI-->KK
KL-->KK
KP-->KR
KS-->KR
KV-->KX
KY-->KX
L1-->L3
L6-->L8
LD-->LF
LI-->LK
LI-->LL
LO-->LQ
LR-->LS
LW-->LY
M1-->M3
M6-->M8
MD-->MF
MD-->MG
MK-->MM
MK-->MN
MO-->MN
MR-->MT
MR-->N4
MR-->MV
MR-->MZ
MR-->N5
MR-->N6
MR-->N7
MR-->N8
MR-->N9
MR-->NA
MR-->MW
MR-->N0
MR-->MY
MR-->MU
MR-->NB
MR-->N1
MR-->NC
MR-->N2
MR-->MX
MR-->ND
MR-->N3
MT-->MU
MU-->MT
MU-->MV
MU-->MW
MU-->MY
MU-->N1
MU-->N2
MV-->MU
MW-->MU
MW-->MX
MX-->MW
MY-->MZ
MY-->N0
MY-->MU
N0-->MZ
N0-->MY
N1-->N2
N1-->N3
N2-->MY
N2-->MU
N2-->N1
N4-->MU
N4-->N3
N5-->N6
N7-->N3
N8-->N6
N8-->N3
N9-->MU
N9-->N1
NB-->N3
NC-->N9
NH-->NJ
NH-->NK
NH-->NL
NH-->NM
NN-->NJ
NO-->NM
NR-->NT
NR-->NU
NR-->NV
NR-->NW
NR-->NX
NR-->NY
NR-->NZ
NR-->O0
NR-->O1
NR-->O2
NR-->O3
NR-->O4
NR-->O5
O1-->O0
O8-->OA
O8-->OF
O8-->OI
O8-->OG
O8-->OK
O8-->OM
O8-->ON
O8-->OE
O8-->OB
O8-->OO
O8-->OP
O8-->OR
O8-->OJ
O8-->OS
O8-->OL
O8-->OQ
O8-->OT
O8-->OU
O8-->OC
O8-->OH
O8-->OD
OA-->OB
OA-->OC
OA-->OD
OD-->OA
OD-->OE
OF-->OG
OF-->OH
OI-->OJ
OK-->OG
OK-->OL
OK-->OH
OL-->OG
OL-->OC
OL-->OH
OM-->OG
OM-->OH
OO-->OB
OO-->OC
OO-->OD
OP-->OJ
OP-->OQ
OQ-->OL
OQ-->OC
OQ-->OD
OR-->OP
OS-->OL
OS-->OH
OT-->OQ
OT-->OD
OY-->P0
OY-->P1
OY-->P2
OY-->P3
OY-->P4
OY-->P5
OY-->P6
OY-->P7
OY-->P8
OY-->P9
OY-->PA
OY-->PB
OY-->PC
OY-->PD
OY-->PE
OY-->PF
OY-->PG
PH-->P0
PI-->P7
PJ-->P8
PK-->P8
PL-->P9
PO-->PG
PS-->PU
PS-->PV
PS-->PW
PS-->PY
PS-->PZ
PS-->Q0
PS-->Q1
PS-->Q2
PS-->Q3
PS-->Q4
PS-->Q5
PS-->Q6
PS-->PX
PS-->Q7
PS-->Q8
PS-->Q9
PS-->QA
PS-->QB
PS-->QC
PS-->QD
PW-->PX
Q7-->PX
Q8-->PX
QE-->PU
QE-->Q2
QE-->QB
QE-->QD
QF-->PW
QG-->Q4
QH-->PX
QI-->Q7
QI-->QC
QJ-->Q7
QJ-->QC
QL-->Q9
QM-->QB
QP-->QR
QU-->QW
QU-->QX
R3-->R6
RD-->RF
RG-->RF
RH-->RF
RI-->RF
RJ-->RF
RM-->RO
RM-->RP
RM-->RR
RM-->S0
RM-->RS
RM-->RT
RM-->S1
RM-->S2
RM-->RW
RM-->S3
RM-->S4
RM-->S5
RO-->RP
RO-->RR
RO-->RT
RR-->RS
RT-->RV
RT-->RY
RT-->RZ
RT-->RS
RV-->RW
RY-->RW
S1-->RV
S1-->RY
S1-->RZ
S1-->RS
S3-->RR
S4-->RO
S5-->RR
