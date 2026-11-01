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
NW["authenticated-user.type.ts"]
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
U6["apollo-error.ts"]
U7["auth.ts"]
U8["limits.ts"]
U9["primitives.ts"]
UA["auth-forms.ts"]
UB["cart.ts"]
UC["catalog.ts"]
UD["contact.ts"]
UE["currency.ts"]
UF["taxonomy.ts"]
UG["errors.ts"]
UH["order.ts"]
UI["profile.ts"]
UJ["query.ts"]
UK["seller.ts"]
UL["auth-forms.admin.spec.ts"]
UM["auth-forms.login.spec.ts"]
UN["auth-forms.recovery.spec.ts"]
UO["auth-forms.seller.spec.ts"]
UP["auth-forms.spec.ts"]
UQ["auth.spec.ts"]
UR["cart.spec.ts"]
US["catalog.spec.ts"]
UT["contact.spec.ts"]
UU["currency.spec.ts"]
UV["errors.spec.ts"]
UW["order.spec.ts"]
UX["primitives.spec.ts"]
UY["profile.spec.ts"]
UZ["query.spec.ts"]
V0["seller.spec.ts"]
V1["taxonomy.spec.ts"]
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
NU-->NY
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
U4-->U7
U4-->UA
U4-->UB
U4-->UC
U4-->UD
U4-->UE
U4-->UG
U4-->U8
U4-->UH
U4-->U9
U4-->UI
U4-->UJ
U4-->UK
U4-->UF
U7-->U8
U7-->U9
U9-->U8
UA-->U7
UB-->U9
UE-->UF
UH-->U7
UH-->UB
UH-->U9
UI-->UH
UJ-->U9
UL-->UA
UM-->UA
UN-->UA
UO-->UA
UP-->UA
UQ-->U7
UR-->UB
US-->UC
UT-->UD
UU-->UE
UV-->UG
UW-->UH
UX-->U8
UX-->U9
UY-->UI
UZ-->UJ
V0-->UK
V1-->UF
