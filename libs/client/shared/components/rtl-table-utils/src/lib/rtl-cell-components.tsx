import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { MRT_Cell } from 'material-react-table';

/**
 * Props for RTL cell components
 */
export interface RTLCellProps {
  alignment: 'left' | 'right' | 'center';
  value?: string | number | null;
}

/**
 * RTL-aligned text cell component for MaterialReactTable
 * Ensures proper right-to-left alignment in Farsi mode
 */
export function RTLTextCell({ alignment, value }: RTLCellProps) {
  return (
    <Typography
      component="div"
      sx={{
        textAlign: alignment,
        width: '100%',
        display: 'block',
      }}
      style={{
        textAlign: alignment,
        width: '100%',
        display: 'block',
      }}
    >
      {value || ''}
    </Typography>
  );
}

/**
 * RTL-aligned status cell component with color support
 */
export interface RTLStatusCellProps extends RTLCellProps {
  activeColor?: string;
  inactiveColor?: string;
  isActive?: boolean;
  fontWeight?: 'normal' | 'bold';
}

/**
 * RTL-aligned status cell component for MaterialReactTable
 * Displays status text with color coding and proper RTL alignment
 */
export function RTLStatusCell({
  alignment,
  value,
  activeColor = 'success.main',
  inactiveColor = 'error.main',
  isActive,
  fontWeight = 'bold',
}: RTLStatusCellProps) {
  const color = isActive ? activeColor : inactiveColor;

  return (
    <Box
      sx={{
        color,
        fontWeight,
        textAlign: alignment,
        width: '100%',
        display: 'block',
      }}
      style={{
        textAlign: alignment,
        width: '100%',
        display: 'block',
      }}
    >
      {value || ''}
    </Box>
  );
}

/**
 * Helper function to create a text cell renderer for MaterialReactTable
 */
export function createRTLTextCellRenderer<T extends Record<string, unknown>>(
  alignment: 'left' | 'right' | 'center'
) {
  return ({ cell }: { cell: MRT_Cell<T, unknown> }) => (
    <RTLTextCell alignment={alignment} value={cell.getValue<string>()} />
  );
}

/**
 * Helper function to create a status cell renderer for MaterialReactTable
 */
export function createRTLStatusCellRenderer<T extends Record<string, unknown>>(
  alignment: 'left' | 'right' | 'center',
  options?: {
    activeColor?: string;
    inactiveColor?: string;
    getIsActive?: (row: T) => boolean;
  }
) {
  return ({
    row,
    cell,
  }: {
    row: { original: T };
    cell: MRT_Cell<T, unknown>;
  }) => {
    const isActive = options?.getIsActive
      ? options.getIsActive(row.original)
      : cell.getValue<boolean>();

    return (
      <RTLStatusCell
        alignment={alignment}
        value={cell.getValue<string>()}
        isActive={isActive}
        activeColor={options?.activeColor}
        inactiveColor={options?.inactiveColor}
      />
    );
  };
}
