import { AdminProductEditor } from '@kickzone-workspace/admin-product-editor';
import { AdminProducts } from '@kickzone-workspace/admin-products';
import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import { AdminsLogin } from '@kickzone-workspace/admins-login';
import { createPrivateRoute } from '@kickzone-workspace/private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SellerManagement } from '@kickzone-workspace/admin-seller-management';

export function AdminsRouter() {
  const { admin } = useAdminsAuthContext();

  const AdminRoute = createPrivateRoute(['ADMIN'], admin);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="/" element={<AdminProductEditor />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/products/new" element={<AdminProductEditor />} />
          <Route path="/products/edit/:id" element={<AdminProductEditor />} />
          <Route path="/sellers" element={<SellerManagement />} />
        </Route>
        <Route path="/login" element={<AdminsLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminsRouter;
