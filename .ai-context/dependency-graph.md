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
CY["shipping-validation.shared.spec.ts"]
CZ["shipping-validation.spec.tsx"]
D0["shipping-validation.tsx"]
end
end
end
subgraph D1["zustand"]
subgraph D2["customer-cart-store"]
subgraph D3["src"]
D4["index.ts"]
subgraph D5["lib"]
D6["customer-cart-store.ts"]
D7["customer-cart-store.spec.ts"]
D8["customer-cart-store.tsx"]
end
end
end
subgraph D9["customer-checkout-store"]
subgraph DA["src"]
DB["index.ts"]
subgraph DC["lib"]
DD["customer-checkout-store.ts"]
DE["customer-checkout-store.spec.ts"]
end
end
DF["vite.config.ts"]
end
subgraph DG["customer-wishlist-store"]
subgraph DH["src"]
DI["index.ts"]
subgraph DJ["lib"]
DK["customer-wishlist-store.ts"]
DL["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DM["src"]
DN["index.ts"]
subgraph DO["lib"]
DP["customers-products-store.tsx"]
end
end
end
end
subgraph DQ["sellers"]
subgraph DR["components"]
subgraph DS["footer"]
subgraph DT["src"]
DU["index.ts"]
subgraph DV["lib"]
DW["sellers-footer.tsx"]
DX["sellers-footer.spec.tsx"]
end
end
end
subgraph DY["headerbar"]
subgraph DZ["src"]
E0["index.ts"]
subgraph E1["lib"]
E2["SellersHeaderbar.tsx"]
end
end
end
subgraph E3["layout"]
subgraph E4["src"]
E5["index.ts"]
subgraph E6["lib"]
E7["SellersLayout.tsx"]
E8["SellersTabbar.tsx"]
end
end
end
end
subgraph E9["contexts"]
subgraph EA["auth"]
subgraph EB["src"]
EC["index.ts"]
subgraph ED["lib"]
EE["SellersAuthContext.tsx"]
EF["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EG["graphql"]
subgraph EH["src"]
EI["index.ts"]
subgraph EJ["lib"]
EK["fragments.ts"]
EL["mutations.ts"]
EM["Provider.tsx"]
EN["SellersApolloProvider.tsx"]
EO["client.ts"]
EP["queries.ts"]
EQ["seller-orders.graphql.ts"]
ER["apollo-upload-client.d.ts"]
end
subgraph ES["types"]
ET["apollo-upload-client.d.ts"]
end
end
end
subgraph EU["hooks"]
subgraph EV["auth"]
subgraph EW["src"]
EX["index.ts"]
subgraph EY["lib"]
EZ["useSellerAuth.ts"]
F0["sellerAuth.graphql.ts"]
end
end
end
subgraph F1["orders"]
subgraph F2["src"]
F3["index.ts"]
subgraph F4["lib"]
F5["useSellerOrders.ts"]
F6["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph F7["products"]
subgraph F8["src"]
F9["index.ts"]
subgraph FA["lib"]
FB["useSellersProductManagement.ts"]
FC["useSellersProducts.ts"]
end
end
end
end
subgraph FD["router"]
subgraph FE["src"]
FF["index.ts"]
subgraph FG["lib"]
FH["SellersRouter.tsx"]
end
end
end
subgraph FI["routes"]
subgraph FJ["src"]
FK["index.ts"]
subgraph FL["lib"]
FM["seller-routes.ts"]
end
end
end
subgraph FN["screens"]
subgraph FO["catalog"]
subgraph FP["src"]
FQ["index.ts"]
subgraph FR["lib"]
FS["SellersCatalogScreens.tsx"]
FT["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FU["login"]
subgraph FV["src"]
FW["index.ts"]
subgraph FX["lib"]
FY["SellersLogin.tsx"]
FZ["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G0["manage-product"]
subgraph G1["src"]
G2["index.ts"]
subgraph G3["lib"]
G4["SellersManageProductScreen.tsx"]
G5["SellersDefineProductFlow.tsx"]
G6["SellersDefineProductFlow.pants-label.spec.tsx"]
G7["SellersDefineProductFlow.spec.tsx"]
G8["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph G9["products"]
subgraph GA["src"]
GB["index.ts"]
subgraph GC["lib"]
GD["SellersProducts.tsx"]
GE["SellersProducts.pants-label.spec.tsx"]
GF["SellersProducts.spec.tsx"]
end
end
end
subgraph GG["seller-orders"]
GH["jest.config.ts"]
GI["jest.setup.ts"]
subgraph GJ["src"]
GK["index.ts"]
subgraph GL["lib"]
GM["seller-orders-screen.tsx"]
GN["seller-status-transitions.ts"]
GO["seller-orders-screen.pants-size.spec.tsx"]
GP["seller-orders-screen.spec.tsx"]
GQ["seller-status-transitions.spec.ts"]
end
GR["test-setup.ts"]
end
end
subgraph GS["setup-password"]
subgraph GT["src"]
GU["index.ts"]
subgraph GV["lib"]
GW["SellersSetupPassword.tsx"]
GX["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GY["unauthorized"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H3["zustand"]
subgraph H4["sellers-products-store"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["useSellersProductsStore.ts"]
H9["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HA["shared"]
subgraph HB["components"]
subgraph HC["apollo-provider-base"]
subgraph HD["src"]
HE["index.ts"]
subgraph HF["lib"]
HG["ApolloProviderBase.tsx"]
HH["createSilentRefreshAuthLink.ts"]
HI["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HJ["error-boundary"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["error-boundary.tsx"]
HO["error-boundary.spec.tsx"]
end
end
HP["vite.config.ts"]
end
subgraph HQ["glassmorphism-container"]
subgraph HR["src"]
HS["index.ts"]
subgraph HT["lib"]
HU["glassmorphism-container.tsx"]
HV["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HW["layout"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["Layout.tsx"]
end
end
end
subgraph I1["material-data-table"]
subgraph I2["src"]
I3["index.ts"]
subgraph I4["lib"]
I5["material-data-table.tsx"]
I6["table-config.ts"]
I7["table-utils.ts"]
I8["material-data-table.spec.tsx"]
I9["table-types.ts"]
end
end
end
subgraph IA["order-status-chip"]
subgraph IB["src"]
IC["index.ts"]
subgraph ID["lib"]
IE["order-status-chip.tsx"]
IF["order-status-chip.spec.tsx"]
end
end
end
subgraph IG["password-field"]
subgraph IH["src"]
II["index.ts"]
subgraph IJ["lib"]
IK["PasswordTextField.tsx"]
end
end
end
subgraph IL["price-display"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["price-display.tsx"]
IQ["price-display.spec.tsx"]
end
end
end
subgraph IR["private-route"]
subgraph IS["src"]
IT["index.ts"]
subgraph IU["lib"]
IV["createPrivateRoute.tsx"]
IW["PrivateRoute.tsx"]
end
end
end
subgraph IX["rtl-table-utils"]
subgraph IY["src"]
IZ["index.ts"]
subgraph J0["lib"]
J1["rtl-table-utils.ts"]
J2["rtl-cell-components.tsx"]
J3["rtl-column-helpers.ts"]
J4["rtl-table-props.ts"]
J5["use-table-alignment.ts"]
J6["rtl-table-utils.spec.tsx"]
J7["rtl-table-utils.tsx"]
end
end
end
subgraph J8["snackbar"]
subgraph J9["src"]
JA["index.ts"]
subgraph JB["lib"]
JC["snackbar.tsx"]
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
QN["order-validation.spec.ts"]
QO["order.resolver.spec.ts"]
QP["order.resolver.status-transitions.spec.ts"]
QQ["order.resolver.tracking.spec.ts"]
QR["payment.resolver.integration.spec.ts"]
QS["payment.resolver.spec.ts"]
QT["product-info.resolver.spec.ts"]
QU["translation.resolver.guards.spec.ts"]
subgraph QV["types"]
QW["graphql-upload.d.ts"]
end
QX["user.resolver.spec.ts"]
QY["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QZ["services"]
R0["jest.config.ts"]
subgraph R1["src"]
R2["index.ts"]
subgraph R3["lib"]
R4["auth.service.ts"]
R5["brand.service.ts"]
R6["cart.service.ts"]
R7["product-info-colors.util.ts"]
R8["category.service.ts"]
R9["color.service.ts"]
RA["currency.service.ts"]
RB["customer-profile.service.ts"]
RC["email.service.ts"]
RD["image-upload.service.ts"]
RE["order.service.ts"]
RF["payment-logger.service.ts"]
RG["payment.service.ts"]
RH["product.service.ts"]
RI["seller-info.service.ts"]
RJ["shipping-calculation.service.ts"]
RK["site-language.service.ts"]
RL["token.service.ts"]
RM["translation.service.ts"]
RN["user.service.ts"]
RO["auth.service.password-policy.spec.ts"]
RP["auth.service.spec.ts"]
RQ["cart.service.add-quantity.spec.ts"]
RR["cart.service.null-relations.spec.ts"]
RS["cart.service.spec.ts"]
RT["order.service.spec.ts"]
RU["order.service.tracking.spec.ts"]
RV["product-info-colors.util.spec.ts"]
RW["product.service.multi-filters.spec.ts"]
RX["product.service.only-discounted.spec.ts"]
RY["product.service.pants.spec.ts"]
RZ["product.service.spec.ts"]
S0["relay-connection.spec.ts"]
S1["seller-info.service.price-validation.spec.ts"]
S2["shipping-calculation.service.spec.ts"]
S3["token.service.spec.ts"]
end
end
end
subgraph S4["strategies"]
subgraph S5["src"]
S6["index.ts"]
subgraph S7["lib"]
S8["local.strategy.ts"]
end
end
end
subgraph S9["utils"]
subgraph SA["src"]
SB["index.ts"]
subgraph SC["lib"]
SD["email-templates.ts"]
SE["relay-connection.ts"]
SF["pagination.ts"]
end
end
end
end
subgraph SG["shared"]
subgraph SH["codegen"]
SI["jest.config.ts"]
subgraph SJ["src"]
SK["index.ts"]
subgraph SL["lib"]
subgraph SM["generated"]
SN["graphql.ts"]
end
end
end
end
subgraph SO["graphql-schema"]
SP["jest.config.ts"]
subgraph SQ["src"]
SR["index.ts"]
end
end
subgraph SS["product-sizes"]
subgraph ST["src"]
SU["index.ts"]
subgraph SV["lib"]
SW["product-sizes.ts"]
SX["product-sizes.pants-formats.spec.ts"]
SY["product-sizes.pants-label.spec.ts"]
SZ["product-sizes.pants-strict.spec.ts"]
T0["product-sizes.spec.ts"]
end
end
end
subgraph T1["shared-i18n"]
subgraph T2["src"]
T3["index.ts"]
subgraph T4["lib"]
T5["language-context.tsx"]
T6["language-detector.ts"]
subgraph T7["locales"]
T8["i18n-react.tsx"]
T9["i18n-util.ts"]
TA["i18n-util.async.ts"]
subgraph TB["en"]
TC["index.ts"]
end
subgraph TE["fa"]
TF["index.ts"]
end
TG["formatters.ts"]
TH["i18n-types.ts"]
TI["i18n-util.sync.ts"]
TJ["navigator-detector.ts"]
end
TD["site-name.ts"]
TK["table-localization.ts"]
TL["theme-provider.tsx"]
TM["use-page-title.ts"]
end
end
end
subgraph TN["validation"]
subgraph TO["src"]
TP["index.ts"]
subgraph TQ["lib"]
TR["auth.ts"]
TS["limits.ts"]
TT["primitives.ts"]
TU["auth-forms.ts"]
TV["cart.ts"]
TW["errors.ts"]
TX["order.ts"]
TY["auth-forms.admin.spec.ts"]
TZ["auth-forms.login.spec.ts"]
U0["auth-forms.recovery.spec.ts"]
U1["auth-forms.seller.spec.ts"]
U2["auth-forms.spec.ts"]
U3["auth.spec.ts"]
U4["cart.spec.ts"]
U5["errors.spec.ts"]
U6["order.spec.ts"]
U7["primitives.spec.ts"]
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
CZ-->CX
CZ-->D0
D4-->D6
D7-->D6
DB-->DD
DE-->DD
DI-->DK
DL-->DK
DN-->DP
DU-->DW
DX-->DW
E0-->E2
E5-->E7
E5-->E8
E7-->E8
EC-->EE
EF-->EE
EI-->EK
EI-->EL
EI-->EM
EI-->EP
EM-->EN
EN-->EO
EP-->EK
EP-->EQ
EX-->EZ
EZ-->F0
F3-->F5
F9-->FB
F9-->FC
FF-->FH
FK-->FM
FQ-->FS
FT-->FS
FW-->FY
FZ-->FY
G2-->G4
G4-->G5
G6-->G5
G7-->G5
G8-->G4
GB-->GD
GE-->GD
GF-->GD
GK-->GM
GM-->GN
GO-->GM
GP-->GM
GQ-->GN
GU-->GW
GX-->GW
H0-->H2
H6-->H8
HE-->HG
HE-->HH
HI-->HH
HL-->HN
HO-->HN
HS-->HU
HV-->HU
HY-->I0
I3-->I5
I3-->I6
I3-->I7
I5-->I6
I8-->I5
IC-->IE
IF-->IE
II-->IK
IN-->IP
IQ-->IP
IT-->IV
IV-->IW
IZ-->J1
J1-->J2
J1-->J3
J1-->J4
J1-->J5
J3-->J2
J3-->J4
J6-->J7
JA-->JC
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
QA-->Q3
QJ-->Q3
QK-->Q2
QK-->QJ
QK-->Q3
QL-->Q2
QM-->Q5
QM-->Q3
QN-->QA
QN-->Q3
QO-->QA
QP-->QA
QQ-->QA
QR-->QB
QS-->QB
QT-->QC
QU-->QI
QX-->QJ
QY-->Q3
R2-->R4
R2-->R5
R2-->R6
R2-->R8
R2-->R9
R2-->RA
R2-->RB
R2-->RC
R2-->RD
R2-->RE
R2-->RF
R2-->RG
R2-->R7
R2-->RH
R2-->RI
R2-->RJ
R2-->RK
R2-->RL
R2-->RM
R2-->RN
R6-->R7
RH-->R7
RI-->R7
RO-->R4
RO-->RC
RO-->RL
RO-->RN
RP-->R4
RP-->RC
RP-->RL
RP-->RN
RQ-->R6
RR-->R6
RS-->R6
RT-->RE
RU-->RE
RV-->R7
RW-->RH
RW-->RM
RX-->RH
RX-->RM
RY-->RH
RY-->RM
RZ-->RH
RZ-->RM
S1-->R4
S1-->RI
S2-->RJ
S3-->RL
S6-->S8
SB-->SD
SB-->SE
SK-->SN
SU-->SW
SX-->SW
SY-->SW
SZ-->SW
T0-->SW
T3-->T5
T3-->T6
T3-->T8
T3-->TH
T3-->T9
T3-->TA
T3-->TI
T3-->TJ
T3-->TD
T3-->TK
T3-->TL
T3-->TM
T5-->T6
T5-->T8
T5-->TA
T8-->T9
TA-->TC
TA-->TF
TA-->TG
TA-->T9
TC-->TD
TF-->TD
TI-->TC
TI-->TF
TI-->TG
TI-->T9
TK-->T8
TL-->T5
TM-->T8
TP-->TR
TP-->TU
TP-->TV
TP-->TW
TP-->TS
TP-->TX
TP-->TT
TR-->TS
TR-->TT
TT-->TS
TU-->TR
TV-->TT
TX-->TR
TX-->TV
TX-->TT
TY-->TU
TZ-->TU
U0-->TU
U1-->TU
U2-->TU
U3-->TR
U4-->TV
U5-->TW
U6-->TX
U7-->TS
U7-->TT
