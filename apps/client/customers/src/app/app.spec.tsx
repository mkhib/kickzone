import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import App from './app';

vi.mock('@kickzone-workspace/shared-i18n', () => ({
  useI18nContext: () => ({
    LL: {
      navigation: {
        home: () => 'Home',
      },
    },
  }),
  usePageTitle: vi.fn(),
}));

vi.mock('@kickzone-workspace/customers-router', () => ({
  CustomersRouter: () => (
    <div data-testid="mocked-customers-router">Mocked Customers Router</div>
  ),
}));

describe('App', () => {
  it('renders CustomersRouter wrapped safely in ErrorBoundary', () => {
    render(<App />);
    expect(screen.getByTestId('mocked-customers-router')).toBeInTheDocument();
  });
});
