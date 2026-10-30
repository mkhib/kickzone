flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.ts"]
5["global-validation-pipe.spec.ts"]
6["global-validation-pipe.ts"]
7["order-inputs.validation.spec.ts"]
8["product-variant-inputs.validation.spec.ts"]
9["seller-product-inputs.validation.spec.ts"]
end
A["main.ts"]
end
end
end
subgraph B["libs"]
subgraph C["client"]
subgraph D["admins"]
subgraph E["components"]
subgraph F["footer"]
subgraph G["src"]
H["index.ts"]
subgraph I["lib"]
J["admins-footer.tsx"]
K["admins-footer.spec.tsx"]
end
end
end
subgraph L["headerbar"]
subgraph M["src"]
N["index.ts"]
subgraph O["lib"]
P["AdminsHeaderbar.tsx"]
Q["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph R["layout"]
subgraph S["src"]
T["index.ts"]
subgraph U["lib"]
V["AdminsLayout.tsx"]
W["AdminsTabbar.tsx"]
X["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph Y["contexts"]
subgraph Z["src"]
10["index.spec.tsx"]
11["index.ts"]
subgraph 12["lib"]
13["AdminsAuthContext.tsx"]
14["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 15["graphql"]
subgraph 16["src"]
17["index.ts"]
subgraph 18["lib"]
19["fragments.ts"]
1A["mutations.ts"]
1B["orders.graphql.ts"]
1C["Provider.tsx"]
1D["AdminsApolloProvider.tsx"]
1E["client.ts"]
1F["queries.ts"]
1G["Provider.spec.tsx"]
1H["apollo-upload-client.d.ts"]
1I["client.spec.tsx"]
1J["fragments.spec.tsx"]
1K["mutations.spec.tsx"]
1L["queries.spec.tsx"]
end
subgraph 1M["types"]
1N["apollo-upload-client.d.ts"]
end
end
end
subgraph 1O["hooks"]
subgraph 1P["auth"]
subgraph 1Q["src"]
1R["index.ts"]
subgraph 1S["lib"]
1T["useAdminLogin.ts"]
1U["useAdminLogin.spec.ts"]
1V["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1W["currency-management"]
subgraph 1X["src"]
1Y["index.ts"]
subgraph 1Z["lib"]
20["useAdminsCurrencyManagement.ts"]
end
end
21["vite.config.ts"]
end
subgraph 22["customers"]
subgraph 23["src"]
24["index.ts"]
subgraph 25["lib"]
26["adminsCustomers.graphql.ts"]
27["useAdminsCustomers.ts"]
28["useAdminsCustomers.spec.tsx"]
end
end
29["vite.config.ts"]
end
subgraph 2A["orders"]
subgraph 2B["src"]
2C["index.ts"]
subgraph 2D["lib"]
2E["admins-orders-hook.tsx"]
2F["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2G["sellers"]
subgraph 2H["src"]
2I["index.ts"]
subgraph 2J["lib"]
2K["useAdminsSellers.ts"]
2L["adminsSellers.graphql.ts"]
2M["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2N["router"]
subgraph 2O["src"]
2P["index.ts"]
subgraph 2Q["lib"]
2R["AdminsRouter.tsx"]
2S["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2T["routes"]
subgraph 2U["src"]
2V["index.spec.ts"]
2W["index.ts"]
subgraph 2X["lib"]
2Y["admin-routes.ts"]
2Z["admin-routes.spec.ts"]
end
end
end
subgraph 30["screens"]
subgraph 31["admin-seller-orders"]
subgraph 32["src"]
33["index.spec.tsx"]
34["index.ts"]
subgraph 35["lib"]
36["admin-seller-orders.tsx"]
37["admin-seller-orders.pants-size.spec.tsx"]
38["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 39["currency-management"]
subgraph 3A["src"]
3B["index.ts"]
subgraph 3C["lib"]
3D["currency-management.tsx"]
3E["currency-management.spec.tsx"]
end
end
end
subgraph 3F["customer-management"]
subgraph 3G["src"]
3H["index.ts"]
subgraph 3I["lib"]
3J["admin-customer-management.tsx"]
3K["admin-customer-management.spec.tsx"]
end
end
3L["vite.config.ts"]
end
subgraph 3M["login"]
subgraph 3N["src"]
3O["index.ts"]
subgraph 3P["lib"]
3Q["AdminsLogin.tsx"]
3R["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3S["product-editor"]
subgraph 3T["src"]
3U["index.spec.tsx"]
3V["index.ts"]
subgraph 3W["lib"]
3X["AdminProductEditor.tsx"]
3Y["AdminProductEditor.pants-range.spec.tsx"]
3Z["AdminProductEditor.spec.tsx"]
end
40["vite-env.d.ts"]
end
end
subgraph 41["products"]
subgraph 42["src"]
43["index.spec.tsx"]
44["index.ts"]
subgraph 45["lib"]
46["AdminProducts.tsx"]
47["adminProducts.hooks.ts"]
48["adminProducts.graphql.ts"]
49["ProductImageManagementModal.tsx"]
4A["AdminProducts.spec.tsx"]
4B["ProductImageManagementModal.pants-size.spec.tsx"]
4C["ProductImageManagementModal.spec.tsx"]
end
4D["vite-env.d.ts"]
end
end
subgraph 4E["seller-management"]
subgraph 4F["src"]
4G["index.spec.tsx"]
4H["index.ts"]
subgraph 4I["lib"]
4J["SellerManagement.tsx"]
4K["SellerManagement.spec.tsx"]
end
4L["vite-env.d.ts"]
end
end
subgraph 4M["translation-management"]
subgraph 4N["src"]
4O["index.ts"]
subgraph 4P["lib"]
4Q["AdminTranslationManagement.tsx"]
4R["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4S["unauthorized"]
subgraph 4T["src"]
4U["index.spec.tsx"]
4V["index.ts"]
subgraph 4W["lib"]
4X["admins-unauthorized-screen.tsx"]
4Y["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4Z["zustand"]
subgraph 50["admins-products-store"]
subgraph 51["src"]
52["index.spec.ts"]
53["index.ts"]
subgraph 54["lib"]
55["admins-products-store.ts"]
56["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 57["customers"]
subgraph 58["components"]
subgraph 59["footer"]
subgraph 5A["src"]
5B["index.ts"]
subgraph 5C["lib"]
5D["customers-footer.tsx"]
5E["TrustBadgeIcons.tsx"]
5F["customers-footer.spec.tsx"]
end
end
end
subgraph 5G["headerbar"]
subgraph 5H["src"]
5I["index.ts"]
subgraph 5J["lib"]
5K["CustomersHeaderbar.tsx"]
5L["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5M["layout"]
subgraph 5N["src"]
5O["index.ts"]
subgraph 5P["lib"]
5Q["CustomersLayout.tsx"]
5R["CustomersTabbar.tsx"]
5S["CustomersLayout.spec.tsx"]
5T["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5U["product-card"]
subgraph 5V["src"]
5W["index.ts"]
subgraph 5X["lib"]
5Y["CustomersProductCard.tsx"]
5Z["CustomersProductCard.pants-size.spec.tsx"]
60["CustomersProductCard.spec.tsx"]
end
61["vite-env.d.ts"]
end
end
end
subgraph 62["contexts"]
subgraph 63["auth"]
subgraph 64["src"]
65["index.ts"]
subgraph 66["lib"]
67["CustomersAuthContext.tsx"]
68["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 69["graphql"]
subgraph 6A["src"]
6B["index.ts"]
subgraph 6C["lib"]
6D["customer-profile.queries.ts"]
6E["mutations.ts"]
6F["Provider.tsx"]
6G["CustomersApolloProvider.tsx"]
6H["client.ts"]
6I["queries.ts"]
6J["apollo-upload-client.d.ts"]
end
end
end
subgraph 6K["hooks"]
subgraph 6L["auth"]
subgraph 6M["src"]
6N["index.ts"]
subgraph 6O["lib"]
6P["useCustomersForgotPassword.tsx"]
6Q["useCustomersLogin.tsx"]
6R["useCustomersRegister.tsx"]
6S["useCustomersResetPassword.tsx"]
6T["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6U["cart"]
6V["jest.config.ts"]
6W["jest.setup.ts"]
subgraph 6X["src"]
6Y["index.ts"]
subgraph 6Z["lib"]
70["customers-cart-hook.tsx"]
71["useCartService.ts"]
72["useWishlistSync.ts"]
73["useCartService.spec.tsx"]
74["useCartSync.ts"]
end
end
end
subgraph 75["orders"]
subgraph 76["src"]
77["index.ts"]
subgraph 78["lib"]
79["customers-orders-hook.tsx"]
end
end
end
subgraph 7A["products"]
subgraph 7B["src"]
7C["index.ts"]
subgraph 7D["lib"]
7E["customers-product-hook.tsx"]
end
end
end
end
subgraph 7F["router"]
subgraph 7G["src"]
7H["index.ts"]
subgraph 7I["lib"]
7J["CustomersRouter.tsx"]
7K["ScrollToTop.tsx"]
7L["CustomersRouter.spec.tsx"]
7M["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7N["routes"]
subgraph 7O["src"]
7P["index.ts"]
subgraph 7Q["lib"]
7R["customer-routes.ts"]
7S["customer-routes.spec.ts"]
end
end
end
subgraph 7T["screens"]
subgraph 7U["contact"]
subgraph 7V["src"]
7W["index.ts"]
subgraph 7X["lib"]
7Y["customer-contact.tsx"]
7Z["customer-contact.spec.tsx"]
end
end
80["vite.config.ts"]
end
subgraph 81["customer-checkout"]
subgraph 82["src"]
83["index.ts"]
subgraph 84["lib"]
85["customer-checkout.tsx"]
end
end
end
subgraph 86["customer-favorites"]
subgraph 87["src"]
88["index.ts"]
subgraph 89["lib"]
8A["customer-favorites.tsx"]
8B["customer-favorites.spec.tsx"]
end
end
8C["vite.config.ts"]
end
subgraph 8D["customer-login"]
subgraph 8E["src"]
8F["index.ts"]
subgraph 8G["lib"]
8H["customer-login.tsx"]
end
end
end
subgraph 8I["customer-order-confirmation"]
subgraph 8J["src"]
8K["index.ts"]
subgraph 8L["lib"]
8M["customer-order-confirmation.tsx"]
8N["customer-order-confirmation.pants-size.spec.tsx"]
8O["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8P["customer-orders"]
subgraph 8Q["src"]
8R["index.ts"]
subgraph 8S["lib"]
8T["customer-orders.tsx"]
end
end
end
subgraph 8U["customer-payment"]
subgraph 8V["src"]
8W["index.ts"]
subgraph 8X["lib"]
8Y["customer-payment-callback.tsx"]
8Z["use-zarinpal-payment.tsx"]
90["zarinpal-payment-service.ts"]
91["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 92["customer-products"]
subgraph 93["src"]
94["index.ts"]
subgraph 95["lib"]
96["customer-products.tsx"]
end
end
end
subgraph 97["customer-profile"]
subgraph 98["src"]
99["index.ts"]
subgraph 9A["lib"]
9B["customer-profile.tsx"]
9C["customer-profile.spec.tsx"]
end
end
end
subgraph 9D["customer-shopping-cart"]
subgraph 9E["src"]
9F["index.ts"]
subgraph 9G["lib"]
9H["customer-shopping-cart.tsx"]
9I["customer-shopping-cart.pants-size.spec.tsx"]
9J["customer-shopping-cart.spec.tsx"]
end
end
9K["vite.config.ts"]
end
subgraph 9L["customer-signup"]
subgraph 9M["src"]
9N["index.ts"]
subgraph 9O["lib"]
9P["customer-signup.tsx"]
9Q["customer-signup.password-length.spec.tsx"]
9R["customer-signup.spec.tsx"]
end
end
end
subgraph 9S["forgot-password"]
subgraph 9T["src"]
9U["index.ts"]
subgraph 9V["lib"]
9W["customer-forgot-password.tsx"]
9X["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9Y["guide-authenticity"]
subgraph 9Z["src"]
A0["index.ts"]
subgraph A1["lib"]
A2["customer-guide-authenticity.tsx"]
A3["customer-guide-authenticity.spec.tsx"]
end
end
A4["vite.config.ts"]
end
subgraph A5["guide-payment"]
subgraph A6["src"]
A7["index.ts"]
subgraph A8["lib"]
A9["customer-guide-payment.tsx"]
AA["customer-guide-payment.spec.tsx"]
end
end
AB["vite.config.ts"]
end
subgraph AC["home"]
subgraph AD["src"]
AE["index.ts"]
subgraph AF["lib"]
AG["CustomersHomeScreen.tsx"]
subgraph AH["components"]
AI["CategoryBentoSection.tsx"]
AK["HeroSection.tsx"]
AL["HomeLoadingScreen.tsx"]
AM["PicksRailSection.tsx"]
AN["TrustStripSection.tsx"]
AS["NewArrivalsSection.tsx"]
AU["BrandBlocksSection.tsx"]
AV["NewsletterSection.tsx"]
AW["ShopTheLookSection.tsx"]
AX["TickerSection.tsx"]
end
AJ["home-selectors.ts"]
AO["useScrollProgress.ts"]
AP["CustomersShopScreen.tsx"]
AQ["CustomersHomeScreen.cart-size.spec.tsx"]
AR["CustomersHomeScreen.spec.tsx"]
AT["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AY["login"]
subgraph AZ["src"]
B0["index.ts"]
subgraph B1["lib"]
B2["CustomersLoginScreen.tsx"]
B3["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph B4["not-found"]
subgraph B5["src"]
B6["index.ts"]
subgraph B7["lib"]
B8["customer-not-found.tsx"]
B9["customer-not-found.spec.tsx"]
end
end
BA["vite.config.ts"]
end
subgraph BB["privacy-policy"]
subgraph BC["src"]
BD["index.ts"]
subgraph BE["lib"]
BF["customer-privacy-policy.tsx"]
BG["customer-privacy-policy.spec.tsx"]
end
end
BH["vite.config.ts"]
end
subgraph BI["product-details"]
subgraph BJ["src"]
BK["index.ts"]
subgraph BL["lib"]
BM["customer-product-details.tsx"]
BN["customer-product-details.pants-size.spec.tsx"]
BO["customer-product-details.spec.tsx"]
end
end
BP["vite.config.ts"]
end
subgraph BQ["reset-password"]
subgraph BR["src"]
BS["index.ts"]
subgraph BT["lib"]
BU["customer-reset-password.tsx"]
BV["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph BW["shipping-returns"]
subgraph BX["src"]
BY["index.ts"]
subgraph BZ["lib"]
C0["customer-shipping-returns.tsx"]
C1["customer-shipping-returns.spec.tsx"]
end
end
C2["vite.config.ts"]
end
subgraph C3["unauthorized"]
subgraph C4["src"]
C5["index.ts"]
subgraph C6["lib"]
C7["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C8["utility"]
subgraph C9["test"]
subgraph CA["src"]
CB["index.ts"]
subgraph CC["lib"]
CD["customers-test-utility.tsx"]
end
end
end
end
subgraph CE["validations"]
subgraph CF["src"]
CG["index.ts"]
subgraph CH["lib"]
CI["shipping-validation.ts"]
CJ["shipping-validation.spec.tsx"]
CK["shipping-validation.tsx"]
end
end
end
subgraph CL["zustand"]
subgraph CM["customer-cart-store"]
subgraph CN["src"]
CO["index.ts"]
subgraph CP["lib"]
CQ["customer-cart-store.ts"]
CR["customer-cart-store.spec.ts"]
CS["customer-cart-store.tsx"]
end
end
end
subgraph CT["customer-checkout-store"]
subgraph CU["src"]
CV["index.ts"]
subgraph CW["lib"]
CX["customer-checkout-store.ts"]
CY["customer-checkout-store.spec.ts"]
end
end
CZ["vite.config.ts"]
end
subgraph D0["customer-wishlist-store"]
subgraph D1["src"]
D2["index.ts"]
subgraph D3["lib"]
D4["customer-wishlist-store.ts"]
D5["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D6["src"]
D7["index.ts"]
subgraph D8["lib"]
D9["customers-products-store.tsx"]
end
end
end
end
subgraph DA["sellers"]
subgraph DB["components"]
subgraph DC["footer"]
subgraph DD["src"]
DE["index.ts"]
subgraph DF["lib"]
DG["sellers-footer.tsx"]
DH["sellers-footer.spec.tsx"]
end
end
end
subgraph DI["headerbar"]
subgraph DJ["src"]
DK["index.ts"]
subgraph DL["lib"]
DM["SellersHeaderbar.tsx"]
end
end
end
subgraph DN["layout"]
subgraph DO["src"]
DP["index.ts"]
subgraph DQ["lib"]
DR["SellersLayout.tsx"]
DS["SellersTabbar.tsx"]
end
end
end
end
subgraph DT["contexts"]
subgraph DU["auth"]
subgraph DV["src"]
DW["index.ts"]
subgraph DX["lib"]
DY["SellersAuthContext.tsx"]
DZ["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E0["graphql"]
subgraph E1["src"]
E2["index.ts"]
subgraph E3["lib"]
E4["fragments.ts"]
E5["mutations.ts"]
E6["Provider.tsx"]
E7["SellersApolloProvider.tsx"]
E8["client.ts"]
E9["queries.ts"]
EA["seller-orders.graphql.ts"]
EB["apollo-upload-client.d.ts"]
end
subgraph EC["types"]
ED["apollo-upload-client.d.ts"]
end
end
end
subgraph EE["hooks"]
subgraph EF["auth"]
subgraph EG["src"]
EH["index.ts"]
subgraph EI["lib"]
EJ["useSellerAuth.ts"]
EK["sellerAuth.graphql.ts"]
end
end
end
subgraph EL["orders"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["useSellerOrders.ts"]
end
end
end
subgraph EQ["products"]
subgraph ER["src"]
ES["index.ts"]
subgraph ET["lib"]
EU["useSellersProductManagement.ts"]
EV["useSellersProducts.ts"]
end
end
end
end
subgraph EW["router"]
subgraph EX["src"]
EY["index.ts"]
subgraph EZ["lib"]
F0["SellersRouter.tsx"]
end
end
end
subgraph F1["routes"]
subgraph F2["src"]
F3["index.ts"]
subgraph F4["lib"]
F5["seller-routes.ts"]
end
end
end
subgraph F6["screens"]
subgraph F7["catalog"]
subgraph F8["src"]
F9["index.ts"]
subgraph FA["lib"]
FB["SellersCatalogScreens.tsx"]
FC["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FD["login"]
subgraph FE["src"]
FF["index.ts"]
subgraph FG["lib"]
FH["SellersLogin.tsx"]
end
end
end
subgraph FI["manage-product"]
subgraph FJ["src"]
FK["index.ts"]
subgraph FL["lib"]
FM["SellersManageProductScreen.tsx"]
FN["SellersDefineProductFlow.tsx"]
FO["SellersDefineProductFlow.pants-label.spec.tsx"]
FP["SellersDefineProductFlow.spec.tsx"]
FQ["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FR["products"]
subgraph FS["src"]
FT["index.ts"]
subgraph FU["lib"]
FV["SellersProducts.tsx"]
FW["SellersProducts.pants-label.spec.tsx"]
FX["SellersProducts.spec.tsx"]
end
end
end
subgraph FY["seller-orders"]
FZ["jest.config.ts"]
G0["jest.setup.ts"]
subgraph G1["src"]
G2["index.ts"]
subgraph G3["lib"]
G4["seller-orders-screen.tsx"]
G5["seller-orders-screen.pants-size.spec.tsx"]
G6["seller-orders-screen.spec.tsx"]
end
G7["test-setup.ts"]
end
end
subgraph G8["setup-password"]
subgraph G9["src"]
GA["index.ts"]
subgraph GB["lib"]
GC["SellersSetupPassword.tsx"]
end
end
end
subgraph GD["unauthorized"]
subgraph GE["src"]
GF["index.ts"]
subgraph GG["lib"]
GH["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GI["zustand"]
subgraph GJ["sellers-products-store"]
subgraph GK["src"]
GL["index.ts"]
subgraph GM["lib"]
GN["useSellersProductsStore.ts"]
GO["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GP["shared"]
subgraph GQ["components"]
subgraph GR["apollo-provider-base"]
subgraph GS["src"]
GT["index.ts"]
subgraph GU["lib"]
GV["ApolloProviderBase.tsx"]
GW["createSilentRefreshAuthLink.ts"]
GX["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GY["error-boundary"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["error-boundary.tsx"]
H3["error-boundary.spec.tsx"]
end
end
H4["vite.config.ts"]
end
subgraph H5["glassmorphism-container"]
subgraph H6["src"]
H7["index.ts"]
subgraph H8["lib"]
H9["glassmorphism-container.tsx"]
HA["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HB["layout"]
subgraph HC["src"]
HD["index.ts"]
subgraph HE["lib"]
HF["Layout.tsx"]
end
end
end
subgraph HG["material-data-table"]
subgraph HH["src"]
HI["index.ts"]
subgraph HJ["lib"]
HK["material-data-table.tsx"]
HL["table-config.ts"]
HM["table-utils.ts"]
HN["material-data-table.spec.tsx"]
HO["table-types.ts"]
end
end
end
subgraph HP["order-status-chip"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["order-status-chip.tsx"]
HU["order-status-chip.spec.tsx"]
end
end
end
subgraph HV["password-field"]
subgraph HW["src"]
HX["index.ts"]
subgraph HY["lib"]
HZ["PasswordTextField.tsx"]
end
end
end
subgraph I0["price-display"]
subgraph I1["src"]
I2["index.ts"]
subgraph I3["lib"]
I4["price-display.tsx"]
I5["price-display.spec.tsx"]
end
end
end
subgraph I6["private-route"]
subgraph I7["src"]
I8["index.ts"]
subgraph I9["lib"]
IA["createPrivateRoute.tsx"]
IB["PrivateRoute.tsx"]
end
end
end
subgraph IC["rtl-table-utils"]
subgraph ID["src"]
IE["index.ts"]
subgraph IF["lib"]
IG["rtl-table-utils.ts"]
IH["rtl-cell-components.tsx"]
II["rtl-column-helpers.ts"]
IJ["rtl-table-props.ts"]
IK["use-table-alignment.ts"]
IL["rtl-table-utils.spec.tsx"]
IM["rtl-table-utils.tsx"]
end
end
end
subgraph IN["snackbar"]
subgraph IO["src"]
IP["index.ts"]
subgraph IQ["lib"]
IR["snackbar.tsx"]
IS["Snackbar.tsx"]
end
end
end
subgraph IT["styled-drawer"]
subgraph IU["src"]
IV["index.ts"]
subgraph IW["lib"]
IX["styled-drawer.tsx"]
IY["styled-drawer.spec.tsx"]
end
end
end
subgraph IZ["unauthorized"]
subgraph J0["src"]
J1["index.ts"]
subgraph J2["lib"]
J3["unauthorized-path.tsx"]
end
end
end
end
subgraph J4["graphql"]
subgraph J5["src"]
J6["index.ts"]
subgraph J7["lib"]
J8["currency.mutations.ts"]
J9["currency.queries.ts"]
JA["fragments.ts"]
JB["variant-colors.ts"]
JC["client-shared-graphql.tsx"]
end
end
end
subgraph JD["hooks"]
subgraph JE["brands"]
subgraph JF["src"]
JG["index.ts"]
subgraph JH["lib"]
JI["brands.graphql.ts"]
JJ["useBrands.ts"]
end
end
JK["vite.config.ts"]
end
subgraph JL["categories"]
subgraph JM["src"]
JN["index.ts"]
subgraph JO["lib"]
JP["useCategories.ts"]
JQ["categories.graphql.ts"]
end
end
end
subgraph JR["colors"]
subgraph JS["src"]
JT["index.ts"]
subgraph JU["lib"]
JV["useColors.ts"]
JW["color.graphql.ts"]
end
end
end
subgraph JX["currency"]
subgraph JY["src"]
JZ["index.ts"]
subgraph K0["lib"]
K1["useConvertPrice.tsx"]
K2["useExchangeRate.tsx"]
K3["useCurrencies.tsx"]
K4["useCurrencyForLocale.tsx"]
K5["useExchangeRate.spec.tsx"]
end
end
end
subgraph K6["products"]
subgraph K7["src"]
K8["index.ts"]
subgraph K9["lib"]
KA["productImage.ts"]
KB["products.graphql.ts"]
KC["useProducts.ts"]
KD["productImage.spec.ts"]
end
end
end
subgraph KE["site-languages"]
subgraph KF["src"]
KG["index.ts"]
subgraph KH["lib"]
KI["site-languages.graphql.ts"]
KJ["useSiteLanguages.ts"]
KK["site-languages-hook.spec.tsx"]
end
end
KL["vite.config.ts"]
end
subgraph KM["snackbar"]
subgraph KN["src"]
KO["index.ts"]
subgraph KP["lib"]
KQ["SnackbarContext.tsx"]
KR["useSnackbar.ts"]
end
end
end
subgraph KS["translations-management-hook"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["useTranslationsManagement.ts"]
end
end
end
end
subgraph KX["lottie"]
subgraph KY["empty-cart"]
subgraph KZ["src"]
L0["index.ts"]
subgraph L1["lib"]
L2["lottie-empty-cart.tsx"]
L3["lottie-empty-cart.spec.tsx"]
end
end
L4["vite.config.ts"]
end
subgraph L5["loading"]
subgraph L6["src"]
L7["index.ts"]
subgraph L8["lib"]
L9["lottie-loading.tsx"]
LA["lottie-loading.spec.tsx"]
end
end
end
subgraph LB["success-check"]
subgraph LC["src"]
LD["index.ts"]
subgraph LE["lib"]
LF["lottie-success-check.tsx"]
LG["lottie-success-check.spec.tsx"]
end
end
end
subgraph LH["unauthorized"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LM["translations"]
subgraph LN["src"]
LO["index.ts"]
subgraph LP["lib"]
LQ["mapApolloErrorToTranslationKey.ts"]
LR["WrapTranslation.tsx"]
end
end
end
subgraph LS["ui"]
subgraph LT["colors"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["colors.ts"]
end
end
end
subgraph LY["language-components"]
subgraph LZ["src"]
M0["index.ts"]
subgraph M1["lib"]
M2["language-components.tsx"]
M3["ltr-text-field.tsx"]
end
end
end
subgraph M4["sizes"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["sizes.ts"]
M9["sizes.spec.tsx"]
MA["sizes.tsx"]
end
end
end
end
subgraph MB["zustand"]
subgraph MC["shared-auth-store"]
subgraph MD["src"]
ME["index.ts"]
subgraph MF["lib"]
MG["shared-auth-store.ts"]
end
end
end
subgraph MH["shared-notification-store"]
subgraph MI["src"]
MJ["index.ts"]
subgraph MK["lib"]
ML["shared-notification-store.tsx"]
end
end
end
subgraph MM["shared-ui-store"]
subgraph MN["src"]
MO["index.ts"]
subgraph MP["lib"]
MQ["shared-ui-store.ts"]
MR["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MS["server"]
subgraph MT["controllers"]
subgraph MU["src"]
MV["index.ts"]
subgraph MW["lib"]
MX["auth.controller.ts"]
MY["order.controller.ts"]
end
end
end
subgraph MZ["decorators"]
N0["jest.config.ts"]
subgraph N1["src"]
N2["index.ts"]
subgraph N3["lib"]
N4["current-user.decorator.ts"]
N5["decorators.ts"]
N6["decorators.spec.ts"]
end
end
end
subgraph N7["entities"]
subgraph N8["src"]
N9["index.ts"]
subgraph NA["lib"]
NB["brand.entity.ts"]
NC["product.entity.ts"]
ND["category.entity.ts"]
NE["product-description.entity.ts"]
NF["site-language.entity.ts"]
NG["product-info.entity.ts"]
NH["color.entity.ts"]
NI["product-info-color.entity.ts"]
NJ["seller-info.entity.ts"]
NK["seller-product.entity.ts"]
NL["user.entity.ts"]
NM["cart.entity.ts"]
NN["currency-preference.entity.ts"]
NO["currency.entity.ts"]
NP["customer.entity.ts"]
NQ["exchange-rate.entity.ts"]
NR["order.entity.ts"]
NS["platform-settings.entity.ts"]
NT["refresh-token.entity.ts"]
NU["seller-order.entity.ts"]
NV["translation.entity.ts"]
end
end
end
subgraph NW["guards"]
NX["jest.config.ts"]
subgraph NY["src"]
NZ["index.ts"]
subgraph O0["lib"]
O1["catalog.guard.ts"]
O2["graphql-auth.guard.ts"]
O3["http-auth.guard.ts"]
O4["roles.guard.ts"]
O5["catalog.guard.spec.ts"]
O6["roles.guard.spec.ts"]
end
end
end
subgraph O7["inputs"]
subgraph O8["src"]
O9["index.ts"]
subgraph OA["lib"]
OB["brand.input.ts"]
OC["cart.inputs.ts"]
OD["category.input.ts"]
OE["color.input.ts"]
OF["customer-auth.inputs.ts"]
OG["order-pagination.inputs.ts"]
OH["order.inputs.ts"]
OI["product-info-filter.input.ts"]
OJ["product.input.ts"]
OK["seller-order-pagination.inputs.ts"]
OL["seller.input.ts"]
OM["site-language.input.ts"]
ON["user.input.ts"]
end
end
end
subgraph OO["modules"]
subgraph OP["src"]
OQ["index.ts"]
subgraph OR["lib"]
OS["auth.module.ts"]
OT["email.module.ts"]
OU["token.module.ts"]
OV["user.module.ts"]
OW["customer-profile.module.ts"]
OX["brand.module.ts"]
OY["catalog-guard.module.ts"]
OZ["translation.module.ts"]
P0["cart.module.ts"]
P1["platform-settings.module.ts"]
P2["category.module.ts"]
P3["product.module.ts"]
P4["color.module.ts"]
P5["currency.module.ts"]
P6["graphql-context.module.ts"]
P7["order.module.ts"]
P8["seller-info.module.ts"]
P9["payment.module.ts"]
PA["product-info.module.ts"]
PB["seller-products.module.ts"]
PC["site-language.module.ts"]
end
end
end
subgraph PD["resolvers"]
PE["jest.config.ts"]
subgraph PF["src"]
PG["index.ts"]
subgraph PH["lib"]
PI["auth.resolver.ts"]
PJ["brand.resolver.ts"]
PK["cart.resolver.ts"]
PL["category.resolver.ts"]
PM["color.resolver.ts"]
PN["currency.resolver.ts"]
PO["customer-profile.resolver.ts"]
PP["order.resolver.ts"]
PQ["payment.resolver.ts"]
PR["product-info.resolver.ts"]
PS["product.resolver.ts"]
PT["seller-info.resolver.ts"]
PU["shipping.resolver.ts"]
PV["site-language.resolver.ts"]
PW["translation.input.ts"]
PX["translation.resolver.ts"]
PY["user.resolver.ts"]
PZ["auth.resolver.spec.ts"]
Q0["order.resolver.spec.ts"]
Q1["payment.resolver.integration.spec.ts"]
Q2["payment.resolver.spec.ts"]
Q3["product-info.resolver.spec.ts"]
Q4["translation.resolver.guards.spec.ts"]
subgraph Q5["types"]
Q6["graphql-upload.d.ts"]
end
Q7["user.resolver.spec.ts"]
end
end
end
subgraph Q8["services"]
Q9["jest.config.ts"]
subgraph QA["src"]
QB["index.ts"]
subgraph QC["lib"]
QD["auth.service.ts"]
QE["brand.service.ts"]
QF["cart.service.ts"]
QG["product-info-colors.util.ts"]
QH["category.service.ts"]
QI["color.service.ts"]
QJ["currency.service.ts"]
QK["customer-profile.service.ts"]
QL["email.service.ts"]
QM["image-upload.service.ts"]
QN["order.service.ts"]
QO["payment-logger.service.ts"]
QP["payment.service.ts"]
QQ["product.service.ts"]
QR["seller-info.service.ts"]
QS["shipping-calculation.service.ts"]
QT["site-language.service.ts"]
QU["token.service.ts"]
QV["translation.service.ts"]
QW["user.service.ts"]
QX["auth.service.password-policy.spec.ts"]
QY["auth.service.spec.ts"]
QZ["cart.service.add-quantity.spec.ts"]
R0["cart.service.spec.ts"]
R1["order.service.spec.ts"]
R2["product-info-colors.util.spec.ts"]
R3["product.service.pants.spec.ts"]
R4["product.service.spec.ts"]
R5["relay-connection.spec.ts"]
R6["seller-info.service.price-validation.spec.ts"]
R7["shipping-calculation.service.spec.ts"]
R8["token.service.spec.ts"]
end
end
end
subgraph R9["strategies"]
subgraph RA["src"]
RB["index.ts"]
subgraph RC["lib"]
RD["local.strategy.ts"]
end
end
end
subgraph RE["utils"]
subgraph RF["src"]
RG["index.ts"]
subgraph RH["lib"]
RI["email-templates.ts"]
RJ["relay-connection.ts"]
RK["pagination.ts"]
end
end
end
end
subgraph RL["shared"]
subgraph RM["codegen"]
RN["jest.config.ts"]
subgraph RO["src"]
RP["index.ts"]
subgraph RQ["lib"]
subgraph RR["generated"]
RS["graphql.ts"]
end
end
end
end
subgraph RT["graphql-schema"]
RU["jest.config.ts"]
subgraph RV["src"]
RW["index.ts"]
end
end
subgraph RX["product-sizes"]
subgraph RY["src"]
RZ["index.ts"]
subgraph S0["lib"]
S1["product-sizes.ts"]
S2["product-sizes.pants-formats.spec.ts"]
S3["product-sizes.pants-label.spec.ts"]
S4["product-sizes.pants-strict.spec.ts"]
S5["product-sizes.spec.ts"]
end
end
end
subgraph S6["shared-i18n"]
subgraph S7["src"]
S8["index.ts"]
subgraph S9["lib"]
SA["language-context.tsx"]
SB["language-detector.ts"]
subgraph SC["locales"]
SD["i18n-react.tsx"]
SE["i18n-util.ts"]
SF["i18n-util.async.ts"]
subgraph SG["en"]
SH["index.ts"]
end
subgraph SJ["fa"]
SK["index.ts"]
end
SL["formatters.ts"]
SM["i18n-types.ts"]
SN["i18n-util.sync.ts"]
SO["navigator-detector.ts"]
end
SI["site-name.ts"]
SP["table-localization.ts"]
SQ["theme-provider.tsx"]
SR["use-page-title.ts"]
end
end
end
end
end
5-->6
7-->6
8-->6
9-->6
A-->4
A-->6
H-->J
K-->J
N-->P
Q-->P
T-->V
T-->W
V-->W
X-->V
10-->11
11-->13
14-->13
17-->19
17-->1A
17-->1B
17-->1C
17-->1F
1C-->1D
1D-->1E
1F-->19
1G-->1D
1G-->1C
1I-->1E
1J-->19
1K-->1A
1L-->1F
1R-->1T
1U-->1T
1V-->1T
1Y-->20
24-->26
24-->27
27-->26
28-->27
2C-->2E
2F-->2E
2I-->2K
2K-->2L
2M-->2K
2P-->2R
2S-->2R
2V-->2W
2W-->2Y
2Z-->2Y
33-->34
34-->36
37-->36
38-->36
3B-->3D
3E-->3D
3H-->3J
3K-->3J
3O-->3Q
3R-->3Q
3U-->3V
3V-->3X
3Y-->3X
3Z-->3X
43-->44
44-->46
46-->47
46-->49
47-->48
4A-->46
4B-->49
4G-->4H
4H-->4J
4K-->4J
4O-->4Q
4Q-->4R
4U-->4V
4V-->4X
4Y-->4X
52-->53
53-->55
56-->55
5B-->5D
5B-->5E
5D-->5E
5F-->5D
5I-->5K
5L-->5K
5O-->5Q
5O-->5R
5Q-->5R
5S-->5Q
5T-->5R
5W-->5Y
5Z-->5Y
60-->5Y
65-->67
68-->67
6B-->6D
6B-->6E
6B-->6F
6B-->6I
6F-->6G
6G-->6H
6N-->6P
6N-->6Q
6N-->6R
6N-->6S
6T-->6Q
6Y-->70
6Y-->71
6Y-->72
73-->71
74-->70
77-->79
7C-->7E
7H-->7J
7H-->7K
7J-->7K
7L-->7J
7M-->7K
7P-->7R
7S-->7R
7W-->7Y
7Z-->7Y
83-->85
88-->8A
8B-->8A
8F-->8H
8K-->8M
8N-->8M
8O-->8M
8R-->8T
8W-->8Y
8W-->8Z
8W-->90
8Y-->8Z
8Z-->90
91-->8Y
94-->96
99-->9B
9C-->9B
9F-->9H
9I-->9H
9J-->9H
9N-->9P
9Q-->9P
9R-->9P
9U-->9W
9X-->9W
A0-->A2
A3-->A2
A7-->A9
AA-->A9
AE-->AG
AE-->AP
AE-->AJ
AE-->AO
AG-->AI
AG-->AK
AG-->AL
AG-->AM
AG-->AN
AG-->AJ
AG-->AO
AI-->AJ
AP-->AJ
AQ-->AM
AQ-->AG
AQ-->AJ
AR-->AS
AR-->AM
AR-->AG
AR-->AP
AR-->AJ
AT-->AP
AU-->AJ
AW-->AJ
B0-->B2
B3-->B2
B6-->B8
B9-->B8
BD-->BF
BG-->BF
BK-->BM
BN-->BM
BO-->BM
BS-->BU
BV-->BU
BY-->C0
C1-->C0
C5-->C7
CB-->CD
CG-->CI
CJ-->CI
CJ-->CK
CO-->CQ
CR-->CQ
CV-->CX
CY-->CX
D2-->D4
D5-->D4
D7-->D9
DE-->DG
DH-->DG
DK-->DM
DP-->DR
DP-->DS
DR-->DS
DW-->DY
DZ-->DY
E2-->E4
E2-->E5
E2-->E6
E2-->E9
E6-->E7
E7-->E8
E9-->E4
E9-->EA
EH-->EJ
EJ-->EK
EN-->EP
ES-->EU
ES-->EV
EY-->F0
F3-->F5
F9-->FB
FC-->FB
FF-->FH
FK-->FM
FM-->FN
FO-->FN
FP-->FN
FQ-->FM
FT-->FV
FW-->FV
FX-->FV
G2-->G4
G5-->G4
G6-->G4
GA-->GC
GF-->GH
GL-->GN
GT-->GV
GT-->GW
GX-->GW
H0-->H2
H3-->H2
H7-->H9
HA-->H9
HD-->HF
HI-->HK
HI-->HL
HI-->HM
HK-->HL
HN-->HK
HR-->HT
HU-->HT
HX-->HZ
I2-->I4
I5-->I4
I8-->IA
IA-->IB
IE-->IG
IG-->IH
IG-->II
IG-->IJ
IG-->IK
II-->IH
II-->IJ
IL-->IM
IP-->IR
IV-->IX
IY-->IX
J1-->J3
J6-->J8
J6-->J9
J6-->JA
J6-->JB
JG-->JI
JG-->JJ
JJ-->JI
JN-->JP
JP-->JQ
JT-->JV
JV-->JW
JZ-->K1
JZ-->K3
JZ-->K4
JZ-->K2
K1-->K2
K5-->K2
K8-->KA
K8-->KB
K8-->KC
KC-->KB
KD-->KA
KG-->KI
KG-->KJ
KJ-->KI
KK-->KJ
KO-->KQ
KO-->KR
KR-->KQ
KU-->KW
L0-->L2
L3-->L2
L7-->L9
LA-->L9
LD-->LF
LG-->LF
LJ-->LL
LO-->LQ
LV-->LX
M0-->M2
M0-->M3
M6-->M8
M9-->MA
ME-->MG
MJ-->ML
MO-->MQ
MV-->MX
MV-->MY
N2-->N4
N2-->N5
N6-->N5
N9-->NB
N9-->NM
N9-->ND
N9-->NH
N9-->NN
N9-->NO
N9-->NP
N9-->NQ
N9-->NR
N9-->NS
N9-->NE
N9-->NI
N9-->NG
N9-->NC
N9-->NT
N9-->NJ
N9-->NU
N9-->NK
N9-->NF
N9-->NV
N9-->NL
NB-->NC
NC-->NB
NC-->ND
NC-->NE
NC-->NG
NC-->NJ
NC-->NK
ND-->NC
NE-->NC
NE-->NF
NF-->NE
NG-->NH
NG-->NI
NG-->NC
NI-->NH
NI-->NG
NJ-->NK
NJ-->NL
NK-->NG
NK-->NC
NK-->NJ
NM-->NC
NM-->NL
NN-->NO
NP-->NL
NQ-->NO
NQ-->NL
NR-->NC
NR-->NJ
NT-->NL
NU-->NR
NZ-->O1
NZ-->O2
NZ-->O3
NZ-->O4
O5-->O1
O6-->O4
O9-->OB
O9-->OC
O9-->OD
O9-->OE
O9-->OF
O9-->OG
O9-->OH
O9-->OI
O9-->OJ
O9-->OK
O9-->OL
O9-->OM
O9-->ON
OJ-->OI
OQ-->OS
OQ-->OX
OQ-->P0
OQ-->OY
OQ-->P2
OQ-->P4
OQ-->P5
OQ-->OW
OQ-->OT
OQ-->P6
OQ-->P7
OQ-->P9
OQ-->P1
OQ-->PA
OQ-->P3
OQ-->P8
OQ-->PB
OQ-->PC
OQ-->OU
OQ-->OZ
OQ-->OV
OS-->OT
OS-->OU
OS-->OV
OV-->OS
OV-->OW
OX-->OY
OX-->OZ
P0-->P1
P2-->OY
P2-->P3
P2-->OZ
P3-->OY
P3-->OU
P3-->OZ
P4-->OY
P4-->OZ
P6-->OT
P6-->OU
P6-->OV
P7-->P1
P7-->P8
P8-->P3
P8-->OU
P8-->OV
P9-->P7
PA-->P3
PA-->OZ
PB-->P8
PB-->OV
PG-->PI
PG-->PJ
PG-->PK
PG-->PL
PG-->PM
PG-->PN
PG-->PO
PG-->PP
PG-->PQ
PG-->PR
PG-->PS
PG-->PT
PG-->PU
PG-->PV
PG-->PW
PG-->PX
PG-->PY
PZ-->PI
Q0-->PP
Q1-->PQ
Q2-->PQ
Q3-->PR
Q4-->PX
Q7-->PY
QB-->QD
QB-->QE
QB-->QF
QB-->QH
QB-->QI
QB-->QJ
QB-->QK
QB-->QL
QB-->QM
QB-->QN
QB-->QO
QB-->QP
QB-->QG
QB-->QQ
QB-->QR
QB-->QS
QB-->QT
QB-->QU
QB-->QV
QB-->QW
QF-->QG
QQ-->QG
QR-->QG
QX-->QD
QX-->QL
QX-->QU
QX-->QW
QY-->QD
QY-->QL
QY-->QU
QY-->QW
QZ-->QF
R0-->QF
R1-->QN
R2-->QG
R3-->QQ
R3-->QV
R4-->QQ
R4-->QV
R6-->QD
R6-->QR
R7-->QS
R8-->QU
RB-->RD
RG-->RI
RG-->RJ
RP-->RS
RZ-->S1
S2-->S1
S3-->S1
S4-->S1
S5-->S1
S8-->SA
S8-->SB
S8-->SD
S8-->SM
S8-->SE
S8-->SF
S8-->SN
S8-->SO
S8-->SI
S8-->SP
S8-->SQ
S8-->SR
SA-->SB
SA-->SD
SA-->SF
SD-->SE
SF-->SH
SF-->SK
SF-->SL
SF-->SE
SH-->SI
SK-->SI
SN-->SH
SN-->SK
SN-->SL
SN-->SE
SP-->SD
SQ-->SA
SR-->SD
