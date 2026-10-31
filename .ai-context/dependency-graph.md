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
3H["currency-management.rate-validation.spec.tsx"]
3I["currency-management.spec.tsx"]
end
end
end
subgraph 3J["customer-management"]
subgraph 3K["src"]
3L["index.ts"]
subgraph 3M["lib"]
3N["admin-customer-management.tsx"]
3O["admin-customer-management.spec.tsx"]
end
end
3P["vite.config.ts"]
end
subgraph 3Q["login"]
subgraph 3R["src"]
3S["index.ts"]
subgraph 3T["lib"]
3U["AdminsLogin.tsx"]
3V["AdminsLogin.spec.tsx"]
3W["AdminsLogin.zod.spec.tsx"]
end
end
end
subgraph 3X["product-editor"]
subgraph 3Y["src"]
3Z["index.spec.tsx"]
40["index.ts"]
subgraph 41["lib"]
42["AdminProductEditor.tsx"]
43["AdminProductEditor.color-validation.spec.tsx"]
44["AdminProductEditor.pants-range.spec.tsx"]
45["AdminProductEditor.spec.tsx"]
end
46["vite-env.d.ts"]
end
end
subgraph 47["products"]
subgraph 48["src"]
49["index.spec.tsx"]
4A["index.ts"]
subgraph 4B["lib"]
4C["AdminProducts.tsx"]
4D["adminProducts.hooks.ts"]
4E["adminProducts.graphql.ts"]
4F["ProductImageManagementModal.tsx"]
4G["AdminProducts.spec.tsx"]
4H["ProductImageManagementModal.pants-size.spec.tsx"]
4I["ProductImageManagementModal.spec.tsx"]
end
4J["vite-env.d.ts"]
end
end
subgraph 4K["seller-management"]
subgraph 4L["src"]
4M["index.spec.tsx"]
4N["index.ts"]
subgraph 4O["lib"]
4P["SellerManagement.tsx"]
4Q["SellerManagement.spec.tsx"]
end
4R["vite-env.d.ts"]
end
end
subgraph 4S["translation-management"]
subgraph 4T["src"]
4U["index.ts"]
subgraph 4V["lib"]
4W["AdminTranslationManagement.tsx"]
4X["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4Y["unauthorized"]
subgraph 4Z["src"]
50["index.spec.tsx"]
51["index.ts"]
subgraph 52["lib"]
53["admins-unauthorized-screen.tsx"]
54["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 55["zustand"]
subgraph 56["admins-products-store"]
subgraph 57["src"]
58["index.spec.ts"]
59["index.ts"]
subgraph 5A["lib"]
5B["admins-products-store.ts"]
5C["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 5D["customers"]
subgraph 5E["components"]
subgraph 5F["footer"]
subgraph 5G["src"]
5H["index.ts"]
subgraph 5I["lib"]
5J["customers-footer.tsx"]
5K["TrustBadgeIcons.tsx"]
5L["customers-footer.spec.tsx"]
end
end
end
subgraph 5M["headerbar"]
subgraph 5N["src"]
5O["index.ts"]
subgraph 5P["lib"]
5Q["CustomersHeaderbar.tsx"]
5R["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5S["layout"]
subgraph 5T["src"]
5U["index.ts"]
subgraph 5V["lib"]
5W["CustomersLayout.tsx"]
5X["CustomersTabbar.tsx"]
5Y["CustomersLayout.spec.tsx"]
5Z["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 60["product-card"]
subgraph 61["src"]
62["index.ts"]
subgraph 63["lib"]
64["CustomersProductCard.tsx"]
65["CustomersProductCard.no-low-stock.spec.tsx"]
66["CustomersProductCard.pants-size.spec.tsx"]
67["CustomersProductCard.spec.tsx"]
end
68["vite-env.d.ts"]
end
end
end
subgraph 69["contexts"]
subgraph 6A["auth"]
subgraph 6B["src"]
6C["index.ts"]
subgraph 6D["lib"]
6E["CustomersAuthContext.tsx"]
6F["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6G["graphql"]
subgraph 6H["src"]
6I["index.ts"]
subgraph 6J["lib"]
6K["customer-profile.queries.ts"]
6L["mutations.ts"]
6M["Provider.tsx"]
6N["CustomersApolloProvider.tsx"]
6O["client.ts"]
6P["queries.ts"]
6Q["apollo-upload-client.d.ts"]
end
end
end
subgraph 6R["hooks"]
subgraph 6S["auth"]
subgraph 6T["src"]
6U["index.ts"]
subgraph 6V["lib"]
6W["useCustomersForgotPassword.tsx"]
6X["useCustomersLogin.tsx"]
6Y["useCustomersRegister.tsx"]
6Z["useCustomersResetPassword.tsx"]
70["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 71["cart"]
72["jest.config.ts"]
73["jest.setup.ts"]
subgraph 74["src"]
75["index.ts"]
subgraph 76["lib"]
77["customers-cart-hook.tsx"]
78["useCartService.ts"]
79["useWishlistSync.ts"]
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
7R["ScrollToTop.tsx"]
7S["CustomersRouter.spec.tsx"]
7T["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7U["routes"]
subgraph 7V["src"]
7W["index.ts"]
subgraph 7X["lib"]
7Y["customer-routes.ts"]
7Z["customer-routes.spec.ts"]
end
end
end
subgraph 80["screens"]
subgraph 81["contact"]
subgraph 82["src"]
83["index.ts"]
subgraph 84["lib"]
85["customer-contact.tsx"]
86["customer-contact.spec.tsx"]
87["customer-contact.validation.spec.tsx"]
end
end
88["vite.config.ts"]
end
subgraph 89["customer-checkout"]
subgraph 8A["src"]
8B["index.ts"]
subgraph 8C["lib"]
8D["customer-checkout.tsx"]
end
end
end
subgraph 8E["customer-favorites"]
subgraph 8F["src"]
8G["index.ts"]
subgraph 8H["lib"]
8I["customer-favorites.tsx"]
8J["customer-favorites.shared-card.spec.tsx"]
8K["customer-favorites.spec.tsx"]
end
end
8L["vite.config.ts"]
end
subgraph 8M["customer-login"]
subgraph 8N["src"]
8O["index.ts"]
subgraph 8P["lib"]
8Q["customer-login.tsx"]
end
end
end
subgraph 8R["customer-order-confirmation"]
subgraph 8S["src"]
8T["index.ts"]
subgraph 8U["lib"]
8V["customer-order-confirmation.tsx"]
8W["customer-order-confirmation.pants-size.spec.tsx"]
8X["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8Y["customer-orders"]
subgraph 8Z["src"]
90["index.ts"]
subgraph 91["lib"]
92["customer-orders.tsx"]
end
end
end
subgraph 93["customer-payment"]
subgraph 94["src"]
95["index.ts"]
subgraph 96["lib"]
97["customer-payment-callback.tsx"]
98["use-zarinpal-payment.tsx"]
99["zarinpal-payment-service.ts"]
9A["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 9B["customer-products"]
subgraph 9C["src"]
9D["index.ts"]
subgraph 9E["lib"]
9F["customer-products.tsx"]
end
end
end
subgraph 9G["customer-profile"]
subgraph 9H["src"]
9I["index.ts"]
subgraph 9J["lib"]
9K["customer-profile.tsx"]
9L["customer-profile.spec.tsx"]
9M["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9N["customer-shopping-cart"]
subgraph 9O["src"]
9P["index.ts"]
subgraph 9Q["lib"]
9R["customer-shopping-cart.tsx"]
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
D3["shipping-validation.shared.spec.ts"]
D4["shipping-validation.spec.tsx"]
D5["shipping-validation.tsx"]
end
end
end
subgraph D6["zustand"]
subgraph D7["customer-cart-store"]
subgraph D8["src"]
D9["index.ts"]
subgraph DA["lib"]
DB["customer-cart-store.ts"]
DC["customer-cart-store.spec.ts"]
DD["customer-cart-store.tsx"]
end
end
end
subgraph DE["customer-checkout-store"]
subgraph DF["src"]
DG["index.ts"]
subgraph DH["lib"]
DI["customer-checkout-store.ts"]
DJ["customer-checkout-store.spec.ts"]
end
end
DK["vite.config.ts"]
end
subgraph DL["customer-wishlist-store"]
subgraph DM["src"]
DN["index.ts"]
subgraph DO["lib"]
DP["customer-wishlist-store.ts"]
DQ["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DR["src"]
DS["index.ts"]
subgraph DT["lib"]
DU["customers-products-store.tsx"]
end
end
end
end
subgraph DV["sellers"]
subgraph DW["components"]
subgraph DX["footer"]
subgraph DY["src"]
DZ["index.ts"]
subgraph E0["lib"]
E1["sellers-footer.tsx"]
E2["sellers-footer.spec.tsx"]
end
end
end
subgraph E3["headerbar"]
subgraph E4["src"]
E5["index.ts"]
subgraph E6["lib"]
E7["SellersHeaderbar.tsx"]
end
end
end
subgraph E8["layout"]
subgraph E9["src"]
EA["index.ts"]
subgraph EB["lib"]
EC["SellersLayout.tsx"]
ED["SellersTabbar.tsx"]
end
end
end
end
subgraph EE["contexts"]
subgraph EF["auth"]
subgraph EG["src"]
EH["index.ts"]
subgraph EI["lib"]
EJ["SellersAuthContext.tsx"]
EK["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph EL["graphql"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["fragments.ts"]
EQ["mutations.ts"]
ER["Provider.tsx"]
ES["SellersApolloProvider.tsx"]
ET["client.ts"]
EU["queries.ts"]
EV["seller-orders.graphql.ts"]
EW["apollo-upload-client.d.ts"]
end
subgraph EX["types"]
EY["apollo-upload-client.d.ts"]
end
end
end
subgraph EZ["hooks"]
subgraph F0["auth"]
subgraph F1["src"]
F2["index.ts"]
subgraph F3["lib"]
F4["useSellerAuth.ts"]
F5["sellerAuth.graphql.ts"]
end
end
end
subgraph F6["orders"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["useSellerOrders.ts"]
FB["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph FC["products"]
subgraph FD["src"]
FE["index.ts"]
subgraph FF["lib"]
FG["useSellersProductManagement.ts"]
FH["useSellersProducts.ts"]
end
end
end
end
subgraph FI["router"]
subgraph FJ["src"]
FK["index.ts"]
subgraph FL["lib"]
FM["SellersRouter.tsx"]
end
end
end
subgraph FN["routes"]
subgraph FO["src"]
FP["index.ts"]
subgraph FQ["lib"]
FR["seller-routes.ts"]
end
end
end
subgraph FS["screens"]
subgraph FT["catalog"]
subgraph FU["src"]
FV["index.ts"]
subgraph FW["lib"]
FX["SellersCatalogScreens.tsx"]
FY["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FZ["login"]
subgraph G0["src"]
G1["index.ts"]
subgraph G2["lib"]
G3["SellersLogin.tsx"]
G4["SellersLogin.zod.spec.tsx"]
end
end
end
subgraph G5["manage-product"]
subgraph G6["src"]
G7["index.ts"]
subgraph G8["lib"]
G9["SellersManageProductScreen.tsx"]
GA["SellersDefineProductFlow.tsx"]
GB["SellersDefineProductFlow.pants-label.spec.tsx"]
GC["SellersDefineProductFlow.spec.tsx"]
GD["SellersManageProductScreen.spec.tsx"]
GE["SellersManageProductScreen.zod-validation.spec.tsx"]
end
end
end
subgraph GF["products"]
subgraph GG["src"]
GH["index.ts"]
subgraph GI["lib"]
GJ["SellersProducts.tsx"]
GK["SellersProducts.pants-label.spec.tsx"]
GL["SellersProducts.spec.tsx"]
end
end
end
subgraph GM["seller-orders"]
GN["jest.config.ts"]
GO["jest.setup.ts"]
subgraph GP["src"]
GQ["index.ts"]
subgraph GR["lib"]
GS["seller-orders-screen.tsx"]
GT["seller-status-transitions.ts"]
GU["seller-orders-screen.pants-size.spec.tsx"]
GV["seller-orders-screen.spec.tsx"]
GW["seller-status-transitions.spec.ts"]
end
GX["test-setup.ts"]
end
end
subgraph GY["setup-password"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["SellersSetupPassword.tsx"]
H3["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H4["unauthorized"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph H9["zustand"]
subgraph HA["sellers-products-store"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["useSellersProductsStore.ts"]
HF["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HG["shared"]
subgraph HH["components"]
subgraph HI["apollo-provider-base"]
subgraph HJ["src"]
HK["index.ts"]
subgraph HL["lib"]
HM["ApolloProviderBase.tsx"]
HN["createSilentRefreshAuthLink.ts"]
HO["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HP["error-boundary"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["error-boundary.tsx"]
HU["error-boundary.spec.tsx"]
end
end
HV["vite.config.ts"]
end
subgraph HW["glassmorphism-container"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["glassmorphism-container.tsx"]
I1["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I2["layout"]
subgraph I3["src"]
I4["index.ts"]
subgraph I5["lib"]
I6["Layout.tsx"]
end
end
end
subgraph I7["material-data-table"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["material-data-table.tsx"]
IC["table-config.ts"]
ID["table-utils.ts"]
IE["material-data-table.spec.tsx"]
IF["table-types.ts"]
end
end
end
subgraph IG["order-status-chip"]
subgraph IH["src"]
II["index.ts"]
subgraph IJ["lib"]
IK["order-status-chip.tsx"]
IL["order-status-chip.spec.tsx"]
end
end
end
subgraph IM["password-field"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["PasswordTextField.tsx"]
end
end
end
subgraph IR["price-display"]
subgraph IS["src"]
IT["index.ts"]
subgraph IU["lib"]
IV["price-display.tsx"]
IW["price-display.spec.tsx"]
end
end
end
subgraph IX["private-route"]
subgraph IY["src"]
IZ["index.ts"]
subgraph J0["lib"]
J1["createPrivateRoute.tsx"]
J2["PrivateRoute.tsx"]
end
end
end
subgraph J3["rtl-table-utils"]
subgraph J4["src"]
J5["index.ts"]
subgraph J6["lib"]
J7["rtl-table-utils.ts"]
J8["rtl-cell-components.tsx"]
J9["rtl-column-helpers.ts"]
JA["rtl-table-props.ts"]
JB["use-table-alignment.ts"]
JC["rtl-table-utils.spec.tsx"]
JD["rtl-table-utils.tsx"]
end
end
end
subgraph JE["snackbar"]
subgraph JF["src"]
JG["index.ts"]
subgraph JH["lib"]
JI["snackbar.tsx"]
end
end
end
subgraph JJ["styled-drawer"]
subgraph JK["src"]
JL["index.ts"]
subgraph JM["lib"]
JN["styled-drawer.tsx"]
JO["styled-drawer.spec.tsx"]
end
end
end
subgraph JP["unauthorized"]
subgraph JQ["src"]
JR["index.ts"]
subgraph JS["lib"]
JT["unauthorized-path.tsx"]
end
end
end
end
subgraph JU["graphql"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["currency.mutations.ts"]
JZ["currency.queries.ts"]
K0["fragments.ts"]
K1["variant-colors.ts"]
K2["client-shared-graphql.tsx"]
end
end
end
subgraph K3["hooks"]
subgraph K4["brands"]
subgraph K5["src"]
K6["index.ts"]
subgraph K7["lib"]
K8["brands.graphql.ts"]
K9["useBrands.ts"]
end
end
KA["vite.config.ts"]
end
subgraph KB["categories"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["useCategories.ts"]
KG["categories.graphql.ts"]
end
end
end
subgraph KH["colors"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["useColors.ts"]
KM["color.graphql.ts"]
end
end
end
subgraph KN["currency"]
subgraph KO["src"]
KP["index.ts"]
subgraph KQ["lib"]
KR["useConvertPrice.tsx"]
KS["useExchangeRate.tsx"]
KT["useCurrencies.tsx"]
KU["useCurrencyForLocale.tsx"]
KV["useExchangeRate.spec.tsx"]
end
end
end
subgraph KW["products"]
subgraph KX["src"]
KY["index.ts"]
subgraph KZ["lib"]
L0["productImage.ts"]
L1["products.graphql.ts"]
L2["useProducts.ts"]
L3["productImage.spec.ts"]
end
end
end
subgraph L4["site-languages"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["site-languages.graphql.ts"]
L9["useSiteLanguages.ts"]
LA["site-languages-hook.spec.tsx"]
end
end
LB["vite.config.ts"]
end
subgraph LC["snackbar"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["SnackbarContext.tsx"]
LH["useSnackbar.ts"]
end
end
end
subgraph LI["translations-management-hook"]
subgraph LJ["src"]
LK["index.ts"]
subgraph LL["lib"]
LM["useTranslationsManagement.ts"]
end
end
end
end
subgraph LN["lottie"]
subgraph LO["empty-cart"]
subgraph LP["src"]
LQ["index.ts"]
subgraph LR["lib"]
LS["lottie-empty-cart.tsx"]
LT["lottie-empty-cart.spec.tsx"]
end
end
LU["vite.config.ts"]
end
subgraph LV["loading"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["lottie-loading.tsx"]
M0["lottie-loading.spec.tsx"]
end
end
end
subgraph M1["success-check"]
subgraph M2["src"]
M3["index.ts"]
subgraph M4["lib"]
M5["lottie-success-check.tsx"]
M6["lottie-success-check.spec.tsx"]
end
end
end
subgraph M7["unauthorized"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MC["translations"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["mapApolloErrorToTranslationKey.ts"]
MH["WrapTranslation.tsx"]
end
end
end
subgraph MI["ui"]
subgraph MJ["colors"]
subgraph MK["src"]
ML["index.ts"]
subgraph MM["lib"]
MN["colors.ts"]
end
end
end
subgraph MO["language-components"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["language-components.tsx"]
MT["ltr-text-field.tsx"]
end
end
end
subgraph MU["sizes"]
subgraph MV["src"]
MW["index.ts"]
subgraph MX["lib"]
MY["sizes.ts"]
MZ["sizes.spec.tsx"]
N0["sizes.tsx"]
end
end
end
end
subgraph N1["zustand"]
subgraph N2["shared-auth-store"]
subgraph N3["src"]
N4["index.ts"]
subgraph N5["lib"]
N6["shared-auth-store.ts"]
end
end
end
subgraph N7["shared-notification-store"]
subgraph N8["src"]
N9["index.ts"]
subgraph NA["lib"]
NB["shared-notification-store.tsx"]
end
end
end
subgraph NC["shared-ui-store"]
subgraph ND["src"]
NE["index.ts"]
subgraph NF["lib"]
NG["shared-ui-store.ts"]
NH["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph NI["server"]
subgraph NJ["controllers"]
subgraph NK["src"]
NL["index.ts"]
subgraph NM["lib"]
NN["auth.controller.ts"]
NO["order.controller.ts"]
end
end
end
subgraph NP["decorators"]
NQ["jest.config.ts"]
subgraph NR["src"]
NS["index.ts"]
subgraph NT["lib"]
NU["current-user.decorator.ts"]
NV["decorators.ts"]
NW["decorators.spec.ts"]
end
end
end
subgraph NX["entities"]
subgraph NY["src"]
NZ["index.ts"]
subgraph O0["lib"]
O1["brand.entity.ts"]
O2["product.entity.ts"]
O3["category.entity.ts"]
O4["product-description.entity.ts"]
O5["site-language.entity.ts"]
O6["product-info.entity.ts"]
O7["color.entity.ts"]
O8["product-info-color.entity.ts"]
O9["seller-info.entity.ts"]
OA["seller-product.entity.ts"]
OB["user.entity.ts"]
OC["cart.entity.ts"]
OD["currency-preference.entity.ts"]
OE["currency.entity.ts"]
OF["customer.entity.ts"]
OG["exchange-rate.entity.ts"]
OH["order.entity.ts"]
OI["platform-settings.entity.ts"]
OJ["refresh-token.entity.ts"]
OK["seller-order.entity.ts"]
OL["translation.entity.ts"]
end
end
end
subgraph OM["guards"]
ON["jest.config.ts"]
subgraph OO["src"]
OP["index.ts"]
subgraph OQ["lib"]
OR["catalog.guard.ts"]
OS["graphql-auth.guard.ts"]
OT["http-auth.guard.ts"]
OU["roles.guard.ts"]
OV["catalog.guard.spec.ts"]
OW["roles.guard.spec.ts"]
end
end
end
subgraph OX["inputs"]
subgraph OY["src"]
OZ["index.ts"]
subgraph P0["lib"]
P1["brand.input.ts"]
P2["cart.inputs.ts"]
P3["category.input.ts"]
P4["color.input.ts"]
P5["customer-auth.inputs.ts"]
P6["order-pagination.inputs.ts"]
P7["order.inputs.ts"]
P8["product-info-filter.input.ts"]
P9["product.input.ts"]
PA["seller-order-pagination.inputs.ts"]
PB["seller.input.ts"]
PC["site-language.input.ts"]
PD["user.input.ts"]
end
end
end
subgraph PE["modules"]
subgraph PF["src"]
PG["index.ts"]
subgraph PH["lib"]
PI["auth.module.ts"]
PJ["email.module.ts"]
PK["token.module.ts"]
PL["user.module.ts"]
PM["customer-profile.module.ts"]
PN["brand.module.ts"]
PO["catalog-guard.module.ts"]
PP["translation.module.ts"]
PQ["cart.module.ts"]
PR["platform-settings.module.ts"]
PS["category.module.ts"]
PT["product.module.ts"]
PU["color.module.ts"]
PV["currency.module.ts"]
PW["graphql-context.module.ts"]
PX["order.module.ts"]
PY["seller-info.module.ts"]
PZ["payment.module.ts"]
Q0["product-info.module.ts"]
Q1["seller-products.module.ts"]
Q2["site-language.module.ts"]
end
end
end
subgraph Q3["resolvers"]
Q4["jest.config.ts"]
subgraph Q5["src"]
Q6["index.ts"]
subgraph Q7["lib"]
Q8["auth.resolver.ts"]
Q9["zod-validation.pipe.ts"]
QA["brand.resolver.ts"]
QB["cart.resolver.ts"]
QC["category.resolver.ts"]
QD["color.resolver.ts"]
QE["currency.resolver.ts"]
QF["customer-profile.resolver.ts"]
QG["order.resolver.ts"]
QH["payment.resolver.ts"]
QI["product-info.resolver.ts"]
QJ["product.resolver.ts"]
QK["seller-info.resolver.ts"]
QL["shipping.resolver.ts"]
QM["site-language.resolver.ts"]
QN["translation.input.ts"]
QO["translation.resolver.ts"]
QP["user.resolver.ts"]
QQ["auth-validation.spec.ts"]
QR["auth.resolver.spec.ts"]
QS["cart-validation.spec.ts"]
QT["currency-translation-validation.spec.ts"]
QU["customer-profile-validation.spec.ts"]
QV["order-validation.spec.ts"]
QW["order.resolver.spec.ts"]
QX["order.resolver.status-transitions.spec.ts"]
QY["order.resolver.tracking.spec.ts"]
QZ["payment.resolver.integration.spec.ts"]
R0["payment.resolver.spec.ts"]
R1["product-info.resolver.spec.ts"]
R2["product-validation.spec.ts"]
R3["seller-info-validation.spec.ts"]
R4["taxonomy-validation.spec.ts"]
R5["translation.resolver.guards.spec.ts"]
subgraph R6["types"]
R7["graphql-upload.d.ts"]
end
R8["user.resolver.spec.ts"]
R9["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RA["services"]
RB["jest.config.ts"]
subgraph RC["src"]
RD["index.ts"]
subgraph RE["lib"]
RF["auth.service.ts"]
RG["brand.service.ts"]
RH["cart.service.ts"]
RI["product-info-colors.util.ts"]
RJ["category.service.ts"]
RK["color.service.ts"]
RL["currency.service.ts"]
RM["customer-profile.service.ts"]
RN["email.service.ts"]
RO["image-upload.service.ts"]
RP["order.service.ts"]
RQ["payment-logger.service.ts"]
RR["payment.service.ts"]
RS["product.service.ts"]
RT["seller-info.service.ts"]
RU["shipping-calculation.service.ts"]
RV["site-language.service.ts"]
RW["token.service.ts"]
RX["translation.service.ts"]
RY["user.service.ts"]
RZ["auth.service.password-policy.spec.ts"]
S0["auth.service.spec.ts"]
S1["cart.service.add-quantity.spec.ts"]
S2["cart.service.null-relations.spec.ts"]
S3["cart.service.spec.ts"]
S4["order.service.spec.ts"]
S5["order.service.tracking.spec.ts"]
S6["product-info-colors.util.spec.ts"]
S7["product.service.multi-filters.spec.ts"]
S8["product.service.only-discounted.spec.ts"]
S9["product.service.pants.spec.ts"]
SA["product.service.spec.ts"]
SB["relay-connection.spec.ts"]
SC["seller-info.service.price-validation.spec.ts"]
SD["shipping-calculation.service.spec.ts"]
SE["token.service.spec.ts"]
end
end
end
subgraph SF["strategies"]
subgraph SG["src"]
SH["index.ts"]
subgraph SI["lib"]
SJ["local.strategy.ts"]
end
end
end
subgraph SK["utils"]
subgraph SL["src"]
SM["index.ts"]
subgraph SN["lib"]
SO["email-templates.ts"]
SP["relay-connection.ts"]
SQ["pagination.ts"]
end
end
end
end
subgraph SR["shared"]
subgraph SS["codegen"]
ST["jest.config.ts"]
subgraph SU["src"]
SV["index.ts"]
subgraph SW["lib"]
subgraph SX["generated"]
SY["graphql.ts"]
end
end
end
end
subgraph SZ["graphql-schema"]
T0["jest.config.ts"]
subgraph T1["src"]
T2["index.ts"]
end
end
subgraph T3["product-sizes"]
subgraph T4["src"]
T5["index.ts"]
subgraph T6["lib"]
T7["product-sizes.ts"]
T8["product-sizes.pants-formats.spec.ts"]
T9["product-sizes.pants-label.spec.ts"]
TA["product-sizes.pants-strict.spec.ts"]
TB["product-sizes.spec.ts"]
end
end
end
subgraph TC["shared-i18n"]
subgraph TD["src"]
TE["index.ts"]
subgraph TF["lib"]
TG["language-context.tsx"]
TH["language-detector.ts"]
subgraph TI["locales"]
TJ["i18n-react.tsx"]
TK["i18n-util.ts"]
TL["i18n-util.async.ts"]
subgraph TM["en"]
TN["index.ts"]
end
subgraph TP["fa"]
TQ["index.ts"]
end
TR["formatters.ts"]
TS["i18n-types.ts"]
TT["i18n-util.sync.ts"]
TU["navigator-detector.ts"]
end
TO["site-name.ts"]
TV["table-localization.ts"]
TW["theme-provider.tsx"]
TX["use-page-title.ts"]
end
end
end
subgraph TY["validation"]
subgraph TZ["src"]
U0["index.ts"]
subgraph U1["lib"]
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
UE["seller.ts"]
UF["auth-forms.admin.spec.ts"]
UG["auth-forms.login.spec.ts"]
UH["auth-forms.recovery.spec.ts"]
UI["auth-forms.seller.spec.ts"]
UJ["auth-forms.spec.ts"]
UK["auth.spec.ts"]
UL["cart.spec.ts"]
UM["catalog.spec.ts"]
UN["contact.spec.ts"]
UO["currency.spec.ts"]
UP["errors.spec.ts"]
UQ["order.spec.ts"]
UR["primitives.spec.ts"]
US["profile.spec.ts"]
UT["seller.spec.ts"]
UU["taxonomy.spec.ts"]
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
3I-->3G
3L-->3N
3O-->3N
3S-->3U
3V-->3U
3W-->3U
3Z-->40
40-->42
43-->42
44-->42
45-->42
49-->4A
4A-->4C
4C-->4D
4C-->4F
4D-->4E
4G-->4C
4H-->4F
4M-->4N
4N-->4P
4Q-->4P
4U-->4W
4W-->4X
50-->51
51-->53
54-->53
58-->59
59-->5B
5C-->5B
5H-->5J
5H-->5K
5J-->5K
5L-->5J
5O-->5Q
5R-->5Q
5U-->5W
5U-->5X
5W-->5X
5Y-->5W
5Z-->5X
62-->64
65-->64
66-->64
67-->64
6C-->6E
6F-->6E
6I-->6K
6I-->6L
6I-->6M
6I-->6P
6M-->6N
6N-->6O
6U-->6W
6U-->6X
6U-->6Y
6U-->6Z
70-->6X
75-->77
75-->78
75-->79
7A-->78
7B-->77
7E-->7G
7J-->7L
7O-->7Q
7O-->7R
7Q-->7R
7S-->7Q
7T-->7R
7W-->7Y
7Z-->7Y
83-->85
86-->85
87-->85
8B-->8D
8G-->8I
8J-->8I
8K-->8I
8O-->8Q
8T-->8V
8W-->8V
8X-->8V
90-->92
95-->97
95-->98
95-->99
97-->98
98-->99
9A-->97
9D-->9F
9I-->9K
9L-->9K
9M-->9K
9P-->9R
9S-->9R
9T-->9R
9U-->9R
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
D3-->D2
D4-->D2
D4-->D5
D9-->DB
DC-->DB
DG-->DI
DJ-->DI
DN-->DP
DQ-->DP
DS-->DU
DZ-->E1
E2-->E1
E5-->E7
EA-->EC
EA-->ED
EC-->ED
EH-->EJ
EK-->EJ
EN-->EP
EN-->EQ
EN-->ER
EN-->EU
ER-->ES
ES-->ET
EU-->EP
EU-->EV
F2-->F4
F4-->F5
F8-->FA
FE-->FG
FE-->FH
FK-->FM
FP-->FR
FV-->FX
FY-->FX
G1-->G3
G4-->G3
G7-->G9
G9-->GA
GB-->GA
GC-->GA
GD-->G9
GE-->G9
GH-->GJ
GK-->GJ
GL-->GJ
GQ-->GS
GS-->GT
GU-->GS
GV-->GS
GW-->GT
H0-->H2
H3-->H2
H6-->H8
HC-->HE
HK-->HM
HK-->HN
HO-->HN
HR-->HT
HU-->HT
HY-->I0
I1-->I0
I4-->I6
I9-->IB
I9-->IC
I9-->ID
IB-->IC
IE-->IB
II-->IK
IL-->IK
IO-->IQ
IT-->IV
IW-->IV
IZ-->J1
J1-->J2
J5-->J7
J7-->J8
J7-->J9
J7-->JA
J7-->JB
J9-->J8
J9-->JA
JC-->JD
JG-->JI
JL-->JN
JO-->JN
JR-->JT
JW-->JY
JW-->JZ
JW-->K0
JW-->K1
K6-->K8
K6-->K9
K9-->K8
KD-->KF
KF-->KG
KJ-->KL
KL-->KM
KP-->KR
KP-->KT
KP-->KU
KP-->KS
KR-->KS
KV-->KS
KY-->L0
KY-->L1
KY-->L2
L2-->L1
L3-->L0
L6-->L8
L6-->L9
L9-->L8
LA-->L9
LE-->LG
LE-->LH
LH-->LG
LK-->LM
LQ-->LS
LT-->LS
LX-->LZ
M0-->LZ
M3-->M5
M6-->M5
M9-->MB
ME-->MG
ML-->MN
MQ-->MS
MQ-->MT
MW-->MY
MZ-->N0
N4-->N6
N9-->NB
NE-->NG
NL-->NN
NL-->NO
NS-->NU
NS-->NV
NW-->NV
NZ-->O1
NZ-->OC
NZ-->O3
NZ-->O7
NZ-->OD
NZ-->OE
NZ-->OF
NZ-->OG
NZ-->OH
NZ-->OI
NZ-->O4
NZ-->O8
NZ-->O6
NZ-->O2
NZ-->OJ
NZ-->O9
NZ-->OK
NZ-->OA
NZ-->O5
NZ-->OL
NZ-->OB
O1-->O2
O2-->O1
O2-->O3
O2-->O4
O2-->O6
O2-->O9
O2-->OA
O3-->O2
O4-->O2
O4-->O5
O5-->O4
O6-->O7
O6-->O8
O6-->O2
O8-->O7
O8-->O6
O9-->OA
O9-->OB
OA-->O6
OA-->O2
OA-->O9
OC-->O2
OC-->OB
OD-->OE
OF-->OB
OG-->OE
OG-->OB
OH-->O2
OH-->O9
OJ-->OB
OK-->OH
OP-->OR
OP-->OS
OP-->OT
OP-->OU
OV-->OR
OW-->OU
OZ-->P1
OZ-->P2
OZ-->P3
OZ-->P4
OZ-->P5
OZ-->P6
OZ-->P7
OZ-->P8
OZ-->P9
OZ-->PA
OZ-->PB
OZ-->PC
OZ-->PD
P9-->P8
PG-->PI
PG-->PN
PG-->PQ
PG-->PO
PG-->PS
PG-->PU
PG-->PV
PG-->PM
PG-->PJ
PG-->PW
PG-->PX
PG-->PZ
PG-->PR
PG-->Q0
PG-->PT
PG-->PY
PG-->Q1
PG-->Q2
PG-->PK
PG-->PP
PG-->PL
PI-->PJ
PI-->PK
PI-->PL
PL-->PI
PL-->PM
PN-->PO
PN-->PP
PQ-->PR
PS-->PO
PS-->PT
PS-->PP
PT-->PO
PT-->PK
PT-->PP
PU-->PO
PU-->PP
PW-->PJ
PW-->PK
PW-->PL
PX-->PR
PX-->PY
PY-->PT
PY-->PK
PY-->PL
PZ-->PV
PZ-->PX
Q0-->PT
Q0-->PP
Q1-->PY
Q1-->PL
Q6-->Q8
Q6-->QA
Q6-->QB
Q6-->QC
Q6-->QD
Q6-->QE
Q6-->QF
Q6-->QG
Q6-->QH
Q6-->QI
Q6-->QJ
Q6-->QK
Q6-->QL
Q6-->QM
Q6-->QN
Q6-->QO
Q6-->QP
Q6-->Q9
Q8-->Q9
QA-->Q9
QB-->Q9
QC-->Q9
QD-->Q9
QE-->Q9
QF-->Q9
QG-->Q9
QJ-->Q9
QK-->Q9
QM-->Q9
QO-->Q9
QP-->Q9
QQ-->Q8
QQ-->QP
QQ-->Q9
QR-->Q8
QS-->QB
QS-->Q9
QT-->QE
QT-->QO
QT-->Q9
QU-->QF
QU-->Q9
QV-->QG
QV-->Q9
QW-->QG
QX-->QG
QY-->QG
QZ-->QH
R0-->QH
R1-->QI
R2-->QJ
R2-->Q9
R3-->QK
R3-->Q9
R4-->QA
R4-->QC
R4-->QD
R4-->QM
R4-->Q9
R5-->QO
R8-->QP
R9-->Q9
RD-->RF
RD-->RG
RD-->RH
RD-->RJ
RD-->RK
RD-->RL
RD-->RM
RD-->RN
RD-->RO
RD-->RP
RD-->RQ
RD-->RR
RD-->RI
RD-->RS
RD-->RT
RD-->RU
RD-->RV
RD-->RW
RD-->RX
RD-->RY
RH-->RI
RS-->RI
RT-->RI
RZ-->RF
RZ-->RN
RZ-->RW
RZ-->RY
S0-->RF
S0-->RN
S0-->RW
S0-->RY
S1-->RH
S2-->RH
S3-->RH
S4-->RP
S5-->RP
S6-->RI
S7-->RS
S7-->RX
S8-->RS
S8-->RX
S9-->RS
S9-->RX
SA-->RS
SA-->RX
SC-->RF
SC-->RT
SD-->RU
SE-->RW
SH-->SJ
SM-->SO
SM-->SP
SV-->SY
T5-->T7
T8-->T7
T9-->T7
TA-->T7
TB-->T7
TE-->TG
TE-->TH
TE-->TJ
TE-->TS
TE-->TK
TE-->TL
TE-->TT
TE-->TU
TE-->TO
TE-->TV
TE-->TW
TE-->TX
TG-->TH
TG-->TJ
TG-->TL
TJ-->TK
TL-->TN
TL-->TQ
TL-->TR
TL-->TK
TN-->TO
TQ-->TO
TT-->TN
TT-->TQ
TT-->TR
TT-->TK
TV-->TJ
TW-->TG
TX-->TJ
U0-->U2
U0-->U5
U0-->U6
U0-->U7
U0-->U8
U0-->U9
U0-->UB
U0-->U3
U0-->UC
U0-->U4
U0-->UD
U0-->UE
U0-->UA
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
UF-->U5
UG-->U5
UH-->U5
UI-->U5
UJ-->U5
UK-->U2
UL-->U6
UM-->U7
UN-->U8
UO-->U9
UP-->UB
UQ-->UC
UR-->U3
UR-->U4
US-->UD
UT-->UE
UU-->UA
