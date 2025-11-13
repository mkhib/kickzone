import type { MRT_TableOptions } from 'material-react-table';

/**
 * Props for RTL table configuration
 */
export interface RTLTablePropsConfig {
  alignment: 'left' | 'right' | 'center';
  isFarsi: boolean;
}

/**
 * Gets MaterialReactTable props with RTL alignment support
 * @param config Configuration object with alignment and isFarsi
 * @returns Partial MRT_TableOptions with RTL-aligned cell props
 */
export function getRTLTableProps<T extends Record<string, any>>(
  config: RTLTablePropsConfig
): Partial<MRT_TableOptions<T>> {
  const { alignment, isFarsi } = config;

  return {
    muiTableHeadCellProps: {
      sx: {
        textAlign: alignment,
        '& .MuiTableSortLabel-root': {
          justifyContent: isFarsi ? 'flex-end' : 'flex-start',
        },
      },
    },
    muiTableBodyCellProps: {
      align: alignment,
      sx: {
        textAlign: alignment,
        '& > *': {
          textAlign: alignment,
        },
        '& .MuiBox-root': {
          textAlign: alignment,
        },
        '& .MuiTypography-root': {
          textAlign: alignment,
        },
      },
    },
  };
}

/**
 * Gets RTL-aligned column props for MaterialReactTable columns
 * @param alignment Text alignment ('left' | 'right' | 'center')
 * @returns Object with muiTableBodyCellProps and muiTableHeadCellProps
 */
export function getRTLColumnProps(alignment: 'left' | 'right' | 'center') {
  return {
    muiTableBodyCellProps: {
      align: alignment,
      sx: {
        textAlign: alignment,
        '& > *': {
          textAlign: alignment,
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        textAlign: alignment,
      },
    },
  };
}
