import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomersHome } from '@kickzone-workspace/customers-home-screen';
import { CustomersLogin } from '@kickzone-workspace/customers-login-screen';

export function CustomersRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomersHome />} />
        <Route path="/home" element={<CustomersHome />} />
        <Route path="/login" element={<CustomersLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomersRouter;
