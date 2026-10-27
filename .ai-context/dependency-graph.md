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
3S["AdminProductEditor.spec.tsx"]
end
3T["vite-env.d.ts"]
end
end
subgraph 3U["products"]
subgraph 3V["src"]
3W["index.spec.tsx"]
3X["index.ts"]
subgraph 3Y["lib"]
3Z["AdminProducts.tsx"]
40["adminProducts.hooks.ts"]
41["adminProducts.graphql.ts"]
42["ProductImageManagementModal.tsx"]
43["AdminProducts.spec.tsx"]
44["ProductImageManagementModal.spec.tsx"]
end
45["vite-env.d.ts"]
end
end
subgraph 46["seller-management"]
subgraph 47["src"]
48["index.spec.tsx"]
49["index.ts"]
subgraph 4A["lib"]
4B["SellerManagement.tsx"]
4C["SellerManagement.spec.tsx"]
end
4D["vite-env.d.ts"]
end
end
subgraph 4E["translation-management"]
subgraph 4F["src"]
4G["index.ts"]
subgraph 4H["lib"]
4I["AdminTranslationManagement.tsx"]
4J["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4K["unauthorized"]
subgraph 4L["src"]
4M["index.spec.tsx"]
4N["index.ts"]
subgraph 4O["lib"]
4P["admins-unauthorized-screen.tsx"]
4Q["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4R["zustand"]
subgraph 4S["admins-products-store"]
subgraph 4T["src"]
4U["index.spec.ts"]
4V["index.ts"]
subgraph 4W["lib"]
4X["admins-products-store.ts"]
4Y["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 4Z["customers"]
subgraph 50["components"]
subgraph 51["footer"]
subgraph 52["src"]
53["index.ts"]
subgraph 54["lib"]
55["customers-footer.tsx"]
56["TrustBadgeIcons.tsx"]
57["customers-footer.spec.tsx"]
end
end
end
subgraph 58["headerbar"]
subgraph 59["src"]
5A["index.ts"]
subgraph 5B["lib"]
5C["CustomersHeaderbar.tsx"]
5D["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5E["layout"]
subgraph 5F["src"]
5G["index.ts"]
subgraph 5H["lib"]
5I["CustomersLayout.tsx"]
5J["CustomersTabbar.tsx"]
5K["CustomersLayout.spec.tsx"]
5L["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5M["product-card"]
subgraph 5N["src"]
5O["index.ts"]
subgraph 5P["lib"]
5Q["CustomersProductCard.tsx"]
5R["CustomersProductCard.spec.tsx"]
end
5S["vite-env.d.ts"]
end
end
end
subgraph 5T["contexts"]
subgraph 5U["auth"]
subgraph 5V["src"]
5W["index.ts"]
subgraph 5X["lib"]
5Y["CustomersAuthContext.tsx"]
5Z["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 60["graphql"]
subgraph 61["src"]
62["index.ts"]
subgraph 63["lib"]
64["customer-profile.queries.ts"]
65["mutations.ts"]
66["Provider.tsx"]
67["CustomersApolloProvider.tsx"]
68["client.ts"]
69["queries.ts"]
6A["apollo-upload-client.d.ts"]
end
end
end
subgraph 6B["hooks"]
subgraph 6C["auth"]
subgraph 6D["src"]
6E["index.ts"]
subgraph 6F["lib"]
6G["useCustomersForgotPassword.tsx"]
6H["useCustomersLogin.tsx"]
6I["useCustomersRegister.tsx"]
6J["useCustomersResetPassword.tsx"]
6K["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6L["cart"]
subgraph 6M["src"]
6N["index.ts"]
subgraph 6O["lib"]
6P["customers-cart-hook.tsx"]
6Q["useCartService.ts"]
6R["useWishlistSync.ts"]
6S["useCartSync.ts"]
end
end
end
subgraph 6T["orders"]
subgraph 6U["src"]
6V["index.ts"]
subgraph 6W["lib"]
6X["customers-orders-hook.tsx"]
end
end
end
subgraph 6Y["products"]
subgraph 6Z["src"]
70["index.ts"]
subgraph 71["lib"]
72["customers-product-hook.tsx"]
end
end
end
end
subgraph 73["router"]
subgraph 74["src"]
75["index.ts"]
subgraph 76["lib"]
77["CustomersRouter.tsx"]
78["ScrollToTop.tsx"]
79["CustomersRouter.spec.tsx"]
7A["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7B["routes"]
subgraph 7C["src"]
7D["index.ts"]
subgraph 7E["lib"]
7F["customer-routes.ts"]
7G["customer-routes.spec.ts"]
end
end
end
subgraph 7H["screens"]
subgraph 7I["contact"]
subgraph 7J["src"]
7K["index.ts"]
subgraph 7L["lib"]
7M["customer-contact.tsx"]
7N["customer-contact.spec.tsx"]
end
end
7O["vite.config.ts"]
end
subgraph 7P["customer-checkout"]
subgraph 7Q["src"]
7R["index.ts"]
subgraph 7S["lib"]
7T["customer-checkout.tsx"]
end
end
end
subgraph 7U["customer-favorites"]
subgraph 7V["src"]
7W["index.ts"]
subgraph 7X["lib"]
7Y["customer-favorites.tsx"]
7Z["customer-favorites.spec.tsx"]
end
end
80["vite.config.ts"]
end
subgraph 81["customer-login"]
subgraph 82["src"]
83["index.ts"]
subgraph 84["lib"]
85["customer-login.tsx"]
end
end
end
subgraph 86["customer-order-confirmation"]
subgraph 87["src"]
88["index.ts"]
subgraph 89["lib"]
8A["customer-order-confirmation.tsx"]
8B["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8C["customer-orders"]
subgraph 8D["src"]
8E["index.ts"]
subgraph 8F["lib"]
8G["customer-orders.tsx"]
end
end
end
subgraph 8H["customer-payment"]
subgraph 8I["src"]
8J["index.ts"]
subgraph 8K["lib"]
8L["customer-payment-callback.tsx"]
8M["use-zarinpal-payment.tsx"]
8N["zarinpal-payment-service.ts"]
end
end
end
subgraph 8O["customer-products"]
subgraph 8P["src"]
8Q["index.ts"]
subgraph 8R["lib"]
8S["customer-products.tsx"]
end
end
end
subgraph 8T["customer-profile"]
subgraph 8U["src"]
8V["index.ts"]
subgraph 8W["lib"]
8X["customer-profile.tsx"]
8Y["customer-profile.spec.tsx"]
end
end
end
subgraph 8Z["customer-shopping-cart"]
subgraph 90["src"]
91["index.ts"]
subgraph 92["lib"]
93["customer-shopping-cart.tsx"]
94["customer-shopping-cart.spec.tsx"]
end
end
95["vite.config.ts"]
end
subgraph 96["customer-signup"]
subgraph 97["src"]
98["index.ts"]
subgraph 99["lib"]
9A["customer-signup.tsx"]
9B["customer-signup.spec.tsx"]
end
end
end
subgraph 9C["forgot-password"]
subgraph 9D["src"]
9E["index.ts"]
subgraph 9F["lib"]
9G["customer-forgot-password.tsx"]
9H["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9I["guide-authenticity"]
subgraph 9J["src"]
9K["index.ts"]
subgraph 9L["lib"]
9M["customer-guide-authenticity.tsx"]
9N["customer-guide-authenticity.spec.tsx"]
end
end
9O["vite.config.ts"]
end
subgraph 9P["guide-payment"]
subgraph 9Q["src"]
9R["index.ts"]
subgraph 9S["lib"]
9T["customer-guide-payment.tsx"]
9U["customer-guide-payment.spec.tsx"]
end
end
9V["vite.config.ts"]
end
subgraph 9W["home"]
subgraph 9X["src"]
9Y["index.ts"]
subgraph 9Z["lib"]
A0["CustomersHomeScreen.tsx"]
subgraph A1["components"]
A2["CategoryBentoSection.tsx"]
A4["HeroSection.tsx"]
A5["HomeLoadingScreen.tsx"]
A6["PicksRailSection.tsx"]
A7["TrustStripSection.tsx"]
AB["NewArrivalsSection.tsx"]
AC["BrandBlocksSection.tsx"]
AD["NewsletterSection.tsx"]
AE["ShopTheLookSection.tsx"]
AF["TickerSection.tsx"]
end
A3["home-selectors.ts"]
A8["useScrollProgress.ts"]
A9["CustomersShopScreen.tsx"]
AA["CustomersHomeScreen.spec.tsx"]
end
end
end
subgraph AG["login"]
subgraph AH["src"]
AI["index.ts"]
subgraph AJ["lib"]
AK["CustomersLoginScreen.tsx"]
AL["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AM["not-found"]
subgraph AN["src"]
AO["index.ts"]
subgraph AP["lib"]
AQ["customer-not-found.tsx"]
AR["customer-not-found.spec.tsx"]
end
end
AS["vite.config.ts"]
end
subgraph AT["privacy-policy"]
subgraph AU["src"]
AV["index.ts"]
subgraph AW["lib"]
AX["customer-privacy-policy.tsx"]
AY["customer-privacy-policy.spec.tsx"]
end
end
AZ["vite.config.ts"]
end
subgraph B0["product-details"]
subgraph B1["src"]
B2["index.ts"]
subgraph B3["lib"]
B4["customer-product-details.tsx"]
B5["customer-product-details.spec.tsx"]
end
end
B6["vite.config.ts"]
end
subgraph B7["reset-password"]
subgraph B8["src"]
B9["index.ts"]
subgraph BA["lib"]
BB["customer-reset-password.tsx"]
end
end
end
subgraph BC["shipping-returns"]
subgraph BD["src"]
BE["index.ts"]
subgraph BF["lib"]
BG["customer-shipping-returns.tsx"]
BH["customer-shipping-returns.spec.tsx"]
end
end
BI["vite.config.ts"]
end
subgraph BJ["unauthorized"]
subgraph BK["src"]
BL["index.ts"]
subgraph BM["lib"]
BN["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BO["utility"]
subgraph BP["test"]
subgraph BQ["src"]
BR["index.ts"]
subgraph BS["lib"]
BT["customers-test-utility.tsx"]
end
end
end
end
subgraph BU["validations"]
subgraph BV["src"]
BW["index.ts"]
subgraph BX["lib"]
BY["shipping-validation.ts"]
BZ["shipping-validation.spec.tsx"]
C0["shipping-validation.tsx"]
end
end
end
subgraph C1["zustand"]
subgraph C2["customer-cart-store"]
subgraph C3["src"]
C4["index.ts"]
subgraph C5["lib"]
C6["customer-cart-store.ts"]
C7["customer-cart-store.spec.ts"]
C8["customer-cart-store.tsx"]
end
end
end
subgraph C9["customer-checkout-store"]
subgraph CA["src"]
CB["index.ts"]
subgraph CC["lib"]
CD["customer-checkout-store.ts"]
CE["customer-checkout-store.spec.ts"]
end
end
CF["vite.config.ts"]
end
subgraph CG["customer-wishlist-store"]
subgraph CH["src"]
CI["index.ts"]
subgraph CJ["lib"]
CK["customer-wishlist-store.ts"]
CL["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CM["src"]
CN["index.ts"]
subgraph CO["lib"]
CP["customers-products-store.tsx"]
end
end
end
end
subgraph CQ["sellers"]
subgraph CR["components"]
subgraph CS["footer"]
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["sellers-footer.tsx"]
CX["sellers-footer.spec.tsx"]
end
end
end
subgraph CY["headerbar"]
subgraph CZ["src"]
D0["index.ts"]
subgraph D1["lib"]
D2["SellersHeaderbar.tsx"]
end
end
end
subgraph D3["layout"]
subgraph D4["src"]
D5["index.ts"]
subgraph D6["lib"]
D7["SellersLayout.tsx"]
D8["SellersTabbar.tsx"]
end
end
end
end
subgraph D9["contexts"]
subgraph DA["auth"]
subgraph DB["src"]
DC["index.ts"]
subgraph DD["lib"]
DE["SellersAuthContext.tsx"]
DF["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DG["graphql"]
subgraph DH["src"]
DI["index.ts"]
subgraph DJ["lib"]
DK["fragments.ts"]
DL["mutations.ts"]
DM["Provider.tsx"]
DN["SellersApolloProvider.tsx"]
DO["client.ts"]
DP["queries.ts"]
DQ["seller-orders.graphql.ts"]
DR["apollo-upload-client.d.ts"]
end
subgraph DS["types"]
DT["apollo-upload-client.d.ts"]
end
end
end
subgraph DU["hooks"]
subgraph DV["auth"]
subgraph DW["src"]
DX["index.ts"]
subgraph DY["lib"]
DZ["useSellerAuth.ts"]
E0["sellerAuth.graphql.ts"]
end
end
end
subgraph E1["orders"]
subgraph E2["src"]
E3["index.ts"]
subgraph E4["lib"]
E5["useSellerOrders.ts"]
end
end
end
subgraph E6["products"]
subgraph E7["src"]
E8["index.ts"]
subgraph E9["lib"]
EA["useSellersProductManagement.ts"]
EB["useSellersProducts.ts"]
end
end
end
end
subgraph EC["router"]
subgraph ED["src"]
EE["index.ts"]
subgraph EF["lib"]
EG["SellersRouter.tsx"]
end
end
end
subgraph EH["routes"]
subgraph EI["src"]
EJ["index.ts"]
subgraph EK["lib"]
EL["seller-routes.ts"]
end
end
end
subgraph EM["screens"]
subgraph EN["catalog"]
subgraph EO["src"]
EP["index.ts"]
subgraph EQ["lib"]
ER["SellersCatalogScreens.tsx"]
ES["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph ET["login"]
subgraph EU["src"]
EV["index.ts"]
subgraph EW["lib"]
EX["SellersLogin.tsx"]
end
end
end
subgraph EY["manage-product"]
subgraph EZ["src"]
F0["index.ts"]
subgraph F1["lib"]
F2["SellersManageProductScreen.tsx"]
F3["SellersDefineProductFlow.tsx"]
F4["SellersDefineProductFlow.spec.tsx"]
F5["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph F6["products"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["SellersProducts.tsx"]
FB["SellersProducts.spec.tsx"]
end
end
end
subgraph FC["seller-orders"]
subgraph FD["src"]
FE["index.ts"]
subgraph FF["lib"]
FG["seller-orders-screen.tsx"]
end
end
end
subgraph FH["setup-password"]
subgraph FI["src"]
FJ["index.ts"]
subgraph FK["lib"]
FL["SellersSetupPassword.tsx"]
end
end
end
subgraph FM["unauthorized"]
subgraph FN["src"]
FO["index.ts"]
subgraph FP["lib"]
FQ["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph FR["zustand"]
subgraph FS["sellers-products-store"]
subgraph FT["src"]
FU["index.ts"]
subgraph FV["lib"]
FW["useSellersProductsStore.ts"]
FX["sellers-products-store.tsx"]
end
end
end
end
end
subgraph FY["shared"]
subgraph FZ["components"]
subgraph G0["apollo-provider-base"]
subgraph G1["src"]
G2["index.ts"]
subgraph G3["lib"]
G4["ApolloProviderBase.tsx"]
G5["createSilentRefreshAuthLink.ts"]
G6["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph G7["error-boundary"]
subgraph G8["src"]
G9["index.ts"]
subgraph GA["lib"]
GB["error-boundary.tsx"]
GC["error-boundary.spec.tsx"]
end
end
GD["vite.config.ts"]
end
subgraph GE["glassmorphism-container"]
subgraph GF["src"]
GG["index.ts"]
subgraph GH["lib"]
GI["glassmorphism-container.tsx"]
GJ["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GK["layout"]
subgraph GL["src"]
GM["index.ts"]
subgraph GN["lib"]
GO["Layout.tsx"]
end
end
end
subgraph GP["material-data-table"]
subgraph GQ["src"]
GR["index.ts"]
subgraph GS["lib"]
GT["material-data-table.tsx"]
GU["table-config.ts"]
GV["table-utils.ts"]
GW["material-data-table.spec.tsx"]
GX["table-types.ts"]
end
end
end
subgraph GY["order-status-chip"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["order-status-chip.tsx"]
H3["order-status-chip.spec.tsx"]
end
end
end
subgraph H4["password-field"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["PasswordTextField.tsx"]
end
end
end
subgraph H9["price-display"]
subgraph HA["src"]
HB["index.ts"]
subgraph HC["lib"]
HD["price-display.tsx"]
HE["price-display.spec.tsx"]
end
end
end
subgraph HF["private-route"]
subgraph HG["src"]
HH["index.ts"]
subgraph HI["lib"]
HJ["createPrivateRoute.tsx"]
HK["PrivateRoute.tsx"]
end
end
end
subgraph HL["rtl-table-utils"]
subgraph HM["src"]
HN["index.ts"]
subgraph HO["lib"]
HP["rtl-table-utils.ts"]
HQ["rtl-cell-components.tsx"]
HR["rtl-column-helpers.ts"]
HS["rtl-table-props.ts"]
HT["use-table-alignment.ts"]
HU["rtl-table-utils.spec.tsx"]
HV["rtl-table-utils.tsx"]
end
end
end
subgraph HW["snackbar"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["snackbar.tsx"]
I1["Snackbar.tsx"]
end
end
end
subgraph I2["styled-drawer"]
subgraph I3["src"]
I4["index.ts"]
subgraph I5["lib"]
I6["styled-drawer.tsx"]
I7["styled-drawer.spec.tsx"]
end
end
end
subgraph I8["unauthorized"]
subgraph I9["src"]
IA["index.ts"]
subgraph IB["lib"]
IC["unauthorized-path.tsx"]
end
end
end
end
subgraph ID["graphql"]
subgraph IE["src"]
IF["index.ts"]
subgraph IG["lib"]
IH["currency.mutations.ts"]
II["currency.queries.ts"]
IJ["fragments.ts"]
IK["variant-colors.ts"]
IL["client-shared-graphql.tsx"]
end
end
end
subgraph IM["hooks"]
subgraph IN["brands"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["brands.graphql.ts"]
IS["useBrands.ts"]
end
end
IT["vite.config.ts"]
end
subgraph IU["categories"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["useCategories.ts"]
IZ["categories.graphql.ts"]
end
end
end
subgraph J0["colors"]
subgraph J1["src"]
J2["index.ts"]
subgraph J3["lib"]
J4["useColors.ts"]
J5["color.graphql.ts"]
end
end
end
subgraph J6["currency"]
subgraph J7["src"]
J8["index.ts"]
subgraph J9["lib"]
JA["useConvertPrice.tsx"]
JB["useExchangeRate.tsx"]
JC["useCurrencies.tsx"]
JD["useCurrencyForLocale.tsx"]
end
end
end
subgraph JE["products"]
subgraph JF["src"]
JG["index.ts"]
subgraph JH["lib"]
JI["productImage.ts"]
JJ["products.graphql.ts"]
JK["useProducts.ts"]
JL["productImage.spec.ts"]
end
end
end
subgraph JM["site-languages"]
subgraph JN["src"]
JO["index.ts"]
subgraph JP["lib"]
JQ["site-languages.graphql.ts"]
JR["useSiteLanguages.ts"]
JS["site-languages-hook.spec.tsx"]
end
end
JT["vite.config.ts"]
end
subgraph JU["snackbar"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["SnackbarContext.tsx"]
JZ["useSnackbar.ts"]
end
end
end
subgraph K0["translations-management-hook"]
subgraph K1["src"]
K2["index.ts"]
subgraph K3["lib"]
K4["useTranslationsManagement.ts"]
end
end
end
end
subgraph K5["lottie"]
subgraph K6["empty-cart"]
subgraph K7["src"]
K8["index.ts"]
subgraph K9["lib"]
KA["lottie-empty-cart.tsx"]
KB["lottie-empty-cart.spec.tsx"]
end
end
KC["vite.config.ts"]
end
subgraph KD["loading"]
subgraph KE["src"]
KF["index.ts"]
subgraph KG["lib"]
KH["lottie-loading.tsx"]
KI["lottie-loading.spec.tsx"]
end
end
end
subgraph KJ["success-check"]
subgraph KK["src"]
KL["index.ts"]
subgraph KM["lib"]
KN["lottie-success-check.tsx"]
KO["lottie-success-check.spec.tsx"]
end
end
end
subgraph KP["unauthorized"]
subgraph KQ["src"]
KR["index.ts"]
subgraph KS["lib"]
KT["lottie-unauthorized.tsx"]
end
end
end
end
subgraph KU["translations"]
subgraph KV["src"]
KW["index.ts"]
subgraph KX["lib"]
KY["mapApolloErrorToTranslationKey.ts"]
KZ["WrapTranslation.tsx"]
end
end
end
subgraph L0["ui"]
subgraph L1["colors"]
subgraph L2["src"]
L3["index.ts"]
subgraph L4["lib"]
L5["colors.ts"]
end
end
end
subgraph L6["language-components"]
subgraph L7["src"]
L8["index.ts"]
subgraph L9["lib"]
LA["language-components.tsx"]
LB["ltr-text-field.tsx"]
end
end
end
subgraph LC["sizes"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["sizes.ts"]
LH["sizes.spec.tsx"]
LI["sizes.tsx"]
end
end
end
end
subgraph LJ["zustand"]
subgraph LK["shared-auth-store"]
subgraph LL["src"]
LM["index.ts"]
subgraph LN["lib"]
LO["shared-auth-store.ts"]
end
end
end
subgraph LP["shared-notification-store"]
subgraph LQ["src"]
LR["index.ts"]
subgraph LS["lib"]
LT["shared-notification-store.tsx"]
end
end
end
subgraph LU["shared-ui-store"]
subgraph LV["src"]
LW["index.ts"]
subgraph LX["lib"]
LY["shared-ui-store.ts"]
LZ["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph M0["server"]
subgraph M1["controllers"]
subgraph M2["src"]
M3["index.ts"]
subgraph M4["lib"]
M5["auth.controller.ts"]
M6["order.controller.ts"]
end
end
end
subgraph M7["decorators"]
M8["jest.config.ts"]
subgraph M9["src"]
MA["index.ts"]
subgraph MB["lib"]
MC["current-user.decorator.ts"]
MD["decorators.ts"]
ME["decorators.spec.ts"]
end
end
end
subgraph MF["entities"]
subgraph MG["src"]
MH["index.ts"]
subgraph MI["lib"]
MJ["brand.entity.ts"]
MK["product.entity.ts"]
ML["category.entity.ts"]
MM["product-description.entity.ts"]
MN["site-language.entity.ts"]
MO["product-info.entity.ts"]
MP["color.entity.ts"]
MQ["product-info-color.entity.ts"]
MR["seller-info.entity.ts"]
MS["seller-product.entity.ts"]
MT["user.entity.ts"]
MU["cart.entity.ts"]
MV["currency-preference.entity.ts"]
MW["currency.entity.ts"]
MX["customer.entity.ts"]
MY["exchange-rate.entity.ts"]
MZ["order.entity.ts"]
N0["platform-settings.entity.ts"]
N1["refresh-token.entity.ts"]
N2["seller-order.entity.ts"]
N3["translation.entity.ts"]
end
end
end
subgraph N4["guards"]
N5["jest.config.ts"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["catalog.guard.ts"]
NA["graphql-auth.guard.ts"]
NB["http-auth.guard.ts"]
NC["roles.guard.ts"]
ND["catalog.guard.spec.ts"]
NE["roles.guard.spec.ts"]
end
end
end
subgraph NF["inputs"]
subgraph NG["src"]
NH["index.ts"]
subgraph NI["lib"]
NJ["brand.input.ts"]
NK["cart.inputs.ts"]
NL["category.input.ts"]
NM["color.input.ts"]
NN["customer-auth.inputs.ts"]
NO["order-pagination.inputs.ts"]
NP["order.inputs.ts"]
NQ["product-info-filter.input.ts"]
NR["product.input.ts"]
NS["seller-order-pagination.inputs.ts"]
NT["seller.input.ts"]
NU["site-language.input.ts"]
NV["user.input.ts"]
end
end
end
subgraph NW["modules"]
subgraph NX["src"]
NY["index.ts"]
subgraph NZ["lib"]
O0["auth.module.ts"]
O1["email.module.ts"]
O2["token.module.ts"]
O3["user.module.ts"]
O4["customer-profile.module.ts"]
O5["brand.module.ts"]
O6["catalog-guard.module.ts"]
O7["translation.module.ts"]
O8["cart.module.ts"]
O9["platform-settings.module.ts"]
OA["category.module.ts"]
OB["product.module.ts"]
OC["color.module.ts"]
OD["currency.module.ts"]
OE["graphql-context.module.ts"]
OF["order.module.ts"]
OG["seller-info.module.ts"]
OH["payment.module.ts"]
OI["product-info.module.ts"]
OJ["seller-products.module.ts"]
OK["site-language.module.ts"]
end
end
end
subgraph OL["resolvers"]
OM["jest.config.ts"]
subgraph ON["src"]
OO["index.ts"]
subgraph OP["lib"]
OQ["auth.resolver.ts"]
OR["brand.resolver.ts"]
OS["cart.resolver.ts"]
OT["category.resolver.ts"]
OU["color.resolver.ts"]
OV["currency.resolver.ts"]
OW["customer-profile.resolver.ts"]
OX["order.resolver.ts"]
OY["payment.resolver.ts"]
OZ["product-info.resolver.ts"]
P0["product.resolver.ts"]
P1["seller-info.resolver.ts"]
P2["shipping.resolver.ts"]
P3["site-language.resolver.ts"]
P4["translation.input.ts"]
P5["translation.resolver.ts"]
P6["user.resolver.ts"]
P7["auth.resolver.spec.ts"]
P8["payment.resolver.integration.spec.ts"]
P9["product-info.resolver.spec.ts"]
subgraph PA["types"]
PB["graphql-upload.d.ts"]
end
PC["user.resolver.spec.ts"]
end
end
end
subgraph PD["services"]
PE["jest.config.ts"]
subgraph PF["src"]
PG["index.ts"]
subgraph PH["lib"]
PI["auth.service.ts"]
PJ["brand.service.ts"]
PK["cart.service.ts"]
PL["product-info-colors.util.ts"]
PM["category.service.ts"]
PN["color.service.ts"]
PO["currency.service.ts"]
PP["customer-profile.service.ts"]
PQ["email.service.ts"]
PR["image-upload.service.ts"]
PS["order.service.ts"]
PT["payment-logger.service.ts"]
PU["payment.service.ts"]
PV["product.service.ts"]
PW["seller-info.service.ts"]
PX["shipping-calculation.service.ts"]
PY["site-language.service.ts"]
PZ["token.service.ts"]
Q0["translation.service.ts"]
Q1["user.service.ts"]
Q2["auth.service.spec.ts"]
Q3["order.service.spec.ts"]
Q4["product-info-colors.util.spec.ts"]
Q5["product.service.spec.ts"]
Q6["relay-connection.spec.ts"]
end
end
end
subgraph Q7["strategies"]
subgraph Q8["src"]
Q9["index.ts"]
subgraph QA["lib"]
QB["local.strategy.ts"]
end
end
end
subgraph QC["utils"]
subgraph QD["src"]
QE["index.ts"]
subgraph QF["lib"]
QG["email-templates.ts"]
QH["relay-connection.ts"]
QI["pagination.ts"]
end
end
end
end
subgraph QJ["shared"]
subgraph QK["codegen"]
QL["jest.config.ts"]
subgraph QM["src"]
QN["index.ts"]
subgraph QO["lib"]
subgraph QP["generated"]
QQ["graphql.ts"]
end
end
end
end
subgraph QR["graphql-schema"]
QS["jest.config.ts"]
subgraph QT["src"]
QU["index.ts"]
end
end
subgraph QV["product-sizes"]
subgraph QW["src"]
QX["index.ts"]
subgraph QY["lib"]
QZ["product-sizes.ts"]
R0["product-sizes.spec.ts"]
end
end
end
subgraph R1["shared-i18n"]
subgraph R2["src"]
R3["index.ts"]
subgraph R4["lib"]
R5["language-context.tsx"]
R6["language-detector.ts"]
subgraph R7["locales"]
R8["i18n-react.tsx"]
R9["i18n-util.ts"]
RA["i18n-util.async.ts"]
subgraph RB["en"]
RC["index.ts"]
end
subgraph RE["fa"]
RF["index.ts"]
end
RG["formatters.ts"]
RH["i18n-types.ts"]
RI["i18n-util.sync.ts"]
RJ["navigator-detector.ts"]
end
RD["site-name.ts"]
RK["table-localization.ts"]
RL["theme-provider.tsx"]
RM["use-page-title.ts"]
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
3W-->3X
3X-->3Z
3Z-->40
3Z-->42
40-->41
43-->3Z
48-->49
49-->4B
4C-->4B
4G-->4I
4I-->4J
4M-->4N
4N-->4P
4Q-->4P
4U-->4V
4V-->4X
4Y-->4X
53-->55
53-->56
55-->56
57-->55
5A-->5C
5D-->5C
5G-->5I
5G-->5J
5I-->5J
5K-->5I
5L-->5J
5O-->5Q
5R-->5Q
5W-->5Y
5Z-->5Y
62-->64
62-->65
62-->66
62-->69
66-->67
67-->68
6E-->6G
6E-->6H
6E-->6I
6E-->6J
6K-->6H
6N-->6P
6N-->6Q
6N-->6R
6S-->6P
6V-->6X
70-->72
75-->77
75-->78
77-->78
79-->77
7A-->78
7D-->7F
7G-->7F
7K-->7M
7N-->7M
7R-->7T
7W-->7Y
7Z-->7Y
83-->85
88-->8A
8B-->8A
8E-->8G
8J-->8L
8J-->8M
8J-->8N
8L-->8M
8M-->8N
8Q-->8S
8V-->8X
8Y-->8X
91-->93
94-->93
98-->9A
9B-->9A
9E-->9G
9H-->9G
9K-->9M
9N-->9M
9R-->9T
9U-->9T
9Y-->A0
9Y-->A9
9Y-->A3
9Y-->A8
A0-->A2
A0-->A4
A0-->A5
A0-->A6
A0-->A7
A0-->A3
A0-->A8
A2-->A3
A9-->A3
AA-->AB
AA-->A6
AA-->A0
AA-->A9
AA-->A3
AC-->A3
AE-->A3
AI-->AK
AL-->AK
AO-->AQ
AR-->AQ
AV-->AX
AY-->AX
B2-->B4
B5-->B4
B9-->BB
BE-->BG
BH-->BG
BL-->BN
BR-->BT
BW-->BY
BZ-->BY
BZ-->C0
C4-->C6
C7-->C6
CB-->CD
CE-->CD
CI-->CK
CL-->CK
CN-->CP
CU-->CW
CX-->CW
D0-->D2
D5-->D7
D5-->D8
D7-->D8
DC-->DE
DF-->DE
DI-->DK
DI-->DL
DI-->DM
DI-->DP
DM-->DN
DN-->DO
DP-->DK
DP-->DQ
DX-->DZ
DZ-->E0
E3-->E5
E8-->EA
E8-->EB
EE-->EG
EJ-->EL
EP-->ER
ES-->ER
EV-->EX
F0-->F2
F2-->F3
F4-->F3
F5-->F2
F8-->FA
FB-->FA
FE-->FG
FJ-->FL
FO-->FQ
FU-->FW
G2-->G4
G2-->G5
G6-->G5
G9-->GB
GC-->GB
GG-->GI
GJ-->GI
GM-->GO
GR-->GT
GR-->GU
GR-->GV
GT-->GU
GW-->GT
H0-->H2
H3-->H2
H6-->H8
HB-->HD
HE-->HD
HH-->HJ
HJ-->HK
HN-->HP
HP-->HQ
HP-->HR
HP-->HS
HP-->HT
HR-->HQ
HR-->HS
HU-->HV
HY-->I0
I4-->I6
I7-->I6
IA-->IC
IF-->IH
IF-->II
IF-->IJ
IF-->IK
IP-->IR
IP-->IS
IS-->IR
IW-->IY
IY-->IZ
J2-->J4
J4-->J5
J8-->JA
J8-->JC
J8-->JD
J8-->JB
JA-->JB
JG-->JI
JG-->JJ
JG-->JK
JK-->JJ
JL-->JI
JO-->JQ
JO-->JR
JR-->JQ
JS-->JR
JW-->JY
JW-->JZ
JZ-->JY
K2-->K4
K8-->KA
KB-->KA
KF-->KH
KI-->KH
KL-->KN
KO-->KN
KR-->KT
KW-->KY
L3-->L5
L8-->LA
L8-->LB
LE-->LG
LH-->LI
LM-->LO
LR-->LT
LW-->LY
M3-->M5
M3-->M6
MA-->MC
MA-->MD
ME-->MD
MH-->MJ
MH-->MU
MH-->ML
MH-->MP
MH-->MV
MH-->MW
MH-->MX
MH-->MY
MH-->MZ
MH-->N0
MH-->MM
MH-->MQ
MH-->MO
MH-->MK
MH-->N1
MH-->MR
MH-->N2
MH-->MS
MH-->MN
MH-->N3
MH-->MT
MJ-->MK
MK-->MJ
MK-->ML
MK-->MM
MK-->MO
MK-->MR
MK-->MS
ML-->MK
MM-->MK
MM-->MN
MN-->MM
MO-->MP
MO-->MQ
MO-->MK
MQ-->MP
MQ-->MO
MR-->MS
MR-->MT
MS-->MO
MS-->MK
MS-->MR
MU-->MK
MU-->MT
MV-->MW
MX-->MT
MY-->MW
MY-->MT
MZ-->MK
MZ-->MR
N1-->MT
N2-->MZ
N7-->N9
N7-->NA
N7-->NB
N7-->NC
ND-->N9
NE-->NC
NH-->NJ
NH-->NK
NH-->NL
NH-->NM
NH-->NN
NH-->NO
NH-->NP
NH-->NQ
NH-->NR
NH-->NS
NH-->NT
NH-->NU
NH-->NV
NR-->NQ
NY-->O0
NY-->O5
NY-->O8
NY-->O6
NY-->OA
NY-->OC
NY-->OD
NY-->O4
NY-->O1
NY-->OE
NY-->OF
NY-->OH
NY-->O9
NY-->OI
NY-->OB
NY-->OG
NY-->OJ
NY-->OK
NY-->O2
NY-->O7
NY-->O3
O0-->O1
O0-->O2
O0-->O3
O3-->O0
O3-->O4
O5-->O6
O5-->O7
O8-->O9
OA-->O6
OA-->OB
OA-->O7
OB-->O6
OB-->O2
OB-->O7
OC-->O6
OC-->O7
OE-->O1
OE-->O2
OE-->O3
OF-->O9
OF-->OG
OG-->OB
OG-->O2
OG-->O3
OH-->OF
OI-->OB
OI-->O7
OJ-->OG
OJ-->O3
OO-->OQ
OO-->OR
OO-->OS
OO-->OT
OO-->OU
OO-->OV
OO-->OW
OO-->OX
OO-->OY
OO-->OZ
OO-->P0
OO-->P1
OO-->P2
OO-->P3
OO-->P4
OO-->P5
OO-->P6
P7-->OQ
P8-->OY
P9-->OZ
PC-->P6
PG-->PI
PG-->PJ
PG-->PK
PG-->PM
PG-->PN
PG-->PO
PG-->PP
PG-->PQ
PG-->PR
PG-->PS
PG-->PT
PG-->PU
PG-->PL
PG-->PV
PG-->PW
PG-->PX
PG-->PY
PG-->PZ
PG-->Q0
PG-->Q1
PK-->PL
PV-->PL
PW-->PL
Q2-->PI
Q2-->PQ
Q2-->PZ
Q2-->Q1
Q3-->PS
Q4-->PL
Q5-->PV
Q5-->Q0
Q9-->QB
QE-->QG
QE-->QH
QN-->QQ
QX-->QZ
R0-->QZ
R3-->R5
R3-->R6
R3-->R8
R3-->RH
R3-->R9
R3-->RA
R3-->RI
R3-->RJ
R3-->RD
R3-->RK
R3-->RL
R3-->RM
R5-->R6
R5-->R8
R5-->RA
R8-->R9
RA-->RC
RA-->RF
RA-->RG
RA-->R9
RC-->RD
RF-->RD
RI-->RC
RI-->RF
RI-->RG
RI-->R9
RK-->R8
RL-->R5
RM-->R8
