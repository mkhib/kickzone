module.exports = {
  input: ['libs/**/*.ts', 'libs/**/*.tsx', 'apps/**/*.ts', 'apps/**/*.tsx'],
  output: './libs/shared/shared-i18n/src/lib/locales',
  options: {
    debug: true,
    removeUnusedKeys: true,
    sort: true,
  },
  keySeparator: '.', // Key format: common.submit
  nsSeparator: ':', // Namespace separator (optional)
  defaultValue: '__STRING_NOT_TRANSLATED__',
  lngs: ['en', 'fa'],
  ns: ['common'], // can add more namespaces later
  resource: {
    loadPath: 'libs/shared/shared-i18n/src/lib/locales/{{lng}}/{{ns}}.json',
    savePath: 'libs/shared/shared-i18n/src/lib/locales/{{lng}}/{{ns}}.json',
  },
};
