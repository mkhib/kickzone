import { CustomersRouter } from '@kickzone-workspace/customers-router';
import { usePageTitle } from '@kickzone-workspace/shared-i18n';

export function App() {
  usePageTitle('Customer Portal');
  return <CustomersRouter />;
}

export default App;
