import { SellersProducts } from '@kickzone-workspace/sellers-products-screen';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { SellersLogin } from '@kickzone-workspace/sellers-login-screen';
import { SellersSetupPassword } from '@kickzone-workspace/sellers-setup-password';
import { createPrivateRoute } from '@kickzone-workspace/private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function SellersRouter() {
  const { user } = useSellersAuthContext();

  const SellerRoute = createPrivateRoute(['SELLER'], user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SellerRoute />}>
          <Route path="/" element={<SellersProducts />} />
          <Route path="/products" element={<SellersProducts />} />
        </Route>
        <Route path="/login" element={<SellersLogin />} />
        <Route
          path="/setup-password/:token"
          element={<SellersSetupPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default SellersRouter;
