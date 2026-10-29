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
8G["customer-order-confirmation.pants-size.spec.tsx"]
8H["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8I["customer-orders"]
subgraph 8J["src"]
8K["index.ts"]
subgraph 8L["lib"]
8M["customer-orders.tsx"]
end
end
end
subgraph 8N["customer-payment"]
subgraph 8O["src"]
8P["index.ts"]
subgraph 8Q["lib"]
8R["customer-payment-callback.tsx"]
8S["use-zarinpal-payment.tsx"]
8T["zarinpal-payment-service.ts"]
8U["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 8V["customer-products"]
subgraph 8W["src"]
8X["index.ts"]
subgraph 8Y["lib"]
8Z["customer-products.tsx"]
end
end
end
subgraph 90["customer-profile"]
subgraph 91["src"]
92["index.ts"]
subgraph 93["lib"]
94["customer-profile.tsx"]
95["customer-profile.spec.tsx"]
end
end
end
subgraph 96["customer-shopping-cart"]
subgraph 97["src"]
98["index.ts"]
subgraph 99["lib"]
9A["customer-shopping-cart.tsx"]
9B["customer-shopping-cart.pants-size.spec.tsx"]
9C["customer-shopping-cart.spec.tsx"]
end
end
9D["vite.config.ts"]
end
subgraph 9E["customer-signup"]
subgraph 9F["src"]
9G["index.ts"]
subgraph 9H["lib"]
9I["customer-signup.tsx"]
9J["customer-signup.spec.tsx"]
end
end
end
subgraph 9K["forgot-password"]
subgraph 9L["src"]
9M["index.ts"]
subgraph 9N["lib"]
9O["customer-forgot-password.tsx"]
9P["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9Q["guide-authenticity"]
subgraph 9R["src"]
9S["index.ts"]
subgraph 9T["lib"]
9U["customer-guide-authenticity.tsx"]
9V["customer-guide-authenticity.spec.tsx"]
end
end
9W["vite.config.ts"]
end
subgraph 9X["guide-payment"]
subgraph 9Y["src"]
9Z["index.ts"]
subgraph A0["lib"]
A1["customer-guide-payment.tsx"]
A2["customer-guide-payment.spec.tsx"]
end
end
A3["vite.config.ts"]
end
subgraph A4["home"]
subgraph A5["src"]
A6["index.ts"]
subgraph A7["lib"]
A8["CustomersHomeScreen.tsx"]
subgraph A9["components"]
AA["CategoryBentoSection.tsx"]
AC["HeroSection.tsx"]
AD["HomeLoadingScreen.tsx"]
AE["PicksRailSection.tsx"]
AF["TrustStripSection.tsx"]
AJ["NewArrivalsSection.tsx"]
AK["BrandBlocksSection.tsx"]
AL["NewsletterSection.tsx"]
AM["ShopTheLookSection.tsx"]
AN["TickerSection.tsx"]
end
AB["home-selectors.ts"]
AG["useScrollProgress.ts"]
AH["CustomersShopScreen.tsx"]
AI["CustomersHomeScreen.spec.tsx"]
end
end
end
subgraph AO["login"]
subgraph AP["src"]
AQ["index.ts"]
subgraph AR["lib"]
AS["CustomersLoginScreen.tsx"]
AT["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AU["not-found"]
subgraph AV["src"]
AW["index.ts"]
subgraph AX["lib"]
AY["customer-not-found.tsx"]
AZ["customer-not-found.spec.tsx"]
end
end
B0["vite.config.ts"]
end
subgraph B1["privacy-policy"]
subgraph B2["src"]
B3["index.ts"]
subgraph B4["lib"]
B5["customer-privacy-policy.tsx"]
B6["customer-privacy-policy.spec.tsx"]
end
end
B7["vite.config.ts"]
end
subgraph B8["product-details"]
subgraph B9["src"]
BA["index.ts"]
subgraph BB["lib"]
BC["customer-product-details.tsx"]
BD["customer-product-details.pants-size.spec.tsx"]
BE["customer-product-details.spec.tsx"]
end
end
BF["vite.config.ts"]
end
subgraph BG["reset-password"]
subgraph BH["src"]
BI["index.ts"]
subgraph BJ["lib"]
BK["customer-reset-password.tsx"]
end
end
end
subgraph BL["shipping-returns"]
subgraph BM["src"]
BN["index.ts"]
subgraph BO["lib"]
BP["customer-shipping-returns.tsx"]
BQ["customer-shipping-returns.spec.tsx"]
end
end
BR["vite.config.ts"]
end
subgraph BS["unauthorized"]
subgraph BT["src"]
BU["index.ts"]
subgraph BV["lib"]
BW["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BX["utility"]
subgraph BY["test"]
subgraph BZ["src"]
C0["index.ts"]
subgraph C1["lib"]
C2["customers-test-utility.tsx"]
end
end
end
end
subgraph C3["validations"]
subgraph C4["src"]
C5["index.ts"]
subgraph C6["lib"]
C7["shipping-validation.ts"]
C8["shipping-validation.spec.tsx"]
C9["shipping-validation.tsx"]
end
end
end
subgraph CA["zustand"]
subgraph CB["customer-cart-store"]
subgraph CC["src"]
CD["index.ts"]
subgraph CE["lib"]
CF["customer-cart-store.ts"]
CG["customer-cart-store.spec.ts"]
CH["customer-cart-store.tsx"]
end
end
end
subgraph CI["customer-checkout-store"]
subgraph CJ["src"]
CK["index.ts"]
subgraph CL["lib"]
CM["customer-checkout-store.ts"]
CN["customer-checkout-store.spec.ts"]
end
end
CO["vite.config.ts"]
end
subgraph CP["customer-wishlist-store"]
subgraph CQ["src"]
CR["index.ts"]
subgraph CS["lib"]
CT["customer-wishlist-store.ts"]
CU["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CV["src"]
CW["index.ts"]
subgraph CX["lib"]
CY["customers-products-store.tsx"]
end
end
end
end
subgraph CZ["sellers"]
subgraph D0["components"]
subgraph D1["footer"]
subgraph D2["src"]
D3["index.ts"]
subgraph D4["lib"]
D5["sellers-footer.tsx"]
D6["sellers-footer.spec.tsx"]
end
end
end
subgraph D7["headerbar"]
subgraph D8["src"]
D9["index.ts"]
subgraph DA["lib"]
DB["SellersHeaderbar.tsx"]
end
end
end
subgraph DC["layout"]
subgraph DD["src"]
DE["index.ts"]
subgraph DF["lib"]
DG["SellersLayout.tsx"]
DH["SellersTabbar.tsx"]
end
end
end
end
subgraph DI["contexts"]
subgraph DJ["auth"]
subgraph DK["src"]
DL["index.ts"]
subgraph DM["lib"]
DN["SellersAuthContext.tsx"]
DO["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DP["graphql"]
subgraph DQ["src"]
DR["index.ts"]
subgraph DS["lib"]
DT["fragments.ts"]
DU["mutations.ts"]
DV["Provider.tsx"]
DW["SellersApolloProvider.tsx"]
DX["client.ts"]
DY["queries.ts"]
DZ["seller-orders.graphql.ts"]
E0["apollo-upload-client.d.ts"]
end
subgraph E1["types"]
E2["apollo-upload-client.d.ts"]
end
end
end
subgraph E3["hooks"]
subgraph E4["auth"]
subgraph E5["src"]
E6["index.ts"]
subgraph E7["lib"]
E8["useSellerAuth.ts"]
E9["sellerAuth.graphql.ts"]
end
end
end
subgraph EA["orders"]
subgraph EB["src"]
EC["index.ts"]
subgraph ED["lib"]
EE["useSellerOrders.ts"]
end
end
end
subgraph EF["products"]
subgraph EG["src"]
EH["index.ts"]
subgraph EI["lib"]
EJ["useSellersProductManagement.ts"]
EK["useSellersProducts.ts"]
end
end
end
end
subgraph EL["router"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["SellersRouter.tsx"]
end
end
end
subgraph EQ["routes"]
subgraph ER["src"]
ES["index.ts"]
subgraph ET["lib"]
EU["seller-routes.ts"]
end
end
end
subgraph EV["screens"]
subgraph EW["catalog"]
subgraph EX["src"]
EY["index.ts"]
subgraph EZ["lib"]
F0["SellersCatalogScreens.tsx"]
F1["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F2["login"]
subgraph F3["src"]
F4["index.ts"]
subgraph F5["lib"]
F6["SellersLogin.tsx"]
end
end
end
subgraph F7["manage-product"]
subgraph F8["src"]
F9["index.ts"]
subgraph FA["lib"]
FB["SellersManageProductScreen.tsx"]
FC["SellersDefineProductFlow.tsx"]
FD["SellersDefineProductFlow.pants-label.spec.tsx"]
FE["SellersDefineProductFlow.spec.tsx"]
FF["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FG["products"]
subgraph FH["src"]
FI["index.ts"]
subgraph FJ["lib"]
FK["SellersProducts.tsx"]
FL["SellersProducts.pants-label.spec.tsx"]
FM["SellersProducts.spec.tsx"]
end
end
end
subgraph FN["seller-orders"]
FO["jest.config.ts"]
FP["jest.setup.ts"]
subgraph FQ["src"]
FR["index.ts"]
subgraph FS["lib"]
FT["seller-orders-screen.tsx"]
FU["seller-orders-screen.spec.tsx"]
end
FV["test-setup.ts"]
end
end
subgraph FW["setup-password"]
subgraph FX["src"]
FY["index.ts"]
subgraph FZ["lib"]
G0["SellersSetupPassword.tsx"]
end
end
end
subgraph G1["unauthorized"]
subgraph G2["src"]
G3["index.ts"]
subgraph G4["lib"]
G5["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G6["zustand"]
subgraph G7["sellers-products-store"]
subgraph G8["src"]
G9["index.ts"]
subgraph GA["lib"]
GB["useSellersProductsStore.ts"]
GC["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GD["shared"]
subgraph GE["components"]
subgraph GF["apollo-provider-base"]
subgraph GG["src"]
GH["index.ts"]
subgraph GI["lib"]
GJ["ApolloProviderBase.tsx"]
GK["createSilentRefreshAuthLink.ts"]
GL["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GM["error-boundary"]
subgraph GN["src"]
GO["index.ts"]
subgraph GP["lib"]
GQ["error-boundary.tsx"]
GR["error-boundary.spec.tsx"]
end
end
GS["vite.config.ts"]
end
subgraph GT["glassmorphism-container"]
subgraph GU["src"]
GV["index.ts"]
subgraph GW["lib"]
GX["glassmorphism-container.tsx"]
GY["glassmorphism-container.spec.tsx"]
end
end
end
subgraph GZ["layout"]
subgraph H0["src"]
H1["index.ts"]
subgraph H2["lib"]
H3["Layout.tsx"]
end
end
end
subgraph H4["material-data-table"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["material-data-table.tsx"]
H9["table-config.ts"]
HA["table-utils.ts"]
HB["material-data-table.spec.tsx"]
HC["table-types.ts"]
end
end
end
subgraph HD["order-status-chip"]
subgraph HE["src"]
HF["index.ts"]
subgraph HG["lib"]
HH["order-status-chip.tsx"]
HI["order-status-chip.spec.tsx"]
end
end
end
subgraph HJ["password-field"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["PasswordTextField.tsx"]
end
end
end
subgraph HO["price-display"]
subgraph HP["src"]
HQ["index.ts"]
subgraph HR["lib"]
HS["price-display.tsx"]
HT["price-display.spec.tsx"]
end
end
end
subgraph HU["private-route"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["createPrivateRoute.tsx"]
HZ["PrivateRoute.tsx"]
end
end
end
subgraph I0["rtl-table-utils"]
subgraph I1["src"]
I2["index.ts"]
subgraph I3["lib"]
I4["rtl-table-utils.ts"]
I5["rtl-cell-components.tsx"]
I6["rtl-column-helpers.ts"]
I7["rtl-table-props.ts"]
I8["use-table-alignment.ts"]
I9["rtl-table-utils.spec.tsx"]
IA["rtl-table-utils.tsx"]
end
end
end
subgraph IB["snackbar"]
subgraph IC["src"]
ID["index.ts"]
subgraph IE["lib"]
IF["snackbar.tsx"]
IG["Snackbar.tsx"]
end
end
end
subgraph IH["styled-drawer"]
subgraph II["src"]
IJ["index.ts"]
subgraph IK["lib"]
IL["styled-drawer.tsx"]
IM["styled-drawer.spec.tsx"]
end
end
end
subgraph IN["unauthorized"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["unauthorized-path.tsx"]
end
end
end
end
subgraph IS["graphql"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["currency.mutations.ts"]
IX["currency.queries.ts"]
IY["fragments.ts"]
IZ["variant-colors.ts"]
J0["client-shared-graphql.tsx"]
end
end
end
subgraph J1["hooks"]
subgraph J2["brands"]
subgraph J3["src"]
J4["index.ts"]
subgraph J5["lib"]
J6["brands.graphql.ts"]
J7["useBrands.ts"]
end
end
J8["vite.config.ts"]
end
subgraph J9["categories"]
subgraph JA["src"]
JB["index.ts"]
subgraph JC["lib"]
JD["useCategories.ts"]
JE["categories.graphql.ts"]
end
end
end
subgraph JF["colors"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["useColors.ts"]
JK["color.graphql.ts"]
end
end
end
subgraph JL["currency"]
subgraph JM["src"]
JN["index.ts"]
subgraph JO["lib"]
JP["useConvertPrice.tsx"]
JQ["useExchangeRate.tsx"]
JR["useCurrencies.tsx"]
JS["useCurrencyForLocale.tsx"]
JT["useExchangeRate.spec.tsx"]
end
end
end
subgraph JU["products"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["productImage.ts"]
JZ["products.graphql.ts"]
K0["useProducts.ts"]
K1["productImage.spec.ts"]
end
end
end
subgraph K2["site-languages"]
subgraph K3["src"]
K4["index.ts"]
subgraph K5["lib"]
K6["site-languages.graphql.ts"]
K7["useSiteLanguages.ts"]
K8["site-languages-hook.spec.tsx"]
end
end
K9["vite.config.ts"]
end
subgraph KA["snackbar"]
subgraph KB["src"]
KC["index.ts"]
subgraph KD["lib"]
KE["SnackbarContext.tsx"]
KF["useSnackbar.ts"]
end
end
end
subgraph KG["translations-management-hook"]
subgraph KH["src"]
KI["index.ts"]
subgraph KJ["lib"]
KK["useTranslationsManagement.ts"]
end
end
end
end
subgraph KL["lottie"]
subgraph KM["empty-cart"]
subgraph KN["src"]
KO["index.ts"]
subgraph KP["lib"]
KQ["lottie-empty-cart.tsx"]
KR["lottie-empty-cart.spec.tsx"]
end
end
KS["vite.config.ts"]
end
subgraph KT["loading"]
subgraph KU["src"]
KV["index.ts"]
subgraph KW["lib"]
KX["lottie-loading.tsx"]
KY["lottie-loading.spec.tsx"]
end
end
end
subgraph KZ["success-check"]
subgraph L0["src"]
L1["index.ts"]
subgraph L2["lib"]
L3["lottie-success-check.tsx"]
L4["lottie-success-check.spec.tsx"]
end
end
end
subgraph L5["unauthorized"]
subgraph L6["src"]
L7["index.ts"]
subgraph L8["lib"]
L9["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LA["translations"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["mapApolloErrorToTranslationKey.ts"]
LF["WrapTranslation.tsx"]
end
end
end
subgraph LG["ui"]
subgraph LH["colors"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["colors.ts"]
end
end
end
subgraph LM["language-components"]
subgraph LN["src"]
LO["index.ts"]
subgraph LP["lib"]
LQ["language-components.tsx"]
LR["ltr-text-field.tsx"]
end
end
end
subgraph LS["sizes"]
subgraph LT["src"]
LU["index.ts"]
subgraph LV["lib"]
LW["sizes.ts"]
LX["sizes.spec.tsx"]
LY["sizes.tsx"]
end
end
end
end
subgraph LZ["zustand"]
subgraph M0["shared-auth-store"]
subgraph M1["src"]
M2["index.ts"]
subgraph M3["lib"]
M4["shared-auth-store.ts"]
end
end
end
subgraph M5["shared-notification-store"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["shared-notification-store.tsx"]
end
end
end
subgraph MA["shared-ui-store"]
subgraph MB["src"]
MC["index.ts"]
subgraph MD["lib"]
ME["shared-ui-store.ts"]
MF["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MG["server"]
subgraph MH["controllers"]
subgraph MI["src"]
MJ["index.ts"]
subgraph MK["lib"]
ML["auth.controller.ts"]
MM["order.controller.ts"]
end
end
end
subgraph MN["decorators"]
MO["jest.config.ts"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["current-user.decorator.ts"]
MT["decorators.ts"]
MU["decorators.spec.ts"]
end
end
end
subgraph MV["entities"]
subgraph MW["src"]
MX["index.ts"]
subgraph MY["lib"]
MZ["brand.entity.ts"]
N0["product.entity.ts"]
N1["category.entity.ts"]
N2["product-description.entity.ts"]
N3["site-language.entity.ts"]
N4["product-info.entity.ts"]
N5["color.entity.ts"]
N6["product-info-color.entity.ts"]
N7["seller-info.entity.ts"]
N8["seller-product.entity.ts"]
N9["user.entity.ts"]
NA["cart.entity.ts"]
NB["currency-preference.entity.ts"]
NC["currency.entity.ts"]
ND["customer.entity.ts"]
NE["exchange-rate.entity.ts"]
NF["order.entity.ts"]
NG["platform-settings.entity.ts"]
NH["refresh-token.entity.ts"]
NI["seller-order.entity.ts"]
NJ["translation.entity.ts"]
end
end
end
subgraph NK["guards"]
NL["jest.config.ts"]
subgraph NM["src"]
NN["index.ts"]
subgraph NO["lib"]
NP["catalog.guard.ts"]
NQ["graphql-auth.guard.ts"]
NR["http-auth.guard.ts"]
NS["roles.guard.ts"]
NT["catalog.guard.spec.ts"]
NU["roles.guard.spec.ts"]
end
end
end
subgraph NV["inputs"]
subgraph NW["src"]
NX["index.ts"]
subgraph NY["lib"]
NZ["brand.input.ts"]
O0["cart.inputs.ts"]
O1["category.input.ts"]
O2["color.input.ts"]
O3["customer-auth.inputs.ts"]
O4["order-pagination.inputs.ts"]
O5["order.inputs.ts"]
O6["product-info-filter.input.ts"]
O7["product.input.ts"]
O8["seller-order-pagination.inputs.ts"]
O9["seller.input.ts"]
OA["site-language.input.ts"]
OB["user.input.ts"]
end
end
end
subgraph OC["modules"]
subgraph OD["src"]
OE["index.ts"]
subgraph OF["lib"]
OG["auth.module.ts"]
OH["email.module.ts"]
OI["token.module.ts"]
OJ["user.module.ts"]
OK["customer-profile.module.ts"]
OL["brand.module.ts"]
OM["catalog-guard.module.ts"]
ON["translation.module.ts"]
OO["cart.module.ts"]
OP["platform-settings.module.ts"]
OQ["category.module.ts"]
OR["product.module.ts"]
OS["color.module.ts"]
OT["currency.module.ts"]
OU["graphql-context.module.ts"]
OV["order.module.ts"]
OW["seller-info.module.ts"]
OX["payment.module.ts"]
OY["product-info.module.ts"]
OZ["seller-products.module.ts"]
P0["site-language.module.ts"]
end
end
end
subgraph P1["resolvers"]
P2["jest.config.ts"]
subgraph P3["src"]
P4["index.ts"]
subgraph P5["lib"]
P6["auth.resolver.ts"]
P7["brand.resolver.ts"]
P8["cart.resolver.ts"]
P9["category.resolver.ts"]
PA["color.resolver.ts"]
PB["currency.resolver.ts"]
PC["customer-profile.resolver.ts"]
PD["order.resolver.ts"]
PE["payment.resolver.ts"]
PF["product-info.resolver.ts"]
PG["product.resolver.ts"]
PH["seller-info.resolver.ts"]
PI["shipping.resolver.ts"]
PJ["site-language.resolver.ts"]
PK["translation.input.ts"]
PL["translation.resolver.ts"]
PM["user.resolver.ts"]
PN["auth.resolver.spec.ts"]
PO["order.resolver.spec.ts"]
PP["payment.resolver.integration.spec.ts"]
PQ["payment.resolver.spec.ts"]
PR["product-info.resolver.spec.ts"]
subgraph PS["types"]
PT["graphql-upload.d.ts"]
end
PU["user.resolver.spec.ts"]
end
end
end
subgraph PV["services"]
PW["jest.config.ts"]
subgraph PX["src"]
PY["index.ts"]
subgraph PZ["lib"]
Q0["auth.service.ts"]
Q1["brand.service.ts"]
Q2["cart.service.ts"]
Q3["product-info-colors.util.ts"]
Q4["category.service.ts"]
Q5["color.service.ts"]
Q6["currency.service.ts"]
Q7["customer-profile.service.ts"]
Q8["email.service.ts"]
Q9["image-upload.service.ts"]
QA["order.service.ts"]
QB["payment-logger.service.ts"]
QC["payment.service.ts"]
QD["product.service.ts"]
QE["seller-info.service.ts"]
QF["shipping-calculation.service.ts"]
QG["site-language.service.ts"]
QH["token.service.ts"]
QI["translation.service.ts"]
QJ["user.service.ts"]
QK["auth.service.spec.ts"]
QL["cart.service.spec.ts"]
QM["order.service.spec.ts"]
QN["product-info-colors.util.spec.ts"]
QO["product.service.pants.spec.ts"]
QP["product.service.spec.ts"]
QQ["relay-connection.spec.ts"]
QR["shipping-calculation.service.spec.ts"]
QS["token.service.spec.ts"]
end
end
end
subgraph QT["strategies"]
subgraph QU["src"]
QV["index.ts"]
subgraph QW["lib"]
QX["local.strategy.ts"]
end
end
end
subgraph QY["utils"]
subgraph QZ["src"]
R0["index.ts"]
subgraph R1["lib"]
R2["email-templates.ts"]
R3["relay-connection.ts"]
R4["pagination.ts"]
end
end
end
end
subgraph R5["shared"]
subgraph R6["codegen"]
R7["jest.config.ts"]
subgraph R8["src"]
R9["index.ts"]
subgraph RA["lib"]
subgraph RB["generated"]
RC["graphql.ts"]
end
end
end
end
subgraph RD["graphql-schema"]
RE["jest.config.ts"]
subgraph RF["src"]
RG["index.ts"]
end
end
subgraph RH["product-sizes"]
subgraph RI["src"]
RJ["index.ts"]
subgraph RK["lib"]
RL["product-sizes.ts"]
RM["product-sizes.pants-formats.spec.ts"]
RN["product-sizes.pants-label.spec.ts"]
RO["product-sizes.pants-strict.spec.ts"]
RP["product-sizes.spec.ts"]
end
end
end
subgraph RQ["shared-i18n"]
subgraph RR["src"]
RS["index.ts"]
subgraph RT["lib"]
RU["language-context.tsx"]
RV["language-detector.ts"]
subgraph RW["locales"]
RX["i18n-react.tsx"]
RY["i18n-util.ts"]
RZ["i18n-util.async.ts"]
subgraph S0["en"]
S1["index.ts"]
end
subgraph S3["fa"]
S4["index.ts"]
end
S5["formatters.ts"]
S6["i18n-types.ts"]
S7["i18n-util.sync.ts"]
S8["navigator-detector.ts"]
end
S2["site-name.ts"]
S9["table-localization.ts"]
SA["theme-provider.tsx"]
SB["use-page-title.ts"]
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
8H-->8F
8K-->8M
8P-->8R
8P-->8S
8P-->8T
8R-->8S
8S-->8T
8U-->8R
8X-->8Z
92-->94
95-->94
98-->9A
9B-->9A
9C-->9A
9G-->9I
9J-->9I
9M-->9O
9P-->9O
9S-->9U
9V-->9U
9Z-->A1
A2-->A1
A6-->A8
A6-->AH
A6-->AB
A6-->AG
A8-->AA
A8-->AC
A8-->AD
A8-->AE
A8-->AF
A8-->AB
A8-->AG
AA-->AB
AH-->AB
AI-->AJ
AI-->AE
AI-->A8
AI-->AH
AI-->AB
AK-->AB
AM-->AB
AQ-->AS
AT-->AS
AW-->AY
AZ-->AY
B3-->B5
B6-->B5
BA-->BC
BD-->BC
BE-->BC
BI-->BK
BN-->BP
BQ-->BP
BU-->BW
C0-->C2
C5-->C7
C8-->C7
C8-->C9
CD-->CF
CG-->CF
CK-->CM
CN-->CM
CR-->CT
CU-->CT
CW-->CY
D3-->D5
D6-->D5
D9-->DB
DE-->DG
DE-->DH
DG-->DH
DL-->DN
DO-->DN
DR-->DT
DR-->DU
DR-->DV
DR-->DY
DV-->DW
DW-->DX
DY-->DT
DY-->DZ
E6-->E8
E8-->E9
EC-->EE
EH-->EJ
EH-->EK
EN-->EP
ES-->EU
EY-->F0
F1-->F0
F4-->F6
F9-->FB
FB-->FC
FD-->FC
FE-->FC
FF-->FB
FI-->FK
FL-->FK
FM-->FK
FR-->FT
FU-->FT
FY-->G0
G3-->G5
G9-->GB
GH-->GJ
GH-->GK
GL-->GK
GO-->GQ
GR-->GQ
GV-->GX
GY-->GX
H1-->H3
H6-->H8
H6-->H9
H6-->HA
H8-->H9
HB-->H8
HF-->HH
HI-->HH
HL-->HN
HQ-->HS
HT-->HS
HW-->HY
HY-->HZ
I2-->I4
I4-->I5
I4-->I6
I4-->I7
I4-->I8
I6-->I5
I6-->I7
I9-->IA
ID-->IF
IJ-->IL
IM-->IL
IP-->IR
IU-->IW
IU-->IX
IU-->IY
IU-->IZ
J4-->J6
J4-->J7
J7-->J6
JB-->JD
JD-->JE
JH-->JJ
JJ-->JK
JN-->JP
JN-->JR
JN-->JS
JN-->JQ
JP-->JQ
JT-->JQ
JW-->JY
JW-->JZ
JW-->K0
K0-->JZ
K1-->JY
K4-->K6
K4-->K7
K7-->K6
K8-->K7
KC-->KE
KC-->KF
KF-->KE
KI-->KK
KO-->KQ
KR-->KQ
KV-->KX
KY-->KX
L1-->L3
L4-->L3
L7-->L9
LC-->LE
LJ-->LL
LO-->LQ
LO-->LR
LU-->LW
LX-->LY
M2-->M4
M7-->M9
MC-->ME
MJ-->ML
MJ-->MM
MQ-->MS
MQ-->MT
MU-->MT
MX-->MZ
MX-->NA
MX-->N1
MX-->N5
MX-->NB
MX-->NC
MX-->ND
MX-->NE
MX-->NF
MX-->NG
MX-->N2
MX-->N6
MX-->N4
MX-->N0
MX-->NH
MX-->N7
MX-->NI
MX-->N8
MX-->N3
MX-->NJ
MX-->N9
MZ-->N0
N0-->MZ
N0-->N1
N0-->N2
N0-->N4
N0-->N7
N0-->N8
N1-->N0
N2-->N0
N2-->N3
N3-->N2
N4-->N5
N4-->N6
N4-->N0
N6-->N5
N6-->N4
N7-->N8
N7-->N9
N8-->N4
N8-->N0
N8-->N7
NA-->N0
NA-->N9
NB-->NC
ND-->N9
NE-->NC
NE-->N9
NF-->N0
NF-->N7
NH-->N9
NI-->NF
NN-->NP
NN-->NQ
NN-->NR
NN-->NS
NT-->NP
NU-->NS
NX-->NZ
NX-->O0
NX-->O1
NX-->O2
NX-->O3
NX-->O4
NX-->O5
NX-->O6
NX-->O7
NX-->O8
NX-->O9
NX-->OA
NX-->OB
O7-->O6
OE-->OG
OE-->OL
OE-->OO
OE-->OM
OE-->OQ
OE-->OS
OE-->OT
OE-->OK
OE-->OH
OE-->OU
OE-->OV
OE-->OX
OE-->OP
OE-->OY
OE-->OR
OE-->OW
OE-->OZ
OE-->P0
OE-->OI
OE-->ON
OE-->OJ
OG-->OH
OG-->OI
OG-->OJ
OJ-->OG
OJ-->OK
OL-->OM
OL-->ON
OO-->OP
OQ-->OM
OQ-->OR
OQ-->ON
OR-->OM
OR-->OI
OR-->ON
OS-->OM
OS-->ON
OU-->OH
OU-->OI
OU-->OJ
OV-->OP
OV-->OW
OW-->OR
OW-->OI
OW-->OJ
OX-->OV
OY-->OR
OY-->ON
OZ-->OW
OZ-->OJ
P4-->P6
P4-->P7
P4-->P8
P4-->P9
P4-->PA
P4-->PB
P4-->PC
P4-->PD
P4-->PE
P4-->PF
P4-->PG
P4-->PH
P4-->PI
P4-->PJ
P4-->PK
P4-->PL
P4-->PM
PN-->P6
PO-->PD
PP-->PE
PQ-->PE
PR-->PF
PU-->PM
PY-->Q0
PY-->Q1
PY-->Q2
PY-->Q4
PY-->Q5
PY-->Q6
PY-->Q7
PY-->Q8
PY-->Q9
PY-->QA
PY-->QB
PY-->QC
PY-->Q3
PY-->QD
PY-->QE
PY-->QF
PY-->QG
PY-->QH
PY-->QI
PY-->QJ
Q2-->Q3
QD-->Q3
QE-->Q3
QK-->Q0
QK-->Q8
QK-->QH
QK-->QJ
QL-->Q2
QM-->QA
QN-->Q3
QO-->QD
QO-->QI
QP-->QD
QP-->QI
QR-->QF
QS-->QH
QV-->QX
R0-->R2
R0-->R3
R9-->RC
RJ-->RL
RM-->RL
RN-->RL
RO-->RL
RP-->RL
RS-->RU
RS-->RV
RS-->RX
RS-->S6
RS-->RY
RS-->RZ
RS-->S7
RS-->S8
RS-->S2
RS-->S9
RS-->SA
RS-->SB
RU-->RV
RU-->RX
RU-->RZ
RX-->RY
RZ-->S1
RZ-->S4
RZ-->S5
RZ-->RY
S1-->S2
S4-->S2
S7-->S1
S7-->S4
S7-->S5
S7-->RY
S9-->RX
SA-->RU
SB-->RX
