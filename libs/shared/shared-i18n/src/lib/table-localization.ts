import type { MRT_Localization } from 'material-react-table';
import type { TranslationFunctions } from './locales/i18n-types';
import { useI18nContext } from './locales/i18n-react';

/**
 * Creates a MaterialReactTable localization object using the provided translation functions
 * @param LL - Translation functions from useI18nContext
 * @returns MRT_Localization object for MaterialReactTable
 */
export function createTableLocalization(
  LL: TranslationFunctions
): Partial<MRT_Localization> {
  return {
    actions: LL.tableMenu.actions(),
    cancel: LL.tableMenu.cancel(),
    clearFilter: LL.tableMenu.clearFilter(),
    clearSearch: LL.tableMenu.clearSearch(),
    clearSort: LL.tableMenu.clearSort(),
    columnActions: LL.tableMenu.columnActions(),
    edit: LL.tableMenu.edit(),
    expandAll: LL.tableMenu.expandAll(),
    hideAll: LL.tableMenu.hideAll(),
    hideColumn: LL.tableMenu.hideColumn(),
    max: LL.tableMenu.max(),
    min: LL.tableMenu.min(),
    move: LL.tableMenu.move(),
    noRecordsToDisplay: LL.tableMenu.noRecordsToDisplay(),
    noResultsFound: LL.tableMenu.noResultsFound(),
    of: LL.tableMenu.of(),
    pinToLeft: LL.tableMenu.pinToLeft(),
    pinToRight: LL.tableMenu.pinToRight(),
    rowActions: LL.tableMenu.rowActions(),
    rowNumber: LL.tableMenu.rowNumber(),
    rowNumbers: LL.tableMenu.rowNumbers(),
    rowsPerPage: LL.tableMenu.rowsPerPage(),
    save: LL.tableMenu.save(),
    search: LL.tableMenu.search(),
    select: LL.tableMenu.select(),
    showAll: LL.tableMenu.showAll(),
    showAllColumns: LL.tableMenu.showAllColumns(),
    showHideColumns: LL.tableMenu.showHideColumns(),
    showHideFilters: LL.tableMenu.showHideFilters(),
    showHideSearch: LL.tableMenu.showHideSearch(),
    thenBy: LL.tableMenu.thenBy(),
    toggleDensity: LL.tableMenu.toggleDensity(),
    toggleFullScreen: LL.tableMenu.toggleFullScreen(),
    toggleSelectAll: LL.tableMenu.toggleSelectAll(),
    toggleSelectRow: LL.tableMenu.toggleSelectRow(),
    toggleVisibility: LL.tableMenu.toggleVisibility(),
    unpin: LL.tableMenu.unpin(),
    unpinAll: LL.tableMenu.unpinAll(),
  };
}

/**
 * Hook that provides MaterialReactTable localization using the current language context
 * @returns MRT_Localization object for MaterialReactTable
 */
export function useTableLocalization(): Partial<MRT_Localization> {
  const { LL } = useI18nContext();
  return createTableLocalization(LL);
}
