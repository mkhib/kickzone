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
7R["ProductLegacyRedirect.tsx"]
7S["RobotsMetaManager.tsx"]
7T["ScrollToTop.tsx"]
7U["CustomersRouter.spec.tsx"]
7V["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7W["routes"]
subgraph 7X["src"]
7Y["index.ts"]
subgraph 7Z["lib"]
80["customer-routes.ts"]
81["customer-routes.spec.ts"]
end
end
end
subgraph 82["screens"]
subgraph 83["contact"]
subgraph 84["src"]
85["index.ts"]
subgraph 86["lib"]
87["customer-contact.tsx"]
88["customer-contact.spec.tsx"]
89["customer-contact.validation.spec.tsx"]
end
end
8A["vite.config.ts"]
end
subgraph 8B["customer-checkout"]
subgraph 8C["src"]
8D["index.ts"]
subgraph 8E["lib"]
8F["customer-checkout.tsx"]
end
end
end
subgraph 8G["customer-favorites"]
subgraph 8H["src"]
8I["index.ts"]
subgraph 8J["lib"]
8K["customer-favorites.tsx"]
8L["customer-favorites.shared-card.spec.tsx"]
8M["customer-favorites.spec.tsx"]
end
end
8N["vite.config.ts"]
end
subgraph 8O["customer-login"]
subgraph 8P["src"]
8Q["index.ts"]
subgraph 8R["lib"]
8S["customer-login.tsx"]
end
end
end
subgraph 8T["customer-order-confirmation"]
subgraph 8U["src"]
8V["index.ts"]
subgraph 8W["lib"]
8X["customer-order-confirmation.tsx"]
8Y["customer-order-confirmation.pants-size.spec.tsx"]
8Z["customer-order-confirmation.security.spec.tsx"]
90["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 91["customer-orders"]
subgraph 92["src"]
93["index.ts"]
subgraph 94["lib"]
95["customer-orders.tsx"]
end
end
end
subgraph 96["customer-payment"]
subgraph 97["src"]
98["index.ts"]
subgraph 99["lib"]
9A["customer-payment-callback.tsx"]
9B["use-zarinpal-payment.tsx"]
9C["zarinpal-payment-service.ts"]
9D["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 9E["customer-products"]
subgraph 9F["src"]
9G["index.ts"]
subgraph 9H["lib"]
9I["customer-products.tsx"]
end
end
end
subgraph 9J["customer-profile"]
subgraph 9K["src"]
9L["index.ts"]
subgraph 9M["lib"]
9N["customer-profile.tsx"]
9O["customer-profile.spec.tsx"]
9P["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9Q["customer-shopping-cart"]
subgraph 9R["src"]
9S["index.ts"]
subgraph 9T["lib"]
9U["customer-shopping-cart.tsx"]
9V["build-order-confirmation-data.ts"]
9W["build-order-confirmation-data.spec.ts"]
9X["customer-shopping-cart.pants-size.spec.tsx"]
9Y["customer-shopping-cart.shipping-form.spec.tsx"]
9Z["customer-shopping-cart.spec.tsx"]
end
end
A0["vite.config.ts"]
end
subgraph A1["customer-signup"]
subgraph A2["src"]
A3["index.ts"]
subgraph A4["lib"]
A5["customer-signup.tsx"]
A6["customer-signup.password-length.spec.tsx"]
A7["customer-signup.spec.tsx"]
A8["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A9["forgot-password"]
subgraph AA["src"]
AB["index.ts"]
subgraph AC["lib"]
AD["customer-forgot-password.tsx"]
AE["customer-forgot-password.spec.tsx"]
AF["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph AG["guide-authenticity"]
subgraph AH["src"]
AI["index.ts"]
subgraph AJ["lib"]
AK["customer-guide-authenticity.tsx"]
AL["customer-guide-authenticity.spec.tsx"]
end
end
AM["vite.config.ts"]
end
subgraph AN["guide-payment"]
subgraph AO["src"]
AP["index.ts"]
subgraph AQ["lib"]
AR["customer-guide-payment.tsx"]
AS["customer-guide-payment.spec.tsx"]
end
end
AT["vite.config.ts"]
end
subgraph AU["home"]
subgraph AV["src"]
AW["index.ts"]
subgraph AX["lib"]
AY["CustomersHomeScreen.tsx"]
subgraph AZ["components"]
B0["CategoryBentoSection.tsx"]
B2["HeroSection.tsx"]
B3["HomeLoadingScreen.tsx"]
B4["PicksRailSection.tsx"]
B5["TrustStripSection.tsx"]
BA["NewArrivalsSection.tsx"]
BD["BrandBlocksSection.tsx"]
BE["NewsletterSection.tsx"]
BF["ShopTheLookSection.tsx"]
BG["TickerSection.tsx"]
end
B1["home-selectors.ts"]
B6["useScrollProgress.ts"]
B7["CustomersShopScreen.tsx"]
B8["CustomersHomeScreen.cart-size.spec.tsx"]
B9["CustomersHomeScreen.spec.tsx"]
BB["CustomersShopScreen.cart-size.spec.tsx"]
BC["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BH["login"]
subgraph BI["src"]
BJ["index.ts"]
subgraph BK["lib"]
BL["CustomersLoginScreen.tsx"]
BM["CustomersLoginScreen.spec.tsx"]
BN["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BO["not-found"]
subgraph BP["src"]
BQ["index.ts"]
subgraph BR["lib"]
BS["customer-not-found.tsx"]
BT["customer-not-found.spec.tsx"]
end
end
BU["vite.config.ts"]
end
subgraph BV["privacy-policy"]
subgraph BW["src"]
BX["index.ts"]
subgraph BY["lib"]
BZ["customer-privacy-policy.tsx"]
C0["customer-privacy-policy.spec.tsx"]
end
end
C1["vite.config.ts"]
end
subgraph C2["product-details"]
subgraph C3["src"]
C4["index.ts"]
subgraph C5["lib"]
C6["customer-product-details.tsx"]
C7["reviews-flag.ts"]
C8["customer-product-details.guarantee.spec.tsx"]
C9["customer-product-details.no-low-stock.spec.tsx"]
CA["customer-product-details.pants-size.spec.tsx"]
CB["customer-product-details.reviews-hidden.spec.tsx"]
CC["customer-product-details.spec.tsx"]
end
end
CD["vite.config.ts"]
end
subgraph CE["reset-password"]
subgraph CF["src"]
CG["index.ts"]
subgraph CH["lib"]
CI["customer-reset-password.tsx"]
CJ["customer-reset-password.password-length.spec.tsx"]
CK["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CL["shipping-returns"]
subgraph CM["src"]
CN["index.ts"]
subgraph CO["lib"]
CP["customer-shipping-returns.tsx"]
CQ["customer-shipping-returns.spec.tsx"]
end
end
CR["vite.config.ts"]
end
subgraph CS["unauthorized"]
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CX["utility"]
subgraph CY["test"]
subgraph CZ["src"]
D0["index.ts"]
subgraph D1["lib"]
D2["customers-test-utility.tsx"]
end
end
end
end
subgraph D3["validations"]
subgraph D4["src"]
D5["index.ts"]
subgraph D6["lib"]
D7["shipping-validation.ts"]
D8["barrel.spec.ts"]
D9["shipping-validation.shared.spec.ts"]
end
end
end
subgraph DA["zustand"]
subgraph DB["customer-cart-store"]
subgraph DC["src"]
DD["index.ts"]
subgraph DE["lib"]
DF["customer-cart-store.ts"]
DG["barrel.spec.ts"]
DH["customer-cart-store.spec.ts"]
end
end
end
subgraph DI["customer-checkout-store"]
subgraph DJ["src"]
DK["index.ts"]
subgraph DL["lib"]
DM["customer-checkout-store.ts"]
DN["customer-checkout-store.spec.ts"]
end
end
DO["vite.config.ts"]
end
subgraph DP["customer-wishlist-store"]
subgraph DQ["src"]
DR["index.ts"]
subgraph DS["lib"]
DT["customer-wishlist-store.ts"]
DU["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DV["src"]
DW["index.ts"]
subgraph DX["lib"]
DY["customers-products-store.tsx"]
end
end
end
end
subgraph DZ["sellers"]
subgraph E0["components"]
subgraph E1["footer"]
subgraph E2["src"]
E3["index.ts"]
subgraph E4["lib"]
E5["sellers-footer.tsx"]
E6["sellers-footer.spec.tsx"]
end
end
end
subgraph E7["headerbar"]
subgraph E8["src"]
E9["index.ts"]
subgraph EA["lib"]
EB["SellersHeaderbar.tsx"]
end
end
end
subgraph EC["layout"]
subgraph ED["src"]
EE["index.ts"]
subgraph EF["lib"]
EG["SellersLayout.tsx"]
EH["SellersTabbar.tsx"]
end
end
end
end
subgraph EI["contexts"]
subgraph EJ["auth"]
subgraph EK["src"]
EL["index.ts"]
subgraph EM["lib"]
EN["SellersAuthContext.tsx"]
EO["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EP["graphql"]
subgraph EQ["src"]
ER["index.ts"]
subgraph ES["lib"]
ET["fragments.ts"]
EU["mutations.ts"]
EV["Provider.tsx"]
EW["SellersApolloProvider.tsx"]
EX["client.ts"]
EY["queries.ts"]
EZ["seller-orders.graphql.ts"]
F0["apollo-upload-client.d.ts"]
end
end
end
subgraph F1["hooks"]
subgraph F2["auth"]
subgraph F3["src"]
F4["index.ts"]
subgraph F5["lib"]
F6["useSellerAuth.ts"]
F7["sellerAuth.graphql.ts"]
end
end
end
subgraph F8["orders"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["useSellerOrders.ts"]
FD["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FE["products"]
subgraph FF["src"]
FG["index.ts"]
subgraph FH["lib"]
FI["useSellersProductManagement.ts"]
FJ["useSellersProducts.ts"]
end
end
end
end
subgraph FK["router"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["SellersRouter.tsx"]
end
end
end
subgraph FP["routes"]
subgraph FQ["src"]
FR["index.ts"]
subgraph FS["lib"]
FT["seller-routes.ts"]
end
end
end
subgraph FU["screens"]
subgraph FV["catalog"]
subgraph FW["src"]
FX["index.ts"]
subgraph FY["lib"]
FZ["SellersCatalogScreens.tsx"]
G0["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph G1["login"]
subgraph G2["src"]
G3["index.ts"]
subgraph G4["lib"]
G5["SellersLogin.tsx"]
G6["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G7["manage-product"]
subgraph G8["src"]
G9["index.ts"]
subgraph GA["lib"]
GB["SellersManageProductScreen.tsx"]
GC["SellersDefineProductFlow.tsx"]
GD["SellersDefineProductFlow.pants-label.spec.tsx"]
GE["SellersDefineProductFlow.spec.tsx"]
GF["SellersManageProductScreen.spec.tsx"]
GG["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GH["products"]
subgraph GI["src"]
GJ["index.ts"]
subgraph GK["lib"]
GL["SellersProducts.tsx"]
GM["SellersProducts.pants-label.spec.tsx"]
GN["SellersProducts.spec.tsx"]
end
end
end
subgraph GO["seller-orders"]
GP["jest.config.ts"]
GQ["jest.setup.ts"]
subgraph GR["src"]
GS["index.ts"]
subgraph GT["lib"]
GU["seller-orders-screen.tsx"]
GV["seller-status-transitions.ts"]
GW["seller-orders-screen.pants-size.spec.tsx"]
GX["seller-orders-screen.spec.tsx"]
GY["seller-orders-screen.status-schema.spec.ts"]
GZ["seller-status-transitions.spec.ts"]
end
H0["test-setup.ts"]
end
end
subgraph H1["setup-password"]
subgraph H2["src"]
H3["index.ts"]
subgraph H4["lib"]
H5["SellersSetupPassword.tsx"]
H6["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H7["unauthorized"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph HC["zustand"]
subgraph HD["sellers-products-store"]
subgraph HE["src"]
HF["index.ts"]
subgraph HG["lib"]
HH["useSellersProductsStore.ts"]
HI["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HJ["shared"]
subgraph HK["components"]
subgraph HL["apollo-provider-base"]
subgraph HM["src"]
HN["index.ts"]
subgraph HO["lib"]
HP["ApolloProviderBase.tsx"]
HQ["createSilentRefreshAuthLink.ts"]
HR["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HS["error-boundary"]
subgraph HT["src"]
HU["index.ts"]
subgraph HV["lib"]
HW["error-boundary.tsx"]
HX["error-boundary.spec.tsx"]
end
end
HY["vite.config.ts"]
end
subgraph HZ["glassmorphism-container"]
subgraph I0["src"]
I1["index.ts"]
subgraph I2["lib"]
I3["glassmorphism-container.tsx"]
I4["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I5["layout"]
subgraph I6["src"]
I7["index.ts"]
subgraph I8["lib"]
I9["Layout.tsx"]
end
end
end
subgraph IA["material-data-table"]
subgraph IB["src"]
IC["index.ts"]
subgraph ID["lib"]
IE["material-data-table.tsx"]
IF["table-config.ts"]
IG["table-utils.ts"]
IH["material-data-table.spec.tsx"]
II["table-types.ts"]
end
end
end
subgraph IJ["order-status-chip"]
subgraph IK["src"]
IL["index.ts"]
subgraph IM["lib"]
IN["order-status-chip.tsx"]
IO["order-status-chip.spec.tsx"]
end
end
end
subgraph IP["password-field"]
subgraph IQ["src"]
IR["index.ts"]
subgraph IS["lib"]
IT["PasswordTextField.tsx"]
end
end
end
subgraph IU["price-display"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["price-display.tsx"]
IZ["price-display.spec.tsx"]
end
end
end
subgraph J0["private-route"]
subgraph J1["src"]
J2["index.ts"]
subgraph J3["lib"]
J4["createPrivateRoute.tsx"]
J5["PrivateRoute.tsx"]
end
end
end
subgraph J6["rtl-table-utils"]
subgraph J7["src"]
J8["index.ts"]
subgraph J9["lib"]
JA["rtl-table-utils.ts"]
JB["rtl-cell-components.tsx"]
JC["rtl-column-helpers.ts"]
JD["rtl-table-props.ts"]
JE["use-table-alignment.ts"]
JF["barrel.spec.ts"]
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
N1["barrel.spec.ts"]
end
end
end
end
subgraph N2["zustand"]
subgraph N3["shared-auth-store"]
subgraph N4["src"]
N5["index.ts"]
subgraph N6["lib"]
N7["shared-auth-store.ts"]
end
end
end
subgraph N8["shared-notification-store"]
subgraph N9["src"]
NA["index.ts"]
subgraph NB["lib"]
NC["shared-notification-store.tsx"]
end
end
end
subgraph ND["shared-ui-store"]
subgraph NE["src"]
NF["index.ts"]
subgraph NG["lib"]
NH["shared-ui-store.ts"]
NI["barrel.spec.ts"]
end
end
end
end
end
end
subgraph NJ["server"]
subgraph NK["controllers"]
subgraph NL["src"]
NM["index.ts"]
subgraph NN["lib"]
NO["auth.controller.ts"]
NP["order.controller.ts"]
end
end
end
subgraph NQ["decorators"]
NR["jest.config.ts"]
subgraph NS["src"]
NT["index.ts"]
subgraph NU["lib"]
NV["authenticated-user.type.ts"]
NW["current-user.decorator.ts"]
NX["decorators.ts"]
NY["decorators.spec.ts"]
end
end
end
subgraph NZ["entities"]
subgraph O0["src"]
O1["index.ts"]
subgraph O2["lib"]
O3["brand.entity.ts"]
O4["product.entity.ts"]
O5["category.entity.ts"]
O6["product-description.entity.ts"]
O7["site-language.entity.ts"]
O8["product-info.entity.ts"]
O9["color.entity.ts"]
OA["product-info-color.entity.ts"]
OB["seller-info.entity.ts"]
OC["seller-product.entity.ts"]
OD["user.entity.ts"]
OE["cart.entity.ts"]
OF["currency-preference.entity.ts"]
OG["currency.entity.ts"]
OH["customer.entity.ts"]
OI["exchange-rate.entity.ts"]
OJ["order.entity.ts"]
OK["platform-settings.entity.ts"]
OL["refresh-token.entity.ts"]
OM["seller-order.entity.ts"]
ON["translation.entity.ts"]
end
end
end
subgraph OO["guards"]
OP["jest.config.ts"]
subgraph OQ["src"]
OR["index.ts"]
subgraph OS["lib"]
OT["catalog.guard.ts"]
OU["graphql-auth.guard.ts"]
OV["http-auth.guard.ts"]
OW["roles.guard.ts"]
OX["catalog.guard.spec.ts"]
OY["roles.guard.spec.ts"]
end
end
end
subgraph OZ["inputs"]
subgraph P0["src"]
P1["index.ts"]
subgraph P2["lib"]
P3["brand.input.ts"]
P4["cart.inputs.ts"]
P5["category.input.ts"]
P6["color.input.ts"]
P7["customer-auth.inputs.ts"]
P8["order-pagination.inputs.ts"]
P9["order.inputs.ts"]
PA["product-info-filter.input.ts"]
PB["product.input.ts"]
PC["seller-order-pagination.inputs.ts"]
PD["seller.input.ts"]
PE["site-language.input.ts"]
PF["user.input.ts"]
end
end
end
subgraph PG["modules"]
subgraph PH["src"]
PI["index.ts"]
subgraph PJ["lib"]
PK["auth.module.ts"]
PL["email.module.ts"]
PM["token.module.ts"]
PN["user.module.ts"]
PO["customer-profile.module.ts"]
PP["brand.module.ts"]
PQ["catalog-guard.module.ts"]
PR["translation.module.ts"]
PS["cart.module.ts"]
PT["platform-settings.module.ts"]
PU["category.module.ts"]
PV["product.module.ts"]
PW["color.module.ts"]
PX["currency.module.ts"]
PY["graphql-context.module.ts"]
PZ["order.module.ts"]
Q0["seller-info.module.ts"]
Q1["payment.module.ts"]
Q2["product-info.module.ts"]
Q3["seller-products.module.ts"]
Q4["site-language.module.ts"]
end
end
end
subgraph Q5["resolvers"]
Q6["jest.config.ts"]
subgraph Q7["src"]
Q8["index.ts"]
subgraph Q9["lib"]
QA["auth.resolver.ts"]
QB["zod-validation.pipe.ts"]
QC["brand.resolver.ts"]
QD["cart.resolver.ts"]
QE["category.resolver.ts"]
QF["color.resolver.ts"]
QG["currency.resolver.ts"]
QH["customer-profile.resolver.ts"]
QI["order.resolver.ts"]
QJ["payment.resolver.ts"]
QK["product-info.resolver.ts"]
QL["product.resolver.ts"]
QM["seller-info.resolver.ts"]
QN["shipping.resolver.ts"]
QO["site-language.resolver.ts"]
QP["translation.input.ts"]
QQ["translation.resolver.ts"]
QR["user.resolver.ts"]
QS["auth-validation.spec.ts"]
QT["auth.resolver.spec.ts"]
QU["cart-validation.spec.ts"]
QV["currency-translation-validation.spec.ts"]
QW["customer-profile-validation.spec.ts"]
QX["order-ownership.security.spec.ts"]
QY["order-validation.spec.ts"]
QZ["order.resolver.spec.ts"]
R0["order.resolver.status-transitions.spec.ts"]
R1["order.resolver.tracking.spec.ts"]
R2["payment-batch.security.spec.ts"]
R3["payment-verify.security.spec.ts"]
R4["payment.amount-tampering.security.spec.ts"]
R5["payment.resolver.integration.spec.ts"]
R6["payment.resolver.spec.ts"]
R7["product-info.resolver.spec.ts"]
R8["product-validation.spec.ts"]
R9["product.resolver.spec.ts"]
RA["query-args-validation.spec.ts"]
RB["seller-info-validation.spec.ts"]
RC["seller-info.resolver.spec.ts"]
RD["taxonomy-validation.spec.ts"]
RE["translation.resolver.guards.spec.ts"]
subgraph RF["types"]
RG["graphql-upload.d.ts"]
end
RH["user.resolver.spec.ts"]
RI["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RJ["services"]
RK["jest.config.ts"]
subgraph RL["src"]
RM["index.ts"]
subgraph RN["lib"]
RO["auth.service.ts"]
RP["brand.service.ts"]
RQ["cart.service.ts"]
RR["product-info-colors.util.ts"]
RS["category.service.ts"]
RT["color.service.ts"]
RU["currency.service.ts"]
RV["customer-profile.service.ts"]
RW["email.service.ts"]
RX["image-upload.service.ts"]
RY["order.service.ts"]
RZ["shipping-calculation.service.ts"]
S0["payment-logger.service.ts"]
S1["payment.service.ts"]
S2["product.service.ts"]
S3["seller-info.service.ts"]
S4["site-language.service.ts"]
S5["token.service.ts"]
S6["translation.service.ts"]
S7["user.service.ts"]
S8["auth.service.password-policy.spec.ts"]
S9["auth.service.spec.ts"]
SA["cart.service.add-quantity.spec.ts"]
SB["cart.service.null-relations.spec.ts"]
SC["cart.service.spec.ts"]
SD["order.payment-verify.security.spec.ts"]
SE["order.price-tampering.security.spec.ts"]
SF["order.service.spec.ts"]
SG["order.service.tracking.spec.ts"]
SH["product-info-colors.util.spec.ts"]
SI["product.service.multi-filters.spec.ts"]
SJ["product.service.only-discounted.spec.ts"]
SK["product.service.pants.spec.ts"]
SL["product.service.spec.ts"]
SM["relay-connection.spec.ts"]
SN["seller-info.service.price-validation.spec.ts"]
SO["shipping-calculation.service.spec.ts"]
SP["shipping-security.security.spec.ts"]
SQ["token.service.spec.ts"]
end
end
end
subgraph SR["strategies"]
subgraph SS["src"]
ST["index.ts"]
subgraph SU["lib"]
SV["local.strategy.ts"]
end
end
end
subgraph SW["utils"]
subgraph SX["src"]
SY["index.ts"]
subgraph SZ["lib"]
T0["email-templates.ts"]
T1["relay-connection.ts"]
T2["pagination.ts"]
end
end
end
end
subgraph T3["shared"]
subgraph T4["codegen"]
T5["jest.config.ts"]
subgraph T6["src"]
T7["index.ts"]
subgraph T8["lib"]
subgraph T9["generated"]
TA["graphql.ts"]
end
end
end
end
subgraph TB["graphql-schema"]
TC["jest.config.ts"]
subgraph TD["src"]
TE["index.ts"]
end
end
subgraph TF["product-sizes"]
subgraph TG["src"]
TH["index.ts"]
subgraph TI["lib"]
TJ["product-sizes.ts"]
TK["product-sizes.pants-formats.spec.ts"]
TL["product-sizes.pants-label.spec.ts"]
TM["product-sizes.pants-strict.spec.ts"]
TN["product-sizes.spec.ts"]
end
end
end
subgraph TO["shared-i18n"]
subgraph TP["src"]
TQ["index.ts"]
subgraph TR["lib"]
TS["language-context.tsx"]
TT["language-detector.ts"]
subgraph TU["locales"]
TV["i18n-react.tsx"]
TW["i18n-util.ts"]
TX["i18n-util.async.ts"]
subgraph TY["en"]
TZ["index.ts"]
end
subgraph U1["fa"]
U2["index.ts"]
end
U3["formatters.ts"]
U4["i18n-types.ts"]
U5["i18n-util.sync.ts"]
U6["navigator-detector.ts"]
end
U0["site-name.ts"]
U7["table-localization.ts"]
U8["theme-provider.tsx"]
U9["use-page-title.ts"]
UA["use-seo-meta.ts"]
UB["use-page-title.spec.tsx"]
UC["use-seo-meta.spec.tsx"]
end
end
end
subgraph UD["validation"]
subgraph UE["src"]
UF["index.ts"]
subgraph UG["lib"]
UH["apollo-error.ts"]
UI["auth.ts"]
UJ["limits.ts"]
UK["primitives.ts"]
UL["auth-forms.ts"]
UM["cart.ts"]
UN["catalog.ts"]
UO["contact.ts"]
UP["currency.ts"]
UQ["taxonomy.ts"]
UR["errors.ts"]
US["order.ts"]
UT["profile.ts"]
UU["query.ts"]
UV["seller.ts"]
UW["auth-forms.admin.spec.ts"]
UX["auth-forms.login.spec.ts"]
UY["auth-forms.recovery.spec.ts"]
UZ["auth-forms.seller.spec.ts"]
V0["auth-forms.spec.ts"]
V1["auth.spec.ts"]
V2["cart.spec.ts"]
V3["catalog.spec.ts"]
V4["contact.spec.ts"]
V5["currency.spec.ts"]
V6["errors.spec.ts"]
V7["order.spec.ts"]
V8["primitives.spec.ts"]
V9["profile.spec.ts"]
VA["query.spec.ts"]
VB["seller.spec.ts"]
VC["taxonomy.spec.ts"]
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
7O-->7T
7Q-->7R
7Q-->7S
7Q-->7T
7U-->7Q
7V-->7T
7Y-->80
81-->80
85-->87
88-->87
89-->87
8D-->8F
8I-->8K
8L-->8K
8M-->8K
8Q-->8S
8V-->8X
8Y-->8X
8Z-->8X
90-->8X
93-->95
98-->9A
98-->9B
98-->9C
9A-->9B
9B-->9C
9D-->9A
9G-->9I
9L-->9N
9O-->9N
9P-->9N
9S-->9U
9U-->9V
9W-->9V
9X-->9U
9Y-->9U
9Z-->9U
A3-->A5
A6-->A5
A7-->A5
A8-->A5
AB-->AD
AE-->AD
AF-->AD
AI-->AK
AL-->AK
AP-->AR
AS-->AR
AW-->AY
AW-->B7
AW-->B1
AW-->B6
AY-->B0
AY-->B2
AY-->B3
AY-->B4
AY-->B5
AY-->B1
AY-->B6
B0-->B1
B7-->B1
B8-->B4
B8-->AY
B8-->B1
B9-->BA
B9-->B4
B9-->AY
B9-->B7
B9-->B1
BB-->B7
BC-->B7
BD-->B1
BF-->B1
BJ-->BL
BM-->BL
BN-->BL
BQ-->BS
BT-->BS
BX-->BZ
C0-->BZ
C4-->C6
C6-->C7
C8-->C6
C9-->C6
CA-->C6
CB-->C6
CC-->C6
CG-->CI
CJ-->CI
CK-->CI
CN-->CP
CQ-->CP
CU-->CW
D0-->D2
D5-->D7
D8-->D5
D9-->D7
DD-->DF
DG-->DD
DH-->DF
DK-->DM
DN-->DM
DR-->DT
DU-->DT
DW-->DY
E3-->E5
E6-->E5
E9-->EB
EE-->EG
EE-->EH
EG-->EH
EL-->EN
EO-->EN
ER-->ET
ER-->EU
ER-->EV
ER-->EY
EV-->EW
EW-->EX
EY-->ET
EY-->EZ
F4-->F6
F6-->F7
FA-->FC
FG-->FI
FG-->FJ
FM-->FO
FR-->FT
FX-->FZ
G0-->FZ
G3-->G5
G6-->G5
G9-->GB
GB-->GC
GD-->GC
GE-->GC
GF-->GB
GG-->GB
GJ-->GL
GM-->GL
GN-->GL
GS-->GU
GU-->GV
GW-->GU
GX-->GU
GZ-->GV
H3-->H5
H6-->H5
H9-->HB
HF-->HH
HN-->HP
HN-->HQ
HR-->HQ
HU-->HW
HX-->HW
I1-->I3
I4-->I3
I7-->I9
IC-->IE
IC-->IF
IC-->IG
IE-->IF
IH-->IE
IL-->IN
IO-->IN
IR-->IT
IW-->IY
IZ-->IY
J2-->J4
J4-->J5
J8-->JA
JA-->JB
JA-->JC
JA-->JD
JA-->JE
JC-->JB
JC-->JD
JF-->J8
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
N1-->MY
N5-->N7
NA-->NC
NF-->NH
NI-->NF
NM-->NO
NM-->NP
NT-->NV
NT-->NW
NT-->NX
NY-->NX
O1-->O3
O1-->OE
O1-->O5
O1-->O9
O1-->OF
O1-->OG
O1-->OH
O1-->OI
O1-->OJ
O1-->OK
O1-->O6
O1-->OA
O1-->O8
O1-->O4
O1-->OL
O1-->OB
O1-->OM
O1-->OC
O1-->O7
O1-->ON
O1-->OD
O3-->O4
O4-->O3
O4-->O5
O4-->O6
O4-->O8
O4-->OB
O4-->OC
O5-->O4
O6-->O4
O6-->O7
O7-->O6
O8-->O9
O8-->OA
O8-->O4
OA-->O9
OA-->O8
OB-->OC
OB-->OD
OC-->O8
OC-->O4
OC-->OB
OE-->O4
OE-->OD
OF-->OG
OH-->OD
OI-->OG
OI-->OD
OJ-->O4
OJ-->OB
OL-->OD
OM-->OJ
OM-->OB
OR-->OT
OR-->OU
OR-->OV
OR-->OW
OX-->OT
OY-->OW
P1-->P3
P1-->P4
P1-->P5
P1-->P6
P1-->P7
P1-->P8
P1-->P9
P1-->PA
P1-->PB
P1-->PC
P1-->PD
P1-->PE
P1-->PF
PB-->PA
PI-->PK
PI-->PP
PI-->PS
PI-->PQ
PI-->PU
PI-->PW
PI-->PX
PI-->PO
PI-->PL
PI-->PY
PI-->PZ
PI-->Q1
PI-->PT
PI-->Q2
PI-->PV
PI-->Q0
PI-->Q3
PI-->Q4
PI-->PM
PI-->PR
PI-->PN
PK-->PL
PK-->PM
PK-->PN
PN-->PK
PN-->PO
PP-->PQ
PP-->PR
PS-->PT
PU-->PQ
PU-->PV
PU-->PR
PV-->PQ
PV-->PM
PV-->PR
PW-->PQ
PW-->PR
PY-->PL
PY-->PM
PY-->PN
PZ-->PT
PZ-->Q0
Q0-->PV
Q0-->PM
Q0-->PN
Q1-->PX
Q1-->PZ
Q2-->PV
Q2-->PR
Q3-->Q0
Q3-->PN
Q8-->QA
Q8-->QC
Q8-->QD
Q8-->QE
Q8-->QF
Q8-->QG
Q8-->QH
Q8-->QI
Q8-->QJ
Q8-->QK
Q8-->QL
Q8-->QM
Q8-->QN
Q8-->QO
Q8-->QP
Q8-->QQ
Q8-->QR
Q8-->QB
QA-->QB
QC-->QB
QD-->QB
QE-->QB
QF-->QB
QG-->QB
QH-->QB
QI-->QB
QL-->QB
QM-->QB
QO-->QB
QQ-->QB
QR-->QB
QS-->QA
QS-->QR
QS-->QB
QT-->QA
QU-->QD
QU-->QB
QV-->QG
QV-->QQ
QV-->QB
QW-->QH
QW-->QB
QX-->QI
QX-->QJ
QY-->QI
QY-->QB
QZ-->QI
R0-->QI
R1-->QI
R2-->QI
R2-->QJ
R3-->QJ
R4-->QJ
R5-->QJ
R6-->QJ
R7-->QK
R8-->QL
R8-->QB
R9-->QL
RA-->QI
RA-->QL
RA-->QM
RA-->QB
RB-->QM
RB-->QB
RC-->QM
RD-->QC
RD-->QE
RD-->QF
RD-->QO
RD-->QB
RE-->QQ
RH-->QR
RI-->QB
RM-->RO
RM-->RP
RM-->RQ
RM-->RS
RM-->RT
RM-->RU
RM-->RV
RM-->RW
RM-->RX
RM-->RY
RM-->S0
RM-->S1
RM-->RR
RM-->S2
RM-->S3
RM-->RZ
RM-->S4
RM-->S5
RM-->S6
RM-->S7
RQ-->RR
RY-->RZ
S2-->RR
S3-->RR
S8-->RO
S8-->RW
S8-->S5
S8-->S7
S9-->RO
S9-->RW
S9-->S5
S9-->S7
SA-->RQ
SB-->RQ
SC-->RQ
SD-->RY
SE-->RY
SF-->RY
SF-->RZ
SG-->RY
SH-->RR
SI-->S2
SI-->S6
SJ-->S2
SJ-->S6
SK-->S2
SK-->S6
SL-->S2
SL-->S6
SN-->RO
SN-->S3
SO-->RZ
SP-->RY
SP-->RZ
SQ-->S5
ST-->SV
SY-->T0
SY-->T1
T7-->TA
TH-->TJ
TK-->TJ
TL-->TJ
TM-->TJ
TN-->TJ
TQ-->TS
TQ-->TT
TQ-->TV
TQ-->U4
TQ-->TW
TQ-->TX
TQ-->U5
TQ-->U6
TQ-->U0
TQ-->U7
TQ-->U8
TQ-->U9
TQ-->UA
TS-->TT
TS-->TV
TS-->TX
TV-->TW
TX-->TZ
TX-->U2
TX-->U3
TX-->TW
TZ-->U0
U2-->U0
U5-->TZ
U5-->U2
U5-->U3
U5-->TW
U7-->TV
U8-->TS
U9-->TV
UB-->U9
UC-->UA
UF-->UH
UF-->UI
UF-->UL
UF-->UM
UF-->UN
UF-->UO
UF-->UP
UF-->UR
UF-->UJ
UF-->US
UF-->UK
UF-->UT
UF-->UU
UF-->UV
UF-->UQ
UI-->UJ
UI-->UK
UK-->UJ
UL-->UI
UM-->UK
UP-->UQ
US-->UI
US-->UM
US-->UK
UT-->US
UU-->UK
UW-->UL
UX-->UL
UY-->UL
UZ-->UL
V0-->UL
V1-->UI
V2-->UM
V3-->UN
V4-->UO
V5-->UP
V6-->UR
V7-->US
V8-->UJ
V8-->UK
V9-->UT
VA-->UU
VB-->UV
VC-->UQ
