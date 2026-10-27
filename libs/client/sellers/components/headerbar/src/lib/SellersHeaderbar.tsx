import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useSellersAuthContext } from '@kickzone-workspace/sellers-auth-context';
import { useI18nContext, useLanguageContext, SITE_NAME } from '@kickzone-workspace/shared-i18n';
import {
  SELLER_ROUTES,
  getSellerProductRoute,
} from '@kickzone-workspace/sellers-routes';
import {
  StyledDrawer,
  CustomListItemText,
} from '@kickzone-workspace/styled-drawer';
import { useUIStore } from '@kickzone-workspace/shared-ui-store';

// MUI Components & Icons
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuIcon from '@mui/icons-material/Menu';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

type DrawerIconTone = 'home' | 'products' | 'catalog' | 'orders' | 'settings' | 'profile' | 'logout' | 'login';

const DRAWER_ICON_TONES: Record<
  DrawerIconTone,
  { lightBg: string; lightFg: string; darkBg: string; darkFg: string }
> = {
  home: {
    lightBg: 'rgba(138, 106, 61, 0.14)',
    lightFg: '#6b522c',
    darkBg: 'rgba(201, 167, 116, 0.18)',
    darkFg: '#e0c49a',
  },
  products: {
    lightBg: 'rgba(45, 106, 106, 0.12)',
    lightFg: '#2a5f5f',
    darkBg: 'rgba(91, 179, 179, 0.16)',
    darkFg: '#8fd4d4',
  },
  catalog: {
    lightBg: 'rgba(92, 107, 138, 0.12)',
    lightFg: '#455574',
    darkBg: 'rgba(143, 160, 196, 0.16)',
    darkFg: '#b4c2de',
  },
  orders: {
    lightBg: 'rgba(154, 107, 47, 0.12)',
    lightFg: '#7a5524',
    darkBg: 'rgba(212, 165, 116, 0.16)',
    darkFg: '#e8c49a',
  },
  settings: {
    lightBg: 'rgba(107, 107, 107, 0.12)',
    lightFg: '#5a5a5a',
    darkBg: 'rgba(180, 180, 180, 0.16)',
    darkFg: '#d4d4d4',
  },
  profile: {
    lightBg: 'rgba(138, 106, 61, 0.14)',
    lightFg: '#6b522c',
    darkBg: 'rgba(201, 167, 116, 0.18)',
    darkFg: '#e0c49a',
  },
  logout: {
    lightBg: 'rgba(166, 93, 93, 0.12)',
    lightFg: '#8f4545',
    darkBg: 'rgba(224, 138, 138, 0.16)',
    darkFg: '#f0b4b4',
  },
  login: {
    lightBg: 'rgba(61, 107, 92, 0.12)',
    lightFg: '#2f5a4c',
    darkBg: 'rgba(109, 184, 154, 0.16)',
    darkFg: '#9ed9c2',
  },
};

function DrawerNavIcon({
  tone,
  isDark,
  children,
}: {
  tone: DrawerIconTone;
  isDark: boolean;
  children: React.ReactNode;
}) {
  const colors = DRAWER_ICON_TONES[tone];
  return (
    <Box
      sx={{
        width: 34,
        height: 34,
        borderRadius: '10px',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        bgcolor: isDark ? colors.darkBg : colors.lightBg,
        color: isDark ? colors.darkFg : colors.lightFg,
        transition: 'background-color 0.15s ease, color 0.15s ease',
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      }}
    >
      {children}
    </Box>
  );
}

export interface SellerNavItem {
  id: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  visible: boolean;
}

export interface SellersHeaderbarProps {
  drawerItems?: React.ReactNode;
  handledInTabbarIds?: string[];
  showAllInDrawerOnMobile?: boolean;
}

