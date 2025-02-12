import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@kickzone-workspace/customers-home-screen';
import { Login } from '@kickzone-workspace/customers-login-screen';

export function CustomersRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomersRouter;
