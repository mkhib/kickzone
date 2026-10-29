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
FH["SellersProducts.spec.tsx"]
end
end
end
subgraph FI["seller-orders"]
FJ["jest.config.ts"]
FK["jest.setup.ts"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["seller-orders-screen.tsx"]
FP["seller-orders-screen.spec.tsx"]
end
FQ["test-setup.ts"]
end
end
subgraph FR["setup-password"]
subgraph FS["src"]
FT["index.ts"]
subgraph FU["lib"]
FV["SellersSetupPassword.tsx"]
end
end
end
subgraph FW["unauthorized"]
subgraph FX["src"]
FY["index.ts"]
subgraph FZ["lib"]
G0["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G1["zustand"]
subgraph G2["sellers-products-store"]
subgraph G3["src"]
G4["index.ts"]
subgraph G5["lib"]
G6["useSellersProductsStore.ts"]
G7["sellers-products-store.tsx"]
end
end
end
end
end
subgraph G8["shared"]
subgraph G9["components"]
subgraph GA["apollo-provider-base"]
subgraph GB["src"]
GC["index.ts"]
subgraph GD["lib"]
GE["ApolloProviderBase.tsx"]
GF["createSilentRefreshAuthLink.ts"]
GG["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GH["error-boundary"]
subgraph GI["src"]
GJ["index.ts"]
subgraph GK["lib"]
GL["error-boundary.tsx"]
GM["error-boundary.spec.tsx"]
end
end
GN["vite.config.ts"]
end
subgraph GO["glassmorphism-container"]
subgraph GP["src"]
GQ["index.ts"]
subgraph GR["lib"]
GS["glassmorphism-container.tsx"]
GT["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GU["layout"]
subgraph GV["src"]
GW["index.ts"]
subgraph GX["lib"]
GY["Layout.tsx"]
end
end
end
subgraph GZ["material-data-table"]
subgraph H0["src"]
H1["index.ts"]
subgraph H2["lib"]
H3["material-data-table.tsx"]
H4["table-config.ts"]
H5["table-utils.ts"]
H6["material-data-table.spec.tsx"]
H7["table-types.ts"]
end
end
end
subgraph H8["order-status-chip"]
subgraph H9["src"]
HA["index.ts"]
subgraph HB["lib"]
HC["order-status-chip.tsx"]
HD["order-status-chip.spec.tsx"]
end
end
end
subgraph HE["password-field"]
subgraph HF["src"]
HG["index.ts"]
subgraph HH["lib"]
HI["PasswordTextField.tsx"]
end
end
end
subgraph HJ["price-display"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["price-display.tsx"]
HO["price-display.spec.tsx"]
end
end
end
subgraph HP["private-route"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["createPrivateRoute.tsx"]
HU["PrivateRoute.tsx"]
end
end
end
subgraph HV["rtl-table-utils"]
subgraph HW["src"]
HX["index.ts"]
subgraph HY["lib"]
HZ["rtl-table-utils.ts"]
I0["rtl-cell-components.tsx"]
I1["rtl-column-helpers.ts"]
I2["rtl-table-props.ts"]
I3["use-table-alignment.ts"]
I4["rtl-table-utils.spec.tsx"]
I5["rtl-table-utils.tsx"]
end
end
end
subgraph I6["snackbar"]
subgraph I7["src"]
I8["index.ts"]
subgraph I9["lib"]
IA["snackbar.tsx"]
IB["Snackbar.tsx"]
end
end
end
subgraph IC["styled-drawer"]
subgraph ID["src"]
IE["index.ts"]
subgraph IF["lib"]
IG["styled-drawer.tsx"]
IH["styled-drawer.spec.tsx"]
end
end
end
subgraph II["unauthorized"]
subgraph IJ["src"]
IK["index.ts"]
subgraph IL["lib"]
IM["unauthorized-path.tsx"]
end
end
end
end
subgraph IN["graphql"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["currency.mutations.ts"]
IS["currency.queries.ts"]
IT["fragments.ts"]
IU["variant-colors.ts"]
IV["client-shared-graphql.tsx"]
end
end
end
subgraph IW["hooks"]
subgraph IX["brands"]
subgraph IY["src"]
IZ["index.ts"]
subgraph J0["lib"]
J1["brands.graphql.ts"]
J2["useBrands.ts"]
end
end
J3["vite.config.ts"]
end
subgraph J4["categories"]
subgraph J5["src"]
J6["index.ts"]
subgraph J7["lib"]
J8["useCategories.ts"]
J9["categories.graphql.ts"]
end
end
end
subgraph JA["colors"]
subgraph JB["src"]
JC["index.ts"]
subgraph JD["lib"]
JE["useColors.ts"]
JF["color.graphql.ts"]
end
end
end
subgraph JG["currency"]
subgraph JH["src"]
JI["index.ts"]
subgraph JJ["lib"]
JK["useConvertPrice.tsx"]
JL["useExchangeRate.tsx"]
JM["useCurrencies.tsx"]
JN["useCurrencyForLocale.tsx"]
JO["useExchangeRate.spec.tsx"]
end
end
end
subgraph JP["products"]
subgraph JQ["src"]
JR["index.ts"]
subgraph JS["lib"]
JT["productImage.ts"]
JU["products.graphql.ts"]
JV["useProducts.ts"]
JW["productImage.spec.ts"]
end
end
end
subgraph JX["site-languages"]
subgraph JY["src"]
JZ["index.ts"]
subgraph K0["lib"]
K1["site-languages.graphql.ts"]
K2["useSiteLanguages.ts"]
K3["site-languages-hook.spec.tsx"]
end
end
K4["vite.config.ts"]
end
subgraph K5["snackbar"]
subgraph K6["src"]
K7["index.ts"]
subgraph K8["lib"]
K9["SnackbarContext.tsx"]
KA["useSnackbar.ts"]
end
end
end
subgraph KB["translations-management-hook"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["useTranslationsManagement.ts"]
end
end
end
end
subgraph KG["lottie"]
subgraph KH["empty-cart"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["lottie-empty-cart.tsx"]
KM["lottie-empty-cart.spec.tsx"]
end
end
KN["vite.config.ts"]
end
subgraph KO["loading"]
subgraph KP["src"]
KQ["index.ts"]
subgraph KR["lib"]
KS["lottie-loading.tsx"]
KT["lottie-loading.spec.tsx"]
end
end
end
subgraph KU["success-check"]
subgraph KV["src"]
KW["index.ts"]
subgraph KX["lib"]
KY["lottie-success-check.tsx"]
KZ["lottie-success-check.spec.tsx"]
end
end
end
subgraph L0["unauthorized"]
subgraph L1["src"]
L2["index.ts"]
subgraph L3["lib"]
L4["lottie-unauthorized.tsx"]
end
end
end
end
subgraph L5["translations"]
subgraph L6["src"]
L7["index.ts"]
subgraph L8["lib"]
L9["mapApolloErrorToTranslationKey.ts"]
LA["WrapTranslation.tsx"]
end
end
end
subgraph LB["ui"]
subgraph LC["colors"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["colors.ts"]
end
end
end
subgraph LH["language-components"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["language-components.tsx"]
LM["ltr-text-field.tsx"]
end
end
end
subgraph LN["sizes"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["sizes.ts"]
LS["sizes.spec.tsx"]
LT["sizes.tsx"]
end
end
end
end
subgraph LU["zustand"]
subgraph LV["shared-auth-store"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["shared-auth-store.ts"]
end
end
end
subgraph M0["shared-notification-store"]
subgraph M1["src"]
M2["index.ts"]
subgraph M3["lib"]
M4["shared-notification-store.tsx"]
end
end
end
subgraph M5["shared-ui-store"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["shared-ui-store.ts"]
MA["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MB["server"]
subgraph MC["controllers"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["auth.controller.ts"]
MH["order.controller.ts"]
end
end
end
subgraph MI["decorators"]
MJ["jest.config.ts"]
subgraph MK["src"]
ML["index.ts"]
subgraph MM["lib"]
MN["current-user.decorator.ts"]
MO["decorators.ts"]
MP["decorators.spec.ts"]
end
end
end
subgraph MQ["entities"]
subgraph MR["src"]
MS["index.ts"]
subgraph MT["lib"]
MU["brand.entity.ts"]
MV["product.entity.ts"]
MW["category.entity.ts"]
MX["product-description.entity.ts"]
MY["site-language.entity.ts"]
MZ["product-info.entity.ts"]
N0["color.entity.ts"]
N1["product-info-color.entity.ts"]
N2["seller-info.entity.ts"]
N3["seller-product.entity.ts"]
N4["user.entity.ts"]
N5["cart.entity.ts"]
N6["currency-preference.entity.ts"]
N7["currency.entity.ts"]
N8["customer.entity.ts"]
N9["exchange-rate.entity.ts"]
NA["order.entity.ts"]
NB["platform-settings.entity.ts"]
NC["refresh-token.entity.ts"]
ND["seller-order.entity.ts"]
NE["translation.entity.ts"]
end
end
end
subgraph NF["guards"]
NG["jest.config.ts"]
subgraph NH["src"]
NI["index.ts"]
subgraph NJ["lib"]
NK["catalog.guard.ts"]
NL["graphql-auth.guard.ts"]
NM["http-auth.guard.ts"]
NN["roles.guard.ts"]
NO["catalog.guard.spec.ts"]
NP["roles.guard.spec.ts"]
end
end
end
subgraph NQ["inputs"]
subgraph NR["src"]
NS["index.ts"]
subgraph NT["lib"]
NU["brand.input.ts"]
NV["cart.inputs.ts"]
NW["category.input.ts"]
NX["color.input.ts"]
NY["customer-auth.inputs.ts"]
NZ["order-pagination.inputs.ts"]
O0["order.inputs.ts"]
O1["product-info-filter.input.ts"]
O2["product.input.ts"]
O3["seller-order-pagination.inputs.ts"]
O4["seller.input.ts"]
O5["site-language.input.ts"]
O6["user.input.ts"]
end
end
end
subgraph O7["modules"]
subgraph O8["src"]
O9["index.ts"]
subgraph OA["lib"]
OB["auth.module.ts"]
OC["email.module.ts"]
OD["token.module.ts"]
OE["user.module.ts"]
OF["customer-profile.module.ts"]
OG["brand.module.ts"]
OH["catalog-guard.module.ts"]
OI["translation.module.ts"]
OJ["cart.module.ts"]
OK["platform-settings.module.ts"]
OL["category.module.ts"]
OM["product.module.ts"]
ON["color.module.ts"]
OO["currency.module.ts"]
OP["graphql-context.module.ts"]
OQ["order.module.ts"]
OR["seller-info.module.ts"]
OS["payment.module.ts"]
OT["product-info.module.ts"]
OU["seller-products.module.ts"]
OV["site-language.module.ts"]
end
end
end
subgraph OW["resolvers"]
OX["jest.config.ts"]
subgraph OY["src"]
OZ["index.ts"]
subgraph P0["lib"]
P1["auth.resolver.ts"]
P2["brand.resolver.ts"]
P3["cart.resolver.ts"]
P4["category.resolver.ts"]
P5["color.resolver.ts"]
P6["currency.resolver.ts"]
P7["customer-profile.resolver.ts"]
P8["order.resolver.ts"]
P9["payment.resolver.ts"]
PA["product-info.resolver.ts"]
PB["product.resolver.ts"]
PC["seller-info.resolver.ts"]
PD["shipping.resolver.ts"]
PE["site-language.resolver.ts"]
PF["translation.input.ts"]
PG["translation.resolver.ts"]
PH["user.resolver.ts"]
PI["auth.resolver.spec.ts"]
PJ["order.resolver.spec.ts"]
PK["payment.resolver.integration.spec.ts"]
PL["payment.resolver.spec.ts"]
PM["product-info.resolver.spec.ts"]
subgraph PN["types"]
PO["graphql-upload.d.ts"]
end
PP["user.resolver.spec.ts"]
end
end
end
subgraph PQ["services"]
PR["jest.config.ts"]
subgraph PS["src"]
PT["index.ts"]
subgraph PU["lib"]
PV["auth.service.ts"]
PW["brand.service.ts"]
PX["cart.service.ts"]
PY["product-info-colors.util.ts"]
PZ["category.service.ts"]
Q0["color.service.ts"]
Q1["currency.service.ts"]
Q2["customer-profile.service.ts"]
Q3["email.service.ts"]
Q4["image-upload.service.ts"]
Q5["order.service.ts"]
Q6["payment-logger.service.ts"]
Q7["payment.service.ts"]
Q8["product.service.ts"]
Q9["seller-info.service.ts"]
QA["shipping-calculation.service.ts"]
QB["site-language.service.ts"]
QC["token.service.ts"]
QD["translation.service.ts"]
QE["user.service.ts"]
QF["auth.service.spec.ts"]
QG["cart.service.spec.ts"]
QH["order.service.spec.ts"]
QI["product-info-colors.util.spec.ts"]
QJ["product.service.pants.spec.ts"]
QK["product.service.spec.ts"]
QL["relay-connection.spec.ts"]
QM["shipping-calculation.service.spec.ts"]
QN["token.service.spec.ts"]
end
end
end
subgraph QO["strategies"]
subgraph QP["src"]
QQ["index.ts"]
subgraph QR["lib"]
QS["local.strategy.ts"]
end
end
end
subgraph QT["utils"]
subgraph QU["src"]
QV["index.ts"]
subgraph QW["lib"]
QX["email-templates.ts"]
QY["relay-connection.ts"]
QZ["pagination.ts"]
end
end
end
end
subgraph R0["shared"]
subgraph R1["codegen"]
R2["jest.config.ts"]
subgraph R3["src"]
R4["index.ts"]
subgraph R5["lib"]
subgraph R6["generated"]
R7["graphql.ts"]
end
end
end
end
subgraph R8["graphql-schema"]
R9["jest.config.ts"]
subgraph RA["src"]
RB["index.ts"]
end
end
subgraph RC["product-sizes"]
subgraph RD["src"]
RE["index.ts"]
subgraph RF["lib"]
RG["product-sizes.ts"]
RH["product-sizes.pants-formats.spec.ts"]
RI["product-sizes.pants-label.spec.ts"]
RJ["product-sizes.pants-strict.spec.ts"]
RK["product-sizes.spec.ts"]
end
end
end
subgraph RL["shared-i18n"]
subgraph RM["src"]
RN["index.ts"]
subgraph RO["lib"]
RP["language-context.tsx"]
RQ["language-detector.ts"]
subgraph RR["locales"]
RS["i18n-react.tsx"]
RT["i18n-util.ts"]
RU["i18n-util.async.ts"]
subgraph RV["en"]
RW["index.ts"]
end
subgraph RY["fa"]
RZ["index.ts"]
end
S0["formatters.ts"]
S1["i18n-types.ts"]
S2["i18n-util.sync.ts"]
S3["navigator-detector.ts"]
end
RX["site-name.ts"]
S4["table-localization.ts"]
S5["theme-provider.tsx"]
S6["use-page-title.ts"]
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
FM-->FO
FP-->FO
FT-->FV
FY-->G0
G4-->G6
GC-->GE
GC-->GF
GG-->GF
GJ-->GL
GM-->GL
GQ-->GS
GT-->GS
GW-->GY
H1-->H3
H1-->H4
H1-->H5
H3-->H4
H6-->H3
HA-->HC
HD-->HC
HG-->HI
HL-->HN
HO-->HN
HR-->HT
HT-->HU
HX-->HZ
HZ-->I0
HZ-->I1
HZ-->I2
HZ-->I3
I1-->I0
I1-->I2
I4-->I5
I8-->IA
IE-->IG
IH-->IG
IK-->IM
IP-->IR
IP-->IS
IP-->IT
IP-->IU
IZ-->J1
IZ-->J2
J2-->J1
J6-->J8
J8-->J9
JC-->JE
JE-->JF
JI-->JK
JI-->JM
JI-->JN
JI-->JL
JK-->JL
JO-->JL
JR-->JT
JR-->JU
JR-->JV
JV-->JU
JW-->JT
JZ-->K1
JZ-->K2
K2-->K1
K3-->K2
K7-->K9
K7-->KA
KA-->K9
KD-->KF
KJ-->KL
KM-->KL
KQ-->KS
KT-->KS
KW-->KY
KZ-->KY
L2-->L4
L7-->L9
LE-->LG
LJ-->LL
LJ-->LM
LP-->LR
LS-->LT
LX-->LZ
M2-->M4
M7-->M9
ME-->MG
ME-->MH
ML-->MN
ML-->MO
MP-->MO
MS-->MU
MS-->N5
MS-->MW
MS-->N0
MS-->N6
MS-->N7
MS-->N8
MS-->N9
MS-->NA
MS-->NB
MS-->MX
MS-->N1
MS-->MZ
MS-->MV
MS-->NC
MS-->N2
MS-->ND
MS-->N3
MS-->MY
MS-->NE
MS-->N4
MU-->MV
MV-->MU
MV-->MW
MV-->MX
MV-->MZ
MV-->N2
MV-->N3
MW-->MV
MX-->MV
MX-->MY
MY-->MX
MZ-->N0
MZ-->N1
MZ-->MV
N1-->N0
N1-->MZ
N2-->N3
N2-->N4
N3-->MZ
N3-->MV
N3-->N2
N5-->MV
N5-->N4
N6-->N7
N8-->N4
N9-->N7
N9-->N4
NA-->MV
NA-->N2
NC-->N4
ND-->NA
NI-->NK
NI-->NL
NI-->NM
NI-->NN
NO-->NK
NP-->NN
NS-->NU
NS-->NV
NS-->NW
NS-->NX
NS-->NY
NS-->NZ
NS-->O0
NS-->O1
NS-->O2
NS-->O3
NS-->O4
NS-->O5
NS-->O6
O2-->O1
O9-->OB
O9-->OG
O9-->OJ
O9-->OH
O9-->OL
O9-->ON
O9-->OO
O9-->OF
O9-->OC
O9-->OP
O9-->OQ
O9-->OS
O9-->OK
O9-->OT
O9-->OM
O9-->OR
O9-->OU
O9-->OV
O9-->OD
O9-->OI
O9-->OE
OB-->OC
OB-->OD
OB-->OE
OE-->OB
OE-->OF
OG-->OH
OG-->OI
OJ-->OK
OL-->OH
OL-->OM
OL-->OI
OM-->OH
OM-->OD
OM-->OI
ON-->OH
ON-->OI
OP-->OC
OP-->OD
OP-->OE
OQ-->OK
OQ-->OR
OR-->OM
OR-->OD
OR-->OE
OS-->OQ
OT-->OM
OT-->OI
OU-->OR
OU-->OE
OZ-->P1
OZ-->P2
OZ-->P3
OZ-->P4
OZ-->P5
OZ-->P6
OZ-->P7
OZ-->P8
OZ-->P9
OZ-->PA
OZ-->PB
OZ-->PC
OZ-->PD
OZ-->PE
OZ-->PF
OZ-->PG
OZ-->PH
PI-->P1
PJ-->P8
PK-->P9
PL-->P9
PM-->PA
PP-->PH
PT-->PV
PT-->PW
PT-->PX
PT-->PZ
PT-->Q0
PT-->Q1
PT-->Q2
PT-->Q3
PT-->Q4
PT-->Q5
PT-->Q6
PT-->Q7
PT-->PY
PT-->Q8
PT-->Q9
PT-->QA
PT-->QB
PT-->QC
PT-->QD
PT-->QE
PX-->PY
Q8-->PY
Q9-->PY
QF-->PV
QF-->Q3
QF-->QC
QF-->QE
QG-->PX
QH-->Q5
QI-->PY
QJ-->Q8
QJ-->QD
QK-->Q8
QK-->QD
QM-->QA
QN-->QC
QQ-->QS
QV-->QX
QV-->QY
R4-->R7
RE-->RG
RH-->RG
RI-->RG
RJ-->RG
RK-->RG
RN-->RP
RN-->RQ
RN-->RS
RN-->S1
RN-->RT
RN-->RU
RN-->S2
RN-->S3
RN-->RX
RN-->S4
RN-->S5
RN-->S6
RP-->RQ
RP-->RS
RP-->RU
RS-->RT
RU-->RW
RU-->RZ
RU-->S0
RU-->RT
RW-->RX
RZ-->RX
S2-->RW
S2-->RZ
S2-->S0
S2-->RT
S4-->RS
S5-->RP
S6-->RS
