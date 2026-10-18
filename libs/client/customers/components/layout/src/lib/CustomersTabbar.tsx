import React, { useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCustomersAuth } from '@kickzone-workspace/customers-auth-context';
import { useCartItemCount } from '@kickzone-workspace/customer-cart-store';
import { useI18nContext } from '@kickzone-workspace/shared-i18n';
import { CUSTOMER_ROUTES } from '@kickzone-workspace/customers-routes';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface CustomerTabItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
  matchPaths?: string[];
}

export interface CustomersTabbarProps {
  handledInTabbarIds?: string[];
  tabItems?: CustomerTabItem[];
  variant?: 'default' | 'glass';
}

export function CustomersTabbar({
  handledInTabbarIds,
  tabItems,
  variant = 'default',
}: CustomersTabbarProps = {}) {
  const { user } = useCustomersAuth();
  const totalItems = useCartItemCount();
  const { LL } = useI18nContext();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';

  const defaultTabs: CustomerTabItem[] = useMemo(() => {
    if (user) {
      return [
        {
          id: 'home',
          label: LL.navigation.home(),
          path: CUSTOMER_ROUTES.HOME,
          icon: <HomeIcon />,
          matchPaths: [CUSTOMER_ROUTES.HOME, CUSTOMER_ROUTES.PRODUCTS, '/'],
        },
        {
          id: 'cart',
          label: LL.navigation.shoppingCart(),
          path: CUSTOMER_ROUTES.CART,
          icon: <ShoppingCartIcon />,
          badge: totalItems,
          matchPaths: [CUSTOMER_ROUTES.CART],
        },
        {
          id: 'orders',
          label: LL.orders.myOrders(),
          path: CUSTOMER_ROUTES.ORDERS,
          icon: <ReceiptIcon />,
          matchPaths: [CUSTOMER_ROUTES.ORDERS],
        },
        {
          id: 'profile',
          label: LL.navigation.profile(),
          path: CUSTOMER_ROUTES.PROFILE,
          icon: <AccountCircleIcon />,
          matchPaths: [CUSTOMER_ROUTES.PROFILE],
        },
      ];
    }

    return [
      {
        id: 'home',
        label: LL.navigation.home(),
        path: CUSTOMER_ROUTES.HOME,
        icon: <HomeIcon />,
        matchPaths: [CUSTOMER_ROUTES.HOME, CUSTOMER_ROUTES.PRODUCTS, '/'],
      },
      {
        id: 'cart',
        label: LL.navigation.shoppingCart(),
        path: CUSTOMER_ROUTES.CART,
        icon: <ShoppingCartIcon />,
        badge: totalItems,
        matchPaths: [CUSTOMER_ROUTES.CART],
      },
      {
        id: 'login',
        label: LL.button.login(),
        path: CUSTOMER_ROUTES.LOGIN,
        icon: <AccountCircleIcon />,
        matchPaths: [CUSTOMER_ROUTES.LOGIN],
      },
    ];
  }, [user, totalItems, LL]);

  const activeTabs = useMemo(() => {
    const baseTabs = tabItems || defaultTabs;
    if (!handledInTabbarIds) {
      return baseTabs;
    }
    return baseTabs.filter((tab) => handledInTabbarIds.includes(tab.id));
  }, [tabItems, defaultTabs, handledInTabbarIds]);

  const currentTabId = useMemo(() => {
    const currentPath = location.pathname;
    const found = activeTabs.find((tab) => {
      if (tab.matchPaths && tab.matchPaths.includes(currentPath)) {
        return true;
      }
      return tab.path !== '/' && tab.path !== ''
        ? currentPath.startsWith(tab.path)
        : currentPath === tab.path;
    });
    return found ? found.id : false;
  }, [activeTabs, location.pathname]);

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      const targetTab = activeTabs.find((t) => t.id === newValue);
      if (targetTab) {
        if (location.pathname === targetTab.path) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate(targetTab.path);
        }
      }
    },
    [activeTabs, location.pathname, navigate]
  );

  if (!isMobile) {
    return null;
  }

  if (variant === 'glass') {
    return (
      <Box
        component="nav"
        aria-label="Mobile Bottom Tabbar"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          position: 'fixed',
          insetInline: 0,
          marginInline: 'auto',
          bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
          width: 'calc(100% - 32px)',
          maxWidth: '358px',
          zIndex: (currentTheme) => currentTheme.zIndex.appBar,
          borderRadius: '28px',
          padding: '10px 24px',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isDark
            ? 'rgba(16, 18, 27, 0.86)'
            : 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(40px) saturate(210%)',
          WebkitBackdropFilter: 'blur(40px) saturate(210%)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.18)'
            : '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow: isDark
            ? 'inset 0 1.5px 2px rgba(255, 255, 255, 0.25), 0 20px 45px -8px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.6)'
            : 'inset 0 1.5px 2px rgba(255, 255, 255, 0.95), 0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.04)',
          pointerEvents: 'auto',
        }}
      >
        {activeTabs.map((tab) => {
          const isActive = currentTabId === tab.id;
          const actionIcon =
            tab.badge !== undefined && tab.badge > 0 ? (
              <Badge
                badgeContent={tab.badge}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: isDark ? '#ffffff' : '#171717',
                    color: isDark ? '#171717' : '#ffffff',
                    fontSize: '9px',
                    fontWeight: 700,
                    minWidth: '14px',
                    height: '14px',
                    padding: '0 3px',
                  },
                }}
              >
                {tab.icon}
              </Badge>
            ) : (
              tab.icon
            );

          return (
            <Box
              key={tab.id}
              component="button"
              type="button"
              onClick={() => {
                if (location.pathname === tab.path) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate(tab.path);
                }
              }}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
              sx={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                p: 0,
                minWidth: 48,
                minHeight: 44,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                color: isActive
                  ? 'var(--lg-ink, #ffffff)'
                  : isDark
                  ? '#a1a1a6'
                  : 'var(--lg-ink-5, #6e6e73)',
                transition: 'transform 0.15s ease, color 0.15s ease',
                '&:hover, &:active': {
                  color: 'var(--lg-ink, #ffffff)',
                  transform: 'scale(0.95)',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: 22,
                },
              }}
            >
              {actionIcon}
              <Typography
                component="span"
                sx={{
                  fontSize: '10px',
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: '0.01em',
                  fontFamily: 'inherit',
                }}
              >
                {tab.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <Paper
      component="nav"
      aria-label="Mobile Bottom Tabbar"
      elevation={8}
      sx={{
        display: { xs: 'block', sm: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: (currentTheme) => currentTheme.zIndex.appBar,
        backgroundColor: (currentTheme) => {
          const isDark = currentTheme.palette.mode === 'dark';
          return isDark
            ? 'rgba(14, 14, 18, 0.94)'
            : 'rgba(255, 255, 255, 0.96)';
        },
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: (currentTheme) =>
          currentTheme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: (currentTheme) =>
          currentTheme.palette.mode === 'dark'
            ? '0 -4px 24px rgba(0, 0, 0, 0.5)'
            : '0 -4px 20px rgba(0, 0, 0, 0.06)',
        pb: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <BottomNavigation
        value={currentTabId}
        onChange={handleTabChange}
        showLabels
        sx={{
          backgroundColor: 'transparent',
          height: 60,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 0,
            padding: '6px 0',
            color: (currentTheme) =>
              currentTheme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.55)'
                : 'rgba(0, 0, 0, 0.55)',
            transition: 'all 0.2s ease-in-out',
            '&.Mui-selected': {
              color: (currentTheme) =>
                currentTheme.palette.mode === 'dark'
                  ? currentTheme.palette.primary.light || '#90caf9'
                  : currentTheme.palette.primary.main,
              fontWeight: 600,
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.72rem',
              letterSpacing: '0.02em',
              mt: 0.25,
              '&.Mui-selected': {
                fontSize: '0.75rem',
                fontWeight: 600,
              },
            },
          },
        }}
      >
        {activeTabs.map((tab) => {
          const actionIcon =
            tab.badge !== undefined && tab.badge > 0 ? (
              <Badge badgeContent={tab.badge} color="error">
                {tab.icon}
              </Badge>
            ) : (
              tab.icon
            );

          return (
            <BottomNavigationAction
              key={tab.id}
              value={tab.id}
              label={tab.label}
              icon={actionIcon}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}

export default CustomersTabbar;
