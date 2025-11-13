import type { MRT_ColumnDef } from 'material-react-table';
import {
  createRTLTextCellRenderer,
  createRTLStatusCellRenderer,
} from './rtl-cell-components';
import { getRTLColumnProps } from './rtl-table-props';

/**
 * Options for creating RTL text columns
 */
export interface CreateRTLTextColumnOptions {
  alignment: 'left' | 'right' | 'center';
}

/**
 * Creates a RTL-aligned text column for MaterialReactTable
 * @param accessorKey The key to access the data
 * @param header The column header text
 * @param options Configuration options
 * @returns MRT_ColumnDef with RTL alignment support
 */
export function createRTLTextColumn<T extends Record<string, unknown>>(
  accessorKey: string,
  header: string,
  options: CreateRTLTextColumnOptions
): MRT_ColumnDef<T> {
  const { alignment } = options;

  return {
    accessorKey,
    header,
    Cell: createRTLTextCellRenderer(alignment),
    ...getRTLColumnProps(alignment),
  };
}

/**
 * Options for creating RTL status columns
 */
export interface CreateRTLStatusColumnOptions<
  T extends Record<string, unknown>
> {
  alignment: 'left' | 'right' | 'center';
  activeColor?: string;
  inactiveColor?: string;
  getIsActive?: (row: T) => boolean;
}

/**
 * Creates a RTL-aligned status column for MaterialReactTable
 * @param accessorKey The key to access the data
 * @param header The column header text
 * @param options Configuration options
 * @returns MRT_ColumnDef with RTL alignment support and status styling
 */
export function createRTLStatusColumn<T extends Record<string, unknown>>(
  accessorKey: string,
  header: string,
  options: CreateRTLStatusColumnOptions<T>
): MRT_ColumnDef<T> {
  const { alignment, activeColor, inactiveColor, getIsActive } = options;

  return {
    accessorKey,
    header,
    Cell: createRTLStatusCellRenderer(alignment, {
      activeColor,
      inactiveColor,
      getIsActive,
    }),
    ...getRTLColumnProps(alignment),
  };
}
