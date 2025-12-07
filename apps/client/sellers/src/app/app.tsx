import { SellersRouter } from '@kickzone-workspace/sellers-router';
import { usePageTitle } from '@kickzone-workspace/shared-i18n';

export function App() {
  usePageTitle('Sellers Portal');
  return <SellersRouter />;
}

export default App;
