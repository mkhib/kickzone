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
end
end
end
subgraph 3B["currency-management"]
subgraph 3C["src"]
3D["index.ts"]
subgraph 3E["lib"]
3F["currency-management.tsx"]
3G["currency-management.spec.tsx"]
end
end
end
subgraph 3H["customer-management"]
subgraph 3I["src"]
3J["index.ts"]
subgraph 3K["lib"]
3L["admin-customer-management.tsx"]
3M["admin-customer-management.spec.tsx"]
end
end
3N["vite.config.ts"]
end
subgraph 3O["login"]
subgraph 3P["src"]
3Q["index.ts"]
subgraph 3R["lib"]
3S["AdminsLogin.tsx"]
3T["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3U["product-editor"]
subgraph 3V["src"]
3W["index.spec.tsx"]
3X["index.ts"]
subgraph 3Y["lib"]
3Z["AdminProductEditor.tsx"]
40["AdminProductEditor.pants-range.spec.tsx"]
41["AdminProductEditor.spec.tsx"]
end
42["vite-env.d.ts"]
end
end
subgraph 43["products"]
subgraph 44["src"]
45["index.spec.tsx"]
46["index.ts"]
subgraph 47["lib"]
48["AdminProducts.tsx"]
49["adminProducts.hooks.ts"]
4A["adminProducts.graphql.ts"]
4B["ProductImageManagementModal.tsx"]
4C["AdminProducts.spec.tsx"]
4D["ProductImageManagementModal.pants-size.spec.tsx"]
4E["ProductImageManagementModal.spec.tsx"]
end
4F["vite-env.d.ts"]
end
end
subgraph 4G["seller-management"]
subgraph 4H["src"]
4I["index.spec.tsx"]
4J["index.ts"]
subgraph 4K["lib"]
4L["SellerManagement.tsx"]
4M["SellerManagement.spec.tsx"]
end
4N["vite-env.d.ts"]
end
end
subgraph 4O["translation-management"]
subgraph 4P["src"]
4Q["index.ts"]
subgraph 4R["lib"]
4S["AdminTranslationManagement.tsx"]
4T["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4U["unauthorized"]
subgraph 4V["src"]
4W["index.spec.tsx"]
4X["index.ts"]
subgraph 4Y["lib"]
4Z["admins-unauthorized-screen.tsx"]
50["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 51["zustand"]
subgraph 52["admins-products-store"]
subgraph 53["src"]
54["index.spec.ts"]
55["index.ts"]
subgraph 56["lib"]
57["admins-products-store.ts"]
58["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 59["customers"]
subgraph 5A["components"]
subgraph 5B["footer"]
subgraph 5C["src"]
5D["index.ts"]
subgraph 5E["lib"]
5F["customers-footer.tsx"]
5G["TrustBadgeIcons.tsx"]
5H["customers-footer.spec.tsx"]
end
end
end
subgraph 5I["headerbar"]
subgraph 5J["src"]
5K["index.ts"]
subgraph 5L["lib"]
5M["CustomersHeaderbar.tsx"]
5N["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5O["layout"]
subgraph 5P["src"]
5Q["index.ts"]
subgraph 5R["lib"]
5S["CustomersLayout.tsx"]
5T["CustomersTabbar.tsx"]
5U["CustomersLayout.spec.tsx"]
5V["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5W["product-card"]
subgraph 5X["src"]
5Y["index.ts"]
subgraph 5Z["lib"]
60["CustomersProductCard.tsx"]
61["CustomersProductCard.pants-size.spec.tsx"]
62["CustomersProductCard.spec.tsx"]
end
63["vite-env.d.ts"]
end
end
end
subgraph 64["contexts"]
subgraph 65["auth"]
subgraph 66["src"]
67["index.ts"]
subgraph 68["lib"]
69["CustomersAuthContext.tsx"]
6A["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 6B["graphql"]
subgraph 6C["src"]
6D["index.ts"]
subgraph 6E["lib"]
6F["customer-profile.queries.ts"]
6G["mutations.ts"]
6H["Provider.tsx"]
6I["CustomersApolloProvider.tsx"]
6J["client.ts"]
6K["queries.ts"]
6L["apollo-upload-client.d.ts"]
end
end
end
subgraph 6M["hooks"]
subgraph 6N["auth"]
subgraph 6O["src"]
6P["index.ts"]
subgraph 6Q["lib"]
6R["useCustomersForgotPassword.tsx"]
6S["useCustomersLogin.tsx"]
6T["useCustomersRegister.tsx"]
6U["useCustomersResetPassword.tsx"]
6V["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6W["cart"]
6X["jest.config.ts"]
6Y["jest.setup.ts"]
subgraph 6Z["src"]
70["index.ts"]
subgraph 71["lib"]
72["customers-cart-hook.tsx"]
73["useCartService.ts"]
74["useWishlistSync.ts"]
75["useCartService.spec.tsx"]
76["useCartSync.ts"]
end
end
end
subgraph 77["orders"]
subgraph 78["src"]
79["index.ts"]
subgraph 7A["lib"]
7B["customers-orders-hook.tsx"]
end
end
end
subgraph 7C["products"]
subgraph 7D["src"]
7E["index.ts"]
subgraph 7F["lib"]
7G["customers-product-hook.tsx"]
end
end
end
end
subgraph 7H["router"]
subgraph 7I["src"]
7J["index.ts"]
subgraph 7K["lib"]
7L["CustomersRouter.tsx"]
7M["ScrollToTop.tsx"]
7N["CustomersRouter.spec.tsx"]
7O["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7P["routes"]
subgraph 7Q["src"]
7R["index.ts"]
subgraph 7S["lib"]
7T["customer-routes.ts"]
7U["customer-routes.spec.ts"]
end
end
end
subgraph 7V["screens"]
subgraph 7W["contact"]
subgraph 7X["src"]
7Y["index.ts"]
subgraph 7Z["lib"]
80["customer-contact.tsx"]
81["customer-contact.spec.tsx"]
end
end
82["vite.config.ts"]
end
subgraph 83["customer-checkout"]
subgraph 84["src"]
85["index.ts"]
subgraph 86["lib"]
87["customer-checkout.tsx"]
end
end
end
subgraph 88["customer-favorites"]
subgraph 89["src"]
8A["index.ts"]
subgraph 8B["lib"]
8C["customer-favorites.tsx"]
8D["customer-favorites.spec.tsx"]
end
end
8E["vite.config.ts"]
end
subgraph 8F["customer-login"]
subgraph 8G["src"]
8H["index.ts"]
subgraph 8I["lib"]
8J["customer-login.tsx"]
end
end
end
subgraph 8K["customer-order-confirmation"]
subgraph 8L["src"]
8M["index.ts"]
subgraph 8N["lib"]
8O["customer-order-confirmation.tsx"]
8P["customer-order-confirmation.pants-size.spec.tsx"]
8Q["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8R["customer-orders"]
subgraph 8S["src"]
8T["index.ts"]
subgraph 8U["lib"]
8V["customer-orders.tsx"]
end
end
end
subgraph 8W["customer-payment"]
subgraph 8X["src"]
8Y["index.ts"]
subgraph 8Z["lib"]
90["customer-payment-callback.tsx"]
91["use-zarinpal-payment.tsx"]
92["zarinpal-payment-service.ts"]
93["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 94["customer-products"]
subgraph 95["src"]
96["index.ts"]
subgraph 97["lib"]
98["customer-products.tsx"]
end
end
end
subgraph 99["customer-profile"]
subgraph 9A["src"]
9B["index.ts"]
subgraph 9C["lib"]
9D["customer-profile.tsx"]
9E["customer-profile.spec.tsx"]
end
end
end
subgraph 9F["customer-shopping-cart"]
subgraph 9G["src"]
9H["index.ts"]
subgraph 9I["lib"]
9J["customer-shopping-cart.tsx"]
9K["customer-shopping-cart.pants-size.spec.tsx"]
9L["customer-shopping-cart.spec.tsx"]
end
end
9M["vite.config.ts"]
end
subgraph 9N["customer-signup"]
subgraph 9O["src"]
9P["index.ts"]
subgraph 9Q["lib"]
9R["customer-signup.tsx"]
9S["customer-signup.password-length.spec.tsx"]
9T["customer-signup.spec.tsx"]
9U["customer-signup.zod.spec.tsx"]
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
IY["Snackbar.tsx"]
end
end
end
subgraph IZ["styled-drawer"]
subgraph J0["src"]
J1["index.ts"]
subgraph J2["lib"]
J3["styled-drawer.tsx"]
J4["styled-drawer.spec.tsx"]
end
end
end
subgraph J5["unauthorized"]
subgraph J6["src"]
J7["index.ts"]
subgraph J8["lib"]
J9["unauthorized-path.tsx"]
end
end
end
end
subgraph JA["graphql"]
subgraph JB["src"]
JC["index.ts"]
subgraph JD["lib"]
JE["currency.mutations.ts"]
JF["currency.queries.ts"]
JG["fragments.ts"]
JH["variant-colors.ts"]
JI["client-shared-graphql.tsx"]
end
end
end
subgraph JJ["hooks"]
subgraph JK["brands"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["brands.graphql.ts"]
JP["useBrands.ts"]
end
end
JQ["vite.config.ts"]
end
subgraph JR["categories"]
subgraph JS["src"]
JT["index.ts"]
subgraph JU["lib"]
JV["useCategories.ts"]
JW["categories.graphql.ts"]
end
end
end
subgraph JX["colors"]
subgraph JY["src"]
JZ["index.ts"]
subgraph K0["lib"]
K1["useColors.ts"]
K2["color.graphql.ts"]
end
end
end
subgraph K3["currency"]
subgraph K4["src"]
K5["index.ts"]
subgraph K6["lib"]
K7["useConvertPrice.tsx"]
K8["useExchangeRate.tsx"]
K9["useCurrencies.tsx"]
KA["useCurrencyForLocale.tsx"]
KB["useExchangeRate.spec.tsx"]
end
end
end
subgraph KC["products"]
subgraph KD["src"]
KE["index.ts"]
subgraph KF["lib"]
KG["productImage.ts"]
KH["products.graphql.ts"]
KI["useProducts.ts"]
KJ["productImage.spec.ts"]
end
end
end
subgraph KK["site-languages"]
subgraph KL["src"]
KM["index.ts"]
subgraph KN["lib"]
KO["site-languages.graphql.ts"]
KP["useSiteLanguages.ts"]
KQ["site-languages-hook.spec.tsx"]
end
end
KR["vite.config.ts"]
end
subgraph KS["snackbar"]
subgraph KT["src"]
KU["index.ts"]
subgraph KV["lib"]
KW["SnackbarContext.tsx"]
KX["useSnackbar.ts"]
end
end
end
subgraph KY["translations-management-hook"]
subgraph KZ["src"]
L0["index.ts"]
subgraph L1["lib"]
L2["useTranslationsManagement.ts"]
end
end
end
end
subgraph L3["lottie"]
subgraph L4["empty-cart"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["lottie-empty-cart.tsx"]
L9["lottie-empty-cart.spec.tsx"]
end
end
LA["vite.config.ts"]
end
subgraph LB["loading"]
subgraph LC["src"]
LD["index.ts"]
subgraph LE["lib"]
LF["lottie-loading.tsx"]
LG["lottie-loading.spec.tsx"]
end
end
end
subgraph LH["success-check"]
subgraph LI["src"]
LJ["index.ts"]
subgraph LK["lib"]
LL["lottie-success-check.tsx"]
LM["lottie-success-check.spec.tsx"]
end
end
end
subgraph LN["unauthorized"]
subgraph LO["src"]
LP["index.ts"]
subgraph LQ["lib"]
LR["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LS["translations"]
subgraph LT["src"]
LU["index.ts"]
subgraph LV["lib"]
LW["mapApolloErrorToTranslationKey.ts"]
LX["WrapTranslation.tsx"]
end
end
end
subgraph LY["ui"]
subgraph LZ["colors"]
subgraph M0["src"]
M1["index.ts"]
subgraph M2["lib"]
M3["colors.ts"]
end
end
end
subgraph M4["language-components"]
subgraph M5["src"]
M6["index.ts"]
subgraph M7["lib"]
M8["language-components.tsx"]
M9["ltr-text-field.tsx"]
end
end
end
subgraph MA["sizes"]
subgraph MB["src"]
MC["index.ts"]
subgraph MD["lib"]
ME["sizes.ts"]
MF["sizes.spec.tsx"]
MG["sizes.tsx"]
end
end
end
end
subgraph MH["zustand"]
subgraph MI["shared-auth-store"]
subgraph MJ["src"]
MK["index.ts"]
subgraph ML["lib"]
MM["shared-auth-store.ts"]
end
end
end
subgraph MN["shared-notification-store"]
subgraph MO["src"]
MP["index.ts"]
subgraph MQ["lib"]
MR["shared-notification-store.tsx"]
end
end
end
subgraph MS["shared-ui-store"]
subgraph MT["src"]
MU["index.ts"]
subgraph MV["lib"]
MW["shared-ui-store.ts"]
MX["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MY["server"]
subgraph MZ["controllers"]
subgraph N0["src"]
N1["index.ts"]
subgraph N2["lib"]
N3["auth.controller.ts"]
N4["order.controller.ts"]
end
end
end
subgraph N5["decorators"]
N6["jest.config.ts"]
subgraph N7["src"]
N8["index.ts"]
subgraph N9["lib"]
NA["current-user.decorator.ts"]
NB["decorators.ts"]
NC["decorators.spec.ts"]
end
end
end
subgraph ND["entities"]
subgraph NE["src"]
NF["index.ts"]
subgraph NG["lib"]
NH["brand.entity.ts"]
NI["product.entity.ts"]
NJ["category.entity.ts"]
NK["product-description.entity.ts"]
NL["site-language.entity.ts"]
NM["product-info.entity.ts"]
NN["color.entity.ts"]
NO["product-info-color.entity.ts"]
NP["seller-info.entity.ts"]
NQ["seller-product.entity.ts"]
NR["user.entity.ts"]
NS["cart.entity.ts"]
NT["currency-preference.entity.ts"]
NU["currency.entity.ts"]
NV["customer.entity.ts"]
NW["exchange-rate.entity.ts"]
NX["order.entity.ts"]
NY["platform-settings.entity.ts"]
NZ["refresh-token.entity.ts"]
O0["seller-order.entity.ts"]
O1["translation.entity.ts"]
end
end
end
subgraph O2["guards"]
O3["jest.config.ts"]
subgraph O4["src"]
O5["index.ts"]
subgraph O6["lib"]
O7["catalog.guard.ts"]
O8["graphql-auth.guard.ts"]
O9["http-auth.guard.ts"]
OA["roles.guard.ts"]
OB["catalog.guard.spec.ts"]
OC["roles.guard.spec.ts"]
end
end
end
subgraph OD["inputs"]
subgraph OE["src"]
OF["index.ts"]
subgraph OG["lib"]
OH["brand.input.ts"]
OI["cart.inputs.ts"]
OJ["category.input.ts"]
OK["color.input.ts"]
OL["customer-auth.inputs.ts"]
OM["order-pagination.inputs.ts"]
ON["order.inputs.ts"]
OO["product-info-filter.input.ts"]
OP["product.input.ts"]
OQ["seller-order-pagination.inputs.ts"]
OR["seller.input.ts"]
OS["site-language.input.ts"]
OT["user.input.ts"]
end
end
end
subgraph OU["modules"]
subgraph OV["src"]
OW["index.ts"]
subgraph OX["lib"]
OY["auth.module.ts"]
OZ["email.module.ts"]
P0["token.module.ts"]
P1["user.module.ts"]
P2["customer-profile.module.ts"]
P3["brand.module.ts"]
P4["catalog-guard.module.ts"]
P5["translation.module.ts"]
P6["cart.module.ts"]
P7["platform-settings.module.ts"]
P8["category.module.ts"]
P9["product.module.ts"]
PA["color.module.ts"]
PB["currency.module.ts"]
PC["graphql-context.module.ts"]
PD["order.module.ts"]
PE["seller-info.module.ts"]
PF["payment.module.ts"]
PG["product-info.module.ts"]
PH["seller-products.module.ts"]
PI["site-language.module.ts"]
end
end
end
subgraph PJ["resolvers"]
PK["jest.config.ts"]
subgraph PL["src"]
PM["index.ts"]
subgraph PN["lib"]
PO["auth.resolver.ts"]
PP["zod-validation.pipe.ts"]
PQ["brand.resolver.ts"]
PR["cart.resolver.ts"]
PS["category.resolver.ts"]
PT["color.resolver.ts"]
PU["currency.resolver.ts"]
PV["customer-profile.resolver.ts"]
PW["order.resolver.ts"]
PX["payment.resolver.ts"]
PY["product-info.resolver.ts"]
PZ["product.resolver.ts"]
Q0["seller-info.resolver.ts"]
Q1["shipping.resolver.ts"]
Q2["site-language.resolver.ts"]
Q3["translation.input.ts"]
Q4["translation.resolver.ts"]
Q5["user.resolver.ts"]
Q6["auth-validation.spec.ts"]
Q7["auth.resolver.spec.ts"]
Q8["order.resolver.spec.ts"]
Q9["order.resolver.status-transitions.spec.ts"]
QA["order.resolver.tracking.spec.ts"]
QB["payment.resolver.integration.spec.ts"]
QC["payment.resolver.spec.ts"]
QD["product-info.resolver.spec.ts"]
QE["translation.resolver.guards.spec.ts"]
subgraph QF["types"]
QG["graphql-upload.d.ts"]
end
QH["user.resolver.spec.ts"]
QI["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QJ["services"]
QK["jest.config.ts"]
subgraph QL["src"]
QM["index.ts"]
subgraph QN["lib"]
QO["auth.service.ts"]
QP["brand.service.ts"]
QQ["cart.service.ts"]
QR["product-info-colors.util.ts"]
QS["category.service.ts"]
QT["color.service.ts"]
QU["currency.service.ts"]
QV["customer-profile.service.ts"]
QW["email.service.ts"]
QX["image-upload.service.ts"]
QY["order.service.ts"]
QZ["payment-logger.service.ts"]
R0["payment.service.ts"]
R1["product.service.ts"]
R2["seller-info.service.ts"]
R3["shipping-calculation.service.ts"]
R4["site-language.service.ts"]
R5["token.service.ts"]
R6["translation.service.ts"]
R7["user.service.ts"]
R8["auth.service.password-policy.spec.ts"]
R9["auth.service.spec.ts"]
RA["cart.service.add-quantity.spec.ts"]
RB["cart.service.null-relations.spec.ts"]
RC["cart.service.spec.ts"]
RD["order.service.spec.ts"]
RE["order.service.tracking.spec.ts"]
RF["product-info-colors.util.spec.ts"]
RG["product.service.pants.spec.ts"]
RH["product.service.spec.ts"]
RI["relay-connection.spec.ts"]
RJ["seller-info.service.price-validation.spec.ts"]
RK["shipping-calculation.service.spec.ts"]
RL["token.service.spec.ts"]
end
end
end
subgraph RM["strategies"]
subgraph RN["src"]
RO["index.ts"]
subgraph RP["lib"]
RQ["local.strategy.ts"]
end
end
end
subgraph RR["utils"]
subgraph RS["src"]
RT["index.ts"]
subgraph RU["lib"]
RV["email-templates.ts"]
RW["relay-connection.ts"]
RX["pagination.ts"]
end
end
end
end
subgraph RY["shared"]
subgraph RZ["codegen"]
S0["jest.config.ts"]
subgraph S1["src"]
S2["index.ts"]
subgraph S3["lib"]
subgraph S4["generated"]
S5["graphql.ts"]
end
end
end
end
subgraph S6["graphql-schema"]
S7["jest.config.ts"]
subgraph S8["src"]
S9["index.ts"]
end
end
subgraph SA["product-sizes"]
subgraph SB["src"]
SC["index.ts"]
subgraph SD["lib"]
SE["product-sizes.ts"]
SF["product-sizes.pants-formats.spec.ts"]
SG["product-sizes.pants-label.spec.ts"]
SH["product-sizes.pants-strict.spec.ts"]
SI["product-sizes.spec.ts"]
end
end
end
subgraph SJ["shared-i18n"]
subgraph SK["src"]
SL["index.ts"]
subgraph SM["lib"]
SN["language-context.tsx"]
SO["language-detector.ts"]
subgraph SP["locales"]
SQ["i18n-react.tsx"]
SR["i18n-util.ts"]
SS["i18n-util.async.ts"]
subgraph ST["en"]
SU["index.ts"]
end
subgraph SW["fa"]
SX["index.ts"]
end
SY["formatters.ts"]
SZ["i18n-types.ts"]
T0["i18n-util.sync.ts"]
T1["navigator-detector.ts"]
end
SV["site-name.ts"]
T2["table-localization.ts"]
T3["theme-provider.tsx"]
T4["use-page-title.ts"]
end
end
end
subgraph T5["validation"]
subgraph T6["src"]
T7["index.ts"]
subgraph T8["lib"]
T9["auth.ts"]
TA["limits.ts"]
TB["primitives.ts"]
TC["auth-forms.ts"]
TD["errors.ts"]
TE["auth-forms.spec.ts"]
TF["auth.spec.ts"]
TG["errors.spec.ts"]
TH["primitives.spec.ts"]
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
B-->6
C-->4
C-->6
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
3D-->3F
3G-->3F
3J-->3L
3M-->3L
3Q-->3S
3T-->3S
3W-->3X
3X-->3Z
40-->3Z
41-->3Z
45-->46
46-->48
48-->49
48-->4B
49-->4A
4C-->48
4D-->4B
4I-->4J
4J-->4L
4M-->4L
4Q-->4S
4S-->4T
4W-->4X
4X-->4Z
50-->4Z
54-->55
55-->57
58-->57
5D-->5F
5D-->5G
5F-->5G
5H-->5F
5K-->5M
5N-->5M
5Q-->5S
5Q-->5T
5S-->5T
5U-->5S
5V-->5T
5Y-->60
61-->60
62-->60
67-->69
6A-->69
6D-->6F
6D-->6G
6D-->6H
6D-->6K
6H-->6I
6I-->6J
6P-->6R
6P-->6S
6P-->6T
6P-->6U
6V-->6S
70-->72
70-->73
70-->74
75-->73
76-->72
79-->7B
7E-->7G
7J-->7L
7J-->7M
7L-->7M
7N-->7L
7O-->7M
7R-->7T
7U-->7T
7Y-->80
81-->80
85-->87
8A-->8C
8D-->8C
8H-->8J
8M-->8O
8P-->8O
8Q-->8O
8T-->8V
8Y-->90
8Y-->91
8Y-->92
90-->91
91-->92
93-->90
96-->98
9B-->9D
9E-->9D
9H-->9J
9K-->9J
9L-->9J
9P-->9R
9S-->9R
9T-->9R
9U-->9R
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
J1-->J3
J4-->J3
J7-->J9
JC-->JE
JC-->JF
JC-->JG
JC-->JH
JM-->JO
JM-->JP
JP-->JO
JT-->JV
JV-->JW
JZ-->K1
K1-->K2
K5-->K7
K5-->K9
K5-->KA
K5-->K8
K7-->K8
KB-->K8
KE-->KG
KE-->KH
KE-->KI
KI-->KH
KJ-->KG
KM-->KO
KM-->KP
KP-->KO
KQ-->KP
KU-->KW
KU-->KX
KX-->KW
L0-->L2
L6-->L8
L9-->L8
LD-->LF
LG-->LF
LJ-->LL
LM-->LL
LP-->LR
LU-->LW
M1-->M3
M6-->M8
M6-->M9
MC-->ME
MF-->MG
MK-->MM
MP-->MR
MU-->MW
N1-->N3
N1-->N4
N8-->NA
N8-->NB
NC-->NB
NF-->NH
NF-->NS
NF-->NJ
NF-->NN
NF-->NT
NF-->NU
NF-->NV
NF-->NW
NF-->NX
NF-->NY
NF-->NK
NF-->NO
NF-->NM
NF-->NI
NF-->NZ
NF-->NP
NF-->O0
NF-->NQ
NF-->NL
NF-->O1
NF-->NR
NH-->NI
NI-->NH
NI-->NJ
NI-->NK
NI-->NM
NI-->NP
NI-->NQ
NJ-->NI
NK-->NI
NK-->NL
NL-->NK
NM-->NN
NM-->NO
NM-->NI
NO-->NN
NO-->NM
NP-->NQ
NP-->NR
NQ-->NM
NQ-->NI
NQ-->NP
NS-->NI
NS-->NR
NT-->NU
NV-->NR
NW-->NU
NW-->NR
NX-->NI
NX-->NP
NZ-->NR
O0-->NX
O5-->O7
O5-->O8
O5-->O9
O5-->OA
OB-->O7
OC-->OA
OF-->OH
OF-->OI
OF-->OJ
OF-->OK
OF-->OL
OF-->OM
OF-->ON
OF-->OO
OF-->OP
OF-->OQ
OF-->OR
OF-->OS
OF-->OT
OP-->OO
OW-->OY
OW-->P3
OW-->P6
OW-->P4
OW-->P8
OW-->PA
OW-->PB
OW-->P2
OW-->OZ
OW-->PC
OW-->PD
OW-->PF
OW-->P7
OW-->PG
OW-->P9
OW-->PE
OW-->PH
OW-->PI
OW-->P0
OW-->P5
OW-->P1
OY-->OZ
OY-->P0
OY-->P1
P1-->OY
P1-->P2
P3-->P4
P3-->P5
P6-->P7
P8-->P4
P8-->P9
P8-->P5
P9-->P4
P9-->P0
P9-->P5
PA-->P4
PA-->P5
PC-->OZ
PC-->P0
PC-->P1
PD-->P7
PD-->PE
PE-->P9
PE-->P0
PE-->P1
PF-->PD
PG-->P9
PG-->P5
PH-->PE
PH-->P1
PM-->PO
PM-->PQ
PM-->PR
PM-->PS
PM-->PT
PM-->PU
PM-->PV
PM-->PW
PM-->PX
PM-->PY
PM-->PZ
PM-->Q0
PM-->Q1
PM-->Q2
PM-->Q3
PM-->Q4
PM-->Q5
PM-->PP
PO-->PP
Q5-->PP
Q6-->PO
Q6-->Q5
Q6-->PP
Q7-->PO
Q8-->PW
Q9-->PW
QA-->PW
QB-->PX
QC-->PX
QD-->PY
QE-->Q4
QH-->Q5
QI-->PP
QM-->QO
QM-->QP
QM-->QQ
QM-->QS
QM-->QT
QM-->QU
QM-->QV
QM-->QW
QM-->QX
QM-->QY
QM-->QZ
QM-->R0
QM-->QR
QM-->R1
QM-->R2
QM-->R3
QM-->R4
QM-->R5
QM-->R6
QM-->R7
QQ-->QR
R1-->QR
R2-->QR
R8-->QO
R8-->QW
R8-->R5
R8-->R7
R9-->QO
R9-->QW
R9-->R5
R9-->R7
RA-->QQ
RB-->QQ
RC-->QQ
RD-->QY
RE-->QY
RF-->QR
RG-->R1
RG-->R6
RH-->R1
RH-->R6
RJ-->QO
RJ-->R2
RK-->R3
RL-->R5
RO-->RQ
RT-->RV
RT-->RW
S2-->S5
SC-->SE
SF-->SE
SG-->SE
SH-->SE
SI-->SE
SL-->SN
SL-->SO
SL-->SQ
SL-->SZ
SL-->SR
SL-->SS
SL-->T0
SL-->T1
SL-->SV
SL-->T2
SL-->T3
SL-->T4
SN-->SO
SN-->SQ
SN-->SS
SQ-->SR
SS-->SU
SS-->SX
SS-->SY
SS-->SR
SU-->SV
SX-->SV
T0-->SU
T0-->SX
T0-->SY
T0-->SR
T2-->SQ
T3-->SN
T4-->SQ
T7-->T9
T7-->TC
T7-->TD
T7-->TA
T7-->TB
T9-->TA
T9-->TB
TB-->TA
TC-->T9
TE-->TC
TF-->T9
TG-->TD
TH-->TA
TH-->TB
