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

const BaseStyledDrawer = styled(Drawer)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  return {
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
      // Liquid glass styling
      backgroundColor: isDark
        ? 'rgba(18, 18, 22, 0.38) !important'
        : 'rgba(255, 255, 255, 0.28) !important',
      backgroundImage: isDark
        ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 40%, rgba(0, 0, 0, 0.18) 100%) !important'
        : 'linear-gradient(145deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.12) 40%, rgba(255, 255, 255, 0.28) 100%) !important',
      backdropFilter: 'blur(32px) saturate(210%) !important',
      WebkitBackdropFilter: 'blur(32px) saturate(210%) !important',
      borderRight: isDark
        ? '1px solid rgba(255, 255, 255, 0.14) !important'
        : '1px solid rgba(255, 255, 255, 0.6) !important',
      borderLeft: 'none !important',
      boxShadow: isDark
        ? '0 24px 64px rgba(0, 0, 0, 0.55), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.18), inset -1px 0 1.5px 0 rgba(255, 255, 255, 0.08) !important'
        : '0 24px 60px rgba(0, 0, 0, 0.08), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.8), inset -1px 0 1.5px 0 rgba(255, 255, 255, 0.5) !important',
    },
  };
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
