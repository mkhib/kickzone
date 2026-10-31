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
end
end
end
subgraph 3V["product-editor"]
subgraph 3W["src"]
3X["index.spec.tsx"]
3Y["index.ts"]
subgraph 3Z["lib"]
40["AdminProductEditor.tsx"]
41["AdminProductEditor.pants-range.spec.tsx"]
42["AdminProductEditor.spec.tsx"]
end
43["vite-env.d.ts"]
end
end
subgraph 44["products"]
subgraph 45["src"]
46["index.spec.tsx"]
47["index.ts"]
subgraph 48["lib"]
49["AdminProducts.tsx"]
4A["adminProducts.hooks.ts"]
4B["adminProducts.graphql.ts"]
4C["ProductImageManagementModal.tsx"]
4D["AdminProducts.spec.tsx"]
4E["ProductImageManagementModal.pants-size.spec.tsx"]
4F["ProductImageManagementModal.spec.tsx"]
end
4G["vite-env.d.ts"]
end
end
subgraph 4H["seller-management"]
subgraph 4I["src"]
4J["index.spec.tsx"]
4K["index.ts"]
subgraph 4L["lib"]
4M["SellerManagement.tsx"]
4N["SellerManagement.spec.tsx"]
end
4O["vite-env.d.ts"]
end
end
subgraph 4P["translation-management"]
subgraph 4Q["src"]
4R["index.ts"]
subgraph 4S["lib"]
4T["AdminTranslationManagement.tsx"]
4U["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4V["unauthorized"]
subgraph 4W["src"]
4X["index.spec.tsx"]
4Y["index.ts"]
subgraph 4Z["lib"]
50["admins-unauthorized-screen.tsx"]
51["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 52["zustand"]
subgraph 53["admins-products-store"]
subgraph 54["src"]
55["index.spec.ts"]
56["index.ts"]
subgraph 57["lib"]
58["admins-products-store.ts"]
59["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 5A["customers"]
subgraph 5B["components"]
subgraph 5C["footer"]
subgraph 5D["src"]
5E["index.ts"]
subgraph 5F["lib"]
5G["customers-footer.tsx"]
5H["TrustBadgeIcons.tsx"]
5I["customers-footer.spec.tsx"]
end
end
end
subgraph 5J["headerbar"]
subgraph 5K["src"]
5L["index.ts"]
subgraph 5M["lib"]
5N["CustomersHeaderbar.tsx"]
5O["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5P["layout"]
subgraph 5Q["src"]
5R["index.ts"]
subgraph 5S["lib"]
5T["CustomersLayout.tsx"]
5U["CustomersTabbar.tsx"]
5V["CustomersLayout.spec.tsx"]
5W["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5X["product-card"]
subgraph 5Y["src"]
5Z["index.ts"]
subgraph 60["lib"]
61["CustomersProductCard.tsx"]
62["CustomersProductCard.pants-size.spec.tsx"]
63["CustomersProductCard.spec.tsx"]
end
64["vite-env.d.ts"]
end
end
end
subgraph 65["contexts"]
subgraph 66["auth"]
subgraph 67["src"]
68["index.ts"]
subgraph 69["lib"]
6A["CustomersAuthContext.tsx"]
6B["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6C["graphql"]
subgraph 6D["src"]
6E["index.ts"]
subgraph 6F["lib"]
6G["customer-profile.queries.ts"]
6H["mutations.ts"]
6I["Provider.tsx"]
6J["CustomersApolloProvider.tsx"]
6K["client.ts"]
6L["queries.ts"]
6M["apollo-upload-client.d.ts"]
end
end
end
subgraph 6N["hooks"]
subgraph 6O["auth"]
subgraph 6P["src"]
6Q["index.ts"]
subgraph 6R["lib"]
6S["useCustomersForgotPassword.tsx"]
6T["useCustomersLogin.tsx"]
6U["useCustomersRegister.tsx"]
6V["useCustomersResetPassword.tsx"]
6W["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6X["cart"]
6Y["jest.config.ts"]
6Z["jest.setup.ts"]
subgraph 70["src"]
71["index.ts"]
subgraph 72["lib"]
73["customers-cart-hook.tsx"]
74["useCartService.ts"]
75["useWishlistSync.ts"]
76["useCartService.spec.tsx"]
77["useCartSync.ts"]
end
end
end
subgraph 78["orders"]
subgraph 79["src"]
7A["index.ts"]
subgraph 7B["lib"]
7C["customers-orders-hook.tsx"]
end
end
end
subgraph 7D["products"]
subgraph 7E["src"]
7F["index.ts"]
subgraph 7G["lib"]
7H["customers-product-hook.tsx"]
end
end
end
end
subgraph 7I["router"]
subgraph 7J["src"]
7K["index.ts"]
subgraph 7L["lib"]
7M["CustomersRouter.tsx"]
7N["ScrollToTop.tsx"]
7O["CustomersRouter.spec.tsx"]
7P["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7Q["routes"]
subgraph 7R["src"]
7S["index.ts"]
subgraph 7T["lib"]
7U["customer-routes.ts"]
7V["customer-routes.spec.ts"]
end
end
end
subgraph 7W["screens"]
subgraph 7X["contact"]
subgraph 7Y["src"]
7Z["index.ts"]
subgraph 80["lib"]
81["customer-contact.tsx"]
82["customer-contact.spec.tsx"]
end
end
83["vite.config.ts"]
end
subgraph 84["customer-checkout"]
subgraph 85["src"]
86["index.ts"]
subgraph 87["lib"]
88["customer-checkout.tsx"]
end
end
end
subgraph 89["customer-favorites"]
subgraph 8A["src"]
8B["index.ts"]
subgraph 8C["lib"]
8D["customer-favorites.tsx"]
8E["customer-favorites.spec.tsx"]
end
end
8F["vite.config.ts"]
end
subgraph 8G["customer-login"]
subgraph 8H["src"]
8I["index.ts"]
subgraph 8J["lib"]
8K["customer-login.tsx"]
end
end
end
subgraph 8L["customer-order-confirmation"]
subgraph 8M["src"]
8N["index.ts"]
subgraph 8O["lib"]
8P["customer-order-confirmation.tsx"]
8Q["customer-order-confirmation.pants-size.spec.tsx"]
8R["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8S["customer-orders"]
subgraph 8T["src"]
8U["index.ts"]
subgraph 8V["lib"]
8W["customer-orders.tsx"]
end
end
end
subgraph 8X["customer-payment"]
subgraph 8Y["src"]
8Z["index.ts"]
subgraph 90["lib"]
91["customer-payment-callback.tsx"]
92["use-zarinpal-payment.tsx"]
93["zarinpal-payment-service.ts"]
94["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 95["customer-products"]
subgraph 96["src"]
97["index.ts"]
subgraph 98["lib"]
99["customer-products.tsx"]
end
end
end
subgraph 9A["customer-profile"]
subgraph 9B["src"]
9C["index.ts"]
subgraph 9D["lib"]
9E["customer-profile.tsx"]
9F["customer-profile.spec.tsx"]
end
end
end
subgraph 9G["customer-shopping-cart"]
subgraph 9H["src"]
9I["index.ts"]
subgraph 9J["lib"]
9K["customer-shopping-cart.tsx"]
9L["customer-shopping-cart.pants-size.spec.tsx"]
9M["customer-shopping-cart.spec.tsx"]
end
end
9N["vite.config.ts"]
end
subgraph 9O["customer-signup"]
subgraph 9P["src"]
9Q["index.ts"]
subgraph 9R["lib"]
9S["customer-signup.tsx"]
9T["customer-signup.password-length.spec.tsx"]
9U["customer-signup.spec.tsx"]
end
end
end
subgraph 9V["forgot-password"]
subgraph 9W["src"]
9X["index.ts"]
subgraph 9Y["lib"]
9Z["customer-forgot-password.tsx"]
A0["customer-forgot-password.spec.tsx"]
end
end
end
subgraph A1["guide-authenticity"]
subgraph A2["src"]
A3["index.ts"]
subgraph A4["lib"]
A5["customer-guide-authenticity.tsx"]
A6["customer-guide-authenticity.spec.tsx"]
end
end
A7["vite.config.ts"]
end
subgraph A8["guide-payment"]
subgraph A9["src"]
AA["index.ts"]
subgraph AB["lib"]
AC["customer-guide-payment.tsx"]
AD["customer-guide-payment.spec.tsx"]
end
end
AE["vite.config.ts"]
end
subgraph AF["home"]
subgraph AG["src"]
AH["index.ts"]
subgraph AI["lib"]
AJ["CustomersHomeScreen.tsx"]
subgraph AK["components"]
AL["CategoryBentoSection.tsx"]
AN["HeroSection.tsx"]
AO["HomeLoadingScreen.tsx"]
AP["PicksRailSection.tsx"]
AQ["TrustStripSection.tsx"]
AV["NewArrivalsSection.tsx"]
AX["BrandBlocksSection.tsx"]
AY["NewsletterSection.tsx"]
AZ["ShopTheLookSection.tsx"]
B0["TickerSection.tsx"]
end
AM["home-selectors.ts"]
AR["useScrollProgress.ts"]
AS["CustomersShopScreen.tsx"]
AT["CustomersHomeScreen.cart-size.spec.tsx"]
AU["CustomersHomeScreen.spec.tsx"]
AW["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph B1["login"]
subgraph B2["src"]
B3["index.ts"]
subgraph B4["lib"]
B5["CustomersLoginScreen.tsx"]
B6["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph B7["not-found"]
subgraph B8["src"]
B9["index.ts"]
subgraph BA["lib"]
BB["customer-not-found.tsx"]
BC["customer-not-found.spec.tsx"]
end
end
BD["vite.config.ts"]
end
subgraph BE["privacy-policy"]
subgraph BF["src"]
BG["index.ts"]
subgraph BH["lib"]
BI["customer-privacy-policy.tsx"]
BJ["customer-privacy-policy.spec.tsx"]
end
end
BK["vite.config.ts"]
end
subgraph BL["product-details"]
subgraph BM["src"]
BN["index.ts"]
subgraph BO["lib"]
BP["customer-product-details.tsx"]
BQ["customer-product-details.pants-size.spec.tsx"]
BR["customer-product-details.spec.tsx"]
end
end
BS["vite.config.ts"]
end
subgraph BT["reset-password"]
subgraph BU["src"]
BV["index.ts"]
subgraph BW["lib"]
BX["customer-reset-password.tsx"]
BY["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph BZ["shipping-returns"]
subgraph C0["src"]
C1["index.ts"]
subgraph C2["lib"]
C3["customer-shipping-returns.tsx"]
C4["customer-shipping-returns.spec.tsx"]
end
end
C5["vite.config.ts"]
end
subgraph C6["unauthorized"]
subgraph C7["src"]
C8["index.ts"]
subgraph C9["lib"]
CA["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CB["utility"]
subgraph CC["test"]
subgraph CD["src"]
CE["index.ts"]
subgraph CF["lib"]
CG["customers-test-utility.tsx"]
end
end
end
end
subgraph CH["validations"]
subgraph CI["src"]
CJ["index.ts"]
subgraph CK["lib"]
CL["shipping-validation.ts"]
CM["shipping-validation.spec.tsx"]
CN["shipping-validation.tsx"]
end
end
end
subgraph CO["zustand"]
subgraph CP["customer-cart-store"]
subgraph CQ["src"]
CR["index.ts"]
subgraph CS["lib"]
CT["customer-cart-store.ts"]
CU["customer-cart-store.spec.ts"]
CV["customer-cart-store.tsx"]
end
end
end
subgraph CW["customer-checkout-store"]
subgraph CX["src"]
CY["index.ts"]
subgraph CZ["lib"]
D0["customer-checkout-store.ts"]
D1["customer-checkout-store.spec.ts"]
end
end
D2["vite.config.ts"]
end
subgraph D3["customer-wishlist-store"]
subgraph D4["src"]
D5["index.ts"]
subgraph D6["lib"]
D7["customer-wishlist-store.ts"]
D8["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D9["src"]
DA["index.ts"]
subgraph DB["lib"]
DC["customers-products-store.tsx"]
end
end
end
end
subgraph DD["sellers"]
subgraph DE["components"]
subgraph DF["footer"]
subgraph DG["src"]
DH["index.ts"]
subgraph DI["lib"]
DJ["sellers-footer.tsx"]
DK["sellers-footer.spec.tsx"]
end
end
end
subgraph DL["headerbar"]
subgraph DM["src"]
DN["index.ts"]
subgraph DO["lib"]
DP["SellersHeaderbar.tsx"]
end
end
end
subgraph DQ["layout"]
subgraph DR["src"]
DS["index.ts"]
subgraph DT["lib"]
DU["SellersLayout.tsx"]
DV["SellersTabbar.tsx"]
end
end
end
end
subgraph DW["contexts"]
subgraph DX["auth"]
subgraph DY["src"]
DZ["index.ts"]
subgraph E0["lib"]
E1["SellersAuthContext.tsx"]
E2["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E3["graphql"]
subgraph E4["src"]
E5["index.ts"]
subgraph E6["lib"]
E7["fragments.ts"]
E8["mutations.ts"]
E9["Provider.tsx"]
EA["SellersApolloProvider.tsx"]
EB["client.ts"]
EC["queries.ts"]
ED["seller-orders.graphql.ts"]
EE["apollo-upload-client.d.ts"]
end
subgraph EF["types"]
EG["apollo-upload-client.d.ts"]
end
end
end
subgraph EH["hooks"]
subgraph EI["auth"]
subgraph EJ["src"]
EK["index.ts"]
subgraph EL["lib"]
EM["useSellerAuth.ts"]
EN["sellerAuth.graphql.ts"]
end
end
end
subgraph EO["orders"]
subgraph EP["src"]
EQ["index.ts"]
subgraph ER["lib"]
ES["useSellerOrders.ts"]
ET["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph EU["products"]
subgraph EV["src"]
EW["index.ts"]
subgraph EX["lib"]
EY["useSellersProductManagement.ts"]
EZ["useSellersProducts.ts"]
end
end
end
end
subgraph F0["router"]
subgraph F1["src"]
F2["index.ts"]
subgraph F3["lib"]
F4["SellersRouter.tsx"]
end
end
end
subgraph F5["routes"]
subgraph F6["src"]
F7["index.ts"]
subgraph F8["lib"]
F9["seller-routes.ts"]
end
end
end
subgraph FA["screens"]
subgraph FB["catalog"]
subgraph FC["src"]
FD["index.ts"]
subgraph FE["lib"]
FF["SellersCatalogScreens.tsx"]
FG["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FH["login"]
subgraph FI["src"]
FJ["index.ts"]
subgraph FK["lib"]
FL["SellersLogin.tsx"]
end
end
end
subgraph FM["manage-product"]
subgraph FN["src"]
FO["index.ts"]
subgraph FP["lib"]
FQ["SellersManageProductScreen.tsx"]
FR["SellersDefineProductFlow.tsx"]
FS["SellersDefineProductFlow.pants-label.spec.tsx"]
FT["SellersDefineProductFlow.spec.tsx"]
FU["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FV["products"]
subgraph FW["src"]
FX["index.ts"]
subgraph FY["lib"]
FZ["SellersProducts.tsx"]
G0["SellersProducts.pants-label.spec.tsx"]
G1["SellersProducts.spec.tsx"]
end
end
end
subgraph G2["seller-orders"]
G3["jest.config.ts"]
G4["jest.setup.ts"]
subgraph G5["src"]
G6["index.ts"]
subgraph G7["lib"]
G8["seller-orders-screen.tsx"]
G9["seller-status-transitions.ts"]
GA["seller-orders-screen.pants-size.spec.tsx"]
GB["seller-orders-screen.spec.tsx"]
GC["seller-status-transitions.spec.ts"]
end
GD["test-setup.ts"]
end
end
subgraph GE["setup-password"]
subgraph GF["src"]
GG["index.ts"]
subgraph GH["lib"]
GI["SellersSetupPassword.tsx"]
end
end
end
subgraph GJ["unauthorized"]
subgraph GK["src"]
GL["index.ts"]
subgraph GM["lib"]
GN["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GO["zustand"]
subgraph GP["sellers-products-store"]
subgraph GQ["src"]
GR["index.ts"]
subgraph GS["lib"]
GT["useSellersProductsStore.ts"]
GU["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GV["shared"]
subgraph GW["components"]
subgraph GX["apollo-provider-base"]
subgraph GY["src"]
GZ["index.ts"]
subgraph H0["lib"]
H1["ApolloProviderBase.tsx"]
H2["createSilentRefreshAuthLink.ts"]
H3["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph H4["error-boundary"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["error-boundary.tsx"]
H9["error-boundary.spec.tsx"]
end
end
HA["vite.config.ts"]
end
subgraph HB["glassmorphism-container"]
subgraph HC["src"]
HD["index.ts"]
subgraph HE["lib"]
HF["glassmorphism-container.tsx"]
HG["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HH["layout"]
subgraph HI["src"]
HJ["index.ts"]
subgraph HK["lib"]
HL["Layout.tsx"]
end
end
end
subgraph HM["material-data-table"]
subgraph HN["src"]
HO["index.ts"]
subgraph HP["lib"]
HQ["material-data-table.tsx"]
HR["table-config.ts"]
HS["table-utils.ts"]
HT["material-data-table.spec.tsx"]
HU["table-types.ts"]
end
end
end
subgraph HV["order-status-chip"]
subgraph HW["src"]
HX["index.ts"]
subgraph HY["lib"]
HZ["order-status-chip.tsx"]
I0["order-status-chip.spec.tsx"]
end
end
end
subgraph I1["password-field"]
subgraph I2["src"]
I3["index.ts"]
subgraph I4["lib"]
I5["PasswordTextField.tsx"]
end
end
end
subgraph I6["price-display"]
subgraph I7["src"]
I8["index.ts"]
subgraph I9["lib"]
IA["price-display.tsx"]
IB["price-display.spec.tsx"]
end
end
end
subgraph IC["private-route"]
subgraph ID["src"]
IE["index.ts"]
subgraph IF["lib"]
IG["createPrivateRoute.tsx"]
IH["PrivateRoute.tsx"]
end
end
end
subgraph II["rtl-table-utils"]
subgraph IJ["src"]
IK["index.ts"]
subgraph IL["lib"]
IM["rtl-table-utils.ts"]
IN["rtl-cell-components.tsx"]
IO["rtl-column-helpers.ts"]
IP["rtl-table-props.ts"]
IQ["use-table-alignment.ts"]
IR["rtl-table-utils.spec.tsx"]
IS["rtl-table-utils.tsx"]
end
end
end
subgraph IT["snackbar"]
subgraph IU["src"]
IV["index.ts"]
subgraph IW["lib"]
IX["snackbar.tsx"]
end
end
end
subgraph IY["styled-drawer"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["styled-drawer.tsx"]
J3["styled-drawer.spec.tsx"]
end
end
end
subgraph J4["unauthorized"]
subgraph J5["src"]
J6["index.ts"]
subgraph J7["lib"]
J8["unauthorized-path.tsx"]
end
end
end
end
subgraph J9["graphql"]
subgraph JA["src"]
JB["index.ts"]
subgraph JC["lib"]
JD["currency.mutations.ts"]
JE["currency.queries.ts"]
JF["fragments.ts"]
JG["variant-colors.ts"]
JH["client-shared-graphql.tsx"]
end
end
end
subgraph JI["hooks"]
subgraph JJ["brands"]
subgraph JK["src"]
JL["index.ts"]
subgraph JM["lib"]
JN["brands.graphql.ts"]
JO["useBrands.ts"]
end
end
JP["vite.config.ts"]
end
subgraph JQ["categories"]
subgraph JR["src"]
JS["index.ts"]
subgraph JT["lib"]
JU["useCategories.ts"]
JV["categories.graphql.ts"]
end
end
end
subgraph JW["colors"]
subgraph JX["src"]
JY["index.ts"]
subgraph JZ["lib"]
K0["useColors.ts"]
K1["color.graphql.ts"]
end
end
end
subgraph K2["currency"]
subgraph K3["src"]
K4["index.ts"]
subgraph K5["lib"]
K6["useConvertPrice.tsx"]
K7["useExchangeRate.tsx"]
K8["useCurrencies.tsx"]
K9["useCurrencyForLocale.tsx"]
KA["useExchangeRate.spec.tsx"]
end
end
end
subgraph KB["products"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["productImage.ts"]
KG["products.graphql.ts"]
KH["useProducts.ts"]
KI["productImage.spec.ts"]
end
end
end
subgraph KJ["site-languages"]
subgraph KK["src"]
KL["index.ts"]
subgraph KM["lib"]
KN["site-languages.graphql.ts"]
KO["useSiteLanguages.ts"]
KP["site-languages-hook.spec.tsx"]
end
end
KQ["vite.config.ts"]
end
subgraph KR["snackbar"]
subgraph KS["src"]
KT["index.ts"]
subgraph KU["lib"]
KV["SnackbarContext.tsx"]
KW["useSnackbar.ts"]
end
end
end
subgraph KX["translations-management-hook"]
subgraph KY["src"]
KZ["index.ts"]
subgraph L0["lib"]
L1["useTranslationsManagement.ts"]
end
end
end
end
subgraph L2["lottie"]
subgraph L3["empty-cart"]
subgraph L4["src"]
L5["index.ts"]
subgraph L6["lib"]
L7["lottie-empty-cart.tsx"]
L8["lottie-empty-cart.spec.tsx"]
end
end
L9["vite.config.ts"]
end
subgraph LA["loading"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["lottie-loading.tsx"]
LF["lottie-loading.spec.tsx"]
end
end
end
subgraph LG["success-check"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["lottie-success-check.tsx"]
LL["lottie-success-check.spec.tsx"]
end
end
end
subgraph LM["unauthorized"]
subgraph LN["src"]
LO["index.ts"]
subgraph LP["lib"]
LQ["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LR["translations"]
subgraph LS["src"]
LT["index.ts"]
subgraph LU["lib"]
LV["mapApolloErrorToTranslationKey.ts"]
LW["WrapTranslation.tsx"]
end
end
end
subgraph LX["ui"]
subgraph LY["colors"]
subgraph LZ["src"]
M0["index.ts"]
subgraph M1["lib"]
M2["colors.ts"]
end
end
end
subgraph M3["language-components"]
subgraph M4["src"]
M5["index.ts"]
subgraph M6["lib"]
M7["language-components.tsx"]
M8["ltr-text-field.tsx"]
end
end
end
subgraph M9["sizes"]
subgraph MA["src"]
MB["index.ts"]
subgraph MC["lib"]
MD["sizes.ts"]
ME["sizes.spec.tsx"]
MF["sizes.tsx"]
end
end
end
end
subgraph MG["zustand"]
subgraph MH["shared-auth-store"]
subgraph MI["src"]
MJ["index.ts"]
subgraph MK["lib"]
ML["shared-auth-store.ts"]
end
end
end
subgraph MM["shared-notification-store"]
subgraph MN["src"]
MO["index.ts"]
subgraph MP["lib"]
MQ["shared-notification-store.tsx"]
end
end
end
subgraph MR["shared-ui-store"]
subgraph MS["src"]
MT["index.ts"]
subgraph MU["lib"]
MV["shared-ui-store.ts"]
MW["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MX["server"]
subgraph MY["controllers"]
subgraph MZ["src"]
N0["index.ts"]
subgraph N1["lib"]
N2["auth.controller.ts"]
N3["order.controller.ts"]
end
end
end
subgraph N4["decorators"]
N5["jest.config.ts"]
subgraph N6["src"]
N7["index.ts"]
subgraph N8["lib"]
N9["current-user.decorator.ts"]
NA["decorators.ts"]
NB["decorators.spec.ts"]
end
end
end
subgraph NC["entities"]
subgraph ND["src"]
NE["index.ts"]
subgraph NF["lib"]
NG["brand.entity.ts"]
NH["product.entity.ts"]
NI["category.entity.ts"]
NJ["product-description.entity.ts"]
NK["site-language.entity.ts"]
NL["product-info.entity.ts"]
NM["color.entity.ts"]
NN["product-info-color.entity.ts"]
NO["seller-info.entity.ts"]
NP["seller-product.entity.ts"]
NQ["user.entity.ts"]
NR["cart.entity.ts"]
NS["currency-preference.entity.ts"]
NT["currency.entity.ts"]
NU["customer.entity.ts"]
NV["exchange-rate.entity.ts"]
NW["order.entity.ts"]
NX["platform-settings.entity.ts"]
NY["refresh-token.entity.ts"]
NZ["seller-order.entity.ts"]
O0["translation.entity.ts"]
end
end
end
subgraph O1["guards"]
O2["jest.config.ts"]
subgraph O3["src"]
O4["index.ts"]
subgraph O5["lib"]
O6["catalog.guard.ts"]
O7["graphql-auth.guard.ts"]
O8["http-auth.guard.ts"]
O9["roles.guard.ts"]
OA["catalog.guard.spec.ts"]
OB["roles.guard.spec.ts"]
end
end
end
subgraph OC["inputs"]
subgraph OD["src"]
OE["index.ts"]
subgraph OF["lib"]
OG["brand.input.ts"]
OH["cart.inputs.ts"]
OI["category.input.ts"]
OJ["color.input.ts"]
OK["customer-auth.inputs.ts"]
OL["order-pagination.inputs.ts"]
OM["order.inputs.ts"]
ON["product-info-filter.input.ts"]
OO["product.input.ts"]
OP["seller-order-pagination.inputs.ts"]
OQ["seller.input.ts"]
OR["site-language.input.ts"]
OS["user.input.ts"]
end
end
end
subgraph OT["modules"]
subgraph OU["src"]
OV["index.ts"]
subgraph OW["lib"]
OX["auth.module.ts"]
OY["email.module.ts"]
OZ["token.module.ts"]
P0["user.module.ts"]
P1["customer-profile.module.ts"]
P2["brand.module.ts"]
P3["catalog-guard.module.ts"]
P4["translation.module.ts"]
P5["cart.module.ts"]
P6["platform-settings.module.ts"]
P7["category.module.ts"]
P8["product.module.ts"]
P9["color.module.ts"]
PA["currency.module.ts"]
PB["graphql-context.module.ts"]
PC["order.module.ts"]
PD["seller-info.module.ts"]
PE["payment.module.ts"]
PF["product-info.module.ts"]
PG["seller-products.module.ts"]
PH["site-language.module.ts"]
end
end
end
subgraph PI["resolvers"]
PJ["jest.config.ts"]
subgraph PK["src"]
PL["index.ts"]
subgraph PM["lib"]
PN["auth.resolver.ts"]
PO["zod-validation.pipe.ts"]
PP["brand.resolver.ts"]
PQ["cart.resolver.ts"]
PR["category.resolver.ts"]
PS["color.resolver.ts"]
PT["currency.resolver.ts"]
PU["customer-profile.resolver.ts"]
PV["order.resolver.ts"]
PW["payment.resolver.ts"]
PX["product-info.resolver.ts"]
PY["product.resolver.ts"]
PZ["seller-info.resolver.ts"]
Q0["shipping.resolver.ts"]
Q1["site-language.resolver.ts"]
Q2["translation.input.ts"]
Q3["translation.resolver.ts"]
Q4["user.resolver.ts"]
Q5["auth-validation.spec.ts"]
Q6["auth.resolver.spec.ts"]
Q7["order.resolver.spec.ts"]
Q8["order.resolver.status-transitions.spec.ts"]
Q9["order.resolver.tracking.spec.ts"]
QA["payment.resolver.integration.spec.ts"]
QB["payment.resolver.spec.ts"]
QC["product-info.resolver.spec.ts"]
QD["translation.resolver.guards.spec.ts"]
subgraph QE["types"]
QF["graphql-upload.d.ts"]
end
QG["user.resolver.spec.ts"]
QH["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QI["services"]
QJ["jest.config.ts"]
subgraph QK["src"]
QL["index.ts"]
subgraph QM["lib"]
QN["auth.service.ts"]
QO["brand.service.ts"]
QP["cart.service.ts"]
QQ["product-info-colors.util.ts"]
QR["category.service.ts"]
QS["color.service.ts"]
QT["currency.service.ts"]
QU["customer-profile.service.ts"]
QV["email.service.ts"]
QW["image-upload.service.ts"]
QX["order.service.ts"]
QY["payment-logger.service.ts"]
QZ["payment.service.ts"]
R0["product.service.ts"]
R1["seller-info.service.ts"]
R2["shipping-calculation.service.ts"]
R3["site-language.service.ts"]
R4["token.service.ts"]
R5["translation.service.ts"]
R6["user.service.ts"]
R7["auth.service.password-policy.spec.ts"]
R8["auth.service.spec.ts"]
R9["cart.service.add-quantity.spec.ts"]
RA["cart.service.null-relations.spec.ts"]
RB["cart.service.spec.ts"]
RC["order.service.spec.ts"]
RD["order.service.tracking.spec.ts"]
RE["product-info-colors.util.spec.ts"]
RF["product.service.pants.spec.ts"]
RG["product.service.spec.ts"]
RH["relay-connection.spec.ts"]
RI["seller-info.service.price-validation.spec.ts"]
RJ["shipping-calculation.service.spec.ts"]
RK["token.service.spec.ts"]
end
end
end
subgraph RL["strategies"]
subgraph RM["src"]
RN["index.ts"]
subgraph RO["lib"]
RP["local.strategy.ts"]
end
end
end
subgraph RQ["utils"]
subgraph RR["src"]
RS["index.ts"]
subgraph RT["lib"]
RU["email-templates.ts"]
RV["relay-connection.ts"]
RW["pagination.ts"]
end
end
end
end
subgraph RX["shared"]
subgraph RY["codegen"]
RZ["jest.config.ts"]
subgraph S0["src"]
S1["index.ts"]
subgraph S2["lib"]
subgraph S3["generated"]
S4["graphql.ts"]
end
end
end
end
subgraph S5["graphql-schema"]
S6["jest.config.ts"]
subgraph S7["src"]
S8["index.ts"]
end
end
subgraph S9["product-sizes"]
subgraph SA["src"]
SB["index.ts"]
subgraph SC["lib"]
SD["product-sizes.ts"]
SE["product-sizes.pants-formats.spec.ts"]
SF["product-sizes.pants-label.spec.ts"]
SG["product-sizes.pants-strict.spec.ts"]
SH["product-sizes.spec.ts"]
end
end
end
subgraph SI["shared-i18n"]
subgraph SJ["src"]
SK["index.ts"]
subgraph SL["lib"]
SM["language-context.tsx"]
SN["language-detector.ts"]
subgraph SO["locales"]
SP["i18n-react.tsx"]
SQ["i18n-util.ts"]
SR["i18n-util.async.ts"]
subgraph SS["en"]
ST["index.ts"]
end
subgraph SV["fa"]
SW["index.ts"]
end
SX["formatters.ts"]
SY["i18n-types.ts"]
SZ["i18n-util.sync.ts"]
T0["navigator-detector.ts"]
end
SU["site-name.ts"]
T1["table-localization.ts"]
T2["theme-provider.tsx"]
T3["use-page-title.ts"]
end
end
end
subgraph T4["validation"]
subgraph T5["src"]
T6["index.ts"]
subgraph T7["lib"]
T8["auth.ts"]
T9["limits.ts"]
TA["primitives.ts"]
TB["errors.ts"]
TC["auth.spec.ts"]
TD["errors.spec.ts"]
TE["primitives.spec.ts"]
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
3X-->3Y
3Y-->40
41-->40
42-->40
46-->47
47-->49
49-->4A
49-->4C
4A-->4B
4D-->49
4E-->4C
4J-->4K
4K-->4M
4N-->4M
4R-->4T
4T-->4U
4X-->4Y
4Y-->50
51-->50
55-->56
56-->58
59-->58
5E-->5G
5E-->5H
5G-->5H
5I-->5G
5L-->5N
5O-->5N
5R-->5T
5R-->5U
5T-->5U
5V-->5T
5W-->5U
5Z-->61
62-->61
63-->61
68-->6A
6B-->6A
6E-->6G
6E-->6H
6E-->6I
6E-->6L
6I-->6J
6J-->6K
6Q-->6S
6Q-->6T
6Q-->6U
6Q-->6V
6W-->6T
71-->73
71-->74
71-->75
76-->74
77-->73
7A-->7C
7F-->7H
7K-->7M
7K-->7N
7M-->7N
7O-->7M
7P-->7N
7S-->7U
7V-->7U
7Z-->81
82-->81
86-->88
8B-->8D
8E-->8D
8I-->8K
8N-->8P
8Q-->8P
8R-->8P
8U-->8W
8Z-->91
8Z-->92
8Z-->93
91-->92
92-->93
94-->91
97-->99
9C-->9E
9F-->9E
9I-->9K
9L-->9K
9M-->9K
9Q-->9S
9T-->9S
9U-->9S
9X-->9Z
A0-->9Z
A3-->A5
A6-->A5
AA-->AC
AD-->AC
AH-->AJ
AH-->AS
AH-->AM
AH-->AR
AJ-->AL
AJ-->AN
AJ-->AO
AJ-->AP
AJ-->AQ
AJ-->AM
AJ-->AR
AL-->AM
AS-->AM
AT-->AP
AT-->AJ
AT-->AM
AU-->AV
AU-->AP
AU-->AJ
AU-->AS
AU-->AM
AW-->AS
AX-->AM
AZ-->AM
B3-->B5
B6-->B5
B9-->BB
BC-->BB
BG-->BI
BJ-->BI
BN-->BP
BQ-->BP
BR-->BP
BV-->BX
BY-->BX
C1-->C3
C4-->C3
C8-->CA
CE-->CG
CJ-->CL
CM-->CL
CM-->CN
CR-->CT
CU-->CT
CY-->D0
D1-->D0
D5-->D7
D8-->D7
DA-->DC
DH-->DJ
DK-->DJ
DN-->DP
DS-->DU
DS-->DV
DU-->DV
DZ-->E1
E2-->E1
E5-->E7
E5-->E8
E5-->E9
E5-->EC
E9-->EA
EA-->EB
EC-->E7
EC-->ED
EK-->EM
EM-->EN
EQ-->ES
EW-->EY
EW-->EZ
F2-->F4
F7-->F9
FD-->FF
FG-->FF
FJ-->FL
FO-->FQ
FQ-->FR
FS-->FR
FT-->FR
FU-->FQ
FX-->FZ
G0-->FZ
G1-->FZ
G6-->G8
G8-->G9
GA-->G8
GB-->G8
GC-->G9
GG-->GI
GL-->GN
GR-->GT
GZ-->H1
GZ-->H2
H3-->H2
H6-->H8
H9-->H8
HD-->HF
HG-->HF
HJ-->HL
HO-->HQ
HO-->HR
HO-->HS
HQ-->HR
HT-->HQ
HX-->HZ
I0-->HZ
I3-->I5
I8-->IA
IB-->IA
IE-->IG
IG-->IH
IK-->IM
IM-->IN
IM-->IO
IM-->IP
IM-->IQ
IO-->IN
IO-->IP
IR-->IS
IV-->IX
J0-->J2
J3-->J2
J6-->J8
JB-->JD
JB-->JE
JB-->JF
JB-->JG
JL-->JN
JL-->JO
JO-->JN
JS-->JU
JU-->JV
JY-->K0
K0-->K1
K4-->K6
K4-->K8
K4-->K9
K4-->K7
K6-->K7
KA-->K7
KD-->KF
KD-->KG
KD-->KH
KH-->KG
KI-->KF
KL-->KN
KL-->KO
KO-->KN
KP-->KO
KT-->KV
KT-->KW
KW-->KV
KZ-->L1
L5-->L7
L8-->L7
LC-->LE
LF-->LE
LI-->LK
LL-->LK
LO-->LQ
LT-->LV
M0-->M2
M5-->M7
M5-->M8
MB-->MD
ME-->MF
MJ-->ML
MO-->MQ
MT-->MV
N0-->N2
N0-->N3
N7-->N9
N7-->NA
NB-->NA
NE-->NG
NE-->NR
NE-->NI
NE-->NM
NE-->NS
NE-->NT
NE-->NU
NE-->NV
NE-->NW
NE-->NX
NE-->NJ
NE-->NN
NE-->NL
NE-->NH
NE-->NY
NE-->NO
NE-->NZ
NE-->NP
NE-->NK
NE-->O0
NE-->NQ
NG-->NH
NH-->NG
NH-->NI
NH-->NJ
NH-->NL
NH-->NO
NH-->NP
NI-->NH
NJ-->NH
NJ-->NK
NK-->NJ
NL-->NM
NL-->NN
NL-->NH
NN-->NM
NN-->NL
NO-->NP
NO-->NQ
NP-->NL
NP-->NH
NP-->NO
NR-->NH
NR-->NQ
NS-->NT
NU-->NQ
NV-->NT
NV-->NQ
NW-->NH
NW-->NO
NY-->NQ
NZ-->NW
O4-->O6
O4-->O7
O4-->O8
O4-->O9
OA-->O6
OB-->O9
OE-->OG
OE-->OH
OE-->OI
OE-->OJ
OE-->OK
OE-->OL
OE-->OM
OE-->ON
OE-->OO
OE-->OP
OE-->OQ
OE-->OR
OE-->OS
OO-->ON
OV-->OX
OV-->P2
OV-->P5
OV-->P3
OV-->P7
OV-->P9
OV-->PA
OV-->P1
OV-->OY
OV-->PB
OV-->PC
OV-->PE
OV-->P6
OV-->PF
OV-->P8
OV-->PD
OV-->PG
OV-->PH
OV-->OZ
OV-->P4
OV-->P0
OX-->OY
OX-->OZ
OX-->P0
P0-->OX
P0-->P1
P2-->P3
P2-->P4
P5-->P6
P7-->P3
P7-->P8
P7-->P4
P8-->P3
P8-->OZ
P8-->P4
P9-->P3
P9-->P4
PB-->OY
PB-->OZ
PB-->P0
PC-->P6
PC-->PD
PD-->P8
PD-->OZ
PD-->P0
PE-->PA
PE-->PC
PF-->P8
PF-->P4
PG-->PD
PG-->P0
PL-->PN
PL-->PP
PL-->PQ
PL-->PR
PL-->PS
PL-->PT
PL-->PU
PL-->PV
PL-->PW
PL-->PX
PL-->PY
PL-->PZ
PL-->Q0
PL-->Q1
PL-->Q2
PL-->Q3
PL-->Q4
PL-->PO
PN-->PO
Q4-->PO
Q5-->PN
Q5-->Q4
Q5-->PO
Q6-->PN
Q7-->PV
Q8-->PV
Q9-->PV
QA-->PW
QB-->PW
QC-->PX
QD-->Q3
QG-->Q4
QH-->PO
QL-->QN
QL-->QO
QL-->QP
QL-->QR
QL-->QS
QL-->QT
QL-->QU
QL-->QV
QL-->QW
QL-->QX
QL-->QY
QL-->QZ
QL-->QQ
QL-->R0
QL-->R1
QL-->R2
QL-->R3
QL-->R4
QL-->R5
QL-->R6
QP-->QQ
R0-->QQ
R1-->QQ
R7-->QN
R7-->QV
R7-->R4
R7-->R6
R8-->QN
R8-->QV
R8-->R4
R8-->R6
R9-->QP
RA-->QP
RB-->QP
RC-->QX
RD-->QX
RE-->QQ
RF-->R0
RF-->R5
RG-->R0
RG-->R5
RI-->QN
RI-->R1
RJ-->R2
RK-->R4
RN-->RP
RS-->RU
RS-->RV
S1-->S4
SB-->SD
SE-->SD
SF-->SD
SG-->SD
SH-->SD
SK-->SM
SK-->SN
SK-->SP
SK-->SY
SK-->SQ
SK-->SR
SK-->SZ
SK-->T0
SK-->SU
SK-->T1
SK-->T2
SK-->T3
SM-->SN
SM-->SP
SM-->SR
SP-->SQ
SR-->ST
SR-->SW
SR-->SX
SR-->SQ
ST-->SU
SW-->SU
SZ-->ST
SZ-->SW
SZ-->SX
SZ-->SQ
T1-->SP
T2-->SM
T3-->SP
T6-->T8
T6-->TB
T6-->T9
T6-->TA
T8-->T9
T8-->TA
TA-->T9
TC-->T8
TD-->TB
TE-->T9
TE-->TA
