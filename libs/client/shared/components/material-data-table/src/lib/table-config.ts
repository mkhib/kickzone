import type { MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import type { DataTableConfig, TableConfigPreset } from './table-types';

/**
 * Default table configuration presets
 */
export const TABLE_CONFIG_PRESETS: Record<TableConfigPreset, DataTableConfig> =
  {
    default: {
      enableRowActions: false,
      enableColumnOrdering: false,
      enableGlobalFilter: true,
      enableSorting: true,
      enableRowSelection: false,
      initialDensity: 'compact',
    },
    orders: {
      enableRowActions: false,
      enableColumnOrdering: false,
      enableGlobalFilter: true,
      enableSorting: true,
      enableRowSelection: false,
      initialSorting: [{ id: 'createdAt', desc: true }],
      initialDensity: 'compact',
    },
    sellers: {
      enableRowActions: false,
      enableColumnOrdering: false,
      enableGlobalFilter: true,
      enableSorting: true,
      enableRowSelection: false,
      initialDensity: 'compact',
    },
    products: {
      enableRowActions: false,
      enableColumnOrdering: false,
      enableGlobalFilter: true,
      enableSorting: true,
      enableRowSelection: false,
      initialDensity: 'comfortable',
    },
    minimal: {
      enableRowActions: false,
      enableColumnOrdering: false,
      enableGlobalFilter: false,
      enableSorting: false,
      enableRowSelection: false,
      initialDensity: 'compact',
    },
  };

/**
 * Common column definitions for reuse across tables
 */
export const createCommonColumns = () => ({
  /**
   * Creates a date column with proper formatting
   */
  dateColumn: (
    accessorKey: string,
    header: string
  ): MRT_ColumnDef<MRT_RowData> => ({
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const dateValue = cell.getValue() as string;
      if (!dateValue) return '-';

      try {
        return new Date(dateValue).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      } catch {
        return dateValue;
      }
    },
  }),

  /**
   * Creates a status column with plain text display
   */
  statusColumn: (
    accessorKey: string,
    header: string
  ): MRT_ColumnDef<MRT_RowData> => ({
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const status = cell.getValue() as string;
      return status || '-';
    },
  }),

  /**
   * Creates a number column with proper formatting
   */
  numberColumn: (
    accessorKey: string,
    header: string
  ): MRT_ColumnDef<MRT_RowData> => ({
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const value = cell.getValue() as number;
      return value?.toLocaleString() || '-';
    },
  }),

  /**
   * Creates a currency column with proper formatting
   */
  currencyColumn: (
    accessorKey: string,
    header: string
  ): MRT_ColumnDef<MRT_RowData> => ({
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const value = cell.getValue() as number;
      return value ? `$${value.toFixed(2)}` : '-';
    },
  }),
});

/**
 * Get status color based on status value
 */
function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    active: '#4caf50',
    inactive: '#f44336',
    pending: '#ff9800',
    confirmed: '#2196f3',
    processing: '#9c27b0',
    shipped: '#00bcd4',
    delivered: '#4caf50',
    cancelled: '#f44336',
    refunded: '#ff5722',
  };

  return statusColors[status.toLowerCase()] || '#757575';
}

/**
 * Merge table configuration with preset
 */
export function mergeTableConfig(
  preset: TableConfigPreset,
  customConfig?: Partial<DataTableConfig>
): DataTableConfig {
  return {
    ...TABLE_CONFIG_PRESETS[preset],
    ...customConfig,
  };
}
