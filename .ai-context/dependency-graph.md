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
3H["currency-management.rate-validation.spec.tsx"]
3I["currency-management.spec.tsx"]
end
end
end
subgraph 3J["customer-management"]
subgraph 3K["src"]
3L["index.ts"]
subgraph 3M["lib"]
3N["admin-customer-management.tsx"]
3O["admin-customer-management.spec.tsx"]
end
end
3P["vite.config.ts"]
end
subgraph 3Q["login"]
subgraph 3R["src"]
3S["index.ts"]
subgraph 3T["lib"]
3U["AdminsLogin.tsx"]
3V["AdminsLogin.spec.tsx"]
3W["AdminsLogin.zod.spec.tsx"]
end
end
end
subgraph 3X["product-editor"]
subgraph 3Y["src"]
3Z["index.spec.tsx"]
40["index.ts"]
subgraph 41["lib"]
42["AdminProductEditor.tsx"]
43["AdminProductEditor.color-validation.spec.tsx"]
44["AdminProductEditor.pants-range.spec.tsx"]
45["AdminProductEditor.spec.tsx"]
end
46["vite-env.d.ts"]
end
end
subgraph 47["products"]
subgraph 48["src"]
49["index.spec.tsx"]
4A["index.ts"]
subgraph 4B["lib"]
4C["AdminProducts.tsx"]
4D["adminProducts.hooks.ts"]
4E["adminProducts.graphql.ts"]
4F["ProductImageManagementModal.tsx"]
4G["AdminProducts.spec.tsx"]
4H["ProductImageManagementModal.pants-size.spec.tsx"]
4I["ProductImageManagementModal.spec.tsx"]
end
4J["vite-env.d.ts"]
end
end
subgraph 4K["seller-management"]
subgraph 4L["src"]
4M["index.spec.tsx"]
4N["index.ts"]
subgraph 4O["lib"]
4P["SellerManagement.tsx"]
4Q["SellerManagement.form-validation.spec.tsx"]
4R["SellerManagement.spec.tsx"]
end
4S["vite-env.d.ts"]
end
end
subgraph 4T["translation-management"]
subgraph 4U["src"]
4V["index.ts"]
subgraph 4W["lib"]
4X["AdminTranslationManagement.tsx"]
4Y["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4Z["unauthorized"]
subgraph 50["src"]
51["index.spec.tsx"]
52["index.ts"]
subgraph 53["lib"]
54["admins-unauthorized-screen.tsx"]
55["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 56["zustand"]
subgraph 57["admins-products-store"]
subgraph 58["src"]
59["index.spec.ts"]
5A["index.ts"]
subgraph 5B["lib"]
5C["admins-products-store.ts"]
5D["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 5E["customers"]
subgraph 5F["components"]
subgraph 5G["footer"]
subgraph 5H["src"]
5I["index.ts"]
subgraph 5J["lib"]
5K["customers-footer.tsx"]
5L["TrustBadgeIcons.tsx"]
5M["customers-footer.spec.tsx"]
end
end
end
subgraph 5N["headerbar"]
subgraph 5O["src"]
5P["index.ts"]
subgraph 5Q["lib"]
5R["CustomersHeaderbar.tsx"]
5S["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5T["layout"]
subgraph 5U["src"]
5V["index.ts"]
subgraph 5W["lib"]
5X["CustomersLayout.tsx"]
5Y["CustomersTabbar.tsx"]
5Z["CustomersLayout.spec.tsx"]
60["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 61["product-card"]
subgraph 62["src"]
63["index.ts"]
subgraph 64["lib"]
65["CustomersProductCard.tsx"]
66["CustomersProductCard.no-low-stock.spec.tsx"]
67["CustomersProductCard.pants-size.spec.tsx"]
68["CustomersProductCard.spec.tsx"]
end
69["vite-env.d.ts"]
end
end
end
subgraph 6A["contexts"]
subgraph 6B["auth"]
subgraph 6C["src"]
6D["index.ts"]
subgraph 6E["lib"]
6F["CustomersAuthContext.tsx"]
6G["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6H["graphql"]
subgraph 6I["src"]
6J["index.ts"]
subgraph 6K["lib"]
6L["customer-profile.queries.ts"]
6M["mutations.ts"]
6N["Provider.tsx"]
6O["CustomersApolloProvider.tsx"]
6P["client.ts"]
6Q["queries.ts"]
6R["apollo-upload-client.d.ts"]
end
end
end
subgraph 6S["hooks"]
subgraph 6T["auth"]
subgraph 6U["src"]
6V["index.ts"]
subgraph 6W["lib"]
6X["useCustomersForgotPassword.tsx"]
6Y["useCustomersLogin.tsx"]
6Z["useCustomersRegister.tsx"]
70["useCustomersResetPassword.tsx"]
71["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 72["cart"]
73["jest.config.ts"]
74["jest.setup.ts"]
subgraph 75["src"]
76["index.ts"]
subgraph 77["lib"]
78["customers-cart-hook.tsx"]
79["useCartService.ts"]
7A["useWishlistSync.ts"]
7B["useCartService.spec.tsx"]
7C["useCartSync.ts"]
end
end
end
subgraph 7D["orders"]
subgraph 7E["src"]
7F["index.ts"]
subgraph 7G["lib"]
7H["customers-orders-hook.tsx"]
end
end
end
subgraph 7I["products"]
subgraph 7J["src"]
7K["index.ts"]
subgraph 7L["lib"]
7M["customers-product-hook.tsx"]
end
end
end
end
subgraph 7N["router"]
subgraph 7O["src"]
7P["index.ts"]
subgraph 7Q["lib"]
7R["CustomersRouter.tsx"]
7S["ScrollToTop.tsx"]
7T["CustomersRouter.spec.tsx"]
7U["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7V["routes"]
subgraph 7W["src"]
7X["index.ts"]
subgraph 7Y["lib"]
7Z["customer-routes.ts"]
80["customer-routes.spec.ts"]
end
end
end
subgraph 81["screens"]
subgraph 82["contact"]
subgraph 83["src"]
84["index.ts"]
subgraph 85["lib"]
86["customer-contact.tsx"]
87["customer-contact.spec.tsx"]
88["customer-contact.validation.spec.tsx"]
end
end
89["vite.config.ts"]
end
subgraph 8A["customer-checkout"]
subgraph 8B["src"]
8C["index.ts"]
subgraph 8D["lib"]
8E["customer-checkout.tsx"]
end
end
end
subgraph 8F["customer-favorites"]
subgraph 8G["src"]
8H["index.ts"]
subgraph 8I["lib"]
8J["customer-favorites.tsx"]
8K["customer-favorites.shared-card.spec.tsx"]
8L["customer-favorites.spec.tsx"]
end
end
8M["vite.config.ts"]
end
subgraph 8N["customer-login"]
subgraph 8O["src"]
8P["index.ts"]
subgraph 8Q["lib"]
8R["customer-login.tsx"]
end
end
end
subgraph 8S["customer-order-confirmation"]
subgraph 8T["src"]
8U["index.ts"]
subgraph 8V["lib"]
8W["customer-order-confirmation.tsx"]
8X["customer-order-confirmation.pants-size.spec.tsx"]
8Y["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8Z["customer-orders"]
subgraph 90["src"]
91["index.ts"]
subgraph 92["lib"]
93["customer-orders.tsx"]
end
end
end
subgraph 94["customer-payment"]
subgraph 95["src"]
96["index.ts"]
subgraph 97["lib"]
98["customer-payment-callback.tsx"]
99["use-zarinpal-payment.tsx"]
9A["zarinpal-payment-service.ts"]
9B["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 9C["customer-products"]
subgraph 9D["src"]
9E["index.ts"]
subgraph 9F["lib"]
9G["customer-products.tsx"]
end
end
end
subgraph 9H["customer-profile"]
subgraph 9I["src"]
9J["index.ts"]
subgraph 9K["lib"]
9L["customer-profile.tsx"]
9M["customer-profile.spec.tsx"]
9N["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9O["customer-shopping-cart"]
subgraph 9P["src"]
9Q["index.ts"]
subgraph 9R["lib"]
9S["customer-shopping-cart.tsx"]
9T["customer-shopping-cart.pants-size.spec.tsx"]
9U["customer-shopping-cart.shipping-form.spec.tsx"]
9V["customer-shopping-cart.spec.tsx"]
end
end
9W["vite.config.ts"]
end
subgraph 9X["customer-signup"]
subgraph 9Y["src"]
9Z["index.ts"]
subgraph A0["lib"]
A1["customer-signup.tsx"]
A2["customer-signup.password-length.spec.tsx"]
A3["customer-signup.spec.tsx"]
A4["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A5["forgot-password"]
subgraph A6["src"]
A7["index.ts"]
subgraph A8["lib"]
A9["customer-forgot-password.tsx"]
AA["customer-forgot-password.spec.tsx"]
AB["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph AC["guide-authenticity"]
subgraph AD["src"]
AE["index.ts"]
subgraph AF["lib"]
AG["customer-guide-authenticity.tsx"]
AH["customer-guide-authenticity.spec.tsx"]
end
end
AI["vite.config.ts"]
end
subgraph AJ["guide-payment"]
subgraph AK["src"]
AL["index.ts"]
subgraph AM["lib"]
AN["customer-guide-payment.tsx"]
AO["customer-guide-payment.spec.tsx"]
end
end
AP["vite.config.ts"]
end
subgraph AQ["home"]
subgraph AR["src"]
AS["index.ts"]
subgraph AT["lib"]
AU["CustomersHomeScreen.tsx"]
subgraph AV["components"]
AW["CategoryBentoSection.tsx"]
AY["HeroSection.tsx"]
AZ["HomeLoadingScreen.tsx"]
B0["PicksRailSection.tsx"]
B1["TrustStripSection.tsx"]
B6["NewArrivalsSection.tsx"]
B9["BrandBlocksSection.tsx"]
BA["NewsletterSection.tsx"]
BB["ShopTheLookSection.tsx"]
BC["TickerSection.tsx"]
end
AX["home-selectors.ts"]
B2["useScrollProgress.ts"]
B3["CustomersShopScreen.tsx"]
B4["CustomersHomeScreen.cart-size.spec.tsx"]
B5["CustomersHomeScreen.spec.tsx"]
B7["CustomersShopScreen.cart-size.spec.tsx"]
B8["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BD["login"]
subgraph BE["src"]
BF["index.ts"]
subgraph BG["lib"]
BH["CustomersLoginScreen.tsx"]
BI["CustomersLoginScreen.spec.tsx"]
BJ["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BK["not-found"]
subgraph BL["src"]
BM["index.ts"]
subgraph BN["lib"]
BO["customer-not-found.tsx"]
BP["customer-not-found.spec.tsx"]
end
end
BQ["vite.config.ts"]
end
subgraph BR["privacy-policy"]
subgraph BS["src"]
BT["index.ts"]
subgraph BU["lib"]
BV["customer-privacy-policy.tsx"]
BW["customer-privacy-policy.spec.tsx"]
end
end
BX["vite.config.ts"]
end
subgraph BY["product-details"]
subgraph BZ["src"]
C0["index.ts"]
subgraph C1["lib"]
C2["customer-product-details.tsx"]
C3["reviews-flag.ts"]
C4["customer-product-details.guarantee.spec.tsx"]
C5["customer-product-details.no-low-stock.spec.tsx"]
C6["customer-product-details.pants-size.spec.tsx"]
C7["customer-product-details.reviews-hidden.spec.tsx"]
C8["customer-product-details.spec.tsx"]
end
end
C9["vite.config.ts"]
end
subgraph CA["reset-password"]
subgraph CB["src"]
CC["index.ts"]
subgraph CD["lib"]
CE["customer-reset-password.tsx"]
CF["customer-reset-password.password-length.spec.tsx"]
CG["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CH["shipping-returns"]
subgraph CI["src"]
CJ["index.ts"]
subgraph CK["lib"]
CL["customer-shipping-returns.tsx"]
CM["customer-shipping-returns.spec.tsx"]
end
end
CN["vite.config.ts"]
end
subgraph CO["unauthorized"]
subgraph CP["src"]
CQ["index.ts"]
subgraph CR["lib"]
CS["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CT["utility"]
subgraph CU["test"]
subgraph CV["src"]
CW["index.ts"]
subgraph CX["lib"]
CY["customers-test-utility.tsx"]
end
end
end
end
subgraph CZ["validations"]
subgraph D0["src"]
D1["index.ts"]
subgraph D2["lib"]
D3["shipping-validation.ts"]
D4["shipping-validation.shared.spec.ts"]
D5["shipping-validation.spec.tsx"]
D6["shipping-validation.tsx"]
end
end
end
subgraph D7["zustand"]
subgraph D8["customer-cart-store"]
subgraph D9["src"]
DA["index.ts"]
subgraph DB["lib"]
DC["customer-cart-store.ts"]
DD["customer-cart-store.spec.ts"]
DE["customer-cart-store.tsx"]
end
end
end
subgraph DF["customer-checkout-store"]
subgraph DG["src"]
DH["index.ts"]
subgraph DI["lib"]
DJ["customer-checkout-store.ts"]
DK["customer-checkout-store.spec.ts"]
end
end
DL["vite.config.ts"]
end
subgraph DM["customer-wishlist-store"]
subgraph DN["src"]
DO["index.ts"]
subgraph DP["lib"]
DQ["customer-wishlist-store.ts"]
DR["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DS["src"]
DT["index.ts"]
subgraph DU["lib"]
DV["customers-products-store.tsx"]
end
end
end
end
subgraph DW["sellers"]
subgraph DX["components"]
subgraph DY["footer"]
subgraph DZ["src"]
E0["index.ts"]
subgraph E1["lib"]
E2["sellers-footer.tsx"]
E3["sellers-footer.spec.tsx"]
end
end
end
subgraph E4["headerbar"]
subgraph E5["src"]
E6["index.ts"]
subgraph E7["lib"]
E8["SellersHeaderbar.tsx"]
end
end
end
subgraph E9["layout"]
subgraph EA["src"]
EB["index.ts"]
subgraph EC["lib"]
ED["SellersLayout.tsx"]
EE["SellersTabbar.tsx"]
end
end
end
end
subgraph EF["contexts"]
subgraph EG["auth"]
subgraph EH["src"]
EI["index.ts"]
subgraph EJ["lib"]
EK["SellersAuthContext.tsx"]
EL["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EM["graphql"]
subgraph EN["src"]
EO["index.ts"]
subgraph EP["lib"]
EQ["fragments.ts"]
ER["mutations.ts"]
ES["Provider.tsx"]
ET["SellersApolloProvider.tsx"]
EU["client.ts"]
EV["queries.ts"]
EW["seller-orders.graphql.ts"]
EX["apollo-upload-client.d.ts"]
end
subgraph EY["types"]
EZ["apollo-upload-client.d.ts"]
end
end
end
subgraph F0["hooks"]
subgraph F1["auth"]
subgraph F2["src"]
F3["index.ts"]
subgraph F4["lib"]
F5["useSellerAuth.ts"]
F6["sellerAuth.graphql.ts"]
end
end
end
subgraph F7["orders"]
subgraph F8["src"]
F9["index.ts"]
subgraph FA["lib"]
FB["useSellerOrders.ts"]
FC["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FD["products"]
subgraph FE["src"]
FF["index.ts"]
subgraph FG["lib"]
FH["useSellersProductManagement.ts"]
FI["useSellersProducts.ts"]
end
end
end
end
subgraph FJ["router"]
subgraph FK["src"]
FL["index.ts"]
subgraph FM["lib"]
FN["SellersRouter.tsx"]
end
end
end
subgraph FO["routes"]
subgraph FP["src"]
FQ["index.ts"]
subgraph FR["lib"]
FS["seller-routes.ts"]
end
end
end
subgraph FT["screens"]
subgraph FU["catalog"]
subgraph FV["src"]
FW["index.ts"]
subgraph FX["lib"]
FY["SellersCatalogScreens.tsx"]
FZ["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph G0["login"]
subgraph G1["src"]
G2["index.ts"]
subgraph G3["lib"]
G4["SellersLogin.tsx"]
G5["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G6["manage-product"]
subgraph G7["src"]
G8["index.ts"]
subgraph G9["lib"]
GA["SellersManageProductScreen.tsx"]
GB["SellersDefineProductFlow.tsx"]
GC["SellersDefineProductFlow.pants-label.spec.tsx"]
GD["SellersDefineProductFlow.spec.tsx"]
GE["SellersManageProductScreen.spec.tsx"]
GF["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GG["products"]
subgraph GH["src"]
GI["index.ts"]
subgraph GJ["lib"]
GK["SellersProducts.tsx"]
GL["SellersProducts.pants-label.spec.tsx"]
GM["SellersProducts.spec.tsx"]
end
end
end
subgraph GN["seller-orders"]
GO["jest.config.ts"]
GP["jest.setup.ts"]
subgraph GQ["src"]
GR["index.ts"]
subgraph GS["lib"]
GT["seller-orders-screen.tsx"]
GU["seller-status-transitions.ts"]
GV["seller-orders-screen.pants-size.spec.tsx"]
GW["seller-orders-screen.spec.tsx"]
GX["seller-status-transitions.spec.ts"]
end
GY["test-setup.ts"]
end
end
subgraph GZ["setup-password"]
subgraph H0["src"]
H1["index.ts"]
subgraph H2["lib"]
H3["SellersSetupPassword.tsx"]
H4["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H5["unauthorized"]
subgraph H6["src"]
H7["index.ts"]
subgraph H8["lib"]
H9["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph HA["zustand"]
subgraph HB["sellers-products-store"]
subgraph HC["src"]
HD["index.ts"]
subgraph HE["lib"]
HF["useSellersProductsStore.ts"]
HG["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HH["shared"]
subgraph HI["components"]
subgraph HJ["apollo-provider-base"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["ApolloProviderBase.tsx"]
HO["createSilentRefreshAuthLink.ts"]
HP["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HQ["error-boundary"]
subgraph HR["src"]
HS["index.ts"]
subgraph HT["lib"]
HU["error-boundary.tsx"]
HV["error-boundary.spec.tsx"]
end
end
HW["vite.config.ts"]
end
subgraph HX["glassmorphism-container"]
subgraph HY["src"]
HZ["index.ts"]
subgraph I0["lib"]
I1["glassmorphism-container.tsx"]
I2["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I3["layout"]
subgraph I4["src"]
I5["index.ts"]
subgraph I6["lib"]
I7["Layout.tsx"]
end
end
end
subgraph I8["material-data-table"]
subgraph I9["src"]
IA["index.ts"]
subgraph IB["lib"]
IC["material-data-table.tsx"]
ID["table-config.ts"]
IE["table-utils.ts"]
IF["material-data-table.spec.tsx"]
IG["table-types.ts"]
end
end
end
subgraph IH["order-status-chip"]
subgraph II["src"]
IJ["index.ts"]
subgraph IK["lib"]
IL["order-status-chip.tsx"]
IM["order-status-chip.spec.tsx"]
end
end
end
subgraph IN["password-field"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["PasswordTextField.tsx"]
end
end
end
subgraph IS["price-display"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["price-display.tsx"]
IX["price-display.spec.tsx"]
end
end
end
subgraph IY["private-route"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["createPrivateRoute.tsx"]
J3["PrivateRoute.tsx"]
end
end
end
subgraph J4["rtl-table-utils"]
subgraph J5["src"]
J6["index.ts"]
subgraph J7["lib"]
J8["rtl-table-utils.ts"]
J9["rtl-cell-components.tsx"]
JA["rtl-column-helpers.ts"]
JB["rtl-table-props.ts"]
JC["use-table-alignment.ts"]
JD["rtl-table-utils.spec.tsx"]
JE["rtl-table-utils.tsx"]
end
end
end
subgraph JF["snackbar"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["snackbar.tsx"]
end
end
end
subgraph JK["styled-drawer"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["styled-drawer.tsx"]
JP["styled-drawer.spec.tsx"]
end
end
end
subgraph JQ["unauthorized"]
subgraph JR["src"]
JS["index.ts"]
subgraph JT["lib"]
JU["unauthorized-path.tsx"]
end
end
end
end
subgraph JV["graphql"]
subgraph JW["src"]
JX["index.ts"]
subgraph JY["lib"]
JZ["currency.mutations.ts"]
K0["currency.queries.ts"]
K1["fragments.ts"]
K2["variant-colors.ts"]
K3["client-shared-graphql.tsx"]
end
end
end
subgraph K4["hooks"]
subgraph K5["brands"]
subgraph K6["src"]
K7["index.ts"]
subgraph K8["lib"]
K9["brands.graphql.ts"]
KA["useBrands.ts"]
end
end
KB["vite.config.ts"]
end
subgraph KC["categories"]
subgraph KD["src"]
KE["index.ts"]
subgraph KF["lib"]
KG["useCategories.ts"]
KH["categories.graphql.ts"]
end
end
end
subgraph KI["colors"]
subgraph KJ["src"]
KK["index.ts"]
subgraph KL["lib"]
KM["useColors.ts"]
KN["color.graphql.ts"]
end
end
end
subgraph KO["currency"]
subgraph KP["src"]
KQ["index.ts"]
subgraph KR["lib"]
KS["useConvertPrice.tsx"]
KT["useExchangeRate.tsx"]
KU["useCurrencies.tsx"]
KV["useCurrencyForLocale.tsx"]
KW["useExchangeRate.spec.tsx"]
end
end
end
subgraph KX["products"]
subgraph KY["src"]
KZ["index.ts"]
subgraph L0["lib"]
L1["productImage.ts"]
L2["products.graphql.ts"]
L3["useProducts.ts"]
L4["productImage.spec.ts"]
end
end
end
subgraph L5["site-languages"]
subgraph L6["src"]
L7["index.ts"]
subgraph L8["lib"]
L9["site-languages.graphql.ts"]
LA["useSiteLanguages.ts"]
LB["site-languages-hook.spec.tsx"]
end
end
LC["vite.config.ts"]
end
subgraph LD["snackbar"]
subgraph LE["src"]
LF["index.ts"]
subgraph LG["lib"]
LH["SnackbarContext.tsx"]
LI["useSnackbar.ts"]
end
end
end
subgraph LJ["translations-management-hook"]
subgraph LK["src"]
LL["index.ts"]
subgraph LM["lib"]
LN["useTranslationsManagement.ts"]
end
end
end
end
subgraph LO["lottie"]
subgraph LP["empty-cart"]
subgraph LQ["src"]
LR["index.ts"]
subgraph LS["lib"]
LT["lottie-empty-cart.tsx"]
LU["lottie-empty-cart.spec.tsx"]
end
end
LV["vite.config.ts"]
end
subgraph LW["loading"]
subgraph LX["src"]
LY["index.ts"]
subgraph LZ["lib"]
M0["lottie-loading.tsx"]
M1["lottie-loading.spec.tsx"]
end
end
end
subgraph M2["success-check"]
subgraph M3["src"]
M4["index.ts"]
subgraph M5["lib"]
M6["lottie-success-check.tsx"]
M7["lottie-success-check.spec.tsx"]
end
end
end
subgraph M8["unauthorized"]
subgraph M9["src"]
MA["index.ts"]
subgraph MB["lib"]
MC["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MD["translations"]
subgraph ME["src"]
MF["index.ts"]
subgraph MG["lib"]
MH["mapApolloErrorToTranslationKey.ts"]
MI["WrapTranslation.tsx"]
end
end
end
subgraph MJ["ui"]
subgraph MK["colors"]
subgraph ML["src"]
MM["index.ts"]
subgraph MN["lib"]
MO["colors.ts"]
end
end
end
subgraph MP["language-components"]
subgraph MQ["src"]
MR["index.ts"]
subgraph MS["lib"]
MT["language-components.tsx"]
MU["ltr-text-field.tsx"]
end
end
end
subgraph MV["sizes"]
subgraph MW["src"]
MX["index.ts"]
subgraph MY["lib"]
MZ["sizes.ts"]
N0["sizes.spec.tsx"]
N1["sizes.tsx"]
end
end
end
end
subgraph N2["zustand"]
subgraph N3["shared-auth-store"]
subgraph N4["src"]
N5["index.ts"]
subgraph N6["lib"]
N7["shared-auth-store.ts"]
end
end
end
subgraph N8["shared-notification-store"]
subgraph N9["src"]
NA["index.ts"]
subgraph NB["lib"]
NC["shared-notification-store.tsx"]
end
end
end
subgraph ND["shared-ui-store"]
subgraph NE["src"]
NF["index.ts"]
subgraph NG["lib"]
NH["shared-ui-store.ts"]
NI["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NJ["server"]
subgraph NK["controllers"]
subgraph NL["src"]
NM["index.ts"]
subgraph NN["lib"]
NO["auth.controller.ts"]
NP["order.controller.ts"]
end
end
end
subgraph NQ["decorators"]
NR["jest.config.ts"]
subgraph NS["src"]
NT["index.ts"]
subgraph NU["lib"]
NV["current-user.decorator.ts"]
NW["decorators.ts"]
NX["decorators.spec.ts"]
end
end
end
subgraph NY["entities"]
subgraph NZ["src"]
O0["index.ts"]
subgraph O1["lib"]
O2["brand.entity.ts"]
O3["product.entity.ts"]
O4["category.entity.ts"]
O5["product-description.entity.ts"]
O6["site-language.entity.ts"]
O7["product-info.entity.ts"]
O8["color.entity.ts"]
O9["product-info-color.entity.ts"]
OA["seller-info.entity.ts"]
OB["seller-product.entity.ts"]
OC["user.entity.ts"]
OD["cart.entity.ts"]
OE["currency-preference.entity.ts"]
OF["currency.entity.ts"]
OG["customer.entity.ts"]
OH["exchange-rate.entity.ts"]
OI["order.entity.ts"]
OJ["platform-settings.entity.ts"]
OK["refresh-token.entity.ts"]
OL["seller-order.entity.ts"]
OM["translation.entity.ts"]
end
end
end
subgraph ON["guards"]
OO["jest.config.ts"]
subgraph OP["src"]
OQ["index.ts"]
subgraph OR["lib"]
OS["catalog.guard.ts"]
OT["graphql-auth.guard.ts"]
OU["http-auth.guard.ts"]
OV["roles.guard.ts"]
OW["catalog.guard.spec.ts"]
OX["roles.guard.spec.ts"]
end
end
end
subgraph OY["inputs"]
subgraph OZ["src"]
P0["index.ts"]
subgraph P1["lib"]
P2["brand.input.ts"]
P3["cart.inputs.ts"]
P4["category.input.ts"]
P5["color.input.ts"]
P6["customer-auth.inputs.ts"]
P7["order-pagination.inputs.ts"]
P8["order.inputs.ts"]
P9["product-info-filter.input.ts"]
PA["product.input.ts"]
PB["seller-order-pagination.inputs.ts"]
PC["seller.input.ts"]
PD["site-language.input.ts"]
PE["user.input.ts"]
end
end
end
subgraph PF["modules"]
subgraph PG["src"]
PH["index.ts"]
subgraph PI["lib"]
PJ["auth.module.ts"]
PK["email.module.ts"]
PL["token.module.ts"]
PM["user.module.ts"]
PN["customer-profile.module.ts"]
PO["brand.module.ts"]
PP["catalog-guard.module.ts"]
PQ["translation.module.ts"]
PR["cart.module.ts"]
PS["platform-settings.module.ts"]
PT["category.module.ts"]
PU["product.module.ts"]
PV["color.module.ts"]
PW["currency.module.ts"]
PX["graphql-context.module.ts"]
PY["order.module.ts"]
PZ["seller-info.module.ts"]
Q0["payment.module.ts"]
Q1["product-info.module.ts"]
Q2["seller-products.module.ts"]
Q3["site-language.module.ts"]
end
end
end
subgraph Q4["resolvers"]
Q5["jest.config.ts"]
subgraph Q6["src"]
Q7["index.ts"]
subgraph Q8["lib"]
Q9["auth.resolver.ts"]
QA["zod-validation.pipe.ts"]
QB["brand.resolver.ts"]
QC["cart.resolver.ts"]
QD["category.resolver.ts"]
QE["color.resolver.ts"]
QF["currency.resolver.ts"]
QG["customer-profile.resolver.ts"]
QH["order.resolver.ts"]
QI["payment.resolver.ts"]
QJ["product-info.resolver.ts"]
QK["product.resolver.ts"]
QL["seller-info.resolver.ts"]
QM["shipping.resolver.ts"]
QN["site-language.resolver.ts"]
QO["translation.input.ts"]
QP["translation.resolver.ts"]
QQ["user.resolver.ts"]
QR["auth-validation.spec.ts"]
QS["auth.resolver.spec.ts"]
QT["cart-validation.spec.ts"]
QU["currency-translation-validation.spec.ts"]
QV["customer-profile-validation.spec.ts"]
QW["order-validation.spec.ts"]
QX["order.resolver.spec.ts"]
QY["order.resolver.status-transitions.spec.ts"]
QZ["order.resolver.tracking.spec.ts"]
R0["payment.resolver.integration.spec.ts"]
R1["payment.resolver.spec.ts"]
R2["product-info.resolver.spec.ts"]
R3["product-validation.spec.ts"]
R4["seller-info-validation.spec.ts"]
R5["taxonomy-validation.spec.ts"]
R6["translation.resolver.guards.spec.ts"]
subgraph R7["types"]
R8["graphql-upload.d.ts"]
end
R9["user.resolver.spec.ts"]
RA["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RB["services"]
RC["jest.config.ts"]
subgraph RD["src"]
RE["index.ts"]
subgraph RF["lib"]
RG["auth.service.ts"]
RH["brand.service.ts"]
RI["cart.service.ts"]
RJ["product-info-colors.util.ts"]
RK["category.service.ts"]
RL["color.service.ts"]
RM["currency.service.ts"]
RN["customer-profile.service.ts"]
RO["email.service.ts"]
RP["image-upload.service.ts"]
RQ["order.service.ts"]
RR["payment-logger.service.ts"]
RS["payment.service.ts"]
RT["product.service.ts"]
RU["seller-info.service.ts"]
RV["shipping-calculation.service.ts"]
RW["site-language.service.ts"]
RX["token.service.ts"]
RY["translation.service.ts"]
RZ["user.service.ts"]
S0["auth.service.password-policy.spec.ts"]
S1["auth.service.spec.ts"]
S2["cart.service.add-quantity.spec.ts"]
S3["cart.service.null-relations.spec.ts"]
S4["cart.service.spec.ts"]
S5["order.service.spec.ts"]
S6["order.service.tracking.spec.ts"]
S7["product-info-colors.util.spec.ts"]
S8["product.service.multi-filters.spec.ts"]
S9["product.service.only-discounted.spec.ts"]
SA["product.service.pants.spec.ts"]
SB["product.service.spec.ts"]
SC["relay-connection.spec.ts"]
SD["seller-info.service.price-validation.spec.ts"]
SE["shipping-calculation.service.spec.ts"]
SF["token.service.spec.ts"]
end
end
end
subgraph SG["strategies"]
subgraph SH["src"]
SI["index.ts"]
subgraph SJ["lib"]
SK["local.strategy.ts"]
end
end
end
subgraph SL["utils"]
subgraph SM["src"]
SN["index.ts"]
subgraph SO["lib"]
SP["email-templates.ts"]
SQ["relay-connection.ts"]
SR["pagination.ts"]
end
end
end
end
subgraph SS["shared"]
subgraph ST["codegen"]
SU["jest.config.ts"]
subgraph SV["src"]
SW["index.ts"]
subgraph SX["lib"]
subgraph SY["generated"]
SZ["graphql.ts"]
end
end
end
end
subgraph T0["graphql-schema"]
T1["jest.config.ts"]
subgraph T2["src"]
T3["index.ts"]
end
end
subgraph T4["product-sizes"]
subgraph T5["src"]
T6["index.ts"]
subgraph T7["lib"]
T8["product-sizes.ts"]
T9["product-sizes.pants-formats.spec.ts"]
TA["product-sizes.pants-label.spec.ts"]
TB["product-sizes.pants-strict.spec.ts"]
TC["product-sizes.spec.ts"]
end
end
end
subgraph TD["shared-i18n"]
subgraph TE["src"]
TF["index.ts"]
subgraph TG["lib"]
TH["language-context.tsx"]
TI["language-detector.ts"]
subgraph TJ["locales"]
TK["i18n-react.tsx"]
TL["i18n-util.ts"]
TM["i18n-util.async.ts"]
subgraph TN["en"]
TO["index.ts"]
end
subgraph TQ["fa"]
TR["index.ts"]
end
TS["formatters.ts"]
TT["i18n-types.ts"]
TU["i18n-util.sync.ts"]
TV["navigator-detector.ts"]
end
TP["site-name.ts"]
TW["table-localization.ts"]
TX["theme-provider.tsx"]
TY["use-page-title.ts"]
end
end
end
subgraph TZ["validation"]
subgraph U0["src"]
U1["index.ts"]
subgraph U2["lib"]
U3["auth.ts"]
U4["limits.ts"]
U5["primitives.ts"]
U6["auth-forms.ts"]
U7["cart.ts"]
U8["catalog.ts"]
U9["contact.ts"]
UA["currency.ts"]
UB["taxonomy.ts"]
UC["errors.ts"]
UD["order.ts"]
UE["profile.ts"]
UF["seller.ts"]
UG["auth-forms.admin.spec.ts"]
UH["auth-forms.login.spec.ts"]
UI["auth-forms.recovery.spec.ts"]
UJ["auth-forms.seller.spec.ts"]
UK["auth-forms.spec.ts"]
UL["auth.spec.ts"]
UM["cart.spec.ts"]
UN["catalog.spec.ts"]
UO["contact.spec.ts"]
UP["currency.spec.ts"]
UQ["errors.spec.ts"]
UR["order.spec.ts"]
US["primitives.spec.ts"]
UT["profile.spec.ts"]
UU["seller.spec.ts"]
UV["taxonomy.spec.ts"]
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
3I-->3G
3L-->3N
3O-->3N
3S-->3U
3V-->3U
3W-->3U
3Z-->40
40-->42
43-->42
44-->42
45-->42
49-->4A
4A-->4C
4C-->4D
4C-->4F
4D-->4E
4G-->4C
4H-->4F
4M-->4N
4N-->4P
4Q-->4P
4R-->4P
4V-->4X
4X-->4Y
51-->52
52-->54
55-->54
59-->5A
5A-->5C
5D-->5C
5I-->5K
5I-->5L
5K-->5L
5M-->5K
5P-->5R
5S-->5R
5V-->5X
5V-->5Y
5X-->5Y
5Z-->5X
60-->5Y
63-->65
66-->65
67-->65
68-->65
6D-->6F
6G-->6F
6J-->6L
6J-->6M
6J-->6N
6J-->6Q
6N-->6O
6O-->6P
6V-->6X
6V-->6Y
6V-->6Z
6V-->70
71-->6Y
76-->78
76-->79
76-->7A
7B-->79
7C-->78
7F-->7H
7K-->7M
7P-->7R
7P-->7S
7R-->7S
7T-->7R
7U-->7S
7X-->7Z
80-->7Z
84-->86
87-->86
88-->86
8C-->8E
8H-->8J
8K-->8J
8L-->8J
8P-->8R
8U-->8W
8X-->8W
8Y-->8W
91-->93
96-->98
96-->99
96-->9A
98-->99
99-->9A
9B-->98
9E-->9G
9J-->9L
9M-->9L
9N-->9L
9Q-->9S
9T-->9S
9U-->9S
9V-->9S
9Z-->A1
A2-->A1
A3-->A1
A4-->A1
A7-->A9
AA-->A9
AB-->A9
AE-->AG
AH-->AG
AL-->AN
AO-->AN
AS-->AU
AS-->B3
AS-->AX
AS-->B2
AU-->AW
AU-->AY
AU-->AZ
AU-->B0
AU-->B1
AU-->AX
AU-->B2
AW-->AX
B3-->AX
B4-->B0
B4-->AU
B4-->AX
B5-->B6
B5-->B0
B5-->AU
B5-->B3
B5-->AX
B7-->B3
B8-->B3
B9-->AX
BB-->AX
BF-->BH
BI-->BH
BJ-->BH
BM-->BO
BP-->BO
BT-->BV
BW-->BV
C0-->C2
C2-->C3
C4-->C2
C5-->C2
C6-->C2
C7-->C2
C8-->C2
CC-->CE
CF-->CE
CG-->CE
CJ-->CL
CM-->CL
CQ-->CS
CW-->CY
D1-->D3
D4-->D3
D5-->D3
D5-->D6
DA-->DC
DD-->DC
DH-->DJ
DK-->DJ
DO-->DQ
DR-->DQ
DT-->DV
E0-->E2
E3-->E2
E6-->E8
EB-->ED
EB-->EE
ED-->EE
EI-->EK
EL-->EK
EO-->EQ
EO-->ER
EO-->ES
EO-->EV
ES-->ET
ET-->EU
EV-->EQ
EV-->EW
F3-->F5
F5-->F6
F9-->FB
FF-->FH
FF-->FI
FL-->FN
FQ-->FS
FW-->FY
FZ-->FY
G2-->G4
G5-->G4
G8-->GA
GA-->GB
GC-->GB
GD-->GB
GE-->GA
GF-->GA
GI-->GK
GL-->GK
GM-->GK
GR-->GT
GT-->GU
GV-->GT
GW-->GT
GX-->GU
H1-->H3
H4-->H3
H7-->H9
HD-->HF
HL-->HN
HL-->HO
HP-->HO
HS-->HU
HV-->HU
HZ-->I1
I2-->I1
I5-->I7
IA-->IC
IA-->ID
IA-->IE
IC-->ID
IF-->IC
IJ-->IL
IM-->IL
IP-->IR
IU-->IW
IX-->IW
J0-->J2
J2-->J3
J6-->J8
J8-->J9
J8-->JA
J8-->JB
J8-->JC
JA-->J9
JA-->JB
JD-->JE
JH-->JJ
JM-->JO
JP-->JO
JS-->JU
JX-->JZ
JX-->K0
JX-->K1
JX-->K2
K7-->K9
K7-->KA
KA-->K9
KE-->KG
KG-->KH
KK-->KM
KM-->KN
KQ-->KS
KQ-->KU
KQ-->KV
KQ-->KT
KS-->KT
KW-->KT
KZ-->L1
KZ-->L2
KZ-->L3
L3-->L2
L4-->L1
L7-->L9
L7-->LA
LA-->L9
LB-->LA
LF-->LH
LF-->LI
LI-->LH
LL-->LN
LR-->LT
LU-->LT
LY-->M0
M1-->M0
M4-->M6
M7-->M6
MA-->MC
MF-->MH
MM-->MO
MR-->MT
MR-->MU
MX-->MZ
N0-->N1
N5-->N7
NA-->NC
NF-->NH
NM-->NO
NM-->NP
NT-->NV
NT-->NW
NX-->NW
O0-->O2
O0-->OD
O0-->O4
O0-->O8
O0-->OE
O0-->OF
O0-->OG
O0-->OH
O0-->OI
O0-->OJ
O0-->O5
O0-->O9
O0-->O7
O0-->O3
O0-->OK
O0-->OA
O0-->OL
O0-->OB
O0-->O6
O0-->OM
O0-->OC
O2-->O3
O3-->O2
O3-->O4
O3-->O5
O3-->O7
O3-->OA
O3-->OB
O4-->O3
O5-->O3
O5-->O6
O6-->O5
O7-->O8
O7-->O9
O7-->O3
O9-->O8
O9-->O7
OA-->OB
OA-->OC
OB-->O7
OB-->O3
OB-->OA
OD-->O3
OD-->OC
OE-->OF
OG-->OC
OH-->OF
OH-->OC
OI-->O3
OI-->OA
OK-->OC
OL-->OI
OQ-->OS
OQ-->OT
OQ-->OU
OQ-->OV
OW-->OS
OX-->OV
P0-->P2
P0-->P3
P0-->P4
P0-->P5
P0-->P6
P0-->P7
P0-->P8
P0-->P9
P0-->PA
P0-->PB
P0-->PC
P0-->PD
P0-->PE
PA-->P9
PH-->PJ
PH-->PO
PH-->PR
PH-->PP
PH-->PT
PH-->PV
PH-->PW
PH-->PN
PH-->PK
PH-->PX
PH-->PY
PH-->Q0
PH-->PS
PH-->Q1
PH-->PU
PH-->PZ
PH-->Q2
PH-->Q3
PH-->PL
PH-->PQ
PH-->PM
PJ-->PK
PJ-->PL
PJ-->PM
PM-->PJ
PM-->PN
PO-->PP
PO-->PQ
PR-->PS
PT-->PP
PT-->PU
PT-->PQ
PU-->PP
PU-->PL
PU-->PQ
PV-->PP
PV-->PQ
PX-->PK
PX-->PL
PX-->PM
PY-->PS
PY-->PZ
PZ-->PU
PZ-->PL
PZ-->PM
Q0-->PW
Q0-->PY
Q1-->PU
Q1-->PQ
Q2-->PZ
Q2-->PM
Q7-->Q9
Q7-->QB
Q7-->QC
Q7-->QD
Q7-->QE
Q7-->QF
Q7-->QG
Q7-->QH
Q7-->QI
Q7-->QJ
Q7-->QK
Q7-->QL
Q7-->QM
Q7-->QN
Q7-->QO
Q7-->QP
Q7-->QQ
Q7-->QA
Q9-->QA
QB-->QA
QC-->QA
QD-->QA
QE-->QA
QF-->QA
QG-->QA
QH-->QA
QK-->QA
QL-->QA
QN-->QA
QP-->QA
QQ-->QA
QR-->Q9
QR-->QQ
QR-->QA
QS-->Q9
QT-->QC
QT-->QA
QU-->QF
QU-->QP
QU-->QA
QV-->QG
QV-->QA
QW-->QH
QW-->QA
QX-->QH
QY-->QH
QZ-->QH
R0-->QI
R1-->QI
R2-->QJ
R3-->QK
R3-->QA
R4-->QL
R4-->QA
R5-->QB
R5-->QD
R5-->QE
R5-->QN
R5-->QA
R6-->QP
R9-->QQ
RA-->QA
RE-->RG
RE-->RH
RE-->RI
RE-->RK
RE-->RL
RE-->RM
RE-->RN
RE-->RO
RE-->RP
RE-->RQ
RE-->RR
RE-->RS
RE-->RJ
RE-->RT
RE-->RU
RE-->RV
RE-->RW
RE-->RX
RE-->RY
RE-->RZ
RI-->RJ
RT-->RJ
RU-->RJ
S0-->RG
S0-->RO
S0-->RX
S0-->RZ
S1-->RG
S1-->RO
S1-->RX
S1-->RZ
S2-->RI
S3-->RI
S4-->RI
S5-->RQ
S6-->RQ
S7-->RJ
S8-->RT
S8-->RY
S9-->RT
S9-->RY
SA-->RT
SA-->RY
SB-->RT
SB-->RY
SD-->RG
SD-->RU
SE-->RV
SF-->RX
SI-->SK
SN-->SP
SN-->SQ
SW-->SZ
T6-->T8
T9-->T8
TA-->T8
TB-->T8
TC-->T8
TF-->TH
TF-->TI
TF-->TK
TF-->TT
TF-->TL
TF-->TM
TF-->TU
TF-->TV
TF-->TP
TF-->TW
TF-->TX
TF-->TY
TH-->TI
TH-->TK
TH-->TM
TK-->TL
TM-->TO
TM-->TR
TM-->TS
TM-->TL
TO-->TP
TR-->TP
TU-->TO
TU-->TR
TU-->TS
TU-->TL
TW-->TK
TX-->TH
TY-->TK
U1-->U3
U1-->U6
U1-->U7
U1-->U8
U1-->U9
U1-->UA
U1-->UC
U1-->U4
U1-->UD
U1-->U5
U1-->UE
U1-->UF
U1-->UB
U3-->U4
U3-->U5
U5-->U4
U6-->U3
U7-->U5
UA-->UB
UD-->U3
UD-->U7
UD-->U5
UE-->UD
UG-->U6
UH-->U6
UI-->U6
UJ-->U6
UK-->U6
UL-->U3
UM-->U7
UN-->U8
UO-->U9
UP-->UA
UQ-->UC
UR-->UD
US-->U4
US-->U5
UT-->UE
UU-->UF
UV-->UB
