import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { CustomersAuthProvider } from '@kickzone-workspace/customers-auth-context';
import { SnackbarProvider } from '@kickzone-workspace/snackbar-hook';
import { CustomersGraphQLProvider } from '@kickzone-workspace/customers-graphql';
import {
  detectLocale,
  loadLocaleAsync,
  navigatorDetector,
  localStorageDetector,
  LanguageProvider,
} from '@kickzone-workspace/shared-i18n';
import { TypesafeI18n } from '@kickzone-workspace/shared-i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Use localStorage detector first, then fallback to navigator
const detectedLocale = detectLocale(localStorageDetector, navigatorDetector);

loadLocaleAsync(detectedLocale).then(() => {
  // Wrap the application with the generated TypesafeI18n provider component
  // This component handles setting up the I18nContext internally
  root.render(
    <StrictMode>
      {/* Pass the detected locale to the generated provider component */}
      <TypesafeI18n locale={detectedLocale}>
        <LanguageProvider>
          <CustomersGraphQLProvider>
            <CustomersAuthProvider>
              <SnackbarProvider>
                <App />
              </SnackbarProvider>
            </CustomersAuthProvider>
          </CustomersGraphQLProvider>
        </LanguageProvider>
      </TypesafeI18n>
    </StrictMode>
  );
});
