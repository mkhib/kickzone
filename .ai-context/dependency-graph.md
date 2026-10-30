flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.ts"]
end
5["main.ts"]
end
end
end
subgraph 6["libs"]
subgraph 7["client"]
subgraph 8["admins"]
subgraph 9["components"]
subgraph A["footer"]
subgraph B["src"]
C["index.ts"]
subgraph D["lib"]
E["admins-footer.tsx"]
F["admins-footer.spec.tsx"]
end
end
end
subgraph G["headerbar"]
subgraph H["src"]
I["index.ts"]
subgraph J["lib"]
K["AdminsHeaderbar.tsx"]
L["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph M["layout"]
subgraph N["src"]
O["index.ts"]
subgraph P["lib"]
Q["AdminsLayout.tsx"]
R["AdminsTabbar.tsx"]
S["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph T["contexts"]
subgraph U["src"]
V["index.spec.tsx"]
W["index.ts"]
subgraph X["lib"]
Y["AdminsAuthContext.tsx"]
Z["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 10["graphql"]
subgraph 11["src"]
12["index.ts"]
subgraph 13["lib"]
14["fragments.ts"]
15["mutations.ts"]
16["orders.graphql.ts"]
17["Provider.tsx"]
18["AdminsApolloProvider.tsx"]
19["client.ts"]
1A["queries.ts"]
1B["Provider.spec.tsx"]
1C["apollo-upload-client.d.ts"]
1D["client.spec.tsx"]
1E["fragments.spec.tsx"]
1F["mutations.spec.tsx"]
1G["queries.spec.tsx"]
end
subgraph 1H["types"]
1I["apollo-upload-client.d.ts"]
end
end
end
subgraph 1J["hooks"]
subgraph 1K["auth"]
subgraph 1L["src"]
1M["index.ts"]
subgraph 1N["lib"]
1O["useAdminLogin.ts"]
1P["useAdminLogin.spec.ts"]
1Q["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1R["currency-management"]
subgraph 1S["src"]
1T["index.ts"]
subgraph 1U["lib"]
1V["useAdminsCurrencyManagement.ts"]
end
end
1W["vite.config.ts"]
end
subgraph 1X["customers"]
subgraph 1Y["src"]
1Z["index.ts"]
subgraph 20["lib"]
21["adminsCustomers.graphql.ts"]
22["useAdminsCustomers.ts"]
23["useAdminsCustomers.spec.tsx"]
end
end
24["vite.config.ts"]
end
subgraph 25["orders"]
subgraph 26["src"]
27["index.ts"]
subgraph 28["lib"]
29["admins-orders-hook.tsx"]
2A["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2B["sellers"]
subgraph 2C["src"]
2D["index.ts"]
subgraph 2E["lib"]
2F["useAdminsSellers.ts"]
2G["adminsSellers.graphql.ts"]
2H["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2I["router"]
subgraph 2J["src"]
2K["index.ts"]
subgraph 2L["lib"]
2M["AdminsRouter.tsx"]
2N["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2O["routes"]
subgraph 2P["src"]
2Q["index.spec.ts"]
2R["index.ts"]
subgraph 2S["lib"]
2T["admin-routes.ts"]
2U["admin-routes.spec.ts"]
end
end
end
subgraph 2V["screens"]
subgraph 2W["admin-seller-orders"]
subgraph 2X["src"]
2Y["index.spec.tsx"]
2Z["index.ts"]
subgraph 30["lib"]
31["admin-seller-orders.tsx"]
32["admin-seller-orders.pants-size.spec.tsx"]
33["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 34["currency-management"]
subgraph 35["src"]
36["index.ts"]
subgraph 37["lib"]
38["currency-management.tsx"]
39["currency-management.spec.tsx"]
end
end
end
subgraph 3A["customer-management"]
subgraph 3B["src"]
3C["index.ts"]
subgraph 3D["lib"]
3E["admin-customer-management.tsx"]
3F["admin-customer-management.spec.tsx"]
end
end
3G["vite.config.ts"]
end
subgraph 3H["login"]
subgraph 3I["src"]
3J["index.ts"]
subgraph 3K["lib"]
3L["AdminsLogin.tsx"]
3M["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3N["product-editor"]
subgraph 3O["src"]
3P["index.spec.tsx"]
3Q["index.ts"]
subgraph 3R["lib"]
3S["AdminProductEditor.tsx"]
3T["AdminProductEditor.pants-range.spec.tsx"]
3U["AdminProductEditor.spec.tsx"]
end
3V["vite-env.d.ts"]
end
end
subgraph 3W["products"]
subgraph 3X["src"]
3Y["index.spec.tsx"]
3Z["index.ts"]
subgraph 40["lib"]
41["AdminProducts.tsx"]
42["adminProducts.hooks.ts"]
43["adminProducts.graphql.ts"]
44["ProductImageManagementModal.tsx"]
45["AdminProducts.spec.tsx"]
46["ProductImageManagementModal.pants-size.spec.tsx"]
47["ProductImageManagementModal.spec.tsx"]
end
48["vite-env.d.ts"]
end
end
subgraph 49["seller-management"]
subgraph 4A["src"]
4B["index.spec.tsx"]
4C["index.ts"]
subgraph 4D["lib"]
4E["SellerManagement.tsx"]
4F["SellerManagement.spec.tsx"]
end
4G["vite-env.d.ts"]
end
end
subgraph 4H["translation-management"]
subgraph 4I["src"]
4J["index.ts"]
subgraph 4K["lib"]
4L["AdminTranslationManagement.tsx"]
4M["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4N["unauthorized"]
subgraph 4O["src"]
4P["index.spec.tsx"]
4Q["index.ts"]
subgraph 4R["lib"]
4S["admins-unauthorized-screen.tsx"]
4T["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4U["zustand"]
subgraph 4V["admins-products-store"]
subgraph 4W["src"]
4X["index.spec.ts"]
4Y["index.ts"]
subgraph 4Z["lib"]
50["admins-products-store.ts"]
51["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 52["customers"]
subgraph 53["components"]
subgraph 54["footer"]
subgraph 55["src"]
56["index.ts"]
subgraph 57["lib"]
58["customers-footer.tsx"]
59["TrustBadgeIcons.tsx"]
5A["customers-footer.spec.tsx"]
end
end
end
subgraph 5B["headerbar"]
subgraph 5C["src"]
5D["index.ts"]
subgraph 5E["lib"]
5F["CustomersHeaderbar.tsx"]
5G["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5H["layout"]
subgraph 5I["src"]
5J["index.ts"]
subgraph 5K["lib"]
5L["CustomersLayout.tsx"]
5M["CustomersTabbar.tsx"]
5N["CustomersLayout.spec.tsx"]
5O["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5P["product-card"]
subgraph 5Q["src"]
5R["index.ts"]
subgraph 5S["lib"]
5T["CustomersProductCard.tsx"]
5U["CustomersProductCard.pants-size.spec.tsx"]
5V["CustomersProductCard.spec.tsx"]
end
5W["vite-env.d.ts"]
end
end
end
subgraph 5X["contexts"]
subgraph 5Y["auth"]
subgraph 5Z["src"]
60["index.ts"]
subgraph 61["lib"]
62["CustomersAuthContext.tsx"]
63["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 64["graphql"]
subgraph 65["src"]
66["index.ts"]
subgraph 67["lib"]
68["customer-profile.queries.ts"]
69["mutations.ts"]
6A["Provider.tsx"]
6B["CustomersApolloProvider.tsx"]
6C["client.ts"]
6D["queries.ts"]
6E["apollo-upload-client.d.ts"]
end
end
end
subgraph 6F["hooks"]
subgraph 6G["auth"]
subgraph 6H["src"]
6I["index.ts"]
subgraph 6J["lib"]
6K["useCustomersForgotPassword.tsx"]
6L["useCustomersLogin.tsx"]
6M["useCustomersRegister.tsx"]
6N["useCustomersResetPassword.tsx"]
6O["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6P["cart"]
6Q["jest.config.ts"]
6R["jest.setup.ts"]
subgraph 6S["src"]
6T["index.ts"]
subgraph 6U["lib"]
6V["customers-cart-hook.tsx"]
6W["useCartService.ts"]
6X["useWishlistSync.ts"]
6Y["useCartService.spec.tsx"]
6Z["useCartSync.ts"]
end
end
end
subgraph 70["orders"]
subgraph 71["src"]
72["index.ts"]
subgraph 73["lib"]
74["customers-orders-hook.tsx"]
end
end
end
subgraph 75["products"]
subgraph 76["src"]
77["index.ts"]
subgraph 78["lib"]
79["customers-product-hook.tsx"]
end
end
end
end
subgraph 7A["router"]
subgraph 7B["src"]
7C["index.ts"]
subgraph 7D["lib"]
7E["CustomersRouter.tsx"]
7F["ScrollToTop.tsx"]
7G["CustomersRouter.spec.tsx"]
7H["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7I["routes"]
subgraph 7J["src"]
7K["index.ts"]
subgraph 7L["lib"]
7M["customer-routes.ts"]
7N["customer-routes.spec.ts"]
end
end
end
subgraph 7O["screens"]
subgraph 7P["contact"]
subgraph 7Q["src"]
7R["index.ts"]
subgraph 7S["lib"]
7T["customer-contact.tsx"]
7U["customer-contact.spec.tsx"]
end
end
7V["vite.config.ts"]
end
subgraph 7W["customer-checkout"]
subgraph 7X["src"]
7Y["index.ts"]
subgraph 7Z["lib"]
80["customer-checkout.tsx"]
end
end
end
subgraph 81["customer-favorites"]
subgraph 82["src"]
83["index.ts"]
subgraph 84["lib"]
85["customer-favorites.tsx"]
86["customer-favorites.spec.tsx"]
end
end
87["vite.config.ts"]
end
subgraph 88["customer-login"]
subgraph 89["src"]
8A["index.ts"]
subgraph 8B["lib"]
8C["customer-login.tsx"]
end
end
end
subgraph 8D["customer-order-confirmation"]
subgraph 8E["src"]
8F["index.ts"]
subgraph 8G["lib"]
8H["customer-order-confirmation.tsx"]
8I["customer-order-confirmation.pants-size.spec.tsx"]
8J["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8K["customer-orders"]
subgraph 8L["src"]
8M["index.ts"]
subgraph 8N["lib"]
8O["customer-orders.tsx"]
end
end
end
subgraph 8P["customer-payment"]
subgraph 8Q["src"]
8R["index.ts"]
subgraph 8S["lib"]
8T["customer-payment-callback.tsx"]
8U["use-zarinpal-payment.tsx"]
8V["zarinpal-payment-service.ts"]
8W["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 8X["customer-products"]
subgraph 8Y["src"]
8Z["index.ts"]
subgraph 90["lib"]
91["customer-products.tsx"]
end
end
end
subgraph 92["customer-profile"]
subgraph 93["src"]
94["index.ts"]
subgraph 95["lib"]
96["customer-profile.tsx"]
97["customer-profile.spec.tsx"]
end
end
end
subgraph 98["customer-shopping-cart"]
subgraph 99["src"]
9A["index.ts"]
subgraph 9B["lib"]
9C["customer-shopping-cart.tsx"]
9D["customer-shopping-cart.pants-size.spec.tsx"]
9E["customer-shopping-cart.spec.tsx"]
end
end
9F["vite.config.ts"]
end
subgraph 9G["customer-signup"]
subgraph 9H["src"]
9I["index.ts"]
subgraph 9J["lib"]
9K["customer-signup.tsx"]
9L["customer-signup.spec.tsx"]
end
end
end
subgraph 9M["forgot-password"]
subgraph 9N["src"]
9O["index.ts"]
subgraph 9P["lib"]
9Q["customer-forgot-password.tsx"]
9R["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9S["guide-authenticity"]
subgraph 9T["src"]
9U["index.ts"]
subgraph 9V["lib"]
9W["customer-guide-authenticity.tsx"]
9X["customer-guide-authenticity.spec.tsx"]
end
end
9Y["vite.config.ts"]
end
subgraph 9Z["guide-payment"]
subgraph A0["src"]
A1["index.ts"]
subgraph A2["lib"]
A3["customer-guide-payment.tsx"]
A4["customer-guide-payment.spec.tsx"]
end
end
A5["vite.config.ts"]
end
subgraph A6["home"]
subgraph A7["src"]
A8["index.ts"]
subgraph A9["lib"]
AA["CustomersHomeScreen.tsx"]
subgraph AB["components"]
AC["CategoryBentoSection.tsx"]
AE["HeroSection.tsx"]
AF["HomeLoadingScreen.tsx"]
AG["PicksRailSection.tsx"]
AH["TrustStripSection.tsx"]
AM["NewArrivalsSection.tsx"]
AO["BrandBlocksSection.tsx"]
AP["NewsletterSection.tsx"]
AQ["ShopTheLookSection.tsx"]
AR["TickerSection.tsx"]
end
AD["home-selectors.ts"]
AI["useScrollProgress.ts"]
AJ["CustomersShopScreen.tsx"]
AK["CustomersHomeScreen.cart-size.spec.tsx"]
AL["CustomersHomeScreen.spec.tsx"]
AN["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AS["login"]
subgraph AT["src"]
AU["index.ts"]
subgraph AV["lib"]
AW["CustomersLoginScreen.tsx"]
AX["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AY["not-found"]
subgraph AZ["src"]
B0["index.ts"]
subgraph B1["lib"]
B2["customer-not-found.tsx"]
B3["customer-not-found.spec.tsx"]
end
end
B4["vite.config.ts"]
end
subgraph B5["privacy-policy"]
subgraph B6["src"]
B7["index.ts"]
subgraph B8["lib"]
B9["customer-privacy-policy.tsx"]
BA["customer-privacy-policy.spec.tsx"]
end
end
BB["vite.config.ts"]
end
subgraph BC["product-details"]
subgraph BD["src"]
BE["index.ts"]
subgraph BF["lib"]
BG["customer-product-details.tsx"]
BH["customer-product-details.pants-size.spec.tsx"]
BI["customer-product-details.spec.tsx"]
end
end
BJ["vite.config.ts"]
end
subgraph BK["reset-password"]
subgraph BL["src"]
BM["index.ts"]
subgraph BN["lib"]
BO["customer-reset-password.tsx"]
end
end
end
subgraph BP["shipping-returns"]
subgraph BQ["src"]
BR["index.ts"]
subgraph BS["lib"]
BT["customer-shipping-returns.tsx"]
BU["customer-shipping-returns.spec.tsx"]
end
end
BV["vite.config.ts"]
end
subgraph BW["unauthorized"]
subgraph BX["src"]
BY["index.ts"]
subgraph BZ["lib"]
C0["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C1["utility"]
subgraph C2["test"]
subgraph C3["src"]
C4["index.ts"]
subgraph C5["lib"]
C6["customers-test-utility.tsx"]
end
end
end
end
subgraph C7["validations"]
subgraph C8["src"]
C9["index.ts"]
subgraph CA["lib"]
CB["shipping-validation.ts"]
CC["shipping-validation.spec.tsx"]
CD["shipping-validation.tsx"]
end
end
end
subgraph CE["zustand"]
subgraph CF["customer-cart-store"]
subgraph CG["src"]
CH["index.ts"]
subgraph CI["lib"]
CJ["customer-cart-store.ts"]
CK["customer-cart-store.spec.ts"]
CL["customer-cart-store.tsx"]
end
end
end
subgraph CM["customer-checkout-store"]
subgraph CN["src"]
CO["index.ts"]
subgraph CP["lib"]
CQ["customer-checkout-store.ts"]
CR["customer-checkout-store.spec.ts"]
end
end
CS["vite.config.ts"]
end
subgraph CT["customer-wishlist-store"]
subgraph CU["src"]
CV["index.ts"]
subgraph CW["lib"]
CX["customer-wishlist-store.ts"]
CY["customer-wishlist-store.spec.ts"]
end
end
end
subgraph CZ["src"]
D0["index.ts"]
subgraph D1["lib"]
D2["customers-products-store.tsx"]
end
end
end
end
subgraph D3["sellers"]
subgraph D4["components"]
subgraph D5["footer"]
subgraph D6["src"]
D7["index.ts"]
subgraph D8["lib"]
D9["sellers-footer.tsx"]
DA["sellers-footer.spec.tsx"]
end
end
end
subgraph DB["headerbar"]
subgraph DC["src"]
DD["index.ts"]
subgraph DE["lib"]
DF["SellersHeaderbar.tsx"]
end
end
end
subgraph DG["layout"]
subgraph DH["src"]
DI["index.ts"]
subgraph DJ["lib"]
DK["SellersLayout.tsx"]
DL["SellersTabbar.tsx"]
end
end
end
end
subgraph DM["contexts"]
subgraph DN["auth"]
subgraph DO["src"]
DP["index.ts"]
subgraph DQ["lib"]
DR["SellersAuthContext.tsx"]
DS["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DT["graphql"]
subgraph DU["src"]
DV["index.ts"]
subgraph DW["lib"]
DX["fragments.ts"]
DY["mutations.ts"]
DZ["Provider.tsx"]
E0["SellersApolloProvider.tsx"]
E1["client.ts"]
E2["queries.ts"]
E3["seller-orders.graphql.ts"]
E4["apollo-upload-client.d.ts"]
end
subgraph E5["types"]
E6["apollo-upload-client.d.ts"]
end
end
end
subgraph E7["hooks"]
subgraph E8["auth"]
subgraph E9["src"]
EA["index.ts"]
subgraph EB["lib"]
EC["useSellerAuth.ts"]
ED["sellerAuth.graphql.ts"]
end
end
end
subgraph EE["orders"]
subgraph EF["src"]
EG["index.ts"]
subgraph EH["lib"]
EI["useSellerOrders.ts"]
end
end
end
subgraph EJ["products"]
subgraph EK["src"]
EL["index.ts"]
subgraph EM["lib"]
EN["useSellersProductManagement.ts"]
EO["useSellersProducts.ts"]
end
end
end
end
subgraph EP["router"]
subgraph EQ["src"]
ER["index.ts"]
subgraph ES["lib"]
ET["SellersRouter.tsx"]
end
end
end
subgraph EU["routes"]
subgraph EV["src"]
EW["index.ts"]
subgraph EX["lib"]
EY["seller-routes.ts"]
end
end
end
subgraph EZ["screens"]
subgraph F0["catalog"]
subgraph F1["src"]
F2["index.ts"]
subgraph F3["lib"]
F4["SellersCatalogScreens.tsx"]
F5["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F6["login"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["SellersLogin.tsx"]
end
end
end
subgraph FB["manage-product"]
subgraph FC["src"]
FD["index.ts"]
subgraph FE["lib"]
FF["SellersManageProductScreen.tsx"]
FG["SellersDefineProductFlow.tsx"]
FH["SellersDefineProductFlow.pants-label.spec.tsx"]
FI["SellersDefineProductFlow.spec.tsx"]
FJ["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FK["products"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["SellersProducts.tsx"]
FP["SellersProducts.pants-label.spec.tsx"]
FQ["SellersProducts.spec.tsx"]
end
end
end
subgraph FR["seller-orders"]
FS["jest.config.ts"]
FT["jest.setup.ts"]
subgraph FU["src"]
FV["index.ts"]
subgraph FW["lib"]
FX["seller-orders-screen.tsx"]
FY["seller-orders-screen.pants-size.spec.tsx"]
FZ["seller-orders-screen.spec.tsx"]
end
G0["test-setup.ts"]
end
end
subgraph G1["setup-password"]
subgraph G2["src"]
G3["index.ts"]
subgraph G4["lib"]
G5["SellersSetupPassword.tsx"]
end
end
end
subgraph G6["unauthorized"]
subgraph G7["src"]
G8["index.ts"]
subgraph G9["lib"]
GA["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GB["zustand"]
subgraph GC["sellers-products-store"]
subgraph GD["src"]
GE["index.ts"]
subgraph GF["lib"]
GG["useSellersProductsStore.ts"]
GH["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GI["shared"]
subgraph GJ["components"]
subgraph GK["apollo-provider-base"]
subgraph GL["src"]
GM["index.ts"]
subgraph GN["lib"]
GO["ApolloProviderBase.tsx"]
GP["createSilentRefreshAuthLink.ts"]
GQ["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GR["error-boundary"]
subgraph GS["src"]
GT["index.ts"]
subgraph GU["lib"]
GV["error-boundary.tsx"]
GW["error-boundary.spec.tsx"]
end
end
GX["vite.config.ts"]
end
subgraph GY["glassmorphism-container"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["glassmorphism-container.tsx"]
H3["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H4["layout"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["Layout.tsx"]
end
end
end
subgraph H9["material-data-table"]
subgraph HA["src"]
HB["index.ts"]
subgraph HC["lib"]
HD["material-data-table.tsx"]
HE["table-config.ts"]
HF["table-utils.ts"]
HG["material-data-table.spec.tsx"]
HH["table-types.ts"]
end
end
end
subgraph HI["order-status-chip"]
subgraph HJ["src"]
HK["index.ts"]
subgraph HL["lib"]
HM["order-status-chip.tsx"]
HN["order-status-chip.spec.tsx"]
end
end
end
subgraph HO["password-field"]
subgraph HP["src"]
HQ["index.ts"]
subgraph HR["lib"]
HS["PasswordTextField.tsx"]
end
end
end
subgraph HT["price-display"]
subgraph HU["src"]
HV["index.ts"]
subgraph HW["lib"]
HX["price-display.tsx"]
HY["price-display.spec.tsx"]
end
end
end
subgraph HZ["private-route"]
subgraph I0["src"]
I1["index.ts"]
subgraph I2["lib"]
I3["createPrivateRoute.tsx"]
I4["PrivateRoute.tsx"]
end
end
end
subgraph I5["rtl-table-utils"]
subgraph I6["src"]
I7["index.ts"]
subgraph I8["lib"]
I9["rtl-table-utils.ts"]
IA["rtl-cell-components.tsx"]
IB["rtl-column-helpers.ts"]
IC["rtl-table-props.ts"]
ID["use-table-alignment.ts"]
IE["rtl-table-utils.spec.tsx"]
IF["rtl-table-utils.tsx"]
end
end
end
subgraph IG["snackbar"]
subgraph IH["src"]
II["index.ts"]
subgraph IJ["lib"]
IK["snackbar.tsx"]
IL["Snackbar.tsx"]
end
end
end
subgraph IM["styled-drawer"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["styled-drawer.tsx"]
IR["styled-drawer.spec.tsx"]
end
end
end
subgraph IS["unauthorized"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["unauthorized-path.tsx"]
end
end
end
end
subgraph IX["graphql"]
subgraph IY["src"]
IZ["index.ts"]
subgraph J0["lib"]
J1["currency.mutations.ts"]
J2["currency.queries.ts"]
J3["fragments.ts"]
J4["variant-colors.ts"]
J5["client-shared-graphql.tsx"]
end
end
end
subgraph J6["hooks"]
subgraph J7["brands"]
subgraph J8["src"]
J9["index.ts"]
subgraph JA["lib"]
JB["brands.graphql.ts"]
JC["useBrands.ts"]
end
end
JD["vite.config.ts"]
end
subgraph JE["categories"]
subgraph JF["src"]
JG["index.ts"]
subgraph JH["lib"]
JI["useCategories.ts"]
JJ["categories.graphql.ts"]
end
end
end
subgraph JK["colors"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["useColors.ts"]
JP["color.graphql.ts"]
end
end
end
subgraph JQ["currency"]
subgraph JR["src"]
JS["index.ts"]
subgraph JT["lib"]
JU["useConvertPrice.tsx"]
JV["useExchangeRate.tsx"]
JW["useCurrencies.tsx"]
JX["useCurrencyForLocale.tsx"]
JY["useExchangeRate.spec.tsx"]
end
end
end
subgraph JZ["products"]
subgraph K0["src"]
K1["index.ts"]
subgraph K2["lib"]
K3["productImage.ts"]
K4["products.graphql.ts"]
K5["useProducts.ts"]
K6["productImage.spec.ts"]
end
end
end
subgraph K7["site-languages"]
subgraph K8["src"]
K9["index.ts"]
subgraph KA["lib"]
KB["site-languages.graphql.ts"]
KC["useSiteLanguages.ts"]
KD["site-languages-hook.spec.tsx"]
end
end
KE["vite.config.ts"]
end
subgraph KF["snackbar"]
subgraph KG["src"]
KH["index.ts"]
subgraph KI["lib"]
KJ["SnackbarContext.tsx"]
KK["useSnackbar.ts"]
end
end
end
subgraph KL["translations-management-hook"]
subgraph KM["src"]
KN["index.ts"]
subgraph KO["lib"]
KP["useTranslationsManagement.ts"]
end
end
end
end
subgraph KQ["lottie"]
subgraph KR["empty-cart"]
subgraph KS["src"]
KT["index.ts"]
subgraph KU["lib"]
KV["lottie-empty-cart.tsx"]
KW["lottie-empty-cart.spec.tsx"]
end
end
KX["vite.config.ts"]
end
subgraph KY["loading"]
subgraph KZ["src"]
L0["index.ts"]
subgraph L1["lib"]
L2["lottie-loading.tsx"]
L3["lottie-loading.spec.tsx"]
end
end
end
subgraph L4["success-check"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["lottie-success-check.tsx"]
L9["lottie-success-check.spec.tsx"]
end
end
end
subgraph LA["unauthorized"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LF["translations"]
subgraph LG["src"]
LH["index.ts"]
subgraph LI["lib"]
LJ["mapApolloErrorToTranslationKey.ts"]
LK["WrapTranslation.tsx"]
end
end
end
subgraph LL["ui"]
subgraph LM["colors"]
subgraph LN["src"]
LO["index.ts"]
subgraph LP["lib"]
LQ["colors.ts"]
end
end
end
subgraph LR["language-components"]
subgraph LS["src"]
LT["index.ts"]
subgraph LU["lib"]
LV["language-components.tsx"]
LW["ltr-text-field.tsx"]
end
end
end
subgraph LX["sizes"]
subgraph LY["src"]
LZ["index.ts"]
subgraph M0["lib"]
M1["sizes.ts"]
M2["sizes.spec.tsx"]
M3["sizes.tsx"]
end
end
end
end
subgraph M4["zustand"]
subgraph M5["shared-auth-store"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["shared-auth-store.ts"]
end
end
end
subgraph MA["shared-notification-store"]
subgraph MB["src"]
MC["index.ts"]
subgraph MD["lib"]
ME["shared-notification-store.tsx"]
end
end
end
subgraph MF["shared-ui-store"]
subgraph MG["src"]
MH["index.ts"]
subgraph MI["lib"]
MJ["shared-ui-store.ts"]
MK["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph ML["server"]
subgraph MM["controllers"]
subgraph MN["src"]
MO["index.ts"]
subgraph MP["lib"]
MQ["auth.controller.ts"]
MR["order.controller.ts"]
end
end
end
subgraph MS["decorators"]
MT["jest.config.ts"]
subgraph MU["src"]
MV["index.ts"]
subgraph MW["lib"]
MX["current-user.decorator.ts"]
MY["decorators.ts"]
MZ["decorators.spec.ts"]
end
end
end
subgraph N0["entities"]
subgraph N1["src"]
N2["index.ts"]
subgraph N3["lib"]
N4["brand.entity.ts"]
N5["product.entity.ts"]
N6["category.entity.ts"]
N7["product-description.entity.ts"]
N8["site-language.entity.ts"]
N9["product-info.entity.ts"]
NA["color.entity.ts"]
NB["product-info-color.entity.ts"]
NC["seller-info.entity.ts"]
ND["seller-product.entity.ts"]
NE["user.entity.ts"]
NF["cart.entity.ts"]
NG["currency-preference.entity.ts"]
NH["currency.entity.ts"]
NI["customer.entity.ts"]
NJ["exchange-rate.entity.ts"]
NK["order.entity.ts"]
NL["platform-settings.entity.ts"]
NM["refresh-token.entity.ts"]
NN["seller-order.entity.ts"]
NO["translation.entity.ts"]
end
end
end
subgraph NP["guards"]
NQ["jest.config.ts"]
subgraph NR["src"]
NS["index.ts"]
subgraph NT["lib"]
NU["catalog.guard.ts"]
NV["graphql-auth.guard.ts"]
NW["http-auth.guard.ts"]
NX["roles.guard.ts"]
NY["catalog.guard.spec.ts"]
NZ["roles.guard.spec.ts"]
end
end
end
subgraph O0["inputs"]
subgraph O1["src"]
O2["index.ts"]
subgraph O3["lib"]
O4["brand.input.ts"]
O5["cart.inputs.ts"]
O6["category.input.ts"]
O7["color.input.ts"]
O8["customer-auth.inputs.ts"]
O9["order-pagination.inputs.ts"]
OA["order.inputs.ts"]
OB["product-info-filter.input.ts"]
OC["product.input.ts"]
OD["seller-order-pagination.inputs.ts"]
OE["seller.input.ts"]
OF["site-language.input.ts"]
OG["user.input.ts"]
end
end
end
subgraph OH["modules"]
subgraph OI["src"]
OJ["index.ts"]
subgraph OK["lib"]
OL["auth.module.ts"]
OM["email.module.ts"]
ON["token.module.ts"]
OO["user.module.ts"]
OP["customer-profile.module.ts"]
OQ["brand.module.ts"]
OR["catalog-guard.module.ts"]
OS["translation.module.ts"]
OT["cart.module.ts"]
OU["platform-settings.module.ts"]
OV["category.module.ts"]
OW["product.module.ts"]
OX["color.module.ts"]
OY["currency.module.ts"]
OZ["graphql-context.module.ts"]
P0["order.module.ts"]
P1["seller-info.module.ts"]
P2["payment.module.ts"]
P3["product-info.module.ts"]
P4["seller-products.module.ts"]
P5["site-language.module.ts"]
end
end
end
subgraph P6["resolvers"]
P7["jest.config.ts"]
subgraph P8["src"]
P9["index.ts"]
subgraph PA["lib"]
PB["auth.resolver.ts"]
PC["brand.resolver.ts"]
PD["cart.resolver.ts"]
PE["category.resolver.ts"]
PF["color.resolver.ts"]
PG["currency.resolver.ts"]
PH["customer-profile.resolver.ts"]
PI["order.resolver.ts"]
PJ["payment.resolver.ts"]
PK["product-info.resolver.ts"]
PL["product.resolver.ts"]
PM["seller-info.resolver.ts"]
PN["shipping.resolver.ts"]
PO["site-language.resolver.ts"]
PP["translation.input.ts"]
PQ["translation.resolver.ts"]
PR["user.resolver.ts"]
PS["auth.resolver.spec.ts"]
PT["order.resolver.spec.ts"]
PU["payment.resolver.integration.spec.ts"]
PV["payment.resolver.spec.ts"]
PW["product-info.resolver.spec.ts"]
PX["translation.resolver.guards.spec.ts"]
subgraph PY["types"]
PZ["graphql-upload.d.ts"]
end
Q0["user.resolver.spec.ts"]
end
end
end
subgraph Q1["services"]
Q2["jest.config.ts"]
subgraph Q3["src"]
Q4["index.ts"]
subgraph Q5["lib"]
Q6["auth.service.ts"]
Q7["brand.service.ts"]
Q8["cart.service.ts"]
Q9["product-info-colors.util.ts"]
QA["category.service.ts"]
QB["color.service.ts"]
QC["currency.service.ts"]
QD["customer-profile.service.ts"]
QE["email.service.ts"]
QF["image-upload.service.ts"]
QG["order.service.ts"]
QH["payment-logger.service.ts"]
QI["payment.service.ts"]
QJ["product.service.ts"]
QK["seller-info.service.ts"]
QL["shipping-calculation.service.ts"]
QM["site-language.service.ts"]
QN["token.service.ts"]
QO["translation.service.ts"]
QP["user.service.ts"]
QQ["auth.service.spec.ts"]
QR["cart.service.spec.ts"]
QS["order.service.spec.ts"]
QT["product-info-colors.util.spec.ts"]
QU["product.service.pants.spec.ts"]
QV["product.service.spec.ts"]
QW["relay-connection.spec.ts"]
QX["shipping-calculation.service.spec.ts"]
QY["token.service.spec.ts"]
end
end
end
subgraph QZ["strategies"]
subgraph R0["src"]
R1["index.ts"]
subgraph R2["lib"]
R3["local.strategy.ts"]
end
end
end
subgraph R4["utils"]
subgraph R5["src"]
R6["index.ts"]
subgraph R7["lib"]
R8["email-templates.ts"]
R9["relay-connection.ts"]
RA["pagination.ts"]
end
end
end
end
subgraph RB["shared"]
subgraph RC["codegen"]
RD["jest.config.ts"]
subgraph RE["src"]
RF["index.ts"]
subgraph RG["lib"]
subgraph RH["generated"]
RI["graphql.ts"]
end
end
end
end
subgraph RJ["graphql-schema"]
RK["jest.config.ts"]
subgraph RL["src"]
RM["index.ts"]
end
end
subgraph RN["product-sizes"]
subgraph RO["src"]
RP["index.ts"]
subgraph RQ["lib"]
RR["product-sizes.ts"]
RS["product-sizes.pants-formats.spec.ts"]
RT["product-sizes.pants-label.spec.ts"]
RU["product-sizes.pants-strict.spec.ts"]
RV["product-sizes.spec.ts"]
end
end
end
subgraph RW["shared-i18n"]
subgraph RX["src"]
RY["index.ts"]
subgraph RZ["lib"]
S0["language-context.tsx"]
S1["language-detector.ts"]
subgraph S2["locales"]
S3["i18n-react.tsx"]
S4["i18n-util.ts"]
S5["i18n-util.async.ts"]
subgraph S6["en"]
S7["index.ts"]
end
subgraph S9["fa"]
SA["index.ts"]
end
SB["formatters.ts"]
SC["i18n-types.ts"]
SD["i18n-util.sync.ts"]
SE["navigator-detector.ts"]
end
S8["site-name.ts"]
SF["table-localization.ts"]
SG["theme-provider.tsx"]
SH["use-page-title.ts"]
end
end
end
end
end
5-->4
C-->E
F-->E
I-->K
L-->K
O-->Q
O-->R
Q-->R
S-->Q
V-->W
W-->Y
Z-->Y
12-->14
12-->15
12-->16
12-->17
12-->1A
17-->18
18-->19
1A-->14
1B-->18
1B-->17
1D-->19
1E-->14
1F-->15
1G-->1A
1M-->1O
1P-->1O
1Q-->1O
1T-->1V
1Z-->21
1Z-->22
22-->21
23-->22
27-->29
2A-->29
2D-->2F
2F-->2G
2H-->2F
2K-->2M
2N-->2M
2Q-->2R
2R-->2T
2U-->2T
2Y-->2Z
2Z-->31
32-->31
33-->31
36-->38
39-->38
3C-->3E
3F-->3E
3J-->3L
3M-->3L
3P-->3Q
3Q-->3S
3T-->3S
3U-->3S
3Y-->3Z
3Z-->41
41-->42
41-->44
42-->43
45-->41
46-->44
4B-->4C
4C-->4E
4F-->4E
4J-->4L
4L-->4M
4P-->4Q
4Q-->4S
4T-->4S
4X-->4Y
4Y-->50
51-->50
56-->58
56-->59
58-->59
5A-->58
5D-->5F
5G-->5F
5J-->5L
5J-->5M
5L-->5M
5N-->5L
5O-->5M
5R-->5T
5U-->5T
5V-->5T
60-->62
63-->62
66-->68
66-->69
66-->6A
66-->6D
6A-->6B
6B-->6C
6I-->6K
6I-->6L
6I-->6M
6I-->6N
6O-->6L
6T-->6V
6T-->6W
6T-->6X
6Y-->6W
6Z-->6V
72-->74
77-->79
7C-->7E
7C-->7F
7E-->7F
7G-->7E
7H-->7F
7K-->7M
7N-->7M
7R-->7T
7U-->7T
7Y-->80
83-->85
86-->85
8A-->8C
8F-->8H
8I-->8H
8J-->8H
8M-->8O
8R-->8T
8R-->8U
8R-->8V
8T-->8U
8U-->8V
8W-->8T
8Z-->91
94-->96
97-->96
9A-->9C
9D-->9C
9E-->9C
9I-->9K
9L-->9K
9O-->9Q
9R-->9Q
9U-->9W
9X-->9W
A1-->A3
A4-->A3
A8-->AA
A8-->AJ
A8-->AD
A8-->AI
AA-->AC
AA-->AE
AA-->AF
AA-->AG
AA-->AH
AA-->AD
AA-->AI
AC-->AD
AJ-->AD
AK-->AG
AK-->AA
AK-->AD
AL-->AM
AL-->AG
AL-->AA
AL-->AJ
AL-->AD
AN-->AJ
AO-->AD
AQ-->AD
AU-->AW
AX-->AW
B0-->B2
B3-->B2
B7-->B9
BA-->B9
BE-->BG
BH-->BG
BI-->BG
BM-->BO
BR-->BT
BU-->BT
BY-->C0
C4-->C6
C9-->CB
CC-->CB
CC-->CD
CH-->CJ
CK-->CJ
CO-->CQ
CR-->CQ
CV-->CX
CY-->CX
D0-->D2
D7-->D9
DA-->D9
DD-->DF
DI-->DK
DI-->DL
DK-->DL
DP-->DR
DS-->DR
DV-->DX
DV-->DY
DV-->DZ
DV-->E2
DZ-->E0
E0-->E1
E2-->DX
E2-->E3
EA-->EC
EC-->ED
EG-->EI
EL-->EN
EL-->EO
ER-->ET
EW-->EY
F2-->F4
F5-->F4
F8-->FA
FD-->FF
FF-->FG
FH-->FG
FI-->FG
FJ-->FF
FM-->FO
FP-->FO
FQ-->FO
FV-->FX
FY-->FX
FZ-->FX
G3-->G5
G8-->GA
GE-->GG
GM-->GO
GM-->GP
GQ-->GP
GT-->GV
GW-->GV
H0-->H2
H3-->H2
H6-->H8
HB-->HD
HB-->HE
HB-->HF
HD-->HE
HG-->HD
HK-->HM
HN-->HM
HQ-->HS
HV-->HX
HY-->HX
I1-->I3
I3-->I4
I7-->I9
I9-->IA
I9-->IB
I9-->IC
I9-->ID
IB-->IA
IB-->IC
IE-->IF
II-->IK
IO-->IQ
IR-->IQ
IU-->IW
IZ-->J1
IZ-->J2
IZ-->J3
IZ-->J4
J9-->JB
J9-->JC
JC-->JB
JG-->JI
JI-->JJ
JM-->JO
JO-->JP
JS-->JU
JS-->JW
JS-->JX
JS-->JV
JU-->JV
JY-->JV
K1-->K3
K1-->K4
K1-->K5
K5-->K4
K6-->K3
K9-->KB
K9-->KC
KC-->KB
KD-->KC
KH-->KJ
KH-->KK
KK-->KJ
KN-->KP
KT-->KV
KW-->KV
L0-->L2
L3-->L2
L6-->L8
L9-->L8
LC-->LE
LH-->LJ
LO-->LQ
LT-->LV
LT-->LW
LZ-->M1
M2-->M3
M7-->M9
MC-->ME
MH-->MJ
MO-->MQ
MO-->MR
MV-->MX
MV-->MY
MZ-->MY
N2-->N4
N2-->NF
N2-->N6
N2-->NA
N2-->NG
N2-->NH
N2-->NI
N2-->NJ
N2-->NK
N2-->NL
N2-->N7
N2-->NB
N2-->N9
N2-->N5
N2-->NM
N2-->NC
N2-->NN
N2-->ND
N2-->N8
N2-->NO
N2-->NE
N4-->N5
N5-->N4
N5-->N6
N5-->N7
N5-->N9
N5-->NC
N5-->ND
N6-->N5
N7-->N5
N7-->N8
N8-->N7
N9-->NA
N9-->NB
N9-->N5
NB-->NA
NB-->N9
NC-->ND
NC-->NE
ND-->N9
ND-->N5
ND-->NC
NF-->N5
NF-->NE
NG-->NH
NI-->NE
NJ-->NH
NJ-->NE
NK-->N5
NK-->NC
NM-->NE
NN-->NK
NS-->NU
NS-->NV
NS-->NW
NS-->NX
NY-->NU
NZ-->NX
O2-->O4
O2-->O5
O2-->O6
O2-->O7
O2-->O8
O2-->O9
O2-->OA
O2-->OB
O2-->OC
O2-->OD
O2-->OE
O2-->OF
O2-->OG
OC-->OB
OJ-->OL
OJ-->OQ
OJ-->OT
OJ-->OR
OJ-->OV
OJ-->OX
OJ-->OY
OJ-->OP
OJ-->OM
OJ-->OZ
OJ-->P0
OJ-->P2
OJ-->OU
OJ-->P3
OJ-->OW
OJ-->P1
OJ-->P4
OJ-->P5
OJ-->ON
OJ-->OS
OJ-->OO
OL-->OM
OL-->ON
OL-->OO
OO-->OL
OO-->OP
OQ-->OR
OQ-->OS
OT-->OU
OV-->OR
OV-->OW
OV-->OS
OW-->OR
OW-->ON
OW-->OS
OX-->OR
OX-->OS
OZ-->OM
OZ-->ON
OZ-->OO
P0-->OU
P0-->P1
P1-->OW
P1-->ON
P1-->OO
P2-->P0
P3-->OW
P3-->OS
P4-->P1
P4-->OO
P9-->PB
P9-->PC
P9-->PD
P9-->PE
P9-->PF
P9-->PG
P9-->PH
P9-->PI
P9-->PJ
P9-->PK
P9-->PL
P9-->PM
P9-->PN
P9-->PO
P9-->PP
P9-->PQ
P9-->PR
PS-->PB
PT-->PI
PU-->PJ
PV-->PJ
PW-->PK
PX-->PQ
Q0-->PR
Q4-->Q6
Q4-->Q7
Q4-->Q8
Q4-->QA
Q4-->QB
Q4-->QC
Q4-->QD
Q4-->QE
Q4-->QF
Q4-->QG
Q4-->QH
Q4-->QI
Q4-->Q9
Q4-->QJ
Q4-->QK
Q4-->QL
Q4-->QM
Q4-->QN
Q4-->QO
Q4-->QP
Q8-->Q9
QJ-->Q9
QK-->Q9
QQ-->Q6
QQ-->QE
QQ-->QN
QQ-->QP
QR-->Q8
QS-->QG
QT-->Q9
QU-->QJ
QU-->QO
QV-->QJ
QV-->QO
QX-->QL
QY-->QN
R1-->R3
R6-->R8
R6-->R9
RF-->RI
RP-->RR
RS-->RR
RT-->RR
RU-->RR
RV-->RR
RY-->S0
RY-->S1
RY-->S3
RY-->SC
RY-->S4
RY-->S5
RY-->SD
RY-->SE
RY-->S8
RY-->SF
RY-->SG
RY-->SH
S0-->S1
S0-->S3
S0-->S5
S3-->S4
S5-->S7
S5-->SA
S5-->SB
S5-->S4
S7-->S8
SA-->S8
SD-->S7
SD-->SA
SD-->SB
SD-->S4
SF-->S3
SG-->S0
SH-->S3
