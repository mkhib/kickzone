import { useThemeContext } from '@kickzone-workspace/shared-i18n';
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

const BaseStyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    marginTop: HEIGHTS.header,
    height: HEIGHTS.drawer,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
}));

export const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  color: '#000000',
}));

interface StyledDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: 'temporary' | 'persistent' | 'permanent';
  keepMounted?: boolean;
}

export function StyledDrawer({
  open,
  onClose,
  children,
  variant = 'temporary',
  keepMounted = false,
}: StyledDrawerProps) {
  const { direction } = useThemeContext();

  return (
    <BaseStyledDrawer
      anchor={direction === 'rtl' ? 'right' : 'left'}
      open={open}
      onClose={onClose}
      variant={variant}
      ModalProps={{ keepMounted }}
      sx={{
        '& .MuiDrawer-paper': {
          borderRight:
            direction === 'rtl' ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
          borderLeft:
            direction === 'rtl' ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>{children}</List>
    </BaseStyledDrawer>
  );
}

export default StyledDrawer;
