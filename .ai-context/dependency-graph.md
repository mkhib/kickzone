flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.ts"]
5["global-validation-pipe.spec.ts"]
6["global-validation-pipe.ts"]
7["order-inputs.validation.spec.ts"]
end
8["main.ts"]
end
end
end
subgraph 9["libs"]
subgraph A["client"]
subgraph B["admins"]
subgraph C["components"]
subgraph D["footer"]
subgraph E["src"]
F["index.ts"]
subgraph G["lib"]
H["admins-footer.tsx"]
I["admins-footer.spec.tsx"]
end
end
end
subgraph J["headerbar"]
subgraph K["src"]
L["index.ts"]
subgraph M["lib"]
N["AdminsHeaderbar.tsx"]
O["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph P["layout"]
subgraph Q["src"]
R["index.ts"]
subgraph S["lib"]
T["AdminsLayout.tsx"]
U["AdminsTabbar.tsx"]
V["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph W["contexts"]
subgraph X["src"]
Y["index.spec.tsx"]
Z["index.ts"]
subgraph 10["lib"]
11["AdminsAuthContext.tsx"]
12["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 13["graphql"]
subgraph 14["src"]
15["index.ts"]
subgraph 16["lib"]
17["fragments.ts"]
18["mutations.ts"]
19["orders.graphql.ts"]
1A["Provider.tsx"]
1B["AdminsApolloProvider.tsx"]
1C["client.ts"]
1D["queries.ts"]
1E["Provider.spec.tsx"]
1F["apollo-upload-client.d.ts"]
1G["client.spec.tsx"]
1H["fragments.spec.tsx"]
1I["mutations.spec.tsx"]
1J["queries.spec.tsx"]
end
subgraph 1K["types"]
1L["apollo-upload-client.d.ts"]
end
end
end
subgraph 1M["hooks"]
subgraph 1N["auth"]
subgraph 1O["src"]
1P["index.ts"]
subgraph 1Q["lib"]
1R["useAdminLogin.ts"]
1S["useAdminLogin.spec.ts"]
1T["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1U["currency-management"]
subgraph 1V["src"]
1W["index.ts"]
subgraph 1X["lib"]
1Y["useAdminsCurrencyManagement.ts"]
end
end
1Z["vite.config.ts"]
end
subgraph 20["customers"]
subgraph 21["src"]
22["index.ts"]
subgraph 23["lib"]
24["adminsCustomers.graphql.ts"]
25["useAdminsCustomers.ts"]
26["useAdminsCustomers.spec.tsx"]
end
end
27["vite.config.ts"]
end
subgraph 28["orders"]
subgraph 29["src"]
2A["index.ts"]
subgraph 2B["lib"]
2C["admins-orders-hook.tsx"]
2D["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2E["sellers"]
subgraph 2F["src"]
2G["index.ts"]
subgraph 2H["lib"]
2I["useAdminsSellers.ts"]
2J["adminsSellers.graphql.ts"]
2K["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2L["router"]
subgraph 2M["src"]
2N["index.ts"]
subgraph 2O["lib"]
2P["AdminsRouter.tsx"]
2Q["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2R["routes"]
subgraph 2S["src"]
2T["index.spec.ts"]
2U["index.ts"]
subgraph 2V["lib"]
2W["admin-routes.ts"]
2X["admin-routes.spec.ts"]
end
end
end
subgraph 2Y["screens"]
subgraph 2Z["admin-seller-orders"]
subgraph 30["src"]
31["index.spec.tsx"]
32["index.ts"]
subgraph 33["lib"]
34["admin-seller-orders.tsx"]
35["admin-seller-orders.pants-size.spec.tsx"]
36["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 37["currency-management"]
subgraph 38["src"]
39["index.ts"]
subgraph 3A["lib"]
3B["currency-management.tsx"]
3C["currency-management.spec.tsx"]
end
end
end
subgraph 3D["customer-management"]
subgraph 3E["src"]
3F["index.ts"]
subgraph 3G["lib"]
3H["admin-customer-management.tsx"]
3I["admin-customer-management.spec.tsx"]
end
end
3J["vite.config.ts"]
end
subgraph 3K["login"]
subgraph 3L["src"]
3M["index.ts"]
subgraph 3N["lib"]
3O["AdminsLogin.tsx"]
3P["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3Q["product-editor"]
subgraph 3R["src"]
3S["index.spec.tsx"]
3T["index.ts"]
subgraph 3U["lib"]
3V["AdminProductEditor.tsx"]
3W["AdminProductEditor.pants-range.spec.tsx"]
3X["AdminProductEditor.spec.tsx"]
end
3Y["vite-env.d.ts"]
end
end
subgraph 3Z["products"]
subgraph 40["src"]
41["index.spec.tsx"]
42["index.ts"]
subgraph 43["lib"]
44["AdminProducts.tsx"]
45["adminProducts.hooks.ts"]
46["adminProducts.graphql.ts"]
47["ProductImageManagementModal.tsx"]
48["AdminProducts.spec.tsx"]
49["ProductImageManagementModal.pants-size.spec.tsx"]
4A["ProductImageManagementModal.spec.tsx"]
end
4B["vite-env.d.ts"]
end
end
subgraph 4C["seller-management"]
subgraph 4D["src"]
4E["index.spec.tsx"]
4F["index.ts"]
subgraph 4G["lib"]
4H["SellerManagement.tsx"]
4I["SellerManagement.spec.tsx"]
end
4J["vite-env.d.ts"]
end
end
subgraph 4K["translation-management"]
subgraph 4L["src"]
4M["index.ts"]
subgraph 4N["lib"]
4O["AdminTranslationManagement.tsx"]
4P["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4Q["unauthorized"]
subgraph 4R["src"]
4S["index.spec.tsx"]
4T["index.ts"]
subgraph 4U["lib"]
4V["admins-unauthorized-screen.tsx"]
4W["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4X["zustand"]
subgraph 4Y["admins-products-store"]
subgraph 4Z["src"]
50["index.spec.ts"]
51["index.ts"]
subgraph 52["lib"]
53["admins-products-store.ts"]
54["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 55["customers"]
subgraph 56["components"]
subgraph 57["footer"]
subgraph 58["src"]
59["index.ts"]
subgraph 5A["lib"]
5B["customers-footer.tsx"]
5C["TrustBadgeIcons.tsx"]
5D["customers-footer.spec.tsx"]
end
end
end
subgraph 5E["headerbar"]
subgraph 5F["src"]
5G["index.ts"]
subgraph 5H["lib"]
5I["CustomersHeaderbar.tsx"]
5J["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5K["layout"]
subgraph 5L["src"]
5M["index.ts"]
subgraph 5N["lib"]
5O["CustomersLayout.tsx"]
5P["CustomersTabbar.tsx"]
5Q["CustomersLayout.spec.tsx"]
5R["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5S["product-card"]
subgraph 5T["src"]
5U["index.ts"]
subgraph 5V["lib"]
5W["CustomersProductCard.tsx"]
5X["CustomersProductCard.pants-size.spec.tsx"]
5Y["CustomersProductCard.spec.tsx"]
end
5Z["vite-env.d.ts"]
end
end
end
subgraph 60["contexts"]
subgraph 61["auth"]
subgraph 62["src"]
63["index.ts"]
subgraph 64["lib"]
65["CustomersAuthContext.tsx"]
66["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 67["graphql"]
subgraph 68["src"]
69["index.ts"]
subgraph 6A["lib"]
6B["customer-profile.queries.ts"]
6C["mutations.ts"]
6D["Provider.tsx"]
6E["CustomersApolloProvider.tsx"]
6F["client.ts"]
6G["queries.ts"]
6H["apollo-upload-client.d.ts"]
end
end
end
subgraph 6I["hooks"]
subgraph 6J["auth"]
subgraph 6K["src"]
6L["index.ts"]
subgraph 6M["lib"]
6N["useCustomersForgotPassword.tsx"]
6O["useCustomersLogin.tsx"]
6P["useCustomersRegister.tsx"]
6Q["useCustomersResetPassword.tsx"]
6R["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6S["cart"]
6T["jest.config.ts"]
6U["jest.setup.ts"]
subgraph 6V["src"]
6W["index.ts"]
subgraph 6X["lib"]
6Y["customers-cart-hook.tsx"]
6Z["useCartService.ts"]
70["useWishlistSync.ts"]
71["useCartService.spec.tsx"]
72["useCartSync.ts"]
end
end
end
subgraph 73["orders"]
subgraph 74["src"]
75["index.ts"]
subgraph 76["lib"]
77["customers-orders-hook.tsx"]
end
end
end
subgraph 78["products"]
subgraph 79["src"]
7A["index.ts"]
subgraph 7B["lib"]
7C["customers-product-hook.tsx"]
end
end
end
end
subgraph 7D["router"]
subgraph 7E["src"]
7F["index.ts"]
subgraph 7G["lib"]
7H["CustomersRouter.tsx"]
7I["ScrollToTop.tsx"]
7J["CustomersRouter.spec.tsx"]
7K["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7L["routes"]
subgraph 7M["src"]
7N["index.ts"]
subgraph 7O["lib"]
7P["customer-routes.ts"]
7Q["customer-routes.spec.ts"]
end
end
end
subgraph 7R["screens"]
subgraph 7S["contact"]
subgraph 7T["src"]
7U["index.ts"]
subgraph 7V["lib"]
7W["customer-contact.tsx"]
7X["customer-contact.spec.tsx"]
end
end
7Y["vite.config.ts"]
end
subgraph 7Z["customer-checkout"]
subgraph 80["src"]
81["index.ts"]
subgraph 82["lib"]
83["customer-checkout.tsx"]
end
end
end
subgraph 84["customer-favorites"]
subgraph 85["src"]
86["index.ts"]
subgraph 87["lib"]
88["customer-favorites.tsx"]
89["customer-favorites.spec.tsx"]
end
end
8A["vite.config.ts"]
end
subgraph 8B["customer-login"]
subgraph 8C["src"]
8D["index.ts"]
subgraph 8E["lib"]
8F["customer-login.tsx"]
end
end
end
subgraph 8G["customer-order-confirmation"]
subgraph 8H["src"]
8I["index.ts"]
subgraph 8J["lib"]
8K["customer-order-confirmation.tsx"]
8L["customer-order-confirmation.pants-size.spec.tsx"]
8M["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8N["customer-orders"]
subgraph 8O["src"]
8P["index.ts"]
subgraph 8Q["lib"]
8R["customer-orders.tsx"]
end
end
end
subgraph 8S["customer-payment"]
subgraph 8T["src"]
8U["index.ts"]
subgraph 8V["lib"]
8W["customer-payment-callback.tsx"]
8X["use-zarinpal-payment.tsx"]
8Y["zarinpal-payment-service.ts"]
8Z["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 90["customer-products"]
subgraph 91["src"]
92["index.ts"]
subgraph 93["lib"]
94["customer-products.tsx"]
end
end
end
subgraph 95["customer-profile"]
subgraph 96["src"]
97["index.ts"]
subgraph 98["lib"]
99["customer-profile.tsx"]
9A["customer-profile.spec.tsx"]
end
end
end
subgraph 9B["customer-shopping-cart"]
subgraph 9C["src"]
9D["index.ts"]
subgraph 9E["lib"]
9F["customer-shopping-cart.tsx"]
9G["customer-shopping-cart.pants-size.spec.tsx"]
9H["customer-shopping-cart.spec.tsx"]
end
end
9I["vite.config.ts"]
end
subgraph 9J["customer-signup"]
subgraph 9K["src"]
9L["index.ts"]
subgraph 9M["lib"]
9N["customer-signup.tsx"]
9O["customer-signup.password-length.spec.tsx"]
9P["customer-signup.spec.tsx"]
end
end
end
subgraph 9Q["forgot-password"]
subgraph 9R["src"]
9S["index.ts"]
subgraph 9T["lib"]
9U["customer-forgot-password.tsx"]
9V["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9W["guide-authenticity"]
subgraph 9X["src"]
9Y["index.ts"]
subgraph 9Z["lib"]
A0["customer-guide-authenticity.tsx"]
A1["customer-guide-authenticity.spec.tsx"]
end
end
A2["vite.config.ts"]
end
subgraph A3["guide-payment"]
subgraph A4["src"]
A5["index.ts"]
subgraph A6["lib"]
A7["customer-guide-payment.tsx"]
A8["customer-guide-payment.spec.tsx"]
end
end
A9["vite.config.ts"]
end
subgraph AA["home"]
subgraph AB["src"]
AC["index.ts"]
subgraph AD["lib"]
AE["CustomersHomeScreen.tsx"]
subgraph AF["components"]
AG["CategoryBentoSection.tsx"]
AI["HeroSection.tsx"]
AJ["HomeLoadingScreen.tsx"]
AK["PicksRailSection.tsx"]
AL["TrustStripSection.tsx"]
AQ["NewArrivalsSection.tsx"]
AS["BrandBlocksSection.tsx"]
AT["NewsletterSection.tsx"]
AU["ShopTheLookSection.tsx"]
AV["TickerSection.tsx"]
end
AH["home-selectors.ts"]
AM["useScrollProgress.ts"]
AN["CustomersShopScreen.tsx"]
AO["CustomersHomeScreen.cart-size.spec.tsx"]
AP["CustomersHomeScreen.spec.tsx"]
AR["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AW["login"]
subgraph AX["src"]
AY["index.ts"]
subgraph AZ["lib"]
B0["CustomersLoginScreen.tsx"]
B1["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph B2["not-found"]
subgraph B3["src"]
B4["index.ts"]
subgraph B5["lib"]
B6["customer-not-found.tsx"]
B7["customer-not-found.spec.tsx"]
end
end
B8["vite.config.ts"]
end
subgraph B9["privacy-policy"]
subgraph BA["src"]
BB["index.ts"]
subgraph BC["lib"]
BD["customer-privacy-policy.tsx"]
BE["customer-privacy-policy.spec.tsx"]
end
end
BF["vite.config.ts"]
end
subgraph BG["product-details"]
subgraph BH["src"]
BI["index.ts"]
subgraph BJ["lib"]
BK["customer-product-details.tsx"]
BL["customer-product-details.pants-size.spec.tsx"]
BM["customer-product-details.spec.tsx"]
end
end
BN["vite.config.ts"]
end
subgraph BO["reset-password"]
subgraph BP["src"]
BQ["index.ts"]
subgraph BR["lib"]
BS["customer-reset-password.tsx"]
BT["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph BU["shipping-returns"]
subgraph BV["src"]
BW["index.ts"]
subgraph BX["lib"]
BY["customer-shipping-returns.tsx"]
BZ["customer-shipping-returns.spec.tsx"]
end
end
C0["vite.config.ts"]
end
subgraph C1["unauthorized"]
subgraph C2["src"]
C3["index.ts"]
subgraph C4["lib"]
C5["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C6["utility"]
subgraph C7["test"]
subgraph C8["src"]
C9["index.ts"]
subgraph CA["lib"]
CB["customers-test-utility.tsx"]
end
end
end
end
subgraph CC["validations"]
subgraph CD["src"]
CE["index.ts"]
subgraph CF["lib"]
CG["shipping-validation.ts"]
CH["shipping-validation.spec.tsx"]
CI["shipping-validation.tsx"]
end
end
end
subgraph CJ["zustand"]
subgraph CK["customer-cart-store"]
subgraph CL["src"]
CM["index.ts"]
subgraph CN["lib"]
CO["customer-cart-store.ts"]
CP["customer-cart-store.spec.ts"]
CQ["customer-cart-store.tsx"]
end
end
end
subgraph CR["customer-checkout-store"]
subgraph CS["src"]
CT["index.ts"]
subgraph CU["lib"]
CV["customer-checkout-store.ts"]
CW["customer-checkout-store.spec.ts"]
end
end
CX["vite.config.ts"]
end
subgraph CY["customer-wishlist-store"]
subgraph CZ["src"]
D0["index.ts"]
subgraph D1["lib"]
D2["customer-wishlist-store.ts"]
D3["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D4["src"]
D5["index.ts"]
subgraph D6["lib"]
D7["customers-products-store.tsx"]
end
end
end
end
subgraph D8["sellers"]
subgraph D9["components"]
subgraph DA["footer"]
subgraph DB["src"]
DC["index.ts"]
subgraph DD["lib"]
DE["sellers-footer.tsx"]
DF["sellers-footer.spec.tsx"]
end
end
end
subgraph DG["headerbar"]
subgraph DH["src"]
DI["index.ts"]
subgraph DJ["lib"]
DK["SellersHeaderbar.tsx"]
end
end
end
subgraph DL["layout"]
subgraph DM["src"]
DN["index.ts"]
subgraph DO["lib"]
DP["SellersLayout.tsx"]
DQ["SellersTabbar.tsx"]
end
end
end
end
subgraph DR["contexts"]
subgraph DS["auth"]
subgraph DT["src"]
DU["index.ts"]
subgraph DV["lib"]
DW["SellersAuthContext.tsx"]
DX["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DY["graphql"]
subgraph DZ["src"]
E0["index.ts"]
subgraph E1["lib"]
E2["fragments.ts"]
E3["mutations.ts"]
E4["Provider.tsx"]
E5["SellersApolloProvider.tsx"]
E6["client.ts"]
E7["queries.ts"]
E8["seller-orders.graphql.ts"]
E9["apollo-upload-client.d.ts"]
end
subgraph EA["types"]
EB["apollo-upload-client.d.ts"]
end
end
end
subgraph EC["hooks"]
subgraph ED["auth"]
subgraph EE["src"]
EF["index.ts"]
subgraph EG["lib"]
EH["useSellerAuth.ts"]
EI["sellerAuth.graphql.ts"]
end
end
end
subgraph EJ["orders"]
subgraph EK["src"]
EL["index.ts"]
subgraph EM["lib"]
EN["useSellerOrders.ts"]
end
end
end
subgraph EO["products"]
subgraph EP["src"]
EQ["index.ts"]
subgraph ER["lib"]
ES["useSellersProductManagement.ts"]
ET["useSellersProducts.ts"]
end
end
end
end
subgraph EU["router"]
subgraph EV["src"]
EW["index.ts"]
subgraph EX["lib"]
EY["SellersRouter.tsx"]
end
end
end
subgraph EZ["routes"]
subgraph F0["src"]
F1["index.ts"]
subgraph F2["lib"]
F3["seller-routes.ts"]
end
end
end
subgraph F4["screens"]
subgraph F5["catalog"]
subgraph F6["src"]
F7["index.ts"]
subgraph F8["lib"]
F9["SellersCatalogScreens.tsx"]
FA["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FB["login"]
subgraph FC["src"]
FD["index.ts"]
subgraph FE["lib"]
FF["SellersLogin.tsx"]
end
end
end
subgraph FG["manage-product"]
subgraph FH["src"]
FI["index.ts"]
subgraph FJ["lib"]
FK["SellersManageProductScreen.tsx"]
FL["SellersDefineProductFlow.tsx"]
FM["SellersDefineProductFlow.pants-label.spec.tsx"]
FN["SellersDefineProductFlow.spec.tsx"]
FO["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FP["products"]
subgraph FQ["src"]
FR["index.ts"]
subgraph FS["lib"]
FT["SellersProducts.tsx"]
FU["SellersProducts.pants-label.spec.tsx"]
FV["SellersProducts.spec.tsx"]
end
end
end
subgraph FW["seller-orders"]
FX["jest.config.ts"]
FY["jest.setup.ts"]
subgraph FZ["src"]
G0["index.ts"]
subgraph G1["lib"]
G2["seller-orders-screen.tsx"]
G3["seller-orders-screen.pants-size.spec.tsx"]
G4["seller-orders-screen.spec.tsx"]
end
G5["test-setup.ts"]
end
end
subgraph G6["setup-password"]
subgraph G7["src"]
G8["index.ts"]
subgraph G9["lib"]
GA["SellersSetupPassword.tsx"]
end
end
end
subgraph GB["unauthorized"]
subgraph GC["src"]
GD["index.ts"]
subgraph GE["lib"]
GF["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GG["zustand"]
subgraph GH["sellers-products-store"]
subgraph GI["src"]
GJ["index.ts"]
subgraph GK["lib"]
GL["useSellersProductsStore.ts"]
GM["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GN["shared"]
subgraph GO["components"]
subgraph GP["apollo-provider-base"]
subgraph GQ["src"]
GR["index.ts"]
subgraph GS["lib"]
GT["ApolloProviderBase.tsx"]
GU["createSilentRefreshAuthLink.ts"]
GV["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GW["error-boundary"]
subgraph GX["src"]
GY["index.ts"]
subgraph GZ["lib"]
H0["error-boundary.tsx"]
H1["error-boundary.spec.tsx"]
end
end
H2["vite.config.ts"]
end
subgraph H3["glassmorphism-container"]
subgraph H4["src"]
H5["index.ts"]
subgraph H6["lib"]
H7["glassmorphism-container.tsx"]
H8["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H9["layout"]
subgraph HA["src"]
HB["index.ts"]
subgraph HC["lib"]
HD["Layout.tsx"]
end
end
end
subgraph HE["material-data-table"]
subgraph HF["src"]
HG["index.ts"]
subgraph HH["lib"]
HI["material-data-table.tsx"]
HJ["table-config.ts"]
HK["table-utils.ts"]
HL["material-data-table.spec.tsx"]
HM["table-types.ts"]
end
end
end
subgraph HN["order-status-chip"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["order-status-chip.tsx"]
HS["order-status-chip.spec.tsx"]
end
end
end
subgraph HT["password-field"]
subgraph HU["src"]
HV["index.ts"]
subgraph HW["lib"]
HX["PasswordTextField.tsx"]
end
end
end
subgraph HY["price-display"]
subgraph HZ["src"]
I0["index.ts"]
subgraph I1["lib"]
I2["price-display.tsx"]
I3["price-display.spec.tsx"]
end
end
end
subgraph I4["private-route"]
subgraph I5["src"]
I6["index.ts"]
subgraph I7["lib"]
I8["createPrivateRoute.tsx"]
I9["PrivateRoute.tsx"]
end
end
end
subgraph IA["rtl-table-utils"]
subgraph IB["src"]
IC["index.ts"]
subgraph ID["lib"]
IE["rtl-table-utils.ts"]
IF["rtl-cell-components.tsx"]
IG["rtl-column-helpers.ts"]
IH["rtl-table-props.ts"]
II["use-table-alignment.ts"]
IJ["rtl-table-utils.spec.tsx"]
IK["rtl-table-utils.tsx"]
end
end
end
subgraph IL["snackbar"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["snackbar.tsx"]
IQ["Snackbar.tsx"]
end
end
end
subgraph IR["styled-drawer"]
subgraph IS["src"]
IT["index.ts"]
subgraph IU["lib"]
IV["styled-drawer.tsx"]
IW["styled-drawer.spec.tsx"]
end
end
end
subgraph IX["unauthorized"]
subgraph IY["src"]
IZ["index.ts"]
subgraph J0["lib"]
J1["unauthorized-path.tsx"]
end
end
end
end
subgraph J2["graphql"]
subgraph J3["src"]
J4["index.ts"]
subgraph J5["lib"]
J6["currency.mutations.ts"]
J7["currency.queries.ts"]
J8["fragments.ts"]
J9["variant-colors.ts"]
JA["client-shared-graphql.tsx"]
end
end
end
subgraph JB["hooks"]
subgraph JC["brands"]
subgraph JD["src"]
JE["index.ts"]
subgraph JF["lib"]
JG["brands.graphql.ts"]
JH["useBrands.ts"]
end
end
JI["vite.config.ts"]
end
subgraph JJ["categories"]
subgraph JK["src"]
JL["index.ts"]
subgraph JM["lib"]
JN["useCategories.ts"]
JO["categories.graphql.ts"]
end
end
end
subgraph JP["colors"]
subgraph JQ["src"]
JR["index.ts"]
subgraph JS["lib"]
JT["useColors.ts"]
JU["color.graphql.ts"]
end
end
end
subgraph JV["currency"]
subgraph JW["src"]
JX["index.ts"]
subgraph JY["lib"]
JZ["useConvertPrice.tsx"]
K0["useExchangeRate.tsx"]
K1["useCurrencies.tsx"]
K2["useCurrencyForLocale.tsx"]
K3["useExchangeRate.spec.tsx"]
end
end
end
subgraph K4["products"]
subgraph K5["src"]
K6["index.ts"]
subgraph K7["lib"]
K8["productImage.ts"]
K9["products.graphql.ts"]
KA["useProducts.ts"]
KB["productImage.spec.ts"]
end
end
end
subgraph KC["site-languages"]
subgraph KD["src"]
KE["index.ts"]
subgraph KF["lib"]
KG["site-languages.graphql.ts"]
KH["useSiteLanguages.ts"]
KI["site-languages-hook.spec.tsx"]
end
end
KJ["vite.config.ts"]
end
subgraph KK["snackbar"]
subgraph KL["src"]
KM["index.ts"]
subgraph KN["lib"]
KO["SnackbarContext.tsx"]
KP["useSnackbar.ts"]
end
end
end
subgraph KQ["translations-management-hook"]
subgraph KR["src"]
KS["index.ts"]
subgraph KT["lib"]
KU["useTranslationsManagement.ts"]
end
end
end
end
subgraph KV["lottie"]
subgraph KW["empty-cart"]
subgraph KX["src"]
KY["index.ts"]
subgraph KZ["lib"]
L0["lottie-empty-cart.tsx"]
L1["lottie-empty-cart.spec.tsx"]
end
end
L2["vite.config.ts"]
end
subgraph L3["loading"]
subgraph L4["src"]
L5["index.ts"]
subgraph L6["lib"]
L7["lottie-loading.tsx"]
L8["lottie-loading.spec.tsx"]
end
end
end
subgraph L9["success-check"]
subgraph LA["src"]
LB["index.ts"]
subgraph LC["lib"]
LD["lottie-success-check.tsx"]
LE["lottie-success-check.spec.tsx"]
end
end
end
subgraph LF["unauthorized"]
subgraph LG["src"]
LH["index.ts"]
subgraph LI["lib"]
LJ["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LK["translations"]
subgraph LL["src"]
LM["index.ts"]
subgraph LN["lib"]
LO["mapApolloErrorToTranslationKey.ts"]
LP["WrapTranslation.tsx"]
end
end
end
subgraph LQ["ui"]
subgraph LR["colors"]
subgraph LS["src"]
LT["index.ts"]
subgraph LU["lib"]
LV["colors.ts"]
end
end
end
subgraph LW["language-components"]
subgraph LX["src"]
LY["index.ts"]
subgraph LZ["lib"]
M0["language-components.tsx"]
M1["ltr-text-field.tsx"]
end
end
end
subgraph M2["sizes"]
subgraph M3["src"]
M4["index.ts"]
subgraph M5["lib"]
M6["sizes.ts"]
M7["sizes.spec.tsx"]
M8["sizes.tsx"]
end
end
end
end
subgraph M9["zustand"]
subgraph MA["shared-auth-store"]
subgraph MB["src"]
MC["index.ts"]
subgraph MD["lib"]
ME["shared-auth-store.ts"]
end
end
end
subgraph MF["shared-notification-store"]
subgraph MG["src"]
MH["index.ts"]
subgraph MI["lib"]
MJ["shared-notification-store.tsx"]
end
end
end
subgraph MK["shared-ui-store"]
subgraph ML["src"]
MM["index.ts"]
subgraph MN["lib"]
MO["shared-ui-store.ts"]
MP["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MQ["server"]
subgraph MR["controllers"]
subgraph MS["src"]
MT["index.ts"]
subgraph MU["lib"]
MV["auth.controller.ts"]
MW["order.controller.ts"]
end
end
end
subgraph MX["decorators"]
MY["jest.config.ts"]
subgraph MZ["src"]
N0["index.ts"]
subgraph N1["lib"]
N2["current-user.decorator.ts"]
N3["decorators.ts"]
N4["decorators.spec.ts"]
end
end
end
subgraph N5["entities"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["brand.entity.ts"]
NA["product.entity.ts"]
NB["category.entity.ts"]
NC["product-description.entity.ts"]
ND["site-language.entity.ts"]
NE["product-info.entity.ts"]
NF["color.entity.ts"]
NG["product-info-color.entity.ts"]
NH["seller-info.entity.ts"]
NI["seller-product.entity.ts"]
NJ["user.entity.ts"]
NK["cart.entity.ts"]
NL["currency-preference.entity.ts"]
NM["currency.entity.ts"]
NN["customer.entity.ts"]
NO["exchange-rate.entity.ts"]
NP["order.entity.ts"]
NQ["platform-settings.entity.ts"]
NR["refresh-token.entity.ts"]
NS["seller-order.entity.ts"]
NT["translation.entity.ts"]
end
end
end
subgraph NU["guards"]
NV["jest.config.ts"]
subgraph NW["src"]
NX["index.ts"]
subgraph NY["lib"]
NZ["catalog.guard.ts"]
O0["graphql-auth.guard.ts"]
O1["http-auth.guard.ts"]
O2["roles.guard.ts"]
O3["catalog.guard.spec.ts"]
O4["roles.guard.spec.ts"]
end
end
end
subgraph O5["inputs"]
subgraph O6["src"]
O7["index.ts"]
subgraph O8["lib"]
O9["brand.input.ts"]
OA["cart.inputs.ts"]
OB["category.input.ts"]
OC["color.input.ts"]
OD["customer-auth.inputs.ts"]
OE["order-pagination.inputs.ts"]
OF["order.inputs.ts"]
OG["product-info-filter.input.ts"]
OH["product.input.ts"]
OI["seller-order-pagination.inputs.ts"]
OJ["seller.input.ts"]
OK["site-language.input.ts"]
OL["user.input.ts"]
end
end
end
subgraph OM["modules"]
subgraph ON["src"]
OO["index.ts"]
subgraph OP["lib"]
OQ["auth.module.ts"]
OR["email.module.ts"]
OS["token.module.ts"]
OT["user.module.ts"]
OU["customer-profile.module.ts"]
OV["brand.module.ts"]
OW["catalog-guard.module.ts"]
OX["translation.module.ts"]
OY["cart.module.ts"]
OZ["platform-settings.module.ts"]
P0["category.module.ts"]
P1["product.module.ts"]
P2["color.module.ts"]
P3["currency.module.ts"]
P4["graphql-context.module.ts"]
P5["order.module.ts"]
P6["seller-info.module.ts"]
P7["payment.module.ts"]
P8["product-info.module.ts"]
P9["seller-products.module.ts"]
PA["site-language.module.ts"]
end
end
end
subgraph PB["resolvers"]
PC["jest.config.ts"]
subgraph PD["src"]
PE["index.ts"]
subgraph PF["lib"]
PG["auth.resolver.ts"]
PH["brand.resolver.ts"]
PI["cart.resolver.ts"]
PJ["category.resolver.ts"]
PK["color.resolver.ts"]
PL["currency.resolver.ts"]
PM["customer-profile.resolver.ts"]
PN["order.resolver.ts"]
PO["payment.resolver.ts"]
PP["product-info.resolver.ts"]
PQ["product.resolver.ts"]
PR["seller-info.resolver.ts"]
PS["shipping.resolver.ts"]
PT["site-language.resolver.ts"]
PU["translation.input.ts"]
PV["translation.resolver.ts"]
PW["user.resolver.ts"]
PX["auth.resolver.spec.ts"]
PY["order.resolver.spec.ts"]
PZ["payment.resolver.integration.spec.ts"]
Q0["payment.resolver.spec.ts"]
Q1["product-info.resolver.spec.ts"]
Q2["translation.resolver.guards.spec.ts"]
subgraph Q3["types"]
Q4["graphql-upload.d.ts"]
end
Q5["user.resolver.spec.ts"]
end
end
end
subgraph Q6["services"]
Q7["jest.config.ts"]
subgraph Q8["src"]
Q9["index.ts"]
subgraph QA["lib"]
QB["auth.service.ts"]
QC["brand.service.ts"]
QD["cart.service.ts"]
QE["product-info-colors.util.ts"]
QF["category.service.ts"]
QG["color.service.ts"]
QH["currency.service.ts"]
QI["customer-profile.service.ts"]
QJ["email.service.ts"]
QK["image-upload.service.ts"]
QL["order.service.ts"]
QM["payment-logger.service.ts"]
QN["payment.service.ts"]
QO["product.service.ts"]
QP["seller-info.service.ts"]
QQ["shipping-calculation.service.ts"]
QR["site-language.service.ts"]
QS["token.service.ts"]
QT["translation.service.ts"]
QU["user.service.ts"]
QV["auth.service.password-policy.spec.ts"]
QW["auth.service.spec.ts"]
QX["cart.service.add-quantity.spec.ts"]
QY["cart.service.spec.ts"]
QZ["order.service.spec.ts"]
R0["product-info-colors.util.spec.ts"]
R1["product.service.pants.spec.ts"]
R2["product.service.spec.ts"]
R3["relay-connection.spec.ts"]
R4["seller-info.service.price-validation.spec.ts"]
R5["shipping-calculation.service.spec.ts"]
R6["token.service.spec.ts"]
end
end
end
subgraph R7["strategies"]
subgraph R8["src"]
R9["index.ts"]
subgraph RA["lib"]
RB["local.strategy.ts"]
end
end
end
subgraph RC["utils"]
subgraph RD["src"]
RE["index.ts"]
subgraph RF["lib"]
RG["email-templates.ts"]
RH["relay-connection.ts"]
RI["pagination.ts"]
end
end
end
end
subgraph RJ["shared"]
subgraph RK["codegen"]
RL["jest.config.ts"]
subgraph RM["src"]
RN["index.ts"]
subgraph RO["lib"]
subgraph RP["generated"]
RQ["graphql.ts"]
end
end
end
end
subgraph RR["graphql-schema"]
RS["jest.config.ts"]
subgraph RT["src"]
RU["index.ts"]
end
end
subgraph RV["product-sizes"]
subgraph RW["src"]
RX["index.ts"]
subgraph RY["lib"]
RZ["product-sizes.ts"]
S0["product-sizes.pants-formats.spec.ts"]
S1["product-sizes.pants-label.spec.ts"]
S2["product-sizes.pants-strict.spec.ts"]
S3["product-sizes.spec.ts"]
end
end
end
subgraph S4["shared-i18n"]
subgraph S5["src"]
S6["index.ts"]
subgraph S7["lib"]
S8["language-context.tsx"]
S9["language-detector.ts"]
subgraph SA["locales"]
SB["i18n-react.tsx"]
SC["i18n-util.ts"]
SD["i18n-util.async.ts"]
subgraph SE["en"]
SF["index.ts"]
end
subgraph SH["fa"]
SI["index.ts"]
end
SJ["formatters.ts"]
SK["i18n-types.ts"]
SL["i18n-util.sync.ts"]
SM["navigator-detector.ts"]
end
SG["site-name.ts"]
SN["table-localization.ts"]
SO["theme-provider.tsx"]
SP["use-page-title.ts"]
end
end
end
end
end
5-->6
7-->6
8-->4
8-->6
F-->H
I-->H
L-->N
O-->N
R-->T
R-->U
T-->U
V-->T
Y-->Z
Z-->11
12-->11
15-->17
15-->18
15-->19
15-->1A
15-->1D
1A-->1B
1B-->1C
1D-->17
1E-->1B
1E-->1A
1G-->1C
1H-->17
1I-->18
1J-->1D
1P-->1R
1S-->1R
1T-->1R
1W-->1Y
22-->24
22-->25
25-->24
26-->25
2A-->2C
2D-->2C
2G-->2I
2I-->2J
2K-->2I
2N-->2P
2Q-->2P
2T-->2U
2U-->2W
2X-->2W
31-->32
32-->34
35-->34
36-->34
39-->3B
3C-->3B
3F-->3H
3I-->3H
3M-->3O
3P-->3O
3S-->3T
3T-->3V
3W-->3V
3X-->3V
41-->42
42-->44
44-->45
44-->47
45-->46
48-->44
49-->47
4E-->4F
4F-->4H
4I-->4H
4M-->4O
4O-->4P
4S-->4T
4T-->4V
4W-->4V
50-->51
51-->53
54-->53
59-->5B
59-->5C
5B-->5C
5D-->5B
5G-->5I
5J-->5I
5M-->5O
5M-->5P
5O-->5P
5Q-->5O
5R-->5P
5U-->5W
5X-->5W
5Y-->5W
63-->65
66-->65
69-->6B
69-->6C
69-->6D
69-->6G
6D-->6E
6E-->6F
6L-->6N
6L-->6O
6L-->6P
6L-->6Q
6R-->6O
6W-->6Y
6W-->6Z
6W-->70
71-->6Z
72-->6Y
75-->77
7A-->7C
7F-->7H
7F-->7I
7H-->7I
7J-->7H
7K-->7I
7N-->7P
7Q-->7P
7U-->7W
7X-->7W
81-->83
86-->88
89-->88
8D-->8F
8I-->8K
8L-->8K
8M-->8K
8P-->8R
8U-->8W
8U-->8X
8U-->8Y
8W-->8X
8X-->8Y
8Z-->8W
92-->94
97-->99
9A-->99
9D-->9F
9G-->9F
9H-->9F
9L-->9N
9O-->9N
9P-->9N
9S-->9U
9V-->9U
9Y-->A0
A1-->A0
A5-->A7
A8-->A7
AC-->AE
AC-->AN
AC-->AH
AC-->AM
AE-->AG
AE-->AI
AE-->AJ
AE-->AK
AE-->AL
AE-->AH
AE-->AM
AG-->AH
AN-->AH
AO-->AK
AO-->AE
AO-->AH
AP-->AQ
AP-->AK
AP-->AE
AP-->AN
AP-->AH
AR-->AN
AS-->AH
AU-->AH
AY-->B0
B1-->B0
B4-->B6
B7-->B6
BB-->BD
BE-->BD
BI-->BK
BL-->BK
BM-->BK
BQ-->BS
BT-->BS
BW-->BY
BZ-->BY
C3-->C5
C9-->CB
CE-->CG
CH-->CG
CH-->CI
CM-->CO
CP-->CO
CT-->CV
CW-->CV
D0-->D2
D3-->D2
D5-->D7
DC-->DE
DF-->DE
DI-->DK
DN-->DP
DN-->DQ
DP-->DQ
DU-->DW
DX-->DW
E0-->E2
E0-->E3
E0-->E4
E0-->E7
E4-->E5
E5-->E6
E7-->E2
E7-->E8
EF-->EH
EH-->EI
EL-->EN
EQ-->ES
EQ-->ET
EW-->EY
F1-->F3
F7-->F9
FA-->F9
FD-->FF
FI-->FK
FK-->FL
FM-->FL
FN-->FL
FO-->FK
FR-->FT
FU-->FT
FV-->FT
G0-->G2
G3-->G2
G4-->G2
G8-->GA
GD-->GF
GJ-->GL
GR-->GT
GR-->GU
GV-->GU
GY-->H0
H1-->H0
H5-->H7
H8-->H7
HB-->HD
HG-->HI
HG-->HJ
HG-->HK
HI-->HJ
HL-->HI
HP-->HR
HS-->HR
HV-->HX
I0-->I2
I3-->I2
I6-->I8
I8-->I9
IC-->IE
IE-->IF
IE-->IG
IE-->IH
IE-->II
IG-->IF
IG-->IH
IJ-->IK
IN-->IP
IT-->IV
IW-->IV
IZ-->J1
J4-->J6
J4-->J7
J4-->J8
J4-->J9
JE-->JG
JE-->JH
JH-->JG
JL-->JN
JN-->JO
JR-->JT
JT-->JU
JX-->JZ
JX-->K1
JX-->K2
JX-->K0
JZ-->K0
K3-->K0
K6-->K8
K6-->K9
K6-->KA
KA-->K9
KB-->K8
KE-->KG
KE-->KH
KH-->KG
KI-->KH
KM-->KO
KM-->KP
KP-->KO
KS-->KU
KY-->L0
L1-->L0
L5-->L7
L8-->L7
LB-->LD
LE-->LD
LH-->LJ
LM-->LO
LT-->LV
LY-->M0
LY-->M1
M4-->M6
M7-->M8
MC-->ME
MH-->MJ
MM-->MO
MT-->MV
MT-->MW
N0-->N2
N0-->N3
N4-->N3
N7-->N9
N7-->NK
N7-->NB
N7-->NF
N7-->NL
N7-->NM
N7-->NN
N7-->NO
N7-->NP
N7-->NQ
N7-->NC
N7-->NG
N7-->NE
N7-->NA
N7-->NR
N7-->NH
N7-->NS
N7-->NI
N7-->ND
N7-->NT
N7-->NJ
N9-->NA
NA-->N9
NA-->NB
NA-->NC
NA-->NE
NA-->NH
NA-->NI
NB-->NA
NC-->NA
NC-->ND
ND-->NC
NE-->NF
NE-->NG
NE-->NA
NG-->NF
NG-->NE
NH-->NI
NH-->NJ
NI-->NE
NI-->NA
NI-->NH
NK-->NA
NK-->NJ
NL-->NM
NN-->NJ
NO-->NM
NO-->NJ
NP-->NA
NP-->NH
NR-->NJ
NS-->NP
NX-->NZ
NX-->O0
NX-->O1
NX-->O2
O3-->NZ
O4-->O2
O7-->O9
O7-->OA
O7-->OB
O7-->OC
O7-->OD
O7-->OE
O7-->OF
O7-->OG
O7-->OH
O7-->OI
O7-->OJ
O7-->OK
O7-->OL
OH-->OG
OO-->OQ
OO-->OV
OO-->OY
OO-->OW
OO-->P0
OO-->P2
OO-->P3
OO-->OU
OO-->OR
OO-->P4
OO-->P5
OO-->P7
OO-->OZ
OO-->P8
OO-->P1
OO-->P6
OO-->P9
OO-->PA
OO-->OS
OO-->OX
OO-->OT
OQ-->OR
OQ-->OS
OQ-->OT
OT-->OQ
OT-->OU
OV-->OW
OV-->OX
OY-->OZ
P0-->OW
P0-->P1
P0-->OX
P1-->OW
P1-->OS
P1-->OX
P2-->OW
P2-->OX
P4-->OR
P4-->OS
P4-->OT
P5-->OZ
P5-->P6
P6-->P1
P6-->OS
P6-->OT
P7-->P5
P8-->P1
P8-->OX
P9-->P6
P9-->OT
PE-->PG
PE-->PH
PE-->PI
PE-->PJ
PE-->PK
PE-->PL
PE-->PM
PE-->PN
PE-->PO
PE-->PP
PE-->PQ
PE-->PR
PE-->PS
PE-->PT
PE-->PU
PE-->PV
PE-->PW
PX-->PG
PY-->PN
PZ-->PO
Q0-->PO
Q1-->PP
Q2-->PV
Q5-->PW
Q9-->QB
Q9-->QC
Q9-->QD
Q9-->QF
Q9-->QG
Q9-->QH
Q9-->QI
Q9-->QJ
Q9-->QK
Q9-->QL
Q9-->QM
Q9-->QN
Q9-->QE
Q9-->QO
Q9-->QP
Q9-->QQ
Q9-->QR
Q9-->QS
Q9-->QT
Q9-->QU
QD-->QE
QO-->QE
QP-->QE
QV-->QB
QV-->QJ
QV-->QS
QV-->QU
QW-->QB
QW-->QJ
QW-->QS
QW-->QU
QX-->QD
QY-->QD
QZ-->QL
R0-->QE
R1-->QO
R1-->QT
R2-->QO
R2-->QT
R4-->QB
R4-->QP
R5-->QQ
R6-->QS
R9-->RB
RE-->RG
RE-->RH
RN-->RQ
RX-->RZ
S0-->RZ
S1-->RZ
S2-->RZ
S3-->RZ
S6-->S8
S6-->S9
S6-->SB
S6-->SK
S6-->SC
S6-->SD
S6-->SL
S6-->SM
S6-->SG
S6-->SN
S6-->SO
S6-->SP
S8-->S9
S8-->SB
S8-->SD
SB-->SC
SD-->SF
SD-->SI
SD-->SJ
SD-->SC
SF-->SG
SI-->SG
SL-->SF
SL-->SI
SL-->SJ
SL-->SC
SN-->SB
SO-->S8
SP-->SB
