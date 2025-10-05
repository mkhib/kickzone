import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomersHome } from '@kickzone-workspace/customers-home-screen';
import { CustomersLogin } from '@kickzone-workspace/customers-login-screen';
import { CustomersUnauthorizedScreen } from '@kickzone-workspace/customers-unauthorized-screen';
import { CustomerShoppingCart } from '@kickzone-workspace/customer-shopping-cart';
import { LanguageComponents } from '@kickzone-workspace/language-components';

export function CustomersRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomersHome />} />
        <Route path="/home" element={<CustomersHome />} />
        <Route path="/login" element={<CustomersLogin />} />
        <Route path="/cart" element={<CustomerShoppingCart />} />
        <Route path="/language-settings" element={<LanguageComponents />} />
        <Route path="/unauthorized" element={<CustomersUnauthorizedScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomersRouter;
