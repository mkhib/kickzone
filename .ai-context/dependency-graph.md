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
FY["seller-orders-screen.spec.tsx"]
end
FZ["test-setup.ts"]
end
end
subgraph G0["setup-password"]
subgraph G1["src"]
G2["index.ts"]
subgraph G3["lib"]
G4["SellersSetupPassword.tsx"]
end
end
end
subgraph G5["unauthorized"]
subgraph G6["src"]
G7["index.ts"]
subgraph G8["lib"]
G9["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GA["zustand"]
subgraph GB["sellers-products-store"]
subgraph GC["src"]
GD["index.ts"]
subgraph GE["lib"]
GF["useSellersProductsStore.ts"]
GG["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GH["shared"]
subgraph GI["components"]
subgraph GJ["apollo-provider-base"]
subgraph GK["src"]
GL["index.ts"]
subgraph GM["lib"]
GN["ApolloProviderBase.tsx"]
GO["createSilentRefreshAuthLink.ts"]
GP["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GQ["error-boundary"]
subgraph GR["src"]
GS["index.ts"]
subgraph GT["lib"]
GU["error-boundary.tsx"]
GV["error-boundary.spec.tsx"]
end
end
GW["vite.config.ts"]
end
subgraph GX["glassmorphism-container"]
subgraph GY["src"]
GZ["index.ts"]
subgraph H0["lib"]
H1["glassmorphism-container.tsx"]
H2["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H3["layout"]
subgraph H4["src"]
H5["index.ts"]
subgraph H6["lib"]
H7["Layout.tsx"]
end
end
end
subgraph H8["material-data-table"]
subgraph H9["src"]
HA["index.ts"]
subgraph HB["lib"]
HC["material-data-table.tsx"]
HD["table-config.ts"]
HE["table-utils.ts"]
HF["material-data-table.spec.tsx"]
HG["table-types.ts"]
end
end
end
subgraph HH["order-status-chip"]
subgraph HI["src"]
HJ["index.ts"]
subgraph HK["lib"]
HL["order-status-chip.tsx"]
HM["order-status-chip.spec.tsx"]
end
end
end
subgraph HN["password-field"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["PasswordTextField.tsx"]
end
end
end
subgraph HS["price-display"]
subgraph HT["src"]
HU["index.ts"]
subgraph HV["lib"]
HW["price-display.tsx"]
HX["price-display.spec.tsx"]
end
end
end
subgraph HY["private-route"]
subgraph HZ["src"]
I0["index.ts"]
subgraph I1["lib"]
I2["createPrivateRoute.tsx"]
I3["PrivateRoute.tsx"]
end
end
end
subgraph I4["rtl-table-utils"]
subgraph I5["src"]
I6["index.ts"]
subgraph I7["lib"]
I8["rtl-table-utils.ts"]
I9["rtl-cell-components.tsx"]
IA["rtl-column-helpers.ts"]
IB["rtl-table-props.ts"]
IC["use-table-alignment.ts"]
ID["rtl-table-utils.spec.tsx"]
IE["rtl-table-utils.tsx"]
end
end
end
subgraph IF["snackbar"]
subgraph IG["src"]
IH["index.ts"]
subgraph II["lib"]
IJ["snackbar.tsx"]
IK["Snackbar.tsx"]
end
end
end
subgraph IL["styled-drawer"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["styled-drawer.tsx"]
IQ["styled-drawer.spec.tsx"]
end
end
end
subgraph IR["unauthorized"]
subgraph IS["src"]
IT["index.ts"]
subgraph IU["lib"]
IV["unauthorized-path.tsx"]
end
end
end
end
subgraph IW["graphql"]
subgraph IX["src"]
IY["index.ts"]
subgraph IZ["lib"]
J0["currency.mutations.ts"]
J1["currency.queries.ts"]
J2["fragments.ts"]
J3["variant-colors.ts"]
J4["client-shared-graphql.tsx"]
end
end
end
subgraph J5["hooks"]
subgraph J6["brands"]
subgraph J7["src"]
J8["index.ts"]
subgraph J9["lib"]
JA["brands.graphql.ts"]
JB["useBrands.ts"]
end
end
JC["vite.config.ts"]
end
subgraph JD["categories"]
subgraph JE["src"]
JF["index.ts"]
subgraph JG["lib"]
JH["useCategories.ts"]
JI["categories.graphql.ts"]
end
end
end
subgraph JJ["colors"]
subgraph JK["src"]
JL["index.ts"]
subgraph JM["lib"]
JN["useColors.ts"]
JO["color.graphql.ts"]
end
end
end
subgraph JP["currency"]
subgraph JQ["src"]
JR["index.ts"]
subgraph JS["lib"]
JT["useConvertPrice.tsx"]
JU["useExchangeRate.tsx"]
JV["useCurrencies.tsx"]
JW["useCurrencyForLocale.tsx"]
JX["useExchangeRate.spec.tsx"]
end
end
end
subgraph JY["products"]
subgraph JZ["src"]
K0["index.ts"]
subgraph K1["lib"]
K2["productImage.ts"]
K3["products.graphql.ts"]
K4["useProducts.ts"]
K5["productImage.spec.ts"]
end
end
end
subgraph K6["site-languages"]
subgraph K7["src"]
K8["index.ts"]
subgraph K9["lib"]
KA["site-languages.graphql.ts"]
KB["useSiteLanguages.ts"]
KC["site-languages-hook.spec.tsx"]
end
end
KD["vite.config.ts"]
end
subgraph KE["snackbar"]
subgraph KF["src"]
KG["index.ts"]
subgraph KH["lib"]
KI["SnackbarContext.tsx"]
KJ["useSnackbar.ts"]
end
end
end
subgraph KK["translations-management-hook"]
subgraph KL["src"]
KM["index.ts"]
subgraph KN["lib"]
KO["useTranslationsManagement.ts"]
end
end
end
end
subgraph KP["lottie"]
subgraph KQ["empty-cart"]
subgraph KR["src"]
KS["index.ts"]
subgraph KT["lib"]
KU["lottie-empty-cart.tsx"]
KV["lottie-empty-cart.spec.tsx"]
end
end
KW["vite.config.ts"]
end
subgraph KX["loading"]
subgraph KY["src"]
KZ["index.ts"]
subgraph L0["lib"]
L1["lottie-loading.tsx"]
L2["lottie-loading.spec.tsx"]
end
end
end
subgraph L3["success-check"]
subgraph L4["src"]
L5["index.ts"]
subgraph L6["lib"]
L7["lottie-success-check.tsx"]
L8["lottie-success-check.spec.tsx"]
end
end
end
subgraph L9["unauthorized"]
subgraph LA["src"]
LB["index.ts"]
subgraph LC["lib"]
LD["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LE["translations"]
subgraph LF["src"]
LG["index.ts"]
subgraph LH["lib"]
LI["mapApolloErrorToTranslationKey.ts"]
LJ["WrapTranslation.tsx"]
end
end
end
subgraph LK["ui"]
subgraph LL["colors"]
subgraph LM["src"]
LN["index.ts"]
subgraph LO["lib"]
LP["colors.ts"]
end
end
end
subgraph LQ["language-components"]
subgraph LR["src"]
LS["index.ts"]
subgraph LT["lib"]
LU["language-components.tsx"]
LV["ltr-text-field.tsx"]
end
end
end
subgraph LW["sizes"]
subgraph LX["src"]
LY["index.ts"]
subgraph LZ["lib"]
M0["sizes.ts"]
M1["sizes.spec.tsx"]
M2["sizes.tsx"]
end
end
end
end
subgraph M3["zustand"]
subgraph M4["shared-auth-store"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["shared-auth-store.ts"]
end
end
end
subgraph M9["shared-notification-store"]
subgraph MA["src"]
MB["index.ts"]
subgraph MC["lib"]
MD["shared-notification-store.tsx"]
end
end
end
subgraph ME["shared-ui-store"]
subgraph MF["src"]
MG["index.ts"]
subgraph MH["lib"]
MI["shared-ui-store.ts"]
MJ["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MK["server"]
subgraph ML["controllers"]
subgraph MM["src"]
MN["index.ts"]
subgraph MO["lib"]
MP["auth.controller.ts"]
MQ["order.controller.ts"]
end
end
end
subgraph MR["decorators"]
MS["jest.config.ts"]
subgraph MT["src"]
MU["index.ts"]
subgraph MV["lib"]
MW["current-user.decorator.ts"]
MX["decorators.ts"]
MY["decorators.spec.ts"]
end
end
end
subgraph MZ["entities"]
subgraph N0["src"]
N1["index.ts"]
subgraph N2["lib"]
N3["brand.entity.ts"]
N4["product.entity.ts"]
N5["category.entity.ts"]
N6["product-description.entity.ts"]
N7["site-language.entity.ts"]
N8["product-info.entity.ts"]
N9["color.entity.ts"]
NA["product-info-color.entity.ts"]
NB["seller-info.entity.ts"]
NC["seller-product.entity.ts"]
ND["user.entity.ts"]
NE["cart.entity.ts"]
NF["currency-preference.entity.ts"]
NG["currency.entity.ts"]
NH["customer.entity.ts"]
NI["exchange-rate.entity.ts"]
NJ["order.entity.ts"]
NK["platform-settings.entity.ts"]
NL["refresh-token.entity.ts"]
NM["seller-order.entity.ts"]
NN["translation.entity.ts"]
end
end
end
subgraph NO["guards"]
NP["jest.config.ts"]
subgraph NQ["src"]
NR["index.ts"]
subgraph NS["lib"]
NT["catalog.guard.ts"]
NU["graphql-auth.guard.ts"]
NV["http-auth.guard.ts"]
NW["roles.guard.ts"]
NX["catalog.guard.spec.ts"]
NY["roles.guard.spec.ts"]
end
end
end
subgraph NZ["inputs"]
subgraph O0["src"]
O1["index.ts"]
subgraph O2["lib"]
O3["brand.input.ts"]
O4["cart.inputs.ts"]
O5["category.input.ts"]
O6["color.input.ts"]
O7["customer-auth.inputs.ts"]
O8["order-pagination.inputs.ts"]
O9["order.inputs.ts"]
OA["product-info-filter.input.ts"]
OB["product.input.ts"]
OC["seller-order-pagination.inputs.ts"]
OD["seller.input.ts"]
OE["site-language.input.ts"]
OF["user.input.ts"]
end
end
end
subgraph OG["modules"]
subgraph OH["src"]
OI["index.ts"]
subgraph OJ["lib"]
OK["auth.module.ts"]
OL["email.module.ts"]
OM["token.module.ts"]
ON["user.module.ts"]
OO["customer-profile.module.ts"]
OP["brand.module.ts"]
OQ["catalog-guard.module.ts"]
OR["translation.module.ts"]
OS["cart.module.ts"]
OT["platform-settings.module.ts"]
OU["category.module.ts"]
OV["product.module.ts"]
OW["color.module.ts"]
OX["currency.module.ts"]
OY["graphql-context.module.ts"]
OZ["order.module.ts"]
P0["seller-info.module.ts"]
P1["payment.module.ts"]
P2["product-info.module.ts"]
P3["seller-products.module.ts"]
P4["site-language.module.ts"]
end
end
end
subgraph P5["resolvers"]
P6["jest.config.ts"]
subgraph P7["src"]
P8["index.ts"]
subgraph P9["lib"]
PA["auth.resolver.ts"]
PB["brand.resolver.ts"]
PC["cart.resolver.ts"]
PD["category.resolver.ts"]
PE["color.resolver.ts"]
PF["currency.resolver.ts"]
PG["customer-profile.resolver.ts"]
PH["order.resolver.ts"]
PI["payment.resolver.ts"]
PJ["product-info.resolver.ts"]
PK["product.resolver.ts"]
PL["seller-info.resolver.ts"]
PM["shipping.resolver.ts"]
PN["site-language.resolver.ts"]
PO["translation.input.ts"]
PP["translation.resolver.ts"]
PQ["user.resolver.ts"]
PR["auth.resolver.spec.ts"]
PS["order.resolver.spec.ts"]
PT["payment.resolver.integration.spec.ts"]
PU["payment.resolver.spec.ts"]
PV["product-info.resolver.spec.ts"]
subgraph PW["types"]
PX["graphql-upload.d.ts"]
end
PY["user.resolver.spec.ts"]
end
end
end
subgraph PZ["services"]
Q0["jest.config.ts"]
subgraph Q1["src"]
Q2["index.ts"]
subgraph Q3["lib"]
Q4["auth.service.ts"]
Q5["brand.service.ts"]
Q6["cart.service.ts"]
Q7["product-info-colors.util.ts"]
Q8["category.service.ts"]
Q9["color.service.ts"]
QA["currency.service.ts"]
QB["customer-profile.service.ts"]
QC["email.service.ts"]
QD["image-upload.service.ts"]
QE["order.service.ts"]
QF["payment-logger.service.ts"]
QG["payment.service.ts"]
QH["product.service.ts"]
QI["seller-info.service.ts"]
QJ["shipping-calculation.service.ts"]
QK["site-language.service.ts"]
QL["token.service.ts"]
QM["translation.service.ts"]
QN["user.service.ts"]
QO["auth.service.spec.ts"]
QP["cart.service.spec.ts"]
QQ["order.service.spec.ts"]
QR["product-info-colors.util.spec.ts"]
QS["product.service.pants.spec.ts"]
QT["product.service.spec.ts"]
QU["relay-connection.spec.ts"]
QV["shipping-calculation.service.spec.ts"]
QW["token.service.spec.ts"]
end
end
end
subgraph QX["strategies"]
subgraph QY["src"]
QZ["index.ts"]
subgraph R0["lib"]
R1["local.strategy.ts"]
end
end
end
subgraph R2["utils"]
subgraph R3["src"]
R4["index.ts"]
subgraph R5["lib"]
R6["email-templates.ts"]
R7["relay-connection.ts"]
R8["pagination.ts"]
end
end
end
end
subgraph R9["shared"]
subgraph RA["codegen"]
RB["jest.config.ts"]
subgraph RC["src"]
RD["index.ts"]
subgraph RE["lib"]
subgraph RF["generated"]
RG["graphql.ts"]
end
end
end
end
subgraph RH["graphql-schema"]
RI["jest.config.ts"]
subgraph RJ["src"]
RK["index.ts"]
end
end
subgraph RL["product-sizes"]
subgraph RM["src"]
RN["index.ts"]
subgraph RO["lib"]
RP["product-sizes.ts"]
RQ["product-sizes.pants-formats.spec.ts"]
RR["product-sizes.pants-label.spec.ts"]
RS["product-sizes.pants-strict.spec.ts"]
RT["product-sizes.spec.ts"]
end
end
end
subgraph RU["shared-i18n"]
subgraph RV["src"]
RW["index.ts"]
subgraph RX["lib"]
RY["language-context.tsx"]
RZ["language-detector.ts"]
subgraph S0["locales"]
S1["i18n-react.tsx"]
S2["i18n-util.ts"]
S3["i18n-util.async.ts"]
subgraph S4["en"]
S5["index.ts"]
end
subgraph S7["fa"]
S8["index.ts"]
end
S9["formatters.ts"]
SA["i18n-types.ts"]
SB["i18n-util.sync.ts"]
SC["navigator-detector.ts"]
end
S6["site-name.ts"]
SD["table-localization.ts"]
SE["theme-provider.tsx"]
SF["use-page-title.ts"]
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
G2-->G4
G7-->G9
GD-->GF
GL-->GN
GL-->GO
GP-->GO
GS-->GU
GV-->GU
GZ-->H1
H2-->H1
H5-->H7
HA-->HC
HA-->HD
HA-->HE
HC-->HD
HF-->HC
HJ-->HL
HM-->HL
HP-->HR
HU-->HW
HX-->HW
I0-->I2
I2-->I3
I6-->I8
I8-->I9
I8-->IA
I8-->IB
I8-->IC
IA-->I9
IA-->IB
ID-->IE
IH-->IJ
IN-->IP
IQ-->IP
IT-->IV
IY-->J0
IY-->J1
IY-->J2
IY-->J3
J8-->JA
J8-->JB
JB-->JA
JF-->JH
JH-->JI
JL-->JN
JN-->JO
JR-->JT
JR-->JV
JR-->JW
JR-->JU
JT-->JU
JX-->JU
K0-->K2
K0-->K3
K0-->K4
K4-->K3
K5-->K2
K8-->KA
K8-->KB
KB-->KA
KC-->KB
KG-->KI
KG-->KJ
KJ-->KI
KM-->KO
KS-->KU
KV-->KU
KZ-->L1
L2-->L1
L5-->L7
L8-->L7
LB-->LD
LG-->LI
LN-->LP
LS-->LU
LS-->LV
LY-->M0
M1-->M2
M6-->M8
MB-->MD
MG-->MI
MN-->MP
MN-->MQ
MU-->MW
MU-->MX
MY-->MX
N1-->N3
N1-->NE
N1-->N5
N1-->N9
N1-->NF
N1-->NG
N1-->NH
N1-->NI
N1-->NJ
N1-->NK
N1-->N6
N1-->NA
N1-->N8
N1-->N4
N1-->NL
N1-->NB
N1-->NM
N1-->NC
N1-->N7
N1-->NN
N1-->ND
N3-->N4
N4-->N3
N4-->N5
N4-->N6
N4-->N8
N4-->NB
N4-->NC
N5-->N4
N6-->N4
N6-->N7
N7-->N6
N8-->N9
N8-->NA
N8-->N4
NA-->N9
NA-->N8
NB-->NC
NB-->ND
NC-->N8
NC-->N4
NC-->NB
NE-->N4
NE-->ND
NF-->NG
NH-->ND
NI-->NG
NI-->ND
NJ-->N4
NJ-->NB
NL-->ND
NM-->NJ
NR-->NT
NR-->NU
NR-->NV
NR-->NW
NX-->NT
NY-->NW
O1-->O3
O1-->O4
O1-->O5
O1-->O6
O1-->O7
O1-->O8
O1-->O9
O1-->OA
O1-->OB
O1-->OC
O1-->OD
O1-->OE
O1-->OF
OB-->OA
OI-->OK
OI-->OP
OI-->OS
OI-->OQ
OI-->OU
OI-->OW
OI-->OX
OI-->OO
OI-->OL
OI-->OY
OI-->OZ
OI-->P1
OI-->OT
OI-->P2
OI-->OV
OI-->P0
OI-->P3
OI-->P4
OI-->OM
OI-->OR
OI-->ON
OK-->OL
OK-->OM
OK-->ON
ON-->OK
ON-->OO
OP-->OQ
OP-->OR
OS-->OT
OU-->OQ
OU-->OV
OU-->OR
OV-->OQ
OV-->OM
OV-->OR
OW-->OQ
OW-->OR
OY-->OL
OY-->OM
OY-->ON
OZ-->OT
OZ-->P0
P0-->OV
P0-->OM
P0-->ON
P1-->OZ
P2-->OV
P2-->OR
P3-->P0
P3-->ON
P8-->PA
P8-->PB
P8-->PC
P8-->PD
P8-->PE
P8-->PF
P8-->PG
P8-->PH
P8-->PI
P8-->PJ
P8-->PK
P8-->PL
P8-->PM
P8-->PN
P8-->PO
P8-->PP
P8-->PQ
PR-->PA
PS-->PH
PT-->PI
PU-->PI
PV-->PJ
PY-->PQ
Q2-->Q4
Q2-->Q5
Q2-->Q6
Q2-->Q8
Q2-->Q9
Q2-->QA
Q2-->QB
Q2-->QC
Q2-->QD
Q2-->QE
Q2-->QF
Q2-->QG
Q2-->Q7
Q2-->QH
Q2-->QI
Q2-->QJ
Q2-->QK
Q2-->QL
Q2-->QM
Q2-->QN
Q6-->Q7
QH-->Q7
QI-->Q7
QO-->Q4
QO-->QC
QO-->QL
QO-->QN
QP-->Q6
QQ-->QE
QR-->Q7
QS-->QH
QS-->QM
QT-->QH
QT-->QM
QV-->QJ
QW-->QL
QZ-->R1
R4-->R6
R4-->R7
RD-->RG
RN-->RP
RQ-->RP
RR-->RP
RS-->RP
RT-->RP
RW-->RY
RW-->RZ
RW-->S1
RW-->SA
RW-->S2
RW-->S3
RW-->SB
RW-->SC
RW-->S6
RW-->SD
RW-->SE
RW-->SF
RY-->RZ
RY-->S1
RY-->S3
S1-->S2
S3-->S5
S3-->S8
S3-->S9
S3-->S2
S5-->S6
S8-->S6
SB-->S5
SB-->S8
SB-->S9
SB-->S2
SD-->S1
SE-->RY
SF-->S1
