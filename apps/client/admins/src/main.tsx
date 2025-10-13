import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { AdminsAuthProvider } from '@kickzone-workspace/admins-contexts';
import { AdminsGraphQLProvider } from '@kickzone-workspace/admins-graphql';
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

// Add global error handlers to prevent unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent the default browser behavior of logging to console
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Use localStorage detector first, then fallback to navigator
const detectedLocale = detectLocale(localStorageDetector, navigatorDetector);

loadLocaleAsync(detectedLocale).then(() => {
  root.render(
    <StrictMode>
      <TypesafeI18n locale={detectedLocale}>
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
