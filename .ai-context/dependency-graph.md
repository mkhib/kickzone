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
G8["seller-orders-screen.pants-size.spec.tsx"]
G9["seller-orders-screen.spec.tsx"]
end
GA["test-setup.ts"]
end
end
subgraph GB["setup-password"]
subgraph GC["src"]
GD["index.ts"]
subgraph GE["lib"]
GF["SellersSetupPassword.tsx"]
end
end
end
subgraph GG["unauthorized"]
subgraph GH["src"]
GI["index.ts"]
subgraph GJ["lib"]
GK["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GL["zustand"]
subgraph GM["sellers-products-store"]
subgraph GN["src"]
GO["index.ts"]
subgraph GP["lib"]
GQ["useSellersProductsStore.ts"]
GR["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GS["shared"]
subgraph GT["components"]
subgraph GU["apollo-provider-base"]
subgraph GV["src"]
GW["index.ts"]
subgraph GX["lib"]
GY["ApolloProviderBase.tsx"]
GZ["createSilentRefreshAuthLink.ts"]
H0["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph H1["error-boundary"]
subgraph H2["src"]
H3["index.ts"]
subgraph H4["lib"]
H5["error-boundary.tsx"]
H6["error-boundary.spec.tsx"]
end
end
H7["vite.config.ts"]
end
subgraph H8["glassmorphism-container"]
subgraph H9["src"]
HA["index.ts"]
subgraph HB["lib"]
HC["glassmorphism-container.tsx"]
HD["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HE["layout"]
subgraph HF["src"]
HG["index.ts"]
subgraph HH["lib"]
HI["Layout.tsx"]
end
end
end
subgraph HJ["material-data-table"]
subgraph HK["src"]
HL["index.ts"]
subgraph HM["lib"]
HN["material-data-table.tsx"]
HO["table-config.ts"]
HP["table-utils.ts"]
HQ["material-data-table.spec.tsx"]
HR["table-types.ts"]
end
end
end
subgraph HS["order-status-chip"]
subgraph HT["src"]
HU["index.ts"]
subgraph HV["lib"]
HW["order-status-chip.tsx"]
HX["order-status-chip.spec.tsx"]
end
end
end
subgraph HY["password-field"]
subgraph HZ["src"]
I0["index.ts"]
subgraph I1["lib"]
I2["PasswordTextField.tsx"]
end
end
end
subgraph I3["price-display"]
subgraph I4["src"]
I5["index.ts"]
subgraph I6["lib"]
I7["price-display.tsx"]
I8["price-display.spec.tsx"]
end
end
end
subgraph I9["private-route"]
subgraph IA["src"]
IB["index.ts"]
subgraph IC["lib"]
ID["createPrivateRoute.tsx"]
IE["PrivateRoute.tsx"]
end
end
end
subgraph IF["rtl-table-utils"]
subgraph IG["src"]
IH["index.ts"]
subgraph II["lib"]
IJ["rtl-table-utils.ts"]
IK["rtl-cell-components.tsx"]
IL["rtl-column-helpers.ts"]
IM["rtl-table-props.ts"]
IN["use-table-alignment.ts"]
IO["rtl-table-utils.spec.tsx"]
IP["rtl-table-utils.tsx"]
end
end
end
subgraph IQ["snackbar"]
subgraph IR["src"]
IS["index.ts"]
subgraph IT["lib"]
IU["snackbar.tsx"]
IV["Snackbar.tsx"]
end
end
end
subgraph IW["styled-drawer"]
subgraph IX["src"]
IY["index.ts"]
subgraph IZ["lib"]
J0["styled-drawer.tsx"]
J1["styled-drawer.spec.tsx"]
end
end
end
subgraph J2["unauthorized"]
subgraph J3["src"]
J4["index.ts"]
subgraph J5["lib"]
J6["unauthorized-path.tsx"]
end
end
end
end
subgraph J7["graphql"]
subgraph J8["src"]
J9["index.ts"]
subgraph JA["lib"]
JB["currency.mutations.ts"]
JC["currency.queries.ts"]
JD["fragments.ts"]
JE["variant-colors.ts"]
JF["client-shared-graphql.tsx"]
end
end
end
subgraph JG["hooks"]
subgraph JH["brands"]
subgraph JI["src"]
JJ["index.ts"]
subgraph JK["lib"]
JL["brands.graphql.ts"]
JM["useBrands.ts"]
end
end
JN["vite.config.ts"]
end
subgraph JO["categories"]
subgraph JP["src"]
JQ["index.ts"]
subgraph JR["lib"]
JS["useCategories.ts"]
JT["categories.graphql.ts"]
end
end
end
subgraph JU["colors"]
subgraph JV["src"]
JW["index.ts"]
subgraph JX["lib"]
JY["useColors.ts"]
JZ["color.graphql.ts"]
end
end
end
subgraph K0["currency"]
subgraph K1["src"]
K2["index.ts"]
subgraph K3["lib"]
K4["useConvertPrice.tsx"]
K5["useExchangeRate.tsx"]
K6["useCurrencies.tsx"]
K7["useCurrencyForLocale.tsx"]
K8["useExchangeRate.spec.tsx"]
end
end
end
subgraph K9["products"]
subgraph KA["src"]
KB["index.ts"]
subgraph KC["lib"]
KD["productImage.ts"]
KE["products.graphql.ts"]
KF["useProducts.ts"]
KG["productImage.spec.ts"]
end
end
end
subgraph KH["site-languages"]
subgraph KI["src"]
KJ["index.ts"]
subgraph KK["lib"]
KL["site-languages.graphql.ts"]
KM["useSiteLanguages.ts"]
KN["site-languages-hook.spec.tsx"]
end
end
KO["vite.config.ts"]
end
subgraph KP["snackbar"]
subgraph KQ["src"]
KR["index.ts"]
subgraph KS["lib"]
KT["SnackbarContext.tsx"]
KU["useSnackbar.ts"]
end
end
end
subgraph KV["translations-management-hook"]
subgraph KW["src"]
KX["index.ts"]
subgraph KY["lib"]
KZ["useTranslationsManagement.ts"]
end
end
end
end
subgraph L0["lottie"]
subgraph L1["empty-cart"]
subgraph L2["src"]
L3["index.ts"]
subgraph L4["lib"]
L5["lottie-empty-cart.tsx"]
L6["lottie-empty-cart.spec.tsx"]
end
end
L7["vite.config.ts"]
end
subgraph L8["loading"]
subgraph L9["src"]
LA["index.ts"]
subgraph LB["lib"]
LC["lottie-loading.tsx"]
LD["lottie-loading.spec.tsx"]
end
end
end
subgraph LE["success-check"]
subgraph LF["src"]
LG["index.ts"]
subgraph LH["lib"]
LI["lottie-success-check.tsx"]
LJ["lottie-success-check.spec.tsx"]
end
end
end
subgraph LK["unauthorized"]
subgraph LL["src"]
LM["index.ts"]
subgraph LN["lib"]
LO["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LP["translations"]
subgraph LQ["src"]
LR["index.ts"]
subgraph LS["lib"]
LT["mapApolloErrorToTranslationKey.ts"]
LU["WrapTranslation.tsx"]
end
end
end
subgraph LV["ui"]
subgraph LW["colors"]
subgraph LX["src"]
LY["index.ts"]
subgraph LZ["lib"]
M0["colors.ts"]
end
end
end
subgraph M1["language-components"]
subgraph M2["src"]
M3["index.ts"]
subgraph M4["lib"]
M5["language-components.tsx"]
M6["ltr-text-field.tsx"]
end
end
end
subgraph M7["sizes"]
subgraph M8["src"]
M9["index.ts"]
subgraph MA["lib"]
MB["sizes.ts"]
MC["sizes.spec.tsx"]
MD["sizes.tsx"]
end
end
end
end
subgraph ME["zustand"]
subgraph MF["shared-auth-store"]
subgraph MG["src"]
MH["index.ts"]
subgraph MI["lib"]
MJ["shared-auth-store.ts"]
end
end
end
subgraph MK["shared-notification-store"]
subgraph ML["src"]
MM["index.ts"]
subgraph MN["lib"]
MO["shared-notification-store.tsx"]
end
end
end
subgraph MP["shared-ui-store"]
subgraph MQ["src"]
MR["index.ts"]
subgraph MS["lib"]
MT["shared-ui-store.ts"]
MU["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MV["server"]
subgraph MW["controllers"]
subgraph MX["src"]
MY["index.ts"]
subgraph MZ["lib"]
N0["auth.controller.ts"]
N1["order.controller.ts"]
end
end
end
subgraph N2["decorators"]
N3["jest.config.ts"]
subgraph N4["src"]
N5["index.ts"]
subgraph N6["lib"]
N7["current-user.decorator.ts"]
N8["decorators.ts"]
N9["decorators.spec.ts"]
end
end
end
subgraph NA["entities"]
subgraph NB["src"]
NC["index.ts"]
subgraph ND["lib"]
NE["brand.entity.ts"]
NF["product.entity.ts"]
NG["category.entity.ts"]
NH["product-description.entity.ts"]
NI["site-language.entity.ts"]
NJ["product-info.entity.ts"]
NK["color.entity.ts"]
NL["product-info-color.entity.ts"]
NM["seller-info.entity.ts"]
NN["seller-product.entity.ts"]
NO["user.entity.ts"]
NP["cart.entity.ts"]
NQ["currency-preference.entity.ts"]
NR["currency.entity.ts"]
NS["customer.entity.ts"]
NT["exchange-rate.entity.ts"]
NU["order.entity.ts"]
NV["platform-settings.entity.ts"]
NW["refresh-token.entity.ts"]
NX["seller-order.entity.ts"]
NY["translation.entity.ts"]
end
end
end
subgraph NZ["guards"]
O0["jest.config.ts"]
subgraph O1["src"]
O2["index.ts"]
subgraph O3["lib"]
O4["catalog.guard.ts"]
O5["graphql-auth.guard.ts"]
O6["http-auth.guard.ts"]
O7["roles.guard.ts"]
O8["catalog.guard.spec.ts"]
O9["roles.guard.spec.ts"]
end
end
end
subgraph OA["inputs"]
subgraph OB["src"]
OC["index.ts"]
subgraph OD["lib"]
OE["brand.input.ts"]
OF["cart.inputs.ts"]
OG["category.input.ts"]
OH["color.input.ts"]
OI["customer-auth.inputs.ts"]
OJ["order-pagination.inputs.ts"]
OK["order.inputs.ts"]
OL["product-info-filter.input.ts"]
OM["product.input.ts"]
ON["seller-order-pagination.inputs.ts"]
OO["seller.input.ts"]
OP["site-language.input.ts"]
OQ["user.input.ts"]
end
end
end
subgraph OR["modules"]
subgraph OS["src"]
OT["index.ts"]
subgraph OU["lib"]
OV["auth.module.ts"]
OW["email.module.ts"]
OX["token.module.ts"]
OY["user.module.ts"]
OZ["customer-profile.module.ts"]
P0["brand.module.ts"]
P1["catalog-guard.module.ts"]
P2["translation.module.ts"]
P3["cart.module.ts"]
P4["platform-settings.module.ts"]
P5["category.module.ts"]
P6["product.module.ts"]
P7["color.module.ts"]
P8["currency.module.ts"]
P9["graphql-context.module.ts"]
PA["order.module.ts"]
PB["seller-info.module.ts"]
PC["payment.module.ts"]
PD["product-info.module.ts"]
PE["seller-products.module.ts"]
PF["site-language.module.ts"]
end
end
end
subgraph PG["resolvers"]
PH["jest.config.ts"]
subgraph PI["src"]
PJ["index.ts"]
subgraph PK["lib"]
PL["auth.resolver.ts"]
PM["brand.resolver.ts"]
PN["cart.resolver.ts"]
PO["category.resolver.ts"]
PP["color.resolver.ts"]
PQ["currency.resolver.ts"]
PR["customer-profile.resolver.ts"]
PS["order.resolver.ts"]
PT["payment.resolver.ts"]
PU["product-info.resolver.ts"]
PV["product.resolver.ts"]
PW["seller-info.resolver.ts"]
PX["shipping.resolver.ts"]
PY["site-language.resolver.ts"]
PZ["translation.input.ts"]
Q0["translation.resolver.ts"]
Q1["user.resolver.ts"]
Q2["auth.resolver.spec.ts"]
Q3["order.resolver.spec.ts"]
Q4["order.resolver.status-transitions.spec.ts"]
Q5["order.resolver.tracking.spec.ts"]
Q6["payment.resolver.integration.spec.ts"]
Q7["payment.resolver.spec.ts"]
Q8["product-info.resolver.spec.ts"]
Q9["translation.resolver.guards.spec.ts"]
subgraph QA["types"]
QB["graphql-upload.d.ts"]
end
QC["user.resolver.spec.ts"]
end
end
end
subgraph QD["services"]
QE["jest.config.ts"]
subgraph QF["src"]
QG["index.ts"]
subgraph QH["lib"]
QI["auth.service.ts"]
QJ["brand.service.ts"]
QK["cart.service.ts"]
QL["product-info-colors.util.ts"]
QM["category.service.ts"]
QN["color.service.ts"]
QO["currency.service.ts"]
QP["customer-profile.service.ts"]
QQ["email.service.ts"]
QR["image-upload.service.ts"]
QS["order.service.ts"]
QT["payment-logger.service.ts"]
QU["payment.service.ts"]
QV["product.service.ts"]
QW["seller-info.service.ts"]
QX["shipping-calculation.service.ts"]
QY["site-language.service.ts"]
QZ["token.service.ts"]
R0["translation.service.ts"]
R1["user.service.ts"]
R2["auth.service.password-policy.spec.ts"]
R3["auth.service.spec.ts"]
R4["cart.service.add-quantity.spec.ts"]
R5["cart.service.null-relations.spec.ts"]
R6["cart.service.spec.ts"]
R7["order.service.spec.ts"]
R8["order.service.tracking.spec.ts"]
R9["product-info-colors.util.spec.ts"]
RA["product.service.pants.spec.ts"]
RB["product.service.spec.ts"]
RC["relay-connection.spec.ts"]
RD["seller-info.service.price-validation.spec.ts"]
RE["shipping-calculation.service.spec.ts"]
RF["token.service.spec.ts"]
end
end
end
subgraph RG["strategies"]
subgraph RH["src"]
RI["index.ts"]
subgraph RJ["lib"]
RK["local.strategy.ts"]
end
end
end
subgraph RL["utils"]
subgraph RM["src"]
RN["index.ts"]
subgraph RO["lib"]
RP["email-templates.ts"]
RQ["relay-connection.ts"]
RR["pagination.ts"]
end
end
end
end
subgraph RS["shared"]
subgraph RT["codegen"]
RU["jest.config.ts"]
subgraph RV["src"]
RW["index.ts"]
subgraph RX["lib"]
subgraph RY["generated"]
RZ["graphql.ts"]
end
end
end
end
subgraph S0["graphql-schema"]
S1["jest.config.ts"]
subgraph S2["src"]
S3["index.ts"]
end
end
subgraph S4["product-sizes"]
subgraph S5["src"]
S6["index.ts"]
subgraph S7["lib"]
S8["product-sizes.ts"]
S9["product-sizes.pants-formats.spec.ts"]
SA["product-sizes.pants-label.spec.ts"]
SB["product-sizes.pants-strict.spec.ts"]
SC["product-sizes.spec.ts"]
end
end
end
subgraph SD["shared-i18n"]
subgraph SE["src"]
SF["index.ts"]
subgraph SG["lib"]
SH["language-context.tsx"]
SI["language-detector.ts"]
subgraph SJ["locales"]
SK["i18n-react.tsx"]
SL["i18n-util.ts"]
SM["i18n-util.async.ts"]
subgraph SN["en"]
SO["index.ts"]
end
subgraph SQ["fa"]
SR["index.ts"]
end
SS["formatters.ts"]
ST["i18n-types.ts"]
SU["i18n-util.sync.ts"]
SV["navigator-detector.ts"]
end
SP["site-name.ts"]
SW["table-localization.ts"]
SX["theme-provider.tsx"]
SY["use-page-title.ts"]
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
G8-->G7
G9-->G7
GD-->GF
GI-->GK
GO-->GQ
GW-->GY
GW-->GZ
H0-->GZ
H3-->H5
H6-->H5
HA-->HC
HD-->HC
HG-->HI
HL-->HN
HL-->HO
HL-->HP
HN-->HO
HQ-->HN
HU-->HW
HX-->HW
I0-->I2
I5-->I7
I8-->I7
IB-->ID
ID-->IE
IH-->IJ
IJ-->IK
IJ-->IL
IJ-->IM
IJ-->IN
IL-->IK
IL-->IM
IO-->IP
IS-->IU
IY-->J0
J1-->J0
J4-->J6
J9-->JB
J9-->JC
J9-->JD
J9-->JE
JJ-->JL
JJ-->JM
JM-->JL
JQ-->JS
JS-->JT
JW-->JY
JY-->JZ
K2-->K4
K2-->K6
K2-->K7
K2-->K5
K4-->K5
K8-->K5
KB-->KD
KB-->KE
KB-->KF
KF-->KE
KG-->KD
KJ-->KL
KJ-->KM
KM-->KL
KN-->KM
KR-->KT
KR-->KU
KU-->KT
KX-->KZ
L3-->L5
L6-->L5
LA-->LC
LD-->LC
LG-->LI
LJ-->LI
LM-->LO
LR-->LT
LY-->M0
M3-->M5
M3-->M6
M9-->MB
MC-->MD
MH-->MJ
MM-->MO
MR-->MT
MY-->N0
MY-->N1
N5-->N7
N5-->N8
N9-->N8
NC-->NE
NC-->NP
NC-->NG
NC-->NK
NC-->NQ
NC-->NR
NC-->NS
NC-->NT
NC-->NU
NC-->NV
NC-->NH
NC-->NL
NC-->NJ
NC-->NF
NC-->NW
NC-->NM
NC-->NX
NC-->NN
NC-->NI
NC-->NY
NC-->NO
NE-->NF
NF-->NE
NF-->NG
NF-->NH
NF-->NJ
NF-->NM
NF-->NN
NG-->NF
NH-->NF
NH-->NI
NI-->NH
NJ-->NK
NJ-->NL
NJ-->NF
NL-->NK
NL-->NJ
NM-->NN
NM-->NO
NN-->NJ
NN-->NF
NN-->NM
NP-->NF
NP-->NO
NQ-->NR
NS-->NO
NT-->NR
NT-->NO
NU-->NF
NU-->NM
NW-->NO
NX-->NU
O2-->O4
O2-->O5
O2-->O6
O2-->O7
O8-->O4
O9-->O7
OC-->OE
OC-->OF
OC-->OG
OC-->OH
OC-->OI
OC-->OJ
OC-->OK
OC-->OL
OC-->OM
OC-->ON
OC-->OO
OC-->OP
OC-->OQ
OM-->OL
OT-->OV
OT-->P0
OT-->P3
OT-->P1
OT-->P5
OT-->P7
OT-->P8
OT-->OZ
OT-->OW
OT-->P9
OT-->PA
OT-->PC
OT-->P4
OT-->PD
OT-->P6
OT-->PB
OT-->PE
OT-->PF
OT-->OX
OT-->P2
OT-->OY
OV-->OW
OV-->OX
OV-->OY
OY-->OV
OY-->OZ
P0-->P1
P0-->P2
P3-->P4
P5-->P1
P5-->P6
P5-->P2
P6-->P1
P6-->OX
P6-->P2
P7-->P1
P7-->P2
P9-->OW
P9-->OX
P9-->OY
PA-->P4
PA-->PB
PB-->P6
PB-->OX
PB-->OY
PC-->PA
PD-->P6
PD-->P2
PE-->PB
PE-->OY
PJ-->PL
PJ-->PM
PJ-->PN
PJ-->PO
PJ-->PP
PJ-->PQ
PJ-->PR
PJ-->PS
PJ-->PT
PJ-->PU
PJ-->PV
PJ-->PW
PJ-->PX
PJ-->PY
PJ-->PZ
PJ-->Q0
PJ-->Q1
Q2-->PL
Q3-->PS
Q4-->PS
Q5-->PS
Q6-->PT
Q7-->PT
Q8-->PU
Q9-->Q0
QC-->Q1
QG-->QI
QG-->QJ
QG-->QK
QG-->QM
QG-->QN
QG-->QO
QG-->QP
QG-->QQ
QG-->QR
QG-->QS
QG-->QT
QG-->QU
QG-->QL
QG-->QV
QG-->QW
QG-->QX
QG-->QY
QG-->QZ
QG-->R0
QG-->R1
QK-->QL
QV-->QL
QW-->QL
R2-->QI
R2-->QQ
R2-->QZ
R2-->R1
R3-->QI
R3-->QQ
R3-->QZ
R3-->R1
R4-->QK
R5-->QK
R6-->QK
R7-->QS
R8-->QS
R9-->QL
RA-->QV
RA-->R0
RB-->QV
RB-->R0
RD-->QI
RD-->QW
RE-->QX
RF-->QZ
RI-->RK
RN-->RP
RN-->RQ
RW-->RZ
S6-->S8
S9-->S8
SA-->S8
SB-->S8
SC-->S8
SF-->SH
SF-->SI
SF-->SK
SF-->ST
SF-->SL
SF-->SM
SF-->SU
SF-->SV
SF-->SP
SF-->SW
SF-->SX
SF-->SY
SH-->SI
SH-->SK
SH-->SM
SK-->SL
SM-->SO
SM-->SR
SM-->SS
SM-->SL
SO-->SP
SR-->SP
SU-->SO
SU-->SR
SU-->SS
SU-->SL
SW-->SK
SX-->SH
SY-->SK
