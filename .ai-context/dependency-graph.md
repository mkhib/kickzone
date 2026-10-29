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
5S["CustomersProductCard.pants-size.spec.tsx"]
5T["CustomersProductCard.spec.tsx"]
end
5U["vite-env.d.ts"]
end
end
end
subgraph 5V["contexts"]
subgraph 5W["auth"]
subgraph 5X["src"]
5Y["index.ts"]
subgraph 5Z["lib"]
60["CustomersAuthContext.tsx"]
61["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 62["graphql"]
subgraph 63["src"]
64["index.ts"]
subgraph 65["lib"]
66["customer-profile.queries.ts"]
67["mutations.ts"]
68["Provider.tsx"]
69["CustomersApolloProvider.tsx"]
6A["client.ts"]
6B["queries.ts"]
6C["apollo-upload-client.d.ts"]
end
end
end
subgraph 6D["hooks"]
subgraph 6E["auth"]
subgraph 6F["src"]
6G["index.ts"]
subgraph 6H["lib"]
6I["useCustomersForgotPassword.tsx"]
6J["useCustomersLogin.tsx"]
6K["useCustomersRegister.tsx"]
6L["useCustomersResetPassword.tsx"]
6M["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6N["cart"]
6O["jest.config.ts"]
6P["jest.setup.ts"]
subgraph 6Q["src"]
6R["index.ts"]
subgraph 6S["lib"]
6T["customers-cart-hook.tsx"]
6U["useCartService.ts"]
6V["useWishlistSync.ts"]
6W["useCartService.spec.tsx"]
6X["useCartSync.ts"]
end
end
end
subgraph 6Y["orders"]
subgraph 6Z["src"]
70["index.ts"]
subgraph 71["lib"]
72["customers-orders-hook.tsx"]
end
end
end
subgraph 73["products"]
subgraph 74["src"]
75["index.ts"]
subgraph 76["lib"]
77["customers-product-hook.tsx"]
end
end
end
end
subgraph 78["router"]
subgraph 79["src"]
7A["index.ts"]
subgraph 7B["lib"]
7C["CustomersRouter.tsx"]
7D["ScrollToTop.tsx"]
7E["CustomersRouter.spec.tsx"]
7F["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7G["routes"]
subgraph 7H["src"]
7I["index.ts"]
subgraph 7J["lib"]
7K["customer-routes.ts"]
7L["customer-routes.spec.ts"]
end
end
end
subgraph 7M["screens"]
subgraph 7N["contact"]
subgraph 7O["src"]
7P["index.ts"]
subgraph 7Q["lib"]
7R["customer-contact.tsx"]
7S["customer-contact.spec.tsx"]
end
end
7T["vite.config.ts"]
end
subgraph 7U["customer-checkout"]
subgraph 7V["src"]
7W["index.ts"]
subgraph 7X["lib"]
7Y["customer-checkout.tsx"]
end
end
end
subgraph 7Z["customer-favorites"]
subgraph 80["src"]
81["index.ts"]
subgraph 82["lib"]
83["customer-favorites.tsx"]
84["customer-favorites.spec.tsx"]
end
end
85["vite.config.ts"]
end
subgraph 86["customer-login"]
subgraph 87["src"]
88["index.ts"]
subgraph 89["lib"]
8A["customer-login.tsx"]
end
end
end
subgraph 8B["customer-order-confirmation"]
subgraph 8C["src"]
8D["index.ts"]
subgraph 8E["lib"]
8F["customer-order-confirmation.tsx"]
8G["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8H["customer-orders"]
subgraph 8I["src"]
8J["index.ts"]
subgraph 8K["lib"]
8L["customer-orders.tsx"]
end
end
end
subgraph 8M["customer-payment"]
subgraph 8N["src"]
8O["index.ts"]
subgraph 8P["lib"]
8Q["customer-payment-callback.tsx"]
8R["use-zarinpal-payment.tsx"]
8S["zarinpal-payment-service.ts"]
8T["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 8U["customer-products"]
subgraph 8V["src"]
8W["index.ts"]
subgraph 8X["lib"]
8Y["customer-products.tsx"]
end
end
end
subgraph 8Z["customer-profile"]
subgraph 90["src"]
91["index.ts"]
subgraph 92["lib"]
93["customer-profile.tsx"]
94["customer-profile.spec.tsx"]
end
end
end
subgraph 95["customer-shopping-cart"]
subgraph 96["src"]
97["index.ts"]
subgraph 98["lib"]
99["customer-shopping-cart.tsx"]
9A["customer-shopping-cart.pants-size.spec.tsx"]
9B["customer-shopping-cart.spec.tsx"]
end
end
9C["vite.config.ts"]
end
subgraph 9D["customer-signup"]
subgraph 9E["src"]
9F["index.ts"]
subgraph 9G["lib"]
9H["customer-signup.tsx"]
9I["customer-signup.spec.tsx"]
end
end
end
subgraph 9J["forgot-password"]
subgraph 9K["src"]
9L["index.ts"]
subgraph 9M["lib"]
9N["customer-forgot-password.tsx"]
9O["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9P["guide-authenticity"]
subgraph 9Q["src"]
9R["index.ts"]
subgraph 9S["lib"]
9T["customer-guide-authenticity.tsx"]
9U["customer-guide-authenticity.spec.tsx"]
end
end
9V["vite.config.ts"]
end
subgraph 9W["guide-payment"]
subgraph 9X["src"]
9Y["index.ts"]
subgraph 9Z["lib"]
A0["customer-guide-payment.tsx"]
A1["customer-guide-payment.spec.tsx"]
end
end
A2["vite.config.ts"]
end
subgraph A3["home"]
subgraph A4["src"]
A5["index.ts"]
subgraph A6["lib"]
A7["CustomersHomeScreen.tsx"]
subgraph A8["components"]
A9["CategoryBentoSection.tsx"]
AB["HeroSection.tsx"]
AC["HomeLoadingScreen.tsx"]
AD["PicksRailSection.tsx"]
AE["TrustStripSection.tsx"]
AI["NewArrivalsSection.tsx"]
AJ["BrandBlocksSection.tsx"]
AK["NewsletterSection.tsx"]
AL["ShopTheLookSection.tsx"]
AM["TickerSection.tsx"]
end
AA["home-selectors.ts"]
AF["useScrollProgress.ts"]
AG["CustomersShopScreen.tsx"]
AH["CustomersHomeScreen.spec.tsx"]
end
end
end
subgraph AN["login"]
subgraph AO["src"]
AP["index.ts"]
subgraph AQ["lib"]
AR["CustomersLoginScreen.tsx"]
AS["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AT["not-found"]
subgraph AU["src"]
AV["index.ts"]
subgraph AW["lib"]
AX["customer-not-found.tsx"]
AY["customer-not-found.spec.tsx"]
end
end
AZ["vite.config.ts"]
end
subgraph B0["privacy-policy"]
subgraph B1["src"]
B2["index.ts"]
subgraph B3["lib"]
B4["customer-privacy-policy.tsx"]
B5["customer-privacy-policy.spec.tsx"]
end
end
B6["vite.config.ts"]
end
subgraph B7["product-details"]
subgraph B8["src"]
B9["index.ts"]
subgraph BA["lib"]
BB["customer-product-details.tsx"]
BC["customer-product-details.pants-size.spec.tsx"]
BD["customer-product-details.spec.tsx"]
end
end
BE["vite.config.ts"]
end
subgraph BF["reset-password"]
subgraph BG["src"]
BH["index.ts"]
subgraph BI["lib"]
BJ["customer-reset-password.tsx"]
end
end
end
subgraph BK["shipping-returns"]
subgraph BL["src"]
BM["index.ts"]
subgraph BN["lib"]
BO["customer-shipping-returns.tsx"]
BP["customer-shipping-returns.spec.tsx"]
end
end
BQ["vite.config.ts"]
end
subgraph BR["unauthorized"]
subgraph BS["src"]
BT["index.ts"]
subgraph BU["lib"]
BV["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BW["utility"]
subgraph BX["test"]
subgraph BY["src"]
BZ["index.ts"]
subgraph C0["lib"]
C1["customers-test-utility.tsx"]
end
end
end
end
subgraph C2["validations"]
subgraph C3["src"]
C4["index.ts"]
subgraph C5["lib"]
C6["shipping-validation.ts"]
C7["shipping-validation.spec.tsx"]
C8["shipping-validation.tsx"]
end
end
end
subgraph C9["zustand"]
subgraph CA["customer-cart-store"]
subgraph CB["src"]
CC["index.ts"]
subgraph CD["lib"]
CE["customer-cart-store.ts"]
CF["customer-cart-store.spec.ts"]
CG["customer-cart-store.tsx"]
end
end
end
subgraph CH["customer-checkout-store"]
subgraph CI["src"]
CJ["index.ts"]
subgraph CK["lib"]
CL["customer-checkout-store.ts"]
CM["customer-checkout-store.spec.ts"]
end
end
CN["vite.config.ts"]
end
subgraph CO["customer-wishlist-store"]
subgraph CP["src"]
CQ["index.ts"]
subgraph CR["lib"]
CS["customer-wishlist-store.ts"]
CT["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CU["src"]
CV["index.ts"]
subgraph CW["lib"]
CX["customers-products-store.tsx"]
end
end
end
end
subgraph CY["sellers"]
subgraph CZ["components"]
subgraph D0["footer"]
subgraph D1["src"]
D2["index.ts"]
subgraph D3["lib"]
D4["sellers-footer.tsx"]
D5["sellers-footer.spec.tsx"]
end
end
end
subgraph D6["headerbar"]
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["SellersHeaderbar.tsx"]
end
end
end
subgraph DB["layout"]
subgraph DC["src"]
DD["index.ts"]
subgraph DE["lib"]
DF["SellersLayout.tsx"]
DG["SellersTabbar.tsx"]
end
end
end
end
subgraph DH["contexts"]
subgraph DI["auth"]
subgraph DJ["src"]
DK["index.ts"]
subgraph DL["lib"]
DM["SellersAuthContext.tsx"]
DN["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DO["graphql"]
subgraph DP["src"]
DQ["index.ts"]
subgraph DR["lib"]
DS["fragments.ts"]
DT["mutations.ts"]
DU["Provider.tsx"]
DV["SellersApolloProvider.tsx"]
DW["client.ts"]
DX["queries.ts"]
DY["seller-orders.graphql.ts"]
DZ["apollo-upload-client.d.ts"]
end
subgraph E0["types"]
E1["apollo-upload-client.d.ts"]
end
end
end
subgraph E2["hooks"]
subgraph E3["auth"]
subgraph E4["src"]
E5["index.ts"]
subgraph E6["lib"]
E7["useSellerAuth.ts"]
E8["sellerAuth.graphql.ts"]
end
end
end
subgraph E9["orders"]
subgraph EA["src"]
EB["index.ts"]
subgraph EC["lib"]
ED["useSellerOrders.ts"]
end
end
end
subgraph EE["products"]
subgraph EF["src"]
EG["index.ts"]
subgraph EH["lib"]
EI["useSellersProductManagement.ts"]
EJ["useSellersProducts.ts"]
end
end
end
end
subgraph EK["router"]
subgraph EL["src"]
EM["index.ts"]
subgraph EN["lib"]
EO["SellersRouter.tsx"]
end
end
end
subgraph EP["routes"]
subgraph EQ["src"]
ER["index.ts"]
subgraph ES["lib"]
ET["seller-routes.ts"]
end
end
end
subgraph EU["screens"]
subgraph EV["catalog"]
subgraph EW["src"]
EX["index.ts"]
subgraph EY["lib"]
EZ["SellersCatalogScreens.tsx"]
F0["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F1["login"]
subgraph F2["src"]
F3["index.ts"]
subgraph F4["lib"]
F5["SellersLogin.tsx"]
end
end
end
subgraph F6["manage-product"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["SellersManageProductScreen.tsx"]
FB["SellersDefineProductFlow.tsx"]
FC["SellersDefineProductFlow.pants-label.spec.tsx"]
FD["SellersDefineProductFlow.spec.tsx"]
FE["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FF["products"]
subgraph FG["src"]
FH["index.ts"]
subgraph FI["lib"]
FJ["SellersProducts.tsx"]
FK["SellersProducts.pants-label.spec.tsx"]
FL["SellersProducts.spec.tsx"]
end
end
end
subgraph FM["seller-orders"]
FN["jest.config.ts"]
FO["jest.setup.ts"]
subgraph FP["src"]
FQ["index.ts"]
subgraph FR["lib"]
FS["seller-orders-screen.tsx"]
FT["seller-orders-screen.spec.tsx"]
end
FU["test-setup.ts"]
end
end
subgraph FV["setup-password"]
subgraph FW["src"]
FX["index.ts"]
subgraph FY["lib"]
FZ["SellersSetupPassword.tsx"]
end
end
end
subgraph G0["unauthorized"]
subgraph G1["src"]
G2["index.ts"]
subgraph G3["lib"]
G4["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G5["zustand"]
subgraph G6["sellers-products-store"]
subgraph G7["src"]
G8["index.ts"]
subgraph G9["lib"]
GA["useSellersProductsStore.ts"]
GB["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GC["shared"]
subgraph GD["components"]
subgraph GE["apollo-provider-base"]
subgraph GF["src"]
GG["index.ts"]
subgraph GH["lib"]
GI["ApolloProviderBase.tsx"]
GJ["createSilentRefreshAuthLink.ts"]
GK["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GL["error-boundary"]
subgraph GM["src"]
GN["index.ts"]
subgraph GO["lib"]
GP["error-boundary.tsx"]
GQ["error-boundary.spec.tsx"]
end
end
GR["vite.config.ts"]
end
subgraph GS["glassmorphism-container"]
subgraph GT["src"]
GU["index.ts"]
subgraph GV["lib"]
GW["glassmorphism-container.tsx"]
GX["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GY["layout"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["Layout.tsx"]
end
end
end
subgraph H3["material-data-table"]
subgraph H4["src"]
H5["index.ts"]
subgraph H6["lib"]
H7["material-data-table.tsx"]
H8["table-config.ts"]
H9["table-utils.ts"]
HA["material-data-table.spec.tsx"]
HB["table-types.ts"]
end
end
end
subgraph HC["order-status-chip"]
subgraph HD["src"]
HE["index.ts"]
subgraph HF["lib"]
HG["order-status-chip.tsx"]
HH["order-status-chip.spec.tsx"]
end
end
end
subgraph HI["password-field"]
subgraph HJ["src"]
HK["index.ts"]
subgraph HL["lib"]
HM["PasswordTextField.tsx"]
end
end
end
subgraph HN["price-display"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["price-display.tsx"]
HS["price-display.spec.tsx"]
end
end
end
subgraph HT["private-route"]
subgraph HU["src"]
HV["index.ts"]
subgraph HW["lib"]
HX["createPrivateRoute.tsx"]
HY["PrivateRoute.tsx"]
end
end
end
subgraph HZ["rtl-table-utils"]
subgraph I0["src"]
I1["index.ts"]
subgraph I2["lib"]
I3["rtl-table-utils.ts"]
I4["rtl-cell-components.tsx"]
I5["rtl-column-helpers.ts"]
I6["rtl-table-props.ts"]
I7["use-table-alignment.ts"]
I8["rtl-table-utils.spec.tsx"]
I9["rtl-table-utils.tsx"]
end
end
end
subgraph IA["snackbar"]
subgraph IB["src"]
IC["index.ts"]
subgraph ID["lib"]
IE["snackbar.tsx"]
IF["Snackbar.tsx"]
end
end
end
subgraph IG["styled-drawer"]
subgraph IH["src"]
II["index.ts"]
subgraph IJ["lib"]
IK["styled-drawer.tsx"]
IL["styled-drawer.spec.tsx"]
end
end
end
subgraph IM["unauthorized"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["unauthorized-path.tsx"]
end
end
end
end
subgraph IR["graphql"]
subgraph IS["src"]
IT["index.ts"]
subgraph IU["lib"]
IV["currency.mutations.ts"]
IW["currency.queries.ts"]
IX["fragments.ts"]
IY["variant-colors.ts"]
IZ["client-shared-graphql.tsx"]
end
end
end
subgraph J0["hooks"]
subgraph J1["brands"]
subgraph J2["src"]
J3["index.ts"]
subgraph J4["lib"]
J5["brands.graphql.ts"]
J6["useBrands.ts"]
end
end
J7["vite.config.ts"]
end
subgraph J8["categories"]
subgraph J9["src"]
JA["index.ts"]
subgraph JB["lib"]
JC["useCategories.ts"]
JD["categories.graphql.ts"]
end
end
end
subgraph JE["colors"]
subgraph JF["src"]
JG["index.ts"]
subgraph JH["lib"]
JI["useColors.ts"]
JJ["color.graphql.ts"]
end
end
end
subgraph JK["currency"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["useConvertPrice.tsx"]
JP["useExchangeRate.tsx"]
JQ["useCurrencies.tsx"]
JR["useCurrencyForLocale.tsx"]
JS["useExchangeRate.spec.tsx"]
end
end
end
subgraph JT["products"]
subgraph JU["src"]
JV["index.ts"]
subgraph JW["lib"]
JX["productImage.ts"]
JY["products.graphql.ts"]
JZ["useProducts.ts"]
K0["productImage.spec.ts"]
end
end
end
subgraph K1["site-languages"]
subgraph K2["src"]
K3["index.ts"]
subgraph K4["lib"]
K5["site-languages.graphql.ts"]
K6["useSiteLanguages.ts"]
K7["site-languages-hook.spec.tsx"]
end
end
K8["vite.config.ts"]
end
subgraph K9["snackbar"]
subgraph KA["src"]
KB["index.ts"]
subgraph KC["lib"]
KD["SnackbarContext.tsx"]
KE["useSnackbar.ts"]
end
end
end
subgraph KF["translations-management-hook"]
subgraph KG["src"]
KH["index.ts"]
subgraph KI["lib"]
KJ["useTranslationsManagement.ts"]
end
end
end
end
subgraph KK["lottie"]
subgraph KL["empty-cart"]
subgraph KM["src"]
KN["index.ts"]
subgraph KO["lib"]
KP["lottie-empty-cart.tsx"]
KQ["lottie-empty-cart.spec.tsx"]
end
end
KR["vite.config.ts"]
end
subgraph KS["loading"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["lottie-loading.tsx"]
KX["lottie-loading.spec.tsx"]
end
end
end
subgraph KY["success-check"]
subgraph KZ["src"]
L0["index.ts"]
subgraph L1["lib"]
L2["lottie-success-check.tsx"]
L3["lottie-success-check.spec.tsx"]
end
end
end
subgraph L4["unauthorized"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["lottie-unauthorized.tsx"]
end
end
end
end
subgraph L9["translations"]
subgraph LA["src"]
LB["index.ts"]
subgraph LC["lib"]
LD["mapApolloErrorToTranslationKey.ts"]
LE["WrapTranslation.tsx"]
end
end
end
subgraph LF["ui"]
subgraph LG["colors"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["colors.ts"]
end
end
end
subgraph LL["language-components"]
subgraph LM["src"]
LN["index.ts"]
subgraph LO["lib"]
LP["language-components.tsx"]
LQ["ltr-text-field.tsx"]
end
end
end
subgraph LR["sizes"]
subgraph LS["src"]
LT["index.ts"]
subgraph LU["lib"]
LV["sizes.ts"]
LW["sizes.spec.tsx"]
LX["sizes.tsx"]
end
end
end
end
subgraph LY["zustand"]
subgraph LZ["shared-auth-store"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["shared-auth-store.ts"]
end
end
end
subgraph M4["shared-notification-store"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["shared-notification-store.tsx"]
end
end
end
subgraph M9["shared-ui-store"]
subgraph MA["src"]
MB["index.ts"]
subgraph MC["lib"]
MD["shared-ui-store.ts"]
ME["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MF["server"]
subgraph MG["controllers"]
subgraph MH["src"]
MI["index.ts"]
subgraph MJ["lib"]
MK["auth.controller.ts"]
ML["order.controller.ts"]
end
end
end
subgraph MM["decorators"]
MN["jest.config.ts"]
subgraph MO["src"]
MP["index.ts"]
subgraph MQ["lib"]
MR["current-user.decorator.ts"]
MS["decorators.ts"]
MT["decorators.spec.ts"]
end
end
end
subgraph MU["entities"]
subgraph MV["src"]
MW["index.ts"]
subgraph MX["lib"]
MY["brand.entity.ts"]
MZ["product.entity.ts"]
N0["category.entity.ts"]
N1["product-description.entity.ts"]
N2["site-language.entity.ts"]
N3["product-info.entity.ts"]
N4["color.entity.ts"]
N5["product-info-color.entity.ts"]
N6["seller-info.entity.ts"]
N7["seller-product.entity.ts"]
N8["user.entity.ts"]
N9["cart.entity.ts"]
NA["currency-preference.entity.ts"]
NB["currency.entity.ts"]
NC["customer.entity.ts"]
ND["exchange-rate.entity.ts"]
NE["order.entity.ts"]
NF["platform-settings.entity.ts"]
NG["refresh-token.entity.ts"]
NH["seller-order.entity.ts"]
NI["translation.entity.ts"]
end
end
end
subgraph NJ["guards"]
NK["jest.config.ts"]
subgraph NL["src"]
NM["index.ts"]
subgraph NN["lib"]
NO["catalog.guard.ts"]
NP["graphql-auth.guard.ts"]
NQ["http-auth.guard.ts"]
NR["roles.guard.ts"]
NS["catalog.guard.spec.ts"]
NT["roles.guard.spec.ts"]
end
end
end
subgraph NU["inputs"]
subgraph NV["src"]
NW["index.ts"]
subgraph NX["lib"]
NY["brand.input.ts"]
NZ["cart.inputs.ts"]
O0["category.input.ts"]
O1["color.input.ts"]
O2["customer-auth.inputs.ts"]
O3["order-pagination.inputs.ts"]
O4["order.inputs.ts"]
O5["product-info-filter.input.ts"]
O6["product.input.ts"]
O7["seller-order-pagination.inputs.ts"]
O8["seller.input.ts"]
O9["site-language.input.ts"]
OA["user.input.ts"]
end
end
end
subgraph OB["modules"]
subgraph OC["src"]
OD["index.ts"]
subgraph OE["lib"]
OF["auth.module.ts"]
OG["email.module.ts"]
OH["token.module.ts"]
OI["user.module.ts"]
OJ["customer-profile.module.ts"]
OK["brand.module.ts"]
OL["catalog-guard.module.ts"]
OM["translation.module.ts"]
ON["cart.module.ts"]
OO["platform-settings.module.ts"]
OP["category.module.ts"]
OQ["product.module.ts"]
OR["color.module.ts"]
OS["currency.module.ts"]
OT["graphql-context.module.ts"]
OU["order.module.ts"]
OV["seller-info.module.ts"]
OW["payment.module.ts"]
OX["product-info.module.ts"]
OY["seller-products.module.ts"]
OZ["site-language.module.ts"]
end
end
end
subgraph P0["resolvers"]
P1["jest.config.ts"]
subgraph P2["src"]
P3["index.ts"]
subgraph P4["lib"]
P5["auth.resolver.ts"]
P6["brand.resolver.ts"]
P7["cart.resolver.ts"]
P8["category.resolver.ts"]
P9["color.resolver.ts"]
PA["currency.resolver.ts"]
PB["customer-profile.resolver.ts"]
PC["order.resolver.ts"]
PD["payment.resolver.ts"]
PE["product-info.resolver.ts"]
PF["product.resolver.ts"]
PG["seller-info.resolver.ts"]
PH["shipping.resolver.ts"]
PI["site-language.resolver.ts"]
PJ["translation.input.ts"]
PK["translation.resolver.ts"]
PL["user.resolver.ts"]
PM["auth.resolver.spec.ts"]
PN["order.resolver.spec.ts"]
PO["payment.resolver.integration.spec.ts"]
PP["payment.resolver.spec.ts"]
PQ["product-info.resolver.spec.ts"]
subgraph PR["types"]
PS["graphql-upload.d.ts"]
end
PT["user.resolver.spec.ts"]
end
end
end
subgraph PU["services"]
PV["jest.config.ts"]
subgraph PW["src"]
PX["index.ts"]
subgraph PY["lib"]
PZ["auth.service.ts"]
Q0["brand.service.ts"]
Q1["cart.service.ts"]
Q2["product-info-colors.util.ts"]
Q3["category.service.ts"]
Q4["color.service.ts"]
Q5["currency.service.ts"]
Q6["customer-profile.service.ts"]
Q7["email.service.ts"]
Q8["image-upload.service.ts"]
Q9["order.service.ts"]
QA["payment-logger.service.ts"]
QB["payment.service.ts"]
QC["product.service.ts"]
QD["seller-info.service.ts"]
QE["shipping-calculation.service.ts"]
QF["site-language.service.ts"]
QG["token.service.ts"]
QH["translation.service.ts"]
QI["user.service.ts"]
QJ["auth.service.spec.ts"]
QK["cart.service.spec.ts"]
QL["order.service.spec.ts"]
QM["product-info-colors.util.spec.ts"]
QN["product.service.pants.spec.ts"]
QO["product.service.spec.ts"]
QP["relay-connection.spec.ts"]
QQ["shipping-calculation.service.spec.ts"]
QR["token.service.spec.ts"]
end
end
end
subgraph QS["strategies"]
subgraph QT["src"]
QU["index.ts"]
subgraph QV["lib"]
QW["local.strategy.ts"]
end
end
end
subgraph QX["utils"]
subgraph QY["src"]
QZ["index.ts"]
subgraph R0["lib"]
R1["email-templates.ts"]
R2["relay-connection.ts"]
R3["pagination.ts"]
end
end
end
end
subgraph R4["shared"]
subgraph R5["codegen"]
R6["jest.config.ts"]
subgraph R7["src"]
R8["index.ts"]
subgraph R9["lib"]
subgraph RA["generated"]
RB["graphql.ts"]
end
end
end
end
subgraph RC["graphql-schema"]
RD["jest.config.ts"]
subgraph RE["src"]
RF["index.ts"]
end
end
subgraph RG["product-sizes"]
subgraph RH["src"]
RI["index.ts"]
subgraph RJ["lib"]
RK["product-sizes.ts"]
RL["product-sizes.pants-formats.spec.ts"]
RM["product-sizes.pants-label.spec.ts"]
RN["product-sizes.pants-strict.spec.ts"]
RO["product-sizes.spec.ts"]
end
end
end
subgraph RP["shared-i18n"]
subgraph RQ["src"]
RR["index.ts"]
subgraph RS["lib"]
RT["language-context.tsx"]
RU["language-detector.ts"]
subgraph RV["locales"]
RW["i18n-react.tsx"]
RX["i18n-util.ts"]
RY["i18n-util.async.ts"]
subgraph RZ["en"]
S0["index.ts"]
end
subgraph S2["fa"]
S3["index.ts"]
end
S4["formatters.ts"]
S5["i18n-types.ts"]
S6["i18n-util.sync.ts"]
S7["navigator-detector.ts"]
end
S1["site-name.ts"]
S8["table-localization.ts"]
S9["theme-provider.tsx"]
SA["use-page-title.ts"]
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
5T-->5R
5Y-->60
61-->60
64-->66
64-->67
64-->68
64-->6B
68-->69
69-->6A
6G-->6I
6G-->6J
6G-->6K
6G-->6L
6M-->6J
6R-->6T
6R-->6U
6R-->6V
6W-->6U
6X-->6T
70-->72
75-->77
7A-->7C
7A-->7D
7C-->7D
7E-->7C
7F-->7D
7I-->7K
7L-->7K
7P-->7R
7S-->7R
7W-->7Y
81-->83
84-->83
88-->8A
8D-->8F
8G-->8F
8J-->8L
8O-->8Q
8O-->8R
8O-->8S
8Q-->8R
8R-->8S
8T-->8Q
8W-->8Y
91-->93
94-->93
97-->99
9A-->99
9B-->99
9F-->9H
9I-->9H
9L-->9N
9O-->9N
9R-->9T
9U-->9T
9Y-->A0
A1-->A0
A5-->A7
A5-->AG
A5-->AA
A5-->AF
A7-->A9
A7-->AB
A7-->AC
A7-->AD
A7-->AE
A7-->AA
A7-->AF
A9-->AA
AG-->AA
AH-->AI
AH-->AD
AH-->A7
AH-->AG
AH-->AA
AJ-->AA
AL-->AA
AP-->AR
AS-->AR
AV-->AX
AY-->AX
B2-->B4
B5-->B4
B9-->BB
BC-->BB
BD-->BB
BH-->BJ
BM-->BO
BP-->BO
BT-->BV
BZ-->C1
C4-->C6
C7-->C6
C7-->C8
CC-->CE
CF-->CE
CJ-->CL
CM-->CL
CQ-->CS
CT-->CS
CV-->CX
D2-->D4
D5-->D4
D8-->DA
DD-->DF
DD-->DG
DF-->DG
DK-->DM
DN-->DM
DQ-->DS
DQ-->DT
DQ-->DU
DQ-->DX
DU-->DV
DV-->DW
DX-->DS
DX-->DY
E5-->E7
E7-->E8
EB-->ED
EG-->EI
EG-->EJ
EM-->EO
ER-->ET
EX-->EZ
F0-->EZ
F3-->F5
F8-->FA
FA-->FB
FC-->FB
FD-->FB
FE-->FA
FH-->FJ
FK-->FJ
FL-->FJ
FQ-->FS
FT-->FS
FX-->FZ
G2-->G4
G8-->GA
GG-->GI
GG-->GJ
GK-->GJ
GN-->GP
GQ-->GP
GU-->GW
GX-->GW
H0-->H2
H5-->H7
H5-->H8
H5-->H9
H7-->H8
HA-->H7
HE-->HG
HH-->HG
HK-->HM
HP-->HR
HS-->HR
HV-->HX
HX-->HY
I1-->I3
I3-->I4
I3-->I5
I3-->I6
I3-->I7
I5-->I4
I5-->I6
I8-->I9
IC-->IE
II-->IK
IL-->IK
IO-->IQ
IT-->IV
IT-->IW
IT-->IX
IT-->IY
J3-->J5
J3-->J6
J6-->J5
JA-->JC
JC-->JD
JG-->JI
JI-->JJ
JM-->JO
JM-->JQ
JM-->JR
JM-->JP
JO-->JP
JS-->JP
JV-->JX
JV-->JY
JV-->JZ
JZ-->JY
K0-->JX
K3-->K5
K3-->K6
K6-->K5
K7-->K6
KB-->KD
KB-->KE
KE-->KD
KH-->KJ
KN-->KP
KQ-->KP
KU-->KW
KX-->KW
L0-->L2
L3-->L2
L6-->L8
LB-->LD
LI-->LK
LN-->LP
LN-->LQ
LT-->LV
LW-->LX
M1-->M3
M6-->M8
MB-->MD
MI-->MK
MI-->ML
MP-->MR
MP-->MS
MT-->MS
MW-->MY
MW-->N9
MW-->N0
MW-->N4
MW-->NA
MW-->NB
MW-->NC
MW-->ND
MW-->NE
MW-->NF
MW-->N1
MW-->N5
MW-->N3
MW-->MZ
MW-->NG
MW-->N6
MW-->NH
MW-->N7
MW-->N2
MW-->NI
MW-->N8
MY-->MZ
MZ-->MY
MZ-->N0
MZ-->N1
MZ-->N3
MZ-->N6
MZ-->N7
N0-->MZ
N1-->MZ
N1-->N2
N2-->N1
N3-->N4
N3-->N5
N3-->MZ
N5-->N4
N5-->N3
N6-->N7
N6-->N8
N7-->N3
N7-->MZ
N7-->N6
N9-->MZ
N9-->N8
NA-->NB
NC-->N8
ND-->NB
ND-->N8
NE-->MZ
NE-->N6
NG-->N8
NH-->NE
NM-->NO
NM-->NP
NM-->NQ
NM-->NR
NS-->NO
NT-->NR
NW-->NY
NW-->NZ
NW-->O0
NW-->O1
NW-->O2
NW-->O3
NW-->O4
NW-->O5
NW-->O6
NW-->O7
NW-->O8
NW-->O9
NW-->OA
O6-->O5
OD-->OF
OD-->OK
OD-->ON
OD-->OL
OD-->OP
OD-->OR
OD-->OS
OD-->OJ
OD-->OG
OD-->OT
OD-->OU
OD-->OW
OD-->OO
OD-->OX
OD-->OQ
OD-->OV
OD-->OY
OD-->OZ
OD-->OH
OD-->OM
OD-->OI
OF-->OG
OF-->OH
OF-->OI
OI-->OF
OI-->OJ
OK-->OL
OK-->OM
ON-->OO
OP-->OL
OP-->OQ
OP-->OM
OQ-->OL
OQ-->OH
OQ-->OM
OR-->OL
OR-->OM
OT-->OG
OT-->OH
OT-->OI
OU-->OO
OU-->OV
OV-->OQ
OV-->OH
OV-->OI
OW-->OU
OX-->OQ
OX-->OM
OY-->OV
OY-->OI
P3-->P5
P3-->P6
P3-->P7
P3-->P8
P3-->P9
P3-->PA
P3-->PB
P3-->PC
P3-->PD
P3-->PE
P3-->PF
P3-->PG
P3-->PH
P3-->PI
P3-->PJ
P3-->PK
P3-->PL
PM-->P5
PN-->PC
PO-->PD
PP-->PD
PQ-->PE
PT-->PL
PX-->PZ
PX-->Q0
PX-->Q1
PX-->Q3
PX-->Q4
PX-->Q5
PX-->Q6
PX-->Q7
PX-->Q8
PX-->Q9
PX-->QA
PX-->QB
PX-->Q2
PX-->QC
PX-->QD
PX-->QE
PX-->QF
PX-->QG
PX-->QH
PX-->QI
Q1-->Q2
QC-->Q2
QD-->Q2
QJ-->PZ
QJ-->Q7
QJ-->QG
QJ-->QI
QK-->Q1
QL-->Q9
QM-->Q2
QN-->QC
QN-->QH
QO-->QC
QO-->QH
QQ-->QE
QR-->QG
QU-->QW
QZ-->R1
QZ-->R2
R8-->RB
RI-->RK
RL-->RK
RM-->RK
RN-->RK
RO-->RK
RR-->RT
RR-->RU
RR-->RW
RR-->S5
RR-->RX
RR-->RY
RR-->S6
RR-->S7
RR-->S1
RR-->S8
RR-->S9
RR-->SA
RT-->RU
RT-->RW
RT-->RY
RW-->RX
RY-->S0
RY-->S3
RY-->S4
RY-->RX
S0-->S1
S3-->S1
S6-->S0
S6-->S3
S6-->S4
S6-->RX
S8-->RW
S9-->RT
SA-->RW
