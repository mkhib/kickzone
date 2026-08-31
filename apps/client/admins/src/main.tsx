import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { AdminsAuthProvider } from '@kickzone-workspace/admins-contexts';
import { AdminsGraphQLProvider } from '@kickzone-workspace/admins-graphql';
import { SnackbarProvider } from '@kickzone-workspace/snackbar-hook';
import {
  getInitialLocale,
  loadLocaleAsync,
  LanguageProvider,
  RTLThemeProvider,
} from '@kickzone-workspace/shared-i18n';
import { TypesafeI18n } from '@kickzone-workspace/shared-i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

const initialLocale = getInitialLocale();

loadLocaleAsync(initialLocale).then(() => {
  root.render(
    <StrictMode>
      <TypesafeI18n locale={initialLocale}>
        <LanguageProvider>
          <RTLThemeProvider>
            <AdminsGraphQLProvider>
              <AdminsAuthProvider>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </AdminsAuthProvider>
            </AdminsGraphQLProvider>
          </RTLThemeProvider>
        </LanguageProvider>
      </TypesafeI18n>
    </StrictMode>
  );
});
