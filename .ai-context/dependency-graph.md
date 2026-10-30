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
9L["customer-signup.password-length.spec.tsx"]
9M["customer-signup.spec.tsx"]
end
end
end
subgraph 9N["forgot-password"]
subgraph 9O["src"]
9P["index.ts"]
subgraph 9Q["lib"]
9R["customer-forgot-password.tsx"]
9S["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9T["guide-authenticity"]
subgraph 9U["src"]
9V["index.ts"]
subgraph 9W["lib"]
9X["customer-guide-authenticity.tsx"]
9Y["customer-guide-authenticity.spec.tsx"]
end
end
9Z["vite.config.ts"]
end
subgraph A0["guide-payment"]
subgraph A1["src"]
A2["index.ts"]
subgraph A3["lib"]
A4["customer-guide-payment.tsx"]
A5["customer-guide-payment.spec.tsx"]
end
end
A6["vite.config.ts"]
end
subgraph A7["home"]
subgraph A8["src"]
A9["index.ts"]
subgraph AA["lib"]
AB["CustomersHomeScreen.tsx"]
subgraph AC["components"]
AD["CategoryBentoSection.tsx"]
AF["HeroSection.tsx"]
AG["HomeLoadingScreen.tsx"]
AH["PicksRailSection.tsx"]
AI["TrustStripSection.tsx"]
AN["NewArrivalsSection.tsx"]
AP["BrandBlocksSection.tsx"]
AQ["NewsletterSection.tsx"]
AR["ShopTheLookSection.tsx"]
AS["TickerSection.tsx"]
end
AE["home-selectors.ts"]
AJ["useScrollProgress.ts"]
AK["CustomersShopScreen.tsx"]
AL["CustomersHomeScreen.cart-size.spec.tsx"]
AM["CustomersHomeScreen.spec.tsx"]
AO["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AT["login"]
subgraph AU["src"]
AV["index.ts"]
subgraph AW["lib"]
AX["CustomersLoginScreen.tsx"]
AY["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph AZ["not-found"]
subgraph B0["src"]
B1["index.ts"]
subgraph B2["lib"]
B3["customer-not-found.tsx"]
B4["customer-not-found.spec.tsx"]
end
end
B5["vite.config.ts"]
end
subgraph B6["privacy-policy"]
subgraph B7["src"]
B8["index.ts"]
subgraph B9["lib"]
BA["customer-privacy-policy.tsx"]
BB["customer-privacy-policy.spec.tsx"]
end
end
BC["vite.config.ts"]
end
subgraph BD["product-details"]
subgraph BE["src"]
BF["index.ts"]
subgraph BG["lib"]
BH["customer-product-details.tsx"]
BI["customer-product-details.pants-size.spec.tsx"]
BJ["customer-product-details.spec.tsx"]
end
end
BK["vite.config.ts"]
end
subgraph BL["reset-password"]
subgraph BM["src"]
BN["index.ts"]
subgraph BO["lib"]
BP["customer-reset-password.tsx"]
BQ["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph BR["shipping-returns"]
subgraph BS["src"]
BT["index.ts"]
subgraph BU["lib"]
BV["customer-shipping-returns.tsx"]
BW["customer-shipping-returns.spec.tsx"]
end
end
BX["vite.config.ts"]
end
subgraph BY["unauthorized"]
subgraph BZ["src"]
C0["index.ts"]
subgraph C1["lib"]
C2["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C3["utility"]
subgraph C4["test"]
subgraph C5["src"]
C6["index.ts"]
subgraph C7["lib"]
C8["customers-test-utility.tsx"]
end
end
end
end
subgraph C9["validations"]
subgraph CA["src"]
CB["index.ts"]
subgraph CC["lib"]
CD["shipping-validation.ts"]
CE["shipping-validation.spec.tsx"]
CF["shipping-validation.tsx"]
end
end
end
subgraph CG["zustand"]
subgraph CH["customer-cart-store"]
subgraph CI["src"]
CJ["index.ts"]
subgraph CK["lib"]
CL["customer-cart-store.ts"]
CM["customer-cart-store.spec.ts"]
CN["customer-cart-store.tsx"]
end
end
end
subgraph CO["customer-checkout-store"]
subgraph CP["src"]
CQ["index.ts"]
subgraph CR["lib"]
CS["customer-checkout-store.ts"]
CT["customer-checkout-store.spec.ts"]
end
end
CU["vite.config.ts"]
end
subgraph CV["customer-wishlist-store"]
subgraph CW["src"]
CX["index.ts"]
subgraph CY["lib"]
CZ["customer-wishlist-store.ts"]
D0["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D1["src"]
D2["index.ts"]
subgraph D3["lib"]
D4["customers-products-store.tsx"]
end
end
end
end
subgraph D5["sellers"]
subgraph D6["components"]
subgraph D7["footer"]
subgraph D8["src"]
D9["index.ts"]
subgraph DA["lib"]
DB["sellers-footer.tsx"]
DC["sellers-footer.spec.tsx"]
end
end
end
subgraph DD["headerbar"]
subgraph DE["src"]
DF["index.ts"]
subgraph DG["lib"]
DH["SellersHeaderbar.tsx"]
end
end
end
subgraph DI["layout"]
subgraph DJ["src"]
DK["index.ts"]
subgraph DL["lib"]
DM["SellersLayout.tsx"]
DN["SellersTabbar.tsx"]
end
end
end
end
subgraph DO["contexts"]
subgraph DP["auth"]
subgraph DQ["src"]
DR["index.ts"]
subgraph DS["lib"]
DT["SellersAuthContext.tsx"]
DU["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DV["graphql"]
subgraph DW["src"]
DX["index.ts"]
subgraph DY["lib"]
DZ["fragments.ts"]
E0["mutations.ts"]
E1["Provider.tsx"]
E2["SellersApolloProvider.tsx"]
E3["client.ts"]
E4["queries.ts"]
E5["seller-orders.graphql.ts"]
E6["apollo-upload-client.d.ts"]
end
subgraph E7["types"]
E8["apollo-upload-client.d.ts"]
end
end
end
subgraph E9["hooks"]
subgraph EA["auth"]
subgraph EB["src"]
EC["index.ts"]
subgraph ED["lib"]
EE["useSellerAuth.ts"]
EF["sellerAuth.graphql.ts"]
end
end
end
subgraph EG["orders"]
subgraph EH["src"]
EI["index.ts"]
subgraph EJ["lib"]
EK["useSellerOrders.ts"]
end
end
end
subgraph EL["products"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["useSellersProductManagement.ts"]
EQ["useSellersProducts.ts"]
end
end
end
end
subgraph ER["router"]
subgraph ES["src"]
ET["index.ts"]
subgraph EU["lib"]
EV["SellersRouter.tsx"]
end
end
end
subgraph EW["routes"]
subgraph EX["src"]
EY["index.ts"]
subgraph EZ["lib"]
F0["seller-routes.ts"]
end
end
end
subgraph F1["screens"]
subgraph F2["catalog"]
subgraph F3["src"]
F4["index.ts"]
subgraph F5["lib"]
F6["SellersCatalogScreens.tsx"]
F7["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F8["login"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["SellersLogin.tsx"]
end
end
end
subgraph FD["manage-product"]
subgraph FE["src"]
FF["index.ts"]
subgraph FG["lib"]
FH["SellersManageProductScreen.tsx"]
FI["SellersDefineProductFlow.tsx"]
FJ["SellersDefineProductFlow.pants-label.spec.tsx"]
FK["SellersDefineProductFlow.spec.tsx"]
FL["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FM["products"]
subgraph FN["src"]
FO["index.ts"]
subgraph FP["lib"]
FQ["SellersProducts.tsx"]
FR["SellersProducts.pants-label.spec.tsx"]
FS["SellersProducts.spec.tsx"]
end
end
end
subgraph FT["seller-orders"]
FU["jest.config.ts"]
FV["jest.setup.ts"]
subgraph FW["src"]
FX["index.ts"]
subgraph FY["lib"]
FZ["seller-orders-screen.tsx"]
G0["seller-orders-screen.pants-size.spec.tsx"]
G1["seller-orders-screen.spec.tsx"]
end
G2["test-setup.ts"]
end
end
subgraph G3["setup-password"]
subgraph G4["src"]
G5["index.ts"]
subgraph G6["lib"]
G7["SellersSetupPassword.tsx"]
end
end
end
subgraph G8["unauthorized"]
subgraph G9["src"]
GA["index.ts"]
subgraph GB["lib"]
GC["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GD["zustand"]
subgraph GE["sellers-products-store"]
subgraph GF["src"]
GG["index.ts"]
subgraph GH["lib"]
GI["useSellersProductsStore.ts"]
GJ["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GK["shared"]
subgraph GL["components"]
subgraph GM["apollo-provider-base"]
subgraph GN["src"]
GO["index.ts"]
subgraph GP["lib"]
GQ["ApolloProviderBase.tsx"]
GR["createSilentRefreshAuthLink.ts"]
GS["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GT["error-boundary"]
subgraph GU["src"]
GV["index.ts"]
subgraph GW["lib"]
GX["error-boundary.tsx"]
GY["error-boundary.spec.tsx"]
end
end
GZ["vite.config.ts"]
end
subgraph H0["glassmorphism-container"]
subgraph H1["src"]
H2["index.ts"]
subgraph H3["lib"]
H4["glassmorphism-container.tsx"]
H5["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H6["layout"]
subgraph H7["src"]
H8["index.ts"]
subgraph H9["lib"]
HA["Layout.tsx"]
end
end
end
subgraph HB["material-data-table"]
subgraph HC["src"]
HD["index.ts"]
subgraph HE["lib"]
HF["material-data-table.tsx"]
HG["table-config.ts"]
HH["table-utils.ts"]
HI["material-data-table.spec.tsx"]
HJ["table-types.ts"]
end
end
end
subgraph HK["order-status-chip"]
subgraph HL["src"]
HM["index.ts"]
subgraph HN["lib"]
HO["order-status-chip.tsx"]
HP["order-status-chip.spec.tsx"]
end
end
end
subgraph HQ["password-field"]
subgraph HR["src"]
HS["index.ts"]
subgraph HT["lib"]
HU["PasswordTextField.tsx"]
end
end
end
subgraph HV["price-display"]
subgraph HW["src"]
HX["index.ts"]
subgraph HY["lib"]
HZ["price-display.tsx"]
I0["price-display.spec.tsx"]
end
end
end
subgraph I1["private-route"]
subgraph I2["src"]
I3["index.ts"]
subgraph I4["lib"]
I5["createPrivateRoute.tsx"]
I6["PrivateRoute.tsx"]
end
end
end
subgraph I7["rtl-table-utils"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["rtl-table-utils.ts"]
IC["rtl-cell-components.tsx"]
ID["rtl-column-helpers.ts"]
IE["rtl-table-props.ts"]
IF["use-table-alignment.ts"]
IG["rtl-table-utils.spec.tsx"]
IH["rtl-table-utils.tsx"]
end
end
end
subgraph II["snackbar"]
subgraph IJ["src"]
IK["index.ts"]
subgraph IL["lib"]
IM["snackbar.tsx"]
IN["Snackbar.tsx"]
end
end
end
subgraph IO["styled-drawer"]
subgraph IP["src"]
IQ["index.ts"]
subgraph IR["lib"]
IS["styled-drawer.tsx"]
IT["styled-drawer.spec.tsx"]
end
end
end
subgraph IU["unauthorized"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["unauthorized-path.tsx"]
end
end
end
end
subgraph IZ["graphql"]
subgraph J0["src"]
J1["index.ts"]
subgraph J2["lib"]
J3["currency.mutations.ts"]
J4["currency.queries.ts"]
J5["fragments.ts"]
J6["variant-colors.ts"]
J7["client-shared-graphql.tsx"]
end
end
end
subgraph J8["hooks"]
subgraph J9["brands"]
subgraph JA["src"]
JB["index.ts"]
subgraph JC["lib"]
JD["brands.graphql.ts"]
JE["useBrands.ts"]
end
end
JF["vite.config.ts"]
end
subgraph JG["categories"]
subgraph JH["src"]
JI["index.ts"]
subgraph JJ["lib"]
JK["useCategories.ts"]
JL["categories.graphql.ts"]
end
end
end
subgraph JM["colors"]
subgraph JN["src"]
JO["index.ts"]
subgraph JP["lib"]
JQ["useColors.ts"]
JR["color.graphql.ts"]
end
end
end
subgraph JS["currency"]
subgraph JT["src"]
JU["index.ts"]
subgraph JV["lib"]
JW["useConvertPrice.tsx"]
JX["useExchangeRate.tsx"]
JY["useCurrencies.tsx"]
JZ["useCurrencyForLocale.tsx"]
K0["useExchangeRate.spec.tsx"]
end
end
end
subgraph K1["products"]
subgraph K2["src"]
K3["index.ts"]
subgraph K4["lib"]
K5["productImage.ts"]
K6["products.graphql.ts"]
K7["useProducts.ts"]
K8["productImage.spec.ts"]
end
end
end
subgraph K9["site-languages"]
subgraph KA["src"]
KB["index.ts"]
subgraph KC["lib"]
KD["site-languages.graphql.ts"]
KE["useSiteLanguages.ts"]
KF["site-languages-hook.spec.tsx"]
end
end
KG["vite.config.ts"]
end
subgraph KH["snackbar"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["SnackbarContext.tsx"]
KM["useSnackbar.ts"]
end
end
end
subgraph KN["translations-management-hook"]
subgraph KO["src"]
KP["index.ts"]
subgraph KQ["lib"]
KR["useTranslationsManagement.ts"]
end
end
end
end
subgraph KS["lottie"]
subgraph KT["empty-cart"]
subgraph KU["src"]
KV["index.ts"]
subgraph KW["lib"]
KX["lottie-empty-cart.tsx"]
KY["lottie-empty-cart.spec.tsx"]
end
end
KZ["vite.config.ts"]
end
subgraph L0["loading"]
subgraph L1["src"]
L2["index.ts"]
subgraph L3["lib"]
L4["lottie-loading.tsx"]
L5["lottie-loading.spec.tsx"]
end
end
end
subgraph L6["success-check"]
subgraph L7["src"]
L8["index.ts"]
subgraph L9["lib"]
LA["lottie-success-check.tsx"]
LB["lottie-success-check.spec.tsx"]
end
end
end
subgraph LC["unauthorized"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LH["translations"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["mapApolloErrorToTranslationKey.ts"]
LM["WrapTranslation.tsx"]
end
end
end
subgraph LN["ui"]
subgraph LO["colors"]
subgraph LP["src"]
LQ["index.ts"]
subgraph LR["lib"]
LS["colors.ts"]
end
end
end
subgraph LT["language-components"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["language-components.tsx"]
LY["ltr-text-field.tsx"]
end
end
end
subgraph LZ["sizes"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["sizes.ts"]
M4["sizes.spec.tsx"]
M5["sizes.tsx"]
end
end
end
end
subgraph M6["zustand"]
subgraph M7["shared-auth-store"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["shared-auth-store.ts"]
end
end
end
subgraph MC["shared-notification-store"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["shared-notification-store.tsx"]
end
end
end
subgraph MH["shared-ui-store"]
subgraph MI["src"]
MJ["index.ts"]
subgraph MK["lib"]
ML["shared-ui-store.ts"]
MM["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MN["server"]
subgraph MO["controllers"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["auth.controller.ts"]
MT["order.controller.ts"]
end
end
end
subgraph MU["decorators"]
MV["jest.config.ts"]
subgraph MW["src"]
MX["index.ts"]
subgraph MY["lib"]
MZ["current-user.decorator.ts"]
N0["decorators.ts"]
N1["decorators.spec.ts"]
end
end
end
subgraph N2["entities"]
subgraph N3["src"]
N4["index.ts"]
subgraph N5["lib"]
N6["brand.entity.ts"]
N7["product.entity.ts"]
N8["category.entity.ts"]
N9["product-description.entity.ts"]
NA["site-language.entity.ts"]
NB["product-info.entity.ts"]
NC["color.entity.ts"]
ND["product-info-color.entity.ts"]
NE["seller-info.entity.ts"]
NF["seller-product.entity.ts"]
NG["user.entity.ts"]
NH["cart.entity.ts"]
NI["currency-preference.entity.ts"]
NJ["currency.entity.ts"]
NK["customer.entity.ts"]
NL["exchange-rate.entity.ts"]
NM["order.entity.ts"]
NN["platform-settings.entity.ts"]
NO["refresh-token.entity.ts"]
NP["seller-order.entity.ts"]
NQ["translation.entity.ts"]
end
end
end
subgraph NR["guards"]
NS["jest.config.ts"]
subgraph NT["src"]
NU["index.ts"]
subgraph NV["lib"]
NW["catalog.guard.ts"]
NX["graphql-auth.guard.ts"]
NY["http-auth.guard.ts"]
NZ["roles.guard.ts"]
O0["catalog.guard.spec.ts"]
O1["roles.guard.spec.ts"]
end
end
end
subgraph O2["inputs"]
subgraph O3["src"]
O4["index.ts"]
subgraph O5["lib"]
O6["brand.input.ts"]
O7["cart.inputs.ts"]
O8["category.input.ts"]
O9["color.input.ts"]
OA["customer-auth.inputs.ts"]
OB["order-pagination.inputs.ts"]
OC["order.inputs.ts"]
OD["product-info-filter.input.ts"]
OE["product.input.ts"]
OF["seller-order-pagination.inputs.ts"]
OG["seller.input.ts"]
OH["site-language.input.ts"]
OI["user.input.ts"]
end
end
end
subgraph OJ["modules"]
subgraph OK["src"]
OL["index.ts"]
subgraph OM["lib"]
ON["auth.module.ts"]
OO["email.module.ts"]
OP["token.module.ts"]
OQ["user.module.ts"]
OR["customer-profile.module.ts"]
OS["brand.module.ts"]
OT["catalog-guard.module.ts"]
OU["translation.module.ts"]
OV["cart.module.ts"]
OW["platform-settings.module.ts"]
OX["category.module.ts"]
OY["product.module.ts"]
OZ["color.module.ts"]
P0["currency.module.ts"]
P1["graphql-context.module.ts"]
P2["order.module.ts"]
P3["seller-info.module.ts"]
P4["payment.module.ts"]
P5["product-info.module.ts"]
P6["seller-products.module.ts"]
P7["site-language.module.ts"]
end
end
end
subgraph P8["resolvers"]
P9["jest.config.ts"]
subgraph PA["src"]
PB["index.ts"]
subgraph PC["lib"]
PD["auth.resolver.ts"]
PE["brand.resolver.ts"]
PF["cart.resolver.ts"]
PG["category.resolver.ts"]
PH["color.resolver.ts"]
PI["currency.resolver.ts"]
PJ["customer-profile.resolver.ts"]
PK["order.resolver.ts"]
PL["payment.resolver.ts"]
PM["product-info.resolver.ts"]
PN["product.resolver.ts"]
PO["seller-info.resolver.ts"]
PP["shipping.resolver.ts"]
PQ["site-language.resolver.ts"]
PR["translation.input.ts"]
PS["translation.resolver.ts"]
PT["user.resolver.ts"]
PU["auth.resolver.spec.ts"]
PV["order.resolver.spec.ts"]
PW["payment.resolver.integration.spec.ts"]
PX["payment.resolver.spec.ts"]
PY["product-info.resolver.spec.ts"]
PZ["translation.resolver.guards.spec.ts"]
subgraph Q0["types"]
Q1["graphql-upload.d.ts"]
end
Q2["user.resolver.spec.ts"]
end
end
end
subgraph Q3["services"]
Q4["jest.config.ts"]
subgraph Q5["src"]
Q6["index.ts"]
subgraph Q7["lib"]
Q8["auth.service.ts"]
Q9["brand.service.ts"]
QA["cart.service.ts"]
QB["product-info-colors.util.ts"]
QC["category.service.ts"]
QD["color.service.ts"]
QE["currency.service.ts"]
QF["customer-profile.service.ts"]
QG["email.service.ts"]
QH["image-upload.service.ts"]
QI["order.service.ts"]
QJ["payment-logger.service.ts"]
QK["payment.service.ts"]
QL["product.service.ts"]
QM["seller-info.service.ts"]
QN["shipping-calculation.service.ts"]
QO["site-language.service.ts"]
QP["token.service.ts"]
QQ["translation.service.ts"]
QR["user.service.ts"]
QS["auth.service.password-policy.spec.ts"]
QT["auth.service.spec.ts"]
QU["cart.service.add-quantity.spec.ts"]
QV["cart.service.spec.ts"]
QW["order.service.spec.ts"]
QX["product-info-colors.util.spec.ts"]
QY["product.service.pants.spec.ts"]
QZ["product.service.spec.ts"]
R0["relay-connection.spec.ts"]
R1["seller-info.service.price-validation.spec.ts"]
R2["shipping-calculation.service.spec.ts"]
R3["token.service.spec.ts"]
end
end
end
subgraph R4["strategies"]
subgraph R5["src"]
R6["index.ts"]
subgraph R7["lib"]
R8["local.strategy.ts"]
end
end
end
subgraph R9["utils"]
subgraph RA["src"]
RB["index.ts"]
subgraph RC["lib"]
RD["email-templates.ts"]
RE["relay-connection.ts"]
RF["pagination.ts"]
end
end
end
end
subgraph RG["shared"]
subgraph RH["codegen"]
RI["jest.config.ts"]
subgraph RJ["src"]
RK["index.ts"]
subgraph RL["lib"]
subgraph RM["generated"]
RN["graphql.ts"]
end
end
end
end
subgraph RO["graphql-schema"]
RP["jest.config.ts"]
subgraph RQ["src"]
RR["index.ts"]
end
end
subgraph RS["product-sizes"]
subgraph RT["src"]
RU["index.ts"]
subgraph RV["lib"]
RW["product-sizes.ts"]
RX["product-sizes.pants-formats.spec.ts"]
RY["product-sizes.pants-label.spec.ts"]
RZ["product-sizes.pants-strict.spec.ts"]
S0["product-sizes.spec.ts"]
end
end
end
subgraph S1["shared-i18n"]
subgraph S2["src"]
S3["index.ts"]
subgraph S4["lib"]
S5["language-context.tsx"]
S6["language-detector.ts"]
subgraph S7["locales"]
S8["i18n-react.tsx"]
S9["i18n-util.ts"]
SA["i18n-util.async.ts"]
subgraph SB["en"]
SC["index.ts"]
end
subgraph SE["fa"]
SF["index.ts"]
end
SG["formatters.ts"]
SH["i18n-types.ts"]
SI["i18n-util.sync.ts"]
SJ["navigator-detector.ts"]
end
SD["site-name.ts"]
SK["table-localization.ts"]
SL["theme-provider.tsx"]
SM["use-page-title.ts"]
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
9M-->9K
9P-->9R
9S-->9R
9V-->9X
9Y-->9X
A2-->A4
A5-->A4
A9-->AB
A9-->AK
A9-->AE
A9-->AJ
AB-->AD
AB-->AF
AB-->AG
AB-->AH
AB-->AI
AB-->AE
AB-->AJ
AD-->AE
AK-->AE
AL-->AH
AL-->AB
AL-->AE
AM-->AN
AM-->AH
AM-->AB
AM-->AK
AM-->AE
AO-->AK
AP-->AE
AR-->AE
AV-->AX
AY-->AX
B1-->B3
B4-->B3
B8-->BA
BB-->BA
BF-->BH
BI-->BH
BJ-->BH
BN-->BP
BQ-->BP
BT-->BV
BW-->BV
C0-->C2
C6-->C8
CB-->CD
CE-->CD
CE-->CF
CJ-->CL
CM-->CL
CQ-->CS
CT-->CS
CX-->CZ
D0-->CZ
D2-->D4
D9-->DB
DC-->DB
DF-->DH
DK-->DM
DK-->DN
DM-->DN
DR-->DT
DU-->DT
DX-->DZ
DX-->E0
DX-->E1
DX-->E4
E1-->E2
E2-->E3
E4-->DZ
E4-->E5
EC-->EE
EE-->EF
EI-->EK
EN-->EP
EN-->EQ
ET-->EV
EY-->F0
F4-->F6
F7-->F6
FA-->FC
FF-->FH
FH-->FI
FJ-->FI
FK-->FI
FL-->FH
FO-->FQ
FR-->FQ
FS-->FQ
FX-->FZ
G0-->FZ
G1-->FZ
G5-->G7
GA-->GC
GG-->GI
GO-->GQ
GO-->GR
GS-->GR
GV-->GX
GY-->GX
H2-->H4
H5-->H4
H8-->HA
HD-->HF
HD-->HG
HD-->HH
HF-->HG
HI-->HF
HM-->HO
HP-->HO
HS-->HU
HX-->HZ
I0-->HZ
I3-->I5
I5-->I6
I9-->IB
IB-->IC
IB-->ID
IB-->IE
IB-->IF
ID-->IC
ID-->IE
IG-->IH
IK-->IM
IQ-->IS
IT-->IS
IW-->IY
J1-->J3
J1-->J4
J1-->J5
J1-->J6
JB-->JD
JB-->JE
JE-->JD
JI-->JK
JK-->JL
JO-->JQ
JQ-->JR
JU-->JW
JU-->JY
JU-->JZ
JU-->JX
JW-->JX
K0-->JX
K3-->K5
K3-->K6
K3-->K7
K7-->K6
K8-->K5
KB-->KD
KB-->KE
KE-->KD
KF-->KE
KJ-->KL
KJ-->KM
KM-->KL
KP-->KR
KV-->KX
KY-->KX
L2-->L4
L5-->L4
L8-->LA
LB-->LA
LE-->LG
LJ-->LL
LQ-->LS
LV-->LX
LV-->LY
M1-->M3
M4-->M5
M9-->MB
ME-->MG
MJ-->ML
MQ-->MS
MQ-->MT
MX-->MZ
MX-->N0
N1-->N0
N4-->N6
N4-->NH
N4-->N8
N4-->NC
N4-->NI
N4-->NJ
N4-->NK
N4-->NL
N4-->NM
N4-->NN
N4-->N9
N4-->ND
N4-->NB
N4-->N7
N4-->NO
N4-->NE
N4-->NP
N4-->NF
N4-->NA
N4-->NQ
N4-->NG
N6-->N7
N7-->N6
N7-->N8
N7-->N9
N7-->NB
N7-->NE
N7-->NF
N8-->N7
N9-->N7
N9-->NA
NA-->N9
NB-->NC
NB-->ND
NB-->N7
ND-->NC
ND-->NB
NE-->NF
NE-->NG
NF-->NB
NF-->N7
NF-->NE
NH-->N7
NH-->NG
NI-->NJ
NK-->NG
NL-->NJ
NL-->NG
NM-->N7
NM-->NE
NO-->NG
NP-->NM
NU-->NW
NU-->NX
NU-->NY
NU-->NZ
O0-->NW
O1-->NZ
O4-->O6
O4-->O7
O4-->O8
O4-->O9
O4-->OA
O4-->OB
O4-->OC
O4-->OD
O4-->OE
O4-->OF
O4-->OG
O4-->OH
O4-->OI
OE-->OD
OL-->ON
OL-->OS
OL-->OV
OL-->OT
OL-->OX
OL-->OZ
OL-->P0
OL-->OR
OL-->OO
OL-->P1
OL-->P2
OL-->P4
OL-->OW
OL-->P5
OL-->OY
OL-->P3
OL-->P6
OL-->P7
OL-->OP
OL-->OU
OL-->OQ
ON-->OO
ON-->OP
ON-->OQ
OQ-->ON
OQ-->OR
OS-->OT
OS-->OU
OV-->OW
OX-->OT
OX-->OY
OX-->OU
OY-->OT
OY-->OP
OY-->OU
OZ-->OT
OZ-->OU
P1-->OO
P1-->OP
P1-->OQ
P2-->OW
P2-->P3
P3-->OY
P3-->OP
P3-->OQ
P4-->P2
P5-->OY
P5-->OU
P6-->P3
P6-->OQ
PB-->PD
PB-->PE
PB-->PF
PB-->PG
PB-->PH
PB-->PI
PB-->PJ
PB-->PK
PB-->PL
PB-->PM
PB-->PN
PB-->PO
PB-->PP
PB-->PQ
PB-->PR
PB-->PS
PB-->PT
PU-->PD
PV-->PK
PW-->PL
PX-->PL
PY-->PM
PZ-->PS
Q2-->PT
Q6-->Q8
Q6-->Q9
Q6-->QA
Q6-->QC
Q6-->QD
Q6-->QE
Q6-->QF
Q6-->QG
Q6-->QH
Q6-->QI
Q6-->QJ
Q6-->QK
Q6-->QB
Q6-->QL
Q6-->QM
Q6-->QN
Q6-->QO
Q6-->QP
Q6-->QQ
Q6-->QR
QA-->QB
QL-->QB
QM-->QB
QS-->Q8
QS-->QG
QS-->QP
QS-->QR
QT-->Q8
QT-->QG
QT-->QP
QT-->QR
QU-->QA
QV-->QA
QW-->QI
QX-->QB
QY-->QL
QY-->QQ
QZ-->QL
QZ-->QQ
R1-->Q8
R1-->QM
R2-->QN
R3-->QP
R6-->R8
RB-->RD
RB-->RE
RK-->RN
RU-->RW
RX-->RW
RY-->RW
RZ-->RW
S0-->RW
S3-->S5
S3-->S6
S3-->S8
S3-->SH
S3-->S9
S3-->SA
S3-->SI
S3-->SJ
S3-->SD
S3-->SK
S3-->SL
S3-->SM
S5-->S6
S5-->S8
S5-->SA
S8-->S9
SA-->SC
SA-->SF
SA-->SG
SA-->S9
SC-->SD
SF-->SD
SI-->SC
SI-->SF
SI-->SG
SI-->S9
SK-->S8
SL-->S5
SM-->S8
