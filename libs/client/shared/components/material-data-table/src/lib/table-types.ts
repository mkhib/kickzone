import type {
  MRT_ColumnDef,
  MRT_TableOptions,
  MRT_RowData,
} from 'material-react-table';
import type { ReactNode } from 'react';

/**
 * Configuration presets for different table types
 */
export type TableConfigPreset =
  | 'default'
  | 'orders'
  | 'sellers'
  | 'products'
  | 'minimal';

/**
 * Table configuration options
 */
export interface DataTableConfig {
  /** Table preset to use */
  preset?: TableConfigPreset;
  /** Enable row actions */
  enableRowActions?: boolean;
  /** Enable column ordering */
  enableColumnOrdering?: boolean;
  /** Enable global filter */
  enableGlobalFilter?: boolean;
  /** Enable sorting */
  enableSorting?: boolean;
  /** Enable row selection */
  enableRowSelection?: boolean;
  /** Initial sorting configuration */
  initialSorting?: Array<{ id: string; desc: boolean }>;
  /** Initial density */
  initialDensity?: 'compact' | 'comfortable' | 'spacious';
  /** Custom toolbar actions */
  renderTopToolbarCustomActions?: () => ReactNode;
  /** Custom detail panel renderer */
  renderDetailPanel?: (props: { row: MRT_RowData }) => ReactNode;
  /** Row click handler */
  onRowClick?: (row: MRT_RowData) => void;
  /** Custom row props */
  muiTableBodyRowProps?: (props: {
    row: MRT_RowData;
  }) => Record<string, unknown>;
}

/**
 * Props for the DataTable component
 */
export interface DataTableProps<T extends MRT_RowData = MRT_RowData> {
  /** Table columns definition */
  columns: MRT_ColumnDef<T>[];
  /** Table data */
  data: T[];
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: Error | null;
  /** Table configuration */
  config?: DataTableConfig;
  /** Additional Material React Table options */
  tableOptions?: Partial<MRT_TableOptions<T>>;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Custom error message */
  errorMessage?: string;
}

/**
 * Common column types for reuse
 */
export interface CommonColumnTypes {
  /** Date column configuration */
  dateColumn: (
    accessorKey: string,
    header: string
  ) => MRT_ColumnDef<MRT_RowData>;
  /** Status column configuration */
  statusColumn: (
    accessorKey: string,
    header: string
  ) => MRT_ColumnDef<MRT_RowData>;
  /** Actions column configuration */
  actionsColumn: (actions: ReactNode) => MRT_ColumnDef<MRT_RowData>;
  /** Number column configuration */
  numberColumn: (
    accessorKey: string,
    header: string
  ) => MRT_ColumnDef<MRT_RowData>;
}
