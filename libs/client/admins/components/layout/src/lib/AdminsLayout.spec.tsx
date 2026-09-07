import { render, screen } from '@testing-library/react';
import { AdminsLayout } from './AdminsLayout';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('@kickzone-workspace/layout', () => ({
  Layout: ({
    header,
    body,
    footer,
  }: {
    header: React.ReactNode;
    body: React.ReactNode;
    footer: React.ReactNode;
  }) => (
    <div data-testid="layout">
      <div data-testid="header">{header}</div>
      <div data-testid="body">{body}</div>
      <div data-testid="footer">{footer}</div>
    </div>
  ),
  ILayoutProps: {},
}));

vi.mock('@kickzone-workspace/admins-headerbar', () => ({
  AdminsHeaderbar: () => (
    <div data-testid="admins-headerbar">Admin Headerbar</div>
  ),
}));

vi.mock('@kickzone-workspace/admins-footer', () => ({
  AdminsFooter: () => <div data-testid="admins-footer">Admins Footer</div>,
}));

describe('AdminsLayout', () => {
  it('should render successfully', () => {
    render(
      <AdminsLayout>
        <div>Test Content</div>
      </AdminsLayout>
    );

    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('should render children in the body', () => {
    render(
      <AdminsLayout>
        <div data-testid="test-content">Test Content</div>
      </AdminsLayout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render AdminsHeaderbar in header', () => {
    render(
      <AdminsLayout>
        <div>Test Content</div>
      </AdminsLayout>
    );

    expect(screen.getByTestId('admins-headerbar')).toBeInTheDocument();
    expect(screen.getByText('Admin Headerbar')).toBeInTheDocument();
  });

  it('should render AdminsFooter in footer', () => {
    render(
      <AdminsLayout>
        <div>Test Content</div>
      </AdminsLayout>
    );

    expect(screen.getByTestId('admins-footer')).toBeInTheDocument();
    expect(screen.getByText('Admins Footer')).toBeInTheDocument();
  });

  it('should pass all props to Layout component', () => {
    const testChildren = (
      <div data-testid="complex-content">Complex Test Content</div>
    );

    render(<AdminsLayout>{testChildren}</AdminsLayout>);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('complex-content')).toBeInTheDocument();
    expect(screen.getByText('Complex Test Content')).toBeInTheDocument();
  });
});
