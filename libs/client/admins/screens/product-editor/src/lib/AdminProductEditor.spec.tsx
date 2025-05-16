import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { AdminProductEditor } from './AdminProductEditor';
import { AdminsAuthProvider } from '@kickzone-workspace/admins-contexts';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { MemoryRouter } from 'react-router-dom';

const mockApolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
});

// Mock Apollo useQuery to prevent loading state in AdminsAuthProvider
vi.mock('@apollo/client', async (importOriginal) => {
  const actual = (await importOriginal()) as any;
  return {
    ...actual,
    useQuery: () => ({
      loading: false,
      data: {
        me: {
          id: 1,
          name: 'Test Admin',
          email: 'test@admin.com',
          role: 'ADMIN',
        },
      },
    }),
    ApolloProvider: actual.ApolloProvider,
    InMemoryCache: actual.InMemoryCache,
    ApolloClient: actual.ApolloClient,
  };
});

vi.mock('@kickzone-workspace/products-hook', () => ({
  useProducts: () => ({
    createProductWithInfos: vi.fn(),
    uploadProductInfoImages: vi.fn(),
    removeProductInfoImage: vi.fn(),
    isCreatingProduct: false,
  }),
  useProductById: () => ({
    product: undefined,
    loading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));
vi.mock('@kickzone-workspace/categories-hook', () => ({
  useCategories: () => ({ categoriesData: { categories: [] } }),
}));
vi.mock('@kickzone-workspace/snackbar-hook', () => ({
  useSnackbar: () => ({ showSnackbar: vi.fn() }),
  useSnackbarContext: () => ({ showSnackbar: vi.fn() }),
}));

describe('AdminProductEditor', () => {
  it('renders the editor', () => {
    render(
      <ApolloProvider client={mockApolloClient}>
        <MemoryRouter>
          <AdminsAuthProvider>
            <AdminProductEditor />
          </AdminsAuthProvider>
        </MemoryRouter>
      </ApolloProvider>
    );
    expect(
      screen.getByRole('heading', { name: /add\/edit product/i })
    ).toBeInTheDocument();
  });
});
