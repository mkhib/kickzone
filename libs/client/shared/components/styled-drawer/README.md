# styled-drawer

A shared reusable styled drawer component with glassmorphism design for the KickZone workspace.

## Overview

This library provides a consistent drawer component used across all client applications (Admins, Sellers, and Customers). It features:

- **Glassmorphism styling** with blur effects and semi-transparent backgrounds
- **RTL support** - automatically adjusts anchor position and borders based on text direction
- **Flexible variants** - supports temporary, persistent, and permanent drawer modes
- **Built-in close button** and divider
- **Responsive design** with proper positioning below the AppBar

## Components

### StyledDrawer

Main drawer component with glassmorphism styling.

**Props:**

- `open: boolean` - Controls drawer visibility
- `onClose: () => void` - Callback when drawer should close
- `children: ReactNode` - Drawer content (typically ListItemButtons)
- `variant?: 'temporary' | 'persistent' | 'permanent'` - Drawer behavior (default: 'temporary')
- `keepMounted?: boolean` - Keep drawer mounted when closed (default: false)

### CustomListItemText

Styled `ListItemText` component with consistent text color (#000000) for drawer list items.

## Usage

```tsx
import { StyledDrawer, CustomListItemText } from '@kickzone-workspace/styled-drawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';

function MyHeaderbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <StyledDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <ListItemButton to="/home" component={Link}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <CustomListItemText primary="Home" />
      </ListItemButton>
    </StyledDrawer>
  );
}
```

## Running unit tests

Run `nx test styled-drawer` to execute the unit tests via [Vitest](https://vitest.dev/).
