import { render, screen } from '@testing-library/react';
import { AdminsLayout } from './AdminsLayout';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock the layout component
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

// Mock the headerbar component
vi.mock('@kickzone-workspace/admins-headerbar', () => ({
  AdminsHeaderbar: () => (
    <div data-testid="admins-headerbar">Admin Headerbar</div>
  ),
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

  it('should render footer with correct styling', () => {
    render(
      <AdminsLayout>
        <div>Test Content</div>
      </AdminsLayout>
    );

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent('Footer');

    // Check if the footer div has the red background style
    const footerDiv = footer.querySelector('div');
    expect(footerDiv).toHaveStyle('background-color: rgb(255, 0, 0)');
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
