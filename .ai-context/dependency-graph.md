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
6M["jest.config.ts"]
6N["jest.setup.ts"]
subgraph 6O["src"]
6P["index.ts"]
subgraph 6Q["lib"]
6R["customers-cart-hook.tsx"]
6S["useCartService.ts"]
6T["useWishlistSync.ts"]
6U["useCartService.spec.tsx"]
6V["useCartSync.ts"]
end
end
end
subgraph 6W["orders"]
subgraph 6X["src"]
6Y["index.ts"]
subgraph 6Z["lib"]
70["customers-orders-hook.tsx"]
end
end
end
subgraph 71["products"]
subgraph 72["src"]
73["index.ts"]
subgraph 74["lib"]
75["customers-product-hook.tsx"]
end
end
end
end
subgraph 76["router"]
subgraph 77["src"]
78["index.ts"]
subgraph 79["lib"]
7A["CustomersRouter.tsx"]
7B["ScrollToTop.tsx"]
7C["CustomersRouter.spec.tsx"]
7D["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7E["routes"]
subgraph 7F["src"]
7G["index.ts"]
subgraph 7H["lib"]
7I["customer-routes.ts"]
7J["customer-routes.spec.ts"]
end
end
end
subgraph 7K["screens"]
subgraph 7L["contact"]
subgraph 7M["src"]
7N["index.ts"]
subgraph 7O["lib"]
7P["customer-contact.tsx"]
7Q["customer-contact.spec.tsx"]
end
end
7R["vite.config.ts"]
end
subgraph 7S["customer-checkout"]
subgraph 7T["src"]
7U["index.ts"]
subgraph 7V["lib"]
7W["customer-checkout.tsx"]
end
end
end
subgraph 7X["customer-favorites"]
subgraph 7Y["src"]
7Z["index.ts"]
subgraph 80["lib"]
81["customer-favorites.tsx"]
82["customer-favorites.spec.tsx"]
end
end
83["vite.config.ts"]
end
subgraph 84["customer-login"]
subgraph 85["src"]
86["index.ts"]
subgraph 87["lib"]
88["customer-login.tsx"]
end
end
end
subgraph 89["customer-order-confirmation"]
subgraph 8A["src"]
8B["index.ts"]
subgraph 8C["lib"]
8D["customer-order-confirmation.tsx"]
8E["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8F["customer-orders"]
subgraph 8G["src"]
8H["index.ts"]
subgraph 8I["lib"]
8J["customer-orders.tsx"]
end
end
end
subgraph 8K["customer-payment"]
subgraph 8L["src"]
8M["index.ts"]
subgraph 8N["lib"]
8O["customer-payment-callback.tsx"]
8P["use-zarinpal-payment.tsx"]
8Q["zarinpal-payment-service.ts"]
8R["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 8S["customer-products"]
subgraph 8T["src"]
8U["index.ts"]
subgraph 8V["lib"]
8W["customer-products.tsx"]
end
end
end
subgraph 8X["customer-profile"]
subgraph 8Y["src"]
8Z["index.ts"]
subgraph 90["lib"]
91["customer-profile.tsx"]
92["customer-profile.spec.tsx"]
end
end
end
subgraph 93["customer-shopping-cart"]
subgraph 94["src"]
95["index.ts"]
subgraph 96["lib"]
97["customer-shopping-cart.tsx"]
98["customer-shopping-cart.spec.tsx"]
end
end
99["vite.config.ts"]
end
subgraph 9A["customer-signup"]
subgraph 9B["src"]
9C["index.ts"]
subgraph 9D["lib"]
9E["customer-signup.tsx"]
9F["customer-signup.spec.tsx"]
end
end
end
subgraph 9G["forgot-password"]
subgraph 9H["src"]
9I["index.ts"]
subgraph 9J["lib"]
9K["customer-forgot-password.tsx"]
9L["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9M["guide-authenticity"]
subgraph 9N["src"]
9O["index.ts"]
subgraph 9P["lib"]
9Q["customer-guide-authenticity.tsx"]
9R["customer-guide-authenticity.spec.tsx"]
end
end
9S["vite.config.ts"]
end
subgraph 9T["guide-payment"]
subgraph 9U["src"]
9V["index.ts"]
subgraph 9W["lib"]
9X["customer-guide-payment.tsx"]
9Y["customer-guide-payment.spec.tsx"]
end
end
9Z["vite.config.ts"]
end
subgraph A0["home"]
subgraph A1["src"]
A2["index.ts"]
subgraph A3["lib"]
A4["CustomersHomeScreen.tsx"]
subgraph A5["components"]
A6["CategoryBentoSection.tsx"]
A8["HeroSection.tsx"]
A9["HomeLoadingScreen.tsx"]
AA["PicksRailSection.tsx"]
AB["TrustStripSection.tsx"]
AF["NewArrivalsSection.tsx"]
AG["BrandBlocksSection.tsx"]
AH["NewsletterSection.tsx"]
AI["ShopTheLookSection.tsx"]
AJ["TickerSection.tsx"]
end
A7["home-selectors.ts"]
AC["useScrollProgress.ts"]
AD["CustomersShopScreen.tsx"]
AE["CustomersHomeScreen.spec.tsx"]
end
end
end
subgraph AK["login"]
subgraph AL["src"]
AM["index.ts"]
subgraph AN["lib"]
AO["CustomersLoginScreen.tsx"]
AP["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AQ["not-found"]
subgraph AR["src"]
AS["index.ts"]
subgraph AT["lib"]
AU["customer-not-found.tsx"]
AV["customer-not-found.spec.tsx"]
end
end
AW["vite.config.ts"]
end
subgraph AX["privacy-policy"]
subgraph AY["src"]
AZ["index.ts"]
subgraph B0["lib"]
B1["customer-privacy-policy.tsx"]
B2["customer-privacy-policy.spec.tsx"]
end
end
B3["vite.config.ts"]
end
subgraph B4["product-details"]
subgraph B5["src"]
B6["index.ts"]
subgraph B7["lib"]
B8["customer-product-details.tsx"]
B9["customer-product-details.spec.tsx"]
end
end
BA["vite.config.ts"]
end
subgraph BB["reset-password"]
subgraph BC["src"]
BD["index.ts"]
subgraph BE["lib"]
BF["customer-reset-password.tsx"]
end
end
end
subgraph BG["shipping-returns"]
subgraph BH["src"]
BI["index.ts"]
subgraph BJ["lib"]
BK["customer-shipping-returns.tsx"]
BL["customer-shipping-returns.spec.tsx"]
end
end
BM["vite.config.ts"]
end
subgraph BN["unauthorized"]
subgraph BO["src"]
BP["index.ts"]
subgraph BQ["lib"]
BR["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BS["utility"]
subgraph BT["test"]
subgraph BU["src"]
BV["index.ts"]
subgraph BW["lib"]
BX["customers-test-utility.tsx"]
end
end
end
end
subgraph BY["validations"]
subgraph BZ["src"]
C0["index.ts"]
subgraph C1["lib"]
C2["shipping-validation.ts"]
C3["shipping-validation.spec.tsx"]
C4["shipping-validation.tsx"]
end
end
end
subgraph C5["zustand"]
subgraph C6["customer-cart-store"]
subgraph C7["src"]
C8["index.ts"]
subgraph C9["lib"]
CA["customer-cart-store.ts"]
CB["customer-cart-store.spec.ts"]
CC["customer-cart-store.tsx"]
end
end
end
subgraph CD["customer-checkout-store"]
subgraph CE["src"]
CF["index.ts"]
subgraph CG["lib"]
CH["customer-checkout-store.ts"]
CI["customer-checkout-store.spec.ts"]
end
end
CJ["vite.config.ts"]
end
subgraph CK["customer-wishlist-store"]
subgraph CL["src"]
CM["index.ts"]
subgraph CN["lib"]
CO["customer-wishlist-store.ts"]
CP["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CQ["src"]
CR["index.ts"]
subgraph CS["lib"]
CT["customers-products-store.tsx"]
end
end
end
end
subgraph CU["sellers"]
subgraph CV["components"]
subgraph CW["footer"]
subgraph CX["src"]
CY["index.ts"]
subgraph CZ["lib"]
D0["sellers-footer.tsx"]
D1["sellers-footer.spec.tsx"]
end
end
end
subgraph D2["headerbar"]
subgraph D3["src"]
D4["index.ts"]
subgraph D5["lib"]
D6["SellersHeaderbar.tsx"]
end
end
end
subgraph D7["layout"]
subgraph D8["src"]
D9["index.ts"]
subgraph DA["lib"]
DB["SellersLayout.tsx"]
DC["SellersTabbar.tsx"]
end
end
end
end
subgraph DD["contexts"]
subgraph DE["auth"]
subgraph DF["src"]
DG["index.ts"]
subgraph DH["lib"]
DI["SellersAuthContext.tsx"]
DJ["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DK["graphql"]
subgraph DL["src"]
DM["index.ts"]
subgraph DN["lib"]
DO["fragments.ts"]
DP["mutations.ts"]
DQ["Provider.tsx"]
DR["SellersApolloProvider.tsx"]
DS["client.ts"]
DT["queries.ts"]
DU["seller-orders.graphql.ts"]
DV["apollo-upload-client.d.ts"]
end
subgraph DW["types"]
DX["apollo-upload-client.d.ts"]
end
end
end
subgraph DY["hooks"]
subgraph DZ["auth"]
subgraph E0["src"]
E1["index.ts"]
subgraph E2["lib"]
E3["useSellerAuth.ts"]
E4["sellerAuth.graphql.ts"]
end
end
end
subgraph E5["orders"]
subgraph E6["src"]
E7["index.ts"]
subgraph E8["lib"]
E9["useSellerOrders.ts"]
end
end
end
subgraph EA["products"]
subgraph EB["src"]
EC["index.ts"]
subgraph ED["lib"]
EE["useSellersProductManagement.ts"]
EF["useSellersProducts.ts"]
end
end
end
end
subgraph EG["router"]
subgraph EH["src"]
EI["index.ts"]
subgraph EJ["lib"]
EK["SellersRouter.tsx"]
end
end
end
subgraph EL["routes"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["seller-routes.ts"]
end
end
end
subgraph EQ["screens"]
subgraph ER["catalog"]
subgraph ES["src"]
ET["index.ts"]
subgraph EU["lib"]
EV["SellersCatalogScreens.tsx"]
EW["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph EX["login"]
subgraph EY["src"]
EZ["index.ts"]
subgraph F0["lib"]
F1["SellersLogin.tsx"]
end
end
end
subgraph F2["manage-product"]
subgraph F3["src"]
F4["index.ts"]
subgraph F5["lib"]
F6["SellersManageProductScreen.tsx"]
F7["SellersDefineProductFlow.tsx"]
F8["SellersDefineProductFlow.spec.tsx"]
F9["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FA["products"]
subgraph FB["src"]
FC["index.ts"]
subgraph FD["lib"]
FE["SellersProducts.tsx"]
FF["SellersProducts.spec.tsx"]
end
end
end
subgraph FG["seller-orders"]
FH["jest.config.ts"]
FI["jest.setup.ts"]
subgraph FJ["src"]
FK["index.ts"]
subgraph FL["lib"]
FM["seller-orders-screen.tsx"]
FN["seller-orders-screen.spec.tsx"]
end
FO["test-setup.ts"]
end
end
subgraph FP["setup-password"]
subgraph FQ["src"]
FR["index.ts"]
subgraph FS["lib"]
FT["SellersSetupPassword.tsx"]
end
end
end
subgraph FU["unauthorized"]
subgraph FV["src"]
FW["index.ts"]
subgraph FX["lib"]
FY["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph FZ["zustand"]
subgraph G0["sellers-products-store"]
subgraph G1["src"]
G2["index.ts"]
subgraph G3["lib"]
G4["useSellersProductsStore.ts"]
G5["sellers-products-store.tsx"]
end
end
end
end
end
subgraph G6["shared"]
subgraph G7["components"]
subgraph G8["apollo-provider-base"]
subgraph G9["src"]
GA["index.ts"]
subgraph GB["lib"]
GC["ApolloProviderBase.tsx"]
GD["createSilentRefreshAuthLink.ts"]
GE["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GF["error-boundary"]
subgraph GG["src"]
GH["index.ts"]
subgraph GI["lib"]
GJ["error-boundary.tsx"]
GK["error-boundary.spec.tsx"]
end
end
GL["vite.config.ts"]
end
subgraph GM["glassmorphism-container"]
subgraph GN["src"]
GO["index.ts"]
subgraph GP["lib"]
GQ["glassmorphism-container.tsx"]
GR["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GS["layout"]
subgraph GT["src"]
GU["index.ts"]
subgraph GV["lib"]
GW["Layout.tsx"]
end
end
end
subgraph GX["material-data-table"]
subgraph GY["src"]
GZ["index.ts"]
subgraph H0["lib"]
H1["material-data-table.tsx"]
H2["table-config.ts"]
H3["table-utils.ts"]
H4["material-data-table.spec.tsx"]
H5["table-types.ts"]
end
end
end
subgraph H6["order-status-chip"]
subgraph H7["src"]
H8["index.ts"]
subgraph H9["lib"]
HA["order-status-chip.tsx"]
HB["order-status-chip.spec.tsx"]
end
end
end
subgraph HC["password-field"]
subgraph HD["src"]
HE["index.ts"]
subgraph HF["lib"]
HG["PasswordTextField.tsx"]
end
end
end
subgraph HH["price-display"]
subgraph HI["src"]
HJ["index.ts"]
subgraph HK["lib"]
HL["price-display.tsx"]
HM["price-display.spec.tsx"]
end
end
end
subgraph HN["private-route"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["createPrivateRoute.tsx"]
HS["PrivateRoute.tsx"]
end
end
end
subgraph HT["rtl-table-utils"]
subgraph HU["src"]
HV["index.ts"]
subgraph HW["lib"]
HX["rtl-table-utils.ts"]
HY["rtl-cell-components.tsx"]
HZ["rtl-column-helpers.ts"]
I0["rtl-table-props.ts"]
I1["use-table-alignment.ts"]
I2["rtl-table-utils.spec.tsx"]
I3["rtl-table-utils.tsx"]
end
end
end
subgraph I4["snackbar"]
subgraph I5["src"]
I6["index.ts"]
subgraph I7["lib"]
I8["snackbar.tsx"]
I9["Snackbar.tsx"]
end
end
end
subgraph IA["styled-drawer"]
subgraph IB["src"]
IC["index.ts"]
subgraph ID["lib"]
IE["styled-drawer.tsx"]
IF["styled-drawer.spec.tsx"]
end
end
end
subgraph IG["unauthorized"]
subgraph IH["src"]
II["index.ts"]
subgraph IJ["lib"]
IK["unauthorized-path.tsx"]
end
end
end
end
subgraph IL["graphql"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["currency.mutations.ts"]
IQ["currency.queries.ts"]
IR["fragments.ts"]
IS["variant-colors.ts"]
IT["client-shared-graphql.tsx"]
end
end
end
subgraph IU["hooks"]
subgraph IV["brands"]
subgraph IW["src"]
IX["index.ts"]
subgraph IY["lib"]
IZ["brands.graphql.ts"]
J0["useBrands.ts"]
end
end
J1["vite.config.ts"]
end
subgraph J2["categories"]
subgraph J3["src"]
J4["index.ts"]
subgraph J5["lib"]
J6["useCategories.ts"]
J7["categories.graphql.ts"]
end
end
end
subgraph J8["colors"]
subgraph J9["src"]
JA["index.ts"]
subgraph JB["lib"]
JC["useColors.ts"]
JD["color.graphql.ts"]
end
end
end
subgraph JE["currency"]
subgraph JF["src"]
JG["index.ts"]
subgraph JH["lib"]
JI["useConvertPrice.tsx"]
JJ["useExchangeRate.tsx"]
JK["useCurrencies.tsx"]
JL["useCurrencyForLocale.tsx"]
JM["useExchangeRate.spec.tsx"]
end
end
end
subgraph JN["products"]
subgraph JO["src"]
JP["index.ts"]
subgraph JQ["lib"]
JR["productImage.ts"]
JS["products.graphql.ts"]
JT["useProducts.ts"]
JU["productImage.spec.ts"]
end
end
end
subgraph JV["site-languages"]
subgraph JW["src"]
JX["index.ts"]
subgraph JY["lib"]
JZ["site-languages.graphql.ts"]
K0["useSiteLanguages.ts"]
K1["site-languages-hook.spec.tsx"]
end
end
K2["vite.config.ts"]
end
subgraph K3["snackbar"]
subgraph K4["src"]
K5["index.ts"]
subgraph K6["lib"]
K7["SnackbarContext.tsx"]
K8["useSnackbar.ts"]
end
end
end
subgraph K9["translations-management-hook"]
subgraph KA["src"]
KB["index.ts"]
subgraph KC["lib"]
KD["useTranslationsManagement.ts"]
end
end
end
end
subgraph KE["lottie"]
subgraph KF["empty-cart"]
subgraph KG["src"]
KH["index.ts"]
subgraph KI["lib"]
KJ["lottie-empty-cart.tsx"]
KK["lottie-empty-cart.spec.tsx"]
end
end
KL["vite.config.ts"]
end
subgraph KM["loading"]
subgraph KN["src"]
KO["index.ts"]
subgraph KP["lib"]
KQ["lottie-loading.tsx"]
KR["lottie-loading.spec.tsx"]
end
end
end
subgraph KS["success-check"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["lottie-success-check.tsx"]
KX["lottie-success-check.spec.tsx"]
end
end
end
subgraph KY["unauthorized"]
subgraph KZ["src"]
L0["index.ts"]
subgraph L1["lib"]
L2["lottie-unauthorized.tsx"]
end
end
end
end
subgraph L3["translations"]
subgraph L4["src"]
L5["index.ts"]
subgraph L6["lib"]
L7["mapApolloErrorToTranslationKey.ts"]
L8["WrapTranslation.tsx"]
end
end
end
subgraph L9["ui"]
subgraph LA["colors"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["colors.ts"]
end
end
end
subgraph LF["language-components"]
subgraph LG["src"]
LH["index.ts"]
subgraph LI["lib"]
LJ["language-components.tsx"]
LK["ltr-text-field.tsx"]
end
end
end
subgraph LL["sizes"]
subgraph LM["src"]
LN["index.ts"]
subgraph LO["lib"]
LP["sizes.ts"]
LQ["sizes.spec.tsx"]
LR["sizes.tsx"]
end
end
end
end
subgraph LS["zustand"]
subgraph LT["shared-auth-store"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["shared-auth-store.ts"]
end
end
end
subgraph LY["shared-notification-store"]
subgraph LZ["src"]
M0["index.ts"]
subgraph M1["lib"]
M2["shared-notification-store.tsx"]
end
end
end
subgraph M3["shared-ui-store"]
subgraph M4["src"]
M5["index.ts"]
subgraph M6["lib"]
M7["shared-ui-store.ts"]
M8["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph M9["server"]
subgraph MA["controllers"]
subgraph MB["src"]
MC["index.ts"]
subgraph MD["lib"]
ME["auth.controller.ts"]
MF["order.controller.ts"]
end
end
end
subgraph MG["decorators"]
MH["jest.config.ts"]
subgraph MI["src"]
MJ["index.ts"]
subgraph MK["lib"]
ML["current-user.decorator.ts"]
MM["decorators.ts"]
MN["decorators.spec.ts"]
end
end
end
subgraph MO["entities"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["brand.entity.ts"]
MT["product.entity.ts"]
MU["category.entity.ts"]
MV["product-description.entity.ts"]
MW["site-language.entity.ts"]
MX["product-info.entity.ts"]
MY["color.entity.ts"]
MZ["product-info-color.entity.ts"]
N0["seller-info.entity.ts"]
N1["seller-product.entity.ts"]
N2["user.entity.ts"]
N3["cart.entity.ts"]
N4["currency-preference.entity.ts"]
N5["currency.entity.ts"]
N6["customer.entity.ts"]
N7["exchange-rate.entity.ts"]
N8["order.entity.ts"]
N9["platform-settings.entity.ts"]
NA["refresh-token.entity.ts"]
NB["seller-order.entity.ts"]
NC["translation.entity.ts"]
end
end
end
subgraph ND["guards"]
NE["jest.config.ts"]
subgraph NF["src"]
NG["index.ts"]
subgraph NH["lib"]
NI["catalog.guard.ts"]
NJ["graphql-auth.guard.ts"]
NK["http-auth.guard.ts"]
NL["roles.guard.ts"]
NM["catalog.guard.spec.ts"]
NN["roles.guard.spec.ts"]
end
end
end
subgraph NO["inputs"]
subgraph NP["src"]
NQ["index.ts"]
subgraph NR["lib"]
NS["brand.input.ts"]
NT["cart.inputs.ts"]
NU["category.input.ts"]
NV["color.input.ts"]
NW["customer-auth.inputs.ts"]
NX["order-pagination.inputs.ts"]
NY["order.inputs.ts"]
NZ["product-info-filter.input.ts"]
O0["product.input.ts"]
O1["seller-order-pagination.inputs.ts"]
O2["seller.input.ts"]
O3["site-language.input.ts"]
O4["user.input.ts"]
end
end
end
subgraph O5["modules"]
subgraph O6["src"]
O7["index.ts"]
subgraph O8["lib"]
O9["auth.module.ts"]
OA["email.module.ts"]
OB["token.module.ts"]
OC["user.module.ts"]
OD["customer-profile.module.ts"]
OE["brand.module.ts"]
OF["catalog-guard.module.ts"]
OG["translation.module.ts"]
OH["cart.module.ts"]
OI["platform-settings.module.ts"]
OJ["category.module.ts"]
OK["product.module.ts"]
OL["color.module.ts"]
OM["currency.module.ts"]
ON["graphql-context.module.ts"]
OO["order.module.ts"]
OP["seller-info.module.ts"]
OQ["payment.module.ts"]
OR["product-info.module.ts"]
OS["seller-products.module.ts"]
OT["site-language.module.ts"]
end
end
end
subgraph OU["resolvers"]
OV["jest.config.ts"]
subgraph OW["src"]
OX["index.ts"]
subgraph OY["lib"]
OZ["auth.resolver.ts"]
P0["brand.resolver.ts"]
P1["cart.resolver.ts"]
P2["category.resolver.ts"]
P3["color.resolver.ts"]
P4["currency.resolver.ts"]
P5["customer-profile.resolver.ts"]
P6["order.resolver.ts"]
P7["payment.resolver.ts"]
P8["product-info.resolver.ts"]
P9["product.resolver.ts"]
PA["seller-info.resolver.ts"]
PB["shipping.resolver.ts"]
PC["site-language.resolver.ts"]
PD["translation.input.ts"]
PE["translation.resolver.ts"]
PF["user.resolver.ts"]
PG["auth.resolver.spec.ts"]
PH["order.resolver.spec.ts"]
PI["payment.resolver.integration.spec.ts"]
PJ["payment.resolver.spec.ts"]
PK["product-info.resolver.spec.ts"]
subgraph PL["types"]
PM["graphql-upload.d.ts"]
end
PN["user.resolver.spec.ts"]
end
end
end
subgraph PO["services"]
PP["jest.config.ts"]
subgraph PQ["src"]
PR["index.ts"]
subgraph PS["lib"]
PT["auth.service.ts"]
PU["brand.service.ts"]
PV["cart.service.ts"]
PW["product-info-colors.util.ts"]
PX["category.service.ts"]
PY["color.service.ts"]
PZ["currency.service.ts"]
Q0["customer-profile.service.ts"]
Q1["email.service.ts"]
Q2["image-upload.service.ts"]
Q3["order.service.ts"]
Q4["payment-logger.service.ts"]
Q5["payment.service.ts"]
Q6["product.service.ts"]
Q7["seller-info.service.ts"]
Q8["shipping-calculation.service.ts"]
Q9["site-language.service.ts"]
QA["token.service.ts"]
QB["translation.service.ts"]
QC["user.service.ts"]
QD["auth.service.spec.ts"]
QE["cart.service.spec.ts"]
QF["order.service.spec.ts"]
QG["product-info-colors.util.spec.ts"]
QH["product.service.spec.ts"]
QI["relay-connection.spec.ts"]
QJ["shipping-calculation.service.spec.ts"]
QK["token.service.spec.ts"]
end
end
end
subgraph QL["strategies"]
subgraph QM["src"]
QN["index.ts"]
subgraph QO["lib"]
QP["local.strategy.ts"]
end
end
end
subgraph QQ["utils"]
subgraph QR["src"]
QS["index.ts"]
subgraph QT["lib"]
QU["email-templates.ts"]
QV["relay-connection.ts"]
QW["pagination.ts"]
end
end
end
end
subgraph QX["shared"]
subgraph QY["codegen"]
QZ["jest.config.ts"]
subgraph R0["src"]
R1["index.ts"]
subgraph R2["lib"]
subgraph R3["generated"]
R4["graphql.ts"]
end
end
end
end
subgraph R5["graphql-schema"]
R6["jest.config.ts"]
subgraph R7["src"]
R8["index.ts"]
end
end
subgraph R9["product-sizes"]
subgraph RA["src"]
RB["index.ts"]
subgraph RC["lib"]
RD["product-sizes.ts"]
RE["product-sizes.pants-formats.spec.ts"]
RF["product-sizes.pants-label.spec.ts"]
RG["product-sizes.pants-strict.spec.ts"]
RH["product-sizes.spec.ts"]
end
end
end
subgraph RI["shared-i18n"]
subgraph RJ["src"]
RK["index.ts"]
subgraph RL["lib"]
RM["language-context.tsx"]
RN["language-detector.ts"]
subgraph RO["locales"]
RP["i18n-react.tsx"]
RQ["i18n-util.ts"]
RR["i18n-util.async.ts"]
subgraph RS["en"]
RT["index.ts"]
end
subgraph RV["fa"]
RW["index.ts"]
end
RX["formatters.ts"]
RY["i18n-types.ts"]
RZ["i18n-util.sync.ts"]
S0["navigator-detector.ts"]
end
RU["site-name.ts"]
S1["table-localization.ts"]
S2["theme-provider.tsx"]
S3["use-page-title.ts"]
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
6P-->6R
6P-->6S
6P-->6T
6U-->6S
6V-->6R
6Y-->70
73-->75
78-->7A
78-->7B
7A-->7B
7C-->7A
7D-->7B
7G-->7I
7J-->7I
7N-->7P
7Q-->7P
7U-->7W
7Z-->81
82-->81
86-->88
8B-->8D
8E-->8D
8H-->8J
8M-->8O
8M-->8P
8M-->8Q
8O-->8P
8P-->8Q
8R-->8O
8U-->8W
8Z-->91
92-->91
95-->97
98-->97
9C-->9E
9F-->9E
9I-->9K
9L-->9K
9O-->9Q
9R-->9Q
9V-->9X
9Y-->9X
A2-->A4
A2-->AD
A2-->A7
A2-->AC
A4-->A6
A4-->A8
A4-->A9
A4-->AA
A4-->AB
A4-->A7
A4-->AC
A6-->A7
AD-->A7
AE-->AF
AE-->AA
AE-->A4
AE-->AD
AE-->A7
AG-->A7
AI-->A7
AM-->AO
AP-->AO
AS-->AU
AV-->AU
AZ-->B1
B2-->B1
B6-->B8
B9-->B8
BD-->BF
BI-->BK
BL-->BK
BP-->BR
BV-->BX
C0-->C2
C3-->C2
C3-->C4
C8-->CA
CB-->CA
CF-->CH
CI-->CH
CM-->CO
CP-->CO
CR-->CT
CY-->D0
D1-->D0
D4-->D6
D9-->DB
D9-->DC
DB-->DC
DG-->DI
DJ-->DI
DM-->DO
DM-->DP
DM-->DQ
DM-->DT
DQ-->DR
DR-->DS
DT-->DO
DT-->DU
E1-->E3
E3-->E4
E7-->E9
EC-->EE
EC-->EF
EI-->EK
EN-->EP
ET-->EV
EW-->EV
EZ-->F1
F4-->F6
F6-->F7
F8-->F7
F9-->F6
FC-->FE
FF-->FE
FK-->FM
FN-->FM
FR-->FT
FW-->FY
G2-->G4
GA-->GC
GA-->GD
GE-->GD
GH-->GJ
GK-->GJ
GO-->GQ
GR-->GQ
GU-->GW
GZ-->H1
GZ-->H2
GZ-->H3
H1-->H2
H4-->H1
H8-->HA
HB-->HA
HE-->HG
HJ-->HL
HM-->HL
HP-->HR
HR-->HS
HV-->HX
HX-->HY
HX-->HZ
HX-->I0
HX-->I1
HZ-->HY
HZ-->I0
I2-->I3
I6-->I8
IC-->IE
IF-->IE
II-->IK
IN-->IP
IN-->IQ
IN-->IR
IN-->IS
IX-->IZ
IX-->J0
J0-->IZ
J4-->J6
J6-->J7
JA-->JC
JC-->JD
JG-->JI
JG-->JK
JG-->JL
JG-->JJ
JI-->JJ
JM-->JJ
JP-->JR
JP-->JS
JP-->JT
JT-->JS
JU-->JR
JX-->JZ
JX-->K0
K0-->JZ
K1-->K0
K5-->K7
K5-->K8
K8-->K7
KB-->KD
KH-->KJ
KK-->KJ
KO-->KQ
KR-->KQ
KU-->KW
KX-->KW
L0-->L2
L5-->L7
LC-->LE
LH-->LJ
LH-->LK
LN-->LP
LQ-->LR
LV-->LX
M0-->M2
M5-->M7
MC-->ME
MC-->MF
MJ-->ML
MJ-->MM
MN-->MM
MQ-->MS
MQ-->N3
MQ-->MU
MQ-->MY
MQ-->N4
MQ-->N5
MQ-->N6
MQ-->N7
MQ-->N8
MQ-->N9
MQ-->MV
MQ-->MZ
MQ-->MX
MQ-->MT
MQ-->NA
MQ-->N0
MQ-->NB
MQ-->N1
MQ-->MW
MQ-->NC
MQ-->N2
MS-->MT
MT-->MS
MT-->MU
MT-->MV
MT-->MX
MT-->N0
MT-->N1
MU-->MT
MV-->MT
MV-->MW
MW-->MV
MX-->MY
MX-->MZ
MX-->MT
MZ-->MY
MZ-->MX
N0-->N1
N0-->N2
N1-->MX
N1-->MT
N1-->N0
N3-->MT
N3-->N2
N4-->N5
N6-->N2
N7-->N5
N7-->N2
N8-->MT
N8-->N0
NA-->N2
NB-->N8
NG-->NI
NG-->NJ
NG-->NK
NG-->NL
NM-->NI
NN-->NL
NQ-->NS
NQ-->NT
NQ-->NU
NQ-->NV
NQ-->NW
NQ-->NX
NQ-->NY
NQ-->NZ
NQ-->O0
NQ-->O1
NQ-->O2
NQ-->O3
NQ-->O4
O0-->NZ
O7-->O9
O7-->OE
O7-->OH
O7-->OF
O7-->OJ
O7-->OL
O7-->OM
O7-->OD
O7-->OA
O7-->ON
O7-->OO
O7-->OQ
O7-->OI
O7-->OR
O7-->OK
O7-->OP
O7-->OS
O7-->OT
O7-->OB
O7-->OG
O7-->OC
O9-->OA
O9-->OB
O9-->OC
OC-->O9
OC-->OD
OE-->OF
OE-->OG
OH-->OI
OJ-->OF
OJ-->OK
OJ-->OG
OK-->OF
OK-->OB
OK-->OG
OL-->OF
OL-->OG
ON-->OA
ON-->OB
ON-->OC
OO-->OI
OO-->OP
OP-->OK
OP-->OB
OP-->OC
OQ-->OO
OR-->OK
OR-->OG
OS-->OP
OS-->OC
OX-->OZ
OX-->P0
OX-->P1
OX-->P2
OX-->P3
OX-->P4
OX-->P5
OX-->P6
OX-->P7
OX-->P8
OX-->P9
OX-->PA
OX-->PB
OX-->PC
OX-->PD
OX-->PE
OX-->PF
PG-->OZ
PH-->P6
PI-->P7
PJ-->P7
PK-->P8
PN-->PF
PR-->PT
PR-->PU
PR-->PV
PR-->PX
PR-->PY
PR-->PZ
PR-->Q0
PR-->Q1
PR-->Q2
PR-->Q3
PR-->Q4
PR-->Q5
PR-->PW
PR-->Q6
PR-->Q7
PR-->Q8
PR-->Q9
PR-->QA
PR-->QB
PR-->QC
PV-->PW
Q6-->PW
Q7-->PW
QD-->PT
QD-->Q1
QD-->QA
QD-->QC
QE-->PV
QF-->Q3
QG-->PW
QH-->Q6
QH-->QB
QJ-->Q8
QK-->QA
QN-->QP
QS-->QU
QS-->QV
R1-->R4
RB-->RD
RE-->RD
RF-->RD
RG-->RD
RH-->RD
RK-->RM
RK-->RN
RK-->RP
RK-->RY
RK-->RQ
RK-->RR
RK-->RZ
RK-->S0
RK-->RU
RK-->S1
RK-->S2
RK-->S3
RM-->RN
RM-->RP
RM-->RR
RP-->RQ
RR-->RT
RR-->RW
RR-->RX
RR-->RQ
RT-->RU
RW-->RU
RZ-->RT
RZ-->RW
RZ-->RX
RZ-->RQ
S1-->RP
S2-->RM
S3-->RP
