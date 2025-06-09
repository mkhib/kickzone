import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { SellersAuthProvider } from '@kickzone-workspace/sellers-auth-context';
import { AdminsGraphQLProvider as SellersGraphQLProvider } from '@kickzone-workspace/sellers-graphql';
import { SnackbarProvider } from '@kickzone-workspace/snackbar-hook';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <SellersGraphQLProvider>
      <SellersAuthProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </SellersAuthProvider>
    </SellersGraphQLProvider>
  </StrictMode>
);
