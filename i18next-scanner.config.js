// i18next-scanner.config.js
module.exports = {
  input: ['libs/**/*.ts', 'libs/**/*.tsx', 'apps/**/*.ts', 'apps/**/*.tsx'],
  output: './libs/shared/shared-i18n/src/lib/locales',
  options: {
    debug: true,
    sort: true,
  },
  keySeparator: '.',
  nsSeparator: ':',
  defaultValue: '__STRING_NOT_TRANSLATED__',
  lngs: ['en', 'fa'],
  ns: ['common'],
  resource: {
    loadPath: 'libs/shared/shared-i18n/src/lib/locales/{{lng}}/{{ns}}.json',
    savePath: 'libs/shared/shared-i18n/src/lib/locales/{{lng}}/{{ns}}.json',
  },
  func: {
    list: ['t'],
    extensions: ['.ts', '.tsx'],
  },
  trans: {
    component: 'Trans',
    i18nKey: 'i18nKey',
    extensions: ['.ts', '.tsx'],
  },
};
