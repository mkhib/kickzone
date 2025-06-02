import { SellersProducts } from '@kickzone-workspace/sellers-products';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-contexts';
import { SellersLogin } from '@kickzone-workspace/sellers-login-screen';
import { createPrivateRoute } from '@kickzone-workspace/private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function SellersRouter() {
  const { user } = useSellersAuthContext();

  const SellerRoute = createPrivateRoute(['SELLER'], user);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SellerRoute />}>
          <Route path="/products" element={<SellersProducts />} />
        </Route>
        <Route path="/login" element={<SellersLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SellersRouter;
