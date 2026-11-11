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
81["sitemap-builder.ts"]
82["customer-routes.spec.ts"]
83["sitemap-builder.spec.ts"]
end
end
end
subgraph 84["screens"]
subgraph 85["contact"]
subgraph 86["src"]
87["index.ts"]
subgraph 88["lib"]
89["customer-contact.tsx"]
8A["customer-contact.spec.tsx"]
8B["customer-contact.validation.spec.tsx"]
end
end
8C["vite.config.ts"]
end
subgraph 8D["customer-checkout"]
subgraph 8E["src"]
8F["index.ts"]
subgraph 8G["lib"]
8H["customer-checkout.tsx"]
end
end
end
subgraph 8I["customer-favorites"]
subgraph 8J["src"]
8K["index.ts"]
subgraph 8L["lib"]
8M["customer-favorites.tsx"]
8N["customer-favorites.shared-card.spec.tsx"]
8O["customer-favorites.spec.tsx"]
end
end
8P["vite.config.ts"]
end
subgraph 8Q["customer-login"]
subgraph 8R["src"]
8S["index.ts"]
subgraph 8T["lib"]
8U["customer-login.tsx"]
end
end
end
subgraph 8V["customer-order-confirmation"]
subgraph 8W["src"]
8X["index.ts"]
subgraph 8Y["lib"]
8Z["customer-order-confirmation.tsx"]
90["customer-order-confirmation.pants-size.spec.tsx"]
91["customer-order-confirmation.security.spec.tsx"]
92["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 93["customer-orders"]
subgraph 94["src"]
95["index.ts"]
subgraph 96["lib"]
97["customer-orders.tsx"]
end
end
end
subgraph 98["customer-payment"]
subgraph 99["src"]
9A["index.ts"]
subgraph 9B["lib"]
9C["customer-payment-callback.tsx"]
9D["use-zarinpal-payment.tsx"]
9E["zarinpal-payment-service.ts"]
9F["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 9G["customer-products"]
subgraph 9H["src"]
9I["index.ts"]
subgraph 9J["lib"]
9K["customer-products.tsx"]
end
end
end
subgraph 9L["customer-profile"]
subgraph 9M["src"]
9N["index.ts"]
subgraph 9O["lib"]
9P["customer-profile.tsx"]
9Q["customer-profile.spec.tsx"]
9R["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9S["customer-shopping-cart"]
subgraph 9T["src"]
9U["index.ts"]
subgraph 9V["lib"]
9W["customer-shopping-cart.tsx"]
9X["build-order-confirmation-data.ts"]
9Y["build-order-confirmation-data.spec.ts"]
9Z["customer-shopping-cart.pants-size.spec.tsx"]
A0["customer-shopping-cart.shipping-form.spec.tsx"]
A1["customer-shopping-cart.spec.tsx"]
end
end
A2["vite.config.ts"]
end
subgraph A3["customer-signup"]
subgraph A4["src"]
A5["index.ts"]
subgraph A6["lib"]
A7["customer-signup.tsx"]
A8["customer-signup.password-length.spec.tsx"]
A9["customer-signup.spec.tsx"]
AA["customer-signup.zod.spec.tsx"]
end
end
end
subgraph AB["forgot-password"]
subgraph AC["src"]
AD["index.ts"]
subgraph AE["lib"]
AF["customer-forgot-password.tsx"]
AG["customer-forgot-password.spec.tsx"]
AH["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph AI["guide-authenticity"]
subgraph AJ["src"]
AK["index.ts"]
subgraph AL["lib"]
AM["customer-guide-authenticity.tsx"]
AN["customer-guide-authenticity.spec.tsx"]
end
end
AO["vite.config.ts"]
end
subgraph AP["guide-payment"]
subgraph AQ["src"]
AR["index.ts"]
subgraph AS["lib"]
AT["customer-guide-payment.tsx"]
AU["customer-guide-payment.spec.tsx"]
end
end
AV["vite.config.ts"]
end
subgraph AW["home"]
subgraph AX["src"]
AY["index.ts"]
subgraph AZ["lib"]
B0["CustomersHomeScreen.tsx"]
subgraph B1["components"]
B2["CategoryBentoSection.tsx"]
B4["HeroSection.tsx"]
B5["HomeLoadingScreen.tsx"]
B6["PicksRailSection.tsx"]
B7["TrustStripSection.tsx"]
BC["NewArrivalsSection.tsx"]
BF["BrandBlocksSection.tsx"]
BG["NewsletterSection.tsx"]
BH["ShopTheLookSection.tsx"]
BI["TickerSection.tsx"]
end
B3["home-selectors.ts"]
B8["useScrollProgress.ts"]
B9["CustomersShopScreen.tsx"]
BA["CustomersHomeScreen.cart-size.spec.tsx"]
BB["CustomersHomeScreen.spec.tsx"]
BD["CustomersShopScreen.cart-size.spec.tsx"]
BE["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BJ["login"]
subgraph BK["src"]
BL["index.ts"]
subgraph BM["lib"]
BN["CustomersLoginScreen.tsx"]
BO["CustomersLoginScreen.spec.tsx"]
BP["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BQ["not-found"]
subgraph BR["src"]
BS["index.ts"]
subgraph BT["lib"]
BU["customer-not-found.tsx"]
BV["customer-not-found.spec.tsx"]
end
end
BW["vite.config.ts"]
end
subgraph BX["privacy-policy"]
subgraph BY["src"]
BZ["index.ts"]
subgraph C0["lib"]
C1["customer-privacy-policy.tsx"]
C2["customer-privacy-policy.spec.tsx"]
end
end
C3["vite.config.ts"]
end
subgraph C4["product-details"]
subgraph C5["src"]
C6["index.ts"]
subgraph C7["lib"]
C8["customer-product-details.tsx"]
C9["reviews-flag.ts"]
CA["customer-product-details.guarantee.spec.tsx"]
CB["customer-product-details.no-low-stock.spec.tsx"]
CC["customer-product-details.pants-size.spec.tsx"]
CD["customer-product-details.reviews-hidden.spec.tsx"]
CE["customer-product-details.spec.tsx"]
end
end
CF["vite.config.ts"]
end
subgraph CG["reset-password"]
subgraph CH["src"]
CI["index.ts"]
subgraph CJ["lib"]
CK["customer-reset-password.tsx"]
CL["customer-reset-password.password-length.spec.tsx"]
CM["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CN["shipping-returns"]
subgraph CO["src"]
CP["index.ts"]
subgraph CQ["lib"]
CR["customer-shipping-returns.tsx"]
CS["customer-shipping-returns.spec.tsx"]
end
end
CT["vite.config.ts"]
end
subgraph CU["unauthorized"]
subgraph CV["src"]
CW["index.ts"]
subgraph CX["lib"]
CY["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CZ["utility"]
subgraph D0["test"]
subgraph D1["src"]
D2["index.ts"]
subgraph D3["lib"]
D4["customers-test-utility.tsx"]
end
end
end
end
subgraph D5["validations"]
subgraph D6["src"]
D7["index.ts"]
subgraph D8["lib"]
D9["shipping-validation.ts"]
DA["barrel.spec.ts"]
DB["shipping-validation.shared.spec.ts"]
end
end
end
subgraph DC["zustand"]
subgraph DD["customer-cart-store"]
subgraph DE["src"]
DF["index.ts"]
subgraph DG["lib"]
DH["customer-cart-store.ts"]
DI["barrel.spec.ts"]
DJ["customer-cart-store.spec.ts"]
end
end
end
subgraph DK["customer-checkout-store"]
subgraph DL["src"]
DM["index.ts"]
subgraph DN["lib"]
DO["customer-checkout-store.ts"]
DP["customer-checkout-store.spec.ts"]
end
end
DQ["vite.config.ts"]
end
subgraph DR["customer-wishlist-store"]
subgraph DS["src"]
DT["index.ts"]
subgraph DU["lib"]
DV["customer-wishlist-store.ts"]
DW["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DX["src"]
DY["index.ts"]
subgraph DZ["lib"]
E0["customers-products-store.tsx"]
end
end
end
end
subgraph E1["sellers"]
subgraph E2["components"]
subgraph E3["footer"]
subgraph E4["src"]
E5["index.ts"]
subgraph E6["lib"]
E7["sellers-footer.tsx"]
E8["sellers-footer.spec.tsx"]
end
end
end
subgraph E9["headerbar"]
subgraph EA["src"]
EB["index.ts"]
subgraph EC["lib"]
ED["SellersHeaderbar.tsx"]
end
end
end
subgraph EE["layout"]
subgraph EF["src"]
EG["index.ts"]
subgraph EH["lib"]
EI["SellersLayout.tsx"]
EJ["SellersTabbar.tsx"]
end
end
end
end
subgraph EK["contexts"]
subgraph EL["auth"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["SellersAuthContext.tsx"]
EQ["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph ER["graphql"]
subgraph ES["src"]
ET["index.ts"]
subgraph EU["lib"]
EV["fragments.ts"]
EW["mutations.ts"]
EX["Provider.tsx"]
EY["SellersApolloProvider.tsx"]
EZ["client.ts"]
F0["queries.ts"]
F1["seller-orders.graphql.ts"]
F2["apollo-upload-client.d.ts"]
end
end
end
subgraph F3["hooks"]
subgraph F4["auth"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["useSellerAuth.ts"]
F9["sellerAuth.graphql.ts"]
end
end
end
subgraph FA["orders"]
subgraph FB["src"]
FC["index.ts"]
subgraph FD["lib"]
FE["useSellerOrders.ts"]
FF["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FG["products"]
subgraph FH["src"]
FI["index.ts"]
subgraph FJ["lib"]
FK["useSellersProductManagement.ts"]
FL["useSellersProducts.ts"]
end
end
end
end
subgraph FM["router"]
subgraph FN["src"]
FO["index.ts"]
subgraph FP["lib"]
FQ["SellersRouter.tsx"]
end
end
end
subgraph FR["routes"]
subgraph FS["src"]
FT["index.ts"]
subgraph FU["lib"]
FV["seller-routes.ts"]
end
end
end
subgraph FW["screens"]
subgraph FX["catalog"]
subgraph FY["src"]
FZ["index.ts"]
subgraph G0["lib"]
G1["SellersCatalogScreens.tsx"]
G2["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph G3["login"]
subgraph G4["src"]
G5["index.ts"]
subgraph G6["lib"]
G7["SellersLogin.tsx"]
G8["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G9["manage-product"]
subgraph GA["src"]
GB["index.ts"]
subgraph GC["lib"]
GD["SellersManageProductScreen.tsx"]
GE["SellersDefineProductFlow.tsx"]
GF["SellersDefineProductFlow.pants-label.spec.tsx"]
GG["SellersDefineProductFlow.spec.tsx"]
GH["SellersManageProductScreen.spec.tsx"]
GI["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GJ["products"]
subgraph GK["src"]
GL["index.ts"]
subgraph GM["lib"]
GN["SellersProducts.tsx"]
GO["SellersProducts.pants-label.spec.tsx"]
GP["SellersProducts.spec.tsx"]
end
end
end
subgraph GQ["seller-orders"]
GR["jest.config.ts"]
GS["jest.setup.ts"]
subgraph GT["src"]
GU["index.ts"]
subgraph GV["lib"]
GW["seller-orders-screen.tsx"]
GX["seller-status-transitions.ts"]
GY["seller-orders-screen.pants-size.spec.tsx"]
GZ["seller-orders-screen.spec.tsx"]
H0["seller-orders-screen.status-schema.spec.ts"]
H1["seller-status-transitions.spec.ts"]
end
H2["test-setup.ts"]
end
end
subgraph H3["setup-password"]
subgraph H4["src"]
H5["index.ts"]
subgraph H6["lib"]
H7["SellersSetupPassword.tsx"]
H8["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H9["unauthorized"]
subgraph HA["src"]
HB["index.ts"]
subgraph HC["lib"]
HD["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph HE["zustand"]
subgraph HF["sellers-products-store"]
subgraph HG["src"]
HH["index.ts"]
subgraph HI["lib"]
HJ["useSellersProductsStore.ts"]
HK["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HL["shared"]
subgraph HM["components"]
subgraph HN["apollo-provider-base"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["ApolloProviderBase.tsx"]
HS["createSilentRefreshAuthLink.ts"]
HT["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HU["error-boundary"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["error-boundary.tsx"]
HZ["error-boundary.spec.tsx"]
end
end
I0["vite.config.ts"]
end
subgraph I1["glassmorphism-container"]
subgraph I2["src"]
I3["index.ts"]
subgraph I4["lib"]
I5["glassmorphism-container.tsx"]
I6["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I7["layout"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["Layout.tsx"]
end
end
end
subgraph IC["material-data-table"]
subgraph ID["src"]
IE["index.ts"]
subgraph IF["lib"]
IG["material-data-table.tsx"]
IH["table-config.ts"]
II["table-utils.ts"]
IJ["material-data-table.spec.tsx"]
IK["table-types.ts"]
end
end
end
subgraph IL["order-status-chip"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["order-status-chip.tsx"]
IQ["order-status-chip.spec.tsx"]
end
end
end
subgraph IR["password-field"]
subgraph IS["src"]
IT["index.ts"]
subgraph IU["lib"]
IV["PasswordTextField.tsx"]
end
end
end
subgraph IW["price-display"]
subgraph IX["src"]
IY["index.ts"]
subgraph IZ["lib"]
J0["price-display.tsx"]
J1["price-display.spec.tsx"]
end
end
end
subgraph J2["private-route"]
subgraph J3["src"]
J4["index.ts"]
subgraph J5["lib"]
J6["createPrivateRoute.tsx"]
J7["PrivateRoute.tsx"]
end
end
end
subgraph J8["rtl-table-utils"]
subgraph J9["src"]
JA["index.ts"]
subgraph JB["lib"]
JC["rtl-table-utils.ts"]
JD["rtl-cell-components.tsx"]
JE["rtl-column-helpers.ts"]
JF["rtl-table-props.ts"]
JG["use-table-alignment.ts"]
JH["barrel.spec.ts"]
end
end
end
subgraph JI["snackbar"]
subgraph JJ["src"]
JK["index.ts"]
subgraph JL["lib"]
JM["snackbar.tsx"]
end
end
end
subgraph JN["styled-drawer"]
subgraph JO["src"]
JP["index.ts"]
subgraph JQ["lib"]
JR["styled-drawer.tsx"]
JS["styled-drawer.spec.tsx"]
end
end
end
subgraph JT["unauthorized"]
subgraph JU["src"]
JV["index.ts"]
subgraph JW["lib"]
JX["unauthorized-path.tsx"]
end
end
end
end
subgraph JY["graphql"]
subgraph JZ["src"]
K0["index.ts"]
subgraph K1["lib"]
K2["currency.mutations.ts"]
K3["currency.queries.ts"]
K4["fragments.ts"]
K5["variant-colors.ts"]
K6["client-shared-graphql.tsx"]
end
end
end
subgraph K7["hooks"]
subgraph K8["brands"]
subgraph K9["src"]
KA["index.ts"]
subgraph KB["lib"]
KC["brands.graphql.ts"]
KD["useBrands.ts"]
end
end
KE["vite.config.ts"]
end
subgraph KF["categories"]
subgraph KG["src"]
KH["index.ts"]
subgraph KI["lib"]
KJ["useCategories.ts"]
KK["categories.graphql.ts"]
end
end
end
subgraph KL["colors"]
subgraph KM["src"]
KN["index.ts"]
subgraph KO["lib"]
KP["useColors.ts"]
KQ["color.graphql.ts"]
end
end
end
subgraph KR["currency"]
subgraph KS["src"]
KT["index.ts"]
subgraph KU["lib"]
KV["useConvertPrice.tsx"]
KW["useExchangeRate.tsx"]
KX["useCurrencies.tsx"]
KY["useCurrencyForLocale.tsx"]
KZ["useExchangeRate.spec.tsx"]
end
end
end
subgraph L0["products"]
subgraph L1["src"]
L2["index.ts"]
subgraph L3["lib"]
L4["productImage.ts"]
L5["products.graphql.ts"]
L6["useProducts.ts"]
L7["productImage.spec.ts"]
end
end
end
subgraph L8["site-languages"]
subgraph L9["src"]
LA["index.ts"]
subgraph LB["lib"]
LC["site-languages.graphql.ts"]
LD["useSiteLanguages.ts"]
LE["site-languages-hook.spec.tsx"]
end
end
LF["vite.config.ts"]
end
subgraph LG["snackbar"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["SnackbarContext.tsx"]
LL["useSnackbar.ts"]
end
end
end
subgraph LM["translations-management-hook"]
subgraph LN["src"]
LO["index.ts"]
subgraph LP["lib"]
LQ["useTranslationsManagement.ts"]
end
end
end
end
subgraph LR["lottie"]
subgraph LS["empty-cart"]
subgraph LT["src"]
LU["index.ts"]
subgraph LV["lib"]
LW["lottie-empty-cart.tsx"]
LX["lottie-empty-cart.spec.tsx"]
end
end
LY["vite.config.ts"]
end
subgraph LZ["loading"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["lottie-loading.tsx"]
M4["lottie-loading.spec.tsx"]
end
end
end
subgraph M5["success-check"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["lottie-success-check.tsx"]
MA["lottie-success-check.spec.tsx"]
end
end
end
subgraph MB["unauthorized"]
subgraph MC["src"]
MD["index.ts"]
subgraph ME["lib"]
MF["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MG["translations"]
subgraph MH["src"]
MI["index.ts"]
subgraph MJ["lib"]
MK["mapApolloErrorToTranslationKey.ts"]
ML["WrapTranslation.tsx"]
end
end
end
subgraph MM["ui"]
subgraph MN["colors"]
subgraph MO["src"]
MP["index.ts"]
subgraph MQ["lib"]
MR["colors.ts"]
end
end
end
subgraph MS["language-components"]
subgraph MT["src"]
MU["index.ts"]
subgraph MV["lib"]
MW["language-components.tsx"]
MX["ltr-text-field.tsx"]
end
end
end
subgraph MY["sizes"]
subgraph MZ["src"]
N0["index.ts"]
subgraph N1["lib"]
N2["sizes.ts"]
N3["barrel.spec.ts"]
end
end
end
end
subgraph N4["zustand"]
subgraph N5["shared-auth-store"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["shared-auth-store.ts"]
end
end
end
subgraph NA["shared-notification-store"]
subgraph NB["src"]
NC["index.ts"]
subgraph ND["lib"]
NE["shared-notification-store.tsx"]
end
end
end
subgraph NF["shared-ui-store"]
subgraph NG["src"]
NH["index.ts"]
subgraph NI["lib"]
NJ["shared-ui-store.ts"]
NK["barrel.spec.ts"]
end
end
end
end
end
end
subgraph NL["server"]
subgraph NM["controllers"]
subgraph NN["src"]
NO["index.ts"]
subgraph NP["lib"]
NQ["auth.controller.ts"]
NR["order.controller.ts"]
end
end
end
subgraph NS["decorators"]
NT["jest.config.ts"]
subgraph NU["src"]
NV["index.ts"]
subgraph NW["lib"]
NX["authenticated-user.type.ts"]
NY["current-user.decorator.ts"]
NZ["decorators.ts"]
O0["decorators.spec.ts"]
end
end
end
subgraph O1["entities"]
subgraph O2["src"]
O3["index.ts"]
subgraph O4["lib"]
O5["brand.entity.ts"]
O6["product.entity.ts"]
O7["category.entity.ts"]
O8["product-description.entity.ts"]
O9["site-language.entity.ts"]
OA["product-info.entity.ts"]
OB["color.entity.ts"]
OC["product-info-color.entity.ts"]
OD["seller-info.entity.ts"]
OE["seller-product.entity.ts"]
OF["user.entity.ts"]
OG["cart.entity.ts"]
OH["currency-preference.entity.ts"]
OI["currency.entity.ts"]
OJ["customer.entity.ts"]
OK["exchange-rate.entity.ts"]
OL["order.entity.ts"]
OM["platform-settings.entity.ts"]
ON["refresh-token.entity.ts"]
OO["seller-order.entity.ts"]
OP["translation.entity.ts"]
end
end
end
subgraph OQ["guards"]
OR["jest.config.ts"]
subgraph OS["src"]
OT["index.ts"]
subgraph OU["lib"]
OV["catalog.guard.ts"]
OW["graphql-auth.guard.ts"]
OX["http-auth.guard.ts"]
OY["roles.guard.ts"]
OZ["catalog.guard.spec.ts"]
P0["roles.guard.spec.ts"]
end
end
end
subgraph P1["inputs"]
subgraph P2["src"]
P3["index.ts"]
subgraph P4["lib"]
P5["brand.input.ts"]
P6["cart.inputs.ts"]
P7["category.input.ts"]
P8["color.input.ts"]
P9["customer-auth.inputs.ts"]
PA["order-pagination.inputs.ts"]
PB["order.inputs.ts"]
PC["product-info-filter.input.ts"]
PD["product.input.ts"]
PE["seller-order-pagination.inputs.ts"]
PF["seller.input.ts"]
PG["site-language.input.ts"]
PH["user.input.ts"]
end
end
end
subgraph PI["modules"]
subgraph PJ["src"]
PK["index.ts"]
subgraph PL["lib"]
PM["auth.module.ts"]
PN["email.module.ts"]
PO["token.module.ts"]
PP["user.module.ts"]
PQ["customer-profile.module.ts"]
PR["brand.module.ts"]
PS["catalog-guard.module.ts"]
PT["translation.module.ts"]
PU["cart.module.ts"]
PV["platform-settings.module.ts"]
PW["category.module.ts"]
PX["product.module.ts"]
PY["color.module.ts"]
PZ["currency.module.ts"]
Q0["graphql-context.module.ts"]
Q1["order.module.ts"]
Q2["seller-info.module.ts"]
Q3["payment.module.ts"]
Q4["product-info.module.ts"]
Q5["seller-products.module.ts"]
Q6["site-language.module.ts"]
end
end
end
subgraph Q7["resolvers"]
Q8["jest.config.ts"]
subgraph Q9["src"]
QA["index.ts"]
subgraph QB["lib"]
QC["auth.resolver.ts"]
QD["zod-validation.pipe.ts"]
QE["brand.resolver.ts"]
QF["cart.resolver.ts"]
QG["category.resolver.ts"]
QH["color.resolver.ts"]
QI["currency.resolver.ts"]
QJ["customer-profile.resolver.ts"]
QK["order.resolver.ts"]
QL["payment.resolver.ts"]
QM["product-info.resolver.ts"]
QN["product.resolver.ts"]
QO["seller-info.resolver.ts"]
QP["shipping.resolver.ts"]
QQ["site-language.resolver.ts"]
QR["translation.input.ts"]
QS["translation.resolver.ts"]
QT["user.resolver.ts"]
QU["auth-validation.spec.ts"]
QV["auth.resolver.spec.ts"]
QW["cart-validation.spec.ts"]
QX["currency-translation-validation.spec.ts"]
QY["customer-profile-validation.spec.ts"]
QZ["order-ownership.security.spec.ts"]
R0["order-validation.spec.ts"]
R1["order.resolver.spec.ts"]
R2["order.resolver.status-transitions.spec.ts"]
R3["order.resolver.tracking.spec.ts"]
R4["payment-batch.security.spec.ts"]
R5["payment-verify.security.spec.ts"]
R6["payment.amount-tampering.security.spec.ts"]
R7["payment.resolver.integration.spec.ts"]
R8["payment.resolver.spec.ts"]
R9["product-info.resolver.spec.ts"]
RA["product-validation.spec.ts"]
RB["product.resolver.spec.ts"]
RC["query-args-validation.spec.ts"]
RD["seller-info-validation.spec.ts"]
RE["seller-info.resolver.spec.ts"]
RF["taxonomy-validation.spec.ts"]
RG["translation.resolver.guards.spec.ts"]
subgraph RH["types"]
RI["graphql-upload.d.ts"]
end
RJ["user.resolver.spec.ts"]
RK["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RL["services"]
RM["jest.config.ts"]
subgraph RN["src"]
RO["index.ts"]
subgraph RP["lib"]
RQ["auth.service.ts"]
RR["brand.service.ts"]
RS["cart.service.ts"]
RT["product-info-colors.util.ts"]
RU["category.service.ts"]
RV["color.service.ts"]
RW["currency.service.ts"]
RX["customer-profile.service.ts"]
RY["email.service.ts"]
RZ["image-upload.service.ts"]
S0["order.service.ts"]
S1["shipping-calculation.service.ts"]
S2["payment-logger.service.ts"]
S3["payment.service.ts"]
S4["product.service.ts"]
S5["seller-info.service.ts"]
S6["site-language.service.ts"]
S7["token.service.ts"]
S8["translation.service.ts"]
S9["user.service.ts"]
SA["auth.service.password-policy.spec.ts"]
SB["auth.service.spec.ts"]
SC["cart.service.add-quantity.spec.ts"]
SD["cart.service.null-relations.spec.ts"]
SE["cart.service.spec.ts"]
SF["order.payment-verify.security.spec.ts"]
SG["order.price-tampering.security.spec.ts"]
SH["order.service.spec.ts"]
SI["order.service.tracking.spec.ts"]
SJ["product-info-colors.util.spec.ts"]
SK["product.service.multi-filters.spec.ts"]
SL["product.service.only-discounted.spec.ts"]
SM["product.service.pants.spec.ts"]
SN["product.service.spec.ts"]
SO["relay-connection.spec.ts"]
SP["seller-info.service.price-validation.spec.ts"]
SQ["shipping-calculation.service.spec.ts"]
SR["shipping-security.security.spec.ts"]
SS["token.service.spec.ts"]
end
end
end
subgraph ST["strategies"]
subgraph SU["src"]
SV["index.ts"]
subgraph SW["lib"]
SX["local.strategy.ts"]
end
end
end
subgraph SY["utils"]
subgraph SZ["src"]
T0["index.ts"]
subgraph T1["lib"]
T2["email-templates.ts"]
T3["relay-connection.ts"]
T4["pagination.ts"]
end
end
end
end
subgraph T5["shared"]
subgraph T6["codegen"]
T7["jest.config.ts"]
subgraph T8["src"]
T9["index.ts"]
subgraph TA["lib"]
subgraph TB["generated"]
TC["graphql.ts"]
end
end
end
end
subgraph TD["graphql-schema"]
TE["jest.config.ts"]
subgraph TF["src"]
TG["index.ts"]
end
end
subgraph TH["product-sizes"]
subgraph TI["src"]
TJ["index.ts"]
subgraph TK["lib"]
TL["product-sizes.ts"]
TM["product-sizes.pants-formats.spec.ts"]
TN["product-sizes.pants-label.spec.ts"]
TO["product-sizes.pants-strict.spec.ts"]
TP["product-sizes.spec.ts"]
end
end
end
subgraph TQ["shared-i18n"]
subgraph TR["src"]
TS["index.ts"]
subgraph TT["lib"]
TU["language-context.tsx"]
TV["language-detector.ts"]
subgraph TW["locales"]
TX["i18n-react.tsx"]
TY["i18n-util.ts"]
TZ["i18n-util.async.ts"]
subgraph U0["en"]
U1["index.ts"]
end
subgraph U3["fa"]
U4["index.ts"]
end
U5["formatters.ts"]
U6["i18n-types.ts"]
U7["i18n-util.sync.ts"]
U8["navigator-detector.ts"]
end
U2["site-name.ts"]
U9["seo-json-ld.ts"]
UA["use-seo-meta.ts"]
UB["table-localization.ts"]
UC["theme-provider.tsx"]
UD["use-page-title.ts"]
UE["seo-json-ld.spec.tsx"]
UF["use-page-title.spec.tsx"]
UG["use-seo-meta.spec.tsx"]
end
end
end
subgraph UH["validation"]
subgraph UI["src"]
UJ["index.ts"]
subgraph UK["lib"]
UL["apollo-error.ts"]
UM["auth.ts"]
UN["limits.ts"]
UO["primitives.ts"]
UP["auth-forms.ts"]
UQ["cart.ts"]
UR["catalog.ts"]
US["contact.ts"]
UT["currency.ts"]
UU["taxonomy.ts"]
UV["errors.ts"]
UW["order.ts"]
UX["profile.ts"]
UY["query.ts"]
UZ["seller.ts"]
V0["auth-forms.admin.spec.ts"]
V1["auth-forms.login.spec.ts"]
V2["auth-forms.recovery.spec.ts"]
V3["auth-forms.seller.spec.ts"]
V4["auth-forms.spec.ts"]
V5["auth.spec.ts"]
V6["cart.spec.ts"]
V7["catalog.spec.ts"]
V8["contact.spec.ts"]
V9["currency.spec.ts"]
VA["errors.spec.ts"]
VB["order.spec.ts"]
VC["primitives.spec.ts"]
VD["profile.spec.ts"]
VE["query.spec.ts"]
VF["seller.spec.ts"]
VG["taxonomy.spec.ts"]
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
7Y-->81
82-->80
83-->81
87-->89
8A-->89
8B-->89
8F-->8H
8K-->8M
8N-->8M
8O-->8M
8S-->8U
8X-->8Z
90-->8Z
91-->8Z
92-->8Z
95-->97
9A-->9C
9A-->9D
9A-->9E
9C-->9D
9D-->9E
9F-->9C
9I-->9K
9N-->9P
9Q-->9P
9R-->9P
9U-->9W
9W-->9X
9Y-->9X
9Z-->9W
A0-->9W
A1-->9W
A5-->A7
A8-->A7
A9-->A7
AA-->A7
AD-->AF
AG-->AF
AH-->AF
AK-->AM
AN-->AM
AR-->AT
AU-->AT
AY-->B0
AY-->B9
AY-->B3
AY-->B8
B0-->B2
B0-->B4
B0-->B5
B0-->B6
B0-->B7
B0-->B3
B0-->B8
B2-->B3
B9-->B3
BA-->B6
BA-->B0
BA-->B3
BB-->BC
BB-->B6
BB-->B0
BB-->B9
BB-->B3
BD-->B9
BE-->B9
BF-->B3
BH-->B3
BL-->BN
BO-->BN
BP-->BN
BS-->BU
BV-->BU
BZ-->C1
C2-->C1
C6-->C8
C8-->C9
CA-->C8
CB-->C8
CC-->C8
CD-->C8
CE-->C8
CI-->CK
CL-->CK
CM-->CK
CP-->CR
CS-->CR
CW-->CY
D2-->D4
D7-->D9
DA-->D7
DB-->D9
DF-->DH
DI-->DF
DJ-->DH
DM-->DO
DP-->DO
DT-->DV
DW-->DV
DY-->E0
E5-->E7
E8-->E7
EB-->ED
EG-->EI
EG-->EJ
EI-->EJ
EN-->EP
EQ-->EP
ET-->EV
ET-->EW
ET-->EX
ET-->F0
EX-->EY
EY-->EZ
F0-->EV
F0-->F1
F6-->F8
F8-->F9
FC-->FE
FI-->FK
FI-->FL
FO-->FQ
FT-->FV
FZ-->G1
G2-->G1
G5-->G7
G8-->G7
GB-->GD
GD-->GE
GF-->GE
GG-->GE
GH-->GD
GI-->GD
GL-->GN
GO-->GN
GP-->GN
GU-->GW
GW-->GX
GY-->GW
GZ-->GW
H1-->GX
H5-->H7
H8-->H7
HB-->HD
HH-->HJ
HP-->HR
HP-->HS
HT-->HS
HW-->HY
HZ-->HY
I3-->I5
I6-->I5
I9-->IB
IE-->IG
IE-->IH
IE-->II
IG-->IH
IJ-->IG
IN-->IP
IQ-->IP
IT-->IV
IY-->J0
J1-->J0
J4-->J6
J6-->J7
JA-->JC
JC-->JD
JC-->JE
JC-->JF
JC-->JG
JE-->JD
JE-->JF
JH-->JA
JK-->JM
JP-->JR
JS-->JR
JV-->JX
K0-->K2
K0-->K3
K0-->K4
K0-->K5
KA-->KC
KA-->KD
KD-->KC
KH-->KJ
KJ-->KK
KN-->KP
KP-->KQ
KT-->KV
KT-->KX
KT-->KY
KT-->KW
KV-->KW
KZ-->KW
L2-->L4
L2-->L5
L2-->L6
L6-->L5
L7-->L4
LA-->LC
LA-->LD
LD-->LC
LE-->LD
LI-->LK
LI-->LL
LL-->LK
LO-->LQ
LU-->LW
LX-->LW
M1-->M3
M4-->M3
M7-->M9
MA-->M9
MD-->MF
MI-->MK
MP-->MR
MU-->MW
MU-->MX
N0-->N2
N3-->N0
N7-->N9
NC-->NE
NH-->NJ
NK-->NH
NO-->NQ
NO-->NR
NV-->NX
NV-->NY
NV-->NZ
O0-->NZ
O3-->O5
O3-->OG
O3-->O7
O3-->OB
O3-->OH
O3-->OI
O3-->OJ
O3-->OK
O3-->OL
O3-->OM
O3-->O8
O3-->OC
O3-->OA
O3-->O6
O3-->ON
O3-->OD
O3-->OO
O3-->OE
O3-->O9
O3-->OP
O3-->OF
O5-->O6
O6-->O5
O6-->O7
O6-->O8
O6-->OA
O6-->OD
O6-->OE
O7-->O6
O8-->O6
O8-->O9
O9-->O8
OA-->OB
OA-->OC
OA-->O6
OC-->OB
OC-->OA
OD-->OE
OD-->OF
OE-->OA
OE-->O6
OE-->OD
OG-->O6
OG-->OF
OH-->OI
OJ-->OF
OK-->OI
OK-->OF
OL-->O6
OL-->OD
ON-->OF
OO-->OL
OO-->OD
OT-->OV
OT-->OW
OT-->OX
OT-->OY
OZ-->OV
P0-->OY
P3-->P5
P3-->P6
P3-->P7
P3-->P8
P3-->P9
P3-->PA
P3-->PB
P3-->PC
P3-->PD
P3-->PE
P3-->PF
P3-->PG
P3-->PH
PD-->PC
PK-->PM
PK-->PR
PK-->PU
PK-->PS
PK-->PW
PK-->PY
PK-->PZ
PK-->PQ
PK-->PN
PK-->Q0
PK-->Q1
PK-->Q3
PK-->PV
PK-->Q4
PK-->PX
PK-->Q2
PK-->Q5
PK-->Q6
PK-->PO
PK-->PT
PK-->PP
PM-->PN
PM-->PO
PM-->PP
PP-->PM
PP-->PQ
PR-->PS
PR-->PT
PU-->PV
PW-->PS
PW-->PX
PW-->PT
PX-->PS
PX-->PO
PX-->PT
PY-->PS
PY-->PT
Q0-->PN
Q0-->PO
Q0-->PP
Q1-->PV
Q1-->Q2
Q2-->PX
Q2-->PO
Q2-->PP
Q3-->PZ
Q3-->Q1
Q4-->PX
Q4-->PT
Q5-->Q2
Q5-->PP
QA-->QC
QA-->QE
QA-->QF
QA-->QG
QA-->QH
QA-->QI
QA-->QJ
QA-->QK
QA-->QL
QA-->QM
QA-->QN
QA-->QO
QA-->QP
QA-->QQ
QA-->QR
QA-->QS
QA-->QT
QA-->QD
QC-->QD
QE-->QD
QF-->QD
QG-->QD
QH-->QD
QI-->QD
QJ-->QD
QK-->QD
QN-->QD
QO-->QD
QQ-->QD
QS-->QD
QT-->QD
QU-->QC
QU-->QT
QU-->QD
QV-->QC
QW-->QF
QW-->QD
QX-->QI
QX-->QS
QX-->QD
QY-->QJ
QY-->QD
QZ-->QK
QZ-->QL
R0-->QK
R0-->QD
R1-->QK
R2-->QK
R3-->QK
R4-->QK
R4-->QL
R5-->QL
R6-->QL
R7-->QL
R8-->QL
R9-->QM
RA-->QN
RA-->QD
RB-->QN
RC-->QK
RC-->QN
RC-->QO
RC-->QD
RD-->QO
RD-->QD
RE-->QO
RF-->QE
RF-->QG
RF-->QH
RF-->QQ
RF-->QD
RG-->QS
RJ-->QT
RK-->QD
RO-->RQ
RO-->RR
RO-->RS
RO-->RU
RO-->RV
RO-->RW
RO-->RX
RO-->RY
RO-->RZ
RO-->S0
RO-->S2
RO-->S3
RO-->RT
RO-->S4
RO-->S5
RO-->S1
RO-->S6
RO-->S7
RO-->S8
RO-->S9
RS-->RT
S0-->S1
S4-->RT
S5-->RT
SA-->RQ
SA-->RY
SA-->S7
SA-->S9
SB-->RQ
SB-->RY
SB-->S7
SB-->S9
SC-->RS
SD-->RS
SE-->RS
SF-->S0
SG-->S0
SH-->S0
SH-->S1
SI-->S0
SJ-->RT
SK-->S4
SK-->S8
SL-->S4
SL-->S8
SM-->S4
SM-->S8
SN-->S4
SN-->S8
SP-->RQ
SP-->S5
SQ-->S1
SR-->S0
SR-->S1
SS-->S7
SV-->SX
T0-->T2
T0-->T3
T9-->TC
TJ-->TL
TM-->TL
TN-->TL
TO-->TL
TP-->TL
TS-->TU
TS-->TV
TS-->TX
TS-->U6
TS-->TY
TS-->TZ
TS-->U7
TS-->U8
TS-->U9
TS-->U2
TS-->UB
TS-->UC
TS-->UD
TS-->UA
TU-->TV
TU-->TX
TU-->TZ
TX-->TY
TZ-->U1
TZ-->U4
TZ-->U5
TZ-->TY
U1-->U2
U4-->U2
U7-->U1
U7-->U4
U7-->U5
U7-->TY
U9-->U2
U9-->UA
UB-->TX
UC-->TU
UD-->TX
UE-->U9
UE-->UA
UF-->UD
UG-->UA
UJ-->UL
UJ-->UM
UJ-->UP
UJ-->UQ
UJ-->UR
UJ-->US
UJ-->UT
UJ-->UV
UJ-->UN
UJ-->UW
UJ-->UO
UJ-->UX
UJ-->UY
UJ-->UZ
UJ-->UU
UM-->UN
UM-->UO
UO-->UN
UP-->UM
UQ-->UO
UT-->UU
UW-->UM
UW-->UQ
UW-->UO
UX-->UW
UY-->UO
V0-->UP
V1-->UP
V2-->UP
V3-->UP
V4-->UP
V5-->UM
V6-->UQ
V7-->UR
V8-->US
V9-->UT
VA-->UV
VB-->UW
VC-->UN
VC-->UO
VD-->UX
VE-->UY
VF-->UZ
VG-->UU
