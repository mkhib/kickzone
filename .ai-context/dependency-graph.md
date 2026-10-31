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
9J["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9K["customer-shopping-cart"]
subgraph 9L["src"]
9M["index.ts"]
subgraph 9N["lib"]
9O["customer-shopping-cart.tsx"]
9P["customer-shopping-cart.pants-size.spec.tsx"]
9Q["customer-shopping-cart.shipping-form.spec.tsx"]
9R["customer-shopping-cart.spec.tsx"]
end
end
9S["vite.config.ts"]
end
subgraph 9T["customer-signup"]
subgraph 9U["src"]
9V["index.ts"]
subgraph 9W["lib"]
9X["customer-signup.tsx"]
9Y["customer-signup.password-length.spec.tsx"]
9Z["customer-signup.spec.tsx"]
A0["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A1["forgot-password"]
subgraph A2["src"]
A3["index.ts"]
subgraph A4["lib"]
A5["customer-forgot-password.tsx"]
A6["customer-forgot-password.spec.tsx"]
A7["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A8["guide-authenticity"]
subgraph A9["src"]
AA["index.ts"]
subgraph AB["lib"]
AC["customer-guide-authenticity.tsx"]
AD["customer-guide-authenticity.spec.tsx"]
end
end
AE["vite.config.ts"]
end
subgraph AF["guide-payment"]
subgraph AG["src"]
AH["index.ts"]
subgraph AI["lib"]
AJ["customer-guide-payment.tsx"]
AK["customer-guide-payment.spec.tsx"]
end
end
AL["vite.config.ts"]
end
subgraph AM["home"]
subgraph AN["src"]
AO["index.ts"]
subgraph AP["lib"]
AQ["CustomersHomeScreen.tsx"]
subgraph AR["components"]
AS["CategoryBentoSection.tsx"]
AU["HeroSection.tsx"]
AV["HomeLoadingScreen.tsx"]
AW["PicksRailSection.tsx"]
AX["TrustStripSection.tsx"]
B2["NewArrivalsSection.tsx"]
B5["BrandBlocksSection.tsx"]
B6["NewsletterSection.tsx"]
B7["ShopTheLookSection.tsx"]
B8["TickerSection.tsx"]
end
AT["home-selectors.ts"]
AY["useScrollProgress.ts"]
AZ["CustomersShopScreen.tsx"]
B0["CustomersHomeScreen.cart-size.spec.tsx"]
B1["CustomersHomeScreen.spec.tsx"]
B3["CustomersShopScreen.cart-size.spec.tsx"]
B4["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph B9["login"]
subgraph BA["src"]
BB["index.ts"]
subgraph BC["lib"]
BD["CustomersLoginScreen.tsx"]
BE["CustomersLoginScreen.spec.tsx"]
BF["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BG["not-found"]
subgraph BH["src"]
BI["index.ts"]
subgraph BJ["lib"]
BK["customer-not-found.tsx"]
BL["customer-not-found.spec.tsx"]
end
end
BM["vite.config.ts"]
end
subgraph BN["privacy-policy"]
subgraph BO["src"]
BP["index.ts"]
subgraph BQ["lib"]
BR["customer-privacy-policy.tsx"]
BS["customer-privacy-policy.spec.tsx"]
end
end
BT["vite.config.ts"]
end
subgraph BU["product-details"]
subgraph BV["src"]
BW["index.ts"]
subgraph BX["lib"]
BY["customer-product-details.tsx"]
BZ["reviews-flag.ts"]
C0["customer-product-details.guarantee.spec.tsx"]
C1["customer-product-details.no-low-stock.spec.tsx"]
C2["customer-product-details.pants-size.spec.tsx"]
C3["customer-product-details.reviews-hidden.spec.tsx"]
C4["customer-product-details.spec.tsx"]
end
end
C5["vite.config.ts"]
end
subgraph C6["reset-password"]
subgraph C7["src"]
C8["index.ts"]
subgraph C9["lib"]
CA["customer-reset-password.tsx"]
CB["customer-reset-password.password-length.spec.tsx"]
CC["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CD["shipping-returns"]
subgraph CE["src"]
CF["index.ts"]
subgraph CG["lib"]
CH["customer-shipping-returns.tsx"]
CI["customer-shipping-returns.spec.tsx"]
end
end
CJ["vite.config.ts"]
end
subgraph CK["unauthorized"]
subgraph CL["src"]
CM["index.ts"]
subgraph CN["lib"]
CO["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CP["utility"]
subgraph CQ["test"]
subgraph CR["src"]
CS["index.ts"]
subgraph CT["lib"]
CU["customers-test-utility.tsx"]
end
end
end
end
subgraph CV["validations"]
subgraph CW["src"]
CX["index.ts"]
subgraph CY["lib"]
CZ["shipping-validation.ts"]
D0["shipping-validation.shared.spec.ts"]
D1["shipping-validation.spec.tsx"]
D2["shipping-validation.tsx"]
end
end
end
subgraph D3["zustand"]
subgraph D4["customer-cart-store"]
subgraph D5["src"]
D6["index.ts"]
subgraph D7["lib"]
D8["customer-cart-store.ts"]
D9["customer-cart-store.spec.ts"]
DA["customer-cart-store.tsx"]
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
subgraph EU["types"]
EV["apollo-upload-client.d.ts"]
end
end
end
subgraph EW["hooks"]
subgraph EX["auth"]
subgraph EY["src"]
EZ["index.ts"]
subgraph F0["lib"]
F1["useSellerAuth.ts"]
F2["sellerAuth.graphql.ts"]
end
end
end
subgraph F3["orders"]
subgraph F4["src"]
F5["index.ts"]
subgraph F6["lib"]
F7["useSellerOrders.ts"]
F8["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph F9["products"]
subgraph FA["src"]
FB["index.ts"]
subgraph FC["lib"]
FD["useSellersProductManagement.ts"]
FE["useSellersProducts.ts"]
end
end
end
end
subgraph FF["router"]
subgraph FG["src"]
FH["index.ts"]
subgraph FI["lib"]
FJ["SellersRouter.tsx"]
end
end
end
subgraph FK["routes"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["seller-routes.ts"]
end
end
end
subgraph FP["screens"]
subgraph FQ["catalog"]
subgraph FR["src"]
FS["index.ts"]
subgraph FT["lib"]
FU["SellersCatalogScreens.tsx"]
FV["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FW["login"]
subgraph FX["src"]
FY["index.ts"]
subgraph FZ["lib"]
G0["SellersLogin.tsx"]
G1["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G2["manage-product"]
subgraph G3["src"]
G4["index.ts"]
subgraph G5["lib"]
G6["SellersManageProductScreen.tsx"]
G7["SellersDefineProductFlow.tsx"]
G8["SellersDefineProductFlow.pants-label.spec.tsx"]
G9["SellersDefineProductFlow.spec.tsx"]
GA["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph GB["products"]
subgraph GC["src"]
GD["index.ts"]
subgraph GE["lib"]
GF["SellersProducts.tsx"]
GG["SellersProducts.pants-label.spec.tsx"]
GH["SellersProducts.spec.tsx"]
end
end
end
subgraph GI["seller-orders"]
GJ["jest.config.ts"]
GK["jest.setup.ts"]
subgraph GL["src"]
GM["index.ts"]
subgraph GN["lib"]
GO["seller-orders-screen.tsx"]
GP["seller-status-transitions.ts"]
GQ["seller-orders-screen.pants-size.spec.tsx"]
GR["seller-orders-screen.spec.tsx"]
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
J8["rtl-table-utils.spec.tsx"]
J9["rtl-table-utils.tsx"]
end
end
end
subgraph JA["snackbar"]
subgraph JB["src"]
JC["index.ts"]
subgraph JD["lib"]
JE["snackbar.tsx"]
end
end
end
subgraph JF["styled-drawer"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["styled-drawer.tsx"]
JK["styled-drawer.spec.tsx"]
end
end
end
subgraph JL["unauthorized"]
subgraph JM["src"]
JN["index.ts"]
subgraph JO["lib"]
JP["unauthorized-path.tsx"]
end
end
end
end
subgraph JQ["graphql"]
subgraph JR["src"]
JS["index.ts"]
subgraph JT["lib"]
JU["currency.mutations.ts"]
JV["currency.queries.ts"]
JW["fragments.ts"]
JX["variant-colors.ts"]
JY["client-shared-graphql.tsx"]
end
end
end
subgraph JZ["hooks"]
subgraph K0["brands"]
subgraph K1["src"]
K2["index.ts"]
subgraph K3["lib"]
K4["brands.graphql.ts"]
K5["useBrands.ts"]
end
end
K6["vite.config.ts"]
end
subgraph K7["categories"]
subgraph K8["src"]
K9["index.ts"]
subgraph KA["lib"]
KB["useCategories.ts"]
KC["categories.graphql.ts"]
end
end
end
subgraph KD["colors"]
subgraph KE["src"]
KF["index.ts"]
subgraph KG["lib"]
KH["useColors.ts"]
KI["color.graphql.ts"]
end
end
end
subgraph KJ["currency"]
subgraph KK["src"]
KL["index.ts"]
subgraph KM["lib"]
KN["useConvertPrice.tsx"]
KO["useExchangeRate.tsx"]
KP["useCurrencies.tsx"]
KQ["useCurrencyForLocale.tsx"]
KR["useExchangeRate.spec.tsx"]
end
end
end
subgraph KS["products"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["productImage.ts"]
KX["products.graphql.ts"]
KY["useProducts.ts"]
KZ["productImage.spec.ts"]
end
end
end
subgraph L0["site-languages"]
subgraph L1["src"]
L2["index.ts"]
subgraph L3["lib"]
L4["site-languages.graphql.ts"]
L5["useSiteLanguages.ts"]
L6["site-languages-hook.spec.tsx"]
end
end
L7["vite.config.ts"]
end
subgraph L8["snackbar"]
subgraph L9["src"]
LA["index.ts"]
subgraph LB["lib"]
LC["SnackbarContext.tsx"]
LD["useSnackbar.ts"]
end
end
end
subgraph LE["translations-management-hook"]
subgraph LF["src"]
LG["index.ts"]
subgraph LH["lib"]
LI["useTranslationsManagement.ts"]
end
end
end
end
subgraph LJ["lottie"]
subgraph LK["empty-cart"]
subgraph LL["src"]
LM["index.ts"]
subgraph LN["lib"]
LO["lottie-empty-cart.tsx"]
LP["lottie-empty-cart.spec.tsx"]
end
end
LQ["vite.config.ts"]
end
subgraph LR["loading"]
subgraph LS["src"]
LT["index.ts"]
subgraph LU["lib"]
LV["lottie-loading.tsx"]
LW["lottie-loading.spec.tsx"]
end
end
end
subgraph LX["success-check"]
subgraph LY["src"]
LZ["index.ts"]
subgraph M0["lib"]
M1["lottie-success-check.tsx"]
M2["lottie-success-check.spec.tsx"]
end
end
end
subgraph M3["unauthorized"]
subgraph M4["src"]
M5["index.ts"]
subgraph M6["lib"]
M7["lottie-unauthorized.tsx"]
end
end
end
end
subgraph M8["translations"]
subgraph M9["src"]
MA["index.ts"]
subgraph MB["lib"]
MC["mapApolloErrorToTranslationKey.ts"]
MD["WrapTranslation.tsx"]
end
end
end
subgraph ME["ui"]
subgraph MF["colors"]
subgraph MG["src"]
MH["index.ts"]
subgraph MI["lib"]
MJ["colors.ts"]
end
end
end
subgraph MK["language-components"]
subgraph ML["src"]
MM["index.ts"]
subgraph MN["lib"]
MO["language-components.tsx"]
MP["ltr-text-field.tsx"]
end
end
end
subgraph MQ["sizes"]
subgraph MR["src"]
MS["index.ts"]
subgraph MT["lib"]
MU["sizes.ts"]
MV["sizes.spec.tsx"]
MW["sizes.tsx"]
end
end
end
end
subgraph MX["zustand"]
subgraph MY["shared-auth-store"]
subgraph MZ["src"]
N0["index.ts"]
subgraph N1["lib"]
N2["shared-auth-store.ts"]
end
end
end
subgraph N3["shared-notification-store"]
subgraph N4["src"]
N5["index.ts"]
subgraph N6["lib"]
N7["shared-notification-store.tsx"]
end
end
end
subgraph N8["shared-ui-store"]
subgraph N9["src"]
NA["index.ts"]
subgraph NB["lib"]
NC["shared-ui-store.ts"]
ND["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NE["server"]
subgraph NF["controllers"]
subgraph NG["src"]
NH["index.ts"]
subgraph NI["lib"]
NJ["auth.controller.ts"]
NK["order.controller.ts"]
end
end
end
subgraph NL["decorators"]
NM["jest.config.ts"]
subgraph NN["src"]
NO["index.ts"]
subgraph NP["lib"]
NQ["current-user.decorator.ts"]
NR["decorators.ts"]
NS["decorators.spec.ts"]
end
end
end
subgraph NT["entities"]
subgraph NU["src"]
NV["index.ts"]
subgraph NW["lib"]
NX["brand.entity.ts"]
NY["product.entity.ts"]
NZ["category.entity.ts"]
O0["product-description.entity.ts"]
O1["site-language.entity.ts"]
O2["product-info.entity.ts"]
O3["color.entity.ts"]
O4["product-info-color.entity.ts"]
O5["seller-info.entity.ts"]
O6["seller-product.entity.ts"]
O7["user.entity.ts"]
O8["cart.entity.ts"]
O9["currency-preference.entity.ts"]
OA["currency.entity.ts"]
OB["customer.entity.ts"]
OC["exchange-rate.entity.ts"]
OD["order.entity.ts"]
OE["platform-settings.entity.ts"]
OF["refresh-token.entity.ts"]
OG["seller-order.entity.ts"]
OH["translation.entity.ts"]
end
end
end
subgraph OI["guards"]
OJ["jest.config.ts"]
subgraph OK["src"]
OL["index.ts"]
subgraph OM["lib"]
ON["catalog.guard.ts"]
OO["graphql-auth.guard.ts"]
OP["http-auth.guard.ts"]
OQ["roles.guard.ts"]
OR["catalog.guard.spec.ts"]
OS["roles.guard.spec.ts"]
end
end
end
subgraph OT["inputs"]
subgraph OU["src"]
OV["index.ts"]
subgraph OW["lib"]
OX["brand.input.ts"]
OY["cart.inputs.ts"]
OZ["category.input.ts"]
P0["color.input.ts"]
P1["customer-auth.inputs.ts"]
P2["order-pagination.inputs.ts"]
P3["order.inputs.ts"]
P4["product-info-filter.input.ts"]
P5["product.input.ts"]
P6["seller-order-pagination.inputs.ts"]
P7["seller.input.ts"]
P8["site-language.input.ts"]
P9["user.input.ts"]
end
end
end
subgraph PA["modules"]
subgraph PB["src"]
PC["index.ts"]
subgraph PD["lib"]
PE["auth.module.ts"]
PF["email.module.ts"]
PG["token.module.ts"]
PH["user.module.ts"]
PI["customer-profile.module.ts"]
PJ["brand.module.ts"]
PK["catalog-guard.module.ts"]
PL["translation.module.ts"]
PM["cart.module.ts"]
PN["platform-settings.module.ts"]
PO["category.module.ts"]
PP["product.module.ts"]
PQ["color.module.ts"]
PR["currency.module.ts"]
PS["graphql-context.module.ts"]
PT["order.module.ts"]
PU["seller-info.module.ts"]
PV["payment.module.ts"]
PW["product-info.module.ts"]
PX["seller-products.module.ts"]
PY["site-language.module.ts"]
end
end
end
subgraph PZ["resolvers"]
Q0["jest.config.ts"]
subgraph Q1["src"]
Q2["index.ts"]
subgraph Q3["lib"]
Q4["auth.resolver.ts"]
Q5["zod-validation.pipe.ts"]
Q6["brand.resolver.ts"]
Q7["cart.resolver.ts"]
Q8["category.resolver.ts"]
Q9["color.resolver.ts"]
QA["currency.resolver.ts"]
QB["customer-profile.resolver.ts"]
QC["order.resolver.ts"]
QD["payment.resolver.ts"]
QE["product-info.resolver.ts"]
QF["product.resolver.ts"]
QG["seller-info.resolver.ts"]
QH["shipping.resolver.ts"]
QI["site-language.resolver.ts"]
QJ["translation.input.ts"]
QK["translation.resolver.ts"]
QL["user.resolver.ts"]
QM["auth-validation.spec.ts"]
QN["auth.resolver.spec.ts"]
QO["cart-validation.spec.ts"]
QP["customer-profile-validation.spec.ts"]
QQ["order-validation.spec.ts"]
QR["order.resolver.spec.ts"]
QS["order.resolver.status-transitions.spec.ts"]
QT["order.resolver.tracking.spec.ts"]
QU["payment.resolver.integration.spec.ts"]
QV["payment.resolver.spec.ts"]
QW["product-info.resolver.spec.ts"]
QX["seller-info-validation.spec.ts"]
QY["translation.resolver.guards.spec.ts"]
subgraph QZ["types"]
R0["graphql-upload.d.ts"]
end
R1["user.resolver.spec.ts"]
R2["zod-validation.pipe.spec.ts"]
end
end
end
subgraph R3["services"]
R4["jest.config.ts"]
subgraph R5["src"]
R6["index.ts"]
subgraph R7["lib"]
R8["auth.service.ts"]
R9["brand.service.ts"]
RA["cart.service.ts"]
RB["product-info-colors.util.ts"]
RC["category.service.ts"]
RD["color.service.ts"]
RE["currency.service.ts"]
RF["customer-profile.service.ts"]
RG["email.service.ts"]
RH["image-upload.service.ts"]
RI["order.service.ts"]
RJ["payment-logger.service.ts"]
RK["payment.service.ts"]
RL["product.service.ts"]
RM["seller-info.service.ts"]
RN["shipping-calculation.service.ts"]
RO["site-language.service.ts"]
RP["token.service.ts"]
RQ["translation.service.ts"]
RR["user.service.ts"]
RS["auth.service.password-policy.spec.ts"]
RT["auth.service.spec.ts"]
RU["cart.service.add-quantity.spec.ts"]
RV["cart.service.null-relations.spec.ts"]
RW["cart.service.spec.ts"]
RX["order.service.spec.ts"]
RY["order.service.tracking.spec.ts"]
RZ["product-info-colors.util.spec.ts"]
S0["product.service.multi-filters.spec.ts"]
S1["product.service.only-discounted.spec.ts"]
S2["product.service.pants.spec.ts"]
S3["product.service.spec.ts"]
S4["relay-connection.spec.ts"]
S5["seller-info.service.price-validation.spec.ts"]
S6["shipping-calculation.service.spec.ts"]
S7["token.service.spec.ts"]
end
end
end
subgraph S8["strategies"]
subgraph S9["src"]
SA["index.ts"]
subgraph SB["lib"]
SC["local.strategy.ts"]
end
end
end
subgraph SD["utils"]
subgraph SE["src"]
SF["index.ts"]
subgraph SG["lib"]
SH["email-templates.ts"]
SI["relay-connection.ts"]
SJ["pagination.ts"]
end
end
end
end
subgraph SK["shared"]
subgraph SL["codegen"]
SM["jest.config.ts"]
subgraph SN["src"]
SO["index.ts"]
subgraph SP["lib"]
subgraph SQ["generated"]
SR["graphql.ts"]
end
end
end
end
subgraph SS["graphql-schema"]
ST["jest.config.ts"]
subgraph SU["src"]
SV["index.ts"]
end
end
subgraph SW["product-sizes"]
subgraph SX["src"]
SY["index.ts"]
subgraph SZ["lib"]
T0["product-sizes.ts"]
T1["product-sizes.pants-formats.spec.ts"]
T2["product-sizes.pants-label.spec.ts"]
T3["product-sizes.pants-strict.spec.ts"]
T4["product-sizes.spec.ts"]
end
end
end
subgraph T5["shared-i18n"]
subgraph T6["src"]
T7["index.ts"]
subgraph T8["lib"]
T9["language-context.tsx"]
TA["language-detector.ts"]
subgraph TB["locales"]
TC["i18n-react.tsx"]
TD["i18n-util.ts"]
TE["i18n-util.async.ts"]
subgraph TF["en"]
TG["index.ts"]
end
subgraph TI["fa"]
TJ["index.ts"]
end
TK["formatters.ts"]
TL["i18n-types.ts"]
TM["i18n-util.sync.ts"]
TN["navigator-detector.ts"]
end
TH["site-name.ts"]
TO["table-localization.ts"]
TP["theme-provider.tsx"]
TQ["use-page-title.ts"]
end
end
end
subgraph TR["validation"]
subgraph TS["src"]
TT["index.ts"]
subgraph TU["lib"]
TV["auth.ts"]
TW["limits.ts"]
TX["primitives.ts"]
TY["auth-forms.ts"]
TZ["cart.ts"]
U0["errors.ts"]
U1["order.ts"]
U2["profile.ts"]
U3["seller.ts"]
U4["auth-forms.admin.spec.ts"]
U5["auth-forms.login.spec.ts"]
U6["auth-forms.recovery.spec.ts"]
U7["auth-forms.seller.spec.ts"]
U8["auth-forms.spec.ts"]
U9["auth.spec.ts"]
UA["cart.spec.ts"]
UB["errors.spec.ts"]
UC["order.spec.ts"]
UD["primitives.spec.ts"]
UE["profile.spec.ts"]
UF["seller.spec.ts"]
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
9J-->9H
9M-->9O
9P-->9O
9Q-->9O
9R-->9O
9V-->9X
9Y-->9X
9Z-->9X
A0-->9X
A3-->A5
A6-->A5
A7-->A5
AA-->AC
AD-->AC
AH-->AJ
AK-->AJ
AO-->AQ
AO-->AZ
AO-->AT
AO-->AY
AQ-->AS
AQ-->AU
AQ-->AV
AQ-->AW
AQ-->AX
AQ-->AT
AQ-->AY
AS-->AT
AZ-->AT
B0-->AW
B0-->AQ
B0-->AT
B1-->B2
B1-->AW
B1-->AQ
B1-->AZ
B1-->AT
B3-->AZ
B4-->AZ
B5-->AT
B7-->AT
BB-->BD
BE-->BD
BF-->BD
BI-->BK
BL-->BK
BP-->BR
BS-->BR
BW-->BY
BY-->BZ
C0-->BY
C1-->BY
C2-->BY
C3-->BY
C4-->BY
C8-->CA
CB-->CA
CC-->CA
CF-->CH
CI-->CH
CM-->CO
CS-->CU
CX-->CZ
D0-->CZ
D1-->CZ
D1-->D2
D6-->D8
D9-->D8
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
EZ-->F1
F1-->F2
F5-->F7
FB-->FD
FB-->FE
FH-->FJ
FM-->FO
FS-->FU
FV-->FU
FY-->G0
G1-->G0
G4-->G6
G6-->G7
G8-->G7
G9-->G7
GA-->G6
GD-->GF
GG-->GF
GH-->GF
GM-->GO
GO-->GP
GQ-->GO
GR-->GO
GS-->GP
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
J8-->J9
JC-->JE
JH-->JJ
JK-->JJ
JN-->JP
JS-->JU
JS-->JV
JS-->JW
JS-->JX
K2-->K4
K2-->K5
K5-->K4
K9-->KB
KB-->KC
KF-->KH
KH-->KI
KL-->KN
KL-->KP
KL-->KQ
KL-->KO
KN-->KO
KR-->KO
KU-->KW
KU-->KX
KU-->KY
KY-->KX
KZ-->KW
L2-->L4
L2-->L5
L5-->L4
L6-->L5
LA-->LC
LA-->LD
LD-->LC
LG-->LI
LM-->LO
LP-->LO
LT-->LV
LW-->LV
LZ-->M1
M2-->M1
M5-->M7
MA-->MC
MH-->MJ
MM-->MO
MM-->MP
MS-->MU
MV-->MW
N0-->N2
N5-->N7
NA-->NC
NH-->NJ
NH-->NK
NO-->NQ
NO-->NR
NS-->NR
NV-->NX
NV-->O8
NV-->NZ
NV-->O3
NV-->O9
NV-->OA
NV-->OB
NV-->OC
NV-->OD
NV-->OE
NV-->O0
NV-->O4
NV-->O2
NV-->NY
NV-->OF
NV-->O5
NV-->OG
NV-->O6
NV-->O1
NV-->OH
NV-->O7
NX-->NY
NY-->NX
NY-->NZ
NY-->O0
NY-->O2
NY-->O5
NY-->O6
NZ-->NY
O0-->NY
O0-->O1
O1-->O0
O2-->O3
O2-->O4
O2-->NY
O4-->O3
O4-->O2
O5-->O6
O5-->O7
O6-->O2
O6-->NY
O6-->O5
O8-->NY
O8-->O7
O9-->OA
OB-->O7
OC-->OA
OC-->O7
OD-->NY
OD-->O5
OF-->O7
OG-->OD
OL-->ON
OL-->OO
OL-->OP
OL-->OQ
OR-->ON
OS-->OQ
OV-->OX
OV-->OY
OV-->OZ
OV-->P0
OV-->P1
OV-->P2
OV-->P3
OV-->P4
OV-->P5
OV-->P6
OV-->P7
OV-->P8
OV-->P9
P5-->P4
PC-->PE
PC-->PJ
PC-->PM
PC-->PK
PC-->PO
PC-->PQ
PC-->PR
PC-->PI
PC-->PF
PC-->PS
PC-->PT
PC-->PV
PC-->PN
PC-->PW
PC-->PP
PC-->PU
PC-->PX
PC-->PY
PC-->PG
PC-->PL
PC-->PH
PE-->PF
PE-->PG
PE-->PH
PH-->PE
PH-->PI
PJ-->PK
PJ-->PL
PM-->PN
PO-->PK
PO-->PP
PO-->PL
PP-->PK
PP-->PG
PP-->PL
PQ-->PK
PQ-->PL
PS-->PF
PS-->PG
PS-->PH
PT-->PN
PT-->PU
PU-->PP
PU-->PG
PU-->PH
PV-->PR
PV-->PT
PW-->PP
PW-->PL
PX-->PU
PX-->PH
Q2-->Q4
Q2-->Q6
Q2-->Q7
Q2-->Q8
Q2-->Q9
Q2-->QA
Q2-->QB
Q2-->QC
Q2-->QD
Q2-->QE
Q2-->QF
Q2-->QG
Q2-->QH
Q2-->QI
Q2-->QJ
Q2-->QK
Q2-->QL
Q2-->Q5
Q4-->Q5
Q7-->Q5
QB-->Q5
QC-->Q5
QG-->Q5
QL-->Q5
QM-->Q4
QM-->QL
QM-->Q5
QN-->Q4
QO-->Q7
QO-->Q5
QP-->QB
QP-->Q5
QQ-->QC
QQ-->Q5
QR-->QC
QS-->QC
QT-->QC
QU-->QD
QV-->QD
QW-->QE
QX-->QG
QX-->Q5
QY-->QK
R1-->QL
R2-->Q5
R6-->R8
R6-->R9
R6-->RA
R6-->RC
R6-->RD
R6-->RE
R6-->RF
R6-->RG
R6-->RH
R6-->RI
R6-->RJ
R6-->RK
R6-->RB
R6-->RL
R6-->RM
R6-->RN
R6-->RO
R6-->RP
R6-->RQ
R6-->RR
RA-->RB
RL-->RB
RM-->RB
RS-->R8
RS-->RG
RS-->RP
RS-->RR
RT-->R8
RT-->RG
RT-->RP
RT-->RR
RU-->RA
RV-->RA
RW-->RA
RX-->RI
RY-->RI
RZ-->RB
S0-->RL
S0-->RQ
S1-->RL
S1-->RQ
S2-->RL
S2-->RQ
S3-->RL
S3-->RQ
S5-->R8
S5-->RM
S6-->RN
S7-->RP
SA-->SC
SF-->SH
SF-->SI
SO-->SR
SY-->T0
T1-->T0
T2-->T0
T3-->T0
T4-->T0
T7-->T9
T7-->TA
T7-->TC
T7-->TL
T7-->TD
T7-->TE
T7-->TM
T7-->TN
T7-->TH
T7-->TO
T7-->TP
T7-->TQ
T9-->TA
T9-->TC
T9-->TE
TC-->TD
TE-->TG
TE-->TJ
TE-->TK
TE-->TD
TG-->TH
TJ-->TH
TM-->TG
TM-->TJ
TM-->TK
TM-->TD
TO-->TC
TP-->T9
TQ-->TC
TT-->TV
TT-->TY
TT-->TZ
TT-->U0
TT-->TW
TT-->U1
TT-->TX
TT-->U2
TT-->U3
TV-->TW
TV-->TX
TX-->TW
TY-->TV
TZ-->TX
U1-->TV
U1-->TZ
U1-->TX
U2-->U1
U4-->TY
U5-->TY
U6-->TY
U7-->TY
U8-->TY
U9-->TV
UA-->TZ
UB-->U0
UC-->U1
UD-->TW
UD-->TX
UE-->U2
UF-->U3
