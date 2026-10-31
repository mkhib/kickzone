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
subgraph 1O["types"]
1P["apollo-upload-client.d.ts"]
end
end
end
subgraph 1Q["hooks"]
subgraph 1R["auth"]
subgraph 1S["src"]
1T["index.ts"]
subgraph 1U["lib"]
1V["useAdminLogin.ts"]
1W["useAdminLogin.spec.ts"]
1X["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1Y["currency-management"]
subgraph 1Z["src"]
20["index.ts"]
subgraph 21["lib"]
22["useAdminsCurrencyManagement.ts"]
end
end
23["vite.config.ts"]
end
subgraph 24["customers"]
subgraph 25["src"]
26["index.ts"]
subgraph 27["lib"]
28["adminsCustomers.graphql.ts"]
29["useAdminsCustomers.ts"]
2A["useAdminsCustomers.spec.tsx"]
end
end
2B["vite.config.ts"]
end
subgraph 2C["orders"]
subgraph 2D["src"]
2E["index.ts"]
subgraph 2F["lib"]
2G["admins-orders-hook.tsx"]
2H["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2I["sellers"]
subgraph 2J["src"]
2K["index.ts"]
subgraph 2L["lib"]
2M["useAdminsSellers.ts"]
2N["adminsSellers.graphql.ts"]
2O["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2P["router"]
subgraph 2Q["src"]
2R["index.ts"]
subgraph 2S["lib"]
2T["AdminsRouter.tsx"]
2U["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2V["routes"]
subgraph 2W["src"]
2X["index.spec.ts"]
2Y["index.ts"]
subgraph 2Z["lib"]
30["admin-routes.ts"]
31["admin-routes.spec.ts"]
end
end
end
subgraph 32["screens"]
subgraph 33["admin-seller-orders"]
subgraph 34["src"]
35["index.spec.tsx"]
36["index.ts"]
subgraph 37["lib"]
38["admin-seller-orders.tsx"]
39["admin-seller-orders.pants-size.spec.tsx"]
3A["admin-seller-orders.spec.tsx"]
3B["admin-seller-orders.status-schema.spec.ts"]
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
GX["seller-orders-screen.status-schema.spec.ts"]
GY["seller-status-transitions.spec.ts"]
end
GZ["test-setup.ts"]
end
end
subgraph H0["setup-password"]
subgraph H1["src"]
H2["index.ts"]
subgraph H3["lib"]
H4["SellersSetupPassword.tsx"]
H5["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H6["unauthorized"]
subgraph H7["src"]
H8["index.ts"]
subgraph H9["lib"]
HA["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph HB["zustand"]
subgraph HC["sellers-products-store"]
subgraph HD["src"]
HE["index.ts"]
subgraph HF["lib"]
HG["useSellersProductsStore.ts"]
HH["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HI["shared"]
subgraph HJ["components"]
subgraph HK["apollo-provider-base"]
subgraph HL["src"]
HM["index.ts"]
subgraph HN["lib"]
HO["ApolloProviderBase.tsx"]
HP["createSilentRefreshAuthLink.ts"]
HQ["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HR["error-boundary"]
subgraph HS["src"]
HT["index.ts"]
subgraph HU["lib"]
HV["error-boundary.tsx"]
HW["error-boundary.spec.tsx"]
end
end
HX["vite.config.ts"]
end
subgraph HY["glassmorphism-container"]
subgraph HZ["src"]
I0["index.ts"]
subgraph I1["lib"]
I2["glassmorphism-container.tsx"]
I3["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I4["layout"]
subgraph I5["src"]
I6["index.ts"]
subgraph I7["lib"]
I8["Layout.tsx"]
end
end
end
subgraph I9["material-data-table"]
subgraph IA["src"]
IB["index.ts"]
subgraph IC["lib"]
ID["material-data-table.tsx"]
IE["table-config.ts"]
IF["table-utils.ts"]
IG["material-data-table.spec.tsx"]
IH["table-types.ts"]
end
end
end
subgraph II["order-status-chip"]
subgraph IJ["src"]
IK["index.ts"]
subgraph IL["lib"]
IM["order-status-chip.tsx"]
IN["order-status-chip.spec.tsx"]
end
end
end
subgraph IO["password-field"]
subgraph IP["src"]
IQ["index.ts"]
subgraph IR["lib"]
IS["PasswordTextField.tsx"]
end
end
end
subgraph IT["price-display"]
subgraph IU["src"]
IV["index.ts"]
subgraph IW["lib"]
IX["price-display.tsx"]
IY["price-display.spec.tsx"]
end
end
end
subgraph IZ["private-route"]
subgraph J0["src"]
J1["index.ts"]
subgraph J2["lib"]
J3["createPrivateRoute.tsx"]
J4["PrivateRoute.tsx"]
end
end
end
subgraph J5["rtl-table-utils"]
subgraph J6["src"]
J7["index.ts"]
subgraph J8["lib"]
J9["rtl-table-utils.ts"]
JA["rtl-cell-components.tsx"]
JB["rtl-column-helpers.ts"]
JC["rtl-table-props.ts"]
JD["use-table-alignment.ts"]
JE["rtl-table-utils.spec.tsx"]
JF["rtl-table-utils.tsx"]
end
end
end
subgraph JG["snackbar"]
subgraph JH["src"]
JI["index.ts"]
subgraph JJ["lib"]
JK["snackbar.tsx"]
end
end
end
subgraph JL["styled-drawer"]
subgraph JM["src"]
JN["index.ts"]
subgraph JO["lib"]
JP["styled-drawer.tsx"]
JQ["styled-drawer.spec.tsx"]
end
end
end
subgraph JR["unauthorized"]
subgraph JS["src"]
JT["index.ts"]
subgraph JU["lib"]
JV["unauthorized-path.tsx"]
end
end
end
end
subgraph JW["graphql"]
subgraph JX["src"]
JY["index.ts"]
subgraph JZ["lib"]
K0["currency.mutations.ts"]
K1["currency.queries.ts"]
K2["fragments.ts"]
K3["variant-colors.ts"]
K4["client-shared-graphql.tsx"]
end
end
end
subgraph K5["hooks"]
subgraph K6["brands"]
subgraph K7["src"]
K8["index.ts"]
subgraph K9["lib"]
KA["brands.graphql.ts"]
KB["useBrands.ts"]
end
end
KC["vite.config.ts"]
end
subgraph KD["categories"]
subgraph KE["src"]
KF["index.ts"]
subgraph KG["lib"]
KH["useCategories.ts"]
KI["categories.graphql.ts"]
end
end
end
subgraph KJ["colors"]
subgraph KK["src"]
KL["index.ts"]
subgraph KM["lib"]
KN["useColors.ts"]
KO["color.graphql.ts"]
end
end
end
subgraph KP["currency"]
subgraph KQ["src"]
KR["index.ts"]
subgraph KS["lib"]
KT["useConvertPrice.tsx"]
KU["useExchangeRate.tsx"]
KV["useCurrencies.tsx"]
KW["useCurrencyForLocale.tsx"]
KX["useExchangeRate.spec.tsx"]
end
end
end
subgraph KY["products"]
subgraph KZ["src"]
L0["index.ts"]
subgraph L1["lib"]
L2["productImage.ts"]
L3["products.graphql.ts"]
L4["useProducts.ts"]
L5["productImage.spec.ts"]
end
end
end
subgraph L6["site-languages"]
subgraph L7["src"]
L8["index.ts"]
subgraph L9["lib"]
LA["site-languages.graphql.ts"]
LB["useSiteLanguages.ts"]
LC["site-languages-hook.spec.tsx"]
end
end
LD["vite.config.ts"]
end
subgraph LE["snackbar"]
subgraph LF["src"]
LG["index.ts"]
subgraph LH["lib"]
LI["SnackbarContext.tsx"]
LJ["useSnackbar.ts"]
end
end
end
subgraph LK["translations-management-hook"]
subgraph LL["src"]
LM["index.ts"]
subgraph LN["lib"]
LO["useTranslationsManagement.ts"]
end
end
end
end
subgraph LP["lottie"]
subgraph LQ["empty-cart"]
subgraph LR["src"]
LS["index.ts"]
subgraph LT["lib"]
LU["lottie-empty-cart.tsx"]
LV["lottie-empty-cart.spec.tsx"]
end
end
LW["vite.config.ts"]
end
subgraph LX["loading"]
subgraph LY["src"]
LZ["index.ts"]
subgraph M0["lib"]
M1["lottie-loading.tsx"]
M2["lottie-loading.spec.tsx"]
end
end
end
subgraph M3["success-check"]
subgraph M4["src"]
M5["index.ts"]
subgraph M6["lib"]
M7["lottie-success-check.tsx"]
M8["lottie-success-check.spec.tsx"]
end
end
end
subgraph M9["unauthorized"]
subgraph MA["src"]
MB["index.ts"]
subgraph MC["lib"]
MD["lottie-unauthorized.tsx"]
end
end
end
end
subgraph ME["translations"]
subgraph MF["src"]
MG["index.ts"]
subgraph MH["lib"]
MI["mapApolloErrorToTranslationKey.ts"]
MJ["WrapTranslation.tsx"]
end
end
end
subgraph MK["ui"]
subgraph ML["colors"]
subgraph MM["src"]
MN["index.ts"]
subgraph MO["lib"]
MP["colors.ts"]
end
end
end
subgraph MQ["language-components"]
subgraph MR["src"]
MS["index.ts"]
subgraph MT["lib"]
MU["language-components.tsx"]
MV["ltr-text-field.tsx"]
end
end
end
subgraph MW["sizes"]
subgraph MX["src"]
MY["index.ts"]
subgraph MZ["lib"]
N0["sizes.ts"]
N1["sizes.spec.tsx"]
N2["sizes.tsx"]
end
end
end
end
subgraph N3["zustand"]
subgraph N4["shared-auth-store"]
subgraph N5["src"]
N6["index.ts"]
subgraph N7["lib"]
N8["shared-auth-store.ts"]
end
end
end
subgraph N9["shared-notification-store"]
subgraph NA["src"]
NB["index.ts"]
subgraph NC["lib"]
ND["shared-notification-store.tsx"]
end
end
end
subgraph NE["shared-ui-store"]
subgraph NF["src"]
NG["index.ts"]
subgraph NH["lib"]
NI["shared-ui-store.ts"]
NJ["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NK["server"]
subgraph NL["controllers"]
subgraph NM["src"]
NN["index.ts"]
subgraph NO["lib"]
NP["auth.controller.ts"]
NQ["order.controller.ts"]
end
end
end
subgraph NR["decorators"]
NS["jest.config.ts"]
subgraph NT["src"]
NU["index.ts"]
subgraph NV["lib"]
NW["current-user.decorator.ts"]
NX["decorators.ts"]
NY["decorators.spec.ts"]
end
end
end
subgraph NZ["entities"]
subgraph O0["src"]
O1["index.ts"]
subgraph O2["lib"]
O3["brand.entity.ts"]
O4["product.entity.ts"]
O5["category.entity.ts"]
O6["product-description.entity.ts"]
O7["site-language.entity.ts"]
O8["product-info.entity.ts"]
O9["color.entity.ts"]
OA["product-info-color.entity.ts"]
OB["seller-info.entity.ts"]
OC["seller-product.entity.ts"]
OD["user.entity.ts"]
OE["cart.entity.ts"]
OF["currency-preference.entity.ts"]
OG["currency.entity.ts"]
OH["customer.entity.ts"]
OI["exchange-rate.entity.ts"]
OJ["order.entity.ts"]
OK["platform-settings.entity.ts"]
OL["refresh-token.entity.ts"]
OM["seller-order.entity.ts"]
ON["translation.entity.ts"]
end
end
end
subgraph OO["guards"]
OP["jest.config.ts"]
subgraph OQ["src"]
OR["index.ts"]
subgraph OS["lib"]
OT["catalog.guard.ts"]
OU["graphql-auth.guard.ts"]
OV["http-auth.guard.ts"]
OW["roles.guard.ts"]
OX["catalog.guard.spec.ts"]
OY["roles.guard.spec.ts"]
end
end
end
subgraph OZ["inputs"]
subgraph P0["src"]
P1["index.ts"]
subgraph P2["lib"]
P3["brand.input.ts"]
P4["cart.inputs.ts"]
P5["category.input.ts"]
P6["color.input.ts"]
P7["customer-auth.inputs.ts"]
P8["order-pagination.inputs.ts"]
P9["order.inputs.ts"]
PA["product-info-filter.input.ts"]
PB["product.input.ts"]
PC["seller-order-pagination.inputs.ts"]
PD["seller.input.ts"]
PE["site-language.input.ts"]
PF["user.input.ts"]
end
end
end
subgraph PG["modules"]
subgraph PH["src"]
PI["index.ts"]
subgraph PJ["lib"]
PK["auth.module.ts"]
PL["email.module.ts"]
PM["token.module.ts"]
PN["user.module.ts"]
PO["customer-profile.module.ts"]
PP["brand.module.ts"]
PQ["catalog-guard.module.ts"]
PR["translation.module.ts"]
PS["cart.module.ts"]
PT["platform-settings.module.ts"]
PU["category.module.ts"]
PV["product.module.ts"]
PW["color.module.ts"]
PX["currency.module.ts"]
PY["graphql-context.module.ts"]
PZ["order.module.ts"]
Q0["seller-info.module.ts"]
Q1["payment.module.ts"]
Q2["product-info.module.ts"]
Q3["seller-products.module.ts"]
Q4["site-language.module.ts"]
end
end
end
subgraph Q5["resolvers"]
Q6["jest.config.ts"]
subgraph Q7["src"]
Q8["index.ts"]
subgraph Q9["lib"]
QA["auth.resolver.ts"]
QB["zod-validation.pipe.ts"]
QC["brand.resolver.ts"]
QD["cart.resolver.ts"]
QE["category.resolver.ts"]
QF["color.resolver.ts"]
QG["currency.resolver.ts"]
QH["customer-profile.resolver.ts"]
QI["order.resolver.ts"]
QJ["payment.resolver.ts"]
QK["product-info.resolver.ts"]
QL["product.resolver.ts"]
QM["seller-info.resolver.ts"]
QN["shipping.resolver.ts"]
QO["site-language.resolver.ts"]
QP["translation.input.ts"]
QQ["translation.resolver.ts"]
QR["user.resolver.ts"]
QS["auth-validation.spec.ts"]
QT["auth.resolver.spec.ts"]
QU["cart-validation.spec.ts"]
QV["currency-translation-validation.spec.ts"]
QW["customer-profile-validation.spec.ts"]
QX["order-validation.spec.ts"]
QY["order.resolver.spec.ts"]
QZ["order.resolver.status-transitions.spec.ts"]
R0["order.resolver.tracking.spec.ts"]
R1["payment.resolver.integration.spec.ts"]
R2["payment.resolver.spec.ts"]
R3["product-info.resolver.spec.ts"]
R4["product-validation.spec.ts"]
R5["query-args-validation.spec.ts"]
R6["seller-info-validation.spec.ts"]
R7["taxonomy-validation.spec.ts"]
R8["translation.resolver.guards.spec.ts"]
subgraph R9["types"]
RA["graphql-upload.d.ts"]
end
RB["user.resolver.spec.ts"]
RC["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RD["services"]
RE["jest.config.ts"]
subgraph RF["src"]
RG["index.ts"]
subgraph RH["lib"]
RI["auth.service.ts"]
RJ["brand.service.ts"]
RK["cart.service.ts"]
RL["product-info-colors.util.ts"]
RM["category.service.ts"]
RN["color.service.ts"]
RO["currency.service.ts"]
RP["customer-profile.service.ts"]
RQ["email.service.ts"]
RR["image-upload.service.ts"]
RS["order.service.ts"]
RT["payment-logger.service.ts"]
RU["payment.service.ts"]
RV["product.service.ts"]
RW["seller-info.service.ts"]
RX["shipping-calculation.service.ts"]
RY["site-language.service.ts"]
RZ["token.service.ts"]
S0["translation.service.ts"]
S1["user.service.ts"]
S2["auth.service.password-policy.spec.ts"]
S3["auth.service.spec.ts"]
S4["cart.service.add-quantity.spec.ts"]
S5["cart.service.null-relations.spec.ts"]
S6["cart.service.spec.ts"]
S7["order.service.spec.ts"]
S8["order.service.tracking.spec.ts"]
S9["product-info-colors.util.spec.ts"]
SA["product.service.multi-filters.spec.ts"]
SB["product.service.only-discounted.spec.ts"]
SC["product.service.pants.spec.ts"]
SD["product.service.spec.ts"]
SE["relay-connection.spec.ts"]
SF["seller-info.service.price-validation.spec.ts"]
SG["shipping-calculation.service.spec.ts"]
SH["token.service.spec.ts"]
end
end
end
subgraph SI["strategies"]
subgraph SJ["src"]
SK["index.ts"]
subgraph SL["lib"]
SM["local.strategy.ts"]
end
end
end
subgraph SN["utils"]
subgraph SO["src"]
SP["index.ts"]
subgraph SQ["lib"]
SR["email-templates.ts"]
SS["relay-connection.ts"]
ST["pagination.ts"]
end
end
end
end
subgraph SU["shared"]
subgraph SV["codegen"]
SW["jest.config.ts"]
subgraph SX["src"]
SY["index.ts"]
subgraph SZ["lib"]
subgraph T0["generated"]
T1["graphql.ts"]
end
end
end
end
subgraph T2["graphql-schema"]
T3["jest.config.ts"]
subgraph T4["src"]
T5["index.ts"]
end
end
subgraph T6["product-sizes"]
subgraph T7["src"]
T8["index.ts"]
subgraph T9["lib"]
TA["product-sizes.ts"]
TB["product-sizes.pants-formats.spec.ts"]
TC["product-sizes.pants-label.spec.ts"]
TD["product-sizes.pants-strict.spec.ts"]
TE["product-sizes.spec.ts"]
end
end
end
subgraph TF["shared-i18n"]
subgraph TG["src"]
TH["index.ts"]
subgraph TI["lib"]
TJ["language-context.tsx"]
TK["language-detector.ts"]
subgraph TL["locales"]
TM["i18n-react.tsx"]
TN["i18n-util.ts"]
TO["i18n-util.async.ts"]
subgraph TP["en"]
TQ["index.ts"]
end
subgraph TS["fa"]
TT["index.ts"]
end
TU["formatters.ts"]
TV["i18n-types.ts"]
TW["i18n-util.sync.ts"]
TX["navigator-detector.ts"]
end
TR["site-name.ts"]
TY["table-localization.ts"]
TZ["theme-provider.tsx"]
U0["use-page-title.ts"]
end
end
end
subgraph U1["validation"]
subgraph U2["src"]
U3["index.ts"]
subgraph U4["lib"]
U5["auth.ts"]
U6["limits.ts"]
U7["primitives.ts"]
U8["auth-forms.ts"]
U9["cart.ts"]
UA["catalog.ts"]
UB["contact.ts"]
UC["currency.ts"]
UD["taxonomy.ts"]
UE["errors.ts"]
UF["order.ts"]
UG["profile.ts"]
UH["query.ts"]
UI["seller.ts"]
UJ["auth-forms.admin.spec.ts"]
UK["auth-forms.login.spec.ts"]
UL["auth-forms.recovery.spec.ts"]
UM["auth-forms.seller.spec.ts"]
UN["auth-forms.spec.ts"]
UO["auth.spec.ts"]
UP["cart.spec.ts"]
UQ["catalog.spec.ts"]
UR["contact.spec.ts"]
US["currency.spec.ts"]
UT["errors.spec.ts"]
UU["order.spec.ts"]
UV["primitives.spec.ts"]
UW["profile.spec.ts"]
UX["query.spec.ts"]
UY["seller.spec.ts"]
UZ["taxonomy.spec.ts"]
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
1T-->1V
1W-->1V
1X-->1V
20-->22
26-->28
26-->29
29-->28
2A-->29
2E-->2G
2H-->2G
2K-->2M
2M-->2N
2O-->2M
2R-->2T
2U-->2T
2X-->2Y
2Y-->30
31-->30
35-->36
36-->38
39-->38
3A-->38
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
GY-->GU
H2-->H4
H5-->H4
H8-->HA
HE-->HG
HM-->HO
HM-->HP
HQ-->HP
HT-->HV
HW-->HV
I0-->I2
I3-->I2
I6-->I8
IB-->ID
IB-->IE
IB-->IF
ID-->IE
IG-->ID
IK-->IM
IN-->IM
IQ-->IS
IV-->IX
IY-->IX
J1-->J3
J3-->J4
J7-->J9
J9-->JA
J9-->JB
J9-->JC
J9-->JD
JB-->JA
JB-->JC
JE-->JF
JI-->JK
JN-->JP
JQ-->JP
JT-->JV
JY-->K0
JY-->K1
JY-->K2
JY-->K3
K8-->KA
K8-->KB
KB-->KA
KF-->KH
KH-->KI
KL-->KN
KN-->KO
KR-->KT
KR-->KV
KR-->KW
KR-->KU
KT-->KU
KX-->KU
L0-->L2
L0-->L3
L0-->L4
L4-->L3
L5-->L2
L8-->LA
L8-->LB
LB-->LA
LC-->LB
LG-->LI
LG-->LJ
LJ-->LI
LM-->LO
LS-->LU
LV-->LU
LZ-->M1
M2-->M1
M5-->M7
M8-->M7
MB-->MD
MG-->MI
MN-->MP
MS-->MU
MS-->MV
MY-->N0
N1-->N2
N6-->N8
NB-->ND
NG-->NI
NN-->NP
NN-->NQ
NU-->NW
NU-->NX
NY-->NX
O1-->O3
O1-->OE
O1-->O5
O1-->O9
O1-->OF
O1-->OG
O1-->OH
O1-->OI
O1-->OJ
O1-->OK
O1-->O6
O1-->OA
O1-->O8
O1-->O4
O1-->OL
O1-->OB
O1-->OM
O1-->OC
O1-->O7
O1-->ON
O1-->OD
O3-->O4
O4-->O3
O4-->O5
O4-->O6
O4-->O8
O4-->OB
O4-->OC
O5-->O4
O6-->O4
O6-->O7
O7-->O6
O8-->O9
O8-->OA
O8-->O4
OA-->O9
OA-->O8
OB-->OC
OB-->OD
OC-->O8
OC-->O4
OC-->OB
OE-->O4
OE-->OD
OF-->OG
OH-->OD
OI-->OG
OI-->OD
OJ-->O4
OJ-->OB
OL-->OD
OM-->OJ
OR-->OT
OR-->OU
OR-->OV
OR-->OW
OX-->OT
OY-->OW
P1-->P3
P1-->P4
P1-->P5
P1-->P6
P1-->P7
P1-->P8
P1-->P9
P1-->PA
P1-->PB
P1-->PC
P1-->PD
P1-->PE
P1-->PF
PB-->PA
PI-->PK
PI-->PP
PI-->PS
PI-->PQ
PI-->PU
PI-->PW
PI-->PX
PI-->PO
PI-->PL
PI-->PY
PI-->PZ
PI-->Q1
PI-->PT
PI-->Q2
PI-->PV
PI-->Q0
PI-->Q3
PI-->Q4
PI-->PM
PI-->PR
PI-->PN
PK-->PL
PK-->PM
PK-->PN
PN-->PK
PN-->PO
PP-->PQ
PP-->PR
PS-->PT
PU-->PQ
PU-->PV
PU-->PR
PV-->PQ
PV-->PM
PV-->PR
PW-->PQ
PW-->PR
PY-->PL
PY-->PM
PY-->PN
PZ-->PT
PZ-->Q0
Q0-->PV
Q0-->PM
Q0-->PN
Q1-->PX
Q1-->PZ
Q2-->PV
Q2-->PR
Q3-->Q0
Q3-->PN
Q8-->QA
Q8-->QC
Q8-->QD
Q8-->QE
Q8-->QF
Q8-->QG
Q8-->QH
Q8-->QI
Q8-->QJ
Q8-->QK
Q8-->QL
Q8-->QM
Q8-->QN
Q8-->QO
Q8-->QP
Q8-->QQ
Q8-->QR
Q8-->QB
QA-->QB
QC-->QB
QD-->QB
QE-->QB
QF-->QB
QG-->QB
QH-->QB
QI-->QB
QL-->QB
QM-->QB
QO-->QB
QQ-->QB
QR-->QB
QS-->QA
QS-->QR
QS-->QB
QT-->QA
QU-->QD
QU-->QB
QV-->QG
QV-->QQ
QV-->QB
QW-->QH
QW-->QB
QX-->QI
QX-->QB
QY-->QI
QZ-->QI
R0-->QI
R1-->QJ
R2-->QJ
R3-->QK
R4-->QL
R4-->QB
R5-->QI
R5-->QL
R5-->QM
R5-->QB
R6-->QM
R6-->QB
R7-->QC
R7-->QE
R7-->QF
R7-->QO
R7-->QB
R8-->QQ
RB-->QR
RC-->QB
RG-->RI
RG-->RJ
RG-->RK
RG-->RM
RG-->RN
RG-->RO
RG-->RP
RG-->RQ
RG-->RR
RG-->RS
RG-->RT
RG-->RU
RG-->RL
RG-->RV
RG-->RW
RG-->RX
RG-->RY
RG-->RZ
RG-->S0
RG-->S1
RK-->RL
RV-->RL
RW-->RL
S2-->RI
S2-->RQ
S2-->RZ
S2-->S1
S3-->RI
S3-->RQ
S3-->RZ
S3-->S1
S4-->RK
S5-->RK
S6-->RK
S7-->RS
S8-->RS
S9-->RL
SA-->RV
SA-->S0
SB-->RV
SB-->S0
SC-->RV
SC-->S0
SD-->RV
SD-->S0
SF-->RI
SF-->RW
SG-->RX
SH-->RZ
SK-->SM
SP-->SR
SP-->SS
SY-->T1
T8-->TA
TB-->TA
TC-->TA
TD-->TA
TE-->TA
TH-->TJ
TH-->TK
TH-->TM
TH-->TV
TH-->TN
TH-->TO
TH-->TW
TH-->TX
TH-->TR
TH-->TY
TH-->TZ
TH-->U0
TJ-->TK
TJ-->TM
TJ-->TO
TM-->TN
TO-->TQ
TO-->TT
TO-->TU
TO-->TN
TQ-->TR
TT-->TR
TW-->TQ
TW-->TT
TW-->TU
TW-->TN
TY-->TM
TZ-->TJ
U0-->TM
U3-->U5
U3-->U8
U3-->U9
U3-->UA
U3-->UB
U3-->UC
U3-->UE
U3-->U6
U3-->UF
U3-->U7
U3-->UG
U3-->UH
U3-->UI
U3-->UD
U5-->U6
U5-->U7
U7-->U6
U8-->U5
U9-->U7
UC-->UD
UF-->U5
UF-->U9
UF-->U7
UG-->UF
UH-->U7
UJ-->U8
UK-->U8
UL-->U8
UM-->U8
UN-->U8
UO-->U5
UP-->U9
UQ-->UA
UR-->UB
US-->UC
UT-->UE
UU-->UF
UV-->U6
UV-->U7
UW-->UG
UX-->UH
UY-->UI
UZ-->UD
