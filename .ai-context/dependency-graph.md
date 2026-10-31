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
GC["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GD["products"]
subgraph GE["src"]
GF["index.ts"]
subgraph GG["lib"]
GH["SellersProducts.tsx"]
GI["SellersProducts.pants-label.spec.tsx"]
GJ["SellersProducts.spec.tsx"]
end
end
end
subgraph GK["seller-orders"]
GL["jest.config.ts"]
GM["jest.setup.ts"]
subgraph GN["src"]
GO["index.ts"]
subgraph GP["lib"]
GQ["seller-orders-screen.tsx"]
GR["seller-status-transitions.ts"]
GS["seller-orders-screen.pants-size.spec.tsx"]
GT["seller-orders-screen.spec.tsx"]
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
JA["rtl-table-utils.spec.tsx"]
JB["rtl-table-utils.tsx"]
end
end
end
subgraph JC["snackbar"]
subgraph JD["src"]
JE["index.ts"]
subgraph JF["lib"]
JG["snackbar.tsx"]
end
end
end
subgraph JH["styled-drawer"]
subgraph JI["src"]
JJ["index.ts"]
subgraph JK["lib"]
JL["styled-drawer.tsx"]
JM["styled-drawer.spec.tsx"]
end
end
end
subgraph JN["unauthorized"]
subgraph JO["src"]
JP["index.ts"]
subgraph JQ["lib"]
JR["unauthorized-path.tsx"]
end
end
end
end
subgraph JS["graphql"]
subgraph JT["src"]
JU["index.ts"]
subgraph JV["lib"]
JW["currency.mutations.ts"]
JX["currency.queries.ts"]
JY["fragments.ts"]
JZ["variant-colors.ts"]
K0["client-shared-graphql.tsx"]
end
end
end
subgraph K1["hooks"]
subgraph K2["brands"]
subgraph K3["src"]
K4["index.ts"]
subgraph K5["lib"]
K6["brands.graphql.ts"]
K7["useBrands.ts"]
end
end
K8["vite.config.ts"]
end
subgraph K9["categories"]
subgraph KA["src"]
KB["index.ts"]
subgraph KC["lib"]
KD["useCategories.ts"]
KE["categories.graphql.ts"]
end
end
end
subgraph KF["colors"]
subgraph KG["src"]
KH["index.ts"]
subgraph KI["lib"]
KJ["useColors.ts"]
KK["color.graphql.ts"]
end
end
end
subgraph KL["currency"]
subgraph KM["src"]
KN["index.ts"]
subgraph KO["lib"]
KP["useConvertPrice.tsx"]
KQ["useExchangeRate.tsx"]
KR["useCurrencies.tsx"]
KS["useCurrencyForLocale.tsx"]
KT["useExchangeRate.spec.tsx"]
end
end
end
subgraph KU["products"]
subgraph KV["src"]
KW["index.ts"]
subgraph KX["lib"]
KY["productImage.ts"]
KZ["products.graphql.ts"]
L0["useProducts.ts"]
L1["productImage.spec.ts"]
end
end
end
subgraph L2["site-languages"]
subgraph L3["src"]
L4["index.ts"]
subgraph L5["lib"]
L6["site-languages.graphql.ts"]
L7["useSiteLanguages.ts"]
L8["site-languages-hook.spec.tsx"]
end
end
L9["vite.config.ts"]
end
subgraph LA["snackbar"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["SnackbarContext.tsx"]
LF["useSnackbar.ts"]
end
end
end
subgraph LG["translations-management-hook"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["useTranslationsManagement.ts"]
end
end
end
end
subgraph LL["lottie"]
subgraph LM["empty-cart"]
subgraph LN["src"]
LO["index.ts"]
subgraph LP["lib"]
LQ["lottie-empty-cart.tsx"]
LR["lottie-empty-cart.spec.tsx"]
end
end
LS["vite.config.ts"]
end
subgraph LT["loading"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["lottie-loading.tsx"]
LY["lottie-loading.spec.tsx"]
end
end
end
subgraph LZ["success-check"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["lottie-success-check.tsx"]
M4["lottie-success-check.spec.tsx"]
end
end
end
subgraph M5["unauthorized"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MA["translations"]
subgraph MB["src"]
MC["index.ts"]
subgraph MD["lib"]
ME["mapApolloErrorToTranslationKey.ts"]
MF["WrapTranslation.tsx"]
end
end
end
subgraph MG["ui"]
subgraph MH["colors"]
subgraph MI["src"]
MJ["index.ts"]
subgraph MK["lib"]
ML["colors.ts"]
end
end
end
subgraph MM["language-components"]
subgraph MN["src"]
MO["index.ts"]
subgraph MP["lib"]
MQ["language-components.tsx"]
MR["ltr-text-field.tsx"]
end
end
end
subgraph MS["sizes"]
subgraph MT["src"]
MU["index.ts"]
subgraph MV["lib"]
MW["sizes.ts"]
MX["sizes.spec.tsx"]
MY["sizes.tsx"]
end
end
end
end
subgraph MZ["zustand"]
subgraph N0["shared-auth-store"]
subgraph N1["src"]
N2["index.ts"]
subgraph N3["lib"]
N4["shared-auth-store.ts"]
end
end
end
subgraph N5["shared-notification-store"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["shared-notification-store.tsx"]
end
end
end
subgraph NA["shared-ui-store"]
subgraph NB["src"]
NC["index.ts"]
subgraph ND["lib"]
NE["shared-ui-store.ts"]
NF["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NG["server"]
subgraph NH["controllers"]
subgraph NI["src"]
NJ["index.ts"]
subgraph NK["lib"]
NL["auth.controller.ts"]
NM["order.controller.ts"]
end
end
end
subgraph NN["decorators"]
NO["jest.config.ts"]
subgraph NP["src"]
NQ["index.ts"]
subgraph NR["lib"]
NS["current-user.decorator.ts"]
NT["decorators.ts"]
NU["decorators.spec.ts"]
end
end
end
subgraph NV["entities"]
subgraph NW["src"]
NX["index.ts"]
subgraph NY["lib"]
NZ["brand.entity.ts"]
O0["product.entity.ts"]
O1["category.entity.ts"]
O2["product-description.entity.ts"]
O3["site-language.entity.ts"]
O4["product-info.entity.ts"]
O5["color.entity.ts"]
O6["product-info-color.entity.ts"]
O7["seller-info.entity.ts"]
O8["seller-product.entity.ts"]
O9["user.entity.ts"]
OA["cart.entity.ts"]
OB["currency-preference.entity.ts"]
OC["currency.entity.ts"]
OD["customer.entity.ts"]
OE["exchange-rate.entity.ts"]
OF["order.entity.ts"]
OG["platform-settings.entity.ts"]
OH["refresh-token.entity.ts"]
OI["seller-order.entity.ts"]
OJ["translation.entity.ts"]
end
end
end
subgraph OK["guards"]
OL["jest.config.ts"]
subgraph OM["src"]
ON["index.ts"]
subgraph OO["lib"]
OP["catalog.guard.ts"]
OQ["graphql-auth.guard.ts"]
OR["http-auth.guard.ts"]
OS["roles.guard.ts"]
OT["catalog.guard.spec.ts"]
OU["roles.guard.spec.ts"]
end
end
end
subgraph OV["inputs"]
subgraph OW["src"]
OX["index.ts"]
subgraph OY["lib"]
OZ["brand.input.ts"]
P0["cart.inputs.ts"]
P1["category.input.ts"]
P2["color.input.ts"]
P3["customer-auth.inputs.ts"]
P4["order-pagination.inputs.ts"]
P5["order.inputs.ts"]
P6["product-info-filter.input.ts"]
P7["product.input.ts"]
P8["seller-order-pagination.inputs.ts"]
P9["seller.input.ts"]
PA["site-language.input.ts"]
PB["user.input.ts"]
end
end
end
subgraph PC["modules"]
subgraph PD["src"]
PE["index.ts"]
subgraph PF["lib"]
PG["auth.module.ts"]
PH["email.module.ts"]
PI["token.module.ts"]
PJ["user.module.ts"]
PK["customer-profile.module.ts"]
PL["brand.module.ts"]
PM["catalog-guard.module.ts"]
PN["translation.module.ts"]
PO["cart.module.ts"]
PP["platform-settings.module.ts"]
PQ["category.module.ts"]
PR["product.module.ts"]
PS["color.module.ts"]
PT["currency.module.ts"]
PU["graphql-context.module.ts"]
PV["order.module.ts"]
PW["seller-info.module.ts"]
PX["payment.module.ts"]
PY["product-info.module.ts"]
PZ["seller-products.module.ts"]
Q0["site-language.module.ts"]
end
end
end
subgraph Q1["resolvers"]
Q2["jest.config.ts"]
subgraph Q3["src"]
Q4["index.ts"]
subgraph Q5["lib"]
Q6["auth.resolver.ts"]
Q7["zod-validation.pipe.ts"]
Q8["brand.resolver.ts"]
Q9["cart.resolver.ts"]
QA["category.resolver.ts"]
QB["color.resolver.ts"]
QC["currency.resolver.ts"]
QD["customer-profile.resolver.ts"]
QE["order.resolver.ts"]
QF["payment.resolver.ts"]
QG["product-info.resolver.ts"]
QH["product.resolver.ts"]
QI["seller-info.resolver.ts"]
QJ["shipping.resolver.ts"]
QK["site-language.resolver.ts"]
QL["translation.input.ts"]
QM["translation.resolver.ts"]
QN["user.resolver.ts"]
QO["auth-validation.spec.ts"]
QP["auth.resolver.spec.ts"]
QQ["cart-validation.spec.ts"]
QR["customer-profile-validation.spec.ts"]
QS["order-validation.spec.ts"]
QT["order.resolver.spec.ts"]
QU["order.resolver.status-transitions.spec.ts"]
QV["order.resolver.tracking.spec.ts"]
QW["payment.resolver.integration.spec.ts"]
QX["payment.resolver.spec.ts"]
QY["product-info.resolver.spec.ts"]
QZ["product-validation.spec.ts"]
R0["seller-info-validation.spec.ts"]
R1["taxonomy-validation.spec.ts"]
R2["translation.resolver.guards.spec.ts"]
subgraph R3["types"]
R4["graphql-upload.d.ts"]
end
R5["user.resolver.spec.ts"]
R6["zod-validation.pipe.spec.ts"]
end
end
end
subgraph R7["services"]
R8["jest.config.ts"]
subgraph R9["src"]
RA["index.ts"]
subgraph RB["lib"]
RC["auth.service.ts"]
RD["brand.service.ts"]
RE["cart.service.ts"]
RF["product-info-colors.util.ts"]
RG["category.service.ts"]
RH["color.service.ts"]
RI["currency.service.ts"]
RJ["customer-profile.service.ts"]
RK["email.service.ts"]
RL["image-upload.service.ts"]
RM["order.service.ts"]
RN["payment-logger.service.ts"]
RO["payment.service.ts"]
RP["product.service.ts"]
RQ["seller-info.service.ts"]
RR["shipping-calculation.service.ts"]
RS["site-language.service.ts"]
RT["token.service.ts"]
RU["translation.service.ts"]
RV["user.service.ts"]
RW["auth.service.password-policy.spec.ts"]
RX["auth.service.spec.ts"]
RY["cart.service.add-quantity.spec.ts"]
RZ["cart.service.null-relations.spec.ts"]
S0["cart.service.spec.ts"]
S1["order.service.spec.ts"]
S2["order.service.tracking.spec.ts"]
S3["product-info-colors.util.spec.ts"]
S4["product.service.multi-filters.spec.ts"]
S5["product.service.only-discounted.spec.ts"]
S6["product.service.pants.spec.ts"]
S7["product.service.spec.ts"]
S8["relay-connection.spec.ts"]
S9["seller-info.service.price-validation.spec.ts"]
SA["shipping-calculation.service.spec.ts"]
SB["token.service.spec.ts"]
end
end
end
subgraph SC["strategies"]
subgraph SD["src"]
SE["index.ts"]
subgraph SF["lib"]
SG["local.strategy.ts"]
end
end
end
subgraph SH["utils"]
subgraph SI["src"]
SJ["index.ts"]
subgraph SK["lib"]
SL["email-templates.ts"]
SM["relay-connection.ts"]
SN["pagination.ts"]
end
end
end
end
subgraph SO["shared"]
subgraph SP["codegen"]
SQ["jest.config.ts"]
subgraph SR["src"]
SS["index.ts"]
subgraph ST["lib"]
subgraph SU["generated"]
SV["graphql.ts"]
end
end
end
end
subgraph SW["graphql-schema"]
SX["jest.config.ts"]
subgraph SY["src"]
SZ["index.ts"]
end
end
subgraph T0["product-sizes"]
subgraph T1["src"]
T2["index.ts"]
subgraph T3["lib"]
T4["product-sizes.ts"]
T5["product-sizes.pants-formats.spec.ts"]
T6["product-sizes.pants-label.spec.ts"]
T7["product-sizes.pants-strict.spec.ts"]
T8["product-sizes.spec.ts"]
end
end
end
subgraph T9["shared-i18n"]
subgraph TA["src"]
TB["index.ts"]
subgraph TC["lib"]
TD["language-context.tsx"]
TE["language-detector.ts"]
subgraph TF["locales"]
TG["i18n-react.tsx"]
TH["i18n-util.ts"]
TI["i18n-util.async.ts"]
subgraph TJ["en"]
TK["index.ts"]
end
subgraph TM["fa"]
TN["index.ts"]
end
TO["formatters.ts"]
TP["i18n-types.ts"]
TQ["i18n-util.sync.ts"]
TR["navigator-detector.ts"]
end
TL["site-name.ts"]
TS["table-localization.ts"]
TT["theme-provider.tsx"]
TU["use-page-title.ts"]
end
end
end
subgraph TV["validation"]
subgraph TW["src"]
TX["index.ts"]
subgraph TY["lib"]
TZ["auth.ts"]
U0["limits.ts"]
U1["primitives.ts"]
U2["auth-forms.ts"]
U3["cart.ts"]
U4["catalog.ts"]
U5["contact.ts"]
U6["errors.ts"]
U7["order.ts"]
U8["profile.ts"]
U9["seller.ts"]
UA["taxonomy.ts"]
UB["auth-forms.admin.spec.ts"]
UC["auth-forms.login.spec.ts"]
UD["auth-forms.recovery.spec.ts"]
UE["auth-forms.seller.spec.ts"]
UF["auth-forms.spec.ts"]
UG["auth.spec.ts"]
UH["cart.spec.ts"]
UI["catalog.spec.ts"]
UJ["contact.spec.ts"]
UK["errors.spec.ts"]
UL["order.spec.ts"]
UM["primitives.spec.ts"]
UN["profile.spec.ts"]
UO["seller.spec.ts"]
UP["taxonomy.spec.ts"]
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
GC-->G7
GF-->GH
GI-->GH
GJ-->GH
GO-->GQ
GQ-->GR
GS-->GQ
GT-->GQ
GU-->GR
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
JA-->JB
JE-->JG
JJ-->JL
JM-->JL
JP-->JR
JU-->JW
JU-->JX
JU-->JY
JU-->JZ
K4-->K6
K4-->K7
K7-->K6
KB-->KD
KD-->KE
KH-->KJ
KJ-->KK
KN-->KP
KN-->KR
KN-->KS
KN-->KQ
KP-->KQ
KT-->KQ
KW-->KY
KW-->KZ
KW-->L0
L0-->KZ
L1-->KY
L4-->L6
L4-->L7
L7-->L6
L8-->L7
LC-->LE
LC-->LF
LF-->LE
LI-->LK
LO-->LQ
LR-->LQ
LV-->LX
LY-->LX
M1-->M3
M4-->M3
M7-->M9
MC-->ME
MJ-->ML
MO-->MQ
MO-->MR
MU-->MW
MX-->MY
N2-->N4
N7-->N9
NC-->NE
NJ-->NL
NJ-->NM
NQ-->NS
NQ-->NT
NU-->NT
NX-->NZ
NX-->OA
NX-->O1
NX-->O5
NX-->OB
NX-->OC
NX-->OD
NX-->OE
NX-->OF
NX-->OG
NX-->O2
NX-->O6
NX-->O4
NX-->O0
NX-->OH
NX-->O7
NX-->OI
NX-->O8
NX-->O3
NX-->OJ
NX-->O9
NZ-->O0
O0-->NZ
O0-->O1
O0-->O2
O0-->O4
O0-->O7
O0-->O8
O1-->O0
O2-->O0
O2-->O3
O3-->O2
O4-->O5
O4-->O6
O4-->O0
O6-->O5
O6-->O4
O7-->O8
O7-->O9
O8-->O4
O8-->O0
O8-->O7
OA-->O0
OA-->O9
OB-->OC
OD-->O9
OE-->OC
OE-->O9
OF-->O0
OF-->O7
OH-->O9
OI-->OF
ON-->OP
ON-->OQ
ON-->OR
ON-->OS
OT-->OP
OU-->OS
OX-->OZ
OX-->P0
OX-->P1
OX-->P2
OX-->P3
OX-->P4
OX-->P5
OX-->P6
OX-->P7
OX-->P8
OX-->P9
OX-->PA
OX-->PB
P7-->P6
PE-->PG
PE-->PL
PE-->PO
PE-->PM
PE-->PQ
PE-->PS
PE-->PT
PE-->PK
PE-->PH
PE-->PU
PE-->PV
PE-->PX
PE-->PP
PE-->PY
PE-->PR
PE-->PW
PE-->PZ
PE-->Q0
PE-->PI
PE-->PN
PE-->PJ
PG-->PH
PG-->PI
PG-->PJ
PJ-->PG
PJ-->PK
PL-->PM
PL-->PN
PO-->PP
PQ-->PM
PQ-->PR
PQ-->PN
PR-->PM
PR-->PI
PR-->PN
PS-->PM
PS-->PN
PU-->PH
PU-->PI
PU-->PJ
PV-->PP
PV-->PW
PW-->PR
PW-->PI
PW-->PJ
PX-->PT
PX-->PV
PY-->PR
PY-->PN
PZ-->PW
PZ-->PJ
Q4-->Q6
Q4-->Q8
Q4-->Q9
Q4-->QA
Q4-->QB
Q4-->QC
Q4-->QD
Q4-->QE
Q4-->QF
Q4-->QG
Q4-->QH
Q4-->QI
Q4-->QJ
Q4-->QK
Q4-->QL
Q4-->QM
Q4-->QN
Q4-->Q7
Q6-->Q7
Q8-->Q7
Q9-->Q7
QA-->Q7
QB-->Q7
QD-->Q7
QE-->Q7
QH-->Q7
QI-->Q7
QK-->Q7
QN-->Q7
QO-->Q6
QO-->QN
QO-->Q7
QP-->Q6
QQ-->Q9
QQ-->Q7
QR-->QD
QR-->Q7
QS-->QE
QS-->Q7
QT-->QE
QU-->QE
QV-->QE
QW-->QF
QX-->QF
QY-->QG
QZ-->QH
QZ-->Q7
R0-->QI
R0-->Q7
R1-->Q8
R1-->QA
R1-->QB
R1-->QK
R1-->Q7
R2-->QM
R5-->QN
R6-->Q7
RA-->RC
RA-->RD
RA-->RE
RA-->RG
RA-->RH
RA-->RI
RA-->RJ
RA-->RK
RA-->RL
RA-->RM
RA-->RN
RA-->RO
RA-->RF
RA-->RP
RA-->RQ
RA-->RR
RA-->RS
RA-->RT
RA-->RU
RA-->RV
RE-->RF
RP-->RF
RQ-->RF
RW-->RC
RW-->RK
RW-->RT
RW-->RV
RX-->RC
RX-->RK
RX-->RT
RX-->RV
RY-->RE
RZ-->RE
S0-->RE
S1-->RM
S2-->RM
S3-->RF
S4-->RP
S4-->RU
S5-->RP
S5-->RU
S6-->RP
S6-->RU
S7-->RP
S7-->RU
S9-->RC
S9-->RQ
SA-->RR
SB-->RT
SE-->SG
SJ-->SL
SJ-->SM
SS-->SV
T2-->T4
T5-->T4
T6-->T4
T7-->T4
T8-->T4
TB-->TD
TB-->TE
TB-->TG
TB-->TP
TB-->TH
TB-->TI
TB-->TQ
TB-->TR
TB-->TL
TB-->TS
TB-->TT
TB-->TU
TD-->TE
TD-->TG
TD-->TI
TG-->TH
TI-->TK
TI-->TN
TI-->TO
TI-->TH
TK-->TL
TN-->TL
TQ-->TK
TQ-->TN
TQ-->TO
TQ-->TH
TS-->TG
TT-->TD
TU-->TG
TX-->TZ
TX-->U2
TX-->U3
TX-->U4
TX-->U5
TX-->U6
TX-->U0
TX-->U7
TX-->U1
TX-->U8
TX-->U9
TX-->UA
TZ-->U0
TZ-->U1
U1-->U0
U2-->TZ
U3-->U1
U7-->TZ
U7-->U3
U7-->U1
U8-->U7
UB-->U2
UC-->U2
UD-->U2
UE-->U2
UF-->U2
UG-->TZ
UH-->U3
UI-->U4
UJ-->U5
UK-->U6
UL-->U7
UM-->U0
UM-->U1
UN-->U8
UO-->U9
UP-->UA
