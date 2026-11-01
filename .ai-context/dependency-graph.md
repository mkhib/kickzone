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
85["customer-contact.validation.spec.tsx"]
end
end
86["vite.config.ts"]
end
subgraph 87["customer-checkout"]
subgraph 88["src"]
89["index.ts"]
subgraph 8A["lib"]
8B["customer-checkout.tsx"]
end
end
end
subgraph 8C["customer-favorites"]
subgraph 8D["src"]
8E["index.ts"]
subgraph 8F["lib"]
8G["customer-favorites.tsx"]
8H["customer-favorites.shared-card.spec.tsx"]
8I["customer-favorites.spec.tsx"]
end
end
8J["vite.config.ts"]
end
subgraph 8K["customer-login"]
subgraph 8L["src"]
8M["index.ts"]
subgraph 8N["lib"]
8O["customer-login.tsx"]
end
end
end
subgraph 8P["customer-order-confirmation"]
subgraph 8Q["src"]
8R["index.ts"]
subgraph 8S["lib"]
8T["customer-order-confirmation.tsx"]
8U["customer-order-confirmation.pants-size.spec.tsx"]
8V["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8W["customer-orders"]
subgraph 8X["src"]
8Y["index.ts"]
subgraph 8Z["lib"]
90["customer-orders.tsx"]
end
end
end
subgraph 91["customer-payment"]
subgraph 92["src"]
93["index.ts"]
subgraph 94["lib"]
95["customer-payment-callback.tsx"]
96["use-zarinpal-payment.tsx"]
97["zarinpal-payment-service.ts"]
98["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 99["customer-products"]
subgraph 9A["src"]
9B["index.ts"]
subgraph 9C["lib"]
9D["customer-products.tsx"]
end
end
end
subgraph 9E["customer-profile"]
subgraph 9F["src"]
9G["index.ts"]
subgraph 9H["lib"]
9I["customer-profile.tsx"]
9J["customer-profile.spec.tsx"]
9K["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9L["customer-shopping-cart"]
subgraph 9M["src"]
9N["index.ts"]
subgraph 9O["lib"]
9P["customer-shopping-cart.tsx"]
9Q["customer-shopping-cart.pants-size.spec.tsx"]
9R["customer-shopping-cart.shipping-form.spec.tsx"]
9S["customer-shopping-cart.spec.tsx"]
end
end
9T["vite.config.ts"]
end
subgraph 9U["customer-signup"]
subgraph 9V["src"]
9W["index.ts"]
subgraph 9X["lib"]
9Y["customer-signup.tsx"]
9Z["customer-signup.password-length.spec.tsx"]
A0["customer-signup.spec.tsx"]
A1["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A2["forgot-password"]
subgraph A3["src"]
A4["index.ts"]
subgraph A5["lib"]
A6["customer-forgot-password.tsx"]
A7["customer-forgot-password.spec.tsx"]
A8["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A9["guide-authenticity"]
subgraph AA["src"]
AB["index.ts"]
subgraph AC["lib"]
AD["customer-guide-authenticity.tsx"]
AE["customer-guide-authenticity.spec.tsx"]
end
end
AF["vite.config.ts"]
end
subgraph AG["guide-payment"]
subgraph AH["src"]
AI["index.ts"]
subgraph AJ["lib"]
AK["customer-guide-payment.tsx"]
AL["customer-guide-payment.spec.tsx"]
end
end
AM["vite.config.ts"]
end
subgraph AN["home"]
subgraph AO["src"]
AP["index.ts"]
subgraph AQ["lib"]
AR["CustomersHomeScreen.tsx"]
subgraph AS["components"]
AT["CategoryBentoSection.tsx"]
AV["HeroSection.tsx"]
AW["HomeLoadingScreen.tsx"]
AX["PicksRailSection.tsx"]
AY["TrustStripSection.tsx"]
B3["NewArrivalsSection.tsx"]
B6["BrandBlocksSection.tsx"]
B7["NewsletterSection.tsx"]
B8["ShopTheLookSection.tsx"]
B9["TickerSection.tsx"]
end
AU["home-selectors.ts"]
AZ["useScrollProgress.ts"]
B0["CustomersShopScreen.tsx"]
B1["CustomersHomeScreen.cart-size.spec.tsx"]
B2["CustomersHomeScreen.spec.tsx"]
B4["CustomersShopScreen.cart-size.spec.tsx"]
B5["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BA["login"]
subgraph BB["src"]
BC["index.ts"]
subgraph BD["lib"]
BE["CustomersLoginScreen.tsx"]
BF["CustomersLoginScreen.spec.tsx"]
BG["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BH["not-found"]
subgraph BI["src"]
BJ["index.ts"]
subgraph BK["lib"]
BL["customer-not-found.tsx"]
BM["customer-not-found.spec.tsx"]
end
end
BN["vite.config.ts"]
end
subgraph BO["privacy-policy"]
subgraph BP["src"]
BQ["index.ts"]
subgraph BR["lib"]
BS["customer-privacy-policy.tsx"]
BT["customer-privacy-policy.spec.tsx"]
end
end
BU["vite.config.ts"]
end
subgraph BV["product-details"]
subgraph BW["src"]
BX["index.ts"]
subgraph BY["lib"]
BZ["customer-product-details.tsx"]
C0["reviews-flag.ts"]
C1["customer-product-details.guarantee.spec.tsx"]
C2["customer-product-details.no-low-stock.spec.tsx"]
C3["customer-product-details.pants-size.spec.tsx"]
C4["customer-product-details.reviews-hidden.spec.tsx"]
C5["customer-product-details.spec.tsx"]
end
end
C6["vite.config.ts"]
end
subgraph C7["reset-password"]
subgraph C8["src"]
C9["index.ts"]
subgraph CA["lib"]
CB["customer-reset-password.tsx"]
CC["customer-reset-password.password-length.spec.tsx"]
CD["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CE["shipping-returns"]
subgraph CF["src"]
CG["index.ts"]
subgraph CH["lib"]
CI["customer-shipping-returns.tsx"]
CJ["customer-shipping-returns.spec.tsx"]
end
end
CK["vite.config.ts"]
end
subgraph CL["unauthorized"]
subgraph CM["src"]
CN["index.ts"]
subgraph CO["lib"]
CP["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CQ["utility"]
subgraph CR["test"]
subgraph CS["src"]
CT["index.ts"]
subgraph CU["lib"]
CV["customers-test-utility.tsx"]
end
end
end
end
subgraph CW["validations"]
subgraph CX["src"]
CY["index.ts"]
subgraph CZ["lib"]
D0["shipping-validation.ts"]
D1["barrel.spec.ts"]
D2["shipping-validation.shared.spec.ts"]
end
end
end
subgraph D3["zustand"]
subgraph D4["customer-cart-store"]
subgraph D5["src"]
D6["index.ts"]
subgraph D7["lib"]
D8["customer-cart-store.ts"]
D9["barrel.spec.ts"]
DA["customer-cart-store.spec.ts"]
end
end
end
subgraph DB["customer-checkout-store"]
subgraph DC["src"]
DD["index.ts"]
subgraph DE["lib"]
DF["customer-checkout-store.ts"]
DG["customer-checkout-store.spec.ts"]
end
end
DH["vite.config.ts"]
end
subgraph DI["customer-wishlist-store"]
subgraph DJ["src"]
DK["index.ts"]
subgraph DL["lib"]
DM["customer-wishlist-store.ts"]
DN["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DO["src"]
DP["index.ts"]
subgraph DQ["lib"]
DR["customers-products-store.tsx"]
end
end
end
end
subgraph DS["sellers"]
subgraph DT["components"]
subgraph DU["footer"]
subgraph DV["src"]
DW["index.ts"]
subgraph DX["lib"]
DY["sellers-footer.tsx"]
DZ["sellers-footer.spec.tsx"]
end
end
end
subgraph E0["headerbar"]
subgraph E1["src"]
E2["index.ts"]
subgraph E3["lib"]
E4["SellersHeaderbar.tsx"]
end
end
end
subgraph E5["layout"]
subgraph E6["src"]
E7["index.ts"]
subgraph E8["lib"]
E9["SellersLayout.tsx"]
EA["SellersTabbar.tsx"]
end
end
end
end
subgraph EB["contexts"]
subgraph EC["auth"]
subgraph ED["src"]
EE["index.ts"]
subgraph EF["lib"]
EG["SellersAuthContext.tsx"]
EH["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EI["graphql"]
subgraph EJ["src"]
EK["index.ts"]
subgraph EL["lib"]
EM["fragments.ts"]
EN["mutations.ts"]
EO["Provider.tsx"]
EP["SellersApolloProvider.tsx"]
EQ["client.ts"]
ER["queries.ts"]
ES["seller-orders.graphql.ts"]
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
G9["SellersManageProductScreen.zod-validation.spec.tsx"]
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
GR["seller-orders-screen.status-schema.spec.ts"]
GS["seller-status-transitions.spec.ts"]
end
GT["test-setup.ts"]
end
end
subgraph GU["setup-password"]
subgraph GV["src"]
GW["index.ts"]
subgraph GX["lib"]
GY["SellersSetupPassword.tsx"]
GZ["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H0["unauthorized"]
subgraph H1["src"]
H2["index.ts"]
subgraph H3["lib"]
H4["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H5["zustand"]
subgraph H6["sellers-products-store"]
subgraph H7["src"]
H8["index.ts"]
subgraph H9["lib"]
HA["useSellersProductsStore.ts"]
HB["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HC["shared"]
subgraph HD["components"]
subgraph HE["apollo-provider-base"]
subgraph HF["src"]
HG["index.ts"]
subgraph HH["lib"]
HI["ApolloProviderBase.tsx"]
HJ["createSilentRefreshAuthLink.ts"]
HK["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HL["error-boundary"]
subgraph HM["src"]
HN["index.ts"]
subgraph HO["lib"]
HP["error-boundary.tsx"]
HQ["error-boundary.spec.tsx"]
end
end
HR["vite.config.ts"]
end
subgraph HS["glassmorphism-container"]
subgraph HT["src"]
HU["index.ts"]
subgraph HV["lib"]
HW["glassmorphism-container.tsx"]
HX["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HY["layout"]
subgraph HZ["src"]
I0["index.ts"]
subgraph I1["lib"]
I2["Layout.tsx"]
end
end
end
subgraph I3["material-data-table"]
subgraph I4["src"]
I5["index.ts"]
subgraph I6["lib"]
I7["material-data-table.tsx"]
I8["table-config.ts"]
I9["table-utils.ts"]
IA["material-data-table.spec.tsx"]
IB["table-types.ts"]
end
end
end
subgraph IC["order-status-chip"]
subgraph ID["src"]
IE["index.ts"]
subgraph IF["lib"]
IG["order-status-chip.tsx"]
IH["order-status-chip.spec.tsx"]
end
end
end
subgraph II["password-field"]
subgraph IJ["src"]
IK["index.ts"]
subgraph IL["lib"]
IM["PasswordTextField.tsx"]
end
end
end
subgraph IN["price-display"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["price-display.tsx"]
IS["price-display.spec.tsx"]
end
end
end
subgraph IT["private-route"]
subgraph IU["src"]
IV["index.ts"]
subgraph IW["lib"]
IX["createPrivateRoute.tsx"]
IY["PrivateRoute.tsx"]
end
end
end
subgraph IZ["rtl-table-utils"]
subgraph J0["src"]
J1["index.ts"]
subgraph J2["lib"]
J3["rtl-table-utils.ts"]
J4["rtl-cell-components.tsx"]
J5["rtl-column-helpers.ts"]
J6["rtl-table-props.ts"]
J7["use-table-alignment.ts"]
J8["barrel.spec.ts"]
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
MU["barrel.spec.ts"]
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
NB["barrel.spec.ts"]
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
NO["authenticated-user.type.ts"]
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
QO["currency-translation-validation.spec.ts"]
QP["customer-profile-validation.spec.ts"]
QQ["order-validation.spec.ts"]
QR["order.resolver.spec.ts"]
QS["order.resolver.status-transitions.spec.ts"]
QT["order.resolver.tracking.spec.ts"]
QU["payment.resolver.integration.spec.ts"]
QV["payment.resolver.spec.ts"]
QW["product-info.resolver.spec.ts"]
QX["product-validation.spec.ts"]
QY["query-args-validation.spec.ts"]
QZ["seller-info-validation.spec.ts"]
R0["taxonomy-validation.spec.ts"]
R1["translation.resolver.guards.spec.ts"]
subgraph R2["types"]
R3["graphql-upload.d.ts"]
end
R4["user.resolver.spec.ts"]
R5["zod-validation.pipe.spec.ts"]
end
end
end
subgraph R6["services"]
R7["jest.config.ts"]
subgraph R8["src"]
R9["index.ts"]
subgraph RA["lib"]
RB["auth.service.ts"]
RC["brand.service.ts"]
RD["cart.service.ts"]
RE["product-info-colors.util.ts"]
RF["category.service.ts"]
RG["color.service.ts"]
RH["currency.service.ts"]
RI["customer-profile.service.ts"]
RJ["email.service.ts"]
RK["image-upload.service.ts"]
RL["order.service.ts"]
RM["payment-logger.service.ts"]
RN["payment.service.ts"]
RO["product.service.ts"]
RP["seller-info.service.ts"]
RQ["shipping-calculation.service.ts"]
RR["site-language.service.ts"]
RS["token.service.ts"]
RT["translation.service.ts"]
RU["user.service.ts"]
RV["auth.service.password-policy.spec.ts"]
RW["auth.service.spec.ts"]
RX["cart.service.add-quantity.spec.ts"]
RY["cart.service.null-relations.spec.ts"]
RZ["cart.service.spec.ts"]
S0["order.service.spec.ts"]
S1["order.service.tracking.spec.ts"]
S2["product-info-colors.util.spec.ts"]
S3["product.service.multi-filters.spec.ts"]
S4["product.service.only-discounted.spec.ts"]
S5["product.service.pants.spec.ts"]
S6["product.service.spec.ts"]
S7["relay-connection.spec.ts"]
S8["seller-info.service.price-validation.spec.ts"]
S9["shipping-calculation.service.spec.ts"]
SA["token.service.spec.ts"]
end
end
end
subgraph SB["strategies"]
subgraph SC["src"]
SD["index.ts"]
subgraph SE["lib"]
SF["local.strategy.ts"]
end
end
end
subgraph SG["utils"]
subgraph SH["src"]
SI["index.ts"]
subgraph SJ["lib"]
SK["email-templates.ts"]
SL["relay-connection.ts"]
SM["pagination.ts"]
end
end
end
end
subgraph SN["shared"]
subgraph SO["codegen"]
SP["jest.config.ts"]
subgraph SQ["src"]
SR["index.ts"]
subgraph SS["lib"]
subgraph ST["generated"]
SU["graphql.ts"]
end
end
end
end
subgraph SV["graphql-schema"]
SW["jest.config.ts"]
subgraph SX["src"]
SY["index.ts"]
end
end
subgraph SZ["product-sizes"]
subgraph T0["src"]
T1["index.ts"]
subgraph T2["lib"]
T3["product-sizes.ts"]
T4["product-sizes.pants-formats.spec.ts"]
T5["product-sizes.pants-label.spec.ts"]
T6["product-sizes.pants-strict.spec.ts"]
T7["product-sizes.spec.ts"]
end
end
end
subgraph T8["shared-i18n"]
subgraph T9["src"]
TA["index.ts"]
subgraph TB["lib"]
TC["language-context.tsx"]
TD["language-detector.ts"]
subgraph TE["locales"]
TF["i18n-react.tsx"]
TG["i18n-util.ts"]
TH["i18n-util.async.ts"]
subgraph TI["en"]
TJ["index.ts"]
end
subgraph TL["fa"]
TM["index.ts"]
end
TN["formatters.ts"]
TO["i18n-types.ts"]
TP["i18n-util.sync.ts"]
TQ["navigator-detector.ts"]
end
TK["site-name.ts"]
TR["table-localization.ts"]
TS["theme-provider.tsx"]
TT["use-page-title.ts"]
end
end
end
subgraph TU["validation"]
subgraph TV["src"]
TW["index.ts"]
subgraph TX["lib"]
TY["apollo-error.ts"]
TZ["auth.ts"]
U0["limits.ts"]
U1["primitives.ts"]
U2["auth-forms.ts"]
U3["cart.ts"]
U4["catalog.ts"]
U5["contact.ts"]
U6["currency.ts"]
U7["taxonomy.ts"]
U8["errors.ts"]
U9["order.ts"]
UA["profile.ts"]
UB["query.ts"]
UC["seller.ts"]
UD["auth-forms.admin.spec.ts"]
UE["auth-forms.login.spec.ts"]
UF["auth-forms.recovery.spec.ts"]
UG["auth-forms.seller.spec.ts"]
UH["auth-forms.spec.ts"]
UI["auth.spec.ts"]
UJ["cart.spec.ts"]
UK["catalog.spec.ts"]
UL["contact.spec.ts"]
UM["currency.spec.ts"]
UN["errors.spec.ts"]
UO["order.spec.ts"]
UP["primitives.spec.ts"]
UQ["profile.spec.ts"]
UR["query.spec.ts"]
US["seller.spec.ts"]
UT["taxonomy.spec.ts"]
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
85-->83
89-->8B
8E-->8G
8H-->8G
8I-->8G
8M-->8O
8R-->8T
8U-->8T
8V-->8T
8Y-->90
93-->95
93-->96
93-->97
95-->96
96-->97
98-->95
9B-->9D
9G-->9I
9J-->9I
9K-->9I
9N-->9P
9Q-->9P
9R-->9P
9S-->9P
9W-->9Y
9Z-->9Y
A0-->9Y
A1-->9Y
A4-->A6
A7-->A6
A8-->A6
AB-->AD
AE-->AD
AI-->AK
AL-->AK
AP-->AR
AP-->B0
AP-->AU
AP-->AZ
AR-->AT
AR-->AV
AR-->AW
AR-->AX
AR-->AY
AR-->AU
AR-->AZ
AT-->AU
B0-->AU
B1-->AX
B1-->AR
B1-->AU
B2-->B3
B2-->AX
B2-->AR
B2-->B0
B2-->AU
B4-->B0
B5-->B0
B6-->AU
B8-->AU
BC-->BE
BF-->BE
BG-->BE
BJ-->BL
BM-->BL
BQ-->BS
BT-->BS
BX-->BZ
BZ-->C0
C1-->BZ
C2-->BZ
C3-->BZ
C4-->BZ
C5-->BZ
C9-->CB
CC-->CB
CD-->CB
CG-->CI
CJ-->CI
CN-->CP
CT-->CV
CY-->D0
D1-->CY
D2-->D0
D6-->D8
D9-->D6
DA-->D8
DD-->DF
DG-->DF
DK-->DM
DN-->DM
DP-->DR
DW-->DY
DZ-->DY
E2-->E4
E7-->E9
E7-->EA
E9-->EA
EE-->EG
EH-->EG
EK-->EM
EK-->EN
EK-->EO
EK-->ER
EO-->EP
EP-->EQ
ER-->EM
ER-->ES
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
G9-->G4
GC-->GE
GF-->GE
GG-->GE
GL-->GN
GN-->GO
GP-->GN
GQ-->GN
GS-->GO
GW-->GY
GZ-->GY
H2-->H4
H8-->HA
HG-->HI
HG-->HJ
HK-->HJ
HN-->HP
HQ-->HP
HU-->HW
HX-->HW
I0-->I2
I5-->I7
I5-->I8
I5-->I9
I7-->I8
IA-->I7
IE-->IG
IH-->IG
IK-->IM
IP-->IR
IS-->IR
IV-->IX
IX-->IY
J1-->J3
J3-->J4
J3-->J5
J3-->J6
J3-->J7
J5-->J4
J5-->J6
J8-->J1
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
MU-->MR
MY-->N0
N3-->N5
N8-->NA
NB-->N8
NF-->NH
NF-->NI
NM-->NO
NM-->NP
NM-->NQ
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
Q5-->Q4
Q6-->Q4
Q7-->Q4
Q8-->Q4
Q9-->Q4
QA-->Q4
QB-->Q4
QE-->Q4
QF-->Q4
QH-->Q4
QJ-->Q4
QK-->Q4
QL-->Q3
QL-->QK
QL-->Q4
QM-->Q3
QN-->Q6
QN-->Q4
QO-->Q9
QO-->QJ
QO-->Q4
QP-->QA
QP-->Q4
QQ-->QB
QQ-->Q4
QR-->QB
QS-->QB
QT-->QB
QU-->QC
QV-->QC
QW-->QD
QX-->QE
QX-->Q4
QY-->QB
QY-->QE
QY-->QF
QY-->Q4
QZ-->QF
QZ-->Q4
R0-->Q5
R0-->Q7
R0-->Q8
R0-->QH
R0-->Q4
R1-->QJ
R4-->QK
R5-->Q4
R9-->RB
R9-->RC
R9-->RD
R9-->RF
R9-->RG
R9-->RH
R9-->RI
R9-->RJ
R9-->RK
R9-->RL
R9-->RM
R9-->RN
R9-->RE
R9-->RO
R9-->RP
R9-->RQ
R9-->RR
R9-->RS
R9-->RT
R9-->RU
RD-->RE
RO-->RE
RP-->RE
RV-->RB
RV-->RJ
RV-->RS
RV-->RU
RW-->RB
RW-->RJ
RW-->RS
RW-->RU
RX-->RD
RY-->RD
RZ-->RD
S0-->RL
S1-->RL
S2-->RE
S3-->RO
S3-->RT
S4-->RO
S4-->RT
S5-->RO
S5-->RT
S6-->RO
S6-->RT
S8-->RB
S8-->RP
S9-->RQ
SA-->RS
SD-->SF
SI-->SK
SI-->SL
SR-->SU
T1-->T3
T4-->T3
T5-->T3
T6-->T3
T7-->T3
TA-->TC
TA-->TD
TA-->TF
TA-->TO
TA-->TG
TA-->TH
TA-->TP
TA-->TQ
TA-->TK
TA-->TR
TA-->TS
TA-->TT
TC-->TD
TC-->TF
TC-->TH
TF-->TG
TH-->TJ
TH-->TM
TH-->TN
TH-->TG
TJ-->TK
TM-->TK
TP-->TJ
TP-->TM
TP-->TN
TP-->TG
TR-->TF
TS-->TC
TT-->TF
TW-->TY
TW-->TZ
TW-->U2
TW-->U3
TW-->U4
TW-->U5
TW-->U6
TW-->U8
TW-->U0
TW-->U9
TW-->U1
TW-->UA
TW-->UB
TW-->UC
TW-->U7
TZ-->U0
TZ-->U1
U1-->U0
U2-->TZ
U3-->U1
U6-->U7
U9-->TZ
U9-->U3
U9-->U1
UA-->U9
UB-->U1
UD-->U2
UE-->U2
UF-->U2
UG-->U2
UH-->U2
UI-->TZ
UJ-->U3
UK-->U4
UL-->U5
UM-->U6
UN-->U8
UO-->U9
UP-->U0
UP-->U1
UQ-->UA
UR-->UB
US-->UC
UT-->U7
