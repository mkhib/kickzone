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
85["customer-contact.validation.spec.tsx"]
end
end
86["vite.config.ts"]
end
subgraph 87["customer-checkout"]
subgraph 88["src"]
89["index.ts"]
subgraph 8A["lib"]
8B["customer-checkout.tsx"]
end
end
end
subgraph 8C["customer-favorites"]
subgraph 8D["src"]
8E["index.ts"]
subgraph 8F["lib"]
8G["customer-favorites.tsx"]
8H["customer-favorites.shared-card.spec.tsx"]
8I["customer-favorites.spec.tsx"]
end
end
8J["vite.config.ts"]
end
subgraph 8K["customer-login"]
subgraph 8L["src"]
8M["index.ts"]
subgraph 8N["lib"]
8O["customer-login.tsx"]
end
end
end
subgraph 8P["customer-order-confirmation"]
subgraph 8Q["src"]
8R["index.ts"]
subgraph 8S["lib"]
8T["customer-order-confirmation.tsx"]
8U["customer-order-confirmation.pants-size.spec.tsx"]
8V["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8W["customer-orders"]
subgraph 8X["src"]
8Y["index.ts"]
subgraph 8Z["lib"]
90["customer-orders.tsx"]
end
end
end
subgraph 91["customer-payment"]
subgraph 92["src"]
93["index.ts"]
subgraph 94["lib"]
95["customer-payment-callback.tsx"]
96["use-zarinpal-payment.tsx"]
97["zarinpal-payment-service.ts"]
98["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 99["customer-products"]
subgraph 9A["src"]
9B["index.ts"]
subgraph 9C["lib"]
9D["customer-products.tsx"]
end
end
end
subgraph 9E["customer-profile"]
subgraph 9F["src"]
9G["index.ts"]
subgraph 9H["lib"]
9I["customer-profile.tsx"]
9J["customer-profile.spec.tsx"]
9K["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9L["customer-shopping-cart"]
subgraph 9M["src"]
9N["index.ts"]
subgraph 9O["lib"]
9P["customer-shopping-cart.tsx"]
9Q["build-order-confirmation-data.ts"]
9R["build-order-confirmation-data.spec.ts"]
9S["customer-shopping-cart.pants-size.spec.tsx"]
9T["customer-shopping-cart.shipping-form.spec.tsx"]
9U["customer-shopping-cart.spec.tsx"]
end
end
9V["vite.config.ts"]
end
subgraph 9W["customer-signup"]
subgraph 9X["src"]
9Y["index.ts"]
subgraph 9Z["lib"]
A0["customer-signup.tsx"]
A1["customer-signup.password-length.spec.tsx"]
A2["customer-signup.spec.tsx"]
A3["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A4["forgot-password"]
subgraph A5["src"]
A6["index.ts"]
subgraph A7["lib"]
A8["customer-forgot-password.tsx"]
A9["customer-forgot-password.spec.tsx"]
AA["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph AB["guide-authenticity"]
subgraph AC["src"]
AD["index.ts"]
subgraph AE["lib"]
AF["customer-guide-authenticity.tsx"]
AG["customer-guide-authenticity.spec.tsx"]
end
end
AH["vite.config.ts"]
end
subgraph AI["guide-payment"]
subgraph AJ["src"]
AK["index.ts"]
subgraph AL["lib"]
AM["customer-guide-payment.tsx"]
AN["customer-guide-payment.spec.tsx"]
end
end
AO["vite.config.ts"]
end
subgraph AP["home"]
subgraph AQ["src"]
AR["index.ts"]
subgraph AS["lib"]
AT["CustomersHomeScreen.tsx"]
subgraph AU["components"]
AV["CategoryBentoSection.tsx"]
AX["HeroSection.tsx"]
AY["HomeLoadingScreen.tsx"]
AZ["PicksRailSection.tsx"]
B0["TrustStripSection.tsx"]
B5["NewArrivalsSection.tsx"]
B8["BrandBlocksSection.tsx"]
B9["NewsletterSection.tsx"]
BA["ShopTheLookSection.tsx"]
BB["TickerSection.tsx"]
end
AW["home-selectors.ts"]
B1["useScrollProgress.ts"]
B2["CustomersShopScreen.tsx"]
B3["CustomersHomeScreen.cart-size.spec.tsx"]
B4["CustomersHomeScreen.spec.tsx"]
B6["CustomersShopScreen.cart-size.spec.tsx"]
B7["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BC["login"]
subgraph BD["src"]
BE["index.ts"]
subgraph BF["lib"]
BG["CustomersLoginScreen.tsx"]
BH["CustomersLoginScreen.spec.tsx"]
BI["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BJ["not-found"]
subgraph BK["src"]
BL["index.ts"]
subgraph BM["lib"]
BN["customer-not-found.tsx"]
BO["customer-not-found.spec.tsx"]
end
end
BP["vite.config.ts"]
end
subgraph BQ["privacy-policy"]
subgraph BR["src"]
BS["index.ts"]
subgraph BT["lib"]
BU["customer-privacy-policy.tsx"]
BV["customer-privacy-policy.spec.tsx"]
end
end
BW["vite.config.ts"]
end
subgraph BX["product-details"]
subgraph BY["src"]
BZ["index.ts"]
subgraph C0["lib"]
C1["customer-product-details.tsx"]
C2["reviews-flag.ts"]
C3["customer-product-details.guarantee.spec.tsx"]
C4["customer-product-details.no-low-stock.spec.tsx"]
C5["customer-product-details.pants-size.spec.tsx"]
C6["customer-product-details.reviews-hidden.spec.tsx"]
C7["customer-product-details.spec.tsx"]
end
end
C8["vite.config.ts"]
end
subgraph C9["reset-password"]
subgraph CA["src"]
CB["index.ts"]
subgraph CC["lib"]
CD["customer-reset-password.tsx"]
CE["customer-reset-password.password-length.spec.tsx"]
CF["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CG["shipping-returns"]
subgraph CH["src"]
CI["index.ts"]
subgraph CJ["lib"]
CK["customer-shipping-returns.tsx"]
CL["customer-shipping-returns.spec.tsx"]
end
end
CM["vite.config.ts"]
end
subgraph CN["unauthorized"]
subgraph CO["src"]
CP["index.ts"]
subgraph CQ["lib"]
CR["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CS["utility"]
subgraph CT["test"]
subgraph CU["src"]
CV["index.ts"]
subgraph CW["lib"]
CX["customers-test-utility.tsx"]
end
end
end
end
subgraph CY["validations"]
subgraph CZ["src"]
D0["index.ts"]
subgraph D1["lib"]
D2["shipping-validation.ts"]
D3["barrel.spec.ts"]
D4["shipping-validation.shared.spec.ts"]
end
end
end
subgraph D5["zustand"]
subgraph D6["customer-cart-store"]
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["customer-cart-store.ts"]
DB["barrel.spec.ts"]
DC["customer-cart-store.spec.ts"]
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
GB["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GC["products"]
subgraph GD["src"]
GE["index.ts"]
subgraph GF["lib"]
GG["SellersProducts.tsx"]
GH["SellersProducts.pants-label.spec.tsx"]
GI["SellersProducts.spec.tsx"]
end
end
end
subgraph GJ["seller-orders"]
GK["jest.config.ts"]
GL["jest.setup.ts"]
subgraph GM["src"]
GN["index.ts"]
subgraph GO["lib"]
GP["seller-orders-screen.tsx"]
GQ["seller-status-transitions.ts"]
GR["seller-orders-screen.pants-size.spec.tsx"]
GS["seller-orders-screen.spec.tsx"]
GT["seller-orders-screen.status-schema.spec.ts"]
GU["seller-status-transitions.spec.ts"]
end
GV["test-setup.ts"]
end
end
subgraph GW["setup-password"]
subgraph GX["src"]
GY["index.ts"]
subgraph GZ["lib"]
H0["SellersSetupPassword.tsx"]
H1["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H2["unauthorized"]
subgraph H3["src"]
H4["index.ts"]
subgraph H5["lib"]
H6["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H7["zustand"]
subgraph H8["sellers-products-store"]
subgraph H9["src"]
HA["index.ts"]
subgraph HB["lib"]
HC["useSellersProductsStore.ts"]
HD["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HE["shared"]
subgraph HF["components"]
subgraph HG["apollo-provider-base"]
subgraph HH["src"]
HI["index.ts"]
subgraph HJ["lib"]
HK["ApolloProviderBase.tsx"]
HL["createSilentRefreshAuthLink.ts"]
HM["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HN["error-boundary"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["error-boundary.tsx"]
HS["error-boundary.spec.tsx"]
end
end
HT["vite.config.ts"]
end
subgraph HU["glassmorphism-container"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["glassmorphism-container.tsx"]
HZ["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I0["layout"]
subgraph I1["src"]
I2["index.ts"]
subgraph I3["lib"]
I4["Layout.tsx"]
end
end
end
subgraph I5["material-data-table"]
subgraph I6["src"]
I7["index.ts"]
subgraph I8["lib"]
I9["material-data-table.tsx"]
IA["table-config.ts"]
IB["table-utils.ts"]
IC["material-data-table.spec.tsx"]
ID["table-types.ts"]
end
end
end
subgraph IE["order-status-chip"]
subgraph IF["src"]
IG["index.ts"]
subgraph IH["lib"]
II["order-status-chip.tsx"]
IJ["order-status-chip.spec.tsx"]
end
end
end
subgraph IK["password-field"]
subgraph IL["src"]
IM["index.ts"]
subgraph IN["lib"]
IO["PasswordTextField.tsx"]
end
end
end
subgraph IP["price-display"]
subgraph IQ["src"]
IR["index.ts"]
subgraph IS["lib"]
IT["price-display.tsx"]
IU["price-display.spec.tsx"]
end
end
end
subgraph IV["private-route"]
subgraph IW["src"]
IX["index.ts"]
subgraph IY["lib"]
IZ["createPrivateRoute.tsx"]
J0["PrivateRoute.tsx"]
end
end
end
subgraph J1["rtl-table-utils"]
subgraph J2["src"]
J3["index.ts"]
subgraph J4["lib"]
J5["rtl-table-utils.ts"]
J6["rtl-cell-components.tsx"]
J7["rtl-column-helpers.ts"]
J8["rtl-table-props.ts"]
J9["use-table-alignment.ts"]
JA["barrel.spec.ts"]
end
end
end
subgraph JB["snackbar"]
subgraph JC["src"]
JD["index.ts"]
subgraph JE["lib"]
JF["snackbar.tsx"]
end
end
end
subgraph JG["styled-drawer"]
subgraph JH["src"]
JI["index.ts"]
subgraph JJ["lib"]
JK["styled-drawer.tsx"]
JL["styled-drawer.spec.tsx"]
end
end
end
subgraph JM["unauthorized"]
subgraph JN["src"]
JO["index.ts"]
subgraph JP["lib"]
JQ["unauthorized-path.tsx"]
end
end
end
end
subgraph JR["graphql"]
subgraph JS["src"]
JT["index.ts"]
subgraph JU["lib"]
JV["currency.mutations.ts"]
JW["currency.queries.ts"]
JX["fragments.ts"]
JY["variant-colors.ts"]
JZ["client-shared-graphql.tsx"]
end
end
end
subgraph K0["hooks"]
subgraph K1["brands"]
subgraph K2["src"]
K3["index.ts"]
subgraph K4["lib"]
K5["brands.graphql.ts"]
K6["useBrands.ts"]
end
end
K7["vite.config.ts"]
end
subgraph K8["categories"]
subgraph K9["src"]
KA["index.ts"]
subgraph KB["lib"]
KC["useCategories.ts"]
KD["categories.graphql.ts"]
end
end
end
subgraph KE["colors"]
subgraph KF["src"]
KG["index.ts"]
subgraph KH["lib"]
KI["useColors.ts"]
KJ["color.graphql.ts"]
end
end
end
subgraph KK["currency"]
subgraph KL["src"]
KM["index.ts"]
subgraph KN["lib"]
KO["useConvertPrice.tsx"]
KP["useExchangeRate.tsx"]
KQ["useCurrencies.tsx"]
KR["useCurrencyForLocale.tsx"]
KS["useExchangeRate.spec.tsx"]
end
end
end
subgraph KT["products"]
subgraph KU["src"]
KV["index.ts"]
subgraph KW["lib"]
KX["productImage.ts"]
KY["products.graphql.ts"]
KZ["useProducts.ts"]
L0["productImage.spec.ts"]
end
end
end
subgraph L1["site-languages"]
subgraph L2["src"]
L3["index.ts"]
subgraph L4["lib"]
L5["site-languages.graphql.ts"]
L6["useSiteLanguages.ts"]
L7["site-languages-hook.spec.tsx"]
end
end
L8["vite.config.ts"]
end
subgraph L9["snackbar"]
subgraph LA["src"]
LB["index.ts"]
subgraph LC["lib"]
LD["SnackbarContext.tsx"]
LE["useSnackbar.ts"]
end
end
end
subgraph LF["translations-management-hook"]
subgraph LG["src"]
LH["index.ts"]
subgraph LI["lib"]
LJ["useTranslationsManagement.ts"]
end
end
end
end
subgraph LK["lottie"]
subgraph LL["empty-cart"]
subgraph LM["src"]
LN["index.ts"]
subgraph LO["lib"]
LP["lottie-empty-cart.tsx"]
LQ["lottie-empty-cart.spec.tsx"]
end
end
LR["vite.config.ts"]
end
subgraph LS["loading"]
subgraph LT["src"]
LU["index.ts"]
subgraph LV["lib"]
LW["lottie-loading.tsx"]
LX["lottie-loading.spec.tsx"]
end
end
end
subgraph LY["success-check"]
subgraph LZ["src"]
M0["index.ts"]
subgraph M1["lib"]
M2["lottie-success-check.tsx"]
M3["lottie-success-check.spec.tsx"]
end
end
end
subgraph M4["unauthorized"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["lottie-unauthorized.tsx"]
end
end
end
end
subgraph M9["translations"]
subgraph MA["src"]
MB["index.ts"]
subgraph MC["lib"]
MD["mapApolloErrorToTranslationKey.ts"]
ME["WrapTranslation.tsx"]
end
end
end
subgraph MF["ui"]
subgraph MG["colors"]
subgraph MH["src"]
MI["index.ts"]
subgraph MJ["lib"]
MK["colors.ts"]
end
end
end
subgraph ML["language-components"]
subgraph MM["src"]
MN["index.ts"]
subgraph MO["lib"]
MP["language-components.tsx"]
MQ["ltr-text-field.tsx"]
end
end
end
subgraph MR["sizes"]
subgraph MS["src"]
MT["index.ts"]
subgraph MU["lib"]
MV["sizes.ts"]
MW["barrel.spec.ts"]
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
ND["barrel.spec.ts"]
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
NQ["authenticated-user.type.ts"]
NR["current-user.decorator.ts"]
NS["decorators.ts"]
NT["decorators.spec.ts"]
end
end
end
subgraph NU["entities"]
subgraph NV["src"]
NW["index.ts"]
subgraph NX["lib"]
NY["brand.entity.ts"]
NZ["product.entity.ts"]
O0["category.entity.ts"]
O1["product-description.entity.ts"]
O2["site-language.entity.ts"]
O3["product-info.entity.ts"]
O4["color.entity.ts"]
O5["product-info-color.entity.ts"]
O6["seller-info.entity.ts"]
O7["seller-product.entity.ts"]
O8["user.entity.ts"]
O9["cart.entity.ts"]
OA["currency-preference.entity.ts"]
OB["currency.entity.ts"]
OC["customer.entity.ts"]
OD["exchange-rate.entity.ts"]
OE["order.entity.ts"]
OF["platform-settings.entity.ts"]
OG["refresh-token.entity.ts"]
OH["seller-order.entity.ts"]
OI["translation.entity.ts"]
end
end
end
subgraph OJ["guards"]
OK["jest.config.ts"]
subgraph OL["src"]
OM["index.ts"]
subgraph ON["lib"]
OO["catalog.guard.ts"]
OP["graphql-auth.guard.ts"]
OQ["http-auth.guard.ts"]
OR["roles.guard.ts"]
OS["catalog.guard.spec.ts"]
OT["roles.guard.spec.ts"]
end
end
end
subgraph OU["inputs"]
subgraph OV["src"]
OW["index.ts"]
subgraph OX["lib"]
OY["brand.input.ts"]
OZ["cart.inputs.ts"]
P0["category.input.ts"]
P1["color.input.ts"]
P2["customer-auth.inputs.ts"]
P3["order-pagination.inputs.ts"]
P4["order.inputs.ts"]
P5["product-info-filter.input.ts"]
P6["product.input.ts"]
P7["seller-order-pagination.inputs.ts"]
P8["seller.input.ts"]
P9["site-language.input.ts"]
PA["user.input.ts"]
end
end
end
subgraph PB["modules"]
subgraph PC["src"]
PD["index.ts"]
subgraph PE["lib"]
PF["auth.module.ts"]
PG["email.module.ts"]
PH["token.module.ts"]
PI["user.module.ts"]
PJ["customer-profile.module.ts"]
PK["brand.module.ts"]
PL["catalog-guard.module.ts"]
PM["translation.module.ts"]
PN["cart.module.ts"]
PO["platform-settings.module.ts"]
PP["category.module.ts"]
PQ["product.module.ts"]
PR["color.module.ts"]
PS["currency.module.ts"]
PT["graphql-context.module.ts"]
PU["order.module.ts"]
PV["seller-info.module.ts"]
PW["payment.module.ts"]
PX["product-info.module.ts"]
PY["seller-products.module.ts"]
PZ["site-language.module.ts"]
end
end
end
subgraph Q0["resolvers"]
Q1["jest.config.ts"]
subgraph Q2["src"]
Q3["index.ts"]
subgraph Q4["lib"]
Q5["auth.resolver.ts"]
Q6["zod-validation.pipe.ts"]
Q7["brand.resolver.ts"]
Q8["cart.resolver.ts"]
Q9["category.resolver.ts"]
QA["color.resolver.ts"]
QB["currency.resolver.ts"]
QC["customer-profile.resolver.ts"]
QD["order.resolver.ts"]
QE["payment.resolver.ts"]
QF["product-info.resolver.ts"]
QG["product.resolver.ts"]
QH["seller-info.resolver.ts"]
QI["shipping.resolver.ts"]
QJ["site-language.resolver.ts"]
QK["translation.input.ts"]
QL["translation.resolver.ts"]
QM["user.resolver.ts"]
QN["auth-validation.spec.ts"]
QO["auth.resolver.spec.ts"]
QP["cart-validation.spec.ts"]
QQ["currency-translation-validation.spec.ts"]
QR["customer-profile-validation.spec.ts"]
QS["order-validation.spec.ts"]
QT["order.resolver.spec.ts"]
QU["order.resolver.status-transitions.spec.ts"]
QV["order.resolver.tracking.spec.ts"]
QW["payment.resolver.integration.spec.ts"]
QX["payment.resolver.spec.ts"]
QY["product-info.resolver.spec.ts"]
QZ["product-validation.spec.ts"]
R0["product.resolver.spec.ts"]
R1["query-args-validation.spec.ts"]
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
U1["apollo-error.ts"]
U2["auth.ts"]
U3["limits.ts"]
U4["primitives.ts"]
U5["auth-forms.ts"]
U6["cart.ts"]
U7["catalog.ts"]
U8["contact.ts"]
U9["currency.ts"]
UA["taxonomy.ts"]
UB["errors.ts"]
UC["order.ts"]
UD["profile.ts"]
UE["query.ts"]
UF["seller.ts"]
UG["auth-forms.admin.spec.ts"]
UH["auth-forms.login.spec.ts"]
UI["auth-forms.recovery.spec.ts"]
UJ["auth-forms.seller.spec.ts"]
UK["auth-forms.spec.ts"]
UL["auth.spec.ts"]
UM["cart.spec.ts"]
UN["catalog.spec.ts"]
UO["contact.spec.ts"]
UP["currency.spec.ts"]
UQ["errors.spec.ts"]
UR["order.spec.ts"]
US["primitives.spec.ts"]
UT["profile.spec.ts"]
UU["query.spec.ts"]
UV["seller.spec.ts"]
UW["taxonomy.spec.ts"]
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
85-->83
89-->8B
8E-->8G
8H-->8G
8I-->8G
8M-->8O
8R-->8T
8U-->8T
8V-->8T
8Y-->90
93-->95
93-->96
93-->97
95-->96
96-->97
98-->95
9B-->9D
9G-->9I
9J-->9I
9K-->9I
9N-->9P
9P-->9Q
9R-->9Q
9S-->9P
9T-->9P
9U-->9P
9Y-->A0
A1-->A0
A2-->A0
A3-->A0
A6-->A8
A9-->A8
AA-->A8
AD-->AF
AG-->AF
AK-->AM
AN-->AM
AR-->AT
AR-->B2
AR-->AW
AR-->B1
AT-->AV
AT-->AX
AT-->AY
AT-->AZ
AT-->B0
AT-->AW
AT-->B1
AV-->AW
B2-->AW
B3-->AZ
B3-->AT
B3-->AW
B4-->B5
B4-->AZ
B4-->AT
B4-->B2
B4-->AW
B6-->B2
B7-->B2
B8-->AW
BA-->AW
BE-->BG
BH-->BG
BI-->BG
BL-->BN
BO-->BN
BS-->BU
BV-->BU
BZ-->C1
C1-->C2
C3-->C1
C4-->C1
C5-->C1
C6-->C1
C7-->C1
CB-->CD
CE-->CD
CF-->CD
CI-->CK
CL-->CK
CP-->CR
CV-->CX
D0-->D2
D3-->D0
D4-->D2
D8-->DA
DB-->D8
DC-->DA
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
GB-->G6
GE-->GG
GH-->GG
GI-->GG
GN-->GP
GP-->GQ
GR-->GP
GS-->GP
GU-->GQ
GY-->H0
H1-->H0
H4-->H6
HA-->HC
HI-->HK
HI-->HL
HM-->HL
HP-->HR
HS-->HR
HW-->HY
HZ-->HY
I2-->I4
I7-->I9
I7-->IA
I7-->IB
I9-->IA
IC-->I9
IG-->II
IJ-->II
IM-->IO
IR-->IT
IU-->IT
IX-->IZ
IZ-->J0
J3-->J5
J5-->J6
J5-->J7
J5-->J8
J5-->J9
J7-->J6
J7-->J8
JA-->J3
JD-->JF
JI-->JK
JL-->JK
JO-->JQ
JT-->JV
JT-->JW
JT-->JX
JT-->JY
K3-->K5
K3-->K6
K6-->K5
KA-->KC
KC-->KD
KG-->KI
KI-->KJ
KM-->KO
KM-->KQ
KM-->KR
KM-->KP
KO-->KP
KS-->KP
KV-->KX
KV-->KY
KV-->KZ
KZ-->KY
L0-->KX
L3-->L5
L3-->L6
L6-->L5
L7-->L6
LB-->LD
LB-->LE
LE-->LD
LH-->LJ
LN-->LP
LQ-->LP
LU-->LW
LX-->LW
M0-->M2
M3-->M2
M6-->M8
MB-->MD
MI-->MK
MN-->MP
MN-->MQ
MT-->MV
MW-->MT
N0-->N2
N5-->N7
NA-->NC
ND-->NA
NH-->NJ
NH-->NK
NO-->NQ
NO-->NR
NO-->NS
NT-->NS
NW-->NY
NW-->O9
NW-->O0
NW-->O4
NW-->OA
NW-->OB
NW-->OC
NW-->OD
NW-->OE
NW-->OF
NW-->O1
NW-->O5
NW-->O3
NW-->NZ
NW-->OG
NW-->O6
NW-->OH
NW-->O7
NW-->O2
NW-->OI
NW-->O8
NY-->NZ
NZ-->NY
NZ-->O0
NZ-->O1
NZ-->O3
NZ-->O6
NZ-->O7
O0-->NZ
O1-->NZ
O1-->O2
O2-->O1
O3-->O4
O3-->O5
O3-->NZ
O5-->O4
O5-->O3
O6-->O7
O6-->O8
O7-->O3
O7-->NZ
O7-->O6
O9-->NZ
O9-->O8
OA-->OB
OC-->O8
OD-->OB
OD-->O8
OE-->NZ
OE-->O6
OG-->O8
OH-->OE
OM-->OO
OM-->OP
OM-->OQ
OM-->OR
OS-->OO
OT-->OR
OW-->OY
OW-->OZ
OW-->P0
OW-->P1
OW-->P2
OW-->P3
OW-->P4
OW-->P5
OW-->P6
OW-->P7
OW-->P8
OW-->P9
OW-->PA
P6-->P5
PD-->PF
PD-->PK
PD-->PN
PD-->PL
PD-->PP
PD-->PR
PD-->PS
PD-->PJ
PD-->PG
PD-->PT
PD-->PU
PD-->PW
PD-->PO
PD-->PX
PD-->PQ
PD-->PV
PD-->PY
PD-->PZ
PD-->PH
PD-->PM
PD-->PI
PF-->PG
PF-->PH
PF-->PI
PI-->PF
PI-->PJ
PK-->PL
PK-->PM
PN-->PO
PP-->PL
PP-->PQ
PP-->PM
PQ-->PL
PQ-->PH
PQ-->PM
PR-->PL
PR-->PM
PT-->PG
PT-->PH
PT-->PI
PU-->PO
PU-->PV
PV-->PQ
PV-->PH
PV-->PI
PW-->PS
PW-->PU
PX-->PQ
PX-->PM
PY-->PV
PY-->PI
Q3-->Q5
Q3-->Q7
Q3-->Q8
Q3-->Q9
Q3-->QA
Q3-->QB
Q3-->QC
Q3-->QD
Q3-->QE
Q3-->QF
Q3-->QG
Q3-->QH
Q3-->QI
Q3-->QJ
Q3-->QK
Q3-->QL
Q3-->QM
Q3-->Q6
Q5-->Q6
Q7-->Q6
Q8-->Q6
Q9-->Q6
QA-->Q6
QB-->Q6
QC-->Q6
QD-->Q6
QG-->Q6
QH-->Q6
QJ-->Q6
QL-->Q6
QM-->Q6
QN-->Q5
QN-->QM
QN-->Q6
QO-->Q5
QP-->Q8
QP-->Q6
QQ-->QB
QQ-->QL
QQ-->Q6
QR-->QC
QR-->Q6
QS-->QD
QS-->Q6
QT-->QD
QU-->QD
QV-->QD
QW-->QE
QX-->QE
QY-->QF
QZ-->QG
QZ-->Q6
R0-->QG
R1-->QD
R1-->QG
R1-->QH
R1-->Q6
R2-->QH
R2-->Q6
R3-->Q7
R3-->Q9
R3-->QA
R3-->QJ
R3-->Q6
R4-->QL
R7-->QM
R8-->Q6
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
TZ-->U2
TZ-->U5
TZ-->U6
TZ-->U7
TZ-->U8
TZ-->U9
TZ-->UB
TZ-->U3
TZ-->UC
TZ-->U4
TZ-->UD
TZ-->UE
TZ-->UF
TZ-->UA
U2-->U3
U2-->U4
U4-->U3
U5-->U2
U6-->U4
U9-->UA
UC-->U2
UC-->U6
UC-->U4
UD-->UC
UE-->U4
UG-->U5
UH-->U5
UI-->U5
UJ-->U5
UK-->U5
UL-->U2
UM-->U6
UN-->U7
UO-->U8
UP-->U9
UQ-->UB
UR-->UC
US-->U3
US-->U4
UT-->UD
UU-->UE
UV-->UF
UW-->UA
