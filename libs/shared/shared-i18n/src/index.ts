export * from './lib/locales/i18n-react';
export * from './lib/locales/i18n-types';
export * from './lib/locales/i18n-util';
export * from './lib/locales/i18n-util.async';
export * as i18nUtilSync from './lib/locales/i18n-util.sync';

// Explicitly re-export the default export (TypesafeI18n component) from i18n-react
export { default as TypesafeI18n } from './lib/locales/i18n-react';

export { navigatorDetector } from './lib/locales/navigator-detector';
