import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { CustomersAuthProvider } from '@kickzone-workspace/customers-auth-context';
import { SnackbarProvider } from '@kickzone-workspace/snackbar-hook';
import { CustomersGraphQLProvider } from '@kickzone-workspace/customers-graphql';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <CustomersGraphQLProvider>
      <CustomersAuthProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </CustomersAuthProvider>
    </CustomersGraphQLProvider>
  </StrictMode>
);