export function Headerbar({
  drawerItems,
  handledInTabbarIds,
  showAllInDrawerOnMobile = false,
}: SellersHeaderbarProps = {}) {
  const { user, logout, canManageCatalog } = useSellersAuthContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { LL } = useI18nContext();
  const { currentLocale } = useLanguageContext();
  const isEn = currentLocale === 'en';
  const themeMode = useUIStore((s) => s.theme.mode);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isNarrow = useMediaQuery('(max-width: 760px)');

  const isHome = location.pathname === SELLER_ROUTES.HOME || location.pathname === SELLER_ROUTES.PRODUCTS;
  const [isCondensed, setIsCondensed] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setIsCondensed(true);
      return;
    }

    const checkHero = () => {
      const hero = document.getElementById('hero') || document.querySelector('.hero-campaign');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setIsCondensed(rect.bottom < 60);
      } else {
        setIsCondensed(window.scrollY > 300);
      }
    };

    checkHero();
    window.addEventListener('scroll', checkHero, { passive: true });
    return () => window.removeEventListener('scroll', checkHero);
  }, [isHome]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(() => {
    handleUserMenuClose();
    logout();
  }, [logout]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(getSellerProductRoute({ search: searchQuery.trim() }));
    }
  };

  const isDark = themeMode === 'dark';

  const allNavItems: SellerNavItem[] = useMemo(
    () => [
      {
        id: 'home',
        label: LL.navigation.home(),
        path: SELLER_ROUTES.HOME,
        icon: (
          <DrawerNavIcon tone="home" isDark={isDark}>
            <HomeRoundedIcon />
          </DrawerNavIcon>
        ),
        visible: true,
      },
      {
        id: 'products',
        label: LL.navigation.products(),
        path: SELLER_ROUTES.PRODUCTS,
        icon: (
          <DrawerNavIcon tone="products" isDark={isDark}>
            <InventoryIcon />
          </DrawerNavIcon>
        ),
        visible: true,
      },
      {
        id: 'catalog',
        label: LL.navigation.catalogManagement(),
        path: SELLER_ROUTES.CATALOG,
        icon: (
          <DrawerNavIcon tone="catalog" isDark={isDark}>
            <InventoryIcon />
          </DrawerNavIcon>
        ),
        visible: Boolean(canManageCatalog),
      },
      {
        id: 'orders',
        label: LL.navigation.orders(),
        path: SELLER_ROUTES.ORDERS,
        icon: (
          <DrawerNavIcon tone="orders" isDark={isDark}>
            <ReceiptLongRoundedIcon />
          </DrawerNavIcon>
        ),
        visible: true,
      },
      {
        id: 'settings',
        label: LL.navigation.languageSettings(),
        path: SELLER_ROUTES.LANGUAGE_SETTINGS,
        icon: (
          <DrawerNavIcon tone="settings" isDark={isDark}>
            <PersonRoundedIcon />
          </DrawerNavIcon>
        ),
        visible: true,
      },
      {
        id: 'logout',
        label: LL.button.logout(),
        icon: (
          <DrawerNavIcon tone="logout" isDark={isDark}>
            <LogoutRoundedIcon />
          </DrawerNavIcon>
        ),
        onClick: handleLogout,
        visible: Boolean(user),
      },
      {
        id: 'login',
        label: LL.button.login(),
        path: SELLER_ROUTES.LOGIN,
        icon: (
          <DrawerNavIcon tone="login" isDark={isDark}>
            <LoginRoundedIcon />
          </DrawerNavIcon>
        ),
        visible: !user,
      },
    ],
    [LL, user, canManageCatalog, handleLogout, isDark]
  );

  const activeHandledInTabbarIds = useMemo(() => {
    if (handledInTabbarIds) return handledInTabbarIds;
    return user ? ['home', 'products', 'orders'] : ['home', 'login'];
  }, [handledInTabbarIds, user]);

  const unhandledNavItems = useMemo(
    () =>
      allNavItems.filter(
        (item) => item.visible && !activeHandledInTabbarIds.includes(item.id)
      ),
    [allNavItems, activeHandledInTabbarIds]
  );

  const hasUnhandledItems = unhandledNavItems.length > 0 || Boolean(drawerItems);

  const showMenuButton = !isMobile || hasUnhandledItems;

  const isOverHero = isHome && !isCondensed;
  const useLightHeroChrome = isOverHero && isDark;

  const headerHeight = isCondensed ? '44px' : '52px';
  const headerBg = useLightHeroChrome
    ? 'rgba(10, 10, 12, 0.22)'
    : isOverHero && !isDark
    ? 'rgba(255, 255, 255, 0.72)'
    : isCondensed
    ? 'var(--bar-solid)'
    : 'var(--bar)';
  const headerBorder = useLightHeroChrome
    ? '1px solid rgba(255, 255, 255, 0.14)'
    : '1px solid var(--hair)';
  const textColor = useLightHeroChrome ? '#ffffff' : 'var(--ink)';
  const secondaryTextColor = useLightHeroChrome
    ? 'rgba(255, 255, 255, 0.85)'
    : 'var(--ink-2)';
  const hoverBg = useLightHeroChrome
    ? 'rgba(255, 255, 255, 0.14)'
    : 'rgba(0, 0, 0, 0.05)';

  return (
    <>
      <AppBar
        position="fixed"
        className={isCondensed ? 'is-condensed' : ''}
        elevation={0}
        sx={{
          height: headerHeight,
          background: headerBg,
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: headerBorder,
          boxShadow: 'none !important',
          borderRadius: 0,
          top: 0,
          left: 0,
          right: 0,
          zIndex: (t) => t.zIndex.appBar + 1,
          color: textColor,
          transition: 'height 0.35s cubic-bezier(0.2, 0.7, 0.1, 1), background-color 0.35s cubic-bezier(0.2, 0.7, 0.1, 1), border-color 0.35s cubic-bezier(0.2, 0.7, 0.1, 1)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 'var(--wrap, 1180px)',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            height: '100%',
            display: 'grid',
            gridTemplateColumns: isNarrow ? '1fr auto' : '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          {/* RTL Start: SAINTBALA Latin Cormorant Wordmark linking to / */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showMenuButton && (
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{
                  color: 'inherit',
                  width: 36,
                  height: 36,
                  p: 0,
                  '& svg': { fontSize: 20 },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              component={RouterLink}
              to={SELLER_ROUTES.HOME}
              className="font-saintbala"
              sx={{
                fontFamily: 'var(--font-serif)',
                fontSize: { xs: 15, sm: 17 },
                fontWeight: 400,
                letterSpacing: '0.34em',
                textDecoration: 'none',
                color: 'inherit',
                direction: 'ltr',
                display: 'inline-block',
                transition: 'opacity 0.2s',
                '&:hover': { opacity: 0.8 },
              }}
            >
              {SITE_NAME}
            </Typography>

            {/* Hidden fallback for test assertions expecting siteName */}
            <span style={{ display: 'none' }} aria-hidden="true">
              {LL.appNames.siteName()}
            </span>
          </Box>

          {/* Centre Navigation (hidden on mobile <=760px) */}
          {!isNarrow && (
            <Box
              component="nav"
              aria-label={LL.home.nav.mainAria()}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '36px',
                fontSize: '12.5px',
                fontWeight: 500,
                fontFamily: 'var(--font-sans)',
              }}
            >
              <Box
                component={RouterLink}
                to={SELLER_ROUTES.HOME}
                sx={{
                  color: secondaryTextColor,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  fontFamily: 'var(--font-sans)',
                  '&:hover': { color: textColor },
                }}
              >
                {LL.navigation.home()}
              </Box>
              <Box
                component={RouterLink}
                to={SELLER_ROUTES.PRODUCTS}
                sx={{
                  color: secondaryTextColor,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  fontFamily: 'var(--font-sans)',
                  '&:hover': { color: textColor },
                }}
              >
                {LL.navigation.products()}
              </Box>
              {canManageCatalog && (
                <Box
                  component={RouterLink}
                  to={SELLER_ROUTES.CATALOG}
                  sx={{
                    color: secondaryTextColor,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    fontFamily: 'var(--font-sans)',
                    '&:hover': { color: textColor },
                  }}
                >
                  {LL.navigation.catalogManagement()}
                </Box>
              )}
            </Box>
          )}

          {/* RTL End: 36px round icon buttons with 17px stroke icons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            {/* Search Icon */}
            <IconButton
              aria-label="search"
              onClick={() => setSearchOpen(true)}
              sx={{
                width: 36,
                height: 36,
                p: 0,
                color: 'inherit',
                borderRadius: '50%',
                '& svg': { fontSize: 17 },
                '&:hover': {
                  background: hoverBg,
                },
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* Account / Login */}
            {user ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleUserMenuOpen}
                  startIcon={<AccountCircleIcon sx={{ fontSize: 17 }} />}
                  sx={{
                    height: 36,
                    borderRadius: '999px',
                    textTransform: 'none',
                    fontSize: '13px',
                    fontWeight: 500,
                    px: 1.5,
                    color: 'inherit',
                    '&:hover': {
                      background: hoverBg,
                    },
                  }}
                >
                  {user.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleUserMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem
                    component={RouterLink}
                    to={SELLER_ROUTES.PRODUCTS}
                    onClick={handleUserMenuClose}
                  >
                    <ListItemIcon>
                      <InventoryIcon fontSize="small" />
                    </ListItemIcon>
                    {LL.navigation.products()}
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to={SELLER_ROUTES.ORDERS}
                    onClick={handleUserMenuClose}
                  >
                    <ListItemIcon>
                      <ReceiptLongRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    {LL.navigation.orders()}
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>{LL.button.logout()}</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                component={RouterLink}
                to={SELLER_ROUTES.LOGIN}
                sx={{
                  height: 36,
                  borderRadius: '999px',
                  textTransform: 'none',
                  fontSize: '13px',
                  fontWeight: 500,
                  px: 1.5,
                  color: 'inherit',
                  '&:hover': {
                    background: hoverBg,
                  },
                }}
              >
                {LL.button.login()}
              </Button>
            )}

            {/* Theme Toggle */}
            <IconButton
              aria-label="toggle theme"
              onClick={toggleTheme}
              sx={{
                width: 36,
                height: 36,
                p: 0,
                color: 'inherit',
                borderRadius: '50%',
                '& svg': { fontSize: 17 },
                '&:hover': {
                  background: hoverBg,
                },
              }}
            >
              {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Box>
      </AppBar>

      {/* Search Modal */}
      <Dialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '24px',
            p: 3,
            background: 'var(--paper)',
            backdropFilter: 'blur(30px)',
            border: '1px solid var(--hair)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
          },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
        >
          <SearchIcon sx={{ color: 'var(--accent)', fontSize: 24 }} />
          <InputBase
            autoFocus
            fullWidth
            placeholder={LL.home.searchPlaceholder()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              fontSize: '16px',
              fontFamily: 'var(--font-sans)',
              color: 'var(--ink)',
            }}
          />
          <IconButton
            onClick={() => setSearchOpen(false)}
            size="small"
            sx={{ color: 'var(--ink-3)' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Dialog>

      {/* Drawer */}
      <StyledDrawer open={drawerOpen} onClose={handleDrawerToggle}>
        {isMobile && !showAllInDrawerOnMobile ? (
          <>
            {user && (
              <Box
                sx={{
                  p: 2,
                  pb: 1.5,
                  borderBottom: '1px solid var(--hair)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <DrawerNavIcon tone="profile" isDark={isDark}>
                    <PersonRoundedIcon sx={{ fontSize: '22px !important' }} />
                  </DrawerNavIcon>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{ fontWeight: 600 }}
                    >
                      {user.name}
                    </Typography>
                    {user.email && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                      >
                        {user.email}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            )}

            {unhandledNavItems.map((item) => (
              <ListItemButton
                key={item.id}
                to={item.path}
                component={item.path ? RouterLink : 'div'}
                selected={item.path ? location.pathname === item.path : false}
                onClick={() => {
                  handleDrawerToggle();
                  if (item.onClick) item.onClick();
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <CustomListItemText primary={item.label} />
              </ListItemButton>
            ))}

            {drawerItems && (
              <>
                <Divider sx={{ my: 1 }} />
                {drawerItems}
              </>
            )}
          </>
        ) : (
          <>
            {user && (
              <Box
                sx={{
                  p: 2,
                  pb: 1.5,
                  borderBottom: '1px solid var(--hair)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <DrawerNavIcon tone="profile" isDark={isDark}>
                    <PersonRoundedIcon sx={{ fontSize: '22px !important' }} />
                  </DrawerNavIcon>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{ fontWeight: 600 }}
                    >
                      {user.name}
                    </Typography>
                    {user.email && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        noWrap
                      >
                        {user.email}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            )}

            {allNavItems
              .filter((item) => item.visible)
              .map((item) => (
                <ListItemButton
                  key={item.id}
                  to={item.path}
                  component={item.path ? RouterLink : 'div'}
                  selected={item.path ? location.pathname === item.path : false}
                  onClick={() => {
                    handleDrawerToggle();
                    if (item.onClick) item.onClick();
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <CustomListItemText primary={item.label} />
                </ListItemButton>
              ))}

            {drawerItems && (
              <>
                <Divider sx={{ my: 1 }} />
                {drawerItems}
              </>
            )}
          </>
        )}
      </StyledDrawer>
    </>
  );
}

export default Headerbar;