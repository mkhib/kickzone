import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomersHome } from '@kickzone-workspace/customers-home-screen';
import { CustomersLogin } from '@kickzone-workspace/customers-login-screen';
import { CustomersUnauthorizedScreen } from '@kickzone-workspace/customers-unauthorized-screen';

export function CustomersRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomersHome />} />
        <Route path="/home" element={<CustomersHome />} />
        <Route path="/login" element={<CustomersLogin />} />
        <Route path="/unauthorized" element={<CustomersUnauthorizedScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomersRouter;
