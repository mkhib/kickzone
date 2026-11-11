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
BG["HeroSection.seo.spec.tsx"]
BH["NewsletterSection.tsx"]
BI["ShopTheLookSection.tsx"]
BJ["TickerSection.tsx"]
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
subgraph BK["login"]
subgraph BL["src"]
BM["index.ts"]
subgraph BN["lib"]
BO["CustomersLoginScreen.tsx"]
BP["CustomersLoginScreen.spec.tsx"]
BQ["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BR["not-found"]
subgraph BS["src"]
BT["index.ts"]
subgraph BU["lib"]
BV["customer-not-found.tsx"]
BW["customer-not-found.spec.tsx"]
end
end
BX["vite.config.ts"]
end
subgraph BY["privacy-policy"]
subgraph BZ["src"]
C0["index.ts"]
subgraph C1["lib"]
C2["customer-privacy-policy.tsx"]
C3["customer-privacy-policy.spec.tsx"]
end
end
C4["vite.config.ts"]
end
subgraph C5["product-details"]
subgraph C6["src"]
C7["index.ts"]
subgraph C8["lib"]
C9["customer-product-details.tsx"]
CA["reviews-flag.ts"]
CB["customer-product-details.guarantee.spec.tsx"]
CC["customer-product-details.no-low-stock.spec.tsx"]
CD["customer-product-details.pants-size.spec.tsx"]
CE["customer-product-details.reviews-hidden.spec.tsx"]
CF["customer-product-details.spec.tsx"]
end
end
CG["vite.config.ts"]
end
subgraph CH["reset-password"]
subgraph CI["src"]
CJ["index.ts"]
subgraph CK["lib"]
CL["customer-reset-password.tsx"]
CM["customer-reset-password.password-length.spec.tsx"]
CN["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CO["shipping-returns"]
subgraph CP["src"]
CQ["index.ts"]
subgraph CR["lib"]
CS["customer-shipping-returns.tsx"]
CT["customer-shipping-returns.spec.tsx"]
end
end
CU["vite.config.ts"]
end
subgraph CV["unauthorized"]
subgraph CW["src"]
CX["index.ts"]
subgraph CY["lib"]
CZ["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph D0["utility"]
subgraph D1["test"]
subgraph D2["src"]
D3["index.ts"]
subgraph D4["lib"]
D5["customers-test-utility.tsx"]
end
end
end
end
subgraph D6["validations"]
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["shipping-validation.ts"]
DB["barrel.spec.ts"]
DC["shipping-validation.shared.spec.ts"]
end
end
end
subgraph DD["zustand"]
subgraph DE["customer-cart-store"]
subgraph DF["src"]
DG["index.ts"]
subgraph DH["lib"]
DI["customer-cart-store.ts"]
DJ["barrel.spec.ts"]
DK["customer-cart-store.spec.ts"]
end
end
end
subgraph DL["customer-checkout-store"]
subgraph DM["src"]
DN["index.ts"]
subgraph DO["lib"]
DP["customer-checkout-store.ts"]
DQ["customer-checkout-store.spec.ts"]
end
end
DR["vite.config.ts"]
end
subgraph DS["customer-wishlist-store"]
subgraph DT["src"]
DU["index.ts"]
subgraph DV["lib"]
DW["customer-wishlist-store.ts"]
DX["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DY["src"]
DZ["index.ts"]
subgraph E0["lib"]
E1["customers-products-store.tsx"]
end
end
end
end
subgraph E2["sellers"]
subgraph E3["components"]
subgraph E4["footer"]
subgraph E5["src"]
E6["index.ts"]
subgraph E7["lib"]
E8["sellers-footer.tsx"]
E9["sellers-footer.spec.tsx"]
end
end
end
subgraph EA["headerbar"]
subgraph EB["src"]
EC["index.ts"]
subgraph ED["lib"]
EE["SellersHeaderbar.tsx"]
end
end
end
subgraph EF["layout"]
subgraph EG["src"]
EH["index.ts"]
subgraph EI["lib"]
EJ["SellersLayout.tsx"]
EK["SellersTabbar.tsx"]
end
end
end
end
subgraph EL["contexts"]
subgraph EM["auth"]
subgraph EN["src"]
EO["index.ts"]
subgraph EP["lib"]
EQ["SellersAuthContext.tsx"]
ER["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph ES["graphql"]
subgraph ET["src"]
EU["index.ts"]
subgraph EV["lib"]
EW["fragments.ts"]
EX["mutations.ts"]
EY["Provider.tsx"]
EZ["SellersApolloProvider.tsx"]
F0["client.ts"]
F1["queries.ts"]
F2["seller-orders.graphql.ts"]
F3["apollo-upload-client.d.ts"]
end
end
end
subgraph F4["hooks"]
subgraph F5["auth"]
subgraph F6["src"]
F7["index.ts"]
subgraph F8["lib"]
F9["useSellerAuth.ts"]
FA["sellerAuth.graphql.ts"]
end
end
end
subgraph FB["orders"]
subgraph FC["src"]
FD["index.ts"]
subgraph FE["lib"]
FF["useSellerOrders.ts"]
FG["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FH["products"]
subgraph FI["src"]
FJ["index.ts"]
subgraph FK["lib"]
FL["useSellersProductManagement.ts"]
FM["useSellersProducts.ts"]
end
end
end
end
subgraph FN["router"]
subgraph FO["src"]
FP["index.ts"]
subgraph FQ["lib"]
FR["SellersRouter.tsx"]
end
end
end
subgraph FS["routes"]
subgraph FT["src"]
FU["index.ts"]
subgraph FV["lib"]
FW["seller-routes.ts"]
end
end
end
subgraph FX["screens"]
subgraph FY["catalog"]
subgraph FZ["src"]
G0["index.ts"]
subgraph G1["lib"]
G2["SellersCatalogScreens.tsx"]
G3["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph G4["login"]
subgraph G5["src"]
G6["index.ts"]
subgraph G7["lib"]
G8["SellersLogin.tsx"]
G9["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph GA["manage-product"]
subgraph GB["src"]
GC["index.ts"]
subgraph GD["lib"]
GE["SellersManageProductScreen.tsx"]
GF["SellersDefineProductFlow.tsx"]
GG["SellersDefineProductFlow.pants-label.spec.tsx"]
GH["SellersDefineProductFlow.spec.tsx"]
GI["SellersManageProductScreen.spec.tsx"]
GJ["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GK["products"]
subgraph GL["src"]
GM["index.ts"]
subgraph GN["lib"]
GO["SellersProducts.tsx"]
GP["SellersProducts.pants-label.spec.tsx"]
GQ["SellersProducts.spec.tsx"]
end
end
end
subgraph GR["seller-orders"]
GS["jest.config.ts"]
GT["jest.setup.ts"]
subgraph GU["src"]
GV["index.ts"]
subgraph GW["lib"]
GX["seller-orders-screen.tsx"]
GY["seller-status-transitions.ts"]
GZ["seller-orders-screen.pants-size.spec.tsx"]
H0["seller-orders-screen.spec.tsx"]
H1["seller-orders-screen.status-schema.spec.ts"]
H2["seller-status-transitions.spec.ts"]
end
H3["test-setup.ts"]
end
end
subgraph H4["setup-password"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["SellersSetupPassword.tsx"]
H9["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph HA["unauthorized"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph HF["zustand"]
subgraph HG["sellers-products-store"]
subgraph HH["src"]
HI["index.ts"]
subgraph HJ["lib"]
HK["useSellersProductsStore.ts"]
HL["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HM["shared"]
subgraph HN["components"]
subgraph HO["apollo-provider-base"]
subgraph HP["src"]
HQ["index.ts"]
subgraph HR["lib"]
HS["ApolloProviderBase.tsx"]
HT["createSilentRefreshAuthLink.ts"]
HU["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HV["error-boundary"]
subgraph HW["src"]
HX["index.ts"]
subgraph HY["lib"]
HZ["error-boundary.tsx"]
I0["error-boundary.spec.tsx"]
end
end
I1["vite.config.ts"]
end
subgraph I2["glassmorphism-container"]
subgraph I3["src"]
I4["index.ts"]
subgraph I5["lib"]
I6["glassmorphism-container.tsx"]
I7["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I8["layout"]
subgraph I9["src"]
IA["index.ts"]
subgraph IB["lib"]
IC["Layout.tsx"]
end
end
end
subgraph ID["material-data-table"]
subgraph IE["src"]
IF["index.ts"]
subgraph IG["lib"]
IH["material-data-table.tsx"]
II["table-config.ts"]
IJ["table-utils.ts"]
IK["material-data-table.spec.tsx"]
IL["table-types.ts"]
end
end
end
subgraph IM["order-status-chip"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["order-status-chip.tsx"]
IR["order-status-chip.spec.tsx"]
end
end
end
subgraph IS["password-field"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["PasswordTextField.tsx"]
end
end
end
subgraph IX["price-display"]
subgraph IY["src"]
IZ["index.ts"]
subgraph J0["lib"]
J1["price-display.tsx"]
J2["price-display.spec.tsx"]
end
end
end
subgraph J3["private-route"]
subgraph J4["src"]
J5["index.ts"]
subgraph J6["lib"]
J7["createPrivateRoute.tsx"]
J8["PrivateRoute.tsx"]
end
end
end
subgraph J9["rtl-table-utils"]
subgraph JA["src"]
JB["index.ts"]
subgraph JC["lib"]
JD["rtl-table-utils.ts"]
JE["rtl-cell-components.tsx"]
JF["rtl-column-helpers.ts"]
JG["rtl-table-props.ts"]
JH["use-table-alignment.ts"]
JI["barrel.spec.ts"]
end
end
end
subgraph JJ["snackbar"]
subgraph JK["src"]
JL["index.ts"]
subgraph JM["lib"]
JN["snackbar.tsx"]
end
end
end
subgraph JO["styled-drawer"]
subgraph JP["src"]
JQ["index.ts"]
subgraph JR["lib"]
JS["styled-drawer.tsx"]
JT["styled-drawer.spec.tsx"]
end
end
end
subgraph JU["unauthorized"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["unauthorized-path.tsx"]
end
end
end
end
subgraph JZ["graphql"]
subgraph K0["src"]
K1["index.ts"]
subgraph K2["lib"]
K3["currency.mutations.ts"]
K4["currency.queries.ts"]
K5["fragments.ts"]
K6["variant-colors.ts"]
K7["client-shared-graphql.tsx"]
end
end
end
subgraph K8["hooks"]
subgraph K9["brands"]
subgraph KA["src"]
KB["index.ts"]
subgraph KC["lib"]
KD["brands.graphql.ts"]
KE["useBrands.ts"]
end
end
KF["vite.config.ts"]
end
subgraph KG["categories"]
subgraph KH["src"]
KI["index.ts"]
subgraph KJ["lib"]
KK["useCategories.ts"]
KL["categories.graphql.ts"]
end
end
end
subgraph KM["colors"]
subgraph KN["src"]
KO["index.ts"]
subgraph KP["lib"]
KQ["useColors.ts"]
KR["color.graphql.ts"]
end
end
end
subgraph KS["currency"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["useConvertPrice.tsx"]
KX["useExchangeRate.tsx"]
KY["useCurrencies.tsx"]
KZ["useCurrencyForLocale.tsx"]
L0["useExchangeRate.spec.tsx"]
end
end
end
subgraph L1["products"]
subgraph L2["src"]
L3["index.ts"]
subgraph L4["lib"]
L5["productImage.ts"]
L6["products.graphql.ts"]
L7["useProducts.ts"]
L8["productImage.spec.ts"]
end
end
end
subgraph L9["site-languages"]
subgraph LA["src"]
LB["index.ts"]
subgraph LC["lib"]
LD["site-languages.graphql.ts"]
LE["useSiteLanguages.ts"]
LF["site-languages-hook.spec.tsx"]
end
end
LG["vite.config.ts"]
end
subgraph LH["snackbar"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["SnackbarContext.tsx"]
LM["useSnackbar.ts"]
end
end
end
subgraph LN["translations-management-hook"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["useTranslationsManagement.ts"]
end
end
end
end
subgraph LS["lottie"]
subgraph LT["empty-cart"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["lottie-empty-cart.tsx"]
LY["lottie-empty-cart.spec.tsx"]
end
end
LZ["vite.config.ts"]
end
subgraph M0["loading"]
subgraph M1["src"]
M2["index.ts"]
subgraph M3["lib"]
M4["lottie-loading.tsx"]
M5["lottie-loading.spec.tsx"]
end
end
end
subgraph M6["success-check"]
subgraph M7["src"]
M8["index.ts"]
subgraph M9["lib"]
MA["lottie-success-check.tsx"]
MB["lottie-success-check.spec.tsx"]
end
end
end
subgraph MC["unauthorized"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MH["translations"]
subgraph MI["src"]
MJ["index.ts"]
subgraph MK["lib"]
ML["mapApolloErrorToTranslationKey.ts"]
MM["WrapTranslation.tsx"]
end
end
end
subgraph MN["ui"]
subgraph MO["colors"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["colors.ts"]
end
end
end
subgraph MT["language-components"]
subgraph MU["src"]
MV["index.ts"]
subgraph MW["lib"]
MX["language-components.tsx"]
MY["ltr-text-field.tsx"]
end
end
end
subgraph MZ["sizes"]
subgraph N0["src"]
N1["index.ts"]
subgraph N2["lib"]
N3["sizes.ts"]
N4["barrel.spec.ts"]
end
end
end
end
subgraph N5["zustand"]
subgraph N6["shared-auth-store"]
subgraph N7["src"]
N8["index.ts"]
subgraph N9["lib"]
NA["shared-auth-store.ts"]
end
end
end
subgraph NB["shared-notification-store"]
subgraph NC["src"]
ND["index.ts"]
subgraph NE["lib"]
NF["shared-notification-store.tsx"]
end
end
end
subgraph NG["shared-ui-store"]
subgraph NH["src"]
NI["index.ts"]
subgraph NJ["lib"]
NK["shared-ui-store.ts"]
NL["barrel.spec.ts"]
end
end
end
end
end
end
subgraph NM["server"]
subgraph NN["controllers"]
subgraph NO["src"]
NP["index.ts"]
subgraph NQ["lib"]
NR["auth.controller.ts"]
NS["order.controller.ts"]
end
end
end
subgraph NT["decorators"]
NU["jest.config.ts"]
subgraph NV["src"]
NW["index.ts"]
subgraph NX["lib"]
NY["authenticated-user.type.ts"]
NZ["current-user.decorator.ts"]
O0["decorators.ts"]
O1["decorators.spec.ts"]
end
end
end
subgraph O2["entities"]
subgraph O3["src"]
O4["index.ts"]
subgraph O5["lib"]
O6["brand.entity.ts"]
O7["product.entity.ts"]
O8["category.entity.ts"]
O9["product-description.entity.ts"]
OA["site-language.entity.ts"]
OB["product-info.entity.ts"]
OC["color.entity.ts"]
OD["product-info-color.entity.ts"]
OE["seller-info.entity.ts"]
OF["seller-product.entity.ts"]
OG["user.entity.ts"]
OH["cart.entity.ts"]
OI["currency-preference.entity.ts"]
OJ["currency.entity.ts"]
OK["customer.entity.ts"]
OL["exchange-rate.entity.ts"]
OM["order.entity.ts"]
ON["platform-settings.entity.ts"]
OO["refresh-token.entity.ts"]
OP["seller-order.entity.ts"]
OQ["translation.entity.ts"]
end
end
end
subgraph OR["guards"]
OS["jest.config.ts"]
subgraph OT["src"]
OU["index.ts"]
subgraph OV["lib"]
OW["catalog.guard.ts"]
OX["graphql-auth.guard.ts"]
OY["http-auth.guard.ts"]
OZ["roles.guard.ts"]
P0["catalog.guard.spec.ts"]
P1["roles.guard.spec.ts"]
end
end
end
subgraph P2["inputs"]
subgraph P3["src"]
P4["index.ts"]
subgraph P5["lib"]
P6["brand.input.ts"]
P7["cart.inputs.ts"]
P8["category.input.ts"]
P9["color.input.ts"]
PA["customer-auth.inputs.ts"]
PB["order-pagination.inputs.ts"]
PC["order.inputs.ts"]
PD["product-info-filter.input.ts"]
PE["product.input.ts"]
PF["seller-order-pagination.inputs.ts"]
PG["seller.input.ts"]
PH["site-language.input.ts"]
PI["user.input.ts"]
end
end
end
subgraph PJ["modules"]
subgraph PK["src"]
PL["index.ts"]
subgraph PM["lib"]
PN["auth.module.ts"]
PO["email.module.ts"]
PP["token.module.ts"]
PQ["user.module.ts"]
PR["customer-profile.module.ts"]
PS["brand.module.ts"]
PT["catalog-guard.module.ts"]
PU["translation.module.ts"]
PV["cart.module.ts"]
PW["platform-settings.module.ts"]
PX["category.module.ts"]
PY["product.module.ts"]
PZ["color.module.ts"]
Q0["currency.module.ts"]
Q1["graphql-context.module.ts"]
Q2["order.module.ts"]
Q3["seller-info.module.ts"]
Q4["payment.module.ts"]
Q5["product-info.module.ts"]
Q6["seller-products.module.ts"]
Q7["site-language.module.ts"]
end
end
end
subgraph Q8["resolvers"]
Q9["jest.config.ts"]
subgraph QA["src"]
QB["index.ts"]
subgraph QC["lib"]
QD["auth.resolver.ts"]
QE["zod-validation.pipe.ts"]
QF["brand.resolver.ts"]
QG["cart.resolver.ts"]
QH["category.resolver.ts"]
QI["color.resolver.ts"]
QJ["currency.resolver.ts"]
QK["customer-profile.resolver.ts"]
QL["order.resolver.ts"]
QM["payment.resolver.ts"]
QN["product-info.resolver.ts"]
QO["product.resolver.ts"]
QP["seller-info.resolver.ts"]
QQ["shipping.resolver.ts"]
QR["site-language.resolver.ts"]
QS["translation.input.ts"]
QT["translation.resolver.ts"]
QU["user.resolver.ts"]
QV["auth-validation.spec.ts"]
QW["auth.resolver.spec.ts"]
QX["cart-validation.spec.ts"]
QY["currency-translation-validation.spec.ts"]
QZ["customer-profile-validation.spec.ts"]
R0["order-ownership.security.spec.ts"]
R1["order-validation.spec.ts"]
R2["order.resolver.spec.ts"]
R3["order.resolver.status-transitions.spec.ts"]
R4["order.resolver.tracking.spec.ts"]
R5["payment-batch.security.spec.ts"]
R6["payment-verify.security.spec.ts"]
R7["payment.amount-tampering.security.spec.ts"]
R8["payment.resolver.integration.spec.ts"]
R9["payment.resolver.spec.ts"]
RA["product-info.resolver.spec.ts"]
RB["product-validation.spec.ts"]
RC["product.resolver.spec.ts"]
RD["query-args-validation.spec.ts"]
RE["seller-info-validation.spec.ts"]
RF["seller-info.resolver.spec.ts"]
RG["taxonomy-validation.spec.ts"]
RH["translation.resolver.guards.spec.ts"]
subgraph RI["types"]
RJ["graphql-upload.d.ts"]
end
RK["user.resolver.spec.ts"]
RL["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RM["services"]
RN["jest.config.ts"]
subgraph RO["src"]
RP["index.ts"]
subgraph RQ["lib"]
RR["auth.service.ts"]
RS["brand.service.ts"]
RT["cart.service.ts"]
RU["product-info-colors.util.ts"]
RV["category.service.ts"]
RW["color.service.ts"]
RX["currency.service.ts"]
RY["customer-profile.service.ts"]
RZ["email.service.ts"]
S0["image-upload.service.ts"]
S1["order.service.ts"]
S2["shipping-calculation.service.ts"]
S3["payment-logger.service.ts"]
S4["payment.service.ts"]
S5["product.service.ts"]
S6["seller-info.service.ts"]
S7["site-language.service.ts"]
S8["token.service.ts"]
S9["translation.service.ts"]
SA["user.service.ts"]
SB["auth.service.password-policy.spec.ts"]
SC["auth.service.spec.ts"]
SD["cart.service.add-quantity.spec.ts"]
SE["cart.service.null-relations.spec.ts"]
SF["cart.service.spec.ts"]
SG["order.payment-verify.security.spec.ts"]
SH["order.price-tampering.security.spec.ts"]
SI["order.service.spec.ts"]
SJ["order.service.tracking.spec.ts"]
SK["product-info-colors.util.spec.ts"]
SL["product.service.multi-filters.spec.ts"]
SM["product.service.only-discounted.spec.ts"]
SN["product.service.pants.spec.ts"]
SO["product.service.spec.ts"]
SP["relay-connection.spec.ts"]
SQ["seller-info.service.price-validation.spec.ts"]
SR["shipping-calculation.service.spec.ts"]
SS["shipping-security.security.spec.ts"]
ST["token.service.spec.ts"]
end
end
end
subgraph SU["strategies"]
subgraph SV["src"]
SW["index.ts"]
subgraph SX["lib"]
SY["local.strategy.ts"]
end
end
end
subgraph SZ["utils"]
subgraph T0["src"]
T1["index.ts"]
subgraph T2["lib"]
T3["email-templates.ts"]
T4["relay-connection.ts"]
T5["pagination.ts"]
end
end
end
end
subgraph T6["shared"]
subgraph T7["codegen"]
T8["jest.config.ts"]
subgraph T9["src"]
TA["index.ts"]
subgraph TB["lib"]
subgraph TC["generated"]
TD["graphql.ts"]
end
end
end
end
subgraph TE["graphql-schema"]
TF["jest.config.ts"]
subgraph TG["src"]
TH["index.ts"]
end
end
subgraph TI["product-sizes"]
subgraph TJ["src"]
TK["index.ts"]
subgraph TL["lib"]
TM["product-sizes.ts"]
TN["product-sizes.pants-formats.spec.ts"]
TO["product-sizes.pants-label.spec.ts"]
TP["product-sizes.pants-strict.spec.ts"]
TQ["product-sizes.spec.ts"]
end
end
end
subgraph TR["shared-i18n"]
subgraph TS["src"]
TT["index.ts"]
subgraph TU["lib"]
TV["language-context.tsx"]
TW["language-detector.ts"]
subgraph TX["locales"]
TY["i18n-react.tsx"]
TZ["i18n-util.ts"]
U0["i18n-util.async.ts"]
subgraph U1["en"]
U2["index.ts"]
end
subgraph U4["fa"]
U5["index.ts"]
end
U6["formatters.ts"]
U7["i18n-types.ts"]
U8["i18n-util.sync.ts"]
U9["navigator-detector.ts"]
end
U3["site-name.ts"]
UA["seo-json-ld.ts"]
UB["use-seo-meta.ts"]
UC["table-localization.ts"]
UD["theme-provider.tsx"]
UE["use-page-title.ts"]
UF["seo-json-ld.spec.tsx"]
UG["use-page-title.spec.tsx"]
UH["use-seo-meta.spec.tsx"]
end
end
end
subgraph UI["validation"]
subgraph UJ["src"]
UK["index.ts"]
subgraph UL["lib"]
UM["apollo-error.ts"]
UN["auth.ts"]
UO["limits.ts"]
UP["primitives.ts"]
UQ["auth-forms.ts"]
UR["cart.ts"]
US["catalog.ts"]
UT["contact.ts"]
UU["currency.ts"]
UV["taxonomy.ts"]
UW["errors.ts"]
UX["order.ts"]
UY["profile.ts"]
UZ["query.ts"]
V0["seller.ts"]
V1["auth-forms.admin.spec.ts"]
V2["auth-forms.login.spec.ts"]
V3["auth-forms.recovery.spec.ts"]
V4["auth-forms.seller.spec.ts"]
V5["auth-forms.spec.ts"]
V6["auth.spec.ts"]
V7["cart.spec.ts"]
V8["catalog.spec.ts"]
V9["contact.spec.ts"]
VA["currency.spec.ts"]
VB["errors.spec.ts"]
VC["order.spec.ts"]
VD["primitives.spec.ts"]
VE["profile.spec.ts"]
VF["query.spec.ts"]
VG["seller.spec.ts"]
VH["taxonomy.spec.ts"]
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
BG-->B2
BG-->B4
BI-->B3
BM-->BO
BP-->BO
BQ-->BO
BT-->BV
BW-->BV
C0-->C2
C3-->C2
C7-->C9
C9-->CA
CB-->C9
CC-->C9
CD-->C9
CE-->C9
CF-->C9
CJ-->CL
CM-->CL
CN-->CL
CQ-->CS
CT-->CS
CX-->CZ
D3-->D5
D8-->DA
DB-->D8
DC-->DA
DG-->DI
DJ-->DG
DK-->DI
DN-->DP
DQ-->DP
DU-->DW
DX-->DW
DZ-->E1
E6-->E8
E9-->E8
EC-->EE
EH-->EJ
EH-->EK
EJ-->EK
EO-->EQ
ER-->EQ
EU-->EW
EU-->EX
EU-->EY
EU-->F1
EY-->EZ
EZ-->F0
F1-->EW
F1-->F2
F7-->F9
F9-->FA
FD-->FF
FJ-->FL
FJ-->FM
FP-->FR
FU-->FW
G0-->G2
G3-->G2
G6-->G8
G9-->G8
GC-->GE
GE-->GF
GG-->GF
GH-->GF
GI-->GE
GJ-->GE
GM-->GO
GP-->GO
GQ-->GO
GV-->GX
GX-->GY
GZ-->GX
H0-->GX
H2-->GY
H6-->H8
H9-->H8
HC-->HE
HI-->HK
HQ-->HS
HQ-->HT
HU-->HT
HX-->HZ
I0-->HZ
I4-->I6
I7-->I6
IA-->IC
IF-->IH
IF-->II
IF-->IJ
IH-->II
IK-->IH
IO-->IQ
IR-->IQ
IU-->IW
IZ-->J1
J2-->J1
J5-->J7
J7-->J8
JB-->JD
JD-->JE
JD-->JF
JD-->JG
JD-->JH
JF-->JE
JF-->JG
JI-->JB
JL-->JN
JQ-->JS
JT-->JS
JW-->JY
K1-->K3
K1-->K4
K1-->K5
K1-->K6
KB-->KD
KB-->KE
KE-->KD
KI-->KK
KK-->KL
KO-->KQ
KQ-->KR
KU-->KW
KU-->KY
KU-->KZ
KU-->KX
KW-->KX
L0-->KX
L3-->L5
L3-->L6
L3-->L7
L7-->L6
L8-->L5
LB-->LD
LB-->LE
LE-->LD
LF-->LE
LJ-->LL
LJ-->LM
LM-->LL
LP-->LR
LV-->LX
LY-->LX
M2-->M4
M5-->M4
M8-->MA
MB-->MA
ME-->MG
MJ-->ML
MQ-->MS
MV-->MX
MV-->MY
N1-->N3
N4-->N1
N8-->NA
ND-->NF
NI-->NK
NL-->NI
NP-->NR
NP-->NS
NW-->NY
NW-->NZ
NW-->O0
O1-->O0
O4-->O6
O4-->OH
O4-->O8
O4-->OC
O4-->OI
O4-->OJ
O4-->OK
O4-->OL
O4-->OM
O4-->ON
O4-->O9
O4-->OD
O4-->OB
O4-->O7
O4-->OO
O4-->OE
O4-->OP
O4-->OF
O4-->OA
O4-->OQ
O4-->OG
O6-->O7
O7-->O6
O7-->O8
O7-->O9
O7-->OB
O7-->OE
O7-->OF
O8-->O7
O9-->O7
O9-->OA
OA-->O9
OB-->OC
OB-->OD
OB-->O7
OD-->OC
OD-->OB
OE-->OF
OE-->OG
OF-->OB
OF-->O7
OF-->OE
OH-->O7
OH-->OG
OI-->OJ
OK-->OG
OL-->OJ
OL-->OG
OM-->O7
OM-->OE
OO-->OG
OP-->OM
OP-->OE
OU-->OW
OU-->OX
OU-->OY
OU-->OZ
P0-->OW
P1-->OZ
P4-->P6
P4-->P7
P4-->P8
P4-->P9
P4-->PA
P4-->PB
P4-->PC
P4-->PD
P4-->PE
P4-->PF
P4-->PG
P4-->PH
P4-->PI
PE-->PD
PL-->PN
PL-->PS
PL-->PV
PL-->PT
PL-->PX
PL-->PZ
PL-->Q0
PL-->PR
PL-->PO
PL-->Q1
PL-->Q2
PL-->Q4
PL-->PW
PL-->Q5
PL-->PY
PL-->Q3
PL-->Q6
PL-->Q7
PL-->PP
PL-->PU
PL-->PQ
PN-->PO
PN-->PP
PN-->PQ
PQ-->PN
PQ-->PR
PS-->PT
PS-->PU
PV-->PW
PX-->PT
PX-->PY
PX-->PU
PY-->PT
PY-->PP
PY-->PU
PZ-->PT
PZ-->PU
Q1-->PO
Q1-->PP
Q1-->PQ
Q2-->PW
Q2-->Q3
Q3-->PY
Q3-->PP
Q3-->PQ
Q4-->Q0
Q4-->Q2
Q5-->PY
Q5-->PU
Q6-->Q3
Q6-->PQ
QB-->QD
QB-->QF
QB-->QG
QB-->QH
QB-->QI
QB-->QJ
QB-->QK
QB-->QL
QB-->QM
QB-->QN
QB-->QO
QB-->QP
QB-->QQ
QB-->QR
QB-->QS
QB-->QT
QB-->QU
QB-->QE
QD-->QE
QF-->QE
QG-->QE
QH-->QE
QI-->QE
QJ-->QE
QK-->QE
QL-->QE
QO-->QE
QP-->QE
QR-->QE
QT-->QE
QU-->QE
QV-->QD
QV-->QU
QV-->QE
QW-->QD
QX-->QG
QX-->QE
QY-->QJ
QY-->QT
QY-->QE
QZ-->QK
QZ-->QE
R0-->QL
R0-->QM
R1-->QL
R1-->QE
R2-->QL
R3-->QL
R4-->QL
R5-->QL
R5-->QM
R6-->QM
R7-->QM
R8-->QM
R9-->QM
RA-->QN
RB-->QO
RB-->QE
RC-->QO
RD-->QL
RD-->QO
RD-->QP
RD-->QE
RE-->QP
RE-->QE
RF-->QP
RG-->QF
RG-->QH
RG-->QI
RG-->QR
RG-->QE
RH-->QT
RK-->QU
RL-->QE
RP-->RR
RP-->RS
RP-->RT
RP-->RV
RP-->RW
RP-->RX
RP-->RY
RP-->RZ
RP-->S0
RP-->S1
RP-->S3
RP-->S4
RP-->RU
RP-->S5
RP-->S6
RP-->S2
RP-->S7
RP-->S8
RP-->S9
RP-->SA
RT-->RU
S1-->S2
S5-->RU
S6-->RU
SB-->RR
SB-->RZ
SB-->S8
SB-->SA
SC-->RR
SC-->RZ
SC-->S8
SC-->SA
SD-->RT
SE-->RT
SF-->RT
SG-->S1
SH-->S1
SI-->S1
SI-->S2
SJ-->S1
SK-->RU
SL-->S5
SL-->S9
SM-->S5
SM-->S9
SN-->S5
SN-->S9
SO-->S5
SO-->S9
SQ-->RR
SQ-->S6
SR-->S2
SS-->S1
SS-->S2
ST-->S8
SW-->SY
T1-->T3
T1-->T4
TA-->TD
TK-->TM
TN-->TM
TO-->TM
TP-->TM
TQ-->TM
TT-->TV
TT-->TW
TT-->TY
TT-->U7
TT-->TZ
TT-->U0
TT-->U8
TT-->U9
TT-->UA
TT-->U3
TT-->UC
TT-->UD
TT-->UE
TT-->UB
TV-->TW
TV-->TY
TV-->U0
TY-->TZ
U0-->U2
U0-->U5
U0-->U6
U0-->TZ
U2-->U3
U5-->U3
U8-->U2
U8-->U5
U8-->U6
U8-->TZ
UA-->U3
UA-->UB
UC-->TY
UD-->TV
UE-->TY
UF-->UA
UF-->UB
UG-->UE
UH-->UB
UK-->UM
UK-->UN
UK-->UQ
UK-->UR
UK-->US
UK-->UT
UK-->UU
UK-->UW
UK-->UO
UK-->UX
UK-->UP
UK-->UY
UK-->UZ
UK-->V0
UK-->UV
UN-->UO
UN-->UP
UP-->UO
UQ-->UN
UR-->UP
UU-->UV
UX-->UN
UX-->UR
UX-->UP
UY-->UX
UZ-->UP
V1-->UQ
V2-->UQ
V3-->UQ
V4-->UQ
V5-->UQ
V6-->UN
V7-->UR
V8-->US
V9-->UT
VA-->UU
VB-->UW
VC-->UX
VD-->UO
VD-->UP
VE-->UY
VF-->UZ
VG-->V0
VH-->UV
