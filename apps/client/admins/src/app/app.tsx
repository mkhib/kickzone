import { AdminsRouter } from '@kickzone-workspace/admins-router';
import { usePageTitle } from '@kickzone-workspace/shared-i18n';

export function App() {
  usePageTitle('Admin Panel');
  return <AdminsRouter />;
}

export default App;
