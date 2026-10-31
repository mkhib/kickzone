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
end
end
end
subgraph 3U["product-editor"]
subgraph 3V["src"]
3W["index.spec.tsx"]
3X["index.ts"]
subgraph 3Y["lib"]
3Z["AdminProductEditor.tsx"]
40["AdminProductEditor.pants-range.spec.tsx"]
41["AdminProductEditor.spec.tsx"]
end
42["vite-env.d.ts"]
end
end
subgraph 43["products"]
subgraph 44["src"]
45["index.spec.tsx"]
46["index.ts"]
subgraph 47["lib"]
48["AdminProducts.tsx"]
49["adminProducts.hooks.ts"]
4A["adminProducts.graphql.ts"]
4B["ProductImageManagementModal.tsx"]
4C["AdminProducts.spec.tsx"]
4D["ProductImageManagementModal.pants-size.spec.tsx"]
4E["ProductImageManagementModal.spec.tsx"]
end
4F["vite-env.d.ts"]
end
end
subgraph 4G["seller-management"]
subgraph 4H["src"]
4I["index.spec.tsx"]
4J["index.ts"]
subgraph 4K["lib"]
4L["SellerManagement.tsx"]
4M["SellerManagement.spec.tsx"]
end
4N["vite-env.d.ts"]
end
end
subgraph 4O["translation-management"]
subgraph 4P["src"]
4Q["index.ts"]
subgraph 4R["lib"]
4S["AdminTranslationManagement.tsx"]
4T["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4U["unauthorized"]
subgraph 4V["src"]
4W["index.spec.tsx"]
4X["index.ts"]
subgraph 4Y["lib"]
4Z["admins-unauthorized-screen.tsx"]
50["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 51["zustand"]
subgraph 52["admins-products-store"]
subgraph 53["src"]
54["index.spec.ts"]
55["index.ts"]
subgraph 56["lib"]
57["admins-products-store.ts"]
58["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 59["customers"]
subgraph 5A["components"]
subgraph 5B["footer"]
subgraph 5C["src"]
5D["index.ts"]
subgraph 5E["lib"]
5F["customers-footer.tsx"]
5G["TrustBadgeIcons.tsx"]
5H["customers-footer.spec.tsx"]
end
end
end
subgraph 5I["headerbar"]
subgraph 5J["src"]
5K["index.ts"]
subgraph 5L["lib"]
5M["CustomersHeaderbar.tsx"]
5N["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5O["layout"]
subgraph 5P["src"]
5Q["index.ts"]
subgraph 5R["lib"]
5S["CustomersLayout.tsx"]
5T["CustomersTabbar.tsx"]
5U["CustomersLayout.spec.tsx"]
5V["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5W["product-card"]
subgraph 5X["src"]
5Y["index.ts"]
subgraph 5Z["lib"]
60["CustomersProductCard.tsx"]
61["CustomersProductCard.pants-size.spec.tsx"]
62["CustomersProductCard.spec.tsx"]
end
63["vite-env.d.ts"]
end
end
end
subgraph 64["contexts"]
subgraph 65["auth"]
subgraph 66["src"]
67["index.ts"]
subgraph 68["lib"]
69["CustomersAuthContext.tsx"]
6A["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6B["graphql"]
subgraph 6C["src"]
6D["index.ts"]
subgraph 6E["lib"]
6F["customer-profile.queries.ts"]
6G["mutations.ts"]
6H["Provider.tsx"]
6I["CustomersApolloProvider.tsx"]
6J["client.ts"]
6K["queries.ts"]
6L["apollo-upload-client.d.ts"]
end
end
end
subgraph 6M["hooks"]
subgraph 6N["auth"]
subgraph 6O["src"]
6P["index.ts"]
subgraph 6Q["lib"]
6R["useCustomersForgotPassword.tsx"]
6S["useCustomersLogin.tsx"]
6T["useCustomersRegister.tsx"]
6U["useCustomersResetPassword.tsx"]
6V["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6W["cart"]
6X["jest.config.ts"]
6Y["jest.setup.ts"]
subgraph 6Z["src"]
70["index.ts"]
subgraph 71["lib"]
72["customers-cart-hook.tsx"]
73["useCartService.ts"]
74["useWishlistSync.ts"]
75["useCartService.spec.tsx"]
76["useCartSync.ts"]
end
end
end
subgraph 77["orders"]
subgraph 78["src"]
79["index.ts"]
subgraph 7A["lib"]
7B["customers-orders-hook.tsx"]
end
end
end
subgraph 7C["products"]
subgraph 7D["src"]
7E["index.ts"]
subgraph 7F["lib"]
7G["customers-product-hook.tsx"]
end
end
end
end
subgraph 7H["router"]
subgraph 7I["src"]
7J["index.ts"]
subgraph 7K["lib"]
7L["CustomersRouter.tsx"]
7M["ScrollToTop.tsx"]
7N["CustomersRouter.spec.tsx"]
7O["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7P["routes"]
subgraph 7Q["src"]
7R["index.ts"]
subgraph 7S["lib"]
7T["customer-routes.ts"]
7U["customer-routes.spec.ts"]
end
end
end
subgraph 7V["screens"]
subgraph 7W["contact"]
subgraph 7X["src"]
7Y["index.ts"]
subgraph 7Z["lib"]
80["customer-contact.tsx"]
81["customer-contact.spec.tsx"]
end
end
82["vite.config.ts"]
end
subgraph 83["customer-checkout"]
subgraph 84["src"]
85["index.ts"]
subgraph 86["lib"]
87["customer-checkout.tsx"]
end
end
end
subgraph 88["customer-favorites"]
subgraph 89["src"]
8A["index.ts"]
subgraph 8B["lib"]
8C["customer-favorites.tsx"]
8D["customer-favorites.spec.tsx"]
end
end
8E["vite.config.ts"]
end
subgraph 8F["customer-login"]
subgraph 8G["src"]
8H["index.ts"]
subgraph 8I["lib"]
8J["customer-login.tsx"]
end
end
end
subgraph 8K["customer-order-confirmation"]
subgraph 8L["src"]
8M["index.ts"]
subgraph 8N["lib"]
8O["customer-order-confirmation.tsx"]
8P["customer-order-confirmation.pants-size.spec.tsx"]
8Q["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8R["customer-orders"]
subgraph 8S["src"]
8T["index.ts"]
subgraph 8U["lib"]
8V["customer-orders.tsx"]
end
end
end
subgraph 8W["customer-payment"]
subgraph 8X["src"]
8Y["index.ts"]
subgraph 8Z["lib"]
90["customer-payment-callback.tsx"]
91["use-zarinpal-payment.tsx"]
92["zarinpal-payment-service.ts"]
93["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 94["customer-products"]
subgraph 95["src"]
96["index.ts"]
subgraph 97["lib"]
98["customer-products.tsx"]
end
end
end
subgraph 99["customer-profile"]
subgraph 9A["src"]
9B["index.ts"]
subgraph 9C["lib"]
9D["customer-profile.tsx"]
9E["customer-profile.spec.tsx"]
end
end
end
subgraph 9F["customer-shopping-cart"]
subgraph 9G["src"]
9H["index.ts"]
subgraph 9I["lib"]
9J["customer-shopping-cart.tsx"]
9K["customer-shopping-cart.pants-size.spec.tsx"]
9L["customer-shopping-cart.spec.tsx"]
end
end
9M["vite.config.ts"]
end
subgraph 9N["customer-signup"]
subgraph 9O["src"]
9P["index.ts"]
subgraph 9Q["lib"]
9R["customer-signup.tsx"]
9S["customer-signup.password-length.spec.tsx"]
9T["customer-signup.spec.tsx"]
9U["customer-signup.zod.spec.tsx"]
end
end
end
subgraph 9V["forgot-password"]
subgraph 9W["src"]
9X["index.ts"]
subgraph 9Y["lib"]
9Z["customer-forgot-password.tsx"]
A0["customer-forgot-password.spec.tsx"]
A1["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A2["guide-authenticity"]
subgraph A3["src"]
A4["index.ts"]
subgraph A5["lib"]
A6["customer-guide-authenticity.tsx"]
A7["customer-guide-authenticity.spec.tsx"]
end
end
A8["vite.config.ts"]
end
subgraph A9["guide-payment"]
subgraph AA["src"]
AB["index.ts"]
subgraph AC["lib"]
AD["customer-guide-payment.tsx"]
AE["customer-guide-payment.spec.tsx"]
end
end
AF["vite.config.ts"]
end
subgraph AG["home"]
subgraph AH["src"]
AI["index.ts"]
subgraph AJ["lib"]
AK["CustomersHomeScreen.tsx"]
subgraph AL["components"]
AM["CategoryBentoSection.tsx"]
AO["HeroSection.tsx"]
AP["HomeLoadingScreen.tsx"]
AQ["PicksRailSection.tsx"]
AR["TrustStripSection.tsx"]
AW["NewArrivalsSection.tsx"]
AY["BrandBlocksSection.tsx"]
AZ["NewsletterSection.tsx"]
B0["ShopTheLookSection.tsx"]
B1["TickerSection.tsx"]
end
AN["home-selectors.ts"]
AS["useScrollProgress.ts"]
AT["CustomersShopScreen.tsx"]
AU["CustomersHomeScreen.cart-size.spec.tsx"]
AV["CustomersHomeScreen.spec.tsx"]
AX["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph B2["login"]
subgraph B3["src"]
B4["index.ts"]
subgraph B5["lib"]
B6["CustomersLoginScreen.tsx"]
B7["CustomersLoginScreen.spec.tsx"]
B8["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph B9["not-found"]
subgraph BA["src"]
BB["index.ts"]
subgraph BC["lib"]
BD["customer-not-found.tsx"]
BE["customer-not-found.spec.tsx"]
end
end
BF["vite.config.ts"]
end
subgraph BG["privacy-policy"]
subgraph BH["src"]
BI["index.ts"]
subgraph BJ["lib"]
BK["customer-privacy-policy.tsx"]
BL["customer-privacy-policy.spec.tsx"]
end
end
BM["vite.config.ts"]
end
subgraph BN["product-details"]
subgraph BO["src"]
BP["index.ts"]
subgraph BQ["lib"]
BR["customer-product-details.tsx"]
BS["customer-product-details.pants-size.spec.tsx"]
BT["customer-product-details.spec.tsx"]
end
end
BU["vite.config.ts"]
end
subgraph BV["reset-password"]
subgraph BW["src"]
BX["index.ts"]
subgraph BY["lib"]
BZ["customer-reset-password.tsx"]
C0["customer-reset-password.password-length.spec.tsx"]
C1["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph C2["shipping-returns"]
subgraph C3["src"]
C4["index.ts"]
subgraph C5["lib"]
C6["customer-shipping-returns.tsx"]
C7["customer-shipping-returns.spec.tsx"]
end
end
C8["vite.config.ts"]
end
subgraph C9["unauthorized"]
subgraph CA["src"]
CB["index.ts"]
subgraph CC["lib"]
CD["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CE["utility"]
subgraph CF["test"]
subgraph CG["src"]
CH["index.ts"]
subgraph CI["lib"]
CJ["customers-test-utility.tsx"]
end
end
end
end
subgraph CK["validations"]
subgraph CL["src"]
CM["index.ts"]
subgraph CN["lib"]
CO["shipping-validation.ts"]
CP["shipping-validation.spec.tsx"]
CQ["shipping-validation.tsx"]
end
end
end
subgraph CR["zustand"]
subgraph CS["customer-cart-store"]
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["customer-cart-store.ts"]
CX["customer-cart-store.spec.ts"]
CY["customer-cart-store.tsx"]
end
end
end
subgraph CZ["customer-checkout-store"]
subgraph D0["src"]
D1["index.ts"]
subgraph D2["lib"]
D3["customer-checkout-store.ts"]
D4["customer-checkout-store.spec.ts"]
end
end
D5["vite.config.ts"]
end
subgraph D6["customer-wishlist-store"]
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["customer-wishlist-store.ts"]
DB["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DC["src"]
DD["index.ts"]
subgraph DE["lib"]
DF["customers-products-store.tsx"]
end
end
end
end
subgraph DG["sellers"]
subgraph DH["components"]
subgraph DI["footer"]
subgraph DJ["src"]
DK["index.ts"]
subgraph DL["lib"]
DM["sellers-footer.tsx"]
DN["sellers-footer.spec.tsx"]
end
end
end
subgraph DO["headerbar"]
subgraph DP["src"]
DQ["index.ts"]
subgraph DR["lib"]
DS["SellersHeaderbar.tsx"]
end
end
end
subgraph DT["layout"]
subgraph DU["src"]
DV["index.ts"]
subgraph DW["lib"]
DX["SellersLayout.tsx"]
DY["SellersTabbar.tsx"]
end
end
end
end
subgraph DZ["contexts"]
subgraph E0["auth"]
subgraph E1["src"]
E2["index.ts"]
subgraph E3["lib"]
E4["SellersAuthContext.tsx"]
E5["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E6["graphql"]
subgraph E7["src"]
E8["index.ts"]
subgraph E9["lib"]
EA["fragments.ts"]
EB["mutations.ts"]
EC["Provider.tsx"]
ED["SellersApolloProvider.tsx"]
EE["client.ts"]
EF["queries.ts"]
EG["seller-orders.graphql.ts"]
EH["apollo-upload-client.d.ts"]
end
subgraph EI["types"]
EJ["apollo-upload-client.d.ts"]
end
end
end
subgraph EK["hooks"]
subgraph EL["auth"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["useSellerAuth.ts"]
EQ["sellerAuth.graphql.ts"]
end
end
end
subgraph ER["orders"]
subgraph ES["src"]
ET["index.ts"]
subgraph EU["lib"]
EV["useSellerOrders.ts"]
EW["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph EX["products"]
subgraph EY["src"]
EZ["index.ts"]
subgraph F0["lib"]
F1["useSellersProductManagement.ts"]
F2["useSellersProducts.ts"]
end
end
end
end
subgraph F3["router"]
subgraph F4["src"]
F5["index.ts"]
subgraph F6["lib"]
F7["SellersRouter.tsx"]
end
end
end
subgraph F8["routes"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["seller-routes.ts"]
end
end
end
subgraph FD["screens"]
subgraph FE["catalog"]
subgraph FF["src"]
FG["index.ts"]
subgraph FH["lib"]
FI["SellersCatalogScreens.tsx"]
FJ["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FK["login"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["SellersLogin.tsx"]
FP["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph FQ["manage-product"]
subgraph FR["src"]
FS["index.ts"]
subgraph FT["lib"]
FU["SellersManageProductScreen.tsx"]
FV["SellersDefineProductFlow.tsx"]
FW["SellersDefineProductFlow.pants-label.spec.tsx"]
FX["SellersDefineProductFlow.spec.tsx"]
FY["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FZ["products"]
subgraph G0["src"]
G1["index.ts"]
subgraph G2["lib"]
G3["SellersProducts.tsx"]
G4["SellersProducts.pants-label.spec.tsx"]
G5["SellersProducts.spec.tsx"]
end
end
end
subgraph G6["seller-orders"]
G7["jest.config.ts"]
G8["jest.setup.ts"]
subgraph G9["src"]
GA["index.ts"]
subgraph GB["lib"]
GC["seller-orders-screen.tsx"]
GD["seller-status-transitions.ts"]
GE["seller-orders-screen.pants-size.spec.tsx"]
GF["seller-orders-screen.spec.tsx"]
GG["seller-status-transitions.spec.ts"]
end
GH["test-setup.ts"]
end
end
subgraph GI["setup-password"]
subgraph GJ["src"]
GK["index.ts"]
subgraph GL["lib"]
GM["SellersSetupPassword.tsx"]
GN["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph GO["unauthorized"]
subgraph GP["src"]
GQ["index.ts"]
subgraph GR["lib"]
GS["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GT["zustand"]
subgraph GU["sellers-products-store"]
subgraph GV["src"]
GW["index.ts"]
subgraph GX["lib"]
GY["useSellersProductsStore.ts"]
GZ["sellers-products-store.tsx"]
end
end
end
end
end
subgraph H0["shared"]
subgraph H1["components"]
subgraph H2["apollo-provider-base"]
subgraph H3["src"]
H4["index.ts"]
subgraph H5["lib"]
H6["ApolloProviderBase.tsx"]
H7["createSilentRefreshAuthLink.ts"]
H8["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph H9["error-boundary"]
subgraph HA["src"]
HB["index.ts"]
subgraph HC["lib"]
HD["error-boundary.tsx"]
HE["error-boundary.spec.tsx"]
end
end
HF["vite.config.ts"]
end
subgraph HG["glassmorphism-container"]
subgraph HH["src"]
HI["index.ts"]
subgraph HJ["lib"]
HK["glassmorphism-container.tsx"]
HL["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HM["layout"]
subgraph HN["src"]
HO["index.ts"]
subgraph HP["lib"]
HQ["Layout.tsx"]
end
end
end
subgraph HR["material-data-table"]
subgraph HS["src"]
HT["index.ts"]
subgraph HU["lib"]
HV["material-data-table.tsx"]
HW["table-config.ts"]
HX["table-utils.ts"]
HY["material-data-table.spec.tsx"]
HZ["table-types.ts"]
end
end
end
subgraph I0["order-status-chip"]
subgraph I1["src"]
I2["index.ts"]
subgraph I3["lib"]
I4["order-status-chip.tsx"]
I5["order-status-chip.spec.tsx"]
end
end
end
subgraph I6["password-field"]
subgraph I7["src"]
I8["index.ts"]
subgraph I9["lib"]
IA["PasswordTextField.tsx"]
end
end
end
subgraph IB["price-display"]
subgraph IC["src"]
ID["index.ts"]
subgraph IE["lib"]
IF["price-display.tsx"]
IG["price-display.spec.tsx"]
end
end
end
subgraph IH["private-route"]
subgraph II["src"]
IJ["index.ts"]
subgraph IK["lib"]
IL["createPrivateRoute.tsx"]
IM["PrivateRoute.tsx"]
end
end
end
subgraph IN["rtl-table-utils"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["rtl-table-utils.ts"]
IS["rtl-cell-components.tsx"]
IT["rtl-column-helpers.ts"]
IU["rtl-table-props.ts"]
IV["use-table-alignment.ts"]
IW["rtl-table-utils.spec.tsx"]
IX["rtl-table-utils.tsx"]
end
end
end
subgraph IY["snackbar"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["snackbar.tsx"]
J3["Snackbar.tsx"]
end
end
end
subgraph J4["styled-drawer"]
subgraph J5["src"]
J6["index.ts"]
subgraph J7["lib"]
J8["styled-drawer.tsx"]
J9["styled-drawer.spec.tsx"]
end
end
end
subgraph JA["unauthorized"]
subgraph JB["src"]
JC["index.ts"]
subgraph JD["lib"]
JE["unauthorized-path.tsx"]
end
end
end
end
subgraph JF["graphql"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["currency.mutations.ts"]
JK["currency.queries.ts"]
JL["fragments.ts"]
JM["variant-colors.ts"]
JN["client-shared-graphql.tsx"]
end
end
end
subgraph JO["hooks"]
subgraph JP["brands"]
subgraph JQ["src"]
JR["index.ts"]
subgraph JS["lib"]
JT["brands.graphql.ts"]
JU["useBrands.ts"]
end
end
JV["vite.config.ts"]
end
subgraph JW["categories"]
subgraph JX["src"]
JY["index.ts"]
subgraph JZ["lib"]
K0["useCategories.ts"]
K1["categories.graphql.ts"]
end
end
end
subgraph K2["colors"]
subgraph K3["src"]
K4["index.ts"]
subgraph K5["lib"]
K6["useColors.ts"]
K7["color.graphql.ts"]
end
end
end
subgraph K8["currency"]
subgraph K9["src"]
KA["index.ts"]
subgraph KB["lib"]
KC["useConvertPrice.tsx"]
KD["useExchangeRate.tsx"]
KE["useCurrencies.tsx"]
KF["useCurrencyForLocale.tsx"]
KG["useExchangeRate.spec.tsx"]
end
end
end
subgraph KH["products"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["productImage.ts"]
KM["products.graphql.ts"]
KN["useProducts.ts"]
KO["productImage.spec.ts"]
end
end
end
subgraph KP["site-languages"]
subgraph KQ["src"]
KR["index.ts"]
subgraph KS["lib"]
KT["site-languages.graphql.ts"]
KU["useSiteLanguages.ts"]
KV["site-languages-hook.spec.tsx"]
end
end
KW["vite.config.ts"]
end
subgraph KX["snackbar"]
subgraph KY["src"]
KZ["index.ts"]
subgraph L0["lib"]
L1["SnackbarContext.tsx"]
L2["useSnackbar.ts"]
end
end
end
subgraph L3["translations-management-hook"]
subgraph L4["src"]
L5["index.ts"]
subgraph L6["lib"]
L7["useTranslationsManagement.ts"]
end
end
end
end
subgraph L8["lottie"]
subgraph L9["empty-cart"]
subgraph LA["src"]
LB["index.ts"]
subgraph LC["lib"]
LD["lottie-empty-cart.tsx"]
LE["lottie-empty-cart.spec.tsx"]
end
end
LF["vite.config.ts"]
end
subgraph LG["loading"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["lottie-loading.tsx"]
LL["lottie-loading.spec.tsx"]
end
end
end
subgraph LM["success-check"]
subgraph LN["src"]
LO["index.ts"]
subgraph LP["lib"]
LQ["lottie-success-check.tsx"]
LR["lottie-success-check.spec.tsx"]
end
end
end
subgraph LS["unauthorized"]
subgraph LT["src"]
LU["index.ts"]
subgraph LV["lib"]
LW["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LX["translations"]
subgraph LY["src"]
LZ["index.ts"]
subgraph M0["lib"]
M1["mapApolloErrorToTranslationKey.ts"]
M2["WrapTranslation.tsx"]
end
end
end
subgraph M3["ui"]
subgraph M4["colors"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["colors.ts"]
end
end
end
subgraph M9["language-components"]
subgraph MA["src"]
MB["index.ts"]
subgraph MC["lib"]
MD["language-components.tsx"]
ME["ltr-text-field.tsx"]
end
end
end
subgraph MF["sizes"]
subgraph MG["src"]
MH["index.ts"]
subgraph MI["lib"]
MJ["sizes.ts"]
MK["sizes.spec.tsx"]
ML["sizes.tsx"]
end
end
end
end
subgraph MM["zustand"]
subgraph MN["shared-auth-store"]
subgraph MO["src"]
MP["index.ts"]
subgraph MQ["lib"]
MR["shared-auth-store.ts"]
end
end
end
subgraph MS["shared-notification-store"]
subgraph MT["src"]
MU["index.ts"]
subgraph MV["lib"]
MW["shared-notification-store.tsx"]
end
end
end
subgraph MX["shared-ui-store"]
subgraph MY["src"]
MZ["index.ts"]
subgraph N0["lib"]
N1["shared-ui-store.ts"]
N2["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph N3["server"]
subgraph N4["controllers"]
subgraph N5["src"]
N6["index.ts"]
subgraph N7["lib"]
N8["auth.controller.ts"]
N9["order.controller.ts"]
end
end
end
subgraph NA["decorators"]
NB["jest.config.ts"]
subgraph NC["src"]
ND["index.ts"]
subgraph NE["lib"]
NF["current-user.decorator.ts"]
NG["decorators.ts"]
NH["decorators.spec.ts"]
end
end
end
subgraph NI["entities"]
subgraph NJ["src"]
NK["index.ts"]
subgraph NL["lib"]
NM["brand.entity.ts"]
NN["product.entity.ts"]
NO["category.entity.ts"]
NP["product-description.entity.ts"]
NQ["site-language.entity.ts"]
NR["product-info.entity.ts"]
NS["color.entity.ts"]
NT["product-info-color.entity.ts"]
NU["seller-info.entity.ts"]
NV["seller-product.entity.ts"]
NW["user.entity.ts"]
NX["cart.entity.ts"]
NY["currency-preference.entity.ts"]
NZ["currency.entity.ts"]
O0["customer.entity.ts"]
O1["exchange-rate.entity.ts"]
O2["order.entity.ts"]
O3["platform-settings.entity.ts"]
O4["refresh-token.entity.ts"]
O5["seller-order.entity.ts"]
O6["translation.entity.ts"]
end
end
end
subgraph O7["guards"]
O8["jest.config.ts"]
subgraph O9["src"]
OA["index.ts"]
subgraph OB["lib"]
OC["catalog.guard.ts"]
OD["graphql-auth.guard.ts"]
OE["http-auth.guard.ts"]
OF["roles.guard.ts"]
OG["catalog.guard.spec.ts"]
OH["roles.guard.spec.ts"]
end
end
end
subgraph OI["inputs"]
subgraph OJ["src"]
OK["index.ts"]
subgraph OL["lib"]
OM["brand.input.ts"]
ON["cart.inputs.ts"]
OO["category.input.ts"]
OP["color.input.ts"]
OQ["customer-auth.inputs.ts"]
OR["order-pagination.inputs.ts"]
OS["order.inputs.ts"]
OT["product-info-filter.input.ts"]
OU["product.input.ts"]
OV["seller-order-pagination.inputs.ts"]
OW["seller.input.ts"]
OX["site-language.input.ts"]
OY["user.input.ts"]
end
end
end
subgraph OZ["modules"]
subgraph P0["src"]
P1["index.ts"]
subgraph P2["lib"]
P3["auth.module.ts"]
P4["email.module.ts"]
P5["token.module.ts"]
P6["user.module.ts"]
P7["customer-profile.module.ts"]
P8["brand.module.ts"]
P9["catalog-guard.module.ts"]
PA["translation.module.ts"]
PB["cart.module.ts"]
PC["platform-settings.module.ts"]
PD["category.module.ts"]
PE["product.module.ts"]
PF["color.module.ts"]
PG["currency.module.ts"]
PH["graphql-context.module.ts"]
PI["order.module.ts"]
PJ["seller-info.module.ts"]
PK["payment.module.ts"]
PL["product-info.module.ts"]
PM["seller-products.module.ts"]
PN["site-language.module.ts"]
end
end
end
subgraph PO["resolvers"]
PP["jest.config.ts"]
subgraph PQ["src"]
PR["index.ts"]
subgraph PS["lib"]
PT["auth.resolver.ts"]
PU["zod-validation.pipe.ts"]
PV["brand.resolver.ts"]
PW["cart.resolver.ts"]
PX["category.resolver.ts"]
PY["color.resolver.ts"]
PZ["currency.resolver.ts"]
Q0["customer-profile.resolver.ts"]
Q1["order.resolver.ts"]
Q2["payment.resolver.ts"]
Q3["product-info.resolver.ts"]
Q4["product.resolver.ts"]
Q5["seller-info.resolver.ts"]
Q6["shipping.resolver.ts"]
Q7["site-language.resolver.ts"]
Q8["translation.input.ts"]
Q9["translation.resolver.ts"]
QA["user.resolver.ts"]
QB["auth-validation.spec.ts"]
QC["auth.resolver.spec.ts"]
QD["order.resolver.spec.ts"]
QE["order.resolver.status-transitions.spec.ts"]
QF["order.resolver.tracking.spec.ts"]
QG["payment.resolver.integration.spec.ts"]
QH["payment.resolver.spec.ts"]
QI["product-info.resolver.spec.ts"]
QJ["translation.resolver.guards.spec.ts"]
subgraph QK["types"]
QL["graphql-upload.d.ts"]
end
QM["user.resolver.spec.ts"]
QN["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QO["services"]
QP["jest.config.ts"]
subgraph QQ["src"]
QR["index.ts"]
subgraph QS["lib"]
QT["auth.service.ts"]
QU["brand.service.ts"]
QV["cart.service.ts"]
QW["product-info-colors.util.ts"]
QX["category.service.ts"]
QY["color.service.ts"]
QZ["currency.service.ts"]
R0["customer-profile.service.ts"]
R1["email.service.ts"]
R2["image-upload.service.ts"]
R3["order.service.ts"]
R4["payment-logger.service.ts"]
R5["payment.service.ts"]
R6["product.service.ts"]
R7["seller-info.service.ts"]
R8["shipping-calculation.service.ts"]
R9["site-language.service.ts"]
RA["token.service.ts"]
RB["translation.service.ts"]
RC["user.service.ts"]
RD["auth.service.password-policy.spec.ts"]
RE["auth.service.spec.ts"]
RF["cart.service.add-quantity.spec.ts"]
RG["cart.service.null-relations.spec.ts"]
RH["cart.service.spec.ts"]
RI["order.service.spec.ts"]
RJ["order.service.tracking.spec.ts"]
RK["product-info-colors.util.spec.ts"]
RL["product.service.pants.spec.ts"]
RM["product.service.spec.ts"]
RN["relay-connection.spec.ts"]
RO["seller-info.service.price-validation.spec.ts"]
RP["shipping-calculation.service.spec.ts"]
RQ["token.service.spec.ts"]
end
end
end
subgraph RR["strategies"]
subgraph RS["src"]
RT["index.ts"]
subgraph RU["lib"]
RV["local.strategy.ts"]
end
end
end
subgraph RW["utils"]
subgraph RX["src"]
RY["index.ts"]
subgraph RZ["lib"]
S0["email-templates.ts"]
S1["relay-connection.ts"]
S2["pagination.ts"]
end
end
end
end
subgraph S3["shared"]
subgraph S4["codegen"]
S5["jest.config.ts"]
subgraph S6["src"]
S7["index.ts"]
subgraph S8["lib"]
subgraph S9["generated"]
SA["graphql.ts"]
end
end
end
end
subgraph SB["graphql-schema"]
SC["jest.config.ts"]
subgraph SD["src"]
SE["index.ts"]
end
end
subgraph SF["product-sizes"]
subgraph SG["src"]
SH["index.ts"]
subgraph SI["lib"]
SJ["product-sizes.ts"]
SK["product-sizes.pants-formats.spec.ts"]
SL["product-sizes.pants-label.spec.ts"]
SM["product-sizes.pants-strict.spec.ts"]
SN["product-sizes.spec.ts"]
end
end
end
subgraph SO["shared-i18n"]
subgraph SP["src"]
SQ["index.ts"]
subgraph SR["lib"]
SS["language-context.tsx"]
ST["language-detector.ts"]
subgraph SU["locales"]
SV["i18n-react.tsx"]
SW["i18n-util.ts"]
SX["i18n-util.async.ts"]
subgraph SY["en"]
SZ["index.ts"]
end
subgraph T1["fa"]
T2["index.ts"]
end
T3["formatters.ts"]
T4["i18n-types.ts"]
T5["i18n-util.sync.ts"]
T6["navigator-detector.ts"]
end
T0["site-name.ts"]
T7["table-localization.ts"]
T8["theme-provider.tsx"]
T9["use-page-title.ts"]
end
end
end
subgraph TA["validation"]
subgraph TB["src"]
TC["index.ts"]
subgraph TD["lib"]
TE["auth.ts"]
TF["limits.ts"]
TG["primitives.ts"]
TH["auth-forms.ts"]
TI["errors.ts"]
TJ["auth-forms.login.spec.ts"]
TK["auth-forms.recovery.spec.ts"]
TL["auth-forms.seller.spec.ts"]
TM["auth-forms.spec.ts"]
TN["auth.spec.ts"]
TO["errors.spec.ts"]
TP["primitives.spec.ts"]
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
3W-->3X
3X-->3Z
40-->3Z
41-->3Z
45-->46
46-->48
48-->49
48-->4B
49-->4A
4C-->48
4D-->4B
4I-->4J
4J-->4L
4M-->4L
4Q-->4S
4S-->4T
4W-->4X
4X-->4Z
50-->4Z
54-->55
55-->57
58-->57
5D-->5F
5D-->5G
5F-->5G
5H-->5F
5K-->5M
5N-->5M
5Q-->5S
5Q-->5T
5S-->5T
5U-->5S
5V-->5T
5Y-->60
61-->60
62-->60
67-->69
6A-->69
6D-->6F
6D-->6G
6D-->6H
6D-->6K
6H-->6I
6I-->6J
6P-->6R
6P-->6S
6P-->6T
6P-->6U
6V-->6S
70-->72
70-->73
70-->74
75-->73
76-->72
79-->7B
7E-->7G
7J-->7L
7J-->7M
7L-->7M
7N-->7L
7O-->7M
7R-->7T
7U-->7T
7Y-->80
81-->80
85-->87
8A-->8C
8D-->8C
8H-->8J
8M-->8O
8P-->8O
8Q-->8O
8T-->8V
8Y-->90
8Y-->91
8Y-->92
90-->91
91-->92
93-->90
96-->98
9B-->9D
9E-->9D
9H-->9J
9K-->9J
9L-->9J
9P-->9R
9S-->9R
9T-->9R
9U-->9R
9X-->9Z
A0-->9Z
A1-->9Z
A4-->A6
A7-->A6
AB-->AD
AE-->AD
AI-->AK
AI-->AT
AI-->AN
AI-->AS
AK-->AM
AK-->AO
AK-->AP
AK-->AQ
AK-->AR
AK-->AN
AK-->AS
AM-->AN
AT-->AN
AU-->AQ
AU-->AK
AU-->AN
AV-->AW
AV-->AQ
AV-->AK
AV-->AT
AV-->AN
AX-->AT
AY-->AN
B0-->AN
B4-->B6
B7-->B6
B8-->B6
BB-->BD
BE-->BD
BI-->BK
BL-->BK
BP-->BR
BS-->BR
BT-->BR
BX-->BZ
C0-->BZ
C1-->BZ
C4-->C6
C7-->C6
CB-->CD
CH-->CJ
CM-->CO
CP-->CO
CP-->CQ
CU-->CW
CX-->CW
D1-->D3
D4-->D3
D8-->DA
DB-->DA
DD-->DF
DK-->DM
DN-->DM
DQ-->DS
DV-->DX
DV-->DY
DX-->DY
E2-->E4
E5-->E4
E8-->EA
E8-->EB
E8-->EC
E8-->EF
EC-->ED
ED-->EE
EF-->EA
EF-->EG
EN-->EP
EP-->EQ
ET-->EV
EZ-->F1
EZ-->F2
F5-->F7
FA-->FC
FG-->FI
FJ-->FI
FM-->FO
FP-->FO
FS-->FU
FU-->FV
FW-->FV
FX-->FV
FY-->FU
G1-->G3
G4-->G3
G5-->G3
GA-->GC
GC-->GD
GE-->GC
GF-->GC
GG-->GD
GK-->GM
GN-->GM
GQ-->GS
GW-->GY
H4-->H6
H4-->H7
H8-->H7
HB-->HD
HE-->HD
HI-->HK
HL-->HK
HO-->HQ
HT-->HV
HT-->HW
HT-->HX
HV-->HW
HY-->HV
I2-->I4
I5-->I4
I8-->IA
ID-->IF
IG-->IF
IJ-->IL
IL-->IM
IP-->IR
IR-->IS
IR-->IT
IR-->IU
IR-->IV
IT-->IS
IT-->IU
IW-->IX
J0-->J2
J6-->J8
J9-->J8
JC-->JE
JH-->JJ
JH-->JK
JH-->JL
JH-->JM
JR-->JT
JR-->JU
JU-->JT
JY-->K0
K0-->K1
K4-->K6
K6-->K7
KA-->KC
KA-->KE
KA-->KF
KA-->KD
KC-->KD
KG-->KD
KJ-->KL
KJ-->KM
KJ-->KN
KN-->KM
KO-->KL
KR-->KT
KR-->KU
KU-->KT
KV-->KU
KZ-->L1
KZ-->L2
L2-->L1
L5-->L7
LB-->LD
LE-->LD
LI-->LK
LL-->LK
LO-->LQ
LR-->LQ
LU-->LW
LZ-->M1
M6-->M8
MB-->MD
MB-->ME
MH-->MJ
MK-->ML
MP-->MR
MU-->MW
MZ-->N1
N6-->N8
N6-->N9
ND-->NF
ND-->NG
NH-->NG
NK-->NM
NK-->NX
NK-->NO
NK-->NS
NK-->NY
NK-->NZ
NK-->O0
NK-->O1
NK-->O2
NK-->O3
NK-->NP
NK-->NT
NK-->NR
NK-->NN
NK-->O4
NK-->NU
NK-->O5
NK-->NV
NK-->NQ
NK-->O6
NK-->NW
NM-->NN
NN-->NM
NN-->NO
NN-->NP
NN-->NR
NN-->NU
NN-->NV
NO-->NN
NP-->NN
NP-->NQ
NQ-->NP
NR-->NS
NR-->NT
NR-->NN
NT-->NS
NT-->NR
NU-->NV
NU-->NW
NV-->NR
NV-->NN
NV-->NU
NX-->NN
NX-->NW
NY-->NZ
O0-->NW
O1-->NZ
O1-->NW
O2-->NN
O2-->NU
O4-->NW
O5-->O2
OA-->OC
OA-->OD
OA-->OE
OA-->OF
OG-->OC
OH-->OF
OK-->OM
OK-->ON
OK-->OO
OK-->OP
OK-->OQ
OK-->OR
OK-->OS
OK-->OT
OK-->OU
OK-->OV
OK-->OW
OK-->OX
OK-->OY
OU-->OT
P1-->P3
P1-->P8
P1-->PB
P1-->P9
P1-->PD
P1-->PF
P1-->PG
P1-->P7
P1-->P4
P1-->PH
P1-->PI
P1-->PK
P1-->PC
P1-->PL
P1-->PE
P1-->PJ
P1-->PM
P1-->PN
P1-->P5
P1-->PA
P1-->P6
P3-->P4
P3-->P5
P3-->P6
P6-->P3
P6-->P7
P8-->P9
P8-->PA
PB-->PC
PD-->P9
PD-->PE
PD-->PA
PE-->P9
PE-->P5
PE-->PA
PF-->P9
PF-->PA
PH-->P4
PH-->P5
PH-->P6
PI-->PC
PI-->PJ
PJ-->PE
PJ-->P5
PJ-->P6
PK-->PI
PL-->PE
PL-->PA
PM-->PJ
PM-->P6
PR-->PT
PR-->PV
PR-->PW
PR-->PX
PR-->PY
PR-->PZ
PR-->Q0
PR-->Q1
PR-->Q2
PR-->Q3
PR-->Q4
PR-->Q5
PR-->Q6
PR-->Q7
PR-->Q8
PR-->Q9
PR-->QA
PR-->PU
PT-->PU
QA-->PU
QB-->PT
QB-->QA
QB-->PU
QC-->PT
QD-->Q1
QE-->Q1
QF-->Q1
QG-->Q2
QH-->Q2
QI-->Q3
QJ-->Q9
QM-->QA
QN-->PU
QR-->QT
QR-->QU
QR-->QV
QR-->QX
QR-->QY
QR-->QZ
QR-->R0
QR-->R1
QR-->R2
QR-->R3
QR-->R4
QR-->R5
QR-->QW
QR-->R6
QR-->R7
QR-->R8
QR-->R9
QR-->RA
QR-->RB
QR-->RC
QV-->QW
R6-->QW
R7-->QW
RD-->QT
RD-->R1
RD-->RA
RD-->RC
RE-->QT
RE-->R1
RE-->RA
RE-->RC
RF-->QV
RG-->QV
RH-->QV
RI-->R3
RJ-->R3
RK-->QW
RL-->R6
RL-->RB
RM-->R6
RM-->RB
RO-->QT
RO-->R7
RP-->R8
RQ-->RA
RT-->RV
RY-->S0
RY-->S1
S7-->SA
SH-->SJ
SK-->SJ
SL-->SJ
SM-->SJ
SN-->SJ
SQ-->SS
SQ-->ST
SQ-->SV
SQ-->T4
SQ-->SW
SQ-->SX
SQ-->T5
SQ-->T6
SQ-->T0
SQ-->T7
SQ-->T8
SQ-->T9
SS-->ST
SS-->SV
SS-->SX
SV-->SW
SX-->SZ
SX-->T2
SX-->T3
SX-->SW
SZ-->T0
T2-->T0
T5-->SZ
T5-->T2
T5-->T3
T5-->SW
T7-->SV
T8-->SS
T9-->SV
TC-->TE
TC-->TH
TC-->TI
TC-->TF
TC-->TG
TE-->TF
TE-->TG
TG-->TF
TH-->TE
TJ-->TH
TK-->TH
TL-->TH
TM-->TH
TN-->TE
TO-->TI
TP-->TF
TP-->TG
