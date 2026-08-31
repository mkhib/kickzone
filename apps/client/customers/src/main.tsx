import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { CustomersAuthProvider } from '@kickzone-workspace/customers-auth-context';
import { SnackbarProvider } from '@kickzone-workspace/snackbar-hook';
import { CustomersGraphQLProvider } from '@kickzone-workspace/customers-graphql';
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

const initialLocale = getInitialLocale();

loadLocaleAsync(initialLocale).then(() => {
  root.render(
    <StrictMode>
      <TypesafeI18n locale={initialLocale}>
        <LanguageProvider>
          <RTLThemeProvider>
            <CustomersGraphQLProvider>
              <CustomersAuthProvider>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </CustomersAuthProvider>
            </CustomersGraphQLProvider>
          </RTLThemeProvider>
        </LanguageProvider>
      </TypesafeI18n>
    </StrictMode>
  );
});
