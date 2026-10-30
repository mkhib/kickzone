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
32["admin-seller-orders.pants-size.spec.tsx"]
33["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 34["currency-management"]
subgraph 35["src"]
36["index.ts"]
subgraph 37["lib"]
38["currency-management.tsx"]
39["currency-management.spec.tsx"]
end
end
end
subgraph 3A["customer-management"]
subgraph 3B["src"]
3C["index.ts"]
subgraph 3D["lib"]
3E["admin-customer-management.tsx"]
3F["admin-customer-management.spec.tsx"]
end
end
3G["vite.config.ts"]
end
subgraph 3H["login"]
subgraph 3I["src"]
3J["index.ts"]
subgraph 3K["lib"]
3L["AdminsLogin.tsx"]
3M["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3N["product-editor"]
subgraph 3O["src"]
3P["index.spec.tsx"]
3Q["index.ts"]
subgraph 3R["lib"]
3S["AdminProductEditor.tsx"]
3T["AdminProductEditor.pants-range.spec.tsx"]
3U["AdminProductEditor.spec.tsx"]
end
3V["vite-env.d.ts"]
end
end
subgraph 3W["products"]
subgraph 3X["src"]
3Y["index.spec.tsx"]
3Z["index.ts"]
subgraph 40["lib"]
41["AdminProducts.tsx"]
42["adminProducts.hooks.ts"]
43["adminProducts.graphql.ts"]
44["ProductImageManagementModal.tsx"]
45["AdminProducts.spec.tsx"]
46["ProductImageManagementModal.spec.tsx"]
end
47["vite-env.d.ts"]
end
end
subgraph 48["seller-management"]
subgraph 49["src"]
4A["index.spec.tsx"]
4B["index.ts"]
subgraph 4C["lib"]
4D["SellerManagement.tsx"]
4E["SellerManagement.spec.tsx"]
end
4F["vite-env.d.ts"]
end
end
subgraph 4G["translation-management"]
subgraph 4H["src"]
4I["index.ts"]
subgraph 4J["lib"]
4K["AdminTranslationManagement.tsx"]
4L["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4M["unauthorized"]
subgraph 4N["src"]
4O["index.spec.tsx"]
4P["index.ts"]
subgraph 4Q["lib"]
4R["admins-unauthorized-screen.tsx"]
4S["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4T["zustand"]
subgraph 4U["admins-products-store"]
subgraph 4V["src"]
4W["index.spec.ts"]
4X["index.ts"]
subgraph 4Y["lib"]
4Z["admins-products-store.ts"]
50["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 51["customers"]
subgraph 52["components"]
subgraph 53["footer"]
subgraph 54["src"]
55["index.ts"]
subgraph 56["lib"]
57["customers-footer.tsx"]
58["TrustBadgeIcons.tsx"]
59["customers-footer.spec.tsx"]
end
end
end
subgraph 5A["headerbar"]
subgraph 5B["src"]
5C["index.ts"]
subgraph 5D["lib"]
5E["CustomersHeaderbar.tsx"]
5F["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5G["layout"]
subgraph 5H["src"]
5I["index.ts"]
subgraph 5J["lib"]
5K["CustomersLayout.tsx"]
5L["CustomersTabbar.tsx"]
5M["CustomersLayout.spec.tsx"]
5N["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5O["product-card"]
subgraph 5P["src"]
5Q["index.ts"]
subgraph 5R["lib"]
5S["CustomersProductCard.tsx"]
5T["CustomersProductCard.pants-size.spec.tsx"]
5U["CustomersProductCard.spec.tsx"]
end
5V["vite-env.d.ts"]
end
end
end
subgraph 5W["contexts"]
subgraph 5X["auth"]
subgraph 5Y["src"]
5Z["index.ts"]
subgraph 60["lib"]
61["CustomersAuthContext.tsx"]
62["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 63["graphql"]
subgraph 64["src"]
65["index.ts"]
subgraph 66["lib"]
67["customer-profile.queries.ts"]
68["mutations.ts"]
69["Provider.tsx"]
6A["CustomersApolloProvider.tsx"]
6B["client.ts"]
6C["queries.ts"]
6D["apollo-upload-client.d.ts"]
end
end
end
subgraph 6E["hooks"]
subgraph 6F["auth"]
subgraph 6G["src"]
6H["index.ts"]
subgraph 6I["lib"]
6J["useCustomersForgotPassword.tsx"]
6K["useCustomersLogin.tsx"]
6L["useCustomersRegister.tsx"]
6M["useCustomersResetPassword.tsx"]
6N["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6O["cart"]
6P["jest.config.ts"]
6Q["jest.setup.ts"]
subgraph 6R["src"]
6S["index.ts"]
subgraph 6T["lib"]
6U["customers-cart-hook.tsx"]
6V["useCartService.ts"]
6W["useWishlistSync.ts"]
6X["useCartService.spec.tsx"]
6Y["useCartSync.ts"]
end
end
end
subgraph 6Z["orders"]
subgraph 70["src"]
71["index.ts"]
subgraph 72["lib"]
73["customers-orders-hook.tsx"]
end
end
end
subgraph 74["products"]
subgraph 75["src"]
76["index.ts"]
subgraph 77["lib"]
78["customers-product-hook.tsx"]
end
end
end
end
subgraph 79["router"]
subgraph 7A["src"]
7B["index.ts"]
subgraph 7C["lib"]
7D["CustomersRouter.tsx"]
7E["ScrollToTop.tsx"]
7F["CustomersRouter.spec.tsx"]
7G["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7H["routes"]
subgraph 7I["src"]
7J["index.ts"]
subgraph 7K["lib"]
7L["customer-routes.ts"]
7M["customer-routes.spec.ts"]
end
end
end
subgraph 7N["screens"]
subgraph 7O["contact"]
subgraph 7P["src"]
7Q["index.ts"]
subgraph 7R["lib"]
7S["customer-contact.tsx"]
7T["customer-contact.spec.tsx"]
end
end
7U["vite.config.ts"]
end
subgraph 7V["customer-checkout"]
subgraph 7W["src"]
7X["index.ts"]
subgraph 7Y["lib"]
7Z["customer-checkout.tsx"]
end
end
end
subgraph 80["customer-favorites"]
subgraph 81["src"]
82["index.ts"]
subgraph 83["lib"]
84["customer-favorites.tsx"]
85["customer-favorites.spec.tsx"]
end
end
86["vite.config.ts"]
end
subgraph 87["customer-login"]
subgraph 88["src"]
89["index.ts"]
subgraph 8A["lib"]
8B["customer-login.tsx"]
end
end
end
subgraph 8C["customer-order-confirmation"]
subgraph 8D["src"]
8E["index.ts"]
subgraph 8F["lib"]
8G["customer-order-confirmation.tsx"]
8H["customer-order-confirmation.pants-size.spec.tsx"]
8I["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8J["customer-orders"]
subgraph 8K["src"]
8L["index.ts"]
subgraph 8M["lib"]
8N["customer-orders.tsx"]
end
end
end
subgraph 8O["customer-payment"]
subgraph 8P["src"]
8Q["index.ts"]
subgraph 8R["lib"]
8S["customer-payment-callback.tsx"]
8T["use-zarinpal-payment.tsx"]
8U["zarinpal-payment-service.ts"]
8V["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 8W["customer-products"]
subgraph 8X["src"]
8Y["index.ts"]
subgraph 8Z["lib"]
90["customer-products.tsx"]
end
end
end
subgraph 91["customer-profile"]
subgraph 92["src"]
93["index.ts"]
subgraph 94["lib"]
95["customer-profile.tsx"]
96["customer-profile.spec.tsx"]
end
end
end
subgraph 97["customer-shopping-cart"]
subgraph 98["src"]
99["index.ts"]
subgraph 9A["lib"]
9B["customer-shopping-cart.tsx"]
9C["customer-shopping-cart.pants-size.spec.tsx"]
9D["customer-shopping-cart.spec.tsx"]
end
end
9E["vite.config.ts"]
end
subgraph 9F["customer-signup"]
subgraph 9G["src"]
9H["index.ts"]
subgraph 9I["lib"]
9J["customer-signup.tsx"]
9K["customer-signup.spec.tsx"]
end
end
end
subgraph 9L["forgot-password"]
subgraph 9M["src"]
9N["index.ts"]
subgraph 9O["lib"]
9P["customer-forgot-password.tsx"]
9Q["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9R["guide-authenticity"]
subgraph 9S["src"]
9T["index.ts"]
subgraph 9U["lib"]
9V["customer-guide-authenticity.tsx"]
9W["customer-guide-authenticity.spec.tsx"]
end
end
9X["vite.config.ts"]
end
subgraph 9Y["guide-payment"]
subgraph 9Z["src"]
A0["index.ts"]
subgraph A1["lib"]
A2["customer-guide-payment.tsx"]
A3["customer-guide-payment.spec.tsx"]
end
end
A4["vite.config.ts"]
end
subgraph A5["home"]
subgraph A6["src"]
A7["index.ts"]
subgraph A8["lib"]
A9["CustomersHomeScreen.tsx"]
subgraph AA["components"]
AB["CategoryBentoSection.tsx"]
AD["HeroSection.tsx"]
AE["HomeLoadingScreen.tsx"]
AF["PicksRailSection.tsx"]
AG["TrustStripSection.tsx"]
AL["NewArrivalsSection.tsx"]
AN["BrandBlocksSection.tsx"]
AO["NewsletterSection.tsx"]
AP["ShopTheLookSection.tsx"]
AQ["TickerSection.tsx"]
end
AC["home-selectors.ts"]
AH["useScrollProgress.ts"]
AI["CustomersShopScreen.tsx"]
AJ["CustomersHomeScreen.cart-size.spec.tsx"]
AK["CustomersHomeScreen.spec.tsx"]
AM["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AR["login"]
subgraph AS["src"]
AT["index.ts"]
subgraph AU["lib"]
AV["CustomersLoginScreen.tsx"]
AW["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AX["not-found"]
subgraph AY["src"]
AZ["index.ts"]
subgraph B0["lib"]
B1["customer-not-found.tsx"]
B2["customer-not-found.spec.tsx"]
end
end
B3["vite.config.ts"]
end
subgraph B4["privacy-policy"]
subgraph B5["src"]
B6["index.ts"]
subgraph B7["lib"]
B8["customer-privacy-policy.tsx"]
B9["customer-privacy-policy.spec.tsx"]
end
end
BA["vite.config.ts"]
end
subgraph BB["product-details"]
subgraph BC["src"]
BD["index.ts"]
subgraph BE["lib"]
BF["customer-product-details.tsx"]
BG["customer-product-details.pants-size.spec.tsx"]
BH["customer-product-details.spec.tsx"]
end
end
BI["vite.config.ts"]
end
subgraph BJ["reset-password"]
subgraph BK["src"]
BL["index.ts"]
subgraph BM["lib"]
BN["customer-reset-password.tsx"]
end
end
end
subgraph BO["shipping-returns"]
subgraph BP["src"]
BQ["index.ts"]
subgraph BR["lib"]
BS["customer-shipping-returns.tsx"]
BT["customer-shipping-returns.spec.tsx"]
end
end
BU["vite.config.ts"]
end
subgraph BV["unauthorized"]
subgraph BW["src"]
BX["index.ts"]
subgraph BY["lib"]
BZ["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C0["utility"]
subgraph C1["test"]
subgraph C2["src"]
C3["index.ts"]
subgraph C4["lib"]
C5["customers-test-utility.tsx"]
end
end
end
end
subgraph C6["validations"]
subgraph C7["src"]
C8["index.ts"]
subgraph C9["lib"]
CA["shipping-validation.ts"]
CB["shipping-validation.spec.tsx"]
CC["shipping-validation.tsx"]
end
end
end
subgraph CD["zustand"]
subgraph CE["customer-cart-store"]
subgraph CF["src"]
CG["index.ts"]
subgraph CH["lib"]
CI["customer-cart-store.ts"]
CJ["customer-cart-store.spec.ts"]
CK["customer-cart-store.tsx"]
end
end
end
subgraph CL["customer-checkout-store"]
subgraph CM["src"]
CN["index.ts"]
subgraph CO["lib"]
CP["customer-checkout-store.ts"]
CQ["customer-checkout-store.spec.ts"]
end
end
CR["vite.config.ts"]
end
subgraph CS["customer-wishlist-store"]
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["customer-wishlist-store.ts"]
CX["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CY["src"]
CZ["index.ts"]
subgraph D0["lib"]
D1["customers-products-store.tsx"]
end
end
end
end
subgraph D2["sellers"]
subgraph D3["components"]
subgraph D4["footer"]
subgraph D5["src"]
D6["index.ts"]
subgraph D7["lib"]
D8["sellers-footer.tsx"]
D9["sellers-footer.spec.tsx"]
end
end
end
subgraph DA["headerbar"]
subgraph DB["src"]
DC["index.ts"]
subgraph DD["lib"]
DE["SellersHeaderbar.tsx"]
end
end
end
subgraph DF["layout"]
subgraph DG["src"]
DH["index.ts"]
subgraph DI["lib"]
DJ["SellersLayout.tsx"]
DK["SellersTabbar.tsx"]
end
end
end
end
subgraph DL["contexts"]
subgraph DM["auth"]
subgraph DN["src"]
DO["index.ts"]
subgraph DP["lib"]
DQ["SellersAuthContext.tsx"]
DR["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DS["graphql"]
subgraph DT["src"]
DU["index.ts"]
subgraph DV["lib"]
DW["fragments.ts"]
DX["mutations.ts"]
DY["Provider.tsx"]
DZ["SellersApolloProvider.tsx"]
E0["client.ts"]
E1["queries.ts"]
E2["seller-orders.graphql.ts"]
E3["apollo-upload-client.d.ts"]
end
subgraph E4["types"]
E5["apollo-upload-client.d.ts"]
end
end
end
subgraph E6["hooks"]
subgraph E7["auth"]
subgraph E8["src"]
E9["index.ts"]
subgraph EA["lib"]
EB["useSellerAuth.ts"]
EC["sellerAuth.graphql.ts"]
end
end
end
subgraph ED["orders"]
subgraph EE["src"]
EF["index.ts"]
subgraph EG["lib"]
EH["useSellerOrders.ts"]
end
end
end
subgraph EI["products"]
subgraph EJ["src"]
EK["index.ts"]
subgraph EL["lib"]
EM["useSellersProductManagement.ts"]
EN["useSellersProducts.ts"]
end
end
end
end
subgraph EO["router"]
subgraph EP["src"]
EQ["index.ts"]
subgraph ER["lib"]
ES["SellersRouter.tsx"]
end
end
end
subgraph ET["routes"]
subgraph EU["src"]
EV["index.ts"]
subgraph EW["lib"]
EX["seller-routes.ts"]
end
end
end
subgraph EY["screens"]
subgraph EZ["catalog"]
subgraph F0["src"]
F1["index.ts"]
subgraph F2["lib"]
F3["SellersCatalogScreens.tsx"]
F4["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F5["login"]
subgraph F6["src"]
F7["index.ts"]
subgraph F8["lib"]
F9["SellersLogin.tsx"]
end
end
end
subgraph FA["manage-product"]
subgraph FB["src"]
FC["index.ts"]
subgraph FD["lib"]
FE["SellersManageProductScreen.tsx"]
FF["SellersDefineProductFlow.tsx"]
FG["SellersDefineProductFlow.pants-label.spec.tsx"]
FH["SellersDefineProductFlow.spec.tsx"]
FI["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FJ["products"]
subgraph FK["src"]
FL["index.ts"]
subgraph FM["lib"]
FN["SellersProducts.tsx"]
FO["SellersProducts.pants-label.spec.tsx"]
FP["SellersProducts.spec.tsx"]
end
end
end
subgraph FQ["seller-orders"]
FR["jest.config.ts"]
FS["jest.setup.ts"]
subgraph FT["src"]
FU["index.ts"]
subgraph FV["lib"]
FW["seller-orders-screen.tsx"]
FX["seller-orders-screen.spec.tsx"]
end
FY["test-setup.ts"]
end
end
subgraph FZ["setup-password"]
subgraph G0["src"]
G1["index.ts"]
subgraph G2["lib"]
G3["SellersSetupPassword.tsx"]
end
end
end
subgraph G4["unauthorized"]
subgraph G5["src"]
G6["index.ts"]
subgraph G7["lib"]
G8["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G9["zustand"]
subgraph GA["sellers-products-store"]
subgraph GB["src"]
GC["index.ts"]
subgraph GD["lib"]
GE["useSellersProductsStore.ts"]
GF["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GG["shared"]
subgraph GH["components"]
subgraph GI["apollo-provider-base"]
subgraph GJ["src"]
GK["index.ts"]
subgraph GL["lib"]
GM["ApolloProviderBase.tsx"]
GN["createSilentRefreshAuthLink.ts"]
GO["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GP["error-boundary"]
subgraph GQ["src"]
GR["index.ts"]
subgraph GS["lib"]
GT["error-boundary.tsx"]
GU["error-boundary.spec.tsx"]
end
end
GV["vite.config.ts"]
end
subgraph GW["glassmorphism-container"]
subgraph GX["src"]
GY["index.ts"]
subgraph GZ["lib"]
H0["glassmorphism-container.tsx"]
H1["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H2["layout"]
subgraph H3["src"]
H4["index.ts"]
subgraph H5["lib"]
H6["Layout.tsx"]
end
end
end
subgraph H7["material-data-table"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["material-data-table.tsx"]
HC["table-config.ts"]
HD["table-utils.ts"]
HE["material-data-table.spec.tsx"]
HF["table-types.ts"]
end
end
end
subgraph HG["order-status-chip"]
subgraph HH["src"]
HI["index.ts"]
subgraph HJ["lib"]
HK["order-status-chip.tsx"]
HL["order-status-chip.spec.tsx"]
end
end
end
subgraph HM["password-field"]
subgraph HN["src"]
HO["index.ts"]
subgraph HP["lib"]
HQ["PasswordTextField.tsx"]
end
end
end
subgraph HR["price-display"]
subgraph HS["src"]
HT["index.ts"]
subgraph HU["lib"]
HV["price-display.tsx"]
HW["price-display.spec.tsx"]
end
end
end
subgraph HX["private-route"]
subgraph HY["src"]
HZ["index.ts"]
subgraph I0["lib"]
I1["createPrivateRoute.tsx"]
I2["PrivateRoute.tsx"]
end
end
end
subgraph I3["rtl-table-utils"]
subgraph I4["src"]
I5["index.ts"]
subgraph I6["lib"]
I7["rtl-table-utils.ts"]
I8["rtl-cell-components.tsx"]
I9["rtl-column-helpers.ts"]
IA["rtl-table-props.ts"]
IB["use-table-alignment.ts"]
IC["rtl-table-utils.spec.tsx"]
ID["rtl-table-utils.tsx"]
end
end
end
subgraph IE["snackbar"]
subgraph IF["src"]
IG["index.ts"]
subgraph IH["lib"]
II["snackbar.tsx"]
IJ["Snackbar.tsx"]
end
end
end
subgraph IK["styled-drawer"]
subgraph IL["src"]
IM["index.ts"]
subgraph IN["lib"]
IO["styled-drawer.tsx"]
IP["styled-drawer.spec.tsx"]
end
end
end
subgraph IQ["unauthorized"]
subgraph IR["src"]
IS["index.ts"]
subgraph IT["lib"]
IU["unauthorized-path.tsx"]
end
end
end
end
subgraph IV["graphql"]
subgraph IW["src"]
IX["index.ts"]
subgraph IY["lib"]
IZ["currency.mutations.ts"]
J0["currency.queries.ts"]
J1["fragments.ts"]
J2["variant-colors.ts"]
J3["client-shared-graphql.tsx"]
end
end
end
subgraph J4["hooks"]
subgraph J5["brands"]
subgraph J6["src"]
J7["index.ts"]
subgraph J8["lib"]
J9["brands.graphql.ts"]
JA["useBrands.ts"]
end
end
JB["vite.config.ts"]
end
subgraph JC["categories"]
subgraph JD["src"]
JE["index.ts"]
subgraph JF["lib"]
JG["useCategories.ts"]
JH["categories.graphql.ts"]
end
end
end
subgraph JI["colors"]
subgraph JJ["src"]
JK["index.ts"]
subgraph JL["lib"]
JM["useColors.ts"]
JN["color.graphql.ts"]
end
end
end
subgraph JO["currency"]
subgraph JP["src"]
JQ["index.ts"]
subgraph JR["lib"]
JS["useConvertPrice.tsx"]
JT["useExchangeRate.tsx"]
JU["useCurrencies.tsx"]
JV["useCurrencyForLocale.tsx"]
JW["useExchangeRate.spec.tsx"]
end
end
end
subgraph JX["products"]
subgraph JY["src"]
JZ["index.ts"]
subgraph K0["lib"]
K1["productImage.ts"]
K2["products.graphql.ts"]
K3["useProducts.ts"]
K4["productImage.spec.ts"]
end
end
end
subgraph K5["site-languages"]
subgraph K6["src"]
K7["index.ts"]
subgraph K8["lib"]
K9["site-languages.graphql.ts"]
KA["useSiteLanguages.ts"]
KB["site-languages-hook.spec.tsx"]
end
end
KC["vite.config.ts"]
end
subgraph KD["snackbar"]
subgraph KE["src"]
KF["index.ts"]
subgraph KG["lib"]
KH["SnackbarContext.tsx"]
KI["useSnackbar.ts"]
end
end
end
subgraph KJ["translations-management-hook"]
subgraph KK["src"]
KL["index.ts"]
subgraph KM["lib"]
KN["useTranslationsManagement.ts"]
end
end
end
end
subgraph KO["lottie"]
subgraph KP["empty-cart"]
subgraph KQ["src"]
KR["index.ts"]
subgraph KS["lib"]
KT["lottie-empty-cart.tsx"]
KU["lottie-empty-cart.spec.tsx"]
end
end
KV["vite.config.ts"]
end
subgraph KW["loading"]
subgraph KX["src"]
KY["index.ts"]
subgraph KZ["lib"]
L0["lottie-loading.tsx"]
L1["lottie-loading.spec.tsx"]
end
end
end
subgraph L2["success-check"]
subgraph L3["src"]
L4["index.ts"]
subgraph L5["lib"]
L6["lottie-success-check.tsx"]
L7["lottie-success-check.spec.tsx"]
end
end
end
subgraph L8["unauthorized"]
subgraph L9["src"]
LA["index.ts"]
subgraph LB["lib"]
LC["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LD["translations"]
subgraph LE["src"]
LF["index.ts"]
subgraph LG["lib"]
LH["mapApolloErrorToTranslationKey.ts"]
LI["WrapTranslation.tsx"]
end
end
end
subgraph LJ["ui"]
subgraph LK["colors"]
subgraph LL["src"]
LM["index.ts"]
subgraph LN["lib"]
LO["colors.ts"]
end
end
end
subgraph LP["language-components"]
subgraph LQ["src"]
LR["index.ts"]
subgraph LS["lib"]
LT["language-components.tsx"]
LU["ltr-text-field.tsx"]
end
end
end
subgraph LV["sizes"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["sizes.ts"]
M0["sizes.spec.tsx"]
M1["sizes.tsx"]
end
end
end
end
subgraph M2["zustand"]
subgraph M3["shared-auth-store"]
subgraph M4["src"]
M5["index.ts"]
subgraph M6["lib"]
M7["shared-auth-store.ts"]
end
end
end
subgraph M8["shared-notification-store"]
subgraph M9["src"]
MA["index.ts"]
subgraph MB["lib"]
MC["shared-notification-store.tsx"]
end
end
end
subgraph MD["shared-ui-store"]
subgraph ME["src"]
MF["index.ts"]
subgraph MG["lib"]
MH["shared-ui-store.ts"]
MI["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MJ["server"]
subgraph MK["controllers"]
subgraph ML["src"]
MM["index.ts"]
subgraph MN["lib"]
MO["auth.controller.ts"]
MP["order.controller.ts"]
end
end
end
subgraph MQ["decorators"]
MR["jest.config.ts"]
subgraph MS["src"]
MT["index.ts"]
subgraph MU["lib"]
MV["current-user.decorator.ts"]
MW["decorators.ts"]
MX["decorators.spec.ts"]
end
end
end
subgraph MY["entities"]
subgraph MZ["src"]
N0["index.ts"]
subgraph N1["lib"]
N2["brand.entity.ts"]
N3["product.entity.ts"]
N4["category.entity.ts"]
N5["product-description.entity.ts"]
N6["site-language.entity.ts"]
N7["product-info.entity.ts"]
N8["color.entity.ts"]
N9["product-info-color.entity.ts"]
NA["seller-info.entity.ts"]
NB["seller-product.entity.ts"]
NC["user.entity.ts"]
ND["cart.entity.ts"]
NE["currency-preference.entity.ts"]
NF["currency.entity.ts"]
NG["customer.entity.ts"]
NH["exchange-rate.entity.ts"]
NI["order.entity.ts"]
NJ["platform-settings.entity.ts"]
NK["refresh-token.entity.ts"]
NL["seller-order.entity.ts"]
NM["translation.entity.ts"]
end
end
end
subgraph NN["guards"]
NO["jest.config.ts"]
subgraph NP["src"]
NQ["index.ts"]
subgraph NR["lib"]
NS["catalog.guard.ts"]
NT["graphql-auth.guard.ts"]
NU["http-auth.guard.ts"]
NV["roles.guard.ts"]
NW["catalog.guard.spec.ts"]
NX["roles.guard.spec.ts"]
end
end
end
subgraph NY["inputs"]
subgraph NZ["src"]
O0["index.ts"]
subgraph O1["lib"]
O2["brand.input.ts"]
O3["cart.inputs.ts"]
O4["category.input.ts"]
O5["color.input.ts"]
O6["customer-auth.inputs.ts"]
O7["order-pagination.inputs.ts"]
O8["order.inputs.ts"]
O9["product-info-filter.input.ts"]
OA["product.input.ts"]
OB["seller-order-pagination.inputs.ts"]
OC["seller.input.ts"]
OD["site-language.input.ts"]
OE["user.input.ts"]
end
end
end
subgraph OF["modules"]
subgraph OG["src"]
OH["index.ts"]
subgraph OI["lib"]
OJ["auth.module.ts"]
OK["email.module.ts"]
OL["token.module.ts"]
OM["user.module.ts"]
ON["customer-profile.module.ts"]
OO["brand.module.ts"]
OP["catalog-guard.module.ts"]
OQ["translation.module.ts"]
OR["cart.module.ts"]
OS["platform-settings.module.ts"]
OT["category.module.ts"]
OU["product.module.ts"]
OV["color.module.ts"]
OW["currency.module.ts"]
OX["graphql-context.module.ts"]
OY["order.module.ts"]
OZ["seller-info.module.ts"]
P0["payment.module.ts"]
P1["product-info.module.ts"]
P2["seller-products.module.ts"]
P3["site-language.module.ts"]
end
end
end
subgraph P4["resolvers"]
P5["jest.config.ts"]
subgraph P6["src"]
P7["index.ts"]
subgraph P8["lib"]
P9["auth.resolver.ts"]
PA["brand.resolver.ts"]
PB["cart.resolver.ts"]
PC["category.resolver.ts"]
PD["color.resolver.ts"]
PE["currency.resolver.ts"]
PF["customer-profile.resolver.ts"]
PG["order.resolver.ts"]
PH["payment.resolver.ts"]
PI["product-info.resolver.ts"]
PJ["product.resolver.ts"]
PK["seller-info.resolver.ts"]
PL["shipping.resolver.ts"]
PM["site-language.resolver.ts"]
PN["translation.input.ts"]
PO["translation.resolver.ts"]
PP["user.resolver.ts"]
PQ["auth.resolver.spec.ts"]
PR["order.resolver.spec.ts"]
PS["payment.resolver.integration.spec.ts"]
PT["payment.resolver.spec.ts"]
PU["product-info.resolver.spec.ts"]
subgraph PV["types"]
PW["graphql-upload.d.ts"]
end
PX["user.resolver.spec.ts"]
end
end
end
subgraph PY["services"]
PZ["jest.config.ts"]
subgraph Q0["src"]
Q1["index.ts"]
subgraph Q2["lib"]
Q3["auth.service.ts"]
Q4["brand.service.ts"]
Q5["cart.service.ts"]
Q6["product-info-colors.util.ts"]
Q7["category.service.ts"]
Q8["color.service.ts"]
Q9["currency.service.ts"]
QA["customer-profile.service.ts"]
QB["email.service.ts"]
QC["image-upload.service.ts"]
QD["order.service.ts"]
QE["payment-logger.service.ts"]
QF["payment.service.ts"]
QG["product.service.ts"]
QH["seller-info.service.ts"]
QI["shipping-calculation.service.ts"]
QJ["site-language.service.ts"]
QK["token.service.ts"]
QL["translation.service.ts"]
QM["user.service.ts"]
QN["auth.service.spec.ts"]
QO["cart.service.spec.ts"]
QP["order.service.spec.ts"]
QQ["product-info-colors.util.spec.ts"]
QR["product.service.pants.spec.ts"]
QS["product.service.spec.ts"]
QT["relay-connection.spec.ts"]
QU["shipping-calculation.service.spec.ts"]
QV["token.service.spec.ts"]
end
end
end
subgraph QW["strategies"]
subgraph QX["src"]
QY["index.ts"]
subgraph QZ["lib"]
R0["local.strategy.ts"]
end
end
end
subgraph R1["utils"]
subgraph R2["src"]
R3["index.ts"]
subgraph R4["lib"]
R5["email-templates.ts"]
R6["relay-connection.ts"]
R7["pagination.ts"]
end
end
end
end
subgraph R8["shared"]
subgraph R9["codegen"]
RA["jest.config.ts"]
subgraph RB["src"]
RC["index.ts"]
subgraph RD["lib"]
subgraph RE["generated"]
RF["graphql.ts"]
end
end
end
end
subgraph RG["graphql-schema"]
RH["jest.config.ts"]
subgraph RI["src"]
RJ["index.ts"]
end
end
subgraph RK["product-sizes"]
subgraph RL["src"]
RM["index.ts"]
subgraph RN["lib"]
RO["product-sizes.ts"]
RP["product-sizes.pants-formats.spec.ts"]
RQ["product-sizes.pants-label.spec.ts"]
RR["product-sizes.pants-strict.spec.ts"]
RS["product-sizes.spec.ts"]
end
end
end
subgraph RT["shared-i18n"]
subgraph RU["src"]
RV["index.ts"]
subgraph RW["lib"]
RX["language-context.tsx"]
RY["language-detector.ts"]
subgraph RZ["locales"]
S0["i18n-react.tsx"]
S1["i18n-util.ts"]
S2["i18n-util.async.ts"]
subgraph S3["en"]
S4["index.ts"]
end
subgraph S6["fa"]
S7["index.ts"]
end
S8["formatters.ts"]
S9["i18n-types.ts"]
SA["i18n-util.sync.ts"]
SB["navigator-detector.ts"]
end
S5["site-name.ts"]
SC["table-localization.ts"]
SD["theme-provider.tsx"]
SE["use-page-title.ts"]
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
33-->31
36-->38
39-->38
3C-->3E
3F-->3E
3J-->3L
3M-->3L
3P-->3Q
3Q-->3S
3T-->3S
3U-->3S
3Y-->3Z
3Z-->41
41-->42
41-->44
42-->43
45-->41
4A-->4B
4B-->4D
4E-->4D
4I-->4K
4K-->4L
4O-->4P
4P-->4R
4S-->4R
4W-->4X
4X-->4Z
50-->4Z
55-->57
55-->58
57-->58
59-->57
5C-->5E
5F-->5E
5I-->5K
5I-->5L
5K-->5L
5M-->5K
5N-->5L
5Q-->5S
5T-->5S
5U-->5S
5Z-->61
62-->61
65-->67
65-->68
65-->69
65-->6C
69-->6A
6A-->6B
6H-->6J
6H-->6K
6H-->6L
6H-->6M
6N-->6K
6S-->6U
6S-->6V
6S-->6W
6X-->6V
6Y-->6U
71-->73
76-->78
7B-->7D
7B-->7E
7D-->7E
7F-->7D
7G-->7E
7J-->7L
7M-->7L
7Q-->7S
7T-->7S
7X-->7Z
82-->84
85-->84
89-->8B
8E-->8G
8H-->8G
8I-->8G
8L-->8N
8Q-->8S
8Q-->8T
8Q-->8U
8S-->8T
8T-->8U
8V-->8S
8Y-->90
93-->95
96-->95
99-->9B
9C-->9B
9D-->9B
9H-->9J
9K-->9J
9N-->9P
9Q-->9P
9T-->9V
9W-->9V
A0-->A2
A3-->A2
A7-->A9
A7-->AI
A7-->AC
A7-->AH
A9-->AB
A9-->AD
A9-->AE
A9-->AF
A9-->AG
A9-->AC
A9-->AH
AB-->AC
AI-->AC
AJ-->AF
AJ-->A9
AJ-->AC
AK-->AL
AK-->AF
AK-->A9
AK-->AI
AK-->AC
AM-->AI
AN-->AC
AP-->AC
AT-->AV
AW-->AV
AZ-->B1
B2-->B1
B6-->B8
B9-->B8
BD-->BF
BG-->BF
BH-->BF
BL-->BN
BQ-->BS
BT-->BS
BX-->BZ
C3-->C5
C8-->CA
CB-->CA
CB-->CC
CG-->CI
CJ-->CI
CN-->CP
CQ-->CP
CU-->CW
CX-->CW
CZ-->D1
D6-->D8
D9-->D8
DC-->DE
DH-->DJ
DH-->DK
DJ-->DK
DO-->DQ
DR-->DQ
DU-->DW
DU-->DX
DU-->DY
DU-->E1
DY-->DZ
DZ-->E0
E1-->DW
E1-->E2
E9-->EB
EB-->EC
EF-->EH
EK-->EM
EK-->EN
EQ-->ES
EV-->EX
F1-->F3
F4-->F3
F7-->F9
FC-->FE
FE-->FF
FG-->FF
FH-->FF
FI-->FE
FL-->FN
FO-->FN
FP-->FN
FU-->FW
FX-->FW
G1-->G3
G6-->G8
GC-->GE
GK-->GM
GK-->GN
GO-->GN
GR-->GT
GU-->GT
GY-->H0
H1-->H0
H4-->H6
H9-->HB
H9-->HC
H9-->HD
HB-->HC
HE-->HB
HI-->HK
HL-->HK
HO-->HQ
HT-->HV
HW-->HV
HZ-->I1
I1-->I2
I5-->I7
I7-->I8
I7-->I9
I7-->IA
I7-->IB
I9-->I8
I9-->IA
IC-->ID
IG-->II
IM-->IO
IP-->IO
IS-->IU
IX-->IZ
IX-->J0
IX-->J1
IX-->J2
J7-->J9
J7-->JA
JA-->J9
JE-->JG
JG-->JH
JK-->JM
JM-->JN
JQ-->JS
JQ-->JU
JQ-->JV
JQ-->JT
JS-->JT
JW-->JT
JZ-->K1
JZ-->K2
JZ-->K3
K3-->K2
K4-->K1
K7-->K9
K7-->KA
KA-->K9
KB-->KA
KF-->KH
KF-->KI
KI-->KH
KL-->KN
KR-->KT
KU-->KT
KY-->L0
L1-->L0
L4-->L6
L7-->L6
LA-->LC
LF-->LH
LM-->LO
LR-->LT
LR-->LU
LX-->LZ
M0-->M1
M5-->M7
MA-->MC
MF-->MH
MM-->MO
MM-->MP
MT-->MV
MT-->MW
MX-->MW
N0-->N2
N0-->ND
N0-->N4
N0-->N8
N0-->NE
N0-->NF
N0-->NG
N0-->NH
N0-->NI
N0-->NJ
N0-->N5
N0-->N9
N0-->N7
N0-->N3
N0-->NK
N0-->NA
N0-->NL
N0-->NB
N0-->N6
N0-->NM
N0-->NC
N2-->N3
N3-->N2
N3-->N4
N3-->N5
N3-->N7
N3-->NA
N3-->NB
N4-->N3
N5-->N3
N5-->N6
N6-->N5
N7-->N8
N7-->N9
N7-->N3
N9-->N8
N9-->N7
NA-->NB
NA-->NC
NB-->N7
NB-->N3
NB-->NA
ND-->N3
ND-->NC
NE-->NF
NG-->NC
NH-->NF
NH-->NC
NI-->N3
NI-->NA
NK-->NC
NL-->NI
NQ-->NS
NQ-->NT
NQ-->NU
NQ-->NV
NW-->NS
NX-->NV
O0-->O2
O0-->O3
O0-->O4
O0-->O5
O0-->O6
O0-->O7
O0-->O8
O0-->O9
O0-->OA
O0-->OB
O0-->OC
O0-->OD
O0-->OE
OA-->O9
OH-->OJ
OH-->OO
OH-->OR
OH-->OP
OH-->OT
OH-->OV
OH-->OW
OH-->ON
OH-->OK
OH-->OX
OH-->OY
OH-->P0
OH-->OS
OH-->P1
OH-->OU
OH-->OZ
OH-->P2
OH-->P3
OH-->OL
OH-->OQ
OH-->OM
OJ-->OK
OJ-->OL
OJ-->OM
OM-->OJ
OM-->ON
OO-->OP
OO-->OQ
OR-->OS
OT-->OP
OT-->OU
OT-->OQ
OU-->OP
OU-->OL
OU-->OQ
OV-->OP
OV-->OQ
OX-->OK
OX-->OL
OX-->OM
OY-->OS
OY-->OZ
OZ-->OU
OZ-->OL
OZ-->OM
P0-->OY
P1-->OU
P1-->OQ
P2-->OZ
P2-->OM
P7-->P9
P7-->PA
P7-->PB
P7-->PC
P7-->PD
P7-->PE
P7-->PF
P7-->PG
P7-->PH
P7-->PI
P7-->PJ
P7-->PK
P7-->PL
P7-->PM
P7-->PN
P7-->PO
P7-->PP
PQ-->P9
PR-->PG
PS-->PH
PT-->PH
PU-->PI
PX-->PP
Q1-->Q3
Q1-->Q4
Q1-->Q5
Q1-->Q7
Q1-->Q8
Q1-->Q9
Q1-->QA
Q1-->QB
Q1-->QC
Q1-->QD
Q1-->QE
Q1-->QF
Q1-->Q6
Q1-->QG
Q1-->QH
Q1-->QI
Q1-->QJ
Q1-->QK
Q1-->QL
Q1-->QM
Q5-->Q6
QG-->Q6
QH-->Q6
QN-->Q3
QN-->QB
QN-->QK
QN-->QM
QO-->Q5
QP-->QD
QQ-->Q6
QR-->QG
QR-->QL
QS-->QG
QS-->QL
QU-->QI
QV-->QK
QY-->R0
R3-->R5
R3-->R6
RC-->RF
RM-->RO
RP-->RO
RQ-->RO
RR-->RO
RS-->RO
RV-->RX
RV-->RY
RV-->S0
RV-->S9
RV-->S1
RV-->S2
RV-->SA
RV-->SB
RV-->S5
RV-->SC
RV-->SD
RV-->SE
RX-->RY
RX-->S0
RX-->S2
S0-->S1
S2-->S4
S2-->S7
S2-->S8
S2-->S1
S4-->S5
S7-->S5
SA-->S4
SA-->S7
SA-->S8
SA-->S1
SC-->S0
SD-->RX
SE-->S0
