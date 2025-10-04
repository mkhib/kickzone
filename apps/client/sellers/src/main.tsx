import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { SellersAuthProvider } from '@kickzone-workspace/sellers-auth-context';
import { SellersGraphQLProvider } from '@kickzone-workspace/sellers-graphql';
import { SnackbarProvider } from '@kickzone-workspace/snackbar-hook';
import {
  detectLocale,
  loadLocaleAsync,
  navigatorDetector,
} from '@kickzone-workspace/shared-i18n';
import { TypesafeI18n } from '@kickzone-workspace/shared-i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const detectedLocale = detectLocale(navigatorDetector);

loadLocaleAsync(detectedLocale).then(() => {
  // Wrap the application with the generated TypesafeI18n provider component
  // This component handles setting up the I18nContext internally
  root.render(
    <StrictMode>
      {/* Pass the detected locale to the generated provider component */}
      <TypesafeI18n locale={detectedLocale}>
        <SellersGraphQLProvider>
          <SellersAuthProvider>
            <SnackbarProvider>
              <App />
            </SnackbarProvider>
          </SellersAuthProvider>
        </SellersGraphQLProvider>
      </TypesafeI18n>
    </StrictMode>
  );
});
