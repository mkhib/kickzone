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
BB["customer-product-details.spec.tsx"]
end
end
BC["vite.config.ts"]
end
subgraph BD["reset-password"]
subgraph BE["src"]
BF["index.ts"]
subgraph BG["lib"]
BH["customer-reset-password.tsx"]
end
end
end
subgraph BI["shipping-returns"]
subgraph BJ["src"]
BK["index.ts"]
subgraph BL["lib"]
BM["customer-shipping-returns.tsx"]
BN["customer-shipping-returns.spec.tsx"]
end
end
BO["vite.config.ts"]
end
subgraph BP["unauthorized"]
subgraph BQ["src"]
BR["index.ts"]
subgraph BS["lib"]
BT["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BU["utility"]
subgraph BV["test"]
subgraph BW["src"]
BX["index.ts"]
subgraph BY["lib"]
BZ["customers-test-utility.tsx"]
end
end
end
end
subgraph C0["validations"]
subgraph C1["src"]
C2["index.ts"]
subgraph C3["lib"]
C4["shipping-validation.ts"]
C5["shipping-validation.spec.tsx"]
C6["shipping-validation.tsx"]
end
end
end
subgraph C7["zustand"]
subgraph C8["customer-cart-store"]
subgraph C9["src"]
CA["index.ts"]
subgraph CB["lib"]
CC["customer-cart-store.ts"]
CD["customer-cart-store.spec.ts"]
CE["customer-cart-store.tsx"]
end
end
end
subgraph CF["customer-checkout-store"]
subgraph CG["src"]
CH["index.ts"]
subgraph CI["lib"]
CJ["customer-checkout-store.ts"]
CK["customer-checkout-store.spec.ts"]
end
end
CL["vite.config.ts"]
end
subgraph CM["customer-wishlist-store"]
subgraph CN["src"]
CO["index.ts"]
subgraph CP["lib"]
CQ["customer-wishlist-store.ts"]
CR["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CS["src"]
CT["index.ts"]
subgraph CU["lib"]
CV["customers-products-store.tsx"]
end
end
end
end
subgraph CW["sellers"]
subgraph CX["components"]
subgraph CY["footer"]
subgraph CZ["src"]
D0["index.ts"]
subgraph D1["lib"]
D2["sellers-footer.tsx"]
D3["sellers-footer.spec.tsx"]
end
end
end
subgraph D4["headerbar"]
subgraph D5["src"]
D6["index.ts"]
subgraph D7["lib"]
D8["SellersHeaderbar.tsx"]
end
end
end
subgraph D9["layout"]
subgraph DA["src"]
DB["index.ts"]
subgraph DC["lib"]
DD["SellersLayout.tsx"]
DE["SellersTabbar.tsx"]
end
end
end
end
subgraph DF["contexts"]
subgraph DG["auth"]
subgraph DH["src"]
DI["index.ts"]
subgraph DJ["lib"]
DK["SellersAuthContext.tsx"]
DL["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DM["graphql"]
subgraph DN["src"]
DO["index.ts"]
subgraph DP["lib"]
DQ["fragments.ts"]
DR["mutations.ts"]
DS["Provider.tsx"]
DT["SellersApolloProvider.tsx"]
DU["client.ts"]
DV["queries.ts"]
DW["seller-orders.graphql.ts"]
DX["apollo-upload-client.d.ts"]
end
subgraph DY["types"]
DZ["apollo-upload-client.d.ts"]
end
end
end
subgraph E0["hooks"]
subgraph E1["auth"]
subgraph E2["src"]
E3["index.ts"]
subgraph E4["lib"]
E5["useSellerAuth.ts"]
E6["sellerAuth.graphql.ts"]
end
end
end
subgraph E7["orders"]
subgraph E8["src"]
E9["index.ts"]
subgraph EA["lib"]
EB["useSellerOrders.ts"]
end
end
end
subgraph EC["products"]
subgraph ED["src"]
EE["index.ts"]
subgraph EF["lib"]
EG["useSellersProductManagement.ts"]
EH["useSellersProducts.ts"]
end
end
end
end
subgraph EI["router"]
subgraph EJ["src"]
EK["index.ts"]
subgraph EL["lib"]
EM["SellersRouter.tsx"]
end
end
end
subgraph EN["routes"]
subgraph EO["src"]
EP["index.ts"]
subgraph EQ["lib"]
ER["seller-routes.ts"]
end
end
end
subgraph ES["screens"]
subgraph ET["catalog"]
subgraph EU["src"]
EV["index.ts"]
subgraph EW["lib"]
EX["SellersCatalogScreens.tsx"]
EY["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph EZ["login"]
subgraph F0["src"]
F1["index.ts"]
subgraph F2["lib"]
F3["SellersLogin.tsx"]
end
end
end
subgraph F4["manage-product"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["SellersManageProductScreen.tsx"]
F9["SellersDefineProductFlow.tsx"]
FA["SellersDefineProductFlow.pants-label.spec.tsx"]
FB["SellersDefineProductFlow.spec.tsx"]
FC["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FD["products"]
subgraph FE["src"]
FF["index.ts"]
subgraph FG["lib"]
FH["SellersProducts.tsx"]
FI["SellersProducts.pants-label.spec.tsx"]
FJ["SellersProducts.spec.tsx"]
end
end
end
subgraph FK["seller-orders"]
FL["jest.config.ts"]
FM["jest.setup.ts"]
subgraph FN["src"]
FO["index.ts"]
subgraph FP["lib"]
FQ["seller-orders-screen.tsx"]
FR["seller-orders-screen.spec.tsx"]
end
FS["test-setup.ts"]
end
end
subgraph FT["setup-password"]
subgraph FU["src"]
FV["index.ts"]
subgraph FW["lib"]
FX["SellersSetupPassword.tsx"]
end
end
end
subgraph FY["unauthorized"]
subgraph FZ["src"]
G0["index.ts"]
subgraph G1["lib"]
G2["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G3["zustand"]
subgraph G4["sellers-products-store"]
subgraph G5["src"]
G6["index.ts"]
subgraph G7["lib"]
G8["useSellersProductsStore.ts"]
G9["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GA["shared"]
subgraph GB["components"]
subgraph GC["apollo-provider-base"]
subgraph GD["src"]
GE["index.ts"]
subgraph GF["lib"]
GG["ApolloProviderBase.tsx"]
GH["createSilentRefreshAuthLink.ts"]
GI["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GJ["error-boundary"]
subgraph GK["src"]
GL["index.ts"]
subgraph GM["lib"]
GN["error-boundary.tsx"]
GO["error-boundary.spec.tsx"]
end
end
GP["vite.config.ts"]
end
subgraph GQ["glassmorphism-container"]
subgraph GR["src"]
GS["index.ts"]
subgraph GT["lib"]
GU["glassmorphism-container.tsx"]
GV["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GW["layout"]
subgraph GX["src"]
GY["index.ts"]
subgraph GZ["lib"]
H0["Layout.tsx"]
end
end
end
subgraph H1["material-data-table"]
subgraph H2["src"]
H3["index.ts"]
subgraph H4["lib"]
H5["material-data-table.tsx"]
H6["table-config.ts"]
H7["table-utils.ts"]
H8["material-data-table.spec.tsx"]
H9["table-types.ts"]
end
end
end
subgraph HA["order-status-chip"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["order-status-chip.tsx"]
HF["order-status-chip.spec.tsx"]
end
end
end
subgraph HG["password-field"]
subgraph HH["src"]
HI["index.ts"]
subgraph HJ["lib"]
HK["PasswordTextField.tsx"]
end
end
end
subgraph HL["price-display"]
subgraph HM["src"]
HN["index.ts"]
subgraph HO["lib"]
HP["price-display.tsx"]
HQ["price-display.spec.tsx"]
end
end
end
subgraph HR["private-route"]
subgraph HS["src"]
HT["index.ts"]
subgraph HU["lib"]
HV["createPrivateRoute.tsx"]
HW["PrivateRoute.tsx"]
end
end
end
subgraph HX["rtl-table-utils"]
subgraph HY["src"]
HZ["index.ts"]
subgraph I0["lib"]
I1["rtl-table-utils.ts"]
I2["rtl-cell-components.tsx"]
I3["rtl-column-helpers.ts"]
I4["rtl-table-props.ts"]
I5["use-table-alignment.ts"]
I6["rtl-table-utils.spec.tsx"]
I7["rtl-table-utils.tsx"]
end
end
end
subgraph I8["snackbar"]
subgraph I9["src"]
IA["index.ts"]
subgraph IB["lib"]
IC["snackbar.tsx"]
ID["Snackbar.tsx"]
end
end
end
subgraph IE["styled-drawer"]
subgraph IF["src"]
IG["index.ts"]
subgraph IH["lib"]
II["styled-drawer.tsx"]
IJ["styled-drawer.spec.tsx"]
end
end
end
subgraph IK["unauthorized"]
subgraph IL["src"]
IM["index.ts"]
subgraph IN["lib"]
IO["unauthorized-path.tsx"]
end
end
end
end
subgraph IP["graphql"]
subgraph IQ["src"]
IR["index.ts"]
subgraph IS["lib"]
IT["currency.mutations.ts"]
IU["currency.queries.ts"]
IV["fragments.ts"]
IW["variant-colors.ts"]
IX["client-shared-graphql.tsx"]
end
end
end
subgraph IY["hooks"]
subgraph IZ["brands"]
subgraph J0["src"]
J1["index.ts"]
subgraph J2["lib"]
J3["brands.graphql.ts"]
J4["useBrands.ts"]
end
end
J5["vite.config.ts"]
end
subgraph J6["categories"]
subgraph J7["src"]
J8["index.ts"]
subgraph J9["lib"]
JA["useCategories.ts"]
JB["categories.graphql.ts"]
end
end
end
subgraph JC["colors"]
subgraph JD["src"]
JE["index.ts"]
subgraph JF["lib"]
JG["useColors.ts"]
JH["color.graphql.ts"]
end
end
end
subgraph JI["currency"]
subgraph JJ["src"]
JK["index.ts"]
subgraph JL["lib"]
JM["useConvertPrice.tsx"]
JN["useExchangeRate.tsx"]
JO["useCurrencies.tsx"]
JP["useCurrencyForLocale.tsx"]
JQ["useExchangeRate.spec.tsx"]
end
end
end
subgraph JR["products"]
subgraph JS["src"]
JT["index.ts"]
subgraph JU["lib"]
JV["productImage.ts"]
JW["products.graphql.ts"]
JX["useProducts.ts"]
JY["productImage.spec.ts"]
end
end
end
subgraph JZ["site-languages"]
subgraph K0["src"]
K1["index.ts"]
subgraph K2["lib"]
K3["site-languages.graphql.ts"]
K4["useSiteLanguages.ts"]
K5["site-languages-hook.spec.tsx"]
end
end
K6["vite.config.ts"]
end
subgraph K7["snackbar"]
subgraph K8["src"]
K9["index.ts"]
subgraph KA["lib"]
KB["SnackbarContext.tsx"]
KC["useSnackbar.ts"]
end
end
end
subgraph KD["translations-management-hook"]
subgraph KE["src"]
KF["index.ts"]
subgraph KG["lib"]
KH["useTranslationsManagement.ts"]
end
end
end
end
subgraph KI["lottie"]
subgraph KJ["empty-cart"]
subgraph KK["src"]
KL["index.ts"]
subgraph KM["lib"]
KN["lottie-empty-cart.tsx"]
KO["lottie-empty-cart.spec.tsx"]
end
end
KP["vite.config.ts"]
end
subgraph KQ["loading"]
subgraph KR["src"]
KS["index.ts"]
subgraph KT["lib"]
KU["lottie-loading.tsx"]
KV["lottie-loading.spec.tsx"]
end
end
end
subgraph KW["success-check"]
subgraph KX["src"]
KY["index.ts"]
subgraph KZ["lib"]
L0["lottie-success-check.tsx"]
L1["lottie-success-check.spec.tsx"]
end
end
end
subgraph L2["unauthorized"]
subgraph L3["src"]
L4["index.ts"]
subgraph L5["lib"]
L6["lottie-unauthorized.tsx"]
end
end
end
end
subgraph L7["translations"]
subgraph L8["src"]
L9["index.ts"]
subgraph LA["lib"]
LB["mapApolloErrorToTranslationKey.ts"]
LC["WrapTranslation.tsx"]
end
end
end
subgraph LD["ui"]
subgraph LE["colors"]
subgraph LF["src"]
LG["index.ts"]
subgraph LH["lib"]
LI["colors.ts"]
end
end
end
subgraph LJ["language-components"]
subgraph LK["src"]
LL["index.ts"]
subgraph LM["lib"]
LN["language-components.tsx"]
LO["ltr-text-field.tsx"]
end
end
end
subgraph LP["sizes"]
subgraph LQ["src"]
LR["index.ts"]
subgraph LS["lib"]
LT["sizes.ts"]
LU["sizes.spec.tsx"]
LV["sizes.tsx"]
end
end
end
end
subgraph LW["zustand"]
subgraph LX["shared-auth-store"]
subgraph LY["src"]
LZ["index.ts"]
subgraph M0["lib"]
M1["shared-auth-store.ts"]
end
end
end
subgraph M2["shared-notification-store"]
subgraph M3["src"]
M4["index.ts"]
subgraph M5["lib"]
M6["shared-notification-store.tsx"]
end
end
end
subgraph M7["shared-ui-store"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["shared-ui-store.ts"]
MC["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MD["server"]
subgraph ME["controllers"]
subgraph MF["src"]
MG["index.ts"]
subgraph MH["lib"]
MI["auth.controller.ts"]
MJ["order.controller.ts"]
end
end
end
subgraph MK["decorators"]
ML["jest.config.ts"]
subgraph MM["src"]
MN["index.ts"]
subgraph MO["lib"]
MP["current-user.decorator.ts"]
MQ["decorators.ts"]
MR["decorators.spec.ts"]
end
end
end
subgraph MS["entities"]
subgraph MT["src"]
MU["index.ts"]
subgraph MV["lib"]
MW["brand.entity.ts"]
MX["product.entity.ts"]
MY["category.entity.ts"]
MZ["product-description.entity.ts"]
N0["site-language.entity.ts"]
N1["product-info.entity.ts"]
N2["color.entity.ts"]
N3["product-info-color.entity.ts"]
N4["seller-info.entity.ts"]
N5["seller-product.entity.ts"]
N6["user.entity.ts"]
N7["cart.entity.ts"]
N8["currency-preference.entity.ts"]
N9["currency.entity.ts"]
NA["customer.entity.ts"]
NB["exchange-rate.entity.ts"]
NC["order.entity.ts"]
ND["platform-settings.entity.ts"]
NE["refresh-token.entity.ts"]
NF["seller-order.entity.ts"]
NG["translation.entity.ts"]
end
end
end
subgraph NH["guards"]
NI["jest.config.ts"]
subgraph NJ["src"]
NK["index.ts"]
subgraph NL["lib"]
NM["catalog.guard.ts"]
NN["graphql-auth.guard.ts"]
NO["http-auth.guard.ts"]
NP["roles.guard.ts"]
NQ["catalog.guard.spec.ts"]
NR["roles.guard.spec.ts"]
end
end
end
subgraph NS["inputs"]
subgraph NT["src"]
NU["index.ts"]
subgraph NV["lib"]
NW["brand.input.ts"]
NX["cart.inputs.ts"]
NY["category.input.ts"]
NZ["color.input.ts"]
O0["customer-auth.inputs.ts"]
O1["order-pagination.inputs.ts"]
O2["order.inputs.ts"]
O3["product-info-filter.input.ts"]
O4["product.input.ts"]
O5["seller-order-pagination.inputs.ts"]
O6["seller.input.ts"]
O7["site-language.input.ts"]
O8["user.input.ts"]
end
end
end
subgraph O9["modules"]
subgraph OA["src"]
OB["index.ts"]
subgraph OC["lib"]
OD["auth.module.ts"]
OE["email.module.ts"]
OF["token.module.ts"]
OG["user.module.ts"]
OH["customer-profile.module.ts"]
OI["brand.module.ts"]
OJ["catalog-guard.module.ts"]
OK["translation.module.ts"]
OL["cart.module.ts"]
OM["platform-settings.module.ts"]
ON["category.module.ts"]
OO["product.module.ts"]
OP["color.module.ts"]
OQ["currency.module.ts"]
OR["graphql-context.module.ts"]
OS["order.module.ts"]
OT["seller-info.module.ts"]
OU["payment.module.ts"]
OV["product-info.module.ts"]
OW["seller-products.module.ts"]
OX["site-language.module.ts"]
end
end
end
subgraph OY["resolvers"]
OZ["jest.config.ts"]
subgraph P0["src"]
P1["index.ts"]
subgraph P2["lib"]
P3["auth.resolver.ts"]
P4["brand.resolver.ts"]
P5["cart.resolver.ts"]
P6["category.resolver.ts"]
P7["color.resolver.ts"]
P8["currency.resolver.ts"]
P9["customer-profile.resolver.ts"]
PA["order.resolver.ts"]
PB["payment.resolver.ts"]
PC["product-info.resolver.ts"]
PD["product.resolver.ts"]
PE["seller-info.resolver.ts"]
PF["shipping.resolver.ts"]
PG["site-language.resolver.ts"]
PH["translation.input.ts"]
PI["translation.resolver.ts"]
PJ["user.resolver.ts"]
PK["auth.resolver.spec.ts"]
PL["order.resolver.spec.ts"]
PM["payment.resolver.integration.spec.ts"]
PN["payment.resolver.spec.ts"]
PO["product-info.resolver.spec.ts"]
subgraph PP["types"]
PQ["graphql-upload.d.ts"]
end
PR["user.resolver.spec.ts"]
end
end
end
subgraph PS["services"]
PT["jest.config.ts"]
subgraph PU["src"]
PV["index.ts"]
subgraph PW["lib"]
PX["auth.service.ts"]
PY["brand.service.ts"]
PZ["cart.service.ts"]
Q0["product-info-colors.util.ts"]
Q1["category.service.ts"]
Q2["color.service.ts"]
Q3["currency.service.ts"]
Q4["customer-profile.service.ts"]
Q5["email.service.ts"]
Q6["image-upload.service.ts"]
Q7["order.service.ts"]
Q8["payment-logger.service.ts"]
Q9["payment.service.ts"]
QA["product.service.ts"]
QB["seller-info.service.ts"]
QC["shipping-calculation.service.ts"]
QD["site-language.service.ts"]
QE["token.service.ts"]
QF["translation.service.ts"]
QG["user.service.ts"]
QH["auth.service.spec.ts"]
QI["cart.service.spec.ts"]
QJ["order.service.spec.ts"]
QK["product-info-colors.util.spec.ts"]
QL["product.service.pants.spec.ts"]
QM["product.service.spec.ts"]
QN["relay-connection.spec.ts"]
QO["shipping-calculation.service.spec.ts"]
QP["token.service.spec.ts"]
end
end
end
subgraph QQ["strategies"]
subgraph QR["src"]
QS["index.ts"]
subgraph QT["lib"]
QU["local.strategy.ts"]
end
end
end
subgraph QV["utils"]
subgraph QW["src"]
QX["index.ts"]
subgraph QY["lib"]
QZ["email-templates.ts"]
R0["relay-connection.ts"]
R1["pagination.ts"]
end
end
end
end
subgraph R2["shared"]
subgraph R3["codegen"]
R4["jest.config.ts"]
subgraph R5["src"]
R6["index.ts"]
subgraph R7["lib"]
subgraph R8["generated"]
R9["graphql.ts"]
end
end
end
end
subgraph RA["graphql-schema"]
RB["jest.config.ts"]
subgraph RC["src"]
RD["index.ts"]
end
end
subgraph RE["product-sizes"]
subgraph RF["src"]
RG["index.ts"]
subgraph RH["lib"]
RI["product-sizes.ts"]
RJ["product-sizes.pants-formats.spec.ts"]
RK["product-sizes.pants-label.spec.ts"]
RL["product-sizes.pants-strict.spec.ts"]
RM["product-sizes.spec.ts"]
end
end
end
subgraph RN["shared-i18n"]
subgraph RO["src"]
RP["index.ts"]
subgraph RQ["lib"]
RR["language-context.tsx"]
RS["language-detector.ts"]
subgraph RT["locales"]
RU["i18n-react.tsx"]
RV["i18n-util.ts"]
RW["i18n-util.async.ts"]
subgraph RX["en"]
RY["index.ts"]
end
subgraph S0["fa"]
S1["index.ts"]
end
S2["formatters.ts"]
S3["i18n-types.ts"]
S4["i18n-util.sync.ts"]
S5["navigator-detector.ts"]
end
RZ["site-name.ts"]
S6["table-localization.ts"]
S7["theme-provider.tsx"]
S8["use-page-title.ts"]
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
BF-->BH
BK-->BM
BN-->BM
BR-->BT
BX-->BZ
C2-->C4
C5-->C4
C5-->C6
CA-->CC
CD-->CC
CH-->CJ
CK-->CJ
CO-->CQ
CR-->CQ
CT-->CV
D0-->D2
D3-->D2
D6-->D8
DB-->DD
DB-->DE
DD-->DE
DI-->DK
DL-->DK
DO-->DQ
DO-->DR
DO-->DS
DO-->DV
DS-->DT
DT-->DU
DV-->DQ
DV-->DW
E3-->E5
E5-->E6
E9-->EB
EE-->EG
EE-->EH
EK-->EM
EP-->ER
EV-->EX
EY-->EX
F1-->F3
F6-->F8
F8-->F9
FA-->F9
FB-->F9
FC-->F8
FF-->FH
FI-->FH
FJ-->FH
FO-->FQ
FR-->FQ
FV-->FX
G0-->G2
G6-->G8
GE-->GG
GE-->GH
GI-->GH
GL-->GN
GO-->GN
GS-->GU
GV-->GU
GY-->H0
H3-->H5
H3-->H6
H3-->H7
H5-->H6
H8-->H5
HC-->HE
HF-->HE
HI-->HK
HN-->HP
HQ-->HP
HT-->HV
HV-->HW
HZ-->I1
I1-->I2
I1-->I3
I1-->I4
I1-->I5
I3-->I2
I3-->I4
I6-->I7
IA-->IC
IG-->II
IJ-->II
IM-->IO
IR-->IT
IR-->IU
IR-->IV
IR-->IW
J1-->J3
J1-->J4
J4-->J3
J8-->JA
JA-->JB
JE-->JG
JG-->JH
JK-->JM
JK-->JO
JK-->JP
JK-->JN
JM-->JN
JQ-->JN
JT-->JV
JT-->JW
JT-->JX
JX-->JW
JY-->JV
K1-->K3
K1-->K4
K4-->K3
K5-->K4
K9-->KB
K9-->KC
KC-->KB
KF-->KH
KL-->KN
KO-->KN
KS-->KU
KV-->KU
KY-->L0
L1-->L0
L4-->L6
L9-->LB
LG-->LI
LL-->LN
LL-->LO
LR-->LT
LU-->LV
LZ-->M1
M4-->M6
M9-->MB
MG-->MI
MG-->MJ
MN-->MP
MN-->MQ
MR-->MQ
MU-->MW
MU-->N7
MU-->MY
MU-->N2
MU-->N8
MU-->N9
MU-->NA
MU-->NB
MU-->NC
MU-->ND
MU-->MZ
MU-->N3
MU-->N1
MU-->MX
MU-->NE
MU-->N4
MU-->NF
MU-->N5
MU-->N0
MU-->NG
MU-->N6
MW-->MX
MX-->MW
MX-->MY
MX-->MZ
MX-->N1
MX-->N4
MX-->N5
MY-->MX
MZ-->MX
MZ-->N0
N0-->MZ
N1-->N2
N1-->N3
N1-->MX
N3-->N2
N3-->N1
N4-->N5
N4-->N6
N5-->N1
N5-->MX
N5-->N4
N7-->MX
N7-->N6
N8-->N9
NA-->N6
NB-->N9
NB-->N6
NC-->MX
NC-->N4
NE-->N6
NF-->NC
NK-->NM
NK-->NN
NK-->NO
NK-->NP
NQ-->NM
NR-->NP
NU-->NW
NU-->NX
NU-->NY
NU-->NZ
NU-->O0
NU-->O1
NU-->O2
NU-->O3
NU-->O4
NU-->O5
NU-->O6
NU-->O7
NU-->O8
O4-->O3
OB-->OD
OB-->OI
OB-->OL
OB-->OJ
OB-->ON
OB-->OP
OB-->OQ
OB-->OH
OB-->OE
OB-->OR
OB-->OS
OB-->OU
OB-->OM
OB-->OV
OB-->OO
OB-->OT
OB-->OW
OB-->OX
OB-->OF
OB-->OK
OB-->OG
OD-->OE
OD-->OF
OD-->OG
OG-->OD
OG-->OH
OI-->OJ
OI-->OK
OL-->OM
ON-->OJ
ON-->OO
ON-->OK
OO-->OJ
OO-->OF
OO-->OK
OP-->OJ
OP-->OK
OR-->OE
OR-->OF
OR-->OG
OS-->OM
OS-->OT
OT-->OO
OT-->OF
OT-->OG
OU-->OS
OV-->OO
OV-->OK
OW-->OT
OW-->OG
P1-->P3
P1-->P4
P1-->P5
P1-->P6
P1-->P7
P1-->P8
P1-->P9
P1-->PA
P1-->PB
P1-->PC
P1-->PD
P1-->PE
P1-->PF
P1-->PG
P1-->PH
P1-->PI
P1-->PJ
PK-->P3
PL-->PA
PM-->PB
PN-->PB
PO-->PC
PR-->PJ
PV-->PX
PV-->PY
PV-->PZ
PV-->Q1
PV-->Q2
PV-->Q3
PV-->Q4
PV-->Q5
PV-->Q6
PV-->Q7
PV-->Q8
PV-->Q9
PV-->Q0
PV-->QA
PV-->QB
PV-->QC
PV-->QD
PV-->QE
PV-->QF
PV-->QG
PZ-->Q0
QA-->Q0
QB-->Q0
QH-->PX
QH-->Q5
QH-->QE
QH-->QG
QI-->PZ
QJ-->Q7
QK-->Q0
QL-->QA
QL-->QF
QM-->QA
QM-->QF
QO-->QC
QP-->QE
QS-->QU
QX-->QZ
QX-->R0
R6-->R9
RG-->RI
RJ-->RI
RK-->RI
RL-->RI
RM-->RI
RP-->RR
RP-->RS
RP-->RU
RP-->S3
RP-->RV
RP-->RW
RP-->S4
RP-->S5
RP-->RZ
RP-->S6
RP-->S7
RP-->S8
RR-->RS
RR-->RU
RR-->RW
RU-->RV
RW-->RY
RW-->S1
RW-->S2
RW-->RV
RY-->RZ
S1-->RZ
S4-->RY
S4-->S1
S4-->S2
S4-->RV
S6-->RU
S7-->RR
S8-->RU
