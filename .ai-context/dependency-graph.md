flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.ts"]
5["global-validation-pipe.spec.ts"]
6["global-validation-pipe.ts"]
7["order-inputs.validation.spec.ts"]
8["seller-product-inputs.validation.spec.ts"]
end
9["main.ts"]
end
end
end
subgraph A["libs"]
subgraph B["client"]
subgraph C["admins"]
subgraph D["components"]
subgraph E["footer"]
subgraph F["src"]
G["index.ts"]
subgraph H["lib"]
I["admins-footer.tsx"]
J["admins-footer.spec.tsx"]
end
end
end
subgraph K["headerbar"]
subgraph L["src"]
M["index.ts"]
subgraph N["lib"]
O["AdminsHeaderbar.tsx"]
P["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph Q["layout"]
subgraph R["src"]
S["index.ts"]
subgraph T["lib"]
U["AdminsLayout.tsx"]
V["AdminsTabbar.tsx"]
W["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph X["contexts"]
subgraph Y["src"]
Z["index.spec.tsx"]
10["index.ts"]
subgraph 11["lib"]
12["AdminsAuthContext.tsx"]
13["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 14["graphql"]
subgraph 15["src"]
16["index.ts"]
subgraph 17["lib"]
18["fragments.ts"]
19["mutations.ts"]
1A["orders.graphql.ts"]
1B["Provider.tsx"]
1C["AdminsApolloProvider.tsx"]
1D["client.ts"]
1E["queries.ts"]
1F["Provider.spec.tsx"]
1G["apollo-upload-client.d.ts"]
1H["client.spec.tsx"]
1I["fragments.spec.tsx"]
1J["mutations.spec.tsx"]
1K["queries.spec.tsx"]
end
subgraph 1L["types"]
1M["apollo-upload-client.d.ts"]
end
end
end
subgraph 1N["hooks"]
subgraph 1O["auth"]
subgraph 1P["src"]
1Q["index.ts"]
subgraph 1R["lib"]
1S["useAdminLogin.ts"]
1T["useAdminLogin.spec.ts"]
1U["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1V["currency-management"]
subgraph 1W["src"]
1X["index.ts"]
subgraph 1Y["lib"]
1Z["useAdminsCurrencyManagement.ts"]
end
end
20["vite.config.ts"]
end
subgraph 21["customers"]
subgraph 22["src"]
23["index.ts"]
subgraph 24["lib"]
25["adminsCustomers.graphql.ts"]
26["useAdminsCustomers.ts"]
27["useAdminsCustomers.spec.tsx"]
end
end
28["vite.config.ts"]
end
subgraph 29["orders"]
subgraph 2A["src"]
2B["index.ts"]
subgraph 2C["lib"]
2D["admins-orders-hook.tsx"]
2E["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2F["sellers"]
subgraph 2G["src"]
2H["index.ts"]
subgraph 2I["lib"]
2J["useAdminsSellers.ts"]
2K["adminsSellers.graphql.ts"]
2L["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2M["router"]
subgraph 2N["src"]
2O["index.ts"]
subgraph 2P["lib"]
2Q["AdminsRouter.tsx"]
2R["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2S["routes"]
subgraph 2T["src"]
2U["index.spec.ts"]
2V["index.ts"]
subgraph 2W["lib"]
2X["admin-routes.ts"]
2Y["admin-routes.spec.ts"]
end
end
end
subgraph 2Z["screens"]
subgraph 30["admin-seller-orders"]
subgraph 31["src"]
32["index.spec.tsx"]
33["index.ts"]
subgraph 34["lib"]
35["admin-seller-orders.tsx"]
36["admin-seller-orders.pants-size.spec.tsx"]
37["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 38["currency-management"]
subgraph 39["src"]
3A["index.ts"]
subgraph 3B["lib"]
3C["currency-management.tsx"]
3D["currency-management.spec.tsx"]
end
end
end
subgraph 3E["customer-management"]
subgraph 3F["src"]
3G["index.ts"]
subgraph 3H["lib"]
3I["admin-customer-management.tsx"]
3J["admin-customer-management.spec.tsx"]
end
end
3K["vite.config.ts"]
end
subgraph 3L["login"]
subgraph 3M["src"]
3N["index.ts"]
subgraph 3O["lib"]
3P["AdminsLogin.tsx"]
3Q["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3R["product-editor"]
subgraph 3S["src"]
3T["index.spec.tsx"]
3U["index.ts"]
subgraph 3V["lib"]
3W["AdminProductEditor.tsx"]
3X["AdminProductEditor.pants-range.spec.tsx"]
3Y["AdminProductEditor.spec.tsx"]
end
3Z["vite-env.d.ts"]
end
end
subgraph 40["products"]
subgraph 41["src"]
42["index.spec.tsx"]
43["index.ts"]
subgraph 44["lib"]
45["AdminProducts.tsx"]
46["adminProducts.hooks.ts"]
47["adminProducts.graphql.ts"]
48["ProductImageManagementModal.tsx"]
49["AdminProducts.spec.tsx"]
4A["ProductImageManagementModal.pants-size.spec.tsx"]
4B["ProductImageManagementModal.spec.tsx"]
end
4C["vite-env.d.ts"]
end
end
subgraph 4D["seller-management"]
subgraph 4E["src"]
4F["index.spec.tsx"]
4G["index.ts"]
subgraph 4H["lib"]
4I["SellerManagement.tsx"]
4J["SellerManagement.spec.tsx"]
end
4K["vite-env.d.ts"]
end
end
subgraph 4L["translation-management"]
subgraph 4M["src"]
4N["index.ts"]
subgraph 4O["lib"]
4P["AdminTranslationManagement.tsx"]
4Q["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4R["unauthorized"]
subgraph 4S["src"]
4T["index.spec.tsx"]
4U["index.ts"]
subgraph 4V["lib"]
4W["admins-unauthorized-screen.tsx"]
4X["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4Y["zustand"]
subgraph 4Z["admins-products-store"]
subgraph 50["src"]
51["index.spec.ts"]
52["index.ts"]
subgraph 53["lib"]
54["admins-products-store.ts"]
55["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 56["customers"]
subgraph 57["components"]
subgraph 58["footer"]
subgraph 59["src"]
5A["index.ts"]
subgraph 5B["lib"]
5C["customers-footer.tsx"]
5D["TrustBadgeIcons.tsx"]
5E["customers-footer.spec.tsx"]
end
end
end
subgraph 5F["headerbar"]
subgraph 5G["src"]
5H["index.ts"]
subgraph 5I["lib"]
5J["CustomersHeaderbar.tsx"]
5K["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5L["layout"]
subgraph 5M["src"]
5N["index.ts"]
subgraph 5O["lib"]
5P["CustomersLayout.tsx"]
5Q["CustomersTabbar.tsx"]
5R["CustomersLayout.spec.tsx"]
5S["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5T["product-card"]
subgraph 5U["src"]
5V["index.ts"]
subgraph 5W["lib"]
5X["CustomersProductCard.tsx"]
5Y["CustomersProductCard.pants-size.spec.tsx"]
5Z["CustomersProductCard.spec.tsx"]
end
60["vite-env.d.ts"]
end
end
end
subgraph 61["contexts"]
subgraph 62["auth"]
subgraph 63["src"]
64["index.ts"]
subgraph 65["lib"]
66["CustomersAuthContext.tsx"]
67["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 68["graphql"]
subgraph 69["src"]
6A["index.ts"]
subgraph 6B["lib"]
6C["customer-profile.queries.ts"]
6D["mutations.ts"]
6E["Provider.tsx"]
6F["CustomersApolloProvider.tsx"]
6G["client.ts"]
6H["queries.ts"]
6I["apollo-upload-client.d.ts"]
end
end
end
subgraph 6J["hooks"]
subgraph 6K["auth"]
subgraph 6L["src"]
6M["index.ts"]
subgraph 6N["lib"]
6O["useCustomersForgotPassword.tsx"]
6P["useCustomersLogin.tsx"]
6Q["useCustomersRegister.tsx"]
6R["useCustomersResetPassword.tsx"]
6S["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6T["cart"]
6U["jest.config.ts"]
6V["jest.setup.ts"]
subgraph 6W["src"]
6X["index.ts"]
subgraph 6Y["lib"]
6Z["customers-cart-hook.tsx"]
70["useCartService.ts"]
71["useWishlistSync.ts"]
72["useCartService.spec.tsx"]
73["useCartSync.ts"]
end
end
end
subgraph 74["orders"]
subgraph 75["src"]
76["index.ts"]
subgraph 77["lib"]
78["customers-orders-hook.tsx"]
end
end
end
subgraph 79["products"]
subgraph 7A["src"]
7B["index.ts"]
subgraph 7C["lib"]
7D["customers-product-hook.tsx"]
end
end
end
end
subgraph 7E["router"]
subgraph 7F["src"]
7G["index.ts"]
subgraph 7H["lib"]
7I["CustomersRouter.tsx"]
7J["ScrollToTop.tsx"]
7K["CustomersRouter.spec.tsx"]
7L["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7M["routes"]
subgraph 7N["src"]
7O["index.ts"]
subgraph 7P["lib"]
7Q["customer-routes.ts"]
7R["customer-routes.spec.ts"]
end
end
end
subgraph 7S["screens"]
subgraph 7T["contact"]
subgraph 7U["src"]
7V["index.ts"]
subgraph 7W["lib"]
7X["customer-contact.tsx"]
7Y["customer-contact.spec.tsx"]
end
end
7Z["vite.config.ts"]
end
subgraph 80["customer-checkout"]
subgraph 81["src"]
82["index.ts"]
subgraph 83["lib"]
84["customer-checkout.tsx"]
end
end
end
subgraph 85["customer-favorites"]
subgraph 86["src"]
87["index.ts"]
subgraph 88["lib"]
89["customer-favorites.tsx"]
8A["customer-favorites.spec.tsx"]
end
end
8B["vite.config.ts"]
end
subgraph 8C["customer-login"]
subgraph 8D["src"]
8E["index.ts"]
subgraph 8F["lib"]
8G["customer-login.tsx"]
end
end
end
subgraph 8H["customer-order-confirmation"]
subgraph 8I["src"]
8J["index.ts"]
subgraph 8K["lib"]
8L["customer-order-confirmation.tsx"]
8M["customer-order-confirmation.pants-size.spec.tsx"]
8N["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8O["customer-orders"]
subgraph 8P["src"]
8Q["index.ts"]
subgraph 8R["lib"]
8S["customer-orders.tsx"]
end
end
end
subgraph 8T["customer-payment"]
subgraph 8U["src"]
8V["index.ts"]
subgraph 8W["lib"]
8X["customer-payment-callback.tsx"]
8Y["use-zarinpal-payment.tsx"]
8Z["zarinpal-payment-service.ts"]
90["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 91["customer-products"]
subgraph 92["src"]
93["index.ts"]
subgraph 94["lib"]
95["customer-products.tsx"]
end
end
end
subgraph 96["customer-profile"]
subgraph 97["src"]
98["index.ts"]
subgraph 99["lib"]
9A["customer-profile.tsx"]
9B["customer-profile.spec.tsx"]
end
end
end
subgraph 9C["customer-shopping-cart"]
subgraph 9D["src"]
9E["index.ts"]
subgraph 9F["lib"]
9G["customer-shopping-cart.tsx"]
9H["customer-shopping-cart.pants-size.spec.tsx"]
9I["customer-shopping-cart.spec.tsx"]
end
end
9J["vite.config.ts"]
end
subgraph 9K["customer-signup"]
subgraph 9L["src"]
9M["index.ts"]
subgraph 9N["lib"]
9O["customer-signup.tsx"]
9P["customer-signup.password-length.spec.tsx"]
9Q["customer-signup.spec.tsx"]
end
end
end
subgraph 9R["forgot-password"]
subgraph 9S["src"]
9T["index.ts"]
subgraph 9U["lib"]
9V["customer-forgot-password.tsx"]
9W["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9X["guide-authenticity"]
subgraph 9Y["src"]
9Z["index.ts"]
subgraph A0["lib"]
A1["customer-guide-authenticity.tsx"]
A2["customer-guide-authenticity.spec.tsx"]
end
end
A3["vite.config.ts"]
end
subgraph A4["guide-payment"]
subgraph A5["src"]
A6["index.ts"]
subgraph A7["lib"]
A8["customer-guide-payment.tsx"]
A9["customer-guide-payment.spec.tsx"]
end
end
AA["vite.config.ts"]
end
subgraph AB["home"]
subgraph AC["src"]
AD["index.ts"]
subgraph AE["lib"]
AF["CustomersHomeScreen.tsx"]
subgraph AG["components"]
AH["CategoryBentoSection.tsx"]
AJ["HeroSection.tsx"]
AK["HomeLoadingScreen.tsx"]
AL["PicksRailSection.tsx"]
AM["TrustStripSection.tsx"]
AR["NewArrivalsSection.tsx"]
AT["BrandBlocksSection.tsx"]
AU["NewsletterSection.tsx"]
AV["ShopTheLookSection.tsx"]
AW["TickerSection.tsx"]
end
AI["home-selectors.ts"]
AN["useScrollProgress.ts"]
AO["CustomersShopScreen.tsx"]
AP["CustomersHomeScreen.cart-size.spec.tsx"]
AQ["CustomersHomeScreen.spec.tsx"]
AS["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AX["login"]
subgraph AY["src"]
AZ["index.ts"]
subgraph B0["lib"]
B1["CustomersLoginScreen.tsx"]
B2["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph B3["not-found"]
subgraph B4["src"]
B5["index.ts"]
subgraph B6["lib"]
B7["customer-not-found.tsx"]
B8["customer-not-found.spec.tsx"]
end
end
B9["vite.config.ts"]
end
subgraph BA["privacy-policy"]
subgraph BB["src"]
BC["index.ts"]
subgraph BD["lib"]
BE["customer-privacy-policy.tsx"]
BF["customer-privacy-policy.spec.tsx"]
end
end
BG["vite.config.ts"]
end
subgraph BH["product-details"]
subgraph BI["src"]
BJ["index.ts"]
subgraph BK["lib"]
BL["customer-product-details.tsx"]
BM["customer-product-details.pants-size.spec.tsx"]
BN["customer-product-details.spec.tsx"]
end
end
BO["vite.config.ts"]
end
subgraph BP["reset-password"]
subgraph BQ["src"]
BR["index.ts"]
subgraph BS["lib"]
BT["customer-reset-password.tsx"]
BU["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph BV["shipping-returns"]
subgraph BW["src"]
BX["index.ts"]
subgraph BY["lib"]
BZ["customer-shipping-returns.tsx"]
C0["customer-shipping-returns.spec.tsx"]
end
end
C1["vite.config.ts"]
end
subgraph C2["unauthorized"]
subgraph C3["src"]
C4["index.ts"]
subgraph C5["lib"]
C6["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C7["utility"]
subgraph C8["test"]
subgraph C9["src"]
CA["index.ts"]
subgraph CB["lib"]
CC["customers-test-utility.tsx"]
end
end
end
end
subgraph CD["validations"]
subgraph CE["src"]
CF["index.ts"]
subgraph CG["lib"]
CH["shipping-validation.ts"]
CI["shipping-validation.spec.tsx"]
CJ["shipping-validation.tsx"]
end
end
end
subgraph CK["zustand"]
subgraph CL["customer-cart-store"]
subgraph CM["src"]
CN["index.ts"]
subgraph CO["lib"]
CP["customer-cart-store.ts"]
CQ["customer-cart-store.spec.ts"]
CR["customer-cart-store.tsx"]
end
end
end
subgraph CS["customer-checkout-store"]
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["customer-checkout-store.ts"]
CX["customer-checkout-store.spec.ts"]
end
end
CY["vite.config.ts"]
end
subgraph CZ["customer-wishlist-store"]
subgraph D0["src"]
D1["index.ts"]
subgraph D2["lib"]
D3["customer-wishlist-store.ts"]
D4["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D5["src"]
D6["index.ts"]
subgraph D7["lib"]
D8["customers-products-store.tsx"]
end
end
end
end
subgraph D9["sellers"]
subgraph DA["components"]
subgraph DB["footer"]
subgraph DC["src"]
DD["index.ts"]
subgraph DE["lib"]
DF["sellers-footer.tsx"]
DG["sellers-footer.spec.tsx"]
end
end
end
subgraph DH["headerbar"]
subgraph DI["src"]
DJ["index.ts"]
subgraph DK["lib"]
DL["SellersHeaderbar.tsx"]
end
end
end
subgraph DM["layout"]
subgraph DN["src"]
DO["index.ts"]
subgraph DP["lib"]
DQ["SellersLayout.tsx"]
DR["SellersTabbar.tsx"]
end
end
end
end
subgraph DS["contexts"]
subgraph DT["auth"]
subgraph DU["src"]
DV["index.ts"]
subgraph DW["lib"]
DX["SellersAuthContext.tsx"]
DY["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DZ["graphql"]
subgraph E0["src"]
E1["index.ts"]
subgraph E2["lib"]
E3["fragments.ts"]
E4["mutations.ts"]
E5["Provider.tsx"]
E6["SellersApolloProvider.tsx"]
E7["client.ts"]
E8["queries.ts"]
E9["seller-orders.graphql.ts"]
EA["apollo-upload-client.d.ts"]
end
subgraph EB["types"]
EC["apollo-upload-client.d.ts"]
end
end
end
subgraph ED["hooks"]
subgraph EE["auth"]
subgraph EF["src"]
EG["index.ts"]
subgraph EH["lib"]
EI["useSellerAuth.ts"]
EJ["sellerAuth.graphql.ts"]
end
end
end
subgraph EK["orders"]
subgraph EL["src"]
EM["index.ts"]
subgraph EN["lib"]
EO["useSellerOrders.ts"]
end
end
end
subgraph EP["products"]
subgraph EQ["src"]
ER["index.ts"]
subgraph ES["lib"]
ET["useSellersProductManagement.ts"]
EU["useSellersProducts.ts"]
end
end
end
end
subgraph EV["router"]
subgraph EW["src"]
EX["index.ts"]
subgraph EY["lib"]
EZ["SellersRouter.tsx"]
end
end
end
subgraph F0["routes"]
subgraph F1["src"]
F2["index.ts"]
subgraph F3["lib"]
F4["seller-routes.ts"]
end
end
end
subgraph F5["screens"]
subgraph F6["catalog"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["SellersCatalogScreens.tsx"]
FB["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FC["login"]
subgraph FD["src"]
FE["index.ts"]
subgraph FF["lib"]
FG["SellersLogin.tsx"]
end
end
end
subgraph FH["manage-product"]
subgraph FI["src"]
FJ["index.ts"]
subgraph FK["lib"]
FL["SellersManageProductScreen.tsx"]
FM["SellersDefineProductFlow.tsx"]
FN["SellersDefineProductFlow.pants-label.spec.tsx"]
FO["SellersDefineProductFlow.spec.tsx"]
FP["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FQ["products"]
subgraph FR["src"]
FS["index.ts"]
subgraph FT["lib"]
FU["SellersProducts.tsx"]
FV["SellersProducts.pants-label.spec.tsx"]
FW["SellersProducts.spec.tsx"]
end
end
end
subgraph FX["seller-orders"]
FY["jest.config.ts"]
FZ["jest.setup.ts"]
subgraph G0["src"]
G1["index.ts"]
subgraph G2["lib"]
G3["seller-orders-screen.tsx"]
G4["seller-orders-screen.pants-size.spec.tsx"]
G5["seller-orders-screen.spec.tsx"]
end
G6["test-setup.ts"]
end
end
subgraph G7["setup-password"]
subgraph G8["src"]
G9["index.ts"]
subgraph GA["lib"]
GB["SellersSetupPassword.tsx"]
end
end
end
subgraph GC["unauthorized"]
subgraph GD["src"]
GE["index.ts"]
subgraph GF["lib"]
GG["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GH["zustand"]
subgraph GI["sellers-products-store"]
subgraph GJ["src"]
GK["index.ts"]
subgraph GL["lib"]
GM["useSellersProductsStore.ts"]
GN["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GO["shared"]
subgraph GP["components"]
subgraph GQ["apollo-provider-base"]
subgraph GR["src"]
GS["index.ts"]
subgraph GT["lib"]
GU["ApolloProviderBase.tsx"]
GV["createSilentRefreshAuthLink.ts"]
GW["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GX["error-boundary"]
subgraph GY["src"]
GZ["index.ts"]
subgraph H0["lib"]
H1["error-boundary.tsx"]
H2["error-boundary.spec.tsx"]
end
end
H3["vite.config.ts"]
end
subgraph H4["glassmorphism-container"]
subgraph H5["src"]
H6["index.ts"]
subgraph H7["lib"]
H8["glassmorphism-container.tsx"]
H9["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HA["layout"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["Layout.tsx"]
end
end
end
subgraph HF["material-data-table"]
subgraph HG["src"]
HH["index.ts"]
subgraph HI["lib"]
HJ["material-data-table.tsx"]
HK["table-config.ts"]
HL["table-utils.ts"]
HM["material-data-table.spec.tsx"]
HN["table-types.ts"]
end
end
end
subgraph HO["order-status-chip"]
subgraph HP["src"]
HQ["index.ts"]
subgraph HR["lib"]
HS["order-status-chip.tsx"]
HT["order-status-chip.spec.tsx"]
end
end
end
subgraph HU["password-field"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["PasswordTextField.tsx"]
end
end
end
subgraph HZ["price-display"]
subgraph I0["src"]
I1["index.ts"]
subgraph I2["lib"]
I3["price-display.tsx"]
I4["price-display.spec.tsx"]
end
end
end
subgraph I5["private-route"]
subgraph I6["src"]
I7["index.ts"]
subgraph I8["lib"]
I9["createPrivateRoute.tsx"]
IA["PrivateRoute.tsx"]
end
end
end
subgraph IB["rtl-table-utils"]
subgraph IC["src"]
ID["index.ts"]
subgraph IE["lib"]
IF["rtl-table-utils.ts"]
IG["rtl-cell-components.tsx"]
IH["rtl-column-helpers.ts"]
II["rtl-table-props.ts"]
IJ["use-table-alignment.ts"]
IK["rtl-table-utils.spec.tsx"]
IL["rtl-table-utils.tsx"]
end
end
end
subgraph IM["snackbar"]
subgraph IN["src"]
IO["index.ts"]
subgraph IP["lib"]
IQ["snackbar.tsx"]
IR["Snackbar.tsx"]
end
end
end
subgraph IS["styled-drawer"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["styled-drawer.tsx"]
IX["styled-drawer.spec.tsx"]
end
end
end
subgraph IY["unauthorized"]
subgraph IZ["src"]
J0["index.ts"]
subgraph J1["lib"]
J2["unauthorized-path.tsx"]
end
end
end
end
subgraph J3["graphql"]
subgraph J4["src"]
J5["index.ts"]
subgraph J6["lib"]
J7["currency.mutations.ts"]
J8["currency.queries.ts"]
J9["fragments.ts"]
JA["variant-colors.ts"]
JB["client-shared-graphql.tsx"]
end
end
end
subgraph JC["hooks"]
subgraph JD["brands"]
subgraph JE["src"]
JF["index.ts"]
subgraph JG["lib"]
JH["brands.graphql.ts"]
JI["useBrands.ts"]
end
end
JJ["vite.config.ts"]
end
subgraph JK["categories"]
subgraph JL["src"]
JM["index.ts"]
subgraph JN["lib"]
JO["useCategories.ts"]
JP["categories.graphql.ts"]
end
end
end
subgraph JQ["colors"]
subgraph JR["src"]
JS["index.ts"]
subgraph JT["lib"]
JU["useColors.ts"]
JV["color.graphql.ts"]
end
end
end
subgraph JW["currency"]
subgraph JX["src"]
JY["index.ts"]
subgraph JZ["lib"]
K0["useConvertPrice.tsx"]
K1["useExchangeRate.tsx"]
K2["useCurrencies.tsx"]
K3["useCurrencyForLocale.tsx"]
K4["useExchangeRate.spec.tsx"]
end
end
end
subgraph K5["products"]
subgraph K6["src"]
K7["index.ts"]
subgraph K8["lib"]
K9["productImage.ts"]
KA["products.graphql.ts"]
KB["useProducts.ts"]
KC["productImage.spec.ts"]
end
end
end
subgraph KD["site-languages"]
subgraph KE["src"]
KF["index.ts"]
subgraph KG["lib"]
KH["site-languages.graphql.ts"]
KI["useSiteLanguages.ts"]
KJ["site-languages-hook.spec.tsx"]
end
end
KK["vite.config.ts"]
end
subgraph KL["snackbar"]
subgraph KM["src"]
KN["index.ts"]
subgraph KO["lib"]
KP["SnackbarContext.tsx"]
KQ["useSnackbar.ts"]
end
end
end
subgraph KR["translations-management-hook"]
subgraph KS["src"]
KT["index.ts"]
subgraph KU["lib"]
KV["useTranslationsManagement.ts"]
end
end
end
end
subgraph KW["lottie"]
subgraph KX["empty-cart"]
subgraph KY["src"]
KZ["index.ts"]
subgraph L0["lib"]
L1["lottie-empty-cart.tsx"]
L2["lottie-empty-cart.spec.tsx"]
end
end
L3["vite.config.ts"]
end
subgraph L4["loading"]
subgraph L5["src"]
L6["index.ts"]
subgraph L7["lib"]
L8["lottie-loading.tsx"]
L9["lottie-loading.spec.tsx"]
end
end
end
subgraph LA["success-check"]
subgraph LB["src"]
LC["index.ts"]
subgraph LD["lib"]
LE["lottie-success-check.tsx"]
LF["lottie-success-check.spec.tsx"]
end
end
end
subgraph LG["unauthorized"]
subgraph LH["src"]
LI["index.ts"]
subgraph LJ["lib"]
LK["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LL["translations"]
subgraph LM["src"]
LN["index.ts"]
subgraph LO["lib"]
LP["mapApolloErrorToTranslationKey.ts"]
LQ["WrapTranslation.tsx"]
end
end
end
subgraph LR["ui"]
subgraph LS["colors"]
subgraph LT["src"]
LU["index.ts"]
subgraph LV["lib"]
LW["colors.ts"]
end
end
end
subgraph LX["language-components"]
subgraph LY["src"]
LZ["index.ts"]
subgraph M0["lib"]
M1["language-components.tsx"]
M2["ltr-text-field.tsx"]
end
end
end
subgraph M3["sizes"]
subgraph M4["src"]
M5["index.ts"]
subgraph M6["lib"]
M7["sizes.ts"]
M8["sizes.spec.tsx"]
M9["sizes.tsx"]
end
end
end
end
subgraph MA["zustand"]
subgraph MB["shared-auth-store"]
subgraph MC["src"]
MD["index.ts"]
subgraph ME["lib"]
MF["shared-auth-store.ts"]
end
end
end
subgraph MG["shared-notification-store"]
subgraph MH["src"]
MI["index.ts"]
subgraph MJ["lib"]
MK["shared-notification-store.tsx"]
end
end
end
subgraph ML["shared-ui-store"]
subgraph MM["src"]
MN["index.ts"]
subgraph MO["lib"]
MP["shared-ui-store.ts"]
MQ["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MR["server"]
subgraph MS["controllers"]
subgraph MT["src"]
MU["index.ts"]
subgraph MV["lib"]
MW["auth.controller.ts"]
MX["order.controller.ts"]
end
end
end
subgraph MY["decorators"]
MZ["jest.config.ts"]
subgraph N0["src"]
N1["index.ts"]
subgraph N2["lib"]
N3["current-user.decorator.ts"]
N4["decorators.ts"]
N5["decorators.spec.ts"]
end
end
end
subgraph N6["entities"]
subgraph N7["src"]
N8["index.ts"]
subgraph N9["lib"]
NA["brand.entity.ts"]
NB["product.entity.ts"]
NC["category.entity.ts"]
ND["product-description.entity.ts"]
NE["site-language.entity.ts"]
NF["product-info.entity.ts"]
NG["color.entity.ts"]
NH["product-info-color.entity.ts"]
NI["seller-info.entity.ts"]
NJ["seller-product.entity.ts"]
NK["user.entity.ts"]
NL["cart.entity.ts"]
NM["currency-preference.entity.ts"]
NN["currency.entity.ts"]
NO["customer.entity.ts"]
NP["exchange-rate.entity.ts"]
NQ["order.entity.ts"]
NR["platform-settings.entity.ts"]
NS["refresh-token.entity.ts"]
NT["seller-order.entity.ts"]
NU["translation.entity.ts"]
end
end
end
subgraph NV["guards"]
NW["jest.config.ts"]
subgraph NX["src"]
NY["index.ts"]
subgraph NZ["lib"]
O0["catalog.guard.ts"]
O1["graphql-auth.guard.ts"]
O2["http-auth.guard.ts"]
O3["roles.guard.ts"]
O4["catalog.guard.spec.ts"]
O5["roles.guard.spec.ts"]
end
end
end
subgraph O6["inputs"]
subgraph O7["src"]
O8["index.ts"]
subgraph O9["lib"]
OA["brand.input.ts"]
OB["cart.inputs.ts"]
OC["category.input.ts"]
OD["color.input.ts"]
OE["customer-auth.inputs.ts"]
OF["order-pagination.inputs.ts"]
OG["order.inputs.ts"]
OH["product-info-filter.input.ts"]
OI["product.input.ts"]
OJ["seller-order-pagination.inputs.ts"]
OK["seller.input.ts"]
OL["site-language.input.ts"]
OM["user.input.ts"]
end
end
end
subgraph ON["modules"]
subgraph OO["src"]
OP["index.ts"]
subgraph OQ["lib"]
OR["auth.module.ts"]
OS["email.module.ts"]
OT["token.module.ts"]
OU["user.module.ts"]
OV["customer-profile.module.ts"]
OW["brand.module.ts"]
OX["catalog-guard.module.ts"]
OY["translation.module.ts"]
OZ["cart.module.ts"]
P0["platform-settings.module.ts"]
P1["category.module.ts"]
P2["product.module.ts"]
P3["color.module.ts"]
P4["currency.module.ts"]
P5["graphql-context.module.ts"]
P6["order.module.ts"]
P7["seller-info.module.ts"]
P8["payment.module.ts"]
P9["product-info.module.ts"]
PA["seller-products.module.ts"]
PB["site-language.module.ts"]
end
end
end
subgraph PC["resolvers"]
PD["jest.config.ts"]
subgraph PE["src"]
PF["index.ts"]
subgraph PG["lib"]
PH["auth.resolver.ts"]
PI["brand.resolver.ts"]
PJ["cart.resolver.ts"]
PK["category.resolver.ts"]
PL["color.resolver.ts"]
PM["currency.resolver.ts"]
PN["customer-profile.resolver.ts"]
PO["order.resolver.ts"]
PP["payment.resolver.ts"]
PQ["product-info.resolver.ts"]
PR["product.resolver.ts"]
PS["seller-info.resolver.ts"]
PT["shipping.resolver.ts"]
PU["site-language.resolver.ts"]
PV["translation.input.ts"]
PW["translation.resolver.ts"]
PX["user.resolver.ts"]
PY["auth.resolver.spec.ts"]
PZ["order.resolver.spec.ts"]
Q0["payment.resolver.integration.spec.ts"]
Q1["payment.resolver.spec.ts"]
Q2["product-info.resolver.spec.ts"]
Q3["translation.resolver.guards.spec.ts"]
subgraph Q4["types"]
Q5["graphql-upload.d.ts"]
end
Q6["user.resolver.spec.ts"]
end
end
end
subgraph Q7["services"]
Q8["jest.config.ts"]
subgraph Q9["src"]
QA["index.ts"]
subgraph QB["lib"]
QC["auth.service.ts"]
QD["brand.service.ts"]
QE["cart.service.ts"]
QF["product-info-colors.util.ts"]
QG["category.service.ts"]
QH["color.service.ts"]
QI["currency.service.ts"]
QJ["customer-profile.service.ts"]
QK["email.service.ts"]
QL["image-upload.service.ts"]
QM["order.service.ts"]
QN["payment-logger.service.ts"]
QO["payment.service.ts"]
QP["product.service.ts"]
QQ["seller-info.service.ts"]
QR["shipping-calculation.service.ts"]
QS["site-language.service.ts"]
QT["token.service.ts"]
QU["translation.service.ts"]
QV["user.service.ts"]
QW["auth.service.password-policy.spec.ts"]
QX["auth.service.spec.ts"]
QY["cart.service.add-quantity.spec.ts"]
QZ["cart.service.spec.ts"]
R0["order.service.spec.ts"]
R1["product-info-colors.util.spec.ts"]
R2["product.service.pants.spec.ts"]
R3["product.service.spec.ts"]
R4["relay-connection.spec.ts"]
R5["seller-info.service.price-validation.spec.ts"]
R6["shipping-calculation.service.spec.ts"]
R7["token.service.spec.ts"]
end
end
end
subgraph R8["strategies"]
subgraph R9["src"]
RA["index.ts"]
subgraph RB["lib"]
RC["local.strategy.ts"]
end
end
end
subgraph RD["utils"]
subgraph RE["src"]
RF["index.ts"]
subgraph RG["lib"]
RH["email-templates.ts"]
RI["relay-connection.ts"]
RJ["pagination.ts"]
end
end
end
end
subgraph RK["shared"]
subgraph RL["codegen"]
RM["jest.config.ts"]
subgraph RN["src"]
RO["index.ts"]
subgraph RP["lib"]
subgraph RQ["generated"]
RR["graphql.ts"]
end
end
end
end
subgraph RS["graphql-schema"]
RT["jest.config.ts"]
subgraph RU["src"]
RV["index.ts"]
end
end
subgraph RW["product-sizes"]
subgraph RX["src"]
RY["index.ts"]
subgraph RZ["lib"]
S0["product-sizes.ts"]
S1["product-sizes.pants-formats.spec.ts"]
S2["product-sizes.pants-label.spec.ts"]
S3["product-sizes.pants-strict.spec.ts"]
S4["product-sizes.spec.ts"]
end
end
end
subgraph S5["shared-i18n"]
subgraph S6["src"]
S7["index.ts"]
subgraph S8["lib"]
S9["language-context.tsx"]
SA["language-detector.ts"]
subgraph SB["locales"]
SC["i18n-react.tsx"]
SD["i18n-util.ts"]
SE["i18n-util.async.ts"]
subgraph SF["en"]
SG["index.ts"]
end
subgraph SI["fa"]
SJ["index.ts"]
end
SK["formatters.ts"]
SL["i18n-types.ts"]
SM["i18n-util.sync.ts"]
SN["navigator-detector.ts"]
end
SH["site-name.ts"]
SO["table-localization.ts"]
SP["theme-provider.tsx"]
SQ["use-page-title.ts"]
end
end
end
end
end
5-->6
7-->6
8-->6
9-->4
9-->6
G-->I
J-->I
M-->O
P-->O
S-->U
S-->V
U-->V
W-->U
Z-->10
10-->12
13-->12
16-->18
16-->19
16-->1A
16-->1B
16-->1E
1B-->1C
1C-->1D
1E-->18
1F-->1C
1F-->1B
1H-->1D
1I-->18
1J-->19
1K-->1E
1Q-->1S
1T-->1S
1U-->1S
1X-->1Z
23-->25
23-->26
26-->25
27-->26
2B-->2D
2E-->2D
2H-->2J
2J-->2K
2L-->2J
2O-->2Q
2R-->2Q
2U-->2V
2V-->2X
2Y-->2X
32-->33
33-->35
36-->35
37-->35
3A-->3C
3D-->3C
3G-->3I
3J-->3I
3N-->3P
3Q-->3P
3T-->3U
3U-->3W
3X-->3W
3Y-->3W
42-->43
43-->45
45-->46
45-->48
46-->47
49-->45
4A-->48
4F-->4G
4G-->4I
4J-->4I
4N-->4P
4P-->4Q
4T-->4U
4U-->4W
4X-->4W
51-->52
52-->54
55-->54
5A-->5C
5A-->5D
5C-->5D
5E-->5C
5H-->5J
5K-->5J
5N-->5P
5N-->5Q
5P-->5Q
5R-->5P
5S-->5Q
5V-->5X
5Y-->5X
5Z-->5X
64-->66
67-->66
6A-->6C
6A-->6D
6A-->6E
6A-->6H
6E-->6F
6F-->6G
6M-->6O
6M-->6P
6M-->6Q
6M-->6R
6S-->6P
6X-->6Z
6X-->70
6X-->71
72-->70
73-->6Z
76-->78
7B-->7D
7G-->7I
7G-->7J
7I-->7J
7K-->7I
7L-->7J
7O-->7Q
7R-->7Q
7V-->7X
7Y-->7X
82-->84
87-->89
8A-->89
8E-->8G
8J-->8L
8M-->8L
8N-->8L
8Q-->8S
8V-->8X
8V-->8Y
8V-->8Z
8X-->8Y
8Y-->8Z
90-->8X
93-->95
98-->9A
9B-->9A
9E-->9G
9H-->9G
9I-->9G
9M-->9O
9P-->9O
9Q-->9O
9T-->9V
9W-->9V
9Z-->A1
A2-->A1
A6-->A8
A9-->A8
AD-->AF
AD-->AO
AD-->AI
AD-->AN
AF-->AH
AF-->AJ
AF-->AK
AF-->AL
AF-->AM
AF-->AI
AF-->AN
AH-->AI
AO-->AI
AP-->AL
AP-->AF
AP-->AI
AQ-->AR
AQ-->AL
AQ-->AF
AQ-->AO
AQ-->AI
AS-->AO
AT-->AI
AV-->AI
AZ-->B1
B2-->B1
B5-->B7
B8-->B7
BC-->BE
BF-->BE
BJ-->BL
BM-->BL
BN-->BL
BR-->BT
BU-->BT
BX-->BZ
C0-->BZ
C4-->C6
CA-->CC
CF-->CH
CI-->CH
CI-->CJ
CN-->CP
CQ-->CP
CU-->CW
CX-->CW
D1-->D3
D4-->D3
D6-->D8
DD-->DF
DG-->DF
DJ-->DL
DO-->DQ
DO-->DR
DQ-->DR
DV-->DX
DY-->DX
E1-->E3
E1-->E4
E1-->E5
E1-->E8
E5-->E6
E6-->E7
E8-->E3
E8-->E9
EG-->EI
EI-->EJ
EM-->EO
ER-->ET
ER-->EU
EX-->EZ
F2-->F4
F8-->FA
FB-->FA
FE-->FG
FJ-->FL
FL-->FM
FN-->FM
FO-->FM
FP-->FL
FS-->FU
FV-->FU
FW-->FU
G1-->G3
G4-->G3
G5-->G3
G9-->GB
GE-->GG
GK-->GM
GS-->GU
GS-->GV
GW-->GV
GZ-->H1
H2-->H1
H6-->H8
H9-->H8
HC-->HE
HH-->HJ
HH-->HK
HH-->HL
HJ-->HK
HM-->HJ
HQ-->HS
HT-->HS
HW-->HY
I1-->I3
I4-->I3
I7-->I9
I9-->IA
ID-->IF
IF-->IG
IF-->IH
IF-->II
IF-->IJ
IH-->IG
IH-->II
IK-->IL
IO-->IQ
IU-->IW
IX-->IW
J0-->J2
J5-->J7
J5-->J8
J5-->J9
J5-->JA
JF-->JH
JF-->JI
JI-->JH
JM-->JO
JO-->JP
JS-->JU
JU-->JV
JY-->K0
JY-->K2
JY-->K3
JY-->K1
K0-->K1
K4-->K1
K7-->K9
K7-->KA
K7-->KB
KB-->KA
KC-->K9
KF-->KH
KF-->KI
KI-->KH
KJ-->KI
KN-->KP
KN-->KQ
KQ-->KP
KT-->KV
KZ-->L1
L2-->L1
L6-->L8
L9-->L8
LC-->LE
LF-->LE
LI-->LK
LN-->LP
LU-->LW
LZ-->M1
LZ-->M2
M5-->M7
M8-->M9
MD-->MF
MI-->MK
MN-->MP
MU-->MW
MU-->MX
N1-->N3
N1-->N4
N5-->N4
N8-->NA
N8-->NL
N8-->NC
N8-->NG
N8-->NM
N8-->NN
N8-->NO
N8-->NP
N8-->NQ
N8-->NR
N8-->ND
N8-->NH
N8-->NF
N8-->NB
N8-->NS
N8-->NI
N8-->NT
N8-->NJ
N8-->NE
N8-->NU
N8-->NK
NA-->NB
NB-->NA
NB-->NC
NB-->ND
NB-->NF
NB-->NI
NB-->NJ
NC-->NB
ND-->NB
ND-->NE
NE-->ND
NF-->NG
NF-->NH
NF-->NB
NH-->NG
NH-->NF
NI-->NJ
NI-->NK
NJ-->NF
NJ-->NB
NJ-->NI
NL-->NB
NL-->NK
NM-->NN
NO-->NK
NP-->NN
NP-->NK
NQ-->NB
NQ-->NI
NS-->NK
NT-->NQ
NY-->O0
NY-->O1
NY-->O2
NY-->O3
O4-->O0
O5-->O3
O8-->OA
O8-->OB
O8-->OC
O8-->OD
O8-->OE
O8-->OF
O8-->OG
O8-->OH
O8-->OI
O8-->OJ
O8-->OK
O8-->OL
O8-->OM
OI-->OH
OP-->OR
OP-->OW
OP-->OZ
OP-->OX
OP-->P1
OP-->P3
OP-->P4
OP-->OV
OP-->OS
OP-->P5
OP-->P6
OP-->P8
OP-->P0
OP-->P9
OP-->P2
OP-->P7
OP-->PA
OP-->PB
OP-->OT
OP-->OY
OP-->OU
OR-->OS
OR-->OT
OR-->OU
OU-->OR
OU-->OV
OW-->OX
OW-->OY
OZ-->P0
P1-->OX
P1-->P2
P1-->OY
P2-->OX
P2-->OT
P2-->OY
P3-->OX
P3-->OY
P5-->OS
P5-->OT
P5-->OU
P6-->P0
P6-->P7
P7-->P2
P7-->OT
P7-->OU
P8-->P6
P9-->P2
P9-->OY
PA-->P7
PA-->OU
PF-->PH
PF-->PI
PF-->PJ
PF-->PK
PF-->PL
PF-->PM
PF-->PN
PF-->PO
PF-->PP
PF-->PQ
PF-->PR
PF-->PS
PF-->PT
PF-->PU
PF-->PV
PF-->PW
PF-->PX
PY-->PH
PZ-->PO
Q0-->PP
Q1-->PP
Q2-->PQ
Q3-->PW
Q6-->PX
QA-->QC
QA-->QD
QA-->QE
QA-->QG
QA-->QH
QA-->QI
QA-->QJ
QA-->QK
QA-->QL
QA-->QM
QA-->QN
QA-->QO
QA-->QF
QA-->QP
QA-->QQ
QA-->QR
QA-->QS
QA-->QT
QA-->QU
QA-->QV
QE-->QF
QP-->QF
QQ-->QF
QW-->QC
QW-->QK
QW-->QT
QW-->QV
QX-->QC
QX-->QK
QX-->QT
QX-->QV
QY-->QE
QZ-->QE
R0-->QM
R1-->QF
R2-->QP
R2-->QU
R3-->QP
R3-->QU
R5-->QC
R5-->QQ
R6-->QR
R7-->QT
RA-->RC
RF-->RH
RF-->RI
RO-->RR
RY-->S0
S1-->S0
S2-->S0
S3-->S0
S4-->S0
S7-->S9
S7-->SA
S7-->SC
S7-->SL
S7-->SD
S7-->SE
S7-->SM
S7-->SN
S7-->SH
S7-->SO
S7-->SP
S7-->SQ
S9-->SA
S9-->SC
S9-->SE
SC-->SD
SE-->SG
SE-->SJ
SE-->SK
SE-->SD
SG-->SH
SJ-->SH
SM-->SG
SM-->SJ
SM-->SK
SM-->SD
SO-->SC
SP-->S9
SQ-->SC
