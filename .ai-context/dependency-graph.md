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
9P["customer-shopping-cart.shipping-form.spec.tsx"]
9Q["customer-shopping-cart.spec.tsx"]
end
end
9R["vite.config.ts"]
end
subgraph 9S["customer-signup"]
subgraph 9T["src"]
9U["index.ts"]
subgraph 9V["lib"]
9W["customer-signup.tsx"]
9X["customer-signup.password-length.spec.tsx"]
9Y["customer-signup.spec.tsx"]
9Z["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A0["forgot-password"]
subgraph A1["src"]
A2["index.ts"]
subgraph A3["lib"]
A4["customer-forgot-password.tsx"]
A5["customer-forgot-password.spec.tsx"]
A6["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A7["guide-authenticity"]
subgraph A8["src"]
A9["index.ts"]
subgraph AA["lib"]
AB["customer-guide-authenticity.tsx"]
AC["customer-guide-authenticity.spec.tsx"]
end
end
AD["vite.config.ts"]
end
subgraph AE["guide-payment"]
subgraph AF["src"]
AG["index.ts"]
subgraph AH["lib"]
AI["customer-guide-payment.tsx"]
AJ["customer-guide-payment.spec.tsx"]
end
end
AK["vite.config.ts"]
end
subgraph AL["home"]
subgraph AM["src"]
AN["index.ts"]
subgraph AO["lib"]
AP["CustomersHomeScreen.tsx"]
subgraph AQ["components"]
AR["CategoryBentoSection.tsx"]
AT["HeroSection.tsx"]
AU["HomeLoadingScreen.tsx"]
AV["PicksRailSection.tsx"]
AW["TrustStripSection.tsx"]
B1["NewArrivalsSection.tsx"]
B4["BrandBlocksSection.tsx"]
B5["NewsletterSection.tsx"]
B6["ShopTheLookSection.tsx"]
B7["TickerSection.tsx"]
end
AS["home-selectors.ts"]
AX["useScrollProgress.ts"]
AY["CustomersShopScreen.tsx"]
AZ["CustomersHomeScreen.cart-size.spec.tsx"]
B0["CustomersHomeScreen.spec.tsx"]
B2["CustomersShopScreen.cart-size.spec.tsx"]
B3["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph B8["login"]
subgraph B9["src"]
BA["index.ts"]
subgraph BB["lib"]
BC["CustomersLoginScreen.tsx"]
BD["CustomersLoginScreen.spec.tsx"]
BE["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BF["not-found"]
subgraph BG["src"]
BH["index.ts"]
subgraph BI["lib"]
BJ["customer-not-found.tsx"]
BK["customer-not-found.spec.tsx"]
end
end
BL["vite.config.ts"]
end
subgraph BM["privacy-policy"]
subgraph BN["src"]
BO["index.ts"]
subgraph BP["lib"]
BQ["customer-privacy-policy.tsx"]
BR["customer-privacy-policy.spec.tsx"]
end
end
BS["vite.config.ts"]
end
subgraph BT["product-details"]
subgraph BU["src"]
BV["index.ts"]
subgraph BW["lib"]
BX["customer-product-details.tsx"]
BY["reviews-flag.ts"]
BZ["customer-product-details.guarantee.spec.tsx"]
C0["customer-product-details.no-low-stock.spec.tsx"]
C1["customer-product-details.pants-size.spec.tsx"]
C2["customer-product-details.reviews-hidden.spec.tsx"]
C3["customer-product-details.spec.tsx"]
end
end
C4["vite.config.ts"]
end
subgraph C5["reset-password"]
subgraph C6["src"]
C7["index.ts"]
subgraph C8["lib"]
C9["customer-reset-password.tsx"]
CA["customer-reset-password.password-length.spec.tsx"]
CB["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CC["shipping-returns"]
subgraph CD["src"]
CE["index.ts"]
subgraph CF["lib"]
CG["customer-shipping-returns.tsx"]
CH["customer-shipping-returns.spec.tsx"]
end
end
CI["vite.config.ts"]
end
subgraph CJ["unauthorized"]
subgraph CK["src"]
CL["index.ts"]
subgraph CM["lib"]
CN["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CO["utility"]
subgraph CP["test"]
subgraph CQ["src"]
CR["index.ts"]
subgraph CS["lib"]
CT["customers-test-utility.tsx"]
end
end
end
end
subgraph CU["validations"]
subgraph CV["src"]
CW["index.ts"]
subgraph CX["lib"]
CY["shipping-validation.ts"]
CZ["shipping-validation.shared.spec.ts"]
D0["shipping-validation.spec.tsx"]
D1["shipping-validation.tsx"]
end
end
end
subgraph D2["zustand"]
subgraph D3["customer-cart-store"]
subgraph D4["src"]
D5["index.ts"]
subgraph D6["lib"]
D7["customer-cart-store.ts"]
D8["customer-cart-store.spec.ts"]
D9["customer-cart-store.tsx"]
end
end
end
subgraph DA["customer-checkout-store"]
subgraph DB["src"]
DC["index.ts"]
subgraph DD["lib"]
DE["customer-checkout-store.ts"]
DF["customer-checkout-store.spec.ts"]
end
end
DG["vite.config.ts"]
end
subgraph DH["customer-wishlist-store"]
subgraph DI["src"]
DJ["index.ts"]
subgraph DK["lib"]
DL["customer-wishlist-store.ts"]
DM["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DN["src"]
DO["index.ts"]
subgraph DP["lib"]
DQ["customers-products-store.tsx"]
end
end
end
end
subgraph DR["sellers"]
subgraph DS["components"]
subgraph DT["footer"]
subgraph DU["src"]
DV["index.ts"]
subgraph DW["lib"]
DX["sellers-footer.tsx"]
DY["sellers-footer.spec.tsx"]
end
end
end
subgraph DZ["headerbar"]
subgraph E0["src"]
E1["index.ts"]
subgraph E2["lib"]
E3["SellersHeaderbar.tsx"]
end
end
end
subgraph E4["layout"]
subgraph E5["src"]
E6["index.ts"]
subgraph E7["lib"]
E8["SellersLayout.tsx"]
E9["SellersTabbar.tsx"]
end
end
end
end
subgraph EA["contexts"]
subgraph EB["auth"]
subgraph EC["src"]
ED["index.ts"]
subgraph EE["lib"]
EF["SellersAuthContext.tsx"]
EG["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EH["graphql"]
subgraph EI["src"]
EJ["index.ts"]
subgraph EK["lib"]
EL["fragments.ts"]
EM["mutations.ts"]
EN["Provider.tsx"]
EO["SellersApolloProvider.tsx"]
EP["client.ts"]
EQ["queries.ts"]
ER["seller-orders.graphql.ts"]
ES["apollo-upload-client.d.ts"]
end
subgraph ET["types"]
EU["apollo-upload-client.d.ts"]
end
end
end
subgraph EV["hooks"]
subgraph EW["auth"]
subgraph EX["src"]
EY["index.ts"]
subgraph EZ["lib"]
F0["useSellerAuth.ts"]
F1["sellerAuth.graphql.ts"]
end
end
end
subgraph F2["orders"]
subgraph F3["src"]
F4["index.ts"]
subgraph F5["lib"]
F6["useSellerOrders.ts"]
F7["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph F8["products"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["useSellersProductManagement.ts"]
FD["useSellersProducts.ts"]
end
end
end
end
subgraph FE["router"]
subgraph FF["src"]
FG["index.ts"]
subgraph FH["lib"]
FI["SellersRouter.tsx"]
end
end
end
subgraph FJ["routes"]
subgraph FK["src"]
FL["index.ts"]
subgraph FM["lib"]
FN["seller-routes.ts"]
end
end
end
subgraph FO["screens"]
subgraph FP["catalog"]
subgraph FQ["src"]
FR["index.ts"]
subgraph FS["lib"]
FT["SellersCatalogScreens.tsx"]
FU["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FV["login"]
subgraph FW["src"]
FX["index.ts"]
subgraph FY["lib"]
FZ["SellersLogin.tsx"]
G0["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G1["manage-product"]
subgraph G2["src"]
G3["index.ts"]
subgraph G4["lib"]
G5["SellersManageProductScreen.tsx"]
G6["SellersDefineProductFlow.tsx"]
G7["SellersDefineProductFlow.pants-label.spec.tsx"]
G8["SellersDefineProductFlow.spec.tsx"]
G9["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph GA["products"]
subgraph GB["src"]
GC["index.ts"]
subgraph GD["lib"]
GE["SellersProducts.tsx"]
GF["SellersProducts.pants-label.spec.tsx"]
GG["SellersProducts.spec.tsx"]
end
end
end
subgraph GH["seller-orders"]
GI["jest.config.ts"]
GJ["jest.setup.ts"]
subgraph GK["src"]
GL["index.ts"]
subgraph GM["lib"]
GN["seller-orders-screen.tsx"]
GO["seller-status-transitions.ts"]
GP["seller-orders-screen.pants-size.spec.tsx"]
GQ["seller-orders-screen.spec.tsx"]
GR["seller-status-transitions.spec.ts"]
end
GS["test-setup.ts"]
end
end
subgraph GT["setup-password"]
subgraph GU["src"]
GV["index.ts"]
subgraph GW["lib"]
GX["SellersSetupPassword.tsx"]
GY["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GZ["unauthorized"]
subgraph H0["src"]
H1["index.ts"]
subgraph H2["lib"]
H3["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H4["zustand"]
subgraph H5["sellers-products-store"]
subgraph H6["src"]
H7["index.ts"]
subgraph H8["lib"]
H9["useSellersProductsStore.ts"]
HA["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HB["shared"]
subgraph HC["components"]
subgraph HD["apollo-provider-base"]
subgraph HE["src"]
HF["index.ts"]
subgraph HG["lib"]
HH["ApolloProviderBase.tsx"]
HI["createSilentRefreshAuthLink.ts"]
HJ["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HK["error-boundary"]
subgraph HL["src"]
HM["index.ts"]
subgraph HN["lib"]
HO["error-boundary.tsx"]
HP["error-boundary.spec.tsx"]
end
end
HQ["vite.config.ts"]
end
subgraph HR["glassmorphism-container"]
subgraph HS["src"]
HT["index.ts"]
subgraph HU["lib"]
HV["glassmorphism-container.tsx"]
HW["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HX["layout"]
subgraph HY["src"]
HZ["index.ts"]
subgraph I0["lib"]
I1["Layout.tsx"]
end
end
end
subgraph I2["material-data-table"]
subgraph I3["src"]
I4["index.ts"]
subgraph I5["lib"]
I6["material-data-table.tsx"]
I7["table-config.ts"]
I8["table-utils.ts"]
I9["material-data-table.spec.tsx"]
IA["table-types.ts"]
end
end
end
subgraph IB["order-status-chip"]
subgraph IC["src"]
ID["index.ts"]
subgraph IE["lib"]
IF["order-status-chip.tsx"]
IG["order-status-chip.spec.tsx"]
end
end
end
subgraph IH["password-field"]
subgraph II["src"]
IJ["index.ts"]
subgraph IK["lib"]
IL["PasswordTextField.tsx"]
end
end
end
subgraph IM["price-display"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["price-display.tsx"]
IR["price-display.spec.tsx"]
end
end
end
subgraph IS["private-route"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["createPrivateRoute.tsx"]
IX["PrivateRoute.tsx"]
end
end
end
subgraph IY["rtl-table-utils"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["rtl-table-utils.ts"]
J3["rtl-cell-components.tsx"]
J4["rtl-column-helpers.ts"]
J5["rtl-table-props.ts"]
J6["use-table-alignment.ts"]
J7["rtl-table-utils.spec.tsx"]
J8["rtl-table-utils.tsx"]
end
end
end
subgraph J9["snackbar"]
subgraph JA["src"]
JB["index.ts"]
subgraph JC["lib"]
JD["snackbar.tsx"]
end
end
end
subgraph JE["styled-drawer"]
subgraph JF["src"]
JG["index.ts"]
subgraph JH["lib"]
JI["styled-drawer.tsx"]
JJ["styled-drawer.spec.tsx"]
end
end
end
subgraph JK["unauthorized"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["unauthorized-path.tsx"]
end
end
end
end
subgraph JP["graphql"]
subgraph JQ["src"]
JR["index.ts"]
subgraph JS["lib"]
JT["currency.mutations.ts"]
JU["currency.queries.ts"]
JV["fragments.ts"]
JW["variant-colors.ts"]
JX["client-shared-graphql.tsx"]
end
end
end
subgraph JY["hooks"]
subgraph JZ["brands"]
subgraph K0["src"]
K1["index.ts"]
subgraph K2["lib"]
K3["brands.graphql.ts"]
K4["useBrands.ts"]
end
end
K5["vite.config.ts"]
end
subgraph K6["categories"]
subgraph K7["src"]
K8["index.ts"]
subgraph K9["lib"]
KA["useCategories.ts"]
KB["categories.graphql.ts"]
end
end
end
subgraph KC["colors"]
subgraph KD["src"]
KE["index.ts"]
subgraph KF["lib"]
KG["useColors.ts"]
KH["color.graphql.ts"]
end
end
end
subgraph KI["currency"]
subgraph KJ["src"]
KK["index.ts"]
subgraph KL["lib"]
KM["useConvertPrice.tsx"]
KN["useExchangeRate.tsx"]
KO["useCurrencies.tsx"]
KP["useCurrencyForLocale.tsx"]
KQ["useExchangeRate.spec.tsx"]
end
end
end
subgraph KR["products"]
subgraph KS["src"]
KT["index.ts"]
subgraph KU["lib"]
KV["productImage.ts"]
KW["products.graphql.ts"]
KX["useProducts.ts"]
KY["productImage.spec.ts"]
end
end
end
subgraph KZ["site-languages"]
subgraph L0["src"]
L1["index.ts"]
subgraph L2["lib"]
L3["site-languages.graphql.ts"]
L4["useSiteLanguages.ts"]
L5["site-languages-hook.spec.tsx"]
end
end
L6["vite.config.ts"]
end
subgraph L7["snackbar"]
subgraph L8["src"]
L9["index.ts"]
subgraph LA["lib"]
LB["SnackbarContext.tsx"]
LC["useSnackbar.ts"]
end
end
end
subgraph LD["translations-management-hook"]
subgraph LE["src"]
LF["index.ts"]
subgraph LG["lib"]
LH["useTranslationsManagement.ts"]
end
end
end
end
subgraph LI["lottie"]
subgraph LJ["empty-cart"]
subgraph LK["src"]
LL["index.ts"]
subgraph LM["lib"]
LN["lottie-empty-cart.tsx"]
LO["lottie-empty-cart.spec.tsx"]
end
end
LP["vite.config.ts"]
end
subgraph LQ["loading"]
subgraph LR["src"]
LS["index.ts"]
subgraph LT["lib"]
LU["lottie-loading.tsx"]
LV["lottie-loading.spec.tsx"]
end
end
end
subgraph LW["success-check"]
subgraph LX["src"]
LY["index.ts"]
subgraph LZ["lib"]
M0["lottie-success-check.tsx"]
M1["lottie-success-check.spec.tsx"]
end
end
end
subgraph M2["unauthorized"]
subgraph M3["src"]
M4["index.ts"]
subgraph M5["lib"]
M6["lottie-unauthorized.tsx"]
end
end
end
end
subgraph M7["translations"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["mapApolloErrorToTranslationKey.ts"]
MC["WrapTranslation.tsx"]
end
end
end
subgraph MD["ui"]
subgraph ME["colors"]
subgraph MF["src"]
MG["index.ts"]
subgraph MH["lib"]
MI["colors.ts"]
end
end
end
subgraph MJ["language-components"]
subgraph MK["src"]
ML["index.ts"]
subgraph MM["lib"]
MN["language-components.tsx"]
MO["ltr-text-field.tsx"]
end
end
end
subgraph MP["sizes"]
subgraph MQ["src"]
MR["index.ts"]
subgraph MS["lib"]
MT["sizes.ts"]
MU["sizes.spec.tsx"]
MV["sizes.tsx"]
end
end
end
end
subgraph MW["zustand"]
subgraph MX["shared-auth-store"]
subgraph MY["src"]
MZ["index.ts"]
subgraph N0["lib"]
N1["shared-auth-store.ts"]
end
end
end
subgraph N2["shared-notification-store"]
subgraph N3["src"]
N4["index.ts"]
subgraph N5["lib"]
N6["shared-notification-store.tsx"]
end
end
end
subgraph N7["shared-ui-store"]
subgraph N8["src"]
N9["index.ts"]
subgraph NA["lib"]
NB["shared-ui-store.ts"]
NC["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph ND["server"]
subgraph NE["controllers"]
subgraph NF["src"]
NG["index.ts"]
subgraph NH["lib"]
NI["auth.controller.ts"]
NJ["order.controller.ts"]
end
end
end
subgraph NK["decorators"]
NL["jest.config.ts"]
subgraph NM["src"]
NN["index.ts"]
subgraph NO["lib"]
NP["current-user.decorator.ts"]
NQ["decorators.ts"]
NR["decorators.spec.ts"]
end
end
end
subgraph NS["entities"]
subgraph NT["src"]
NU["index.ts"]
subgraph NV["lib"]
NW["brand.entity.ts"]
NX["product.entity.ts"]
NY["category.entity.ts"]
NZ["product-description.entity.ts"]
O0["site-language.entity.ts"]
O1["product-info.entity.ts"]
O2["color.entity.ts"]
O3["product-info-color.entity.ts"]
O4["seller-info.entity.ts"]
O5["seller-product.entity.ts"]
O6["user.entity.ts"]
O7["cart.entity.ts"]
O8["currency-preference.entity.ts"]
O9["currency.entity.ts"]
OA["customer.entity.ts"]
OB["exchange-rate.entity.ts"]
OC["order.entity.ts"]
OD["platform-settings.entity.ts"]
OE["refresh-token.entity.ts"]
OF["seller-order.entity.ts"]
OG["translation.entity.ts"]
end
end
end
subgraph OH["guards"]
OI["jest.config.ts"]
subgraph OJ["src"]
OK["index.ts"]
subgraph OL["lib"]
OM["catalog.guard.ts"]
ON["graphql-auth.guard.ts"]
OO["http-auth.guard.ts"]
OP["roles.guard.ts"]
OQ["catalog.guard.spec.ts"]
OR["roles.guard.spec.ts"]
end
end
end
subgraph OS["inputs"]
subgraph OT["src"]
OU["index.ts"]
subgraph OV["lib"]
OW["brand.input.ts"]
OX["cart.inputs.ts"]
OY["category.input.ts"]
OZ["color.input.ts"]
P0["customer-auth.inputs.ts"]
P1["order-pagination.inputs.ts"]
P2["order.inputs.ts"]
P3["product-info-filter.input.ts"]
P4["product.input.ts"]
P5["seller-order-pagination.inputs.ts"]
P6["seller.input.ts"]
P7["site-language.input.ts"]
P8["user.input.ts"]
end
end
end
subgraph P9["modules"]
subgraph PA["src"]
PB["index.ts"]
subgraph PC["lib"]
PD["auth.module.ts"]
PE["email.module.ts"]
PF["token.module.ts"]
PG["user.module.ts"]
PH["customer-profile.module.ts"]
PI["brand.module.ts"]
PJ["catalog-guard.module.ts"]
PK["translation.module.ts"]
PL["cart.module.ts"]
PM["platform-settings.module.ts"]
PN["category.module.ts"]
PO["product.module.ts"]
PP["color.module.ts"]
PQ["currency.module.ts"]
PR["graphql-context.module.ts"]
PS["order.module.ts"]
PT["seller-info.module.ts"]
PU["payment.module.ts"]
PV["product-info.module.ts"]
PW["seller-products.module.ts"]
PX["site-language.module.ts"]
end
end
end
subgraph PY["resolvers"]
PZ["jest.config.ts"]
subgraph Q0["src"]
Q1["index.ts"]
subgraph Q2["lib"]
Q3["auth.resolver.ts"]
Q4["zod-validation.pipe.ts"]
Q5["brand.resolver.ts"]
Q6["cart.resolver.ts"]
Q7["category.resolver.ts"]
Q8["color.resolver.ts"]
Q9["currency.resolver.ts"]
QA["customer-profile.resolver.ts"]
QB["order.resolver.ts"]
QC["payment.resolver.ts"]
QD["product-info.resolver.ts"]
QE["product.resolver.ts"]
QF["seller-info.resolver.ts"]
QG["shipping.resolver.ts"]
QH["site-language.resolver.ts"]
QI["translation.input.ts"]
QJ["translation.resolver.ts"]
QK["user.resolver.ts"]
QL["auth-validation.spec.ts"]
QM["auth.resolver.spec.ts"]
QN["cart-validation.spec.ts"]
QO["customer-profile-validation.spec.ts"]
QP["order-validation.spec.ts"]
QQ["order.resolver.spec.ts"]
QR["order.resolver.status-transitions.spec.ts"]
QS["order.resolver.tracking.spec.ts"]
QT["payment.resolver.integration.spec.ts"]
QU["payment.resolver.spec.ts"]
QV["product-info.resolver.spec.ts"]
QW["translation.resolver.guards.spec.ts"]
subgraph QX["types"]
QY["graphql-upload.d.ts"]
end
QZ["user.resolver.spec.ts"]
R0["zod-validation.pipe.spec.ts"]
end
end
end
subgraph R1["services"]
R2["jest.config.ts"]
subgraph R3["src"]
R4["index.ts"]
subgraph R5["lib"]
R6["auth.service.ts"]
R7["brand.service.ts"]
R8["cart.service.ts"]
R9["product-info-colors.util.ts"]
RA["category.service.ts"]
RB["color.service.ts"]
RC["currency.service.ts"]
RD["customer-profile.service.ts"]
RE["email.service.ts"]
RF["image-upload.service.ts"]
RG["order.service.ts"]
RH["payment-logger.service.ts"]
RI["payment.service.ts"]
RJ["product.service.ts"]
RK["seller-info.service.ts"]
RL["shipping-calculation.service.ts"]
RM["site-language.service.ts"]
RN["token.service.ts"]
RO["translation.service.ts"]
RP["user.service.ts"]
RQ["auth.service.password-policy.spec.ts"]
RR["auth.service.spec.ts"]
RS["cart.service.add-quantity.spec.ts"]
RT["cart.service.null-relations.spec.ts"]
RU["cart.service.spec.ts"]
RV["order.service.spec.ts"]
RW["order.service.tracking.spec.ts"]
RX["product-info-colors.util.spec.ts"]
RY["product.service.multi-filters.spec.ts"]
RZ["product.service.only-discounted.spec.ts"]
S0["product.service.pants.spec.ts"]
S1["product.service.spec.ts"]
S2["relay-connection.spec.ts"]
S3["seller-info.service.price-validation.spec.ts"]
S4["shipping-calculation.service.spec.ts"]
S5["token.service.spec.ts"]
end
end
end
subgraph S6["strategies"]
subgraph S7["src"]
S8["index.ts"]
subgraph S9["lib"]
SA["local.strategy.ts"]
end
end
end
subgraph SB["utils"]
subgraph SC["src"]
SD["index.ts"]
subgraph SE["lib"]
SF["email-templates.ts"]
SG["relay-connection.ts"]
SH["pagination.ts"]
end
end
end
end
subgraph SI["shared"]
subgraph SJ["codegen"]
SK["jest.config.ts"]
subgraph SL["src"]
SM["index.ts"]
subgraph SN["lib"]
subgraph SO["generated"]
SP["graphql.ts"]
end
end
end
end
subgraph SQ["graphql-schema"]
SR["jest.config.ts"]
subgraph SS["src"]
ST["index.ts"]
end
end
subgraph SU["product-sizes"]
subgraph SV["src"]
SW["index.ts"]
subgraph SX["lib"]
SY["product-sizes.ts"]
SZ["product-sizes.pants-formats.spec.ts"]
T0["product-sizes.pants-label.spec.ts"]
T1["product-sizes.pants-strict.spec.ts"]
T2["product-sizes.spec.ts"]
end
end
end
subgraph T3["shared-i18n"]
subgraph T4["src"]
T5["index.ts"]
subgraph T6["lib"]
T7["language-context.tsx"]
T8["language-detector.ts"]
subgraph T9["locales"]
TA["i18n-react.tsx"]
TB["i18n-util.ts"]
TC["i18n-util.async.ts"]
subgraph TD["en"]
TE["index.ts"]
end
subgraph TG["fa"]
TH["index.ts"]
end
TI["formatters.ts"]
TJ["i18n-types.ts"]
TK["i18n-util.sync.ts"]
TL["navigator-detector.ts"]
end
TF["site-name.ts"]
TM["table-localization.ts"]
TN["theme-provider.tsx"]
TO["use-page-title.ts"]
end
end
end
subgraph TP["validation"]
subgraph TQ["src"]
TR["index.ts"]
subgraph TS["lib"]
TT["auth.ts"]
TU["limits.ts"]
TV["primitives.ts"]
TW["auth-forms.ts"]
TX["cart.ts"]
TY["errors.ts"]
TZ["order.ts"]
U0["profile.ts"]
U1["auth-forms.admin.spec.ts"]
U2["auth-forms.login.spec.ts"]
U3["auth-forms.recovery.spec.ts"]
U4["auth-forms.seller.spec.ts"]
U5["auth-forms.spec.ts"]
U6["auth.spec.ts"]
U7["cart.spec.ts"]
U8["errors.spec.ts"]
U9["order.spec.ts"]
UA["primitives.spec.ts"]
UB["profile.spec.ts"]
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
9Q-->9N
9U-->9W
9X-->9W
9Y-->9W
9Z-->9W
A2-->A4
A5-->A4
A6-->A4
A9-->AB
AC-->AB
AG-->AI
AJ-->AI
AN-->AP
AN-->AY
AN-->AS
AN-->AX
AP-->AR
AP-->AT
AP-->AU
AP-->AV
AP-->AW
AP-->AS
AP-->AX
AR-->AS
AY-->AS
AZ-->AV
AZ-->AP
AZ-->AS
B0-->B1
B0-->AV
B0-->AP
B0-->AY
B0-->AS
B2-->AY
B3-->AY
B4-->AS
B6-->AS
BA-->BC
BD-->BC
BE-->BC
BH-->BJ
BK-->BJ
BO-->BQ
BR-->BQ
BV-->BX
BX-->BY
BZ-->BX
C0-->BX
C1-->BX
C2-->BX
C3-->BX
C7-->C9
CA-->C9
CB-->C9
CE-->CG
CH-->CG
CL-->CN
CR-->CT
CW-->CY
CZ-->CY
D0-->CY
D0-->D1
D5-->D7
D8-->D7
DC-->DE
DF-->DE
DJ-->DL
DM-->DL
DO-->DQ
DV-->DX
DY-->DX
E1-->E3
E6-->E8
E6-->E9
E8-->E9
ED-->EF
EG-->EF
EJ-->EL
EJ-->EM
EJ-->EN
EJ-->EQ
EN-->EO
EO-->EP
EQ-->EL
EQ-->ER
EY-->F0
F0-->F1
F4-->F6
FA-->FC
FA-->FD
FG-->FI
FL-->FN
FR-->FT
FU-->FT
FX-->FZ
G0-->FZ
G3-->G5
G5-->G6
G7-->G6
G8-->G6
G9-->G5
GC-->GE
GF-->GE
GG-->GE
GL-->GN
GN-->GO
GP-->GN
GQ-->GN
GR-->GO
GV-->GX
GY-->GX
H1-->H3
H7-->H9
HF-->HH
HF-->HI
HJ-->HI
HM-->HO
HP-->HO
HT-->HV
HW-->HV
HZ-->I1
I4-->I6
I4-->I7
I4-->I8
I6-->I7
I9-->I6
ID-->IF
IG-->IF
IJ-->IL
IO-->IQ
IR-->IQ
IU-->IW
IW-->IX
J0-->J2
J2-->J3
J2-->J4
J2-->J5
J2-->J6
J4-->J3
J4-->J5
J7-->J8
JB-->JD
JG-->JI
JJ-->JI
JM-->JO
JR-->JT
JR-->JU
JR-->JV
JR-->JW
K1-->K3
K1-->K4
K4-->K3
K8-->KA
KA-->KB
KE-->KG
KG-->KH
KK-->KM
KK-->KO
KK-->KP
KK-->KN
KM-->KN
KQ-->KN
KT-->KV
KT-->KW
KT-->KX
KX-->KW
KY-->KV
L1-->L3
L1-->L4
L4-->L3
L5-->L4
L9-->LB
L9-->LC
LC-->LB
LF-->LH
LL-->LN
LO-->LN
LS-->LU
LV-->LU
LY-->M0
M1-->M0
M4-->M6
M9-->MB
MG-->MI
ML-->MN
ML-->MO
MR-->MT
MU-->MV
MZ-->N1
N4-->N6
N9-->NB
NG-->NI
NG-->NJ
NN-->NP
NN-->NQ
NR-->NQ
NU-->NW
NU-->O7
NU-->NY
NU-->O2
NU-->O8
NU-->O9
NU-->OA
NU-->OB
NU-->OC
NU-->OD
NU-->NZ
NU-->O3
NU-->O1
NU-->NX
NU-->OE
NU-->O4
NU-->OF
NU-->O5
NU-->O0
NU-->OG
NU-->O6
NW-->NX
NX-->NW
NX-->NY
NX-->NZ
NX-->O1
NX-->O4
NX-->O5
NY-->NX
NZ-->NX
NZ-->O0
O0-->NZ
O1-->O2
O1-->O3
O1-->NX
O3-->O2
O3-->O1
O4-->O5
O4-->O6
O5-->O1
O5-->NX
O5-->O4
O7-->NX
O7-->O6
O8-->O9
OA-->O6
OB-->O9
OB-->O6
OC-->NX
OC-->O4
OE-->O6
OF-->OC
OK-->OM
OK-->ON
OK-->OO
OK-->OP
OQ-->OM
OR-->OP
OU-->OW
OU-->OX
OU-->OY
OU-->OZ
OU-->P0
OU-->P1
OU-->P2
OU-->P3
OU-->P4
OU-->P5
OU-->P6
OU-->P7
OU-->P8
P4-->P3
PB-->PD
PB-->PI
PB-->PL
PB-->PJ
PB-->PN
PB-->PP
PB-->PQ
PB-->PH
PB-->PE
PB-->PR
PB-->PS
PB-->PU
PB-->PM
PB-->PV
PB-->PO
PB-->PT
PB-->PW
PB-->PX
PB-->PF
PB-->PK
PB-->PG
PD-->PE
PD-->PF
PD-->PG
PG-->PD
PG-->PH
PI-->PJ
PI-->PK
PL-->PM
PN-->PJ
PN-->PO
PN-->PK
PO-->PJ
PO-->PF
PO-->PK
PP-->PJ
PP-->PK
PR-->PE
PR-->PF
PR-->PG
PS-->PM
PS-->PT
PT-->PO
PT-->PF
PT-->PG
PU-->PQ
PU-->PS
PV-->PO
PV-->PK
PW-->PT
PW-->PG
Q1-->Q3
Q1-->Q5
Q1-->Q6
Q1-->Q7
Q1-->Q8
Q1-->Q9
Q1-->QA
Q1-->QB
Q1-->QC
Q1-->QD
Q1-->QE
Q1-->QF
Q1-->QG
Q1-->QH
Q1-->QI
Q1-->QJ
Q1-->QK
Q1-->Q4
Q3-->Q4
Q6-->Q4
QA-->Q4
QB-->Q4
QK-->Q4
QL-->Q3
QL-->QK
QL-->Q4
QM-->Q3
QN-->Q6
QN-->Q4
QO-->QA
QO-->Q4
QP-->QB
QP-->Q4
QQ-->QB
QR-->QB
QS-->QB
QT-->QC
QU-->QC
QV-->QD
QW-->QJ
QZ-->QK
R0-->Q4
R4-->R6
R4-->R7
R4-->R8
R4-->RA
R4-->RB
R4-->RC
R4-->RD
R4-->RE
R4-->RF
R4-->RG
R4-->RH
R4-->RI
R4-->R9
R4-->RJ
R4-->RK
R4-->RL
R4-->RM
R4-->RN
R4-->RO
R4-->RP
R8-->R9
RJ-->R9
RK-->R9
RQ-->R6
RQ-->RE
RQ-->RN
RQ-->RP
RR-->R6
RR-->RE
RR-->RN
RR-->RP
RS-->R8
RT-->R8
RU-->R8
RV-->RG
RW-->RG
RX-->R9
RY-->RJ
RY-->RO
RZ-->RJ
RZ-->RO
S0-->RJ
S0-->RO
S1-->RJ
S1-->RO
S3-->R6
S3-->RK
S4-->RL
S5-->RN
S8-->SA
SD-->SF
SD-->SG
SM-->SP
SW-->SY
SZ-->SY
T0-->SY
T1-->SY
T2-->SY
T5-->T7
T5-->T8
T5-->TA
T5-->TJ
T5-->TB
T5-->TC
T5-->TK
T5-->TL
T5-->TF
T5-->TM
T5-->TN
T5-->TO
T7-->T8
T7-->TA
T7-->TC
TA-->TB
TC-->TE
TC-->TH
TC-->TI
TC-->TB
TE-->TF
TH-->TF
TK-->TE
TK-->TH
TK-->TI
TK-->TB
TM-->TA
TN-->T7
TO-->TA
TR-->TT
TR-->TW
TR-->TX
TR-->TY
TR-->TU
TR-->TZ
TR-->TV
TR-->U0
TT-->TU
TT-->TV
TV-->TU
TW-->TT
TX-->TV
TZ-->TT
TZ-->TX
TZ-->TV
U0-->TZ
U1-->TW
U2-->TW
U3-->TW
U4-->TW
U5-->TW
U6-->TT
U7-->TX
U8-->TY
U9-->TZ
UA-->TU
UA-->TV
UB-->U0
