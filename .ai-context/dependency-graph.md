flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.spec.ts"]
5["app.module.ts"]
6["cart-inputs.validation.spec.ts"]
7["global-validation-pipe.spec.ts"]
8["order-inputs.validation.spec.ts"]
9["product-variant-inputs.validation.spec.ts"]
A["seller-product-inputs.validation.spec.ts"]
B["update-order-input.validation.spec.ts"]
end
C["main.ts"]
end
end
end
subgraph D["libs"]
subgraph E["client"]
subgraph F["admins"]
subgraph G["components"]
subgraph H["footer"]
subgraph I["src"]
J["index.ts"]
subgraph K["lib"]
L["admins-footer.tsx"]
M["admins-footer.spec.tsx"]
end
end
end
subgraph N["headerbar"]
subgraph O["src"]
P["index.ts"]
subgraph Q["lib"]
R["AdminsHeaderbar.tsx"]
S["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph T["layout"]
subgraph U["src"]
V["index.ts"]
subgraph W["lib"]
X["AdminsLayout.tsx"]
Y["AdminsTabbar.tsx"]
Z["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph 10["contexts"]
subgraph 11["src"]
12["index.spec.tsx"]
13["index.ts"]
subgraph 14["lib"]
15["AdminsAuthContext.tsx"]
16["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 17["graphql"]
subgraph 18["src"]
19["index.ts"]
subgraph 1A["lib"]
1B["fragments.ts"]
1C["mutations.ts"]
1D["orders.graphql.ts"]
1E["Provider.tsx"]
1F["AdminsApolloProvider.tsx"]
1G["client.ts"]
1H["queries.ts"]
1I["Provider.spec.tsx"]
1J["apollo-upload-client.d.ts"]
1K["client.spec.tsx"]
1L["fragments.spec.tsx"]
1M["mutations.spec.tsx"]
1N["queries.spec.tsx"]
end
end
end
subgraph 1O["hooks"]
subgraph 1P["auth"]
subgraph 1Q["src"]
1R["index.ts"]
subgraph 1S["lib"]
1T["useAdminLogin.ts"]
1U["useAdminLogin.spec.ts"]
end
end
end
subgraph 1V["currency-management"]
subgraph 1W["src"]
1X["index.ts"]
subgraph 1Y["lib"]
1Z["useAdminsCurrencyManagement.ts"]
end
end
20["vite.config.ts"]
end
subgraph 21["customers"]
subgraph 22["src"]
23["index.ts"]
subgraph 24["lib"]
25["adminsCustomers.graphql.ts"]
26["useAdminsCustomers.ts"]
27["useAdminsCustomers.spec.tsx"]
end
end
28["vite.config.ts"]
end
subgraph 29["orders"]
subgraph 2A["src"]
2B["index.ts"]
subgraph 2C["lib"]
2D["admins-orders-hook.tsx"]
2E["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2F["sellers"]
subgraph 2G["src"]
2H["index.ts"]
subgraph 2I["lib"]
2J["useAdminsSellers.ts"]
2K["adminsSellers.graphql.ts"]
2L["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2M["router"]
subgraph 2N["src"]
2O["index.ts"]
subgraph 2P["lib"]
2Q["AdminsRouter.tsx"]
2R["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2S["routes"]
subgraph 2T["src"]
2U["index.spec.ts"]
2V["index.ts"]
subgraph 2W["lib"]
2X["admin-routes.ts"]
2Y["admin-routes.spec.ts"]
end
end
end
subgraph 2Z["screens"]
subgraph 30["admin-seller-orders"]
subgraph 31["src"]
32["index.spec.tsx"]
33["index.ts"]
subgraph 34["lib"]
35["admin-seller-orders.tsx"]
36["admin-seller-orders.pants-size.spec.tsx"]
37["admin-seller-orders.spec.tsx"]
38["admin-seller-orders.status-schema.spec.ts"]
end
end
end
subgraph 39["currency-management"]
subgraph 3A["src"]
3B["index.ts"]
subgraph 3C["lib"]
3D["currency-management.tsx"]
3E["currency-management.rate-validation.spec.tsx"]
3F["currency-management.spec.tsx"]
end
end
end
subgraph 3G["customer-management"]
subgraph 3H["src"]
3I["index.ts"]
subgraph 3J["lib"]
3K["admin-customer-management.tsx"]
3L["admin-customer-management.spec.tsx"]
end
end
3M["vite.config.ts"]
end
subgraph 3N["login"]
subgraph 3O["src"]
3P["index.ts"]
subgraph 3Q["lib"]
3R["AdminsLogin.tsx"]
3S["AdminsLogin.spec.tsx"]
3T["AdminsLogin.zod.spec.tsx"]
end
end
end
subgraph 3U["product-editor"]
subgraph 3V["src"]
3W["index.spec.tsx"]
3X["index.ts"]
subgraph 3Y["lib"]
3Z["AdminProductEditor.tsx"]
40["AdminProductEditor.color-validation.spec.tsx"]
41["AdminProductEditor.pants-range.spec.tsx"]
42["AdminProductEditor.spec.tsx"]
end
43["vite-env.d.ts"]
end
end
subgraph 44["products"]
subgraph 45["src"]
46["index.spec.tsx"]
47["index.ts"]
subgraph 48["lib"]
49["AdminProducts.tsx"]
4A["adminProducts.hooks.ts"]
4B["adminProducts.graphql.ts"]
4C["ProductImageManagementModal.tsx"]
4D["AdminProducts.spec.tsx"]
4E["ProductImageManagementModal.pants-size.spec.tsx"]
4F["ProductImageManagementModal.spec.tsx"]
end
4G["vite-env.d.ts"]
end
end
subgraph 4H["seller-management"]
subgraph 4I["src"]
4J["index.spec.tsx"]
4K["index.ts"]
subgraph 4L["lib"]
4M["SellerManagement.tsx"]
4N["SellerManagement.form-validation.spec.tsx"]
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
76["getDiscountedUnitPrice.ts"]
77["useCartService.ts"]
78["useWishlistSync.ts"]
79["getDiscountedUnitPrice.spec.ts"]
7A["useCartService.spec.tsx"]
7B["useCartSync.ts"]
end
end
end
subgraph 7C["orders"]
subgraph 7D["src"]
7E["index.ts"]
subgraph 7F["lib"]
7G["customers-orders-hook.tsx"]
end
end
end
subgraph 7H["products"]
subgraph 7I["src"]
7J["index.ts"]
subgraph 7K["lib"]
7L["customers-product-hook.tsx"]
end
end
end
end
subgraph 7M["router"]
subgraph 7N["src"]
7O["index.ts"]
subgraph 7P["lib"]
7Q["CustomersRouter.tsx"]
7R["ScrollToTop.tsx"]
7S["CustomersRouter.spec.tsx"]
7T["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7U["routes"]
subgraph 7V["src"]
7W["index.ts"]
subgraph 7X["lib"]
7Y["customer-routes.ts"]
7Z["customer-routes.spec.ts"]
end
end
end
subgraph 80["screens"]
subgraph 81["contact"]
subgraph 82["src"]
83["index.ts"]
subgraph 84["lib"]
85["customer-contact.tsx"]
86["customer-contact.spec.tsx"]
87["customer-contact.validation.spec.tsx"]
end
end
88["vite.config.ts"]
end
subgraph 89["customer-checkout"]
subgraph 8A["src"]
8B["index.ts"]
subgraph 8C["lib"]
8D["customer-checkout.tsx"]
end
end
end
subgraph 8E["customer-favorites"]
subgraph 8F["src"]
8G["index.ts"]
subgraph 8H["lib"]
8I["customer-favorites.tsx"]
8J["customer-favorites.shared-card.spec.tsx"]
8K["customer-favorites.spec.tsx"]
end
end
8L["vite.config.ts"]
end
subgraph 8M["customer-login"]
subgraph 8N["src"]
8O["index.ts"]
subgraph 8P["lib"]
8Q["customer-login.tsx"]
end
end
end
subgraph 8R["customer-order-confirmation"]
subgraph 8S["src"]
8T["index.ts"]
subgraph 8U["lib"]
8V["customer-order-confirmation.tsx"]
8W["customer-order-confirmation.pants-size.spec.tsx"]
8X["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8Y["customer-orders"]
subgraph 8Z["src"]
90["index.ts"]
subgraph 91["lib"]
92["customer-orders.tsx"]
end
end
end
subgraph 93["customer-payment"]
subgraph 94["src"]
95["index.ts"]
subgraph 96["lib"]
97["customer-payment-callback.tsx"]
98["use-zarinpal-payment.tsx"]
99["zarinpal-payment-service.ts"]
9A["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 9B["customer-products"]
subgraph 9C["src"]
9D["index.ts"]
subgraph 9E["lib"]
9F["customer-products.tsx"]
end
end
end
subgraph 9G["customer-profile"]
subgraph 9H["src"]
9I["index.ts"]
subgraph 9J["lib"]
9K["customer-profile.tsx"]
9L["customer-profile.spec.tsx"]
9M["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9N["customer-shopping-cart"]
subgraph 9O["src"]
9P["index.ts"]
subgraph 9Q["lib"]
9R["customer-shopping-cart.tsx"]
9S["build-order-confirmation-data.ts"]
9T["build-order-confirmation-data.spec.ts"]
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
D5["barrel.spec.ts"]
D6["shipping-validation.shared.spec.ts"]
end
end
end
subgraph D7["zustand"]
subgraph D8["customer-cart-store"]
subgraph D9["src"]
DA["index.ts"]
subgraph DB["lib"]
DC["customer-cart-store.ts"]
DD["barrel.spec.ts"]
DE["customer-cart-store.spec.ts"]
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
end
end
subgraph EY["hooks"]
subgraph EZ["auth"]
subgraph F0["src"]
F1["index.ts"]
subgraph F2["lib"]
F3["useSellerAuth.ts"]
F4["sellerAuth.graphql.ts"]
end
end
end
subgraph F5["orders"]
subgraph F6["src"]
F7["index.ts"]
subgraph F8["lib"]
F9["useSellerOrders.ts"]
FA["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FB["products"]
subgraph FC["src"]
FD["index.ts"]
subgraph FE["lib"]
FF["useSellersProductManagement.ts"]
FG["useSellersProducts.ts"]
end
end
end
end
subgraph FH["router"]
subgraph FI["src"]
FJ["index.ts"]
subgraph FK["lib"]
FL["SellersRouter.tsx"]
end
end
end
subgraph FM["routes"]
subgraph FN["src"]
FO["index.ts"]
subgraph FP["lib"]
FQ["seller-routes.ts"]
end
end
end
subgraph FR["screens"]
subgraph FS["catalog"]
subgraph FT["src"]
FU["index.ts"]
subgraph FV["lib"]
FW["SellersCatalogScreens.tsx"]
FX["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FY["login"]
subgraph FZ["src"]
G0["index.ts"]
subgraph G1["lib"]
G2["SellersLogin.tsx"]
G3["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G4["manage-product"]
subgraph G5["src"]
G6["index.ts"]
subgraph G7["lib"]
G8["SellersManageProductScreen.tsx"]
G9["SellersDefineProductFlow.tsx"]
GA["SellersDefineProductFlow.pants-label.spec.tsx"]
GB["SellersDefineProductFlow.spec.tsx"]
GC["SellersManageProductScreen.spec.tsx"]
GD["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GE["products"]
subgraph GF["src"]
GG["index.ts"]
subgraph GH["lib"]
GI["SellersProducts.tsx"]
GJ["SellersProducts.pants-label.spec.tsx"]
GK["SellersProducts.spec.tsx"]
end
end
end
subgraph GL["seller-orders"]
GM["jest.config.ts"]
GN["jest.setup.ts"]
subgraph GO["src"]
GP["index.ts"]
subgraph GQ["lib"]
GR["seller-orders-screen.tsx"]
GS["seller-status-transitions.ts"]
GT["seller-orders-screen.pants-size.spec.tsx"]
GU["seller-orders-screen.spec.tsx"]
GV["seller-orders-screen.status-schema.spec.ts"]
GW["seller-status-transitions.spec.ts"]
end
GX["test-setup.ts"]
end
end
subgraph GY["setup-password"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["SellersSetupPassword.tsx"]
H3["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H4["unauthorized"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H9["zustand"]
subgraph HA["sellers-products-store"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["useSellersProductsStore.ts"]
HF["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HG["shared"]
subgraph HH["components"]
subgraph HI["apollo-provider-base"]
subgraph HJ["src"]
HK["index.ts"]
subgraph HL["lib"]
HM["ApolloProviderBase.tsx"]
HN["createSilentRefreshAuthLink.ts"]
HO["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HP["error-boundary"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["error-boundary.tsx"]
HU["error-boundary.spec.tsx"]
end
end
HV["vite.config.ts"]
end
subgraph HW["glassmorphism-container"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["glassmorphism-container.tsx"]
I1["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I2["layout"]
subgraph I3["src"]
I4["index.ts"]
subgraph I5["lib"]
I6["Layout.tsx"]
end
end
end
subgraph I7["material-data-table"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["material-data-table.tsx"]
IC["table-config.ts"]
ID["table-utils.ts"]
IE["material-data-table.spec.tsx"]
IF["table-types.ts"]
end
end
end
subgraph IG["order-status-chip"]
subgraph IH["src"]
II["index.ts"]
subgraph IJ["lib"]
IK["order-status-chip.tsx"]
IL["order-status-chip.spec.tsx"]
end
end
end
subgraph IM["password-field"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["PasswordTextField.tsx"]
end
end
end
subgraph IR["price-display"]
subgraph IS["src"]
IT["index.ts"]
subgraph IU["lib"]
IV["price-display.tsx"]
IW["price-display.spec.tsx"]
end
end
end
subgraph IX["private-route"]
subgraph IY["src"]
IZ["index.ts"]
subgraph J0["lib"]
J1["createPrivateRoute.tsx"]
J2["PrivateRoute.tsx"]
end
end
end
subgraph J3["rtl-table-utils"]
subgraph J4["src"]
J5["index.ts"]
subgraph J6["lib"]
J7["rtl-table-utils.ts"]
J8["rtl-cell-components.tsx"]
J9["rtl-column-helpers.ts"]
JA["rtl-table-props.ts"]
JB["use-table-alignment.ts"]
JC["barrel.spec.ts"]
end
end
end
subgraph JD["snackbar"]
subgraph JE["src"]
JF["index.ts"]
subgraph JG["lib"]
JH["snackbar.tsx"]
end
end
end
subgraph JI["styled-drawer"]
subgraph JJ["src"]
JK["index.ts"]
subgraph JL["lib"]
JM["styled-drawer.tsx"]
JN["styled-drawer.spec.tsx"]
end
end
end
subgraph JO["unauthorized"]
subgraph JP["src"]
JQ["index.ts"]
subgraph JR["lib"]
JS["unauthorized-path.tsx"]
end
end
end
end
subgraph JT["graphql"]
subgraph JU["src"]
JV["index.ts"]
subgraph JW["lib"]
JX["currency.mutations.ts"]
JY["currency.queries.ts"]
JZ["fragments.ts"]
K0["variant-colors.ts"]
K1["client-shared-graphql.tsx"]
end
end
end
subgraph K2["hooks"]
subgraph K3["brands"]
subgraph K4["src"]
K5["index.ts"]
subgraph K6["lib"]
K7["brands.graphql.ts"]
K8["useBrands.ts"]
end
end
K9["vite.config.ts"]
end
subgraph KA["categories"]
subgraph KB["src"]
KC["index.ts"]
subgraph KD["lib"]
KE["useCategories.ts"]
KF["categories.graphql.ts"]
end
end
end
subgraph KG["colors"]
subgraph KH["src"]
KI["index.ts"]
subgraph KJ["lib"]
KK["useColors.ts"]
KL["color.graphql.ts"]
end
end
end
subgraph KM["currency"]
subgraph KN["src"]
KO["index.ts"]
subgraph KP["lib"]
KQ["useConvertPrice.tsx"]
KR["useExchangeRate.tsx"]
KS["useCurrencies.tsx"]
KT["useCurrencyForLocale.tsx"]
KU["useExchangeRate.spec.tsx"]
end
end
end
subgraph KV["products"]
subgraph KW["src"]
KX["index.ts"]
subgraph KY["lib"]
KZ["productImage.ts"]
L0["products.graphql.ts"]
L1["useProducts.ts"]
L2["productImage.spec.ts"]
end
end
end
subgraph L3["site-languages"]
subgraph L4["src"]
L5["index.ts"]
subgraph L6["lib"]
L7["site-languages.graphql.ts"]
L8["useSiteLanguages.ts"]
L9["site-languages-hook.spec.tsx"]
end
end
LA["vite.config.ts"]
end
subgraph LB["snackbar"]
subgraph LC["src"]
LD["index.ts"]
subgraph LE["lib"]
LF["SnackbarContext.tsx"]
LG["useSnackbar.ts"]
end
end
end
subgraph LH["translations-management-hook"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["useTranslationsManagement.ts"]
end
end
end
end
subgraph LM["lottie"]
subgraph LN["empty-cart"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["lottie-empty-cart.tsx"]
LS["lottie-empty-cart.spec.tsx"]
end
end
LT["vite.config.ts"]
end
subgraph LU["loading"]
subgraph LV["src"]
LW["index.ts"]
subgraph LX["lib"]
LY["lottie-loading.tsx"]
LZ["lottie-loading.spec.tsx"]
end
end
end
subgraph M0["success-check"]
subgraph M1["src"]
M2["index.ts"]
subgraph M3["lib"]
M4["lottie-success-check.tsx"]
M5["lottie-success-check.spec.tsx"]
end
end
end
subgraph M6["unauthorized"]
subgraph M7["src"]
M8["index.ts"]
subgraph M9["lib"]
MA["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MB["translations"]
subgraph MC["src"]
MD["index.ts"]
subgraph ME["lib"]
MF["mapApolloErrorToTranslationKey.ts"]
MG["WrapTranslation.tsx"]
end
end
end
subgraph MH["ui"]
subgraph MI["colors"]
subgraph MJ["src"]
MK["index.ts"]
subgraph ML["lib"]
MM["colors.ts"]
end
end
end
subgraph MN["language-components"]
subgraph MO["src"]
MP["index.ts"]
subgraph MQ["lib"]
MR["language-components.tsx"]
MS["ltr-text-field.tsx"]
end
end
end
subgraph MT["sizes"]
subgraph MU["src"]
MV["index.ts"]
subgraph MW["lib"]
MX["sizes.ts"]
MY["barrel.spec.ts"]
end
end
end
end
subgraph MZ["zustand"]
subgraph N0["shared-auth-store"]
subgraph N1["src"]
N2["index.ts"]
subgraph N3["lib"]
N4["shared-auth-store.ts"]
end
end
end
subgraph N5["shared-notification-store"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["shared-notification-store.tsx"]
end
end
end
subgraph NA["shared-ui-store"]
subgraph NB["src"]
NC["index.ts"]
subgraph ND["lib"]
NE["shared-ui-store.ts"]
NF["barrel.spec.ts"]
end
end
end
end
end
end
subgraph NG["server"]
subgraph NH["controllers"]
subgraph NI["src"]
NJ["index.ts"]
subgraph NK["lib"]
NL["auth.controller.ts"]
NM["order.controller.ts"]
end
end
end
subgraph NN["decorators"]
NO["jest.config.ts"]
subgraph NP["src"]
NQ["index.ts"]
subgraph NR["lib"]
NS["authenticated-user.type.ts"]
NT["current-user.decorator.ts"]
NU["decorators.ts"]
NV["decorators.spec.ts"]
end
end
end
subgraph NW["entities"]
subgraph NX["src"]
NY["index.ts"]
subgraph NZ["lib"]
O0["brand.entity.ts"]
O1["product.entity.ts"]
O2["category.entity.ts"]
O3["product-description.entity.ts"]
O4["site-language.entity.ts"]
O5["product-info.entity.ts"]
O6["color.entity.ts"]
O7["product-info-color.entity.ts"]
O8["seller-info.entity.ts"]
O9["seller-product.entity.ts"]
OA["user.entity.ts"]
OB["cart.entity.ts"]
OC["currency-preference.entity.ts"]
OD["currency.entity.ts"]
OE["customer.entity.ts"]
OF["exchange-rate.entity.ts"]
OG["order.entity.ts"]
OH["platform-settings.entity.ts"]
OI["refresh-token.entity.ts"]
OJ["seller-order.entity.ts"]
OK["translation.entity.ts"]
end
end
end
subgraph OL["guards"]
OM["jest.config.ts"]
subgraph ON["src"]
OO["index.ts"]
subgraph OP["lib"]
OQ["catalog.guard.ts"]
OR["graphql-auth.guard.ts"]
OS["http-auth.guard.ts"]
OT["roles.guard.ts"]
OU["catalog.guard.spec.ts"]
OV["roles.guard.spec.ts"]
end
end
end
subgraph OW["inputs"]
subgraph OX["src"]
OY["index.ts"]
subgraph OZ["lib"]
P0["brand.input.ts"]
P1["cart.inputs.ts"]
P2["category.input.ts"]
P3["color.input.ts"]
P4["customer-auth.inputs.ts"]
P5["order-pagination.inputs.ts"]
P6["order.inputs.ts"]
P7["product-info-filter.input.ts"]
P8["product.input.ts"]
P9["seller-order-pagination.inputs.ts"]
PA["seller.input.ts"]
PB["site-language.input.ts"]
PC["user.input.ts"]
end
end
end
subgraph PD["modules"]
subgraph PE["src"]
PF["index.ts"]
subgraph PG["lib"]
PH["auth.module.ts"]
PI["email.module.ts"]
PJ["token.module.ts"]
PK["user.module.ts"]
PL["customer-profile.module.ts"]
PM["brand.module.ts"]
PN["catalog-guard.module.ts"]
PO["translation.module.ts"]
PP["cart.module.ts"]
PQ["platform-settings.module.ts"]
PR["category.module.ts"]
PS["product.module.ts"]
PT["color.module.ts"]
PU["currency.module.ts"]
PV["graphql-context.module.ts"]
PW["order.module.ts"]
PX["seller-info.module.ts"]
PY["payment.module.ts"]
PZ["product-info.module.ts"]
Q0["seller-products.module.ts"]
Q1["site-language.module.ts"]
end
end
end
subgraph Q2["resolvers"]
Q3["jest.config.ts"]
subgraph Q4["src"]
Q5["index.ts"]
subgraph Q6["lib"]
Q7["auth.resolver.ts"]
Q8["zod-validation.pipe.ts"]
Q9["brand.resolver.ts"]
QA["cart.resolver.ts"]
QB["category.resolver.ts"]
QC["color.resolver.ts"]
QD["currency.resolver.ts"]
QE["customer-profile.resolver.ts"]
QF["order.resolver.ts"]
QG["payment.resolver.ts"]
QH["product-info.resolver.ts"]
QI["product.resolver.ts"]
QJ["seller-info.resolver.ts"]
QK["shipping.resolver.ts"]
QL["site-language.resolver.ts"]
QM["translation.input.ts"]
QN["translation.resolver.ts"]
QO["user.resolver.ts"]
QP["auth-validation.spec.ts"]
QQ["auth.resolver.spec.ts"]
QR["cart-validation.spec.ts"]
QS["currency-translation-validation.spec.ts"]
QT["customer-profile-validation.spec.ts"]
QU["order-validation.spec.ts"]
QV["order.resolver.spec.ts"]
QW["order.resolver.status-transitions.spec.ts"]
QX["order.resolver.tracking.spec.ts"]
QY["payment.resolver.integration.spec.ts"]
QZ["payment.resolver.spec.ts"]
R0["product-info.resolver.spec.ts"]
R1["product-validation.spec.ts"]
R2["product.resolver.spec.ts"]
R3["query-args-validation.spec.ts"]
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
U3["apollo-error.ts"]
U4["auth.ts"]
U5["limits.ts"]
U6["primitives.ts"]
U7["auth-forms.ts"]
U8["cart.ts"]
U9["catalog.ts"]
UA["contact.ts"]
UB["currency.ts"]
UC["taxonomy.ts"]
UD["errors.ts"]
UE["order.ts"]
UF["profile.ts"]
UG["query.ts"]
UH["seller.ts"]
UI["auth-forms.admin.spec.ts"]
UJ["auth-forms.login.spec.ts"]
UK["auth-forms.recovery.spec.ts"]
UL["auth-forms.seller.spec.ts"]
UM["auth-forms.spec.ts"]
UN["auth.spec.ts"]
UO["cart.spec.ts"]
UP["catalog.spec.ts"]
UQ["contact.spec.ts"]
UR["currency.spec.ts"]
US["errors.spec.ts"]
UT["order.spec.ts"]
UU["primitives.spec.ts"]
UV["profile.spec.ts"]
UW["query.spec.ts"]
UX["seller.spec.ts"]
UY["taxonomy.spec.ts"]
end
end
end
end
end
4-->5
C-->5
J-->L
M-->L
P-->R
S-->R
V-->X
V-->Y
X-->Y
Z-->X
12-->13
13-->15
16-->15
19-->1B
19-->1C
19-->1D
19-->1E
19-->1H
1E-->1F
1F-->1G
1H-->1B
1I-->1F
1I-->1E
1K-->1G
1L-->1B
1M-->1C
1N-->1H
1R-->1T
1U-->1T
1X-->1Z
23-->25
23-->26
26-->25
27-->26
2B-->2D
2E-->2D
2H-->2J
2J-->2K
2L-->2J
2O-->2Q
2R-->2Q
2U-->2V
2V-->2X
2Y-->2X
32-->33
33-->35
36-->35
37-->35
3B-->3D
3E-->3D
3F-->3D
3I-->3K
3L-->3K
3P-->3R
3S-->3R
3T-->3R
3W-->3X
3X-->3Z
40-->3Z
41-->3Z
42-->3Z
46-->47
47-->49
49-->4A
49-->4C
4A-->4B
4D-->49
4E-->4C
4J-->4K
4K-->4M
4N-->4M
4O-->4M
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
73-->78
79-->76
7A-->77
7B-->75
7E-->7G
7J-->7L
7O-->7Q
7O-->7R
7Q-->7R
7S-->7Q
7T-->7R
7W-->7Y
7Z-->7Y
83-->85
86-->85
87-->85
8B-->8D
8G-->8I
8J-->8I
8K-->8I
8O-->8Q
8T-->8V
8W-->8V
8X-->8V
90-->92
95-->97
95-->98
95-->99
97-->98
98-->99
9A-->97
9D-->9F
9I-->9K
9L-->9K
9M-->9K
9P-->9R
9R-->9S
9T-->9S
9U-->9R
9V-->9R
9W-->9R
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
D5-->D2
D6-->D4
DA-->DC
DD-->DA
DE-->DC
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
F1-->F3
F3-->F4
F7-->F9
FD-->FF
FD-->FG
FJ-->FL
FO-->FQ
FU-->FW
FX-->FW
G0-->G2
G3-->G2
G6-->G8
G8-->G9
GA-->G9
GB-->G9
GC-->G8
GD-->G8
GG-->GI
GJ-->GI
GK-->GI
GP-->GR
GR-->GS
GT-->GR
GU-->GR
GW-->GS
H0-->H2
H3-->H2
H6-->H8
HC-->HE
HK-->HM
HK-->HN
HO-->HN
HR-->HT
HU-->HT
HY-->I0
I1-->I0
I4-->I6
I9-->IB
I9-->IC
I9-->ID
IB-->IC
IE-->IB
II-->IK
IL-->IK
IO-->IQ
IT-->IV
IW-->IV
IZ-->J1
J1-->J2
J5-->J7
J7-->J8
J7-->J9
J7-->JA
J7-->JB
J9-->J8
J9-->JA
JC-->J5
JF-->JH
JK-->JM
JN-->JM
JQ-->JS
JV-->JX
JV-->JY
JV-->JZ
JV-->K0
K5-->K7
K5-->K8
K8-->K7
KC-->KE
KE-->KF
KI-->KK
KK-->KL
KO-->KQ
KO-->KS
KO-->KT
KO-->KR
KQ-->KR
KU-->KR
KX-->KZ
KX-->L0
KX-->L1
L1-->L0
L2-->KZ
L5-->L7
L5-->L8
L8-->L7
L9-->L8
LD-->LF
LD-->LG
LG-->LF
LJ-->LL
LP-->LR
LS-->LR
LW-->LY
LZ-->LY
M2-->M4
M5-->M4
M8-->MA
MD-->MF
MK-->MM
MP-->MR
MP-->MS
MV-->MX
MY-->MV
N2-->N4
N7-->N9
NC-->NE
NF-->NC
NJ-->NL
NJ-->NM
NQ-->NS
NQ-->NT
NQ-->NU
NV-->NU
NY-->O0
NY-->OB
NY-->O2
NY-->O6
NY-->OC
NY-->OD
NY-->OE
NY-->OF
NY-->OG
NY-->OH
NY-->O3
NY-->O7
NY-->O5
NY-->O1
NY-->OI
NY-->O8
NY-->OJ
NY-->O9
NY-->O4
NY-->OK
NY-->OA
O0-->O1
O1-->O0
O1-->O2
O1-->O3
O1-->O5
O1-->O8
O1-->O9
O2-->O1
O3-->O1
O3-->O4
O4-->O3
O5-->O6
O5-->O7
O5-->O1
O7-->O6
O7-->O5
O8-->O9
O8-->OA
O9-->O5
O9-->O1
O9-->O8
OB-->O1
OB-->OA
OC-->OD
OE-->OA
OF-->OD
OF-->OA
OG-->O1
OG-->O8
OI-->OA
OJ-->OG
OJ-->O8
OO-->OQ
OO-->OR
OO-->OS
OO-->OT
OU-->OQ
OV-->OT
OY-->P0
OY-->P1
OY-->P2
OY-->P3
OY-->P4
OY-->P5
OY-->P6
OY-->P7
OY-->P8
OY-->P9
OY-->PA
OY-->PB
OY-->PC
P8-->P7
PF-->PH
PF-->PM
PF-->PP
PF-->PN
PF-->PR
PF-->PT
PF-->PU
PF-->PL
PF-->PI
PF-->PV
PF-->PW
PF-->PY
PF-->PQ
PF-->PZ
PF-->PS
PF-->PX
PF-->Q0
PF-->Q1
PF-->PJ
PF-->PO
PF-->PK
PH-->PI
PH-->PJ
PH-->PK
PK-->PH
PK-->PL
PM-->PN
PM-->PO
PP-->PQ
PR-->PN
PR-->PS
PR-->PO
PS-->PN
PS-->PJ
PS-->PO
PT-->PN
PT-->PO
PV-->PI
PV-->PJ
PV-->PK
PW-->PQ
PW-->PX
PX-->PS
PX-->PJ
PX-->PK
PY-->PU
PY-->PW
PZ-->PS
PZ-->PO
Q0-->PX
Q0-->PK
Q5-->Q7
Q5-->Q9
Q5-->QA
Q5-->QB
Q5-->QC
Q5-->QD
Q5-->QE
Q5-->QF
Q5-->QG
Q5-->QH
Q5-->QI
Q5-->QJ
Q5-->QK
Q5-->QL
Q5-->QM
Q5-->QN
Q5-->QO
Q5-->Q8
Q7-->Q8
Q9-->Q8
QA-->Q8
QB-->Q8
QC-->Q8
QD-->Q8
QE-->Q8
QF-->Q8
QI-->Q8
QJ-->Q8
QL-->Q8
QN-->Q8
QO-->Q8
QP-->Q7
QP-->QO
QP-->Q8
QQ-->Q7
QR-->QA
QR-->Q8
QS-->QD
QS-->QN
QS-->Q8
QT-->QE
QT-->Q8
QU-->QF
QU-->Q8
QV-->QF
QW-->QF
QX-->QF
QY-->QG
QZ-->QG
R0-->QH
R1-->QI
R1-->Q8
R2-->QI
R3-->QF
R3-->QI
R3-->QJ
R3-->Q8
R4-->QJ
R4-->Q8
R5-->Q9
R5-->QB
R5-->QC
R5-->QL
R5-->Q8
R6-->QN
R9-->QO
RA-->Q8
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
U1-->U4
U1-->U7
U1-->U8
U1-->U9
U1-->UA
U1-->UB
U1-->UD
U1-->U5
U1-->UE
U1-->U6
U1-->UF
U1-->UG
U1-->UH
U1-->UC
U4-->U5
U4-->U6
U6-->U5
U7-->U4
U8-->U6
UB-->UC
UE-->U4
UE-->U8
UE-->U6
UF-->UE
UG-->U6
UI-->U7
UJ-->U7
UK-->U7
UL-->U7
UM-->U7
UN-->U4
UO-->U8
UP-->U9
UQ-->UA
UR-->UB
US-->UD
UT-->UE
UU-->U5
UU-->U6
UV-->UF
UW-->UG
UX-->UH
UY-->UC
