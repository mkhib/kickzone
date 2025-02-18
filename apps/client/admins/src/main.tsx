import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { AdminsAuthProvider } from '@kickzone-workspace/admins-contexts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AdminsAuthProvider>
      <App />
    </AdminsAuthProvider>
  </StrictMode>
);
