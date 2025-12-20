import { AdminsRouter } from '@kickzone-workspace/admins-router';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';

export function App() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.pageTitles.adminPanel());
  return <AdminsRouter />;
}

export default App;
