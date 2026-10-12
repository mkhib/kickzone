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
      borderTopRightRadius: '18px !important',
      borderBottomRightRadius: '18px !important',
      // Liquid glass — GPU-isolated layer (avoids hover thrash with backdrop-filter)
      isolation: 'isolate',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      contain: 'paint',
      backgroundColor: isDark
        ? 'rgba(14, 14, 16, 0.52) !important'
        : 'rgba(255, 255, 255, 0.42) !important',
      backgroundImage: isDark
        ? [
            'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, transparent 28%)',
            'linear-gradient(155deg, rgba(201, 167, 116, 0.08) 0%, transparent 42%, rgba(0, 0, 0, 0.22) 100%)',
          ].join(', ') + ' !important'
        : [
            'linear-gradient(180deg, rgba(255, 255, 255, 0.72) 0%, transparent 32%)',
            'linear-gradient(155deg, rgba(255, 255, 255, 0.55) 0%, rgba(246, 245, 242, 0.18) 45%, rgba(255, 255, 255, 0.35) 100%)',
          ].join(', ') + ' !important',
      backdropFilter: 'blur(24px) saturate(180%) !important',
      WebkitBackdropFilter: 'blur(24px) saturate(180%) !important',
      borderRight: isDark
        ? '1px solid rgba(255, 255, 255, 0.12) !important'
        : '1px solid rgba(255, 255, 255, 0.72) !important',
      borderLeft: 'none !important',
      boxShadow: isDark
        ? [
            '0 28px 64px rgba(0, 0, 0, 0.55)',
            'inset 0 1px 0 0 rgba(255, 255, 255, 0.14)',
            'inset 0 -1px 0 0 rgba(0, 0, 0, 0.25)',
            'inset -1px 0 0 0 rgba(255, 255, 255, 0.06)',
          ].join(', ') + ' !important'
        : [
            '0 24px 56px rgba(29, 29, 31, 0.08)',
            'inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            'inset 0 -1px 0 0 rgba(143, 132, 104, 0.06)',
            'inset -1px 0 0 0 rgba(255, 255, 255, 0.55)',
          ].join(', ') + ' !important',
    },
  };
});

export const CustomListItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
  '& .MuiListItemText-primary': {
    fontWeight: 600,
    fontSize: '0.9375rem',
    letterSpacing: '0.01em',
  },
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          px: 1,
          pt: 1,
          pb: 0.5,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            transition: 'background-color 0.15s ease, color 0.15s ease',
            '&:hover': {
              backgroundColor: (t) =>
                t.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'rgba(0, 0, 0, 0.05)',
              color: 'text.primary',
            },
          }}
          aria-label="close drawer"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider sx={{ opacity: 0.7 }} />
      <List
        sx={{
          px: 0.5,
          py: 1,
          // Keep item hover cheap: no backdrop-filter on children
          '& .MuiListItemButton-root': {
            transition:
              'background-color 0.15s ease, transform 0.15s ease !important',
            backdropFilter: 'none !important',
            WebkitBackdropFilter: 'none !important',
          },
        }}
      >
        {children}
      </List>
    </BaseStyledDrawer>
  );
}

export default StyledDrawer;
