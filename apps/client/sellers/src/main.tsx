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
  localStorageDetector,
  LanguageProvider,
  RTLThemeProvider,
} from '@kickzone-workspace/shared-i18n';
import { TypesafeI18n } from '@kickzone-workspace/shared-i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Use localStorage detector first, then fallback to navigator
// If no stored preference exists, default to 'fa' instead of baseLocale 'en'
const LANGUAGE_STORAGE_KEY = 'kickzone-language-preference';
const storedLanguage = typeof window !== 'undefined' 
  ? localStorage.getItem(LANGUAGE_STORAGE_KEY) 
  : null;
let detectedLocale = detectLocale(localStorageDetector, navigatorDetector);
// If no stored preference and detected locale is 'en' (baseLocale fallback), use 'fa' as default
if (!storedLanguage && detectedLocale === 'en') {
  detectedLocale = 'fa';
}

loadLocaleAsync(detectedLocale).then(() => {
  // Wrap the application with the generated TypesafeI18n provider component
  // This component handles setting up the I18nContext internally
  root.render(
    <StrictMode>
      {/* Pass the detected locale to the generated provider component */}
      <TypesafeI18n locale={detectedLocale}>
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
