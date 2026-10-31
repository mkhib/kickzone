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
9Q["customer-shopping-cart.pants-size.spec.tsx"]
9R["customer-shopping-cart.shipping-form.spec.tsx"]
9S["customer-shopping-cart.spec.tsx"]
end
end
9T["vite.config.ts"]
end
subgraph 9U["customer-signup"]
subgraph 9V["src"]
9W["index.ts"]
subgraph 9X["lib"]
9Y["customer-signup.tsx"]
9Z["customer-signup.password-length.spec.tsx"]
A0["customer-signup.spec.tsx"]
A1["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A2["forgot-password"]
subgraph A3["src"]
A4["index.ts"]
subgraph A5["lib"]
A6["customer-forgot-password.tsx"]
A7["customer-forgot-password.spec.tsx"]
A8["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A9["guide-authenticity"]
subgraph AA["src"]
AB["index.ts"]
subgraph AC["lib"]
AD["customer-guide-authenticity.tsx"]
AE["customer-guide-authenticity.spec.tsx"]
end
end
AF["vite.config.ts"]
end
subgraph AG["guide-payment"]
subgraph AH["src"]
AI["index.ts"]
subgraph AJ["lib"]
AK["customer-guide-payment.tsx"]
AL["customer-guide-payment.spec.tsx"]
end
end
AM["vite.config.ts"]
end
subgraph AN["home"]
subgraph AO["src"]
AP["index.ts"]
subgraph AQ["lib"]
AR["CustomersHomeScreen.tsx"]
subgraph AS["components"]
AT["CategoryBentoSection.tsx"]
AV["HeroSection.tsx"]
AW["HomeLoadingScreen.tsx"]
AX["PicksRailSection.tsx"]
AY["TrustStripSection.tsx"]
B3["NewArrivalsSection.tsx"]
B6["BrandBlocksSection.tsx"]
B7["NewsletterSection.tsx"]
B8["ShopTheLookSection.tsx"]
B9["TickerSection.tsx"]
end
AU["home-selectors.ts"]
AZ["useScrollProgress.ts"]
B0["CustomersShopScreen.tsx"]
B1["CustomersHomeScreen.cart-size.spec.tsx"]
B2["CustomersHomeScreen.spec.tsx"]
B4["CustomersShopScreen.cart-size.spec.tsx"]
B5["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BA["login"]
subgraph BB["src"]
BC["index.ts"]
subgraph BD["lib"]
BE["CustomersLoginScreen.tsx"]
BF["CustomersLoginScreen.spec.tsx"]
BG["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BH["not-found"]
subgraph BI["src"]
BJ["index.ts"]
subgraph BK["lib"]
BL["customer-not-found.tsx"]
BM["customer-not-found.spec.tsx"]
end
end
BN["vite.config.ts"]
end
subgraph BO["privacy-policy"]
subgraph BP["src"]
BQ["index.ts"]
subgraph BR["lib"]
BS["customer-privacy-policy.tsx"]
BT["customer-privacy-policy.spec.tsx"]
end
end
BU["vite.config.ts"]
end
subgraph BV["product-details"]
subgraph BW["src"]
BX["index.ts"]
subgraph BY["lib"]
BZ["customer-product-details.tsx"]
C0["reviews-flag.ts"]
C1["customer-product-details.guarantee.spec.tsx"]
C2["customer-product-details.no-low-stock.spec.tsx"]
C3["customer-product-details.pants-size.spec.tsx"]
C4["customer-product-details.reviews-hidden.spec.tsx"]
C5["customer-product-details.spec.tsx"]
end
end
C6["vite.config.ts"]
end
subgraph C7["reset-password"]
subgraph C8["src"]
C9["index.ts"]
subgraph CA["lib"]
CB["customer-reset-password.tsx"]
CC["customer-reset-password.password-length.spec.tsx"]
CD["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CE["shipping-returns"]
subgraph CF["src"]
CG["index.ts"]
subgraph CH["lib"]
CI["customer-shipping-returns.tsx"]
CJ["customer-shipping-returns.spec.tsx"]
end
end
CK["vite.config.ts"]
end
subgraph CL["unauthorized"]
subgraph CM["src"]
CN["index.ts"]
subgraph CO["lib"]
CP["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CQ["utility"]
subgraph CR["test"]
subgraph CS["src"]
CT["index.ts"]
subgraph CU["lib"]
CV["customers-test-utility.tsx"]
end
end
end
end
subgraph CW["validations"]
subgraph CX["src"]
CY["index.ts"]
subgraph CZ["lib"]
D0["shipping-validation.ts"]
D1["shipping-validation.shared.spec.ts"]
D2["shipping-validation.spec.tsx"]
D3["shipping-validation.tsx"]
end
end
end
subgraph D4["zustand"]
subgraph D5["customer-cart-store"]
subgraph D6["src"]
D7["index.ts"]
subgraph D8["lib"]
D9["customer-cart-store.ts"]
DA["customer-cart-store.spec.ts"]
DB["customer-cart-store.tsx"]
end
end
end
subgraph DC["customer-checkout-store"]
subgraph DD["src"]
DE["index.ts"]
subgraph DF["lib"]
DG["customer-checkout-store.ts"]
DH["customer-checkout-store.spec.ts"]
end
end
DI["vite.config.ts"]
end
subgraph DJ["customer-wishlist-store"]
subgraph DK["src"]
DL["index.ts"]
subgraph DM["lib"]
DN["customer-wishlist-store.ts"]
DO["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DP["src"]
DQ["index.ts"]
subgraph DR["lib"]
DS["customers-products-store.tsx"]
end
end
end
end
subgraph DT["sellers"]
subgraph DU["components"]
subgraph DV["footer"]
subgraph DW["src"]
DX["index.ts"]
subgraph DY["lib"]
DZ["sellers-footer.tsx"]
E0["sellers-footer.spec.tsx"]
end
end
end
subgraph E1["headerbar"]
subgraph E2["src"]
E3["index.ts"]
subgraph E4["lib"]
E5["SellersHeaderbar.tsx"]
end
end
end
subgraph E6["layout"]
subgraph E7["src"]
E8["index.ts"]
subgraph E9["lib"]
EA["SellersLayout.tsx"]
EB["SellersTabbar.tsx"]
end
end
end
end
subgraph EC["contexts"]
subgraph ED["auth"]
subgraph EE["src"]
EF["index.ts"]
subgraph EG["lib"]
EH["SellersAuthContext.tsx"]
EI["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EJ["graphql"]
subgraph EK["src"]
EL["index.ts"]
subgraph EM["lib"]
EN["fragments.ts"]
EO["mutations.ts"]
EP["Provider.tsx"]
EQ["SellersApolloProvider.tsx"]
ER["client.ts"]
ES["queries.ts"]
ET["seller-orders.graphql.ts"]
EU["apollo-upload-client.d.ts"]
end
subgraph EV["types"]
EW["apollo-upload-client.d.ts"]
end
end
end
subgraph EX["hooks"]
subgraph EY["auth"]
subgraph EZ["src"]
F0["index.ts"]
subgraph F1["lib"]
F2["useSellerAuth.ts"]
F3["sellerAuth.graphql.ts"]
end
end
end
subgraph F4["orders"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["useSellerOrders.ts"]
F9["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FA["products"]
subgraph FB["src"]
FC["index.ts"]
subgraph FD["lib"]
FE["useSellersProductManagement.ts"]
FF["useSellersProducts.ts"]
end
end
end
end
subgraph FG["router"]
subgraph FH["src"]
FI["index.ts"]
subgraph FJ["lib"]
FK["SellersRouter.tsx"]
end
end
end
subgraph FL["routes"]
subgraph FM["src"]
FN["index.ts"]
subgraph FO["lib"]
FP["seller-routes.ts"]
end
end
end
subgraph FQ["screens"]
subgraph FR["catalog"]
subgraph FS["src"]
FT["index.ts"]
subgraph FU["lib"]
FV["SellersCatalogScreens.tsx"]
FW["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FX["login"]
subgraph FY["src"]
FZ["index.ts"]
subgraph G0["lib"]
G1["SellersLogin.tsx"]
G2["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G3["manage-product"]
subgraph G4["src"]
G5["index.ts"]
subgraph G6["lib"]
G7["SellersManageProductScreen.tsx"]
G8["SellersDefineProductFlow.tsx"]
G9["SellersDefineProductFlow.pants-label.spec.tsx"]
GA["SellersDefineProductFlow.spec.tsx"]
GB["SellersManageProductScreen.spec.tsx"]
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
GT["seller-status-transitions.spec.ts"]
end
GU["test-setup.ts"]
end
end
subgraph GV["setup-password"]
subgraph GW["src"]
GX["index.ts"]
subgraph GY["lib"]
GZ["SellersSetupPassword.tsx"]
H0["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H1["unauthorized"]
subgraph H2["src"]
H3["index.ts"]
subgraph H4["lib"]
H5["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H6["zustand"]
subgraph H7["sellers-products-store"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["useSellersProductsStore.ts"]
HC["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HD["shared"]
subgraph HE["components"]
subgraph HF["apollo-provider-base"]
subgraph HG["src"]
HH["index.ts"]
subgraph HI["lib"]
HJ["ApolloProviderBase.tsx"]
HK["createSilentRefreshAuthLink.ts"]
HL["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HM["error-boundary"]
subgraph HN["src"]
HO["index.ts"]
subgraph HP["lib"]
HQ["error-boundary.tsx"]
HR["error-boundary.spec.tsx"]
end
end
HS["vite.config.ts"]
end
subgraph HT["glassmorphism-container"]
subgraph HU["src"]
HV["index.ts"]
subgraph HW["lib"]
HX["glassmorphism-container.tsx"]
HY["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HZ["layout"]
subgraph I0["src"]
I1["index.ts"]
subgraph I2["lib"]
I3["Layout.tsx"]
end
end
end
subgraph I4["material-data-table"]
subgraph I5["src"]
I6["index.ts"]
subgraph I7["lib"]
I8["material-data-table.tsx"]
I9["table-config.ts"]
IA["table-utils.ts"]
IB["material-data-table.spec.tsx"]
IC["table-types.ts"]
end
end
end
subgraph ID["order-status-chip"]
subgraph IE["src"]
IF["index.ts"]
subgraph IG["lib"]
IH["order-status-chip.tsx"]
II["order-status-chip.spec.tsx"]
end
end
end
subgraph IJ["password-field"]
subgraph IK["src"]
IL["index.ts"]
subgraph IM["lib"]
IN["PasswordTextField.tsx"]
end
end
end
subgraph IO["price-display"]
subgraph IP["src"]
IQ["index.ts"]
subgraph IR["lib"]
IS["price-display.tsx"]
IT["price-display.spec.tsx"]
end
end
end
subgraph IU["private-route"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["createPrivateRoute.tsx"]
IZ["PrivateRoute.tsx"]
end
end
end
subgraph J0["rtl-table-utils"]
subgraph J1["src"]
J2["index.ts"]
subgraph J3["lib"]
J4["rtl-table-utils.ts"]
J5["rtl-cell-components.tsx"]
J6["rtl-column-helpers.ts"]
J7["rtl-table-props.ts"]
J8["use-table-alignment.ts"]
J9["rtl-table-utils.spec.tsx"]
JA["rtl-table-utils.tsx"]
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
MW["sizes.spec.tsx"]
MX["sizes.tsx"]
end
end
end
end
subgraph MY["zustand"]
subgraph MZ["shared-auth-store"]
subgraph N0["src"]
N1["index.ts"]
subgraph N2["lib"]
N3["shared-auth-store.ts"]
end
end
end
subgraph N4["shared-notification-store"]
subgraph N5["src"]
N6["index.ts"]
subgraph N7["lib"]
N8["shared-notification-store.tsx"]
end
end
end
subgraph N9["shared-ui-store"]
subgraph NA["src"]
NB["index.ts"]
subgraph NC["lib"]
ND["shared-ui-store.ts"]
NE["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NF["server"]
subgraph NG["controllers"]
subgraph NH["src"]
NI["index.ts"]
subgraph NJ["lib"]
NK["auth.controller.ts"]
NL["order.controller.ts"]
end
end
end
subgraph NM["decorators"]
NN["jest.config.ts"]
subgraph NO["src"]
NP["index.ts"]
subgraph NQ["lib"]
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
QQ["customer-profile-validation.spec.ts"]
QR["order-validation.spec.ts"]
QS["order.resolver.spec.ts"]
QT["order.resolver.status-transitions.spec.ts"]
QU["order.resolver.tracking.spec.ts"]
QV["payment.resolver.integration.spec.ts"]
QW["payment.resolver.spec.ts"]
QX["product-info.resolver.spec.ts"]
QY["seller-info-validation.spec.ts"]
QZ["translation.resolver.guards.spec.ts"]
subgraph R0["types"]
R1["graphql-upload.d.ts"]
end
R2["user.resolver.spec.ts"]
R3["zod-validation.pipe.spec.ts"]
end
end
end
subgraph R4["services"]
R5["jest.config.ts"]
subgraph R6["src"]
R7["index.ts"]
subgraph R8["lib"]
R9["auth.service.ts"]
RA["brand.service.ts"]
RB["cart.service.ts"]
RC["product-info-colors.util.ts"]
RD["category.service.ts"]
RE["color.service.ts"]
RF["currency.service.ts"]
RG["customer-profile.service.ts"]
RH["email.service.ts"]
RI["image-upload.service.ts"]
RJ["order.service.ts"]
RK["payment-logger.service.ts"]
RL["payment.service.ts"]
RM["product.service.ts"]
RN["seller-info.service.ts"]
RO["shipping-calculation.service.ts"]
RP["site-language.service.ts"]
RQ["token.service.ts"]
RR["translation.service.ts"]
RS["user.service.ts"]
RT["auth.service.password-policy.spec.ts"]
RU["auth.service.spec.ts"]
RV["cart.service.add-quantity.spec.ts"]
RW["cart.service.null-relations.spec.ts"]
RX["cart.service.spec.ts"]
RY["order.service.spec.ts"]
RZ["order.service.tracking.spec.ts"]
S0["product-info-colors.util.spec.ts"]
S1["product.service.multi-filters.spec.ts"]
S2["product.service.only-discounted.spec.ts"]
S3["product.service.pants.spec.ts"]
S4["product.service.spec.ts"]
S5["relay-connection.spec.ts"]
S6["seller-info.service.price-validation.spec.ts"]
S7["shipping-calculation.service.spec.ts"]
S8["token.service.spec.ts"]
end
end
end
subgraph S9["strategies"]
subgraph SA["src"]
SB["index.ts"]
subgraph SC["lib"]
SD["local.strategy.ts"]
end
end
end
subgraph SE["utils"]
subgraph SF["src"]
SG["index.ts"]
subgraph SH["lib"]
SI["email-templates.ts"]
SJ["relay-connection.ts"]
SK["pagination.ts"]
end
end
end
end
subgraph SL["shared"]
subgraph SM["codegen"]
SN["jest.config.ts"]
subgraph SO["src"]
SP["index.ts"]
subgraph SQ["lib"]
subgraph SR["generated"]
SS["graphql.ts"]
end
end
end
end
subgraph ST["graphql-schema"]
SU["jest.config.ts"]
subgraph SV["src"]
SW["index.ts"]
end
end
subgraph SX["product-sizes"]
subgraph SY["src"]
SZ["index.ts"]
subgraph T0["lib"]
T1["product-sizes.ts"]
T2["product-sizes.pants-formats.spec.ts"]
T3["product-sizes.pants-label.spec.ts"]
T4["product-sizes.pants-strict.spec.ts"]
T5["product-sizes.spec.ts"]
end
end
end
subgraph T6["shared-i18n"]
subgraph T7["src"]
T8["index.ts"]
subgraph T9["lib"]
TA["language-context.tsx"]
TB["language-detector.ts"]
subgraph TC["locales"]
TD["i18n-react.tsx"]
TE["i18n-util.ts"]
TF["i18n-util.async.ts"]
subgraph TG["en"]
TH["index.ts"]
end
subgraph TJ["fa"]
TK["index.ts"]
end
TL["formatters.ts"]
TM["i18n-types.ts"]
TN["i18n-util.sync.ts"]
TO["navigator-detector.ts"]
end
TI["site-name.ts"]
TP["table-localization.ts"]
TQ["theme-provider.tsx"]
TR["use-page-title.ts"]
end
end
end
subgraph TS["validation"]
subgraph TT["src"]
TU["index.ts"]
subgraph TV["lib"]
TW["auth.ts"]
TX["limits.ts"]
TY["primitives.ts"]
TZ["auth-forms.ts"]
U0["cart.ts"]
U1["contact.ts"]
U2["errors.ts"]
U3["order.ts"]
U4["profile.ts"]
U5["seller.ts"]
U6["auth-forms.admin.spec.ts"]
U7["auth-forms.login.spec.ts"]
U8["auth-forms.recovery.spec.ts"]
U9["auth-forms.seller.spec.ts"]
UA["auth-forms.spec.ts"]
UB["auth.spec.ts"]
UC["cart.spec.ts"]
UD["contact.spec.ts"]
UE["errors.spec.ts"]
UF["order.spec.ts"]
UG["primitives.spec.ts"]
UH["profile.spec.ts"]
UI["seller.spec.ts"]
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
9Q-->9P
9R-->9P
9S-->9P
9W-->9Y
9Z-->9Y
A0-->9Y
A1-->9Y
A4-->A6
A7-->A6
A8-->A6
AB-->AD
AE-->AD
AI-->AK
AL-->AK
AP-->AR
AP-->B0
AP-->AU
AP-->AZ
AR-->AT
AR-->AV
AR-->AW
AR-->AX
AR-->AY
AR-->AU
AR-->AZ
AT-->AU
B0-->AU
B1-->AX
B1-->AR
B1-->AU
B2-->B3
B2-->AX
B2-->AR
B2-->B0
B2-->AU
B4-->B0
B5-->B0
B6-->AU
B8-->AU
BC-->BE
BF-->BE
BG-->BE
BJ-->BL
BM-->BL
BQ-->BS
BT-->BS
BX-->BZ
BZ-->C0
C1-->BZ
C2-->BZ
C3-->BZ
C4-->BZ
C5-->BZ
C9-->CB
CC-->CB
CD-->CB
CG-->CI
CJ-->CI
CN-->CP
CT-->CV
CY-->D0
D1-->D0
D2-->D0
D2-->D3
D7-->D9
DA-->D9
DE-->DG
DH-->DG
DL-->DN
DO-->DN
DQ-->DS
DX-->DZ
E0-->DZ
E3-->E5
E8-->EA
E8-->EB
EA-->EB
EF-->EH
EI-->EH
EL-->EN
EL-->EO
EL-->EP
EL-->ES
EP-->EQ
EQ-->ER
ES-->EN
ES-->ET
F0-->F2
F2-->F3
F6-->F8
FC-->FE
FC-->FF
FI-->FK
FN-->FP
FT-->FV
FW-->FV
FZ-->G1
G2-->G1
G5-->G7
G7-->G8
G9-->G8
GA-->G8
GB-->G7
GE-->GG
GH-->GG
GI-->GG
GN-->GP
GP-->GQ
GR-->GP
GS-->GP
GT-->GQ
GX-->GZ
H0-->GZ
H3-->H5
H9-->HB
HH-->HJ
HH-->HK
HL-->HK
HO-->HQ
HR-->HQ
HV-->HX
HY-->HX
I1-->I3
I6-->I8
I6-->I9
I6-->IA
I8-->I9
IB-->I8
IF-->IH
II-->IH
IL-->IN
IQ-->IS
IT-->IS
IW-->IY
IY-->IZ
J2-->J4
J4-->J5
J4-->J6
J4-->J7
J4-->J8
J6-->J5
J6-->J7
J9-->JA
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
MW-->MX
N1-->N3
N6-->N8
NB-->ND
NI-->NK
NI-->NL
NP-->NR
NP-->NS
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
Q8-->Q6
QC-->Q6
QD-->Q6
QH-->Q6
QM-->Q6
QN-->Q5
QN-->QM
QN-->Q6
QO-->Q5
QP-->Q8
QP-->Q6
QQ-->QC
QQ-->Q6
QR-->QD
QR-->Q6
QS-->QD
QT-->QD
QU-->QD
QV-->QE
QW-->QE
QX-->QF
QY-->QH
QY-->Q6
QZ-->QL
R2-->QM
R3-->Q6
R7-->R9
R7-->RA
R7-->RB
R7-->RD
R7-->RE
R7-->RF
R7-->RG
R7-->RH
R7-->RI
R7-->RJ
R7-->RK
R7-->RL
R7-->RC
R7-->RM
R7-->RN
R7-->RO
R7-->RP
R7-->RQ
R7-->RR
R7-->RS
RB-->RC
RM-->RC
RN-->RC
RT-->R9
RT-->RH
RT-->RQ
RT-->RS
RU-->R9
RU-->RH
RU-->RQ
RU-->RS
RV-->RB
RW-->RB
RX-->RB
RY-->RJ
RZ-->RJ
S0-->RC
S1-->RM
S1-->RR
S2-->RM
S2-->RR
S3-->RM
S3-->RR
S4-->RM
S4-->RR
S6-->R9
S6-->RN
S7-->RO
S8-->RQ
SB-->SD
SG-->SI
SG-->SJ
SP-->SS
SZ-->T1
T2-->T1
T3-->T1
T4-->T1
T5-->T1
T8-->TA
T8-->TB
T8-->TD
T8-->TM
T8-->TE
T8-->TF
T8-->TN
T8-->TO
T8-->TI
T8-->TP
T8-->TQ
T8-->TR
TA-->TB
TA-->TD
TA-->TF
TD-->TE
TF-->TH
TF-->TK
TF-->TL
TF-->TE
TH-->TI
TK-->TI
TN-->TH
TN-->TK
TN-->TL
TN-->TE
TP-->TD
TQ-->TA
TR-->TD
TU-->TW
TU-->TZ
TU-->U0
TU-->U1
TU-->U2
TU-->TX
TU-->U3
TU-->TY
TU-->U4
TU-->U5
TW-->TX
TW-->TY
TY-->TX
TZ-->TW
U0-->TY
U3-->TW
U3-->U0
U3-->TY
U4-->U3
U6-->TZ
U7-->TZ
U8-->TZ
U9-->TZ
UA-->TZ
UB-->TW
UC-->U0
UD-->U1
UE-->U2
UF-->U3
UG-->TX
UG-->TY
UH-->U4
UI-->U5
