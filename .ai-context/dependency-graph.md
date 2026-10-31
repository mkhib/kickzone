flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.spec.ts"]
5["app.module.ts"]
6["cart-inputs.validation.spec.ts"]
7["global-validation-pipe.ts"]
8["global-validation-pipe.spec.ts"]
9["order-inputs.validation.spec.ts"]
A["product-variant-inputs.validation.spec.ts"]
B["seller-product-inputs.validation.spec.ts"]
C["update-order-input.validation.spec.ts"]
end
D["main.ts"]
end
end
end
subgraph E["libs"]
subgraph F["client"]
subgraph G["admins"]
subgraph H["components"]
subgraph I["footer"]
subgraph J["src"]
K["index.ts"]
subgraph L["lib"]
M["admins-footer.tsx"]
N["admins-footer.spec.tsx"]
end
end
end
subgraph O["headerbar"]
subgraph P["src"]
Q["index.ts"]
subgraph R["lib"]
S["AdminsHeaderbar.tsx"]
T["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph U["layout"]
subgraph V["src"]
W["index.ts"]
subgraph X["lib"]
Y["AdminsLayout.tsx"]
Z["AdminsTabbar.tsx"]
10["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph 11["contexts"]
subgraph 12["src"]
13["index.spec.tsx"]
14["index.ts"]
subgraph 15["lib"]
16["AdminsAuthContext.tsx"]
17["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 18["graphql"]
subgraph 19["src"]
1A["index.ts"]
subgraph 1B["lib"]
1C["fragments.ts"]
1D["mutations.ts"]
1E["orders.graphql.ts"]
1F["Provider.tsx"]
1G["AdminsApolloProvider.tsx"]
1H["client.ts"]
1I["queries.ts"]
1J["Provider.spec.tsx"]
1K["apollo-upload-client.d.ts"]
1L["client.spec.tsx"]
1M["fragments.spec.tsx"]
1N["mutations.spec.tsx"]
1O["queries.spec.tsx"]
end
subgraph 1P["types"]
1Q["apollo-upload-client.d.ts"]
end
end
end
subgraph 1R["hooks"]
subgraph 1S["auth"]
subgraph 1T["src"]
1U["index.ts"]
subgraph 1V["lib"]
1W["useAdminLogin.ts"]
1X["useAdminLogin.spec.ts"]
1Y["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1Z["currency-management"]
subgraph 20["src"]
21["index.ts"]
subgraph 22["lib"]
23["useAdminsCurrencyManagement.ts"]
end
end
24["vite.config.ts"]
end
subgraph 25["customers"]
subgraph 26["src"]
27["index.ts"]
subgraph 28["lib"]
29["adminsCustomers.graphql.ts"]
2A["useAdminsCustomers.ts"]
2B["useAdminsCustomers.spec.tsx"]
end
end
2C["vite.config.ts"]
end
subgraph 2D["orders"]
subgraph 2E["src"]
2F["index.ts"]
subgraph 2G["lib"]
2H["admins-orders-hook.tsx"]
2I["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2J["sellers"]
subgraph 2K["src"]
2L["index.ts"]
subgraph 2M["lib"]
2N["useAdminsSellers.ts"]
2O["adminsSellers.graphql.ts"]
2P["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2Q["router"]
subgraph 2R["src"]
2S["index.ts"]
subgraph 2T["lib"]
2U["AdminsRouter.tsx"]
2V["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2W["routes"]
subgraph 2X["src"]
2Y["index.spec.ts"]
2Z["index.ts"]
subgraph 30["lib"]
31["admin-routes.ts"]
32["admin-routes.spec.ts"]
end
end
end
subgraph 33["screens"]
subgraph 34["admin-seller-orders"]
subgraph 35["src"]
36["index.spec.tsx"]
37["index.ts"]
subgraph 38["lib"]
39["admin-seller-orders.tsx"]
3A["admin-seller-orders.pants-size.spec.tsx"]
3B["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 3C["currency-management"]
subgraph 3D["src"]
3E["index.ts"]
subgraph 3F["lib"]
3G["currency-management.tsx"]
3H["currency-management.spec.tsx"]
end
end
end
subgraph 3I["customer-management"]
subgraph 3J["src"]
3K["index.ts"]
subgraph 3L["lib"]
3M["admin-customer-management.tsx"]
3N["admin-customer-management.spec.tsx"]
end
end
3O["vite.config.ts"]
end
subgraph 3P["login"]
subgraph 3Q["src"]
3R["index.ts"]
subgraph 3S["lib"]
3T["AdminsLogin.tsx"]
3U["AdminsLogin.spec.tsx"]
3V["AdminsLogin.zod.spec.tsx"]
end
end
end
subgraph 3W["product-editor"]
subgraph 3X["src"]
3Y["index.spec.tsx"]
3Z["index.ts"]
subgraph 40["lib"]
41["AdminProductEditor.tsx"]
42["AdminProductEditor.pants-range.spec.tsx"]
43["AdminProductEditor.spec.tsx"]
end
44["vite-env.d.ts"]
end
end
subgraph 45["products"]
subgraph 46["src"]
47["index.spec.tsx"]
48["index.ts"]
subgraph 49["lib"]
4A["AdminProducts.tsx"]
4B["adminProducts.hooks.ts"]
4C["adminProducts.graphql.ts"]
4D["ProductImageManagementModal.tsx"]
4E["AdminProducts.spec.tsx"]
4F["ProductImageManagementModal.pants-size.spec.tsx"]
4G["ProductImageManagementModal.spec.tsx"]
end
4H["vite-env.d.ts"]
end
end
subgraph 4I["seller-management"]
subgraph 4J["src"]
4K["index.spec.tsx"]
4L["index.ts"]
subgraph 4M["lib"]
4N["SellerManagement.tsx"]
4O["SellerManagement.spec.tsx"]
end
4P["vite-env.d.ts"]
end
end
subgraph 4Q["translation-management"]
subgraph 4R["src"]
4S["index.ts"]
subgraph 4T["lib"]
4U["AdminTranslationManagement.tsx"]
4V["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4W["unauthorized"]
subgraph 4X["src"]
4Y["index.spec.tsx"]
4Z["index.ts"]
subgraph 50["lib"]
51["admins-unauthorized-screen.tsx"]
52["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 53["zustand"]
subgraph 54["admins-products-store"]
subgraph 55["src"]
56["index.spec.ts"]
57["index.ts"]
subgraph 58["lib"]
59["admins-products-store.ts"]
5A["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 5B["customers"]
subgraph 5C["components"]
subgraph 5D["footer"]
subgraph 5E["src"]
5F["index.ts"]
subgraph 5G["lib"]
5H["customers-footer.tsx"]
5I["TrustBadgeIcons.tsx"]
5J["customers-footer.spec.tsx"]
end
end
end
subgraph 5K["headerbar"]
subgraph 5L["src"]
5M["index.ts"]
subgraph 5N["lib"]
5O["CustomersHeaderbar.tsx"]
5P["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5Q["layout"]
subgraph 5R["src"]
5S["index.ts"]
subgraph 5T["lib"]
5U["CustomersLayout.tsx"]
5V["CustomersTabbar.tsx"]
5W["CustomersLayout.spec.tsx"]
5X["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5Y["product-card"]
subgraph 5Z["src"]
60["index.ts"]
subgraph 61["lib"]
62["CustomersProductCard.tsx"]
63["CustomersProductCard.no-low-stock.spec.tsx"]
64["CustomersProductCard.pants-size.spec.tsx"]
65["CustomersProductCard.spec.tsx"]
end
66["vite-env.d.ts"]
end
end
end
subgraph 67["contexts"]
subgraph 68["auth"]
subgraph 69["src"]
6A["index.ts"]
subgraph 6B["lib"]
6C["CustomersAuthContext.tsx"]
6D["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6E["graphql"]
subgraph 6F["src"]
6G["index.ts"]
subgraph 6H["lib"]
6I["customer-profile.queries.ts"]
6J["mutations.ts"]
6K["Provider.tsx"]
6L["CustomersApolloProvider.tsx"]
6M["client.ts"]
6N["queries.ts"]
6O["apollo-upload-client.d.ts"]
end
end
end
subgraph 6P["hooks"]
subgraph 6Q["auth"]
subgraph 6R["src"]
6S["index.ts"]
subgraph 6T["lib"]
6U["useCustomersForgotPassword.tsx"]
6V["useCustomersLogin.tsx"]
6W["useCustomersRegister.tsx"]
6X["useCustomersResetPassword.tsx"]
6Y["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6Z["cart"]
70["jest.config.ts"]
71["jest.setup.ts"]
subgraph 72["src"]
73["index.ts"]
subgraph 74["lib"]
75["customers-cart-hook.tsx"]
76["useCartService.ts"]
77["useWishlistSync.ts"]
78["useCartService.spec.tsx"]
79["useCartSync.ts"]
end
end
end
subgraph 7A["orders"]
subgraph 7B["src"]
7C["index.ts"]
subgraph 7D["lib"]
7E["customers-orders-hook.tsx"]
end
end
end
subgraph 7F["products"]
subgraph 7G["src"]
7H["index.ts"]
subgraph 7I["lib"]
7J["customers-product-hook.tsx"]
end
end
end
end
subgraph 7K["router"]
subgraph 7L["src"]
7M["index.ts"]
subgraph 7N["lib"]
7O["CustomersRouter.tsx"]
7P["ScrollToTop.tsx"]
7Q["CustomersRouter.spec.tsx"]
7R["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7S["routes"]
subgraph 7T["src"]
7U["index.ts"]
subgraph 7V["lib"]
7W["customer-routes.ts"]
7X["customer-routes.spec.ts"]
end
end
end
subgraph 7Y["screens"]
subgraph 7Z["contact"]
subgraph 80["src"]
81["index.ts"]
subgraph 82["lib"]
83["customer-contact.tsx"]
84["customer-contact.spec.tsx"]
end
end
85["vite.config.ts"]
end
subgraph 86["customer-checkout"]
subgraph 87["src"]
88["index.ts"]
subgraph 89["lib"]
8A["customer-checkout.tsx"]
end
end
end
subgraph 8B["customer-favorites"]
subgraph 8C["src"]
8D["index.ts"]
subgraph 8E["lib"]
8F["customer-favorites.tsx"]
8G["customer-favorites.shared-card.spec.tsx"]
8H["customer-favorites.spec.tsx"]
end
end
8I["vite.config.ts"]
end
subgraph 8J["customer-login"]
subgraph 8K["src"]
8L["index.ts"]
subgraph 8M["lib"]
8N["customer-login.tsx"]
end
end
end
subgraph 8O["customer-order-confirmation"]
subgraph 8P["src"]
8Q["index.ts"]
subgraph 8R["lib"]
8S["customer-order-confirmation.tsx"]
8T["customer-order-confirmation.pants-size.spec.tsx"]
8U["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8V["customer-orders"]
subgraph 8W["src"]
8X["index.ts"]
subgraph 8Y["lib"]
8Z["customer-orders.tsx"]
end
end
end
subgraph 90["customer-payment"]
subgraph 91["src"]
92["index.ts"]
subgraph 93["lib"]
94["customer-payment-callback.tsx"]
95["use-zarinpal-payment.tsx"]
96["zarinpal-payment-service.ts"]
97["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 98["customer-products"]
subgraph 99["src"]
9A["index.ts"]
subgraph 9B["lib"]
9C["customer-products.tsx"]
end
end
end
subgraph 9D["customer-profile"]
subgraph 9E["src"]
9F["index.ts"]
subgraph 9G["lib"]
9H["customer-profile.tsx"]
9I["customer-profile.spec.tsx"]
end
end
end
subgraph 9J["customer-shopping-cart"]
subgraph 9K["src"]
9L["index.ts"]
subgraph 9M["lib"]
9N["customer-shopping-cart.tsx"]
9O["customer-shopping-cart.pants-size.spec.tsx"]
9P["customer-shopping-cart.spec.tsx"]
end
end
9Q["vite.config.ts"]
end
subgraph 9R["customer-signup"]
subgraph 9S["src"]
9T["index.ts"]
subgraph 9U["lib"]
9V["customer-signup.tsx"]
9W["customer-signup.password-length.spec.tsx"]
9X["customer-signup.spec.tsx"]
9Y["customer-signup.zod.spec.tsx"]
end
end
end
subgraph 9Z["forgot-password"]
subgraph A0["src"]
A1["index.ts"]
subgraph A2["lib"]
A3["customer-forgot-password.tsx"]
A4["customer-forgot-password.spec.tsx"]
A5["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A6["guide-authenticity"]
subgraph A7["src"]
A8["index.ts"]
subgraph A9["lib"]
AA["customer-guide-authenticity.tsx"]
AB["customer-guide-authenticity.spec.tsx"]
end
end
AC["vite.config.ts"]
end
subgraph AD["guide-payment"]
subgraph AE["src"]
AF["index.ts"]
subgraph AG["lib"]
AH["customer-guide-payment.tsx"]
AI["customer-guide-payment.spec.tsx"]
end
end
AJ["vite.config.ts"]
end
subgraph AK["home"]
subgraph AL["src"]
AM["index.ts"]
subgraph AN["lib"]
AO["CustomersHomeScreen.tsx"]
subgraph AP["components"]
AQ["CategoryBentoSection.tsx"]
AS["HeroSection.tsx"]
AT["HomeLoadingScreen.tsx"]
AU["PicksRailSection.tsx"]
AV["TrustStripSection.tsx"]
B0["NewArrivalsSection.tsx"]
B3["BrandBlocksSection.tsx"]
B4["NewsletterSection.tsx"]
B5["ShopTheLookSection.tsx"]
B6["TickerSection.tsx"]
end
AR["home-selectors.ts"]
AW["useScrollProgress.ts"]
AX["CustomersShopScreen.tsx"]
AY["CustomersHomeScreen.cart-size.spec.tsx"]
AZ["CustomersHomeScreen.spec.tsx"]
B1["CustomersShopScreen.cart-size.spec.tsx"]
B2["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph B7["login"]
subgraph B8["src"]
B9["index.ts"]
subgraph BA["lib"]
BB["CustomersLoginScreen.tsx"]
BC["CustomersLoginScreen.spec.tsx"]
BD["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BE["not-found"]
subgraph BF["src"]
BG["index.ts"]
subgraph BH["lib"]
BI["customer-not-found.tsx"]
BJ["customer-not-found.spec.tsx"]
end
end
BK["vite.config.ts"]
end
subgraph BL["privacy-policy"]
subgraph BM["src"]
BN["index.ts"]
subgraph BO["lib"]
BP["customer-privacy-policy.tsx"]
BQ["customer-privacy-policy.spec.tsx"]
end
end
BR["vite.config.ts"]
end
subgraph BS["product-details"]
subgraph BT["src"]
BU["index.ts"]
subgraph BV["lib"]
BW["customer-product-details.tsx"]
BX["reviews-flag.ts"]
BY["customer-product-details.guarantee.spec.tsx"]
BZ["customer-product-details.no-low-stock.spec.tsx"]
C0["customer-product-details.pants-size.spec.tsx"]
C1["customer-product-details.reviews-hidden.spec.tsx"]
C2["customer-product-details.spec.tsx"]
end
end
C3["vite.config.ts"]
end
subgraph C4["reset-password"]
subgraph C5["src"]
C6["index.ts"]
subgraph C7["lib"]
C8["customer-reset-password.tsx"]
C9["customer-reset-password.password-length.spec.tsx"]
CA["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CB["shipping-returns"]
subgraph CC["src"]
CD["index.ts"]
subgraph CE["lib"]
CF["customer-shipping-returns.tsx"]
CG["customer-shipping-returns.spec.tsx"]
end
end
CH["vite.config.ts"]
end
subgraph CI["unauthorized"]
subgraph CJ["src"]
CK["index.ts"]
subgraph CL["lib"]
CM["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CN["utility"]
subgraph CO["test"]
subgraph CP["src"]
CQ["index.ts"]
subgraph CR["lib"]
CS["customers-test-utility.tsx"]
end
end
end
end
subgraph CT["validations"]
subgraph CU["src"]
CV["index.ts"]
subgraph CW["lib"]
CX["shipping-validation.ts"]
CY["shipping-validation.spec.tsx"]
CZ["shipping-validation.tsx"]
end
end
end
subgraph D0["zustand"]
subgraph D1["customer-cart-store"]
subgraph D2["src"]
D3["index.ts"]
subgraph D4["lib"]
D5["customer-cart-store.ts"]
D6["customer-cart-store.spec.ts"]
D7["customer-cart-store.tsx"]
end
end
end
subgraph D8["customer-checkout-store"]
subgraph D9["src"]
DA["index.ts"]
subgraph DB["lib"]
DC["customer-checkout-store.ts"]
DD["customer-checkout-store.spec.ts"]
end
end
DE["vite.config.ts"]
end
subgraph DF["customer-wishlist-store"]
subgraph DG["src"]
DH["index.ts"]
subgraph DI["lib"]
DJ["customer-wishlist-store.ts"]
DK["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DL["src"]
DM["index.ts"]
subgraph DN["lib"]
DO["customers-products-store.tsx"]
end
end
end
end
subgraph DP["sellers"]
subgraph DQ["components"]
subgraph DR["footer"]
subgraph DS["src"]
DT["index.ts"]
subgraph DU["lib"]
DV["sellers-footer.tsx"]
DW["sellers-footer.spec.tsx"]
end
end
end
subgraph DX["headerbar"]
subgraph DY["src"]
DZ["index.ts"]
subgraph E0["lib"]
E1["SellersHeaderbar.tsx"]
end
end
end
subgraph E2["layout"]
subgraph E3["src"]
E4["index.ts"]
subgraph E5["lib"]
E6["SellersLayout.tsx"]
E7["SellersTabbar.tsx"]
end
end
end
end
subgraph E8["contexts"]
subgraph E9["auth"]
subgraph EA["src"]
EB["index.ts"]
subgraph EC["lib"]
ED["SellersAuthContext.tsx"]
EE["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EF["graphql"]
subgraph EG["src"]
EH["index.ts"]
subgraph EI["lib"]
EJ["fragments.ts"]
EK["mutations.ts"]
EL["Provider.tsx"]
EM["SellersApolloProvider.tsx"]
EN["client.ts"]
EO["queries.ts"]
EP["seller-orders.graphql.ts"]
EQ["apollo-upload-client.d.ts"]
end
subgraph ER["types"]
ES["apollo-upload-client.d.ts"]
end
end
end
subgraph ET["hooks"]
subgraph EU["auth"]
subgraph EV["src"]
EW["index.ts"]
subgraph EX["lib"]
EY["useSellerAuth.ts"]
EZ["sellerAuth.graphql.ts"]
end
end
end
subgraph F0["orders"]
subgraph F1["src"]
F2["index.ts"]
subgraph F3["lib"]
F4["useSellerOrders.ts"]
F5["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph F6["products"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["useSellersProductManagement.ts"]
FB["useSellersProducts.ts"]
end
end
end
end
subgraph FC["router"]
subgraph FD["src"]
FE["index.ts"]
subgraph FF["lib"]
FG["SellersRouter.tsx"]
end
end
end
subgraph FH["routes"]
subgraph FI["src"]
FJ["index.ts"]
subgraph FK["lib"]
FL["seller-routes.ts"]
end
end
end
subgraph FM["screens"]
subgraph FN["catalog"]
subgraph FO["src"]
FP["index.ts"]
subgraph FQ["lib"]
FR["SellersCatalogScreens.tsx"]
FS["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FT["login"]
subgraph FU["src"]
FV["index.ts"]
subgraph FW["lib"]
FX["SellersLogin.tsx"]
FY["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph FZ["manage-product"]
subgraph G0["src"]
G1["index.ts"]
subgraph G2["lib"]
G3["SellersManageProductScreen.tsx"]
G4["SellersDefineProductFlow.tsx"]
G5["SellersDefineProductFlow.pants-label.spec.tsx"]
G6["SellersDefineProductFlow.spec.tsx"]
G7["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph G8["products"]
subgraph G9["src"]
GA["index.ts"]
subgraph GB["lib"]
GC["SellersProducts.tsx"]
GD["SellersProducts.pants-label.spec.tsx"]
GE["SellersProducts.spec.tsx"]
end
end
end
subgraph GF["seller-orders"]
GG["jest.config.ts"]
GH["jest.setup.ts"]
subgraph GI["src"]
GJ["index.ts"]
subgraph GK["lib"]
GL["seller-orders-screen.tsx"]
GM["seller-status-transitions.ts"]
GN["seller-orders-screen.pants-size.spec.tsx"]
GO["seller-orders-screen.spec.tsx"]
GP["seller-status-transitions.spec.ts"]
end
GQ["test-setup.ts"]
end
end
subgraph GR["setup-password"]
subgraph GS["src"]
GT["index.ts"]
subgraph GU["lib"]
GV["SellersSetupPassword.tsx"]
GW["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GX["unauthorized"]
subgraph GY["src"]
GZ["index.ts"]
subgraph H0["lib"]
H1["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H2["zustand"]
subgraph H3["sellers-products-store"]
subgraph H4["src"]
H5["index.ts"]
subgraph H6["lib"]
H7["useSellersProductsStore.ts"]
H8["sellers-products-store.tsx"]
end
end
end
end
end
subgraph H9["shared"]
subgraph HA["components"]
subgraph HB["apollo-provider-base"]
subgraph HC["src"]
HD["index.ts"]
subgraph HE["lib"]
HF["ApolloProviderBase.tsx"]
HG["createSilentRefreshAuthLink.ts"]
HH["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HI["error-boundary"]
subgraph HJ["src"]
HK["index.ts"]
subgraph HL["lib"]
HM["error-boundary.tsx"]
HN["error-boundary.spec.tsx"]
end
end
HO["vite.config.ts"]
end
subgraph HP["glassmorphism-container"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["glassmorphism-container.tsx"]
HU["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HV["layout"]
subgraph HW["src"]
HX["index.ts"]
subgraph HY["lib"]
HZ["Layout.tsx"]
end
end
end
subgraph I0["material-data-table"]
subgraph I1["src"]
I2["index.ts"]
subgraph I3["lib"]
I4["material-data-table.tsx"]
I5["table-config.ts"]
I6["table-utils.ts"]
I7["material-data-table.spec.tsx"]
I8["table-types.ts"]
end
end
end
subgraph I9["order-status-chip"]
subgraph IA["src"]
IB["index.ts"]
subgraph IC["lib"]
ID["order-status-chip.tsx"]
IE["order-status-chip.spec.tsx"]
end
end
end
subgraph IF["password-field"]
subgraph IG["src"]
IH["index.ts"]
subgraph II["lib"]
IJ["PasswordTextField.tsx"]
end
end
end
subgraph IK["price-display"]
subgraph IL["src"]
IM["index.ts"]
subgraph IN["lib"]
IO["price-display.tsx"]
IP["price-display.spec.tsx"]
end
end
end
subgraph IQ["private-route"]
subgraph IR["src"]
IS["index.ts"]
subgraph IT["lib"]
IU["createPrivateRoute.tsx"]
IV["PrivateRoute.tsx"]
end
end
end
subgraph IW["rtl-table-utils"]
subgraph IX["src"]
IY["index.ts"]
subgraph IZ["lib"]
J0["rtl-table-utils.ts"]
J1["rtl-cell-components.tsx"]
J2["rtl-column-helpers.ts"]
J3["rtl-table-props.ts"]
J4["use-table-alignment.ts"]
J5["rtl-table-utils.spec.tsx"]
J6["rtl-table-utils.tsx"]
end
end
end
subgraph J7["snackbar"]
subgraph J8["src"]
J9["index.ts"]
subgraph JA["lib"]
JB["snackbar.tsx"]
JC["Snackbar.tsx"]
end
end
end
subgraph JD["styled-drawer"]
subgraph JE["src"]
JF["index.ts"]
subgraph JG["lib"]
JH["styled-drawer.tsx"]
JI["styled-drawer.spec.tsx"]
end
end
end
subgraph JJ["unauthorized"]
subgraph JK["src"]
JL["index.ts"]
subgraph JM["lib"]
JN["unauthorized-path.tsx"]
end
end
end
end
subgraph JO["graphql"]
subgraph JP["src"]
JQ["index.ts"]
subgraph JR["lib"]
JS["currency.mutations.ts"]
JT["currency.queries.ts"]
JU["fragments.ts"]
JV["variant-colors.ts"]
JW["client-shared-graphql.tsx"]
end
end
end
subgraph JX["hooks"]
subgraph JY["brands"]
subgraph JZ["src"]
K0["index.ts"]
subgraph K1["lib"]
K2["brands.graphql.ts"]
K3["useBrands.ts"]
end
end
K4["vite.config.ts"]
end
subgraph K5["categories"]
subgraph K6["src"]
K7["index.ts"]
subgraph K8["lib"]
K9["useCategories.ts"]
KA["categories.graphql.ts"]
end
end
end
subgraph KB["colors"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["useColors.ts"]
KG["color.graphql.ts"]
end
end
end
subgraph KH["currency"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["useConvertPrice.tsx"]
KM["useExchangeRate.tsx"]
KN["useCurrencies.tsx"]
KO["useCurrencyForLocale.tsx"]
KP["useExchangeRate.spec.tsx"]
end
end
end
subgraph KQ["products"]
subgraph KR["src"]
KS["index.ts"]
subgraph KT["lib"]
KU["productImage.ts"]
KV["products.graphql.ts"]
KW["useProducts.ts"]
KX["productImage.spec.ts"]
end
end
end
subgraph KY["site-languages"]
subgraph KZ["src"]
L0["index.ts"]
subgraph L1["lib"]
L2["site-languages.graphql.ts"]
L3["useSiteLanguages.ts"]
L4["site-languages-hook.spec.tsx"]
end
end
L5["vite.config.ts"]
end
subgraph L6["snackbar"]
subgraph L7["src"]
L8["index.ts"]
subgraph L9["lib"]
LA["SnackbarContext.tsx"]
LB["useSnackbar.ts"]
end
end
end
subgraph LC["translations-management-hook"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["useTranslationsManagement.ts"]
end
end
end
end
subgraph LH["lottie"]
subgraph LI["empty-cart"]
subgraph LJ["src"]
LK["index.ts"]
subgraph LL["lib"]
LM["lottie-empty-cart.tsx"]
LN["lottie-empty-cart.spec.tsx"]
end
end
LO["vite.config.ts"]
end
subgraph LP["loading"]
subgraph LQ["src"]
LR["index.ts"]
subgraph LS["lib"]
LT["lottie-loading.tsx"]
LU["lottie-loading.spec.tsx"]
end
end
end
subgraph LV["success-check"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["lottie-success-check.tsx"]
M0["lottie-success-check.spec.tsx"]
end
end
end
subgraph M1["unauthorized"]
subgraph M2["src"]
M3["index.ts"]
subgraph M4["lib"]
M5["lottie-unauthorized.tsx"]
end
end
end
end
subgraph M6["translations"]
subgraph M7["src"]
M8["index.ts"]
subgraph M9["lib"]
MA["mapApolloErrorToTranslationKey.ts"]
MB["WrapTranslation.tsx"]
end
end
end
subgraph MC["ui"]
subgraph MD["colors"]
subgraph ME["src"]
MF["index.ts"]
subgraph MG["lib"]
MH["colors.ts"]
end
end
end
subgraph MI["language-components"]
subgraph MJ["src"]
MK["index.ts"]
subgraph ML["lib"]
MM["language-components.tsx"]
MN["ltr-text-field.tsx"]
end
end
end
subgraph MO["sizes"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["sizes.ts"]
MT["sizes.spec.tsx"]
MU["sizes.tsx"]
end
end
end
end
subgraph MV["zustand"]
subgraph MW["shared-auth-store"]
subgraph MX["src"]
MY["index.ts"]
subgraph MZ["lib"]
N0["shared-auth-store.ts"]
end
end
end
subgraph N1["shared-notification-store"]
subgraph N2["src"]
N3["index.ts"]
subgraph N4["lib"]
N5["shared-notification-store.tsx"]
end
end
end
subgraph N6["shared-ui-store"]
subgraph N7["src"]
N8["index.ts"]
subgraph N9["lib"]
NA["shared-ui-store.ts"]
NB["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NC["server"]
subgraph ND["controllers"]
subgraph NE["src"]
NF["index.ts"]
subgraph NG["lib"]
NH["auth.controller.ts"]
NI["order.controller.ts"]
end
end
end
subgraph NJ["decorators"]
NK["jest.config.ts"]
subgraph NL["src"]
NM["index.ts"]
subgraph NN["lib"]
NO["current-user.decorator.ts"]
NP["decorators.ts"]
NQ["decorators.spec.ts"]
end
end
end
subgraph NR["entities"]
subgraph NS["src"]
NT["index.ts"]
subgraph NU["lib"]
NV["brand.entity.ts"]
NW["product.entity.ts"]
NX["category.entity.ts"]
NY["product-description.entity.ts"]
NZ["site-language.entity.ts"]
O0["product-info.entity.ts"]
O1["color.entity.ts"]
O2["product-info-color.entity.ts"]
O3["seller-info.entity.ts"]
O4["seller-product.entity.ts"]
O5["user.entity.ts"]
O6["cart.entity.ts"]
O7["currency-preference.entity.ts"]
O8["currency.entity.ts"]
O9["customer.entity.ts"]
OA["exchange-rate.entity.ts"]
OB["order.entity.ts"]
OC["platform-settings.entity.ts"]
OD["refresh-token.entity.ts"]
OE["seller-order.entity.ts"]
OF["translation.entity.ts"]
end
end
end
subgraph OG["guards"]
OH["jest.config.ts"]
subgraph OI["src"]
OJ["index.ts"]
subgraph OK["lib"]
OL["catalog.guard.ts"]
OM["graphql-auth.guard.ts"]
ON["http-auth.guard.ts"]
OO["roles.guard.ts"]
OP["catalog.guard.spec.ts"]
OQ["roles.guard.spec.ts"]
end
end
end
subgraph OR["inputs"]
subgraph OS["src"]
OT["index.ts"]
subgraph OU["lib"]
OV["brand.input.ts"]
OW["cart.inputs.ts"]
OX["category.input.ts"]
OY["color.input.ts"]
OZ["customer-auth.inputs.ts"]
P0["order-pagination.inputs.ts"]
P1["order.inputs.ts"]
P2["product-info-filter.input.ts"]
P3["product.input.ts"]
P4["seller-order-pagination.inputs.ts"]
P5["seller.input.ts"]
P6["site-language.input.ts"]
P7["user.input.ts"]
end
end
end
subgraph P8["modules"]
subgraph P9["src"]
PA["index.ts"]
subgraph PB["lib"]
PC["auth.module.ts"]
PD["email.module.ts"]
PE["token.module.ts"]
PF["user.module.ts"]
PG["customer-profile.module.ts"]
PH["brand.module.ts"]
PI["catalog-guard.module.ts"]
PJ["translation.module.ts"]
PK["cart.module.ts"]
PL["platform-settings.module.ts"]
PM["category.module.ts"]
PN["product.module.ts"]
PO["color.module.ts"]
PP["currency.module.ts"]
PQ["graphql-context.module.ts"]
PR["order.module.ts"]
PS["seller-info.module.ts"]
PT["payment.module.ts"]
PU["product-info.module.ts"]
PV["seller-products.module.ts"]
PW["site-language.module.ts"]
end
end
end
subgraph PX["resolvers"]
PY["jest.config.ts"]
subgraph PZ["src"]
Q0["index.ts"]
subgraph Q1["lib"]
Q2["auth.resolver.ts"]
Q3["zod-validation.pipe.ts"]
Q4["brand.resolver.ts"]
Q5["cart.resolver.ts"]
Q6["category.resolver.ts"]
Q7["color.resolver.ts"]
Q8["currency.resolver.ts"]
Q9["customer-profile.resolver.ts"]
QA["order.resolver.ts"]
QB["payment.resolver.ts"]
QC["product-info.resolver.ts"]
QD["product.resolver.ts"]
QE["seller-info.resolver.ts"]
QF["shipping.resolver.ts"]
QG["site-language.resolver.ts"]
QH["translation.input.ts"]
QI["translation.resolver.ts"]
QJ["user.resolver.ts"]
QK["auth-validation.spec.ts"]
QL["auth.resolver.spec.ts"]
QM["cart-validation.spec.ts"]
QN["order.resolver.spec.ts"]
QO["order.resolver.status-transitions.spec.ts"]
QP["order.resolver.tracking.spec.ts"]
QQ["payment.resolver.integration.spec.ts"]
QR["payment.resolver.spec.ts"]
QS["product-info.resolver.spec.ts"]
QT["translation.resolver.guards.spec.ts"]
subgraph QU["types"]
QV["graphql-upload.d.ts"]
end
QW["user.resolver.spec.ts"]
QX["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QY["services"]
QZ["jest.config.ts"]
subgraph R0["src"]
R1["index.ts"]
subgraph R2["lib"]
R3["auth.service.ts"]
R4["brand.service.ts"]
R5["cart.service.ts"]
R6["product-info-colors.util.ts"]
R7["category.service.ts"]
R8["color.service.ts"]
R9["currency.service.ts"]
RA["customer-profile.service.ts"]
RB["email.service.ts"]
RC["image-upload.service.ts"]
RD["order.service.ts"]
RE["payment-logger.service.ts"]
RF["payment.service.ts"]
RG["product.service.ts"]
RH["seller-info.service.ts"]
RI["shipping-calculation.service.ts"]
RJ["site-language.service.ts"]
RK["token.service.ts"]
RL["translation.service.ts"]
RM["user.service.ts"]
RN["auth.service.password-policy.spec.ts"]
RO["auth.service.spec.ts"]
RP["cart.service.add-quantity.spec.ts"]
RQ["cart.service.null-relations.spec.ts"]
RR["cart.service.spec.ts"]
RS["order.service.spec.ts"]
RT["order.service.tracking.spec.ts"]
RU["product-info-colors.util.spec.ts"]
RV["product.service.multi-filters.spec.ts"]
RW["product.service.only-discounted.spec.ts"]
RX["product.service.pants.spec.ts"]
RY["product.service.spec.ts"]
RZ["relay-connection.spec.ts"]
S0["seller-info.service.price-validation.spec.ts"]
S1["shipping-calculation.service.spec.ts"]
S2["token.service.spec.ts"]
end
end
end
subgraph S3["strategies"]
subgraph S4["src"]
S5["index.ts"]
subgraph S6["lib"]
S7["local.strategy.ts"]
end
end
end
subgraph S8["utils"]
subgraph S9["src"]
SA["index.ts"]
subgraph SB["lib"]
SC["email-templates.ts"]
SD["relay-connection.ts"]
SE["pagination.ts"]
end
end
end
end
subgraph SF["shared"]
subgraph SG["codegen"]
SH["jest.config.ts"]
subgraph SI["src"]
SJ["index.ts"]
subgraph SK["lib"]
subgraph SL["generated"]
SM["graphql.ts"]
end
end
end
end
subgraph SN["graphql-schema"]
SO["jest.config.ts"]
subgraph SP["src"]
SQ["index.ts"]
end
end
subgraph SR["product-sizes"]
subgraph SS["src"]
ST["index.ts"]
subgraph SU["lib"]
SV["product-sizes.ts"]
SW["product-sizes.pants-formats.spec.ts"]
SX["product-sizes.pants-label.spec.ts"]
SY["product-sizes.pants-strict.spec.ts"]
SZ["product-sizes.spec.ts"]
end
end
end
subgraph T0["shared-i18n"]
subgraph T1["src"]
T2["index.ts"]
subgraph T3["lib"]
T4["language-context.tsx"]
T5["language-detector.ts"]
subgraph T6["locales"]
T7["i18n-react.tsx"]
T8["i18n-util.ts"]
T9["i18n-util.async.ts"]
subgraph TA["en"]
TB["index.ts"]
end
subgraph TD["fa"]
TE["index.ts"]
end
TF["formatters.ts"]
TG["i18n-types.ts"]
TH["i18n-util.sync.ts"]
TI["navigator-detector.ts"]
end
TC["site-name.ts"]
TJ["table-localization.ts"]
TK["theme-provider.tsx"]
TL["use-page-title.ts"]
end
end
end
subgraph TM["validation"]
subgraph TN["src"]
TO["index.ts"]
subgraph TP["lib"]
TQ["auth.ts"]
TR["limits.ts"]
TS["primitives.ts"]
TT["auth-forms.ts"]
TU["cart.ts"]
TV["errors.ts"]
TW["auth-forms.admin.spec.ts"]
TX["auth-forms.login.spec.ts"]
TY["auth-forms.recovery.spec.ts"]
TZ["auth-forms.seller.spec.ts"]
U0["auth-forms.spec.ts"]
U1["auth.spec.ts"]
U2["cart.spec.ts"]
U3["errors.spec.ts"]
U4["primitives.spec.ts"]
end
end
end
end
end
4-->5
6-->7
8-->7
9-->7
A-->7
B-->7
C-->7
D-->5
D-->7
K-->M
N-->M
Q-->S
T-->S
W-->Y
W-->Z
Y-->Z
10-->Y
13-->14
14-->16
17-->16
1A-->1C
1A-->1D
1A-->1E
1A-->1F
1A-->1I
1F-->1G
1G-->1H
1I-->1C
1J-->1G
1J-->1F
1L-->1H
1M-->1C
1N-->1D
1O-->1I
1U-->1W
1X-->1W
1Y-->1W
21-->23
27-->29
27-->2A
2A-->29
2B-->2A
2F-->2H
2I-->2H
2L-->2N
2N-->2O
2P-->2N
2S-->2U
2V-->2U
2Y-->2Z
2Z-->31
32-->31
36-->37
37-->39
3A-->39
3B-->39
3E-->3G
3H-->3G
3K-->3M
3N-->3M
3R-->3T
3U-->3T
3V-->3T
3Y-->3Z
3Z-->41
42-->41
43-->41
47-->48
48-->4A
4A-->4B
4A-->4D
4B-->4C
4E-->4A
4F-->4D
4K-->4L
4L-->4N
4O-->4N
4S-->4U
4U-->4V
4Y-->4Z
4Z-->51
52-->51
56-->57
57-->59
5A-->59
5F-->5H
5F-->5I
5H-->5I
5J-->5H
5M-->5O
5P-->5O
5S-->5U
5S-->5V
5U-->5V
5W-->5U
5X-->5V
60-->62
63-->62
64-->62
65-->62
6A-->6C
6D-->6C
6G-->6I
6G-->6J
6G-->6K
6G-->6N
6K-->6L
6L-->6M
6S-->6U
6S-->6V
6S-->6W
6S-->6X
6Y-->6V
73-->75
73-->76
73-->77
78-->76
79-->75
7C-->7E
7H-->7J
7M-->7O
7M-->7P
7O-->7P
7Q-->7O
7R-->7P
7U-->7W
7X-->7W
81-->83
84-->83
88-->8A
8D-->8F
8G-->8F
8H-->8F
8L-->8N
8Q-->8S
8T-->8S
8U-->8S
8X-->8Z
92-->94
92-->95
92-->96
94-->95
95-->96
97-->94
9A-->9C
9F-->9H
9I-->9H
9L-->9N
9O-->9N
9P-->9N
9T-->9V
9W-->9V
9X-->9V
9Y-->9V
A1-->A3
A4-->A3
A5-->A3
A8-->AA
AB-->AA
AF-->AH
AI-->AH
AM-->AO
AM-->AX
AM-->AR
AM-->AW
AO-->AQ
AO-->AS
AO-->AT
AO-->AU
AO-->AV
AO-->AR
AO-->AW
AQ-->AR
AX-->AR
AY-->AU
AY-->AO
AY-->AR
AZ-->B0
AZ-->AU
AZ-->AO
AZ-->AX
AZ-->AR
B1-->AX
B2-->AX
B3-->AR
B5-->AR
B9-->BB
BC-->BB
BD-->BB
BG-->BI
BJ-->BI
BN-->BP
BQ-->BP
BU-->BW
BW-->BX
BY-->BW
BZ-->BW
C0-->BW
C1-->BW
C2-->BW
C6-->C8
C9-->C8
CA-->C8
CD-->CF
CG-->CF
CK-->CM
CQ-->CS
CV-->CX
CY-->CX
CY-->CZ
D3-->D5
D6-->D5
DA-->DC
DD-->DC
DH-->DJ
DK-->DJ
DM-->DO
DT-->DV
DW-->DV
DZ-->E1
E4-->E6
E4-->E7
E6-->E7
EB-->ED
EE-->ED
EH-->EJ
EH-->EK
EH-->EL
EH-->EO
EL-->EM
EM-->EN
EO-->EJ
EO-->EP
EW-->EY
EY-->EZ
F2-->F4
F8-->FA
F8-->FB
FE-->FG
FJ-->FL
FP-->FR
FS-->FR
FV-->FX
FY-->FX
G1-->G3
G3-->G4
G5-->G4
G6-->G4
G7-->G3
GA-->GC
GD-->GC
GE-->GC
GJ-->GL
GL-->GM
GN-->GL
GO-->GL
GP-->GM
GT-->GV
GW-->GV
GZ-->H1
H5-->H7
HD-->HF
HD-->HG
HH-->HG
HK-->HM
HN-->HM
HR-->HT
HU-->HT
HX-->HZ
I2-->I4
I2-->I5
I2-->I6
I4-->I5
I7-->I4
IB-->ID
IE-->ID
IH-->IJ
IM-->IO
IP-->IO
IS-->IU
IU-->IV
IY-->J0
J0-->J1
J0-->J2
J0-->J3
J0-->J4
J2-->J1
J2-->J3
J5-->J6
J9-->JB
JF-->JH
JI-->JH
JL-->JN
JQ-->JS
JQ-->JT
JQ-->JU
JQ-->JV
K0-->K2
K0-->K3
K3-->K2
K7-->K9
K9-->KA
KD-->KF
KF-->KG
KJ-->KL
KJ-->KN
KJ-->KO
KJ-->KM
KL-->KM
KP-->KM
KS-->KU
KS-->KV
KS-->KW
KW-->KV
KX-->KU
L0-->L2
L0-->L3
L3-->L2
L4-->L3
L8-->LA
L8-->LB
LB-->LA
LE-->LG
LK-->LM
LN-->LM
LR-->LT
LU-->LT
LX-->LZ
M0-->LZ
M3-->M5
M8-->MA
MF-->MH
MK-->MM
MK-->MN
MQ-->MS
MT-->MU
MY-->N0
N3-->N5
N8-->NA
NF-->NH
NF-->NI
NM-->NO
NM-->NP
NQ-->NP
NT-->NV
NT-->O6
NT-->NX
NT-->O1
NT-->O7
NT-->O8
NT-->O9
NT-->OA
NT-->OB
NT-->OC
NT-->NY
NT-->O2
NT-->O0
NT-->NW
NT-->OD
NT-->O3
NT-->OE
NT-->O4
NT-->NZ
NT-->OF
NT-->O5
NV-->NW
NW-->NV
NW-->NX
NW-->NY
NW-->O0
NW-->O3
NW-->O4
NX-->NW
NY-->NW
NY-->NZ
NZ-->NY
O0-->O1
O0-->O2
O0-->NW
O2-->O1
O2-->O0
O3-->O4
O3-->O5
O4-->O0
O4-->NW
O4-->O3
O6-->NW
O6-->O5
O7-->O8
O9-->O5
OA-->O8
OA-->O5
OB-->NW
OB-->O3
OD-->O5
OE-->OB
OJ-->OL
OJ-->OM
OJ-->ON
OJ-->OO
OP-->OL
OQ-->OO
OT-->OV
OT-->OW
OT-->OX
OT-->OY
OT-->OZ
OT-->P0
OT-->P1
OT-->P2
OT-->P3
OT-->P4
OT-->P5
OT-->P6
OT-->P7
P3-->P2
PA-->PC
PA-->PH
PA-->PK
PA-->PI
PA-->PM
PA-->PO
PA-->PP
PA-->PG
PA-->PD
PA-->PQ
PA-->PR
PA-->PT
PA-->PL
PA-->PU
PA-->PN
PA-->PS
PA-->PV
PA-->PW
PA-->PE
PA-->PJ
PA-->PF
PC-->PD
PC-->PE
PC-->PF
PF-->PC
PF-->PG
PH-->PI
PH-->PJ
PK-->PL
PM-->PI
PM-->PN
PM-->PJ
PN-->PI
PN-->PE
PN-->PJ
PO-->PI
PO-->PJ
PQ-->PD
PQ-->PE
PQ-->PF
PR-->PL
PR-->PS
PS-->PN
PS-->PE
PS-->PF
PT-->PP
PT-->PR
PU-->PN
PU-->PJ
PV-->PS
PV-->PF
Q0-->Q2
Q0-->Q4
Q0-->Q5
Q0-->Q6
Q0-->Q7
Q0-->Q8
Q0-->Q9
Q0-->QA
Q0-->QB
Q0-->QC
Q0-->QD
Q0-->QE
Q0-->QF
Q0-->QG
Q0-->QH
Q0-->QI
Q0-->QJ
Q0-->Q3
Q2-->Q3
Q5-->Q3
QJ-->Q3
QK-->Q2
QK-->QJ
QK-->Q3
QL-->Q2
QM-->Q5
QM-->Q3
QN-->QA
QO-->QA
QP-->QA
QQ-->QB
QR-->QB
QS-->QC
QT-->QI
QW-->QJ
QX-->Q3
R1-->R3
R1-->R4
R1-->R5
R1-->R7
R1-->R8
R1-->R9
R1-->RA
R1-->RB
R1-->RC
R1-->RD
R1-->RE
R1-->RF
R1-->R6
R1-->RG
R1-->RH
R1-->RI
R1-->RJ
R1-->RK
R1-->RL
R1-->RM
R5-->R6
RG-->R6
RH-->R6
RN-->R3
RN-->RB
RN-->RK
RN-->RM
RO-->R3
RO-->RB
RO-->RK
RO-->RM
RP-->R5
RQ-->R5
RR-->R5
RS-->RD
RT-->RD
RU-->R6
RV-->RG
RV-->RL
RW-->RG
RW-->RL
RX-->RG
RX-->RL
RY-->RG
RY-->RL
S0-->R3
S0-->RH
S1-->RI
S2-->RK
S5-->S7
SA-->SC
SA-->SD
SJ-->SM
ST-->SV
SW-->SV
SX-->SV
SY-->SV
SZ-->SV
T2-->T4
T2-->T5
T2-->T7
T2-->TG
T2-->T8
T2-->T9
T2-->TH
T2-->TI
T2-->TC
T2-->TJ
T2-->TK
T2-->TL
T4-->T5
T4-->T7
T4-->T9
T7-->T8
T9-->TB
T9-->TE
T9-->TF
T9-->T8
TB-->TC
TE-->TC
TH-->TB
TH-->TE
TH-->TF
TH-->T8
TJ-->T7
TK-->T4
TL-->T7
TO-->TQ
TO-->TT
TO-->TU
TO-->TV
TO-->TR
TO-->TS
TQ-->TR
TQ-->TS
TS-->TR
TT-->TQ
TU-->TS
TW-->TT
TX-->TT
TY-->TT
TZ-->TT
U0-->TT
U1-->TQ
U2-->TU
U3-->TV
U4-->TR
U4-->TS
