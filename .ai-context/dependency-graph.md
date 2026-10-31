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
B7["CustomersLoginScreen.zod.spec.tsx"]
end
end
end
subgraph B8["not-found"]
subgraph B9["src"]
BA["index.ts"]
subgraph BB["lib"]
BC["customer-not-found.tsx"]
BD["customer-not-found.spec.tsx"]
end
end
BE["vite.config.ts"]
end
subgraph BF["privacy-policy"]
subgraph BG["src"]
BH["index.ts"]
subgraph BI["lib"]
BJ["customer-privacy-policy.tsx"]
BK["customer-privacy-policy.spec.tsx"]
end
end
BL["vite.config.ts"]
end
subgraph BM["product-details"]
subgraph BN["src"]
BO["index.ts"]
subgraph BP["lib"]
BQ["customer-product-details.tsx"]
BR["customer-product-details.pants-size.spec.tsx"]
BS["customer-product-details.spec.tsx"]
end
end
BT["vite.config.ts"]
end
subgraph BU["reset-password"]
subgraph BV["src"]
BW["index.ts"]
subgraph BX["lib"]
BY["customer-reset-password.tsx"]
BZ["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph C0["shipping-returns"]
subgraph C1["src"]
C2["index.ts"]
subgraph C3["lib"]
C4["customer-shipping-returns.tsx"]
C5["customer-shipping-returns.spec.tsx"]
end
end
C6["vite.config.ts"]
end
subgraph C7["unauthorized"]
subgraph C8["src"]
C9["index.ts"]
subgraph CA["lib"]
CB["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CC["utility"]
subgraph CD["test"]
subgraph CE["src"]
CF["index.ts"]
subgraph CG["lib"]
CH["customers-test-utility.tsx"]
end
end
end
end
subgraph CI["validations"]
subgraph CJ["src"]
CK["index.ts"]
subgraph CL["lib"]
CM["shipping-validation.ts"]
CN["shipping-validation.spec.tsx"]
CO["shipping-validation.tsx"]
end
end
end
subgraph CP["zustand"]
subgraph CQ["customer-cart-store"]
subgraph CR["src"]
CS["index.ts"]
subgraph CT["lib"]
CU["customer-cart-store.ts"]
CV["customer-cart-store.spec.ts"]
CW["customer-cart-store.tsx"]
end
end
end
subgraph CX["customer-checkout-store"]
subgraph CY["src"]
CZ["index.ts"]
subgraph D0["lib"]
D1["customer-checkout-store.ts"]
D2["customer-checkout-store.spec.ts"]
end
end
D3["vite.config.ts"]
end
subgraph D4["customer-wishlist-store"]
subgraph D5["src"]
D6["index.ts"]
subgraph D7["lib"]
D8["customer-wishlist-store.ts"]
D9["customer-wishlist-store.spec.ts"]
end
end
end
subgraph DA["src"]
DB["index.ts"]
subgraph DC["lib"]
DD["customers-products-store.tsx"]
end
end
end
end
subgraph DE["sellers"]
subgraph DF["components"]
subgraph DG["footer"]
subgraph DH["src"]
DI["index.ts"]
subgraph DJ["lib"]
DK["sellers-footer.tsx"]
DL["sellers-footer.spec.tsx"]
end
end
end
subgraph DM["headerbar"]
subgraph DN["src"]
DO["index.ts"]
subgraph DP["lib"]
DQ["SellersHeaderbar.tsx"]
end
end
end
subgraph DR["layout"]
subgraph DS["src"]
DT["index.ts"]
subgraph DU["lib"]
DV["SellersLayout.tsx"]
DW["SellersTabbar.tsx"]
end
end
end
end
subgraph DX["contexts"]
subgraph DY["auth"]
subgraph DZ["src"]
E0["index.ts"]
subgraph E1["lib"]
E2["SellersAuthContext.tsx"]
E3["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E4["graphql"]
subgraph E5["src"]
E6["index.ts"]
subgraph E7["lib"]
E8["fragments.ts"]
E9["mutations.ts"]
EA["Provider.tsx"]
EB["SellersApolloProvider.tsx"]
EC["client.ts"]
ED["queries.ts"]
EE["seller-orders.graphql.ts"]
EF["apollo-upload-client.d.ts"]
end
subgraph EG["types"]
EH["apollo-upload-client.d.ts"]
end
end
end
subgraph EI["hooks"]
subgraph EJ["auth"]
subgraph EK["src"]
EL["index.ts"]
subgraph EM["lib"]
EN["useSellerAuth.ts"]
EO["sellerAuth.graphql.ts"]
end
end
end
subgraph EP["orders"]
subgraph EQ["src"]
ER["index.ts"]
subgraph ES["lib"]
ET["useSellerOrders.ts"]
EU["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph EV["products"]
subgraph EW["src"]
EX["index.ts"]
subgraph EY["lib"]
EZ["useSellersProductManagement.ts"]
F0["useSellersProducts.ts"]
end
end
end
end
subgraph F1["router"]
subgraph F2["src"]
F3["index.ts"]
subgraph F4["lib"]
F5["SellersRouter.tsx"]
end
end
end
subgraph F6["routes"]
subgraph F7["src"]
F8["index.ts"]
subgraph F9["lib"]
FA["seller-routes.ts"]
end
end
end
subgraph FB["screens"]
subgraph FC["catalog"]
subgraph FD["src"]
FE["index.ts"]
subgraph FF["lib"]
FG["SellersCatalogScreens.tsx"]
FH["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FI["login"]
subgraph FJ["src"]
FK["index.ts"]
subgraph FL["lib"]
FM["SellersLogin.tsx"]
end
end
end
subgraph FN["manage-product"]
subgraph FO["src"]
FP["index.ts"]
subgraph FQ["lib"]
FR["SellersManageProductScreen.tsx"]
FS["SellersDefineProductFlow.tsx"]
FT["SellersDefineProductFlow.pants-label.spec.tsx"]
FU["SellersDefineProductFlow.spec.tsx"]
FV["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FW["products"]
subgraph FX["src"]
FY["index.ts"]
subgraph FZ["lib"]
G0["SellersProducts.tsx"]
G1["SellersProducts.pants-label.spec.tsx"]
G2["SellersProducts.spec.tsx"]
end
end
end
subgraph G3["seller-orders"]
G4["jest.config.ts"]
G5["jest.setup.ts"]
subgraph G6["src"]
G7["index.ts"]
subgraph G8["lib"]
G9["seller-orders-screen.tsx"]
GA["seller-status-transitions.ts"]
GB["seller-orders-screen.pants-size.spec.tsx"]
GC["seller-orders-screen.spec.tsx"]
GD["seller-status-transitions.spec.ts"]
end
GE["test-setup.ts"]
end
end
subgraph GF["setup-password"]
subgraph GG["src"]
GH["index.ts"]
subgraph GI["lib"]
GJ["SellersSetupPassword.tsx"]
end
end
end
subgraph GK["unauthorized"]
subgraph GL["src"]
GM["index.ts"]
subgraph GN["lib"]
GO["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GP["zustand"]
subgraph GQ["sellers-products-store"]
subgraph GR["src"]
GS["index.ts"]
subgraph GT["lib"]
GU["useSellersProductsStore.ts"]
GV["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GW["shared"]
subgraph GX["components"]
subgraph GY["apollo-provider-base"]
subgraph GZ["src"]
H0["index.ts"]
subgraph H1["lib"]
H2["ApolloProviderBase.tsx"]
H3["createSilentRefreshAuthLink.ts"]
H4["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph H5["error-boundary"]
subgraph H6["src"]
H7["index.ts"]
subgraph H8["lib"]
H9["error-boundary.tsx"]
HA["error-boundary.spec.tsx"]
end
end
HB["vite.config.ts"]
end
subgraph HC["glassmorphism-container"]
subgraph HD["src"]
HE["index.ts"]
subgraph HF["lib"]
HG["glassmorphism-container.tsx"]
HH["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HI["layout"]
subgraph HJ["src"]
HK["index.ts"]
subgraph HL["lib"]
HM["Layout.tsx"]
end
end
end
subgraph HN["material-data-table"]
subgraph HO["src"]
HP["index.ts"]
subgraph HQ["lib"]
HR["material-data-table.tsx"]
HS["table-config.ts"]
HT["table-utils.ts"]
HU["material-data-table.spec.tsx"]
HV["table-types.ts"]
end
end
end
subgraph HW["order-status-chip"]
subgraph HX["src"]
HY["index.ts"]
subgraph HZ["lib"]
I0["order-status-chip.tsx"]
I1["order-status-chip.spec.tsx"]
end
end
end
subgraph I2["password-field"]
subgraph I3["src"]
I4["index.ts"]
subgraph I5["lib"]
I6["PasswordTextField.tsx"]
end
end
end
subgraph I7["price-display"]
subgraph I8["src"]
I9["index.ts"]
subgraph IA["lib"]
IB["price-display.tsx"]
IC["price-display.spec.tsx"]
end
end
end
subgraph ID["private-route"]
subgraph IE["src"]
IF["index.ts"]
subgraph IG["lib"]
IH["createPrivateRoute.tsx"]
II["PrivateRoute.tsx"]
end
end
end
subgraph IJ["rtl-table-utils"]
subgraph IK["src"]
IL["index.ts"]
subgraph IM["lib"]
IN["rtl-table-utils.ts"]
IO["rtl-cell-components.tsx"]
IP["rtl-column-helpers.ts"]
IQ["rtl-table-props.ts"]
IR["use-table-alignment.ts"]
IS["rtl-table-utils.spec.tsx"]
IT["rtl-table-utils.tsx"]
end
end
end
subgraph IU["snackbar"]
subgraph IV["src"]
IW["index.ts"]
subgraph IX["lib"]
IY["snackbar.tsx"]
IZ["Snackbar.tsx"]
end
end
end
subgraph J0["styled-drawer"]
subgraph J1["src"]
J2["index.ts"]
subgraph J3["lib"]
J4["styled-drawer.tsx"]
J5["styled-drawer.spec.tsx"]
end
end
end
subgraph J6["unauthorized"]
subgraph J7["src"]
J8["index.ts"]
subgraph J9["lib"]
JA["unauthorized-path.tsx"]
end
end
end
end
subgraph JB["graphql"]
subgraph JC["src"]
JD["index.ts"]
subgraph JE["lib"]
JF["currency.mutations.ts"]
JG["currency.queries.ts"]
JH["fragments.ts"]
JI["variant-colors.ts"]
JJ["client-shared-graphql.tsx"]
end
end
end
subgraph JK["hooks"]
subgraph JL["brands"]
subgraph JM["src"]
JN["index.ts"]
subgraph JO["lib"]
JP["brands.graphql.ts"]
JQ["useBrands.ts"]
end
end
JR["vite.config.ts"]
end
subgraph JS["categories"]
subgraph JT["src"]
JU["index.ts"]
subgraph JV["lib"]
JW["useCategories.ts"]
JX["categories.graphql.ts"]
end
end
end
subgraph JY["colors"]
subgraph JZ["src"]
K0["index.ts"]
subgraph K1["lib"]
K2["useColors.ts"]
K3["color.graphql.ts"]
end
end
end
subgraph K4["currency"]
subgraph K5["src"]
K6["index.ts"]
subgraph K7["lib"]
K8["useConvertPrice.tsx"]
K9["useExchangeRate.tsx"]
KA["useCurrencies.tsx"]
KB["useCurrencyForLocale.tsx"]
KC["useExchangeRate.spec.tsx"]
end
end
end
subgraph KD["products"]
subgraph KE["src"]
KF["index.ts"]
subgraph KG["lib"]
KH["productImage.ts"]
KI["products.graphql.ts"]
KJ["useProducts.ts"]
KK["productImage.spec.ts"]
end
end
end
subgraph KL["site-languages"]
subgraph KM["src"]
KN["index.ts"]
subgraph KO["lib"]
KP["site-languages.graphql.ts"]
KQ["useSiteLanguages.ts"]
KR["site-languages-hook.spec.tsx"]
end
end
KS["vite.config.ts"]
end
subgraph KT["snackbar"]
subgraph KU["src"]
KV["index.ts"]
subgraph KW["lib"]
KX["SnackbarContext.tsx"]
KY["useSnackbar.ts"]
end
end
end
subgraph KZ["translations-management-hook"]
subgraph L0["src"]
L1["index.ts"]
subgraph L2["lib"]
L3["useTranslationsManagement.ts"]
end
end
end
end
subgraph L4["lottie"]
subgraph L5["empty-cart"]
subgraph L6["src"]
L7["index.ts"]
subgraph L8["lib"]
L9["lottie-empty-cart.tsx"]
LA["lottie-empty-cart.spec.tsx"]
end
end
LB["vite.config.ts"]
end
subgraph LC["loading"]
subgraph LD["src"]
LE["index.ts"]
subgraph LF["lib"]
LG["lottie-loading.tsx"]
LH["lottie-loading.spec.tsx"]
end
end
end
subgraph LI["success-check"]
subgraph LJ["src"]
LK["index.ts"]
subgraph LL["lib"]
LM["lottie-success-check.tsx"]
LN["lottie-success-check.spec.tsx"]
end
end
end
subgraph LO["unauthorized"]
subgraph LP["src"]
LQ["index.ts"]
subgraph LR["lib"]
LS["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LT["translations"]
subgraph LU["src"]
LV["index.ts"]
subgraph LW["lib"]
LX["mapApolloErrorToTranslationKey.ts"]
LY["WrapTranslation.tsx"]
end
end
end
subgraph LZ["ui"]
subgraph M0["colors"]
subgraph M1["src"]
M2["index.ts"]
subgraph M3["lib"]
M4["colors.ts"]
end
end
end
subgraph M5["language-components"]
subgraph M6["src"]
M7["index.ts"]
subgraph M8["lib"]
M9["language-components.tsx"]
MA["ltr-text-field.tsx"]
end
end
end
subgraph MB["sizes"]
subgraph MC["src"]
MD["index.ts"]
subgraph ME["lib"]
MF["sizes.ts"]
MG["sizes.spec.tsx"]
MH["sizes.tsx"]
end
end
end
end
subgraph MI["zustand"]
subgraph MJ["shared-auth-store"]
subgraph MK["src"]
ML["index.ts"]
subgraph MM["lib"]
MN["shared-auth-store.ts"]
end
end
end
subgraph MO["shared-notification-store"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["shared-notification-store.tsx"]
end
end
end
subgraph MT["shared-ui-store"]
subgraph MU["src"]
MV["index.ts"]
subgraph MW["lib"]
MX["shared-ui-store.ts"]
MY["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MZ["server"]
subgraph N0["controllers"]
subgraph N1["src"]
N2["index.ts"]
subgraph N3["lib"]
N4["auth.controller.ts"]
N5["order.controller.ts"]
end
end
end
subgraph N6["decorators"]
N7["jest.config.ts"]
subgraph N8["src"]
N9["index.ts"]
subgraph NA["lib"]
NB["current-user.decorator.ts"]
NC["decorators.ts"]
ND["decorators.spec.ts"]
end
end
end
subgraph NE["entities"]
subgraph NF["src"]
NG["index.ts"]
subgraph NH["lib"]
NI["brand.entity.ts"]
NJ["product.entity.ts"]
NK["category.entity.ts"]
NL["product-description.entity.ts"]
NM["site-language.entity.ts"]
NN["product-info.entity.ts"]
NO["color.entity.ts"]
NP["product-info-color.entity.ts"]
NQ["seller-info.entity.ts"]
NR["seller-product.entity.ts"]
NS["user.entity.ts"]
NT["cart.entity.ts"]
NU["currency-preference.entity.ts"]
NV["currency.entity.ts"]
NW["customer.entity.ts"]
NX["exchange-rate.entity.ts"]
NY["order.entity.ts"]
NZ["platform-settings.entity.ts"]
O0["refresh-token.entity.ts"]
O1["seller-order.entity.ts"]
O2["translation.entity.ts"]
end
end
end
subgraph O3["guards"]
O4["jest.config.ts"]
subgraph O5["src"]
O6["index.ts"]
subgraph O7["lib"]
O8["catalog.guard.ts"]
O9["graphql-auth.guard.ts"]
OA["http-auth.guard.ts"]
OB["roles.guard.ts"]
OC["catalog.guard.spec.ts"]
OD["roles.guard.spec.ts"]
end
end
end
subgraph OE["inputs"]
subgraph OF["src"]
OG["index.ts"]
subgraph OH["lib"]
OI["brand.input.ts"]
OJ["cart.inputs.ts"]
OK["category.input.ts"]
OL["color.input.ts"]
OM["customer-auth.inputs.ts"]
ON["order-pagination.inputs.ts"]
OO["order.inputs.ts"]
OP["product-info-filter.input.ts"]
OQ["product.input.ts"]
OR["seller-order-pagination.inputs.ts"]
OS["seller.input.ts"]
OT["site-language.input.ts"]
OU["user.input.ts"]
end
end
end
subgraph OV["modules"]
subgraph OW["src"]
OX["index.ts"]
subgraph OY["lib"]
OZ["auth.module.ts"]
P0["email.module.ts"]
P1["token.module.ts"]
P2["user.module.ts"]
P3["customer-profile.module.ts"]
P4["brand.module.ts"]
P5["catalog-guard.module.ts"]
P6["translation.module.ts"]
P7["cart.module.ts"]
P8["platform-settings.module.ts"]
P9["category.module.ts"]
PA["product.module.ts"]
PB["color.module.ts"]
PC["currency.module.ts"]
PD["graphql-context.module.ts"]
PE["order.module.ts"]
PF["seller-info.module.ts"]
PG["payment.module.ts"]
PH["product-info.module.ts"]
PI["seller-products.module.ts"]
PJ["site-language.module.ts"]
end
end
end
subgraph PK["resolvers"]
PL["jest.config.ts"]
subgraph PM["src"]
PN["index.ts"]
subgraph PO["lib"]
PP["auth.resolver.ts"]
PQ["zod-validation.pipe.ts"]
PR["brand.resolver.ts"]
PS["cart.resolver.ts"]
PT["category.resolver.ts"]
PU["color.resolver.ts"]
PV["currency.resolver.ts"]
PW["customer-profile.resolver.ts"]
PX["order.resolver.ts"]
PY["payment.resolver.ts"]
PZ["product-info.resolver.ts"]
Q0["product.resolver.ts"]
Q1["seller-info.resolver.ts"]
Q2["shipping.resolver.ts"]
Q3["site-language.resolver.ts"]
Q4["translation.input.ts"]
Q5["translation.resolver.ts"]
Q6["user.resolver.ts"]
Q7["auth-validation.spec.ts"]
Q8["auth.resolver.spec.ts"]
Q9["order.resolver.spec.ts"]
QA["order.resolver.status-transitions.spec.ts"]
QB["order.resolver.tracking.spec.ts"]
QC["payment.resolver.integration.spec.ts"]
QD["payment.resolver.spec.ts"]
QE["product-info.resolver.spec.ts"]
QF["translation.resolver.guards.spec.ts"]
subgraph QG["types"]
QH["graphql-upload.d.ts"]
end
QI["user.resolver.spec.ts"]
QJ["zod-validation.pipe.spec.ts"]
end
end
end
subgraph QK["services"]
QL["jest.config.ts"]
subgraph QM["src"]
QN["index.ts"]
subgraph QO["lib"]
QP["auth.service.ts"]
QQ["brand.service.ts"]
QR["cart.service.ts"]
QS["product-info-colors.util.ts"]
QT["category.service.ts"]
QU["color.service.ts"]
QV["currency.service.ts"]
QW["customer-profile.service.ts"]
QX["email.service.ts"]
QY["image-upload.service.ts"]
QZ["order.service.ts"]
R0["payment-logger.service.ts"]
R1["payment.service.ts"]
R2["product.service.ts"]
R3["seller-info.service.ts"]
R4["shipping-calculation.service.ts"]
R5["site-language.service.ts"]
R6["token.service.ts"]
R7["translation.service.ts"]
R8["user.service.ts"]
R9["auth.service.password-policy.spec.ts"]
RA["auth.service.spec.ts"]
RB["cart.service.add-quantity.spec.ts"]
RC["cart.service.null-relations.spec.ts"]
RD["cart.service.spec.ts"]
RE["order.service.spec.ts"]
RF["order.service.tracking.spec.ts"]
RG["product-info-colors.util.spec.ts"]
RH["product.service.pants.spec.ts"]
RI["product.service.spec.ts"]
RJ["relay-connection.spec.ts"]
RK["seller-info.service.price-validation.spec.ts"]
RL["shipping-calculation.service.spec.ts"]
RM["token.service.spec.ts"]
end
end
end
subgraph RN["strategies"]
subgraph RO["src"]
RP["index.ts"]
subgraph RQ["lib"]
RR["local.strategy.ts"]
end
end
end
subgraph RS["utils"]
subgraph RT["src"]
RU["index.ts"]
subgraph RV["lib"]
RW["email-templates.ts"]
RX["relay-connection.ts"]
RY["pagination.ts"]
end
end
end
end
subgraph RZ["shared"]
subgraph S0["codegen"]
S1["jest.config.ts"]
subgraph S2["src"]
S3["index.ts"]
subgraph S4["lib"]
subgraph S5["generated"]
S6["graphql.ts"]
end
end
end
end
subgraph S7["graphql-schema"]
S8["jest.config.ts"]
subgraph S9["src"]
SA["index.ts"]
end
end
subgraph SB["product-sizes"]
subgraph SC["src"]
SD["index.ts"]
subgraph SE["lib"]
SF["product-sizes.ts"]
SG["product-sizes.pants-formats.spec.ts"]
SH["product-sizes.pants-label.spec.ts"]
SI["product-sizes.pants-strict.spec.ts"]
SJ["product-sizes.spec.ts"]
end
end
end
subgraph SK["shared-i18n"]
subgraph SL["src"]
SM["index.ts"]
subgraph SN["lib"]
SO["language-context.tsx"]
SP["language-detector.ts"]
subgraph SQ["locales"]
SR["i18n-react.tsx"]
SS["i18n-util.ts"]
ST["i18n-util.async.ts"]
subgraph SU["en"]
SV["index.ts"]
end
subgraph SX["fa"]
SY["index.ts"]
end
SZ["formatters.ts"]
T0["i18n-types.ts"]
T1["i18n-util.sync.ts"]
T2["navigator-detector.ts"]
end
SW["site-name.ts"]
T3["table-localization.ts"]
T4["theme-provider.tsx"]
T5["use-page-title.ts"]
end
end
end
subgraph T6["validation"]
subgraph T7["src"]
T8["index.ts"]
subgraph T9["lib"]
TA["auth.ts"]
TB["limits.ts"]
TC["primitives.ts"]
TD["auth-forms.ts"]
TE["errors.ts"]
TF["auth-forms.login.spec.ts"]
TG["auth-forms.spec.ts"]
TH["auth.spec.ts"]
TI["errors.spec.ts"]
TJ["primitives.spec.ts"]
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
B7-->B5
BA-->BC
BD-->BC
BH-->BJ
BK-->BJ
BO-->BQ
BR-->BQ
BS-->BQ
BW-->BY
BZ-->BY
C2-->C4
C5-->C4
C9-->CB
CF-->CH
CK-->CM
CN-->CM
CN-->CO
CS-->CU
CV-->CU
CZ-->D1
D2-->D1
D6-->D8
D9-->D8
DB-->DD
DI-->DK
DL-->DK
DO-->DQ
DT-->DV
DT-->DW
DV-->DW
E0-->E2
E3-->E2
E6-->E8
E6-->E9
E6-->EA
E6-->ED
EA-->EB
EB-->EC
ED-->E8
ED-->EE
EL-->EN
EN-->EO
ER-->ET
EX-->EZ
EX-->F0
F3-->F5
F8-->FA
FE-->FG
FH-->FG
FK-->FM
FP-->FR
FR-->FS
FT-->FS
FU-->FS
FV-->FR
FY-->G0
G1-->G0
G2-->G0
G7-->G9
G9-->GA
GB-->G9
GC-->G9
GD-->GA
GH-->GJ
GM-->GO
GS-->GU
H0-->H2
H0-->H3
H4-->H3
H7-->H9
HA-->H9
HE-->HG
HH-->HG
HK-->HM
HP-->HR
HP-->HS
HP-->HT
HR-->HS
HU-->HR
HY-->I0
I1-->I0
I4-->I6
I9-->IB
IC-->IB
IF-->IH
IH-->II
IL-->IN
IN-->IO
IN-->IP
IN-->IQ
IN-->IR
IP-->IO
IP-->IQ
IS-->IT
IW-->IY
J2-->J4
J5-->J4
J8-->JA
JD-->JF
JD-->JG
JD-->JH
JD-->JI
JN-->JP
JN-->JQ
JQ-->JP
JU-->JW
JW-->JX
K0-->K2
K2-->K3
K6-->K8
K6-->KA
K6-->KB
K6-->K9
K8-->K9
KC-->K9
KF-->KH
KF-->KI
KF-->KJ
KJ-->KI
KK-->KH
KN-->KP
KN-->KQ
KQ-->KP
KR-->KQ
KV-->KX
KV-->KY
KY-->KX
L1-->L3
L7-->L9
LA-->L9
LE-->LG
LH-->LG
LK-->LM
LN-->LM
LQ-->LS
LV-->LX
M2-->M4
M7-->M9
M7-->MA
MD-->MF
MG-->MH
ML-->MN
MQ-->MS
MV-->MX
N2-->N4
N2-->N5
N9-->NB
N9-->NC
ND-->NC
NG-->NI
NG-->NT
NG-->NK
NG-->NO
NG-->NU
NG-->NV
NG-->NW
NG-->NX
NG-->NY
NG-->NZ
NG-->NL
NG-->NP
NG-->NN
NG-->NJ
NG-->O0
NG-->NQ
NG-->O1
NG-->NR
NG-->NM
NG-->O2
NG-->NS
NI-->NJ
NJ-->NI
NJ-->NK
NJ-->NL
NJ-->NN
NJ-->NQ
NJ-->NR
NK-->NJ
NL-->NJ
NL-->NM
NM-->NL
NN-->NO
NN-->NP
NN-->NJ
NP-->NO
NP-->NN
NQ-->NR
NQ-->NS
NR-->NN
NR-->NJ
NR-->NQ
NT-->NJ
NT-->NS
NU-->NV
NW-->NS
NX-->NV
NX-->NS
NY-->NJ
NY-->NQ
O0-->NS
O1-->NY
O6-->O8
O6-->O9
O6-->OA
O6-->OB
OC-->O8
OD-->OB
OG-->OI
OG-->OJ
OG-->OK
OG-->OL
OG-->OM
OG-->ON
OG-->OO
OG-->OP
OG-->OQ
OG-->OR
OG-->OS
OG-->OT
OG-->OU
OQ-->OP
OX-->OZ
OX-->P4
OX-->P7
OX-->P5
OX-->P9
OX-->PB
OX-->PC
OX-->P3
OX-->P0
OX-->PD
OX-->PE
OX-->PG
OX-->P8
OX-->PH
OX-->PA
OX-->PF
OX-->PI
OX-->PJ
OX-->P1
OX-->P6
OX-->P2
OZ-->P0
OZ-->P1
OZ-->P2
P2-->OZ
P2-->P3
P4-->P5
P4-->P6
P7-->P8
P9-->P5
P9-->PA
P9-->P6
PA-->P5
PA-->P1
PA-->P6
PB-->P5
PB-->P6
PD-->P0
PD-->P1
PD-->P2
PE-->P8
PE-->PF
PF-->PA
PF-->P1
PF-->P2
PG-->PE
PH-->PA
PH-->P6
PI-->PF
PI-->P2
PN-->PP
PN-->PR
PN-->PS
PN-->PT
PN-->PU
PN-->PV
PN-->PW
PN-->PX
PN-->PY
PN-->PZ
PN-->Q0
PN-->Q1
PN-->Q2
PN-->Q3
PN-->Q4
PN-->Q5
PN-->Q6
PN-->PQ
PP-->PQ
Q6-->PQ
Q7-->PP
Q7-->Q6
Q7-->PQ
Q8-->PP
Q9-->PX
QA-->PX
QB-->PX
QC-->PY
QD-->PY
QE-->PZ
QF-->Q5
QI-->Q6
QJ-->PQ
QN-->QP
QN-->QQ
QN-->QR
QN-->QT
QN-->QU
QN-->QV
QN-->QW
QN-->QX
QN-->QY
QN-->QZ
QN-->R0
QN-->R1
QN-->QS
QN-->R2
QN-->R3
QN-->R4
QN-->R5
QN-->R6
QN-->R7
QN-->R8
QR-->QS
R2-->QS
R3-->QS
R9-->QP
R9-->QX
R9-->R6
R9-->R8
RA-->QP
RA-->QX
RA-->R6
RA-->R8
RB-->QR
RC-->QR
RD-->QR
RE-->QZ
RF-->QZ
RG-->QS
RH-->R2
RH-->R7
RI-->R2
RI-->R7
RK-->QP
RK-->R3
RL-->R4
RM-->R6
RP-->RR
RU-->RW
RU-->RX
S3-->S6
SD-->SF
SG-->SF
SH-->SF
SI-->SF
SJ-->SF
SM-->SO
SM-->SP
SM-->SR
SM-->T0
SM-->SS
SM-->ST
SM-->T1
SM-->T2
SM-->SW
SM-->T3
SM-->T4
SM-->T5
SO-->SP
SO-->SR
SO-->ST
SR-->SS
ST-->SV
ST-->SY
ST-->SZ
ST-->SS
SV-->SW
SY-->SW
T1-->SV
T1-->SY
T1-->SZ
T1-->SS
T3-->SR
T4-->SO
T5-->SR
T8-->TA
T8-->TD
T8-->TE
T8-->TB
T8-->TC
TA-->TB
TA-->TC
TC-->TB
TD-->TA
TF-->TD
TG-->TD
TH-->TA
TI-->TE
TJ-->TB
TJ-->TC
