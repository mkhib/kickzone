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
AK["NewArrivalsSection.tsx"]
AM["BrandBlocksSection.tsx"]
AN["NewsletterSection.tsx"]
AO["ShopTheLookSection.tsx"]
AP["TickerSection.tsx"]
end
AB["home-selectors.ts"]
AG["useScrollProgress.ts"]
AH["CustomersShopScreen.tsx"]
AI["CustomersHomeScreen.cart-size.spec.tsx"]
AJ["CustomersHomeScreen.spec.tsx"]
AL["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AQ["login"]
subgraph AR["src"]
AS["index.ts"]
subgraph AT["lib"]
AU["CustomersLoginScreen.tsx"]
AV["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AW["not-found"]
subgraph AX["src"]
AY["index.ts"]
subgraph AZ["lib"]
B0["customer-not-found.tsx"]
B1["customer-not-found.spec.tsx"]
end
end
B2["vite.config.ts"]
end
subgraph B3["privacy-policy"]
subgraph B4["src"]
B5["index.ts"]
subgraph B6["lib"]
B7["customer-privacy-policy.tsx"]
B8["customer-privacy-policy.spec.tsx"]
end
end
B9["vite.config.ts"]
end
subgraph BA["product-details"]
subgraph BB["src"]
BC["index.ts"]
subgraph BD["lib"]
BE["customer-product-details.tsx"]
BF["customer-product-details.pants-size.spec.tsx"]
BG["customer-product-details.spec.tsx"]
end
end
BH["vite.config.ts"]
end
subgraph BI["reset-password"]
subgraph BJ["src"]
BK["index.ts"]
subgraph BL["lib"]
BM["customer-reset-password.tsx"]
end
end
end
subgraph BN["shipping-returns"]
subgraph BO["src"]
BP["index.ts"]
subgraph BQ["lib"]
BR["customer-shipping-returns.tsx"]
BS["customer-shipping-returns.spec.tsx"]
end
end
BT["vite.config.ts"]
end
subgraph BU["unauthorized"]
subgraph BV["src"]
BW["index.ts"]
subgraph BX["lib"]
BY["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BZ["utility"]
subgraph C0["test"]
subgraph C1["src"]
C2["index.ts"]
subgraph C3["lib"]
C4["customers-test-utility.tsx"]
end
end
end
end
subgraph C5["validations"]
subgraph C6["src"]
C7["index.ts"]
subgraph C8["lib"]
C9["shipping-validation.ts"]
CA["shipping-validation.spec.tsx"]
CB["shipping-validation.tsx"]
end
end
end
subgraph CC["zustand"]
subgraph CD["customer-cart-store"]
subgraph CE["src"]
CF["index.ts"]
subgraph CG["lib"]
CH["customer-cart-store.ts"]
CI["customer-cart-store.spec.ts"]
CJ["customer-cart-store.tsx"]
end
end
end
subgraph CK["customer-checkout-store"]
subgraph CL["src"]
CM["index.ts"]
subgraph CN["lib"]
CO["customer-checkout-store.ts"]
CP["customer-checkout-store.spec.ts"]
end
end
CQ["vite.config.ts"]
end
subgraph CR["customer-wishlist-store"]
subgraph CS["src"]
CT["index.ts"]
subgraph CU["lib"]
CV["customer-wishlist-store.ts"]
CW["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CX["src"]
CY["index.ts"]
subgraph CZ["lib"]
D0["customers-products-store.tsx"]
end
end
end
end
subgraph D1["sellers"]
subgraph D2["components"]
subgraph D3["footer"]
subgraph D4["src"]
D5["index.ts"]
subgraph D6["lib"]
D7["sellers-footer.tsx"]
D8["sellers-footer.spec.tsx"]
end
end
end
subgraph D9["headerbar"]
subgraph DA["src"]
DB["index.ts"]
subgraph DC["lib"]
DD["SellersHeaderbar.tsx"]
end
end
end
subgraph DE["layout"]
subgraph DF["src"]
DG["index.ts"]
subgraph DH["lib"]
DI["SellersLayout.tsx"]
DJ["SellersTabbar.tsx"]
end
end
end
end
subgraph DK["contexts"]
subgraph DL["auth"]
subgraph DM["src"]
DN["index.ts"]
subgraph DO["lib"]
DP["SellersAuthContext.tsx"]
DQ["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DR["graphql"]
subgraph DS["src"]
DT["index.ts"]
subgraph DU["lib"]
DV["fragments.ts"]
DW["mutations.ts"]
DX["Provider.tsx"]
DY["SellersApolloProvider.tsx"]
DZ["client.ts"]
E0["queries.ts"]
E1["seller-orders.graphql.ts"]
E2["apollo-upload-client.d.ts"]
end
subgraph E3["types"]
E4["apollo-upload-client.d.ts"]
end
end
end
subgraph E5["hooks"]
subgraph E6["auth"]
subgraph E7["src"]
E8["index.ts"]
subgraph E9["lib"]
EA["useSellerAuth.ts"]
EB["sellerAuth.graphql.ts"]
end
end
end
subgraph EC["orders"]
subgraph ED["src"]
EE["index.ts"]
subgraph EF["lib"]
EG["useSellerOrders.ts"]
end
end
end
subgraph EH["products"]
subgraph EI["src"]
EJ["index.ts"]
subgraph EK["lib"]
EL["useSellersProductManagement.ts"]
EM["useSellersProducts.ts"]
end
end
end
end
subgraph EN["router"]
subgraph EO["src"]
EP["index.ts"]
subgraph EQ["lib"]
ER["SellersRouter.tsx"]
end
end
end
subgraph ES["routes"]
subgraph ET["src"]
EU["index.ts"]
subgraph EV["lib"]
EW["seller-routes.ts"]
end
end
end
subgraph EX["screens"]
subgraph EY["catalog"]
subgraph EZ["src"]
F0["index.ts"]
subgraph F1["lib"]
F2["SellersCatalogScreens.tsx"]
F3["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F4["login"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["SellersLogin.tsx"]
end
end
end
subgraph F9["manage-product"]
subgraph FA["src"]
FB["index.ts"]
subgraph FC["lib"]
FD["SellersManageProductScreen.tsx"]
FE["SellersDefineProductFlow.tsx"]
FF["SellersDefineProductFlow.pants-label.spec.tsx"]
FG["SellersDefineProductFlow.spec.tsx"]
FH["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FI["products"]
subgraph FJ["src"]
FK["index.ts"]
subgraph FL["lib"]
FM["SellersProducts.tsx"]
FN["SellersProducts.pants-label.spec.tsx"]
FO["SellersProducts.spec.tsx"]
end
end
end
subgraph FP["seller-orders"]
FQ["jest.config.ts"]
FR["jest.setup.ts"]
subgraph FS["src"]
FT["index.ts"]
subgraph FU["lib"]
FV["seller-orders-screen.tsx"]
FW["seller-orders-screen.spec.tsx"]
end
FX["test-setup.ts"]
end
end
subgraph FY["setup-password"]
subgraph FZ["src"]
G0["index.ts"]
subgraph G1["lib"]
G2["SellersSetupPassword.tsx"]
end
end
end
subgraph G3["unauthorized"]
subgraph G4["src"]
G5["index.ts"]
subgraph G6["lib"]
G7["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G8["zustand"]
subgraph G9["sellers-products-store"]
subgraph GA["src"]
GB["index.ts"]
subgraph GC["lib"]
GD["useSellersProductsStore.ts"]
GE["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GF["shared"]
subgraph GG["components"]
subgraph GH["apollo-provider-base"]
subgraph GI["src"]
GJ["index.ts"]
subgraph GK["lib"]
GL["ApolloProviderBase.tsx"]
GM["createSilentRefreshAuthLink.ts"]
GN["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GO["error-boundary"]
subgraph GP["src"]
GQ["index.ts"]
subgraph GR["lib"]
GS["error-boundary.tsx"]
GT["error-boundary.spec.tsx"]
end
end
GU["vite.config.ts"]
end
subgraph GV["glassmorphism-container"]
subgraph GW["src"]
GX["index.ts"]
subgraph GY["lib"]
GZ["glassmorphism-container.tsx"]
H0["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H1["layout"]
subgraph H2["src"]
H3["index.ts"]
subgraph H4["lib"]
H5["Layout.tsx"]
end
end
end
subgraph H6["material-data-table"]
subgraph H7["src"]
H8["index.ts"]
subgraph H9["lib"]
HA["material-data-table.tsx"]
HB["table-config.ts"]
HC["table-utils.ts"]
HD["material-data-table.spec.tsx"]
HE["table-types.ts"]
end
end
end
subgraph HF["order-status-chip"]
subgraph HG["src"]
HH["index.ts"]
subgraph HI["lib"]
HJ["order-status-chip.tsx"]
HK["order-status-chip.spec.tsx"]
end
end
end
subgraph HL["password-field"]
subgraph HM["src"]
HN["index.ts"]
subgraph HO["lib"]
HP["PasswordTextField.tsx"]
end
end
end
subgraph HQ["price-display"]
subgraph HR["src"]
HS["index.ts"]
subgraph HT["lib"]
HU["price-display.tsx"]
HV["price-display.spec.tsx"]
end
end
end
subgraph HW["private-route"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["createPrivateRoute.tsx"]
I1["PrivateRoute.tsx"]
end
end
end
subgraph I2["rtl-table-utils"]
subgraph I3["src"]
I4["index.ts"]
subgraph I5["lib"]
I6["rtl-table-utils.ts"]
I7["rtl-cell-components.tsx"]
I8["rtl-column-helpers.ts"]
I9["rtl-table-props.ts"]
IA["use-table-alignment.ts"]
IB["rtl-table-utils.spec.tsx"]
IC["rtl-table-utils.tsx"]
end
end
end
subgraph ID["snackbar"]
subgraph IE["src"]
IF["index.ts"]
subgraph IG["lib"]
IH["snackbar.tsx"]
II["Snackbar.tsx"]
end
end
end
subgraph IJ["styled-drawer"]
subgraph IK["src"]
IL["index.ts"]
subgraph IM["lib"]
IN["styled-drawer.tsx"]
IO["styled-drawer.spec.tsx"]
end
end
end
subgraph IP["unauthorized"]
subgraph IQ["src"]
IR["index.ts"]
subgraph IS["lib"]
IT["unauthorized-path.tsx"]
end
end
end
end
subgraph IU["graphql"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["currency.mutations.ts"]
IZ["currency.queries.ts"]
J0["fragments.ts"]
J1["variant-colors.ts"]
J2["client-shared-graphql.tsx"]
end
end
end
subgraph J3["hooks"]
subgraph J4["brands"]
subgraph J5["src"]
J6["index.ts"]
subgraph J7["lib"]
J8["brands.graphql.ts"]
J9["useBrands.ts"]
end
end
JA["vite.config.ts"]
end
subgraph JB["categories"]
subgraph JC["src"]
JD["index.ts"]
subgraph JE["lib"]
JF["useCategories.ts"]
JG["categories.graphql.ts"]
end
end
end
subgraph JH["colors"]
subgraph JI["src"]
JJ["index.ts"]
subgraph JK["lib"]
JL["useColors.ts"]
JM["color.graphql.ts"]
end
end
end
subgraph JN["currency"]
subgraph JO["src"]
JP["index.ts"]
subgraph JQ["lib"]
JR["useConvertPrice.tsx"]
JS["useExchangeRate.tsx"]
JT["useCurrencies.tsx"]
JU["useCurrencyForLocale.tsx"]
JV["useExchangeRate.spec.tsx"]
end
end
end
subgraph JW["products"]
subgraph JX["src"]
JY["index.ts"]
subgraph JZ["lib"]
K0["productImage.ts"]
K1["products.graphql.ts"]
K2["useProducts.ts"]
K3["productImage.spec.ts"]
end
end
end
subgraph K4["site-languages"]
subgraph K5["src"]
K6["index.ts"]
subgraph K7["lib"]
K8["site-languages.graphql.ts"]
K9["useSiteLanguages.ts"]
KA["site-languages-hook.spec.tsx"]
end
end
KB["vite.config.ts"]
end
subgraph KC["snackbar"]
subgraph KD["src"]
KE["index.ts"]
subgraph KF["lib"]
KG["SnackbarContext.tsx"]
KH["useSnackbar.ts"]
end
end
end
subgraph KI["translations-management-hook"]
subgraph KJ["src"]
KK["index.ts"]
subgraph KL["lib"]
KM["useTranslationsManagement.ts"]
end
end
end
end
subgraph KN["lottie"]
subgraph KO["empty-cart"]
subgraph KP["src"]
KQ["index.ts"]
subgraph KR["lib"]
KS["lottie-empty-cart.tsx"]
KT["lottie-empty-cart.spec.tsx"]
end
end
KU["vite.config.ts"]
end
subgraph KV["loading"]
subgraph KW["src"]
KX["index.ts"]
subgraph KY["lib"]
KZ["lottie-loading.tsx"]
L0["lottie-loading.spec.tsx"]
end
end
end
subgraph L1["success-check"]
subgraph L2["src"]
L3["index.ts"]
subgraph L4["lib"]
L5["lottie-success-check.tsx"]
L6["lottie-success-check.spec.tsx"]
end
end
end
subgraph L7["unauthorized"]
subgraph L8["src"]
L9["index.ts"]
subgraph LA["lib"]
LB["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LC["translations"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["mapApolloErrorToTranslationKey.ts"]
LH["WrapTranslation.tsx"]
end
end
end
subgraph LI["ui"]
subgraph LJ["colors"]
subgraph LK["src"]
LL["index.ts"]
subgraph LM["lib"]
LN["colors.ts"]
end
end
end
subgraph LO["language-components"]
subgraph LP["src"]
LQ["index.ts"]
subgraph LR["lib"]
LS["language-components.tsx"]
LT["ltr-text-field.tsx"]
end
end
end
subgraph LU["sizes"]
subgraph LV["src"]
LW["index.ts"]
subgraph LX["lib"]
LY["sizes.ts"]
LZ["sizes.spec.tsx"]
M0["sizes.tsx"]
end
end
end
end
subgraph M1["zustand"]
subgraph M2["shared-auth-store"]
subgraph M3["src"]
M4["index.ts"]
subgraph M5["lib"]
M6["shared-auth-store.ts"]
end
end
end
subgraph M7["shared-notification-store"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["shared-notification-store.tsx"]
end
end
end
subgraph MC["shared-ui-store"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["shared-ui-store.ts"]
MH["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MI["server"]
subgraph MJ["controllers"]
subgraph MK["src"]
ML["index.ts"]
subgraph MM["lib"]
MN["auth.controller.ts"]
MO["order.controller.ts"]
end
end
end
subgraph MP["decorators"]
MQ["jest.config.ts"]
subgraph MR["src"]
MS["index.ts"]
subgraph MT["lib"]
MU["current-user.decorator.ts"]
MV["decorators.ts"]
MW["decorators.spec.ts"]
end
end
end
subgraph MX["entities"]
subgraph MY["src"]
MZ["index.ts"]
subgraph N0["lib"]
N1["brand.entity.ts"]
N2["product.entity.ts"]
N3["category.entity.ts"]
N4["product-description.entity.ts"]
N5["site-language.entity.ts"]
N6["product-info.entity.ts"]
N7["color.entity.ts"]
N8["product-info-color.entity.ts"]
N9["seller-info.entity.ts"]
NA["seller-product.entity.ts"]
NB["user.entity.ts"]
NC["cart.entity.ts"]
ND["currency-preference.entity.ts"]
NE["currency.entity.ts"]
NF["customer.entity.ts"]
NG["exchange-rate.entity.ts"]
NH["order.entity.ts"]
NI["platform-settings.entity.ts"]
NJ["refresh-token.entity.ts"]
NK["seller-order.entity.ts"]
NL["translation.entity.ts"]
end
end
end
subgraph NM["guards"]
NN["jest.config.ts"]
subgraph NO["src"]
NP["index.ts"]
subgraph NQ["lib"]
NR["catalog.guard.ts"]
NS["graphql-auth.guard.ts"]
NT["http-auth.guard.ts"]
NU["roles.guard.ts"]
NV["catalog.guard.spec.ts"]
NW["roles.guard.spec.ts"]
end
end
end
subgraph NX["inputs"]
subgraph NY["src"]
NZ["index.ts"]
subgraph O0["lib"]
O1["brand.input.ts"]
O2["cart.inputs.ts"]
O3["category.input.ts"]
O4["color.input.ts"]
O5["customer-auth.inputs.ts"]
O6["order-pagination.inputs.ts"]
O7["order.inputs.ts"]
O8["product-info-filter.input.ts"]
O9["product.input.ts"]
OA["seller-order-pagination.inputs.ts"]
OB["seller.input.ts"]
OC["site-language.input.ts"]
OD["user.input.ts"]
end
end
end
subgraph OE["modules"]
subgraph OF["src"]
OG["index.ts"]
subgraph OH["lib"]
OI["auth.module.ts"]
OJ["email.module.ts"]
OK["token.module.ts"]
OL["user.module.ts"]
OM["customer-profile.module.ts"]
ON["brand.module.ts"]
OO["catalog-guard.module.ts"]
OP["translation.module.ts"]
OQ["cart.module.ts"]
OR["platform-settings.module.ts"]
OS["category.module.ts"]
OT["product.module.ts"]
OU["color.module.ts"]
OV["currency.module.ts"]
OW["graphql-context.module.ts"]
OX["order.module.ts"]
OY["seller-info.module.ts"]
OZ["payment.module.ts"]
P0["product-info.module.ts"]
P1["seller-products.module.ts"]
P2["site-language.module.ts"]
end
end
end
subgraph P3["resolvers"]
P4["jest.config.ts"]
subgraph P5["src"]
P6["index.ts"]
subgraph P7["lib"]
P8["auth.resolver.ts"]
P9["brand.resolver.ts"]
PA["cart.resolver.ts"]
PB["category.resolver.ts"]
PC["color.resolver.ts"]
PD["currency.resolver.ts"]
PE["customer-profile.resolver.ts"]
PF["order.resolver.ts"]
PG["payment.resolver.ts"]
PH["product-info.resolver.ts"]
PI["product.resolver.ts"]
PJ["seller-info.resolver.ts"]
PK["shipping.resolver.ts"]
PL["site-language.resolver.ts"]
PM["translation.input.ts"]
PN["translation.resolver.ts"]
PO["user.resolver.ts"]
PP["auth.resolver.spec.ts"]
PQ["order.resolver.spec.ts"]
PR["payment.resolver.integration.spec.ts"]
PS["payment.resolver.spec.ts"]
PT["product-info.resolver.spec.ts"]
subgraph PU["types"]
PV["graphql-upload.d.ts"]
end
PW["user.resolver.spec.ts"]
end
end
end
subgraph PX["services"]
PY["jest.config.ts"]
subgraph PZ["src"]
Q0["index.ts"]
subgraph Q1["lib"]
Q2["auth.service.ts"]
Q3["brand.service.ts"]
Q4["cart.service.ts"]
Q5["product-info-colors.util.ts"]
Q6["category.service.ts"]
Q7["color.service.ts"]
Q8["currency.service.ts"]
Q9["customer-profile.service.ts"]
QA["email.service.ts"]
QB["image-upload.service.ts"]
QC["order.service.ts"]
QD["payment-logger.service.ts"]
QE["payment.service.ts"]
QF["product.service.ts"]
QG["seller-info.service.ts"]
QH["shipping-calculation.service.ts"]
QI["site-language.service.ts"]
QJ["token.service.ts"]
QK["translation.service.ts"]
QL["user.service.ts"]
QM["auth.service.spec.ts"]
QN["cart.service.spec.ts"]
QO["order.service.spec.ts"]
QP["product-info-colors.util.spec.ts"]
QQ["product.service.pants.spec.ts"]
QR["product.service.spec.ts"]
QS["relay-connection.spec.ts"]
QT["shipping-calculation.service.spec.ts"]
QU["token.service.spec.ts"]
end
end
end
subgraph QV["strategies"]
subgraph QW["src"]
QX["index.ts"]
subgraph QY["lib"]
QZ["local.strategy.ts"]
end
end
end
subgraph R0["utils"]
subgraph R1["src"]
R2["index.ts"]
subgraph R3["lib"]
R4["email-templates.ts"]
R5["relay-connection.ts"]
R6["pagination.ts"]
end
end
end
end
subgraph R7["shared"]
subgraph R8["codegen"]
R9["jest.config.ts"]
subgraph RA["src"]
RB["index.ts"]
subgraph RC["lib"]
subgraph RD["generated"]
RE["graphql.ts"]
end
end
end
end
subgraph RF["graphql-schema"]
RG["jest.config.ts"]
subgraph RH["src"]
RI["index.ts"]
end
end
subgraph RJ["product-sizes"]
subgraph RK["src"]
RL["index.ts"]
subgraph RM["lib"]
RN["product-sizes.ts"]
RO["product-sizes.pants-formats.spec.ts"]
RP["product-sizes.pants-label.spec.ts"]
RQ["product-sizes.pants-strict.spec.ts"]
RR["product-sizes.spec.ts"]
end
end
end
subgraph RS["shared-i18n"]
subgraph RT["src"]
RU["index.ts"]
subgraph RV["lib"]
RW["language-context.tsx"]
RX["language-detector.ts"]
subgraph RY["locales"]
RZ["i18n-react.tsx"]
S0["i18n-util.ts"]
S1["i18n-util.async.ts"]
subgraph S2["en"]
S3["index.ts"]
end
subgraph S5["fa"]
S6["index.ts"]
end
S7["formatters.ts"]
S8["i18n-types.ts"]
S9["i18n-util.sync.ts"]
SA["navigator-detector.ts"]
end
S4["site-name.ts"]
SB["table-localization.ts"]
SC["theme-provider.tsx"]
SD["use-page-title.ts"]
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
AI-->AE
AI-->A8
AI-->AB
AJ-->AK
AJ-->AE
AJ-->A8
AJ-->AH
AJ-->AB
AL-->AH
AM-->AB
AO-->AB
AS-->AU
AV-->AU
AY-->B0
B1-->B0
B5-->B7
B8-->B7
BC-->BE
BF-->BE
BG-->BE
BK-->BM
BP-->BR
BS-->BR
BW-->BY
C2-->C4
C7-->C9
CA-->C9
CA-->CB
CF-->CH
CI-->CH
CM-->CO
CP-->CO
CT-->CV
CW-->CV
CY-->D0
D5-->D7
D8-->D7
DB-->DD
DG-->DI
DG-->DJ
DI-->DJ
DN-->DP
DQ-->DP
DT-->DV
DT-->DW
DT-->DX
DT-->E0
DX-->DY
DY-->DZ
E0-->DV
E0-->E1
E8-->EA
EA-->EB
EE-->EG
EJ-->EL
EJ-->EM
EP-->ER
EU-->EW
F0-->F2
F3-->F2
F6-->F8
FB-->FD
FD-->FE
FF-->FE
FG-->FE
FH-->FD
FK-->FM
FN-->FM
FO-->FM
FT-->FV
FW-->FV
G0-->G2
G5-->G7
GB-->GD
GJ-->GL
GJ-->GM
GN-->GM
GQ-->GS
GT-->GS
GX-->GZ
H0-->GZ
H3-->H5
H8-->HA
H8-->HB
H8-->HC
HA-->HB
HD-->HA
HH-->HJ
HK-->HJ
HN-->HP
HS-->HU
HV-->HU
HY-->I0
I0-->I1
I4-->I6
I6-->I7
I6-->I8
I6-->I9
I6-->IA
I8-->I7
I8-->I9
IB-->IC
IF-->IH
IL-->IN
IO-->IN
IR-->IT
IW-->IY
IW-->IZ
IW-->J0
IW-->J1
J6-->J8
J6-->J9
J9-->J8
JD-->JF
JF-->JG
JJ-->JL
JL-->JM
JP-->JR
JP-->JT
JP-->JU
JP-->JS
JR-->JS
JV-->JS
JY-->K0
JY-->K1
JY-->K2
K2-->K1
K3-->K0
K6-->K8
K6-->K9
K9-->K8
KA-->K9
KE-->KG
KE-->KH
KH-->KG
KK-->KM
KQ-->KS
KT-->KS
KX-->KZ
L0-->KZ
L3-->L5
L6-->L5
L9-->LB
LE-->LG
LL-->LN
LQ-->LS
LQ-->LT
LW-->LY
LZ-->M0
M4-->M6
M9-->MB
ME-->MG
ML-->MN
ML-->MO
MS-->MU
MS-->MV
MW-->MV
MZ-->N1
MZ-->NC
MZ-->N3
MZ-->N7
MZ-->ND
MZ-->NE
MZ-->NF
MZ-->NG
MZ-->NH
MZ-->NI
MZ-->N4
MZ-->N8
MZ-->N6
MZ-->N2
MZ-->NJ
MZ-->N9
MZ-->NK
MZ-->NA
MZ-->N5
MZ-->NL
MZ-->NB
N1-->N2
N2-->N1
N2-->N3
N2-->N4
N2-->N6
N2-->N9
N2-->NA
N3-->N2
N4-->N2
N4-->N5
N5-->N4
N6-->N7
N6-->N8
N6-->N2
N8-->N7
N8-->N6
N9-->NA
N9-->NB
NA-->N6
NA-->N2
NA-->N9
NC-->N2
NC-->NB
ND-->NE
NF-->NB
NG-->NE
NG-->NB
NH-->N2
NH-->N9
NJ-->NB
NK-->NH
NP-->NR
NP-->NS
NP-->NT
NP-->NU
NV-->NR
NW-->NU
NZ-->O1
NZ-->O2
NZ-->O3
NZ-->O4
NZ-->O5
NZ-->O6
NZ-->O7
NZ-->O8
NZ-->O9
NZ-->OA
NZ-->OB
NZ-->OC
NZ-->OD
O9-->O8
OG-->OI
OG-->ON
OG-->OQ
OG-->OO
OG-->OS
OG-->OU
OG-->OV
OG-->OM
OG-->OJ
OG-->OW
OG-->OX
OG-->OZ
OG-->OR
OG-->P0
OG-->OT
OG-->OY
OG-->P1
OG-->P2
OG-->OK
OG-->OP
OG-->OL
OI-->OJ
OI-->OK
OI-->OL
OL-->OI
OL-->OM
ON-->OO
ON-->OP
OQ-->OR
OS-->OO
OS-->OT
OS-->OP
OT-->OO
OT-->OK
OT-->OP
OU-->OO
OU-->OP
OW-->OJ
OW-->OK
OW-->OL
OX-->OR
OX-->OY
OY-->OT
OY-->OK
OY-->OL
OZ-->OX
P0-->OT
P0-->OP
P1-->OY
P1-->OL
P6-->P8
P6-->P9
P6-->PA
P6-->PB
P6-->PC
P6-->PD
P6-->PE
P6-->PF
P6-->PG
P6-->PH
P6-->PI
P6-->PJ
P6-->PK
P6-->PL
P6-->PM
P6-->PN
P6-->PO
PP-->P8
PQ-->PF
PR-->PG
PS-->PG
PT-->PH
PW-->PO
Q0-->Q2
Q0-->Q3
Q0-->Q4
Q0-->Q6
Q0-->Q7
Q0-->Q8
Q0-->Q9
Q0-->QA
Q0-->QB
Q0-->QC
Q0-->QD
Q0-->QE
Q0-->Q5
Q0-->QF
Q0-->QG
Q0-->QH
Q0-->QI
Q0-->QJ
Q0-->QK
Q0-->QL
Q4-->Q5
QF-->Q5
QG-->Q5
QM-->Q2
QM-->QA
QM-->QJ
QM-->QL
QN-->Q4
QO-->QC
QP-->Q5
QQ-->QF
QQ-->QK
QR-->QF
QR-->QK
QT-->QH
QU-->QJ
QX-->QZ
R2-->R4
R2-->R5
RB-->RE
RL-->RN
RO-->RN
RP-->RN
RQ-->RN
RR-->RN
RU-->RW
RU-->RX
RU-->RZ
RU-->S8
RU-->S0
RU-->S1
RU-->S9
RU-->SA
RU-->S4
RU-->SB
RU-->SC
RU-->SD
RW-->RX
RW-->RZ
RW-->S1
RZ-->S0
S1-->S3
S1-->S6
S1-->S7
S1-->S0
S3-->S4
S6-->S4
S9-->S3
S9-->S6
S9-->S7
S9-->S0
SB-->RZ
SC-->RW
SD-->RZ
