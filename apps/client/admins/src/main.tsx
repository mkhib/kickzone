import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { AdminsAuthProvider } from '@kickzone-workspace/admins-contexts';
import { AdminsGraphQLProvider } from '@kickzone-workspace/admins-graphql';
import { SnackbarProvider } from '@kickzone-workspace/snackbar-hook';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AdminsGraphQLProvider>
      <AdminsAuthProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </AdminsAuthProvider>
    </AdminsGraphQLProvider>
  </StrictMode>
);
