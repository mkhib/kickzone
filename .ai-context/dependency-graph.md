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
42["AdminProductEditor.color-validation.spec.tsx"]
43["AdminProductEditor.pants-range.spec.tsx"]
44["AdminProductEditor.spec.tsx"]
end
45["vite-env.d.ts"]
end
end
subgraph 46["products"]
subgraph 47["src"]
48["index.spec.tsx"]
49["index.ts"]
subgraph 4A["lib"]
4B["AdminProducts.tsx"]
4C["adminProducts.hooks.ts"]
4D["adminProducts.graphql.ts"]
4E["ProductImageManagementModal.tsx"]
4F["AdminProducts.spec.tsx"]
4G["ProductImageManagementModal.pants-size.spec.tsx"]
4H["ProductImageManagementModal.spec.tsx"]
end
4I["vite-env.d.ts"]
end
end
subgraph 4J["seller-management"]
subgraph 4K["src"]
4L["index.spec.tsx"]
4M["index.ts"]
subgraph 4N["lib"]
4O["SellerManagement.tsx"]
4P["SellerManagement.spec.tsx"]
end
4Q["vite-env.d.ts"]
end
end
subgraph 4R["translation-management"]
subgraph 4S["src"]
4T["index.ts"]
subgraph 4U["lib"]
4V["AdminTranslationManagement.tsx"]
4W["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4X["unauthorized"]
subgraph 4Y["src"]
4Z["index.spec.tsx"]
50["index.ts"]
subgraph 51["lib"]
52["admins-unauthorized-screen.tsx"]
53["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 54["zustand"]
subgraph 55["admins-products-store"]
subgraph 56["src"]
57["index.spec.ts"]
58["index.ts"]
subgraph 59["lib"]
5A["admins-products-store.ts"]
5B["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 5C["customers"]
subgraph 5D["components"]
subgraph 5E["footer"]
subgraph 5F["src"]
5G["index.ts"]
subgraph 5H["lib"]
5I["customers-footer.tsx"]
5J["TrustBadgeIcons.tsx"]
5K["customers-footer.spec.tsx"]
end
end
end
subgraph 5L["headerbar"]
subgraph 5M["src"]
5N["index.ts"]
subgraph 5O["lib"]
5P["CustomersHeaderbar.tsx"]
5Q["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5R["layout"]
subgraph 5S["src"]
5T["index.ts"]
subgraph 5U["lib"]
5V["CustomersLayout.tsx"]
5W["CustomersTabbar.tsx"]
5X["CustomersLayout.spec.tsx"]
5Y["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5Z["product-card"]
subgraph 60["src"]
61["index.ts"]
subgraph 62["lib"]
63["CustomersProductCard.tsx"]
64["CustomersProductCard.no-low-stock.spec.tsx"]
65["CustomersProductCard.pants-size.spec.tsx"]
66["CustomersProductCard.spec.tsx"]
end
67["vite-env.d.ts"]
end
end
end
subgraph 68["contexts"]
subgraph 69["auth"]
subgraph 6A["src"]
6B["index.ts"]
subgraph 6C["lib"]
6D["CustomersAuthContext.tsx"]
6E["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6F["graphql"]
subgraph 6G["src"]
6H["index.ts"]
subgraph 6I["lib"]
6J["customer-profile.queries.ts"]
6K["mutations.ts"]
6L["Provider.tsx"]
6M["CustomersApolloProvider.tsx"]
6N["client.ts"]
6O["queries.ts"]
6P["apollo-upload-client.d.ts"]
end
end
end
subgraph 6Q["hooks"]
subgraph 6R["auth"]
subgraph 6S["src"]
6T["index.ts"]
subgraph 6U["lib"]
6V["useCustomersForgotPassword.tsx"]
6W["useCustomersLogin.tsx"]
6X["useCustomersRegister.tsx"]
6Y["useCustomersResetPassword.tsx"]
6Z["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 70["cart"]
71["jest.config.ts"]
72["jest.setup.ts"]
subgraph 73["src"]
74["index.ts"]
subgraph 75["lib"]
76["customers-cart-hook.tsx"]
77["useCartService.ts"]
78["useWishlistSync.ts"]
79["useCartService.spec.tsx"]
7A["useCartSync.ts"]
end
end
end
subgraph 7B["orders"]
subgraph 7C["src"]
7D["index.ts"]
subgraph 7E["lib"]
7F["customers-orders-hook.tsx"]
end
end
end
subgraph 7G["products"]
subgraph 7H["src"]
7I["index.ts"]
subgraph 7J["lib"]
7K["customers-product-hook.tsx"]
end
end
end
end
subgraph 7L["router"]
subgraph 7M["src"]
7N["index.ts"]
subgraph 7O["lib"]
7P["CustomersRouter.tsx"]
7Q["ScrollToTop.tsx"]
7R["CustomersRouter.spec.tsx"]
7S["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7T["routes"]
subgraph 7U["src"]
7V["index.ts"]
subgraph 7W["lib"]
7X["customer-routes.ts"]
7Y["customer-routes.spec.ts"]
end
end
end
subgraph 7Z["screens"]
subgraph 80["contact"]
subgraph 81["src"]
82["index.ts"]
subgraph 83["lib"]
84["customer-contact.tsx"]
85["customer-contact.spec.tsx"]
86["customer-contact.validation.spec.tsx"]
end
end
87["vite.config.ts"]
end
subgraph 88["customer-checkout"]
subgraph 89["src"]
8A["index.ts"]
subgraph 8B["lib"]
8C["customer-checkout.tsx"]
end
end
end
subgraph 8D["customer-favorites"]
subgraph 8E["src"]
8F["index.ts"]
subgraph 8G["lib"]
8H["customer-favorites.tsx"]
8I["customer-favorites.shared-card.spec.tsx"]
8J["customer-favorites.spec.tsx"]
end
end
8K["vite.config.ts"]
end
subgraph 8L["customer-login"]
subgraph 8M["src"]
8N["index.ts"]
subgraph 8O["lib"]
8P["customer-login.tsx"]
end
end
end
subgraph 8Q["customer-order-confirmation"]
subgraph 8R["src"]
8S["index.ts"]
subgraph 8T["lib"]
8U["customer-order-confirmation.tsx"]
8V["customer-order-confirmation.pants-size.spec.tsx"]
8W["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8X["customer-orders"]
subgraph 8Y["src"]
8Z["index.ts"]
subgraph 90["lib"]
91["customer-orders.tsx"]
end
end
end
subgraph 92["customer-payment"]
subgraph 93["src"]
94["index.ts"]
subgraph 95["lib"]
96["customer-payment-callback.tsx"]
97["use-zarinpal-payment.tsx"]
98["zarinpal-payment-service.ts"]
99["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 9A["customer-products"]
subgraph 9B["src"]
9C["index.ts"]
subgraph 9D["lib"]
9E["customer-products.tsx"]
end
end
end
subgraph 9F["customer-profile"]
subgraph 9G["src"]
9H["index.ts"]
subgraph 9I["lib"]
9J["customer-profile.tsx"]
9K["customer-profile.spec.tsx"]
9L["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9M["customer-shopping-cart"]
subgraph 9N["src"]
9O["index.ts"]
subgraph 9P["lib"]
9Q["customer-shopping-cart.tsx"]
9R["customer-shopping-cart.pants-size.spec.tsx"]
9S["customer-shopping-cart.shipping-form.spec.tsx"]
9T["customer-shopping-cart.spec.tsx"]
end
end
9U["vite.config.ts"]
end
subgraph 9V["customer-signup"]
subgraph 9W["src"]
9X["index.ts"]
subgraph 9Y["lib"]
9Z["customer-signup.tsx"]
A0["customer-signup.password-length.spec.tsx"]
A1["customer-signup.spec.tsx"]
A2["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A3["forgot-password"]
subgraph A4["src"]
A5["index.ts"]
subgraph A6["lib"]
A7["customer-forgot-password.tsx"]
A8["customer-forgot-password.spec.tsx"]
A9["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph AA["guide-authenticity"]
subgraph AB["src"]
AC["index.ts"]
subgraph AD["lib"]
AE["customer-guide-authenticity.tsx"]
AF["customer-guide-authenticity.spec.tsx"]
end
end
AG["vite.config.ts"]
end
subgraph AH["guide-payment"]
subgraph AI["src"]
AJ["index.ts"]
subgraph AK["lib"]
AL["customer-guide-payment.tsx"]
AM["customer-guide-payment.spec.tsx"]
end
end
AN["vite.config.ts"]
end
subgraph AO["home"]
subgraph AP["src"]
AQ["index.ts"]
subgraph AR["lib"]
AS["CustomersHomeScreen.tsx"]
subgraph AT["components"]
AU["CategoryBentoSection.tsx"]
AW["HeroSection.tsx"]
AX["HomeLoadingScreen.tsx"]
AY["PicksRailSection.tsx"]
AZ["TrustStripSection.tsx"]
B4["NewArrivalsSection.tsx"]
B7["BrandBlocksSection.tsx"]
B8["NewsletterSection.tsx"]
B9["ShopTheLookSection.tsx"]
BA["TickerSection.tsx"]
end
AV["home-selectors.ts"]
B0["useScrollProgress.ts"]
B1["CustomersShopScreen.tsx"]
B2["CustomersHomeScreen.cart-size.spec.tsx"]
B3["CustomersHomeScreen.spec.tsx"]
B5["CustomersShopScreen.cart-size.spec.tsx"]
B6["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BB["login"]
subgraph BC["src"]
BD["index.ts"]
subgraph BE["lib"]
BF["CustomersLoginScreen.tsx"]
BG["CustomersLoginScreen.spec.tsx"]
BH["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BI["not-found"]
subgraph BJ["src"]
BK["index.ts"]
subgraph BL["lib"]
BM["customer-not-found.tsx"]
BN["customer-not-found.spec.tsx"]
end
end
BO["vite.config.ts"]
end
subgraph BP["privacy-policy"]
subgraph BQ["src"]
BR["index.ts"]
subgraph BS["lib"]
BT["customer-privacy-policy.tsx"]
BU["customer-privacy-policy.spec.tsx"]
end
end
BV["vite.config.ts"]
end
subgraph BW["product-details"]
subgraph BX["src"]
BY["index.ts"]
subgraph BZ["lib"]
C0["customer-product-details.tsx"]
C1["reviews-flag.ts"]
C2["customer-product-details.guarantee.spec.tsx"]
C3["customer-product-details.no-low-stock.spec.tsx"]
C4["customer-product-details.pants-size.spec.tsx"]
C5["customer-product-details.reviews-hidden.spec.tsx"]
C6["customer-product-details.spec.tsx"]
end
end
C7["vite.config.ts"]
end
subgraph C8["reset-password"]
subgraph C9["src"]
CA["index.ts"]
subgraph CB["lib"]
CC["customer-reset-password.tsx"]
CD["customer-reset-password.password-length.spec.tsx"]
CE["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CF["shipping-returns"]
subgraph CG["src"]
CH["index.ts"]
subgraph CI["lib"]
CJ["customer-shipping-returns.tsx"]
CK["customer-shipping-returns.spec.tsx"]
end
end
CL["vite.config.ts"]
end
subgraph CM["unauthorized"]
subgraph CN["src"]
CO["index.ts"]
subgraph CP["lib"]
CQ["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CR["utility"]
subgraph CS["test"]
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["customers-test-utility.tsx"]
end
end
end
end
subgraph CX["validations"]
subgraph CY["src"]
CZ["index.ts"]
subgraph D0["lib"]
D1["shipping-validation.ts"]
D2["shipping-validation.shared.spec.ts"]
D3["shipping-validation.spec.tsx"]
D4["shipping-validation.tsx"]
end
end
end
subgraph D5["zustand"]
subgraph D6["customer-cart-store"]
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["customer-cart-store.ts"]
DB["customer-cart-store.spec.ts"]
DC["customer-cart-store.tsx"]
end
end
end
subgraph DD["customer-checkout-store"]
subgraph DE["src"]
DF["index.ts"]
subgraph DG["lib"]
DH["customer-checkout-store.ts"]
DI["customer-checkout-store.spec.ts"]
end
end
DJ["vite.config.ts"]
end
subgraph DK["customer-wishlist-store"]
subgraph DL["src"]
DM["index.ts"]
subgraph DN["lib"]
DO["customer-wishlist-store.ts"]
DP["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DQ["src"]
DR["index.ts"]
subgraph DS["lib"]
DT["customers-products-store.tsx"]
end
end
end
end
subgraph DU["sellers"]
subgraph DV["components"]
subgraph DW["footer"]
subgraph DX["src"]
DY["index.ts"]
subgraph DZ["lib"]
E0["sellers-footer.tsx"]
E1["sellers-footer.spec.tsx"]
end
end
end
subgraph E2["headerbar"]
subgraph E3["src"]
E4["index.ts"]
subgraph E5["lib"]
E6["SellersHeaderbar.tsx"]
end
end
end
subgraph E7["layout"]
subgraph E8["src"]
E9["index.ts"]
subgraph EA["lib"]
EB["SellersLayout.tsx"]
EC["SellersTabbar.tsx"]
end
end
end
end
subgraph ED["contexts"]
subgraph EE["auth"]
subgraph EF["src"]
EG["index.ts"]
subgraph EH["lib"]
EI["SellersAuthContext.tsx"]
EJ["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EK["graphql"]
subgraph EL["src"]
EM["index.ts"]
subgraph EN["lib"]
EO["fragments.ts"]
EP["mutations.ts"]
EQ["Provider.tsx"]
ER["SellersApolloProvider.tsx"]
ES["client.ts"]
ET["queries.ts"]
EU["seller-orders.graphql.ts"]
EV["apollo-upload-client.d.ts"]
end
subgraph EW["types"]
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
GV["seller-status-transitions.spec.ts"]
end
GW["test-setup.ts"]
end
end
subgraph GX["setup-password"]
subgraph GY["src"]
GZ["index.ts"]
subgraph H0["lib"]
H1["SellersSetupPassword.tsx"]
H2["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H3["unauthorized"]
subgraph H4["src"]
H5["index.ts"]
subgraph H6["lib"]
H7["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H8["zustand"]
subgraph H9["sellers-products-store"]
subgraph HA["src"]
HB["index.ts"]
subgraph HC["lib"]
HD["useSellersProductsStore.ts"]
HE["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HF["shared"]
subgraph HG["components"]
subgraph HH["apollo-provider-base"]
subgraph HI["src"]
HJ["index.ts"]
subgraph HK["lib"]
HL["ApolloProviderBase.tsx"]
HM["createSilentRefreshAuthLink.ts"]
HN["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HO["error-boundary"]
subgraph HP["src"]
HQ["index.ts"]
subgraph HR["lib"]
HS["error-boundary.tsx"]
HT["error-boundary.spec.tsx"]
end
end
HU["vite.config.ts"]
end
subgraph HV["glassmorphism-container"]
subgraph HW["src"]
HX["index.ts"]
subgraph HY["lib"]
HZ["glassmorphism-container.tsx"]
I0["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I1["layout"]
subgraph I2["src"]
I3["index.ts"]
subgraph I4["lib"]
I5["Layout.tsx"]
end
end
end
subgraph I6["material-data-table"]
subgraph I7["src"]
I8["index.ts"]
subgraph I9["lib"]
IA["material-data-table.tsx"]
IB["table-config.ts"]
IC["table-utils.ts"]
ID["material-data-table.spec.tsx"]
IE["table-types.ts"]
end
end
end
subgraph IF["order-status-chip"]
subgraph IG["src"]
IH["index.ts"]
subgraph II["lib"]
IJ["order-status-chip.tsx"]
IK["order-status-chip.spec.tsx"]
end
end
end
subgraph IL["password-field"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["PasswordTextField.tsx"]
end
end
end
subgraph IQ["price-display"]
subgraph IR["src"]
IS["index.ts"]
subgraph IT["lib"]
IU["price-display.tsx"]
IV["price-display.spec.tsx"]
end
end
end
subgraph IW["private-route"]
subgraph IX["src"]
IY["index.ts"]
subgraph IZ["lib"]
J0["createPrivateRoute.tsx"]
J1["PrivateRoute.tsx"]
end
end
end
subgraph J2["rtl-table-utils"]
subgraph J3["src"]
J4["index.ts"]
subgraph J5["lib"]
J6["rtl-table-utils.ts"]
J7["rtl-cell-components.tsx"]
J8["rtl-column-helpers.ts"]
J9["rtl-table-props.ts"]
JA["use-table-alignment.ts"]
JB["rtl-table-utils.spec.tsx"]
JC["rtl-table-utils.tsx"]
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
MY["sizes.spec.tsx"]
MZ["sizes.tsx"]
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
NG["shared-ui-store.tsx"]
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
R2["seller-info-validation.spec.ts"]
R3["taxonomy-validation.spec.ts"]
R4["translation.resolver.guards.spec.ts"]
subgraph R5["types"]
R6["graphql-upload.d.ts"]
end
R7["user.resolver.spec.ts"]
R8["zod-validation.pipe.spec.ts"]
end
end
end
subgraph R9["services"]
RA["jest.config.ts"]
subgraph RB["src"]
RC["index.ts"]
subgraph RD["lib"]
RE["auth.service.ts"]
RF["brand.service.ts"]
RG["cart.service.ts"]
RH["product-info-colors.util.ts"]
RI["category.service.ts"]
RJ["color.service.ts"]
RK["currency.service.ts"]
RL["customer-profile.service.ts"]
RM["email.service.ts"]
RN["image-upload.service.ts"]
RO["order.service.ts"]
RP["payment-logger.service.ts"]
RQ["payment.service.ts"]
RR["product.service.ts"]
RS["seller-info.service.ts"]
RT["shipping-calculation.service.ts"]
RU["site-language.service.ts"]
RV["token.service.ts"]
RW["translation.service.ts"]
RX["user.service.ts"]
RY["auth.service.password-policy.spec.ts"]
RZ["auth.service.spec.ts"]
S0["cart.service.add-quantity.spec.ts"]
S1["cart.service.null-relations.spec.ts"]
S2["cart.service.spec.ts"]
S3["order.service.spec.ts"]
S4["order.service.tracking.spec.ts"]
S5["product-info-colors.util.spec.ts"]
S6["product.service.multi-filters.spec.ts"]
S7["product.service.only-discounted.spec.ts"]
S8["product.service.pants.spec.ts"]
S9["product.service.spec.ts"]
SA["relay-connection.spec.ts"]
SB["seller-info.service.price-validation.spec.ts"]
SC["shipping-calculation.service.spec.ts"]
SD["token.service.spec.ts"]
end
end
end
subgraph SE["strategies"]
subgraph SF["src"]
SG["index.ts"]
subgraph SH["lib"]
SI["local.strategy.ts"]
end
end
end
subgraph SJ["utils"]
subgraph SK["src"]
SL["index.ts"]
subgraph SM["lib"]
SN["email-templates.ts"]
SO["relay-connection.ts"]
SP["pagination.ts"]
end
end
end
end
subgraph SQ["shared"]
subgraph SR["codegen"]
SS["jest.config.ts"]
subgraph ST["src"]
SU["index.ts"]
subgraph SV["lib"]
subgraph SW["generated"]
SX["graphql.ts"]
end
end
end
end
subgraph SY["graphql-schema"]
SZ["jest.config.ts"]
subgraph T0["src"]
T1["index.ts"]
end
end
subgraph T2["product-sizes"]
subgraph T3["src"]
T4["index.ts"]
subgraph T5["lib"]
T6["product-sizes.ts"]
T7["product-sizes.pants-formats.spec.ts"]
T8["product-sizes.pants-label.spec.ts"]
T9["product-sizes.pants-strict.spec.ts"]
TA["product-sizes.spec.ts"]
end
end
end
subgraph TB["shared-i18n"]
subgraph TC["src"]
TD["index.ts"]
subgraph TE["lib"]
TF["language-context.tsx"]
TG["language-detector.ts"]
subgraph TH["locales"]
TI["i18n-react.tsx"]
TJ["i18n-util.ts"]
TK["i18n-util.async.ts"]
subgraph TL["en"]
TM["index.ts"]
end
subgraph TO["fa"]
TP["index.ts"]
end
TQ["formatters.ts"]
TR["i18n-types.ts"]
TS["i18n-util.sync.ts"]
TT["navigator-detector.ts"]
end
TN["site-name.ts"]
TU["table-localization.ts"]
TV["theme-provider.tsx"]
TW["use-page-title.ts"]
end
end
end
subgraph TX["validation"]
subgraph TY["src"]
TZ["index.ts"]
subgraph U0["lib"]
U1["auth.ts"]
U2["limits.ts"]
U3["primitives.ts"]
U4["auth-forms.ts"]
U5["cart.ts"]
U6["catalog.ts"]
U7["contact.ts"]
U8["currency.ts"]
U9["taxonomy.ts"]
UA["errors.ts"]
UB["order.ts"]
UC["profile.ts"]
UD["seller.ts"]
UE["auth-forms.admin.spec.ts"]
UF["auth-forms.login.spec.ts"]
UG["auth-forms.recovery.spec.ts"]
UH["auth-forms.seller.spec.ts"]
UI["auth-forms.spec.ts"]
UJ["auth.spec.ts"]
UK["cart.spec.ts"]
UL["catalog.spec.ts"]
UM["contact.spec.ts"]
UN["currency.spec.ts"]
UO["errors.spec.ts"]
UP["order.spec.ts"]
UQ["primitives.spec.ts"]
UR["profile.spec.ts"]
US["seller.spec.ts"]
UT["taxonomy.spec.ts"]
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
44-->41
48-->49
49-->4B
4B-->4C
4B-->4E
4C-->4D
4F-->4B
4G-->4E
4L-->4M
4M-->4O
4P-->4O
4T-->4V
4V-->4W
4Z-->50
50-->52
53-->52
57-->58
58-->5A
5B-->5A
5G-->5I
5G-->5J
5I-->5J
5K-->5I
5N-->5P
5Q-->5P
5T-->5V
5T-->5W
5V-->5W
5X-->5V
5Y-->5W
61-->63
64-->63
65-->63
66-->63
6B-->6D
6E-->6D
6H-->6J
6H-->6K
6H-->6L
6H-->6O
6L-->6M
6M-->6N
6T-->6V
6T-->6W
6T-->6X
6T-->6Y
6Z-->6W
74-->76
74-->77
74-->78
79-->77
7A-->76
7D-->7F
7I-->7K
7N-->7P
7N-->7Q
7P-->7Q
7R-->7P
7S-->7Q
7V-->7X
7Y-->7X
82-->84
85-->84
86-->84
8A-->8C
8F-->8H
8I-->8H
8J-->8H
8N-->8P
8S-->8U
8V-->8U
8W-->8U
8Z-->91
94-->96
94-->97
94-->98
96-->97
97-->98
99-->96
9C-->9E
9H-->9J
9K-->9J
9L-->9J
9O-->9Q
9R-->9Q
9S-->9Q
9T-->9Q
9X-->9Z
A0-->9Z
A1-->9Z
A2-->9Z
A5-->A7
A8-->A7
A9-->A7
AC-->AE
AF-->AE
AJ-->AL
AM-->AL
AQ-->AS
AQ-->B1
AQ-->AV
AQ-->B0
AS-->AU
AS-->AW
AS-->AX
AS-->AY
AS-->AZ
AS-->AV
AS-->B0
AU-->AV
B1-->AV
B2-->AY
B2-->AS
B2-->AV
B3-->B4
B3-->AY
B3-->AS
B3-->B1
B3-->AV
B5-->B1
B6-->B1
B7-->AV
B9-->AV
BD-->BF
BG-->BF
BH-->BF
BK-->BM
BN-->BM
BR-->BT
BU-->BT
BY-->C0
C0-->C1
C2-->C0
C3-->C0
C4-->C0
C5-->C0
C6-->C0
CA-->CC
CD-->CC
CE-->CC
CH-->CJ
CK-->CJ
CO-->CQ
CU-->CW
CZ-->D1
D2-->D1
D3-->D1
D3-->D4
D8-->DA
DB-->DA
DF-->DH
DI-->DH
DM-->DO
DP-->DO
DR-->DT
DY-->E0
E1-->E0
E4-->E6
E9-->EB
E9-->EC
EB-->EC
EG-->EI
EJ-->EI
EM-->EO
EM-->EP
EM-->EQ
EM-->ET
EQ-->ER
ER-->ES
ET-->EO
ET-->EU
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
GV-->GS
GZ-->H1
H2-->H1
H5-->H7
HB-->HD
HJ-->HL
HJ-->HM
HN-->HM
HQ-->HS
HT-->HS
HX-->HZ
I0-->HZ
I3-->I5
I8-->IA
I8-->IB
I8-->IC
IA-->IB
ID-->IA
IH-->IJ
IK-->IJ
IN-->IP
IS-->IU
IV-->IU
IY-->J0
J0-->J1
J4-->J6
J6-->J7
J6-->J8
J6-->J9
J6-->JA
J8-->J7
J8-->J9
JB-->JC
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
MY-->MZ
N3-->N5
N8-->NA
ND-->NF
NK-->NM
NK-->NN
NR-->NT
NR-->NU
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
R2-->QJ
R2-->Q8
R3-->Q9
R3-->QB
R3-->QC
R3-->QL
R3-->Q8
R4-->QN
R7-->QO
R8-->Q8
RC-->RE
RC-->RF
RC-->RG
RC-->RI
RC-->RJ
RC-->RK
RC-->RL
RC-->RM
RC-->RN
RC-->RO
RC-->RP
RC-->RQ
RC-->RH
RC-->RR
RC-->RS
RC-->RT
RC-->RU
RC-->RV
RC-->RW
RC-->RX
RG-->RH
RR-->RH
RS-->RH
RY-->RE
RY-->RM
RY-->RV
RY-->RX
RZ-->RE
RZ-->RM
RZ-->RV
RZ-->RX
S0-->RG
S1-->RG
S2-->RG
S3-->RO
S4-->RO
S5-->RH
S6-->RR
S6-->RW
S7-->RR
S7-->RW
S8-->RR
S8-->RW
S9-->RR
S9-->RW
SB-->RE
SB-->RS
SC-->RT
SD-->RV
SG-->SI
SL-->SN
SL-->SO
SU-->SX
T4-->T6
T7-->T6
T8-->T6
T9-->T6
TA-->T6
TD-->TF
TD-->TG
TD-->TI
TD-->TR
TD-->TJ
TD-->TK
TD-->TS
TD-->TT
TD-->TN
TD-->TU
TD-->TV
TD-->TW
TF-->TG
TF-->TI
TF-->TK
TI-->TJ
TK-->TM
TK-->TP
TK-->TQ
TK-->TJ
TM-->TN
TP-->TN
TS-->TM
TS-->TP
TS-->TQ
TS-->TJ
TU-->TI
TV-->TF
TW-->TI
TZ-->U1
TZ-->U4
TZ-->U5
TZ-->U6
TZ-->U7
TZ-->U8
TZ-->UA
TZ-->U2
TZ-->UB
TZ-->U3
TZ-->UC
TZ-->UD
TZ-->U9
U1-->U2
U1-->U3
U3-->U2
U4-->U1
U5-->U3
U8-->U9
UB-->U1
UB-->U5
UB-->U3
UC-->UB
UE-->U4
UF-->U4
UG-->U4
UH-->U4
UI-->U4
UJ-->U1
UK-->U5
UL-->U6
UM-->U7
UN-->U8
UO-->UA
UP-->UB
UQ-->U2
UQ-->U3
UR-->UC
US-->UD
UT-->U9
