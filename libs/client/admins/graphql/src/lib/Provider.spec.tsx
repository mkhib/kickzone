import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminsGraphQLProvider } from './Provider';
import { ApolloProviderBase } from '@kickzone-workspace/apollo-provider-base';

// Mock ApolloProviderBase
vi.mock('@kickzone-workspace/apollo-provider-base', () => ({
  ApolloProviderBase: vi.fn(({ children }) => (
    <div data-testid="apollo-provider-base">{children}</div>
  )),
}));

// Mock apolloClient
vi.mock('./client', () => ({
  default: { mock: 'client' },
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

  it('should render ApolloProviderBase', () => {
    const { getByTestId } = render(
      <AdminsGraphQLProvider>
        <div>Test Child</div>
      </AdminsGraphQLProvider>
    );

    expect(getByTestId('apollo-provider-base')).toBeInTheDocument();
  });

  it('should pass apolloClient to ApolloProviderBase', () => {
    render(
      <AdminsGraphQLProvider>
        <div>Test Child</div>
      </AdminsGraphQLProvider>
    );

    expect(vi.mocked(ApolloProviderBase)).toHaveBeenCalledWith(
      expect.objectContaining({
        client: { mock: 'client' },
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
    expect(vi.mocked(ApolloProviderBase)).toHaveBeenCalled();
  });

  it('should handle undefined children', () => {
    const { container } = render(
      <AdminsGraphQLProvider>{undefined}</AdminsGraphQLProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
    expect(vi.mocked(ApolloProviderBase)).toHaveBeenCalled();
  });
});
