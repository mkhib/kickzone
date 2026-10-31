flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.spec.ts"]
5["app.module.ts"]
6["cart-inputs.validation.spec.ts"]
7["global-validation-pipe.spec.ts"]
8["global-validation-pipe.ts"]
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
3C["admin-seller-orders.status-schema.spec.ts"]
end
end
end
subgraph 3D["currency-management"]
subgraph 3E["src"]
3F["index.ts"]
subgraph 3G["lib"]
3H["currency-management.tsx"]
3I["currency-management.rate-validation.spec.tsx"]
3J["currency-management.spec.tsx"]
end
end
end
subgraph 3K["customer-management"]
subgraph 3L["src"]
3M["index.ts"]
subgraph 3N["lib"]
3O["admin-customer-management.tsx"]
3P["admin-customer-management.spec.tsx"]
end
end
3Q["vite.config.ts"]
end
subgraph 3R["login"]
subgraph 3S["src"]
3T["index.ts"]
subgraph 3U["lib"]
3V["AdminsLogin.tsx"]
3W["AdminsLogin.spec.tsx"]
3X["AdminsLogin.zod.spec.tsx"]
end
end
end
subgraph 3Y["product-editor"]
subgraph 3Z["src"]
40["index.spec.tsx"]
41["index.ts"]
subgraph 42["lib"]
43["AdminProductEditor.tsx"]
44["AdminProductEditor.color-validation.spec.tsx"]
45["AdminProductEditor.pants-range.spec.tsx"]
46["AdminProductEditor.spec.tsx"]
end
47["vite-env.d.ts"]
end
end
subgraph 48["products"]
subgraph 49["src"]
4A["index.spec.tsx"]
4B["index.ts"]
subgraph 4C["lib"]
4D["AdminProducts.tsx"]
4E["adminProducts.hooks.ts"]
4F["adminProducts.graphql.ts"]
4G["ProductImageManagementModal.tsx"]
4H["AdminProducts.spec.tsx"]
4I["ProductImageManagementModal.pants-size.spec.tsx"]
4J["ProductImageManagementModal.spec.tsx"]
end
4K["vite-env.d.ts"]
end
end
subgraph 4L["seller-management"]
subgraph 4M["src"]
4N["index.spec.tsx"]
4O["index.ts"]
subgraph 4P["lib"]
4Q["SellerManagement.tsx"]
4R["SellerManagement.form-validation.spec.tsx"]
4S["SellerManagement.spec.tsx"]
end
4T["vite-env.d.ts"]
end
end
subgraph 4U["translation-management"]
subgraph 4V["src"]
4W["index.ts"]
subgraph 4X["lib"]
4Y["AdminTranslationManagement.tsx"]
4Z["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 50["unauthorized"]
subgraph 51["src"]
52["index.spec.tsx"]
53["index.ts"]
subgraph 54["lib"]
55["admins-unauthorized-screen.tsx"]
56["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 57["zustand"]
subgraph 58["admins-products-store"]
subgraph 59["src"]
5A["index.spec.ts"]
5B["index.ts"]
subgraph 5C["lib"]
5D["admins-products-store.ts"]
5E["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 5F["customers"]
subgraph 5G["components"]
subgraph 5H["footer"]
subgraph 5I["src"]
5J["index.ts"]
subgraph 5K["lib"]
5L["customers-footer.tsx"]
5M["TrustBadgeIcons.tsx"]
5N["customers-footer.spec.tsx"]
end
end
end
subgraph 5O["headerbar"]
subgraph 5P["src"]
5Q["index.ts"]
subgraph 5R["lib"]
5S["CustomersHeaderbar.tsx"]
5T["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5U["layout"]
subgraph 5V["src"]
5W["index.ts"]
subgraph 5X["lib"]
5Y["CustomersLayout.tsx"]
5Z["CustomersTabbar.tsx"]
60["CustomersLayout.spec.tsx"]
61["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 62["product-card"]
subgraph 63["src"]
64["index.ts"]
subgraph 65["lib"]
66["CustomersProductCard.tsx"]
67["CustomersProductCard.no-low-stock.spec.tsx"]
68["CustomersProductCard.pants-size.spec.tsx"]
69["CustomersProductCard.spec.tsx"]
end
6A["vite-env.d.ts"]
end
end
end
subgraph 6B["contexts"]
subgraph 6C["auth"]
subgraph 6D["src"]
6E["index.ts"]
subgraph 6F["lib"]
6G["CustomersAuthContext.tsx"]
6H["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6I["graphql"]
subgraph 6J["src"]
6K["index.ts"]
subgraph 6L["lib"]
6M["customer-profile.queries.ts"]
6N["mutations.ts"]
6O["Provider.tsx"]
6P["CustomersApolloProvider.tsx"]
6Q["client.ts"]
6R["queries.ts"]
6S["apollo-upload-client.d.ts"]
end
end
end
subgraph 6T["hooks"]
subgraph 6U["auth"]
subgraph 6V["src"]
6W["index.ts"]
subgraph 6X["lib"]
6Y["useCustomersForgotPassword.tsx"]
6Z["useCustomersLogin.tsx"]
70["useCustomersRegister.tsx"]
71["useCustomersResetPassword.tsx"]
72["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 73["cart"]
74["jest.config.ts"]
75["jest.setup.ts"]
subgraph 76["src"]
77["index.ts"]
subgraph 78["lib"]
79["customers-cart-hook.tsx"]
7A["useCartService.ts"]
7B["useWishlistSync.ts"]
7C["useCartService.spec.tsx"]
7D["useCartSync.ts"]
end
end
end
subgraph 7E["orders"]
subgraph 7F["src"]
7G["index.ts"]
subgraph 7H["lib"]
7I["customers-orders-hook.tsx"]
end
end
end
subgraph 7J["products"]
subgraph 7K["src"]
7L["index.ts"]
subgraph 7M["lib"]
7N["customers-product-hook.tsx"]
end
end
end
end
subgraph 7O["router"]
subgraph 7P["src"]
7Q["index.ts"]
subgraph 7R["lib"]
7S["CustomersRouter.tsx"]
7T["ScrollToTop.tsx"]
7U["CustomersRouter.spec.tsx"]
7V["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7W["routes"]
subgraph 7X["src"]
7Y["index.ts"]
subgraph 7Z["lib"]
80["customer-routes.ts"]
81["customer-routes.spec.ts"]
end
end
end
subgraph 82["screens"]
subgraph 83["contact"]
subgraph 84["src"]
85["index.ts"]
subgraph 86["lib"]
87["customer-contact.tsx"]
88["customer-contact.spec.tsx"]
89["customer-contact.validation.spec.tsx"]
end
end
8A["vite.config.ts"]
end
subgraph 8B["customer-checkout"]
subgraph 8C["src"]
8D["index.ts"]
subgraph 8E["lib"]
8F["customer-checkout.tsx"]
end
end
end
subgraph 8G["customer-favorites"]
subgraph 8H["src"]
8I["index.ts"]
subgraph 8J["lib"]
8K["customer-favorites.tsx"]
8L["customer-favorites.shared-card.spec.tsx"]
8M["customer-favorites.spec.tsx"]
end
end
8N["vite.config.ts"]
end
subgraph 8O["customer-login"]
subgraph 8P["src"]
8Q["index.ts"]
subgraph 8R["lib"]
8S["customer-login.tsx"]
end
end
end
subgraph 8T["customer-order-confirmation"]
subgraph 8U["src"]
8V["index.ts"]
subgraph 8W["lib"]
8X["customer-order-confirmation.tsx"]
8Y["customer-order-confirmation.pants-size.spec.tsx"]
8Z["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 90["customer-orders"]
subgraph 91["src"]
92["index.ts"]
subgraph 93["lib"]
94["customer-orders.tsx"]
end
end
end
subgraph 95["customer-payment"]
subgraph 96["src"]
97["index.ts"]
subgraph 98["lib"]
99["customer-payment-callback.tsx"]
9A["use-zarinpal-payment.tsx"]
9B["zarinpal-payment-service.ts"]
9C["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 9D["customer-products"]
subgraph 9E["src"]
9F["index.ts"]
subgraph 9G["lib"]
9H["customer-products.tsx"]
end
end
end
subgraph 9I["customer-profile"]
subgraph 9J["src"]
9K["index.ts"]
subgraph 9L["lib"]
9M["customer-profile.tsx"]
9N["customer-profile.spec.tsx"]
9O["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9P["customer-shopping-cart"]
subgraph 9Q["src"]
9R["index.ts"]
subgraph 9S["lib"]
9T["customer-shopping-cart.tsx"]
9U["customer-shopping-cart.pants-size.spec.tsx"]
9V["customer-shopping-cart.shipping-form.spec.tsx"]
9W["customer-shopping-cart.spec.tsx"]
end
end
9X["vite.config.ts"]
end
subgraph 9Y["customer-signup"]
subgraph 9Z["src"]
A0["index.ts"]
subgraph A1["lib"]
A2["customer-signup.tsx"]
A3["customer-signup.password-length.spec.tsx"]
A4["customer-signup.spec.tsx"]
A5["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A6["forgot-password"]
subgraph A7["src"]
A8["index.ts"]
subgraph A9["lib"]
AA["customer-forgot-password.tsx"]
AB["customer-forgot-password.spec.tsx"]
AC["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph AD["guide-authenticity"]
subgraph AE["src"]
AF["index.ts"]
subgraph AG["lib"]
AH["customer-guide-authenticity.tsx"]
AI["customer-guide-authenticity.spec.tsx"]
end
end
AJ["vite.config.ts"]
end
subgraph AK["guide-payment"]
subgraph AL["src"]
AM["index.ts"]
subgraph AN["lib"]
AO["customer-guide-payment.tsx"]
AP["customer-guide-payment.spec.tsx"]
end
end
AQ["vite.config.ts"]
end
subgraph AR["home"]
subgraph AS["src"]
AT["index.ts"]
subgraph AU["lib"]
AV["CustomersHomeScreen.tsx"]
subgraph AW["components"]
AX["CategoryBentoSection.tsx"]
AZ["HeroSection.tsx"]
B0["HomeLoadingScreen.tsx"]
B1["PicksRailSection.tsx"]
B2["TrustStripSection.tsx"]
B7["NewArrivalsSection.tsx"]
BA["BrandBlocksSection.tsx"]
BB["NewsletterSection.tsx"]
BC["ShopTheLookSection.tsx"]
BD["TickerSection.tsx"]
end
AY["home-selectors.ts"]
B3["useScrollProgress.ts"]
B4["CustomersShopScreen.tsx"]
B5["CustomersHomeScreen.cart-size.spec.tsx"]
B6["CustomersHomeScreen.spec.tsx"]
B8["CustomersShopScreen.cart-size.spec.tsx"]
B9["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BE["login"]
subgraph BF["src"]
BG["index.ts"]
subgraph BH["lib"]
BI["CustomersLoginScreen.tsx"]
BJ["CustomersLoginScreen.spec.tsx"]
BK["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BL["not-found"]
subgraph BM["src"]
BN["index.ts"]
subgraph BO["lib"]
BP["customer-not-found.tsx"]
BQ["customer-not-found.spec.tsx"]
end
end
BR["vite.config.ts"]
end
subgraph BS["privacy-policy"]
subgraph BT["src"]
BU["index.ts"]
subgraph BV["lib"]
BW["customer-privacy-policy.tsx"]
BX["customer-privacy-policy.spec.tsx"]
end
end
BY["vite.config.ts"]
end
subgraph BZ["product-details"]
subgraph C0["src"]
C1["index.ts"]
subgraph C2["lib"]
C3["customer-product-details.tsx"]
C4["reviews-flag.ts"]
C5["customer-product-details.guarantee.spec.tsx"]
C6["customer-product-details.no-low-stock.spec.tsx"]
C7["customer-product-details.pants-size.spec.tsx"]
C8["customer-product-details.reviews-hidden.spec.tsx"]
C9["customer-product-details.spec.tsx"]
end
end
CA["vite.config.ts"]
end
subgraph CB["reset-password"]
subgraph CC["src"]
CD["index.ts"]
subgraph CE["lib"]
CF["customer-reset-password.tsx"]
CG["customer-reset-password.password-length.spec.tsx"]
CH["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CI["shipping-returns"]
subgraph CJ["src"]
CK["index.ts"]
subgraph CL["lib"]
CM["customer-shipping-returns.tsx"]
CN["customer-shipping-returns.spec.tsx"]
end
end
CO["vite.config.ts"]
end
subgraph CP["unauthorized"]
subgraph CQ["src"]
CR["index.ts"]
subgraph CS["lib"]
CT["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CU["utility"]
subgraph CV["test"]
subgraph CW["src"]
CX["index.ts"]
subgraph CY["lib"]
CZ["customers-test-utility.tsx"]
end
end
end
end
subgraph D0["validations"]
subgraph D1["src"]
D2["index.ts"]
subgraph D3["lib"]
D4["shipping-validation.ts"]
D5["shipping-validation.shared.spec.ts"]
D6["shipping-validation.spec.tsx"]
D7["shipping-validation.tsx"]
end
end
end
subgraph D8["zustand"]
subgraph D9["customer-cart-store"]
subgraph DA["src"]
DB["index.ts"]
subgraph DC["lib"]
DD["customer-cart-store.ts"]
DE["customer-cart-store.spec.ts"]
DF["customer-cart-store.tsx"]
end
end
end
subgraph DG["customer-checkout-store"]
subgraph DH["src"]
DI["index.ts"]
subgraph DJ["lib"]
DK["customer-checkout-store.ts"]
DL["customer-checkout-store.spec.ts"]
end
end
DM["vite.config.ts"]
end
subgraph DN["customer-wishlist-store"]
subgraph DO["src"]
DP["index.ts"]
subgraph DQ["lib"]
DR["customer-wishlist-store.ts"]
DS["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DT["src"]
DU["index.ts"]
subgraph DV["lib"]
DW["customers-products-store.tsx"]
end
end
end
end
subgraph DX["sellers"]
subgraph DY["components"]
subgraph DZ["footer"]
subgraph E0["src"]
E1["index.ts"]
subgraph E2["lib"]
E3["sellers-footer.tsx"]
E4["sellers-footer.spec.tsx"]
end
end
end
subgraph E5["headerbar"]
subgraph E6["src"]
E7["index.ts"]
subgraph E8["lib"]
E9["SellersHeaderbar.tsx"]
end
end
end
subgraph EA["layout"]
subgraph EB["src"]
EC["index.ts"]
subgraph ED["lib"]
EE["SellersLayout.tsx"]
EF["SellersTabbar.tsx"]
end
end
end
end
subgraph EG["contexts"]
subgraph EH["auth"]
subgraph EI["src"]
EJ["index.ts"]
subgraph EK["lib"]
EL["SellersAuthContext.tsx"]
EM["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EN["graphql"]
subgraph EO["src"]
EP["index.ts"]
subgraph EQ["lib"]
ER["fragments.ts"]
ES["mutations.ts"]
ET["Provider.tsx"]
EU["SellersApolloProvider.tsx"]
EV["client.ts"]
EW["queries.ts"]
EX["seller-orders.graphql.ts"]
EY["apollo-upload-client.d.ts"]
end
subgraph EZ["types"]
F0["apollo-upload-client.d.ts"]
end
end
end
subgraph F1["hooks"]
subgraph F2["auth"]
subgraph F3["src"]
F4["index.ts"]
subgraph F5["lib"]
F6["useSellerAuth.ts"]
F7["sellerAuth.graphql.ts"]
end
end
end
subgraph F8["orders"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["useSellerOrders.ts"]
FD["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FE["products"]
subgraph FF["src"]
FG["index.ts"]
subgraph FH["lib"]
FI["useSellersProductManagement.ts"]
FJ["useSellersProducts.ts"]
end
end
end
end
subgraph FK["router"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["SellersRouter.tsx"]
end
end
end
subgraph FP["routes"]
subgraph FQ["src"]
FR["index.ts"]
subgraph FS["lib"]
FT["seller-routes.ts"]
end
end
end
subgraph FU["screens"]
subgraph FV["catalog"]
subgraph FW["src"]
FX["index.ts"]
subgraph FY["lib"]
FZ["SellersCatalogScreens.tsx"]
G0["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph G1["login"]
subgraph G2["src"]
G3["index.ts"]
subgraph G4["lib"]
G5["SellersLogin.tsx"]
G6["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G7["manage-product"]
subgraph G8["src"]
G9["index.ts"]
subgraph GA["lib"]
GB["SellersManageProductScreen.tsx"]
GC["SellersDefineProductFlow.tsx"]
GD["SellersDefineProductFlow.pants-label.spec.tsx"]
GE["SellersDefineProductFlow.spec.tsx"]
GF["SellersManageProductScreen.spec.tsx"]
GG["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GH["products"]
subgraph GI["src"]
GJ["index.ts"]
subgraph GK["lib"]
GL["SellersProducts.tsx"]
GM["SellersProducts.pants-label.spec.tsx"]
GN["SellersProducts.spec.tsx"]
end
end
end
subgraph GO["seller-orders"]
GP["jest.config.ts"]
GQ["jest.setup.ts"]
subgraph GR["src"]
GS["index.ts"]
subgraph GT["lib"]
GU["seller-orders-screen.tsx"]
GV["seller-status-transitions.ts"]
GW["seller-orders-screen.pants-size.spec.tsx"]
GX["seller-orders-screen.spec.tsx"]
GY["seller-orders-screen.status-schema.spec.ts"]
GZ["seller-status-transitions.spec.ts"]
end
H0["test-setup.ts"]
end
end
subgraph H1["setup-password"]
subgraph H2["src"]
H3["index.ts"]
subgraph H4["lib"]
H5["SellersSetupPassword.tsx"]
H6["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H7["unauthorized"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph HC["zustand"]
subgraph HD["sellers-products-store"]
subgraph HE["src"]
HF["index.ts"]
subgraph HG["lib"]
HH["useSellersProductsStore.ts"]
HI["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HJ["shared"]
subgraph HK["components"]
subgraph HL["apollo-provider-base"]
subgraph HM["src"]
HN["index.ts"]
subgraph HO["lib"]
HP["ApolloProviderBase.tsx"]
HQ["createSilentRefreshAuthLink.ts"]
HR["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HS["error-boundary"]
subgraph HT["src"]
HU["index.ts"]
subgraph HV["lib"]
HW["error-boundary.tsx"]
HX["error-boundary.spec.tsx"]
end
end
HY["vite.config.ts"]
end
subgraph HZ["glassmorphism-container"]
subgraph I0["src"]
I1["index.ts"]
subgraph I2["lib"]
I3["glassmorphism-container.tsx"]
I4["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I5["layout"]
subgraph I6["src"]
I7["index.ts"]
subgraph I8["lib"]
I9["Layout.tsx"]
end
end
end
subgraph IA["material-data-table"]
subgraph IB["src"]
IC["index.ts"]
subgraph ID["lib"]
IE["material-data-table.tsx"]
IF["table-config.ts"]
IG["table-utils.ts"]
IH["material-data-table.spec.tsx"]
II["table-types.ts"]
end
end
end
subgraph IJ["order-status-chip"]
subgraph IK["src"]
IL["index.ts"]
subgraph IM["lib"]
IN["order-status-chip.tsx"]
IO["order-status-chip.spec.tsx"]
end
end
end
subgraph IP["password-field"]
subgraph IQ["src"]
IR["index.ts"]
subgraph IS["lib"]
IT["PasswordTextField.tsx"]
end
end
end
subgraph IU["price-display"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["price-display.tsx"]
IZ["price-display.spec.tsx"]
end
end
end
subgraph J0["private-route"]
subgraph J1["src"]
J2["index.ts"]
subgraph J3["lib"]
J4["createPrivateRoute.tsx"]
J5["PrivateRoute.tsx"]
end
end
end
subgraph J6["rtl-table-utils"]
subgraph J7["src"]
J8["index.ts"]
subgraph J9["lib"]
JA["rtl-table-utils.ts"]
JB["rtl-cell-components.tsx"]
JC["rtl-column-helpers.ts"]
JD["rtl-table-props.ts"]
JE["use-table-alignment.ts"]
JF["rtl-table-utils.spec.tsx"]
JG["rtl-table-utils.tsx"]
end
end
end
subgraph JH["snackbar"]
subgraph JI["src"]
JJ["index.ts"]
subgraph JK["lib"]
JL["snackbar.tsx"]
end
end
end
subgraph JM["styled-drawer"]
subgraph JN["src"]
JO["index.ts"]
subgraph JP["lib"]
JQ["styled-drawer.tsx"]
JR["styled-drawer.spec.tsx"]
end
end
end
subgraph JS["unauthorized"]
subgraph JT["src"]
JU["index.ts"]
subgraph JV["lib"]
JW["unauthorized-path.tsx"]
end
end
end
end
subgraph JX["graphql"]
subgraph JY["src"]
JZ["index.ts"]
subgraph K0["lib"]
K1["currency.mutations.ts"]
K2["currency.queries.ts"]
K3["fragments.ts"]
K4["variant-colors.ts"]
K5["client-shared-graphql.tsx"]
end
end
end
subgraph K6["hooks"]
subgraph K7["brands"]
subgraph K8["src"]
K9["index.ts"]
subgraph KA["lib"]
KB["brands.graphql.ts"]
KC["useBrands.ts"]
end
end
KD["vite.config.ts"]
end
subgraph KE["categories"]
subgraph KF["src"]
KG["index.ts"]
subgraph KH["lib"]
KI["useCategories.ts"]
KJ["categories.graphql.ts"]
end
end
end
subgraph KK["colors"]
subgraph KL["src"]
KM["index.ts"]
subgraph KN["lib"]
KO["useColors.ts"]
KP["color.graphql.ts"]
end
end
end
subgraph KQ["currency"]
subgraph KR["src"]
KS["index.ts"]
subgraph KT["lib"]
KU["useConvertPrice.tsx"]
KV["useExchangeRate.tsx"]
KW["useCurrencies.tsx"]
KX["useCurrencyForLocale.tsx"]
KY["useExchangeRate.spec.tsx"]
end
end
end
subgraph KZ["products"]
subgraph L0["src"]
L1["index.ts"]
subgraph L2["lib"]
L3["productImage.ts"]
L4["products.graphql.ts"]
L5["useProducts.ts"]
L6["productImage.spec.ts"]
end
end
end
subgraph L7["site-languages"]
subgraph L8["src"]
L9["index.ts"]
subgraph LA["lib"]
LB["site-languages.graphql.ts"]
LC["useSiteLanguages.ts"]
LD["site-languages-hook.spec.tsx"]
end
end
LE["vite.config.ts"]
end
subgraph LF["snackbar"]
subgraph LG["src"]
LH["index.ts"]
subgraph LI["lib"]
LJ["SnackbarContext.tsx"]
LK["useSnackbar.ts"]
end
end
end
subgraph LL["translations-management-hook"]
subgraph LM["src"]
LN["index.ts"]
subgraph LO["lib"]
LP["useTranslationsManagement.ts"]
end
end
end
end
subgraph LQ["lottie"]
subgraph LR["empty-cart"]
subgraph LS["src"]
LT["index.ts"]
subgraph LU["lib"]
LV["lottie-empty-cart.tsx"]
LW["lottie-empty-cart.spec.tsx"]
end
end
LX["vite.config.ts"]
end
subgraph LY["loading"]
subgraph LZ["src"]
M0["index.ts"]
subgraph M1["lib"]
M2["lottie-loading.tsx"]
M3["lottie-loading.spec.tsx"]
end
end
end
subgraph M4["success-check"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["lottie-success-check.tsx"]
M9["lottie-success-check.spec.tsx"]
end
end
end
subgraph MA["unauthorized"]
subgraph MB["src"]
MC["index.ts"]
subgraph MD["lib"]
ME["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MF["translations"]
subgraph MG["src"]
MH["index.ts"]
subgraph MI["lib"]
MJ["mapApolloErrorToTranslationKey.ts"]
MK["WrapTranslation.tsx"]
end
end
end
subgraph ML["ui"]
subgraph MM["colors"]
subgraph MN["src"]
MO["index.ts"]
subgraph MP["lib"]
MQ["colors.ts"]
end
end
end
subgraph MR["language-components"]
subgraph MS["src"]
MT["index.ts"]
subgraph MU["lib"]
MV["language-components.tsx"]
MW["ltr-text-field.tsx"]
end
end
end
subgraph MX["sizes"]
subgraph MY["src"]
MZ["index.ts"]
subgraph N0["lib"]
N1["sizes.ts"]
N2["sizes.spec.tsx"]
N3["sizes.tsx"]
end
end
end
end
subgraph N4["zustand"]
subgraph N5["shared-auth-store"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["shared-auth-store.ts"]
end
end
end
subgraph NA["shared-notification-store"]
subgraph NB["src"]
NC["index.ts"]
subgraph ND["lib"]
NE["shared-notification-store.tsx"]
end
end
end
subgraph NF["shared-ui-store"]
subgraph NG["src"]
NH["index.ts"]
subgraph NI["lib"]
NJ["shared-ui-store.ts"]
NK["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NL["server"]
subgraph NM["controllers"]
subgraph NN["src"]
NO["index.ts"]
subgraph NP["lib"]
NQ["auth.controller.ts"]
NR["order.controller.ts"]
end
end
end
subgraph NS["decorators"]
NT["jest.config.ts"]
subgraph NU["src"]
NV["index.ts"]
subgraph NW["lib"]
NX["current-user.decorator.ts"]
NY["decorators.ts"]
NZ["decorators.spec.ts"]
end
end
end
subgraph O0["entities"]
subgraph O1["src"]
O2["index.ts"]
subgraph O3["lib"]
O4["brand.entity.ts"]
O5["product.entity.ts"]
O6["category.entity.ts"]
O7["product-description.entity.ts"]
O8["site-language.entity.ts"]
O9["product-info.entity.ts"]
OA["color.entity.ts"]
OB["product-info-color.entity.ts"]
OC["seller-info.entity.ts"]
OD["seller-product.entity.ts"]
OE["user.entity.ts"]
OF["cart.entity.ts"]
OG["currency-preference.entity.ts"]
OH["currency.entity.ts"]
OI["customer.entity.ts"]
OJ["exchange-rate.entity.ts"]
OK["order.entity.ts"]
OL["platform-settings.entity.ts"]
OM["refresh-token.entity.ts"]
ON["seller-order.entity.ts"]
OO["translation.entity.ts"]
end
end
end
subgraph OP["guards"]
OQ["jest.config.ts"]
subgraph OR["src"]
OS["index.ts"]
subgraph OT["lib"]
OU["catalog.guard.ts"]
OV["graphql-auth.guard.ts"]
OW["http-auth.guard.ts"]
OX["roles.guard.ts"]
OY["catalog.guard.spec.ts"]
OZ["roles.guard.spec.ts"]
end
end
end
subgraph P0["inputs"]
subgraph P1["src"]
P2["index.ts"]
subgraph P3["lib"]
P4["brand.input.ts"]
P5["cart.inputs.ts"]
P6["category.input.ts"]
P7["color.input.ts"]
P8["customer-auth.inputs.ts"]
P9["order-pagination.inputs.ts"]
PA["order.inputs.ts"]
PB["product-info-filter.input.ts"]
PC["product.input.ts"]
PD["seller-order-pagination.inputs.ts"]
PE["seller.input.ts"]
PF["site-language.input.ts"]
PG["user.input.ts"]
end
end
end
subgraph PH["modules"]
subgraph PI["src"]
PJ["index.ts"]
subgraph PK["lib"]
PL["auth.module.ts"]
PM["email.module.ts"]
PN["token.module.ts"]
PO["user.module.ts"]
PP["customer-profile.module.ts"]
PQ["brand.module.ts"]
PR["catalog-guard.module.ts"]
PS["translation.module.ts"]
PT["cart.module.ts"]
PU["platform-settings.module.ts"]
PV["category.module.ts"]
PW["product.module.ts"]
PX["color.module.ts"]
PY["currency.module.ts"]
PZ["graphql-context.module.ts"]
Q0["order.module.ts"]
Q1["seller-info.module.ts"]
Q2["payment.module.ts"]
Q3["product-info.module.ts"]
Q4["seller-products.module.ts"]
Q5["site-language.module.ts"]
end
end
end
subgraph Q6["resolvers"]
Q7["jest.config.ts"]
subgraph Q8["src"]
Q9["index.ts"]
subgraph QA["lib"]
QB["auth.resolver.ts"]
QC["zod-validation.pipe.ts"]
QD["brand.resolver.ts"]
QE["cart.resolver.ts"]
QF["category.resolver.ts"]
QG["color.resolver.ts"]
QH["currency.resolver.ts"]
QI["customer-profile.resolver.ts"]
QJ["order.resolver.ts"]
QK["payment.resolver.ts"]
QL["product-info.resolver.ts"]
QM["product.resolver.ts"]
QN["seller-info.resolver.ts"]
QO["shipping.resolver.ts"]
QP["site-language.resolver.ts"]
QQ["translation.input.ts"]
QR["translation.resolver.ts"]
QS["user.resolver.ts"]
QT["auth-validation.spec.ts"]
QU["auth.resolver.spec.ts"]
QV["cart-validation.spec.ts"]
QW["currency-translation-validation.spec.ts"]
QX["customer-profile-validation.spec.ts"]
QY["order-validation.spec.ts"]
QZ["order.resolver.spec.ts"]
R0["order.resolver.status-transitions.spec.ts"]
R1["order.resolver.tracking.spec.ts"]
R2["payment.resolver.integration.spec.ts"]
R3["payment.resolver.spec.ts"]
R4["product-info.resolver.spec.ts"]
R5["product-validation.spec.ts"]
R6["query-args-validation.spec.ts"]
R7["seller-info-validation.spec.ts"]
R8["taxonomy-validation.spec.ts"]
R9["translation.resolver.guards.spec.ts"]
subgraph RA["types"]
RB["graphql-upload.d.ts"]
end
RC["user.resolver.spec.ts"]
RD["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RE["services"]
RF["jest.config.ts"]
subgraph RG["src"]
RH["index.ts"]
subgraph RI["lib"]
RJ["auth.service.ts"]
RK["brand.service.ts"]
RL["cart.service.ts"]
RM["product-info-colors.util.ts"]
RN["category.service.ts"]
RO["color.service.ts"]
RP["currency.service.ts"]
RQ["customer-profile.service.ts"]
RR["email.service.ts"]
RS["image-upload.service.ts"]
RT["order.service.ts"]
RU["payment-logger.service.ts"]
RV["payment.service.ts"]
RW["product.service.ts"]
RX["seller-info.service.ts"]
RY["shipping-calculation.service.ts"]
RZ["site-language.service.ts"]
S0["token.service.ts"]
S1["translation.service.ts"]
S2["user.service.ts"]
S3["auth.service.password-policy.spec.ts"]
S4["auth.service.spec.ts"]
S5["cart.service.add-quantity.spec.ts"]
S6["cart.service.null-relations.spec.ts"]
S7["cart.service.spec.ts"]
S8["order.service.spec.ts"]
S9["order.service.tracking.spec.ts"]
SA["product-info-colors.util.spec.ts"]
SB["product.service.multi-filters.spec.ts"]
SC["product.service.only-discounted.spec.ts"]
SD["product.service.pants.spec.ts"]
SE["product.service.spec.ts"]
SF["relay-connection.spec.ts"]
SG["seller-info.service.price-validation.spec.ts"]
SH["shipping-calculation.service.spec.ts"]
SI["token.service.spec.ts"]
end
end
end
subgraph SJ["strategies"]
subgraph SK["src"]
SL["index.ts"]
subgraph SM["lib"]
SN["local.strategy.ts"]
end
end
end
subgraph SO["utils"]
subgraph SP["src"]
SQ["index.ts"]
subgraph SR["lib"]
SS["email-templates.ts"]
ST["relay-connection.ts"]
SU["pagination.ts"]
end
end
end
end
subgraph SV["shared"]
subgraph SW["codegen"]
SX["jest.config.ts"]
subgraph SY["src"]
SZ["index.ts"]
subgraph T0["lib"]
subgraph T1["generated"]
T2["graphql.ts"]
end
end
end
end
subgraph T3["graphql-schema"]
T4["jest.config.ts"]
subgraph T5["src"]
T6["index.ts"]
end
end
subgraph T7["product-sizes"]
subgraph T8["src"]
T9["index.ts"]
subgraph TA["lib"]
TB["product-sizes.ts"]
TC["product-sizes.pants-formats.spec.ts"]
TD["product-sizes.pants-label.spec.ts"]
TE["product-sizes.pants-strict.spec.ts"]
TF["product-sizes.spec.ts"]
end
end
end
subgraph TG["shared-i18n"]
subgraph TH["src"]
TI["index.ts"]
subgraph TJ["lib"]
TK["language-context.tsx"]
TL["language-detector.ts"]
subgraph TM["locales"]
TN["i18n-react.tsx"]
TO["i18n-util.ts"]
TP["i18n-util.async.ts"]
subgraph TQ["en"]
TR["index.ts"]
end
subgraph TT["fa"]
TU["index.ts"]
end
TV["formatters.ts"]
TW["i18n-types.ts"]
TX["i18n-util.sync.ts"]
TY["navigator-detector.ts"]
end
TS["site-name.ts"]
TZ["table-localization.ts"]
U0["theme-provider.tsx"]
U1["use-page-title.ts"]
end
end
end
subgraph U2["validation"]
subgraph U3["src"]
U4["index.ts"]
subgraph U5["lib"]
U6["auth.ts"]
U7["limits.ts"]
U8["primitives.ts"]
U9["auth-forms.ts"]
UA["cart.ts"]
UB["catalog.ts"]
UC["contact.ts"]
UD["currency.ts"]
UE["taxonomy.ts"]
UF["errors.ts"]
UG["order.ts"]
UH["profile.ts"]
UI["query.ts"]
UJ["seller.ts"]
UK["auth-forms.admin.spec.ts"]
UL["auth-forms.login.spec.ts"]
UM["auth-forms.recovery.spec.ts"]
UN["auth-forms.seller.spec.ts"]
UO["auth-forms.spec.ts"]
UP["auth.spec.ts"]
UQ["cart.spec.ts"]
UR["catalog.spec.ts"]
US["contact.spec.ts"]
UT["currency.spec.ts"]
UU["errors.spec.ts"]
UV["order.spec.ts"]
UW["primitives.spec.ts"]
UX["profile.spec.ts"]
UY["query.spec.ts"]
UZ["seller.spec.ts"]
V0["taxonomy.spec.ts"]
end
end
end
end
end
4-->5
7-->8
D-->5
D-->8
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
3F-->3H
3I-->3H
3J-->3H
3M-->3O
3P-->3O
3T-->3V
3W-->3V
3X-->3V
40-->41
41-->43
44-->43
45-->43
46-->43
4A-->4B
4B-->4D
4D-->4E
4D-->4G
4E-->4F
4H-->4D
4I-->4G
4N-->4O
4O-->4Q
4R-->4Q
4S-->4Q
4W-->4Y
4Y-->4Z
52-->53
53-->55
56-->55
5A-->5B
5B-->5D
5E-->5D
5J-->5L
5J-->5M
5L-->5M
5N-->5L
5Q-->5S
5T-->5S
5W-->5Y
5W-->5Z
5Y-->5Z
60-->5Y
61-->5Z
64-->66
67-->66
68-->66
69-->66
6E-->6G
6H-->6G
6K-->6M
6K-->6N
6K-->6O
6K-->6R
6O-->6P
6P-->6Q
6W-->6Y
6W-->6Z
6W-->70
6W-->71
72-->6Z
77-->79
77-->7A
77-->7B
7C-->7A
7D-->79
7G-->7I
7L-->7N
7Q-->7S
7Q-->7T
7S-->7T
7U-->7S
7V-->7T
7Y-->80
81-->80
85-->87
88-->87
89-->87
8D-->8F
8I-->8K
8L-->8K
8M-->8K
8Q-->8S
8V-->8X
8Y-->8X
8Z-->8X
92-->94
97-->99
97-->9A
97-->9B
99-->9A
9A-->9B
9C-->99
9F-->9H
9K-->9M
9N-->9M
9O-->9M
9R-->9T
9U-->9T
9V-->9T
9W-->9T
A0-->A2
A3-->A2
A4-->A2
A5-->A2
A8-->AA
AB-->AA
AC-->AA
AF-->AH
AI-->AH
AM-->AO
AP-->AO
AT-->AV
AT-->B4
AT-->AY
AT-->B3
AV-->AX
AV-->AZ
AV-->B0
AV-->B1
AV-->B2
AV-->AY
AV-->B3
AX-->AY
B4-->AY
B5-->B1
B5-->AV
B5-->AY
B6-->B7
B6-->B1
B6-->AV
B6-->B4
B6-->AY
B8-->B4
B9-->B4
BA-->AY
BC-->AY
BG-->BI
BJ-->BI
BK-->BI
BN-->BP
BQ-->BP
BU-->BW
BX-->BW
C1-->C3
C3-->C4
C5-->C3
C6-->C3
C7-->C3
C8-->C3
C9-->C3
CD-->CF
CG-->CF
CH-->CF
CK-->CM
CN-->CM
CR-->CT
CX-->CZ
D2-->D4
D5-->D4
D6-->D4
D6-->D7
DB-->DD
DE-->DD
DI-->DK
DL-->DK
DP-->DR
DS-->DR
DU-->DW
E1-->E3
E4-->E3
E7-->E9
EC-->EE
EC-->EF
EE-->EF
EJ-->EL
EM-->EL
EP-->ER
EP-->ES
EP-->ET
EP-->EW
ET-->EU
EU-->EV
EW-->ER
EW-->EX
F4-->F6
F6-->F7
FA-->FC
FG-->FI
FG-->FJ
FM-->FO
FR-->FT
FX-->FZ
G0-->FZ
G3-->G5
G6-->G5
G9-->GB
GB-->GC
GD-->GC
GE-->GC
GF-->GB
GG-->GB
GJ-->GL
GM-->GL
GN-->GL
GS-->GU
GU-->GV
GW-->GU
GX-->GU
GZ-->GV
H3-->H5
H6-->H5
H9-->HB
HF-->HH
HN-->HP
HN-->HQ
HR-->HQ
HU-->HW
HX-->HW
I1-->I3
I4-->I3
I7-->I9
IC-->IE
IC-->IF
IC-->IG
IE-->IF
IH-->IE
IL-->IN
IO-->IN
IR-->IT
IW-->IY
IZ-->IY
J2-->J4
J4-->J5
J8-->JA
JA-->JB
JA-->JC
JA-->JD
JA-->JE
JC-->JB
JC-->JD
JF-->JG
JJ-->JL
JO-->JQ
JR-->JQ
JU-->JW
JZ-->K1
JZ-->K2
JZ-->K3
JZ-->K4
K9-->KB
K9-->KC
KC-->KB
KG-->KI
KI-->KJ
KM-->KO
KO-->KP
KS-->KU
KS-->KW
KS-->KX
KS-->KV
KU-->KV
KY-->KV
L1-->L3
L1-->L4
L1-->L5
L5-->L4
L6-->L3
L9-->LB
L9-->LC
LC-->LB
LD-->LC
LH-->LJ
LH-->LK
LK-->LJ
LN-->LP
LT-->LV
LW-->LV
M0-->M2
M3-->M2
M6-->M8
M9-->M8
MC-->ME
MH-->MJ
MO-->MQ
MT-->MV
MT-->MW
MZ-->N1
N2-->N3
N7-->N9
NC-->NE
NH-->NJ
NO-->NQ
NO-->NR
NV-->NX
NV-->NY
NZ-->NY
O2-->O4
O2-->OF
O2-->O6
O2-->OA
O2-->OG
O2-->OH
O2-->OI
O2-->OJ
O2-->OK
O2-->OL
O2-->O7
O2-->OB
O2-->O9
O2-->O5
O2-->OM
O2-->OC
O2-->ON
O2-->OD
O2-->O8
O2-->OO
O2-->OE
O4-->O5
O5-->O4
O5-->O6
O5-->O7
O5-->O9
O5-->OC
O5-->OD
O6-->O5
O7-->O5
O7-->O8
O8-->O7
O9-->OA
O9-->OB
O9-->O5
OB-->OA
OB-->O9
OC-->OD
OC-->OE
OD-->O9
OD-->O5
OD-->OC
OF-->O5
OF-->OE
OG-->OH
OI-->OE
OJ-->OH
OJ-->OE
OK-->O5
OK-->OC
OM-->OE
ON-->OK
OS-->OU
OS-->OV
OS-->OW
OS-->OX
OY-->OU
OZ-->OX
P2-->P4
P2-->P5
P2-->P6
P2-->P7
P2-->P8
P2-->P9
P2-->PA
P2-->PB
P2-->PC
P2-->PD
P2-->PE
P2-->PF
P2-->PG
PC-->PB
PJ-->PL
PJ-->PQ
PJ-->PT
PJ-->PR
PJ-->PV
PJ-->PX
PJ-->PY
PJ-->PP
PJ-->PM
PJ-->PZ
PJ-->Q0
PJ-->Q2
PJ-->PU
PJ-->Q3
PJ-->PW
PJ-->Q1
PJ-->Q4
PJ-->Q5
PJ-->PN
PJ-->PS
PJ-->PO
PL-->PM
PL-->PN
PL-->PO
PO-->PL
PO-->PP
PQ-->PR
PQ-->PS
PT-->PU
PV-->PR
PV-->PW
PV-->PS
PW-->PR
PW-->PN
PW-->PS
PX-->PR
PX-->PS
PZ-->PM
PZ-->PN
PZ-->PO
Q0-->PU
Q0-->Q1
Q1-->PW
Q1-->PN
Q1-->PO
Q2-->PY
Q2-->Q0
Q3-->PW
Q3-->PS
Q4-->Q1
Q4-->PO
Q9-->QB
Q9-->QD
Q9-->QE
Q9-->QF
Q9-->QG
Q9-->QH
Q9-->QI
Q9-->QJ
Q9-->QK
Q9-->QL
Q9-->QM
Q9-->QN
Q9-->QO
Q9-->QP
Q9-->QQ
Q9-->QR
Q9-->QS
Q9-->QC
QB-->QC
QD-->QC
QE-->QC
QF-->QC
QG-->QC
QH-->QC
QI-->QC
QJ-->QC
QM-->QC
QN-->QC
QP-->QC
QR-->QC
QS-->QC
QT-->QB
QT-->QS
QT-->QC
QU-->QB
QV-->QE
QV-->QC
QW-->QH
QW-->QR
QW-->QC
QX-->QI
QX-->QC
QY-->QJ
QY-->QC
QZ-->QJ
R0-->QJ
R1-->QJ
R2-->QK
R3-->QK
R4-->QL
R5-->QM
R5-->QC
R6-->QJ
R6-->QM
R6-->QN
R6-->QC
R7-->QN
R7-->QC
R8-->QD
R8-->QF
R8-->QG
R8-->QP
R8-->QC
R9-->QR
RC-->QS
RD-->QC
RH-->RJ
RH-->RK
RH-->RL
RH-->RN
RH-->RO
RH-->RP
RH-->RQ
RH-->RR
RH-->RS
RH-->RT
RH-->RU
RH-->RV
RH-->RM
RH-->RW
RH-->RX
RH-->RY
RH-->RZ
RH-->S0
RH-->S1
RH-->S2
RL-->RM
RW-->RM
RX-->RM
S3-->RJ
S3-->RR
S3-->S0
S3-->S2
S4-->RJ
S4-->RR
S4-->S0
S4-->S2
S5-->RL
S6-->RL
S7-->RL
S8-->RT
S9-->RT
SA-->RM
SB-->RW
SB-->S1
SC-->RW
SC-->S1
SD-->RW
SD-->S1
SE-->RW
SE-->S1
SG-->RJ
SG-->RX
SH-->RY
SI-->S0
SL-->SN
SQ-->SS
SQ-->ST
SZ-->T2
T9-->TB
TC-->TB
TD-->TB
TE-->TB
TF-->TB
TI-->TK
TI-->TL
TI-->TN
TI-->TW
TI-->TO
TI-->TP
TI-->TX
TI-->TY
TI-->TS
TI-->TZ
TI-->U0
TI-->U1
TK-->TL
TK-->TN
TK-->TP
TN-->TO
TP-->TR
TP-->TU
TP-->TV
TP-->TO
TR-->TS
TU-->TS
TX-->TR
TX-->TU
TX-->TV
TX-->TO
TZ-->TN
U0-->TK
U1-->TN
U4-->U6
U4-->U9
U4-->UA
U4-->UB
U4-->UC
U4-->UD
U4-->UF
U4-->U7
U4-->UG
U4-->U8
U4-->UH
U4-->UI
U4-->UJ
U4-->UE
U6-->U7
U6-->U8
U8-->U7
U9-->U6
UA-->U8
UD-->UE
UG-->U6
UG-->UA
UG-->U8
UH-->UG
UI-->U8
UK-->U9
UL-->U9
UM-->U9
UN-->U9
UO-->U9
UP-->U6
UQ-->UA
UR-->UB
US-->UC
UT-->UD
UU-->UF
UV-->UG
UW-->U7
UW-->U8
UX-->UH
UY-->UI
UZ-->UJ
V0-->UE
