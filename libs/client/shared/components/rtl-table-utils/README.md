# RTL Table Utils

A reusable library for creating RTL (Right-to-Left) aligned MaterialReactTable columns and tables with proper Farsi/English support.

## Features

- Automatic RTL alignment based on current locale
- Reusable column creation helpers
- Pre-built cell components for text and status columns
- Table-level props configuration
- Type-safe with TypeScript

## Installation

This library is part of the workspace and can be imported directly:

```typescript
import { useTableAlignment, getRTLTableProps, createRTLTextColumn, createRTLStatusColumn, RTLStatusCell, getRTLColumnProps } from '@kickzone-workspace/rtl-table-utils';
```

## Usage

### Basic Setup

```typescript
import { useTableAlignment, getRTLTableProps, createRTLTextColumn } from '@kickzone-workspace/rtl-table-utils';

function MyTable() {
  const { alignment, isFarsi } = useTableAlignment();

  const columns = useMemo(() => [createRTLTextColumn<MyDataType>('name', 'Name', { alignment }), createRTLTextColumn<MyDataType>('email', 'Email', { alignment })], [alignment]);

  const table = useMaterialReactTable({
    columns,
    data: myData,
    ...getRTLTableProps({ alignment, isFarsi }),
  });

  return <MaterialReactTable table={table} />;
}
```

### Creating Text Columns

```typescript
const columns = [createRTLTextColumn<Seller>('user.name', LL.table.name(), { alignment }), createRTLTextColumn<Seller>('user.email', LL.table.email(), { alignment })];
```

### Creating Status Columns

```typescript
const statusColumn = createRTLStatusColumn<Seller>('isActive', LL.table.status(), {
  alignment,
  activeColor: 'success.main',
  inactiveColor: 'error.main',
  getIsActive: (row) => row.isActive,
});
```

### Custom Status Cell with Translation

```typescript
import { RTLStatusCell } from '@kickzone-workspace/rtl-table-utils';

{
  ...createRTLStatusColumn<Seller>('isActive', LL.table.status(), {
    alignment,
    activeColor: 'success.main',
    inactiveColor: 'error.main',
    getIsActive: (row) => row.isActive,
  }),
  Cell: ({ row }) => {
    const statusText = row.original.isActive
      ? LL.table.active()
      : LL.table.inactive();
    return (
      <RTLStatusCell
        alignment={alignment}
        value={statusText}
        isActive={row.original.isActive}
        activeColor="success.main"
        inactiveColor="error.main"
      />
    );
  },
}
```

### Actions Column

```typescript
import { getRTLColumnProps } from '@kickzone-workspace/rtl-table-utils';

const actionsColumn: MRT_ColumnDef<Seller> = {
  id: 'actions',
  header: LL.table.actions(),
  ...getRTLColumnProps(alignment),
  Cell: ({ row }) => (
    // Your action buttons here
  ),
};
```

## API Reference

### `useTableAlignment()`

Hook that provides RTL alignment utilities.

**Returns:**

- `alignment`: `'left' | 'right' | 'center'` - Text alignment based on locale
- `isFarsi`: `boolean` - Whether current locale is Farsi
- `isRTL`: `boolean` - Whether current locale is RTL
- `currentLocale`: `string` - Current locale code

### `getRTLTableProps(config)`

Returns MaterialReactTable props with RTL alignment support.

**Parameters:**

- `config.alignment`: `'left' | 'right' | 'center'`
- `config.isFarsi`: `boolean`

**Returns:** Partial `MRT_TableOptions` with `muiTableHeadCellProps` and `muiTableBodyCellProps`

### `createRTLTextColumn<T>(accessorKey, header, options)`

Creates a RTL-aligned text column.

**Parameters:**

- `accessorKey`: `string` - Data accessor key
- `header`: `string` - Column header
- `options.alignment`: `'left' | 'right' | 'center'`

**Returns:** `MRT_ColumnDef<T>`

### `createRTLStatusColumn<T>(accessorKey, header, options)`

Creates a RTL-aligned status column with color support.

**Parameters:**

- `accessorKey`: `string` - Data accessor key
- `header`: `string` - Column header
- `options.alignment`: `'left' | 'right' | 'center'`
- `options.activeColor?`: `string` - Color for active status (default: `'success.main'`)
- `options.inactiveColor?`: `string` - Color for inactive status (default: `'error.main'`)
- `options.getIsActive?`: `(row: T) => boolean` - Function to determine if row is active

**Returns:** `MRT_ColumnDef<T>`

### `getRTLColumnProps(alignment)`

Returns column-level props for RTL alignment.

**Parameters:**

- `alignment`: `'left' | 'right' | 'center'`

**Returns:** Object with `muiTableBodyCellProps` and `muiTableHeadCellProps`

### `RTLTextCell` & `RTLStatusCell`

React components for rendering RTL-aligned cells. Used internally by the column helpers but can be used directly for custom cells.

## Examples

See `libs/client/admins/screens/seller-management/src/lib/SellerManagement.tsx` for a complete example.
