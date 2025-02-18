import { AdminProductEditor } from '@kickzone-workspace/admin-product-editor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function AdminsRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminProductEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AdminsRouter;
