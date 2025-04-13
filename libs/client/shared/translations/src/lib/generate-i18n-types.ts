import fs from 'fs';
import path from 'path';

const localesPath = path.join(__dirname, '../../public/locales/en');
const files = fs.readdirSync(localesPath);

const types = files.map(file => {
  const ns = file.replace('.json', '');
  const content = require(path.join(localesPath, file));
  const keys = Object.keys(content).map(key => `'${key}'`).join(' | ');
  return `export type ${ns}Keys = ${keys};`;
});

fs.writeFileSync(
  path.join(__dirname, '../../libs/shared/i18n/src/lib/i18n.types.ts'),
  types.join('\n\n')
);