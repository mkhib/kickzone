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
62["CustomersProductCard.no-low-stock.spec.tsx"]
63["CustomersProductCard.pants-size.spec.tsx"]
64["CustomersProductCard.spec.tsx"]
end
65["vite-env.d.ts"]
end
end
end
subgraph 66["contexts"]
subgraph 67["auth"]
subgraph 68["src"]
69["index.ts"]
subgraph 6A["lib"]
6B["CustomersAuthContext.tsx"]
6C["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6D["graphql"]
subgraph 6E["src"]
6F["index.ts"]
subgraph 6G["lib"]
6H["customer-profile.queries.ts"]
6I["mutations.ts"]
6J["Provider.tsx"]
6K["CustomersApolloProvider.tsx"]
6L["client.ts"]
6M["queries.ts"]
6N["apollo-upload-client.d.ts"]
end
end
end
subgraph 6O["hooks"]
subgraph 6P["auth"]
subgraph 6Q["src"]
6R["index.ts"]
subgraph 6S["lib"]
6T["useCustomersForgotPassword.tsx"]
6U["useCustomersLogin.tsx"]
6V["useCustomersRegister.tsx"]
6W["useCustomersResetPassword.tsx"]
6X["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6Y["cart"]
6Z["jest.config.ts"]
70["jest.setup.ts"]
subgraph 71["src"]
72["index.ts"]
subgraph 73["lib"]
74["customers-cart-hook.tsx"]
75["useCartService.ts"]
76["useWishlistSync.ts"]
77["useCartService.spec.tsx"]
78["useCartSync.ts"]
end
end
end
subgraph 79["orders"]
subgraph 7A["src"]
7B["index.ts"]
subgraph 7C["lib"]
7D["customers-orders-hook.tsx"]
end
end
end
subgraph 7E["products"]
subgraph 7F["src"]
7G["index.ts"]
subgraph 7H["lib"]
7I["customers-product-hook.tsx"]
end
end
end
end
subgraph 7J["router"]
subgraph 7K["src"]
7L["index.ts"]
subgraph 7M["lib"]
7N["CustomersRouter.tsx"]
7O["ScrollToTop.tsx"]
7P["CustomersRouter.spec.tsx"]
7Q["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7R["routes"]
subgraph 7S["src"]
7T["index.ts"]
subgraph 7U["lib"]
7V["customer-routes.ts"]
7W["customer-routes.spec.ts"]
end
end
end
subgraph 7X["screens"]
subgraph 7Y["contact"]
subgraph 7Z["src"]
80["index.ts"]
subgraph 81["lib"]
82["customer-contact.tsx"]
83["customer-contact.spec.tsx"]
end
end
84["vite.config.ts"]
end
subgraph 85["customer-checkout"]
subgraph 86["src"]
87["index.ts"]
subgraph 88["lib"]
89["customer-checkout.tsx"]
end
end
end
subgraph 8A["customer-favorites"]
subgraph 8B["src"]
8C["index.ts"]
subgraph 8D["lib"]
8E["customer-favorites.tsx"]
8F["customer-favorites.spec.tsx"]
end
end
8G["vite.config.ts"]
end
subgraph 8H["customer-login"]
subgraph 8I["src"]
8J["index.ts"]
subgraph 8K["lib"]
8L["customer-login.tsx"]
end
end
end
subgraph 8M["customer-order-confirmation"]
subgraph 8N["src"]
8O["index.ts"]
subgraph 8P["lib"]
8Q["customer-order-confirmation.tsx"]
8R["customer-order-confirmation.pants-size.spec.tsx"]
8S["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8T["customer-orders"]
subgraph 8U["src"]
8V["index.ts"]
subgraph 8W["lib"]
8X["customer-orders.tsx"]
end
end
end
subgraph 8Y["customer-payment"]
subgraph 8Z["src"]
90["index.ts"]
subgraph 91["lib"]
92["customer-payment-callback.tsx"]
93["use-zarinpal-payment.tsx"]
94["zarinpal-payment-service.ts"]
95["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 96["customer-products"]
subgraph 97["src"]
98["index.ts"]
subgraph 99["lib"]
9A["customer-products.tsx"]
end
end
end
subgraph 9B["customer-profile"]
subgraph 9C["src"]
9D["index.ts"]
subgraph 9E["lib"]
9F["customer-profile.tsx"]
9G["customer-profile.spec.tsx"]
end
end
end
subgraph 9H["customer-shopping-cart"]
subgraph 9I["src"]
9J["index.ts"]
subgraph 9K["lib"]
9L["customer-shopping-cart.tsx"]
9M["customer-shopping-cart.pants-size.spec.tsx"]
9N["customer-shopping-cart.spec.tsx"]
end
end
9O["vite.config.ts"]
end
subgraph 9P["customer-signup"]
subgraph 9Q["src"]
9R["index.ts"]
subgraph 9S["lib"]
9T["customer-signup.tsx"]
9U["customer-signup.password-length.spec.tsx"]
9V["customer-signup.spec.tsx"]
9W["customer-signup.zod.spec.tsx"]
end
end
end
subgraph 9X["forgot-password"]
subgraph 9Y["src"]
9Z["index.ts"]
subgraph A0["lib"]
A1["customer-forgot-password.tsx"]
A2["customer-forgot-password.spec.tsx"]
A3["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A4["guide-authenticity"]
subgraph A5["src"]
A6["index.ts"]
subgraph A7["lib"]
A8["customer-guide-authenticity.tsx"]
A9["customer-guide-authenticity.spec.tsx"]
end
end
AA["vite.config.ts"]
end
subgraph AB["guide-payment"]
subgraph AC["src"]
AD["index.ts"]
subgraph AE["lib"]
AF["customer-guide-payment.tsx"]
AG["customer-guide-payment.spec.tsx"]
end
end
AH["vite.config.ts"]
end
subgraph AI["home"]
subgraph AJ["src"]
AK["index.ts"]
subgraph AL["lib"]
AM["CustomersHomeScreen.tsx"]
subgraph AN["components"]
AO["CategoryBentoSection.tsx"]
AQ["HeroSection.tsx"]
AR["HomeLoadingScreen.tsx"]
AS["PicksRailSection.tsx"]
AT["TrustStripSection.tsx"]
AY["NewArrivalsSection.tsx"]
B0["BrandBlocksSection.tsx"]
B1["NewsletterSection.tsx"]
B2["ShopTheLookSection.tsx"]
B3["TickerSection.tsx"]
end
AP["home-selectors.ts"]
AU["useScrollProgress.ts"]
AV["CustomersShopScreen.tsx"]
AW["CustomersHomeScreen.cart-size.spec.tsx"]
AX["CustomersHomeScreen.spec.tsx"]
AZ["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph B4["login"]
subgraph B5["src"]
B6["index.ts"]
subgraph B7["lib"]
B8["CustomersLoginScreen.tsx"]
B9["CustomersLoginScreen.spec.tsx"]
BA["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BB["not-found"]
subgraph BC["src"]
BD["index.ts"]
subgraph BE["lib"]
BF["customer-not-found.tsx"]
BG["customer-not-found.spec.tsx"]
end
end
BH["vite.config.ts"]
end
subgraph BI["privacy-policy"]
subgraph BJ["src"]
BK["index.ts"]
subgraph BL["lib"]
BM["customer-privacy-policy.tsx"]
BN["customer-privacy-policy.spec.tsx"]
end
end
BO["vite.config.ts"]
end
subgraph BP["product-details"]
subgraph BQ["src"]
BR["index.ts"]
subgraph BS["lib"]
BT["customer-product-details.tsx"]
BU["customer-product-details.no-low-stock.spec.tsx"]
BV["customer-product-details.pants-size.spec.tsx"]
BW["customer-product-details.spec.tsx"]
end
end
BX["vite.config.ts"]
end
subgraph BY["reset-password"]
subgraph BZ["src"]
C0["index.ts"]
subgraph C1["lib"]
C2["customer-reset-password.tsx"]
C3["customer-reset-password.password-length.spec.tsx"]
C4["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph C5["shipping-returns"]
subgraph C6["src"]
C7["index.ts"]
subgraph C8["lib"]
C9["customer-shipping-returns.tsx"]
CA["customer-shipping-returns.spec.tsx"]
end
end
CB["vite.config.ts"]
end
subgraph CC["unauthorized"]
subgraph CD["src"]
CE["index.ts"]
subgraph CF["lib"]
CG["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CH["utility"]
subgraph CI["test"]
subgraph CJ["src"]
CK["index.ts"]
subgraph CL["lib"]
CM["customers-test-utility.tsx"]
end
end
end
end
subgraph CN["validations"]
subgraph CO["src"]
CP["index.ts"]
subgraph CQ["lib"]
CR["shipping-validation.ts"]
CS["shipping-validation.spec.tsx"]
CT["shipping-validation.tsx"]
end
end
end
subgraph CU["zustand"]
subgraph CV["customer-cart-store"]
subgraph CW["src"]
CX["index.ts"]
subgraph CY["lib"]
CZ["customer-cart-store.ts"]
D0["customer-cart-store.spec.ts"]
D1["customer-cart-store.tsx"]
end
end
end
subgraph D2["customer-checkout-store"]
subgraph D3["src"]
D4["index.ts"]
subgraph D5["lib"]
D6["customer-checkout-store.ts"]
D7["customer-checkout-store.spec.ts"]
end
end
D8["vite.config.ts"]
end
subgraph D9["customer-wishlist-store"]
subgraph DA["src"]
DB["index.ts"]
subgraph DC["lib"]
DD["customer-wishlist-store.ts"]
DE["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DF["src"]
DG["index.ts"]
subgraph DH["lib"]
DI["customers-products-store.tsx"]
end
end
end
end
subgraph DJ["sellers"]
subgraph DK["components"]
subgraph DL["footer"]
subgraph DM["src"]
DN["index.ts"]
subgraph DO["lib"]
DP["sellers-footer.tsx"]
DQ["sellers-footer.spec.tsx"]
end
end
end
subgraph DR["headerbar"]
subgraph DS["src"]
DT["index.ts"]
subgraph DU["lib"]
DV["SellersHeaderbar.tsx"]
end
end
end
subgraph DW["layout"]
subgraph DX["src"]
DY["index.ts"]
subgraph DZ["lib"]
E0["SellersLayout.tsx"]
E1["SellersTabbar.tsx"]
end
end
end
end
subgraph E2["contexts"]
subgraph E3["auth"]
subgraph E4["src"]
E5["index.ts"]
subgraph E6["lib"]
E7["SellersAuthContext.tsx"]
E8["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E9["graphql"]
subgraph EA["src"]
EB["index.ts"]
subgraph EC["lib"]
ED["fragments.ts"]
EE["mutations.ts"]
EF["Provider.tsx"]
EG["SellersApolloProvider.tsx"]
EH["client.ts"]
EI["queries.ts"]
EJ["seller-orders.graphql.ts"]
EK["apollo-upload-client.d.ts"]
end
subgraph EL["types"]
EM["apollo-upload-client.d.ts"]
end
end
end
subgraph EN["hooks"]
subgraph EO["auth"]
subgraph EP["src"]
EQ["index.ts"]
subgraph ER["lib"]
ES["useSellerAuth.ts"]
ET["sellerAuth.graphql.ts"]
end
end
end
subgraph EU["orders"]
subgraph EV["src"]
EW["index.ts"]
subgraph EX["lib"]
EY["useSellerOrders.ts"]
EZ["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph F0["products"]
subgraph F1["src"]
F2["index.ts"]
subgraph F3["lib"]
F4["useSellersProductManagement.ts"]
F5["useSellersProducts.ts"]
end
end
end
end
subgraph F6["router"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["SellersRouter.tsx"]
end
end
end
subgraph FB["routes"]
subgraph FC["src"]
FD["index.ts"]
subgraph FE["lib"]
FF["seller-routes.ts"]
end
end
end
subgraph FG["screens"]
subgraph FH["catalog"]
subgraph FI["src"]
FJ["index.ts"]
subgraph FK["lib"]
FL["SellersCatalogScreens.tsx"]
FM["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FN["login"]
subgraph FO["src"]
FP["index.ts"]
subgraph FQ["lib"]
FR["SellersLogin.tsx"]
FS["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph FT["manage-product"]
subgraph FU["src"]
FV["index.ts"]
subgraph FW["lib"]
FX["SellersManageProductScreen.tsx"]
FY["SellersDefineProductFlow.tsx"]
FZ["SellersDefineProductFlow.pants-label.spec.tsx"]
G0["SellersDefineProductFlow.spec.tsx"]
G1["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph G2["products"]
subgraph G3["src"]
G4["index.ts"]
subgraph G5["lib"]
G6["SellersProducts.tsx"]
G7["SellersProducts.pants-label.spec.tsx"]
G8["SellersProducts.spec.tsx"]
end
end
end
subgraph G9["seller-orders"]
GA["jest.config.ts"]
GB["jest.setup.ts"]
subgraph GC["src"]
GD["index.ts"]
subgraph GE["lib"]
GF["seller-orders-screen.tsx"]
GG["seller-status-transitions.ts"]
GH["seller-orders-screen.pants-size.spec.tsx"]
GI["seller-orders-screen.spec.tsx"]
GJ["seller-status-transitions.spec.ts"]
end
GK["test-setup.ts"]
end
end
subgraph GL["setup-password"]
subgraph GM["src"]
GN["index.ts"]
subgraph GO["lib"]
GP["SellersSetupPassword.tsx"]
GQ["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GR["unauthorized"]
subgraph GS["src"]
GT["index.ts"]
subgraph GU["lib"]
GV["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GW["zustand"]
subgraph GX["sellers-products-store"]
subgraph GY["src"]
GZ["index.ts"]
subgraph H0["lib"]
H1["useSellersProductsStore.ts"]
H2["sellers-products-store.tsx"]
end
end
end
end
end
subgraph H3["shared"]
subgraph H4["components"]
subgraph H5["apollo-provider-base"]
subgraph H6["src"]
H7["index.ts"]
subgraph H8["lib"]
H9["ApolloProviderBase.tsx"]
HA["createSilentRefreshAuthLink.ts"]
HB["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HC["error-boundary"]
subgraph HD["src"]
HE["index.ts"]
subgraph HF["lib"]
HG["error-boundary.tsx"]
HH["error-boundary.spec.tsx"]
end
end
HI["vite.config.ts"]
end
subgraph HJ["glassmorphism-container"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["glassmorphism-container.tsx"]
HO["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HP["layout"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["Layout.tsx"]
end
end
end
subgraph HU["material-data-table"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["material-data-table.tsx"]
HZ["table-config.ts"]
I0["table-utils.ts"]
I1["material-data-table.spec.tsx"]
I2["table-types.ts"]
end
end
end
subgraph I3["order-status-chip"]
subgraph I4["src"]
I5["index.ts"]
subgraph I6["lib"]
I7["order-status-chip.tsx"]
I8["order-status-chip.spec.tsx"]
end
end
end
subgraph I9["password-field"]
subgraph IA["src"]
IB["index.ts"]
subgraph IC["lib"]
ID["PasswordTextField.tsx"]
end
end
end
subgraph IE["price-display"]
subgraph IF["src"]
IG["index.ts"]
subgraph IH["lib"]
II["price-display.tsx"]
IJ["price-display.spec.tsx"]
end
end
end
subgraph IK["private-route"]
subgraph IL["src"]
IM["index.ts"]
subgraph IN["lib"]
IO["createPrivateRoute.tsx"]
IP["PrivateRoute.tsx"]
end
end
end
subgraph IQ["rtl-table-utils"]
subgraph IR["src"]
IS["index.ts"]
subgraph IT["lib"]
IU["rtl-table-utils.ts"]
IV["rtl-cell-components.tsx"]
IW["rtl-column-helpers.ts"]
IX["rtl-table-props.ts"]
IY["use-table-alignment.ts"]
IZ["rtl-table-utils.spec.tsx"]
J0["rtl-table-utils.tsx"]
end
end
end
subgraph J1["snackbar"]
subgraph J2["src"]
J3["index.ts"]
subgraph J4["lib"]
J5["snackbar.tsx"]
J6["Snackbar.tsx"]
end
end
end
subgraph J7["styled-drawer"]
subgraph J8["src"]
J9["index.ts"]
subgraph JA["lib"]
JB["styled-drawer.tsx"]
JC["styled-drawer.spec.tsx"]
end
end
end
subgraph JD["unauthorized"]
subgraph JE["src"]
JF["index.ts"]
subgraph JG["lib"]
JH["unauthorized-path.tsx"]
end
end
end
end
subgraph JI["graphql"]
subgraph JJ["src"]
JK["index.ts"]
subgraph JL["lib"]
JM["currency.mutations.ts"]
JN["currency.queries.ts"]
JO["fragments.ts"]
JP["variant-colors.ts"]
JQ["client-shared-graphql.tsx"]
end
end
end
subgraph JR["hooks"]
subgraph JS["brands"]
subgraph JT["src"]
JU["index.ts"]
subgraph JV["lib"]
JW["brands.graphql.ts"]
JX["useBrands.ts"]
end
end
JY["vite.config.ts"]
end
subgraph JZ["categories"]
subgraph K0["src"]
K1["index.ts"]
subgraph K2["lib"]
K3["useCategories.ts"]
K4["categories.graphql.ts"]
end
end
end
subgraph K5["colors"]
subgraph K6["src"]
K7["index.ts"]
subgraph K8["lib"]
K9["useColors.ts"]
KA["color.graphql.ts"]
end
end
end
subgraph KB["currency"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["useConvertPrice.tsx"]
KG["useExchangeRate.tsx"]
KH["useCurrencies.tsx"]
KI["useCurrencyForLocale.tsx"]
KJ["useExchangeRate.spec.tsx"]
end
end
end
subgraph KK["products"]
subgraph KL["src"]
KM["index.ts"]
subgraph KN["lib"]
KO["productImage.ts"]
KP["products.graphql.ts"]
KQ["useProducts.ts"]
KR["productImage.spec.ts"]
end
end
end
subgraph KS["site-languages"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["site-languages.graphql.ts"]
KX["useSiteLanguages.ts"]
KY["site-languages-hook.spec.tsx"]
end
end
KZ["vite.config.ts"]
end
subgraph L0["snackbar"]
subgraph L1["src"]
L2["index.ts"]
subgraph L3["lib"]
L4["SnackbarContext.tsx"]
L5["useSnackbar.ts"]
end
end
end
subgraph L6["translations-management-hook"]
subgraph L7["src"]
L8["index.ts"]
subgraph L9["lib"]
LA["useTranslationsManagement.ts"]
end
end
end
end
subgraph LB["lottie"]
subgraph LC["empty-cart"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["lottie-empty-cart.tsx"]
LH["lottie-empty-cart.spec.tsx"]
end
end
LI["vite.config.ts"]
end
subgraph LJ["loading"]
subgraph LK["src"]
LL["index.ts"]
subgraph LM["lib"]
LN["lottie-loading.tsx"]
LO["lottie-loading.spec.tsx"]
end
end
end
subgraph LP["success-check"]
subgraph LQ["src"]
LR["index.ts"]
subgraph LS["lib"]
LT["lottie-success-check.tsx"]
LU["lottie-success-check.spec.tsx"]
end
end
end
subgraph LV["unauthorized"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["lottie-unauthorized.tsx"]
end
end
end
end
subgraph M0["translations"]
subgraph M1["src"]
M2["index.ts"]
subgraph M3["lib"]
M4["mapApolloErrorToTranslationKey.ts"]
M5["WrapTranslation.tsx"]
end
end
end
subgraph M6["ui"]
subgraph M7["colors"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["colors.ts"]
end
end
end
subgraph MC["language-components"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["language-components.tsx"]
MH["ltr-text-field.tsx"]
end
end
end
subgraph MI["sizes"]
subgraph MJ["src"]
MK["index.ts"]
subgraph ML["lib"]
MM["sizes.ts"]
MN["sizes.spec.tsx"]
MO["sizes.tsx"]
end
end
end
end
subgraph MP["zustand"]
subgraph MQ["shared-auth-store"]
subgraph MR["src"]
MS["index.ts"]
subgraph MT["lib"]
MU["shared-auth-store.ts"]
end
end
end
subgraph MV["shared-notification-store"]
subgraph MW["src"]
MX["index.ts"]
subgraph MY["lib"]
MZ["shared-notification-store.tsx"]
end
end
end
subgraph N0["shared-ui-store"]
subgraph N1["src"]
N2["index.ts"]
subgraph N3["lib"]
N4["shared-ui-store.ts"]
N5["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph N6["server"]
subgraph N7["controllers"]
subgraph N8["src"]
N9["index.ts"]
subgraph NA["lib"]
NB["auth.controller.ts"]
NC["order.controller.ts"]
end
end
end
subgraph ND["decorators"]
NE["jest.config.ts"]
subgraph NF["src"]
NG["index.ts"]
subgraph NH["lib"]
NI["current-user.decorator.ts"]
NJ["decorators.ts"]
NK["decorators.spec.ts"]
end
end
end
subgraph NL["entities"]
subgraph NM["src"]
NN["index.ts"]
subgraph NO["lib"]
NP["brand.entity.ts"]
NQ["product.entity.ts"]
NR["category.entity.ts"]
NS["product-description.entity.ts"]
NT["site-language.entity.ts"]
NU["product-info.entity.ts"]
NV["color.entity.ts"]
NW["product-info-color.entity.ts"]
NX["seller-info.entity.ts"]
NY["seller-product.entity.ts"]
NZ["user.entity.ts"]
O0["cart.entity.ts"]
O1["currency-preference.entity.ts"]
O2["currency.entity.ts"]
O3["customer.entity.ts"]
O4["exchange-rate.entity.ts"]
O5["order.entity.ts"]
O6["platform-settings.entity.ts"]
O7["refresh-token.entity.ts"]
O8["seller-order.entity.ts"]
O9["translation.entity.ts"]
end
end
end
subgraph OA["guards"]
OB["jest.config.ts"]
subgraph OC["src"]
OD["index.ts"]
subgraph OE["lib"]
OF["catalog.guard.ts"]
OG["graphql-auth.guard.ts"]
OH["http-auth.guard.ts"]
OI["roles.guard.ts"]
OJ["catalog.guard.spec.ts"]
OK["roles.guard.spec.ts"]
end
end
end
subgraph OL["inputs"]
subgraph OM["src"]
ON["index.ts"]
subgraph OO["lib"]
OP["brand.input.ts"]
OQ["cart.inputs.ts"]
OR["category.input.ts"]
OS["color.input.ts"]
OT["customer-auth.inputs.ts"]
OU["order-pagination.inputs.ts"]
OV["order.inputs.ts"]
OW["product-info-filter.input.ts"]
OX["product.input.ts"]
OY["seller-order-pagination.inputs.ts"]
OZ["seller.input.ts"]
P0["site-language.input.ts"]
P1["user.input.ts"]
end
end
end
subgraph P2["modules"]
subgraph P3["src"]
P4["index.ts"]
subgraph P5["lib"]
P6["auth.module.ts"]
P7["email.module.ts"]
P8["token.module.ts"]
P9["user.module.ts"]
PA["customer-profile.module.ts"]
PB["brand.module.ts"]
PC["catalog-guard.module.ts"]
PD["translation.module.ts"]
PE["cart.module.ts"]
PF["platform-settings.module.ts"]
PG["category.module.ts"]
PH["product.module.ts"]
PI["color.module.ts"]
PJ["currency.module.ts"]
PK["graphql-context.module.ts"]
PL["order.module.ts"]
PM["seller-info.module.ts"]
PN["payment.module.ts"]
PO["product-info.module.ts"]
PP["seller-products.module.ts"]
PQ["site-language.module.ts"]
end
end
end
subgraph PR["resolvers"]
PS["jest.config.ts"]
subgraph PT["src"]
PU["index.ts"]
subgraph PV["lib"]
PW["auth.resolver.ts"]
PX["zod-validation.pipe.ts"]
PY["brand.resolver.ts"]
PZ["cart.resolver.ts"]
Q0["category.resolver.ts"]
Q1["color.resolver.ts"]
Q2["currency.resolver.ts"]
Q3["customer-profile.resolver.ts"]
Q4["order.resolver.ts"]
Q5["payment.resolver.ts"]
Q6["product-info.resolver.ts"]
Q7["product.resolver.ts"]
Q8["seller-info.resolver.ts"]
Q9["shipping.resolver.ts"]
QA["site-language.resolver.ts"]
QB["translation.input.ts"]
QC["translation.resolver.ts"]
QD["user.resolver.ts"]
QE["auth-validation.spec.ts"]
QF["auth.resolver.spec.ts"]
QG["cart-validation.spec.ts"]
QH["order.resolver.spec.ts"]
QI["order.resolver.status-transitions.spec.ts"]
QJ["order.resolver.tracking.spec.ts"]
QK["payment.resolver.integration.spec.ts"]
QL["payment.resolver.spec.ts"]
QM["product-info.resolver.spec.ts"]
QN["translation.resolver.guards.spec.ts"]
subgraph QO["types"]
QP["graphql-upload.d.ts"]
end
QQ["user.resolver.spec.ts"]
QR["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QS["services"]
QT["jest.config.ts"]
subgraph QU["src"]
QV["index.ts"]
subgraph QW["lib"]
QX["auth.service.ts"]
QY["brand.service.ts"]
QZ["cart.service.ts"]
R0["product-info-colors.util.ts"]
R1["category.service.ts"]
R2["color.service.ts"]
R3["currency.service.ts"]
R4["customer-profile.service.ts"]
R5["email.service.ts"]
R6["image-upload.service.ts"]
R7["order.service.ts"]
R8["payment-logger.service.ts"]
R9["payment.service.ts"]
RA["product.service.ts"]
RB["seller-info.service.ts"]
RC["shipping-calculation.service.ts"]
RD["site-language.service.ts"]
RE["token.service.ts"]
RF["translation.service.ts"]
RG["user.service.ts"]
RH["auth.service.password-policy.spec.ts"]
RI["auth.service.spec.ts"]
RJ["cart.service.add-quantity.spec.ts"]
RK["cart.service.null-relations.spec.ts"]
RL["cart.service.spec.ts"]
RM["order.service.spec.ts"]
RN["order.service.tracking.spec.ts"]
RO["product-info-colors.util.spec.ts"]
RP["product.service.pants.spec.ts"]
RQ["product.service.spec.ts"]
RR["relay-connection.spec.ts"]
RS["seller-info.service.price-validation.spec.ts"]
RT["shipping-calculation.service.spec.ts"]
RU["token.service.spec.ts"]
end
end
end
subgraph RV["strategies"]
subgraph RW["src"]
RX["index.ts"]
subgraph RY["lib"]
RZ["local.strategy.ts"]
end
end
end
subgraph S0["utils"]
subgraph S1["src"]
S2["index.ts"]
subgraph S3["lib"]
S4["email-templates.ts"]
S5["relay-connection.ts"]
S6["pagination.ts"]
end
end
end
end
subgraph S7["shared"]
subgraph S8["codegen"]
S9["jest.config.ts"]
subgraph SA["src"]
SB["index.ts"]
subgraph SC["lib"]
subgraph SD["generated"]
SE["graphql.ts"]
end
end
end
end
subgraph SF["graphql-schema"]
SG["jest.config.ts"]
subgraph SH["src"]
SI["index.ts"]
end
end
subgraph SJ["product-sizes"]
subgraph SK["src"]
SL["index.ts"]
subgraph SM["lib"]
SN["product-sizes.ts"]
SO["product-sizes.pants-formats.spec.ts"]
SP["product-sizes.pants-label.spec.ts"]
SQ["product-sizes.pants-strict.spec.ts"]
SR["product-sizes.spec.ts"]
end
end
end
subgraph SS["shared-i18n"]
subgraph ST["src"]
SU["index.ts"]
subgraph SV["lib"]
SW["language-context.tsx"]
SX["language-detector.ts"]
subgraph SY["locales"]
SZ["i18n-react.tsx"]
T0["i18n-util.ts"]
T1["i18n-util.async.ts"]
subgraph T2["en"]
T3["index.ts"]
end
subgraph T5["fa"]
T6["index.ts"]
end
T7["formatters.ts"]
T8["i18n-types.ts"]
T9["i18n-util.sync.ts"]
TA["navigator-detector.ts"]
end
T4["site-name.ts"]
TB["table-localization.ts"]
TC["theme-provider.tsx"]
TD["use-page-title.ts"]
end
end
end
subgraph TE["validation"]
subgraph TF["src"]
TG["index.ts"]
subgraph TH["lib"]
TI["auth.ts"]
TJ["limits.ts"]
TK["primitives.ts"]
TL["auth-forms.ts"]
TM["cart.ts"]
TN["errors.ts"]
TO["auth-forms.admin.spec.ts"]
TP["auth-forms.login.spec.ts"]
TQ["auth-forms.recovery.spec.ts"]
TR["auth-forms.seller.spec.ts"]
TS["auth-forms.spec.ts"]
TT["auth.spec.ts"]
TU["cart.spec.ts"]
TV["errors.spec.ts"]
TW["primitives.spec.ts"]
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
64-->61
69-->6B
6C-->6B
6F-->6H
6F-->6I
6F-->6J
6F-->6M
6J-->6K
6K-->6L
6R-->6T
6R-->6U
6R-->6V
6R-->6W
6X-->6U
72-->74
72-->75
72-->76
77-->75
78-->74
7B-->7D
7G-->7I
7L-->7N
7L-->7O
7N-->7O
7P-->7N
7Q-->7O
7T-->7V
7W-->7V
80-->82
83-->82
87-->89
8C-->8E
8F-->8E
8J-->8L
8O-->8Q
8R-->8Q
8S-->8Q
8V-->8X
90-->92
90-->93
90-->94
92-->93
93-->94
95-->92
98-->9A
9D-->9F
9G-->9F
9J-->9L
9M-->9L
9N-->9L
9R-->9T
9U-->9T
9V-->9T
9W-->9T
9Z-->A1
A2-->A1
A3-->A1
A6-->A8
A9-->A8
AD-->AF
AG-->AF
AK-->AM
AK-->AV
AK-->AP
AK-->AU
AM-->AO
AM-->AQ
AM-->AR
AM-->AS
AM-->AT
AM-->AP
AM-->AU
AO-->AP
AV-->AP
AW-->AS
AW-->AM
AW-->AP
AX-->AY
AX-->AS
AX-->AM
AX-->AV
AX-->AP
AZ-->AV
B0-->AP
B2-->AP
B6-->B8
B9-->B8
BA-->B8
BD-->BF
BG-->BF
BK-->BM
BN-->BM
BR-->BT
BU-->BT
BV-->BT
BW-->BT
C0-->C2
C3-->C2
C4-->C2
C7-->C9
CA-->C9
CE-->CG
CK-->CM
CP-->CR
CS-->CR
CS-->CT
CX-->CZ
D0-->CZ
D4-->D6
D7-->D6
DB-->DD
DE-->DD
DG-->DI
DN-->DP
DQ-->DP
DT-->DV
DY-->E0
DY-->E1
E0-->E1
E5-->E7
E8-->E7
EB-->ED
EB-->EE
EB-->EF
EB-->EI
EF-->EG
EG-->EH
EI-->ED
EI-->EJ
EQ-->ES
ES-->ET
EW-->EY
F2-->F4
F2-->F5
F8-->FA
FD-->FF
FJ-->FL
FM-->FL
FP-->FR
FS-->FR
FV-->FX
FX-->FY
FZ-->FY
G0-->FY
G1-->FX
G4-->G6
G7-->G6
G8-->G6
GD-->GF
GF-->GG
GH-->GF
GI-->GF
GJ-->GG
GN-->GP
GQ-->GP
GT-->GV
GZ-->H1
H7-->H9
H7-->HA
HB-->HA
HE-->HG
HH-->HG
HL-->HN
HO-->HN
HR-->HT
HW-->HY
HW-->HZ
HW-->I0
HY-->HZ
I1-->HY
I5-->I7
I8-->I7
IB-->ID
IG-->II
IJ-->II
IM-->IO
IO-->IP
IS-->IU
IU-->IV
IU-->IW
IU-->IX
IU-->IY
IW-->IV
IW-->IX
IZ-->J0
J3-->J5
J9-->JB
JC-->JB
JF-->JH
JK-->JM
JK-->JN
JK-->JO
JK-->JP
JU-->JW
JU-->JX
JX-->JW
K1-->K3
K3-->K4
K7-->K9
K9-->KA
KD-->KF
KD-->KH
KD-->KI
KD-->KG
KF-->KG
KJ-->KG
KM-->KO
KM-->KP
KM-->KQ
KQ-->KP
KR-->KO
KU-->KW
KU-->KX
KX-->KW
KY-->KX
L2-->L4
L2-->L5
L5-->L4
L8-->LA
LE-->LG
LH-->LG
LL-->LN
LO-->LN
LR-->LT
LU-->LT
LX-->LZ
M2-->M4
M9-->MB
ME-->MG
ME-->MH
MK-->MM
MN-->MO
MS-->MU
MX-->MZ
N2-->N4
N9-->NB
N9-->NC
NG-->NI
NG-->NJ
NK-->NJ
NN-->NP
NN-->O0
NN-->NR
NN-->NV
NN-->O1
NN-->O2
NN-->O3
NN-->O4
NN-->O5
NN-->O6
NN-->NS
NN-->NW
NN-->NU
NN-->NQ
NN-->O7
NN-->NX
NN-->O8
NN-->NY
NN-->NT
NN-->O9
NN-->NZ
NP-->NQ
NQ-->NP
NQ-->NR
NQ-->NS
NQ-->NU
NQ-->NX
NQ-->NY
NR-->NQ
NS-->NQ
NS-->NT
NT-->NS
NU-->NV
NU-->NW
NU-->NQ
NW-->NV
NW-->NU
NX-->NY
NX-->NZ
NY-->NU
NY-->NQ
NY-->NX
O0-->NQ
O0-->NZ
O1-->O2
O3-->NZ
O4-->O2
O4-->NZ
O5-->NQ
O5-->NX
O7-->NZ
O8-->O5
OD-->OF
OD-->OG
OD-->OH
OD-->OI
OJ-->OF
OK-->OI
ON-->OP
ON-->OQ
ON-->OR
ON-->OS
ON-->OT
ON-->OU
ON-->OV
ON-->OW
ON-->OX
ON-->OY
ON-->OZ
ON-->P0
ON-->P1
OX-->OW
P4-->P6
P4-->PB
P4-->PE
P4-->PC
P4-->PG
P4-->PI
P4-->PJ
P4-->PA
P4-->P7
P4-->PK
P4-->PL
P4-->PN
P4-->PF
P4-->PO
P4-->PH
P4-->PM
P4-->PP
P4-->PQ
P4-->P8
P4-->PD
P4-->P9
P6-->P7
P6-->P8
P6-->P9
P9-->P6
P9-->PA
PB-->PC
PB-->PD
PE-->PF
PG-->PC
PG-->PH
PG-->PD
PH-->PC
PH-->P8
PH-->PD
PI-->PC
PI-->PD
PK-->P7
PK-->P8
PK-->P9
PL-->PF
PL-->PM
PM-->PH
PM-->P8
PM-->P9
PN-->PL
PO-->PH
PO-->PD
PP-->PM
PP-->P9
PU-->PW
PU-->PY
PU-->PZ
PU-->Q0
PU-->Q1
PU-->Q2
PU-->Q3
PU-->Q4
PU-->Q5
PU-->Q6
PU-->Q7
PU-->Q8
PU-->Q9
PU-->QA
PU-->QB
PU-->QC
PU-->QD
PU-->PX
PW-->PX
PZ-->PX
QD-->PX
QE-->PW
QE-->QD
QE-->PX
QF-->PW
QG-->PZ
QG-->PX
QH-->Q4
QI-->Q4
QJ-->Q4
QK-->Q5
QL-->Q5
QM-->Q6
QN-->QC
QQ-->QD
QR-->PX
QV-->QX
QV-->QY
QV-->QZ
QV-->R1
QV-->R2
QV-->R3
QV-->R4
QV-->R5
QV-->R6
QV-->R7
QV-->R8
QV-->R9
QV-->R0
QV-->RA
QV-->RB
QV-->RC
QV-->RD
QV-->RE
QV-->RF
QV-->RG
QZ-->R0
RA-->R0
RB-->R0
RH-->QX
RH-->R5
RH-->RE
RH-->RG
RI-->QX
RI-->R5
RI-->RE
RI-->RG
RJ-->QZ
RK-->QZ
RL-->QZ
RM-->R7
RN-->R7
RO-->R0
RP-->RA
RP-->RF
RQ-->RA
RQ-->RF
RS-->QX
RS-->RB
RT-->RC
RU-->RE
RX-->RZ
S2-->S4
S2-->S5
SB-->SE
SL-->SN
SO-->SN
SP-->SN
SQ-->SN
SR-->SN
SU-->SW
SU-->SX
SU-->SZ
SU-->T8
SU-->T0
SU-->T1
SU-->T9
SU-->TA
SU-->T4
SU-->TB
SU-->TC
SU-->TD
SW-->SX
SW-->SZ
SW-->T1
SZ-->T0
T1-->T3
T1-->T6
T1-->T7
T1-->T0
T3-->T4
T6-->T4
T9-->T3
T9-->T6
T9-->T7
T9-->T0
TB-->SZ
TC-->SW
TD-->SZ
TG-->TI
TG-->TL
TG-->TM
TG-->TN
TG-->TJ
TG-->TK
TI-->TJ
TI-->TK
TK-->TJ
TL-->TI
TM-->TK
TO-->TL
TP-->TL
TQ-->TL
TR-->TL
TS-->TL
TT-->TI
TU-->TM
TV-->TN
TW-->TJ
TW-->TK
