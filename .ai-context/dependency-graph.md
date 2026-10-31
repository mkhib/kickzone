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
end
end
end
subgraph 9J["customer-shopping-cart"]
subgraph 9K["src"]
9L["index.ts"]
subgraph 9M["lib"]
9N["customer-shopping-cart.tsx"]
9O["customer-shopping-cart.pants-size.spec.tsx"]
9P["customer-shopping-cart.spec.tsx"]
end
end
9Q["vite.config.ts"]
end
subgraph 9R["customer-signup"]
subgraph 9S["src"]
9T["index.ts"]
subgraph 9U["lib"]
9V["customer-signup.tsx"]
9W["customer-signup.password-length.spec.tsx"]
9X["customer-signup.spec.tsx"]
9Y["customer-signup.zod.spec.tsx"]
end
end
end
subgraph 9Z["forgot-password"]
subgraph A0["src"]
A1["index.ts"]
subgraph A2["lib"]
A3["customer-forgot-password.tsx"]
A4["customer-forgot-password.spec.tsx"]
A5["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A6["guide-authenticity"]
subgraph A7["src"]
A8["index.ts"]
subgraph A9["lib"]
AA["customer-guide-authenticity.tsx"]
AB["customer-guide-authenticity.spec.tsx"]
end
end
AC["vite.config.ts"]
end
subgraph AD["guide-payment"]
subgraph AE["src"]
AF["index.ts"]
subgraph AG["lib"]
AH["customer-guide-payment.tsx"]
AI["customer-guide-payment.spec.tsx"]
end
end
AJ["vite.config.ts"]
end
subgraph AK["home"]
subgraph AL["src"]
AM["index.ts"]
subgraph AN["lib"]
AO["CustomersHomeScreen.tsx"]
subgraph AP["components"]
AQ["CategoryBentoSection.tsx"]
AS["HeroSection.tsx"]
AT["HomeLoadingScreen.tsx"]
AU["PicksRailSection.tsx"]
AV["TrustStripSection.tsx"]
B0["NewArrivalsSection.tsx"]
B2["BrandBlocksSection.tsx"]
B3["NewsletterSection.tsx"]
B4["ShopTheLookSection.tsx"]
B5["TickerSection.tsx"]
end
AR["home-selectors.ts"]
AW["useScrollProgress.ts"]
AX["CustomersShopScreen.tsx"]
AY["CustomersHomeScreen.cart-size.spec.tsx"]
AZ["CustomersHomeScreen.spec.tsx"]
B1["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph B6["login"]
subgraph B7["src"]
B8["index.ts"]
subgraph B9["lib"]
BA["CustomersLoginScreen.tsx"]
BB["CustomersLoginScreen.spec.tsx"]
BC["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BD["not-found"]
subgraph BE["src"]
BF["index.ts"]
subgraph BG["lib"]
BH["customer-not-found.tsx"]
BI["customer-not-found.spec.tsx"]
end
end
BJ["vite.config.ts"]
end
subgraph BK["privacy-policy"]
subgraph BL["src"]
BM["index.ts"]
subgraph BN["lib"]
BO["customer-privacy-policy.tsx"]
BP["customer-privacy-policy.spec.tsx"]
end
end
BQ["vite.config.ts"]
end
subgraph BR["product-details"]
subgraph BS["src"]
BT["index.ts"]
subgraph BU["lib"]
BV["customer-product-details.tsx"]
BW["reviews-flag.ts"]
BX["customer-product-details.guarantee.spec.tsx"]
BY["customer-product-details.no-low-stock.spec.tsx"]
BZ["customer-product-details.pants-size.spec.tsx"]
C0["customer-product-details.reviews-hidden.spec.tsx"]
C1["customer-product-details.spec.tsx"]
end
end
C2["vite.config.ts"]
end
subgraph C3["reset-password"]
subgraph C4["src"]
C5["index.ts"]
subgraph C6["lib"]
C7["customer-reset-password.tsx"]
C8["customer-reset-password.password-length.spec.tsx"]
C9["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CA["shipping-returns"]
subgraph CB["src"]
CC["index.ts"]
subgraph CD["lib"]
CE["customer-shipping-returns.tsx"]
CF["customer-shipping-returns.spec.tsx"]
end
end
CG["vite.config.ts"]
end
subgraph CH["unauthorized"]
subgraph CI["src"]
CJ["index.ts"]
subgraph CK["lib"]
CL["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CM["utility"]
subgraph CN["test"]
subgraph CO["src"]
CP["index.ts"]
subgraph CQ["lib"]
CR["customers-test-utility.tsx"]
end
end
end
end
subgraph CS["validations"]
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["shipping-validation.ts"]
CX["shipping-validation.spec.tsx"]
CY["shipping-validation.tsx"]
end
end
end
subgraph CZ["zustand"]
subgraph D0["customer-cart-store"]
subgraph D1["src"]
D2["index.ts"]
subgraph D3["lib"]
D4["customer-cart-store.ts"]
D5["customer-cart-store.spec.ts"]
D6["customer-cart-store.tsx"]
end
end
end
subgraph D7["customer-checkout-store"]
subgraph D8["src"]
D9["index.ts"]
subgraph DA["lib"]
DB["customer-checkout-store.ts"]
DC["customer-checkout-store.spec.ts"]
end
end
DD["vite.config.ts"]
end
subgraph DE["customer-wishlist-store"]
subgraph DF["src"]
DG["index.ts"]
subgraph DH["lib"]
DI["customer-wishlist-store.ts"]
DJ["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DK["src"]
DL["index.ts"]
subgraph DM["lib"]
DN["customers-products-store.tsx"]
end
end
end
end
subgraph DO["sellers"]
subgraph DP["components"]
subgraph DQ["footer"]
subgraph DR["src"]
DS["index.ts"]
subgraph DT["lib"]
DU["sellers-footer.tsx"]
DV["sellers-footer.spec.tsx"]
end
end
end
subgraph DW["headerbar"]
subgraph DX["src"]
DY["index.ts"]
subgraph DZ["lib"]
E0["SellersHeaderbar.tsx"]
end
end
end
subgraph E1["layout"]
subgraph E2["src"]
E3["index.ts"]
subgraph E4["lib"]
E5["SellersLayout.tsx"]
E6["SellersTabbar.tsx"]
end
end
end
end
subgraph E7["contexts"]
subgraph E8["auth"]
subgraph E9["src"]
EA["index.ts"]
subgraph EB["lib"]
EC["SellersAuthContext.tsx"]
ED["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EE["graphql"]
subgraph EF["src"]
EG["index.ts"]
subgraph EH["lib"]
EI["fragments.ts"]
EJ["mutations.ts"]
EK["Provider.tsx"]
EL["SellersApolloProvider.tsx"]
EM["client.ts"]
EN["queries.ts"]
EO["seller-orders.graphql.ts"]
EP["apollo-upload-client.d.ts"]
end
subgraph EQ["types"]
ER["apollo-upload-client.d.ts"]
end
end
end
subgraph ES["hooks"]
subgraph ET["auth"]
subgraph EU["src"]
EV["index.ts"]
subgraph EW["lib"]
EX["useSellerAuth.ts"]
EY["sellerAuth.graphql.ts"]
end
end
end
subgraph EZ["orders"]
subgraph F0["src"]
F1["index.ts"]
subgraph F2["lib"]
F3["useSellerOrders.ts"]
F4["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph F5["products"]
subgraph F6["src"]
F7["index.ts"]
subgraph F8["lib"]
F9["useSellersProductManagement.ts"]
FA["useSellersProducts.ts"]
end
end
end
end
subgraph FB["router"]
subgraph FC["src"]
FD["index.ts"]
subgraph FE["lib"]
FF["SellersRouter.tsx"]
end
end
end
subgraph FG["routes"]
subgraph FH["src"]
FI["index.ts"]
subgraph FJ["lib"]
FK["seller-routes.ts"]
end
end
end
subgraph FL["screens"]
subgraph FM["catalog"]
subgraph FN["src"]
FO["index.ts"]
subgraph FP["lib"]
FQ["SellersCatalogScreens.tsx"]
FR["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FS["login"]
subgraph FT["src"]
FU["index.ts"]
subgraph FV["lib"]
FW["SellersLogin.tsx"]
FX["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph FY["manage-product"]
subgraph FZ["src"]
G0["index.ts"]
subgraph G1["lib"]
G2["SellersManageProductScreen.tsx"]
G3["SellersDefineProductFlow.tsx"]
G4["SellersDefineProductFlow.pants-label.spec.tsx"]
G5["SellersDefineProductFlow.spec.tsx"]
G6["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph G7["products"]
subgraph G8["src"]
G9["index.ts"]
subgraph GA["lib"]
GB["SellersProducts.tsx"]
GC["SellersProducts.pants-label.spec.tsx"]
GD["SellersProducts.spec.tsx"]
end
end
end
subgraph GE["seller-orders"]
GF["jest.config.ts"]
GG["jest.setup.ts"]
subgraph GH["src"]
GI["index.ts"]
subgraph GJ["lib"]
GK["seller-orders-screen.tsx"]
GL["seller-status-transitions.ts"]
GM["seller-orders-screen.pants-size.spec.tsx"]
GN["seller-orders-screen.spec.tsx"]
GO["seller-status-transitions.spec.ts"]
end
GP["test-setup.ts"]
end
end
subgraph GQ["setup-password"]
subgraph GR["src"]
GS["index.ts"]
subgraph GT["lib"]
GU["SellersSetupPassword.tsx"]
GV["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GW["unauthorized"]
subgraph GX["src"]
GY["index.ts"]
subgraph GZ["lib"]
H0["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H1["zustand"]
subgraph H2["sellers-products-store"]
subgraph H3["src"]
H4["index.ts"]
subgraph H5["lib"]
H6["useSellersProductsStore.ts"]
H7["sellers-products-store.tsx"]
end
end
end
end
end
subgraph H8["shared"]
subgraph H9["components"]
subgraph HA["apollo-provider-base"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["ApolloProviderBase.tsx"]
HF["createSilentRefreshAuthLink.ts"]
HG["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HH["error-boundary"]
subgraph HI["src"]
HJ["index.ts"]
subgraph HK["lib"]
HL["error-boundary.tsx"]
HM["error-boundary.spec.tsx"]
end
end
HN["vite.config.ts"]
end
subgraph HO["glassmorphism-container"]
subgraph HP["src"]
HQ["index.ts"]
subgraph HR["lib"]
HS["glassmorphism-container.tsx"]
HT["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HU["layout"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["Layout.tsx"]
end
end
end
subgraph HZ["material-data-table"]
subgraph I0["src"]
I1["index.ts"]
subgraph I2["lib"]
I3["material-data-table.tsx"]
I4["table-config.ts"]
I5["table-utils.ts"]
I6["material-data-table.spec.tsx"]
I7["table-types.ts"]
end
end
end
subgraph I8["order-status-chip"]
subgraph I9["src"]
IA["index.ts"]
subgraph IB["lib"]
IC["order-status-chip.tsx"]
ID["order-status-chip.spec.tsx"]
end
end
end
subgraph IE["password-field"]
subgraph IF["src"]
IG["index.ts"]
subgraph IH["lib"]
II["PasswordTextField.tsx"]
end
end
end
subgraph IJ["price-display"]
subgraph IK["src"]
IL["index.ts"]
subgraph IM["lib"]
IN["price-display.tsx"]
IO["price-display.spec.tsx"]
end
end
end
subgraph IP["private-route"]
subgraph IQ["src"]
IR["index.ts"]
subgraph IS["lib"]
IT["createPrivateRoute.tsx"]
IU["PrivateRoute.tsx"]
end
end
end
subgraph IV["rtl-table-utils"]
subgraph IW["src"]
IX["index.ts"]
subgraph IY["lib"]
IZ["rtl-table-utils.ts"]
J0["rtl-cell-components.tsx"]
J1["rtl-column-helpers.ts"]
J2["rtl-table-props.ts"]
J3["use-table-alignment.ts"]
J4["rtl-table-utils.spec.tsx"]
J5["rtl-table-utils.tsx"]
end
end
end
subgraph J6["snackbar"]
subgraph J7["src"]
J8["index.ts"]
subgraph J9["lib"]
JA["snackbar.tsx"]
JB["Snackbar.tsx"]
end
end
end
subgraph JC["styled-drawer"]
subgraph JD["src"]
JE["index.ts"]
subgraph JF["lib"]
JG["styled-drawer.tsx"]
JH["styled-drawer.spec.tsx"]
end
end
end
subgraph JI["unauthorized"]
subgraph JJ["src"]
JK["index.ts"]
subgraph JL["lib"]
JM["unauthorized-path.tsx"]
end
end
end
end
subgraph JN["graphql"]
subgraph JO["src"]
JP["index.ts"]
subgraph JQ["lib"]
JR["currency.mutations.ts"]
JS["currency.queries.ts"]
JT["fragments.ts"]
JU["variant-colors.ts"]
JV["client-shared-graphql.tsx"]
end
end
end
subgraph JW["hooks"]
subgraph JX["brands"]
subgraph JY["src"]
JZ["index.ts"]
subgraph K0["lib"]
K1["brands.graphql.ts"]
K2["useBrands.ts"]
end
end
K3["vite.config.ts"]
end
subgraph K4["categories"]
subgraph K5["src"]
K6["index.ts"]
subgraph K7["lib"]
K8["useCategories.ts"]
K9["categories.graphql.ts"]
end
end
end
subgraph KA["colors"]
subgraph KB["src"]
KC["index.ts"]
subgraph KD["lib"]
KE["useColors.ts"]
KF["color.graphql.ts"]
end
end
end
subgraph KG["currency"]
subgraph KH["src"]
KI["index.ts"]
subgraph KJ["lib"]
KK["useConvertPrice.tsx"]
KL["useExchangeRate.tsx"]
KM["useCurrencies.tsx"]
KN["useCurrencyForLocale.tsx"]
KO["useExchangeRate.spec.tsx"]
end
end
end
subgraph KP["products"]
subgraph KQ["src"]
KR["index.ts"]
subgraph KS["lib"]
KT["productImage.ts"]
KU["products.graphql.ts"]
KV["useProducts.ts"]
KW["productImage.spec.ts"]
end
end
end
subgraph KX["site-languages"]
subgraph KY["src"]
KZ["index.ts"]
subgraph L0["lib"]
L1["site-languages.graphql.ts"]
L2["useSiteLanguages.ts"]
L3["site-languages-hook.spec.tsx"]
end
end
L4["vite.config.ts"]
end
subgraph L5["snackbar"]
subgraph L6["src"]
L7["index.ts"]
subgraph L8["lib"]
L9["SnackbarContext.tsx"]
LA["useSnackbar.ts"]
end
end
end
subgraph LB["translations-management-hook"]
subgraph LC["src"]
LD["index.ts"]
subgraph LE["lib"]
LF["useTranslationsManagement.ts"]
end
end
end
end
subgraph LG["lottie"]
subgraph LH["empty-cart"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["lottie-empty-cart.tsx"]
LM["lottie-empty-cart.spec.tsx"]
end
end
LN["vite.config.ts"]
end
subgraph LO["loading"]
subgraph LP["src"]
LQ["index.ts"]
subgraph LR["lib"]
LS["lottie-loading.tsx"]
LT["lottie-loading.spec.tsx"]
end
end
end
subgraph LU["success-check"]
subgraph LV["src"]
LW["index.ts"]
subgraph LX["lib"]
LY["lottie-success-check.tsx"]
LZ["lottie-success-check.spec.tsx"]
end
end
end
subgraph M0["unauthorized"]
subgraph M1["src"]
M2["index.ts"]
subgraph M3["lib"]
M4["lottie-unauthorized.tsx"]
end
end
end
end
subgraph M5["translations"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["mapApolloErrorToTranslationKey.ts"]
MA["WrapTranslation.tsx"]
end
end
end
subgraph MB["ui"]
subgraph MC["colors"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["colors.ts"]
end
end
end
subgraph MH["language-components"]
subgraph MI["src"]
MJ["index.ts"]
subgraph MK["lib"]
ML["language-components.tsx"]
MM["ltr-text-field.tsx"]
end
end
end
subgraph MN["sizes"]
subgraph MO["src"]
MP["index.ts"]
subgraph MQ["lib"]
MR["sizes.ts"]
MS["sizes.spec.tsx"]
MT["sizes.tsx"]
end
end
end
end
subgraph MU["zustand"]
subgraph MV["shared-auth-store"]
subgraph MW["src"]
MX["index.ts"]
subgraph MY["lib"]
MZ["shared-auth-store.ts"]
end
end
end
subgraph N0["shared-notification-store"]
subgraph N1["src"]
N2["index.ts"]
subgraph N3["lib"]
N4["shared-notification-store.tsx"]
end
end
end
subgraph N5["shared-ui-store"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["shared-ui-store.ts"]
NA["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NB["server"]
subgraph NC["controllers"]
subgraph ND["src"]
NE["index.ts"]
subgraph NF["lib"]
NG["auth.controller.ts"]
NH["order.controller.ts"]
end
end
end
subgraph NI["decorators"]
NJ["jest.config.ts"]
subgraph NK["src"]
NL["index.ts"]
subgraph NM["lib"]
NN["current-user.decorator.ts"]
NO["decorators.ts"]
NP["decorators.spec.ts"]
end
end
end
subgraph NQ["entities"]
subgraph NR["src"]
NS["index.ts"]
subgraph NT["lib"]
NU["brand.entity.ts"]
NV["product.entity.ts"]
NW["category.entity.ts"]
NX["product-description.entity.ts"]
NY["site-language.entity.ts"]
NZ["product-info.entity.ts"]
O0["color.entity.ts"]
O1["product-info-color.entity.ts"]
O2["seller-info.entity.ts"]
O3["seller-product.entity.ts"]
O4["user.entity.ts"]
O5["cart.entity.ts"]
O6["currency-preference.entity.ts"]
O7["currency.entity.ts"]
O8["customer.entity.ts"]
O9["exchange-rate.entity.ts"]
OA["order.entity.ts"]
OB["platform-settings.entity.ts"]
OC["refresh-token.entity.ts"]
OD["seller-order.entity.ts"]
OE["translation.entity.ts"]
end
end
end
subgraph OF["guards"]
OG["jest.config.ts"]
subgraph OH["src"]
OI["index.ts"]
subgraph OJ["lib"]
OK["catalog.guard.ts"]
OL["graphql-auth.guard.ts"]
OM["http-auth.guard.ts"]
ON["roles.guard.ts"]
OO["catalog.guard.spec.ts"]
OP["roles.guard.spec.ts"]
end
end
end
subgraph OQ["inputs"]
subgraph OR["src"]
OS["index.ts"]
subgraph OT["lib"]
OU["brand.input.ts"]
OV["cart.inputs.ts"]
OW["category.input.ts"]
OX["color.input.ts"]
OY["customer-auth.inputs.ts"]
OZ["order-pagination.inputs.ts"]
P0["order.inputs.ts"]
P1["product-info-filter.input.ts"]
P2["product.input.ts"]
P3["seller-order-pagination.inputs.ts"]
P4["seller.input.ts"]
P5["site-language.input.ts"]
P6["user.input.ts"]
end
end
end
subgraph P7["modules"]
subgraph P8["src"]
P9["index.ts"]
subgraph PA["lib"]
PB["auth.module.ts"]
PC["email.module.ts"]
PD["token.module.ts"]
PE["user.module.ts"]
PF["customer-profile.module.ts"]
PG["brand.module.ts"]
PH["catalog-guard.module.ts"]
PI["translation.module.ts"]
PJ["cart.module.ts"]
PK["platform-settings.module.ts"]
PL["category.module.ts"]
PM["product.module.ts"]
PN["color.module.ts"]
PO["currency.module.ts"]
PP["graphql-context.module.ts"]
PQ["order.module.ts"]
PR["seller-info.module.ts"]
PS["payment.module.ts"]
PT["product-info.module.ts"]
PU["seller-products.module.ts"]
PV["site-language.module.ts"]
end
end
end
subgraph PW["resolvers"]
PX["jest.config.ts"]
subgraph PY["src"]
PZ["index.ts"]
subgraph Q0["lib"]
Q1["auth.resolver.ts"]
Q2["zod-validation.pipe.ts"]
Q3["brand.resolver.ts"]
Q4["cart.resolver.ts"]
Q5["category.resolver.ts"]
Q6["color.resolver.ts"]
Q7["currency.resolver.ts"]
Q8["customer-profile.resolver.ts"]
Q9["order.resolver.ts"]
QA["payment.resolver.ts"]
QB["product-info.resolver.ts"]
QC["product.resolver.ts"]
QD["seller-info.resolver.ts"]
QE["shipping.resolver.ts"]
QF["site-language.resolver.ts"]
QG["translation.input.ts"]
QH["translation.resolver.ts"]
QI["user.resolver.ts"]
QJ["auth-validation.spec.ts"]
QK["auth.resolver.spec.ts"]
QL["cart-validation.spec.ts"]
QM["order.resolver.spec.ts"]
QN["order.resolver.status-transitions.spec.ts"]
QO["order.resolver.tracking.spec.ts"]
QP["payment.resolver.integration.spec.ts"]
QQ["payment.resolver.spec.ts"]
QR["product-info.resolver.spec.ts"]
QS["translation.resolver.guards.spec.ts"]
subgraph QT["types"]
QU["graphql-upload.d.ts"]
end
QV["user.resolver.spec.ts"]
QW["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QX["services"]
QY["jest.config.ts"]
subgraph QZ["src"]
R0["index.ts"]
subgraph R1["lib"]
R2["auth.service.ts"]
R3["brand.service.ts"]
R4["cart.service.ts"]
R5["product-info-colors.util.ts"]
R6["category.service.ts"]
R7["color.service.ts"]
R8["currency.service.ts"]
R9["customer-profile.service.ts"]
RA["email.service.ts"]
RB["image-upload.service.ts"]
RC["order.service.ts"]
RD["payment-logger.service.ts"]
RE["payment.service.ts"]
RF["product.service.ts"]
RG["seller-info.service.ts"]
RH["shipping-calculation.service.ts"]
RI["site-language.service.ts"]
RJ["token.service.ts"]
RK["translation.service.ts"]
RL["user.service.ts"]
RM["auth.service.password-policy.spec.ts"]
RN["auth.service.spec.ts"]
RO["cart.service.add-quantity.spec.ts"]
RP["cart.service.null-relations.spec.ts"]
RQ["cart.service.spec.ts"]
RR["order.service.spec.ts"]
RS["order.service.tracking.spec.ts"]
RT["product-info-colors.util.spec.ts"]
RU["product.service.multi-filters.spec.ts"]
RV["product.service.pants.spec.ts"]
RW["product.service.spec.ts"]
RX["relay-connection.spec.ts"]
RY["seller-info.service.price-validation.spec.ts"]
RZ["shipping-calculation.service.spec.ts"]
S0["token.service.spec.ts"]
end
end
end
subgraph S1["strategies"]
subgraph S2["src"]
S3["index.ts"]
subgraph S4["lib"]
S5["local.strategy.ts"]
end
end
end
subgraph S6["utils"]
subgraph S7["src"]
S8["index.ts"]
subgraph S9["lib"]
SA["email-templates.ts"]
SB["relay-connection.ts"]
SC["pagination.ts"]
end
end
end
end
subgraph SD["shared"]
subgraph SE["codegen"]
SF["jest.config.ts"]
subgraph SG["src"]
SH["index.ts"]
subgraph SI["lib"]
subgraph SJ["generated"]
SK["graphql.ts"]
end
end
end
end
subgraph SL["graphql-schema"]
SM["jest.config.ts"]
subgraph SN["src"]
SO["index.ts"]
end
end
subgraph SP["product-sizes"]
subgraph SQ["src"]
SR["index.ts"]
subgraph SS["lib"]
ST["product-sizes.ts"]
SU["product-sizes.pants-formats.spec.ts"]
SV["product-sizes.pants-label.spec.ts"]
SW["product-sizes.pants-strict.spec.ts"]
SX["product-sizes.spec.ts"]
end
end
end
subgraph SY["shared-i18n"]
subgraph SZ["src"]
T0["index.ts"]
subgraph T1["lib"]
T2["language-context.tsx"]
T3["language-detector.ts"]
subgraph T4["locales"]
T5["i18n-react.tsx"]
T6["i18n-util.ts"]
T7["i18n-util.async.ts"]
subgraph T8["en"]
T9["index.ts"]
end
subgraph TB["fa"]
TC["index.ts"]
end
TD["formatters.ts"]
TE["i18n-types.ts"]
TF["i18n-util.sync.ts"]
TG["navigator-detector.ts"]
end
TA["site-name.ts"]
TH["table-localization.ts"]
TI["theme-provider.tsx"]
TJ["use-page-title.ts"]
end
end
end
subgraph TK["validation"]
subgraph TL["src"]
TM["index.ts"]
subgraph TN["lib"]
TO["auth.ts"]
TP["limits.ts"]
TQ["primitives.ts"]
TR["auth-forms.ts"]
TS["cart.ts"]
TT["errors.ts"]
TU["auth-forms.admin.spec.ts"]
TV["auth-forms.login.spec.ts"]
TW["auth-forms.recovery.spec.ts"]
TX["auth-forms.seller.spec.ts"]
TY["auth-forms.spec.ts"]
TZ["auth.spec.ts"]
U0["cart.spec.ts"]
U1["errors.spec.ts"]
U2["primitives.spec.ts"]
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
9L-->9N
9O-->9N
9P-->9N
9T-->9V
9W-->9V
9X-->9V
9Y-->9V
A1-->A3
A4-->A3
A5-->A3
A8-->AA
AB-->AA
AF-->AH
AI-->AH
AM-->AO
AM-->AX
AM-->AR
AM-->AW
AO-->AQ
AO-->AS
AO-->AT
AO-->AU
AO-->AV
AO-->AR
AO-->AW
AQ-->AR
AX-->AR
AY-->AU
AY-->AO
AY-->AR
AZ-->B0
AZ-->AU
AZ-->AO
AZ-->AX
AZ-->AR
B1-->AX
B2-->AR
B4-->AR
B8-->BA
BB-->BA
BC-->BA
BF-->BH
BI-->BH
BM-->BO
BP-->BO
BT-->BV
BV-->BW
BX-->BV
BY-->BV
BZ-->BV
C0-->BV
C1-->BV
C5-->C7
C8-->C7
C9-->C7
CC-->CE
CF-->CE
CJ-->CL
CP-->CR
CU-->CW
CX-->CW
CX-->CY
D2-->D4
D5-->D4
D9-->DB
DC-->DB
DG-->DI
DJ-->DI
DL-->DN
DS-->DU
DV-->DU
DY-->E0
E3-->E5
E3-->E6
E5-->E6
EA-->EC
ED-->EC
EG-->EI
EG-->EJ
EG-->EK
EG-->EN
EK-->EL
EL-->EM
EN-->EI
EN-->EO
EV-->EX
EX-->EY
F1-->F3
F7-->F9
F7-->FA
FD-->FF
FI-->FK
FO-->FQ
FR-->FQ
FU-->FW
FX-->FW
G0-->G2
G2-->G3
G4-->G3
G5-->G3
G6-->G2
G9-->GB
GC-->GB
GD-->GB
GI-->GK
GK-->GL
GM-->GK
GN-->GK
GO-->GL
GS-->GU
GV-->GU
GY-->H0
H4-->H6
HC-->HE
HC-->HF
HG-->HF
HJ-->HL
HM-->HL
HQ-->HS
HT-->HS
HW-->HY
I1-->I3
I1-->I4
I1-->I5
I3-->I4
I6-->I3
IA-->IC
ID-->IC
IG-->II
IL-->IN
IO-->IN
IR-->IT
IT-->IU
IX-->IZ
IZ-->J0
IZ-->J1
IZ-->J2
IZ-->J3
J1-->J0
J1-->J2
J4-->J5
J8-->JA
JE-->JG
JH-->JG
JK-->JM
JP-->JR
JP-->JS
JP-->JT
JP-->JU
JZ-->K1
JZ-->K2
K2-->K1
K6-->K8
K8-->K9
KC-->KE
KE-->KF
KI-->KK
KI-->KM
KI-->KN
KI-->KL
KK-->KL
KO-->KL
KR-->KT
KR-->KU
KR-->KV
KV-->KU
KW-->KT
KZ-->L1
KZ-->L2
L2-->L1
L3-->L2
L7-->L9
L7-->LA
LA-->L9
LD-->LF
LJ-->LL
LM-->LL
LQ-->LS
LT-->LS
LW-->LY
LZ-->LY
M2-->M4
M7-->M9
ME-->MG
MJ-->ML
MJ-->MM
MP-->MR
MS-->MT
MX-->MZ
N2-->N4
N7-->N9
NE-->NG
NE-->NH
NL-->NN
NL-->NO
NP-->NO
NS-->NU
NS-->O5
NS-->NW
NS-->O0
NS-->O6
NS-->O7
NS-->O8
NS-->O9
NS-->OA
NS-->OB
NS-->NX
NS-->O1
NS-->NZ
NS-->NV
NS-->OC
NS-->O2
NS-->OD
NS-->O3
NS-->NY
NS-->OE
NS-->O4
NU-->NV
NV-->NU
NV-->NW
NV-->NX
NV-->NZ
NV-->O2
NV-->O3
NW-->NV
NX-->NV
NX-->NY
NY-->NX
NZ-->O0
NZ-->O1
NZ-->NV
O1-->O0
O1-->NZ
O2-->O3
O2-->O4
O3-->NZ
O3-->NV
O3-->O2
O5-->NV
O5-->O4
O6-->O7
O8-->O4
O9-->O7
O9-->O4
OA-->NV
OA-->O2
OC-->O4
OD-->OA
OI-->OK
OI-->OL
OI-->OM
OI-->ON
OO-->OK
OP-->ON
OS-->OU
OS-->OV
OS-->OW
OS-->OX
OS-->OY
OS-->OZ
OS-->P0
OS-->P1
OS-->P2
OS-->P3
OS-->P4
OS-->P5
OS-->P6
P2-->P1
P9-->PB
P9-->PG
P9-->PJ
P9-->PH
P9-->PL
P9-->PN
P9-->PO
P9-->PF
P9-->PC
P9-->PP
P9-->PQ
P9-->PS
P9-->PK
P9-->PT
P9-->PM
P9-->PR
P9-->PU
P9-->PV
P9-->PD
P9-->PI
P9-->PE
PB-->PC
PB-->PD
PB-->PE
PE-->PB
PE-->PF
PG-->PH
PG-->PI
PJ-->PK
PL-->PH
PL-->PM
PL-->PI
PM-->PH
PM-->PD
PM-->PI
PN-->PH
PN-->PI
PP-->PC
PP-->PD
PP-->PE
PQ-->PK
PQ-->PR
PR-->PM
PR-->PD
PR-->PE
PS-->PO
PS-->PQ
PT-->PM
PT-->PI
PU-->PR
PU-->PE
PZ-->Q1
PZ-->Q3
PZ-->Q4
PZ-->Q5
PZ-->Q6
PZ-->Q7
PZ-->Q8
PZ-->Q9
PZ-->QA
PZ-->QB
PZ-->QC
PZ-->QD
PZ-->QE
PZ-->QF
PZ-->QG
PZ-->QH
PZ-->QI
PZ-->Q2
Q1-->Q2
Q4-->Q2
QI-->Q2
QJ-->Q1
QJ-->QI
QJ-->Q2
QK-->Q1
QL-->Q4
QL-->Q2
QM-->Q9
QN-->Q9
QO-->Q9
QP-->QA
QQ-->QA
QR-->QB
QS-->QH
QV-->QI
QW-->Q2
R0-->R2
R0-->R3
R0-->R4
R0-->R6
R0-->R7
R0-->R8
R0-->R9
R0-->RA
R0-->RB
R0-->RC
R0-->RD
R0-->RE
R0-->R5
R0-->RF
R0-->RG
R0-->RH
R0-->RI
R0-->RJ
R0-->RK
R0-->RL
R4-->R5
RF-->R5
RG-->R5
RM-->R2
RM-->RA
RM-->RJ
RM-->RL
RN-->R2
RN-->RA
RN-->RJ
RN-->RL
RO-->R4
RP-->R4
RQ-->R4
RR-->RC
RS-->RC
RT-->R5
RU-->RF
RU-->RK
RV-->RF
RV-->RK
RW-->RF
RW-->RK
RY-->R2
RY-->RG
RZ-->RH
S0-->RJ
S3-->S5
S8-->SA
S8-->SB
SH-->SK
SR-->ST
SU-->ST
SV-->ST
SW-->ST
SX-->ST
T0-->T2
T0-->T3
T0-->T5
T0-->TE
T0-->T6
T0-->T7
T0-->TF
T0-->TG
T0-->TA
T0-->TH
T0-->TI
T0-->TJ
T2-->T3
T2-->T5
T2-->T7
T5-->T6
T7-->T9
T7-->TC
T7-->TD
T7-->T6
T9-->TA
TC-->TA
TF-->T9
TF-->TC
TF-->TD
TF-->T6
TH-->T5
TI-->T2
TJ-->T5
TM-->TO
TM-->TR
TM-->TS
TM-->TT
TM-->TP
TM-->TQ
TO-->TP
TO-->TQ
TQ-->TP
TR-->TO
TS-->TQ
TU-->TR
TV-->TR
TW-->TR
TX-->TR
TY-->TR
TZ-->TO
U0-->TS
U1-->TT
U2-->TP
U2-->TQ
