import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { CustomersAuthProvider } from '@kickzone-workspace/customers-auth-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <CustomersAuthProvider>
      <App />
    </CustomersAuthProvider>
  </StrictMode>
);
