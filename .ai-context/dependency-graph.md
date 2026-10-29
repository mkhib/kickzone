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
F9["SellersDefineProductFlow.pants-label.spec.tsx"]
FA["SellersDefineProductFlow.spec.tsx"]
FB["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FC["products"]
subgraph FD["src"]
FE["index.ts"]
subgraph FF["lib"]
FG["SellersProducts.tsx"]
FH["SellersProducts.pants-label.spec.tsx"]
FI["SellersProducts.spec.tsx"]
end
end
end
subgraph FJ["seller-orders"]
FK["jest.config.ts"]
FL["jest.setup.ts"]
subgraph FM["src"]
FN["index.ts"]
subgraph FO["lib"]
FP["seller-orders-screen.tsx"]
FQ["seller-orders-screen.spec.tsx"]
end
FR["test-setup.ts"]
end
end
subgraph FS["setup-password"]
subgraph FT["src"]
FU["index.ts"]
subgraph FV["lib"]
FW["SellersSetupPassword.tsx"]
end
end
end
subgraph FX["unauthorized"]
subgraph FY["src"]
FZ["index.ts"]
subgraph G0["lib"]
G1["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G2["zustand"]
subgraph G3["sellers-products-store"]
subgraph G4["src"]
G5["index.ts"]
subgraph G6["lib"]
G7["useSellersProductsStore.ts"]
G8["sellers-products-store.tsx"]
end
end
end
end
end
subgraph G9["shared"]
subgraph GA["components"]
subgraph GB["apollo-provider-base"]
subgraph GC["src"]
GD["index.ts"]
subgraph GE["lib"]
GF["ApolloProviderBase.tsx"]
GG["createSilentRefreshAuthLink.ts"]
GH["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GI["error-boundary"]
subgraph GJ["src"]
GK["index.ts"]
subgraph GL["lib"]
GM["error-boundary.tsx"]
GN["error-boundary.spec.tsx"]
end
end
GO["vite.config.ts"]
end
subgraph GP["glassmorphism-container"]
subgraph GQ["src"]
GR["index.ts"]
subgraph GS["lib"]
GT["glassmorphism-container.tsx"]
GU["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GV["layout"]
subgraph GW["src"]
GX["index.ts"]
subgraph GY["lib"]
GZ["Layout.tsx"]
end
end
end
subgraph H0["material-data-table"]
subgraph H1["src"]
H2["index.ts"]
subgraph H3["lib"]
H4["material-data-table.tsx"]
H5["table-config.ts"]
H6["table-utils.ts"]
H7["material-data-table.spec.tsx"]
H8["table-types.ts"]
end
end
end
subgraph H9["order-status-chip"]
subgraph HA["src"]
HB["index.ts"]
subgraph HC["lib"]
HD["order-status-chip.tsx"]
HE["order-status-chip.spec.tsx"]
end
end
end
subgraph HF["password-field"]
subgraph HG["src"]
HH["index.ts"]
subgraph HI["lib"]
HJ["PasswordTextField.tsx"]
end
end
end
subgraph HK["price-display"]
subgraph HL["src"]
HM["index.ts"]
subgraph HN["lib"]
HO["price-display.tsx"]
HP["price-display.spec.tsx"]
end
end
end
subgraph HQ["private-route"]
subgraph HR["src"]
HS["index.ts"]
subgraph HT["lib"]
HU["createPrivateRoute.tsx"]
HV["PrivateRoute.tsx"]
end
end
end
subgraph HW["rtl-table-utils"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["rtl-table-utils.ts"]
I1["rtl-cell-components.tsx"]
I2["rtl-column-helpers.ts"]
I3["rtl-table-props.ts"]
I4["use-table-alignment.ts"]
I5["rtl-table-utils.spec.tsx"]
I6["rtl-table-utils.tsx"]
end
end
end
subgraph I7["snackbar"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["snackbar.tsx"]
IC["Snackbar.tsx"]
end
end
end
subgraph ID["styled-drawer"]
subgraph IE["src"]
IF["index.ts"]
subgraph IG["lib"]
IH["styled-drawer.tsx"]
II["styled-drawer.spec.tsx"]
end
end
end
subgraph IJ["unauthorized"]
subgraph IK["src"]
IL["index.ts"]
subgraph IM["lib"]
IN["unauthorized-path.tsx"]
end
end
end
end
subgraph IO["graphql"]
subgraph IP["src"]
IQ["index.ts"]
subgraph IR["lib"]
IS["currency.mutations.ts"]
IT["currency.queries.ts"]
IU["fragments.ts"]
IV["variant-colors.ts"]
IW["client-shared-graphql.tsx"]
end
end
end
subgraph IX["hooks"]
subgraph IY["brands"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["brands.graphql.ts"]
J3["useBrands.ts"]
end
end
J4["vite.config.ts"]
end
subgraph J5["categories"]
subgraph J6["src"]
J7["index.ts"]
subgraph J8["lib"]
J9["useCategories.ts"]
JA["categories.graphql.ts"]
end
end
end
subgraph JB["colors"]
subgraph JC["src"]
JD["index.ts"]
subgraph JE["lib"]
JF["useColors.ts"]
JG["color.graphql.ts"]
end
end
end
subgraph JH["currency"]
subgraph JI["src"]
JJ["index.ts"]
subgraph JK["lib"]
JL["useConvertPrice.tsx"]
JM["useExchangeRate.tsx"]
JN["useCurrencies.tsx"]
JO["useCurrencyForLocale.tsx"]
JP["useExchangeRate.spec.tsx"]
end
end
end
subgraph JQ["products"]
subgraph JR["src"]
JS["index.ts"]
subgraph JT["lib"]
JU["productImage.ts"]
JV["products.graphql.ts"]
JW["useProducts.ts"]
JX["productImage.spec.ts"]
end
end
end
subgraph JY["site-languages"]
subgraph JZ["src"]
K0["index.ts"]
subgraph K1["lib"]
K2["site-languages.graphql.ts"]
K3["useSiteLanguages.ts"]
K4["site-languages-hook.spec.tsx"]
end
end
K5["vite.config.ts"]
end
subgraph K6["snackbar"]
subgraph K7["src"]
K8["index.ts"]
subgraph K9["lib"]
KA["SnackbarContext.tsx"]
KB["useSnackbar.ts"]
end
end
end
subgraph KC["translations-management-hook"]
subgraph KD["src"]
KE["index.ts"]
subgraph KF["lib"]
KG["useTranslationsManagement.ts"]
end
end
end
end
subgraph KH["lottie"]
subgraph KI["empty-cart"]
subgraph KJ["src"]
KK["index.ts"]
subgraph KL["lib"]
KM["lottie-empty-cart.tsx"]
KN["lottie-empty-cart.spec.tsx"]
end
end
KO["vite.config.ts"]
end
subgraph KP["loading"]
subgraph KQ["src"]
KR["index.ts"]
subgraph KS["lib"]
KT["lottie-loading.tsx"]
KU["lottie-loading.spec.tsx"]
end
end
end
subgraph KV["success-check"]
subgraph KW["src"]
KX["index.ts"]
subgraph KY["lib"]
KZ["lottie-success-check.tsx"]
L0["lottie-success-check.spec.tsx"]
end
end
end
subgraph L1["unauthorized"]
subgraph L2["src"]
L3["index.ts"]
subgraph L4["lib"]
L5["lottie-unauthorized.tsx"]
end
end
end
end
subgraph L6["translations"]
subgraph L7["src"]
L8["index.ts"]
subgraph L9["lib"]
LA["mapApolloErrorToTranslationKey.ts"]
LB["WrapTranslation.tsx"]
end
end
end
subgraph LC["ui"]
subgraph LD["colors"]
subgraph LE["src"]
LF["index.ts"]
subgraph LG["lib"]
LH["colors.ts"]
end
end
end
subgraph LI["language-components"]
subgraph LJ["src"]
LK["index.ts"]
subgraph LL["lib"]
LM["language-components.tsx"]
LN["ltr-text-field.tsx"]
end
end
end
subgraph LO["sizes"]
subgraph LP["src"]
LQ["index.ts"]
subgraph LR["lib"]
LS["sizes.ts"]
LT["sizes.spec.tsx"]
LU["sizes.tsx"]
end
end
end
end
subgraph LV["zustand"]
subgraph LW["shared-auth-store"]
subgraph LX["src"]
LY["index.ts"]
subgraph LZ["lib"]
M0["shared-auth-store.ts"]
end
end
end
subgraph M1["shared-notification-store"]
subgraph M2["src"]
M3["index.ts"]
subgraph M4["lib"]
M5["shared-notification-store.tsx"]
end
end
end
subgraph M6["shared-ui-store"]
subgraph M7["src"]
M8["index.ts"]
subgraph M9["lib"]
MA["shared-ui-store.ts"]
MB["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MC["server"]
subgraph MD["controllers"]
subgraph ME["src"]
MF["index.ts"]
subgraph MG["lib"]
MH["auth.controller.ts"]
MI["order.controller.ts"]
end
end
end
subgraph MJ["decorators"]
MK["jest.config.ts"]
subgraph ML["src"]
MM["index.ts"]
subgraph MN["lib"]
MO["current-user.decorator.ts"]
MP["decorators.ts"]
MQ["decorators.spec.ts"]
end
end
end
subgraph MR["entities"]
subgraph MS["src"]
MT["index.ts"]
subgraph MU["lib"]
MV["brand.entity.ts"]
MW["product.entity.ts"]
MX["category.entity.ts"]
MY["product-description.entity.ts"]
MZ["site-language.entity.ts"]
N0["product-info.entity.ts"]
N1["color.entity.ts"]
N2["product-info-color.entity.ts"]
N3["seller-info.entity.ts"]
N4["seller-product.entity.ts"]
N5["user.entity.ts"]
N6["cart.entity.ts"]
N7["currency-preference.entity.ts"]
N8["currency.entity.ts"]
N9["customer.entity.ts"]
NA["exchange-rate.entity.ts"]
NB["order.entity.ts"]
NC["platform-settings.entity.ts"]
ND["refresh-token.entity.ts"]
NE["seller-order.entity.ts"]
NF["translation.entity.ts"]
end
end
end
subgraph NG["guards"]
NH["jest.config.ts"]
subgraph NI["src"]
NJ["index.ts"]
subgraph NK["lib"]
NL["catalog.guard.ts"]
NM["graphql-auth.guard.ts"]
NN["http-auth.guard.ts"]
NO["roles.guard.ts"]
NP["catalog.guard.spec.ts"]
NQ["roles.guard.spec.ts"]
end
end
end
subgraph NR["inputs"]
subgraph NS["src"]
NT["index.ts"]
subgraph NU["lib"]
NV["brand.input.ts"]
NW["cart.inputs.ts"]
NX["category.input.ts"]
NY["color.input.ts"]
NZ["customer-auth.inputs.ts"]
O0["order-pagination.inputs.ts"]
O1["order.inputs.ts"]
O2["product-info-filter.input.ts"]
O3["product.input.ts"]
O4["seller-order-pagination.inputs.ts"]
O5["seller.input.ts"]
O6["site-language.input.ts"]
O7["user.input.ts"]
end
end
end
subgraph O8["modules"]
subgraph O9["src"]
OA["index.ts"]
subgraph OB["lib"]
OC["auth.module.ts"]
OD["email.module.ts"]
OE["token.module.ts"]
OF["user.module.ts"]
OG["customer-profile.module.ts"]
OH["brand.module.ts"]
OI["catalog-guard.module.ts"]
OJ["translation.module.ts"]
OK["cart.module.ts"]
OL["platform-settings.module.ts"]
OM["category.module.ts"]
ON["product.module.ts"]
OO["color.module.ts"]
OP["currency.module.ts"]
OQ["graphql-context.module.ts"]
OR["order.module.ts"]
OS["seller-info.module.ts"]
OT["payment.module.ts"]
OU["product-info.module.ts"]
OV["seller-products.module.ts"]
OW["site-language.module.ts"]
end
end
end
subgraph OX["resolvers"]
OY["jest.config.ts"]
subgraph OZ["src"]
P0["index.ts"]
subgraph P1["lib"]
P2["auth.resolver.ts"]
P3["brand.resolver.ts"]
P4["cart.resolver.ts"]
P5["category.resolver.ts"]
P6["color.resolver.ts"]
P7["currency.resolver.ts"]
P8["customer-profile.resolver.ts"]
P9["order.resolver.ts"]
PA["payment.resolver.ts"]
PB["product-info.resolver.ts"]
PC["product.resolver.ts"]
PD["seller-info.resolver.ts"]
PE["shipping.resolver.ts"]
PF["site-language.resolver.ts"]
PG["translation.input.ts"]
PH["translation.resolver.ts"]
PI["user.resolver.ts"]
PJ["auth.resolver.spec.ts"]
PK["order.resolver.spec.ts"]
PL["payment.resolver.integration.spec.ts"]
PM["payment.resolver.spec.ts"]
PN["product-info.resolver.spec.ts"]
subgraph PO["types"]
PP["graphql-upload.d.ts"]
end
PQ["user.resolver.spec.ts"]
end
end
end
subgraph PR["services"]
PS["jest.config.ts"]
subgraph PT["src"]
PU["index.ts"]
subgraph PV["lib"]
PW["auth.service.ts"]
PX["brand.service.ts"]
PY["cart.service.ts"]
PZ["product-info-colors.util.ts"]
Q0["category.service.ts"]
Q1["color.service.ts"]
Q2["currency.service.ts"]
Q3["customer-profile.service.ts"]
Q4["email.service.ts"]
Q5["image-upload.service.ts"]
Q6["order.service.ts"]
Q7["payment-logger.service.ts"]
Q8["payment.service.ts"]
Q9["product.service.ts"]
QA["seller-info.service.ts"]
QB["shipping-calculation.service.ts"]
QC["site-language.service.ts"]
QD["token.service.ts"]
QE["translation.service.ts"]
QF["user.service.ts"]
QG["auth.service.spec.ts"]
QH["cart.service.spec.ts"]
QI["order.service.spec.ts"]
QJ["product-info-colors.util.spec.ts"]
QK["product.service.pants.spec.ts"]
QL["product.service.spec.ts"]
QM["relay-connection.spec.ts"]
QN["shipping-calculation.service.spec.ts"]
QO["token.service.spec.ts"]
end
end
end
subgraph QP["strategies"]
subgraph QQ["src"]
QR["index.ts"]
subgraph QS["lib"]
QT["local.strategy.ts"]
end
end
end
subgraph QU["utils"]
subgraph QV["src"]
QW["index.ts"]
subgraph QX["lib"]
QY["email-templates.ts"]
QZ["relay-connection.ts"]
R0["pagination.ts"]
end
end
end
end
subgraph R1["shared"]
subgraph R2["codegen"]
R3["jest.config.ts"]
subgraph R4["src"]
R5["index.ts"]
subgraph R6["lib"]
subgraph R7["generated"]
R8["graphql.ts"]
end
end
end
end
subgraph R9["graphql-schema"]
RA["jest.config.ts"]
subgraph RB["src"]
RC["index.ts"]
end
end
subgraph RD["product-sizes"]
subgraph RE["src"]
RF["index.ts"]
subgraph RG["lib"]
RH["product-sizes.ts"]
RI["product-sizes.pants-formats.spec.ts"]
RJ["product-sizes.pants-label.spec.ts"]
RK["product-sizes.pants-strict.spec.ts"]
RL["product-sizes.spec.ts"]
end
end
end
subgraph RM["shared-i18n"]
subgraph RN["src"]
RO["index.ts"]
subgraph RP["lib"]
RQ["language-context.tsx"]
RR["language-detector.ts"]
subgraph RS["locales"]
RT["i18n-react.tsx"]
RU["i18n-util.ts"]
RV["i18n-util.async.ts"]
subgraph RW["en"]
RX["index.ts"]
end
subgraph RZ["fa"]
S0["index.ts"]
end
S1["formatters.ts"]
S2["i18n-types.ts"]
S3["i18n-util.sync.ts"]
S4["navigator-detector.ts"]
end
RY["site-name.ts"]
S5["table-localization.ts"]
S6["theme-provider.tsx"]
S7["use-page-title.ts"]
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
FA-->F8
FB-->F7
FE-->FG
FH-->FG
FI-->FG
FN-->FP
FQ-->FP
FU-->FW
FZ-->G1
G5-->G7
GD-->GF
GD-->GG
GH-->GG
GK-->GM
GN-->GM
GR-->GT
GU-->GT
GX-->GZ
H2-->H4
H2-->H5
H2-->H6
H4-->H5
H7-->H4
HB-->HD
HE-->HD
HH-->HJ
HM-->HO
HP-->HO
HS-->HU
HU-->HV
HY-->I0
I0-->I1
I0-->I2
I0-->I3
I0-->I4
I2-->I1
I2-->I3
I5-->I6
I9-->IB
IF-->IH
II-->IH
IL-->IN
IQ-->IS
IQ-->IT
IQ-->IU
IQ-->IV
J0-->J2
J0-->J3
J3-->J2
J7-->J9
J9-->JA
JD-->JF
JF-->JG
JJ-->JL
JJ-->JN
JJ-->JO
JJ-->JM
JL-->JM
JP-->JM
JS-->JU
JS-->JV
JS-->JW
JW-->JV
JX-->JU
K0-->K2
K0-->K3
K3-->K2
K4-->K3
K8-->KA
K8-->KB
KB-->KA
KE-->KG
KK-->KM
KN-->KM
KR-->KT
KU-->KT
KX-->KZ
L0-->KZ
L3-->L5
L8-->LA
LF-->LH
LK-->LM
LK-->LN
LQ-->LS
LT-->LU
LY-->M0
M3-->M5
M8-->MA
MF-->MH
MF-->MI
MM-->MO
MM-->MP
MQ-->MP
MT-->MV
MT-->N6
MT-->MX
MT-->N1
MT-->N7
MT-->N8
MT-->N9
MT-->NA
MT-->NB
MT-->NC
MT-->MY
MT-->N2
MT-->N0
MT-->MW
MT-->ND
MT-->N3
MT-->NE
MT-->N4
MT-->MZ
MT-->NF
MT-->N5
MV-->MW
MW-->MV
MW-->MX
MW-->MY
MW-->N0
MW-->N3
MW-->N4
MX-->MW
MY-->MW
MY-->MZ
MZ-->MY
N0-->N1
N0-->N2
N0-->MW
N2-->N1
N2-->N0
N3-->N4
N3-->N5
N4-->N0
N4-->MW
N4-->N3
N6-->MW
N6-->N5
N7-->N8
N9-->N5
NA-->N8
NA-->N5
NB-->MW
NB-->N3
ND-->N5
NE-->NB
NJ-->NL
NJ-->NM
NJ-->NN
NJ-->NO
NP-->NL
NQ-->NO
NT-->NV
NT-->NW
NT-->NX
NT-->NY
NT-->NZ
NT-->O0
NT-->O1
NT-->O2
NT-->O3
NT-->O4
NT-->O5
NT-->O6
NT-->O7
O3-->O2
OA-->OC
OA-->OH
OA-->OK
OA-->OI
OA-->OM
OA-->OO
OA-->OP
OA-->OG
OA-->OD
OA-->OQ
OA-->OR
OA-->OT
OA-->OL
OA-->OU
OA-->ON
OA-->OS
OA-->OV
OA-->OW
OA-->OE
OA-->OJ
OA-->OF
OC-->OD
OC-->OE
OC-->OF
OF-->OC
OF-->OG
OH-->OI
OH-->OJ
OK-->OL
OM-->OI
OM-->ON
OM-->OJ
ON-->OI
ON-->OE
ON-->OJ
OO-->OI
OO-->OJ
OQ-->OD
OQ-->OE
OQ-->OF
OR-->OL
OR-->OS
OS-->ON
OS-->OE
OS-->OF
OT-->OR
OU-->ON
OU-->OJ
OV-->OS
OV-->OF
P0-->P2
P0-->P3
P0-->P4
P0-->P5
P0-->P6
P0-->P7
P0-->P8
P0-->P9
P0-->PA
P0-->PB
P0-->PC
P0-->PD
P0-->PE
P0-->PF
P0-->PG
P0-->PH
P0-->PI
PJ-->P2
PK-->P9
PL-->PA
PM-->PA
PN-->PB
PQ-->PI
PU-->PW
PU-->PX
PU-->PY
PU-->Q0
PU-->Q1
PU-->Q2
PU-->Q3
PU-->Q4
PU-->Q5
PU-->Q6
PU-->Q7
PU-->Q8
PU-->PZ
PU-->Q9
PU-->QA
PU-->QB
PU-->QC
PU-->QD
PU-->QE
PU-->QF
PY-->PZ
Q9-->PZ
QA-->PZ
QG-->PW
QG-->Q4
QG-->QD
QG-->QF
QH-->PY
QI-->Q6
QJ-->PZ
QK-->Q9
QK-->QE
QL-->Q9
QL-->QE
QN-->QB
QO-->QD
QR-->QT
QW-->QY
QW-->QZ
R5-->R8
RF-->RH
RI-->RH
RJ-->RH
RK-->RH
RL-->RH
RO-->RQ
RO-->RR
RO-->RT
RO-->S2
RO-->RU
RO-->RV
RO-->S3
RO-->S4
RO-->RY
RO-->S5
RO-->S6
RO-->S7
RQ-->RR
RQ-->RT
RQ-->RV
RT-->RU
RV-->RX
RV-->S0
RV-->S1
RV-->RU
RX-->RY
S0-->RY
S3-->RX
S3-->S0
S3-->S1
S3-->RU
S5-->RT
S6-->RQ
S7-->RT
