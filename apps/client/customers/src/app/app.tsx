import { CustomersRouter } from '@kickzone-workspace/customers-router';
import { useI18nContext, usePageTitle } from '@kickzone-workspace/shared-i18n';
import { ErrorBoundary } from '@kickzone-workspace/error-boundary';

export function App() {
  const { LL } = useI18nContext();
  usePageTitle(() => LL.navigation.home());

  return (
    <ErrorBoundary>
      <CustomersRouter />
    </ErrorBoundary>
  );
}

export default App;
