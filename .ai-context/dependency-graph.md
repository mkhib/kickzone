flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.ts"]
5["cart-inputs.validation.spec.ts"]
6["global-validation-pipe.ts"]
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
end
end
end
subgraph 3B["currency-management"]
subgraph 3C["src"]
3D["index.ts"]
subgraph 3E["lib"]
3F["currency-management.tsx"]
3G["currency-management.spec.tsx"]
end
end
end
subgraph 3H["customer-management"]
subgraph 3I["src"]
3J["index.ts"]
subgraph 3K["lib"]
3L["admin-customer-management.tsx"]
3M["admin-customer-management.spec.tsx"]
end
end
3N["vite.config.ts"]
end
subgraph 3O["login"]
subgraph 3P["src"]
3Q["index.ts"]
subgraph 3R["lib"]
3S["AdminsLogin.tsx"]
3T["AdminsLogin.spec.tsx"]
3U["AdminsLogin.zod.spec.tsx"]
end
end
end
subgraph 3V["product-editor"]
subgraph 3W["src"]
3X["index.spec.tsx"]
3Y["index.ts"]
subgraph 3Z["lib"]
40["AdminProductEditor.tsx"]
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
4N["SellerManagement.spec.tsx"]
end
4O["vite-env.d.ts"]
end
end
subgraph 4P["translation-management"]
subgraph 4Q["src"]
4R["index.ts"]
subgraph 4S["lib"]
4T["AdminTranslationManagement.tsx"]
4U["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4V["unauthorized"]
subgraph 4W["src"]
4X["index.spec.tsx"]
4Y["index.ts"]
subgraph 4Z["lib"]
50["admins-unauthorized-screen.tsx"]
51["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 52["zustand"]
subgraph 53["admins-products-store"]
subgraph 54["src"]
55["index.spec.ts"]
56["index.ts"]
subgraph 57["lib"]
58["admins-products-store.ts"]
59["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 5A["customers"]
subgraph 5B["components"]
subgraph 5C["footer"]
subgraph 5D["src"]
5E["index.ts"]
subgraph 5F["lib"]
5G["customers-footer.tsx"]
5H["TrustBadgeIcons.tsx"]
5I["customers-footer.spec.tsx"]
end
end
end
subgraph 5J["headerbar"]
subgraph 5K["src"]
5L["index.ts"]
subgraph 5M["lib"]
5N["CustomersHeaderbar.tsx"]
5O["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5P["layout"]
subgraph 5Q["src"]
5R["index.ts"]
subgraph 5S["lib"]
5T["CustomersLayout.tsx"]
5U["CustomersTabbar.tsx"]
5V["CustomersLayout.spec.tsx"]
5W["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5X["product-card"]
subgraph 5Y["src"]
5Z["index.ts"]
subgraph 60["lib"]
61["CustomersProductCard.tsx"]
62["CustomersProductCard.pants-size.spec.tsx"]
63["CustomersProductCard.spec.tsx"]
end
64["vite-env.d.ts"]
end
end
end
subgraph 65["contexts"]
subgraph 66["auth"]
subgraph 67["src"]
68["index.ts"]
subgraph 69["lib"]
6A["CustomersAuthContext.tsx"]
6B["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6C["graphql"]
subgraph 6D["src"]
6E["index.ts"]
subgraph 6F["lib"]
6G["customer-profile.queries.ts"]
6H["mutations.ts"]
6I["Provider.tsx"]
6J["CustomersApolloProvider.tsx"]
6K["client.ts"]
6L["queries.ts"]
6M["apollo-upload-client.d.ts"]
end
end
end
subgraph 6N["hooks"]
subgraph 6O["auth"]
subgraph 6P["src"]
6Q["index.ts"]
subgraph 6R["lib"]
6S["useCustomersForgotPassword.tsx"]
6T["useCustomersLogin.tsx"]
6U["useCustomersRegister.tsx"]
6V["useCustomersResetPassword.tsx"]
6W["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6X["cart"]
6Y["jest.config.ts"]
6Z["jest.setup.ts"]
subgraph 70["src"]
71["index.ts"]
subgraph 72["lib"]
73["customers-cart-hook.tsx"]
74["useCartService.ts"]
75["useWishlistSync.ts"]
76["useCartService.spec.tsx"]
77["useCartSync.ts"]
end
end
end
subgraph 78["orders"]
subgraph 79["src"]
7A["index.ts"]
subgraph 7B["lib"]
7C["customers-orders-hook.tsx"]
end
end
end
subgraph 7D["products"]
subgraph 7E["src"]
7F["index.ts"]
subgraph 7G["lib"]
7H["customers-product-hook.tsx"]
end
end
end
end
subgraph 7I["router"]
subgraph 7J["src"]
7K["index.ts"]
subgraph 7L["lib"]
7M["CustomersRouter.tsx"]
7N["ScrollToTop.tsx"]
7O["CustomersRouter.spec.tsx"]
7P["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7Q["routes"]
subgraph 7R["src"]
7S["index.ts"]
subgraph 7T["lib"]
7U["customer-routes.ts"]
7V["customer-routes.spec.ts"]
end
end
end
subgraph 7W["screens"]
subgraph 7X["contact"]
subgraph 7Y["src"]
7Z["index.ts"]
subgraph 80["lib"]
81["customer-contact.tsx"]
82["customer-contact.spec.tsx"]
end
end
83["vite.config.ts"]
end
subgraph 84["customer-checkout"]
subgraph 85["src"]
86["index.ts"]
subgraph 87["lib"]
88["customer-checkout.tsx"]
end
end
end
subgraph 89["customer-favorites"]
subgraph 8A["src"]
8B["index.ts"]
subgraph 8C["lib"]
8D["customer-favorites.tsx"]
8E["customer-favorites.spec.tsx"]
end
end
8F["vite.config.ts"]
end
subgraph 8G["customer-login"]
subgraph 8H["src"]
8I["index.ts"]
subgraph 8J["lib"]
8K["customer-login.tsx"]
end
end
end
subgraph 8L["customer-order-confirmation"]
subgraph 8M["src"]
8N["index.ts"]
subgraph 8O["lib"]
8P["customer-order-confirmation.tsx"]
8Q["customer-order-confirmation.pants-size.spec.tsx"]
8R["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8S["customer-orders"]
subgraph 8T["src"]
8U["index.ts"]
subgraph 8V["lib"]
8W["customer-orders.tsx"]
end
end
end
subgraph 8X["customer-payment"]
subgraph 8Y["src"]
8Z["index.ts"]
subgraph 90["lib"]
91["customer-payment-callback.tsx"]
92["use-zarinpal-payment.tsx"]
93["zarinpal-payment-service.ts"]
94["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 95["customer-products"]
subgraph 96["src"]
97["index.ts"]
subgraph 98["lib"]
99["customer-products.tsx"]
end
end
end
subgraph 9A["customer-profile"]
subgraph 9B["src"]
9C["index.ts"]
subgraph 9D["lib"]
9E["customer-profile.tsx"]
9F["customer-profile.spec.tsx"]
end
end
end
subgraph 9G["customer-shopping-cart"]
subgraph 9H["src"]
9I["index.ts"]
subgraph 9J["lib"]
9K["customer-shopping-cart.tsx"]
9L["customer-shopping-cart.pants-size.spec.tsx"]
9M["customer-shopping-cart.spec.tsx"]
end
end
9N["vite.config.ts"]
end
subgraph 9O["customer-signup"]
subgraph 9P["src"]
9Q["index.ts"]
subgraph 9R["lib"]
9S["customer-signup.tsx"]
9T["customer-signup.password-length.spec.tsx"]
9U["customer-signup.spec.tsx"]
9V["customer-signup.zod.spec.tsx"]
end
end
end
subgraph 9W["forgot-password"]
subgraph 9X["src"]
9Y["index.ts"]
subgraph 9Z["lib"]
A0["customer-forgot-password.tsx"]
A1["customer-forgot-password.spec.tsx"]
A2["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A3["guide-authenticity"]
subgraph A4["src"]
A5["index.ts"]
subgraph A6["lib"]
A7["customer-guide-authenticity.tsx"]
A8["customer-guide-authenticity.spec.tsx"]
end
end
A9["vite.config.ts"]
end
subgraph AA["guide-payment"]
subgraph AB["src"]
AC["index.ts"]
subgraph AD["lib"]
AE["customer-guide-payment.tsx"]
AF["customer-guide-payment.spec.tsx"]
end
end
AG["vite.config.ts"]
end
subgraph AH["home"]
subgraph AI["src"]
AJ["index.ts"]
subgraph AK["lib"]
AL["CustomersHomeScreen.tsx"]
subgraph AM["components"]
AN["CategoryBentoSection.tsx"]
AP["HeroSection.tsx"]
AQ["HomeLoadingScreen.tsx"]
AR["PicksRailSection.tsx"]
AS["TrustStripSection.tsx"]
AX["NewArrivalsSection.tsx"]
AZ["BrandBlocksSection.tsx"]
B0["NewsletterSection.tsx"]
B1["ShopTheLookSection.tsx"]
B2["TickerSection.tsx"]
end
AO["home-selectors.ts"]
AT["useScrollProgress.ts"]
AU["CustomersShopScreen.tsx"]
AV["CustomersHomeScreen.cart-size.spec.tsx"]
AW["CustomersHomeScreen.spec.tsx"]
AY["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph B3["login"]
subgraph B4["src"]
B5["index.ts"]
subgraph B6["lib"]
B7["CustomersLoginScreen.tsx"]
B8["CustomersLoginScreen.spec.tsx"]
B9["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BA["not-found"]
subgraph BB["src"]
BC["index.ts"]
subgraph BD["lib"]
BE["customer-not-found.tsx"]
BF["customer-not-found.spec.tsx"]
end
end
BG["vite.config.ts"]
end
subgraph BH["privacy-policy"]
subgraph BI["src"]
BJ["index.ts"]
subgraph BK["lib"]
BL["customer-privacy-policy.tsx"]
BM["customer-privacy-policy.spec.tsx"]
end
end
BN["vite.config.ts"]
end
subgraph BO["product-details"]
subgraph BP["src"]
BQ["index.ts"]
subgraph BR["lib"]
BS["customer-product-details.tsx"]
BT["customer-product-details.pants-size.spec.tsx"]
BU["customer-product-details.spec.tsx"]
end
end
BV["vite.config.ts"]
end
subgraph BW["reset-password"]
subgraph BX["src"]
BY["index.ts"]
subgraph BZ["lib"]
C0["customer-reset-password.tsx"]
C1["customer-reset-password.password-length.spec.tsx"]
C2["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph C3["shipping-returns"]
subgraph C4["src"]
C5["index.ts"]
subgraph C6["lib"]
C7["customer-shipping-returns.tsx"]
C8["customer-shipping-returns.spec.tsx"]
end
end
C9["vite.config.ts"]
end
subgraph CA["unauthorized"]
subgraph CB["src"]
CC["index.ts"]
subgraph CD["lib"]
CE["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CF["utility"]
subgraph CG["test"]
subgraph CH["src"]
CI["index.ts"]
subgraph CJ["lib"]
CK["customers-test-utility.tsx"]
end
end
end
end
subgraph CL["validations"]
subgraph CM["src"]
CN["index.ts"]
subgraph CO["lib"]
CP["shipping-validation.ts"]
CQ["shipping-validation.spec.tsx"]
CR["shipping-validation.tsx"]
end
end
end
subgraph CS["zustand"]
subgraph CT["customer-cart-store"]
subgraph CU["src"]
CV["index.ts"]
subgraph CW["lib"]
CX["customer-cart-store.ts"]
CY["customer-cart-store.spec.ts"]
CZ["customer-cart-store.tsx"]
end
end
end
subgraph D0["customer-checkout-store"]
subgraph D1["src"]
D2["index.ts"]
subgraph D3["lib"]
D4["customer-checkout-store.ts"]
D5["customer-checkout-store.spec.ts"]
end
end
D6["vite.config.ts"]
end
subgraph D7["customer-wishlist-store"]
subgraph D8["src"]
D9["index.ts"]
subgraph DA["lib"]
DB["customer-wishlist-store.ts"]
DC["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DD["src"]
DE["index.ts"]
subgraph DF["lib"]
DG["customers-products-store.tsx"]
end
end
end
end
subgraph DH["sellers"]
subgraph DI["components"]
subgraph DJ["footer"]
subgraph DK["src"]
DL["index.ts"]
subgraph DM["lib"]
DN["sellers-footer.tsx"]
DO["sellers-footer.spec.tsx"]
end
end
end
subgraph DP["headerbar"]
subgraph DQ["src"]
DR["index.ts"]
subgraph DS["lib"]
DT["SellersHeaderbar.tsx"]
end
end
end
subgraph DU["layout"]
subgraph DV["src"]
DW["index.ts"]
subgraph DX["lib"]
DY["SellersLayout.tsx"]
DZ["SellersTabbar.tsx"]
end
end
end
end
subgraph E0["contexts"]
subgraph E1["auth"]
subgraph E2["src"]
E3["index.ts"]
subgraph E4["lib"]
E5["SellersAuthContext.tsx"]
E6["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E7["graphql"]
subgraph E8["src"]
E9["index.ts"]
subgraph EA["lib"]
EB["fragments.ts"]
EC["mutations.ts"]
ED["Provider.tsx"]
EE["SellersApolloProvider.tsx"]
EF["client.ts"]
EG["queries.ts"]
EH["seller-orders.graphql.ts"]
EI["apollo-upload-client.d.ts"]
end
subgraph EJ["types"]
EK["apollo-upload-client.d.ts"]
end
end
end
subgraph EL["hooks"]
subgraph EM["auth"]
subgraph EN["src"]
EO["index.ts"]
subgraph EP["lib"]
EQ["useSellerAuth.ts"]
ER["sellerAuth.graphql.ts"]
end
end
end
subgraph ES["orders"]
subgraph ET["src"]
EU["index.ts"]
subgraph EV["lib"]
EW["useSellerOrders.ts"]
EX["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph EY["products"]
subgraph EZ["src"]
F0["index.ts"]
subgraph F1["lib"]
F2["useSellersProductManagement.ts"]
F3["useSellersProducts.ts"]
end
end
end
end
subgraph F4["router"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["SellersRouter.tsx"]
end
end
end
subgraph F9["routes"]
subgraph FA["src"]
FB["index.ts"]
subgraph FC["lib"]
FD["seller-routes.ts"]
end
end
end
subgraph FE["screens"]
subgraph FF["catalog"]
subgraph FG["src"]
FH["index.ts"]
subgraph FI["lib"]
FJ["SellersCatalogScreens.tsx"]
FK["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FL["login"]
subgraph FM["src"]
FN["index.ts"]
subgraph FO["lib"]
FP["SellersLogin.tsx"]
FQ["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph FR["manage-product"]
subgraph FS["src"]
FT["index.ts"]
subgraph FU["lib"]
FV["SellersManageProductScreen.tsx"]
FW["SellersDefineProductFlow.tsx"]
FX["SellersDefineProductFlow.pants-label.spec.tsx"]
FY["SellersDefineProductFlow.spec.tsx"]
FZ["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph G0["products"]
subgraph G1["src"]
G2["index.ts"]
subgraph G3["lib"]
G4["SellersProducts.tsx"]
G5["SellersProducts.pants-label.spec.tsx"]
G6["SellersProducts.spec.tsx"]
end
end
end
subgraph G7["seller-orders"]
G8["jest.config.ts"]
G9["jest.setup.ts"]
subgraph GA["src"]
GB["index.ts"]
subgraph GC["lib"]
GD["seller-orders-screen.tsx"]
GE["seller-status-transitions.ts"]
GF["seller-orders-screen.pants-size.spec.tsx"]
GG["seller-orders-screen.spec.tsx"]
GH["seller-status-transitions.spec.ts"]
end
GI["test-setup.ts"]
end
end
subgraph GJ["setup-password"]
subgraph GK["src"]
GL["index.ts"]
subgraph GM["lib"]
GN["SellersSetupPassword.tsx"]
GO["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GP["unauthorized"]
subgraph GQ["src"]
GR["index.ts"]
subgraph GS["lib"]
GT["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GU["zustand"]
subgraph GV["sellers-products-store"]
subgraph GW["src"]
GX["index.ts"]
subgraph GY["lib"]
GZ["useSellersProductsStore.ts"]
H0["sellers-products-store.tsx"]
end
end
end
end
end
subgraph H1["shared"]
subgraph H2["components"]
subgraph H3["apollo-provider-base"]
subgraph H4["src"]
H5["index.ts"]
subgraph H6["lib"]
H7["ApolloProviderBase.tsx"]
H8["createSilentRefreshAuthLink.ts"]
H9["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HA["error-boundary"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["error-boundary.tsx"]
HF["error-boundary.spec.tsx"]
end
end
HG["vite.config.ts"]
end
subgraph HH["glassmorphism-container"]
subgraph HI["src"]
HJ["index.ts"]
subgraph HK["lib"]
HL["glassmorphism-container.tsx"]
HM["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HN["layout"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["Layout.tsx"]
end
end
end
subgraph HS["material-data-table"]
subgraph HT["src"]
HU["index.ts"]
subgraph HV["lib"]
HW["material-data-table.tsx"]
HX["table-config.ts"]
HY["table-utils.ts"]
HZ["material-data-table.spec.tsx"]
I0["table-types.ts"]
end
end
end
subgraph I1["order-status-chip"]
subgraph I2["src"]
I3["index.ts"]
subgraph I4["lib"]
I5["order-status-chip.tsx"]
I6["order-status-chip.spec.tsx"]
end
end
end
subgraph I7["password-field"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["PasswordTextField.tsx"]
end
end
end
subgraph IC["price-display"]
subgraph ID["src"]
IE["index.ts"]
subgraph IF["lib"]
IG["price-display.tsx"]
IH["price-display.spec.tsx"]
end
end
end
subgraph II["private-route"]
subgraph IJ["src"]
IK["index.ts"]
subgraph IL["lib"]
IM["createPrivateRoute.tsx"]
IN["PrivateRoute.tsx"]
end
end
end
subgraph IO["rtl-table-utils"]
subgraph IP["src"]
IQ["index.ts"]
subgraph IR["lib"]
IS["rtl-table-utils.ts"]
IT["rtl-cell-components.tsx"]
IU["rtl-column-helpers.ts"]
IV["rtl-table-props.ts"]
IW["use-table-alignment.ts"]
IX["rtl-table-utils.spec.tsx"]
IY["rtl-table-utils.tsx"]
end
end
end
subgraph IZ["snackbar"]
subgraph J0["src"]
J1["index.ts"]
subgraph J2["lib"]
J3["snackbar.tsx"]
J4["Snackbar.tsx"]
end
end
end
subgraph J5["styled-drawer"]
subgraph J6["src"]
J7["index.ts"]
subgraph J8["lib"]
J9["styled-drawer.tsx"]
JA["styled-drawer.spec.tsx"]
end
end
end
subgraph JB["unauthorized"]
subgraph JC["src"]
JD["index.ts"]
subgraph JE["lib"]
JF["unauthorized-path.tsx"]
end
end
end
end
subgraph JG["graphql"]
subgraph JH["src"]
JI["index.ts"]
subgraph JJ["lib"]
JK["currency.mutations.ts"]
JL["currency.queries.ts"]
JM["fragments.ts"]
JN["variant-colors.ts"]
JO["client-shared-graphql.tsx"]
end
end
end
subgraph JP["hooks"]
subgraph JQ["brands"]
subgraph JR["src"]
JS["index.ts"]
subgraph JT["lib"]
JU["brands.graphql.ts"]
JV["useBrands.ts"]
end
end
JW["vite.config.ts"]
end
subgraph JX["categories"]
subgraph JY["src"]
JZ["index.ts"]
subgraph K0["lib"]
K1["useCategories.ts"]
K2["categories.graphql.ts"]
end
end
end
subgraph K3["colors"]
subgraph K4["src"]
K5["index.ts"]
subgraph K6["lib"]
K7["useColors.ts"]
K8["color.graphql.ts"]
end
end
end
subgraph K9["currency"]
subgraph KA["src"]
KB["index.ts"]
subgraph KC["lib"]
KD["useConvertPrice.tsx"]
KE["useExchangeRate.tsx"]
KF["useCurrencies.tsx"]
KG["useCurrencyForLocale.tsx"]
KH["useExchangeRate.spec.tsx"]
end
end
end
subgraph KI["products"]
subgraph KJ["src"]
KK["index.ts"]
subgraph KL["lib"]
KM["productImage.ts"]
KN["products.graphql.ts"]
KO["useProducts.ts"]
KP["productImage.spec.ts"]
end
end
end
subgraph KQ["site-languages"]
subgraph KR["src"]
KS["index.ts"]
subgraph KT["lib"]
KU["site-languages.graphql.ts"]
KV["useSiteLanguages.ts"]
KW["site-languages-hook.spec.tsx"]
end
end
KX["vite.config.ts"]
end
subgraph KY["snackbar"]
subgraph KZ["src"]
L0["index.ts"]
subgraph L1["lib"]
L2["SnackbarContext.tsx"]
L3["useSnackbar.ts"]
end
end
end
subgraph L4["translations-management-hook"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["useTranslationsManagement.ts"]
end
end
end
end
subgraph L9["lottie"]
subgraph LA["empty-cart"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["lottie-empty-cart.tsx"]
LF["lottie-empty-cart.spec.tsx"]
end
end
LG["vite.config.ts"]
end
subgraph LH["loading"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["lottie-loading.tsx"]
LM["lottie-loading.spec.tsx"]
end
end
end
subgraph LN["success-check"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["lottie-success-check.tsx"]
LS["lottie-success-check.spec.tsx"]
end
end
end
subgraph LT["unauthorized"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LY["translations"]
subgraph LZ["src"]
M0["index.ts"]
subgraph M1["lib"]
M2["mapApolloErrorToTranslationKey.ts"]
M3["WrapTranslation.tsx"]
end
end
end
subgraph M4["ui"]
subgraph M5["colors"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["colors.ts"]
end
end
end
subgraph MA["language-components"]
subgraph MB["src"]
MC["index.ts"]
subgraph MD["lib"]
ME["language-components.tsx"]
MF["ltr-text-field.tsx"]
end
end
end
subgraph MG["sizes"]
subgraph MH["src"]
MI["index.ts"]
subgraph MJ["lib"]
MK["sizes.ts"]
ML["sizes.spec.tsx"]
MM["sizes.tsx"]
end
end
end
end
subgraph MN["zustand"]
subgraph MO["shared-auth-store"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["shared-auth-store.ts"]
end
end
end
subgraph MT["shared-notification-store"]
subgraph MU["src"]
MV["index.ts"]
subgraph MW["lib"]
MX["shared-notification-store.tsx"]
end
end
end
subgraph MY["shared-ui-store"]
subgraph MZ["src"]
N0["index.ts"]
subgraph N1["lib"]
N2["shared-ui-store.ts"]
N3["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph N4["server"]
subgraph N5["controllers"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["auth.controller.ts"]
NA["order.controller.ts"]
end
end
end
subgraph NB["decorators"]
NC["jest.config.ts"]
subgraph ND["src"]
NE["index.ts"]
subgraph NF["lib"]
NG["current-user.decorator.ts"]
NH["decorators.ts"]
NI["decorators.spec.ts"]
end
end
end
subgraph NJ["entities"]
subgraph NK["src"]
NL["index.ts"]
subgraph NM["lib"]
NN["brand.entity.ts"]
NO["product.entity.ts"]
NP["category.entity.ts"]
NQ["product-description.entity.ts"]
NR["site-language.entity.ts"]
NS["product-info.entity.ts"]
NT["color.entity.ts"]
NU["product-info-color.entity.ts"]
NV["seller-info.entity.ts"]
NW["seller-product.entity.ts"]
NX["user.entity.ts"]
NY["cart.entity.ts"]
NZ["currency-preference.entity.ts"]
O0["currency.entity.ts"]
O1["customer.entity.ts"]
O2["exchange-rate.entity.ts"]
O3["order.entity.ts"]
O4["platform-settings.entity.ts"]
O5["refresh-token.entity.ts"]
O6["seller-order.entity.ts"]
O7["translation.entity.ts"]
end
end
end
subgraph O8["guards"]
O9["jest.config.ts"]
subgraph OA["src"]
OB["index.ts"]
subgraph OC["lib"]
OD["catalog.guard.ts"]
OE["graphql-auth.guard.ts"]
OF["http-auth.guard.ts"]
OG["roles.guard.ts"]
OH["catalog.guard.spec.ts"]
OI["roles.guard.spec.ts"]
end
end
end
subgraph OJ["inputs"]
subgraph OK["src"]
OL["index.ts"]
subgraph OM["lib"]
ON["brand.input.ts"]
OO["cart.inputs.ts"]
OP["category.input.ts"]
OQ["color.input.ts"]
OR["customer-auth.inputs.ts"]
OS["order-pagination.inputs.ts"]
OT["order.inputs.ts"]
OU["product-info-filter.input.ts"]
OV["product.input.ts"]
OW["seller-order-pagination.inputs.ts"]
OX["seller.input.ts"]
OY["site-language.input.ts"]
OZ["user.input.ts"]
end
end
end
subgraph P0["modules"]
subgraph P1["src"]
P2["index.ts"]
subgraph P3["lib"]
P4["auth.module.ts"]
P5["email.module.ts"]
P6["token.module.ts"]
P7["user.module.ts"]
P8["customer-profile.module.ts"]
P9["brand.module.ts"]
PA["catalog-guard.module.ts"]
PB["translation.module.ts"]
PC["cart.module.ts"]
PD["platform-settings.module.ts"]
PE["category.module.ts"]
PF["product.module.ts"]
PG["color.module.ts"]
PH["currency.module.ts"]
PI["graphql-context.module.ts"]
PJ["order.module.ts"]
PK["seller-info.module.ts"]
PL["payment.module.ts"]
PM["product-info.module.ts"]
PN["seller-products.module.ts"]
PO["site-language.module.ts"]
end
end
end
subgraph PP["resolvers"]
PQ["jest.config.ts"]
subgraph PR["src"]
PS["index.ts"]
subgraph PT["lib"]
PU["auth.resolver.ts"]
PV["zod-validation.pipe.ts"]
PW["brand.resolver.ts"]
PX["cart.resolver.ts"]
PY["category.resolver.ts"]
PZ["color.resolver.ts"]
Q0["currency.resolver.ts"]
Q1["customer-profile.resolver.ts"]
Q2["order.resolver.ts"]
Q3["payment.resolver.ts"]
Q4["product-info.resolver.ts"]
Q5["product.resolver.ts"]
Q6["seller-info.resolver.ts"]
Q7["shipping.resolver.ts"]
Q8["site-language.resolver.ts"]
Q9["translation.input.ts"]
QA["translation.resolver.ts"]
QB["user.resolver.ts"]
QC["auth-validation.spec.ts"]
QD["auth.resolver.spec.ts"]
QE["cart-validation.spec.ts"]
QF["order.resolver.spec.ts"]
QG["order.resolver.status-transitions.spec.ts"]
QH["order.resolver.tracking.spec.ts"]
QI["payment.resolver.integration.spec.ts"]
QJ["payment.resolver.spec.ts"]
QK["product-info.resolver.spec.ts"]
QL["translation.resolver.guards.spec.ts"]
subgraph QM["types"]
QN["graphql-upload.d.ts"]
end
QO["user.resolver.spec.ts"]
QP["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QQ["services"]
QR["jest.config.ts"]
subgraph QS["src"]
QT["index.ts"]
subgraph QU["lib"]
QV["auth.service.ts"]
QW["brand.service.ts"]
QX["cart.service.ts"]
QY["product-info-colors.util.ts"]
QZ["category.service.ts"]
R0["color.service.ts"]
R1["currency.service.ts"]
R2["customer-profile.service.ts"]
R3["email.service.ts"]
R4["image-upload.service.ts"]
R5["order.service.ts"]
R6["payment-logger.service.ts"]
R7["payment.service.ts"]
R8["product.service.ts"]
R9["seller-info.service.ts"]
RA["shipping-calculation.service.ts"]
RB["site-language.service.ts"]
RC["token.service.ts"]
RD["translation.service.ts"]
RE["user.service.ts"]
RF["auth.service.password-policy.spec.ts"]
RG["auth.service.spec.ts"]
RH["cart.service.add-quantity.spec.ts"]
RI["cart.service.null-relations.spec.ts"]
RJ["cart.service.spec.ts"]
RK["order.service.spec.ts"]
RL["order.service.tracking.spec.ts"]
RM["product-info-colors.util.spec.ts"]
RN["product.service.pants.spec.ts"]
RO["product.service.spec.ts"]
RP["relay-connection.spec.ts"]
RQ["seller-info.service.price-validation.spec.ts"]
RR["shipping-calculation.service.spec.ts"]
RS["token.service.spec.ts"]
end
end
end
subgraph RT["strategies"]
subgraph RU["src"]
RV["index.ts"]
subgraph RW["lib"]
RX["local.strategy.ts"]
end
end
end
subgraph RY["utils"]
subgraph RZ["src"]
S0["index.ts"]
subgraph S1["lib"]
S2["email-templates.ts"]
S3["relay-connection.ts"]
S4["pagination.ts"]
end
end
end
end
subgraph S5["shared"]
subgraph S6["codegen"]
S7["jest.config.ts"]
subgraph S8["src"]
S9["index.ts"]
subgraph SA["lib"]
subgraph SB["generated"]
SC["graphql.ts"]
end
end
end
end
subgraph SD["graphql-schema"]
SE["jest.config.ts"]
subgraph SF["src"]
SG["index.ts"]
end
end
subgraph SH["product-sizes"]
subgraph SI["src"]
SJ["index.ts"]
subgraph SK["lib"]
SL["product-sizes.ts"]
SM["product-sizes.pants-formats.spec.ts"]
SN["product-sizes.pants-label.spec.ts"]
SO["product-sizes.pants-strict.spec.ts"]
SP["product-sizes.spec.ts"]
end
end
end
subgraph SQ["shared-i18n"]
subgraph SR["src"]
SS["index.ts"]
subgraph ST["lib"]
SU["language-context.tsx"]
SV["language-detector.ts"]
subgraph SW["locales"]
SX["i18n-react.tsx"]
SY["i18n-util.ts"]
SZ["i18n-util.async.ts"]
subgraph T0["en"]
T1["index.ts"]
end
subgraph T3["fa"]
T4["index.ts"]
end
T5["formatters.ts"]
T6["i18n-types.ts"]
T7["i18n-util.sync.ts"]
T8["navigator-detector.ts"]
end
T2["site-name.ts"]
T9["table-localization.ts"]
TA["theme-provider.tsx"]
TB["use-page-title.ts"]
end
end
end
subgraph TC["validation"]
subgraph TD["src"]
TE["index.ts"]
subgraph TF["lib"]
TG["auth.ts"]
TH["limits.ts"]
TI["primitives.ts"]
TJ["auth-forms.ts"]
TK["cart.ts"]
TL["errors.ts"]
TM["auth-forms.admin.spec.ts"]
TN["auth-forms.login.spec.ts"]
TO["auth-forms.recovery.spec.ts"]
TP["auth-forms.seller.spec.ts"]
TQ["auth-forms.spec.ts"]
TR["auth.spec.ts"]
TS["cart.spec.ts"]
TT["errors.spec.ts"]
TU["primitives.spec.ts"]
end
end
end
end
end
5-->6
7-->6
8-->6
9-->6
A-->6
B-->6
C-->4
C-->6
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
3D-->3F
3G-->3F
3J-->3L
3M-->3L
3Q-->3S
3T-->3S
3U-->3S
3X-->3Y
3Y-->40
41-->40
42-->40
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
4R-->4T
4T-->4U
4X-->4Y
4Y-->50
51-->50
55-->56
56-->58
59-->58
5E-->5G
5E-->5H
5G-->5H
5I-->5G
5L-->5N
5O-->5N
5R-->5T
5R-->5U
5T-->5U
5V-->5T
5W-->5U
5Z-->61
62-->61
63-->61
68-->6A
6B-->6A
6E-->6G
6E-->6H
6E-->6I
6E-->6L
6I-->6J
6J-->6K
6Q-->6S
6Q-->6T
6Q-->6U
6Q-->6V
6W-->6T
71-->73
71-->74
71-->75
76-->74
77-->73
7A-->7C
7F-->7H
7K-->7M
7K-->7N
7M-->7N
7O-->7M
7P-->7N
7S-->7U
7V-->7U
7Z-->81
82-->81
86-->88
8B-->8D
8E-->8D
8I-->8K
8N-->8P
8Q-->8P
8R-->8P
8U-->8W
8Z-->91
8Z-->92
8Z-->93
91-->92
92-->93
94-->91
97-->99
9C-->9E
9F-->9E
9I-->9K
9L-->9K
9M-->9K
9Q-->9S
9T-->9S
9U-->9S
9V-->9S
9Y-->A0
A1-->A0
A2-->A0
A5-->A7
A8-->A7
AC-->AE
AF-->AE
AJ-->AL
AJ-->AU
AJ-->AO
AJ-->AT
AL-->AN
AL-->AP
AL-->AQ
AL-->AR
AL-->AS
AL-->AO
AL-->AT
AN-->AO
AU-->AO
AV-->AR
AV-->AL
AV-->AO
AW-->AX
AW-->AR
AW-->AL
AW-->AU
AW-->AO
AY-->AU
AZ-->AO
B1-->AO
B5-->B7
B8-->B7
B9-->B7
BC-->BE
BF-->BE
BJ-->BL
BM-->BL
BQ-->BS
BT-->BS
BU-->BS
BY-->C0
C1-->C0
C2-->C0
C5-->C7
C8-->C7
CC-->CE
CI-->CK
CN-->CP
CQ-->CP
CQ-->CR
CV-->CX
CY-->CX
D2-->D4
D5-->D4
D9-->DB
DC-->DB
DE-->DG
DL-->DN
DO-->DN
DR-->DT
DW-->DY
DW-->DZ
DY-->DZ
E3-->E5
E6-->E5
E9-->EB
E9-->EC
E9-->ED
E9-->EG
ED-->EE
EE-->EF
EG-->EB
EG-->EH
EO-->EQ
EQ-->ER
EU-->EW
F0-->F2
F0-->F3
F6-->F8
FB-->FD
FH-->FJ
FK-->FJ
FN-->FP
FQ-->FP
FT-->FV
FV-->FW
FX-->FW
FY-->FW
FZ-->FV
G2-->G4
G5-->G4
G6-->G4
GB-->GD
GD-->GE
GF-->GD
GG-->GD
GH-->GE
GL-->GN
GO-->GN
GR-->GT
GX-->GZ
H5-->H7
H5-->H8
H9-->H8
HC-->HE
HF-->HE
HJ-->HL
HM-->HL
HP-->HR
HU-->HW
HU-->HX
HU-->HY
HW-->HX
HZ-->HW
I3-->I5
I6-->I5
I9-->IB
IE-->IG
IH-->IG
IK-->IM
IM-->IN
IQ-->IS
IS-->IT
IS-->IU
IS-->IV
IS-->IW
IU-->IT
IU-->IV
IX-->IY
J1-->J3
J7-->J9
JA-->J9
JD-->JF
JI-->JK
JI-->JL
JI-->JM
JI-->JN
JS-->JU
JS-->JV
JV-->JU
JZ-->K1
K1-->K2
K5-->K7
K7-->K8
KB-->KD
KB-->KF
KB-->KG
KB-->KE
KD-->KE
KH-->KE
KK-->KM
KK-->KN
KK-->KO
KO-->KN
KP-->KM
KS-->KU
KS-->KV
KV-->KU
KW-->KV
L0-->L2
L0-->L3
L3-->L2
L6-->L8
LC-->LE
LF-->LE
LJ-->LL
LM-->LL
LP-->LR
LS-->LR
LV-->LX
M0-->M2
M7-->M9
MC-->ME
MC-->MF
MI-->MK
ML-->MM
MQ-->MS
MV-->MX
N0-->N2
N7-->N9
N7-->NA
NE-->NG
NE-->NH
NI-->NH
NL-->NN
NL-->NY
NL-->NP
NL-->NT
NL-->NZ
NL-->O0
NL-->O1
NL-->O2
NL-->O3
NL-->O4
NL-->NQ
NL-->NU
NL-->NS
NL-->NO
NL-->O5
NL-->NV
NL-->O6
NL-->NW
NL-->NR
NL-->O7
NL-->NX
NN-->NO
NO-->NN
NO-->NP
NO-->NQ
NO-->NS
NO-->NV
NO-->NW
NP-->NO
NQ-->NO
NQ-->NR
NR-->NQ
NS-->NT
NS-->NU
NS-->NO
NU-->NT
NU-->NS
NV-->NW
NV-->NX
NW-->NS
NW-->NO
NW-->NV
NY-->NO
NY-->NX
NZ-->O0
O1-->NX
O2-->O0
O2-->NX
O3-->NO
O3-->NV
O5-->NX
O6-->O3
OB-->OD
OB-->OE
OB-->OF
OB-->OG
OH-->OD
OI-->OG
OL-->ON
OL-->OO
OL-->OP
OL-->OQ
OL-->OR
OL-->OS
OL-->OT
OL-->OU
OL-->OV
OL-->OW
OL-->OX
OL-->OY
OL-->OZ
OV-->OU
P2-->P4
P2-->P9
P2-->PC
P2-->PA
P2-->PE
P2-->PG
P2-->PH
P2-->P8
P2-->P5
P2-->PI
P2-->PJ
P2-->PL
P2-->PD
P2-->PM
P2-->PF
P2-->PK
P2-->PN
P2-->PO
P2-->P6
P2-->PB
P2-->P7
P4-->P5
P4-->P6
P4-->P7
P7-->P4
P7-->P8
P9-->PA
P9-->PB
PC-->PD
PE-->PA
PE-->PF
PE-->PB
PF-->PA
PF-->P6
PF-->PB
PG-->PA
PG-->PB
PI-->P5
PI-->P6
PI-->P7
PJ-->PD
PJ-->PK
PK-->PF
PK-->P6
PK-->P7
PL-->PJ
PM-->PF
PM-->PB
PN-->PK
PN-->P7
PS-->PU
PS-->PW
PS-->PX
PS-->PY
PS-->PZ
PS-->Q0
PS-->Q1
PS-->Q2
PS-->Q3
PS-->Q4
PS-->Q5
PS-->Q6
PS-->Q7
PS-->Q8
PS-->Q9
PS-->QA
PS-->QB
PS-->PV
PU-->PV
PX-->PV
QB-->PV
QC-->PU
QC-->QB
QC-->PV
QD-->PU
QE-->PX
QE-->PV
QF-->Q2
QG-->Q2
QH-->Q2
QI-->Q3
QJ-->Q3
QK-->Q4
QL-->QA
QO-->QB
QP-->PV
QT-->QV
QT-->QW
QT-->QX
QT-->QZ
QT-->R0
QT-->R1
QT-->R2
QT-->R3
QT-->R4
QT-->R5
QT-->R6
QT-->R7
QT-->QY
QT-->R8
QT-->R9
QT-->RA
QT-->RB
QT-->RC
QT-->RD
QT-->RE
QX-->QY
R8-->QY
R9-->QY
RF-->QV
RF-->R3
RF-->RC
RF-->RE
RG-->QV
RG-->R3
RG-->RC
RG-->RE
RH-->QX
RI-->QX
RJ-->QX
RK-->R5
RL-->R5
RM-->QY
RN-->R8
RN-->RD
RO-->R8
RO-->RD
RQ-->QV
RQ-->R9
RR-->RA
RS-->RC
RV-->RX
S0-->S2
S0-->S3
S9-->SC
SJ-->SL
SM-->SL
SN-->SL
SO-->SL
SP-->SL
SS-->SU
SS-->SV
SS-->SX
SS-->T6
SS-->SY
SS-->SZ
SS-->T7
SS-->T8
SS-->T2
SS-->T9
SS-->TA
SS-->TB
SU-->SV
SU-->SX
SU-->SZ
SX-->SY
SZ-->T1
SZ-->T4
SZ-->T5
SZ-->SY
T1-->T2
T4-->T2
T7-->T1
T7-->T4
T7-->T5
T7-->SY
T9-->SX
TA-->SU
TB-->SX
TE-->TG
TE-->TJ
TE-->TK
TE-->TL
TE-->TH
TE-->TI
TG-->TH
TG-->TI
TI-->TH
TJ-->TG
TK-->TI
TM-->TJ
TN-->TJ
TO-->TJ
TP-->TJ
TQ-->TJ
TR-->TG
TS-->TK
TT-->TL
TU-->TH
TU-->TI
