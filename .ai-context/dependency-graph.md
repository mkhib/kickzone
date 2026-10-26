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
R["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph S["contexts"]
subgraph T["src"]
U["index.spec.tsx"]
V["index.ts"]
subgraph W["lib"]
X["AdminsAuthContext.tsx"]
Y["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph Z["graphql"]
subgraph 10["src"]
11["index.ts"]
subgraph 12["lib"]
13["fragments.ts"]
14["mutations.ts"]
15["orders.graphql.ts"]
16["Provider.tsx"]
17["AdminsApolloProvider.tsx"]
18["client.ts"]
19["queries.ts"]
1A["Provider.spec.tsx"]
1B["apollo-upload-client.d.ts"]
1C["client.spec.tsx"]
1D["fragments.spec.tsx"]
1E["mutations.spec.tsx"]
1F["queries.spec.tsx"]
end
subgraph 1G["types"]
1H["apollo-upload-client.d.ts"]
end
end
end
subgraph 1I["hooks"]
subgraph 1J["auth"]
subgraph 1K["src"]
1L["index.ts"]
subgraph 1M["lib"]
1N["useAdminLogin.ts"]
1O["useAdminLogin.spec.ts"]
1P["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1Q["currency-management"]
subgraph 1R["src"]
1S["index.ts"]
subgraph 1T["lib"]
1U["useAdminsCurrencyManagement.ts"]
end
end
1V["vite.config.ts"]
end
subgraph 1W["customers"]
subgraph 1X["src"]
1Y["index.ts"]
subgraph 1Z["lib"]
20["adminsCustomers.graphql.ts"]
21["useAdminsCustomers.ts"]
22["useAdminsCustomers.spec.tsx"]
end
end
23["vite.config.ts"]
end
subgraph 24["orders"]
subgraph 25["src"]
26["index.ts"]
subgraph 27["lib"]
28["admins-orders-hook.tsx"]
29["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2A["sellers"]
subgraph 2B["src"]
2C["index.ts"]
subgraph 2D["lib"]
2E["useAdminsSellers.ts"]
2F["adminsSellers.graphql.ts"]
2G["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2H["router"]
subgraph 2I["src"]
2J["index.ts"]
subgraph 2K["lib"]
2L["AdminsRouter.tsx"]
2M["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2N["routes"]
subgraph 2O["src"]
2P["index.spec.ts"]
2Q["index.ts"]
subgraph 2R["lib"]
2S["admin-routes.ts"]
2T["admin-routes.spec.ts"]
end
end
end
subgraph 2U["screens"]
subgraph 2V["admin-seller-orders"]
subgraph 2W["src"]
2X["index.spec.tsx"]
2Y["index.ts"]
subgraph 2Z["lib"]
30["admin-seller-orders.tsx"]
31["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 32["currency-management"]
subgraph 33["src"]
34["index.ts"]
subgraph 35["lib"]
36["currency-management.tsx"]
37["currency-management.spec.tsx"]
end
end
end
subgraph 38["customer-management"]
subgraph 39["src"]
3A["index.ts"]
subgraph 3B["lib"]
3C["admin-customer-management.tsx"]
3D["admin-customer-management.spec.tsx"]
end
end
3E["vite.config.ts"]
end
subgraph 3F["login"]
subgraph 3G["src"]
3H["index.ts"]
subgraph 3I["lib"]
3J["AdminsLogin.tsx"]
3K["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3L["product-editor"]
subgraph 3M["src"]
3N["index.spec.tsx"]
3O["index.ts"]
subgraph 3P["lib"]
3Q["AdminProductEditor.tsx"]
3R["AdminProductEditor.spec.tsx"]
end
3S["vite-env.d.ts"]
end
end
subgraph 3T["products"]
subgraph 3U["src"]
3V["index.spec.tsx"]
3W["index.ts"]
subgraph 3X["lib"]
3Y["AdminProducts.tsx"]
3Z["adminProducts.hooks.ts"]
40["adminProducts.graphql.ts"]
41["ProductImageManagementModal.tsx"]
42["AdminProducts.spec.tsx"]
43["ProductImageManagementModal.spec.tsx"]
end
44["vite-env.d.ts"]
end
end
subgraph 45["seller-management"]
subgraph 46["src"]
47["index.spec.tsx"]
48["index.ts"]
subgraph 49["lib"]
4A["SellerManagement.tsx"]
4B["SellerManagement.spec.tsx"]
end
4C["vite-env.d.ts"]
end
end
subgraph 4D["translation-management"]
subgraph 4E["src"]
4F["index.ts"]
subgraph 4G["lib"]
4H["AdminTranslationManagement.tsx"]
4I["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4J["unauthorized"]
subgraph 4K["src"]
4L["index.spec.tsx"]
4M["index.ts"]
subgraph 4N["lib"]
4O["admins-unauthorized-screen.tsx"]
4P["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4Q["zustand"]
subgraph 4R["admins-products-store"]
subgraph 4S["src"]
4T["index.spec.ts"]
4U["index.ts"]
subgraph 4V["lib"]
4W["admins-products-store.ts"]
4X["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 4Y["customers"]
subgraph 4Z["components"]
subgraph 50["footer"]
subgraph 51["src"]
52["index.ts"]
subgraph 53["lib"]
54["customers-footer.tsx"]
55["TrustBadgeIcons.tsx"]
56["customers-footer.spec.tsx"]
end
end
end
subgraph 57["headerbar"]
subgraph 58["src"]
59["index.ts"]
subgraph 5A["lib"]
5B["CustomersHeaderbar.tsx"]
5C["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5D["layout"]
subgraph 5E["src"]
5F["index.ts"]
subgraph 5G["lib"]
5H["CustomersLayout.tsx"]
5I["CustomersTabbar.tsx"]
5J["CustomersLayout.spec.tsx"]
5K["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5L["product-card"]
subgraph 5M["src"]
5N["index.ts"]
subgraph 5O["lib"]
5P["CustomersProductCard.tsx"]
5Q["CustomersProductCard.spec.tsx"]
end
5R["vite-env.d.ts"]
end
end
end
subgraph 5S["contexts"]
subgraph 5T["auth"]
subgraph 5U["src"]
5V["index.ts"]
subgraph 5W["lib"]
5X["CustomersAuthContext.tsx"]
5Y["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 5Z["graphql"]
subgraph 60["src"]
61["index.ts"]
subgraph 62["lib"]
63["customer-profile.queries.ts"]
64["mutations.ts"]
65["Provider.tsx"]
66["CustomersApolloProvider.tsx"]
67["client.ts"]
68["queries.ts"]
69["apollo-upload-client.d.ts"]
end
end
end
subgraph 6A["hooks"]
subgraph 6B["auth"]
subgraph 6C["src"]
6D["index.ts"]
subgraph 6E["lib"]
6F["useCustomersForgotPassword.tsx"]
6G["useCustomersLogin.tsx"]
6H["useCustomersRegister.tsx"]
6I["useCustomersResetPassword.tsx"]
6J["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6K["cart"]
subgraph 6L["src"]
6M["index.ts"]
subgraph 6N["lib"]
6O["customers-cart-hook.tsx"]
6P["useCartService.ts"]
6Q["useWishlistSync.ts"]
6R["useCartSync.ts"]
end
end
end
subgraph 6S["orders"]
subgraph 6T["src"]
6U["index.ts"]
subgraph 6V["lib"]
6W["customers-orders-hook.tsx"]
end
end
end
subgraph 6X["products"]
subgraph 6Y["src"]
6Z["index.ts"]
subgraph 70["lib"]
71["customers-product-hook.tsx"]
end
end
end
end
subgraph 72["router"]
subgraph 73["src"]
74["index.ts"]
subgraph 75["lib"]
76["CustomersRouter.tsx"]
77["ScrollToTop.tsx"]
78["CustomersRouter.spec.tsx"]
79["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7A["routes"]
subgraph 7B["src"]
7C["index.ts"]
subgraph 7D["lib"]
7E["customer-routes.ts"]
7F["customer-routes.spec.ts"]
end
end
end
subgraph 7G["screens"]
subgraph 7H["contact"]
subgraph 7I["src"]
7J["index.ts"]
subgraph 7K["lib"]
7L["customer-contact.tsx"]
7M["customer-contact.spec.tsx"]
end
end
7N["vite.config.ts"]
end
subgraph 7O["customer-checkout"]
subgraph 7P["src"]
7Q["index.ts"]
subgraph 7R["lib"]
7S["customer-checkout.tsx"]
end
end
end
subgraph 7T["customer-favorites"]
subgraph 7U["src"]
7V["index.ts"]
subgraph 7W["lib"]
7X["customer-favorites.tsx"]
7Y["customer-favorites.spec.tsx"]
end
end
7Z["vite.config.ts"]
end
subgraph 80["customer-login"]
subgraph 81["src"]
82["index.ts"]
subgraph 83["lib"]
84["customer-login.tsx"]
end
end
end
subgraph 85["customer-order-confirmation"]
subgraph 86["src"]
87["index.ts"]
subgraph 88["lib"]
89["customer-order-confirmation.tsx"]
8A["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8B["customer-orders"]
subgraph 8C["src"]
8D["index.ts"]
subgraph 8E["lib"]
8F["customer-orders.tsx"]
end
end
end
subgraph 8G["customer-payment"]
subgraph 8H["src"]
8I["index.ts"]
subgraph 8J["lib"]
8K["customer-payment-callback.tsx"]
8L["use-zarinpal-payment.tsx"]
8M["zarinpal-payment-service.ts"]
end
end
end
subgraph 8N["customer-products"]
subgraph 8O["src"]
8P["index.ts"]
subgraph 8Q["lib"]
8R["customer-products.tsx"]
end
end
end
subgraph 8S["customer-profile"]
subgraph 8T["src"]
8U["index.ts"]
subgraph 8V["lib"]
8W["customer-profile.tsx"]
8X["customer-profile.spec.tsx"]
end
end
end
subgraph 8Y["customer-shopping-cart"]
subgraph 8Z["src"]
90["index.ts"]
subgraph 91["lib"]
92["customer-shopping-cart.tsx"]
93["customer-shopping-cart.spec.tsx"]
end
end
94["vite.config.ts"]
end
subgraph 95["customer-signup"]
subgraph 96["src"]
97["index.ts"]
subgraph 98["lib"]
99["customer-signup.tsx"]
9A["customer-signup.spec.tsx"]
end
end
end
subgraph 9B["forgot-password"]
subgraph 9C["src"]
9D["index.ts"]
subgraph 9E["lib"]
9F["customer-forgot-password.tsx"]
9G["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9H["guide-authenticity"]
subgraph 9I["src"]
9J["index.ts"]
subgraph 9K["lib"]
9L["customer-guide-authenticity.tsx"]
9M["customer-guide-authenticity.spec.tsx"]
end
end
9N["vite.config.ts"]
end
subgraph 9O["guide-payment"]
subgraph 9P["src"]
9Q["index.ts"]
subgraph 9R["lib"]
9S["customer-guide-payment.tsx"]
9T["customer-guide-payment.spec.tsx"]
end
end
9U["vite.config.ts"]
end
subgraph 9V["home"]
subgraph 9W["src"]
9X["index.ts"]
subgraph 9Y["lib"]
9Z["CustomersHomeScreen.tsx"]
subgraph A0["components"]
A1["CategoryBentoSection.tsx"]
A3["HeroSection.tsx"]
A4["HomeLoadingScreen.tsx"]
A5["PicksRailSection.tsx"]
A6["TrustStripSection.tsx"]
AA["NewArrivalsSection.tsx"]
AB["BrandBlocksSection.tsx"]
AC["NewsletterSection.tsx"]
AD["ShopTheLookSection.tsx"]
AE["TickerSection.tsx"]
end
A2["home-selectors.ts"]
A7["useScrollProgress.ts"]
A8["CustomersShopScreen.tsx"]
A9["CustomersHomeScreen.spec.tsx"]
end
end
end
subgraph AF["login"]
subgraph AG["src"]
AH["index.ts"]
subgraph AI["lib"]
AJ["CustomersLoginScreen.tsx"]
AK["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AL["not-found"]
subgraph AM["src"]
AN["index.ts"]
subgraph AO["lib"]
AP["customer-not-found.tsx"]
AQ["customer-not-found.spec.tsx"]
end
end
AR["vite.config.ts"]
end
subgraph AS["privacy-policy"]
subgraph AT["src"]
AU["index.ts"]
subgraph AV["lib"]
AW["customer-privacy-policy.tsx"]
AX["customer-privacy-policy.spec.tsx"]
end
end
AY["vite.config.ts"]
end
subgraph AZ["product-details"]
subgraph B0["src"]
B1["index.ts"]
subgraph B2["lib"]
B3["customer-product-details.tsx"]
B4["customer-product-details.spec.tsx"]
end
end
B5["vite.config.ts"]
end
subgraph B6["reset-password"]
subgraph B7["src"]
B8["index.ts"]
subgraph B9["lib"]
BA["customer-reset-password.tsx"]
end
end
end
subgraph BB["shipping-returns"]
subgraph BC["src"]
BD["index.ts"]
subgraph BE["lib"]
BF["customer-shipping-returns.tsx"]
BG["customer-shipping-returns.spec.tsx"]
end
end
BH["vite.config.ts"]
end
subgraph BI["unauthorized"]
subgraph BJ["src"]
BK["index.ts"]
subgraph BL["lib"]
BM["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BN["utility"]
subgraph BO["test"]
subgraph BP["src"]
BQ["index.ts"]
subgraph BR["lib"]
BS["customers-test-utility.tsx"]
end
end
end
end
subgraph BT["validations"]
subgraph BU["src"]
BV["index.ts"]
subgraph BW["lib"]
BX["shipping-validation.ts"]
BY["shipping-validation.spec.tsx"]
BZ["shipping-validation.tsx"]
end
end
end
subgraph C0["zustand"]
subgraph C1["customer-cart-store"]
subgraph C2["src"]
C3["index.ts"]
subgraph C4["lib"]
C5["customer-cart-store.ts"]
C6["customer-cart-store.spec.ts"]
C7["customer-cart-store.tsx"]
end
end
end
subgraph C8["customer-checkout-store"]
subgraph C9["src"]
CA["index.ts"]
subgraph CB["lib"]
CC["customer-checkout-store.ts"]
CD["customer-checkout-store.spec.ts"]
end
end
CE["vite.config.ts"]
end
subgraph CF["customer-wishlist-store"]
subgraph CG["src"]
CH["index.ts"]
subgraph CI["lib"]
CJ["customer-wishlist-store.ts"]
CK["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CL["src"]
CM["index.ts"]
subgraph CN["lib"]
CO["customers-products-store.tsx"]
end
end
end
end
subgraph CP["sellers"]
subgraph CQ["components"]
subgraph CR["footer"]
subgraph CS["src"]
CT["index.ts"]
subgraph CU["lib"]
CV["sellers-footer.tsx"]
CW["sellers-footer.spec.tsx"]
end
end
end
subgraph CX["headerbar"]
subgraph CY["src"]
CZ["index.ts"]
subgraph D0["lib"]
D1["SellersHeaderbar.tsx"]
end
end
end
subgraph D2["layout"]
subgraph D3["src"]
D4["index.ts"]
subgraph D5["lib"]
D6["SellersLayout.tsx"]
end
end
end
end
subgraph D7["contexts"]
subgraph D8["auth"]
subgraph D9["src"]
DA["index.ts"]
subgraph DB["lib"]
DC["SellersAuthContext.tsx"]
DD["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DE["graphql"]
subgraph DF["src"]
DG["index.ts"]
subgraph DH["lib"]
DI["fragments.ts"]
DJ["mutations.ts"]
DK["Provider.tsx"]
DL["SellersApolloProvider.tsx"]
DM["client.ts"]
DN["queries.ts"]
DO["seller-orders.graphql.ts"]
DP["apollo-upload-client.d.ts"]
end
subgraph DQ["types"]
DR["apollo-upload-client.d.ts"]
end
end
end
subgraph DS["hooks"]
subgraph DT["auth"]
subgraph DU["src"]
DV["index.ts"]
subgraph DW["lib"]
DX["useSellerAuth.ts"]
DY["sellerAuth.graphql.ts"]
end
end
end
subgraph DZ["orders"]
subgraph E0["src"]
E1["index.ts"]
subgraph E2["lib"]
E3["useSellerOrders.ts"]
end
end
end
subgraph E4["products"]
subgraph E5["src"]
E6["index.ts"]
subgraph E7["lib"]
E8["useSellersProductManagement.ts"]
E9["useSellersProducts.ts"]
end
end
end
end
subgraph EA["router"]
subgraph EB["src"]
EC["index.ts"]
subgraph ED["lib"]
EE["SellersRouter.tsx"]
end
end
end
subgraph EF["routes"]
subgraph EG["src"]
EH["index.ts"]
subgraph EI["lib"]
EJ["seller-routes.ts"]
end
end
end
subgraph EK["screens"]
subgraph EL["catalog"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["SellersCatalogScreens.tsx"]
EQ["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph ER["login"]
subgraph ES["src"]
ET["index.ts"]
subgraph EU["lib"]
EV["SellersLogin.tsx"]
end
end
end
subgraph EW["manage-product"]
subgraph EX["src"]
EY["index.ts"]
subgraph EZ["lib"]
F0["SellersManageProductScreen.tsx"]
F1["SellersDefineProductFlow.tsx"]
F2["SellersDefineProductFlow.spec.tsx"]
F3["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph F4["products"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["SellersProducts.tsx"]
F9["SellersProducts.spec.tsx"]
end
end
end
subgraph FA["seller-orders"]
subgraph FB["src"]
FC["index.ts"]
subgraph FD["lib"]
FE["seller-orders-screen.tsx"]
end
end
end
subgraph FF["setup-password"]
subgraph FG["src"]
FH["index.ts"]
subgraph FI["lib"]
FJ["SellersSetupPassword.tsx"]
end
end
end
subgraph FK["unauthorized"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph FP["zustand"]
subgraph FQ["sellers-products-store"]
subgraph FR["src"]
FS["index.ts"]
subgraph FT["lib"]
FU["useSellersProductsStore.ts"]
FV["sellers-products-store.tsx"]
end
end
end
end
end
subgraph FW["shared"]
subgraph FX["components"]
subgraph FY["apollo-provider-base"]
subgraph FZ["src"]
G0["index.ts"]
subgraph G1["lib"]
G2["ApolloProviderBase.tsx"]
G3["createSilentRefreshAuthLink.ts"]
G4["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph G5["error-boundary"]
subgraph G6["src"]
G7["index.ts"]
subgraph G8["lib"]
G9["error-boundary.tsx"]
GA["error-boundary.spec.tsx"]
end
end
GB["vite.config.ts"]
end
subgraph GC["glassmorphism-container"]
subgraph GD["src"]
GE["index.ts"]
subgraph GF["lib"]
GG["glassmorphism-container.tsx"]
GH["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GI["layout"]
subgraph GJ["src"]
GK["index.ts"]
subgraph GL["lib"]
GM["Layout.tsx"]
end
end
end
subgraph GN["material-data-table"]
subgraph GO["src"]
GP["index.ts"]
subgraph GQ["lib"]
GR["material-data-table.tsx"]
GS["table-config.ts"]
GT["table-utils.ts"]
GU["material-data-table.spec.tsx"]
GV["table-types.ts"]
end
end
end
subgraph GW["order-status-chip"]
subgraph GX["src"]
GY["index.ts"]
subgraph GZ["lib"]
H0["order-status-chip.tsx"]
H1["order-status-chip.spec.tsx"]
end
end
end
subgraph H2["password-field"]
subgraph H3["src"]
H4["index.ts"]
subgraph H5["lib"]
H6["PasswordTextField.tsx"]
end
end
end
subgraph H7["price-display"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["price-display.tsx"]
HC["price-display.spec.tsx"]
end
end
end
subgraph HD["private-route"]
subgraph HE["src"]
HF["index.ts"]
subgraph HG["lib"]
HH["createPrivateRoute.tsx"]
HI["PrivateRoute.tsx"]
end
end
end
subgraph HJ["rtl-table-utils"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["rtl-table-utils.ts"]
HO["rtl-cell-components.tsx"]
HP["rtl-column-helpers.ts"]
HQ["rtl-table-props.ts"]
HR["use-table-alignment.ts"]
HS["rtl-table-utils.spec.tsx"]
HT["rtl-table-utils.tsx"]
end
end
end
subgraph HU["snackbar"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["snackbar.tsx"]
HZ["Snackbar.tsx"]
end
end
end
subgraph I0["styled-drawer"]
subgraph I1["src"]
I2["index.ts"]
subgraph I3["lib"]
I4["styled-drawer.tsx"]
I5["styled-drawer.spec.tsx"]
end
end
end
subgraph I6["unauthorized"]
subgraph I7["src"]
I8["index.ts"]
subgraph I9["lib"]
IA["unauthorized-path.tsx"]
end
end
end
end
subgraph IB["graphql"]
subgraph IC["src"]
ID["index.ts"]
subgraph IE["lib"]
IF["currency.mutations.ts"]
IG["currency.queries.ts"]
IH["fragments.ts"]
II["variant-colors.ts"]
IJ["client-shared-graphql.tsx"]
end
end
end
subgraph IK["hooks"]
subgraph IL["brands"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["brands.graphql.ts"]
IQ["useBrands.ts"]
end
end
IR["vite.config.ts"]
end
subgraph IS["categories"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["useCategories.ts"]
IX["categories.graphql.ts"]
end
end
end
subgraph IY["colors"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["useColors.ts"]
J3["color.graphql.ts"]
end
end
end
subgraph J4["currency"]
subgraph J5["src"]
J6["index.ts"]
subgraph J7["lib"]
J8["useConvertPrice.tsx"]
J9["useExchangeRate.tsx"]
JA["useCurrencies.tsx"]
JB["useCurrencyForLocale.tsx"]
end
end
end
subgraph JC["products"]
subgraph JD["src"]
JE["index.ts"]
subgraph JF["lib"]
JG["productImage.ts"]
JH["products.graphql.ts"]
JI["useProducts.ts"]
JJ["productImage.spec.ts"]
end
end
end
subgraph JK["site-languages"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["site-languages.graphql.ts"]
JP["useSiteLanguages.ts"]
JQ["site-languages-hook.spec.tsx"]
end
end
JR["vite.config.ts"]
end
subgraph JS["snackbar"]
subgraph JT["src"]
JU["index.ts"]
subgraph JV["lib"]
JW["SnackbarContext.tsx"]
JX["useSnackbar.ts"]
end
end
end
subgraph JY["translations-management-hook"]
subgraph JZ["src"]
K0["index.ts"]
subgraph K1["lib"]
K2["useTranslationsManagement.ts"]
end
end
end
end
subgraph K3["lottie"]
subgraph K4["empty-cart"]
subgraph K5["src"]
K6["index.ts"]
subgraph K7["lib"]
K8["lottie-empty-cart.tsx"]
K9["lottie-empty-cart.spec.tsx"]
end
end
KA["vite.config.ts"]
end
subgraph KB["loading"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["lottie-loading.tsx"]
KG["lottie-loading.spec.tsx"]
end
end
end
subgraph KH["success-check"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["lottie-success-check.tsx"]
KM["lottie-success-check.spec.tsx"]
end
end
end
subgraph KN["unauthorized"]
subgraph KO["src"]
KP["index.ts"]
subgraph KQ["lib"]
KR["lottie-unauthorized.tsx"]
end
end
end
end
subgraph KS["translations"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["mapApolloErrorToTranslationKey.ts"]
KX["WrapTranslation.tsx"]
end
end
end
subgraph KY["ui"]
subgraph KZ["colors"]
subgraph L0["src"]
L1["index.ts"]
subgraph L2["lib"]
L3["colors.ts"]
end
end
end
subgraph L4["language-components"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["language-components.tsx"]
L9["ltr-text-field.tsx"]
end
end
end
subgraph LA["sizes"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["sizes.ts"]
LF["sizes.spec.tsx"]
LG["sizes.tsx"]
end
end
end
end
subgraph LH["zustand"]
subgraph LI["shared-auth-store"]
subgraph LJ["src"]
LK["index.ts"]
subgraph LL["lib"]
LM["shared-auth-store.ts"]
end
end
end
subgraph LN["shared-notification-store"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["shared-notification-store.tsx"]
end
end
end
subgraph LS["shared-ui-store"]
subgraph LT["src"]
LU["index.ts"]
subgraph LV["lib"]
LW["shared-ui-store.ts"]
LX["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph LY["server"]
subgraph LZ["controllers"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["auth.controller.ts"]
M4["order.controller.ts"]
end
end
end
subgraph M5["decorators"]
M6["jest.config.ts"]
subgraph M7["src"]
M8["index.ts"]
subgraph M9["lib"]
MA["current-user.decorator.ts"]
MB["decorators.ts"]
MC["decorators.spec.ts"]
end
end
end
subgraph MD["entities"]
subgraph ME["src"]
MF["index.ts"]
subgraph MG["lib"]
MH["brand.entity.ts"]
MI["product.entity.ts"]
MJ["category.entity.ts"]
MK["product-description.entity.ts"]
ML["site-language.entity.ts"]
MM["product-info.entity.ts"]
MN["color.entity.ts"]
MO["product-info-color.entity.ts"]
MP["seller-info.entity.ts"]
MQ["seller-product.entity.ts"]
MR["user.entity.ts"]
MS["cart.entity.ts"]
MT["currency-preference.entity.ts"]
MU["currency.entity.ts"]
MV["customer.entity.ts"]
MW["exchange-rate.entity.ts"]
MX["order.entity.ts"]
MY["platform-settings.entity.ts"]
MZ["refresh-token.entity.ts"]
N0["seller-order.entity.ts"]
N1["translation.entity.ts"]
end
end
end
subgraph N2["guards"]
N3["jest.config.ts"]
subgraph N4["src"]
N5["index.ts"]
subgraph N6["lib"]
N7["catalog.guard.ts"]
N8["graphql-auth.guard.ts"]
N9["http-auth.guard.ts"]
NA["roles.guard.ts"]
NB["catalog.guard.spec.ts"]
NC["roles.guard.spec.ts"]
end
end
end
subgraph ND["inputs"]
subgraph NE["src"]
NF["index.ts"]
subgraph NG["lib"]
NH["brand.input.ts"]
NI["cart.inputs.ts"]
NJ["category.input.ts"]
NK["color.input.ts"]
NL["customer-auth.inputs.ts"]
NM["order-pagination.inputs.ts"]
NN["order.inputs.ts"]
NO["product-info-filter.input.ts"]
NP["product.input.ts"]
NQ["seller-order-pagination.inputs.ts"]
NR["seller.input.ts"]
NS["site-language.input.ts"]
NT["user.input.ts"]
end
end
end
subgraph NU["modules"]
subgraph NV["src"]
NW["index.ts"]
subgraph NX["lib"]
NY["auth.module.ts"]
NZ["email.module.ts"]
O0["token.module.ts"]
O1["user.module.ts"]
O2["customer-profile.module.ts"]
O3["brand.module.ts"]
O4["catalog-guard.module.ts"]
O5["translation.module.ts"]
O6["cart.module.ts"]
O7["platform-settings.module.ts"]
O8["category.module.ts"]
O9["product.module.ts"]
OA["color.module.ts"]
OB["currency.module.ts"]
OC["graphql-context.module.ts"]
OD["order.module.ts"]
OE["seller-info.module.ts"]
OF["payment.module.ts"]
OG["product-info.module.ts"]
OH["seller-products.module.ts"]
OI["site-language.module.ts"]
end
end
end
subgraph OJ["resolvers"]
OK["jest.config.ts"]
subgraph OL["src"]
OM["index.ts"]
subgraph ON["lib"]
OO["auth.resolver.ts"]
OP["brand.resolver.ts"]
OQ["cart.resolver.ts"]
OR["category.resolver.ts"]
OS["color.resolver.ts"]
OT["currency.resolver.ts"]
OU["customer-profile.resolver.ts"]
OV["order.resolver.ts"]
OW["payment.resolver.ts"]
OX["product-info.resolver.ts"]
OY["product.resolver.ts"]
OZ["seller-info.resolver.ts"]
P0["shipping.resolver.ts"]
P1["site-language.resolver.ts"]
P2["translation.input.ts"]
P3["translation.resolver.ts"]
P4["user.resolver.ts"]
P5["auth.resolver.spec.ts"]
P6["payment.resolver.integration.spec.ts"]
P7["product-info.resolver.spec.ts"]
subgraph P8["types"]
P9["graphql-upload.d.ts"]
end
PA["user.resolver.spec.ts"]
end
end
end
subgraph PB["services"]
PC["jest.config.ts"]
subgraph PD["src"]
PE["index.ts"]
subgraph PF["lib"]
PG["auth.service.ts"]
PH["brand.service.ts"]
PI["cart.service.ts"]
PJ["product-info-colors.util.ts"]
PK["category.service.ts"]
PL["color.service.ts"]
PM["currency.service.ts"]
PN["customer-profile.service.ts"]
PO["email.service.ts"]
PP["image-upload.service.ts"]
PQ["order.service.ts"]
PR["payment-logger.service.ts"]
PS["payment.service.ts"]
PT["product.service.ts"]
PU["seller-info.service.ts"]
PV["shipping-calculation.service.ts"]
PW["site-language.service.ts"]
PX["token.service.ts"]
PY["translation.service.ts"]
PZ["user.service.ts"]
Q0["auth.service.spec.ts"]
Q1["order.service.spec.ts"]
Q2["product-info-colors.util.spec.ts"]
Q3["product.service.spec.ts"]
Q4["relay-connection.spec.ts"]
end
end
end
subgraph Q5["strategies"]
subgraph Q6["src"]
Q7["index.ts"]
subgraph Q8["lib"]
Q9["local.strategy.ts"]
end
end
end
subgraph QA["utils"]
subgraph QB["src"]
QC["index.ts"]
subgraph QD["lib"]
QE["email-templates.ts"]
QF["relay-connection.ts"]
QG["pagination.ts"]
end
end
end
end
subgraph QH["shared"]
subgraph QI["codegen"]
QJ["jest.config.ts"]
subgraph QK["src"]
QL["index.ts"]
subgraph QM["lib"]
subgraph QN["generated"]
QO["graphql.ts"]
end
end
end
end
subgraph QP["graphql-schema"]
QQ["jest.config.ts"]
subgraph QR["src"]
QS["index.ts"]
end
end
subgraph QT["product-sizes"]
subgraph QU["src"]
QV["index.ts"]
subgraph QW["lib"]
QX["product-sizes.ts"]
QY["product-sizes.spec.ts"]
end
end
end
subgraph QZ["shared-i18n"]
subgraph R0["src"]
R1["index.ts"]
subgraph R2["lib"]
R3["language-context.tsx"]
R4["language-detector.ts"]
subgraph R5["locales"]
R6["i18n-react.tsx"]
R7["i18n-util.ts"]
R8["i18n-util.async.ts"]
subgraph R9["en"]
RA["index.ts"]
end
subgraph RC["fa"]
RD["index.ts"]
end
RE["formatters.ts"]
RF["i18n-types.ts"]
RG["i18n-util.sync.ts"]
RH["navigator-detector.ts"]
end
RB["site-name.ts"]
RI["table-localization.ts"]
RJ["theme-provider.tsx"]
RK["use-page-title.ts"]
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
R-->Q
U-->V
V-->X
Y-->X
11-->13
11-->14
11-->15
11-->16
11-->19
16-->17
17-->18
19-->13
1A-->17
1A-->16
1C-->18
1D-->13
1E-->14
1F-->19
1L-->1N
1O-->1N
1P-->1N
1S-->1U
1Y-->20
1Y-->21
21-->20
22-->21
26-->28
29-->28
2C-->2E
2E-->2F
2G-->2E
2J-->2L
2M-->2L
2P-->2Q
2Q-->2S
2T-->2S
2X-->2Y
2Y-->30
31-->30
34-->36
37-->36
3A-->3C
3D-->3C
3H-->3J
3K-->3J
3N-->3O
3O-->3Q
3R-->3Q
3V-->3W
3W-->3Y
3Y-->3Z
3Y-->41
3Z-->40
42-->3Y
47-->48
48-->4A
4B-->4A
4F-->4H
4H-->4I
4L-->4M
4M-->4O
4P-->4O
4T-->4U
4U-->4W
4X-->4W
52-->54
52-->55
54-->55
56-->54
59-->5B
5C-->5B
5F-->5H
5F-->5I
5H-->5I
5J-->5H
5K-->5I
5N-->5P
5Q-->5P
5V-->5X
5Y-->5X
61-->63
61-->64
61-->65
61-->68
65-->66
66-->67
6D-->6F
6D-->6G
6D-->6H
6D-->6I
6J-->6G
6M-->6O
6M-->6P
6M-->6Q
6R-->6O
6U-->6W
6Z-->71
74-->76
74-->77
76-->77
78-->76
79-->77
7C-->7E
7F-->7E
7J-->7L
7M-->7L
7Q-->7S
7V-->7X
7Y-->7X
82-->84
87-->89
8A-->89
8D-->8F
8I-->8K
8I-->8L
8I-->8M
8K-->8L
8L-->8M
8P-->8R
8U-->8W
8X-->8W
90-->92
93-->92
97-->99
9A-->99
9D-->9F
9G-->9F
9J-->9L
9M-->9L
9Q-->9S
9T-->9S
9X-->9Z
9X-->A8
9X-->A2
9X-->A7
9Z-->A1
9Z-->A3
9Z-->A4
9Z-->A5
9Z-->A6
9Z-->A2
9Z-->A7
A1-->A2
A8-->A2
A9-->AA
A9-->A5
A9-->9Z
A9-->A8
A9-->A2
AB-->A2
AD-->A2
AH-->AJ
AK-->AJ
AN-->AP
AQ-->AP
AU-->AW
AX-->AW
B1-->B3
B4-->B3
B8-->BA
BD-->BF
BG-->BF
BK-->BM
BQ-->BS
BV-->BX
BY-->BX
BY-->BZ
C3-->C5
C6-->C5
CA-->CC
CD-->CC
CH-->CJ
CK-->CJ
CM-->CO
CT-->CV
CW-->CV
CZ-->D1
D4-->D6
DA-->DC
DD-->DC
DG-->DI
DG-->DJ
DG-->DK
DG-->DN
DK-->DL
DL-->DM
DN-->DI
DN-->DO
DV-->DX
DX-->DY
E1-->E3
E6-->E8
E6-->E9
EC-->EE
EH-->EJ
EN-->EP
EQ-->EP
ET-->EV
EY-->F0
F0-->F1
F2-->F1
F3-->F0
F6-->F8
F9-->F8
FC-->FE
FH-->FJ
FM-->FO
FS-->FU
G0-->G2
G0-->G3
G4-->G3
G7-->G9
GA-->G9
GE-->GG
GH-->GG
GK-->GM
GP-->GR
GP-->GS
GP-->GT
GR-->GS
GU-->GR
GY-->H0
H1-->H0
H4-->H6
H9-->HB
HC-->HB
HF-->HH
HH-->HI
HL-->HN
HN-->HO
HN-->HP
HN-->HQ
HN-->HR
HP-->HO
HP-->HQ
HS-->HT
HW-->HY
I2-->I4
I5-->I4
I8-->IA
ID-->IF
ID-->IG
ID-->IH
ID-->II
IN-->IP
IN-->IQ
IQ-->IP
IU-->IW
IW-->IX
J0-->J2
J2-->J3
J6-->J8
J6-->JA
J6-->JB
J6-->J9
J8-->J9
JE-->JG
JE-->JH
JE-->JI
JI-->JH
JJ-->JG
JM-->JO
JM-->JP
JP-->JO
JQ-->JP
JU-->JW
JU-->JX
JX-->JW
K0-->K2
K6-->K8
K9-->K8
KD-->KF
KG-->KF
KJ-->KL
KM-->KL
KP-->KR
KU-->KW
L1-->L3
L6-->L8
L6-->L9
LC-->LE
LF-->LG
LK-->LM
LP-->LR
LU-->LW
M1-->M3
M1-->M4
M8-->MA
M8-->MB
MC-->MB
MF-->MH
MF-->MS
MF-->MJ
MF-->MN
MF-->MT
MF-->MU
MF-->MV
MF-->MW
MF-->MX
MF-->MY
MF-->MK
MF-->MO
MF-->MM
MF-->MI
MF-->MZ
MF-->MP
MF-->N0
MF-->MQ
MF-->ML
MF-->N1
MF-->MR
MH-->MI
MI-->MH
MI-->MJ
MI-->MK
MI-->MM
MI-->MP
MI-->MQ
MJ-->MI
MK-->MI
MK-->ML
ML-->MK
MM-->MN
MM-->MO
MM-->MI
MO-->MN
MO-->MM
MP-->MQ
MP-->MR
MQ-->MM
MQ-->MI
MQ-->MP
MS-->MI
MS-->MR
MT-->MU
MV-->MR
MW-->MU
MW-->MR
MX-->MI
MX-->MP
MZ-->MR
N0-->MX
N5-->N7
N5-->N8
N5-->N9
N5-->NA
NB-->N7
NC-->NA
NF-->NH
NF-->NI
NF-->NJ
NF-->NK
NF-->NL
NF-->NM
NF-->NN
NF-->NO
NF-->NP
NF-->NQ
NF-->NR
NF-->NS
NF-->NT
NP-->NO
NW-->NY
NW-->O3
NW-->O6
NW-->O4
NW-->O8
NW-->OA
NW-->OB
NW-->O2
NW-->NZ
NW-->OC
NW-->OD
NW-->OF
NW-->O7
NW-->OG
NW-->O9
NW-->OE
NW-->OH
NW-->OI
NW-->O0
NW-->O5
NW-->O1
NY-->NZ
NY-->O0
NY-->O1
O1-->NY
O1-->O2
O3-->O4
O3-->O5
O6-->O7
O8-->O4
O8-->O9
O8-->O5
O9-->O4
O9-->O0
O9-->O5
OA-->O4
OA-->O5
OC-->NZ
OC-->O0
OC-->O1
OD-->O7
OD-->OE
OE-->O9
OE-->O0
OE-->O1
OF-->OD
OG-->O9
OG-->O5
OH-->OE
OH-->O1
OM-->OO
OM-->OP
OM-->OQ
OM-->OR
OM-->OS
OM-->OT
OM-->OU
OM-->OV
OM-->OW
OM-->OX
OM-->OY
OM-->OZ
OM-->P0
OM-->P1
OM-->P2
OM-->P3
OM-->P4
P5-->OO
P6-->OW
P7-->OX
PA-->P4
PE-->PG
PE-->PH
PE-->PI
PE-->PK
PE-->PL
PE-->PM
PE-->PN
PE-->PO
PE-->PP
PE-->PQ
PE-->PR
PE-->PS
PE-->PJ
PE-->PT
PE-->PU
PE-->PV
PE-->PW
PE-->PX
PE-->PY
PE-->PZ
PI-->PJ
PT-->PJ
PU-->PJ
Q0-->PG
Q0-->PO
Q0-->PX
Q0-->PZ
Q1-->PQ
Q2-->PJ
Q3-->PT
Q3-->PY
Q7-->Q9
QC-->QE
QC-->QF
QL-->QO
QV-->QX
QY-->QX
R1-->R3
R1-->R4
R1-->R6
R1-->RF
R1-->R7
R1-->R8
R1-->RG
R1-->RH
R1-->RB
R1-->RI
R1-->RJ
R1-->RK
R3-->R4
R3-->R6
R3-->R8
R6-->R7
R8-->RA
R8-->RD
R8-->RE
R8-->R7
RA-->RB
RD-->RB
RG-->RA
RG-->RD
RG-->RE
RG-->R7
RI-->R6
RJ-->R3
RK-->R6
