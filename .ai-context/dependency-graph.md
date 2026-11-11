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
8X["customer-order-confirmation.security.spec.tsx"]
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
9T["build-order-confirmation-data.ts"]
9U["build-order-confirmation-data.spec.ts"]
9V["customer-shopping-cart.pants-size.spec.tsx"]
9W["customer-shopping-cart.shipping-form.spec.tsx"]
9X["customer-shopping-cart.spec.tsx"]
end
end
9Y["vite.config.ts"]
end
subgraph 9Z["customer-signup"]
subgraph A0["src"]
A1["index.ts"]
subgraph A2["lib"]
A3["customer-signup.tsx"]
A4["customer-signup.password-length.spec.tsx"]
A5["customer-signup.spec.tsx"]
A6["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A7["forgot-password"]
subgraph A8["src"]
A9["index.ts"]
subgraph AA["lib"]
AB["customer-forgot-password.tsx"]
AC["customer-forgot-password.spec.tsx"]
AD["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph AE["guide-authenticity"]
subgraph AF["src"]
AG["index.ts"]
subgraph AH["lib"]
AI["customer-guide-authenticity.tsx"]
AJ["customer-guide-authenticity.spec.tsx"]
end
end
AK["vite.config.ts"]
end
subgraph AL["guide-payment"]
subgraph AM["src"]
AN["index.ts"]
subgraph AO["lib"]
AP["customer-guide-payment.tsx"]
AQ["customer-guide-payment.spec.tsx"]
end
end
AR["vite.config.ts"]
end
subgraph AS["home"]
subgraph AT["src"]
AU["index.ts"]
subgraph AV["lib"]
AW["CustomersHomeScreen.tsx"]
subgraph AX["components"]
AY["CategoryBentoSection.tsx"]
B0["HeroSection.tsx"]
B1["HomeLoadingScreen.tsx"]
B2["PicksRailSection.tsx"]
B3["TrustStripSection.tsx"]
B8["NewArrivalsSection.tsx"]
BB["BrandBlocksSection.tsx"]
BC["NewsletterSection.tsx"]
BD["ShopTheLookSection.tsx"]
BE["TickerSection.tsx"]
end
AZ["home-selectors.ts"]
B4["useScrollProgress.ts"]
B5["CustomersShopScreen.tsx"]
B6["CustomersHomeScreen.cart-size.spec.tsx"]
B7["CustomersHomeScreen.spec.tsx"]
B9["CustomersShopScreen.cart-size.spec.tsx"]
BA["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BF["login"]
subgraph BG["src"]
BH["index.ts"]
subgraph BI["lib"]
BJ["CustomersLoginScreen.tsx"]
BK["CustomersLoginScreen.spec.tsx"]
BL["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BM["not-found"]
subgraph BN["src"]
BO["index.ts"]
subgraph BP["lib"]
BQ["customer-not-found.tsx"]
BR["customer-not-found.spec.tsx"]
end
end
BS["vite.config.ts"]
end
subgraph BT["privacy-policy"]
subgraph BU["src"]
BV["index.ts"]
subgraph BW["lib"]
BX["customer-privacy-policy.tsx"]
BY["customer-privacy-policy.spec.tsx"]
end
end
BZ["vite.config.ts"]
end
subgraph C0["product-details"]
subgraph C1["src"]
C2["index.ts"]
subgraph C3["lib"]
C4["customer-product-details.tsx"]
C5["reviews-flag.ts"]
C6["customer-product-details.guarantee.spec.tsx"]
C7["customer-product-details.no-low-stock.spec.tsx"]
C8["customer-product-details.pants-size.spec.tsx"]
C9["customer-product-details.reviews-hidden.spec.tsx"]
CA["customer-product-details.spec.tsx"]
end
end
CB["vite.config.ts"]
end
subgraph CC["reset-password"]
subgraph CD["src"]
CE["index.ts"]
subgraph CF["lib"]
CG["customer-reset-password.tsx"]
CH["customer-reset-password.password-length.spec.tsx"]
CI["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CJ["shipping-returns"]
subgraph CK["src"]
CL["index.ts"]
subgraph CM["lib"]
CN["customer-shipping-returns.tsx"]
CO["customer-shipping-returns.spec.tsx"]
end
end
CP["vite.config.ts"]
end
subgraph CQ["unauthorized"]
subgraph CR["src"]
CS["index.ts"]
subgraph CT["lib"]
CU["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CV["utility"]
subgraph CW["test"]
subgraph CX["src"]
CY["index.ts"]
subgraph CZ["lib"]
D0["customers-test-utility.tsx"]
end
end
end
end
subgraph D1["validations"]
subgraph D2["src"]
D3["index.ts"]
subgraph D4["lib"]
D5["shipping-validation.ts"]
D6["barrel.spec.ts"]
D7["shipping-validation.shared.spec.ts"]
end
end
end
subgraph D8["zustand"]
subgraph D9["customer-cart-store"]
subgraph DA["src"]
DB["index.ts"]
subgraph DC["lib"]
DD["customer-cart-store.ts"]
DE["barrel.spec.ts"]
DF["customer-cart-store.spec.ts"]
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
end
end
subgraph EZ["hooks"]
subgraph F0["auth"]
subgraph F1["src"]
F2["index.ts"]
subgraph F3["lib"]
F4["useSellerAuth.ts"]
F5["sellerAuth.graphql.ts"]
end
end
end
subgraph F6["orders"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["useSellerOrders.ts"]
FB["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FC["products"]
subgraph FD["src"]
FE["index.ts"]
subgraph FF["lib"]
FG["useSellersProductManagement.ts"]
FH["useSellersProducts.ts"]
end
end
end
end
subgraph FI["router"]
subgraph FJ["src"]
FK["index.ts"]
subgraph FL["lib"]
FM["SellersRouter.tsx"]
end
end
end
subgraph FN["routes"]
subgraph FO["src"]
FP["index.ts"]
subgraph FQ["lib"]
FR["seller-routes.ts"]
end
end
end
subgraph FS["screens"]
subgraph FT["catalog"]
subgraph FU["src"]
FV["index.ts"]
subgraph FW["lib"]
FX["SellersCatalogScreens.tsx"]
FY["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FZ["login"]
subgraph G0["src"]
G1["index.ts"]
subgraph G2["lib"]
G3["SellersLogin.tsx"]
G4["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G5["manage-product"]
subgraph G6["src"]
G7["index.ts"]
subgraph G8["lib"]
G9["SellersManageProductScreen.tsx"]
GA["SellersDefineProductFlow.tsx"]
GB["SellersDefineProductFlow.pants-label.spec.tsx"]
GC["SellersDefineProductFlow.spec.tsx"]
GD["SellersManageProductScreen.spec.tsx"]
GE["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GF["products"]
subgraph GG["src"]
GH["index.ts"]
subgraph GI["lib"]
GJ["SellersProducts.tsx"]
GK["SellersProducts.pants-label.spec.tsx"]
GL["SellersProducts.spec.tsx"]
end
end
end
subgraph GM["seller-orders"]
GN["jest.config.ts"]
GO["jest.setup.ts"]
subgraph GP["src"]
GQ["index.ts"]
subgraph GR["lib"]
GS["seller-orders-screen.tsx"]
GT["seller-status-transitions.ts"]
GU["seller-orders-screen.pants-size.spec.tsx"]
GV["seller-orders-screen.spec.tsx"]
GW["seller-orders-screen.status-schema.spec.ts"]
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
JD["barrel.spec.ts"]
end
end
end
subgraph JE["snackbar"]
subgraph JF["src"]
JG["index.ts"]
subgraph JH["lib"]
JI["snackbar.tsx"]
end
end
end
subgraph JJ["styled-drawer"]
subgraph JK["src"]
JL["index.ts"]
subgraph JM["lib"]
JN["styled-drawer.tsx"]
JO["styled-drawer.spec.tsx"]
end
end
end
subgraph JP["unauthorized"]
subgraph JQ["src"]
JR["index.ts"]
subgraph JS["lib"]
JT["unauthorized-path.tsx"]
end
end
end
end
subgraph JU["graphql"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["currency.mutations.ts"]
JZ["currency.queries.ts"]
K0["fragments.ts"]
K1["variant-colors.ts"]
K2["client-shared-graphql.tsx"]
end
end
end
subgraph K3["hooks"]
subgraph K4["brands"]
subgraph K5["src"]
K6["index.ts"]
subgraph K7["lib"]
K8["brands.graphql.ts"]
K9["useBrands.ts"]
end
end
KA["vite.config.ts"]
end
subgraph KB["categories"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["useCategories.ts"]
KG["categories.graphql.ts"]
end
end
end
subgraph KH["colors"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["useColors.ts"]
KM["color.graphql.ts"]
end
end
end
subgraph KN["currency"]
subgraph KO["src"]
KP["index.ts"]
subgraph KQ["lib"]
KR["useConvertPrice.tsx"]
KS["useExchangeRate.tsx"]
KT["useCurrencies.tsx"]
KU["useCurrencyForLocale.tsx"]
KV["useExchangeRate.spec.tsx"]
end
end
end
subgraph KW["products"]
subgraph KX["src"]
KY["index.ts"]
subgraph KZ["lib"]
L0["productImage.ts"]
L1["products.graphql.ts"]
L2["useProducts.ts"]
L3["productImage.spec.ts"]
end
end
end
subgraph L4["site-languages"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["site-languages.graphql.ts"]
L9["useSiteLanguages.ts"]
LA["site-languages-hook.spec.tsx"]
end
end
LB["vite.config.ts"]
end
subgraph LC["snackbar"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["SnackbarContext.tsx"]
LH["useSnackbar.ts"]
end
end
end
subgraph LI["translations-management-hook"]
subgraph LJ["src"]
LK["index.ts"]
subgraph LL["lib"]
LM["useTranslationsManagement.ts"]
end
end
end
end
subgraph LN["lottie"]
subgraph LO["empty-cart"]
subgraph LP["src"]
LQ["index.ts"]
subgraph LR["lib"]
LS["lottie-empty-cart.tsx"]
LT["lottie-empty-cart.spec.tsx"]
end
end
LU["vite.config.ts"]
end
subgraph LV["loading"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["lottie-loading.tsx"]
M0["lottie-loading.spec.tsx"]
end
end
end
subgraph M1["success-check"]
subgraph M2["src"]
M3["index.ts"]
subgraph M4["lib"]
M5["lottie-success-check.tsx"]
M6["lottie-success-check.spec.tsx"]
end
end
end
subgraph M7["unauthorized"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MC["translations"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["mapApolloErrorToTranslationKey.ts"]
MH["WrapTranslation.tsx"]
end
end
end
subgraph MI["ui"]
subgraph MJ["colors"]
subgraph MK["src"]
ML["index.ts"]
subgraph MM["lib"]
MN["colors.ts"]
end
end
end
subgraph MO["language-components"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["language-components.tsx"]
MT["ltr-text-field.tsx"]
end
end
end
subgraph MU["sizes"]
subgraph MV["src"]
MW["index.ts"]
subgraph MX["lib"]
MY["sizes.ts"]
MZ["barrel.spec.ts"]
end
end
end
end
subgraph N0["zustand"]
subgraph N1["shared-auth-store"]
subgraph N2["src"]
N3["index.ts"]
subgraph N4["lib"]
N5["shared-auth-store.ts"]
end
end
end
subgraph N6["shared-notification-store"]
subgraph N7["src"]
N8["index.ts"]
subgraph N9["lib"]
NA["shared-notification-store.tsx"]
end
end
end
subgraph NB["shared-ui-store"]
subgraph NC["src"]
ND["index.ts"]
subgraph NE["lib"]
NF["shared-ui-store.ts"]
NG["barrel.spec.ts"]
end
end
end
end
end
end
subgraph NH["server"]
subgraph NI["controllers"]
subgraph NJ["src"]
NK["index.ts"]
subgraph NL["lib"]
NM["auth.controller.ts"]
NN["order.controller.ts"]
end
end
end
subgraph NO["decorators"]
NP["jest.config.ts"]
subgraph NQ["src"]
NR["index.ts"]
subgraph NS["lib"]
NT["authenticated-user.type.ts"]
NU["current-user.decorator.ts"]
NV["decorators.ts"]
NW["decorators.spec.ts"]
end
end
end
subgraph NX["entities"]
subgraph NY["src"]
NZ["index.ts"]
subgraph O0["lib"]
O1["brand.entity.ts"]
O2["product.entity.ts"]
O3["category.entity.ts"]
O4["product-description.entity.ts"]
O5["site-language.entity.ts"]
O6["product-info.entity.ts"]
O7["color.entity.ts"]
O8["product-info-color.entity.ts"]
O9["seller-info.entity.ts"]
OA["seller-product.entity.ts"]
OB["user.entity.ts"]
OC["cart.entity.ts"]
OD["currency-preference.entity.ts"]
OE["currency.entity.ts"]
OF["customer.entity.ts"]
OG["exchange-rate.entity.ts"]
OH["order.entity.ts"]
OI["platform-settings.entity.ts"]
OJ["refresh-token.entity.ts"]
OK["seller-order.entity.ts"]
OL["translation.entity.ts"]
end
end
end
subgraph OM["guards"]
ON["jest.config.ts"]
subgraph OO["src"]
OP["index.ts"]
subgraph OQ["lib"]
OR["catalog.guard.ts"]
OS["graphql-auth.guard.ts"]
OT["http-auth.guard.ts"]
OU["roles.guard.ts"]
OV["catalog.guard.spec.ts"]
OW["roles.guard.spec.ts"]
end
end
end
subgraph OX["inputs"]
subgraph OY["src"]
OZ["index.ts"]
subgraph P0["lib"]
P1["brand.input.ts"]
P2["cart.inputs.ts"]
P3["category.input.ts"]
P4["color.input.ts"]
P5["customer-auth.inputs.ts"]
P6["order-pagination.inputs.ts"]
P7["order.inputs.ts"]
P8["product-info-filter.input.ts"]
P9["product.input.ts"]
PA["seller-order-pagination.inputs.ts"]
PB["seller.input.ts"]
PC["site-language.input.ts"]
PD["user.input.ts"]
end
end
end
subgraph PE["modules"]
subgraph PF["src"]
PG["index.ts"]
subgraph PH["lib"]
PI["auth.module.ts"]
PJ["email.module.ts"]
PK["token.module.ts"]
PL["user.module.ts"]
PM["customer-profile.module.ts"]
PN["brand.module.ts"]
PO["catalog-guard.module.ts"]
PP["translation.module.ts"]
PQ["cart.module.ts"]
PR["platform-settings.module.ts"]
PS["category.module.ts"]
PT["product.module.ts"]
PU["color.module.ts"]
PV["currency.module.ts"]
PW["graphql-context.module.ts"]
PX["order.module.ts"]
PY["seller-info.module.ts"]
PZ["payment.module.ts"]
Q0["product-info.module.ts"]
Q1["seller-products.module.ts"]
Q2["site-language.module.ts"]
end
end
end
subgraph Q3["resolvers"]
Q4["jest.config.ts"]
subgraph Q5["src"]
Q6["index.ts"]
subgraph Q7["lib"]
Q8["auth.resolver.ts"]
Q9["zod-validation.pipe.ts"]
QA["brand.resolver.ts"]
QB["cart.resolver.ts"]
QC["category.resolver.ts"]
QD["color.resolver.ts"]
QE["currency.resolver.ts"]
QF["customer-profile.resolver.ts"]
QG["order.resolver.ts"]
QH["payment.resolver.ts"]
QI["product-info.resolver.ts"]
QJ["product.resolver.ts"]
QK["seller-info.resolver.ts"]
QL["shipping.resolver.ts"]
QM["site-language.resolver.ts"]
QN["translation.input.ts"]
QO["translation.resolver.ts"]
QP["user.resolver.ts"]
QQ["auth-validation.spec.ts"]
QR["auth.resolver.spec.ts"]
QS["cart-validation.spec.ts"]
QT["currency-translation-validation.spec.ts"]
QU["customer-profile-validation.spec.ts"]
QV["order-ownership.security.spec.ts"]
QW["order-validation.spec.ts"]
QX["order.resolver.spec.ts"]
QY["order.resolver.status-transitions.spec.ts"]
QZ["order.resolver.tracking.spec.ts"]
R0["payment-batch.security.spec.ts"]
R1["payment-verify.security.spec.ts"]
R2["payment.amount-tampering.security.spec.ts"]
R3["payment.resolver.integration.spec.ts"]
R4["payment.resolver.spec.ts"]
R5["product-info.resolver.spec.ts"]
R6["product-validation.spec.ts"]
R7["product.resolver.spec.ts"]
R8["query-args-validation.spec.ts"]
R9["seller-info-validation.spec.ts"]
RA["seller-info.resolver.spec.ts"]
RB["taxonomy-validation.spec.ts"]
RC["translation.resolver.guards.spec.ts"]
subgraph RD["types"]
RE["graphql-upload.d.ts"]
end
RF["user.resolver.spec.ts"]
RG["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RH["services"]
RI["jest.config.ts"]
subgraph RJ["src"]
RK["index.ts"]
subgraph RL["lib"]
RM["auth.service.ts"]
RN["brand.service.ts"]
RO["cart.service.ts"]
RP["product-info-colors.util.ts"]
RQ["category.service.ts"]
RR["color.service.ts"]
RS["currency.service.ts"]
RT["customer-profile.service.ts"]
RU["email.service.ts"]
RV["image-upload.service.ts"]
RW["order.service.ts"]
RX["shipping-calculation.service.ts"]
RY["payment-logger.service.ts"]
RZ["payment.service.ts"]
S0["product.service.ts"]
S1["seller-info.service.ts"]
S2["site-language.service.ts"]
S3["token.service.ts"]
S4["translation.service.ts"]
S5["user.service.ts"]
S6["auth.service.password-policy.spec.ts"]
S7["auth.service.spec.ts"]
S8["cart.service.add-quantity.spec.ts"]
S9["cart.service.null-relations.spec.ts"]
SA["cart.service.spec.ts"]
SB["order.payment-verify.security.spec.ts"]
SC["order.price-tampering.security.spec.ts"]
SD["order.service.spec.ts"]
SE["order.service.tracking.spec.ts"]
SF["product-info-colors.util.spec.ts"]
SG["product.service.multi-filters.spec.ts"]
SH["product.service.only-discounted.spec.ts"]
SI["product.service.pants.spec.ts"]
SJ["product.service.spec.ts"]
SK["relay-connection.spec.ts"]
SL["seller-info.service.price-validation.spec.ts"]
SM["shipping-calculation.service.spec.ts"]
SN["shipping-security.security.spec.ts"]
SO["token.service.spec.ts"]
end
end
end
subgraph SP["strategies"]
subgraph SQ["src"]
SR["index.ts"]
subgraph SS["lib"]
ST["local.strategy.ts"]
end
end
end
subgraph SU["utils"]
subgraph SV["src"]
SW["index.ts"]
subgraph SX["lib"]
SY["email-templates.ts"]
SZ["relay-connection.ts"]
T0["pagination.ts"]
end
end
end
end
subgraph T1["shared"]
subgraph T2["codegen"]
T3["jest.config.ts"]
subgraph T4["src"]
T5["index.ts"]
subgraph T6["lib"]
subgraph T7["generated"]
T8["graphql.ts"]
end
end
end
end
subgraph T9["graphql-schema"]
TA["jest.config.ts"]
subgraph TB["src"]
TC["index.ts"]
end
end
subgraph TD["product-sizes"]
subgraph TE["src"]
TF["index.ts"]
subgraph TG["lib"]
TH["product-sizes.ts"]
TI["product-sizes.pants-formats.spec.ts"]
TJ["product-sizes.pants-label.spec.ts"]
TK["product-sizes.pants-strict.spec.ts"]
TL["product-sizes.spec.ts"]
end
end
end
subgraph TM["shared-i18n"]
subgraph TN["src"]
TO["index.ts"]
subgraph TP["lib"]
TQ["language-context.tsx"]
TR["language-detector.ts"]
subgraph TS["locales"]
TT["i18n-react.tsx"]
TU["i18n-util.ts"]
TV["i18n-util.async.ts"]
subgraph TW["en"]
TX["index.ts"]
end
subgraph TZ["fa"]
U0["index.ts"]
end
U1["formatters.ts"]
U2["i18n-types.ts"]
U3["i18n-util.sync.ts"]
U4["navigator-detector.ts"]
end
TY["site-name.ts"]
U5["table-localization.ts"]
U6["theme-provider.tsx"]
U7["use-page-title.ts"]
U8["use-seo-meta.ts"]
U9["use-page-title.spec.tsx"]
UA["use-seo-meta.spec.tsx"]
end
end
end
subgraph UB["validation"]
subgraph UC["src"]
UD["index.ts"]
subgraph UE["lib"]
UF["apollo-error.ts"]
UG["auth.ts"]
UH["limits.ts"]
UI["primitives.ts"]
UJ["auth-forms.ts"]
UK["cart.ts"]
UL["catalog.ts"]
UM["contact.ts"]
UN["currency.ts"]
UO["taxonomy.ts"]
UP["errors.ts"]
UQ["order.ts"]
UR["profile.ts"]
US["query.ts"]
UT["seller.ts"]
UU["auth-forms.admin.spec.ts"]
UV["auth-forms.login.spec.ts"]
UW["auth-forms.recovery.spec.ts"]
UX["auth-forms.seller.spec.ts"]
UY["auth-forms.spec.ts"]
UZ["auth.spec.ts"]
V0["cart.spec.ts"]
V1["catalog.spec.ts"]
V2["contact.spec.ts"]
V3["currency.spec.ts"]
V4["errors.spec.ts"]
V5["order.spec.ts"]
V6["primitives.spec.ts"]
V7["profile.spec.ts"]
V8["query.spec.ts"]
V9["seller.spec.ts"]
VA["taxonomy.spec.ts"]
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
8Y-->8V
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
9S-->9T
9U-->9T
9V-->9S
9W-->9S
9X-->9S
A1-->A3
A4-->A3
A5-->A3
A6-->A3
A9-->AB
AC-->AB
AD-->AB
AG-->AI
AJ-->AI
AN-->AP
AQ-->AP
AU-->AW
AU-->B5
AU-->AZ
AU-->B4
AW-->AY
AW-->B0
AW-->B1
AW-->B2
AW-->B3
AW-->AZ
AW-->B4
AY-->AZ
B5-->AZ
B6-->B2
B6-->AW
B6-->AZ
B7-->B8
B7-->B2
B7-->AW
B7-->B5
B7-->AZ
B9-->B5
BA-->B5
BB-->AZ
BD-->AZ
BH-->BJ
BK-->BJ
BL-->BJ
BO-->BQ
BR-->BQ
BV-->BX
BY-->BX
C2-->C4
C4-->C5
C6-->C4
C7-->C4
C8-->C4
C9-->C4
CA-->C4
CE-->CG
CH-->CG
CI-->CG
CL-->CN
CO-->CN
CS-->CU
CY-->D0
D3-->D5
D6-->D3
D7-->D5
DB-->DD
DE-->DB
DF-->DD
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
F2-->F4
F4-->F5
F8-->FA
FE-->FG
FE-->FH
FK-->FM
FP-->FR
FV-->FX
FY-->FX
G1-->G3
G4-->G3
G7-->G9
G9-->GA
GB-->GA
GC-->GA
GD-->G9
GE-->G9
GH-->GJ
GK-->GJ
GL-->GJ
GQ-->GS
GS-->GT
GU-->GS
GV-->GS
GX-->GT
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
JD-->J6
JG-->JI
JL-->JN
JO-->JN
JR-->JT
JW-->JY
JW-->JZ
JW-->K0
JW-->K1
K6-->K8
K6-->K9
K9-->K8
KD-->KF
KF-->KG
KJ-->KL
KL-->KM
KP-->KR
KP-->KT
KP-->KU
KP-->KS
KR-->KS
KV-->KS
KY-->L0
KY-->L1
KY-->L2
L2-->L1
L3-->L0
L6-->L8
L6-->L9
L9-->L8
LA-->L9
LE-->LG
LE-->LH
LH-->LG
LK-->LM
LQ-->LS
LT-->LS
LX-->LZ
M0-->LZ
M3-->M5
M6-->M5
M9-->MB
ME-->MG
ML-->MN
MQ-->MS
MQ-->MT
MW-->MY
MZ-->MW
N3-->N5
N8-->NA
ND-->NF
NG-->ND
NK-->NM
NK-->NN
NR-->NT
NR-->NU
NR-->NV
NW-->NV
NZ-->O1
NZ-->OC
NZ-->O3
NZ-->O7
NZ-->OD
NZ-->OE
NZ-->OF
NZ-->OG
NZ-->OH
NZ-->OI
NZ-->O4
NZ-->O8
NZ-->O6
NZ-->O2
NZ-->OJ
NZ-->O9
NZ-->OK
NZ-->OA
NZ-->O5
NZ-->OL
NZ-->OB
O1-->O2
O2-->O1
O2-->O3
O2-->O4
O2-->O6
O2-->O9
O2-->OA
O3-->O2
O4-->O2
O4-->O5
O5-->O4
O6-->O7
O6-->O8
O6-->O2
O8-->O7
O8-->O6
O9-->OA
O9-->OB
OA-->O6
OA-->O2
OA-->O9
OC-->O2
OC-->OB
OD-->OE
OF-->OB
OG-->OE
OG-->OB
OH-->O2
OH-->O9
OJ-->OB
OK-->OH
OK-->O9
OP-->OR
OP-->OS
OP-->OT
OP-->OU
OV-->OR
OW-->OU
OZ-->P1
OZ-->P2
OZ-->P3
OZ-->P4
OZ-->P5
OZ-->P6
OZ-->P7
OZ-->P8
OZ-->P9
OZ-->PA
OZ-->PB
OZ-->PC
OZ-->PD
P9-->P8
PG-->PI
PG-->PN
PG-->PQ
PG-->PO
PG-->PS
PG-->PU
PG-->PV
PG-->PM
PG-->PJ
PG-->PW
PG-->PX
PG-->PZ
PG-->PR
PG-->Q0
PG-->PT
PG-->PY
PG-->Q1
PG-->Q2
PG-->PK
PG-->PP
PG-->PL
PI-->PJ
PI-->PK
PI-->PL
PL-->PI
PL-->PM
PN-->PO
PN-->PP
PQ-->PR
PS-->PO
PS-->PT
PS-->PP
PT-->PO
PT-->PK
PT-->PP
PU-->PO
PU-->PP
PW-->PJ
PW-->PK
PW-->PL
PX-->PR
PX-->PY
PY-->PT
PY-->PK
PY-->PL
PZ-->PV
PZ-->PX
Q0-->PT
Q0-->PP
Q1-->PY
Q1-->PL
Q6-->Q8
Q6-->QA
Q6-->QB
Q6-->QC
Q6-->QD
Q6-->QE
Q6-->QF
Q6-->QG
Q6-->QH
Q6-->QI
Q6-->QJ
Q6-->QK
Q6-->QL
Q6-->QM
Q6-->QN
Q6-->QO
Q6-->QP
Q6-->Q9
Q8-->Q9
QA-->Q9
QB-->Q9
QC-->Q9
QD-->Q9
QE-->Q9
QF-->Q9
QG-->Q9
QJ-->Q9
QK-->Q9
QM-->Q9
QO-->Q9
QP-->Q9
QQ-->Q8
QQ-->QP
QQ-->Q9
QR-->Q8
QS-->QB
QS-->Q9
QT-->QE
QT-->QO
QT-->Q9
QU-->QF
QU-->Q9
QV-->QG
QV-->QH
QW-->QG
QW-->Q9
QX-->QG
QY-->QG
QZ-->QG
R0-->QG
R0-->QH
R1-->QH
R2-->QH
R3-->QH
R4-->QH
R5-->QI
R6-->QJ
R6-->Q9
R7-->QJ
R8-->QG
R8-->QJ
R8-->QK
R8-->Q9
R9-->QK
R9-->Q9
RA-->QK
RB-->QA
RB-->QC
RB-->QD
RB-->QM
RB-->Q9
RC-->QO
RF-->QP
RG-->Q9
RK-->RM
RK-->RN
RK-->RO
RK-->RQ
RK-->RR
RK-->RS
RK-->RT
RK-->RU
RK-->RV
RK-->RW
RK-->RY
RK-->RZ
RK-->RP
RK-->S0
RK-->S1
RK-->RX
RK-->S2
RK-->S3
RK-->S4
RK-->S5
RO-->RP
RW-->RX
S0-->RP
S1-->RP
S6-->RM
S6-->RU
S6-->S3
S6-->S5
S7-->RM
S7-->RU
S7-->S3
S7-->S5
S8-->RO
S9-->RO
SA-->RO
SB-->RW
SC-->RW
SD-->RW
SD-->RX
SE-->RW
SF-->RP
SG-->S0
SG-->S4
SH-->S0
SH-->S4
SI-->S0
SI-->S4
SJ-->S0
SJ-->S4
SL-->RM
SL-->S1
SM-->RX
SN-->RW
SN-->RX
SO-->S3
SR-->ST
SW-->SY
SW-->SZ
T5-->T8
TF-->TH
TI-->TH
TJ-->TH
TK-->TH
TL-->TH
TO-->TQ
TO-->TR
TO-->TT
TO-->U2
TO-->TU
TO-->TV
TO-->U3
TO-->U4
TO-->TY
TO-->U5
TO-->U6
TO-->U7
TO-->U8
TQ-->TR
TQ-->TT
TQ-->TV
TT-->TU
TV-->TX
TV-->U0
TV-->U1
TV-->TU
TX-->TY
U0-->TY
U3-->TX
U3-->U0
U3-->U1
U3-->TU
U5-->TT
U6-->TQ
U7-->TT
U9-->U7
UA-->U8
UD-->UF
UD-->UG
UD-->UJ
UD-->UK
UD-->UL
UD-->UM
UD-->UN
UD-->UP
UD-->UH
UD-->UQ
UD-->UI
UD-->UR
UD-->US
UD-->UT
UD-->UO
UG-->UH
UG-->UI
UI-->UH
UJ-->UG
UK-->UI
UN-->UO
UQ-->UG
UQ-->UK
UQ-->UI
UR-->UQ
US-->UI
UU-->UJ
UV-->UJ
UW-->UJ
UX-->UJ
UY-->UJ
UZ-->UG
V0-->UK
V1-->UL
V2-->UM
V3-->UN
V4-->UP
V5-->UQ
V6-->UH
V6-->UI
V7-->UR
V8-->US
V9-->UT
VA-->UO
