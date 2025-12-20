import { CustomersRouter } from '@kickzone-workspace/customers-router';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';

export function App() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.navigation.home());
  return <CustomersRouter />;
}

export default App;
