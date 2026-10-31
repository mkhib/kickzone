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
end
end
end
subgraph 9U["forgot-password"]
subgraph 9V["src"]
9W["index.ts"]
subgraph 9X["lib"]
9Y["customer-forgot-password.tsx"]
9Z["customer-forgot-password.spec.tsx"]
end
end
end
subgraph A0["guide-authenticity"]
subgraph A1["src"]
A2["index.ts"]
subgraph A3["lib"]
A4["customer-guide-authenticity.tsx"]
A5["customer-guide-authenticity.spec.tsx"]
end
end
A6["vite.config.ts"]
end
subgraph A7["guide-payment"]
subgraph A8["src"]
A9["index.ts"]
subgraph AA["lib"]
AB["customer-guide-payment.tsx"]
AC["customer-guide-payment.spec.tsx"]
end
end
AD["vite.config.ts"]
end
subgraph AE["home"]
subgraph AF["src"]
AG["index.ts"]
subgraph AH["lib"]
AI["CustomersHomeScreen.tsx"]
subgraph AJ["components"]
AK["CategoryBentoSection.tsx"]
AM["HeroSection.tsx"]
AN["HomeLoadingScreen.tsx"]
AO["PicksRailSection.tsx"]
AP["TrustStripSection.tsx"]
AU["NewArrivalsSection.tsx"]
AW["BrandBlocksSection.tsx"]
AX["NewsletterSection.tsx"]
AY["ShopTheLookSection.tsx"]
AZ["TickerSection.tsx"]
end
AL["home-selectors.ts"]
AQ["useScrollProgress.ts"]
AR["CustomersShopScreen.tsx"]
AS["CustomersHomeScreen.cart-size.spec.tsx"]
AT["CustomersHomeScreen.spec.tsx"]
AV["CustomersShopScreen.cart-size.spec.tsx"]
end
end
end
subgraph B0["login"]
subgraph B1["src"]
B2["index.ts"]
subgraph B3["lib"]
B4["CustomersLoginScreen.tsx"]
B5["CustomersLoginScreen.spec.tsx"]
end
end
end
subgraph B6["not-found"]
subgraph B7["src"]
B8["index.ts"]
subgraph B9["lib"]
BA["customer-not-found.tsx"]
BB["customer-not-found.spec.tsx"]
end
end
BC["vite.config.ts"]
end
subgraph BD["privacy-policy"]
subgraph BE["src"]
BF["index.ts"]
subgraph BG["lib"]
BH["customer-privacy-policy.tsx"]
BI["customer-privacy-policy.spec.tsx"]
end
end
BJ["vite.config.ts"]
end
subgraph BK["product-details"]
subgraph BL["src"]
BM["index.ts"]
subgraph BN["lib"]
BO["customer-product-details.tsx"]
BP["customer-product-details.pants-size.spec.tsx"]
BQ["customer-product-details.spec.tsx"]
end
end
BR["vite.config.ts"]
end
subgraph BS["reset-password"]
subgraph BT["src"]
BU["index.ts"]
subgraph BV["lib"]
BW["customer-reset-password.tsx"]
BX["customer-reset-password.password-length.spec.tsx"]
end
end
end
subgraph BY["shipping-returns"]
subgraph BZ["src"]
C0["index.ts"]
subgraph C1["lib"]
C2["customer-shipping-returns.tsx"]
C3["customer-shipping-returns.spec.tsx"]
end
end
C4["vite.config.ts"]
end
subgraph C5["unauthorized"]
subgraph C6["src"]
C7["index.ts"]
subgraph C8["lib"]
C9["customers-unauthorized-screen.tsx"]
end
end
end
end
subgraph CA["utility"]
subgraph CB["test"]
subgraph CC["src"]
CD["index.ts"]
subgraph CE["lib"]
CF["customers-test-utility.tsx"]
end
end
end
end
subgraph CG["validations"]
subgraph CH["src"]
CI["index.ts"]
subgraph CJ["lib"]
CK["shipping-validation.ts"]
CL["shipping-validation.spec.tsx"]
CM["shipping-validation.tsx"]
end
end
end
subgraph CN["zustand"]
subgraph CO["customer-cart-store"]
subgraph CP["src"]
CQ["index.ts"]
subgraph CR["lib"]
CS["customer-cart-store.ts"]
CT["customer-cart-store.spec.ts"]
CU["customer-cart-store.tsx"]
end
end
end
subgraph CV["customer-checkout-store"]
subgraph CW["src"]
CX["index.ts"]
subgraph CY["lib"]
CZ["customer-checkout-store.ts"]
D0["customer-checkout-store.spec.ts"]
end
end
D1["vite.config.ts"]
end
subgraph D2["customer-wishlist-store"]
subgraph D3["src"]
D4["index.ts"]
subgraph D5["lib"]
D6["customer-wishlist-store.ts"]
D7["customer-wishlist-store.spec.ts"]
end
end
end
subgraph D8["src"]
D9["index.ts"]
subgraph DA["lib"]
DB["customers-products-store.tsx"]
end
end
end
end
subgraph DC["sellers"]
subgraph DD["components"]
subgraph DE["footer"]
subgraph DF["src"]
DG["index.ts"]
subgraph DH["lib"]
DI["sellers-footer.tsx"]
DJ["sellers-footer.spec.tsx"]
end
end
end
subgraph DK["headerbar"]
subgraph DL["src"]
DM["index.ts"]
subgraph DN["lib"]
DO["SellersHeaderbar.tsx"]
end
end
end
subgraph DP["layout"]
subgraph DQ["src"]
DR["index.ts"]
subgraph DS["lib"]
DT["SellersLayout.tsx"]
DU["SellersTabbar.tsx"]
end
end
end
end
subgraph DV["contexts"]
subgraph DW["auth"]
subgraph DX["src"]
DY["index.ts"]
subgraph DZ["lib"]
E0["SellersAuthContext.tsx"]
E1["SellersAuthContext.spec.tsx"]
end
end
end
end
subgraph E2["graphql"]
subgraph E3["src"]
E4["index.ts"]
subgraph E5["lib"]
E6["fragments.ts"]
E7["mutations.ts"]
E8["Provider.tsx"]
E9["SellersApolloProvider.tsx"]
EA["client.ts"]
EB["queries.ts"]
EC["seller-orders.graphql.ts"]
ED["apollo-upload-client.d.ts"]
end
subgraph EE["types"]
EF["apollo-upload-client.d.ts"]
end
end
end
subgraph EG["hooks"]
subgraph EH["auth"]
subgraph EI["src"]
EJ["index.ts"]
subgraph EK["lib"]
EL["useSellerAuth.ts"]
EM["sellerAuth.graphql.ts"]
end
end
end
subgraph EN["orders"]
subgraph EO["src"]
EP["index.ts"]
subgraph EQ["lib"]
ER["useSellerOrders.ts"]
ES["useSellerOrders.tracking.spec.tsx"]
end
end
end
subgraph ET["products"]
subgraph EU["src"]
EV["index.ts"]
subgraph EW["lib"]
EX["useSellersProductManagement.ts"]
EY["useSellersProducts.ts"]
end
end
end
end
subgraph EZ["router"]
subgraph F0["src"]
F1["index.ts"]
subgraph F2["lib"]
F3["SellersRouter.tsx"]
end
end
end
subgraph F4["routes"]
subgraph F5["src"]
F6["index.ts"]
subgraph F7["lib"]
F8["seller-routes.ts"]
end
end
end
subgraph F9["screens"]
subgraph FA["catalog"]
subgraph FB["src"]
FC["index.ts"]
subgraph FD["lib"]
FE["SellersCatalogScreens.tsx"]
FF["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FG["login"]
subgraph FH["src"]
FI["index.ts"]
subgraph FJ["lib"]
FK["SellersLogin.tsx"]
end
end
end
subgraph FL["manage-product"]
subgraph FM["src"]
FN["index.ts"]
subgraph FO["lib"]
FP["SellersManageProductScreen.tsx"]
FQ["SellersDefineProductFlow.tsx"]
FR["SellersDefineProductFlow.pants-label.spec.tsx"]
FS["SellersDefineProductFlow.spec.tsx"]
FT["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FU["products"]
subgraph FV["src"]
FW["index.ts"]
subgraph FX["lib"]
FY["SellersProducts.tsx"]
FZ["SellersProducts.pants-label.spec.tsx"]
G0["SellersProducts.spec.tsx"]
end
end
end
subgraph G1["seller-orders"]
G2["jest.config.ts"]
G3["jest.setup.ts"]
subgraph G4["src"]
G5["index.ts"]
subgraph G6["lib"]
G7["seller-orders-screen.tsx"]
G8["seller-status-transitions.ts"]
G9["seller-orders-screen.pants-size.spec.tsx"]
GA["seller-orders-screen.spec.tsx"]
GB["seller-status-transitions.spec.ts"]
end
GC["test-setup.ts"]
end
end
subgraph GD["setup-password"]
subgraph GE["src"]
GF["index.ts"]
subgraph GG["lib"]
GH["SellersSetupPassword.tsx"]
end
end
end
subgraph GI["unauthorized"]
subgraph GJ["src"]
GK["index.ts"]
subgraph GL["lib"]
GM["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GN["zustand"]
subgraph GO["sellers-products-store"]
subgraph GP["src"]
GQ["index.ts"]
subgraph GR["lib"]
GS["useSellersProductsStore.ts"]
GT["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GU["shared"]
subgraph GV["components"]
subgraph GW["apollo-provider-base"]
subgraph GX["src"]
GY["index.ts"]
subgraph GZ["lib"]
H0["ApolloProviderBase.tsx"]
H1["createSilentRefreshAuthLink.ts"]
H2["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph H3["error-boundary"]
subgraph H4["src"]
H5["index.ts"]
subgraph H6["lib"]
H7["error-boundary.tsx"]
H8["error-boundary.spec.tsx"]
end
end
H9["vite.config.ts"]
end
subgraph HA["glassmorphism-container"]
subgraph HB["src"]
HC["index.ts"]
subgraph HD["lib"]
HE["glassmorphism-container.tsx"]
HF["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HG["layout"]
subgraph HH["src"]
HI["index.ts"]
subgraph HJ["lib"]
HK["Layout.tsx"]
end
end
end
subgraph HL["material-data-table"]
subgraph HM["src"]
HN["index.ts"]
subgraph HO["lib"]
HP["material-data-table.tsx"]
HQ["table-config.ts"]
HR["table-utils.ts"]
HS["material-data-table.spec.tsx"]
HT["table-types.ts"]
end
end
end
subgraph HU["order-status-chip"]
subgraph HV["src"]
HW["index.ts"]
subgraph HX["lib"]
HY["order-status-chip.tsx"]
HZ["order-status-chip.spec.tsx"]
end
end
end
subgraph I0["password-field"]
subgraph I1["src"]
I2["index.ts"]
subgraph I3["lib"]
I4["PasswordTextField.tsx"]
end
end
end
subgraph I5["price-display"]
subgraph I6["src"]
I7["index.ts"]
subgraph I8["lib"]
I9["price-display.tsx"]
IA["price-display.spec.tsx"]
end
end
end
subgraph IB["private-route"]
subgraph IC["src"]
ID["index.ts"]
subgraph IE["lib"]
IF["createPrivateRoute.tsx"]
IG["PrivateRoute.tsx"]
end
end
end
subgraph IH["rtl-table-utils"]
subgraph II["src"]
IJ["index.ts"]
subgraph IK["lib"]
IL["rtl-table-utils.ts"]
IM["rtl-cell-components.tsx"]
IN["rtl-column-helpers.ts"]
IO["rtl-table-props.ts"]
IP["use-table-alignment.ts"]
IQ["rtl-table-utils.spec.tsx"]
IR["rtl-table-utils.tsx"]
end
end
end
subgraph IS["snackbar"]
subgraph IT["src"]
IU["index.ts"]
subgraph IV["lib"]
IW["snackbar.tsx"]
IX["Snackbar.tsx"]
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
9W-->9Y
9Z-->9Y
A2-->A4
A5-->A4
A9-->AB
AC-->AB
AG-->AI
AG-->AR
AG-->AL
AG-->AQ
AI-->AK
AI-->AM
AI-->AN
AI-->AO
AI-->AP
AI-->AL
AI-->AQ
AK-->AL
AR-->AL
AS-->AO
AS-->AI
AS-->AL
AT-->AU
AT-->AO
AT-->AI
AT-->AR
AT-->AL
AV-->AR
AW-->AL
AY-->AL
B2-->B4
B5-->B4
B8-->BA
BB-->BA
BF-->BH
BI-->BH
BM-->BO
BP-->BO
BQ-->BO
BU-->BW
BX-->BW
C0-->C2
C3-->C2
C7-->C9
CD-->CF
CI-->CK
CL-->CK
CL-->CM
CQ-->CS
CT-->CS
CX-->CZ
D0-->CZ
D4-->D6
D7-->D6
D9-->DB
DG-->DI
DJ-->DI
DM-->DO
DR-->DT
DR-->DU
DT-->DU
DY-->E0
E1-->E0
E4-->E6
E4-->E7
E4-->E8
E4-->EB
E8-->E9
E9-->EA
EB-->E6
EB-->EC
EJ-->EL
EL-->EM
EP-->ER
EV-->EX
EV-->EY
F1-->F3
F6-->F8
FC-->FE
FF-->FE
FI-->FK
FN-->FP
FP-->FQ
FR-->FQ
FS-->FQ
FT-->FP
FW-->FY
FZ-->FY
G0-->FY
G5-->G7
G7-->G8
G9-->G7
GA-->G7
GB-->G8
GF-->GH
GK-->GM
GQ-->GS
GY-->H0
GY-->H1
H2-->H1
H5-->H7
H8-->H7
HC-->HE
HF-->HE
HI-->HK
HN-->HP
HN-->HQ
HN-->HR
HP-->HQ
HS-->HP
HW-->HY
HZ-->HY
I2-->I4
I7-->I9
IA-->I9
ID-->IF
IF-->IG
IJ-->IL
IL-->IM
IL-->IN
IL-->IO
IL-->IP
IN-->IM
IN-->IO
IQ-->IR
IU-->IW
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
