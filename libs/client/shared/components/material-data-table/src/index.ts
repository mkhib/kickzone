export { DataTable } from './lib/material-data-table';
export type {
  DataTableProps,
  DataTableConfig,
  TableConfigPreset,
  CommonColumnTypes,
} from './lib/table-types';
export {
  TABLE_CONFIG_PRESETS,
  createCommonColumns,
  mergeTableConfig,
} from './lib/table-config';
export {
  createDateColumn,
  createStatusColumn,
  createNumberColumn,
  createCurrencyColumn,
  createActionsColumn,
  createBooleanColumn,
  createTextColumn,
} from './lib/table-utils';
