flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.ts"]
5["cart-inputs.validation.spec.ts"]
6["global-validation-pipe.ts"]
7["global-validation-pipe.spec.ts"]
8["order-inputs.validation.spec.ts"]
9["product-variant-inputs.validation.spec.ts"]
A["seller-product-inputs.validation.spec.ts"]
end
B["main.ts"]
end
end
end
subgraph C["libs"]
subgraph D["client"]
subgraph E["admins"]
subgraph F["components"]
subgraph G["footer"]
subgraph H["src"]
I["index.ts"]
subgraph J["lib"]
K["admins-footer.tsx"]
L["admins-footer.spec.tsx"]
end
end
end
subgraph M["headerbar"]
subgraph N["src"]
O["index.ts"]
subgraph P["lib"]
Q["AdminsHeaderbar.tsx"]
R["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph S["layout"]
subgraph T["src"]
U["index.ts"]
subgraph V["lib"]
W["AdminsLayout.tsx"]
X["AdminsTabbar.tsx"]
Y["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph Z["contexts"]
subgraph 10["src"]
11["index.spec.tsx"]
12["index.ts"]
subgraph 13["lib"]
14["AdminsAuthContext.tsx"]
15["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 16["graphql"]
subgraph 17["src"]
18["index.ts"]
subgraph 19["lib"]
1A["fragments.ts"]
1B["mutations.ts"]
1C["orders.graphql.ts"]
1D["Provider.tsx"]
1E["AdminsApolloProvider.tsx"]
1F["client.ts"]
1G["queries.ts"]
1H["Provider.spec.tsx"]
1I["apollo-upload-client.d.ts"]
1J["client.spec.tsx"]
1K["fragments.spec.tsx"]
1L["mutations.spec.tsx"]
1M["queries.spec.tsx"]
end
subgraph 1N["types"]
1O["apollo-upload-client.d.ts"]
end
end
end
subgraph 1P["hooks"]
subgraph 1Q["auth"]
subgraph 1R["src"]
1S["index.ts"]
subgraph 1T["lib"]
1U["useAdminLogin.ts"]
1V["useAdminLogin.spec.ts"]
1W["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1X["currency-management"]
subgraph 1Y["src"]
1Z["index.ts"]
subgraph 20["lib"]
21["useAdminsCurrencyManagement.ts"]
end
end
22["vite.config.ts"]
end
subgraph 23["customers"]
subgraph 24["src"]
25["index.ts"]
subgraph 26["lib"]
27["adminsCustomers.graphql.ts"]
28["useAdminsCustomers.ts"]
29["useAdminsCustomers.spec.tsx"]
end
end
2A["vite.config.ts"]
end
subgraph 2B["orders"]
subgraph 2C["src"]
2D["index.ts"]
subgraph 2E["lib"]
2F["admins-orders-hook.tsx"]
2G["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2H["sellers"]
subgraph 2I["src"]
2J["index.ts"]
subgraph 2K["lib"]
2L["useAdminsSellers.ts"]
2M["adminsSellers.graphql.ts"]
2N["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2O["router"]
subgraph 2P["src"]
2Q["index.ts"]
subgraph 2R["lib"]
2S["AdminsRouter.tsx"]
2T["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2U["routes"]
subgraph 2V["src"]
2W["index.spec.ts"]
2X["index.ts"]
subgraph 2Y["lib"]
2Z["admin-routes.ts"]
30["admin-routes.spec.ts"]
end
end
end
subgraph 31["screens"]
subgraph 32["admin-seller-orders"]
subgraph 33["src"]
34["index.spec.tsx"]
35["index.ts"]
subgraph 36["lib"]
37["admin-seller-orders.tsx"]
38["admin-seller-orders.pants-size.spec.tsx"]
39["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 3A["currency-management"]
subgraph 3B["src"]
3C["index.ts"]
subgraph 3D["lib"]
3E["currency-management.tsx"]
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
end
end
end
subgraph 3T["product-editor"]
subgraph 3U["src"]
3V["index.spec.tsx"]
3W["index.ts"]
subgraph 3X["lib"]
3Y["AdminProductEditor.tsx"]
3Z["AdminProductEditor.pants-range.spec.tsx"]
40["AdminProductEditor.spec.tsx"]
end
41["vite-env.d.ts"]
end
end
subgraph 42["products"]
subgraph 43["src"]
44["index.spec.tsx"]
45["index.ts"]
subgraph 46["lib"]
47["AdminProducts.tsx"]
48["adminProducts.hooks.ts"]
49["adminProducts.graphql.ts"]
4A["ProductImageManagementModal.tsx"]
4B["AdminProducts.spec.tsx"]
4C["ProductImageManagementModal.pants-size.spec.tsx"]
4D["ProductImageManagementModal.spec.tsx"]
end
4E["vite-env.d.ts"]
end
end
subgraph 4F["seller-management"]
subgraph 4G["src"]
4H["index.spec.tsx"]
4I["index.ts"]
subgraph 4J["lib"]
4K["SellerManagement.tsx"]
4L["SellerManagement.spec.tsx"]
end
4M["vite-env.d.ts"]
end
end
subgraph 4N["translation-management"]
subgraph 4O["src"]
4P["index.ts"]
subgraph 4Q["lib"]
4R["AdminTranslationManagement.tsx"]
4S["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4T["unauthorized"]
subgraph 4U["src"]
4V["index.spec.tsx"]
4W["index.ts"]
subgraph 4X["lib"]
4Y["admins-unauthorized-screen.tsx"]
4Z["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 50["zustand"]
subgraph 51["admins-products-store"]
subgraph 52["src"]
53["index.spec.ts"]
54["index.ts"]
subgraph 55["lib"]
56["admins-products-store.ts"]
57["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 58["customers"]
subgraph 59["components"]
subgraph 5A["footer"]
subgraph 5B["src"]
5C["index.ts"]
subgraph 5D["lib"]
5E["customers-footer.tsx"]
5F["TrustBadgeIcons.tsx"]
5G["customers-footer.spec.tsx"]
end
end
end
subgraph 5H["headerbar"]
subgraph 5I["src"]
5J["index.ts"]
subgraph 5K["lib"]
5L["CustomersHeaderbar.tsx"]
5M["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5N["layout"]
subgraph 5O["src"]
5P["index.ts"]
subgraph 5Q["lib"]
5R["CustomersLayout.tsx"]
5S["CustomersTabbar.tsx"]
5T["CustomersLayout.spec.tsx"]
5U["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5V["product-card"]
subgraph 5W["src"]
5X["index.ts"]
subgraph 5Y["lib"]
5Z["CustomersProductCard.tsx"]
60["CustomersProductCard.pants-size.spec.tsx"]
61["CustomersProductCard.spec.tsx"]
end
62["vite-env.d.ts"]
end
end
end
subgraph 63["contexts"]
subgraph 64["auth"]
subgraph 65["src"]
66["index.ts"]
subgraph 67["lib"]
68["CustomersAuthContext.tsx"]
69["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6A["graphql"]
subgraph 6B["src"]
6C["index.ts"]
subgraph 6D["lib"]
6E["customer-profile.queries.ts"]
6F["mutations.ts"]
6G["Provider.tsx"]
6H["CustomersApolloProvider.tsx"]
6I["client.ts"]
6J["queries.ts"]
6K["apollo-upload-client.d.ts"]
end
end
end
subgraph 6L["hooks"]
subgraph 6M["auth"]
subgraph 6N["src"]
6O["index.ts"]
subgraph 6P["lib"]
6Q["useCustomersForgotPassword.tsx"]
6R["useCustomersLogin.tsx"]
6S["useCustomersRegister.tsx"]
6T["useCustomersResetPassword.tsx"]
6U["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6V["cart"]
6W["jest.config.ts"]
6X["jest.setup.ts"]
subgraph 6Y["src"]
6Z["index.ts"]
subgraph 70["lib"]
71["customers-cart-hook.tsx"]
72["useCartService.ts"]
73["useWishlistSync.ts"]
74["useCartService.spec.tsx"]
75["useCartSync.ts"]
end
end
end
subgraph 76["orders"]
subgraph 77["src"]
78["index.ts"]
subgraph 79["lib"]
7A["customers-orders-hook.tsx"]
end
end
end
subgraph 7B["products"]
subgraph 7C["src"]
7D["index.ts"]
subgraph 7E["lib"]
7F["customers-product-hook.tsx"]
end
end
end
end
subgraph 7G["router"]
subgraph 7H["src"]
7I["index.ts"]
subgraph 7J["lib"]
7K["CustomersRouter.tsx"]
7L["ScrollToTop.tsx"]
7M["CustomersRouter.spec.tsx"]
7N["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7O["routes"]
subgraph 7P["src"]
7Q["index.ts"]
subgraph 7R["lib"]
7S["customer-routes.ts"]
7T["customer-routes.spec.ts"]
end
end
end
subgraph 7U["screens"]
subgraph 7V["contact"]
subgraph 7W["src"]
7X["index.ts"]
subgraph 7Y["lib"]
7Z["customer-contact.tsx"]
80["customer-contact.spec.tsx"]
end
end
81["vite.config.ts"]
end
subgraph 82["customer-checkout"]
subgraph 83["src"]
84["index.ts"]
subgraph 85["lib"]
86["customer-checkout.tsx"]
end
end
end
subgraph 87["customer-favorites"]
subgraph 88["src"]
89["index.ts"]
subgraph 8A["lib"]
8B["customer-favorites.tsx"]
8C["customer-favorites.spec.tsx"]
end
end
8D["vite.config.ts"]
end
subgraph 8E["customer-login"]
subgraph 8F["src"]
8G["index.ts"]
subgraph 8H["lib"]
8I["customer-login.tsx"]
end
end
end
subgraph 8J["customer-order-confirmation"]
subgraph 8K["src"]
8L["index.ts"]
subgraph 8M["lib"]
8N["customer-order-confirmation.tsx"]
8O["customer-order-confirmation.pants-size.spec.tsx"]
8P["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8Q["customer-orders"]
subgraph 8R["src"]
8S["index.ts"]
subgraph 8T["lib"]
8U["customer-orders.tsx"]
end
end
end
subgraph 8V["customer-payment"]
subgraph 8W["src"]
8X["index.ts"]
subgraph 8Y["lib"]
8Z["customer-payment-callback.tsx"]
90["use-zarinpal-payment.tsx"]
91["zarinpal-payment-service.ts"]
92["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 93["customer-products"]
subgraph 94["src"]
95["index.ts"]
subgraph 96["lib"]
97["customer-products.tsx"]
end
end
end
subgraph 98["customer-profile"]
subgraph 99["src"]
9A["index.ts"]
subgraph 9B["lib"]
9C["customer-profile.tsx"]
9D["customer-profile.spec.tsx"]
end
end
end
subgraph 9E["customer-shopping-cart"]
subgraph 9F["src"]
9G["index.ts"]
subgraph 9H["lib"]
9I["customer-shopping-cart.tsx"]
9J["customer-shopping-cart.pants-size.spec.tsx"]
9K["customer-shopping-cart.spec.tsx"]
end
end
9L["vite.config.ts"]
end
subgraph 9M["customer-signup"]
subgraph 9N["src"]
9O["index.ts"]
subgraph 9P["lib"]
9Q["customer-signup.tsx"]
9R["customer-signup.password-length.spec.tsx"]
9S["customer-signup.spec.tsx"]
end
end
end
subgraph 9T["forgot-password"]
subgraph 9U["src"]
9V["index.ts"]
subgraph 9W["lib"]
9X["customer-forgot-password.tsx"]
9Y["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9Z["guide-authenticity"]
subgraph A0["src"]
A1["index.ts"]
subgraph A2["lib"]
A3["customer-guide-authenticity.tsx"]
A4["customer-guide-authenticity.spec.tsx"]
end
end
A5["vite.config.ts"]
end
subgraph A6["guide-payment"]
subgraph A7["src"]
A8["index.ts"]
subgraph A9["lib"]
AA["customer-guide-payment.tsx"]
AB["customer-guide-payment.spec.tsx"]
end
end
AC["vite.config.ts"]
end
subgraph AD["home"]
subgraph AE["src"]
AF["index.ts"]
subgraph AG["lib"]
AH["CustomersHomeScreen.tsx"]
subgraph AI["components"]
AJ["CategoryBentoSection.tsx"]
AL["HeroSection.tsx"]
AM["HomeLoadingScreen.tsx"]
AN["PicksRailSection.tsx"]
AO["TrustStripSection.tsx"]
AT["NewArrivalsSection.tsx"]
AV["BrandBlocksSection.tsx"]
AW["NewsletterSection.tsx"]
AX["ShopTheLookSection.tsx"]
AY["TickerSection.tsx"]
end
AK["home-selectors.ts"]
AP["useScrollProgress.ts"]
AQ["CustomersShopScreen.tsx"]
AR["CustomersHomeScreen.cart-size.spec.tsx"]
AS["CustomersHomeScreen.spec.tsx"]
AU["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AZ["login"]
subgraph B0["src"]
B1["index.ts"]
subgraph B2["lib"]
B3["CustomersLoginScreen.tsx"]
B4["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph B5["not-found"]
subgraph B6["src"]
B7["index.ts"]
subgraph B8["lib"]
B9["customer-not-found.tsx"]
BA["customer-not-found.spec.tsx"]
end
end
BB["vite.config.ts"]
end
subgraph BC["privacy-policy"]
subgraph BD["src"]
BE["index.ts"]
subgraph BF["lib"]
BG["customer-privacy-policy.tsx"]
BH["customer-privacy-policy.spec.tsx"]
end
end
BI["vite.config.ts"]
end
subgraph BJ["product-details"]
subgraph BK["src"]
BL["index.ts"]
subgraph BM["lib"]
BN["customer-product-details.tsx"]
BO["customer-product-details.pants-size.spec.tsx"]
BP["customer-product-details.spec.tsx"]
end
end
BQ["vite.config.ts"]
end
subgraph BR["reset-password"]
subgraph BS["src"]
BT["index.ts"]
subgraph BU["lib"]
BV["customer-reset-password.tsx"]
BW["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph BX["shipping-returns"]
subgraph BY["src"]
BZ["index.ts"]
subgraph C0["lib"]
C1["customer-shipping-returns.tsx"]
C2["customer-shipping-returns.spec.tsx"]
end
end
C3["vite.config.ts"]
end
subgraph C4["unauthorized"]
subgraph C5["src"]
C6["index.ts"]
subgraph C7["lib"]
C8["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C9["utility"]
subgraph CA["test"]
subgraph CB["src"]
CC["index.ts"]
subgraph CD["lib"]
CE["customers-test-utility.tsx"]
end
end
end
end
subgraph CF["validations"]
subgraph CG["src"]
CH["index.ts"]
subgraph CI["lib"]
CJ["shipping-validation.ts"]
CK["shipping-validation.spec.tsx"]
CL["shipping-validation.tsx"]
end
end
end
subgraph CM["zustand"]
subgraph CN["customer-cart-store"]
subgraph CO["src"]
CP["index.ts"]
subgraph CQ["lib"]
CR["customer-cart-store.ts"]
CS["customer-cart-store.spec.ts"]
CT["customer-cart-store.tsx"]
end
end
end
subgraph CU["customer-checkout-store"]
subgraph CV["src"]
CW["index.ts"]
subgraph CX["lib"]
CY["customer-checkout-store.ts"]
CZ["customer-checkout-store.spec.ts"]
end
end
D0["vite.config.ts"]
end
subgraph D1["customer-wishlist-store"]
subgraph D2["src"]
D3["index.ts"]
subgraph D4["lib"]
D5["customer-wishlist-store.ts"]
D6["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["customers-products-store.tsx"]
end
end
end
end
subgraph DB["sellers"]
subgraph DC["components"]
subgraph DD["footer"]
subgraph DE["src"]
DF["index.ts"]
subgraph DG["lib"]
DH["sellers-footer.tsx"]
DI["sellers-footer.spec.tsx"]
end
end
end
subgraph DJ["headerbar"]
subgraph DK["src"]
DL["index.ts"]
subgraph DM["lib"]
DN["SellersHeaderbar.tsx"]
end
end
end
subgraph DO["layout"]
subgraph DP["src"]
DQ["index.ts"]
subgraph DR["lib"]
DS["SellersLayout.tsx"]
DT["SellersTabbar.tsx"]
end
end
end
end
subgraph DU["contexts"]
subgraph DV["auth"]
subgraph DW["src"]
DX["index.ts"]
subgraph DY["lib"]
DZ["SellersAuthContext.tsx"]
E0["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E1["graphql"]
subgraph E2["src"]
E3["index.ts"]
subgraph E4["lib"]
E5["fragments.ts"]
E6["mutations.ts"]
E7["Provider.tsx"]
E8["SellersApolloProvider.tsx"]
E9["client.ts"]
EA["queries.ts"]
EB["seller-orders.graphql.ts"]
EC["apollo-upload-client.d.ts"]
end
subgraph ED["types"]
EE["apollo-upload-client.d.ts"]
end
end
end
subgraph EF["hooks"]
subgraph EG["auth"]
subgraph EH["src"]
EI["index.ts"]
subgraph EJ["lib"]
EK["useSellerAuth.ts"]
EL["sellerAuth.graphql.ts"]
end
end
end
subgraph EM["orders"]
subgraph EN["src"]
EO["index.ts"]
subgraph EP["lib"]
EQ["useSellerOrders.ts"]
end
end
end
subgraph ER["products"]
subgraph ES["src"]
ET["index.ts"]
subgraph EU["lib"]
EV["useSellersProductManagement.ts"]
EW["useSellersProducts.ts"]
end
end
end
end
subgraph EX["router"]
subgraph EY["src"]
EZ["index.ts"]
subgraph F0["lib"]
F1["SellersRouter.tsx"]
end
end
end
subgraph F2["routes"]
subgraph F3["src"]
F4["index.ts"]
subgraph F5["lib"]
F6["seller-routes.ts"]
end
end
end
subgraph F7["screens"]
subgraph F8["catalog"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["SellersCatalogScreens.tsx"]
FD["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FE["login"]
subgraph FF["src"]
FG["index.ts"]
subgraph FH["lib"]
FI["SellersLogin.tsx"]
end
end
end
subgraph FJ["manage-product"]
subgraph FK["src"]
FL["index.ts"]
subgraph FM["lib"]
FN["SellersManageProductScreen.tsx"]
FO["SellersDefineProductFlow.tsx"]
FP["SellersDefineProductFlow.pants-label.spec.tsx"]
FQ["SellersDefineProductFlow.spec.tsx"]
FR["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FS["products"]
subgraph FT["src"]
FU["index.ts"]
subgraph FV["lib"]
FW["SellersProducts.tsx"]
FX["SellersProducts.pants-label.spec.tsx"]
FY["SellersProducts.spec.tsx"]
end
end
end
subgraph FZ["seller-orders"]
G0["jest.config.ts"]
G1["jest.setup.ts"]
subgraph G2["src"]
G3["index.ts"]
subgraph G4["lib"]
G5["seller-orders-screen.tsx"]
G6["seller-orders-screen.pants-size.spec.tsx"]
G7["seller-orders-screen.spec.tsx"]
end
G8["test-setup.ts"]
end
end
subgraph G9["setup-password"]
subgraph GA["src"]
GB["index.ts"]
subgraph GC["lib"]
GD["SellersSetupPassword.tsx"]
end
end
end
subgraph GE["unauthorized"]
subgraph GF["src"]
GG["index.ts"]
subgraph GH["lib"]
GI["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GJ["zustand"]
subgraph GK["sellers-products-store"]
subgraph GL["src"]
GM["index.ts"]
subgraph GN["lib"]
GO["useSellersProductsStore.ts"]
GP["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GQ["shared"]
subgraph GR["components"]
subgraph GS["apollo-provider-base"]
subgraph GT["src"]
GU["index.ts"]
subgraph GV["lib"]
GW["ApolloProviderBase.tsx"]
GX["createSilentRefreshAuthLink.ts"]
GY["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GZ["error-boundary"]
subgraph H0["src"]
H1["index.ts"]
subgraph H2["lib"]
H3["error-boundary.tsx"]
H4["error-boundary.spec.tsx"]
end
end
H5["vite.config.ts"]
end
subgraph H6["glassmorphism-container"]
subgraph H7["src"]
H8["index.ts"]
subgraph H9["lib"]
HA["glassmorphism-container.tsx"]
HB["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HC["layout"]
subgraph HD["src"]
HE["index.ts"]
subgraph HF["lib"]
HG["Layout.tsx"]
end
end
end
subgraph HH["material-data-table"]
subgraph HI["src"]
HJ["index.ts"]
subgraph HK["lib"]
HL["material-data-table.tsx"]
HM["table-config.ts"]
HN["table-utils.ts"]
HO["material-data-table.spec.tsx"]
HP["table-types.ts"]
end
end
end
subgraph HQ["order-status-chip"]
subgraph HR["src"]
HS["index.ts"]
subgraph HT["lib"]
HU["order-status-chip.tsx"]
HV["order-status-chip.spec.tsx"]
end
end
end
subgraph HW["password-field"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["PasswordTextField.tsx"]
end
end
end
subgraph I1["price-display"]
subgraph I2["src"]
I3["index.ts"]
subgraph I4["lib"]
I5["price-display.tsx"]
I6["price-display.spec.tsx"]
end
end
end
subgraph I7["private-route"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["createPrivateRoute.tsx"]
IC["PrivateRoute.tsx"]
end
end
end
subgraph ID["rtl-table-utils"]
subgraph IE["src"]
IF["index.ts"]
subgraph IG["lib"]
IH["rtl-table-utils.ts"]
II["rtl-cell-components.tsx"]
IJ["rtl-column-helpers.ts"]
IK["rtl-table-props.ts"]
IL["use-table-alignment.ts"]
IM["rtl-table-utils.spec.tsx"]
IN["rtl-table-utils.tsx"]
end
end
end
subgraph IO["snackbar"]
subgraph IP["src"]
IQ["index.ts"]
subgraph IR["lib"]
IS["snackbar.tsx"]
IT["Snackbar.tsx"]
end
end
end
subgraph IU["styled-drawer"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["styled-drawer.tsx"]
IZ["styled-drawer.spec.tsx"]
end
end
end
subgraph J0["unauthorized"]
subgraph J1["src"]
J2["index.ts"]
subgraph J3["lib"]
J4["unauthorized-path.tsx"]
end
end
end
end
subgraph J5["graphql"]
subgraph J6["src"]
J7["index.ts"]
subgraph J8["lib"]
J9["currency.mutations.ts"]
JA["currency.queries.ts"]
JB["fragments.ts"]
JC["variant-colors.ts"]
JD["client-shared-graphql.tsx"]
end
end
end
subgraph JE["hooks"]
subgraph JF["brands"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["brands.graphql.ts"]
JK["useBrands.ts"]
end
end
JL["vite.config.ts"]
end
subgraph JM["categories"]
subgraph JN["src"]
JO["index.ts"]
subgraph JP["lib"]
JQ["useCategories.ts"]
JR["categories.graphql.ts"]
end
end
end
subgraph JS["colors"]
subgraph JT["src"]
JU["index.ts"]
subgraph JV["lib"]
JW["useColors.ts"]
JX["color.graphql.ts"]
end
end
end
subgraph JY["currency"]
subgraph JZ["src"]
K0["index.ts"]
subgraph K1["lib"]
K2["useConvertPrice.tsx"]
K3["useExchangeRate.tsx"]
K4["useCurrencies.tsx"]
K5["useCurrencyForLocale.tsx"]
K6["useExchangeRate.spec.tsx"]
end
end
end
subgraph K7["products"]
subgraph K8["src"]
K9["index.ts"]
subgraph KA["lib"]
KB["productImage.ts"]
KC["products.graphql.ts"]
KD["useProducts.ts"]
KE["productImage.spec.ts"]
end
end
end
subgraph KF["site-languages"]
subgraph KG["src"]
KH["index.ts"]
subgraph KI["lib"]
KJ["site-languages.graphql.ts"]
KK["useSiteLanguages.ts"]
KL["site-languages-hook.spec.tsx"]
end
end
KM["vite.config.ts"]
end
subgraph KN["snackbar"]
subgraph KO["src"]
KP["index.ts"]
subgraph KQ["lib"]
KR["SnackbarContext.tsx"]
KS["useSnackbar.ts"]
end
end
end
subgraph KT["translations-management-hook"]
subgraph KU["src"]
KV["index.ts"]
subgraph KW["lib"]
KX["useTranslationsManagement.ts"]
end
end
end
end
subgraph KY["lottie"]
subgraph KZ["empty-cart"]
subgraph L0["src"]
L1["index.ts"]
subgraph L2["lib"]
L3["lottie-empty-cart.tsx"]
L4["lottie-empty-cart.spec.tsx"]
end
end
L5["vite.config.ts"]
end
subgraph L6["loading"]
subgraph L7["src"]
L8["index.ts"]
subgraph L9["lib"]
LA["lottie-loading.tsx"]
LB["lottie-loading.spec.tsx"]
end
end
end
subgraph LC["success-check"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["lottie-success-check.tsx"]
LH["lottie-success-check.spec.tsx"]
end
end
end
subgraph LI["unauthorized"]
subgraph LJ["src"]
LK["index.ts"]
subgraph LL["lib"]
LM["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LN["translations"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["mapApolloErrorToTranslationKey.ts"]
LS["WrapTranslation.tsx"]
end
end
end
subgraph LT["ui"]
subgraph LU["colors"]
subgraph LV["src"]
LW["index.ts"]
subgraph LX["lib"]
LY["colors.ts"]
end
end
end
subgraph LZ["language-components"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["language-components.tsx"]
M4["ltr-text-field.tsx"]
end
end
end
subgraph M5["sizes"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["sizes.ts"]
MA["sizes.spec.tsx"]
MB["sizes.tsx"]
end
end
end
end
subgraph MC["zustand"]
subgraph MD["shared-auth-store"]
subgraph ME["src"]
MF["index.ts"]
subgraph MG["lib"]
MH["shared-auth-store.ts"]
end
end
end
subgraph MI["shared-notification-store"]
subgraph MJ["src"]
MK["index.ts"]
subgraph ML["lib"]
MM["shared-notification-store.tsx"]
end
end
end
subgraph MN["shared-ui-store"]
subgraph MO["src"]
MP["index.ts"]
subgraph MQ["lib"]
MR["shared-ui-store.ts"]
MS["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MT["server"]
subgraph MU["controllers"]
subgraph MV["src"]
MW["index.ts"]
subgraph MX["lib"]
MY["auth.controller.ts"]
MZ["order.controller.ts"]
end
end
end
subgraph N0["decorators"]
N1["jest.config.ts"]
subgraph N2["src"]
N3["index.ts"]
subgraph N4["lib"]
N5["current-user.decorator.ts"]
N6["decorators.ts"]
N7["decorators.spec.ts"]
end
end
end
subgraph N8["entities"]
subgraph N9["src"]
NA["index.ts"]
subgraph NB["lib"]
NC["brand.entity.ts"]
ND["product.entity.ts"]
NE["category.entity.ts"]
NF["product-description.entity.ts"]
NG["site-language.entity.ts"]
NH["product-info.entity.ts"]
NI["color.entity.ts"]
NJ["product-info-color.entity.ts"]
NK["seller-info.entity.ts"]
NL["seller-product.entity.ts"]
NM["user.entity.ts"]
NN["cart.entity.ts"]
NO["currency-preference.entity.ts"]
NP["currency.entity.ts"]
NQ["customer.entity.ts"]
NR["exchange-rate.entity.ts"]
NS["order.entity.ts"]
NT["platform-settings.entity.ts"]
NU["refresh-token.entity.ts"]
NV["seller-order.entity.ts"]
NW["translation.entity.ts"]
end
end
end
subgraph NX["guards"]
NY["jest.config.ts"]
subgraph NZ["src"]
O0["index.ts"]
subgraph O1["lib"]
O2["catalog.guard.ts"]
O3["graphql-auth.guard.ts"]
O4["http-auth.guard.ts"]
O5["roles.guard.ts"]
O6["catalog.guard.spec.ts"]
O7["roles.guard.spec.ts"]
end
end
end
subgraph O8["inputs"]
subgraph O9["src"]
OA["index.ts"]
subgraph OB["lib"]
OC["brand.input.ts"]
OD["cart.inputs.ts"]
OE["category.input.ts"]
OF["color.input.ts"]
OG["customer-auth.inputs.ts"]
OH["order-pagination.inputs.ts"]
OI["order.inputs.ts"]
OJ["product-info-filter.input.ts"]
OK["product.input.ts"]
OL["seller-order-pagination.inputs.ts"]
OM["seller.input.ts"]
ON["site-language.input.ts"]
OO["user.input.ts"]
end
end
end
subgraph OP["modules"]
subgraph OQ["src"]
OR["index.ts"]
subgraph OS["lib"]
OT["auth.module.ts"]
OU["email.module.ts"]
OV["token.module.ts"]
OW["user.module.ts"]
OX["customer-profile.module.ts"]
OY["brand.module.ts"]
OZ["catalog-guard.module.ts"]
P0["translation.module.ts"]
P1["cart.module.ts"]
P2["platform-settings.module.ts"]
P3["category.module.ts"]
P4["product.module.ts"]
P5["color.module.ts"]
P6["currency.module.ts"]
P7["graphql-context.module.ts"]
P8["order.module.ts"]
P9["seller-info.module.ts"]
PA["payment.module.ts"]
PB["product-info.module.ts"]
PC["seller-products.module.ts"]
PD["site-language.module.ts"]
end
end
end
subgraph PE["resolvers"]
PF["jest.config.ts"]
subgraph PG["src"]
PH["index.ts"]
subgraph PI["lib"]
PJ["auth.resolver.ts"]
PK["brand.resolver.ts"]
PL["cart.resolver.ts"]
PM["category.resolver.ts"]
PN["color.resolver.ts"]
PO["currency.resolver.ts"]
PP["customer-profile.resolver.ts"]
PQ["order.resolver.ts"]
PR["payment.resolver.ts"]
PS["product-info.resolver.ts"]
PT["product.resolver.ts"]
PU["seller-info.resolver.ts"]
PV["shipping.resolver.ts"]
PW["site-language.resolver.ts"]
PX["translation.input.ts"]
PY["translation.resolver.ts"]
PZ["user.resolver.ts"]
Q0["auth.resolver.spec.ts"]
Q1["order.resolver.spec.ts"]
Q2["payment.resolver.integration.spec.ts"]
Q3["payment.resolver.spec.ts"]
Q4["product-info.resolver.spec.ts"]
Q5["translation.resolver.guards.spec.ts"]
subgraph Q6["types"]
Q7["graphql-upload.d.ts"]
end
Q8["user.resolver.spec.ts"]
end
end
end
subgraph Q9["services"]
QA["jest.config.ts"]
subgraph QB["src"]
QC["index.ts"]
subgraph QD["lib"]
QE["auth.service.ts"]
QF["brand.service.ts"]
QG["cart.service.ts"]
QH["product-info-colors.util.ts"]
QI["category.service.ts"]
QJ["color.service.ts"]
QK["currency.service.ts"]
QL["customer-profile.service.ts"]
QM["email.service.ts"]
QN["image-upload.service.ts"]
QO["order.service.ts"]
QP["payment-logger.service.ts"]
QQ["payment.service.ts"]
QR["product.service.ts"]
QS["seller-info.service.ts"]
QT["shipping-calculation.service.ts"]
QU["site-language.service.ts"]
QV["token.service.ts"]
QW["translation.service.ts"]
QX["user.service.ts"]
QY["auth.service.password-policy.spec.ts"]
QZ["auth.service.spec.ts"]
R0["cart.service.add-quantity.spec.ts"]
R1["cart.service.spec.ts"]
R2["order.service.spec.ts"]
R3["product-info-colors.util.spec.ts"]
R4["product.service.pants.spec.ts"]
R5["product.service.spec.ts"]
R6["relay-connection.spec.ts"]
R7["seller-info.service.price-validation.spec.ts"]
R8["shipping-calculation.service.spec.ts"]
R9["token.service.spec.ts"]
end
end
end
subgraph RA["strategies"]
subgraph RB["src"]
RC["index.ts"]
subgraph RD["lib"]
RE["local.strategy.ts"]
end
end
end
subgraph RF["utils"]
subgraph RG["src"]
RH["index.ts"]
subgraph RI["lib"]
RJ["email-templates.ts"]
RK["relay-connection.ts"]
RL["pagination.ts"]
end
end
end
end
subgraph RM["shared"]
subgraph RN["codegen"]
RO["jest.config.ts"]
subgraph RP["src"]
RQ["index.ts"]
subgraph RR["lib"]
subgraph RS["generated"]
RT["graphql.ts"]
end
end
end
end
subgraph RU["graphql-schema"]
RV["jest.config.ts"]
subgraph RW["src"]
RX["index.ts"]
end
end
subgraph RY["product-sizes"]
subgraph RZ["src"]
S0["index.ts"]
subgraph S1["lib"]
S2["product-sizes.ts"]
S3["product-sizes.pants-formats.spec.ts"]
S4["product-sizes.pants-label.spec.ts"]
S5["product-sizes.pants-strict.spec.ts"]
S6["product-sizes.spec.ts"]
end
end
end
subgraph S7["shared-i18n"]
subgraph S8["src"]
S9["index.ts"]
subgraph SA["lib"]
SB["language-context.tsx"]
SC["language-detector.ts"]
subgraph SD["locales"]
SE["i18n-react.tsx"]
SF["i18n-util.ts"]
SG["i18n-util.async.ts"]
subgraph SH["en"]
SI["index.ts"]
end
subgraph SK["fa"]
SL["index.ts"]
end
SM["formatters.ts"]
SN["i18n-types.ts"]
SO["i18n-util.sync.ts"]
SP["navigator-detector.ts"]
end
SJ["site-name.ts"]
SQ["table-localization.ts"]
SR["theme-provider.tsx"]
SS["use-page-title.ts"]
end
end
end
end
end
5-->6
7-->6
8-->6
9-->6
A-->6
B-->4
B-->6
I-->K
L-->K
O-->Q
R-->Q
U-->W
U-->X
W-->X
Y-->W
11-->12
12-->14
15-->14
18-->1A
18-->1B
18-->1C
18-->1D
18-->1G
1D-->1E
1E-->1F
1G-->1A
1H-->1E
1H-->1D
1J-->1F
1K-->1A
1L-->1B
1M-->1G
1S-->1U
1V-->1U
1W-->1U
1Z-->21
25-->27
25-->28
28-->27
29-->28
2D-->2F
2G-->2F
2J-->2L
2L-->2M
2N-->2L
2Q-->2S
2T-->2S
2W-->2X
2X-->2Z
30-->2Z
34-->35
35-->37
38-->37
39-->37
3C-->3E
3F-->3E
3I-->3K
3L-->3K
3P-->3R
3S-->3R
3V-->3W
3W-->3Y
3Z-->3Y
40-->3Y
44-->45
45-->47
47-->48
47-->4A
48-->49
4B-->47
4C-->4A
4H-->4I
4I-->4K
4L-->4K
4P-->4R
4R-->4S
4V-->4W
4W-->4Y
4Z-->4Y
53-->54
54-->56
57-->56
5C-->5E
5C-->5F
5E-->5F
5G-->5E
5J-->5L
5M-->5L
5P-->5R
5P-->5S
5R-->5S
5T-->5R
5U-->5S
5X-->5Z
60-->5Z
61-->5Z
66-->68
69-->68
6C-->6E
6C-->6F
6C-->6G
6C-->6J
6G-->6H
6H-->6I
6O-->6Q
6O-->6R
6O-->6S
6O-->6T
6U-->6R
6Z-->71
6Z-->72
6Z-->73
74-->72
75-->71
78-->7A
7D-->7F
7I-->7K
7I-->7L
7K-->7L
7M-->7K
7N-->7L
7Q-->7S
7T-->7S
7X-->7Z
80-->7Z
84-->86
89-->8B
8C-->8B
8G-->8I
8L-->8N
8O-->8N
8P-->8N
8S-->8U
8X-->8Z
8X-->90
8X-->91
8Z-->90
90-->91
92-->8Z
95-->97
9A-->9C
9D-->9C
9G-->9I
9J-->9I
9K-->9I
9O-->9Q
9R-->9Q
9S-->9Q
9V-->9X
9Y-->9X
A1-->A3
A4-->A3
A8-->AA
AB-->AA
AF-->AH
AF-->AQ
AF-->AK
AF-->AP
AH-->AJ
AH-->AL
AH-->AM
AH-->AN
AH-->AO
AH-->AK
AH-->AP
AJ-->AK
AQ-->AK
AR-->AN
AR-->AH
AR-->AK
AS-->AT
AS-->AN
AS-->AH
AS-->AQ
AS-->AK
AU-->AQ
AV-->AK
AX-->AK
B1-->B3
B4-->B3
B7-->B9
BA-->B9
BE-->BG
BH-->BG
BL-->BN
BO-->BN
BP-->BN
BT-->BV
BW-->BV
BZ-->C1
C2-->C1
C6-->C8
CC-->CE
CH-->CJ
CK-->CJ
CK-->CL
CP-->CR
CS-->CR
CW-->CY
CZ-->CY
D3-->D5
D6-->D5
D8-->DA
DF-->DH
DI-->DH
DL-->DN
DQ-->DS
DQ-->DT
DS-->DT
DX-->DZ
E0-->DZ
E3-->E5
E3-->E6
E3-->E7
E3-->EA
E7-->E8
E8-->E9
EA-->E5
EA-->EB
EI-->EK
EK-->EL
EO-->EQ
ET-->EV
ET-->EW
EZ-->F1
F4-->F6
FA-->FC
FD-->FC
FG-->FI
FL-->FN
FN-->FO
FP-->FO
FQ-->FO
FR-->FN
FU-->FW
FX-->FW
FY-->FW
G3-->G5
G6-->G5
G7-->G5
GB-->GD
GG-->GI
GM-->GO
GU-->GW
GU-->GX
GY-->GX
H1-->H3
H4-->H3
H8-->HA
HB-->HA
HE-->HG
HJ-->HL
HJ-->HM
HJ-->HN
HL-->HM
HO-->HL
HS-->HU
HV-->HU
HY-->I0
I3-->I5
I6-->I5
I9-->IB
IB-->IC
IF-->IH
IH-->II
IH-->IJ
IH-->IK
IH-->IL
IJ-->II
IJ-->IK
IM-->IN
IQ-->IS
IW-->IY
IZ-->IY
J2-->J4
J7-->J9
J7-->JA
J7-->JB
J7-->JC
JH-->JJ
JH-->JK
JK-->JJ
JO-->JQ
JQ-->JR
JU-->JW
JW-->JX
K0-->K2
K0-->K4
K0-->K5
K0-->K3
K2-->K3
K6-->K3
K9-->KB
K9-->KC
K9-->KD
KD-->KC
KE-->KB
KH-->KJ
KH-->KK
KK-->KJ
KL-->KK
KP-->KR
KP-->KS
KS-->KR
KV-->KX
L1-->L3
L4-->L3
L8-->LA
LB-->LA
LE-->LG
LH-->LG
LK-->LM
LP-->LR
LW-->LY
M1-->M3
M1-->M4
M7-->M9
MA-->MB
MF-->MH
MK-->MM
MP-->MR
MW-->MY
MW-->MZ
N3-->N5
N3-->N6
N7-->N6
NA-->NC
NA-->NN
NA-->NE
NA-->NI
NA-->NO
NA-->NP
NA-->NQ
NA-->NR
NA-->NS
NA-->NT
NA-->NF
NA-->NJ
NA-->NH
NA-->ND
NA-->NU
NA-->NK
NA-->NV
NA-->NL
NA-->NG
NA-->NW
NA-->NM
NC-->ND
ND-->NC
ND-->NE
ND-->NF
ND-->NH
ND-->NK
ND-->NL
NE-->ND
NF-->ND
NF-->NG
NG-->NF
NH-->NI
NH-->NJ
NH-->ND
NJ-->NI
NJ-->NH
NK-->NL
NK-->NM
NL-->NH
NL-->ND
NL-->NK
NN-->ND
NN-->NM
NO-->NP
NQ-->NM
NR-->NP
NR-->NM
NS-->ND
NS-->NK
NU-->NM
NV-->NS
O0-->O2
O0-->O3
O0-->O4
O0-->O5
O6-->O2
O7-->O5
OA-->OC
OA-->OD
OA-->OE
OA-->OF
OA-->OG
OA-->OH
OA-->OI
OA-->OJ
OA-->OK
OA-->OL
OA-->OM
OA-->ON
OA-->OO
OK-->OJ
OR-->OT
OR-->OY
OR-->P1
OR-->OZ
OR-->P3
OR-->P5
OR-->P6
OR-->OX
OR-->OU
OR-->P7
OR-->P8
OR-->PA
OR-->P2
OR-->PB
OR-->P4
OR-->P9
OR-->PC
OR-->PD
OR-->OV
OR-->P0
OR-->OW
OT-->OU
OT-->OV
OT-->OW
OW-->OT
OW-->OX
OY-->OZ
OY-->P0
P1-->P2
P3-->OZ
P3-->P4
P3-->P0
P4-->OZ
P4-->OV
P4-->P0
P5-->OZ
P5-->P0
P7-->OU
P7-->OV
P7-->OW
P8-->P2
P8-->P9
P9-->P4
P9-->OV
P9-->OW
PA-->P8
PB-->P4
PB-->P0
PC-->P9
PC-->OW
PH-->PJ
PH-->PK
PH-->PL
PH-->PM
PH-->PN
PH-->PO
PH-->PP
PH-->PQ
PH-->PR
PH-->PS
PH-->PT
PH-->PU
PH-->PV
PH-->PW
PH-->PX
PH-->PY
PH-->PZ
Q0-->PJ
Q1-->PQ
Q2-->PR
Q3-->PR
Q4-->PS
Q5-->PY
Q8-->PZ
QC-->QE
QC-->QF
QC-->QG
QC-->QI
QC-->QJ
QC-->QK
QC-->QL
QC-->QM
QC-->QN
QC-->QO
QC-->QP
QC-->QQ
QC-->QH
QC-->QR
QC-->QS
QC-->QT
QC-->QU
QC-->QV
QC-->QW
QC-->QX
QG-->QH
QR-->QH
QS-->QH
QY-->QE
QY-->QM
QY-->QV
QY-->QX
QZ-->QE
QZ-->QM
QZ-->QV
QZ-->QX
R0-->QG
R1-->QG
R2-->QO
R3-->QH
R4-->QR
R4-->QW
R5-->QR
R5-->QW
R7-->QE
R7-->QS
R8-->QT
R9-->QV
RC-->RE
RH-->RJ
RH-->RK
RQ-->RT
S0-->S2
S3-->S2
S4-->S2
S5-->S2
S6-->S2
S9-->SB
S9-->SC
S9-->SE
S9-->SN
S9-->SF
S9-->SG
S9-->SO
S9-->SP
S9-->SJ
S9-->SQ
S9-->SR
S9-->SS
SB-->SC
SB-->SE
SB-->SG
SE-->SF
SG-->SI
SG-->SL
SG-->SM
SG-->SF
SI-->SJ
SL-->SJ
SO-->SI
SO-->SL
SO-->SM
SO-->SF
SQ-->SE
SR-->SB
SS-->SE
