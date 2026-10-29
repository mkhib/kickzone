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
AL["BrandBlocksSection.tsx"]
AM["NewsletterSection.tsx"]
AN["ShopTheLookSection.tsx"]
AO["TickerSection.tsx"]
end
AB["home-selectors.ts"]
AG["useScrollProgress.ts"]
AH["CustomersShopScreen.tsx"]
AI["CustomersHomeScreen.cart-size.spec.tsx"]
AJ["CustomersHomeScreen.spec.tsx"]
end
end
end
subgraph AP["login"]
subgraph AQ["src"]
AR["index.ts"]
subgraph AS["lib"]
AT["CustomersLoginScreen.tsx"]
AU["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AV["not-found"]
subgraph AW["src"]
AX["index.ts"]
subgraph AY["lib"]
AZ["customer-not-found.tsx"]
B0["customer-not-found.spec.tsx"]
end
end
B1["vite.config.ts"]
end
subgraph B2["privacy-policy"]
subgraph B3["src"]
B4["index.ts"]
subgraph B5["lib"]
B6["customer-privacy-policy.tsx"]
B7["customer-privacy-policy.spec.tsx"]
end
end
B8["vite.config.ts"]
end
subgraph B9["product-details"]
subgraph BA["src"]
BB["index.ts"]
subgraph BC["lib"]
BD["customer-product-details.tsx"]
BE["customer-product-details.pants-size.spec.tsx"]
BF["customer-product-details.spec.tsx"]
end
end
BG["vite.config.ts"]
end
subgraph BH["reset-password"]
subgraph BI["src"]
BJ["index.ts"]
subgraph BK["lib"]
BL["customer-reset-password.tsx"]
end
end
end
subgraph BM["shipping-returns"]
subgraph BN["src"]
BO["index.ts"]
subgraph BP["lib"]
BQ["customer-shipping-returns.tsx"]
BR["customer-shipping-returns.spec.tsx"]
end
end
BS["vite.config.ts"]
end
subgraph BT["unauthorized"]
subgraph BU["src"]
BV["index.ts"]
subgraph BW["lib"]
BX["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph BY["utility"]
subgraph BZ["test"]
subgraph C0["src"]
C1["index.ts"]
subgraph C2["lib"]
C3["customers-test-utility.tsx"]
end
end
end
end
subgraph C4["validations"]
subgraph C5["src"]
C6["index.ts"]
subgraph C7["lib"]
C8["shipping-validation.ts"]
C9["shipping-validation.spec.tsx"]
CA["shipping-validation.tsx"]
end
end
end
subgraph CB["zustand"]
subgraph CC["customer-cart-store"]
subgraph CD["src"]
CE["index.ts"]
subgraph CF["lib"]
CG["customer-cart-store.ts"]
CH["customer-cart-store.spec.ts"]
CI["customer-cart-store.tsx"]
end
end
end
subgraph CJ["customer-checkout-store"]
subgraph CK["src"]
CL["index.ts"]
subgraph CM["lib"]
CN["customer-checkout-store.ts"]
CO["customer-checkout-store.spec.ts"]
end
end
CP["vite.config.ts"]
end
subgraph CQ["customer-wishlist-store"]
subgraph CR["src"]
CS["index.ts"]
subgraph CT["lib"]
CU["customer-wishlist-store.ts"]
CV["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CW["src"]
CX["index.ts"]
subgraph CY["lib"]
CZ["customers-products-store.tsx"]
end
end
end
end
subgraph D0["sellers"]
subgraph D1["components"]
subgraph D2["footer"]
subgraph D3["src"]
D4["index.ts"]
subgraph D5["lib"]
D6["sellers-footer.tsx"]
D7["sellers-footer.spec.tsx"]
end
end
end
subgraph D8["headerbar"]
subgraph D9["src"]
DA["index.ts"]
subgraph DB["lib"]
DC["SellersHeaderbar.tsx"]
end
end
end
subgraph DD["layout"]
subgraph DE["src"]
DF["index.ts"]
subgraph DG["lib"]
DH["SellersLayout.tsx"]
DI["SellersTabbar.tsx"]
end
end
end
end
subgraph DJ["contexts"]
subgraph DK["auth"]
subgraph DL["src"]
DM["index.ts"]
subgraph DN["lib"]
DO["SellersAuthContext.tsx"]
DP["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DQ["graphql"]
subgraph DR["src"]
DS["index.ts"]
subgraph DT["lib"]
DU["fragments.ts"]
DV["mutations.ts"]
DW["Provider.tsx"]
DX["SellersApolloProvider.tsx"]
DY["client.ts"]
DZ["queries.ts"]
E0["seller-orders.graphql.ts"]
E1["apollo-upload-client.d.ts"]
end
subgraph E2["types"]
E3["apollo-upload-client.d.ts"]
end
end
end
subgraph E4["hooks"]
subgraph E5["auth"]
subgraph E6["src"]
E7["index.ts"]
subgraph E8["lib"]
E9["useSellerAuth.ts"]
EA["sellerAuth.graphql.ts"]
end
end
end
subgraph EB["orders"]
subgraph EC["src"]
ED["index.ts"]
subgraph EE["lib"]
EF["useSellerOrders.ts"]
end
end
end
subgraph EG["products"]
subgraph EH["src"]
EI["index.ts"]
subgraph EJ["lib"]
EK["useSellersProductManagement.ts"]
EL["useSellersProducts.ts"]
end
end
end
end
subgraph EM["router"]
subgraph EN["src"]
EO["index.ts"]
subgraph EP["lib"]
EQ["SellersRouter.tsx"]
end
end
end
subgraph ER["routes"]
subgraph ES["src"]
ET["index.ts"]
subgraph EU["lib"]
EV["seller-routes.ts"]
end
end
end
subgraph EW["screens"]
subgraph EX["catalog"]
subgraph EY["src"]
EZ["index.ts"]
subgraph F0["lib"]
F1["SellersCatalogScreens.tsx"]
F2["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F3["login"]
subgraph F4["src"]
F5["index.ts"]
subgraph F6["lib"]
F7["SellersLogin.tsx"]
end
end
end
subgraph F8["manage-product"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["SellersManageProductScreen.tsx"]
FD["SellersDefineProductFlow.tsx"]
FE["SellersDefineProductFlow.pants-label.spec.tsx"]
FF["SellersDefineProductFlow.spec.tsx"]
FG["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FH["products"]
subgraph FI["src"]
FJ["index.ts"]
subgraph FK["lib"]
FL["SellersProducts.tsx"]
FM["SellersProducts.pants-label.spec.tsx"]
FN["SellersProducts.spec.tsx"]
end
end
end
subgraph FO["seller-orders"]
FP["jest.config.ts"]
FQ["jest.setup.ts"]
subgraph FR["src"]
FS["index.ts"]
subgraph FT["lib"]
FU["seller-orders-screen.tsx"]
FV["seller-orders-screen.spec.tsx"]
end
FW["test-setup.ts"]
end
end
subgraph FX["setup-password"]
subgraph FY["src"]
FZ["index.ts"]
subgraph G0["lib"]
G1["SellersSetupPassword.tsx"]
end
end
end
subgraph G2["unauthorized"]
subgraph G3["src"]
G4["index.ts"]
subgraph G5["lib"]
G6["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph G7["zustand"]
subgraph G8["sellers-products-store"]
subgraph G9["src"]
GA["index.ts"]
subgraph GB["lib"]
GC["useSellersProductsStore.ts"]
GD["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GE["shared"]
subgraph GF["components"]
subgraph GG["apollo-provider-base"]
subgraph GH["src"]
GI["index.ts"]
subgraph GJ["lib"]
GK["ApolloProviderBase.tsx"]
GL["createSilentRefreshAuthLink.ts"]
GM["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GN["error-boundary"]
subgraph GO["src"]
GP["index.ts"]
subgraph GQ["lib"]
GR["error-boundary.tsx"]
GS["error-boundary.spec.tsx"]
end
end
GT["vite.config.ts"]
end
subgraph GU["glassmorphism-container"]
subgraph GV["src"]
GW["index.ts"]
subgraph GX["lib"]
GY["glassmorphism-container.tsx"]
GZ["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H0["layout"]
subgraph H1["src"]
H2["index.ts"]
subgraph H3["lib"]
H4["Layout.tsx"]
end
end
end
subgraph H5["material-data-table"]
subgraph H6["src"]
H7["index.ts"]
subgraph H8["lib"]
H9["material-data-table.tsx"]
HA["table-config.ts"]
HB["table-utils.ts"]
HC["material-data-table.spec.tsx"]
HD["table-types.ts"]
end
end
end
subgraph HE["order-status-chip"]
subgraph HF["src"]
HG["index.ts"]
subgraph HH["lib"]
HI["order-status-chip.tsx"]
HJ["order-status-chip.spec.tsx"]
end
end
end
subgraph HK["password-field"]
subgraph HL["src"]
HM["index.ts"]
subgraph HN["lib"]
HO["PasswordTextField.tsx"]
end
end
end
subgraph HP["price-display"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["price-display.tsx"]
HU["price-display.spec.tsx"]
end
end
end
subgraph HV["private-route"]
subgraph HW["src"]
HX["index.ts"]
subgraph HY["lib"]
HZ["createPrivateRoute.tsx"]
I0["PrivateRoute.tsx"]
end
end
end
subgraph I1["rtl-table-utils"]
subgraph I2["src"]
I3["index.ts"]
subgraph I4["lib"]
I5["rtl-table-utils.ts"]
I6["rtl-cell-components.tsx"]
I7["rtl-column-helpers.ts"]
I8["rtl-table-props.ts"]
I9["use-table-alignment.ts"]
IA["rtl-table-utils.spec.tsx"]
IB["rtl-table-utils.tsx"]
end
end
end
subgraph IC["snackbar"]
subgraph ID["src"]
IE["index.ts"]
subgraph IF["lib"]
IG["snackbar.tsx"]
IH["Snackbar.tsx"]
end
end
end
subgraph II["styled-drawer"]
subgraph IJ["src"]
IK["index.ts"]
subgraph IL["lib"]
IM["styled-drawer.tsx"]
IN["styled-drawer.spec.tsx"]
end
end
end
subgraph IO["unauthorized"]
subgraph IP["src"]
IQ["index.ts"]
subgraph IR["lib"]
IS["unauthorized-path.tsx"]
end
end
end
end
subgraph IT["graphql"]
subgraph IU["src"]
IV["index.ts"]
subgraph IW["lib"]
IX["currency.mutations.ts"]
IY["currency.queries.ts"]
IZ["fragments.ts"]
J0["variant-colors.ts"]
J1["client-shared-graphql.tsx"]
end
end
end
subgraph J2["hooks"]
subgraph J3["brands"]
subgraph J4["src"]
J5["index.ts"]
subgraph J6["lib"]
J7["brands.graphql.ts"]
J8["useBrands.ts"]
end
end
J9["vite.config.ts"]
end
subgraph JA["categories"]
subgraph JB["src"]
JC["index.ts"]
subgraph JD["lib"]
JE["useCategories.ts"]
JF["categories.graphql.ts"]
end
end
end
subgraph JG["colors"]
subgraph JH["src"]
JI["index.ts"]
subgraph JJ["lib"]
JK["useColors.ts"]
JL["color.graphql.ts"]
end
end
end
subgraph JM["currency"]
subgraph JN["src"]
JO["index.ts"]
subgraph JP["lib"]
JQ["useConvertPrice.tsx"]
JR["useExchangeRate.tsx"]
JS["useCurrencies.tsx"]
JT["useCurrencyForLocale.tsx"]
JU["useExchangeRate.spec.tsx"]
end
end
end
subgraph JV["products"]
subgraph JW["src"]
JX["index.ts"]
subgraph JY["lib"]
JZ["productImage.ts"]
K0["products.graphql.ts"]
K1["useProducts.ts"]
K2["productImage.spec.ts"]
end
end
end
subgraph K3["site-languages"]
subgraph K4["src"]
K5["index.ts"]
subgraph K6["lib"]
K7["site-languages.graphql.ts"]
K8["useSiteLanguages.ts"]
K9["site-languages-hook.spec.tsx"]
end
end
KA["vite.config.ts"]
end
subgraph KB["snackbar"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["SnackbarContext.tsx"]
KG["useSnackbar.ts"]
end
end
end
subgraph KH["translations-management-hook"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["useTranslationsManagement.ts"]
end
end
end
end
subgraph KM["lottie"]
subgraph KN["empty-cart"]
subgraph KO["src"]
KP["index.ts"]
subgraph KQ["lib"]
KR["lottie-empty-cart.tsx"]
KS["lottie-empty-cart.spec.tsx"]
end
end
KT["vite.config.ts"]
end
subgraph KU["loading"]
subgraph KV["src"]
KW["index.ts"]
subgraph KX["lib"]
KY["lottie-loading.tsx"]
KZ["lottie-loading.spec.tsx"]
end
end
end
subgraph L0["success-check"]
subgraph L1["src"]
L2["index.ts"]
subgraph L3["lib"]
L4["lottie-success-check.tsx"]
L5["lottie-success-check.spec.tsx"]
end
end
end
subgraph L6["unauthorized"]
subgraph L7["src"]
L8["index.ts"]
subgraph L9["lib"]
LA["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LB["translations"]
subgraph LC["src"]
LD["index.ts"]
subgraph LE["lib"]
LF["mapApolloErrorToTranslationKey.ts"]
LG["WrapTranslation.tsx"]
end
end
end
subgraph LH["ui"]
subgraph LI["colors"]
subgraph LJ["src"]
LK["index.ts"]
subgraph LL["lib"]
LM["colors.ts"]
end
end
end
subgraph LN["language-components"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["language-components.tsx"]
LS["ltr-text-field.tsx"]
end
end
end
subgraph LT["sizes"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["sizes.ts"]
LY["sizes.spec.tsx"]
LZ["sizes.tsx"]
end
end
end
end
subgraph M0["zustand"]
subgraph M1["shared-auth-store"]
subgraph M2["src"]
M3["index.ts"]
subgraph M4["lib"]
M5["shared-auth-store.ts"]
end
end
end
subgraph M6["shared-notification-store"]
subgraph M7["src"]
M8["index.ts"]
subgraph M9["lib"]
MA["shared-notification-store.tsx"]
end
end
end
subgraph MB["shared-ui-store"]
subgraph MC["src"]
MD["index.ts"]
subgraph ME["lib"]
MF["shared-ui-store.ts"]
MG["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MH["server"]
subgraph MI["controllers"]
subgraph MJ["src"]
MK["index.ts"]
subgraph ML["lib"]
MM["auth.controller.ts"]
MN["order.controller.ts"]
end
end
end
subgraph MO["decorators"]
MP["jest.config.ts"]
subgraph MQ["src"]
MR["index.ts"]
subgraph MS["lib"]
MT["current-user.decorator.ts"]
MU["decorators.ts"]
MV["decorators.spec.ts"]
end
end
end
subgraph MW["entities"]
subgraph MX["src"]
MY["index.ts"]
subgraph MZ["lib"]
N0["brand.entity.ts"]
N1["product.entity.ts"]
N2["category.entity.ts"]
N3["product-description.entity.ts"]
N4["site-language.entity.ts"]
N5["product-info.entity.ts"]
N6["color.entity.ts"]
N7["product-info-color.entity.ts"]
N8["seller-info.entity.ts"]
N9["seller-product.entity.ts"]
NA["user.entity.ts"]
NB["cart.entity.ts"]
NC["currency-preference.entity.ts"]
ND["currency.entity.ts"]
NE["customer.entity.ts"]
NF["exchange-rate.entity.ts"]
NG["order.entity.ts"]
NH["platform-settings.entity.ts"]
NI["refresh-token.entity.ts"]
NJ["seller-order.entity.ts"]
NK["translation.entity.ts"]
end
end
end
subgraph NL["guards"]
NM["jest.config.ts"]
subgraph NN["src"]
NO["index.ts"]
subgraph NP["lib"]
NQ["catalog.guard.ts"]
NR["graphql-auth.guard.ts"]
NS["http-auth.guard.ts"]
NT["roles.guard.ts"]
NU["catalog.guard.spec.ts"]
NV["roles.guard.spec.ts"]
end
end
end
subgraph NW["inputs"]
subgraph NX["src"]
NY["index.ts"]
subgraph NZ["lib"]
O0["brand.input.ts"]
O1["cart.inputs.ts"]
O2["category.input.ts"]
O3["color.input.ts"]
O4["customer-auth.inputs.ts"]
O5["order-pagination.inputs.ts"]
O6["order.inputs.ts"]
O7["product-info-filter.input.ts"]
O8["product.input.ts"]
O9["seller-order-pagination.inputs.ts"]
OA["seller.input.ts"]
OB["site-language.input.ts"]
OC["user.input.ts"]
end
end
end
subgraph OD["modules"]
subgraph OE["src"]
OF["index.ts"]
subgraph OG["lib"]
OH["auth.module.ts"]
OI["email.module.ts"]
OJ["token.module.ts"]
OK["user.module.ts"]
OL["customer-profile.module.ts"]
OM["brand.module.ts"]
ON["catalog-guard.module.ts"]
OO["translation.module.ts"]
OP["cart.module.ts"]
OQ["platform-settings.module.ts"]
OR["category.module.ts"]
OS["product.module.ts"]
OT["color.module.ts"]
OU["currency.module.ts"]
OV["graphql-context.module.ts"]
OW["order.module.ts"]
OX["seller-info.module.ts"]
OY["payment.module.ts"]
OZ["product-info.module.ts"]
P0["seller-products.module.ts"]
P1["site-language.module.ts"]
end
end
end
subgraph P2["resolvers"]
P3["jest.config.ts"]
subgraph P4["src"]
P5["index.ts"]
subgraph P6["lib"]
P7["auth.resolver.ts"]
P8["brand.resolver.ts"]
P9["cart.resolver.ts"]
PA["category.resolver.ts"]
PB["color.resolver.ts"]
PC["currency.resolver.ts"]
PD["customer-profile.resolver.ts"]
PE["order.resolver.ts"]
PF["payment.resolver.ts"]
PG["product-info.resolver.ts"]
PH["product.resolver.ts"]
PI["seller-info.resolver.ts"]
PJ["shipping.resolver.ts"]
PK["site-language.resolver.ts"]
PL["translation.input.ts"]
PM["translation.resolver.ts"]
PN["user.resolver.ts"]
PO["auth.resolver.spec.ts"]
PP["order.resolver.spec.ts"]
PQ["payment.resolver.integration.spec.ts"]
PR["payment.resolver.spec.ts"]
PS["product-info.resolver.spec.ts"]
subgraph PT["types"]
PU["graphql-upload.d.ts"]
end
PV["user.resolver.spec.ts"]
end
end
end
subgraph PW["services"]
PX["jest.config.ts"]
subgraph PY["src"]
PZ["index.ts"]
subgraph Q0["lib"]
Q1["auth.service.ts"]
Q2["brand.service.ts"]
Q3["cart.service.ts"]
Q4["product-info-colors.util.ts"]
Q5["category.service.ts"]
Q6["color.service.ts"]
Q7["currency.service.ts"]
Q8["customer-profile.service.ts"]
Q9["email.service.ts"]
QA["image-upload.service.ts"]
QB["order.service.ts"]
QC["payment-logger.service.ts"]
QD["payment.service.ts"]
QE["product.service.ts"]
QF["seller-info.service.ts"]
QG["shipping-calculation.service.ts"]
QH["site-language.service.ts"]
QI["token.service.ts"]
QJ["translation.service.ts"]
QK["user.service.ts"]
QL["auth.service.spec.ts"]
QM["cart.service.spec.ts"]
QN["order.service.spec.ts"]
QO["product-info-colors.util.spec.ts"]
QP["product.service.pants.spec.ts"]
QQ["product.service.spec.ts"]
QR["relay-connection.spec.ts"]
QS["shipping-calculation.service.spec.ts"]
QT["token.service.spec.ts"]
end
end
end
subgraph QU["strategies"]
subgraph QV["src"]
QW["index.ts"]
subgraph QX["lib"]
QY["local.strategy.ts"]
end
end
end
subgraph QZ["utils"]
subgraph R0["src"]
R1["index.ts"]
subgraph R2["lib"]
R3["email-templates.ts"]
R4["relay-connection.ts"]
R5["pagination.ts"]
end
end
end
end
subgraph R6["shared"]
subgraph R7["codegen"]
R8["jest.config.ts"]
subgraph R9["src"]
RA["index.ts"]
subgraph RB["lib"]
subgraph RC["generated"]
RD["graphql.ts"]
end
end
end
end
subgraph RE["graphql-schema"]
RF["jest.config.ts"]
subgraph RG["src"]
RH["index.ts"]
end
end
subgraph RI["product-sizes"]
subgraph RJ["src"]
RK["index.ts"]
subgraph RL["lib"]
RM["product-sizes.ts"]
RN["product-sizes.pants-formats.spec.ts"]
RO["product-sizes.pants-label.spec.ts"]
RP["product-sizes.pants-strict.spec.ts"]
RQ["product-sizes.spec.ts"]
end
end
end
subgraph RR["shared-i18n"]
subgraph RS["src"]
RT["index.ts"]
subgraph RU["lib"]
RV["language-context.tsx"]
RW["language-detector.ts"]
subgraph RX["locales"]
RY["i18n-react.tsx"]
RZ["i18n-util.ts"]
S0["i18n-util.async.ts"]
subgraph S1["en"]
S2["index.ts"]
end
subgraph S4["fa"]
S5["index.ts"]
end
S6["formatters.ts"]
S7["i18n-types.ts"]
S8["i18n-util.sync.ts"]
S9["navigator-detector.ts"]
end
S3["site-name.ts"]
SA["table-localization.ts"]
SB["theme-provider.tsx"]
SC["use-page-title.ts"]
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
AL-->AB
AN-->AB
AR-->AT
AU-->AT
AX-->AZ
B0-->AZ
B4-->B6
B7-->B6
BB-->BD
BE-->BD
BF-->BD
BJ-->BL
BO-->BQ
BR-->BQ
BV-->BX
C1-->C3
C6-->C8
C9-->C8
C9-->CA
CE-->CG
CH-->CG
CL-->CN
CO-->CN
CS-->CU
CV-->CU
CX-->CZ
D4-->D6
D7-->D6
DA-->DC
DF-->DH
DF-->DI
DH-->DI
DM-->DO
DP-->DO
DS-->DU
DS-->DV
DS-->DW
DS-->DZ
DW-->DX
DX-->DY
DZ-->DU
DZ-->E0
E7-->E9
E9-->EA
ED-->EF
EI-->EK
EI-->EL
EO-->EQ
ET-->EV
EZ-->F1
F2-->F1
F5-->F7
FA-->FC
FC-->FD
FE-->FD
FF-->FD
FG-->FC
FJ-->FL
FM-->FL
FN-->FL
FS-->FU
FV-->FU
FZ-->G1
G4-->G6
GA-->GC
GI-->GK
GI-->GL
GM-->GL
GP-->GR
GS-->GR
GW-->GY
GZ-->GY
H2-->H4
H7-->H9
H7-->HA
H7-->HB
H9-->HA
HC-->H9
HG-->HI
HJ-->HI
HM-->HO
HR-->HT
HU-->HT
HX-->HZ
HZ-->I0
I3-->I5
I5-->I6
I5-->I7
I5-->I8
I5-->I9
I7-->I6
I7-->I8
IA-->IB
IE-->IG
IK-->IM
IN-->IM
IQ-->IS
IV-->IX
IV-->IY
IV-->IZ
IV-->J0
J5-->J7
J5-->J8
J8-->J7
JC-->JE
JE-->JF
JI-->JK
JK-->JL
JO-->JQ
JO-->JS
JO-->JT
JO-->JR
JQ-->JR
JU-->JR
JX-->JZ
JX-->K0
JX-->K1
K1-->K0
K2-->JZ
K5-->K7
K5-->K8
K8-->K7
K9-->K8
KD-->KF
KD-->KG
KG-->KF
KJ-->KL
KP-->KR
KS-->KR
KW-->KY
KZ-->KY
L2-->L4
L5-->L4
L8-->LA
LD-->LF
LK-->LM
LP-->LR
LP-->LS
LV-->LX
LY-->LZ
M3-->M5
M8-->MA
MD-->MF
MK-->MM
MK-->MN
MR-->MT
MR-->MU
MV-->MU
MY-->N0
MY-->NB
MY-->N2
MY-->N6
MY-->NC
MY-->ND
MY-->NE
MY-->NF
MY-->NG
MY-->NH
MY-->N3
MY-->N7
MY-->N5
MY-->N1
MY-->NI
MY-->N8
MY-->NJ
MY-->N9
MY-->N4
MY-->NK
MY-->NA
N0-->N1
N1-->N0
N1-->N2
N1-->N3
N1-->N5
N1-->N8
N1-->N9
N2-->N1
N3-->N1
N3-->N4
N4-->N3
N5-->N6
N5-->N7
N5-->N1
N7-->N6
N7-->N5
N8-->N9
N8-->NA
N9-->N5
N9-->N1
N9-->N8
NB-->N1
NB-->NA
NC-->ND
NE-->NA
NF-->ND
NF-->NA
NG-->N1
NG-->N8
NI-->NA
NJ-->NG
NO-->NQ
NO-->NR
NO-->NS
NO-->NT
NU-->NQ
NV-->NT
NY-->O0
NY-->O1
NY-->O2
NY-->O3
NY-->O4
NY-->O5
NY-->O6
NY-->O7
NY-->O8
NY-->O9
NY-->OA
NY-->OB
NY-->OC
O8-->O7
OF-->OH
OF-->OM
OF-->OP
OF-->ON
OF-->OR
OF-->OT
OF-->OU
OF-->OL
OF-->OI
OF-->OV
OF-->OW
OF-->OY
OF-->OQ
OF-->OZ
OF-->OS
OF-->OX
OF-->P0
OF-->P1
OF-->OJ
OF-->OO
OF-->OK
OH-->OI
OH-->OJ
OH-->OK
OK-->OH
OK-->OL
OM-->ON
OM-->OO
OP-->OQ
OR-->ON
OR-->OS
OR-->OO
OS-->ON
OS-->OJ
OS-->OO
OT-->ON
OT-->OO
OV-->OI
OV-->OJ
OV-->OK
OW-->OQ
OW-->OX
OX-->OS
OX-->OJ
OX-->OK
OY-->OW
OZ-->OS
OZ-->OO
P0-->OX
P0-->OK
P5-->P7
P5-->P8
P5-->P9
P5-->PA
P5-->PB
P5-->PC
P5-->PD
P5-->PE
P5-->PF
P5-->PG
P5-->PH
P5-->PI
P5-->PJ
P5-->PK
P5-->PL
P5-->PM
P5-->PN
PO-->P7
PP-->PE
PQ-->PF
PR-->PF
PS-->PG
PV-->PN
PZ-->Q1
PZ-->Q2
PZ-->Q3
PZ-->Q5
PZ-->Q6
PZ-->Q7
PZ-->Q8
PZ-->Q9
PZ-->QA
PZ-->QB
PZ-->QC
PZ-->QD
PZ-->Q4
PZ-->QE
PZ-->QF
PZ-->QG
PZ-->QH
PZ-->QI
PZ-->QJ
PZ-->QK
Q3-->Q4
QE-->Q4
QF-->Q4
QL-->Q1
QL-->Q9
QL-->QI
QL-->QK
QM-->Q3
QN-->QB
QO-->Q4
QP-->QE
QP-->QJ
QQ-->QE
QQ-->QJ
QS-->QG
QT-->QI
QW-->QY
R1-->R3
R1-->R4
RA-->RD
RK-->RM
RN-->RM
RO-->RM
RP-->RM
RQ-->RM
RT-->RV
RT-->RW
RT-->RY
RT-->S7
RT-->RZ
RT-->S0
RT-->S8
RT-->S9
RT-->S3
RT-->SA
RT-->SB
RT-->SC
RV-->RW
RV-->RY
RV-->S0
RY-->RZ
S0-->S2
S0-->S5
S0-->S6
S0-->RZ
S2-->S3
S5-->S3
S8-->S2
S8-->S5
S8-->S6
S8-->RZ
SA-->RY
SB-->RV
SC-->RY
