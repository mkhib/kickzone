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
9A["customer-shopping-cart.spec.tsx"]
end
end
9B["vite.config.ts"]
end
subgraph 9C["customer-signup"]
subgraph 9D["src"]
9E["index.ts"]
subgraph 9F["lib"]
9G["customer-signup.tsx"]
9H["customer-signup.spec.tsx"]
end
end
end
subgraph 9I["forgot-password"]
subgraph 9J["src"]
9K["index.ts"]
subgraph 9L["lib"]
9M["customer-forgot-password.tsx"]
9N["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9O["guide-authenticity"]
subgraph 9P["src"]
9Q["index.ts"]
subgraph 9R["lib"]
9S["customer-guide-authenticity.tsx"]
9T["customer-guide-authenticity.spec.tsx"]
end
end
9U["vite.config.ts"]
end
subgraph 9V["guide-payment"]
subgraph 9W["src"]
9X["index.ts"]
subgraph 9Y["lib"]
9Z["customer-guide-payment.tsx"]
A0["customer-guide-payment.spec.tsx"]
end
end
A1["vite.config.ts"]
end
subgraph A2["home"]
subgraph A3["src"]
A4["index.ts"]
subgraph A5["lib"]
A6["CustomersHomeScreen.tsx"]
subgraph A7["components"]
A8["CategoryBentoSection.tsx"]
AA["HeroSection.tsx"]
AB["HomeLoadingScreen.tsx"]
AC["PicksRailSection.tsx"]
AD["TrustStripSection.tsx"]
AH["NewArrivalsSection.tsx"]
AI["BrandBlocksSection.tsx"]
AJ["NewsletterSection.tsx"]
AK["ShopTheLookSection.tsx"]
AL["TickerSection.tsx"]
end
A9["home-selectors.ts"]
AE["useScrollProgress.ts"]
AF["CustomersShopScreen.tsx"]
AG["CustomersHomeScreen.spec.tsx"]
end
end
end
subgraph AM["login"]
subgraph AN["src"]
AO["index.ts"]
subgraph AP["lib"]
AQ["CustomersLoginScreen.tsx"]
AR["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AS["not-found"]
subgraph AT["src"]
AU["index.ts"]
subgraph AV["lib"]
AW["customer-not-found.tsx"]
AX["customer-not-found.spec.tsx"]
end
end
AY["vite.config.ts"]
end
subgraph AZ["privacy-policy"]
subgraph B0["src"]
B1["index.ts"]
subgraph B2["lib"]
B3["customer-privacy-policy.tsx"]
B4["customer-privacy-policy.spec.tsx"]
end
end
B5["vite.config.ts"]
end
subgraph B6["product-details"]
subgraph B7["src"]
B8["index.ts"]
subgraph B9["lib"]
BA["customer-product-details.tsx"]
BB["customer-product-details.pants-size.spec.tsx"]
BC["customer-product-details.spec.tsx"]
end
end
BD["vite.config.ts"]
end
subgraph BE["reset-password"]
subgraph BF["src"]
BG["index.ts"]
subgraph BH["lib"]
BI["customer-reset-password.tsx"]
end
end
end
subgraph BJ["shipping-returns"]
subgraph BK["src"]
BL["index.ts"]
subgraph BM["lib"]
BN["customer-shipping-returns.tsx"]
BO["customer-shipping-returns.spec.tsx"]
end
end
BP["vite.config.ts"]
end
subgraph BQ["unauthorized"]
subgraph BR["src"]
BS["index.ts"]
subgraph BT["lib"]
BU["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BV["utility"]
subgraph BW["test"]
subgraph BX["src"]
BY["index.ts"]
subgraph BZ["lib"]
C0["customers-test-utility.tsx"]
end
end
end
end
subgraph C1["validations"]
subgraph C2["src"]
C3["index.ts"]
subgraph C4["lib"]
C5["shipping-validation.ts"]
C6["shipping-validation.spec.tsx"]
C7["shipping-validation.tsx"]
end
end
end
subgraph C8["zustand"]
subgraph C9["customer-cart-store"]
subgraph CA["src"]
CB["index.ts"]
subgraph CC["lib"]
CD["customer-cart-store.ts"]
CE["customer-cart-store.spec.ts"]
CF["customer-cart-store.tsx"]
end
end
end
subgraph CG["customer-checkout-store"]
subgraph CH["src"]
CI["index.ts"]
subgraph CJ["lib"]
CK["customer-checkout-store.ts"]
CL["customer-checkout-store.spec.ts"]
end
end
CM["vite.config.ts"]
end
subgraph CN["customer-wishlist-store"]
subgraph CO["src"]
CP["index.ts"]
subgraph CQ["lib"]
CR["customer-wishlist-store.ts"]
CS["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["customers-products-store.tsx"]
end
end
end
end
subgraph CX["sellers"]
subgraph CY["components"]
subgraph CZ["footer"]
subgraph D0["src"]
D1["index.ts"]
subgraph D2["lib"]
D3["sellers-footer.tsx"]
D4["sellers-footer.spec.tsx"]
end
end
end
subgraph D5["headerbar"]
subgraph D6["src"]
D7["index.ts"]
subgraph D8["lib"]
D9["SellersHeaderbar.tsx"]
end
end
end
subgraph DA["layout"]
subgraph DB["src"]
DC["index.ts"]
subgraph DD["lib"]
DE["SellersLayout.tsx"]
DF["SellersTabbar.tsx"]
end
end
end
end
subgraph DG["contexts"]
subgraph DH["auth"]
subgraph DI["src"]
DJ["index.ts"]
subgraph DK["lib"]
DL["SellersAuthContext.tsx"]
DM["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DN["graphql"]
subgraph DO["src"]
DP["index.ts"]
subgraph DQ["lib"]
DR["fragments.ts"]
DS["mutations.ts"]
DT["Provider.tsx"]
DU["SellersApolloProvider.tsx"]
DV["client.ts"]
DW["queries.ts"]
DX["seller-orders.graphql.ts"]
DY["apollo-upload-client.d.ts"]
end
subgraph DZ["types"]
E0["apollo-upload-client.d.ts"]
end
end
end
subgraph E1["hooks"]
subgraph E2["auth"]
subgraph E3["src"]
E4["index.ts"]
subgraph E5["lib"]
E6["useSellerAuth.ts"]
E7["sellerAuth.graphql.ts"]
end
end
end
subgraph E8["orders"]
subgraph E9["src"]
EA["index.ts"]
subgraph EB["lib"]
EC["useSellerOrders.ts"]
end
end
end
subgraph ED["products"]
subgraph EE["src"]
EF["index.ts"]
subgraph EG["lib"]
EH["useSellersProductManagement.ts"]
EI["useSellersProducts.ts"]
end
end
end
end
subgraph EJ["router"]
subgraph EK["src"]
EL["index.ts"]
subgraph EM["lib"]
EN["SellersRouter.tsx"]
end
end
end
subgraph EO["routes"]
subgraph EP["src"]
EQ["index.ts"]
subgraph ER["lib"]
ES["seller-routes.ts"]
end
end
end
subgraph ET["screens"]
subgraph EU["catalog"]
subgraph EV["src"]
EW["index.ts"]
subgraph EX["lib"]
EY["SellersCatalogScreens.tsx"]
EZ["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F0["login"]
subgraph F1["src"]
F2["index.ts"]
subgraph F3["lib"]
F4["SellersLogin.tsx"]
end
end
end
subgraph F5["manage-product"]
subgraph F6["src"]
F7["index.ts"]
subgraph F8["lib"]
F9["SellersManageProductScreen.tsx"]
FA["SellersDefineProductFlow.tsx"]
FB["SellersDefineProductFlow.pants-label.spec.tsx"]
FC["SellersDefineProductFlow.spec.tsx"]
FD["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FE["products"]
subgraph FF["src"]
FG["index.ts"]
subgraph FH["lib"]
FI["SellersProducts.tsx"]
FJ["SellersProducts.pants-label.spec.tsx"]
FK["SellersProducts.spec.tsx"]
end
end
end
subgraph FL["seller-orders"]
FM["jest.config.ts"]
FN["jest.setup.ts"]
subgraph FO["src"]
FP["index.ts"]
subgraph FQ["lib"]
FR["seller-orders-screen.tsx"]
FS["seller-orders-screen.spec.tsx"]
end
FT["test-setup.ts"]
end
end
subgraph FU["setup-password"]
subgraph FV["src"]
FW["index.ts"]
subgraph FX["lib"]
FY["SellersSetupPassword.tsx"]
end
end
end
subgraph FZ["unauthorized"]
subgraph G0["src"]
G1["index.ts"]
subgraph G2["lib"]
G3["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G4["zustand"]
subgraph G5["sellers-products-store"]
subgraph G6["src"]
G7["index.ts"]
subgraph G8["lib"]
G9["useSellersProductsStore.ts"]
GA["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GB["shared"]
subgraph GC["components"]
subgraph GD["apollo-provider-base"]
subgraph GE["src"]
GF["index.ts"]
subgraph GG["lib"]
GH["ApolloProviderBase.tsx"]
GI["createSilentRefreshAuthLink.ts"]
GJ["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GK["error-boundary"]
subgraph GL["src"]
GM["index.ts"]
subgraph GN["lib"]
GO["error-boundary.tsx"]
GP["error-boundary.spec.tsx"]
end
end
GQ["vite.config.ts"]
end
subgraph GR["glassmorphism-container"]
subgraph GS["src"]
GT["index.ts"]
subgraph GU["lib"]
GV["glassmorphism-container.tsx"]
GW["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GX["layout"]
subgraph GY["src"]
GZ["index.ts"]
subgraph H0["lib"]
H1["Layout.tsx"]
end
end
end
subgraph H2["material-data-table"]
subgraph H3["src"]
H4["index.ts"]
subgraph H5["lib"]
H6["material-data-table.tsx"]
H7["table-config.ts"]
H8["table-utils.ts"]
H9["material-data-table.spec.tsx"]
HA["table-types.ts"]
end
end
end
subgraph HB["order-status-chip"]
subgraph HC["src"]
HD["index.ts"]
subgraph HE["lib"]
HF["order-status-chip.tsx"]
HG["order-status-chip.spec.tsx"]
end
end
end
subgraph HH["password-field"]
subgraph HI["src"]
HJ["index.ts"]
subgraph HK["lib"]
HL["PasswordTextField.tsx"]
end
end
end
subgraph HM["price-display"]
subgraph HN["src"]
HO["index.ts"]
subgraph HP["lib"]
HQ["price-display.tsx"]
HR["price-display.spec.tsx"]
end
end
end
subgraph HS["private-route"]
subgraph HT["src"]
HU["index.ts"]
subgraph HV["lib"]
HW["createPrivateRoute.tsx"]
HX["PrivateRoute.tsx"]
end
end
end
subgraph HY["rtl-table-utils"]
subgraph HZ["src"]
I0["index.ts"]
subgraph I1["lib"]
I2["rtl-table-utils.ts"]
I3["rtl-cell-components.tsx"]
I4["rtl-column-helpers.ts"]
I5["rtl-table-props.ts"]
I6["use-table-alignment.ts"]
I7["rtl-table-utils.spec.tsx"]
I8["rtl-table-utils.tsx"]
end
end
end
subgraph I9["snackbar"]
subgraph IA["src"]
IB["index.ts"]
subgraph IC["lib"]
ID["snackbar.tsx"]
IE["Snackbar.tsx"]
end
end
end
subgraph IF["styled-drawer"]
subgraph IG["src"]
IH["index.ts"]
subgraph II["lib"]
IJ["styled-drawer.tsx"]
IK["styled-drawer.spec.tsx"]
end
end
end
subgraph IL["unauthorized"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["unauthorized-path.tsx"]
end
end
end
end
subgraph IQ["graphql"]
subgraph IR["src"]
IS["index.ts"]
subgraph IT["lib"]
IU["currency.mutations.ts"]
IV["currency.queries.ts"]
IW["fragments.ts"]
IX["variant-colors.ts"]
IY["client-shared-graphql.tsx"]
end
end
end
subgraph IZ["hooks"]
subgraph J0["brands"]
subgraph J1["src"]
J2["index.ts"]
subgraph J3["lib"]
J4["brands.graphql.ts"]
J5["useBrands.ts"]
end
end
J6["vite.config.ts"]
end
subgraph J7["categories"]
subgraph J8["src"]
J9["index.ts"]
subgraph JA["lib"]
JB["useCategories.ts"]
JC["categories.graphql.ts"]
end
end
end
subgraph JD["colors"]
subgraph JE["src"]
JF["index.ts"]
subgraph JG["lib"]
JH["useColors.ts"]
JI["color.graphql.ts"]
end
end
end
subgraph JJ["currency"]
subgraph JK["src"]
JL["index.ts"]
subgraph JM["lib"]
JN["useConvertPrice.tsx"]
JO["useExchangeRate.tsx"]
JP["useCurrencies.tsx"]
JQ["useCurrencyForLocale.tsx"]
JR["useExchangeRate.spec.tsx"]
end
end
end
subgraph JS["products"]
subgraph JT["src"]
JU["index.ts"]
subgraph JV["lib"]
JW["productImage.ts"]
JX["products.graphql.ts"]
JY["useProducts.ts"]
JZ["productImage.spec.ts"]
end
end
end
subgraph K0["site-languages"]
subgraph K1["src"]
K2["index.ts"]
subgraph K3["lib"]
K4["site-languages.graphql.ts"]
K5["useSiteLanguages.ts"]
K6["site-languages-hook.spec.tsx"]
end
end
K7["vite.config.ts"]
end
subgraph K8["snackbar"]
subgraph K9["src"]
KA["index.ts"]
subgraph KB["lib"]
KC["SnackbarContext.tsx"]
KD["useSnackbar.ts"]
end
end
end
subgraph KE["translations-management-hook"]
subgraph KF["src"]
KG["index.ts"]
subgraph KH["lib"]
KI["useTranslationsManagement.ts"]
end
end
end
end
subgraph KJ["lottie"]
subgraph KK["empty-cart"]
subgraph KL["src"]
KM["index.ts"]
subgraph KN["lib"]
KO["lottie-empty-cart.tsx"]
KP["lottie-empty-cart.spec.tsx"]
end
end
KQ["vite.config.ts"]
end
subgraph KR["loading"]
subgraph KS["src"]
KT["index.ts"]
subgraph KU["lib"]
KV["lottie-loading.tsx"]
KW["lottie-loading.spec.tsx"]
end
end
end
subgraph KX["success-check"]
subgraph KY["src"]
KZ["index.ts"]
subgraph L0["lib"]
L1["lottie-success-check.tsx"]
L2["lottie-success-check.spec.tsx"]
end
end
end
subgraph L3["unauthorized"]
subgraph L4["src"]
L5["index.ts"]
subgraph L6["lib"]
L7["lottie-unauthorized.tsx"]
end
end
end
end
subgraph L8["translations"]
subgraph L9["src"]
LA["index.ts"]
subgraph LB["lib"]
LC["mapApolloErrorToTranslationKey.ts"]
LD["WrapTranslation.tsx"]
end
end
end
subgraph LE["ui"]
subgraph LF["colors"]
subgraph LG["src"]
LH["index.ts"]
subgraph LI["lib"]
LJ["colors.ts"]
end
end
end
subgraph LK["language-components"]
subgraph LL["src"]
LM["index.ts"]
subgraph LN["lib"]
LO["language-components.tsx"]
LP["ltr-text-field.tsx"]
end
end
end
subgraph LQ["sizes"]
subgraph LR["src"]
LS["index.ts"]
subgraph LT["lib"]
LU["sizes.ts"]
LV["sizes.spec.tsx"]
LW["sizes.tsx"]
end
end
end
end
subgraph LX["zustand"]
subgraph LY["shared-auth-store"]
subgraph LZ["src"]
M0["index.ts"]
subgraph M1["lib"]
M2["shared-auth-store.ts"]
end
end
end
subgraph M3["shared-notification-store"]
subgraph M4["src"]
M5["index.ts"]
subgraph M6["lib"]
M7["shared-notification-store.tsx"]
end
end
end
subgraph M8["shared-ui-store"]
subgraph M9["src"]
MA["index.ts"]
subgraph MB["lib"]
MC["shared-ui-store.ts"]
MD["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph ME["server"]
subgraph MF["controllers"]
subgraph MG["src"]
MH["index.ts"]
subgraph MI["lib"]
MJ["auth.controller.ts"]
MK["order.controller.ts"]
end
end
end
subgraph ML["decorators"]
MM["jest.config.ts"]
subgraph MN["src"]
MO["index.ts"]
subgraph MP["lib"]
MQ["current-user.decorator.ts"]
MR["decorators.ts"]
MS["decorators.spec.ts"]
end
end
end
subgraph MT["entities"]
subgraph MU["src"]
MV["index.ts"]
subgraph MW["lib"]
MX["brand.entity.ts"]
MY["product.entity.ts"]
MZ["category.entity.ts"]
N0["product-description.entity.ts"]
N1["site-language.entity.ts"]
N2["product-info.entity.ts"]
N3["color.entity.ts"]
N4["product-info-color.entity.ts"]
N5["seller-info.entity.ts"]
N6["seller-product.entity.ts"]
N7["user.entity.ts"]
N8["cart.entity.ts"]
N9["currency-preference.entity.ts"]
NA["currency.entity.ts"]
NB["customer.entity.ts"]
NC["exchange-rate.entity.ts"]
ND["order.entity.ts"]
NE["platform-settings.entity.ts"]
NF["refresh-token.entity.ts"]
NG["seller-order.entity.ts"]
NH["translation.entity.ts"]
end
end
end
subgraph NI["guards"]
NJ["jest.config.ts"]
subgraph NK["src"]
NL["index.ts"]
subgraph NM["lib"]
NN["catalog.guard.ts"]
NO["graphql-auth.guard.ts"]
NP["http-auth.guard.ts"]
NQ["roles.guard.ts"]
NR["catalog.guard.spec.ts"]
NS["roles.guard.spec.ts"]
end
end
end
subgraph NT["inputs"]
subgraph NU["src"]
NV["index.ts"]
subgraph NW["lib"]
NX["brand.input.ts"]
NY["cart.inputs.ts"]
NZ["category.input.ts"]
O0["color.input.ts"]
O1["customer-auth.inputs.ts"]
O2["order-pagination.inputs.ts"]
O3["order.inputs.ts"]
O4["product-info-filter.input.ts"]
O5["product.input.ts"]
O6["seller-order-pagination.inputs.ts"]
O7["seller.input.ts"]
O8["site-language.input.ts"]
O9["user.input.ts"]
end
end
end
subgraph OA["modules"]
subgraph OB["src"]
OC["index.ts"]
subgraph OD["lib"]
OE["auth.module.ts"]
OF["email.module.ts"]
OG["token.module.ts"]
OH["user.module.ts"]
OI["customer-profile.module.ts"]
OJ["brand.module.ts"]
OK["catalog-guard.module.ts"]
OL["translation.module.ts"]
OM["cart.module.ts"]
ON["platform-settings.module.ts"]
OO["category.module.ts"]
OP["product.module.ts"]
OQ["color.module.ts"]
OR["currency.module.ts"]
OS["graphql-context.module.ts"]
OT["order.module.ts"]
OU["seller-info.module.ts"]
OV["payment.module.ts"]
OW["product-info.module.ts"]
OX["seller-products.module.ts"]
OY["site-language.module.ts"]
end
end
end
subgraph OZ["resolvers"]
P0["jest.config.ts"]
subgraph P1["src"]
P2["index.ts"]
subgraph P3["lib"]
P4["auth.resolver.ts"]
P5["brand.resolver.ts"]
P6["cart.resolver.ts"]
P7["category.resolver.ts"]
P8["color.resolver.ts"]
P9["currency.resolver.ts"]
PA["customer-profile.resolver.ts"]
PB["order.resolver.ts"]
PC["payment.resolver.ts"]
PD["product-info.resolver.ts"]
PE["product.resolver.ts"]
PF["seller-info.resolver.ts"]
PG["shipping.resolver.ts"]
PH["site-language.resolver.ts"]
PI["translation.input.ts"]
PJ["translation.resolver.ts"]
PK["user.resolver.ts"]
PL["auth.resolver.spec.ts"]
PM["order.resolver.spec.ts"]
PN["payment.resolver.integration.spec.ts"]
PO["payment.resolver.spec.ts"]
PP["product-info.resolver.spec.ts"]
subgraph PQ["types"]
PR["graphql-upload.d.ts"]
end
PS["user.resolver.spec.ts"]
end
end
end
subgraph PT["services"]
PU["jest.config.ts"]
subgraph PV["src"]
PW["index.ts"]
subgraph PX["lib"]
PY["auth.service.ts"]
PZ["brand.service.ts"]
Q0["cart.service.ts"]
Q1["product-info-colors.util.ts"]
Q2["category.service.ts"]
Q3["color.service.ts"]
Q4["currency.service.ts"]
Q5["customer-profile.service.ts"]
Q6["email.service.ts"]
Q7["image-upload.service.ts"]
Q8["order.service.ts"]
Q9["payment-logger.service.ts"]
QA["payment.service.ts"]
QB["product.service.ts"]
QC["seller-info.service.ts"]
QD["shipping-calculation.service.ts"]
QE["site-language.service.ts"]
QF["token.service.ts"]
QG["translation.service.ts"]
QH["user.service.ts"]
QI["auth.service.spec.ts"]
QJ["cart.service.spec.ts"]
QK["order.service.spec.ts"]
QL["product-info-colors.util.spec.ts"]
QM["product.service.pants.spec.ts"]
QN["product.service.spec.ts"]
QO["relay-connection.spec.ts"]
QP["shipping-calculation.service.spec.ts"]
QQ["token.service.spec.ts"]
end
end
end
subgraph QR["strategies"]
subgraph QS["src"]
QT["index.ts"]
subgraph QU["lib"]
QV["local.strategy.ts"]
end
end
end
subgraph QW["utils"]
subgraph QX["src"]
QY["index.ts"]
subgraph QZ["lib"]
R0["email-templates.ts"]
R1["relay-connection.ts"]
R2["pagination.ts"]
end
end
end
end
subgraph R3["shared"]
subgraph R4["codegen"]
R5["jest.config.ts"]
subgraph R6["src"]
R7["index.ts"]
subgraph R8["lib"]
subgraph R9["generated"]
RA["graphql.ts"]
end
end
end
end
subgraph RB["graphql-schema"]
RC["jest.config.ts"]
subgraph RD["src"]
RE["index.ts"]
end
end
subgraph RF["product-sizes"]
subgraph RG["src"]
RH["index.ts"]
subgraph RI["lib"]
RJ["product-sizes.ts"]
RK["product-sizes.pants-formats.spec.ts"]
RL["product-sizes.pants-label.spec.ts"]
RM["product-sizes.pants-strict.spec.ts"]
RN["product-sizes.spec.ts"]
end
end
end
subgraph RO["shared-i18n"]
subgraph RP["src"]
RQ["index.ts"]
subgraph RR["lib"]
RS["language-context.tsx"]
RT["language-detector.ts"]
subgraph RU["locales"]
RV["i18n-react.tsx"]
RW["i18n-util.ts"]
RX["i18n-util.async.ts"]
subgraph RY["en"]
RZ["index.ts"]
end
subgraph S1["fa"]
S2["index.ts"]
end
S3["formatters.ts"]
S4["i18n-types.ts"]
S5["i18n-util.sync.ts"]
S6["navigator-detector.ts"]
end
S0["site-name.ts"]
S7["table-localization.ts"]
S8["theme-provider.tsx"]
S9["use-page-title.ts"]
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
9E-->9G
9H-->9G
9K-->9M
9N-->9M
9Q-->9S
9T-->9S
9X-->9Z
A0-->9Z
A4-->A6
A4-->AF
A4-->A9
A4-->AE
A6-->A8
A6-->AA
A6-->AB
A6-->AC
A6-->AD
A6-->A9
A6-->AE
A8-->A9
AF-->A9
AG-->AH
AG-->AC
AG-->A6
AG-->AF
AG-->A9
AI-->A9
AK-->A9
AO-->AQ
AR-->AQ
AU-->AW
AX-->AW
B1-->B3
B4-->B3
B8-->BA
BB-->BA
BC-->BA
BG-->BI
BL-->BN
BO-->BN
BS-->BU
BY-->C0
C3-->C5
C6-->C5
C6-->C7
CB-->CD
CE-->CD
CI-->CK
CL-->CK
CP-->CR
CS-->CR
CU-->CW
D1-->D3
D4-->D3
D7-->D9
DC-->DE
DC-->DF
DE-->DF
DJ-->DL
DM-->DL
DP-->DR
DP-->DS
DP-->DT
DP-->DW
DT-->DU
DU-->DV
DW-->DR
DW-->DX
E4-->E6
E6-->E7
EA-->EC
EF-->EH
EF-->EI
EL-->EN
EQ-->ES
EW-->EY
EZ-->EY
F2-->F4
F7-->F9
F9-->FA
FB-->FA
FC-->FA
FD-->F9
FG-->FI
FJ-->FI
FK-->FI
FP-->FR
FS-->FR
FW-->FY
G1-->G3
G7-->G9
GF-->GH
GF-->GI
GJ-->GI
GM-->GO
GP-->GO
GT-->GV
GW-->GV
GZ-->H1
H4-->H6
H4-->H7
H4-->H8
H6-->H7
H9-->H6
HD-->HF
HG-->HF
HJ-->HL
HO-->HQ
HR-->HQ
HU-->HW
HW-->HX
I0-->I2
I2-->I3
I2-->I4
I2-->I5
I2-->I6
I4-->I3
I4-->I5
I7-->I8
IB-->ID
IH-->IJ
IK-->IJ
IN-->IP
IS-->IU
IS-->IV
IS-->IW
IS-->IX
J2-->J4
J2-->J5
J5-->J4
J9-->JB
JB-->JC
JF-->JH
JH-->JI
JL-->JN
JL-->JP
JL-->JQ
JL-->JO
JN-->JO
JR-->JO
JU-->JW
JU-->JX
JU-->JY
JY-->JX
JZ-->JW
K2-->K4
K2-->K5
K5-->K4
K6-->K5
KA-->KC
KA-->KD
KD-->KC
KG-->KI
KM-->KO
KP-->KO
KT-->KV
KW-->KV
KZ-->L1
L2-->L1
L5-->L7
LA-->LC
LH-->LJ
LM-->LO
LM-->LP
LS-->LU
LV-->LW
M0-->M2
M5-->M7
MA-->MC
MH-->MJ
MH-->MK
MO-->MQ
MO-->MR
MS-->MR
MV-->MX
MV-->N8
MV-->MZ
MV-->N3
MV-->N9
MV-->NA
MV-->NB
MV-->NC
MV-->ND
MV-->NE
MV-->N0
MV-->N4
MV-->N2
MV-->MY
MV-->NF
MV-->N5
MV-->NG
MV-->N6
MV-->N1
MV-->NH
MV-->N7
MX-->MY
MY-->MX
MY-->MZ
MY-->N0
MY-->N2
MY-->N5
MY-->N6
MZ-->MY
N0-->MY
N0-->N1
N1-->N0
N2-->N3
N2-->N4
N2-->MY
N4-->N3
N4-->N2
N5-->N6
N5-->N7
N6-->N2
N6-->MY
N6-->N5
N8-->MY
N8-->N7
N9-->NA
NB-->N7
NC-->NA
NC-->N7
ND-->MY
ND-->N5
NF-->N7
NG-->ND
NL-->NN
NL-->NO
NL-->NP
NL-->NQ
NR-->NN
NS-->NQ
NV-->NX
NV-->NY
NV-->NZ
NV-->O0
NV-->O1
NV-->O2
NV-->O3
NV-->O4
NV-->O5
NV-->O6
NV-->O7
NV-->O8
NV-->O9
O5-->O4
OC-->OE
OC-->OJ
OC-->OM
OC-->OK
OC-->OO
OC-->OQ
OC-->OR
OC-->OI
OC-->OF
OC-->OS
OC-->OT
OC-->OV
OC-->ON
OC-->OW
OC-->OP
OC-->OU
OC-->OX
OC-->OY
OC-->OG
OC-->OL
OC-->OH
OE-->OF
OE-->OG
OE-->OH
OH-->OE
OH-->OI
OJ-->OK
OJ-->OL
OM-->ON
OO-->OK
OO-->OP
OO-->OL
OP-->OK
OP-->OG
OP-->OL
OQ-->OK
OQ-->OL
OS-->OF
OS-->OG
OS-->OH
OT-->ON
OT-->OU
OU-->OP
OU-->OG
OU-->OH
OV-->OT
OW-->OP
OW-->OL
OX-->OU
OX-->OH
P2-->P4
P2-->P5
P2-->P6
P2-->P7
P2-->P8
P2-->P9
P2-->PA
P2-->PB
P2-->PC
P2-->PD
P2-->PE
P2-->PF
P2-->PG
P2-->PH
P2-->PI
P2-->PJ
P2-->PK
PL-->P4
PM-->PB
PN-->PC
PO-->PC
PP-->PD
PS-->PK
PW-->PY
PW-->PZ
PW-->Q0
PW-->Q2
PW-->Q3
PW-->Q4
PW-->Q5
PW-->Q6
PW-->Q7
PW-->Q8
PW-->Q9
PW-->QA
PW-->Q1
PW-->QB
PW-->QC
PW-->QD
PW-->QE
PW-->QF
PW-->QG
PW-->QH
Q0-->Q1
QB-->Q1
QC-->Q1
QI-->PY
QI-->Q6
QI-->QF
QI-->QH
QJ-->Q0
QK-->Q8
QL-->Q1
QM-->QB
QM-->QG
QN-->QB
QN-->QG
QP-->QD
QQ-->QF
QT-->QV
QY-->R0
QY-->R1
R7-->RA
RH-->RJ
RK-->RJ
RL-->RJ
RM-->RJ
RN-->RJ
RQ-->RS
RQ-->RT
RQ-->RV
RQ-->S4
RQ-->RW
RQ-->RX
RQ-->S5
RQ-->S6
RQ-->S0
RQ-->S7
RQ-->S8
RQ-->S9
RS-->RT
RS-->RV
RS-->RX
RV-->RW
RX-->RZ
RX-->S2
RX-->S3
RX-->RW
RZ-->S0
S2-->S0
S5-->RZ
S5-->S2
S5-->S3
S5-->RW
S7-->RV
S8-->RS
S9-->RV
