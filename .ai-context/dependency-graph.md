flowchart LR

subgraph 0["apps"]
subgraph 1["kickzone-api"]
subgraph 2["src"]
subgraph 3["app"]
4["app.module.ts"]
5["global-validation-pipe.spec.ts"]
6["global-validation-pipe.ts"]
end
7["main.ts"]
end
end
end
subgraph 8["libs"]
subgraph 9["client"]
subgraph A["admins"]
subgraph B["components"]
subgraph C["footer"]
subgraph D["src"]
E["index.ts"]
subgraph F["lib"]
G["admins-footer.tsx"]
H["admins-footer.spec.tsx"]
end
end
end
subgraph I["headerbar"]
subgraph J["src"]
K["index.ts"]
subgraph L["lib"]
M["AdminsHeaderbar.tsx"]
N["AdminsHeaderbar.spec.tsx"]
end
end
end
subgraph O["layout"]
subgraph P["src"]
Q["index.ts"]
subgraph R["lib"]
S["AdminsLayout.tsx"]
T["AdminsTabbar.tsx"]
U["AdminsLayout.spec.tsx"]
end
end
end
end
subgraph V["contexts"]
subgraph W["src"]
X["index.spec.tsx"]
Y["index.ts"]
subgraph Z["lib"]
10["AdminsAuthContext.tsx"]
11["AdminsAuthContext.spec.tsx"]
end
end
end
subgraph 12["graphql"]
subgraph 13["src"]
14["index.ts"]
subgraph 15["lib"]
16["fragments.ts"]
17["mutations.ts"]
18["orders.graphql.ts"]
19["Provider.tsx"]
1A["AdminsApolloProvider.tsx"]
1B["client.ts"]
1C["queries.ts"]
1D["Provider.spec.tsx"]
1E["apollo-upload-client.d.ts"]
1F["client.spec.tsx"]
1G["fragments.spec.tsx"]
1H["mutations.spec.tsx"]
1I["queries.spec.tsx"]
end
subgraph 1J["types"]
1K["apollo-upload-client.d.ts"]
end
end
end
subgraph 1L["hooks"]
subgraph 1M["auth"]
subgraph 1N["src"]
1O["index.ts"]
subgraph 1P["lib"]
1Q["useAdminLogin.ts"]
1R["useAdminLogin.spec.ts"]
1S["useAdminLogin.spec.tsx"]
end
end
end
subgraph 1T["currency-management"]
subgraph 1U["src"]
1V["index.ts"]
subgraph 1W["lib"]
1X["useAdminsCurrencyManagement.ts"]
end
end
1Y["vite.config.ts"]
end
subgraph 1Z["customers"]
subgraph 20["src"]
21["index.ts"]
subgraph 22["lib"]
23["adminsCustomers.graphql.ts"]
24["useAdminsCustomers.ts"]
25["useAdminsCustomers.spec.tsx"]
end
end
26["vite.config.ts"]
end
subgraph 27["orders"]
subgraph 28["src"]
29["index.ts"]
subgraph 2A["lib"]
2B["admins-orders-hook.tsx"]
2C["admins-orders-hook.spec.tsx"]
end
end
end
subgraph 2D["sellers"]
subgraph 2E["src"]
2F["index.ts"]
subgraph 2G["lib"]
2H["useAdminsSellers.ts"]
2I["adminsSellers.graphql.ts"]
2J["useAdminsSellers.spec.tsx"]
end
end
end
end
subgraph 2K["router"]
subgraph 2L["src"]
2M["index.ts"]
subgraph 2N["lib"]
2O["AdminsRouter.tsx"]
2P["AdminsRouter.spec.tsx"]
end
end
end
subgraph 2Q["routes"]
subgraph 2R["src"]
2S["index.spec.ts"]
2T["index.ts"]
subgraph 2U["lib"]
2V["admin-routes.ts"]
2W["admin-routes.spec.ts"]
end
end
end
subgraph 2X["screens"]
subgraph 2Y["admin-seller-orders"]
subgraph 2Z["src"]
30["index.spec.tsx"]
31["index.ts"]
subgraph 32["lib"]
33["admin-seller-orders.tsx"]
34["admin-seller-orders.pants-size.spec.tsx"]
35["admin-seller-orders.spec.tsx"]
end
end
end
subgraph 36["currency-management"]
subgraph 37["src"]
38["index.ts"]
subgraph 39["lib"]
3A["currency-management.tsx"]
3B["currency-management.spec.tsx"]
end
end
end
subgraph 3C["customer-management"]
subgraph 3D["src"]
3E["index.ts"]
subgraph 3F["lib"]
3G["admin-customer-management.tsx"]
3H["admin-customer-management.spec.tsx"]
end
end
3I["vite.config.ts"]
end
subgraph 3J["login"]
subgraph 3K["src"]
3L["index.ts"]
subgraph 3M["lib"]
3N["AdminsLogin.tsx"]
3O["AdminsLogin.spec.tsx"]
end
end
end
subgraph 3P["product-editor"]
subgraph 3Q["src"]
3R["index.spec.tsx"]
3S["index.ts"]
subgraph 3T["lib"]
3U["AdminProductEditor.tsx"]
3V["AdminProductEditor.pants-range.spec.tsx"]
3W["AdminProductEditor.spec.tsx"]
end
3X["vite-env.d.ts"]
end
end
subgraph 3Y["products"]
subgraph 3Z["src"]
40["index.spec.tsx"]
41["index.ts"]
subgraph 42["lib"]
43["AdminProducts.tsx"]
44["adminProducts.hooks.ts"]
45["adminProducts.graphql.ts"]
46["ProductImageManagementModal.tsx"]
47["AdminProducts.spec.tsx"]
48["ProductImageManagementModal.pants-size.spec.tsx"]
49["ProductImageManagementModal.spec.tsx"]
end
4A["vite-env.d.ts"]
end
end
subgraph 4B["seller-management"]
subgraph 4C["src"]
4D["index.spec.tsx"]
4E["index.ts"]
subgraph 4F["lib"]
4G["SellerManagement.tsx"]
4H["SellerManagement.spec.tsx"]
end
4I["vite-env.d.ts"]
end
end
subgraph 4J["translation-management"]
subgraph 4K["src"]
4L["index.ts"]
subgraph 4M["lib"]
4N["AdminTranslationManagement.tsx"]
4O["TranslateToOtherLanguagesButton.tsx"]
end
end
end
subgraph 4P["unauthorized"]
subgraph 4Q["src"]
4R["index.spec.tsx"]
4S["index.ts"]
subgraph 4T["lib"]
4U["admins-unauthorized-screen.tsx"]
4V["admins-unauthorized-screen.spec.tsx"]
end
end
end
end
subgraph 4W["zustand"]
subgraph 4X["admins-products-store"]
subgraph 4Y["src"]
4Z["index.spec.ts"]
50["index.ts"]
subgraph 51["lib"]
52["admins-products-store.ts"]
53["admins-products-store.spec.ts"]
end
end
end
end
end
subgraph 54["customers"]
subgraph 55["components"]
subgraph 56["footer"]
subgraph 57["src"]
58["index.ts"]
subgraph 59["lib"]
5A["customers-footer.tsx"]
5B["TrustBadgeIcons.tsx"]
5C["customers-footer.spec.tsx"]
end
end
end
subgraph 5D["headerbar"]
subgraph 5E["src"]
5F["index.ts"]
subgraph 5G["lib"]
5H["CustomersHeaderbar.tsx"]
5I["CustomersHeaderbar.spec.tsx"]
end
end
end
subgraph 5J["layout"]
subgraph 5K["src"]
5L["index.ts"]
subgraph 5M["lib"]
5N["CustomersLayout.tsx"]
5O["CustomersTabbar.tsx"]
5P["CustomersLayout.spec.tsx"]
5Q["CustomersTabbar.spec.tsx"]
end
end
end
subgraph 5R["product-card"]
subgraph 5S["src"]
5T["index.ts"]
subgraph 5U["lib"]
5V["CustomersProductCard.tsx"]
5W["CustomersProductCard.pants-size.spec.tsx"]
5X["CustomersProductCard.spec.tsx"]
end
5Y["vite-env.d.ts"]
end
end
end
subgraph 5Z["contexts"]
subgraph 60["auth"]
subgraph 61["src"]
62["index.ts"]
subgraph 63["lib"]
64["CustomersAuthContext.tsx"]
65["CustomersAuthContext.spec.tsx"]
end
end
end
end
subgraph 66["graphql"]
subgraph 67["src"]
68["index.ts"]
subgraph 69["lib"]
6A["customer-profile.queries.ts"]
6B["mutations.ts"]
6C["Provider.tsx"]
6D["CustomersApolloProvider.tsx"]
6E["client.ts"]
6F["queries.ts"]
6G["apollo-upload-client.d.ts"]
end
end
end
subgraph 6H["hooks"]
subgraph 6I["auth"]
subgraph 6J["src"]
6K["index.ts"]
subgraph 6L["lib"]
6M["useCustomersForgotPassword.tsx"]
6N["useCustomersLogin.tsx"]
6O["useCustomersRegister.tsx"]
6P["useCustomersResetPassword.tsx"]
6Q["useCustomersLogin.spec.tsx"]
end
end
end
subgraph 6R["cart"]
6S["jest.config.ts"]
6T["jest.setup.ts"]
subgraph 6U["src"]
6V["index.ts"]
subgraph 6W["lib"]
6X["customers-cart-hook.tsx"]
6Y["useCartService.ts"]
6Z["useWishlistSync.ts"]
70["useCartService.spec.tsx"]
71["useCartSync.ts"]
end
end
end
subgraph 72["orders"]
subgraph 73["src"]
74["index.ts"]
subgraph 75["lib"]
76["customers-orders-hook.tsx"]
end
end
end
subgraph 77["products"]
subgraph 78["src"]
79["index.ts"]
subgraph 7A["lib"]
7B["customers-product-hook.tsx"]
end
end
end
end
subgraph 7C["router"]
subgraph 7D["src"]
7E["index.ts"]
subgraph 7F["lib"]
7G["CustomersRouter.tsx"]
7H["ScrollToTop.tsx"]
7I["CustomersRouter.spec.tsx"]
7J["ScrollToTop.spec.tsx"]
end
end
end
subgraph 7K["routes"]
subgraph 7L["src"]
7M["index.ts"]
subgraph 7N["lib"]
7O["customer-routes.ts"]
7P["customer-routes.spec.ts"]
end
end
end
subgraph 7Q["screens"]
subgraph 7R["contact"]
subgraph 7S["src"]
7T["index.ts"]
subgraph 7U["lib"]
7V["customer-contact.tsx"]
7W["customer-contact.spec.tsx"]
end
end
7X["vite.config.ts"]
end
subgraph 7Y["customer-checkout"]
subgraph 7Z["src"]
80["index.ts"]
subgraph 81["lib"]
82["customer-checkout.tsx"]
end
end
end
subgraph 83["customer-favorites"]
subgraph 84["src"]
85["index.ts"]
subgraph 86["lib"]
87["customer-favorites.tsx"]
88["customer-favorites.spec.tsx"]
end
end
89["vite.config.ts"]
end
subgraph 8A["customer-login"]
subgraph 8B["src"]
8C["index.ts"]
subgraph 8D["lib"]
8E["customer-login.tsx"]
end
end
end
subgraph 8F["customer-order-confirmation"]
subgraph 8G["src"]
8H["index.ts"]
subgraph 8I["lib"]
8J["customer-order-confirmation.tsx"]
8K["customer-order-confirmation.pants-size.spec.tsx"]
8L["customer-order-confirmation.spec.tsx"]
end
end
end
subgraph 8M["customer-orders"]
subgraph 8N["src"]
8O["index.ts"]
subgraph 8P["lib"]
8Q["customer-orders.tsx"]
end
end
end
subgraph 8R["customer-payment"]
subgraph 8S["src"]
8T["index.ts"]
subgraph 8U["lib"]
8V["customer-payment-callback.tsx"]
8W["use-zarinpal-payment.tsx"]
8X["zarinpal-payment-service.ts"]
8Y["customer-payment-callback.spec.tsx"]
end
end
end
subgraph 8Z["customer-products"]
subgraph 90["src"]
91["index.ts"]
subgraph 92["lib"]
93["customer-products.tsx"]
end
end
end
subgraph 94["customer-profile"]
subgraph 95["src"]
96["index.ts"]
subgraph 97["lib"]
98["customer-profile.tsx"]
99["customer-profile.spec.tsx"]
end
end
end
subgraph 9A["customer-shopping-cart"]
subgraph 9B["src"]
9C["index.ts"]
subgraph 9D["lib"]
9E["customer-shopping-cart.tsx"]
9F["customer-shopping-cart.pants-size.spec.tsx"]
9G["customer-shopping-cart.spec.tsx"]
end
end
9H["vite.config.ts"]
end
subgraph 9I["customer-signup"]
subgraph 9J["src"]
9K["index.ts"]
subgraph 9L["lib"]
9M["customer-signup.tsx"]
9N["customer-signup.password-length.spec.tsx"]
9O["customer-signup.spec.tsx"]
end
end
end
subgraph 9P["forgot-password"]
subgraph 9Q["src"]
9R["index.ts"]
subgraph 9S["lib"]
9T["customer-forgot-password.tsx"]
9U["customer-forgot-password.spec.tsx"]
end
end
end
subgraph 9V["guide-authenticity"]
subgraph 9W["src"]
9X["index.ts"]
subgraph 9Y["lib"]
9Z["customer-guide-authenticity.tsx"]
A0["customer-guide-authenticity.spec.tsx"]
end
end
A1["vite.config.ts"]
end
subgraph A2["guide-payment"]
subgraph A3["src"]
A4["index.ts"]
subgraph A5["lib"]
A6["customer-guide-payment.tsx"]
A7["customer-guide-payment.spec.tsx"]
end
end
A8["vite.config.ts"]
end
subgraph A9["home"]
subgraph AA["src"]
AB["index.ts"]
subgraph AC["lib"]
AD["CustomersHomeScreen.tsx"]
subgraph AE["components"]
AF["CategoryBentoSection.tsx"]
AH["HeroSection.tsx"]
AI["HomeLoadingScreen.tsx"]
AJ["PicksRailSection.tsx"]
AK["TrustStripSection.tsx"]
AP["NewArrivalsSection.tsx"]
AR["BrandBlocksSection.tsx"]
AS["NewsletterSection.tsx"]
AT["ShopTheLookSection.tsx"]
AU["TickerSection.tsx"]
end
AG["home-selectors.ts"]
AL["useScrollProgress.ts"]
AM["CustomersShopScreen.tsx"]
AN["CustomersHomeScreen.cart-size.spec.tsx"]
AO["CustomersHomeScreen.spec.tsx"]
AQ["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph AV["login"]
subgraph AW["src"]
AX["index.ts"]
subgraph AY["lib"]
AZ["CustomersLoginScreen.tsx"]
B0["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph B1["not-found"]
subgraph B2["src"]
B3["index.ts"]
subgraph B4["lib"]
B5["customer-not-found.tsx"]
B6["customer-not-found.spec.tsx"]
end
end
B7["vite.config.ts"]
end
subgraph B8["privacy-policy"]
subgraph B9["src"]
BA["index.ts"]
subgraph BB["lib"]
BC["customer-privacy-policy.tsx"]
BD["customer-privacy-policy.spec.tsx"]
end
end
BE["vite.config.ts"]
end
subgraph BF["product-details"]
subgraph BG["src"]
BH["index.ts"]
subgraph BI["lib"]
BJ["customer-product-details.tsx"]
BK["customer-product-details.pants-size.spec.tsx"]
BL["customer-product-details.spec.tsx"]
end
end
BM["vite.config.ts"]
end
subgraph BN["reset-password"]
subgraph BO["src"]
BP["index.ts"]
subgraph BQ["lib"]
BR["customer-reset-password.tsx"]
BS["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph BT["shipping-returns"]
subgraph BU["src"]
BV["index.ts"]
subgraph BW["lib"]
BX["customer-shipping-returns.tsx"]
BY["customer-shipping-returns.spec.tsx"]
end
end
BZ["vite.config.ts"]
end
subgraph C0["unauthorized"]
subgraph C1["src"]
C2["index.ts"]
subgraph C3["lib"]
C4["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph C5["utility"]
subgraph C6["test"]
subgraph C7["src"]
C8["index.ts"]
subgraph C9["lib"]
CA["customers-test-utility.tsx"]
end
end
end
end
subgraph CB["validations"]
subgraph CC["src"]
CD["index.ts"]
subgraph CE["lib"]
CF["shipping-validation.ts"]
CG["shipping-validation.spec.tsx"]
CH["shipping-validation.tsx"]
end
end
end
subgraph CI["zustand"]
subgraph CJ["customer-cart-store"]
subgraph CK["src"]
CL["index.ts"]
subgraph CM["lib"]
CN["customer-cart-store.ts"]
CO["customer-cart-store.spec.ts"]
CP["customer-cart-store.tsx"]
end
end
end
subgraph CQ["customer-checkout-store"]
subgraph CR["src"]
CS["index.ts"]
subgraph CT["lib"]
CU["customer-checkout-store.ts"]
CV["customer-checkout-store.spec.ts"]
end
end
CW["vite.config.ts"]
end
subgraph CX["customer-wishlist-store"]
subgraph CY["src"]
CZ["index.ts"]
subgraph D0["lib"]
D1["customer-wishlist-store.ts"]
D2["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D3["src"]
D4["index.ts"]
subgraph D5["lib"]
D6["customers-products-store.tsx"]
end
end
end
end
subgraph D7["sellers"]
subgraph D8["components"]
subgraph D9["footer"]
subgraph DA["src"]
DB["index.ts"]
subgraph DC["lib"]
DD["sellers-footer.tsx"]
DE["sellers-footer.spec.tsx"]
end
end
end
subgraph DF["headerbar"]
subgraph DG["src"]
DH["index.ts"]
subgraph DI["lib"]
DJ["SellersHeaderbar.tsx"]
end
end
end
subgraph DK["layout"]
subgraph DL["src"]
DM["index.ts"]
subgraph DN["lib"]
DO["SellersLayout.tsx"]
DP["SellersTabbar.tsx"]
end
end
end
end
subgraph DQ["contexts"]
subgraph DR["auth"]
subgraph DS["src"]
DT["index.ts"]
subgraph DU["lib"]
DV["SellersAuthContext.tsx"]
DW["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph DX["graphql"]
subgraph DY["src"]
DZ["index.ts"]
subgraph E0["lib"]
E1["fragments.ts"]
E2["mutations.ts"]
E3["Provider.tsx"]
E4["SellersApolloProvider.tsx"]
E5["client.ts"]
E6["queries.ts"]
E7["seller-orders.graphql.ts"]
E8["apollo-upload-client.d.ts"]
end
subgraph E9["types"]
EA["apollo-upload-client.d.ts"]
end
end
end
subgraph EB["hooks"]
subgraph EC["auth"]
subgraph ED["src"]
EE["index.ts"]
subgraph EF["lib"]
EG["useSellerAuth.ts"]
EH["sellerAuth.graphql.ts"]
end
end
end
subgraph EI["orders"]
subgraph EJ["src"]
EK["index.ts"]
subgraph EL["lib"]
EM["useSellerOrders.ts"]
end
end
end
subgraph EN["products"]
subgraph EO["src"]
EP["index.ts"]
subgraph EQ["lib"]
ER["useSellersProductManagement.ts"]
ES["useSellersProducts.ts"]
end
end
end
end
subgraph ET["router"]
subgraph EU["src"]
EV["index.ts"]
subgraph EW["lib"]
EX["SellersRouter.tsx"]
end
end
end
subgraph EY["routes"]
subgraph EZ["src"]
F0["index.ts"]
subgraph F1["lib"]
F2["seller-routes.ts"]
end
end
end
subgraph F3["screens"]
subgraph F4["catalog"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["SellersCatalogScreens.tsx"]
F9["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FA["login"]
subgraph FB["src"]
FC["index.ts"]
subgraph FD["lib"]
FE["SellersLogin.tsx"]
end
end
end
subgraph FF["manage-product"]
subgraph FG["src"]
FH["index.ts"]
subgraph FI["lib"]
FJ["SellersManageProductScreen.tsx"]
FK["SellersDefineProductFlow.tsx"]
FL["SellersDefineProductFlow.pants-label.spec.tsx"]
FM["SellersDefineProductFlow.spec.tsx"]
FN["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FO["products"]
subgraph FP["src"]
FQ["index.ts"]
subgraph FR["lib"]
FS["SellersProducts.tsx"]
FT["SellersProducts.pants-label.spec.tsx"]
FU["SellersProducts.spec.tsx"]
end
end
end
subgraph FV["seller-orders"]
FW["jest.config.ts"]
FX["jest.setup.ts"]
subgraph FY["src"]
FZ["index.ts"]
subgraph G0["lib"]
G1["seller-orders-screen.tsx"]
G2["seller-orders-screen.pants-size.spec.tsx"]
G3["seller-orders-screen.spec.tsx"]
end
G4["test-setup.ts"]
end
end
subgraph G5["setup-password"]
subgraph G6["src"]
G7["index.ts"]
subgraph G8["lib"]
G9["SellersSetupPassword.tsx"]
end
end
end
subgraph GA["unauthorized"]
subgraph GB["src"]
GC["index.ts"]
subgraph GD["lib"]
GE["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GF["zustand"]
subgraph GG["sellers-products-store"]
subgraph GH["src"]
GI["index.ts"]
subgraph GJ["lib"]
GK["useSellersProductsStore.ts"]
GL["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GM["shared"]
subgraph GN["components"]
subgraph GO["apollo-provider-base"]
subgraph GP["src"]
GQ["index.ts"]
subgraph GR["lib"]
GS["ApolloProviderBase.tsx"]
GT["createSilentRefreshAuthLink.ts"]
GU["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph GV["error-boundary"]
subgraph GW["src"]
GX["index.ts"]
subgraph GY["lib"]
GZ["error-boundary.tsx"]
H0["error-boundary.spec.tsx"]
end
end
H1["vite.config.ts"]
end
subgraph H2["glassmorphism-container"]
subgraph H3["src"]
H4["index.ts"]
subgraph H5["lib"]
H6["glassmorphism-container.tsx"]
H7["glassmorphism-container.spec.tsx"]
end
end
end
subgraph H8["layout"]
subgraph H9["src"]
HA["index.ts"]
subgraph HB["lib"]
HC["Layout.tsx"]
end
end
end
subgraph HD["material-data-table"]
subgraph HE["src"]
HF["index.ts"]
subgraph HG["lib"]
HH["material-data-table.tsx"]
HI["table-config.ts"]
HJ["table-utils.ts"]
HK["material-data-table.spec.tsx"]
HL["table-types.ts"]
end
end
end
subgraph HM["order-status-chip"]
subgraph HN["src"]
HO["index.ts"]
subgraph HP["lib"]
HQ["order-status-chip.tsx"]
HR["order-status-chip.spec.tsx"]
end
end
end
subgraph HS["password-field"]
subgraph HT["src"]
HU["index.ts"]
subgraph HV["lib"]
HW["PasswordTextField.tsx"]
end
end
end
subgraph HX["price-display"]
subgraph HY["src"]
HZ["index.ts"]
subgraph I0["lib"]
I1["price-display.tsx"]
I2["price-display.spec.tsx"]
end
end
end
subgraph I3["private-route"]
subgraph I4["src"]
I5["index.ts"]
subgraph I6["lib"]
I7["createPrivateRoute.tsx"]
I8["PrivateRoute.tsx"]
end
end
end
subgraph I9["rtl-table-utils"]
subgraph IA["src"]
IB["index.ts"]
subgraph IC["lib"]
ID["rtl-table-utils.ts"]
IE["rtl-cell-components.tsx"]
IF["rtl-column-helpers.ts"]
IG["rtl-table-props.ts"]
IH["use-table-alignment.ts"]
II["rtl-table-utils.spec.tsx"]
IJ["rtl-table-utils.tsx"]
end
end
end
subgraph IK["snackbar"]
subgraph IL["src"]
IM["index.ts"]
subgraph IN["lib"]
IO["snackbar.tsx"]
IP["Snackbar.tsx"]
end
end
end
subgraph IQ["styled-drawer"]
subgraph IR["src"]
IS["index.ts"]
subgraph IT["lib"]
IU["styled-drawer.tsx"]
IV["styled-drawer.spec.tsx"]
end
end
end
subgraph IW["unauthorized"]
subgraph IX["src"]
IY["index.ts"]
subgraph IZ["lib"]
J0["unauthorized-path.tsx"]
end
end
end
end
subgraph J1["graphql"]
subgraph J2["src"]
J3["index.ts"]
subgraph J4["lib"]
J5["currency.mutations.ts"]
J6["currency.queries.ts"]
J7["fragments.ts"]
J8["variant-colors.ts"]
J9["client-shared-graphql.tsx"]
end
end
end
subgraph JA["hooks"]
subgraph JB["brands"]
subgraph JC["src"]
JD["index.ts"]
subgraph JE["lib"]
JF["brands.graphql.ts"]
JG["useBrands.ts"]
end
end
JH["vite.config.ts"]
end
subgraph JI["categories"]
subgraph JJ["src"]
JK["index.ts"]
subgraph JL["lib"]
JM["useCategories.ts"]
JN["categories.graphql.ts"]
end
end
end
subgraph JO["colors"]
subgraph JP["src"]
JQ["index.ts"]
subgraph JR["lib"]
JS["useColors.ts"]
JT["color.graphql.ts"]
end
end
end
subgraph JU["currency"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["useConvertPrice.tsx"]
JZ["useExchangeRate.tsx"]
K0["useCurrencies.tsx"]
K1["useCurrencyForLocale.tsx"]
K2["useExchangeRate.spec.tsx"]
end
end
end
subgraph K3["products"]
subgraph K4["src"]
K5["index.ts"]
subgraph K6["lib"]
K7["productImage.ts"]
K8["products.graphql.ts"]
K9["useProducts.ts"]
KA["productImage.spec.ts"]
end
end
end
subgraph KB["site-languages"]
subgraph KC["src"]
KD["index.ts"]
subgraph KE["lib"]
KF["site-languages.graphql.ts"]
KG["useSiteLanguages.ts"]
KH["site-languages-hook.spec.tsx"]
end
end
KI["vite.config.ts"]
end
subgraph KJ["snackbar"]
subgraph KK["src"]
KL["index.ts"]
subgraph KM["lib"]
KN["SnackbarContext.tsx"]
KO["useSnackbar.ts"]
end
end
end
subgraph KP["translations-management-hook"]
subgraph KQ["src"]
KR["index.ts"]
subgraph KS["lib"]
KT["useTranslationsManagement.ts"]
end
end
end
end
subgraph KU["lottie"]
subgraph KV["empty-cart"]
subgraph KW["src"]
KX["index.ts"]
subgraph KY["lib"]
KZ["lottie-empty-cart.tsx"]
L0["lottie-empty-cart.spec.tsx"]
end
end
L1["vite.config.ts"]
end
subgraph L2["loading"]
subgraph L3["src"]
L4["index.ts"]
subgraph L5["lib"]
L6["lottie-loading.tsx"]
L7["lottie-loading.spec.tsx"]
end
end
end
subgraph L8["success-check"]
subgraph L9["src"]
LA["index.ts"]
subgraph LB["lib"]
LC["lottie-success-check.tsx"]
LD["lottie-success-check.spec.tsx"]
end
end
end
subgraph LE["unauthorized"]
subgraph LF["src"]
LG["index.ts"]
subgraph LH["lib"]
LI["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LJ["translations"]
subgraph LK["src"]
LL["index.ts"]
subgraph LM["lib"]
LN["mapApolloErrorToTranslationKey.ts"]
LO["WrapTranslation.tsx"]
end
end
end
subgraph LP["ui"]
subgraph LQ["colors"]
subgraph LR["src"]
LS["index.ts"]
subgraph LT["lib"]
LU["colors.ts"]
end
end
end
subgraph LV["language-components"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["language-components.tsx"]
M0["ltr-text-field.tsx"]
end
end
end
subgraph M1["sizes"]
subgraph M2["src"]
M3["index.ts"]
subgraph M4["lib"]
M5["sizes.ts"]
M6["sizes.spec.tsx"]
M7["sizes.tsx"]
end
end
end
end
subgraph M8["zustand"]
subgraph M9["shared-auth-store"]
subgraph MA["src"]
MB["index.ts"]
subgraph MC["lib"]
MD["shared-auth-store.ts"]
end
end
end
subgraph ME["shared-notification-store"]
subgraph MF["src"]
MG["index.ts"]
subgraph MH["lib"]
MI["shared-notification-store.tsx"]
end
end
end
subgraph MJ["shared-ui-store"]
subgraph MK["src"]
ML["index.ts"]
subgraph MM["lib"]
MN["shared-ui-store.ts"]
MO["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MP["server"]
subgraph MQ["controllers"]
subgraph MR["src"]
MS["index.ts"]
subgraph MT["lib"]
MU["auth.controller.ts"]
MV["order.controller.ts"]
end
end
end
subgraph MW["decorators"]
MX["jest.config.ts"]
subgraph MY["src"]
MZ["index.ts"]
subgraph N0["lib"]
N1["current-user.decorator.ts"]
N2["decorators.ts"]
N3["decorators.spec.ts"]
end
end
end
subgraph N4["entities"]
subgraph N5["src"]
N6["index.ts"]
subgraph N7["lib"]
N8["brand.entity.ts"]
N9["product.entity.ts"]
NA["category.entity.ts"]
NB["product-description.entity.ts"]
NC["site-language.entity.ts"]
ND["product-info.entity.ts"]
NE["color.entity.ts"]
NF["product-info-color.entity.ts"]
NG["seller-info.entity.ts"]
NH["seller-product.entity.ts"]
NI["user.entity.ts"]
NJ["cart.entity.ts"]
NK["currency-preference.entity.ts"]
NL["currency.entity.ts"]
NM["customer.entity.ts"]
NN["exchange-rate.entity.ts"]
NO["order.entity.ts"]
NP["platform-settings.entity.ts"]
NQ["refresh-token.entity.ts"]
NR["seller-order.entity.ts"]
NS["translation.entity.ts"]
end
end
end
subgraph NT["guards"]
NU["jest.config.ts"]
subgraph NV["src"]
NW["index.ts"]
subgraph NX["lib"]
NY["catalog.guard.ts"]
NZ["graphql-auth.guard.ts"]
O0["http-auth.guard.ts"]
O1["roles.guard.ts"]
O2["catalog.guard.spec.ts"]
O3["roles.guard.spec.ts"]
end
end
end
subgraph O4["inputs"]
subgraph O5["src"]
O6["index.ts"]
subgraph O7["lib"]
O8["brand.input.ts"]
O9["cart.inputs.ts"]
OA["category.input.ts"]
OB["color.input.ts"]
OC["customer-auth.inputs.ts"]
OD["order-pagination.inputs.ts"]
OE["order.inputs.ts"]
OF["product-info-filter.input.ts"]
OG["product.input.ts"]
OH["seller-order-pagination.inputs.ts"]
OI["seller.input.ts"]
OJ["site-language.input.ts"]
OK["user.input.ts"]
end
end
end
subgraph OL["modules"]
subgraph OM["src"]
ON["index.ts"]
subgraph OO["lib"]
OP["auth.module.ts"]
OQ["email.module.ts"]
OR["token.module.ts"]
OS["user.module.ts"]
OT["customer-profile.module.ts"]
OU["brand.module.ts"]
OV["catalog-guard.module.ts"]
OW["translation.module.ts"]
OX["cart.module.ts"]
OY["platform-settings.module.ts"]
OZ["category.module.ts"]
P0["product.module.ts"]
P1["color.module.ts"]
P2["currency.module.ts"]
P3["graphql-context.module.ts"]
P4["order.module.ts"]
P5["seller-info.module.ts"]
P6["payment.module.ts"]
P7["product-info.module.ts"]
P8["seller-products.module.ts"]
P9["site-language.module.ts"]
end
end
end
subgraph PA["resolvers"]
PB["jest.config.ts"]
subgraph PC["src"]
PD["index.ts"]
subgraph PE["lib"]
PF["auth.resolver.ts"]
PG["brand.resolver.ts"]
PH["cart.resolver.ts"]
PI["category.resolver.ts"]
PJ["color.resolver.ts"]
PK["currency.resolver.ts"]
PL["customer-profile.resolver.ts"]
PM["order.resolver.ts"]
PN["payment.resolver.ts"]
PO["product-info.resolver.ts"]
PP["product.resolver.ts"]
PQ["seller-info.resolver.ts"]
PR["shipping.resolver.ts"]
PS["site-language.resolver.ts"]
PT["translation.input.ts"]
PU["translation.resolver.ts"]
PV["user.resolver.ts"]
PW["auth.resolver.spec.ts"]
PX["order.resolver.spec.ts"]
PY["payment.resolver.integration.spec.ts"]
PZ["payment.resolver.spec.ts"]
Q0["product-info.resolver.spec.ts"]
Q1["translation.resolver.guards.spec.ts"]
subgraph Q2["types"]
Q3["graphql-upload.d.ts"]
end
Q4["user.resolver.spec.ts"]
end
end
end
subgraph Q5["services"]
Q6["jest.config.ts"]
subgraph Q7["src"]
Q8["index.ts"]
subgraph Q9["lib"]
QA["auth.service.ts"]
QB["brand.service.ts"]
QC["cart.service.ts"]
QD["product-info-colors.util.ts"]
QE["category.service.ts"]
QF["color.service.ts"]
QG["currency.service.ts"]
QH["customer-profile.service.ts"]
QI["email.service.ts"]
QJ["image-upload.service.ts"]
QK["order.service.ts"]
QL["payment-logger.service.ts"]
QM["payment.service.ts"]
QN["product.service.ts"]
QO["seller-info.service.ts"]
QP["shipping-calculation.service.ts"]
QQ["site-language.service.ts"]
QR["token.service.ts"]
QS["translation.service.ts"]
QT["user.service.ts"]
QU["auth.service.password-policy.spec.ts"]
QV["auth.service.spec.ts"]
QW["cart.service.add-quantity.spec.ts"]
QX["cart.service.spec.ts"]
QY["order.service.spec.ts"]
QZ["product-info-colors.util.spec.ts"]
R0["product.service.pants.spec.ts"]
R1["product.service.spec.ts"]
R2["relay-connection.spec.ts"]
R3["seller-info.service.price-validation.spec.ts"]
R4["shipping-calculation.service.spec.ts"]
R5["token.service.spec.ts"]
end
end
end
subgraph R6["strategies"]
subgraph R7["src"]
R8["index.ts"]
subgraph R9["lib"]
RA["local.strategy.ts"]
end
end
end
subgraph RB["utils"]
subgraph RC["src"]
RD["index.ts"]
subgraph RE["lib"]
RF["email-templates.ts"]
RG["relay-connection.ts"]
RH["pagination.ts"]
end
end
end
end
subgraph RI["shared"]
subgraph RJ["codegen"]
RK["jest.config.ts"]
subgraph RL["src"]
RM["index.ts"]
subgraph RN["lib"]
subgraph RO["generated"]
RP["graphql.ts"]
end
end
end
end
subgraph RQ["graphql-schema"]
RR["jest.config.ts"]
subgraph RS["src"]
RT["index.ts"]
end
end
subgraph RU["product-sizes"]
subgraph RV["src"]
RW["index.ts"]
subgraph RX["lib"]
RY["product-sizes.ts"]
RZ["product-sizes.pants-formats.spec.ts"]
S0["product-sizes.pants-label.spec.ts"]
S1["product-sizes.pants-strict.spec.ts"]
S2["product-sizes.spec.ts"]
end
end
end
subgraph S3["shared-i18n"]
subgraph S4["src"]
S5["index.ts"]
subgraph S6["lib"]
S7["language-context.tsx"]
S8["language-detector.ts"]
subgraph S9["locales"]
SA["i18n-react.tsx"]
SB["i18n-util.ts"]
SC["i18n-util.async.ts"]
subgraph SD["en"]
SE["index.ts"]
end
subgraph SG["fa"]
SH["index.ts"]
end
SI["formatters.ts"]
SJ["i18n-types.ts"]
SK["i18n-util.sync.ts"]
SL["navigator-detector.ts"]
end
SF["site-name.ts"]
SM["table-localization.ts"]
SN["theme-provider.tsx"]
SO["use-page-title.ts"]
end
end
end
end
end
5-->6
7-->4
7-->6
E-->G
H-->G
K-->M
N-->M
Q-->S
Q-->T
S-->T
U-->S
X-->Y
Y-->10
11-->10
14-->16
14-->17
14-->18
14-->19
14-->1C
19-->1A
1A-->1B
1C-->16
1D-->1A
1D-->19
1F-->1B
1G-->16
1H-->17
1I-->1C
1O-->1Q
1R-->1Q
1S-->1Q
1V-->1X
21-->23
21-->24
24-->23
25-->24
29-->2B
2C-->2B
2F-->2H
2H-->2I
2J-->2H
2M-->2O
2P-->2O
2S-->2T
2T-->2V
2W-->2V
30-->31
31-->33
34-->33
35-->33
38-->3A
3B-->3A
3E-->3G
3H-->3G
3L-->3N
3O-->3N
3R-->3S
3S-->3U
3V-->3U
3W-->3U
40-->41
41-->43
43-->44
43-->46
44-->45
47-->43
48-->46
4D-->4E
4E-->4G
4H-->4G
4L-->4N
4N-->4O
4R-->4S
4S-->4U
4V-->4U
4Z-->50
50-->52
53-->52
58-->5A
58-->5B
5A-->5B
5C-->5A
5F-->5H
5I-->5H
5L-->5N
5L-->5O
5N-->5O
5P-->5N
5Q-->5O
5T-->5V
5W-->5V
5X-->5V
62-->64
65-->64
68-->6A
68-->6B
68-->6C
68-->6F
6C-->6D
6D-->6E
6K-->6M
6K-->6N
6K-->6O
6K-->6P
6Q-->6N
6V-->6X
6V-->6Y
6V-->6Z
70-->6Y
71-->6X
74-->76
79-->7B
7E-->7G
7E-->7H
7G-->7H
7I-->7G
7J-->7H
7M-->7O
7P-->7O
7T-->7V
7W-->7V
80-->82
85-->87
88-->87
8C-->8E
8H-->8J
8K-->8J
8L-->8J
8O-->8Q
8T-->8V
8T-->8W
8T-->8X
8V-->8W
8W-->8X
8Y-->8V
91-->93
96-->98
99-->98
9C-->9E
9F-->9E
9G-->9E
9K-->9M
9N-->9M
9O-->9M
9R-->9T
9U-->9T
9X-->9Z
A0-->9Z
A4-->A6
A7-->A6
AB-->AD
AB-->AM
AB-->AG
AB-->AL
AD-->AF
AD-->AH
AD-->AI
AD-->AJ
AD-->AK
AD-->AG
AD-->AL
AF-->AG
AM-->AG
AN-->AJ
AN-->AD
AN-->AG
AO-->AP
AO-->AJ
AO-->AD
AO-->AM
AO-->AG
AQ-->AM
AR-->AG
AT-->AG
AX-->AZ
B0-->AZ
B3-->B5
B6-->B5
BA-->BC
BD-->BC
BH-->BJ
BK-->BJ
BL-->BJ
BP-->BR
BS-->BR
BV-->BX
BY-->BX
C2-->C4
C8-->CA
CD-->CF
CG-->CF
CG-->CH
CL-->CN
CO-->CN
CS-->CU
CV-->CU
CZ-->D1
D2-->D1
D4-->D6
DB-->DD
DE-->DD
DH-->DJ
DM-->DO
DM-->DP
DO-->DP
DT-->DV
DW-->DV
DZ-->E1
DZ-->E2
DZ-->E3
DZ-->E6
E3-->E4
E4-->E5
E6-->E1
E6-->E7
EE-->EG
EG-->EH
EK-->EM
EP-->ER
EP-->ES
EV-->EX
F0-->F2
F6-->F8
F9-->F8
FC-->FE
FH-->FJ
FJ-->FK
FL-->FK
FM-->FK
FN-->FJ
FQ-->FS
FT-->FS
FU-->FS
FZ-->G1
G2-->G1
G3-->G1
G7-->G9
GC-->GE
GI-->GK
GQ-->GS
GQ-->GT
GU-->GT
GX-->GZ
H0-->GZ
H4-->H6
H7-->H6
HA-->HC
HF-->HH
HF-->HI
HF-->HJ
HH-->HI
HK-->HH
HO-->HQ
HR-->HQ
HU-->HW
HZ-->I1
I2-->I1
I5-->I7
I7-->I8
IB-->ID
ID-->IE
ID-->IF
ID-->IG
ID-->IH
IF-->IE
IF-->IG
II-->IJ
IM-->IO
IS-->IU
IV-->IU
IY-->J0
J3-->J5
J3-->J6
J3-->J7
J3-->J8
JD-->JF
JD-->JG
JG-->JF
JK-->JM
JM-->JN
JQ-->JS
JS-->JT
JW-->JY
JW-->K0
JW-->K1
JW-->JZ
JY-->JZ
K2-->JZ
K5-->K7
K5-->K8
K5-->K9
K9-->K8
KA-->K7
KD-->KF
KD-->KG
KG-->KF
KH-->KG
KL-->KN
KL-->KO
KO-->KN
KR-->KT
KX-->KZ
L0-->KZ
L4-->L6
L7-->L6
LA-->LC
LD-->LC
LG-->LI
LL-->LN
LS-->LU
LX-->LZ
LX-->M0
M3-->M5
M6-->M7
MB-->MD
MG-->MI
ML-->MN
MS-->MU
MS-->MV
MZ-->N1
MZ-->N2
N3-->N2
N6-->N8
N6-->NJ
N6-->NA
N6-->NE
N6-->NK
N6-->NL
N6-->NM
N6-->NN
N6-->NO
N6-->NP
N6-->NB
N6-->NF
N6-->ND
N6-->N9
N6-->NQ
N6-->NG
N6-->NR
N6-->NH
N6-->NC
N6-->NS
N6-->NI
N8-->N9
N9-->N8
N9-->NA
N9-->NB
N9-->ND
N9-->NG
N9-->NH
NA-->N9
NB-->N9
NB-->NC
NC-->NB
ND-->NE
ND-->NF
ND-->N9
NF-->NE
NF-->ND
NG-->NH
NG-->NI
NH-->ND
NH-->N9
NH-->NG
NJ-->N9
NJ-->NI
NK-->NL
NM-->NI
NN-->NL
NN-->NI
NO-->N9
NO-->NG
NQ-->NI
NR-->NO
NW-->NY
NW-->NZ
NW-->O0
NW-->O1
O2-->NY
O3-->O1
O6-->O8
O6-->O9
O6-->OA
O6-->OB
O6-->OC
O6-->OD
O6-->OE
O6-->OF
O6-->OG
O6-->OH
O6-->OI
O6-->OJ
O6-->OK
OG-->OF
ON-->OP
ON-->OU
ON-->OX
ON-->OV
ON-->OZ
ON-->P1
ON-->P2
ON-->OT
ON-->OQ
ON-->P3
ON-->P4
ON-->P6
ON-->OY
ON-->P7
ON-->P0
ON-->P5
ON-->P8
ON-->P9
ON-->OR
ON-->OW
ON-->OS
OP-->OQ
OP-->OR
OP-->OS
OS-->OP
OS-->OT
OU-->OV
OU-->OW
OX-->OY
OZ-->OV
OZ-->P0
OZ-->OW
P0-->OV
P0-->OR
P0-->OW
P1-->OV
P1-->OW
P3-->OQ
P3-->OR
P3-->OS
P4-->OY
P4-->P5
P5-->P0
P5-->OR
P5-->OS
P6-->P4
P7-->P0
P7-->OW
P8-->P5
P8-->OS
PD-->PF
PD-->PG
PD-->PH
PD-->PI
PD-->PJ
PD-->PK
PD-->PL
PD-->PM
PD-->PN
PD-->PO
PD-->PP
PD-->PQ
PD-->PR
PD-->PS
PD-->PT
PD-->PU
PD-->PV
PW-->PF
PX-->PM
PY-->PN
PZ-->PN
Q0-->PO
Q1-->PU
Q4-->PV
Q8-->QA
Q8-->QB
Q8-->QC
Q8-->QE
Q8-->QF
Q8-->QG
Q8-->QH
Q8-->QI
Q8-->QJ
Q8-->QK
Q8-->QL
Q8-->QM
Q8-->QD
Q8-->QN
Q8-->QO
Q8-->QP
Q8-->QQ
Q8-->QR
Q8-->QS
Q8-->QT
QC-->QD
QN-->QD
QO-->QD
QU-->QA
QU-->QI
QU-->QR
QU-->QT
QV-->QA
QV-->QI
QV-->QR
QV-->QT
QW-->QC
QX-->QC
QY-->QK
QZ-->QD
R0-->QN
R0-->QS
R1-->QN
R1-->QS
R3-->QA
R3-->QO
R4-->QP
R5-->QR
R8-->RA
RD-->RF
RD-->RG
RM-->RP
RW-->RY
RZ-->RY
S0-->RY
S1-->RY
S2-->RY
S5-->S7
S5-->S8
S5-->SA
S5-->SJ
S5-->SB
S5-->SC
S5-->SK
S5-->SL
S5-->SF
S5-->SM
S5-->SN
S5-->SO
S7-->S8
S7-->SA
S7-->SC
SA-->SB
SC-->SE
SC-->SH
SC-->SI
SC-->SB
SE-->SF
SH-->SF
SK-->SE
SK-->SH
SK-->SI
SK-->SB
SM-->SA
SN-->S7
SO-->SA
