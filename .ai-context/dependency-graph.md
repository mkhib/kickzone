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
A1["customer-forgot-password.zod.spec.tsx"]
end
end
end
subgraph A2["guide-authenticity"]
subgraph A3["src"]
A4["index.ts"]
subgraph A5["lib"]
A6["customer-guide-authenticity.tsx"]
A7["customer-guide-authenticity.spec.tsx"]
end
end
A8["vite.config.ts"]
end
subgraph A9["guide-payment"]
subgraph AA["src"]
AB["index.ts"]
subgraph AC["lib"]
AD["customer-guide-payment.tsx"]
AE["customer-guide-payment.spec.tsx"]
end
end
AF["vite.config.ts"]
end
subgraph AG["home"]
subgraph AH["src"]
AI["index.ts"]
subgraph AJ["lib"]
AK["CustomersHomeScreen.tsx"]
subgraph AL["components"]
AM["CategoryBentoSection.tsx"]
AO["HeroSection.tsx"]
AP["HomeLoadingScreen.tsx"]
AQ["PicksRailSection.tsx"]
AR["TrustStripSection.tsx"]
AW["NewArrivalsSection.tsx"]
AY["BrandBlocksSection.tsx"]
AZ["NewsletterSection.tsx"]
B0["ShopTheLookSection.tsx"]
B1["TickerSection.tsx"]
end
AN["home-selectors.ts"]
AS["useScrollProgress.ts"]
AT["CustomersShopScreen.tsx"]
AU["CustomersHomeScreen.cart-size.spec.tsx"]
AV["CustomersHomeScreen.spec.tsx"]
AX["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph B2["login"]
subgraph B3["src"]
B4["index.ts"]
subgraph B5["lib"]
B6["CustomersLoginScreen.tsx"]
B7["CustomersLoginScreen.spec.tsx"]
B8["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph B9["not-found"]
subgraph BA["src"]
BB["index.ts"]
subgraph BC["lib"]
BD["customer-not-found.tsx"]
BE["customer-not-found.spec.tsx"]
end
end
BF["vite.config.ts"]
end
subgraph BG["privacy-policy"]
subgraph BH["src"]
BI["index.ts"]
subgraph BJ["lib"]
BK["customer-privacy-policy.tsx"]
BL["customer-privacy-policy.spec.tsx"]
end
end
BM["vite.config.ts"]
end
subgraph BN["product-details"]
subgraph BO["src"]
BP["index.ts"]
subgraph BQ["lib"]
BR["customer-product-details.tsx"]
BS["customer-product-details.pants-size.spec.tsx"]
BT["customer-product-details.spec.tsx"]
end
end
BU["vite.config.ts"]
end
subgraph BV["reset-password"]
subgraph BW["src"]
BX["index.ts"]
subgraph BY["lib"]
BZ["customer-reset-password.tsx"]
C0["customer-reset-password.password-length.spec.tsx"]
C1["customer-reset-password.zod.spec.tsx"]
end
end
end
subgraph C2["shipping-returns"]
subgraph C3["src"]
C4["index.ts"]
subgraph C5["lib"]
C6["customer-shipping-returns.tsx"]
C7["customer-shipping-returns.spec.tsx"]
end
end
C8["vite.config.ts"]
end
subgraph C9["unauthorized"]
subgraph CA["src"]
CB["index.ts"]
subgraph CC["lib"]
CD["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CE["utility"]
subgraph CF["test"]
subgraph CG["src"]
CH["index.ts"]
subgraph CI["lib"]
CJ["customers-test-utility.tsx"]
end
end
end
end
subgraph CK["validations"]
subgraph CL["src"]
CM["index.ts"]
subgraph CN["lib"]
CO["shipping-validation.ts"]
CP["shipping-validation.spec.tsx"]
CQ["shipping-validation.tsx"]
end
end
end
subgraph CR["zustand"]
subgraph CS["customer-cart-store"]
subgraph CT["src"]
CU["index.ts"]
subgraph CV["lib"]
CW["customer-cart-store.ts"]
CX["customer-cart-store.spec.ts"]
CY["customer-cart-store.tsx"]
end
end
end
subgraph CZ["customer-checkout-store"]
subgraph D0["src"]
D1["index.ts"]
subgraph D2["lib"]
D3["customer-checkout-store.ts"]
D4["customer-checkout-store.spec.ts"]
end
end
D5["vite.config.ts"]
end
subgraph D6["customer-wishlist-store"]
subgraph D7["src"]
D8["index.ts"]
subgraph D9["lib"]
DA["customer-wishlist-store.ts"]
DB["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DC["src"]
DD["index.ts"]
subgraph DE["lib"]
DF["customers-products-store.tsx"]
end
end
end
end
subgraph DG["sellers"]
subgraph DH["components"]
subgraph DI["footer"]
subgraph DJ["src"]
DK["index.ts"]
subgraph DL["lib"]
DM["sellers-footer.tsx"]
DN["sellers-footer.spec.tsx"]
end
end
end
subgraph DO["headerbar"]
subgraph DP["src"]
DQ["index.ts"]
subgraph DR["lib"]
DS["SellersHeaderbar.tsx"]
end
end
end
subgraph DT["layout"]
subgraph DU["src"]
DV["index.ts"]
subgraph DW["lib"]
DX["SellersLayout.tsx"]
DY["SellersTabbar.tsx"]
end
end
end
end
subgraph DZ["contexts"]
subgraph E0["auth"]
subgraph E1["src"]
E2["index.ts"]
subgraph E3["lib"]
E4["SellersAuthContext.tsx"]
E5["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E6["graphql"]
subgraph E7["src"]
E8["index.ts"]
subgraph E9["lib"]
EA["fragments.ts"]
EB["mutations.ts"]
EC["Provider.tsx"]
ED["SellersApolloProvider.tsx"]
EE["client.ts"]
EF["queries.ts"]
EG["seller-orders.graphql.ts"]
EH["apollo-upload-client.d.ts"]
end
subgraph EI["types"]
EJ["apollo-upload-client.d.ts"]
end
end
end
subgraph EK["hooks"]
subgraph EL["auth"]
subgraph EM["src"]
EN["index.ts"]
subgraph EO["lib"]
EP["useSellerAuth.ts"]
EQ["sellerAuth.graphql.ts"]
end
end
end
subgraph ER["orders"]
subgraph ES["src"]
ET["index.ts"]
subgraph EU["lib"]
EV["useSellerOrders.ts"]
EW["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph EX["products"]
subgraph EY["src"]
EZ["index.ts"]
subgraph F0["lib"]
F1["useSellersProductManagement.ts"]
F2["useSellersProducts.ts"]
end
end
end
end
subgraph F3["router"]
subgraph F4["src"]
F5["index.ts"]
subgraph F6["lib"]
F7["SellersRouter.tsx"]
end
end
end
subgraph F8["routes"]
subgraph F9["src"]
FA["index.ts"]
subgraph FB["lib"]
FC["seller-routes.ts"]
end
end
end
subgraph FD["screens"]
subgraph FE["catalog"]
subgraph FF["src"]
FG["index.ts"]
subgraph FH["lib"]
FI["SellersCatalogScreens.tsx"]
FJ["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FK["login"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["SellersLogin.tsx"]
end
end
end
subgraph FP["manage-product"]
subgraph FQ["src"]
FR["index.ts"]
subgraph FS["lib"]
FT["SellersManageProductScreen.tsx"]
FU["SellersDefineProductFlow.tsx"]
FV["SellersDefineProductFlow.pants-label.spec.tsx"]
FW["SellersDefineProductFlow.spec.tsx"]
FX["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FY["products"]
subgraph FZ["src"]
G0["index.ts"]
subgraph G1["lib"]
G2["SellersProducts.tsx"]
G3["SellersProducts.pants-label.spec.tsx"]
G4["SellersProducts.spec.tsx"]
end
end
end
subgraph G5["seller-orders"]
G6["jest.config.ts"]
G7["jest.setup.ts"]
subgraph G8["src"]
G9["index.ts"]
subgraph GA["lib"]
GB["seller-orders-screen.tsx"]
GC["seller-status-transitions.ts"]
GD["seller-orders-screen.pants-size.spec.tsx"]
GE["seller-orders-screen.spec.tsx"]
GF["seller-status-transitions.spec.ts"]
end
GG["test-setup.ts"]
end
end
subgraph GH["setup-password"]
subgraph GI["src"]
GJ["index.ts"]
subgraph GK["lib"]
GL["SellersSetupPassword.tsx"]
end
end
end
subgraph GM["unauthorized"]
subgraph GN["src"]
GO["index.ts"]
subgraph GP["lib"]
GQ["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GR["zustand"]
subgraph GS["sellers-products-store"]
subgraph GT["src"]
GU["index.ts"]
subgraph GV["lib"]
GW["useSellersProductsStore.ts"]
GX["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GY["shared"]
subgraph GZ["components"]
subgraph H0["apollo-provider-base"]
subgraph H1["src"]
H2["index.ts"]
subgraph H3["lib"]
H4["ApolloProviderBase.tsx"]
H5["createSilentRefreshAuthLink.ts"]
H6["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph H7["error-boundary"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["error-boundary.tsx"]
HC["error-boundary.spec.tsx"]
end
end
HD["vite.config.ts"]
end
subgraph HE["glassmorphism-container"]
subgraph HF["src"]
HG["index.ts"]
subgraph HH["lib"]
HI["glassmorphism-container.tsx"]
HJ["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HK["layout"]
subgraph HL["src"]
HM["index.ts"]
subgraph HN["lib"]
HO["Layout.tsx"]
end
end
end
subgraph HP["material-data-table"]
subgraph HQ["src"]
HR["index.ts"]
subgraph HS["lib"]
HT["material-data-table.tsx"]
HU["table-config.ts"]
HV["table-utils.ts"]
HW["material-data-table.spec.tsx"]
HX["table-types.ts"]
end
end
end
subgraph HY["order-status-chip"]
subgraph HZ["src"]
I0["index.ts"]
subgraph I1["lib"]
I2["order-status-chip.tsx"]
I3["order-status-chip.spec.tsx"]
end
end
end
subgraph I4["password-field"]
subgraph I5["src"]
I6["index.ts"]
subgraph I7["lib"]
I8["PasswordTextField.tsx"]
end
end
end
subgraph I9["price-display"]
subgraph IA["src"]
IB["index.ts"]
subgraph IC["lib"]
ID["price-display.tsx"]
IE["price-display.spec.tsx"]
end
end
end
subgraph IF["private-route"]
subgraph IG["src"]
IH["index.ts"]
subgraph II["lib"]
IJ["createPrivateRoute.tsx"]
IK["PrivateRoute.tsx"]
end
end
end
subgraph IL["rtl-table-utils"]
subgraph IM["src"]
IN["index.ts"]
subgraph IO["lib"]
IP["rtl-table-utils.ts"]
IQ["rtl-cell-components.tsx"]
IR["rtl-column-helpers.ts"]
IS["rtl-table-props.ts"]
IT["use-table-alignment.ts"]
IU["rtl-table-utils.spec.tsx"]
IV["rtl-table-utils.tsx"]
end
end
end
subgraph IW["snackbar"]
subgraph IX["src"]
IY["index.ts"]
subgraph IZ["lib"]
J0["snackbar.tsx"]
J1["Snackbar.tsx"]
end
end
end
subgraph J2["styled-drawer"]
subgraph J3["src"]
J4["index.ts"]
subgraph J5["lib"]
J6["styled-drawer.tsx"]
J7["styled-drawer.spec.tsx"]
end
end
end
subgraph J8["unauthorized"]
subgraph J9["src"]
JA["index.ts"]
subgraph JB["lib"]
JC["unauthorized-path.tsx"]
end
end
end
end
subgraph JD["graphql"]
subgraph JE["src"]
JF["index.ts"]
subgraph JG["lib"]
JH["currency.mutations.ts"]
JI["currency.queries.ts"]
JJ["fragments.ts"]
JK["variant-colors.ts"]
JL["client-shared-graphql.tsx"]
end
end
end
subgraph JM["hooks"]
subgraph JN["brands"]
subgraph JO["src"]
JP["index.ts"]
subgraph JQ["lib"]
JR["brands.graphql.ts"]
JS["useBrands.ts"]
end
end
JT["vite.config.ts"]
end
subgraph JU["categories"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["useCategories.ts"]
JZ["categories.graphql.ts"]
end
end
end
subgraph K0["colors"]
subgraph K1["src"]
K2["index.ts"]
subgraph K3["lib"]
K4["useColors.ts"]
K5["color.graphql.ts"]
end
end
end
subgraph K6["currency"]
subgraph K7["src"]
K8["index.ts"]
subgraph K9["lib"]
KA["useConvertPrice.tsx"]
KB["useExchangeRate.tsx"]
KC["useCurrencies.tsx"]
KD["useCurrencyForLocale.tsx"]
KE["useExchangeRate.spec.tsx"]
end
end
end
subgraph KF["products"]
subgraph KG["src"]
KH["index.ts"]
subgraph KI["lib"]
KJ["productImage.ts"]
KK["products.graphql.ts"]
KL["useProducts.ts"]
KM["productImage.spec.ts"]
end
end
end
subgraph KN["site-languages"]
subgraph KO["src"]
KP["index.ts"]
subgraph KQ["lib"]
KR["site-languages.graphql.ts"]
KS["useSiteLanguages.ts"]
KT["site-languages-hook.spec.tsx"]
end
end
KU["vite.config.ts"]
end
subgraph KV["snackbar"]
subgraph KW["src"]
KX["index.ts"]
subgraph KY["lib"]
KZ["SnackbarContext.tsx"]
L0["useSnackbar.ts"]
end
end
end
subgraph L1["translations-management-hook"]
subgraph L2["src"]
L3["index.ts"]
subgraph L4["lib"]
L5["useTranslationsManagement.ts"]
end
end
end
end
subgraph L6["lottie"]
subgraph L7["empty-cart"]
subgraph L8["src"]
L9["index.ts"]
subgraph LA["lib"]
LB["lottie-empty-cart.tsx"]
LC["lottie-empty-cart.spec.tsx"]
end
end
LD["vite.config.ts"]
end
subgraph LE["loading"]
subgraph LF["src"]
LG["index.ts"]
subgraph LH["lib"]
LI["lottie-loading.tsx"]
LJ["lottie-loading.spec.tsx"]
end
end
end
subgraph LK["success-check"]
subgraph LL["src"]
LM["index.ts"]
subgraph LN["lib"]
LO["lottie-success-check.tsx"]
LP["lottie-success-check.spec.tsx"]
end
end
end
subgraph LQ["unauthorized"]
subgraph LR["src"]
LS["index.ts"]
subgraph LT["lib"]
LU["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LV["translations"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["mapApolloErrorToTranslationKey.ts"]
M0["WrapTranslation.tsx"]
end
end
end
subgraph M1["ui"]
subgraph M2["colors"]
subgraph M3["src"]
M4["index.ts"]
subgraph M5["lib"]
M6["colors.ts"]
end
end
end
subgraph M7["language-components"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["language-components.tsx"]
MC["ltr-text-field.tsx"]
end
end
end
subgraph MD["sizes"]
subgraph ME["src"]
MF["index.ts"]
subgraph MG["lib"]
MH["sizes.ts"]
MI["sizes.spec.tsx"]
MJ["sizes.tsx"]
end
end
end
end
subgraph MK["zustand"]
subgraph ML["shared-auth-store"]
subgraph MM["src"]
MN["index.ts"]
subgraph MO["lib"]
MP["shared-auth-store.ts"]
end
end
end
subgraph MQ["shared-notification-store"]
subgraph MR["src"]
MS["index.ts"]
subgraph MT["lib"]
MU["shared-notification-store.tsx"]
end
end
end
subgraph MV["shared-ui-store"]
subgraph MW["src"]
MX["index.ts"]
subgraph MY["lib"]
MZ["shared-ui-store.ts"]
N0["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph N1["server"]
subgraph N2["controllers"]
subgraph N3["src"]
N4["index.ts"]
subgraph N5["lib"]
N6["auth.controller.ts"]
N7["order.controller.ts"]
end
end
end
subgraph N8["decorators"]
N9["jest.config.ts"]
subgraph NA["src"]
NB["index.ts"]
subgraph NC["lib"]
ND["current-user.decorator.ts"]
NE["decorators.ts"]
NF["decorators.spec.ts"]
end
end
end
subgraph NG["entities"]
subgraph NH["src"]
NI["index.ts"]
subgraph NJ["lib"]
NK["brand.entity.ts"]
NL["product.entity.ts"]
NM["category.entity.ts"]
NN["product-description.entity.ts"]
NO["site-language.entity.ts"]
NP["product-info.entity.ts"]
NQ["color.entity.ts"]
NR["product-info-color.entity.ts"]
NS["seller-info.entity.ts"]
NT["seller-product.entity.ts"]
NU["user.entity.ts"]
NV["cart.entity.ts"]
NW["currency-preference.entity.ts"]
NX["currency.entity.ts"]
NY["customer.entity.ts"]
NZ["exchange-rate.entity.ts"]
O0["order.entity.ts"]
O1["platform-settings.entity.ts"]
O2["refresh-token.entity.ts"]
O3["seller-order.entity.ts"]
O4["translation.entity.ts"]
end
end
end
subgraph O5["guards"]
O6["jest.config.ts"]
subgraph O7["src"]
O8["index.ts"]
subgraph O9["lib"]
OA["catalog.guard.ts"]
OB["graphql-auth.guard.ts"]
OC["http-auth.guard.ts"]
OD["roles.guard.ts"]
OE["catalog.guard.spec.ts"]
OF["roles.guard.spec.ts"]
end
end
end
subgraph OG["inputs"]
subgraph OH["src"]
OI["index.ts"]
subgraph OJ["lib"]
OK["brand.input.ts"]
OL["cart.inputs.ts"]
OM["category.input.ts"]
ON["color.input.ts"]
OO["customer-auth.inputs.ts"]
OP["order-pagination.inputs.ts"]
OQ["order.inputs.ts"]
OR["product-info-filter.input.ts"]
OS["product.input.ts"]
OT["seller-order-pagination.inputs.ts"]
OU["seller.input.ts"]
OV["site-language.input.ts"]
OW["user.input.ts"]
end
end
end
subgraph OX["modules"]
subgraph OY["src"]
OZ["index.ts"]
subgraph P0["lib"]
P1["auth.module.ts"]
P2["email.module.ts"]
P3["token.module.ts"]
P4["user.module.ts"]
P5["customer-profile.module.ts"]
P6["brand.module.ts"]
P7["catalog-guard.module.ts"]
P8["translation.module.ts"]
P9["cart.module.ts"]
PA["platform-settings.module.ts"]
PB["category.module.ts"]
PC["product.module.ts"]
PD["color.module.ts"]
PE["currency.module.ts"]
PF["graphql-context.module.ts"]
PG["order.module.ts"]
PH["seller-info.module.ts"]
PI["payment.module.ts"]
PJ["product-info.module.ts"]
PK["seller-products.module.ts"]
PL["site-language.module.ts"]
end
end
end
subgraph PM["resolvers"]
PN["jest.config.ts"]
subgraph PO["src"]
PP["index.ts"]
subgraph PQ["lib"]
PR["auth.resolver.ts"]
PS["zod-validation.pipe.ts"]
PT["brand.resolver.ts"]
PU["cart.resolver.ts"]
PV["category.resolver.ts"]
PW["color.resolver.ts"]
PX["currency.resolver.ts"]
PY["customer-profile.resolver.ts"]
PZ["order.resolver.ts"]
Q0["payment.resolver.ts"]
Q1["product-info.resolver.ts"]
Q2["product.resolver.ts"]
Q3["seller-info.resolver.ts"]
Q4["shipping.resolver.ts"]
Q5["site-language.resolver.ts"]
Q6["translation.input.ts"]
Q7["translation.resolver.ts"]
Q8["user.resolver.ts"]
Q9["auth-validation.spec.ts"]
QA["auth.resolver.spec.ts"]
QB["order.resolver.spec.ts"]
QC["order.resolver.status-transitions.spec.ts"]
QD["order.resolver.tracking.spec.ts"]
QE["payment.resolver.integration.spec.ts"]
QF["payment.resolver.spec.ts"]
QG["product-info.resolver.spec.ts"]
QH["translation.resolver.guards.spec.ts"]
subgraph QI["types"]
QJ["graphql-upload.d.ts"]
end
QK["user.resolver.spec.ts"]
QL["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QM["services"]
QN["jest.config.ts"]
subgraph QO["src"]
QP["index.ts"]
subgraph QQ["lib"]
QR["auth.service.ts"]
QS["brand.service.ts"]
QT["cart.service.ts"]
QU["product-info-colors.util.ts"]
QV["category.service.ts"]
QW["color.service.ts"]
QX["currency.service.ts"]
QY["customer-profile.service.ts"]
QZ["email.service.ts"]
R0["image-upload.service.ts"]
R1["order.service.ts"]
R2["payment-logger.service.ts"]
R3["payment.service.ts"]
R4["product.service.ts"]
R5["seller-info.service.ts"]
R6["shipping-calculation.service.ts"]
R7["site-language.service.ts"]
R8["token.service.ts"]
R9["translation.service.ts"]
RA["user.service.ts"]
RB["auth.service.password-policy.spec.ts"]
RC["auth.service.spec.ts"]
RD["cart.service.add-quantity.spec.ts"]
RE["cart.service.null-relations.spec.ts"]
RF["cart.service.spec.ts"]
RG["order.service.spec.ts"]
RH["order.service.tracking.spec.ts"]
RI["product-info-colors.util.spec.ts"]
RJ["product.service.pants.spec.ts"]
RK["product.service.spec.ts"]
RL["relay-connection.spec.ts"]
RM["seller-info.service.price-validation.spec.ts"]
RN["shipping-calculation.service.spec.ts"]
RO["token.service.spec.ts"]
end
end
end
subgraph RP["strategies"]
subgraph RQ["src"]
RR["index.ts"]
subgraph RS["lib"]
RT["local.strategy.ts"]
end
end
end
subgraph RU["utils"]
subgraph RV["src"]
RW["index.ts"]
subgraph RX["lib"]
RY["email-templates.ts"]
RZ["relay-connection.ts"]
S0["pagination.ts"]
end
end
end
end
subgraph S1["shared"]
subgraph S2["codegen"]
S3["jest.config.ts"]
subgraph S4["src"]
S5["index.ts"]
subgraph S6["lib"]
subgraph S7["generated"]
S8["graphql.ts"]
end
end
end
end
subgraph S9["graphql-schema"]
SA["jest.config.ts"]
subgraph SB["src"]
SC["index.ts"]
end
end
subgraph SD["product-sizes"]
subgraph SE["src"]
SF["index.ts"]
subgraph SG["lib"]
SH["product-sizes.ts"]
SI["product-sizes.pants-formats.spec.ts"]
SJ["product-sizes.pants-label.spec.ts"]
SK["product-sizes.pants-strict.spec.ts"]
SL["product-sizes.spec.ts"]
end
end
end
subgraph SM["shared-i18n"]
subgraph SN["src"]
SO["index.ts"]
subgraph SP["lib"]
SQ["language-context.tsx"]
SR["language-detector.ts"]
subgraph SS["locales"]
ST["i18n-react.tsx"]
SU["i18n-util.ts"]
SV["i18n-util.async.ts"]
subgraph SW["en"]
SX["index.ts"]
end
subgraph SZ["fa"]
T0["index.ts"]
end
T1["formatters.ts"]
T2["i18n-types.ts"]
T3["i18n-util.sync.ts"]
T4["navigator-detector.ts"]
end
SY["site-name.ts"]
T5["table-localization.ts"]
T6["theme-provider.tsx"]
T7["use-page-title.ts"]
end
end
end
subgraph T8["validation"]
subgraph T9["src"]
TA["index.ts"]
subgraph TB["lib"]
TC["auth.ts"]
TD["limits.ts"]
TE["primitives.ts"]
TF["auth-forms.ts"]
TG["errors.ts"]
TH["auth-forms.login.spec.ts"]
TI["auth-forms.recovery.spec.ts"]
TJ["auth-forms.spec.ts"]
TK["auth.spec.ts"]
TL["errors.spec.ts"]
TM["primitives.spec.ts"]
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
A1-->9Z
A4-->A6
A7-->A6
AB-->AD
AE-->AD
AI-->AK
AI-->AT
AI-->AN
AI-->AS
AK-->AM
AK-->AO
AK-->AP
AK-->AQ
AK-->AR
AK-->AN
AK-->AS
AM-->AN
AT-->AN
AU-->AQ
AU-->AK
AU-->AN
AV-->AW
AV-->AQ
AV-->AK
AV-->AT
AV-->AN
AX-->AT
AY-->AN
B0-->AN
B4-->B6
B7-->B6
B8-->B6
BB-->BD
BE-->BD
BI-->BK
BL-->BK
BP-->BR
BS-->BR
BT-->BR
BX-->BZ
C0-->BZ
C1-->BZ
C4-->C6
C7-->C6
CB-->CD
CH-->CJ
CM-->CO
CP-->CO
CP-->CQ
CU-->CW
CX-->CW
D1-->D3
D4-->D3
D8-->DA
DB-->DA
DD-->DF
DK-->DM
DN-->DM
DQ-->DS
DV-->DX
DV-->DY
DX-->DY
E2-->E4
E5-->E4
E8-->EA
E8-->EB
E8-->EC
E8-->EF
EC-->ED
ED-->EE
EF-->EA
EF-->EG
EN-->EP
EP-->EQ
ET-->EV
EZ-->F1
EZ-->F2
F5-->F7
FA-->FC
FG-->FI
FJ-->FI
FM-->FO
FR-->FT
FT-->FU
FV-->FU
FW-->FU
FX-->FT
G0-->G2
G3-->G2
G4-->G2
G9-->GB
GB-->GC
GD-->GB
GE-->GB
GF-->GC
GJ-->GL
GO-->GQ
GU-->GW
H2-->H4
H2-->H5
H6-->H5
H9-->HB
HC-->HB
HG-->HI
HJ-->HI
HM-->HO
HR-->HT
HR-->HU
HR-->HV
HT-->HU
HW-->HT
I0-->I2
I3-->I2
I6-->I8
IB-->ID
IE-->ID
IH-->IJ
IJ-->IK
IN-->IP
IP-->IQ
IP-->IR
IP-->IS
IP-->IT
IR-->IQ
IR-->IS
IU-->IV
IY-->J0
J4-->J6
J7-->J6
JA-->JC
JF-->JH
JF-->JI
JF-->JJ
JF-->JK
JP-->JR
JP-->JS
JS-->JR
JW-->JY
JY-->JZ
K2-->K4
K4-->K5
K8-->KA
K8-->KC
K8-->KD
K8-->KB
KA-->KB
KE-->KB
KH-->KJ
KH-->KK
KH-->KL
KL-->KK
KM-->KJ
KP-->KR
KP-->KS
KS-->KR
KT-->KS
KX-->KZ
KX-->L0
L0-->KZ
L3-->L5
L9-->LB
LC-->LB
LG-->LI
LJ-->LI
LM-->LO
LP-->LO
LS-->LU
LX-->LZ
M4-->M6
M9-->MB
M9-->MC
MF-->MH
MI-->MJ
MN-->MP
MS-->MU
MX-->MZ
N4-->N6
N4-->N7
NB-->ND
NB-->NE
NF-->NE
NI-->NK
NI-->NV
NI-->NM
NI-->NQ
NI-->NW
NI-->NX
NI-->NY
NI-->NZ
NI-->O0
NI-->O1
NI-->NN
NI-->NR
NI-->NP
NI-->NL
NI-->O2
NI-->NS
NI-->O3
NI-->NT
NI-->NO
NI-->O4
NI-->NU
NK-->NL
NL-->NK
NL-->NM
NL-->NN
NL-->NP
NL-->NS
NL-->NT
NM-->NL
NN-->NL
NN-->NO
NO-->NN
NP-->NQ
NP-->NR
NP-->NL
NR-->NQ
NR-->NP
NS-->NT
NS-->NU
NT-->NP
NT-->NL
NT-->NS
NV-->NL
NV-->NU
NW-->NX
NY-->NU
NZ-->NX
NZ-->NU
O0-->NL
O0-->NS
O2-->NU
O3-->O0
O8-->OA
O8-->OB
O8-->OC
O8-->OD
OE-->OA
OF-->OD
OI-->OK
OI-->OL
OI-->OM
OI-->ON
OI-->OO
OI-->OP
OI-->OQ
OI-->OR
OI-->OS
OI-->OT
OI-->OU
OI-->OV
OI-->OW
OS-->OR
OZ-->P1
OZ-->P6
OZ-->P9
OZ-->P7
OZ-->PB
OZ-->PD
OZ-->PE
OZ-->P5
OZ-->P2
OZ-->PF
OZ-->PG
OZ-->PI
OZ-->PA
OZ-->PJ
OZ-->PC
OZ-->PH
OZ-->PK
OZ-->PL
OZ-->P3
OZ-->P8
OZ-->P4
P1-->P2
P1-->P3
P1-->P4
P4-->P1
P4-->P5
P6-->P7
P6-->P8
P9-->PA
PB-->P7
PB-->PC
PB-->P8
PC-->P7
PC-->P3
PC-->P8
PD-->P7
PD-->P8
PF-->P2
PF-->P3
PF-->P4
PG-->PA
PG-->PH
PH-->PC
PH-->P3
PH-->P4
PI-->PG
PJ-->PC
PJ-->P8
PK-->PH
PK-->P4
PP-->PR
PP-->PT
PP-->PU
PP-->PV
PP-->PW
PP-->PX
PP-->PY
PP-->PZ
PP-->Q0
PP-->Q1
PP-->Q2
PP-->Q3
PP-->Q4
PP-->Q5
PP-->Q6
PP-->Q7
PP-->Q8
PP-->PS
PR-->PS
Q8-->PS
Q9-->PR
Q9-->Q8
Q9-->PS
QA-->PR
QB-->PZ
QC-->PZ
QD-->PZ
QE-->Q0
QF-->Q0
QG-->Q1
QH-->Q7
QK-->Q8
QL-->PS
QP-->QR
QP-->QS
QP-->QT
QP-->QV
QP-->QW
QP-->QX
QP-->QY
QP-->QZ
QP-->R0
QP-->R1
QP-->R2
QP-->R3
QP-->QU
QP-->R4
QP-->R5
QP-->R6
QP-->R7
QP-->R8
QP-->R9
QP-->RA
QT-->QU
R4-->QU
R5-->QU
RB-->QR
RB-->QZ
RB-->R8
RB-->RA
RC-->QR
RC-->QZ
RC-->R8
RC-->RA
RD-->QT
RE-->QT
RF-->QT
RG-->R1
RH-->R1
RI-->QU
RJ-->R4
RJ-->R9
RK-->R4
RK-->R9
RM-->QR
RM-->R5
RN-->R6
RO-->R8
RR-->RT
RW-->RY
RW-->RZ
S5-->S8
SF-->SH
SI-->SH
SJ-->SH
SK-->SH
SL-->SH
SO-->SQ
SO-->SR
SO-->ST
SO-->T2
SO-->SU
SO-->SV
SO-->T3
SO-->T4
SO-->SY
SO-->T5
SO-->T6
SO-->T7
SQ-->SR
SQ-->ST
SQ-->SV
ST-->SU
SV-->SX
SV-->T0
SV-->T1
SV-->SU
SX-->SY
T0-->SY
T3-->SX
T3-->T0
T3-->T1
T3-->SU
T5-->ST
T6-->SQ
T7-->ST
TA-->TC
TA-->TF
TA-->TG
TA-->TD
TA-->TE
TC-->TD
TC-->TE
TE-->TD
TF-->TC
TH-->TF
TI-->TF
TJ-->TF
TK-->TC
TL-->TG
TM-->TD
TM-->TE
