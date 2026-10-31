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
BV["reviews-flag.ts"]
BW["customer-product-details.guarantee.spec.tsx"]
BX["customer-product-details.no-low-stock.spec.tsx"]
BY["customer-product-details.pants-size.spec.tsx"]
BZ["customer-product-details.reviews-hidden.spec.tsx"]
C0["customer-product-details.spec.tsx"]
end
end
C1["vite.config.ts"]
end
subgraph C2["reset-password"]
subgraph C3["src"]
C4["index.ts"]
subgraph C5["lib"]
C6["customer-reset-password.tsx"]
C7["customer-reset-password.password-length.spec.tsx"]
C8["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph C9["shipping-returns"]
subgraph CA["src"]
CB["index.ts"]
subgraph CC["lib"]
CD["customer-shipping-returns.tsx"]
CE["customer-shipping-returns.spec.tsx"]
end
end
CF["vite.config.ts"]
end
subgraph CG["unauthorized"]
subgraph CH["src"]
CI["index.ts"]
subgraph CJ["lib"]
CK["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CL["utility"]
subgraph CM["test"]
subgraph CN["src"]
CO["index.ts"]
subgraph CP["lib"]
CQ["customers-test-utility.tsx"]
end
end
end
end
subgraph CR["validations"]
subgraph CS["src"]
CT["index.ts"]
subgraph CU["lib"]
CV["shipping-validation.ts"]
CW["shipping-validation.spec.tsx"]
CX["shipping-validation.tsx"]
end
end
end
subgraph CY["zustand"]
subgraph CZ["customer-cart-store"]
subgraph D0["src"]
D1["index.ts"]
subgraph D2["lib"]
D3["customer-cart-store.ts"]
D4["customer-cart-store.spec.ts"]
D5["customer-cart-store.tsx"]
end
end
end
subgraph D6["customer-checkout-store"]
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["customer-checkout-store.ts"]
DB["customer-checkout-store.spec.ts"]
end
end
DC["vite.config.ts"]
end
subgraph DD["customer-wishlist-store"]
subgraph DE["src"]
DF["index.ts"]
subgraph DG["lib"]
DH["customer-wishlist-store.ts"]
DI["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DJ["src"]
DK["index.ts"]
subgraph DL["lib"]
DM["customers-products-store.tsx"]
end
end
end
end
subgraph DN["sellers"]
subgraph DO["components"]
subgraph DP["footer"]
subgraph DQ["src"]
DR["index.ts"]
subgraph DS["lib"]
DT["sellers-footer.tsx"]
DU["sellers-footer.spec.tsx"]
end
end
end
subgraph DV["headerbar"]
subgraph DW["src"]
DX["index.ts"]
subgraph DY["lib"]
DZ["SellersHeaderbar.tsx"]
end
end
end
subgraph E0["layout"]
subgraph E1["src"]
E2["index.ts"]
subgraph E3["lib"]
E4["SellersLayout.tsx"]
E5["SellersTabbar.tsx"]
end
end
end
end
subgraph E6["contexts"]
subgraph E7["auth"]
subgraph E8["src"]
E9["index.ts"]
subgraph EA["lib"]
EB["SellersAuthContext.tsx"]
EC["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph ED["graphql"]
subgraph EE["src"]
EF["index.ts"]
subgraph EG["lib"]
EH["fragments.ts"]
EI["mutations.ts"]
EJ["Provider.tsx"]
EK["SellersApolloProvider.tsx"]
EL["client.ts"]
EM["queries.ts"]
EN["seller-orders.graphql.ts"]
EO["apollo-upload-client.d.ts"]
end
subgraph EP["types"]
EQ["apollo-upload-client.d.ts"]
end
end
end
subgraph ER["hooks"]
subgraph ES["auth"]
subgraph ET["src"]
EU["index.ts"]
subgraph EV["lib"]
EW["useSellerAuth.ts"]
EX["sellerAuth.graphql.ts"]
end
end
end
subgraph EY["orders"]
subgraph EZ["src"]
F0["index.ts"]
subgraph F1["lib"]
F2["useSellerOrders.ts"]
F3["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph F4["products"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["useSellersProductManagement.ts"]
F9["useSellersProducts.ts"]
end
end
end
end
subgraph FA["router"]
subgraph FB["src"]
FC["index.ts"]
subgraph FD["lib"]
FE["SellersRouter.tsx"]
end
end
end
subgraph FF["routes"]
subgraph FG["src"]
FH["index.ts"]
subgraph FI["lib"]
FJ["seller-routes.ts"]
end
end
end
subgraph FK["screens"]
subgraph FL["catalog"]
subgraph FM["src"]
FN["index.ts"]
subgraph FO["lib"]
FP["SellersCatalogScreens.tsx"]
FQ["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FR["login"]
subgraph FS["src"]
FT["index.ts"]
subgraph FU["lib"]
FV["SellersLogin.tsx"]
FW["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph FX["manage-product"]
subgraph FY["src"]
FZ["index.ts"]
subgraph G0["lib"]
G1["SellersManageProductScreen.tsx"]
G2["SellersDefineProductFlow.tsx"]
G3["SellersDefineProductFlow.pants-label.spec.tsx"]
G4["SellersDefineProductFlow.spec.tsx"]
G5["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph G6["products"]
subgraph G7["src"]
G8["index.ts"]
subgraph G9["lib"]
GA["SellersProducts.tsx"]
GB["SellersProducts.pants-label.spec.tsx"]
GC["SellersProducts.spec.tsx"]
end
end
end
subgraph GD["seller-orders"]
GE["jest.config.ts"]
GF["jest.setup.ts"]
subgraph GG["src"]
GH["index.ts"]
subgraph GI["lib"]
GJ["seller-orders-screen.tsx"]
GK["seller-status-transitions.ts"]
GL["seller-orders-screen.pants-size.spec.tsx"]
GM["seller-orders-screen.spec.tsx"]
GN["seller-status-transitions.spec.ts"]
end
GO["test-setup.ts"]
end
end
subgraph GP["setup-password"]
subgraph GQ["src"]
GR["index.ts"]
subgraph GS["lib"]
GT["SellersSetupPassword.tsx"]
GU["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GV["unauthorized"]
subgraph GW["src"]
GX["index.ts"]
subgraph GY["lib"]
GZ["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H0["zustand"]
subgraph H1["sellers-products-store"]
subgraph H2["src"]
H3["index.ts"]
subgraph H4["lib"]
H5["useSellersProductsStore.ts"]
H6["sellers-products-store.tsx"]
end
end
end
end
end
subgraph H7["shared"]
subgraph H8["components"]
subgraph H9["apollo-provider-base"]
subgraph HA["src"]
HB["index.ts"]
subgraph HC["lib"]
HD["ApolloProviderBase.tsx"]
HE["createSilentRefreshAuthLink.ts"]
HF["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HG["error-boundary"]
subgraph HH["src"]
HI["index.ts"]
subgraph HJ["lib"]
HK["error-boundary.tsx"]
HL["error-boundary.spec.tsx"]
end
end
HM["vite.config.ts"]
end
subgraph HN["glassmorphism-container"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["glassmorphism-container.tsx"]
HS["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HT["layout"]
subgraph HU["src"]
HV["index.ts"]
subgraph HW["lib"]
HX["Layout.tsx"]
end
end
end
subgraph HY["material-data-table"]
subgraph HZ["src"]
I0["index.ts"]
subgraph I1["lib"]
I2["material-data-table.tsx"]
I3["table-config.ts"]
I4["table-utils.ts"]
I5["material-data-table.spec.tsx"]
I6["table-types.ts"]
end
end
end
subgraph I7["order-status-chip"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["order-status-chip.tsx"]
IC["order-status-chip.spec.tsx"]
end
end
end
subgraph ID["password-field"]
subgraph IE["src"]
IF["index.ts"]
subgraph IG["lib"]
IH["PasswordTextField.tsx"]
end
end
end
subgraph II["price-display"]
subgraph IJ["src"]
IK["index.ts"]
subgraph IL["lib"]
IM["price-display.tsx"]
IN["price-display.spec.tsx"]
end
end
end
subgraph IO["private-route"]
subgraph IP["src"]
IQ["index.ts"]
subgraph IR["lib"]
IS["createPrivateRoute.tsx"]
IT["PrivateRoute.tsx"]
end
end
end
subgraph IU["rtl-table-utils"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["rtl-table-utils.ts"]
IZ["rtl-cell-components.tsx"]
J0["rtl-column-helpers.ts"]
J1["rtl-table-props.ts"]
J2["use-table-alignment.ts"]
J3["rtl-table-utils.spec.tsx"]
J4["rtl-table-utils.tsx"]
end
end
end
subgraph J5["snackbar"]
subgraph J6["src"]
J7["index.ts"]
subgraph J8["lib"]
J9["snackbar.tsx"]
JA["Snackbar.tsx"]
end
end
end
subgraph JB["styled-drawer"]
subgraph JC["src"]
JD["index.ts"]
subgraph JE["lib"]
JF["styled-drawer.tsx"]
JG["styled-drawer.spec.tsx"]
end
end
end
subgraph JH["unauthorized"]
subgraph JI["src"]
JJ["index.ts"]
subgraph JK["lib"]
JL["unauthorized-path.tsx"]
end
end
end
end
subgraph JM["graphql"]
subgraph JN["src"]
JO["index.ts"]
subgraph JP["lib"]
JQ["currency.mutations.ts"]
JR["currency.queries.ts"]
JS["fragments.ts"]
JT["variant-colors.ts"]
JU["client-shared-graphql.tsx"]
end
end
end
subgraph JV["hooks"]
subgraph JW["brands"]
subgraph JX["src"]
JY["index.ts"]
subgraph JZ["lib"]
K0["brands.graphql.ts"]
K1["useBrands.ts"]
end
end
K2["vite.config.ts"]
end
subgraph K3["categories"]
subgraph K4["src"]
K5["index.ts"]
subgraph K6["lib"]
K7["useCategories.ts"]
K8["categories.graphql.ts"]
end
end
end
subgraph K9["colors"]
subgraph KA["src"]
KB["index.ts"]
subgraph KC["lib"]
KD["useColors.ts"]
KE["color.graphql.ts"]
end
end
end
subgraph KF["currency"]
subgraph KG["src"]
KH["index.ts"]
subgraph KI["lib"]
KJ["useConvertPrice.tsx"]
KK["useExchangeRate.tsx"]
KL["useCurrencies.tsx"]
KM["useCurrencyForLocale.tsx"]
KN["useExchangeRate.spec.tsx"]
end
end
end
subgraph KO["products"]
subgraph KP["src"]
KQ["index.ts"]
subgraph KR["lib"]
KS["productImage.ts"]
KT["products.graphql.ts"]
KU["useProducts.ts"]
KV["productImage.spec.ts"]
end
end
end
subgraph KW["site-languages"]
subgraph KX["src"]
KY["index.ts"]
subgraph KZ["lib"]
L0["site-languages.graphql.ts"]
L1["useSiteLanguages.ts"]
L2["site-languages-hook.spec.tsx"]
end
end
L3["vite.config.ts"]
end
subgraph L4["snackbar"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["SnackbarContext.tsx"]
L9["useSnackbar.ts"]
end
end
end
subgraph LA["translations-management-hook"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["useTranslationsManagement.ts"]
end
end
end
end
subgraph LF["lottie"]
subgraph LG["empty-cart"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["lottie-empty-cart.tsx"]
LL["lottie-empty-cart.spec.tsx"]
end
end
LM["vite.config.ts"]
end
subgraph LN["loading"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["lottie-loading.tsx"]
LS["lottie-loading.spec.tsx"]
end
end
end
subgraph LT["success-check"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["lottie-success-check.tsx"]
LY["lottie-success-check.spec.tsx"]
end
end
end
subgraph LZ["unauthorized"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["lottie-unauthorized.tsx"]
end
end
end
end
subgraph M4["translations"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["mapApolloErrorToTranslationKey.ts"]
M9["WrapTranslation.tsx"]
end
end
end
subgraph MA["ui"]
subgraph MB["colors"]
subgraph MC["src"]
MD["index.ts"]
subgraph ME["lib"]
MF["colors.ts"]
end
end
end
subgraph MG["language-components"]
subgraph MH["src"]
MI["index.ts"]
subgraph MJ["lib"]
MK["language-components.tsx"]
ML["ltr-text-field.tsx"]
end
end
end
subgraph MM["sizes"]
subgraph MN["src"]
MO["index.ts"]
subgraph MP["lib"]
MQ["sizes.ts"]
MR["sizes.spec.tsx"]
MS["sizes.tsx"]
end
end
end
end
subgraph MT["zustand"]
subgraph MU["shared-auth-store"]
subgraph MV["src"]
MW["index.ts"]
subgraph MX["lib"]
MY["shared-auth-store.ts"]
end
end
end
subgraph MZ["shared-notification-store"]
subgraph N0["src"]
N1["index.ts"]
subgraph N2["lib"]
N3["shared-notification-store.tsx"]
end
end
end
subgraph N4["shared-ui-store"]
subgraph N5["src"]
N6["index.ts"]
subgraph N7["lib"]
N8["shared-ui-store.ts"]
N9["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NA["server"]
subgraph NB["controllers"]
subgraph NC["src"]
ND["index.ts"]
subgraph NE["lib"]
NF["auth.controller.ts"]
NG["order.controller.ts"]
end
end
end
subgraph NH["decorators"]
NI["jest.config.ts"]
subgraph NJ["src"]
NK["index.ts"]
subgraph NL["lib"]
NM["current-user.decorator.ts"]
NN["decorators.ts"]
NO["decorators.spec.ts"]
end
end
end
subgraph NP["entities"]
subgraph NQ["src"]
NR["index.ts"]
subgraph NS["lib"]
NT["brand.entity.ts"]
NU["product.entity.ts"]
NV["category.entity.ts"]
NW["product-description.entity.ts"]
NX["site-language.entity.ts"]
NY["product-info.entity.ts"]
NZ["color.entity.ts"]
O0["product-info-color.entity.ts"]
O1["seller-info.entity.ts"]
O2["seller-product.entity.ts"]
O3["user.entity.ts"]
O4["cart.entity.ts"]
O5["currency-preference.entity.ts"]
O6["currency.entity.ts"]
O7["customer.entity.ts"]
O8["exchange-rate.entity.ts"]
O9["order.entity.ts"]
OA["platform-settings.entity.ts"]
OB["refresh-token.entity.ts"]
OC["seller-order.entity.ts"]
OD["translation.entity.ts"]
end
end
end
subgraph OE["guards"]
OF["jest.config.ts"]
subgraph OG["src"]
OH["index.ts"]
subgraph OI["lib"]
OJ["catalog.guard.ts"]
OK["graphql-auth.guard.ts"]
OL["http-auth.guard.ts"]
OM["roles.guard.ts"]
ON["catalog.guard.spec.ts"]
OO["roles.guard.spec.ts"]
end
end
end
subgraph OP["inputs"]
subgraph OQ["src"]
OR["index.ts"]
subgraph OS["lib"]
OT["brand.input.ts"]
OU["cart.inputs.ts"]
OV["category.input.ts"]
OW["color.input.ts"]
OX["customer-auth.inputs.ts"]
OY["order-pagination.inputs.ts"]
OZ["order.inputs.ts"]
P0["product-info-filter.input.ts"]
P1["product.input.ts"]
P2["seller-order-pagination.inputs.ts"]
P3["seller.input.ts"]
P4["site-language.input.ts"]
P5["user.input.ts"]
end
end
end
subgraph P6["modules"]
subgraph P7["src"]
P8["index.ts"]
subgraph P9["lib"]
PA["auth.module.ts"]
PB["email.module.ts"]
PC["token.module.ts"]
PD["user.module.ts"]
PE["customer-profile.module.ts"]
PF["brand.module.ts"]
PG["catalog-guard.module.ts"]
PH["translation.module.ts"]
PI["cart.module.ts"]
PJ["platform-settings.module.ts"]
PK["category.module.ts"]
PL["product.module.ts"]
PM["color.module.ts"]
PN["currency.module.ts"]
PO["graphql-context.module.ts"]
PP["order.module.ts"]
PQ["seller-info.module.ts"]
PR["payment.module.ts"]
PS["product-info.module.ts"]
PT["seller-products.module.ts"]
PU["site-language.module.ts"]
end
end
end
subgraph PV["resolvers"]
PW["jest.config.ts"]
subgraph PX["src"]
PY["index.ts"]
subgraph PZ["lib"]
Q0["auth.resolver.ts"]
Q1["zod-validation.pipe.ts"]
Q2["brand.resolver.ts"]
Q3["cart.resolver.ts"]
Q4["category.resolver.ts"]
Q5["color.resolver.ts"]
Q6["currency.resolver.ts"]
Q7["customer-profile.resolver.ts"]
Q8["order.resolver.ts"]
Q9["payment.resolver.ts"]
QA["product-info.resolver.ts"]
QB["product.resolver.ts"]
QC["seller-info.resolver.ts"]
QD["shipping.resolver.ts"]
QE["site-language.resolver.ts"]
QF["translation.input.ts"]
QG["translation.resolver.ts"]
QH["user.resolver.ts"]
QI["auth-validation.spec.ts"]
QJ["auth.resolver.spec.ts"]
QK["cart-validation.spec.ts"]
QL["order.resolver.spec.ts"]
QM["order.resolver.status-transitions.spec.ts"]
QN["order.resolver.tracking.spec.ts"]
QO["payment.resolver.integration.spec.ts"]
QP["payment.resolver.spec.ts"]
QQ["product-info.resolver.spec.ts"]
QR["translation.resolver.guards.spec.ts"]
subgraph QS["types"]
QT["graphql-upload.d.ts"]
end
QU["user.resolver.spec.ts"]
QV["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QW["services"]
QX["jest.config.ts"]
subgraph QY["src"]
QZ["index.ts"]
subgraph R0["lib"]
R1["auth.service.ts"]
R2["brand.service.ts"]
R3["cart.service.ts"]
R4["product-info-colors.util.ts"]
R5["category.service.ts"]
R6["color.service.ts"]
R7["currency.service.ts"]
R8["customer-profile.service.ts"]
R9["email.service.ts"]
RA["image-upload.service.ts"]
RB["order.service.ts"]
RC["payment-logger.service.ts"]
RD["payment.service.ts"]
RE["product.service.ts"]
RF["seller-info.service.ts"]
RG["shipping-calculation.service.ts"]
RH["site-language.service.ts"]
RI["token.service.ts"]
RJ["translation.service.ts"]
RK["user.service.ts"]
RL["auth.service.password-policy.spec.ts"]
RM["auth.service.spec.ts"]
RN["cart.service.add-quantity.spec.ts"]
RO["cart.service.null-relations.spec.ts"]
RP["cart.service.spec.ts"]
RQ["order.service.spec.ts"]
RR["order.service.tracking.spec.ts"]
RS["product-info-colors.util.spec.ts"]
RT["product.service.pants.spec.ts"]
RU["product.service.spec.ts"]
RV["relay-connection.spec.ts"]
RW["seller-info.service.price-validation.spec.ts"]
RX["shipping-calculation.service.spec.ts"]
RY["token.service.spec.ts"]
end
end
end
subgraph RZ["strategies"]
subgraph S0["src"]
S1["index.ts"]
subgraph S2["lib"]
S3["local.strategy.ts"]
end
end
end
subgraph S4["utils"]
subgraph S5["src"]
S6["index.ts"]
subgraph S7["lib"]
S8["email-templates.ts"]
S9["relay-connection.ts"]
SA["pagination.ts"]
end
end
end
end
subgraph SB["shared"]
subgraph SC["codegen"]
SD["jest.config.ts"]
subgraph SE["src"]
SF["index.ts"]
subgraph SG["lib"]
subgraph SH["generated"]
SI["graphql.ts"]
end
end
end
end
subgraph SJ["graphql-schema"]
SK["jest.config.ts"]
subgraph SL["src"]
SM["index.ts"]
end
end
subgraph SN["product-sizes"]
subgraph SO["src"]
SP["index.ts"]
subgraph SQ["lib"]
SR["product-sizes.ts"]
SS["product-sizes.pants-formats.spec.ts"]
ST["product-sizes.pants-label.spec.ts"]
SU["product-sizes.pants-strict.spec.ts"]
SV["product-sizes.spec.ts"]
end
end
end
subgraph SW["shared-i18n"]
subgraph SX["src"]
SY["index.ts"]
subgraph SZ["lib"]
T0["language-context.tsx"]
T1["language-detector.ts"]
subgraph T2["locales"]
T3["i18n-react.tsx"]
T4["i18n-util.ts"]
T5["i18n-util.async.ts"]
subgraph T6["en"]
T7["index.ts"]
end
subgraph T9["fa"]
TA["index.ts"]
end
TB["formatters.ts"]
TC["i18n-types.ts"]
TD["i18n-util.sync.ts"]
TE["navigator-detector.ts"]
end
T8["site-name.ts"]
TF["table-localization.ts"]
TG["theme-provider.tsx"]
TH["use-page-title.ts"]
end
end
end
subgraph TI["validation"]
subgraph TJ["src"]
TK["index.ts"]
subgraph TL["lib"]
TM["auth.ts"]
TN["limits.ts"]
TO["primitives.ts"]
TP["auth-forms.ts"]
TQ["cart.ts"]
TR["errors.ts"]
TS["auth-forms.admin.spec.ts"]
TT["auth-forms.login.spec.ts"]
TU["auth-forms.recovery.spec.ts"]
TV["auth-forms.seller.spec.ts"]
TW["auth-forms.spec.ts"]
TX["auth.spec.ts"]
TY["cart.spec.ts"]
TZ["errors.spec.ts"]
U0["primitives.spec.ts"]
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
BU-->BV
BW-->BU
BX-->BU
BY-->BU
BZ-->BU
C0-->BU
C4-->C6
C7-->C6
C8-->C6
CB-->CD
CE-->CD
CI-->CK
CO-->CQ
CT-->CV
CW-->CV
CW-->CX
D1-->D3
D4-->D3
D8-->DA
DB-->DA
DF-->DH
DI-->DH
DK-->DM
DR-->DT
DU-->DT
DX-->DZ
E2-->E4
E2-->E5
E4-->E5
E9-->EB
EC-->EB
EF-->EH
EF-->EI
EF-->EJ
EF-->EM
EJ-->EK
EK-->EL
EM-->EH
EM-->EN
EU-->EW
EW-->EX
F0-->F2
F6-->F8
F6-->F9
FC-->FE
FH-->FJ
FN-->FP
FQ-->FP
FT-->FV
FW-->FV
FZ-->G1
G1-->G2
G3-->G2
G4-->G2
G5-->G1
G8-->GA
GB-->GA
GC-->GA
GH-->GJ
GJ-->GK
GL-->GJ
GM-->GJ
GN-->GK
GR-->GT
GU-->GT
GX-->GZ
H3-->H5
HB-->HD
HB-->HE
HF-->HE
HI-->HK
HL-->HK
HP-->HR
HS-->HR
HV-->HX
I0-->I2
I0-->I3
I0-->I4
I2-->I3
I5-->I2
I9-->IB
IC-->IB
IF-->IH
IK-->IM
IN-->IM
IQ-->IS
IS-->IT
IW-->IY
IY-->IZ
IY-->J0
IY-->J1
IY-->J2
J0-->IZ
J0-->J1
J3-->J4
J7-->J9
JD-->JF
JG-->JF
JJ-->JL
JO-->JQ
JO-->JR
JO-->JS
JO-->JT
JY-->K0
JY-->K1
K1-->K0
K5-->K7
K7-->K8
KB-->KD
KD-->KE
KH-->KJ
KH-->KL
KH-->KM
KH-->KK
KJ-->KK
KN-->KK
KQ-->KS
KQ-->KT
KQ-->KU
KU-->KT
KV-->KS
KY-->L0
KY-->L1
L1-->L0
L2-->L1
L6-->L8
L6-->L9
L9-->L8
LC-->LE
LI-->LK
LL-->LK
LP-->LR
LS-->LR
LV-->LX
LY-->LX
M1-->M3
M6-->M8
MD-->MF
MI-->MK
MI-->ML
MO-->MQ
MR-->MS
MW-->MY
N1-->N3
N6-->N8
ND-->NF
ND-->NG
NK-->NM
NK-->NN
NO-->NN
NR-->NT
NR-->O4
NR-->NV
NR-->NZ
NR-->O5
NR-->O6
NR-->O7
NR-->O8
NR-->O9
NR-->OA
NR-->NW
NR-->O0
NR-->NY
NR-->NU
NR-->OB
NR-->O1
NR-->OC
NR-->O2
NR-->NX
NR-->OD
NR-->O3
NT-->NU
NU-->NT
NU-->NV
NU-->NW
NU-->NY
NU-->O1
NU-->O2
NV-->NU
NW-->NU
NW-->NX
NX-->NW
NY-->NZ
NY-->O0
NY-->NU
O0-->NZ
O0-->NY
O1-->O2
O1-->O3
O2-->NY
O2-->NU
O2-->O1
O4-->NU
O4-->O3
O5-->O6
O7-->O3
O8-->O6
O8-->O3
O9-->NU
O9-->O1
OB-->O3
OC-->O9
OH-->OJ
OH-->OK
OH-->OL
OH-->OM
ON-->OJ
OO-->OM
OR-->OT
OR-->OU
OR-->OV
OR-->OW
OR-->OX
OR-->OY
OR-->OZ
OR-->P0
OR-->P1
OR-->P2
OR-->P3
OR-->P4
OR-->P5
P1-->P0
P8-->PA
P8-->PF
P8-->PI
P8-->PG
P8-->PK
P8-->PM
P8-->PN
P8-->PE
P8-->PB
P8-->PO
P8-->PP
P8-->PR
P8-->PJ
P8-->PS
P8-->PL
P8-->PQ
P8-->PT
P8-->PU
P8-->PC
P8-->PH
P8-->PD
PA-->PB
PA-->PC
PA-->PD
PD-->PA
PD-->PE
PF-->PG
PF-->PH
PI-->PJ
PK-->PG
PK-->PL
PK-->PH
PL-->PG
PL-->PC
PL-->PH
PM-->PG
PM-->PH
PO-->PB
PO-->PC
PO-->PD
PP-->PJ
PP-->PQ
PQ-->PL
PQ-->PC
PQ-->PD
PR-->PN
PR-->PP
PS-->PL
PS-->PH
PT-->PQ
PT-->PD
PY-->Q0
PY-->Q2
PY-->Q3
PY-->Q4
PY-->Q5
PY-->Q6
PY-->Q7
PY-->Q8
PY-->Q9
PY-->QA
PY-->QB
PY-->QC
PY-->QD
PY-->QE
PY-->QF
PY-->QG
PY-->QH
PY-->Q1
Q0-->Q1
Q3-->Q1
QH-->Q1
QI-->Q0
QI-->QH
QI-->Q1
QJ-->Q0
QK-->Q3
QK-->Q1
QL-->Q8
QM-->Q8
QN-->Q8
QO-->Q9
QP-->Q9
QQ-->QA
QR-->QG
QU-->QH
QV-->Q1
QZ-->R1
QZ-->R2
QZ-->R3
QZ-->R5
QZ-->R6
QZ-->R7
QZ-->R8
QZ-->R9
QZ-->RA
QZ-->RB
QZ-->RC
QZ-->RD
QZ-->R4
QZ-->RE
QZ-->RF
QZ-->RG
QZ-->RH
QZ-->RI
QZ-->RJ
QZ-->RK
R3-->R4
RE-->R4
RF-->R4
RL-->R1
RL-->R9
RL-->RI
RL-->RK
RM-->R1
RM-->R9
RM-->RI
RM-->RK
RN-->R3
RO-->R3
RP-->R3
RQ-->RB
RR-->RB
RS-->R4
RT-->RE
RT-->RJ
RU-->RE
RU-->RJ
RW-->R1
RW-->RF
RX-->RG
RY-->RI
S1-->S3
S6-->S8
S6-->S9
SF-->SI
SP-->SR
SS-->SR
ST-->SR
SU-->SR
SV-->SR
SY-->T0
SY-->T1
SY-->T3
SY-->TC
SY-->T4
SY-->T5
SY-->TD
SY-->TE
SY-->T8
SY-->TF
SY-->TG
SY-->TH
T0-->T1
T0-->T3
T0-->T5
T3-->T4
T5-->T7
T5-->TA
T5-->TB
T5-->T4
T7-->T8
TA-->T8
TD-->T7
TD-->TA
TD-->TB
TD-->T4
TF-->T3
TG-->T0
TH-->T3
TK-->TM
TK-->TP
TK-->TQ
TK-->TR
TK-->TN
TK-->TO
TM-->TN
TM-->TO
TO-->TN
TP-->TM
TQ-->TO
TS-->TP
TT-->TP
TU-->TP
TV-->TP
TW-->TP
TX-->TM
TY-->TQ
TZ-->TR
U0-->TN
U0-->TO
