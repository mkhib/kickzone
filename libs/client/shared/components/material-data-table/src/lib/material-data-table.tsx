import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_TableOptions,
  type MRT_RowData,
} from 'material-react-table';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';
import { MRT_Localization_EN } from 'material-react-table/locales/en';
import {
  useLanguageContext,
  useTableLocalization,
} from '@kickzone-workspace/shared-i18n';
import type { DataTableProps } from './table-types';
import { mergeTableConfig } from './table-config';

/**
 * Reusable DataTable component that consolidates common Material React Table configurations
 *
 * Features:
 * - Automatic RTL support
 * - Built-in localization
 * - Common table presets (orders, sellers, products, etc.)
 * - Consistent styling and behavior
 * - Loading and error states
 */
export function DataTable<T extends MRT_RowData = MRT_RowData>({
  columns,
  data,
  loading = false,
  error = null,
  config = {},
  tableOptions = {},
  emptyMessage = 'No data available',
  errorMessage,
}: DataTableProps<T>) {
  const { isRTL, currentLocale } = useLanguageContext();
  const customTableLocalization = useTableLocalization();

  // Use built-in localizations for supported languages, custom localization for others
  const tableLocalization =
    currentLocale === 'fa'
      ? MRT_Localization_FA
      : currentLocale === 'en'
      ? MRT_Localization_EN
      : customTableLocalization;

  // Merge configuration with preset
  const mergedConfig = mergeTableConfig(config.preset || 'default', config);

  // Create table options
  const tableConfig: MRT_TableOptions<T> = {
    columns,
    data,
    state: { isLoading: loading },
    enableRowActions: mergedConfig.enableRowActions,
    enableColumnOrdering: mergedConfig.enableColumnOrdering,
    enableGlobalFilter: mergedConfig.enableGlobalFilter,
    enableSorting: mergedConfig.enableSorting,
    enableRowSelection: mergedConfig.enableRowSelection,
    localization: tableLocalization,
    muiTableHeadCellProps: {
      align: isRTL ? 'right' : 'left',
      sx: {
        textAlign: isRTL ? 'right' : 'left',
        '& .Mui-TableHeadCell-Content': {
          justifyContent: isRTL ? 'flex-end' : 'flex-start',
          width: '100%',
        },
        '& .Mui-TableHeadCell-Content-Labels': {
          justifyContent: isRTL ? 'flex-end' : 'flex-start',
          width: '100%',
        },
        '& .Mui-TableHeadCell-Content-Wrapper': {
          textAlign: isRTL ? 'right' : 'left',
          width: '100%',
        },
        '& .MuiTableSortLabel-root': {
          width: '100%',
          justifyContent: isRTL ? 'flex-end' : 'flex-start',
          flexDirection: isRTL ? 'row-reverse' : 'row',
        },
      },
    },
    muiTableBodyCellProps: {
      align: isRTL ? 'right' : 'left',
      sx: {
        textAlign: isRTL ? 'right' : 'left',
      },
    },
    enableColumnActions: false,
    muiTableContainerProps: {
      sx: {
        direction: isRTL ? 'rtl' : 'ltr',
      },
    },
    muiTableProps: {
      sx: {
        direction: isRTL ? 'rtl' : 'ltr',
      },
    },
    muiTablePaperProps: {
      sx: {
        direction: isRTL ? 'rtl' : 'ltr',
      },
    },
    initialState: {
      sorting: mergedConfig.initialSorting,
      density: mergedConfig.initialDensity,
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        cursor: mergedConfig.onRowClick ? 'pointer' : 'default',
        '&:hover': {
          backgroundColor: mergedConfig.onRowClick
            ? 'action.hover'
            : 'transparent',
        },
        onClick: mergedConfig.onRowClick
          ? () => mergedConfig.onRowClick?.(row.original)
          : undefined,
      },
    }),
    renderTopToolbarCustomActions: mergedConfig.renderTopToolbarCustomActions,
    renderDetailPanel: mergedConfig.renderDetailPanel,
    ...tableOptions,
  };

  const table = useMaterialReactTable(tableConfig);

  // Show error state
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {errorMessage || `Error loading data: ${error.message}`}
      </Alert>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Show empty state
  if (!loading && (!data || data.length === 0)) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
        color="text.secondary"
      >
        {emptyMessage}
      </Box>
    );
  }

  return (
    <Box sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}

export default DataTable;
