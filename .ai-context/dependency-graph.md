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
end
end
end
subgraph BQ["shipping-returns"]
subgraph BR["src"]
BS["index.ts"]
subgraph BT["lib"]
BU["customer-shipping-returns.tsx"]
BV["customer-shipping-returns.spec.tsx"]
end
end
BW["vite.config.ts"]
end
subgraph BX["unauthorized"]
subgraph BY["src"]
BZ["index.ts"]
subgraph C0["lib"]
C1["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C2["utility"]
subgraph C3["test"]
subgraph C4["src"]
C5["index.ts"]
subgraph C6["lib"]
C7["customers-test-utility.tsx"]
end
end
end
end
subgraph C8["validations"]
subgraph C9["src"]
CA["index.ts"]
subgraph CB["lib"]
CC["shipping-validation.ts"]
CD["shipping-validation.spec.tsx"]
CE["shipping-validation.tsx"]
end
end
end
subgraph CF["zustand"]
subgraph CG["customer-cart-store"]
subgraph CH["src"]
CI["index.ts"]
subgraph CJ["lib"]
CK["customer-cart-store.ts"]
CL["customer-cart-store.spec.ts"]
CM["customer-cart-store.tsx"]
end
end
end
subgraph CN["customer-checkout-store"]
subgraph CO["src"]
CP["index.ts"]
subgraph CQ["lib"]
CR["customer-checkout-store.ts"]
CS["customer-checkout-store.spec.ts"]
end
end
CT["vite.config.ts"]
end
subgraph CU["customer-wishlist-store"]
subgraph CV["src"]
CW["index.ts"]
subgraph CX["lib"]
CY["customer-wishlist-store.ts"]
CZ["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D0["src"]
D1["index.ts"]
subgraph D2["lib"]
D3["customers-products-store.tsx"]
end
end
end
end
subgraph D4["sellers"]
subgraph D5["components"]
subgraph D6["footer"]
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["sellers-footer.tsx"]
DB["sellers-footer.spec.tsx"]
end
end
end
subgraph DC["headerbar"]
subgraph DD["src"]
DE["index.ts"]
subgraph DF["lib"]
DG["SellersHeaderbar.tsx"]
end
end
end
subgraph DH["layout"]
subgraph DI["src"]
DJ["index.ts"]
subgraph DK["lib"]
DL["SellersLayout.tsx"]
DM["SellersTabbar.tsx"]
end
end
end
end
subgraph DN["contexts"]
subgraph DO["auth"]
subgraph DP["src"]
DQ["index.ts"]
subgraph DR["lib"]
DS["SellersAuthContext.tsx"]
DT["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DU["graphql"]
subgraph DV["src"]
DW["index.ts"]
subgraph DX["lib"]
DY["fragments.ts"]
DZ["mutations.ts"]
E0["Provider.tsx"]
E1["SellersApolloProvider.tsx"]
E2["client.ts"]
E3["queries.ts"]
E4["seller-orders.graphql.ts"]
E5["apollo-upload-client.d.ts"]
end
subgraph E6["types"]
E7["apollo-upload-client.d.ts"]
end
end
end
subgraph E8["hooks"]
subgraph E9["auth"]
subgraph EA["src"]
EB["index.ts"]
subgraph EC["lib"]
ED["useSellerAuth.ts"]
EE["sellerAuth.graphql.ts"]
end
end
end
subgraph EF["orders"]
subgraph EG["src"]
EH["index.ts"]
subgraph EI["lib"]
EJ["useSellerOrders.ts"]
end
end
end
subgraph EK["products"]
subgraph EL["src"]
EM["index.ts"]
subgraph EN["lib"]
EO["useSellersProductManagement.ts"]
EP["useSellersProducts.ts"]
end
end
end
end
subgraph EQ["router"]
subgraph ER["src"]
ES["index.ts"]
subgraph ET["lib"]
EU["SellersRouter.tsx"]
end
end
end
subgraph EV["routes"]
subgraph EW["src"]
EX["index.ts"]
subgraph EY["lib"]
EZ["seller-routes.ts"]
end
end
end
subgraph F0["screens"]
subgraph F1["catalog"]
subgraph F2["src"]
F3["index.ts"]
subgraph F4["lib"]
F5["SellersCatalogScreens.tsx"]
F6["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph F7["login"]
subgraph F8["src"]
F9["index.ts"]
subgraph FA["lib"]
FB["SellersLogin.tsx"]
end
end
end
subgraph FC["manage-product"]
subgraph FD["src"]
FE["index.ts"]
subgraph FF["lib"]
FG["SellersManageProductScreen.tsx"]
FH["SellersDefineProductFlow.tsx"]
FI["SellersDefineProductFlow.pants-label.spec.tsx"]
FJ["SellersDefineProductFlow.spec.tsx"]
FK["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FL["products"]
subgraph FM["src"]
FN["index.ts"]
subgraph FO["lib"]
FP["SellersProducts.tsx"]
FQ["SellersProducts.pants-label.spec.tsx"]
FR["SellersProducts.spec.tsx"]
end
end
end
subgraph FS["seller-orders"]
FT["jest.config.ts"]
FU["jest.setup.ts"]
subgraph FV["src"]
FW["index.ts"]
subgraph FX["lib"]
FY["seller-orders-screen.tsx"]
FZ["seller-orders-screen.pants-size.spec.tsx"]
G0["seller-orders-screen.spec.tsx"]
end
G1["test-setup.ts"]
end
end
subgraph G2["setup-password"]
subgraph G3["src"]
G4["index.ts"]
subgraph G5["lib"]
G6["SellersSetupPassword.tsx"]
end
end
end
subgraph G7["unauthorized"]
subgraph G8["src"]
G9["index.ts"]
subgraph GA["lib"]
GB["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GC["zustand"]
subgraph GD["sellers-products-store"]
subgraph GE["src"]
GF["index.ts"]
subgraph GG["lib"]
GH["useSellersProductsStore.ts"]
GI["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GJ["shared"]
subgraph GK["components"]
subgraph GL["apollo-provider-base"]
subgraph GM["src"]
GN["index.ts"]
subgraph GO["lib"]
GP["ApolloProviderBase.tsx"]
GQ["createSilentRefreshAuthLink.ts"]
GR["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GS["error-boundary"]
subgraph GT["src"]
GU["index.ts"]
subgraph GV["lib"]
GW["error-boundary.tsx"]
GX["error-boundary.spec.tsx"]
end
end
GY["vite.config.ts"]
end
subgraph GZ["glassmorphism-container"]
subgraph H0["src"]
H1["index.ts"]
subgraph H2["lib"]
H3["glassmorphism-container.tsx"]
H4["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H5["layout"]
subgraph H6["src"]
H7["index.ts"]
subgraph H8["lib"]
H9["Layout.tsx"]
end
end
end
subgraph HA["material-data-table"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["material-data-table.tsx"]
HF["table-config.ts"]
HG["table-utils.ts"]
HH["material-data-table.spec.tsx"]
HI["table-types.ts"]
end
end
end
subgraph HJ["order-status-chip"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["order-status-chip.tsx"]
HO["order-status-chip.spec.tsx"]
end
end
end
subgraph HP["password-field"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["PasswordTextField.tsx"]
end
end
end
subgraph HU["price-display"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["price-display.tsx"]
HZ["price-display.spec.tsx"]
end
end
end
subgraph I0["private-route"]
subgraph I1["src"]
I2["index.ts"]
subgraph I3["lib"]
I4["createPrivateRoute.tsx"]
I5["PrivateRoute.tsx"]
end
end
end
subgraph I6["rtl-table-utils"]
subgraph I7["src"]
I8["index.ts"]
subgraph I9["lib"]
IA["rtl-table-utils.ts"]
IB["rtl-cell-components.tsx"]
IC["rtl-column-helpers.ts"]
ID["rtl-table-props.ts"]
IE["use-table-alignment.ts"]
IF["rtl-table-utils.spec.tsx"]
IG["rtl-table-utils.tsx"]
end
end
end
subgraph IH["snackbar"]
subgraph II["src"]
IJ["index.ts"]
subgraph IK["lib"]
IL["snackbar.tsx"]
IM["Snackbar.tsx"]
end
end
end
subgraph IN["styled-drawer"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["styled-drawer.tsx"]
IS["styled-drawer.spec.tsx"]
end
end
end
subgraph IT["unauthorized"]
subgraph IU["src"]
IV["index.ts"]
subgraph IW["lib"]
IX["unauthorized-path.tsx"]
end
end
end
end
subgraph IY["graphql"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["currency.mutations.ts"]
J3["currency.queries.ts"]
J4["fragments.ts"]
J5["variant-colors.ts"]
J6["client-shared-graphql.tsx"]
end
end
end
subgraph J7["hooks"]
subgraph J8["brands"]
subgraph J9["src"]
JA["index.ts"]
subgraph JB["lib"]
JC["brands.graphql.ts"]
JD["useBrands.ts"]
end
end
JE["vite.config.ts"]
end
subgraph JF["categories"]
subgraph JG["src"]
JH["index.ts"]
subgraph JI["lib"]
JJ["useCategories.ts"]
JK["categories.graphql.ts"]
end
end
end
subgraph JL["colors"]
subgraph JM["src"]
JN["index.ts"]
subgraph JO["lib"]
JP["useColors.ts"]
JQ["color.graphql.ts"]
end
end
end
subgraph JR["currency"]
subgraph JS["src"]
JT["index.ts"]
subgraph JU["lib"]
JV["useConvertPrice.tsx"]
JW["useExchangeRate.tsx"]
JX["useCurrencies.tsx"]
JY["useCurrencyForLocale.tsx"]
JZ["useExchangeRate.spec.tsx"]
end
end
end
subgraph K0["products"]
subgraph K1["src"]
K2["index.ts"]
subgraph K3["lib"]
K4["productImage.ts"]
K5["products.graphql.ts"]
K6["useProducts.ts"]
K7["productImage.spec.ts"]
end
end
end
subgraph K8["site-languages"]
subgraph K9["src"]
KA["index.ts"]
subgraph KB["lib"]
KC["site-languages.graphql.ts"]
KD["useSiteLanguages.ts"]
KE["site-languages-hook.spec.tsx"]
end
end
KF["vite.config.ts"]
end
subgraph KG["snackbar"]
subgraph KH["src"]
KI["index.ts"]
subgraph KJ["lib"]
KK["SnackbarContext.tsx"]
KL["useSnackbar.ts"]
end
end
end
subgraph KM["translations-management-hook"]
subgraph KN["src"]
KO["index.ts"]
subgraph KP["lib"]
KQ["useTranslationsManagement.ts"]
end
end
end
end
subgraph KR["lottie"]
subgraph KS["empty-cart"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["lottie-empty-cart.tsx"]
KX["lottie-empty-cart.spec.tsx"]
end
end
KY["vite.config.ts"]
end
subgraph KZ["loading"]
subgraph L0["src"]
L1["index.ts"]
subgraph L2["lib"]
L3["lottie-loading.tsx"]
L4["lottie-loading.spec.tsx"]
end
end
end
subgraph L5["success-check"]
subgraph L6["src"]
L7["index.ts"]
subgraph L8["lib"]
L9["lottie-success-check.tsx"]
LA["lottie-success-check.spec.tsx"]
end
end
end
subgraph LB["unauthorized"]
subgraph LC["src"]
LD["index.ts"]
subgraph LE["lib"]
LF["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LG["translations"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["mapApolloErrorToTranslationKey.ts"]
LL["WrapTranslation.tsx"]
end
end
end
subgraph LM["ui"]
subgraph LN["colors"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["colors.ts"]
end
end
end
subgraph LS["language-components"]
subgraph LT["src"]
LU["index.ts"]
subgraph LV["lib"]
LW["language-components.tsx"]
LX["ltr-text-field.tsx"]
end
end
end
subgraph LY["sizes"]
subgraph LZ["src"]
M0["index.ts"]
subgraph M1["lib"]
M2["sizes.ts"]
M3["sizes.spec.tsx"]
M4["sizes.tsx"]
end
end
end
end
subgraph M5["zustand"]
subgraph M6["shared-auth-store"]
subgraph M7["src"]
M8["index.ts"]
subgraph M9["lib"]
MA["shared-auth-store.ts"]
end
end
end
subgraph MB["shared-notification-store"]
subgraph MC["src"]
MD["index.ts"]
subgraph ME["lib"]
MF["shared-notification-store.tsx"]
end
end
end
subgraph MG["shared-ui-store"]
subgraph MH["src"]
MI["index.ts"]
subgraph MJ["lib"]
MK["shared-ui-store.ts"]
ML["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MM["server"]
subgraph MN["controllers"]
subgraph MO["src"]
MP["index.ts"]
subgraph MQ["lib"]
MR["auth.controller.ts"]
MS["order.controller.ts"]
end
end
end
subgraph MT["decorators"]
MU["jest.config.ts"]
subgraph MV["src"]
MW["index.ts"]
subgraph MX["lib"]
MY["current-user.decorator.ts"]
MZ["decorators.ts"]
N0["decorators.spec.ts"]
end
end
end
subgraph N1["entities"]
subgraph N2["src"]
N3["index.ts"]
subgraph N4["lib"]
N5["brand.entity.ts"]
N6["product.entity.ts"]
N7["category.entity.ts"]
N8["product-description.entity.ts"]
N9["site-language.entity.ts"]
NA["product-info.entity.ts"]
NB["color.entity.ts"]
NC["product-info-color.entity.ts"]
ND["seller-info.entity.ts"]
NE["seller-product.entity.ts"]
NF["user.entity.ts"]
NG["cart.entity.ts"]
NH["currency-preference.entity.ts"]
NI["currency.entity.ts"]
NJ["customer.entity.ts"]
NK["exchange-rate.entity.ts"]
NL["order.entity.ts"]
NM["platform-settings.entity.ts"]
NN["refresh-token.entity.ts"]
NO["seller-order.entity.ts"]
NP["translation.entity.ts"]
end
end
end
subgraph NQ["guards"]
NR["jest.config.ts"]
subgraph NS["src"]
NT["index.ts"]
subgraph NU["lib"]
NV["catalog.guard.ts"]
NW["graphql-auth.guard.ts"]
NX["http-auth.guard.ts"]
NY["roles.guard.ts"]
NZ["catalog.guard.spec.ts"]
O0["roles.guard.spec.ts"]
end
end
end
subgraph O1["inputs"]
subgraph O2["src"]
O3["index.ts"]
subgraph O4["lib"]
O5["brand.input.ts"]
O6["cart.inputs.ts"]
O7["category.input.ts"]
O8["color.input.ts"]
O9["customer-auth.inputs.ts"]
OA["order-pagination.inputs.ts"]
OB["order.inputs.ts"]
OC["product-info-filter.input.ts"]
OD["product.input.ts"]
OE["seller-order-pagination.inputs.ts"]
OF["seller.input.ts"]
OG["site-language.input.ts"]
OH["user.input.ts"]
end
end
end
subgraph OI["modules"]
subgraph OJ["src"]
OK["index.ts"]
subgraph OL["lib"]
OM["auth.module.ts"]
ON["email.module.ts"]
OO["token.module.ts"]
OP["user.module.ts"]
OQ["customer-profile.module.ts"]
OR["brand.module.ts"]
OS["catalog-guard.module.ts"]
OT["translation.module.ts"]
OU["cart.module.ts"]
OV["platform-settings.module.ts"]
OW["category.module.ts"]
OX["product.module.ts"]
OY["color.module.ts"]
OZ["currency.module.ts"]
P0["graphql-context.module.ts"]
P1["order.module.ts"]
P2["seller-info.module.ts"]
P3["payment.module.ts"]
P4["product-info.module.ts"]
P5["seller-products.module.ts"]
P6["site-language.module.ts"]
end
end
end
subgraph P7["resolvers"]
P8["jest.config.ts"]
subgraph P9["src"]
PA["index.ts"]
subgraph PB["lib"]
PC["auth.resolver.ts"]
PD["brand.resolver.ts"]
PE["cart.resolver.ts"]
PF["category.resolver.ts"]
PG["color.resolver.ts"]
PH["currency.resolver.ts"]
PI["customer-profile.resolver.ts"]
PJ["order.resolver.ts"]
PK["payment.resolver.ts"]
PL["product-info.resolver.ts"]
PM["product.resolver.ts"]
PN["seller-info.resolver.ts"]
PO["shipping.resolver.ts"]
PP["site-language.resolver.ts"]
PQ["translation.input.ts"]
PR["translation.resolver.ts"]
PS["user.resolver.ts"]
PT["auth.resolver.spec.ts"]
PU["order.resolver.spec.ts"]
PV["payment.resolver.integration.spec.ts"]
PW["payment.resolver.spec.ts"]
PX["product-info.resolver.spec.ts"]
PY["translation.resolver.guards.spec.ts"]
subgraph PZ["types"]
Q0["graphql-upload.d.ts"]
end
Q1["user.resolver.spec.ts"]
end
end
end
subgraph Q2["services"]
Q3["jest.config.ts"]
subgraph Q4["src"]
Q5["index.ts"]
subgraph Q6["lib"]
Q7["auth.service.ts"]
Q8["brand.service.ts"]
Q9["cart.service.ts"]
QA["product-info-colors.util.ts"]
QB["category.service.ts"]
QC["color.service.ts"]
QD["currency.service.ts"]
QE["customer-profile.service.ts"]
QF["email.service.ts"]
QG["image-upload.service.ts"]
QH["order.service.ts"]
QI["payment-logger.service.ts"]
QJ["payment.service.ts"]
QK["product.service.ts"]
QL["seller-info.service.ts"]
QM["shipping-calculation.service.ts"]
QN["site-language.service.ts"]
QO["token.service.ts"]
QP["translation.service.ts"]
QQ["user.service.ts"]
QR["auth.service.password-policy.spec.ts"]
QS["auth.service.spec.ts"]
QT["cart.service.add-quantity.spec.ts"]
QU["cart.service.spec.ts"]
QV["order.service.spec.ts"]
QW["product-info-colors.util.spec.ts"]
QX["product.service.pants.spec.ts"]
QY["product.service.spec.ts"]
QZ["relay-connection.spec.ts"]
R0["seller-info.service.price-validation.spec.ts"]
R1["shipping-calculation.service.spec.ts"]
R2["token.service.spec.ts"]
end
end
end
subgraph R3["strategies"]
subgraph R4["src"]
R5["index.ts"]
subgraph R6["lib"]
R7["local.strategy.ts"]
end
end
end
subgraph R8["utils"]
subgraph R9["src"]
RA["index.ts"]
subgraph RB["lib"]
RC["email-templates.ts"]
RD["relay-connection.ts"]
RE["pagination.ts"]
end
end
end
end
subgraph RF["shared"]
subgraph RG["codegen"]
RH["jest.config.ts"]
subgraph RI["src"]
RJ["index.ts"]
subgraph RK["lib"]
subgraph RL["generated"]
RM["graphql.ts"]
end
end
end
end
subgraph RN["graphql-schema"]
RO["jest.config.ts"]
subgraph RP["src"]
RQ["index.ts"]
end
end
subgraph RR["product-sizes"]
subgraph RS["src"]
RT["index.ts"]
subgraph RU["lib"]
RV["product-sizes.ts"]
RW["product-sizes.pants-formats.spec.ts"]
RX["product-sizes.pants-label.spec.ts"]
RY["product-sizes.pants-strict.spec.ts"]
RZ["product-sizes.spec.ts"]
end
end
end
subgraph S0["shared-i18n"]
subgraph S1["src"]
S2["index.ts"]
subgraph S3["lib"]
S4["language-context.tsx"]
S5["language-detector.ts"]
subgraph S6["locales"]
S7["i18n-react.tsx"]
S8["i18n-util.ts"]
S9["i18n-util.async.ts"]
subgraph SA["en"]
SB["index.ts"]
end
subgraph SD["fa"]
SE["index.ts"]
end
SF["formatters.ts"]
SG["i18n-types.ts"]
SH["i18n-util.sync.ts"]
SI["navigator-detector.ts"]
end
SC["site-name.ts"]
SJ["table-localization.ts"]
SK["theme-provider.tsx"]
SL["use-page-title.ts"]
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
BS-->BU
BV-->BU
BZ-->C1
C5-->C7
CA-->CC
CD-->CC
CD-->CE
CI-->CK
CL-->CK
CP-->CR
CS-->CR
CW-->CY
CZ-->CY
D1-->D3
D8-->DA
DB-->DA
DE-->DG
DJ-->DL
DJ-->DM
DL-->DM
DQ-->DS
DT-->DS
DW-->DY
DW-->DZ
DW-->E0
DW-->E3
E0-->E1
E1-->E2
E3-->DY
E3-->E4
EB-->ED
ED-->EE
EH-->EJ
EM-->EO
EM-->EP
ES-->EU
EX-->EZ
F3-->F5
F6-->F5
F9-->FB
FE-->FG
FG-->FH
FI-->FH
FJ-->FH
FK-->FG
FN-->FP
FQ-->FP
FR-->FP
FW-->FY
FZ-->FY
G0-->FY
G4-->G6
G9-->GB
GF-->GH
GN-->GP
GN-->GQ
GR-->GQ
GU-->GW
GX-->GW
H1-->H3
H4-->H3
H7-->H9
HC-->HE
HC-->HF
HC-->HG
HE-->HF
HH-->HE
HL-->HN
HO-->HN
HR-->HT
HW-->HY
HZ-->HY
I2-->I4
I4-->I5
I8-->IA
IA-->IB
IA-->IC
IA-->ID
IA-->IE
IC-->IB
IC-->ID
IF-->IG
IJ-->IL
IP-->IR
IS-->IR
IV-->IX
J0-->J2
J0-->J3
J0-->J4
J0-->J5
JA-->JC
JA-->JD
JD-->JC
JH-->JJ
JJ-->JK
JN-->JP
JP-->JQ
JT-->JV
JT-->JX
JT-->JY
JT-->JW
JV-->JW
JZ-->JW
K2-->K4
K2-->K5
K2-->K6
K6-->K5
K7-->K4
KA-->KC
KA-->KD
KD-->KC
KE-->KD
KI-->KK
KI-->KL
KL-->KK
KO-->KQ
KU-->KW
KX-->KW
L1-->L3
L4-->L3
L7-->L9
LA-->L9
LD-->LF
LI-->LK
LP-->LR
LU-->LW
LU-->LX
M0-->M2
M3-->M4
M8-->MA
MD-->MF
MI-->MK
MP-->MR
MP-->MS
MW-->MY
MW-->MZ
N0-->MZ
N3-->N5
N3-->NG
N3-->N7
N3-->NB
N3-->NH
N3-->NI
N3-->NJ
N3-->NK
N3-->NL
N3-->NM
N3-->N8
N3-->NC
N3-->NA
N3-->N6
N3-->NN
N3-->ND
N3-->NO
N3-->NE
N3-->N9
N3-->NP
N3-->NF
N5-->N6
N6-->N5
N6-->N7
N6-->N8
N6-->NA
N6-->ND
N6-->NE
N7-->N6
N8-->N6
N8-->N9
N9-->N8
NA-->NB
NA-->NC
NA-->N6
NC-->NB
NC-->NA
ND-->NE
ND-->NF
NE-->NA
NE-->N6
NE-->ND
NG-->N6
NG-->NF
NH-->NI
NJ-->NF
NK-->NI
NK-->NF
NL-->N6
NL-->ND
NN-->NF
NO-->NL
NT-->NV
NT-->NW
NT-->NX
NT-->NY
NZ-->NV
O0-->NY
O3-->O5
O3-->O6
O3-->O7
O3-->O8
O3-->O9
O3-->OA
O3-->OB
O3-->OC
O3-->OD
O3-->OE
O3-->OF
O3-->OG
O3-->OH
OD-->OC
OK-->OM
OK-->OR
OK-->OU
OK-->OS
OK-->OW
OK-->OY
OK-->OZ
OK-->OQ
OK-->ON
OK-->P0
OK-->P1
OK-->P3
OK-->OV
OK-->P4
OK-->OX
OK-->P2
OK-->P5
OK-->P6
OK-->OO
OK-->OT
OK-->OP
OM-->ON
OM-->OO
OM-->OP
OP-->OM
OP-->OQ
OR-->OS
OR-->OT
OU-->OV
OW-->OS
OW-->OX
OW-->OT
OX-->OS
OX-->OO
OX-->OT
OY-->OS
OY-->OT
P0-->ON
P0-->OO
P0-->OP
P1-->OV
P1-->P2
P2-->OX
P2-->OO
P2-->OP
P3-->P1
P4-->OX
P4-->OT
P5-->P2
P5-->OP
PA-->PC
PA-->PD
PA-->PE
PA-->PF
PA-->PG
PA-->PH
PA-->PI
PA-->PJ
PA-->PK
PA-->PL
PA-->PM
PA-->PN
PA-->PO
PA-->PP
PA-->PQ
PA-->PR
PA-->PS
PT-->PC
PU-->PJ
PV-->PK
PW-->PK
PX-->PL
PY-->PR
Q1-->PS
Q5-->Q7
Q5-->Q8
Q5-->Q9
Q5-->QB
Q5-->QC
Q5-->QD
Q5-->QE
Q5-->QF
Q5-->QG
Q5-->QH
Q5-->QI
Q5-->QJ
Q5-->QA
Q5-->QK
Q5-->QL
Q5-->QM
Q5-->QN
Q5-->QO
Q5-->QP
Q5-->QQ
Q9-->QA
QK-->QA
QL-->QA
QR-->Q7
QR-->QF
QR-->QO
QR-->QQ
QS-->Q7
QS-->QF
QS-->QO
QS-->QQ
QT-->Q9
QU-->Q9
QV-->QH
QW-->QA
QX-->QK
QX-->QP
QY-->QK
QY-->QP
R0-->Q7
R0-->QL
R1-->QM
R2-->QO
R5-->R7
RA-->RC
RA-->RD
RJ-->RM
RT-->RV
RW-->RV
RX-->RV
RY-->RV
RZ-->RV
S2-->S4
S2-->S5
S2-->S7
S2-->SG
S2-->S8
S2-->S9
S2-->SH
S2-->SI
S2-->SC
S2-->SJ
S2-->SK
S2-->SL
S4-->S5
S4-->S7
S4-->S9
S7-->S8
S9-->SB
S9-->SE
S9-->SF
S9-->S8
SB-->SC
SE-->SC
SH-->SB
SH-->SE
SH-->SF
SH-->S8
SJ-->S7
SK-->S4
SL-->S7
