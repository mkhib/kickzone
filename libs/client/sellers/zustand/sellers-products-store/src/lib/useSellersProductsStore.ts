import { create } from 'zustand';
import { KickzoneGraphqlTypes } from '@kickzone-workspace/codegen';

interface SellersProductsState {
  // Filter states
  search: string;
  category: string;
  sort: string;
  sortOrder: 'asc' | 'desc';
  status: KickzoneGraphqlTypes.ProductArchivedStatus;

  // Actions
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSellersProductsSortField: (sortField: string) => void;
  setSellersProductsSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setStatus: (status: KickzoneGraphqlTypes.ProductArchivedStatus) => void;
  resetFilters: () => void;
}

export const useSellersProductsStore = create<SellersProductsState>((set) => ({
  // Initial state
  search: '',
  category: '',
  sort: '',
  sortOrder: 'asc',
  status: KickzoneGraphqlTypes.ProductArchivedStatus.Active,

  // Actions
  setSearch: (search: string) => set({ search }),
  setCategory: (category: string) => set({ category }),
  setSellersProductsSortField: (sortField: string) => set({ sort: sortField }),
  setSellersProductsSortOrder: (sortOrder: 'asc' | 'desc') =>
    set({ sortOrder }),
  setStatus: (status: KickzoneGraphqlTypes.ProductArchivedStatus) =>
    set({ status }),
  resetFilters: () =>
    set({
      search: '',
      category: '',
      sort: '',
      sortOrder: 'asc',
      status: KickzoneGraphqlTypes.ProductArchivedStatus.Active,
    }),
}));
