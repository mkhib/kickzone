import type { MRT_RowData, MRT_TableOptions } from 'material-react-table';

/**
 * Props for RTL table configuration
 */
export interface RTLTablePropsConfig {
  alignment: 'left' | 'right' | 'center';
  isFarsi: boolean;
}

function contentJustify(alignment: 'left' | 'right' | 'center') {
  if (alignment === 'right') return 'flex-end';
  if (alignment === 'center') return 'center';
  return 'flex-start';
}

/**
 * Gets MaterialReactTable props with RTL alignment support.
 * Aligns header labels and body cells the same way so values sit under titles in Farsi.
 */
export function getRTLTableProps<T extends MRT_RowData>(
  config: RTLTablePropsConfig
): Partial<MRT_TableOptions<T>> {
  const { alignment, isFarsi } = config;
  const justify = contentJustify(alignment);

  return {
    enableColumnActions: false,
    muiTablePaperProps: {
      sx: {
        direction: isFarsi ? 'rtl' : 'ltr',
      },
    },
    muiTableContainerProps: {
      sx: {
        direction: isFarsi ? 'rtl' : 'ltr',
      },
    },
    muiTableProps: {
      sx: {
        direction: isFarsi ? 'rtl' : 'ltr',
      },
    },
    muiTableHeadCellProps: {
      align: alignment,
      sx: {
        textAlign: alignment,
        verticalAlign: 'middle',
        '& .Mui-TableHeadCell-Content': {
          justifyContent: justify,
          width: '100%',
        },
        '& .Mui-TableHeadCell-Content-Labels': {
          justifyContent: justify,
          width: '100%',
          flex: '1 1 auto',
        },
        '& .Mui-TableHeadCell-Content-Wrapper': {
          textAlign: alignment,
          width: '100%',
          overflow: 'visible',
        },
        '& .MuiTableSortLabel-root': {
          width: '100%',
          justifyContent: justify,
          flexDirection: isFarsi ? 'row-reverse' : 'row',
        },
        // Keep sort icon from shifting the label away from body cell text
        '& .MuiTableSortLabel-icon': {
          marginLeft: isFarsi ? 0 : '4px',
          marginRight: isFarsi ? '4px' : 0,
        },
      },
    },
    muiTableBodyCellProps: {
      align: alignment,
      sx: {
        textAlign: alignment,
        verticalAlign: 'middle',
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
  const justify = contentJustify(alignment);

  return {
    muiTableBodyCellProps: {
      align: alignment,
      sx: {
        textAlign: alignment,
        verticalAlign: 'middle',
        '& > *': {
          textAlign: alignment,
        },
      },
    },
    muiTableHeadCellProps: {
      align: alignment,
      sx: {
        textAlign: alignment,
        verticalAlign: 'middle',
        '& .Mui-TableHeadCell-Content': {
          justifyContent: justify,
          width: '100%',
        },
        '& .Mui-TableHeadCell-Content-Labels': {
          justifyContent: justify,
          width: '100%',
        },
        '& .Mui-TableHeadCell-Content-Wrapper': {
          textAlign: alignment,
          width: '100%',
        },
      },
    },
  };
}
