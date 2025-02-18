import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SellersProductEditor } from '@kickzone-workspace/sellers-product-editor-screen';

export function CustomersRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<CustomersHome />} /> */}
        <Route path="/product-editor" element={<SellersProductEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomersRouter;
