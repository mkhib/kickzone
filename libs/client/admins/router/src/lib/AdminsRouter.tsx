import { AdminProductEditor } from '@kickzone-workspace/admin-product-editor';
import { useAdminsAuthContext } from '@kickzone-workspace/admins-contexts';
import { AdminsLogin } from '@kickzone-workspace/admins-login';
import { createPrivateRoute } from '@kickzone-workspace/private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function AdminsRouter() {
  const { admin } = useAdminsAuthContext();

  const AdminRoute = createPrivateRoute(['ADMIN'], admin);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminRoute />}>
          <Route path="/" element={<AdminProductEditor />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/product-editor" element={<AdminProductEditor />} />
        </Route>
        <Route path="/login" element={<AdminsLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminsRouter;
