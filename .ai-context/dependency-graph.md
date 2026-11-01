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
3B["admin-seller-orders.status-schema.spec.ts"]
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
4Q["SellerManagement.form-validation.spec.tsx"]
4R["SellerManagement.spec.tsx"]
end
4S["vite-env.d.ts"]
end
end
subgraph 4T["translation-management"]
subgraph 4U["src"]
4V["index.ts"]
subgraph 4W["lib"]
4X["AdminTranslationManagement.tsx"]
4Y["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4Z["unauthorized"]
subgraph 50["src"]
51["index.spec.tsx"]
52["index.ts"]
subgraph 53["lib"]
54["admins-unauthorized-screen.tsx"]
55["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 56["zustand"]
subgraph 57["admins-products-store"]
subgraph 58["src"]
59["index.spec.ts"]
5A["index.ts"]
subgraph 5B["lib"]
5C["admins-products-store.ts"]
5D["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 5E["customers"]
subgraph 5F["components"]
subgraph 5G["footer"]
subgraph 5H["src"]
5I["index.ts"]
subgraph 5J["lib"]
5K["customers-footer.tsx"]
5L["TrustBadgeIcons.tsx"]
5M["customers-footer.spec.tsx"]
end
end
end
subgraph 5N["headerbar"]
subgraph 5O["src"]
5P["index.ts"]
subgraph 5Q["lib"]
5R["CustomersHeaderbar.tsx"]
5S["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5T["layout"]
subgraph 5U["src"]
5V["index.ts"]
subgraph 5W["lib"]
5X["CustomersLayout.tsx"]
5Y["CustomersTabbar.tsx"]
5Z["CustomersLayout.spec.tsx"]
60["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 61["product-card"]
subgraph 62["src"]
63["index.ts"]
subgraph 64["lib"]
65["CustomersProductCard.tsx"]
66["CustomersProductCard.no-low-stock.spec.tsx"]
67["CustomersProductCard.pants-size.spec.tsx"]
68["CustomersProductCard.spec.tsx"]
end
69["vite-env.d.ts"]
end
end
end
subgraph 6A["contexts"]
subgraph 6B["auth"]
subgraph 6C["src"]
6D["index.ts"]
subgraph 6E["lib"]
6F["CustomersAuthContext.tsx"]
6G["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6H["graphql"]
subgraph 6I["src"]
6J["index.ts"]
subgraph 6K["lib"]
6L["customer-profile.queries.ts"]
6M["mutations.ts"]
6N["Provider.tsx"]
6O["CustomersApolloProvider.tsx"]
6P["client.ts"]
6Q["queries.ts"]
6R["apollo-upload-client.d.ts"]
end
end
end
subgraph 6S["hooks"]
subgraph 6T["auth"]
subgraph 6U["src"]
6V["index.ts"]
subgraph 6W["lib"]
6X["useCustomersForgotPassword.tsx"]
6Y["useCustomersLogin.tsx"]
6Z["useCustomersRegister.tsx"]
70["useCustomersResetPassword.tsx"]
71["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 72["cart"]
73["jest.config.ts"]
74["jest.setup.ts"]
subgraph 75["src"]
76["index.ts"]
subgraph 77["lib"]
78["customers-cart-hook.tsx"]
79["useCartService.ts"]
7A["useWishlistSync.ts"]
7B["useCartService.spec.tsx"]
7C["useCartSync.ts"]
end
end
end
subgraph 7D["orders"]
subgraph 7E["src"]
7F["index.ts"]
subgraph 7G["lib"]
7H["customers-orders-hook.tsx"]
end
end
end
subgraph 7I["products"]
subgraph 7J["src"]
7K["index.ts"]
subgraph 7L["lib"]
7M["customers-product-hook.tsx"]
end
end
end
end
subgraph 7N["router"]
subgraph 7O["src"]
7P["index.ts"]
subgraph 7Q["lib"]
7R["CustomersRouter.tsx"]
7S["ScrollToTop.tsx"]
7T["CustomersRouter.spec.tsx"]
7U["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7V["routes"]
subgraph 7W["src"]
7X["index.ts"]
subgraph 7Y["lib"]
7Z["customer-routes.ts"]
80["customer-routes.spec.ts"]
end
end
end
subgraph 81["screens"]
subgraph 82["contact"]
subgraph 83["src"]
84["index.ts"]
subgraph 85["lib"]
86["customer-contact.tsx"]
87["customer-contact.spec.tsx"]
88["customer-contact.validation.spec.tsx"]
end
end
89["vite.config.ts"]
end
subgraph 8A["customer-checkout"]
subgraph 8B["src"]
8C["index.ts"]
subgraph 8D["lib"]
8E["customer-checkout.tsx"]
end
end
end
subgraph 8F["customer-favorites"]
subgraph 8G["src"]
8H["index.ts"]
subgraph 8I["lib"]
8J["customer-favorites.tsx"]
8K["customer-favorites.shared-card.spec.tsx"]
8L["customer-favorites.spec.tsx"]
end
end
8M["vite.config.ts"]
end
subgraph 8N["customer-login"]
subgraph 8O["src"]
8P["index.ts"]
subgraph 8Q["lib"]
8R["customer-login.tsx"]
end
end
end
subgraph 8S["customer-order-confirmation"]
subgraph 8T["src"]
8U["index.ts"]
subgraph 8V["lib"]
8W["customer-order-confirmation.tsx"]
8X["customer-order-confirmation.pants-size.spec.tsx"]
8Y["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8Z["customer-orders"]
subgraph 90["src"]
91["index.ts"]
subgraph 92["lib"]
93["customer-orders.tsx"]
end
end
end
subgraph 94["customer-payment"]
subgraph 95["src"]
96["index.ts"]
subgraph 97["lib"]
98["customer-payment-callback.tsx"]
99["use-zarinpal-payment.tsx"]
9A["zarinpal-payment-service.ts"]
9B["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 9C["customer-products"]
subgraph 9D["src"]
9E["index.ts"]
subgraph 9F["lib"]
9G["customer-products.tsx"]
end
end
end
subgraph 9H["customer-profile"]
subgraph 9I["src"]
9J["index.ts"]
subgraph 9K["lib"]
9L["customer-profile.tsx"]
9M["customer-profile.spec.tsx"]
9N["customer-profile.validation.spec.tsx"]
end
end
end
subgraph 9O["customer-shopping-cart"]
subgraph 9P["src"]
9Q["index.ts"]
subgraph 9R["lib"]
9S["customer-shopping-cart.tsx"]
9T["customer-shopping-cart.pants-size.spec.tsx"]
9U["customer-shopping-cart.shipping-form.spec.tsx"]
9V["customer-shopping-cart.spec.tsx"]
end
end
9W["vite.config.ts"]
end
subgraph 9X["customer-signup"]
subgraph 9Y["src"]
9Z["index.ts"]
subgraph A0["lib"]
A1["customer-signup.tsx"]
A2["customer-signup.password-length.spec.tsx"]
A3["customer-signup.spec.tsx"]
A4["customer-signup.zod.spec.tsx"]
end
end
end
subgraph A5["forgot-password"]
subgraph A6["src"]
A7["index.ts"]
subgraph A8["lib"]
A9["customer-forgot-password.tsx"]
AA["customer-forgot-password.spec.tsx"]
AB["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph AC["guide-authenticity"]
subgraph AD["src"]
AE["index.ts"]
subgraph AF["lib"]
AG["customer-guide-authenticity.tsx"]
AH["customer-guide-authenticity.spec.tsx"]
end
end
AI["vite.config.ts"]
end
subgraph AJ["guide-payment"]
subgraph AK["src"]
AL["index.ts"]
subgraph AM["lib"]
AN["customer-guide-payment.tsx"]
AO["customer-guide-payment.spec.tsx"]
end
end
AP["vite.config.ts"]
end
subgraph AQ["home"]
subgraph AR["src"]
AS["index.ts"]
subgraph AT["lib"]
AU["CustomersHomeScreen.tsx"]
subgraph AV["components"]
AW["CategoryBentoSection.tsx"]
AY["HeroSection.tsx"]
AZ["HomeLoadingScreen.tsx"]
B0["PicksRailSection.tsx"]
B1["TrustStripSection.tsx"]
B6["NewArrivalsSection.tsx"]
B9["BrandBlocksSection.tsx"]
BA["NewsletterSection.tsx"]
BB["ShopTheLookSection.tsx"]
BC["TickerSection.tsx"]
end
AX["home-selectors.ts"]
B2["useScrollProgress.ts"]
B3["CustomersShopScreen.tsx"]
B4["CustomersHomeScreen.cart-size.spec.tsx"]
B5["CustomersHomeScreen.spec.tsx"]
B7["CustomersShopScreen.cart-size.spec.tsx"]
B8["CustomersShopScreen.multi-filters.spec.tsx"]
end
end
end
subgraph BD["login"]
subgraph BE["src"]
BF["index.ts"]
subgraph BG["lib"]
BH["CustomersLoginScreen.tsx"]
BI["CustomersLoginScreen.spec.tsx"]
BJ["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph BK["not-found"]
subgraph BL["src"]
BM["index.ts"]
subgraph BN["lib"]
BO["customer-not-found.tsx"]
BP["customer-not-found.spec.tsx"]
end
end
BQ["vite.config.ts"]
end
subgraph BR["privacy-policy"]
subgraph BS["src"]
BT["index.ts"]
subgraph BU["lib"]
BV["customer-privacy-policy.tsx"]
BW["customer-privacy-policy.spec.tsx"]
end
end
BX["vite.config.ts"]
end
subgraph BY["product-details"]
subgraph BZ["src"]
C0["index.ts"]
subgraph C1["lib"]
C2["customer-product-details.tsx"]
C3["reviews-flag.ts"]
C4["customer-product-details.guarantee.spec.tsx"]
C5["customer-product-details.no-low-stock.spec.tsx"]
C6["customer-product-details.pants-size.spec.tsx"]
C7["customer-product-details.reviews-hidden.spec.tsx"]
C8["customer-product-details.spec.tsx"]
end
end
C9["vite.config.ts"]
end
subgraph CA["reset-password"]
subgraph CB["src"]
CC["index.ts"]
subgraph CD["lib"]
CE["customer-reset-password.tsx"]
CF["customer-reset-password.password-length.spec.tsx"]
CG["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph CH["shipping-returns"]
subgraph CI["src"]
CJ["index.ts"]
subgraph CK["lib"]
CL["customer-shipping-returns.tsx"]
CM["customer-shipping-returns.spec.tsx"]
end
end
CN["vite.config.ts"]
end
subgraph CO["unauthorized"]
subgraph CP["src"]
CQ["index.ts"]
subgraph CR["lib"]
CS["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CT["utility"]
subgraph CU["test"]
subgraph CV["src"]
CW["index.ts"]
subgraph CX["lib"]
CY["customers-test-utility.tsx"]
end
end
end
end
subgraph CZ["validations"]
subgraph D0["src"]
D1["index.ts"]
subgraph D2["lib"]
D3["shipping-validation.ts"]
D4["barrel.spec.ts"]
D5["shipping-validation.shared.spec.ts"]
end
end
end
subgraph D6["zustand"]
subgraph D7["customer-cart-store"]
subgraph D8["src"]
D9["index.ts"]
subgraph DA["lib"]
DB["customer-cart-store.ts"]
DC["barrel.spec.ts"]
DD["customer-cart-store.spec.ts"]
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
GW["seller-orders-screen.status-schema.spec.ts"]
GX["seller-status-transitions.spec.ts"]
end
GY["test-setup.ts"]
end
end
subgraph GZ["setup-password"]
subgraph H0["src"]
H1["index.ts"]
subgraph H2["lib"]
H3["SellersSetupPassword.tsx"]
H4["SellersSetupPassword.zod.spec.tsx"]
end
end
end
subgraph H5["unauthorized"]
subgraph H6["src"]
H7["index.ts"]
subgraph H8["lib"]
H9["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph HA["zustand"]
subgraph HB["sellers-products-store"]
subgraph HC["src"]
HD["index.ts"]
subgraph HE["lib"]
HF["useSellersProductsStore.ts"]
HG["sellers-products-store.tsx"]
end
end
end
end
end
subgraph HH["shared"]
subgraph HI["components"]
subgraph HJ["apollo-provider-base"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["ApolloProviderBase.tsx"]
HO["createSilentRefreshAuthLink.ts"]
HP["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph HQ["error-boundary"]
subgraph HR["src"]
HS["index.ts"]
subgraph HT["lib"]
HU["error-boundary.tsx"]
HV["error-boundary.spec.tsx"]
end
end
HW["vite.config.ts"]
end
subgraph HX["glassmorphism-container"]
subgraph HY["src"]
HZ["index.ts"]
subgraph I0["lib"]
I1["glassmorphism-container.tsx"]
I2["glassmorphism-container.spec.tsx"]
end
end
end
subgraph I3["layout"]
subgraph I4["src"]
I5["index.ts"]
subgraph I6["lib"]
I7["Layout.tsx"]
end
end
end
subgraph I8["material-data-table"]
subgraph I9["src"]
IA["index.ts"]
subgraph IB["lib"]
IC["material-data-table.tsx"]
ID["table-config.ts"]
IE["table-utils.ts"]
IF["material-data-table.spec.tsx"]
IG["table-types.ts"]
end
end
end
subgraph IH["order-status-chip"]
subgraph II["src"]
IJ["index.ts"]
subgraph IK["lib"]
IL["order-status-chip.tsx"]
IM["order-status-chip.spec.tsx"]
end
end
end
subgraph IN["password-field"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["PasswordTextField.tsx"]
end
end
end
subgraph IS["price-display"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["price-display.tsx"]
IX["price-display.spec.tsx"]
end
end
end
subgraph IY["private-route"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["createPrivateRoute.tsx"]
J3["PrivateRoute.tsx"]
end
end
end
subgraph J4["rtl-table-utils"]
subgraph J5["src"]
J6["index.ts"]
subgraph J7["lib"]
J8["rtl-table-utils.ts"]
J9["rtl-cell-components.tsx"]
JA["rtl-column-helpers.ts"]
JB["rtl-table-props.ts"]
JC["use-table-alignment.ts"]
JD["rtl-table-utils.spec.tsx"]
JE["rtl-table-utils.tsx"]
end
end
end
subgraph JF["snackbar"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["snackbar.tsx"]
end
end
end
subgraph JK["styled-drawer"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["styled-drawer.tsx"]
JP["styled-drawer.spec.tsx"]
end
end
end
subgraph JQ["unauthorized"]
subgraph JR["src"]
JS["index.ts"]
subgraph JT["lib"]
JU["unauthorized-path.tsx"]
end
end
end
end
subgraph JV["graphql"]
subgraph JW["src"]
JX["index.ts"]
subgraph JY["lib"]
JZ["currency.mutations.ts"]
K0["currency.queries.ts"]
K1["fragments.ts"]
K2["variant-colors.ts"]
K3["client-shared-graphql.tsx"]
end
end
end
subgraph K4["hooks"]
subgraph K5["brands"]
subgraph K6["src"]
K7["index.ts"]
subgraph K8["lib"]
K9["brands.graphql.ts"]
KA["useBrands.ts"]
end
end
KB["vite.config.ts"]
end
subgraph KC["categories"]
subgraph KD["src"]
KE["index.ts"]
subgraph KF["lib"]
KG["useCategories.ts"]
KH["categories.graphql.ts"]
end
end
end
subgraph KI["colors"]
subgraph KJ["src"]
KK["index.ts"]
subgraph KL["lib"]
KM["useColors.ts"]
KN["color.graphql.ts"]
end
end
end
subgraph KO["currency"]
subgraph KP["src"]
KQ["index.ts"]
subgraph KR["lib"]
KS["useConvertPrice.tsx"]
KT["useExchangeRate.tsx"]
KU["useCurrencies.tsx"]
KV["useCurrencyForLocale.tsx"]
KW["useExchangeRate.spec.tsx"]
end
end
end
subgraph KX["products"]
subgraph KY["src"]
KZ["index.ts"]
subgraph L0["lib"]
L1["productImage.ts"]
L2["products.graphql.ts"]
L3["useProducts.ts"]
L4["productImage.spec.ts"]
end
end
end
subgraph L5["site-languages"]
subgraph L6["src"]
L7["index.ts"]
subgraph L8["lib"]
L9["site-languages.graphql.ts"]
LA["useSiteLanguages.ts"]
LB["site-languages-hook.spec.tsx"]
end
end
LC["vite.config.ts"]
end
subgraph LD["snackbar"]
subgraph LE["src"]
LF["index.ts"]
subgraph LG["lib"]
LH["SnackbarContext.tsx"]
LI["useSnackbar.ts"]
end
end
end
subgraph LJ["translations-management-hook"]
subgraph LK["src"]
LL["index.ts"]
subgraph LM["lib"]
LN["useTranslationsManagement.ts"]
end
end
end
end
subgraph LO["lottie"]
subgraph LP["empty-cart"]
subgraph LQ["src"]
LR["index.ts"]
subgraph LS["lib"]
LT["lottie-empty-cart.tsx"]
LU["lottie-empty-cart.spec.tsx"]
end
end
LV["vite.config.ts"]
end
subgraph LW["loading"]
subgraph LX["src"]
LY["index.ts"]
subgraph LZ["lib"]
M0["lottie-loading.tsx"]
M1["lottie-loading.spec.tsx"]
end
end
end
subgraph M2["success-check"]
subgraph M3["src"]
M4["index.ts"]
subgraph M5["lib"]
M6["lottie-success-check.tsx"]
M7["lottie-success-check.spec.tsx"]
end
end
end
subgraph M8["unauthorized"]
subgraph M9["src"]
MA["index.ts"]
subgraph MB["lib"]
MC["lottie-unauthorized.tsx"]
end
end
end
end
subgraph MD["translations"]
subgraph ME["src"]
MF["index.ts"]
subgraph MG["lib"]
MH["mapApolloErrorToTranslationKey.ts"]
MI["WrapTranslation.tsx"]
end
end
end
subgraph MJ["ui"]
subgraph MK["colors"]
subgraph ML["src"]
MM["index.ts"]
subgraph MN["lib"]
MO["colors.ts"]
end
end
end
subgraph MP["language-components"]
subgraph MQ["src"]
MR["index.ts"]
subgraph MS["lib"]
MT["language-components.tsx"]
MU["ltr-text-field.tsx"]
end
end
end
subgraph MV["sizes"]
subgraph MW["src"]
MX["index.ts"]
subgraph MY["lib"]
MZ["sizes.ts"]
N0["sizes.spec.tsx"]
N1["sizes.tsx"]
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
NI["shared-ui-store.tsx"]
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
QX["order-validation.spec.ts"]
QY["order.resolver.spec.ts"]
QZ["order.resolver.status-transitions.spec.ts"]
R0["order.resolver.tracking.spec.ts"]
R1["payment.resolver.integration.spec.ts"]
R2["payment.resolver.spec.ts"]
R3["product-info.resolver.spec.ts"]
R4["product-validation.spec.ts"]
R5["query-args-validation.spec.ts"]
R6["seller-info-validation.spec.ts"]
R7["taxonomy-validation.spec.ts"]
R8["translation.resolver.guards.spec.ts"]
subgraph R9["types"]
RA["graphql-upload.d.ts"]
end
RB["user.resolver.spec.ts"]
RC["zod-validation.pipe.spec.ts"]
end
end
end
subgraph RD["services"]
RE["jest.config.ts"]
subgraph RF["src"]
RG["index.ts"]
subgraph RH["lib"]
RI["auth.service.ts"]
RJ["brand.service.ts"]
RK["cart.service.ts"]
RL["product-info-colors.util.ts"]
RM["category.service.ts"]
RN["color.service.ts"]
RO["currency.service.ts"]
RP["customer-profile.service.ts"]
RQ["email.service.ts"]
RR["image-upload.service.ts"]
RS["order.service.ts"]
RT["payment-logger.service.ts"]
RU["payment.service.ts"]
RV["product.service.ts"]
RW["seller-info.service.ts"]
RX["shipping-calculation.service.ts"]
RY["site-language.service.ts"]
RZ["token.service.ts"]
S0["translation.service.ts"]
S1["user.service.ts"]
S2["auth.service.password-policy.spec.ts"]
S3["auth.service.spec.ts"]
S4["cart.service.add-quantity.spec.ts"]
S5["cart.service.null-relations.spec.ts"]
S6["cart.service.spec.ts"]
S7["order.service.spec.ts"]
S8["order.service.tracking.spec.ts"]
S9["product-info-colors.util.spec.ts"]
SA["product.service.multi-filters.spec.ts"]
SB["product.service.only-discounted.spec.ts"]
SC["product.service.pants.spec.ts"]
SD["product.service.spec.ts"]
SE["relay-connection.spec.ts"]
SF["seller-info.service.price-validation.spec.ts"]
SG["shipping-calculation.service.spec.ts"]
SH["token.service.spec.ts"]
end
end
end
subgraph SI["strategies"]
subgraph SJ["src"]
SK["index.ts"]
subgraph SL["lib"]
SM["local.strategy.ts"]
end
end
end
subgraph SN["utils"]
subgraph SO["src"]
SP["index.ts"]
subgraph SQ["lib"]
SR["email-templates.ts"]
SS["relay-connection.ts"]
ST["pagination.ts"]
end
end
end
end
subgraph SU["shared"]
subgraph SV["codegen"]
SW["jest.config.ts"]
subgraph SX["src"]
SY["index.ts"]
subgraph SZ["lib"]
subgraph T0["generated"]
T1["graphql.ts"]
end
end
end
end
subgraph T2["graphql-schema"]
T3["jest.config.ts"]
subgraph T4["src"]
T5["index.ts"]
end
end
subgraph T6["product-sizes"]
subgraph T7["src"]
T8["index.ts"]
subgraph T9["lib"]
TA["product-sizes.ts"]
TB["product-sizes.pants-formats.spec.ts"]
TC["product-sizes.pants-label.spec.ts"]
TD["product-sizes.pants-strict.spec.ts"]
TE["product-sizes.spec.ts"]
end
end
end
subgraph TF["shared-i18n"]
subgraph TG["src"]
TH["index.ts"]
subgraph TI["lib"]
TJ["language-context.tsx"]
TK["language-detector.ts"]
subgraph TL["locales"]
TM["i18n-react.tsx"]
TN["i18n-util.ts"]
TO["i18n-util.async.ts"]
subgraph TP["en"]
TQ["index.ts"]
end
subgraph TS["fa"]
TT["index.ts"]
end
TU["formatters.ts"]
TV["i18n-types.ts"]
TW["i18n-util.sync.ts"]
TX["navigator-detector.ts"]
end
TR["site-name.ts"]
TY["table-localization.ts"]
TZ["theme-provider.tsx"]
U0["use-page-title.ts"]
end
end
end
subgraph U1["validation"]
subgraph U2["src"]
U3["index.ts"]
subgraph U4["lib"]
U5["apollo-error.ts"]
U6["auth.ts"]
U7["limits.ts"]
U8["primitives.ts"]
U9["auth-forms.ts"]
UA["cart.ts"]
UB["catalog.ts"]
UC["contact.ts"]
UD["currency.ts"]
UE["taxonomy.ts"]
UF["errors.ts"]
UG["order.ts"]
UH["profile.ts"]
UI["query.ts"]
UJ["seller.ts"]
UK["auth-forms.admin.spec.ts"]
UL["auth-forms.login.spec.ts"]
UM["auth-forms.recovery.spec.ts"]
UN["auth-forms.seller.spec.ts"]
UO["auth-forms.spec.ts"]
UP["auth.spec.ts"]
UQ["cart.spec.ts"]
UR["catalog.spec.ts"]
US["contact.spec.ts"]
UT["currency.spec.ts"]
UU["errors.spec.ts"]
UV["order.spec.ts"]
UW["primitives.spec.ts"]
UX["profile.spec.ts"]
UY["query.spec.ts"]
UZ["seller.spec.ts"]
V0["taxonomy.spec.ts"]
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
4R-->4P
4V-->4X
4X-->4Y
51-->52
52-->54
55-->54
59-->5A
5A-->5C
5D-->5C
5I-->5K
5I-->5L
5K-->5L
5M-->5K
5P-->5R
5S-->5R
5V-->5X
5V-->5Y
5X-->5Y
5Z-->5X
60-->5Y
63-->65
66-->65
67-->65
68-->65
6D-->6F
6G-->6F
6J-->6L
6J-->6M
6J-->6N
6J-->6Q
6N-->6O
6O-->6P
6V-->6X
6V-->6Y
6V-->6Z
6V-->70
71-->6Y
76-->78
76-->79
76-->7A
7B-->79
7C-->78
7F-->7H
7K-->7M
7P-->7R
7P-->7S
7R-->7S
7T-->7R
7U-->7S
7X-->7Z
80-->7Z
84-->86
87-->86
88-->86
8C-->8E
8H-->8J
8K-->8J
8L-->8J
8P-->8R
8U-->8W
8X-->8W
8Y-->8W
91-->93
96-->98
96-->99
96-->9A
98-->99
99-->9A
9B-->98
9E-->9G
9J-->9L
9M-->9L
9N-->9L
9Q-->9S
9T-->9S
9U-->9S
9V-->9S
9Z-->A1
A2-->A1
A3-->A1
A4-->A1
A7-->A9
AA-->A9
AB-->A9
AE-->AG
AH-->AG
AL-->AN
AO-->AN
AS-->AU
AS-->B3
AS-->AX
AS-->B2
AU-->AW
AU-->AY
AU-->AZ
AU-->B0
AU-->B1
AU-->AX
AU-->B2
AW-->AX
B3-->AX
B4-->B0
B4-->AU
B4-->AX
B5-->B6
B5-->B0
B5-->AU
B5-->B3
B5-->AX
B7-->B3
B8-->B3
B9-->AX
BB-->AX
BF-->BH
BI-->BH
BJ-->BH
BM-->BO
BP-->BO
BT-->BV
BW-->BV
C0-->C2
C2-->C3
C4-->C2
C5-->C2
C6-->C2
C7-->C2
C8-->C2
CC-->CE
CF-->CE
CG-->CE
CJ-->CL
CM-->CL
CQ-->CS
CW-->CY
D1-->D3
D4-->D1
D5-->D3
D9-->DB
DC-->D9
DD-->DB
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
GX-->GT
H1-->H3
H4-->H3
H7-->H9
HD-->HF
HL-->HN
HL-->HO
HP-->HO
HS-->HU
HV-->HU
HZ-->I1
I2-->I1
I5-->I7
IA-->IC
IA-->ID
IA-->IE
IC-->ID
IF-->IC
IJ-->IL
IM-->IL
IP-->IR
IU-->IW
IX-->IW
J0-->J2
J2-->J3
J6-->J8
J8-->J9
J8-->JA
J8-->JB
J8-->JC
JA-->J9
JA-->JB
JD-->JE
JH-->JJ
JM-->JO
JP-->JO
JS-->JU
JX-->JZ
JX-->K0
JX-->K1
JX-->K2
K7-->K9
K7-->KA
KA-->K9
KE-->KG
KG-->KH
KK-->KM
KM-->KN
KQ-->KS
KQ-->KU
KQ-->KV
KQ-->KT
KS-->KT
KW-->KT
KZ-->L1
KZ-->L2
KZ-->L3
L3-->L2
L4-->L1
L7-->L9
L7-->LA
LA-->L9
LB-->LA
LF-->LH
LF-->LI
LI-->LH
LL-->LN
LR-->LT
LU-->LT
LY-->M0
M1-->M0
M4-->M6
M7-->M6
MA-->MC
MF-->MH
MM-->MO
MR-->MT
MR-->MU
MX-->MZ
N0-->N1
N5-->N7
NA-->NC
NF-->NH
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
QX-->QB
QY-->QI
QZ-->QI
R0-->QI
R1-->QJ
R2-->QJ
R3-->QK
R4-->QL
R4-->QB
R5-->QI
R5-->QL
R5-->QM
R5-->QB
R6-->QM
R6-->QB
R7-->QC
R7-->QE
R7-->QF
R7-->QO
R7-->QB
R8-->QQ
RB-->QR
RC-->QB
RG-->RI
RG-->RJ
RG-->RK
RG-->RM
RG-->RN
RG-->RO
RG-->RP
RG-->RQ
RG-->RR
RG-->RS
RG-->RT
RG-->RU
RG-->RL
RG-->RV
RG-->RW
RG-->RX
RG-->RY
RG-->RZ
RG-->S0
RG-->S1
RK-->RL
RV-->RL
RW-->RL
S2-->RI
S2-->RQ
S2-->RZ
S2-->S1
S3-->RI
S3-->RQ
S3-->RZ
S3-->S1
S4-->RK
S5-->RK
S6-->RK
S7-->RS
S8-->RS
S9-->RL
SA-->RV
SA-->S0
SB-->RV
SB-->S0
SC-->RV
SC-->S0
SD-->RV
SD-->S0
SF-->RI
SF-->RW
SG-->RX
SH-->RZ
SK-->SM
SP-->SR
SP-->SS
SY-->T1
T8-->TA
TB-->TA
TC-->TA
TD-->TA
TE-->TA
TH-->TJ
TH-->TK
TH-->TM
TH-->TV
TH-->TN
TH-->TO
TH-->TW
TH-->TX
TH-->TR
TH-->TY
TH-->TZ
TH-->U0
TJ-->TK
TJ-->TM
TJ-->TO
TM-->TN
TO-->TQ
TO-->TT
TO-->TU
TO-->TN
TQ-->TR
TT-->TR
TW-->TQ
TW-->TT
TW-->TU
TW-->TN
TY-->TM
TZ-->TJ
U0-->TM
U3-->U5
U3-->U6
U3-->U9
U3-->UA
U3-->UB
U3-->UC
U3-->UD
U3-->UF
U3-->U7
U3-->UG
U3-->U8
U3-->UH
U3-->UI
U3-->UJ
U3-->UE
U6-->U7
U6-->U8
U8-->U7
U9-->U6
UA-->U8
UD-->UE
UG-->U6
UG-->UA
UG-->U8
UH-->UG
UI-->U8
UK-->U9
UL-->U9
UM-->U9
UN-->U9
UO-->U9
UP-->U6
UQ-->UA
UR-->UB
US-->UC
UT-->UD
UU-->UF
UV-->UG
UW-->U7
UW-->U8
UX-->UH
UY-->UI
UZ-->UJ
V0-->UE
