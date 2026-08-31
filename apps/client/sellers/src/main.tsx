import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { SellersAuthProvider } from '@kickzone-workspace/sellers-auth-context';
import { SellersGraphQLProvider } from '@kickzone-workspace/sellers-graphql';
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

const initialLocale = getInitialLocale();

loadLocaleAsync(initialLocale).then(() => {
  root.render(
    <StrictMode>
      <TypesafeI18n locale={initialLocale}>
        <LanguageProvider>
          <RTLThemeProvider>
            <SellersGraphQLProvider>
              <SellersAuthProvider>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </SellersAuthProvider>
            </SellersGraphQLProvider>
          </RTLThemeProvider>
        </LanguageProvider>
      </TypesafeI18n>
    </StrictMode>
  );
});
