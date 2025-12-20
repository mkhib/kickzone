import { SellersRouter } from '@kickzone-workspace/sellers-router';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';

export function App() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.appNames.sellersPortal());
  return <SellersRouter />;
}

export default App;
