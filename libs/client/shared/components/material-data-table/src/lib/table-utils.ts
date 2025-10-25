import type { MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import type { ReactNode } from 'react';

/**
 * Utility functions for common table operations
 */

/**
 * Creates a formatted date column
 */
export function createDateColumn(
  accessorKey: string,
  header: string,
  options?: {
    format?: 'short' | 'long' | 'time';
    locale?: string;
  }
): MRT_ColumnDef<MRT_RowData> {
  const { format = 'short', locale = 'en-US' } = options || {};

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
    time: {
      hour: '2-digit',
      minute: '2-digit',
    },
  };

  return {
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const dateValue = cell.getValue() as string;
      if (!dateValue) return '-';

      try {
        return new Date(dateValue).toLocaleDateString(
          locale,
          formatOptions[format]
        );
      } catch {
        return dateValue;
      }
    },
  };
}

/**
 * Creates a status column with colored chips
 */
export function createStatusColumn(
  accessorKey: string,
  header: string,
  _statusColors?: Record<string, string>
): MRT_ColumnDef<MRT_RowData> {
  return {
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const status = cell.getValue() as string;
      return status || '-';
    },
  };
}

/**
 * Creates a number column with proper formatting
 */
export function createNumberColumn(
  accessorKey: string,
  header: string,
  options?: {
    decimals?: number;
    locale?: string;
  }
): MRT_ColumnDef<MRT_RowData> {
  const { decimals = 0, locale = 'en-US' } = options || {};

  return {
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const value = cell.getValue() as number;
      if (value === null || value === undefined) return '-';

      return value.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    },
  };
}

/**
 * Creates a currency column with proper formatting
 */
export function createCurrencyColumn(
  accessorKey: string,
  header: string,
  options?: {
    currency?: string;
    locale?: string;
  }
): MRT_ColumnDef<MRT_RowData> {
  const { currency = 'USD', locale = 'en-US' } = options || {};

  return {
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const value = cell.getValue() as number;
      if (value === null || value === undefined) return '-';

      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(value);
    },
  };
}

/**
 * Creates an actions column with custom actions
 */
export function createActionsColumn(
  header: string,
  actions: (row: MRT_RowData) => ReactNode
): MRT_ColumnDef<MRT_RowData> {
  return {
    id: 'actions',
    header,
    enableSorting: false,
    enableColumnFilter: false,
    Cell: ({ row }) => actions(row.original),
  };
}

/**
 * Creates a boolean column with yes/no display
 */
export function createBooleanColumn(
  accessorKey: string,
  header: string,
  options?: {
    trueText?: string;
    falseText?: string;
  }
): MRT_ColumnDef<MRT_RowData> {
  const { trueText = 'Yes', falseText = 'No' } = options || {};

  return {
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const value = cell.getValue() as boolean;
      return value ? trueText : falseText;
    },
  };
}

/**
 * Creates a text column with truncation
 */
export function createTextColumn(
  accessorKey: string,
  header: string,
  options?: {
    maxLength?: number;
    _showTooltip?: boolean;
  }
): MRT_ColumnDef<MRT_RowData> {
  const { maxLength = 50 } = options || {};

  return {
    accessorKey,
    header,
    Cell: ({ cell }) => {
      const value = cell.getValue() as string;
      if (!value) return '-';

      const truncated =
        value.length > maxLength
          ? `${value.substring(0, maxLength)}...`
          : value;

      return truncated;
    },
  };
}
