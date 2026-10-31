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
8G["customer-favorites.spec.tsx"]
end
end
8H["vite.config.ts"]
end
subgraph 8I["customer-login"]
subgraph 8J["src"]
8K["index.ts"]
subgraph 8L["lib"]
8M["customer-login.tsx"]
end
end
end
subgraph 8N["customer-order-confirmation"]
subgraph 8O["src"]
8P["index.ts"]
subgraph 8Q["lib"]
8R["customer-order-confirmation.tsx"]
8S["customer-order-confirmation.pants-size.spec.tsx"]
8T["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8U["customer-orders"]
subgraph 8V["src"]
8W["index.ts"]
subgraph 8X["lib"]
8Y["customer-orders.tsx"]
end
end
end
subgraph 8Z["customer-payment"]
subgraph 90["src"]
91["index.ts"]
subgraph 92["lib"]
93["customer-payment-callback.tsx"]
94["use-zarinpal-payment.tsx"]
95["zarinpal-payment-service.ts"]
96["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 97["customer-products"]
subgraph 98["src"]
99["index.ts"]
subgraph 9A["lib"]
9B["customer-products.tsx"]
end
end
end
subgraph 9C["customer-profile"]
subgraph 9D["src"]
9E["index.ts"]
subgraph 9F["lib"]
9G["customer-profile.tsx"]
9H["customer-profile.spec.tsx"]
end
end
end
subgraph 9I["customer-shopping-cart"]
subgraph 9J["src"]
9K["index.ts"]
subgraph 9L["lib"]
9M["customer-shopping-cart.tsx"]
9N["customer-shopping-cart.pants-size.spec.tsx"]
9O["customer-shopping-cart.spec.tsx"]
end
end
9P["vite.config.ts"]
end
subgraph 9Q["customer-signup"]
subgraph 9R["src"]
9S["index.ts"]
subgraph 9T["lib"]
9U["customer-signup.tsx"]
9V["customer-signup.password-length.spec.tsx"]
9W["customer-signup.spec.tsx"]
9X["customer-signup.zod.spec.tsx"]
end
end
end
subgraph 9Y["forgot-password"]
subgraph 9Z["src"]
A0["index.ts"]
subgraph A1["lib"]
A2["customer-forgot-password.tsx"]
A3["customer-forgot-password.spec.tsx"]
A4["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A5["guide-authenticity"]
subgraph A6["src"]
A7["index.ts"]
subgraph A8["lib"]
A9["customer-guide-authenticity.tsx"]
AA["customer-guide-authenticity.spec.tsx"]
end
end
AB["vite.config.ts"]
end
subgraph AC["guide-payment"]
subgraph AD["src"]
AE["index.ts"]
subgraph AF["lib"]
AG["customer-guide-payment.tsx"]
AH["customer-guide-payment.spec.tsx"]
end
end
AI["vite.config.ts"]
end
subgraph AJ["home"]
subgraph AK["src"]
AL["index.ts"]
subgraph AM["lib"]
AN["CustomersHomeScreen.tsx"]
subgraph AO["components"]
AP["CategoryBentoSection.tsx"]
AR["HeroSection.tsx"]
AS["HomeLoadingScreen.tsx"]
AT["PicksRailSection.tsx"]
AU["TrustStripSection.tsx"]
AZ["NewArrivalsSection.tsx"]
B1["BrandBlocksSection.tsx"]
B2["NewsletterSection.tsx"]
B3["ShopTheLookSection.tsx"]
B4["TickerSection.tsx"]
end
AQ["home-selectors.ts"]
AV["useScrollProgress.ts"]
AW["CustomersShopScreen.tsx"]
AX["CustomersHomeScreen.cart-size.spec.tsx"]
AY["CustomersHomeScreen.spec.tsx"]
B0["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph B5["login"]
subgraph B6["src"]
B7["index.ts"]
subgraph B8["lib"]
B9["CustomersLoginScreen.tsx"]
BA["CustomersLoginScreen.spec.tsx"]
BB["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BC["not-found"]
subgraph BD["src"]
BE["index.ts"]
subgraph BF["lib"]
BG["customer-not-found.tsx"]
BH["customer-not-found.spec.tsx"]
end
end
BI["vite.config.ts"]
end
subgraph BJ["privacy-policy"]
subgraph BK["src"]
BL["index.ts"]
subgraph BM["lib"]
BN["customer-privacy-policy.tsx"]
BO["customer-privacy-policy.spec.tsx"]
end
end
BP["vite.config.ts"]
end
subgraph BQ["product-details"]
subgraph BR["src"]
BS["index.ts"]
subgraph BT["lib"]
BU["customer-product-details.tsx"]
BV["customer-product-details.guarantee.spec.tsx"]
BW["customer-product-details.no-low-stock.spec.tsx"]
BX["customer-product-details.pants-size.spec.tsx"]
BY["customer-product-details.spec.tsx"]
end
end
BZ["vite.config.ts"]
end
subgraph C0["reset-password"]
subgraph C1["src"]
C2["index.ts"]
subgraph C3["lib"]
C4["customer-reset-password.tsx"]
C5["customer-reset-password.password-length.spec.tsx"]
C6["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph C7["shipping-returns"]
subgraph C8["src"]
C9["index.ts"]
subgraph CA["lib"]
CB["customer-shipping-returns.tsx"]
CC["customer-shipping-returns.spec.tsx"]
end
end
CD["vite.config.ts"]
end
subgraph CE["unauthorized"]
subgraph CF["src"]
CG["index.ts"]
subgraph CH["lib"]
CI["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CJ["utility"]
subgraph CK["test"]
subgraph CL["src"]
CM["index.ts"]
subgraph CN["lib"]
CO["customers-test-utility.tsx"]
end
end
end
end
subgraph CP["validations"]
subgraph CQ["src"]
CR["index.ts"]
subgraph CS["lib"]
CT["shipping-validation.ts"]
CU["shipping-validation.spec.tsx"]
CV["shipping-validation.tsx"]
end
end
end
subgraph CW["zustand"]
subgraph CX["customer-cart-store"]
subgraph CY["src"]
CZ["index.ts"]
subgraph D0["lib"]
D1["customer-cart-store.ts"]
D2["customer-cart-store.spec.ts"]
D3["customer-cart-store.tsx"]
end
end
end
subgraph D4["customer-checkout-store"]
subgraph D5["src"]
D6["index.ts"]
subgraph D7["lib"]
D8["customer-checkout-store.ts"]
D9["customer-checkout-store.spec.ts"]
end
end
DA["vite.config.ts"]
end
subgraph DB["customer-wishlist-store"]
subgraph DC["src"]
DD["index.ts"]
subgraph DE["lib"]
DF["customer-wishlist-store.ts"]
DG["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DH["src"]
DI["index.ts"]
subgraph DJ["lib"]
DK["customers-products-store.tsx"]
end
end
end
end
subgraph DL["sellers"]
subgraph DM["components"]
subgraph DN["footer"]
subgraph DO["src"]
DP["index.ts"]
subgraph DQ["lib"]
DR["sellers-footer.tsx"]
DS["sellers-footer.spec.tsx"]
end
end
end
subgraph DT["headerbar"]
subgraph DU["src"]
DV["index.ts"]
subgraph DW["lib"]
DX["SellersHeaderbar.tsx"]
end
end
end
subgraph DY["layout"]
subgraph DZ["src"]
E0["index.ts"]
subgraph E1["lib"]
E2["SellersLayout.tsx"]
E3["SellersTabbar.tsx"]
end
end
end
end
subgraph E4["contexts"]
subgraph E5["auth"]
subgraph E6["src"]
E7["index.ts"]
subgraph E8["lib"]
E9["SellersAuthContext.tsx"]
EA["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EB["graphql"]
subgraph EC["src"]
ED["index.ts"]
subgraph EE["lib"]
EF["fragments.ts"]
EG["mutations.ts"]
EH["Provider.tsx"]
EI["SellersApolloProvider.tsx"]
EJ["client.ts"]
EK["queries.ts"]
EL["seller-orders.graphql.ts"]
EM["apollo-upload-client.d.ts"]
end
subgraph EN["types"]
EO["apollo-upload-client.d.ts"]
end
end
end
subgraph EP["hooks"]
subgraph EQ["auth"]
subgraph ER["src"]
ES["index.ts"]
subgraph ET["lib"]
EU["useSellerAuth.ts"]
EV["sellerAuth.graphql.ts"]
end
end
end
subgraph EW["orders"]
subgraph EX["src"]
EY["index.ts"]
subgraph EZ["lib"]
F0["useSellerOrders.ts"]
F1["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph F2["products"]
subgraph F3["src"]
F4["index.ts"]
subgraph F5["lib"]
F6["useSellersProductManagement.ts"]
F7["useSellersProducts.ts"]
end
end
end
end
subgraph F8["router"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["SellersRouter.tsx"]
end
end
end
subgraph FD["routes"]
subgraph FE["src"]
FF["index.ts"]
subgraph FG["lib"]
FH["seller-routes.ts"]
end
end
end
subgraph FI["screens"]
subgraph FJ["catalog"]
subgraph FK["src"]
FL["index.ts"]
subgraph FM["lib"]
FN["SellersCatalogScreens.tsx"]
FO["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FP["login"]
subgraph FQ["src"]
FR["index.ts"]
subgraph FS["lib"]
FT["SellersLogin.tsx"]
FU["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph FV["manage-product"]
subgraph FW["src"]
FX["index.ts"]
subgraph FY["lib"]
FZ["SellersManageProductScreen.tsx"]
G0["SellersDefineProductFlow.tsx"]
G1["SellersDefineProductFlow.pants-label.spec.tsx"]
G2["SellersDefineProductFlow.spec.tsx"]
G3["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph G4["products"]
subgraph G5["src"]
G6["index.ts"]
subgraph G7["lib"]
G8["SellersProducts.tsx"]
G9["SellersProducts.pants-label.spec.tsx"]
GA["SellersProducts.spec.tsx"]
end
end
end
subgraph GB["seller-orders"]
GC["jest.config.ts"]
GD["jest.setup.ts"]
subgraph GE["src"]
GF["index.ts"]
subgraph GG["lib"]
GH["seller-orders-screen.tsx"]
GI["seller-status-transitions.ts"]
GJ["seller-orders-screen.pants-size.spec.tsx"]
GK["seller-orders-screen.spec.tsx"]
GL["seller-status-transitions.spec.ts"]
end
GM["test-setup.ts"]
end
end
subgraph GN["setup-password"]
subgraph GO["src"]
GP["index.ts"]
subgraph GQ["lib"]
GR["SellersSetupPassword.tsx"]
GS["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GT["unauthorized"]
subgraph GU["src"]
GV["index.ts"]
subgraph GW["lib"]
GX["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GY["zustand"]
subgraph GZ["sellers-products-store"]
subgraph H0["src"]
H1["index.ts"]
subgraph H2["lib"]
H3["useSellersProductsStore.ts"]
H4["sellers-products-store.tsx"]
end
end
end
end
end
subgraph H5["shared"]
subgraph H6["components"]
subgraph H7["apollo-provider-base"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["ApolloProviderBase.tsx"]
HC["createSilentRefreshAuthLink.ts"]
HD["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HE["error-boundary"]
subgraph HF["src"]
HG["index.ts"]
subgraph HH["lib"]
HI["error-boundary.tsx"]
HJ["error-boundary.spec.tsx"]
end
end
HK["vite.config.ts"]
end
subgraph HL["glassmorphism-container"]
subgraph HM["src"]
HN["index.ts"]
subgraph HO["lib"]
HP["glassmorphism-container.tsx"]
HQ["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HR["layout"]
subgraph HS["src"]
HT["index.ts"]
subgraph HU["lib"]
HV["Layout.tsx"]
end
end
end
subgraph HW["material-data-table"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["material-data-table.tsx"]
I1["table-config.ts"]
I2["table-utils.ts"]
I3["material-data-table.spec.tsx"]
I4["table-types.ts"]
end
end
end
subgraph I5["order-status-chip"]
subgraph I6["src"]
I7["index.ts"]
subgraph I8["lib"]
I9["order-status-chip.tsx"]
IA["order-status-chip.spec.tsx"]
end
end
end
subgraph IB["password-field"]
subgraph IC["src"]
ID["index.ts"]
subgraph IE["lib"]
IF["PasswordTextField.tsx"]
end
end
end
subgraph IG["price-display"]
subgraph IH["src"]
II["index.ts"]
subgraph IJ["lib"]
IK["price-display.tsx"]
IL["price-display.spec.tsx"]
end
end
end
subgraph IM["private-route"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["createPrivateRoute.tsx"]
IR["PrivateRoute.tsx"]
end
end
end
subgraph IS["rtl-table-utils"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["rtl-table-utils.ts"]
IX["rtl-cell-components.tsx"]
IY["rtl-column-helpers.ts"]
IZ["rtl-table-props.ts"]
J0["use-table-alignment.ts"]
J1["rtl-table-utils.spec.tsx"]
J2["rtl-table-utils.tsx"]
end
end
end
subgraph J3["snackbar"]
subgraph J4["src"]
J5["index.ts"]
subgraph J6["lib"]
J7["snackbar.tsx"]
J8["Snackbar.tsx"]
end
end
end
subgraph J9["styled-drawer"]
subgraph JA["src"]
JB["index.ts"]
subgraph JC["lib"]
JD["styled-drawer.tsx"]
JE["styled-drawer.spec.tsx"]
end
end
end
subgraph JF["unauthorized"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["unauthorized-path.tsx"]
end
end
end
end
subgraph JK["graphql"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["currency.mutations.ts"]
JP["currency.queries.ts"]
JQ["fragments.ts"]
JR["variant-colors.ts"]
JS["client-shared-graphql.tsx"]
end
end
end
subgraph JT["hooks"]
subgraph JU["brands"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["brands.graphql.ts"]
JZ["useBrands.ts"]
end
end
K0["vite.config.ts"]
end
subgraph K1["categories"]
subgraph K2["src"]
K3["index.ts"]
subgraph K4["lib"]
K5["useCategories.ts"]
K6["categories.graphql.ts"]
end
end
end
subgraph K7["colors"]
subgraph K8["src"]
K9["index.ts"]
subgraph KA["lib"]
KB["useColors.ts"]
KC["color.graphql.ts"]
end
end
end
subgraph KD["currency"]
subgraph KE["src"]
KF["index.ts"]
subgraph KG["lib"]
KH["useConvertPrice.tsx"]
KI["useExchangeRate.tsx"]
KJ["useCurrencies.tsx"]
KK["useCurrencyForLocale.tsx"]
KL["useExchangeRate.spec.tsx"]
end
end
end
subgraph KM["products"]
subgraph KN["src"]
KO["index.ts"]
subgraph KP["lib"]
KQ["productImage.ts"]
KR["products.graphql.ts"]
KS["useProducts.ts"]
KT["productImage.spec.ts"]
end
end
end
subgraph KU["site-languages"]
subgraph KV["src"]
KW["index.ts"]
subgraph KX["lib"]
KY["site-languages.graphql.ts"]
KZ["useSiteLanguages.ts"]
L0["site-languages-hook.spec.tsx"]
end
end
L1["vite.config.ts"]
end
subgraph L2["snackbar"]
subgraph L3["src"]
L4["index.ts"]
subgraph L5["lib"]
L6["SnackbarContext.tsx"]
L7["useSnackbar.ts"]
end
end
end
subgraph L8["translations-management-hook"]
subgraph L9["src"]
LA["index.ts"]
subgraph LB["lib"]
LC["useTranslationsManagement.ts"]
end
end
end
end
subgraph LD["lottie"]
subgraph LE["empty-cart"]
subgraph LF["src"]
LG["index.ts"]
subgraph LH["lib"]
LI["lottie-empty-cart.tsx"]
LJ["lottie-empty-cart.spec.tsx"]
end
end
LK["vite.config.ts"]
end
subgraph LL["loading"]
subgraph LM["src"]
LN["index.ts"]
subgraph LO["lib"]
LP["lottie-loading.tsx"]
LQ["lottie-loading.spec.tsx"]
end
end
end
subgraph LR["success-check"]
subgraph LS["src"]
LT["index.ts"]
subgraph LU["lib"]
LV["lottie-success-check.tsx"]
LW["lottie-success-check.spec.tsx"]
end
end
end
subgraph LX["unauthorized"]
subgraph LY["src"]
LZ["index.ts"]
subgraph M0["lib"]
M1["lottie-unauthorized.tsx"]
end
end
end
end
subgraph M2["translations"]
subgraph M3["src"]
M4["index.ts"]
subgraph M5["lib"]
M6["mapApolloErrorToTranslationKey.ts"]
M7["WrapTranslation.tsx"]
end
end
end
subgraph M8["ui"]
subgraph M9["colors"]
subgraph MA["src"]
MB["index.ts"]
subgraph MC["lib"]
MD["colors.ts"]
end
end
end
subgraph ME["language-components"]
subgraph MF["src"]
MG["index.ts"]
subgraph MH["lib"]
MI["language-components.tsx"]
MJ["ltr-text-field.tsx"]
end
end
end
subgraph MK["sizes"]
subgraph ML["src"]
MM["index.ts"]
subgraph MN["lib"]
MO["sizes.ts"]
MP["sizes.spec.tsx"]
MQ["sizes.tsx"]
end
end
end
end
subgraph MR["zustand"]
subgraph MS["shared-auth-store"]
subgraph MT["src"]
MU["index.ts"]
subgraph MV["lib"]
MW["shared-auth-store.ts"]
end
end
end
subgraph MX["shared-notification-store"]
subgraph MY["src"]
MZ["index.ts"]
subgraph N0["lib"]
N1["shared-notification-store.tsx"]
end
end
end
subgraph N2["shared-ui-store"]
subgraph N3["src"]
N4["index.ts"]
subgraph N5["lib"]
N6["shared-ui-store.ts"]
N7["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph N8["server"]
subgraph N9["controllers"]
subgraph NA["src"]
NB["index.ts"]
subgraph NC["lib"]
ND["auth.controller.ts"]
NE["order.controller.ts"]
end
end
end
subgraph NF["decorators"]
NG["jest.config.ts"]
subgraph NH["src"]
NI["index.ts"]
subgraph NJ["lib"]
NK["current-user.decorator.ts"]
NL["decorators.ts"]
NM["decorators.spec.ts"]
end
end
end
subgraph NN["entities"]
subgraph NO["src"]
NP["index.ts"]
subgraph NQ["lib"]
NR["brand.entity.ts"]
NS["product.entity.ts"]
NT["category.entity.ts"]
NU["product-description.entity.ts"]
NV["site-language.entity.ts"]
NW["product-info.entity.ts"]
NX["color.entity.ts"]
NY["product-info-color.entity.ts"]
NZ["seller-info.entity.ts"]
O0["seller-product.entity.ts"]
O1["user.entity.ts"]
O2["cart.entity.ts"]
O3["currency-preference.entity.ts"]
O4["currency.entity.ts"]
O5["customer.entity.ts"]
O6["exchange-rate.entity.ts"]
O7["order.entity.ts"]
O8["platform-settings.entity.ts"]
O9["refresh-token.entity.ts"]
OA["seller-order.entity.ts"]
OB["translation.entity.ts"]
end
end
end
subgraph OC["guards"]
OD["jest.config.ts"]
subgraph OE["src"]
OF["index.ts"]
subgraph OG["lib"]
OH["catalog.guard.ts"]
OI["graphql-auth.guard.ts"]
OJ["http-auth.guard.ts"]
OK["roles.guard.ts"]
OL["catalog.guard.spec.ts"]
OM["roles.guard.spec.ts"]
end
end
end
subgraph ON["inputs"]
subgraph OO["src"]
OP["index.ts"]
subgraph OQ["lib"]
OR["brand.input.ts"]
OS["cart.inputs.ts"]
OT["category.input.ts"]
OU["color.input.ts"]
OV["customer-auth.inputs.ts"]
OW["order-pagination.inputs.ts"]
OX["order.inputs.ts"]
OY["product-info-filter.input.ts"]
OZ["product.input.ts"]
P0["seller-order-pagination.inputs.ts"]
P1["seller.input.ts"]
P2["site-language.input.ts"]
P3["user.input.ts"]
end
end
end
subgraph P4["modules"]
subgraph P5["src"]
P6["index.ts"]
subgraph P7["lib"]
P8["auth.module.ts"]
P9["email.module.ts"]
PA["token.module.ts"]
PB["user.module.ts"]
PC["customer-profile.module.ts"]
PD["brand.module.ts"]
PE["catalog-guard.module.ts"]
PF["translation.module.ts"]
PG["cart.module.ts"]
PH["platform-settings.module.ts"]
PI["category.module.ts"]
PJ["product.module.ts"]
PK["color.module.ts"]
PL["currency.module.ts"]
PM["graphql-context.module.ts"]
PN["order.module.ts"]
PO["seller-info.module.ts"]
PP["payment.module.ts"]
PQ["product-info.module.ts"]
PR["seller-products.module.ts"]
PS["site-language.module.ts"]
end
end
end
subgraph PT["resolvers"]
PU["jest.config.ts"]
subgraph PV["src"]
PW["index.ts"]
subgraph PX["lib"]
PY["auth.resolver.ts"]
PZ["zod-validation.pipe.ts"]
Q0["brand.resolver.ts"]
Q1["cart.resolver.ts"]
Q2["category.resolver.ts"]
Q3["color.resolver.ts"]
Q4["currency.resolver.ts"]
Q5["customer-profile.resolver.ts"]
Q6["order.resolver.ts"]
Q7["payment.resolver.ts"]
Q8["product-info.resolver.ts"]
Q9["product.resolver.ts"]
QA["seller-info.resolver.ts"]
QB["shipping.resolver.ts"]
QC["site-language.resolver.ts"]
QD["translation.input.ts"]
QE["translation.resolver.ts"]
QF["user.resolver.ts"]
QG["auth-validation.spec.ts"]
QH["auth.resolver.spec.ts"]
QI["cart-validation.spec.ts"]
QJ["order.resolver.spec.ts"]
QK["order.resolver.status-transitions.spec.ts"]
QL["order.resolver.tracking.spec.ts"]
QM["payment.resolver.integration.spec.ts"]
QN["payment.resolver.spec.ts"]
QO["product-info.resolver.spec.ts"]
QP["translation.resolver.guards.spec.ts"]
subgraph QQ["types"]
QR["graphql-upload.d.ts"]
end
QS["user.resolver.spec.ts"]
QT["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QU["services"]
QV["jest.config.ts"]
subgraph QW["src"]
QX["index.ts"]
subgraph QY["lib"]
QZ["auth.service.ts"]
R0["brand.service.ts"]
R1["cart.service.ts"]
R2["product-info-colors.util.ts"]
R3["category.service.ts"]
R4["color.service.ts"]
R5["currency.service.ts"]
R6["customer-profile.service.ts"]
R7["email.service.ts"]
R8["image-upload.service.ts"]
R9["order.service.ts"]
RA["payment-logger.service.ts"]
RB["payment.service.ts"]
RC["product.service.ts"]
RD["seller-info.service.ts"]
RE["shipping-calculation.service.ts"]
RF["site-language.service.ts"]
RG["token.service.ts"]
RH["translation.service.ts"]
RI["user.service.ts"]
RJ["auth.service.password-policy.spec.ts"]
RK["auth.service.spec.ts"]
RL["cart.service.add-quantity.spec.ts"]
RM["cart.service.null-relations.spec.ts"]
RN["cart.service.spec.ts"]
RO["order.service.spec.ts"]
RP["order.service.tracking.spec.ts"]
RQ["product-info-colors.util.spec.ts"]
RR["product.service.pants.spec.ts"]
RS["product.service.spec.ts"]
RT["relay-connection.spec.ts"]
RU["seller-info.service.price-validation.spec.ts"]
RV["shipping-calculation.service.spec.ts"]
RW["token.service.spec.ts"]
end
end
end
subgraph RX["strategies"]
subgraph RY["src"]
RZ["index.ts"]
subgraph S0["lib"]
S1["local.strategy.ts"]
end
end
end
subgraph S2["utils"]
subgraph S3["src"]
S4["index.ts"]
subgraph S5["lib"]
S6["email-templates.ts"]
S7["relay-connection.ts"]
S8["pagination.ts"]
end
end
end
end
subgraph S9["shared"]
subgraph SA["codegen"]
SB["jest.config.ts"]
subgraph SC["src"]
SD["index.ts"]
subgraph SE["lib"]
subgraph SF["generated"]
SG["graphql.ts"]
end
end
end
end
subgraph SH["graphql-schema"]
SI["jest.config.ts"]
subgraph SJ["src"]
SK["index.ts"]
end
end
subgraph SL["product-sizes"]
subgraph SM["src"]
SN["index.ts"]
subgraph SO["lib"]
SP["product-sizes.ts"]
SQ["product-sizes.pants-formats.spec.ts"]
SR["product-sizes.pants-label.spec.ts"]
SS["product-sizes.pants-strict.spec.ts"]
ST["product-sizes.spec.ts"]
end
end
end
subgraph SU["shared-i18n"]
subgraph SV["src"]
SW["index.ts"]
subgraph SX["lib"]
SY["language-context.tsx"]
SZ["language-detector.ts"]
subgraph T0["locales"]
T1["i18n-react.tsx"]
T2["i18n-util.ts"]
T3["i18n-util.async.ts"]
subgraph T4["en"]
T5["index.ts"]
end
subgraph T7["fa"]
T8["index.ts"]
end
T9["formatters.ts"]
TA["i18n-types.ts"]
TB["i18n-util.sync.ts"]
TC["navigator-detector.ts"]
end
T6["site-name.ts"]
TD["table-localization.ts"]
TE["theme-provider.tsx"]
TF["use-page-title.ts"]
end
end
end
subgraph TG["validation"]
subgraph TH["src"]
TI["index.ts"]
subgraph TJ["lib"]
TK["auth.ts"]
TL["limits.ts"]
TM["primitives.ts"]
TN["auth-forms.ts"]
TO["cart.ts"]
TP["errors.ts"]
TQ["auth-forms.admin.spec.ts"]
TR["auth-forms.login.spec.ts"]
TS["auth-forms.recovery.spec.ts"]
TT["auth-forms.seller.spec.ts"]
TU["auth-forms.spec.ts"]
TV["auth.spec.ts"]
TW["cart.spec.ts"]
TX["errors.spec.ts"]
TY["primitives.spec.ts"]
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
8K-->8M
8P-->8R
8S-->8R
8T-->8R
8W-->8Y
91-->93
91-->94
91-->95
93-->94
94-->95
96-->93
99-->9B
9E-->9G
9H-->9G
9K-->9M
9N-->9M
9O-->9M
9S-->9U
9V-->9U
9W-->9U
9X-->9U
A0-->A2
A3-->A2
A4-->A2
A7-->A9
AA-->A9
AE-->AG
AH-->AG
AL-->AN
AL-->AW
AL-->AQ
AL-->AV
AN-->AP
AN-->AR
AN-->AS
AN-->AT
AN-->AU
AN-->AQ
AN-->AV
AP-->AQ
AW-->AQ
AX-->AT
AX-->AN
AX-->AQ
AY-->AZ
AY-->AT
AY-->AN
AY-->AW
AY-->AQ
B0-->AW
B1-->AQ
B3-->AQ
B7-->B9
BA-->B9
BB-->B9
BE-->BG
BH-->BG
BL-->BN
BO-->BN
BS-->BU
BV-->BU
BW-->BU
BX-->BU
BY-->BU
C2-->C4
C5-->C4
C6-->C4
C9-->CB
CC-->CB
CG-->CI
CM-->CO
CR-->CT
CU-->CT
CU-->CV
CZ-->D1
D2-->D1
D6-->D8
D9-->D8
DD-->DF
DG-->DF
DI-->DK
DP-->DR
DS-->DR
DV-->DX
E0-->E2
E0-->E3
E2-->E3
E7-->E9
EA-->E9
ED-->EF
ED-->EG
ED-->EH
ED-->EK
EH-->EI
EI-->EJ
EK-->EF
EK-->EL
ES-->EU
EU-->EV
EY-->F0
F4-->F6
F4-->F7
FA-->FC
FF-->FH
FL-->FN
FO-->FN
FR-->FT
FU-->FT
FX-->FZ
FZ-->G0
G1-->G0
G2-->G0
G3-->FZ
G6-->G8
G9-->G8
GA-->G8
GF-->GH
GH-->GI
GJ-->GH
GK-->GH
GL-->GI
GP-->GR
GS-->GR
GV-->GX
H1-->H3
H9-->HB
H9-->HC
HD-->HC
HG-->HI
HJ-->HI
HN-->HP
HQ-->HP
HT-->HV
HY-->I0
HY-->I1
HY-->I2
I0-->I1
I3-->I0
I7-->I9
IA-->I9
ID-->IF
II-->IK
IL-->IK
IO-->IQ
IQ-->IR
IU-->IW
IW-->IX
IW-->IY
IW-->IZ
IW-->J0
IY-->IX
IY-->IZ
J1-->J2
J5-->J7
JB-->JD
JE-->JD
JH-->JJ
JM-->JO
JM-->JP
JM-->JQ
JM-->JR
JW-->JY
JW-->JZ
JZ-->JY
K3-->K5
K5-->K6
K9-->KB
KB-->KC
KF-->KH
KF-->KJ
KF-->KK
KF-->KI
KH-->KI
KL-->KI
KO-->KQ
KO-->KR
KO-->KS
KS-->KR
KT-->KQ
KW-->KY
KW-->KZ
KZ-->KY
L0-->KZ
L4-->L6
L4-->L7
L7-->L6
LA-->LC
LG-->LI
LJ-->LI
LN-->LP
LQ-->LP
LT-->LV
LW-->LV
LZ-->M1
M4-->M6
MB-->MD
MG-->MI
MG-->MJ
MM-->MO
MP-->MQ
MU-->MW
MZ-->N1
N4-->N6
NB-->ND
NB-->NE
NI-->NK
NI-->NL
NM-->NL
NP-->NR
NP-->O2
NP-->NT
NP-->NX
NP-->O3
NP-->O4
NP-->O5
NP-->O6
NP-->O7
NP-->O8
NP-->NU
NP-->NY
NP-->NW
NP-->NS
NP-->O9
NP-->NZ
NP-->OA
NP-->O0
NP-->NV
NP-->OB
NP-->O1
NR-->NS
NS-->NR
NS-->NT
NS-->NU
NS-->NW
NS-->NZ
NS-->O0
NT-->NS
NU-->NS
NU-->NV
NV-->NU
NW-->NX
NW-->NY
NW-->NS
NY-->NX
NY-->NW
NZ-->O0
NZ-->O1
O0-->NW
O0-->NS
O0-->NZ
O2-->NS
O2-->O1
O3-->O4
O5-->O1
O6-->O4
O6-->O1
O7-->NS
O7-->NZ
O9-->O1
OA-->O7
OF-->OH
OF-->OI
OF-->OJ
OF-->OK
OL-->OH
OM-->OK
OP-->OR
OP-->OS
OP-->OT
OP-->OU
OP-->OV
OP-->OW
OP-->OX
OP-->OY
OP-->OZ
OP-->P0
OP-->P1
OP-->P2
OP-->P3
OZ-->OY
P6-->P8
P6-->PD
P6-->PG
P6-->PE
P6-->PI
P6-->PK
P6-->PL
P6-->PC
P6-->P9
P6-->PM
P6-->PN
P6-->PP
P6-->PH
P6-->PQ
P6-->PJ
P6-->PO
P6-->PR
P6-->PS
P6-->PA
P6-->PF
P6-->PB
P8-->P9
P8-->PA
P8-->PB
PB-->P8
PB-->PC
PD-->PE
PD-->PF
PG-->PH
PI-->PE
PI-->PJ
PI-->PF
PJ-->PE
PJ-->PA
PJ-->PF
PK-->PE
PK-->PF
PM-->P9
PM-->PA
PM-->PB
PN-->PH
PN-->PO
PO-->PJ
PO-->PA
PO-->PB
PP-->PL
PP-->PN
PQ-->PJ
PQ-->PF
PR-->PO
PR-->PB
PW-->PY
PW-->Q0
PW-->Q1
PW-->Q2
PW-->Q3
PW-->Q4
PW-->Q5
PW-->Q6
PW-->Q7
PW-->Q8
PW-->Q9
PW-->QA
PW-->QB
PW-->QC
PW-->QD
PW-->QE
PW-->QF
PW-->PZ
PY-->PZ
Q1-->PZ
QF-->PZ
QG-->PY
QG-->QF
QG-->PZ
QH-->PY
QI-->Q1
QI-->PZ
QJ-->Q6
QK-->Q6
QL-->Q6
QM-->Q7
QN-->Q7
QO-->Q8
QP-->QE
QS-->QF
QT-->PZ
QX-->QZ
QX-->R0
QX-->R1
QX-->R3
QX-->R4
QX-->R5
QX-->R6
QX-->R7
QX-->R8
QX-->R9
QX-->RA
QX-->RB
QX-->R2
QX-->RC
QX-->RD
QX-->RE
QX-->RF
QX-->RG
QX-->RH
QX-->RI
R1-->R2
RC-->R2
RD-->R2
RJ-->QZ
RJ-->R7
RJ-->RG
RJ-->RI
RK-->QZ
RK-->R7
RK-->RG
RK-->RI
RL-->R1
RM-->R1
RN-->R1
RO-->R9
RP-->R9
RQ-->R2
RR-->RC
RR-->RH
RS-->RC
RS-->RH
RU-->QZ
RU-->RD
RV-->RE
RW-->RG
RZ-->S1
S4-->S6
S4-->S7
SD-->SG
SN-->SP
SQ-->SP
SR-->SP
SS-->SP
ST-->SP
SW-->SY
SW-->SZ
SW-->T1
SW-->TA
SW-->T2
SW-->T3
SW-->TB
SW-->TC
SW-->T6
SW-->TD
SW-->TE
SW-->TF
SY-->SZ
SY-->T1
SY-->T3
T1-->T2
T3-->T5
T3-->T8
T3-->T9
T3-->T2
T5-->T6
T8-->T6
TB-->T5
TB-->T8
TB-->T9
TB-->T2
TD-->T1
TE-->SY
TF-->T1
TI-->TK
TI-->TN
TI-->TO
TI-->TP
TI-->TL
TI-->TM
TK-->TL
TK-->TM
TM-->TL
TN-->TK
TO-->TM
TQ-->TN
TR-->TN
TS-->TN
TT-->TN
TU-->TN
TV-->TK
TW-->TO
TX-->TP
TY-->TL
TY-->TM
