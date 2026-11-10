import { CustomersRouter } from '@kickzone-workspace/customers-router';
import { ErrorBoundary } from '@kickzone-workspace/error-boundary';

export function App() {
  return (
    <ErrorBoundary>
      <CustomersRouter />
    </ErrorBoundary>
  );
}

export default App;
