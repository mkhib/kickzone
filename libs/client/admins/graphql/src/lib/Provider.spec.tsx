import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminsGraphQLProvider } from './Provider';
import { AdminsApolloProvider } from './AdminsApolloProvider';

// Mock AdminsApolloProvider
vi.mock('./AdminsApolloProvider', () => ({
  AdminsApolloProvider: vi.fn(({ children }) => (
    <div data-testid="admins-apollo-provider">{children}</div>
  )),
}));

describe('AdminsGraphQLProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <AdminsGraphQLProvider>
        <div>Test Child</div>
      </AdminsGraphQLProvider>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('should render AdminsApolloProvider', () => {
    const { getByTestId } = render(
      <AdminsGraphQLProvider>
        <div>Test Child</div>
      </AdminsGraphQLProvider>
    );

    expect(getByTestId('admins-apollo-provider')).toBeInTheDocument();
  });

  it('should pass children to AdminsApolloProvider', () => {
    render(
      <AdminsGraphQLProvider>
        <div>Test Child</div>
      </AdminsGraphQLProvider>
    );

    expect(vi.mocked(AdminsApolloProvider)).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.any(Object),
      }),
      undefined
    );
  });

  it('should handle multiple children', () => {
    const { getByText } = render(
      <AdminsGraphQLProvider>
        <div>Child 1</div>
        <div>Child 2</div>
        <span>Child 3</span>
      </AdminsGraphQLProvider>
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();
    expect(getByText('Child 3')).toBeInTheDocument();
  });

  it('should handle empty children', () => {
    const { container } = render(
      <AdminsGraphQLProvider>{null}</AdminsGraphQLProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(vi.mocked(AdminsApolloProvider)).toHaveBeenCalled();
  });

  it('should handle undefined children', () => {
    const { container } = render(
      <AdminsGraphQLProvider>{undefined}</AdminsGraphQLProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(vi.mocked(AdminsApolloProvider)).toHaveBeenCalled();
  });
});
