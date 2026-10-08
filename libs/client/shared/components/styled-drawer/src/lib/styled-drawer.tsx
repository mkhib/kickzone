import { DRAWER_WIDTH, HEIGHTS } from '@kickzone-workspace/sizes';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

const BaseStyledDrawer = styled(Drawer)({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    marginTop: HEIGHTS.header,
    height: HEIGHTS.drawer,
    borderTopLeftRadius: '0 !important',
    borderBottomLeftRadius: '0 !important',
    borderTopRightRadius: '16px !important',
    borderBottomRightRadius: '16px !important',
  },
});

export const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 600,
}));

export interface StyledDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: 'temporary' | 'persistent' | 'permanent';
  keepMounted?: boolean;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
}

export function StyledDrawer({
  open,
  onClose,
  children,
  variant = 'temporary',
  keepMounted = false,
  anchor = 'left',
}: StyledDrawerProps) {
  return (
    <BaseStyledDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      variant={variant}
      ModalProps={{ keepMounted }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'inherit',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.08)',
            },
          }}
          aria-label="close drawer"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ px: 0.5, py: 1 }}>{children}</List>
    </BaseStyledDrawer>
  );
}

export default StyledDrawer;
