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
end
end
end
subgraph ES["products"]
subgraph ET["src"]
EU["index.ts"]
subgraph EV["lib"]
EW["useSellersProductManagement.ts"]
EX["useSellersProducts.ts"]
end
end
end
end
subgraph EY["router"]
subgraph EZ["src"]
F0["index.ts"]
subgraph F1["lib"]
F2["SellersRouter.tsx"]
end
end
end
subgraph F3["routes"]
subgraph F4["src"]
F5["index.ts"]
subgraph F6["lib"]
F7["seller-routes.ts"]
end
end
end
subgraph F8["screens"]
subgraph F9["catalog"]
subgraph FA["src"]
FB["index.ts"]
subgraph FC["lib"]
FD["SellersCatalogScreens.tsx"]
FE["SellersCatalogScreens.spec.tsx"]
end
end
end
subgraph FF["login"]
subgraph FG["src"]
FH["index.ts"]
subgraph FI["lib"]
FJ["SellersLogin.tsx"]
end
end
end
subgraph FK["manage-product"]
subgraph FL["src"]
FM["index.ts"]
subgraph FN["lib"]
FO["SellersManageProductScreen.tsx"]
FP["SellersDefineProductFlow.tsx"]
FQ["SellersDefineProductFlow.pants-label.spec.tsx"]
FR["SellersDefineProductFlow.spec.tsx"]
FS["SellersManageProductScreen.spec.tsx"]
end
end
end
subgraph FT["products"]
subgraph FU["src"]
FV["index.ts"]
subgraph FW["lib"]
FX["SellersProducts.tsx"]
FY["SellersProducts.pants-label.spec.tsx"]
FZ["SellersProducts.spec.tsx"]
end
end
end
subgraph G0["seller-orders"]
G1["jest.config.ts"]
G2["jest.setup.ts"]
subgraph G3["src"]
G4["index.ts"]
subgraph G5["lib"]
G6["seller-orders-screen.tsx"]
G7["seller-orders-screen.pants-size.spec.tsx"]
G8["seller-orders-screen.spec.tsx"]
end
G9["test-setup.ts"]
end
end
subgraph GA["setup-password"]
subgraph GB["src"]
GC["index.ts"]
subgraph GD["lib"]
GE["SellersSetupPassword.tsx"]
end
end
end
subgraph GF["unauthorized"]
subgraph GG["src"]
GH["index.ts"]
subgraph GI["lib"]
GJ["sellers-unauthorized-screen.tsx"]
end
end
end
end
subgraph GK["zustand"]
subgraph GL["sellers-products-store"]
subgraph GM["src"]
GN["index.ts"]
subgraph GO["lib"]
GP["useSellersProductsStore.ts"]
GQ["sellers-products-store.tsx"]
end
end
end
end
end
subgraph GR["shared"]
subgraph GS["components"]
subgraph GT["apollo-provider-base"]
subgraph GU["src"]
GV["index.ts"]
subgraph GW["lib"]
GX["ApolloProviderBase.tsx"]
GY["createSilentRefreshAuthLink.ts"]
GZ["createSilentRefreshAuthLink.spec.ts"]
end
end
end
subgraph H0["error-boundary"]
subgraph H1["src"]
H2["index.ts"]
subgraph H3["lib"]
H4["error-boundary.tsx"]
H5["error-boundary.spec.tsx"]
end
end
H6["vite.config.ts"]
end
subgraph H7["glassmorphism-container"]
subgraph H8["src"]
H9["index.ts"]
subgraph HA["lib"]
HB["glassmorphism-container.tsx"]
HC["glassmorphism-container.spec.tsx"]
end
end
end
subgraph HD["layout"]
subgraph HE["src"]
HF["index.ts"]
subgraph HG["lib"]
HH["Layout.tsx"]
end
end
end
subgraph HI["material-data-table"]
subgraph HJ["src"]
HK["index.ts"]
subgraph HL["lib"]
HM["material-data-table.tsx"]
HN["table-config.ts"]
HO["table-utils.ts"]
HP["material-data-table.spec.tsx"]
HQ["table-types.ts"]
end
end
end
subgraph HR["order-status-chip"]
subgraph HS["src"]
HT["index.ts"]
subgraph HU["lib"]
HV["order-status-chip.tsx"]
HW["order-status-chip.spec.tsx"]
end
end
end
subgraph HX["password-field"]
subgraph HY["src"]
HZ["index.ts"]
subgraph I0["lib"]
I1["PasswordTextField.tsx"]
end
end
end
subgraph I2["price-display"]
subgraph I3["src"]
I4["index.ts"]
subgraph I5["lib"]
I6["price-display.tsx"]
I7["price-display.spec.tsx"]
end
end
end
subgraph I8["private-route"]
subgraph I9["src"]
IA["index.ts"]
subgraph IB["lib"]
IC["createPrivateRoute.tsx"]
ID["PrivateRoute.tsx"]
end
end
end
subgraph IE["rtl-table-utils"]
subgraph IF["src"]
IG["index.ts"]
subgraph IH["lib"]
II["rtl-table-utils.ts"]
IJ["rtl-cell-components.tsx"]
IK["rtl-column-helpers.ts"]
IL["rtl-table-props.ts"]
IM["use-table-alignment.ts"]
IN["rtl-table-utils.spec.tsx"]
IO["rtl-table-utils.tsx"]
end
end
end
subgraph IP["snackbar"]
subgraph IQ["src"]
IR["index.ts"]
subgraph IS["lib"]
IT["snackbar.tsx"]
IU["Snackbar.tsx"]
end
end
end
subgraph IV["styled-drawer"]
subgraph IW["src"]
IX["index.ts"]
subgraph IY["lib"]
IZ["styled-drawer.tsx"]
J0["styled-drawer.spec.tsx"]
end
end
end
subgraph J1["unauthorized"]
subgraph J2["src"]
J3["index.ts"]
subgraph J4["lib"]
J5["unauthorized-path.tsx"]
end
end
end
end
subgraph J6["graphql"]
subgraph J7["src"]
J8["index.ts"]
subgraph J9["lib"]
JA["currency.mutations.ts"]
JB["currency.queries.ts"]
JC["fragments.ts"]
JD["variant-colors.ts"]
JE["client-shared-graphql.tsx"]
end
end
end
subgraph JF["hooks"]
subgraph JG["brands"]
subgraph JH["src"]
JI["index.ts"]
subgraph JJ["lib"]
JK["brands.graphql.ts"]
JL["useBrands.ts"]
end
end
JM["vite.config.ts"]
end
subgraph JN["categories"]
subgraph JO["src"]
JP["index.ts"]
subgraph JQ["lib"]
JR["useCategories.ts"]
JS["categories.graphql.ts"]
end
end
end
subgraph JT["colors"]
subgraph JU["src"]
JV["index.ts"]
subgraph JW["lib"]
JX["useColors.ts"]
JY["color.graphql.ts"]
end
end
end
subgraph JZ["currency"]
subgraph K0["src"]
K1["index.ts"]
subgraph K2["lib"]
K3["useConvertPrice.tsx"]
K4["useExchangeRate.tsx"]
K5["useCurrencies.tsx"]
K6["useCurrencyForLocale.tsx"]
K7["useExchangeRate.spec.tsx"]
end
end
end
subgraph K8["products"]
subgraph K9["src"]
KA["index.ts"]
subgraph KB["lib"]
KC["productImage.ts"]
KD["products.graphql.ts"]
KE["useProducts.ts"]
KF["productImage.spec.ts"]
end
end
end
subgraph KG["site-languages"]
subgraph KH["src"]
KI["index.ts"]
subgraph KJ["lib"]
KK["site-languages.graphql.ts"]
KL["useSiteLanguages.ts"]
KM["site-languages-hook.spec.tsx"]
end
end
KN["vite.config.ts"]
end
subgraph KO["snackbar"]
subgraph KP["src"]
KQ["index.ts"]
subgraph KR["lib"]
KS["SnackbarContext.tsx"]
KT["useSnackbar.ts"]
end
end
end
subgraph KU["translations-management-hook"]
subgraph KV["src"]
KW["index.ts"]
subgraph KX["lib"]
KY["useTranslationsManagement.ts"]
end
end
end
end
subgraph KZ["lottie"]
subgraph L0["empty-cart"]
subgraph L1["src"]
L2["index.ts"]
subgraph L3["lib"]
L4["lottie-empty-cart.tsx"]
L5["lottie-empty-cart.spec.tsx"]
end
end
L6["vite.config.ts"]
end
subgraph L7["loading"]
subgraph L8["src"]
L9["index.ts"]
subgraph LA["lib"]
LB["lottie-loading.tsx"]
LC["lottie-loading.spec.tsx"]
end
end
end
subgraph LD["success-check"]
subgraph LE["src"]
LF["index.ts"]
subgraph LG["lib"]
LH["lottie-success-check.tsx"]
LI["lottie-success-check.spec.tsx"]
end
end
end
subgraph LJ["unauthorized"]
subgraph LK["src"]
LL["index.ts"]
subgraph LM["lib"]
LN["lottie-unauthorized.tsx"]
end
end
end
end
subgraph LO["translations"]
subgraph LP["src"]
LQ["index.ts"]
subgraph LR["lib"]
LS["mapApolloErrorToTranslationKey.ts"]
LT["WrapTranslation.tsx"]
end
end
end
subgraph LU["ui"]
subgraph LV["colors"]
subgraph LW["src"]
LX["index.ts"]
subgraph LY["lib"]
LZ["colors.ts"]
end
end
end
subgraph M0["language-components"]
subgraph M1["src"]
M2["index.ts"]
subgraph M3["lib"]
M4["language-components.tsx"]
M5["ltr-text-field.tsx"]
end
end
end
subgraph M6["sizes"]
subgraph M7["src"]
M8["index.ts"]
subgraph M9["lib"]
MA["sizes.ts"]
MB["sizes.spec.tsx"]
MC["sizes.tsx"]
end
end
end
end
subgraph MD["zustand"]
subgraph ME["shared-auth-store"]
subgraph MF["src"]
MG["index.ts"]
subgraph MH["lib"]
MI["shared-auth-store.ts"]
end
end
end
subgraph MJ["shared-notification-store"]
subgraph MK["src"]
ML["index.ts"]
subgraph MM["lib"]
MN["shared-notification-store.tsx"]
end
end
end
subgraph MO["shared-ui-store"]
subgraph MP["src"]
MQ["index.ts"]
subgraph MR["lib"]
MS["shared-ui-store.ts"]
MT["shared-ui-store.tsx"]
end
end
end
end
end
end
subgraph MU["server"]
subgraph MV["controllers"]
subgraph MW["src"]
MX["index.ts"]
subgraph MY["lib"]
MZ["auth.controller.ts"]
N0["order.controller.ts"]
end
end
end
subgraph N1["decorators"]
N2["jest.config.ts"]
subgraph N3["src"]
N4["index.ts"]
subgraph N5["lib"]
N6["current-user.decorator.ts"]
N7["decorators.ts"]
N8["decorators.spec.ts"]
end
end
end
subgraph N9["entities"]
subgraph NA["src"]
NB["index.ts"]
subgraph NC["lib"]
ND["brand.entity.ts"]
NE["product.entity.ts"]
NF["category.entity.ts"]
NG["product-description.entity.ts"]
NH["site-language.entity.ts"]
NI["product-info.entity.ts"]
NJ["color.entity.ts"]
NK["product-info-color.entity.ts"]
NL["seller-info.entity.ts"]
NM["seller-product.entity.ts"]
NN["user.entity.ts"]
NO["cart.entity.ts"]
NP["currency-preference.entity.ts"]
NQ["currency.entity.ts"]
NR["customer.entity.ts"]
NS["exchange-rate.entity.ts"]
NT["order.entity.ts"]
NU["platform-settings.entity.ts"]
NV["refresh-token.entity.ts"]
NW["seller-order.entity.ts"]
NX["translation.entity.ts"]
end
end
end
subgraph NY["guards"]
NZ["jest.config.ts"]
subgraph O0["src"]
O1["index.ts"]
subgraph O2["lib"]
O3["catalog.guard.ts"]
O4["graphql-auth.guard.ts"]
O5["http-auth.guard.ts"]
O6["roles.guard.ts"]
O7["catalog.guard.spec.ts"]
O8["roles.guard.spec.ts"]
end
end
end
subgraph O9["inputs"]
subgraph OA["src"]
OB["index.ts"]
subgraph OC["lib"]
OD["brand.input.ts"]
OE["cart.inputs.ts"]
OF["category.input.ts"]
OG["color.input.ts"]
OH["customer-auth.inputs.ts"]
OI["order-pagination.inputs.ts"]
OJ["order.inputs.ts"]
OK["product-info-filter.input.ts"]
OL["product.input.ts"]
OM["seller-order-pagination.inputs.ts"]
ON["seller.input.ts"]
OO["site-language.input.ts"]
OP["user.input.ts"]
end
end
end
subgraph OQ["modules"]
subgraph OR["src"]
OS["index.ts"]
subgraph OT["lib"]
OU["auth.module.ts"]
OV["email.module.ts"]
OW["token.module.ts"]
OX["user.module.ts"]
OY["customer-profile.module.ts"]
OZ["brand.module.ts"]
P0["catalog-guard.module.ts"]
P1["translation.module.ts"]
P2["cart.module.ts"]
P3["platform-settings.module.ts"]
P4["category.module.ts"]
P5["product.module.ts"]
P6["color.module.ts"]
P7["currency.module.ts"]
P8["graphql-context.module.ts"]
P9["order.module.ts"]
PA["seller-info.module.ts"]
PB["payment.module.ts"]
PC["product-info.module.ts"]
PD["seller-products.module.ts"]
PE["site-language.module.ts"]
end
end
end
subgraph PF["resolvers"]
PG["jest.config.ts"]
subgraph PH["src"]
PI["index.ts"]
subgraph PJ["lib"]
PK["auth.resolver.ts"]
PL["brand.resolver.ts"]
PM["cart.resolver.ts"]
PN["category.resolver.ts"]
PO["color.resolver.ts"]
PP["currency.resolver.ts"]
PQ["customer-profile.resolver.ts"]
PR["order.resolver.ts"]
PS["payment.resolver.ts"]
PT["product-info.resolver.ts"]
PU["product.resolver.ts"]
PV["seller-info.resolver.ts"]
PW["shipping.resolver.ts"]
PX["site-language.resolver.ts"]
PY["translation.input.ts"]
PZ["translation.resolver.ts"]
Q0["user.resolver.ts"]
Q1["auth.resolver.spec.ts"]
Q2["order.resolver.spec.ts"]
Q3["payment.resolver.integration.spec.ts"]
Q4["payment.resolver.spec.ts"]
Q5["product-info.resolver.spec.ts"]
Q6["translation.resolver.guards.spec.ts"]
subgraph Q7["types"]
Q8["graphql-upload.d.ts"]
end
Q9["user.resolver.spec.ts"]
end
end
end
subgraph QA["services"]
QB["jest.config.ts"]
subgraph QC["src"]
QD["index.ts"]
subgraph QE["lib"]
QF["auth.service.ts"]
QG["brand.service.ts"]
QH["cart.service.ts"]
QI["product-info-colors.util.ts"]
QJ["category.service.ts"]
QK["color.service.ts"]
QL["currency.service.ts"]
QM["customer-profile.service.ts"]
QN["email.service.ts"]
QO["image-upload.service.ts"]
QP["order.service.ts"]
QQ["payment-logger.service.ts"]
QR["payment.service.ts"]
QS["product.service.ts"]
QT["seller-info.service.ts"]
QU["shipping-calculation.service.ts"]
QV["site-language.service.ts"]
QW["token.service.ts"]
QX["translation.service.ts"]
QY["user.service.ts"]
QZ["auth.service.password-policy.spec.ts"]
R0["auth.service.spec.ts"]
R1["cart.service.add-quantity.spec.ts"]
R2["cart.service.spec.ts"]
R3["order.service.spec.ts"]
R4["product-info-colors.util.spec.ts"]
R5["product.service.pants.spec.ts"]
R6["product.service.spec.ts"]
R7["relay-connection.spec.ts"]
R8["seller-info.service.price-validation.spec.ts"]
R9["shipping-calculation.service.spec.ts"]
RA["token.service.spec.ts"]
end
end
end
subgraph RB["strategies"]
subgraph RC["src"]
RD["index.ts"]
subgraph RE["lib"]
RF["local.strategy.ts"]
end
end
end
subgraph RG["utils"]
subgraph RH["src"]
RI["index.ts"]
subgraph RJ["lib"]
RK["email-templates.ts"]
RL["relay-connection.ts"]
RM["pagination.ts"]
end
end
end
end
subgraph RN["shared"]
subgraph RO["codegen"]
RP["jest.config.ts"]
subgraph RQ["src"]
RR["index.ts"]
subgraph RS["lib"]
subgraph RT["generated"]
RU["graphql.ts"]
end
end
end
end
subgraph RV["graphql-schema"]
RW["jest.config.ts"]
subgraph RX["src"]
RY["index.ts"]
end
end
subgraph RZ["product-sizes"]
subgraph S0["src"]
S1["index.ts"]
subgraph S2["lib"]
S3["product-sizes.ts"]
S4["product-sizes.pants-formats.spec.ts"]
S5["product-sizes.pants-label.spec.ts"]
S6["product-sizes.pants-strict.spec.ts"]
S7["product-sizes.spec.ts"]
end
end
end
subgraph S8["shared-i18n"]
subgraph S9["src"]
SA["index.ts"]
subgraph SB["lib"]
SC["language-context.tsx"]
SD["language-detector.ts"]
subgraph SE["locales"]
SF["i18n-react.tsx"]
SG["i18n-util.ts"]
SH["i18n-util.async.ts"]
subgraph SI["en"]
SJ["index.ts"]
end
subgraph SL["fa"]
SM["index.ts"]
end
SN["formatters.ts"]
SO["i18n-types.ts"]
SP["i18n-util.sync.ts"]
SQ["navigator-detector.ts"]
end
SK["site-name.ts"]
SR["table-localization.ts"]
SS["theme-provider.tsx"]
ST["use-page-title.ts"]
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
EU-->EW
EU-->EX
F0-->F2
F5-->F7
FB-->FD
FE-->FD
FH-->FJ
FM-->FO
FO-->FP
FQ-->FP
FR-->FP
FS-->FO
FV-->FX
FY-->FX
FZ-->FX
G4-->G6
G7-->G6
G8-->G6
GC-->GE
GH-->GJ
GN-->GP
GV-->GX
GV-->GY
GZ-->GY
H2-->H4
H5-->H4
H9-->HB
HC-->HB
HF-->HH
HK-->HM
HK-->HN
HK-->HO
HM-->HN
HP-->HM
HT-->HV
HW-->HV
HZ-->I1
I4-->I6
I7-->I6
IA-->IC
IC-->ID
IG-->II
II-->IJ
II-->IK
II-->IL
II-->IM
IK-->IJ
IK-->IL
IN-->IO
IR-->IT
IX-->IZ
J0-->IZ
J3-->J5
J8-->JA
J8-->JB
J8-->JC
J8-->JD
JI-->JK
JI-->JL
JL-->JK
JP-->JR
JR-->JS
JV-->JX
JX-->JY
K1-->K3
K1-->K5
K1-->K6
K1-->K4
K3-->K4
K7-->K4
KA-->KC
KA-->KD
KA-->KE
KE-->KD
KF-->KC
KI-->KK
KI-->KL
KL-->KK
KM-->KL
KQ-->KS
KQ-->KT
KT-->KS
KW-->KY
L2-->L4
L5-->L4
L9-->LB
LC-->LB
LF-->LH
LI-->LH
LL-->LN
LQ-->LS
LX-->LZ
M2-->M4
M2-->M5
M8-->MA
MB-->MC
MG-->MI
ML-->MN
MQ-->MS
MX-->MZ
MX-->N0
N4-->N6
N4-->N7
N8-->N7
NB-->ND
NB-->NO
NB-->NF
NB-->NJ
NB-->NP
NB-->NQ
NB-->NR
NB-->NS
NB-->NT
NB-->NU
NB-->NG
NB-->NK
NB-->NI
NB-->NE
NB-->NV
NB-->NL
NB-->NW
NB-->NM
NB-->NH
NB-->NX
NB-->NN
ND-->NE
NE-->ND
NE-->NF
NE-->NG
NE-->NI
NE-->NL
NE-->NM
NF-->NE
NG-->NE
NG-->NH
NH-->NG
NI-->NJ
NI-->NK
NI-->NE
NK-->NJ
NK-->NI
NL-->NM
NL-->NN
NM-->NI
NM-->NE
NM-->NL
NO-->NE
NO-->NN
NP-->NQ
NR-->NN
NS-->NQ
NS-->NN
NT-->NE
NT-->NL
NV-->NN
NW-->NT
O1-->O3
O1-->O4
O1-->O5
O1-->O6
O7-->O3
O8-->O6
OB-->OD
OB-->OE
OB-->OF
OB-->OG
OB-->OH
OB-->OI
OB-->OJ
OB-->OK
OB-->OL
OB-->OM
OB-->ON
OB-->OO
OB-->OP
OL-->OK
OS-->OU
OS-->OZ
OS-->P2
OS-->P0
OS-->P4
OS-->P6
OS-->P7
OS-->OY
OS-->OV
OS-->P8
OS-->P9
OS-->PB
OS-->P3
OS-->PC
OS-->P5
OS-->PA
OS-->PD
OS-->PE
OS-->OW
OS-->P1
OS-->OX
OU-->OV
OU-->OW
OU-->OX
OX-->OU
OX-->OY
OZ-->P0
OZ-->P1
P2-->P3
P4-->P0
P4-->P5
P4-->P1
P5-->P0
P5-->OW
P5-->P1
P6-->P0
P6-->P1
P8-->OV
P8-->OW
P8-->OX
P9-->P3
P9-->PA
PA-->P5
PA-->OW
PA-->OX
PB-->P9
PC-->P5
PC-->P1
PD-->PA
PD-->OX
PI-->PK
PI-->PL
PI-->PM
PI-->PN
PI-->PO
PI-->PP
PI-->PQ
PI-->PR
PI-->PS
PI-->PT
PI-->PU
PI-->PV
PI-->PW
PI-->PX
PI-->PY
PI-->PZ
PI-->Q0
Q1-->PK
Q2-->PR
Q3-->PS
Q4-->PS
Q5-->PT
Q6-->PZ
Q9-->Q0
QD-->QF
QD-->QG
QD-->QH
QD-->QJ
QD-->QK
QD-->QL
QD-->QM
QD-->QN
QD-->QO
QD-->QP
QD-->QQ
QD-->QR
QD-->QI
QD-->QS
QD-->QT
QD-->QU
QD-->QV
QD-->QW
QD-->QX
QD-->QY
QH-->QI
QS-->QI
QT-->QI
QZ-->QF
QZ-->QN
QZ-->QW
QZ-->QY
R0-->QF
R0-->QN
R0-->QW
R0-->QY
R1-->QH
R2-->QH
R3-->QP
R4-->QI
R5-->QS
R5-->QX
R6-->QS
R6-->QX
R8-->QF
R8-->QT
R9-->QU
RA-->QW
RD-->RF
RI-->RK
RI-->RL
RR-->RU
S1-->S3
S4-->S3
S5-->S3
S6-->S3
S7-->S3
SA-->SC
SA-->SD
SA-->SF
SA-->SO
SA-->SG
SA-->SH
SA-->SP
SA-->SQ
SA-->SK
SA-->SR
SA-->SS
SA-->ST
SC-->SD
SC-->SF
SC-->SH
SF-->SG
SH-->SJ
SH-->SM
SH-->SN
SH-->SG
SJ-->SK
SM-->SK
SP-->SJ
SP-->SM
SP-->SN
SP-->SG
SR-->SF
SS-->SC
ST-->SF
