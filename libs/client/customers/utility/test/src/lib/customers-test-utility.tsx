import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { CustomersAuthProvider } from '@kickzone-workspace/customers-auth-context';
import { BrowserRouter } from 'react-router-dom';

const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => {
  return render(
    <CustomersAuthProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </CustomersAuthProvider>,
    options
  );
};

export * from '@testing-library/react';
export { renderWithProviders as render };
