import { BrowserRouter, Routes, Route } from 'react-router-dom';

export function CustomersRouter() {
  return (
    <BrowserRouter>
      <Routes>{/* <Route path="/" element={<CustomersHome />} /> */}</Routes>
    </BrowserRouter>
  );
}

export default CustomersRouter;
